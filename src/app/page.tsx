'use client';
import Image from "next/image";
import { useEffect, useState } from 'react'
import Ably from 'ably'
import { useChannel } from "@ably-labs/react-hooks";


export default function Home() {
  const [messages, setMessages] = useState<Ably.Types.Message[]>([]);

  useEffect(() => {
    if (messages.length > 100) {
      setMessages(messages.slice(1));
    }
  }, [messages]);

  const [channel] = useChannel("ably_test_2", async (newMessage: Ably.Types.Message) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a  
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/ably.png"
              alt="Ably Logo"
              className="dark:invert"
              width={50}
              height={24}
              priority
            />
            <Image
              src="/confluent.png"
              alt="Confluent Logo"
              className="dark:invert"
              width={50}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div>
      {messages.map((message, index) => <p key={index}>{message.data}</p>)}
    </div>

    </main>
  );
}
