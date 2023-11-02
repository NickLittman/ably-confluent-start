"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Ably from "ably";
import { useChannel } from "ably/react"
import DisplayJson from "./components/DisplayJson";

import chroma from 'chroma-js'; 


function generateColor(str: string) {
  let total = 0;
  for(let i = 0; i < str.length; i++) {
    total += str.charCodeAt(i);
  }
  const randomness = total % 100 / 100;

  const baseColor = chroma('blue');
  const themedColor = baseColor.luminance(randomness * 0.6 + 0.2).saturate(1 - randomness);
  
  return themedColor.css();
}


function decodeArrayBuffer(buffer: ArrayBuffer) {
  var decoder = new TextDecoder('utf-8');
  var data = new Uint8Array(buffer);
  var decodedString = decoder.decode(data);
  return decodedString;
}

export default function Home() {
  const [messages, setMessages] = useState<Ably.Types.Message[]>([]);
  const [modalMessage, setModalMessage] = useState<Ably.Types.Message | null>();
  const [idColorPairs, setIdColorPairs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (messages.length > 9) {
      let messageIdToRemove = messages[0].id;
      setMessages(messages.slice(1));
      setIdColorPairs((prevIdColorPairs) => {
        delete prevIdColorPairs[messageIdToRemove];
        return prevIdColorPairs;
      }
      );
    }
  }, [messages]);

  const handleClick = (message: Ably.Types.Message) => {
    setModalMessage(message);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  const closeModal = () => {
    setModalMessage(null);
  };

useChannel(
    "orders",
    async (newMessage: Ably.Types.Message) => {
      var decodedData = decodeArrayBuffer(newMessage.data);
      newMessage.data = decodedData;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setIdColorPairs((prevIdColorPairs) => {
        prevIdColorPairs[newMessage.id] = generateColor(decodedData);
        return prevIdColorPairs;
      }
      );
    }
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <button onClick={handleClearMessages} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Reset</button>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://ably.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ably-logo.png"
              alt="Ably Logo"
              className="dark:invert"
              width={50}
              height={24}
              priority
            />
            </a>
            <a 
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.confluent.io/"
            target="_blank"
            rel="noopener noreferrer">
            <Image
              src="/confluent-logo.png"
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
            style={{backgroundColor: idColorPairs[message.id]}}
          >
            <h1 className="text-3xl font-extrabold">{message.id}</h1>
            <DisplayJson data={JSON.parse(message.data)} />

          </div>
        ))}
      </div>

      <div>
        {modalMessage && (
          <div className="fixed z-10 inset-0 overflow-y-auto dark:text-white">
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
              <div className="inline-block align-bottom bg-white dark:bg-black rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <h3
                    className="text-lg leading-6 font-extrabold text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    {modalMessage.id}
                  </h3>
                  <div className="mt-2">
                    <DisplayJson data={modalMessage} />
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
