import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story';
import { quillToolbar } from './quillConfig'
import { setIds } from './utils'

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.css']
})

export class QuillEditorComponent implements OnInit {

  story: Story = new Story();

  quillToolbar = quillToolbar;

  storyEdited(q: any) {
    setIds();
    this.story.text = q.text;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
