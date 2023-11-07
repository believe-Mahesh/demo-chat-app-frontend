import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public inputText: any;

  constructor(private _route: Router, private _chatService : ChatService) {}
  postMessage() {}

  public categories: any = [
    {
      title: 'Department of Information Technology',
      category: 'Information Technology',
      col: 4,
      sub_category: [
        'Two major objectives of the Broadband Program',
        'Mission of the Information Technology Department',
        'Services offered by the Department of IT',
      ],
      color: '#FAEFCA',
      sub_color: '#EDE1BB',
    },
    {
      title: 'Department of Economic Development',
      category: 'Economic Development',
      col: 3,
      sub_category: [
        'Target industries in New Mexico',
        'What resources are available to businesses?',
        'How can I start a business in New Mexico?',
      ],
      color: '#DDF2DA',
      sub_color: '#CCEAC8',
    },
    {
      title: 'Department of Higher Education',
      category: 'Higher Education',
      col: 4,
      sub_category: [
        'Is there extension for the student loan payment?',
        'Is a 529 Plan any better than a savings account?',
        'Who is responsible for capital projects?',
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
