export type Chat = {
  id?: number;
  match_id: number;
  sender_id: number;
  reciever_id: number;
  message: string;
  created_at?: string;
  updated_at?: string;
};
