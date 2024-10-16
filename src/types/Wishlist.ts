export type TLink = {
  url: string;
}

export type TWishlistItem = {
  name: string;
  description: string;
  imageUrl: string;
  links: TLink[];
  position: number;
  createdAt: string;
  updatedAt: string;
}

export type TWishlist = {
  id?: string;
  uid?: string;
  type: 'public' | 'private' | 'shared' | 'secret';
  title: string;
  comment: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  items: TWishlistItem[];
}