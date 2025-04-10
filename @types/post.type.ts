export type Post = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string; // or Date if you parse it
    uploadId: string;
  }[];
  createdAt: string; // or Date
  updatedAt: string; // or Date
  ownerId: number;
  avatarOwner: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};
