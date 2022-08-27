import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movies } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    public http: HttpClient
  ){}

  getMovies(){
    return this.http.get('https://api.tvmaze.com/shows')
                    .pipe(
                      map( (resp: Movies[]) => resp )
                    );
  }

  searchMovieByQuery(query: string){
    return this.http.get(`https://api.tvmaze.com/search/shows?q=${query}`)
                    .pipe(
                      map( (resp:any[]) => {
                        let respuesta:Movies[] = resp.map(data => data.show);
                        // console.log('data ', respuesta);
                        return respuesta;
                      })
                    );
  }

}
