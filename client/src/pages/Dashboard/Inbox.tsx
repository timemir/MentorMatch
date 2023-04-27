import ChatBox from "../../components/Chat/ChatBox/ChatBox";

export default function Inbox() {
  return (
    <div className="w-screen md:p-16">
      <h1 className="mb-4 font-oswald text-5xl">Inbox</h1>
      <p className="mb-10">
        Connect with your matches to get the most out of your experience.
      </p>
      {/* Chat Window */}
      <ChatBox />
    </div>
  );
}
