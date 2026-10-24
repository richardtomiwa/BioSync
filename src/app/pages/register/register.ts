import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import intlTelInput from 'intl-tel-input';
import { HttpClient, httpResource } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  // match the fields coming from this.myform.value
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register implements AfterViewInit, OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  myform!: FormGroup;
  phoneerror = '';

  @ViewChild('phoneInput') phoneInput!: ElementRef<HTMLInputElement>;
  iti: any;

  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(''),
    });
  }

  totitlecase(value: string): string {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  async onsubmit() {
    this.myform.markAllAsTouched();
    if (!this.phoneerror || this.myform.invalid) {
      return;
    } else {
      try{
      const user = await firstValueFrom(
        this.http.get<any[]>('http://localhost:3000/users?_sort=-id'),
      );
      const lastid = user[0].id;
      const id = Number(lastid) + 1;
      const rawname = this.myform.value.name;
      const name = this.totitlecase(rawname);
      const email = this.myform.value.email;
      const phone = this.myform.value.phone;

      const body = {
        id: id,
        name: name,
        email: email,
        phone: phone,
      };

      const record = await firstValueFrom(this.http.post<any>('http://localhost:3000/users', body));
      this.myform.reset();
      this.iti.setNumber("");
      this.phoneerror="";
      this.myform.markAsUntouched();
      this.myform.markAsPristine();

    }catch(error){
      console.log("save failed")
    }
    }
  }

  ngAfterViewInit() {
    // intl-tel-input accesses document and can only initialize in the browser.
    if (!isPlatformBrowser(this.platformId)) return;

    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: 'ng',
      separateDialCode: false,
      utilsScript: 'assets/intl-tel-input/utils.js',
    });

    // Keep the form model in sync with typing and country selection.
    this.phoneInput.nativeElement.addEventListener('countrychange', () => {
      this.updateFormValue();
    });
    this.phoneInput.nativeElement.addEventListener('input', () => {
      this.updateFormValue();
    });

    // getNumber() needs the utils script; sync again once it has loaded.
    this.iti.promise?.then(() => this.updateFormValue());
  }

  updateFormValue() {
    if (!this.iti) return;
    const phoneControl = this.myform.get('phone');
    if (!phoneControl) return;

    this.phoneerror = this.iti.isValidNumber();

    // Keep the visible text as typed; store the international number in the form.
    // Before utils load, getNumber() returns an empty string, so retain the raw input.
    const phoneValue = this.iti.getNumber() || this.phoneInput.nativeElement.value;
    phoneControl.setValue(phoneValue, {
      emitEvent: false,
      emitModelToViewChange: false,
    });
  }
}
