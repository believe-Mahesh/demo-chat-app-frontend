import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public inputText='';

  constructor(private _route: Router, private _chatService : ChatService) {}
  postMessage() {
    this.inputText = this.inputText.trim() === '' ? 'Hi' : this.inputText;
    this._chatService.setSearchString(this.inputText)
    this._route.navigate(['chat'])
  }

  public categories: any = [
    {
      title: 'Department of Health',
      category: 'Health',
      col: 4,
      sub_category: [
        'How to Become a NM WIC Authorized Vendor',
        'Is there any flu cases identified in our state?',
        'What is the timing of New Mexico Rehabilitation Center?',
        'How do I report child abuse?'
      ],
      color: '#FAEFCA',
      sub_color: '#EDE1BB',
    },
    {
      title: 'Department of Transport',
      category: 'Transport',
      col: 3,
      sub_category: [
        'How to apply drivers license?',
        'How to Requests to Inspect Public Records',
        'Can we adopt an highway?',
        'What is the procedure to get over weight permit?'
      ],
      color: '#DDF2DA',
      sub_color: '#CCEAC8',
    },
    {
      title: 'General',
      category: 'General',
      col: 4,
      sub_category: [
        'What are the different departments of the state?',
        'Cabinet Secretary for the Department of Finance',
        'Contact number of the department of economic development',
        'Medical assistance customer service number?'
      ],
      color: '#E8F1FF',
      sub_color: '#DBE6F9',
    },
  ];
  setSerchString(value : any) {
    this._chatService.setSearchString(value)
    this._route.navigate(['chat'])
  }
}
