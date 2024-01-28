import { SeatsRow } from "../models/room.model";

export const RoomRows: SeatsRow[] = [
  {
    letter: "A",
    seats: []
  },
  {
    letter: "B",
    seats: []
  },
  {
    letter: "C",
    seats: []
  },
  {
    letter: "D",
    seats: []
  },
  {
    letter: "E",
    seats: []
  },
  {
    letter: "F",
    seats: []
  },
  {
    letter: "G",
    seats: []
  },
  {
    letter: "H",
    seats: []
  }
];

export enum RoomStatus {
  Available = "available",
  Reserved = "reserved",
  Selected = "selected"
}
