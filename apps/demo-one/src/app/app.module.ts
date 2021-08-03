import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3333',
  options: {},
  // options: { path: '/chat' },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
