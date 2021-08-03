/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SocketAdapter } from './app/chat/socket.adapter';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const globalPrefix = 'api';

  // app.setGlobalPrefix(globalPrefix);
  app.useWebSocketAdapter(new SocketAdapter(app));
  // app.enableCors({ credentials: false, origin: '*' });

  const port = process.env.PORT || 3333;

  await app.listen(port, () => {
    // Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    Logger.log('Listening at http://localhost:' + port);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch((err) => console.error(err));
}
