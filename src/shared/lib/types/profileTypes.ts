export type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

type UserMetadata = {
  following: number
  followers: number
  publications: number
}

export type PublicProfile = {
  id: number
  userName: string
  aboutMe: string
  avatars: Avatar[]
  userMetadata: UserMetadata
  hasPaymentSubscription: boolean
}

export type GetProfileResponse = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string;
  aboutMe: string;
  avatars: Avatar[];
  createdAt: string;
}

export type ErrorResponse = {
  statusCode: number;
  messages: {
    message: string;
    field: string;
  }[];
  error: string;
};

export type AvatarResponse = {
  avatars: Avatar[]
}