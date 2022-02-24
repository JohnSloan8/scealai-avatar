import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TextBoxComponent } from './components/text-box/text-box.component';

import { AuthInterceptor } from './interceptors/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    AvatarComponent,
    TextBoxComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    QuillModule.forRoot(),
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
