import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import { Bars } from "react-loader-spinner";

const Recipients = () => {
  const App = useContext(AppState);

  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientNmae, setRacipientName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0);

  const addRecipient = async () => {
    App.setTxLoading(true);
    try {
      const tx = await App.paypalContract.addRecipient(
        recipientAddress,
        recipientNmae
      );
      await tx.wait();
      setMessage("Recipient Saved Successfully!");
      setRecipientAddress('')
      setRacipientName('');
    } catch (err) {
      setError(err.message);
    }
    App.setTxLoading(false);
    let newNum = num + 1;
    setNum(newNum);
  };

  useEffect(() => {
    const getData = async () => {
      const recipients = await App.paypalContract.filters.recipients(
        App.address
      );
      const recipientsData = await App.paypalContract.queryFilter(recipients);
      setData(recipientsData);
    };

    getData();
  }, [num]);

  const setRecipient = (address, name) => {
    App.setRecipientAddress(address);
    setMessage(`Selected the ${name}'s address`)
  }

  return (
    <div className="py-3 px-4 text-white flex items-center justify-center flex-col">
      <input
        onChange={(e) => setRecipientAddress(e.target.value)}
        value={recipientAddress}
        className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 
          bg-opacity-70 outline-none rounded-lg placeholder:pl-1 mt-5"
        placeholder="Paste Recipient Address"
        type="text"
      />
      <input
        onChange={(e) => setRacipientName(e.target.value)}
        value={recipientNmae}
        className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 
          bg-opacity-70 outline-none rounded-lg placeholder:pl-1 mt-5"
        placeholder="Paste Recipient Name"
        type="text"
      />

      {App.txLoading ? (
        <div
          className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70
        border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg"
        >
          <Bars width={30} height={46} color={"white"} />
        </div>
      ) : (
        <div
          onClick={addRecipient}
          className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70
        border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg"
        >
          Save Recipient
        </div>
      )}

      <p className="text-red-600 text-lg mt-2 px-3">{error}</p>
      <p className="text-green-600 text-lg mt-2 px-1">{message}</p>

      <div className="flex flex-col items-center justify-center mt-4 w-full">
        {data.map((e) => {
          return (
            <div
            onClick={() =>setRecipient(e.args.recipient, e.args.recipientName)}
              className="bg-black cursor-pointer rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80
            w-3/4 mt-2"
            >
              <div className="flex w-full items-center justify-center rounded-t-lg">
                <div className="w-full py-2 px-2">
                  <p className="text-xl font-mono">
                    Name : {e.args.recipientName}
                  </p>
                  <p className="text-xs font-mono">
                    Address : {e.args.recipient}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recipients;
