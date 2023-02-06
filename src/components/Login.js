import React, { useState, useContext } from "react";
import Paypal from "../assets/paypal.png";
import Metamask from "../assets/metamask.png";
import { AppState } from "../App";

const Login = () => {

  const App = useContext(AppState);


  const { ethereum } = window;
  const [error, setError] = useState('');

  const loginWallet = async () => {
    try {
      await ethereum.request({ method: "wallet_requestPermissions", params: [{eth_accounts: {}}] });
      const accounts = await ethereum.request({method: "eth_requestAccounts"})
      App.setAddress(accounts[0]);
      
      const chainId = await ethereum.request({method: "eth_chainId"});

      App.getBalance();
      
      if(chainId == "0x5") {
        App.setChain("Goreli")
        App.setCurrency("GoerliETH");
        App.setSymbol("GoerliETH");
        App.setLogin(true);
        App.setPaypalContractAddress(
          "0x79621940Df6735bb70162c9Ed44220267d7d6b95"
        );
        App.setExplorer("https://goerli.etherscan.io");
      } else if (chainId == "0x13881") {
        App.setChain("Polygon");
        App.setCurrency("MATIC");
        App.setSymbol("MATIC");
        App.setLogin(true);
        App.setPaypalContractAddress(
          "0x4145f339d0c1EF6E45846fd98E152E01E4Db407E"
        );
        App.setExplorer("https://mumbai.polygonscan.com");
      }else {
        setError("Can only access with Goreli and Polygon.")
        App.setLogin(false);
      }
      
    } catch (error) {
      setError(`${error.message}`);
    }
  };

  return (
    <div className="min-w-full h-4/5 flex justify-center flex-col items-center">
      <img className="h-20" src={Paypal} alt="/" />
      <div
        className="w-1/3 h-40 mt-4 bg-black bg-opacity-70 p-2
       rounded-lg shadow-lg border-opacity-40 border-4 border-black flex flex-col justify-center items-center"
      >
        <h1 className="text-white text-2xl font-medium text-center">Login</h1>
        {ethereum != undefined ? (
          <div onClick={loginWallet} className="flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2">
            Connect With Metamask
            <img className="h-10" src={Metamask} alt="/" />
          </div>
        ) : (
          // install metamask
          <div className="flex flex-col justify-center items-center">
            <a
              target="_blank"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            >
              <div className="flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2">
                Install Metamask
                <img className="h-10" src={Metamask} alt="/" />
              </div>
            </a>
            <p className="text-red-600 text-base mt-2">
              Login Required Metamask Extension
            </p>
          </div>
        )}
        <p className="text-red-600 text-lg mt-2">{error}</p>
      </div>
    </div>
  );
};

export default Login;


// 1.43