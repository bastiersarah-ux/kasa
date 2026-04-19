/**
 * @module ChatClient
 * @description Composant client de l'interface de messagerie.
 * Affiche la liste des conversations et les messages avec une vue responsive.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigation } from "@/app/context/NavigationContext";
import styles from "./ChatClient.module.css";

/** Fil de discussion (conversation) */
type Thread = {
  /** Identifiant unique */
  id: number;
  /** Nom de l'interlocuteur */
  username: string;
  /** URL de l'avatar */
  avatar: string;
  /** Dernier message de la conversation */
  lastMessage: string;
  /** Date du dernier message */
  date: string;
};

/** Message individuel dans une conversation */
type Message = {
  /** Identifiant unique */
  id: number;
  /** Contenu textuel du message */
  content: string;
  /** Date d'envoi */
  date: string;
  /** `true` si le message est de l'utilisateur connecté */
  isOwner: boolean;
};

/** Props du composant ChatClient */
type ChatProps = {
  /** Liste des fils de discussion */
  threads: Thread[];
  /** Liste des messages de la conversation sélectionnée */
  messages: Message[];
};

/**
 * Interface de messagerie responsive.
 * - **Desktop** : sidebar + messages côte à côte
 * - **Mobile** : navigation entre la liste des conversations et les messages
 * @param props - Fils de discussion et messages
 * @returns L'interface de chat complète
 */

export default function ChatClient({ threads, messages }: ChatProps) {
  const router = useRouter();
  const { hasPreviousRoute } = useNavigation();
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [mobileView, setMobileView] = useState<"threads" | "messages">(
    "threads",
  );

  const handleSelectThread = (thread: Thread) => {
    setSelectedThread(thread);
    setMobileView("messages");
  };

  const handleBackToThreads = () => {
    setMobileView("threads");
  };

  const handleBack = () => {
    if (hasPreviousRoute) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      {/* SIDEBAR */}
      <div
        className={`${styles.sidebar} ${mobileView === "threads" ? styles.mobileVisible : styles.mobileHidden}`}
      >
        <div className={styles.sidebarHeader}>
          <button className="btn btn-grey btn-sm mb-4" onClick={handleBack}>
            ← Retour
          </button>
          <h1 className={styles.title}>Messages</h1>
        </div>

        {threads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => handleSelectThread(thread)}
            className={`${styles.threadItem} ${
              selectedThread?.id === thread.id ? styles.threadActive : ""
            }`}
          >
            <div className={styles.avatar}></div>

            <div className={styles.threadContent}>
              <div className={styles.threadTop}>
                <span className={styles.threadName}>{thread.username}</span>
                <span className={styles.threadTime}>{thread.date}</span>
              </div>

              <span className={styles.threadMessage}>{thread.lastMessage}</span>
            </div>

            <div className={styles.unreadDot}></div>
          </div>
        ))}
      </div>

      <div
        className={`${styles.messages} ${mobileView === "messages" ? styles.mobileVisible : styles.mobileHidden}`}
      >
        <div className={styles["btn-return-container"]}>
          <button
            className={`btn btn-grey btn-sm mb-4 ${styles.backToThreads}`}
            onClick={handleBackToThreads}
          >
            ← Retour
          </button>
        </div>
        <section>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageRow} ${
                msg.isOwner ? styles.messageRight : styles.messageLeft
              }`}
            >
              <div>
                {/* HEADER (avatar + date) */}
                <div
                  className={`${styles.messageHeader} ${
                    msg.isOwner ? styles.messageHeaderRight : ""
                  }`}
                >
                  {!msg.isOwner && <div className={styles.messageAvatar}></div>}

                  <span className={styles.messageMeta}>
                    Utilisateur • {msg.date}
                  </span>

                  {msg.isOwner && <div className={styles.messageAvatar}></div>}
                </div>

                {/* BULLE */}
                <div
                  className={`${styles.messageBubble} ${
                    msg.isOwner
                      ? styles.messageOutgoing
                      : styles.messageIncoming
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* INPUT */}
      <div
        className={`${styles.inputContainer} ${mobileView === "messages" ? styles.mobileVisible : styles.mobileHidden}`}
      >
        <label htmlFor="chat-message" className="sr-only">
          Envoyer un message
        </label>
        <textarea
          id="chat-message"
          className={styles.textarea}
          placeholder="Envoyer un message"
        />
        <button className={styles.sendButton}>↑</button>
      </div>
    </div>
  );
}
