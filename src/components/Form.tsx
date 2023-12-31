import { ethers } from "ethers";
import { toast } from "react-toastify";
import { connectedChain } from "../utils";
import CONFIG from "../config";
import {useEffect} from "react";
interface FormProps {
  // ... props for form data and handlers
  tokenAddress : string,
  setTokenAddress: any,
  blockchain : string,
  setBlockchain: any,
  setStep: any
}

const Form = (props: FormProps) => {
    const isValidERC20Address = async(address : string,blockchain: string)=> {
        try {
            if(window.ethereum){
                await getRPCUrl(blockchain);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log(provider);
                // Create an instance of the ERC-20 contract
                const erc20Contract = new ethers.Contract(address, ['function name() view returns (string)'], provider);
            
                // Call the `name` function to check if it's a valid ERC-20 token contract
                const tokenName = await erc20Contract.name();
                console.log(tokenName);
            
                // If the call is successful, it's likely a valid ERC-20 token contract
                return Boolean(tokenName);
              } else {
                toast.error("Connect wallet !");
              }
            }
            catch (error: any) {
                // An error occurred, indicating it's not a valid ERC-20 token contract
                return false;
              }

           
    };
    const getRPCUrl = (blockchain: string) => {
        try{
            switch (blockchain) {
                case 'Zeta':
                    return connectedChain(CONFIG.Zeta_CHAINID); 
                case 'polygon':
                    return connectedChain(CONFIG.Matic_CHAINID); 
                case 'ethereum':
                    return connectedChain(CONFIG.Eth_CHAINID); 
                case 'base':
                    return connectedChain(CONFIG.Base_CHAINID); 
                case 'bsc':
                    return connectedChain(CONFIG.Bnb_CHAINID); 
                case 'avax':
                    return connectedChain(CONFIG.Avax_CHAINID); 
        
                default:
                    throw new Error('Unsupported blockchain');
            }
        }catch(e: any){
            toast.error(e.message);
        }       
        
    };
    useEffect(() => {
        console.log("gajb->",props.blockchain);
     
    }, [])
    
    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-md">
                
                <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => {
                    props.setStep(0)
                }}
                >
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    width="32" 
                    height="32">
                    <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11V8L8 12L12 16V13H16V11H12Z" fill="rgba(0,0,0,1)">
                    </path>
                    
                    </svg>
                </button>
                
                <h2 className="text-2xl font-bold mb-4 text-black">Enter your token details</h2>
                
                <div className="mb-4">
                    <label htmlFor="tokenAddress" className="block text-black font-bold mb-2">
                        Token Address
                    </label>
                    <input
                        type="text"
                        id="tokenAddress"
                        value={props.tokenAddress}
                        onChange={(e) => props.setTokenAddress(e.target.value)} // handle change
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="blockchain" className="block text-black font-bold mb-2">
                        Blockchain
                    </label>
                    <select
                        id="blockchain"
                        value={props.blockchain}
                        onChange={(e) => props.setBlockchain(e.target.value)} // handle change
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="Zeta">Zeta chain testnet</option>
                        <option value="polygon">Polygon mainnet</option>
                        <option value="ethereum">Ethereum mainnet</option>
                        <option value="base">Base mainnet</option>
                        <option value="bsc">Binance smart chain mainnet</option>
                        <option value="avax">Avalanche C-chain mainnet</option>
                        {/* ... blockchain options */}
                    </select>
                </div>

                    <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={async() => {
                            const Valid = await isValidERC20Address(props.tokenAddress,props.blockchain)
                            if(Valid){
                                props.setStep(2);
                            }else{
                                toast.error("Not Valid Token Address :(")
                            }
                            
                        
                    }}
                >
                    Continue
                </button>
            </div>
    
        </>
  );
};

export default Form;