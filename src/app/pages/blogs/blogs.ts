import { Component } from '@angular/core';
import { Blogslist } from '../components/blogslist/blogslist';

@Component({
  imports: [Blogslist],
  selector: 'app-blogs',
  styleUrl: './blogs.scss',
  templateUrl: './blogs.html',
})
export class Blogs {}
