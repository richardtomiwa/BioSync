import { Component, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import intlTelInput from "intl-tel-input";

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register implements AfterViewInit, OnInit {
  private readonly platformId = inject(PLATFORM_ID);
myform!:FormGroup;
  

   @ViewChild('phoneInput') phoneInput!: ElementRef;
  iti: any;

  ngOnInit(){
     this.myform = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    email:  new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl(''),
  });
  }
  form() {
    console.log(this.myform.value);
  }

 

  ngAfterViewInit() {
    // intl-tel-input accesses document and can only initialize in the browser.
    if (!isPlatformBrowser(this.platformId)) return;

    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: "ng",
      separateDialCode: false,
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
    });

    // Keep formControl in sync when user changes country/number
    this.phoneInput.nativeElement.addEventListener('countrychange', () => {
      this.updateFormValue();
    });
    this.phoneInput.nativeElement.addEventListener('keyup', () => {
      this.updateFormValue();
    });
  }

  updateFormValue() {
    if (!this.iti) return;
    const fullNumber = this.iti.getNumber(); // +2348012345678
    this.myform.get('phone')?.setValue(fullNumber, { emitEvent: false });
  }

  submit() {
    console.log(this.myform.value.phone); // +2348012345678 - full number with country code
    console.log(this.iti.getSelectedCountryData().dialCode); // just +234
  }
}


