import {
  HttpDownloadProgressEvent,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private _chatService: ChatService) {}

  ngOnInit(): void {
    this.inputText = this._chatService.getSearchString();
    if (this.inputText != '') {
      this.postMessage();
    }
  }
  title = 'chat-bot-ui';
  inputText = '';
  public chatHistory: any = [
    { title: 'Tell me about DoIT' },
    { title: 'Fingerprint and background check service' },
    { title: 'Office of Governor' },
    { title: 'Traffic Safety Division contact number?' },
  ];

  public chatConvesrsation: any = [
    // { type: 'from', text: 'Fingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check service' },
    // { type: 'to', text: 'Fingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check service' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'from', text: 'Hi' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'from', text: 'Hi' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'from', text: 'Hi' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
    // { type: 'to', text: 'Hi...' },
  ];

  public questios: any = [
    { title: 'Tell me about DoIT', text: 'get' },
    { title: 'Fingerprint and background check service', text: 'get' },
    { title: 'Office of Governor', text: 'get' },
    { title: 'Traffic Safety Division contact number?', text: 'get' },
  ];

  setInputText(text: string) {
    this.inputText = text;
    this.postMessage();
  }

  postMessage() {
    this.chatConvesrsation.push({ type: 'to', text: this.inputText });
    const chatBody = {
      messages: [
        {
          role: 'user',
          content: this.inputText,
        },
      ],
    };
    this.inputText = '';
    this.chatConvesrsation.push({ type: 'from-load', text: '', url: '' });
    let data: any = {};
    this._chatService.postMessage(chatBody).subscribe({
      next: (event: HttpEvent<string>) => {

        if (event.type === HttpEventType.DownloadProgress) {
          this.chatConvesrsation.pop();
          this.chatConvesrsation.push({
            type: 'from',
            text: (event as HttpDownloadProgressEvent).partialText,
            url: data.url || '',
          });
        } else if (event.type === HttpEventType.Response) {
          this.chatConvesrsation.pop();
          this.chatConvesrsation.push({
            type: 'from',
            text: event.body,
            url: data.url || '',
          });
        }
      },
      error: () => {
        this.chatConvesrsation.pop();
        console.log('A error occured');
      },
    });
  }
}
