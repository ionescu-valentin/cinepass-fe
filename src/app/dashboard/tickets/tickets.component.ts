import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesApiService } from 'src/app/_core/services/movies-api.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private moviesApiService = inject(MoviesApiService);
  movieName: string;
  cinemaDetails: any;
  time: string;
  selectedSeats: string[];

  ngOnInit(): void {
    const data = this.route.snapshot.queryParams;
    this.moviesApiService.getMovieById(data['movieId'], data['timeId']).subscribe((res) => {
      this.movieName = res.movieDetails.Title;
      this.cinemaDetails = res.movieDetails.Cinemas.find((cinema) => cinema.id === parseInt(data['cinemaId']));
      this.time = this.cinemaDetails.times.find((time) => time.id === parseInt(data['timeId'])).time;
      this.selectedSeats = data['seats'];
    });
  }
}
