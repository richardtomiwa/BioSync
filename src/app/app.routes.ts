import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Blogs } from './pages/blogs/blogs';

export const routes:Routes=[
  {path: '', component:Home},
  {path: 'register', component:Register},
    {path: 'blogs', component:Blogs},
];
