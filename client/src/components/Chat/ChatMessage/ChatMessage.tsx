import { Avatar } from "flowbite-react";
import useAuthStore from "../../../store/authStore";

export default function ChatMessage({
  key,
  id,
  senderId,
  content,
  date,
  avatar,
}: {
  key: number;
  id: number;
  senderId: number;
  content: string;
  date: string;
  avatar: string;
}) {
  const auth = useAuthStore();

  function fromUser(sender: number) {
    return auth.user.id === sender;
  }
  function transformDate(dateStr: string) {
    const newDate = new Date(dateStr);
    const currentYear = new Date().getFullYear();
    const displayYear =
      newDate.getFullYear() === currentYear ? "" : `.${newDate.getFullYear()}`;
    const formattedDate = `${newDate.getDate()}.${
      newDate.getMonth() + 1
    }${displayYear}`;
    const formattedTime = newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} | ${formattedTime}`;
  }

  return (
    <div
      key={key}
      className={`min-h-16 my-1 items-center space-x-2 rounded-lg ${
        fromUser(senderId) ? "bg-blue-200" : "bg-gray-200"
      } p-2 `}
    >
      <div
        className={`flex items-center space-x-2 ${
          fromUser(senderId) ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {!fromUser(senderId) && <Avatar img={avatar} size="xs" />}
        <p className=" px-2">
          {key}
          {content}
        </p>
      </div>
      <div
        className={`flex w-full ${
          fromUser(senderId) ? "flex-row" : "flex-row-reverse"
        } px-2 pt-1`}
      >
        <span className="text-xs">{transformDate(date)}</span>
      </div>
    </div>
  );
}
