export interface Match {
  updated_at: Date;
  mentor_id: number;
  mentee_id: number;
  start_date: Date;
  mentoring_type: null;
  created_at: Date;
  id: number;
  status: string;
  end_date: null;
  schedule: null;
  mentee?: Mentee;
  mentor?: Mentor;
}

export interface MatchSuggestion {
  mentor: Mentor;
  score: number;
}

export interface Mentee {
  updated_at: Date;
  created_at: Date;
  user_id: number;
  years_of_experience: number;
  description: string;
  linked_in: null;
  id: number;
  availability: string;
  mentoring_type: string;
  rating: number;
  user: User;
}
export interface Mentor {
  updated_at: Date;
  created_at: Date;
  user_id: number;
  years_of_experience: number;
  description: string;
  linked_in: null;
  id: number;
  availability: string;
  mentoring_type: string;
  rating: number;
  user: User;
}

export interface User {
  profile_picture: string;
  id: number;
  first_name: string;
  last_name: string;
  is_mentor: boolean;
  gender: string;
  is_active: boolean;
  email: string;
  age: number;
  is_superuser: boolean;
  email_verified: boolean;
  bio: string;
  rating: number;
  salt: string;
  job_title: string;
  created_at: Date;
  hashed_password: string;
  company: string;
  updated_at: null;
  country_code: string;
}
