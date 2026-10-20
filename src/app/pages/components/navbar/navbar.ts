import { Component, HostListener,Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/core';
@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit{
  ismenuopen=false;
  isscrolled=false;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private renderer:Renderer2
  ){}

  ngOnInit(){
    if (typeof window !== 'undefined') {
      this.checkscroll();
    }
  }

  @HostListener('window:scroll',[])
  
  onwindowscroll(){
    if (typeof window !== 'undefined') {
      this.checkscroll();
    }
  }

  togglemenu(){
    this.ismenuopen=!this.ismenuopen
    this.setscrolllock(this.ismenuopen)
  }


  closemenu(){
    this.ismenuopen=false;
       this.setscrolllock(false)

  }

  private checkscroll(){
    if (typeof window === 'undefined') {
      this.isscrolled = false;
      return;
    }
    this.isscrolled = window.scrollY > 50;
  }

  private setscrolllock(lock:boolean){
    if(lock){
      this.renderer.addClass(this.document.body,'no-scroll');
    }else{
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }
}
