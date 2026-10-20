import { Component, signal } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { Navbar } from './pages/components/navbar/navbar';
import { Footer } from './pages/components/footer/footer';


@Component({
  imports: [RouterOutlet,Navbar,Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('biosync');
}

