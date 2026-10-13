import { Component, HostListener,Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/core';
@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  ismenuopen=false;
  isscrolled=false;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private renderer:Renderer2
  ){}

  @HostListener('window:scroll',[])
  
  onwindowscroll(){
    this.isscrolled=window.scrollY>50;
  }

  togglemenu(){
    this.ismenuopen=!this.ismenuopen
    this.setscrolllock(this.ismenuopen)
  }


  closemenu(){
    this.ismenuopen=false;
       this.setscrolllock(false)

  }

  private setscrolllock(lock:boolean){
    if(lock){
      this.renderer.addClass(this.document.body,'no-scroll');
    }else{
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }
}
