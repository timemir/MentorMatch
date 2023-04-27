import { Chat } from "../types/chats";
import BASE_URL from "./config";

async function addChat(chat: Chat): Promise<Chat> {
  const response = await fetch(
    `${BASE_URL}/chats/add`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        match_id: chat.match_id,
        sender_id: chat.sender_id,
        reciever_id: chat.reciever_id,
        message: chat.message,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function getChat(match_id: number): Promise<Chat[]> {
  const response = await fetch(
    `${BASE_URL}/chats/${match_id}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

const chats = {
  addChat,
  getChat,
};

export default chats;
