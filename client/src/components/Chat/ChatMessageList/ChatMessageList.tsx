/* eslint-disable no-nested-ternary */
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";
import { Match } from "../../../types/matches";
import ChatMessage from "../ChatMessage/ChatMessage";

function ChatMessageList({
  activeMatchId,
  matchData,
}: {
  activeMatchId: number;
  matchData: Match;
}) {
  const chat = useQuery({
    queryKey: ["chat", activeMatchId],
    queryFn: () => api.chats.getChat(activeMatchId),
  });

  return (
    <div className="flex max-h-96 flex-col space-y-4 pb-10">
      <div className="flex scroll-p-0 flex-col-reverse overflow-y-scroll py-2 px-4">
        {!(activeMatchId === 0) ? (
          chat?.data?.length !== 0 ? (
            chat.data?.map((message) => (
              <ChatMessage
                key={message.id as number}
                id={message.id as number}
                senderId={message.sender_id}
                date={message.created_at as string}
                content={message.message}
                avatar={
                  (matchData?.mentor?.user?.profile_picture ||
                    matchData?.mentee?.user?.profile_picture) as string
                }
              />
            ))
          ) : (
            <div>
              <p className="text-center">No messages yet.</p>
              <p className="text-center">Be the first to make a move!</p>
            </div>
          )
        ) : (
          <div className="text-center">Please select a match.</div>
        )}
      </div>
    </div>
  );
}

export default ChatMessageList;
