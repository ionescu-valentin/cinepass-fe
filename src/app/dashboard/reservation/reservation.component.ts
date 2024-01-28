import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomRows, RoomStatus } from 'src/app/_core/constants/cinemas.const';
import { Cinema, Movie, Time } from 'src/app/_core/models/movies.model';
import { Seat } from 'src/app/_core/models/room.model';
import { MoviesApiService } from 'src/app/_core/services/movies-api.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private moviesApiService = inject(MoviesApiService);
  roomDetails = [...RoomRows];
  cinemaDetails: Cinema;
  movieDetails: Movie;
  timeDetails: Time;

  ngOnInit(): void {
    const data = this.route.snapshot.queryParams;
    this.moviesApiService.getMovieById(data['movieId'], data['timeId']).subscribe((res) => {
      this.movieDetails = res.movieDetails;
      this.cinemaDetails = this.movieDetails.Cinemas.find((cinema) => cinema.id === parseInt(data['cinemaId']));
      this.timeDetails = this.cinemaDetails.times.find((time) => time.id === parseInt(data['timeId']));
      this.setSeats();
    });
  }

  setSeats(): void {
    this.roomDetails.forEach((row) => {
      row.seats = Array.from({ length: 10 }, (_, i) => ({ number: i + 1, status: RoomStatus.Available }));
    });
    this.timeDetails.seats.forEach((takenSeat) => {
      const seatNumber = takenSeat.toString();
      const rowIndex = seatNumber.length === 2 ? parseInt(seatNumber[0]) : 0;
      this.roomDetails[rowIndex].seats[parseInt(rowIndex === 0 ? seatNumber[0] : seatNumber[1])].status = RoomStatus.Reserved;
    });
  }

  selectSeat(seat: Seat): void {
    if (seat.status === RoomStatus.Available) {
      seat.status = RoomStatus.Selected;
    } else if (seat.status === RoomStatus.Selected) {
      seat.status = RoomStatus.Available;
    }
  }

  reserveSeats(): void {
    this.moviesApiService.reserveSeats(this.selectedSeatsNumbers, this.timeDetails.id).subscribe((res) => {
      this.router.navigate(['/dashboard/tickets'], { queryParams: { movieId: this.movieDetails.imdbID, cinemaId: this.cinemaDetails.id, timeId: this.timeDetails.id, seats: this.selectedSeatsList } });
    });
  }

  get selectedSeatsList(): string[] {
    const selectedSeats = [];
    this.roomDetails.forEach((row) => {
      row.seats.forEach((seat) => {
        if (seat.status === RoomStatus.Selected) {
          selectedSeats.push(`${row.letter}${seat.number}`);
        }
      });
    });
    return selectedSeats;
  }

  get selectedSeatsNumbers(): number[] {
    const selectedSeats = [];
    this.roomDetails.forEach((row, rowIndex) => {
      row.seats.forEach((seat) => {
        if (seat.status === RoomStatus.Selected) {
          selectedSeats.push(`${rowIndex === 0 ? '' : rowIndex}${seat.number - 1}`);
        }
      });
    });
    return selectedSeats;
  }
}
