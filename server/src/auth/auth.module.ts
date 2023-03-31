import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt"
import { jwtConstants } from "./constants";

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      //todo put secret in env file
      secret:jwtConstants.secret,
      signOptions: {expiresIn:'7d'}
    })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]

})
export class AuthModule {}
