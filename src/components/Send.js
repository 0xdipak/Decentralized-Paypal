import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { BsChevronDown, BsCoin, BsWallet2 } from "react-icons/bs";
import { Bars, TailSpin } from "react-loader-spinner";
import { AppState } from "../App";


const Send = () => {
  const App = useContext(AppState);

  return (
    <div className="flex flex-col justify-center items-center text-white">
      {/* Balance  */}
      <div className="flex w-4/5 justify-around items-center mt-7">
        <div
          onClick={() => App.setShowErc(App.showErc ? false : true)}
          className="flex cursor-pointer justify-center items-center border-2 border-blue-900
             border-opacity-50 p-3 bg-black bg-opacity-70 rounded-lg"
        >
          <BsCoin size={20} />
          <h1 className="ml-2 text-lg font-medium">{App.currency}</h1>
          <BsChevronDown size={20} className="ml-2" />
        </div>

        <div className="flex items-center border-2 cursor-pointer border-blue-900 border-opacity-60 p-3 bg-black rounded-lg bg-opacity-70">
          <BsWallet2 className="ml-2" size={20} />
          <h1 className="ml-2 text-lg font-medium">Balance : </h1>
          <h1 className="ml-2 text-lg font-medium">
            {App.balance.slice(0, 5)} {App.symbol}
          </h1>
        </div>
      </div>

      {/* ERC-20  */}

      <div
        className={`${
          App.showErc ? "" : "hidden"
        } " flex w-4/5 justify-between items-center mt-5"`}
      >
        <input
          onChange={(e) => App.setErcTokenAddress(e.target.value)}
          value={App.ercTokenAddress}
          className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 
          bg-opacity-70 outline-none rounded-lg placeholder:pl-1 mt-5"
          type="text"
          placeholder="Paste ERC20 Token Address"
        />
        {App.ercLoading ? (
          <div
            className="flex p-2 cursor-pointer justify-around items-center w-1/4 ml-4 bg-blue-800
            bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg mt-5"
          >
            <TailSpin width={28} height={28} color="white" />
          </div>
        ) : App.tokenChanged ? (
          <div
            onClick={App.removeToken}
            className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-red-600 mt-5
              bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg"
          >
            Remove
          </div>
        ) : (
          <div
            onClick={App.selectToken}
            className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-blue-800
              bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg mt-5"
          >
            Select
          </div>
        )}
      </div>

      {/* transfer to  */}
      <div className="flex w-4/5 justify-between items-center mt-5">
        <input
          onChange={(e) => App.setRecipientAddress(e.target.value)}
          value={App.recipientAddress}
          className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 
          bg-opacity-70 outline-none rounded-lg placeholder:pl-1 mt-5"
          placeholder="Paste Recipient Address"
          type="text"
        />
        <input
          onChange={(e) => App.setAmount(e.target.value)}
          value={App.amount}
          className="w-1/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 
          bg-opacity-70 outline-none rounded-lg placeholder:pl-1 mt-5 ml-4"
          placeholder="Amount"
          type="number"
        />
      </div>

      {/* transfer button  */}

      {App.txLoading ? (
        <div
          className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70
      border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg"
        >
          <Bars width={30} height={46} color={"white"} />
        </div>
      ) : (
        <div
          onClick={App.transferAmount}
          className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70
      border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg"
        >
          Transfer
        </div>
      )}



        {/* recent Tx section  */}
      <div
        className={`${App.showRecentTx ? '' : 'hidden'} bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80
      w-4/5 mt-2`}
      >
        <div className="flex w-full items-center justify-center rounded-t-lg">
          <div className="w-4/6 py-2 px-2">
            <p className="text-xl font-mono">Amount : {App.recentTx.amount} {App.recentTx.symbol} </p>
            <p className="text-xs font-mono">To : {App.recentTx.to} </p>
          </div>

          {App.saveTxLoad ? (
            <div className="flex justify-center bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
              <TailSpin height={20} width={20} color={'white'} />
            </div>
          ) : (
            <button onClick={App.saveTx} className="bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
              Save
            </button>
          )}
          <button onClick={() => App.setShowRecentTx(false)} className="bg-red-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
            Ignore
          </button>
        </div>
        <a href={`${App.explorer}/tx/${App.recentTx.txHash}`} target={"_blank"}>
          <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
            View Transaction
          </div>
        </a>
      </div>

      {/* Error and Message  */}
      <p className="text-red-600 text-lg mt-2 px-3">{App.error}</p>
      <p className="text-green-600 text-lg mt-2 px-1">{App.message}</p>
    </div>
  );
};

export default Send;
