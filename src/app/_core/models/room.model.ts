import { RoomStatus } from "../constants/cinemas.const";

export interface SeatsRow {
  letter: string;
  seats: Seat[];
}

export interface Seat {
  number: number;
  status: RoomStatus;
}
