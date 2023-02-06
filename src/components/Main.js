import React, { useState } from "react";
import GlobalTx from "./GlobalTx";
import RecentTx from "./RecentTx";
import Recipients from "./Recipients";
import Send from "./Send";

const Main = () => {
  const [route, setRoute] = useState("send");

  return (
    <div className="w-full mt-12 flex flex-col justify-center items-center">
      <div
        className="flex justify-around text-lg font-medium items-center bg-gray-900 
      border-2 border-b-0 text-white border-opacity-50 border-blue-800 rounded-t-lg w-1/2"
      >

      {/* send  */}
      <li
        onClick={() => setRoute("send")}
        className={`list-none cursor-pointer py-2 w-1/4 ${
          route == "send" ? "bg-black bg-opacity-60" : "bg-gray-900"
        } text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}
        >
        Send
      </li>
      {/* recipients  */}
      <li
        onClick={() => setRoute("recipients")}
        className={`list-none cursor-pointer py-2 w-1/4 ${
          route == "recipients" ? "bg-black bg-opacity-60" : "bg-gray-900"
        } text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}
        >
        Recipients
      </li>
      {/* Recent Tx  */}
      <li
        onClick={() => setRoute("recent_tx")}
        className={`list-none cursor-pointer py-2 w-1/4 ${
          route == "recent_tx" ? "bg-black bg-opacity-60" : "bg-gray-900"
        } text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}
        >
        Recent Tx
      </li>
      {/* global Tx  */}
      <li
        onClick={() => setRoute("")}
        className={`list-none cursor-pointer py-2 w-1/4 ${
          route == "" ? "bg-black bg-opacity-60" : "bg-gray-900"
        } text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}
        >
        Global TX
      </li>
      </div>

      <div
        className="bg-black bg-opacity-60 pb-5 overscroll-y-auto border-2 
      border-t-0 shadow-lg border-opacity-50 border-blue-800 rounded-b-lg w-1/2"
      >
        {route == "send" ? (
          <Send />
        ) : route == "recipients" ? (
          <Recipients />
        ) : route == "recent_tx" ? (
          <RecentTx />
        ) : (
          <GlobalTx />
        )}
      </div>
    </div>
  );
};

export default Main;
