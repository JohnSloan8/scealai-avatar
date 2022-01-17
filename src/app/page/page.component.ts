import { Component, OnInit } from '@angular/core';
//import { Story } from '../../models/story';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  //story: Story = new Story();

  model: string = '';

  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote'],

      // [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction

      // [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      // [{'header': [1, 2, 3, 4, 5, 6, false]}],

      // [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      // [{'font': []}],
      [{'align': []}],

      ['clean'],                                       // remove formatting button

      // ['link', 'image', 'video',]                   // link and image, video
      ['link']                                         // link

    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
