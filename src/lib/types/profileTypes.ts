export type GetProfileResponse  = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string;
  aboutMe: string;
  avatars: Array<{
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
  }>;
  createdAt: string;
}

