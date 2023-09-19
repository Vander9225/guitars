export interface Guitar {
  image: string;
  model: string;
  brand: string;
  type: string;
  strings: number;
  description: string;
}

export interface BucketGuitar {
    guitar: string;
    quantity: number;
}
export interface Comment {
    id: string;
    comment: string;
    rate: number;
    date: string;
    email: string;
    vote: number;
  }
  