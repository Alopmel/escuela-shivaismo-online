// src/app/types/types.ts

export interface Favorite {
  id: string;
  userId: string;
  videoId: string | null;
  category: string;
  videoTitle: string;
  url: string;
  creationDate: string;
  lastView: string | null;
  key: string; // Añade esta propiedad
}

export interface WatchLater {
  id: string;
  userId: string;
  videoId: string | null;
  category: string;
  videoTitle: string;
  url: string;
  creationDate: string;
  lastView: string | null;
  key: string; // Añade esta propiedad
}

export interface Progress {
  id: string,
  userId: string,
  url: string,
  videoId: string | null;
  videoTitle: string,
  creationDate: string,
}


export interface Comment {
  id: string;
  userId: string;
  videoId: string | null;
  userName: string;
  text: string;
  creationDate: string;
}