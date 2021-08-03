import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';

// tslint:disable-next-line: nx-enforce-module-boundaries // todo: how not to import this from app
import { AppServerModule } from '../../../demo-one/src/main.server';

import { ChatModule } from './chat/chat.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/demo-one/browser'),
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
