import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';
import { AudioBarComponent } from './audio-bar/audio-bar.component';
import { AudioButtonsComponent } from './audio-buttons/audio-buttons.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SpeakingSpeedComponent } from './speaking-speed/speaking-speed.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TextBoxComponent } from './text-box/text-box.component';
import { ElasticDirective } from './elastic.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ToolbarComponent,
    QuillEditorComponent,
    AudioBarComponent,
    AudioButtonsComponent,
    AvatarComponent,
    SpeakingSpeedComponent,
    TextBoxComponent,
    ElasticDirective
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    QuillModule.forRoot(),
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
