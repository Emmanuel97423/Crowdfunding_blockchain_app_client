import {useContext, createContext} from 'react';
import { useAddress, useContract, useMetamask, useContractWrite, SmartContract, BaseContractForAddress } from '@thirdweb-dev/react';
import { BaseContract } from 'ethers';

type FormCampaignProps = {
    title:string;
    description:string;
    target:number;
    deadline:number;
    image:string;
}

interface StateContextProviderProps {
  children: React.ReactNode;
  address?: string | undefined;
  contract?: SmartContract<BaseContract> | SmartContract<BaseContractForAddress<never>> | null;
  createCampaign?:()=> | undefined;
  publishCampaign?:()=>{} | undefined;
}

const StateContext = createContext<StateContextProviderProps | null>(null);

const addressEnv = import.meta.env.VITE_CONTRACT_ADDRESS ;

export const StateContextProvider:React.FC<StateContextProviderProps> = ({ children } ) => {
    const { contract, isLoading : isLoadingUseContract, error: errorUseContract  } = useContract(addressEnv);
    if(errorUseContract) console.error(errorUseContract);
     const { mutateAsync : createCampaign, isLoading: isLoadingCreateCampaign, error: errorCreateCampaign } = useContractWrite(contract as any, 'createCampaign');
    if(errorCreateCampaign) console.error(errorCreateCampaign);
     const address = useAddress();
     const connect = useMetamask();

      const publishCampaign = async(form:FormCampaignProps)=>{
            try {
                const data = await createCampaign({
                    args:[
                        address, //owner
                        form.title,//title
                        form.description,
                        form.target,
                        new Date(form.deadline).getTime(),
                        form.image
                    ],
                    // overrides:{
                    //     gasLimit:20000
                    // }
                });
                console.log("Contract call success", data)
            } catch (error) {
                console.log('error:', error)
                
            }
            };
 
     
     return (

            <StateContext.Provider 
                value={{
                    address, 
                    connect,
                    contract, 
                    createCampaign: publishCampaign 
                }}
            >
                {children}
            </StateContext.Provider>
        
        );
};

export const useStateContext = () => useContext(StateContext)
 