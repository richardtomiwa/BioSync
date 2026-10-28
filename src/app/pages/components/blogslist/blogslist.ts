import { Component, inject, Injector, OnInit, runInInjectionContext } from '@angular/core';
import { Postservice } from '../../../services/post';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-blogslist',
  styleUrl: './blogslist.scss',
  templateUrl: './blogslist.html',
})
export class Blogslist implements OnInit {
posts:any;
currentpage=1;
limit=10;
total=0;
totalpages=0;
loading=false;

private injector=inject(Injector)
private postservice= inject(Postservice);


ngOnInit(): void {
  this.loadposts()
}

async loadposts(){
this.loading=true;
this.posts=runInInjectionContext( this.injector,()=> toSignal(this.postservice.getPosts(this.currentpage,this.limit), {initialValue:null}) )

console.log(this.posts())
console.log(this.posts()?.headers.get('X-Total-Count'))
}


}
