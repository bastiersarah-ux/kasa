import ChatClient from "./ChatClient";

export default async function MessagesPage() {
  const threads = [
    {
      id: 1,
      username: "Utilisateur",
      avatar: "",
      lastMessage: "Bonjour, votre appartement est-il dispo ?",
      date: "11:04 am",
    },
  ];

  const messages = [
    {
      id: 1,
      content:
        "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      date: "11:04pm",
      isOwner: false,
    },
    {
      id: 2,
      content:
        "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
      date: "11:04pm",
      isOwner: true,
    },
  ];

  return <ChatClient threads={threads} messages={messages} />;
}
