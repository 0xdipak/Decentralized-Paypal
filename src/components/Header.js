import React, { useContext, useState } from "react";
import Paypal from "../assets/paypal.png";
import { BsWallet2 } from "react-icons/bs";
import { AppState } from "../App";
import EthSvg from '../assets/ethereum-eth.svg'
import Polygon from '../assets/polygon.png'
import {AiOutlineCloseCircle} from 'react-icons/ai'

const Header = () => {
  const App = useContext(AppState);
  const {ethereum} = window;

  const [showChains, setShowChains] = useState(false);

  const changeToPolygon = async () => {
    await ethereum.request({
      method: "wallet_switchEthereumChain", 
      params: [{chainId: "0x13881"}]
    });
    setShowChains(false);
  }


  const changeToGoreli = async () => {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
    setShowChains(false);
  }

  return (
    <div className="w-full h-1/4 pt-4 flex justify-between items-start">
      {/* logo  */}
      <img className="h-12 ml-2" src={Paypal} alt="/" />
      {/* wallet  */}
      <div className="flex justify-between items-start">
        <div
          className="text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer
         bg-black px-4 py-2 text-white rounded-lg flex justify-between items-center"
        >
          {App.address.slice(0, 8)}...{App.address.slice(38)}
          <BsWallet2 className="ml-2" size={25} />
        </div>

        {/* chains section  */}
        <div
          onClick={() => setShowChains(true)}
          className="text-xl py-2 mr-2 px-4 font-sans border-opacity-60 border-2 border-blue-900 font-medium 
          cursor-pointer bg-black text-white rounded-lg flex justify-between items-center"
        >
          {App.chain == "Goreli" ? (
            <img className="h-6 mr-2" src={EthSvg} alt="/" />
          ) : (
            <img className="h-6 mr-2" src={Polygon} alt="/" />
          )}
          {App.chain}
        </div>

        {/* all chains  */}
        <div className={`${showChains ? "" : "hidden"} absolute right-0 z-50`}>
          {/* polygo  */}
          <div
            onClick={changeToPolygon}
            className="text-xl py-2 mr-2 px-4 font-sans border-opacity-60 border-2 border-blue-900 font-medium 
          cursor-pointer hover:bg-gray-900 bg-black text-white rounded-lg flex justify-between items-center"
          >
            <img className="h-6 mr-2" src={Polygon} alt="/" />
            Polygon
          </div>
          {/* goreli  */}
          <div
            onClick={changeToGoreli}
            className="text-xl py-2 mr-2 px-4 font-sans border-opacity-60 border-2 border-blue-900 font-medium 
          cursor-pointer hover:bg-gray-900 bg-black text-white rounded-lg flex justify-between items-center"
          >
            <img className="h-6 mr-2" src={EthSvg} alt="/" />
            Goreli
          </div>
          {/* close chain  */}
          <div
            onClick={() => setShowChains(false)}
            className="text-xl py-1 mt-1 mr-2 px-4 font-sans border-opacity-60 border-2 border-blue-900 font-medium 
          cursor-pointer hover:bg-gray-900 bg-red-500 text-white rounded-lg flex justify-center items-center"
          > Close
           <AiOutlineCloseCircle className="ml-2" size={25} />
          </div>
        </div>


      </div>
    </div>
  );
};

export default Header;
