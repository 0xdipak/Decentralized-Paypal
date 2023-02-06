import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../App";

const RecentTx = () => {
  const App = useContext(AppState);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const tx = await App.paypalContract.filters.transactions(App.address);
      const txData = await App.paypalContract.queryFilter(tx);
      setData(txData);
    };

    getData();
  },[]);

  return (
    <div className="flex justify-center items-center flex-col p-3 text-white">
      {data.map((e) => {
        return (
          <div
            className="bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80
              w-4/5 mt-2">
            <div className="flex w-full items-center justify-center rounded-t-lg">
              <div className="w-full py-2 px-2">
                <p className="text-xl font-mono">
                  Amount : {ethers.utils.formatEther(e.args.amount)}
                  {e.args.symbol}
                </p>
                <p className="text-xs font-mono">To : {e.args.to}</p>
              </div>
            </div>
            <a href={`${App.explorer}/tx/${e.transactionHash}`} target={"_blank"}>
              <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
                View Transaction
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default RecentTx;
