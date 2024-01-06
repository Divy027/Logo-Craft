import '../App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import enter from "../assets/enter.png"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CONNECT } from "../actions";
import { connectWallet } from "../utils";
import CONFIG from "../config";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Preview from '../components/Preview';
// import Progress from '../components/Progress';
import Form from '../components/Form';
import Header from '../components/Header';


const Home = () => {
  const dispatch = useDispatch();
  const storeData = useSelector((status: any) => status);
  const [tokenAddress, setTokenAddress] = useState('');
  const [blockchain, setBlockchain] = useState("Zeta");
  const [logoImage, setLogoImage] = useState(""); // File object
  const [step, setStep] = useState(0);
  

  const handleConnect = async () => {
    try {
      const wallet: any = await connectWallet();
      dispatch(
        CONNECT({
          wallet: `connected`,
          address: wallet.address,
        })
      );

      localStorage.setItem(CONFIG.WALLET_STATUS_LOCALSTORAGE, "connected");
      localStorage.setItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE, wallet.address);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDisConnect = () => {
    dispatch(
      CONNECT({
        wallet: `disconnect`,
        address: ``,
      })
    );
    localStorage.setItem(CONFIG.WALLET_STATUS_LOCALSTORAGE, "disconnect");
    localStorage.setItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE, "");
  };

 
  return (
    <div className=''>
    <Header/>
    <ToastContainer/>
    <div className=" flex items-center justify-center my-[40%] sm:my-0 sm:min-h-screen overflow-hidden">
      {step == 0 && (
        <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-full ">
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-4 text-black text-center">
            LogoCraft: Unleash Your Token's Personality
          </h1>
          <p className="text-sm sm:text-xl mb-4 sm:mb-6 text-gray-600 text-center">
            Customize ERC20 logos for any EVM blockchain, express your style, stand out from the crowd.
          </p>
          {storeData.wallet === "connected" ? (
            <button
              className="bg-white text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full border border-black flex items-center justify-center hover:border-blue-500 hover:text-blue-500"
              onClick={() => setStep(1)}
            >
              <span>
                {storeData?.address
                  ? storeData?.address?.substr(0, 6) + "..." + storeData?.address?.substr(storeData?.address.length - 4, 4)
                  : "Connect Wallet"}
              </span>
              <img
                src={enter}
                alt="WalletIcon"
                width={18}
                className="group-hover:translate-x-1 transition ease-in-out duration-300 ml-2"
              />
            </button>
          ) : (
            <button
              className="bg-white text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full border border-black hover:border-blue-500 hover:text-blue-500"
              onClick={storeData.wallet === "connected" ? handleDisConnect : handleConnect}
            >
              {storeData.wallet === "connected" ? (
                <span>
                  {storeData?.address
                    ? storeData?.address?.substr(0, 6) + "..." + storeData?.address?.substr(storeData?.address.length - 4, 4)
                    : "Disconnect Wallet"}
                </span>
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>
          )}
        </div>
      </div>
      
      
      
      )}
      

      {step == 1 && (
        <Form tokenAddress={tokenAddress} setTokenAddress = {setTokenAddress} blockchain={blockchain} setBlockchain = {setBlockchain} setStep={setStep}/>
      )}

      {step == 2 && (
        <Preview setStep={setStep} logoImage = {logoImage} setLogoImage = {setLogoImage} tokenAddress={tokenAddress} />
      )}
    </div>
    
    </div>
  )
}

export default Home
