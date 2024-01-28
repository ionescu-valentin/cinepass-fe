import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from 'src/app/_core/models/movies.model';
import { MoviesApiService } from 'src/app/_core/services/movies-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private moviesApiService = inject(MoviesApiService);
  movies: Movie[] = [];
  selectedMovie: Movie;
  showCinemas: boolean;

  ngOnInit(): void {
    this.moviesApiService.getMovies().subscribe((res) => {
      this.movies = res.Search;
      this.setSelectedMovie(this.movies[0].imdbID).subscribe((res) => {
        this.selectedMovie = res;
      });
    });
  }

  selectMovie(movie: Movie): void {
    this.setSelectedMovie(movie.imdbID).subscribe((res) => {
      this.selectedMovie = res;
    });
  }

  setSelectedMovie(id: string): Observable<Movie> {
    return this.moviesApiService.getMovieById(id).pipe(map((res) => {
      const movie = res.movieDetails;
      return movie;
    }));
  }
}
