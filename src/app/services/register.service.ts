import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { map } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    private baseUrl = AppComponent.baseUrl + '/auth/register';

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  registerUser(firstname: string, lastname: string, role: string, email: string, password: string) {
    // let httpParams = new HttpParams().set('firstname', firstName).set('lastname', lastName).set('email', email).set('password', password);
    return this.http.post(this.baseUrl,{
      firstName: firstname,
      lastName: lastname,
      role: role,
      email: email,
      password: password,
    }
    ).pipe(
      map((res: any) => {
        this.tokenStorageService.saveToken(res.token);
      })
    );
  }

//   private baseUrl = AppComponent.baseUrl + '/auth/login';

//   constructor(
//     private http: HttpClient,
//     private tokenStorageService: TokenStorageService
//   ) {}

//   authenticate(email: string, password: string) {
//     return this.http
//       .post(this.baseUrl, {
//         email: email,
//         password: password,
//       })
//       .pipe(
//         map((res: any) => {
//           this.tokenStorageService.saveToken(res.token);
//         })
//       );
//   }

}