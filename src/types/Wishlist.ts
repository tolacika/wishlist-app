/*export type WishlistItem = {
  name: string;
  description: string;
  imageUrl: string;
  links: string[];
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Wishlist = {
  id?: string;
  uid?: string
  title: string;
  comment: string;
  icon: string;
  type: 'public' | 'private';
  createdAt: Date;
  updatedAt: Date;
  items: Array<WishlistItem>;
}*/

export interface Link {
  url: string;
}

export interface WishlistItem {
  name: string;
  description: string;
  imageUrl: string;
  links: Link[];
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface Wishlist {
  id?: string;
  uid?: string;
  type: 'public' | 'private';
  title: string;
  comment: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  items: WishlistItem[];
}