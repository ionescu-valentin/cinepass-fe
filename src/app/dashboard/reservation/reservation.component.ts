import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cinemas, RoomRows, RoomStatus } from 'src/app/_core/constants/cinemas.const';
import { Cinema, Movie, Time } from 'src/app/_core/models/movies.model';
import { Seat } from 'src/app/_core/models/room.model';
import { MoviesApiService } from 'src/app/_core/services/movies-api.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private moviesApiService = inject(MoviesApiService);
  roomDetails = [...RoomRows];
  cinemaDetails: Cinema;
  movieDetails: Movie;
  timeDetails: Time;

  ngOnInit(): void {
    const data = this.route.snapshot.queryParams;
    this.cinemaDetails = Cinemas.find((cinema) => cinema.name === data['cinema']);
    this.timeDetails = {...this.cinemaDetails.times.find((time) => time.id === data['timeId'])};
    this.setSeats();
    this.moviesApiService.getMovieById(data['movieId']).subscribe((res) => {
      this.movieDetails = res;
    });
  }

  setSeats(): void {
    const getRandomRowNumber = () => {
      const randomRowNumber = Math.floor(Math.random() * 8);
      return this.roomDetails[randomRowNumber].seats.some((seat) => seat.status === RoomStatus.Reserved) ? randomRowNumber : getRandomRowNumber();
    }
    const getRandomSeatNumber = (rowIndex: number) => {
      const randomSeatNumber = Math.floor(Math.random() * 10);
      return this.roomDetails[rowIndex].seats[randomSeatNumber].status === RoomStatus.Reserved ? randomSeatNumber : getRandomSeatNumber(rowIndex);
    }
    const availableSeatsPerRow = Math.ceil(this.roomDetails.length / this.timeDetails.spotsLeft);
    this.roomDetails.forEach((row) => {
      row.seats = Array.from({ length: 10 }, (_, i) => ({ number: i + 1, status: RoomStatus.Reserved }));
    });
    const rowsWithAvailableSeats = Math.ceil(this.timeDetails.spotsLeft / availableSeatsPerRow);
    for (let i = 0; i < rowsWithAvailableSeats; i++) {
      if (this.timeDetails.spotsLeft === 0) return;
      const randomRowNumber = getRandomRowNumber();
      for (let i = 0; i < availableSeatsPerRow; i++) {
        if (this.timeDetails.spotsLeft === 0) return;
        const randomSeatNumber = getRandomSeatNumber(randomRowNumber);
        this.roomDetails[randomRowNumber].seats[randomSeatNumber].status = RoomStatus.Available;
        this.timeDetails.spotsLeft--;
      }
    }
  }

  selectSeat(seat: Seat): void {
    if (seat.status === RoomStatus.Available) {
      seat.status = RoomStatus.Selected;
    } else if (seat.status === RoomStatus.Selected) {
      seat.status = RoomStatus.Available;
    }
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
}
