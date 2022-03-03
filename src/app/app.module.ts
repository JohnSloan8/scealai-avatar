import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { AvatarClassroomComponent } from './components/avatar-classroom/avatar-classroom.component';
import { EnterMessageComponent } from './components/enter-message/enter-message.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    AvatarComponent,
    TextBoxComponent,
    AvatarClassroomComponent,
    EnterMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
