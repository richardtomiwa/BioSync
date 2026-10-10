import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-insight',
  styleUrl: './insight.scss',
  templateUrl: './insight.html',
})
export class Insight {

    openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index? null : index;
  }

}
