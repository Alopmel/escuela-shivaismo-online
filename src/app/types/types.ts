// types.ts

export interface Favorite {
    id: string;
    userId: string;
    videoId: string | null;
    category: string;
    videoTitle: string;
    url: string;
    creationDate: string;
    lastView: string | null;
  }
  