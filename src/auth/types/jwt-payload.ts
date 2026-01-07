export interface jwtPayload {
  sub: string;
  email: string;
  provider: string;
}

export interface ValidateUser {
  email: string;
  provider: string;
  password?: string;
}

export interface CreateValidateUser extends ValidateUser {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  image?: string;
}

export interface SocialMediaValidateUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  provider: string;
  image: string;
}
