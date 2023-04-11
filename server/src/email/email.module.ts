import {forwardRef, Module} from '@nestjs/common';
import {EmailService} from './email.service';
import {UserModule} from "../user/user.module";

@Module({
  imports:[ forwardRef(()=> UserModule)],
  providers: [EmailService],
  exports:[EmailService]
})
export class EmailModule {}
