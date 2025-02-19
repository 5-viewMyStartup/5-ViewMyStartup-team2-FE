"use client";

import { useEffect, useState } from "react";
import { serverState } from "@/global/store/ServerState";
import { MainLoding } from "@/global/components/MainLoding";
import Main from "./main/page";

export default function Home() {
  const [server, setServer] = useState<boolean>();

  useEffect(() => {
    const fetchServerState = async () => {
      const storedServerState = sessionStorage.getItem("serverState");

      if (storedServerState === "true") {
        setServer(true);
        return;
      }

      const serverStatus = await serverState();

      if (serverStatus === "activate") {
        setServer(true);
        sessionStorage.setItem("serverState", "true");
      }
    };

    fetchServerState();
  }, []);

  return server ? <Main /> : <MainLoding />;
}
