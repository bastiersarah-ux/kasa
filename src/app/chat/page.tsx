/**
 * @module MessagesPage
 * @description Page de messagerie.
 * Nécessite une authentification côté serveur.
 * Affiche les fils de discussion et les messages.
 */
import ChatClient from "./ChatClient";
import { requireAuth } from "@/helpers/require-auth";

/**
 * Page de messagerie serveur.
 * Vérifie l'authentification puis charge les données de chat.
 * @returns L'interface de messagerie
 */

export default async function MessagesPage() {
  // Vérification côté serveur
  await requireAuth();
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
