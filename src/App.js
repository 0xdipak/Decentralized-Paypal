import { useState, createContext, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import { ethers } from "ethers";
import ABI from "./paypal/paypal.json";

const AppState = createContext();

function App() {
  const { ethereum } = window;
  const [login, setLogin] = useState(false);
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");
  const [ercTokenAddress, setErcTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [paypalContractAddress, setPaypalContractAddress] = useState("");
  const [explorer, setExplorer] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tokenChanged, setTokenChanged] = useState(false);
  const [showErc, setShowErc] = useState(false);
  const [ercLoading, setErcLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [showRecentTx, setShowRecentTx] = useState(false);
  const [recentTx, setRecentTx] = useState({
    txHash: '',
    from: '',
    to: '',
    amount: '',
    symbol: ''
  });
  const [saveTxLoad, setSaveTxLoad] = useState(false);


  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    setBalance(ethers.utils.formatEther(balance));
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const ERCABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)",
  ];

  // Contracts
  const ERCContract = new ethers.Contract(ercTokenAddress, ERCABI, signer);
  // paypal contract
  const paypalContract = new ethers.Contract(
    paypalContractAddress,
    ABI.output.abi,
    signer
  );

  const selectToken = async () => {
    try {
      setErcLoading(true);
      const name = await ERCContract.name();
      const balance = await ERCContract.balanceOf(address);
      const symbol = await ERCContract.symbol();
      setBalance(ethers.utils.formatEther(balance));
      setSymbol(symbol);
      setCurrency(name);
      setTokenChanged(true);
      setErcLoading(false);
    } catch (err) {
      setError(err.message);
      setErcLoading(false);
    }
  };

  const removeToken = async () => {
    try {
      if (chain == "Goreli") {
        setCurrency("GoerliETH");
        setSymbol("GoerliETH");
      } else if (chain == "Polygon") {
        setCurrency("MATIC");
        setSymbol("MATIC");
      }

      setErcTokenAddress("");
      setShowErc(false);
      setTokenChanged(false);
      getBalance();
    } catch (err) {
      setError(err.message);
    }
  };

  const transferAmount = async () => {
    setMessage('');
    setTxLoading(true);
    try {
      if (tokenChanged) {
        const tx = await ERCContract.transfer(
          recipientAddress,
          ethers.utils.parseEther(amount)
        );
        await tx.wait();
        selectToken();

        setRecentTx({
          txHash: tx.hash,
          from: address,
          to: recipientAddress,
          amount: amount,
          symbol: symbol
        })

       setShowRecentTx(true);

      } else {
        const tx = await paypalContract._transfer(recipientAddress, symbol, {
          value: ethers.utils.parseEther(amount),
        });
        await tx.wait();
        getBalance();
      }
      setMessage("Transaction Successful");
      setAmount('');
      setRecipientAddress("");
    } catch (err) {
      setError(err.message);
    }
    setTxLoading(false);
  };



  const saveTx = async () => {
    setSaveTxLoad(true);
    try {

      const tx = await paypalContract.saveTx(recentTx.from, recentTx.to, ethers.utils.parseEther(recentTx.amount), recentTx.symbol);
      await tx.wait();

      setMessage("Transaction Saved Successfully!")

    }
    catch(err) {
      setError(err.message);
    }
    setShowRecentTx(false)
    setSaveTxLoad(false);
  }




  useEffect(() => {
    ethereum.on("chainChanged", async (chainId) => {
      if (chainId == "0x5") {
        setChain("Goreli");
        setCurrency("GoerliETH");
        setSymbol("GoerliETH");
        setPaypalContractAddress("0x79621940Df6735bb70162c9Ed44220267d7d6b95");
        setExplorer("https://goerli.etherscan.io");
      } else if (chainId == "0x13881") {
        setChain("Polygon");
        setCurrency("MATIC");
        setSymbol("MATIC");
        setPaypalContractAddress("0x4145f339d0c1EF6E45846fd98E152E01E4Db407E");
        setExplorer("https://mumbai.polygonscan.com");
      } else {
        setLogin(false);
      }
      getBalance();
    });

    ethereum.on("accountsChanged", async (accounts) => {
      setAddress(accounts[0]);
    });
  }, []);

  useEffect(() => {
    if (tokenChanged) {
      selectToken();
    } else {
      getBalance();
    }
  }, [address]);

  useEffect(() => {
    removeToken();
  }, [chain]);

  return (
    <AppState.Provider
      value={{
        setLogin,
        address,
        setAddress,
        chain,
        setChain,
        symbol,
        setSymbol,
        balance,
        setBalance,
        currency,
        setCurrency,
        getBalance,
        ercTokenAddress,
        setErcTokenAddress,
        amount,
        setAmount,
        recipientAddress,
        setRecipientAddress,
        paypalContractAddress,
        setPaypalContractAddress,
        explorer,
        setExplorer,
        error,
        setError,
        message,
        setMessage,
        tokenChanged,
        setTokenChanged,
        showErc,
        setShowErc,
        ercLoading,
        setErcLoading,
        removeToken,
        transferAmount,
        selectToken,
        txLoading,
        setTxLoading,
        showRecentTx,
        setShowRecentTx,
        recentTx,
        setRecentTx,
        saveTxLoad,
        setSaveTxLoad,
        saveTx,
        paypalContract
      }}
    >
      <div className="min-w-full h-screen">
        {login ? (
          // main application
          <div className="min-w-full min-h-full">
            <Header />
            <Main />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState };

//  0x79621940Df6735bb70162c9Ed44220267d7d6b95 goreli

// 0x4145f339d0c1EF6E45846fd98E152E01E4Db407E  polygon
