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

export type TWishlistData = {
  title: string;
  comment: string;
  items: TWishlistItem[];
}

export type TWishlist = {
  id?: string;
  nonce?: string;
  uid?: string;
  type: 'public' | 'private' | 'shared' | 'secret';
  icon: string;
  data: TWishlistData;
  createdAt: string;
  updatedAt: string;
}

export type TEncryptedWishlist = Omit<TWishlist, 'data'> & {
  data: string;
};