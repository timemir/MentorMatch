export type User = {
  id: number;
  bio: string;
  country_id: number;
  created_at: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  first_name: string;
  last_name: string;
  job_title: string;
  company: string;
  hashed_password: string; // to be removed
  salt: string; // to be removed
  profile_picture: string;
  is_mentor: boolean;
  is_superuser: boolean;
  is_active: boolean;
};

export type UserOnboard = {
  first_name: string;
  last_name: string;
  profile_picture: string;
  bio: string;
  job_title: string;
  company: string;
  country_code: string;
};
