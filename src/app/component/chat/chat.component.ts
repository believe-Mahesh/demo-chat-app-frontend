import { Component } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(private _chatService: ChatService){

  }
  title = 'chat-bot-ui';
  inputText = '';
  public chatHistory:any = [
    {title: 'Tell me about DoIT'},
    {title: 'Fingerprint and background check service'},
    {title: 'Office of Governor'},
    {title: 'Traffic Safety Division contact number?'}

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
  ]

  public questios: any =[
    {title: 'Tell me about DoIT', text : 'get'},
    {title: 'Fingerprint and background check service', text : 'get'},
    {title: 'Office of Governor', text : 'get'},
    {title: 'Traffic Safety Division contact number?', text : 'get'}

  ]

  setInputText(text: string){
    this.inputText = text
    this.postMessage()
  }

  postMessage() {
    this.chatConvesrsation.push({type: 'to', text: this.inputText})
    const chatBody = {
      "messages": [
          {
              "role": "user",
              "content": this.inputText
          }
      ]
  }
  this.inputText = ''
  this.chatConvesrsation.push({type:'from-load',text:'', url: ''})

    this._chatService.postMessage(chatBody).subscribe(data=>{
      this.chatConvesrsation.pop()
      console.log('Chat Res', data)
      this.chatConvesrsation.push({type:'from',text:data.data, url: data.url || ''})
    })
  }
}
