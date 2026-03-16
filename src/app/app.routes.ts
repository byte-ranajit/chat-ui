import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { ChatComponent } from './components/chat/chat';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path:'chat', component: ChatComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}