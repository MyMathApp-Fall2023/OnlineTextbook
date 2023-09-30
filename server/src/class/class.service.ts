import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClassEntity } from "./class.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";

@Injectable()
export class ClassService {

  constructor(
    @InjectRepository(ClassEntity) private readonly classRepo: Repository<ClassEntity>,
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createNewClass(instructorId?: number) {
    let newClass = this.classRepo.create()
    if (instructorId) {
      const instructor = await this.userRepo.findOne({where: {userId: instructorId}})
      newClass.instructor = instructor
    }
    return await this.classRepo.save(newClass)
  }

  async getAllClasses() {
    return await this.classRepo.find({relations: ['instructor', 'students']})
  }

  async getClassById(id: number) {
    return await this.classRepo.findOne({
      relations: ['instructor', 'students'], 
      where: {classId: id}
    })
  }

  async getClassByUserIdOfInstructor(userIdOfInstructor: number) {
    return await this.classRepo.findOne({
      relations: ['instructor', 'students'],
      where: {instructor: {userId: userIdOfInstructor}}
    })
  }

  async addStudentToClass(classId: number, studentEmail: string) {
    let classEntity = await this.classRepo.findOne({
      relations: ['instructor', 'students'],
      where: {classId}
    })
    const userEntity = await this.userRepo.findOne({
      where: {email: studentEmail}
    })
    if (!userEntity) {
      throw new Error(`No user with email ${studentEmail} found.`)
    }
    classEntity.students.push(userEntity)
    return await this.classRepo.save(classEntity)
  }

  async addMultipleStudentsToClass(studentIds: number[], classId: number) {
    let classEntity = await this.classRepo.findOne({where: {classId}})
    for (const sid of studentIds) {
      const userEntity = await this.userRepo.findOne({where: {userId: sid}})
      classEntity.students.push(userEntity)
    }
    return this.classRepo.save(classEntity)
  }

  async removeStudentFromClass(classId: number, studentUserId: number) {
    let studentEntity = await this.userRepo.findOne({
      relations: ['class'],
      where: {userId: studentUserId}
    })
    studentEntity.class = null // unassign student from class
    await this.userRepo.save(studentEntity)
    return await this.classRepo.findOne({
      relations: ['instructor','students'],
      where: {classId}
    })
  }
}