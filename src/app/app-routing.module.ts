import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './component/chat/chat.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'home' , component: ChatComponent},
  {path: 'chat' , component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
