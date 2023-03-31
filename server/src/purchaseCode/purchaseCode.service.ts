import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PurchaseCode} from "./purchaseCode.entity";
import {Repository} from "typeorm";
import { ConflictException } from '@nestjs/common';

@Injectable()
export class PurchaseCodeService {

  constructor(
      @InjectRepository(PurchaseCode)
      private purchaseCodeRepo: Repository<PurchaseCode>,  // 使用泛型注入对应类型的存储库实例
  ) {}

  create(createPurchaseCode: PurchaseCode) {
    //ToDO if user already exist
    return this.purchaseCodeRepo.save(createPurchaseCode)
  }

  /*async authenticate(loginUser:User):Promise<User> {
    const email = loginUser.email
    const password = loginUser.password
    const user = await this.purchaseCodeRepo.findOne({ where:{email,password} });
    return user || null;
  }*/

  async findAll() {
    const purchaseCodes = await this.purchaseCodeRepo.find({
      select:{
        code_id: true,
        name: true,
        priceOff: true
      }
    })
    return purchaseCodes
  }


  async findOne(name: string):Promise<PurchaseCode |　undefined> {
    const purchaseCode = await this.purchaseCodeRepo.findOne({where: {name}});
    return purchaseCode || null;
  }

  async addOne(name: string, priceOff: number):Promise<PurchaseCode> {

    const newCode = new PurchaseCode();
    newCode.name = name;
    newCode.priceOff = priceOff;
    const oldCode = await this.purchaseCodeRepo.findOne({where: {name}});
    console.log(oldCode);
    if (oldCode == null){
      const purchaseCode = await this.purchaseCodeRepo.save(newCode);
      return purchaseCode;
    }
    else{
      throw new ConflictException("Purchase code already exist!");
    }
  }

  async deleteCode(code_id: number):Promise<PurchaseCode>{
    const findCode = await this.purchaseCodeRepo.findOne({where: {code_id}});
    console.log(findCode);
    if (findCode != null){ //delete that code
      await this.purchaseCodeRepo.remove(findCode);
      return findCode;
    }
    else{ //code doesn't exist
      throw new ConflictException("Purchase code doesn't exist!");
    }
  }

  async validateCode(name:string):Promise<number>{
    const findCode = await this.purchaseCodeRepo.findOne({where: {name}});
    console.log(findCode);
    if (findCode != null){ // return price off
      return findCode.priceOff;
    }
    else{ //code doesn't exist
      throw new ConflictException("Purchase code doesn't exist!");
    }
  }

  async updateCode(code_id: number,priceOff:number):Promise<PurchaseCode>{
    const findCode = await this.purchaseCodeRepo.findOne({where: {code_id}});
    console.log(findCode);
    if (findCode != null){ //update that code
      findCode.priceOff = priceOff;
      await this.purchaseCodeRepo.save(findCode);
      return findCode;
    }
    else{ //code doesn't exist
      throw new ConflictException("Purchase code doesn't exist!");
    }
  }

}
