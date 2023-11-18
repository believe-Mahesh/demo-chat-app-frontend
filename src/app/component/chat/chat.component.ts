import {
  HttpDownloadProgressEvent,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private _chatService: ChatService) {}
  @ViewChild('scrollContainer', { static: false }) public scrollContainer: ElementRef | any;

  uId = 0;
  ngOnInit(): void {
    this.inputText = this._chatService.getSearchString();
    if (this.inputText != '') {
      this.postMessage();
    }
  }
  title = 'chat-bot-ui';
  inputText = '';
  url: string[] = [];
  public historicList: any = [
    // {
    //   id: 1,
    //   title: 'Tell me about DoIT',
    //   sub: 'Tell me about DoITTell me about DoITTell me about DoITTell me about DoITTell me about DoIT',
    //   chatArray: [
    //     { type: 'from', text: 'Fingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check service' },
    //   { type: 'to', text: 'Fingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check service' },
    //   { type: 'to', text: 'Hi...' },
    //   { type: 'to', text: 'Hi...' },
    // ]
    // }
  ]

  public chatHistory: any = [
    { title: 'Tell me about DoIT' },
    { title: 'Fingerprint and background check service' },
    { title: 'Office of Governor' },
    { title: 'Traffic Safety Division contact number?' },
  ];

  public chatConvesrsation: any = [
    // {url: [' https://www.dot.nm.gov/planning-research-multimodal-and-safety/modal/traffic-safety/',' https://www.dot.nm.gov/planning-research-multimodal-and-safety/modal/traffic-safety/'] ,type: 'from', text: 'Fingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check service' },
    // { url: [],type: 'to', text: 'Fingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check serviceFingerprint and background check service' },
    // { type: 'from', text: 'Hi...' },
    // { type: 'to', text: 'Hey...' },
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

  scrollToBottom(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  setHistoricChat(hList : any) {
    this.chatConvesrsation = hList.chatArray;
  }

  createNewChat() {
   const to = this.chatConvesrsation.filter((d:any)=> d.type==='to').pop()
   const from = this.chatConvesrsation.filter((d:any)=> d.type==='from').pop()
   let chat =  {
      id: this.uId,
      title: to.text,
      sub: from.text,
      chatArray: this.chatConvesrsation
    }
    this.uId+=1;
    this.historicList.unshift(chat);
    this.chatConvesrsation = [];
  }

  postMessage() {
    this.chatConvesrsation = this.chatConvesrsation.filter((d:any)=> d.type !=='from-load')
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
          setTimeout(() => {
            this.scrollToBottom()
          }, 1000);
        } else if (event.type === HttpEventType.Response) {
          this._chatService.getUrls(chatBody).subscribe((data) => {
            this.chatConvesrsation.pop();
            this.chatConvesrsation.push({
              type: 'from',
              text: event.body,
              url: data.url || '',
            });
          })
        }
      },
      error: () => {
        this.chatConvesrsation.pop();
        console.log('A error occured');
      },
    });
  }
}
