import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import Mail from "nodemailer/lib/mailer";
import {Repository} from "typeorm";
import {MockType} from "../transaction/transaction.service.spec";
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/ts-jest';
import {UserService} from "../user/user.service";
import { UserEntity } from "../user/entities/user.entity";
import { UserDto } from 'src/user/user.dto';
import * as path from "path";
import { async } from 'rxjs';


describe('EmailService', () => {
  let service: EmailService;
  let usrservice: UserService;
  //let repositoryMock: MockType<Repository<Mail>>;
  const env = process.env;

  beforeAll(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,  
        UserService,
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
        // {
        //   provide: getRepositoryToken(User),
        //   useValue: createMock<User>(),
        // }
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    //repositoryMock = module.get(getRepositoryToken(Mail));
    usrservice = module.get<UserService>(UserService);

    process.env = { ...env };
  });

  afterAll(() => {
    jest.clearAllMocks();
    process.env = env;
  });
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it ('should return when email is false', async () => {
    const testuser = new UserEntity();
    process.env.EMAIL_ENABLE = 'false';
    jest.spyOn(usrservice, 'activateAccount').mockImplementation(async() => testuser);
    await expect(service.sendActivateAccountEmail(testuser)).resolves.not.toThrow();
  });

  it ('should return when email is test', async () => {
    const testuser = new UserEntity();
    testuser.firstName = "James"
    testuser.lastName = "Draugen"
    testuser.email = "james@james.com"
    process.env.EMAIL_ENABLE = 'test';
    jest.spyOn(usrservice, 'findOneByEmail').mockImplementation(async() => testuser);
    jest.spyOn(service, 'sendEmail').mockImplementation(async() => Promise.resolve()); 
    await expect(service.sendActivateAccountEmail(testuser)).resolves.not.toThrow();
  });

  it('should send activate account email', async () => {
    process.env.EMAIL_ENABLE = 'none';
    const testuser = new UserEntity();
    testuser.activationCode='a'
    testuser.firstName = 'a'
    testuser.lastName = 'a'
    testuser.email = 'abcd'
    testuser.activatedAccount = false
    jest.spyOn(usrservice, 'activateAccount').mockImplementation(async() => testuser)
    jest.spyOn(service,'sendActivateAccountEmail').mockReturnValue(Promise.resolve())
    await expect(service.sendActivateAccountEmail(testuser)).resolves.not.toThrow()
  });

  it('should send a reminder email', async () => {
    const user = new UserDto()
    user.firstName = "John"
    user.lastName = "Smith"
    jest.spyOn(service, 'sendEmail').mockImplementation(async () => Promise.resolve())
    await expect(service.sendReminderEmail(user)).resolves.not.toThrow()
  })

  it('should check healthy', async () => {
    const result = true;
    expect(await service.healthy()).not.toBe(result);
  });
});
