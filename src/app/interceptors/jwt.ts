import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth-service";

@Injectable()
export class Jwt implements HttpInterceptor {

    constructor(private readonly auth: AuthService) {}
    
	intercept(req: any, next: any) {
		const token = this.auth.getAccessToken();
		if (token) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
		}
		return next.handle(req);
	}
}
