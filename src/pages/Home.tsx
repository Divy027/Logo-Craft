import '../App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import enter from "../assets/enter.png"
import  { useState } from 'react';
import Preview from '../components/Preview';
// import Progress from '../components/Progress';
import Form from '../components/Form';
import Header from '../components/Header';


const Home = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [blockchain, setBlockchain] = useState('');
  const [logoImage, setLogoImage] = useState(null); // File object
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  
  const handleChangeTokenAddress = (event: any) => setTokenAddress(event.target.value);
  const handleChangeBlockchain = (event: any) => setBlockchain(event.target.value);
  const handleImageUpload = (event: any) => setLogoImage(event.target.files[0]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
  };
  
 
  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center">
      {step == 0 && (
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-black">
              LogoCraft: Unleash Your Token's Personality
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Customize ERC20 logos for any EVM blockchain, express your style, stand out from the crowd.
            </p>
            <button 
            className="bg-white text-black font-bold py-4 px-8 rounded-full border border-black flex items-center justify-center hover:border-blue-500 hover:text-blue-500"
            onClick={()=> setStep(1)}
            >
              <span> Connect Wallet</span>
              <img
                src={enter}
                alt="WalletIcon"
                width={20}
                className="group-hover:translate-x-1 transition ease-in-out duration-300"
                onClick={() => setStep(2)}
              />
            </button>
          </div>
        </div>
      )}
      

      {step == 1 && (
        <Form tokenAddress='' logoImage='' blockchain='' setStep={setStep}/>
      )}

      {step == 2 && (
        <Preview setStep={setStep} handleUpload={""}/>
      )}
    </div>
    
    </>
  )
}

export default Home
