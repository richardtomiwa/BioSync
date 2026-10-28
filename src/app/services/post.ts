import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class Postservice {
    private api='https://jsonplaceholder.typicode.com/posts'

    private http= inject(HttpClient);

    getPosts(page:number, limit:number){
        const params=new HttpParams().set('_page',page).set('_limit', limit);
        return this.http.get<any[]>(this.api, {params,observe:'response'});
    }
}
