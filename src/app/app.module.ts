import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill'

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormatterComponent } from './formatter/formatter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    ToolbarComponent,
    FormatterComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
