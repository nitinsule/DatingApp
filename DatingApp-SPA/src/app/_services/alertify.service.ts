import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  Confirm(message: string, okCallBack: () => any): any{
    alertify.confirm(message, (e: any) => {
      if (e){
       okCallBack();
      }else{}
    });
  }

  success(message: string): any {
    alertify.success(message);
  }

  error(message: string): any {
    alertify.error(message);
  }

  warning(message: string): any {
    alertify.warning(message);
  }

  message(message: string): any {
    alertify.message(message);
  }

}
