import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConflictException } from '@nestjs/common';
import {EmailSubscription} from "./email-subscription.entity";

@Injectable()
export class EmailSubscriptionService {

    constructor(
        @InjectRepository(EmailSubscription)
        private emailSubscriptionRepo: Repository<EmailSubscription>,  // 使用泛型注入对应类型的存储库实例
    ) {}

    create(createEmailSubscription: EmailSubscription) {
        return this.emailSubscriptionRepo.save(createEmailSubscription)
    }


    async findAll() {
        const purchaseCodes = await this.emailSubscriptionRepo.find({
            select:{
                email_sub_id: true,
                suffix: true,
            }
        })
        return purchaseCodes
    }


    async findOne(suffix: string):Promise<EmailSubscription |　undefined> {
        const purchaseCode = await this.emailSubscriptionRepo.findOne({where: {suffix}});
        return purchaseCode || null;
    }

    async addOne(suffix: string):Promise<EmailSubscription> {

        const newEmailSub = new EmailSubscription();
        newEmailSub.suffix = suffix;
        const oldEmailSub = await this.emailSubscriptionRepo.findOne({where: {suffix}});
        if (oldEmailSub == null){
            const purchaseCode = await this.emailSubscriptionRepo.save(newEmailSub);
            return purchaseCode;
        }
        else{
            throw new ConflictException("Email suffix already exist!");
        }
    }

    async deleteEmailSub(email_sub_id: number):Promise<EmailSubscription>{
        const findEmailSub = await this.emailSubscriptionRepo.findOne({where: {email_sub_id: email_sub_id}});
        if (findEmailSub != null){
            await this.emailSubscriptionRepo.remove(findEmailSub);
            return findEmailSub;
        }
        else{
            throw new ConflictException("Email suffix doesn't exist!");
        }
    }


    async updateEmailSub(email_sub_id: number, suffix:string):Promise<EmailSubscription>{
        const findEmailSub = await this.emailSubscriptionRepo.findOne({where: {email_sub_id: email_sub_id}});
        if (findEmailSub != null){ //update that code
            findEmailSub.suffix = suffix;
            await this.emailSubscriptionRepo.save(findEmailSub);
            return findEmailSub;
        }
        else{
            throw new ConflictException("Email Subscription doesn't exist!");
        }
    }

    async checkIfUserEmailSubItem(userEmail:string):Promise<boolean>{
        const emailSuffix = userEmail.split('@')[1]
        const findEmailSub = await this.emailSubscriptionRepo.findOne({where: {suffix:emailSuffix}});
        if (findEmailSub != null){ // return price off
            return true
        }
        else{
            return false
        }
    }

}
