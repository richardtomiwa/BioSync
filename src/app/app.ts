import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './hero/hero';
import { Navbar } from './navbar/navbar';
import { Insight } from './insight/insight';
import { Statistics } from './statistics/statistics';
import { Faqs } from './faqs/faqs';
import { Footer } from './footer/footer';

@Component({
  imports: [RouterOutlet,Navbar, Hero, Insight, Statistics, Faqs, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('biosync');
}
