// app.component.ts

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as cryptoJS from 'crypto-js';
import { setCookie, getCookie } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Encrypt your message below';
  angForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  EncryptData(data) {
    if (data.form.value.secretKey) {
      setCookie('secretKey', data.form.value.secretKey, 1);
      data.form.value.secretKey = '';
    } else {
      alert('Secret Key required');
      return;
    }
    if (data.form.value.message) {
      console.log(data.form.value.message);
      alert(
        cryptoJS.AES.encrypt(
          data.form.value.message,
          getCookie('secretKey')
        ).toString()
      );
      return;
      //Logic for valid form
    } else {
      alert('Invalid form data');
    }
  }
  DecryptData(data) {
    if (data.form.value.messageEncrypted) {
      // console.log(data.form.value.messageEncrypted);
      alert(
        cryptoJS.AES.decrypt(
          data.form.value.messageEncrypted,
          getCookie('secretKey')
        ).toString(cryptoJS.enc.Utf8)
      );
      return;
    } else {
      alert('Invalid form data');
    }
  }
  createForm() {
    this.angForm = this.fb.group({
      message: ['', Validators.required],
      secretKey: ['', Validators.required],
      messageEncrypted: ['', Validators.required],
    });
  }
}
