import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'there';
  subtitle = 'compiler';
  counter = 0;

  constructor(/*emojiService: EmojiService*/) {
    // this.title += emojiService.cat;
  }

  ngOnInit() {
    this.title = 'ngOnInit was run!';
  }

  incrementCounter() {
    this.counter++;
  }
}
