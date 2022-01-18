import { Component, OnInit } from '@angular/core';
//import Quill from 'quill'
import { Story } from '../../models/story';
import { quillToolbar } from './quillConfig'
import { getWordCount, addIds } from './utils'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {

  story: Story = new Story();

  quillToolbar = quillToolbar;

  storyEdited(q: any) {
    var x = document.getElementsByClassName("ql-editor");
    console.log('childnodes:', x[0].children)
    Array.from(x[0].children).forEach((c, i) => {
      c.id = "sent_" + i
    })
    this.story.text = q.text;
    //this.textUpdated.next(q.text);
    this.story.wordCount = getWordCount(q.text);
    //this.storyEdited = this.storyEditedAlt;
  }

  //storyEditedAlt(q: any) {
    //this.story.text = q.text;
    //this.textUpdated.next(q.text);
    //this.getWordCount(q.text);
    //this.storySaved = false;
    //this.debounceSaveStory();
  //}

  constructor() {
  }

  ngOnInit(): void {
  }

}
