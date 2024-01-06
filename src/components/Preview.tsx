import { ethers } from "ethers";
import { toast} from "react-toastify";
import { useState } from "react";
interface PreviewProps {
    // ... props for form data and handlers
    setStep: any,
    logoImage: string,
    setLogoImage: any,
    tokenAddress : string,
    
  }
const Preview = (props: PreviewProps)=> {
  const [isloading, setLoading] = useState(false);
    const handleImageUpload =  async(event: any) => {
        try {
          setLoading(true)
          const imageFile = event.target.files[0];
          const imageUrl = await uploadImage(imageFile);
          
          console.log("Image URL:", imageUrl);
          props.setLogoImage(imageUrl);
          setLoading(false);
         
        } catch (error: any) {
          // Handle upload errors
          toast.error(error.message);
          setLoading(false);
        }
      }
      const uploadImage = async (file: any) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
      
          const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_PINATA_KEY}`,
            },
            body: formData,
          });
        
          const resData = await res.json();
          const ipfsHash = resData.IpfsHash;
          const imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      
          console.log("Image uploaded, URL:", imageUrl);
          return imageUrl; // Return the image URL directly
        } catch (error) {
          console.error("Image upload failed:", error);
          throw error; // Rethrow for handling in calling function
        }
      };
      const handleSubmit = async()=> {
        try {
          if(window.ethereum){

              const provider = new ethers.providers.Web3Provider(window.ethereum);
              // Get the connected address
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          const connectedAddress = accounts[0];
              // Create an instance of the ERC-20 contract
            const erc20Contract = new ethers.Contract(
              props.tokenAddress,
              [
                  'function balanceOf(address account) view returns (uint256)',
                  'function symbol() view returns (string)',
                  'function decimals() view returns (uint8)',
              ],
              provider
          );

          // Check the balance of the connected address for the specified ERC-20 token
          const tokenBalance = await erc20Contract.balanceOf(connectedAddress);

          // Get the symbol and decimals of the ERC-20 token
          const tokenSymbol = await erc20Contract.symbol();
          const tokenDecimals = await erc20Contract.decimals();

          // If the token balance is zero, display a toast error with cool and interesting slang
          if (tokenBalance.eq(ethers.constants.Zero)) {
              toast.error(`No ${tokenSymbol} so you cannot customize it's logo, much sad! 🥺`);
              props.setLogoImage("");

              return ;
          }

          // If everything is okay, you can call the wallet_watchAsset method
          await window.ethereum.request({
              "method": "wallet_watchAsset",
              "params": {
                  "type": "ERC20",
                  "options": {
                      "address": props.tokenAddress,
                      "symbol": tokenSymbol,
                      "decimals": Number(tokenDecimals),
                      "image": props.logoImage,
                  }
              }
          });
          toast.success("LogoCraft success! 🚀 Your token just got a fresh new look with LogoCraft! 💎")
          props.setStep(0);


            } else {
              toast.error("Connect wallet !");
            }
          }
          catch (error: any) {
              // An error occurred, indicating it's not a valid ERC-20 token contract
              toast.error(error.message);
            }
      }

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-md">
            <button
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => {
                props.setStep(1)
            }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11V8L8 12L12 16V13H16V11H12Z" fill="rgba(0,0,0,1)"></path>
                </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">Logo Upload</h2>
            <div className="flex items-center justify-center mb-4">
            <div
                className="w-64 h-64 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                onClick={() => document?.getElementById('imageInput')?.click()}
                >
                {props.logoImage === "" && (
                    <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                    />
                )}
                {!isloading ? (
                  props.logoImage === "" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="32"
                      height="32"
                    >
                      <path
                        d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934L22.0007 13.3417C21.3749 13.1204 20.7015 13 20 13V5H4L4.001 19L13.2929 9.70715C13.6528 9.34604 14.22 9.31823 14.6123 9.62322L14.7065 9.70772L18.2521 13.2586C15.791 14.0069 14 16.2943 14 19C14 19.7015 14.1204 20.3749 14.3417 21.0007L2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"
                        fill="rgba(0,0,0,1)"
                      ></path>
                    </svg>
                  ) : (
                    <img
                      src={props.logoImage}
                      alt="Uploaded Logo"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e: any) => {
                        toast.error("Error loading image:", e);
                      }}
                    />
                  )
                ) : (
                  // Loader component (you can replace this with your loader)
                  <div className="loader"></div>
                )}

                </div>
            </div>
            {/* ... potential customization options for size, position, etc. */}
            <button
            type="submit"
            className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full ${props.logoImage ? '' : 'opacity-50 cursor-not-allowed'}`}
            onClick={handleSubmit}
            disabled = {props.logoImage === ""}
            >
                Submit
            </button>
            </div>
        </>
  );
};

export default Preview;