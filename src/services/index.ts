import { toast } from "react-toastify";
import { connectedChain } from "../utils";
import CONFIG from "../config";
export const getRPCUrl = (blockchain: string) => {
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
                return false;
        }
    }catch(e: any){
        toast.error(e.message);
        return false;
    }       
    
};