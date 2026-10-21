import { ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit, OnDestroy {
  ismenuopen=false;
  isscrolled=false;
  private isHomeRoute = true;
  private routerSubscription?: Subscription;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private renderer:Renderer2,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ){}

  ngOnInit(){
    this.updateRouteState(this.router.url);
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closemenu();
        this.updateRouteState(event.urlAfterRedirects);
      }
    });

    if (typeof window !== 'undefined') {
      this.checkscroll();
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
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
      this.isscrolled = !this.isHomeRoute;
      this.changeDetector.markForCheck();
      return;
    }
    this.isscrolled = !this.isHomeRoute || window.scrollY > 50;
    this.changeDetector.markForCheck();
  }

  private updateRouteState(url: string): void {
    const path = url.split(/[?#]/)[0] || '/';
    this.isHomeRoute = path === '/';
    this.checkscroll();
  }

  private setscrolllock(lock:boolean){
    if(lock){
      this.renderer.addClass(this.document.body,'no-scroll');
    }else{
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }
}
