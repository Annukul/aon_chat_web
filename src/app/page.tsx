"use client";

import useChannel from "@/hooks/use-channel";
import { SocketProvider } from "./socket-provider";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <SocketProvider>
      <main>
        <Chat />
      </main>
    </SocketProvider>
  );
}

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [msgArr, setMsgArr] = useState<string[]>([]);

  const [chatChannel] = useChannel("room:*");

  useEffect(() => {
    if (!chatChannel) return;

    const _msgArr = [...msgArr];
    chatChannel.on("new_msg", (res) => {
      _msgArr.push(res?.params?.msg);
    });
    setMsgArr(_msgArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatChannel]);

  return (
    <div className="p-8 flex flex-col gap-4">
      <div>
        {msgArr.map((msg) => {
          return <p key={msg}>{msg}</p>;
        })}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="bg-gray-400 h-8 w-60 border rounded-md"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          onClick={() => {
            if (!chatChannel) return;
            chatChannel.push("new_msg", { msg });
          }}
          className="px-4 py-1 border border-gray-500"
        >
          send
        </button>
      </div>
    </div>
  );
};
