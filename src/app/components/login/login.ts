import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username = "";
  password = "";

  constructor(private readonly auth: AuthService,
              private readonly router: Router) {}

  login() {

    this.auth.login(this.username, this.password)
      .subscribe((res: any) => {
        this.auth.saveToken(res);
        this.router.navigate(['/chat']);
      });

  }
}
