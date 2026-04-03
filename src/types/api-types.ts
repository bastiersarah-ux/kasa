export type Role = "owner" | "client" | "admin";

export type BaseUser = {
  id: number;
  name: string;
  picture?: string | null;
};

export type UserListItem = BaseUser & {
  role: Role;
};

export type AuthUser = UserListItem & {
  email?: string | null;
};

export type CreateUserInput = {
  name: string;
  picture?: string | null;
  role?: Role;
};

export type UpdateUserInput = {
  name?: string;
  picture?: string | null;
  role?: Role;
};

export type AuthTokenPayload = {
  id: number;
  role: Role;
  name: string;
  email: string | null;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  picture?: string | null;
  role?: Extract<Role, "owner" | "client">;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RequestResetInput = {
  email: string;
};

export type ResetPasswordInput = {
  token: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type RequestResetResponse = {
  ok: true;
  message: string;
  token?: string;
};

export type ResetPasswordResponse = {
  ok: true;
};

export type HostSummary = {
  id: number;
  name: string;
  picture?: string | null;
};

export type PropertySummary = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  cover?: string | null;
  location?: string | null;
  price_per_night: number;
  rating_avg: number;
  ratings_count: number;
  host?: HostSummary;
};

export type PropertyDetails = PropertySummary & {
  pictures: string[];
  equipments: string[];
  tags: string[];
};

export type CreatePropertyInput = {
  id?: string;
  title: string;
  description?: string | null;
  cover?: string | null;
  location?: string | null;
  price_per_night?: number;
  host_id?: number;
  host?: {
    name: string;
    picture?: string | null;
  };
  pictures?: string[];
  equipments?: string[];
  tags?: string[];
};

export type UpdatePropertyInput = {
  title?: string;
  description?: string | null;
  cover?: string | null;
  location?: string | null;
  price_per_night?: number;
  host_id?: number;
  host?: {
    name: string;
    picture?: string | null;
  };
};

export type RatingUser = BaseUser;

export type Rating = {
  id: number;
  score: number;
  comment?: string | null;
  created_at: string;
  user: RatingUser;
};

export type AddRatingInput = {
  user_id: number;
  score: number;
  comment?: string | null;
};

export type RatingsSummary = {
  rating_avg: number;
  ratings_count: number;
  ratings: Rating[];
};

export type FavoriteListItem = PropertySummary;

export type FavoriteActionResponse = {
  ok: true;
};

export type UploadPurpose =
  | "property-cover"
  | "property-picture"
  | "user-picture"
  | "other"
  | null;

export type UploadImageResponse = {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  purpose: UploadPurpose;
  property_id?: string;
  instructions: string;
};

export type DeleteImageStatus = "deleted" | "not_found" | "error";

export type DeleteImageResult = {
  filename: string;
  status: DeleteImageStatus;
  error?: string;
};

export type DeleteImagesResponse = {
  ok: boolean;
  deleted: string[];
  not_found: string[];
  errors: { filename: string; error: string }[];
  results: DeleteImageResult[];
};

export type ApiError = {
  error: string;
};
