export type Mentor = {
  id: number;
  availability: string;
  created_at: string;
  updated_at: string;
  description: string;
  linked_in: string;
  rating: number;
  user_id: number;
  years_of_experience: number;
  mentoring_type: string;
};

export type MentorAndUser = {
  id: number;
  first_name: string;
  created_at: string;
  last_name: string;
  updated_at: string;
  bio: string;
  email: string;
  country_id: number;
  email_verified: boolean;
  profile_picture: string;
  salt: string; // to be removed
  is_mentor: boolean;
  job_title: string;
  company: string;
  hashed_password: string; // to be removed
  is_active: boolean;
  is_superuser: boolean;
  user_id: number;
  years_of_experience: number;
  description: string;
  linked_in: string;
  availability: string;
  mentoring_type: string;
  rating: GLfloat;
};
