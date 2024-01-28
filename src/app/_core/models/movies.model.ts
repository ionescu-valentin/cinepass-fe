export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
  Cinemas: Cinema[];
  Genre: string;
  Runtime: string;
}

export interface Cinema {
  name: string;
  location: string;
  times: Time[];
  imageUrl: string;
  id: number;
}

export interface Time {
  id: number;
  seats: number[];
  time: string;
  spotsLeft: number;
}


