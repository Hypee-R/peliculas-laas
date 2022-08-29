import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Movies } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { VariablesService } from 'src/app/services/variablesGL.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonSearchbar, {static: true }) ionSearchBar: IonSearchbar;

  movies: Movies[];
  isModalOpen: boolean;
  isSearch: boolean;
  querySearch: string;
  movieSelected: Movies;

  constructor(
    private moviesService: MovieService,
    private variablesGL: VariablesService,
  ) {
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(){
    this.variablesGL.loadingActionShow('Espere por favor...');
    setTimeout(() => {
      this.moviesService.getMovies().subscribe(response => {
        this.movies = response;
        console.log('peliculas ', response[0]);
        this.variablesGL.loadingActionDismiss();
      },
      err => {
        console.log('Error al obtener las peliculas');
        this.variablesGL.loadingActionDismiss();
      });
    }, 2000);
  }

  searchMovies(query: string){
    this.moviesService.searchMovieByQuery(query).subscribe(response => {
        this.movies = [];
        this.movies = response;
        console.log('result query peliculas ', response);
        this.isSearch = false;
    },
    err => {
      console.log('Error al filtrar las peliculas y series');

      this.getMovies();
      this.isSearch = false;
    });
  }

  search(){
    this.isSearch = true;
    // this.querySearch = event.detail.value.toLowerCase();
    this.querySearch = this.ionSearchBar.value.toLowerCase();
    console.log('input query', this.querySearch);
    if(this.querySearch.length > 0){
      this.searchMovies(this.querySearch);
    }else{
      this.isSearch = false;
      this.getMovies();
    }
  }

  showDetails(movie: Movies){
    this.movieSelected = movie;
    this.isModalOpen = true;
  }

  hideDetails(){
    this.movieSelected = null;
    this.isModalOpen = false;
  }

  cerrarSesion(){
    this.ionSearchBar.value = "";
    // this.ngOnDestroy();
    this.variablesGL.removeCredentials();
  }

}
