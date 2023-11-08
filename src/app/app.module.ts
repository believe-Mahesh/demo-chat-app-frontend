import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './component/chat/chat.component';
import { HomeComponent } from './component/home/home.component';
import { MarkedPipe } from './service/marked.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    MarkedPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
