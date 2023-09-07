import { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';

import type { StateContextProviderProps, CampaignProps } from "../types"
import { ethers } from 'ethers';

type FormCampaignProps = {
    title:string;
    description:string;
    target:number;
    deadline:number;
    image:string;
}



const StateContext = createContext<StateContextProviderProps | null>(null);

const addressContractEnv = import.meta.env.VITE_CONTRACT_ADDRESS ;

export const StateContextProvider:React.FC<StateContextProviderProps> = ({ children } ) => {
    const { contract, isLoading : isLoadingUseContract, error: errorUseContract  } = useContract(addressContractEnv);
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
        const campaigns = async()=>{
            const campaigns = await contract.call("getCampaigns");
            console.log('campaigns:', campaigns);

            const parsedCampaigns = campaigns.map((campaign:CampaignProps, i:number)=>(
                {
                owner:campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline:campaign.deadline.toNumber(),
                amountCollected:ethers.utils.formatEther(campaign.amountCollected.toString()),
                image:campaign.image
            }
            ));
                return parsedCampaigns;


        }
        const getUserCampaigns = async()=>{
            const allCampaigns = await campaigns();
            const filteredCampaigns = allCampaigns.filter((campaign:CampaignProps)=>campaign.owner === address);
            return filteredCampaigns;
        }
     
     return (

            <StateContext.Provider 
                value={{
                    address, 
                    connect,
                    contract, 
                    createCampaign: publishCampaign,
                    getCampaigns: campaigns,
                    getUserCampaigns
                }}
            >
                {children}
            </StateContext.Provider>
        
        );
};

export const useStateContext = () => useContext(StateContext)
 