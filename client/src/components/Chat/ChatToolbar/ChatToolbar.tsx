import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { RxPaperPlane } from "react-icons/rx";
import api from "../../../api/api";
import useAuthStore from "../../../store/authStore";
import { Chat } from "../../../types/chats";
import { Match } from "../../../types/matches";

export default function ChatToolbar({
  activeMatchId,
  matchData,
}: {
  activeMatchId: number;
  matchData: Match;
}) {
  const [message, setMessage] = useState<string>("");
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const messageMutation = useMutation({
    mutationFn: (chat: Chat) => api.chats.addChat(chat),
    onSuccess: () => {
      queryClient.invalidateQueries(["chat", activeMatchId]);
      setMessage("");
    },
  });

  function handleSendMessage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    // Create a chat entry
    const chat: Chat = {
      match_id: activeMatchId,
      sender_id: user.id,
      reciever_id: (matchData?.mentee
        ? matchData?.mentee?.user?.id
        : matchData?.mentor?.user?.id) as number,
      message,
    };
    // Send chat entry, if there is a user message
    if (message) {
      messageMutation.mutate(chat);
    }
  }

  return (
    <>
      {messageMutation.isError && (
        <div className="bg-red-200 text-center text-red-600">
          Error - Could not send message. Please try again.
        </div>
      )}
      <form className="absolute bottom-0 flex h-10 w-full rounded-t-lg bg-gray-300 p-2">
        <input
          type="text"
          name=""
          id=""
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full rounded-lg border-transparent placeholder:text-sm"
        />
        <button
          type="submit"
          className="ml-4 mr-2 rounded-lg bg-mentorCTA px-4 hover:bg-mentorCTA400"
          onClick={handleSendMessage}
        >
          <RxPaperPlane className="text-white" />
        </button>
      </form>
    </>
  );
}
