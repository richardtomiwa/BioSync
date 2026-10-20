import { Component } from '@angular/core';
import { Hero } from '../components/hero/hero';
import { Insight } from '../components/insight/insight';
import { Statistics } from '../components/statistics/statistics';
import { Faqs } from '../components/faqs/faqs';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [Hero, Insight, Statistics, Faqs],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  constructor(private title: Title){
    this.title.setTitle("BioSync - Home")
  }
}
