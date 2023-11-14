import { SocketContext } from "@/app/socket-provider";
import { Channel } from "phoenix";
import { useContext, useEffect, useState } from "react";

const useChannel = (channelName: string) => {
  const [channel, setChannel] = useState<Channel>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const chnl = socket?.channel(channelName);

    chnl?.join().receive("ok", () => {
      setChannel(chnl);
    });

    // leave the channel when the component unmounts
    return () => {
      chnl?.leave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // only connect to the channel once on component mount
  // by passing the empty array as a second arg to useEffect

  return [channel];
};

export default useChannel;
