"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigation } from "@/app/context/NavigationContext";
import styles from "./ChatClient.module.css";

type Thread = {
  id: number;
  username: string;
  avatar: string;
  lastMessage: string;
  date: string;
};

type Message = {
  id: number;
  content: string;
  date: string;
  isOwner: boolean;
};

type ChatProps = {
  threads: Thread[];
  messages: Message[];
};

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
