
interface FormProps {
  // ... props for form data and handlers
  tokenAddress : string,
  blockchain : string,
  logoImage : string,
  setStep: any
}

const Form = (props: FormProps) => {
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
                    // ... handle change
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="blockchain" className="block text-gray-700 font-bold mb-2">
                    Blockchain
                    </label>
                    <select
                    id="blockchain"
                    value={props.blockchain}
                    // ... handle change
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                    <option value="">Select a blockchain</option>
                    {/* ... blockchain options */}
                    </select>
                </div>
                {/* ... logo upload section */}
                <button
                type="submit"
                // disabled={/* ... disable if fields are empty */}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={()=> {
                    props.setStep(2);
                }}
                >
                    Continue
                </button>
            </div>
    
        </>
  );
};

export default Form;