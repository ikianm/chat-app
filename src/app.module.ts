import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from '../configs/app.config';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GroupModule } from './group/group.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { RequestContextModule } from 'nestjs-request-context';
import { JwtAuthGuard } from './auth/guards/jwtAuth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [appConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('databaseUri')
        }
      },
      inject: [ConfigService]
    }),
    RequestContextModule,
    UserModule,
    GroupModule,
    MessageModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule { }
