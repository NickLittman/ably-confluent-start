"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Ably from "ably";
import { useChannel } from "@ably-labs/react-hooks";

export default function Home() {
  const [messages, setMessages] = useState<Ably.Types.Message[]>([]);
  const [modalMessage, setModalMessage] = useState<Ably.Types.Message | null>();

  useEffect(() => {
    if (messages.length > 100) {
      setMessages(messages.slice(1));
    }
  }, [messages]);

  const handleClick = (message: Ably.Types.Message) => {
    setModalMessage(message);
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  const [channel] = useChannel(
    "ably_test_2",
    async (newMessage: Ably.Types.Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  );
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

      <div className="grid grid-cols-3 gap-4 p-4">
        {messages.map((message, index) => (
          <div
            onClick={() => handleClick(message)}
            key={index}
            className="p-4 border border-gray-700 rounded shadow-lg transform transition-transform duration-500 hover:scale-105"
          >
            <h1 className="text-3xl font-extrabold">{index}</h1>
            <h2 className="text-xl font-bold">{message.id}</h2>
            <p className="mt-2 text-gray-700 dark:text-white">{message.data}</p>
          </div>
        ))}
      </div>
      <div>
        {modalMessage && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={closeModal}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {modalMessage.id}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{modalMessage.data}</p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
