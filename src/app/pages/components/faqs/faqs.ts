import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-faqs',
  styleUrl: './faqs.scss',
  templateUrl: './faqs.html',
})
export class Faqs {

  
  openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index? null : index;
  }
}
