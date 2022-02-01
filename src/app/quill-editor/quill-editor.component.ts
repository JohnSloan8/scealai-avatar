import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story';
import { modules } from './quillConfig'
import { setIds } from './utils'
import { QuillModule } from 'ngx-quill'

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.css']
})

export class QuillEditorComponent implements OnInit {

  story: Story = new Story();

  modules = modules;
  placeholder = "start please"
  styles = {
    backgroundColor: 'white',
    border: 'none'
  }

  storyEdited(q: any) {
    setIds(q);
    this.story.text = q.text;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
