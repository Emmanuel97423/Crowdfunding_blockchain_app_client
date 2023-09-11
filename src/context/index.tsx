import { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { MetaMaskWallet } from "@thirdweb-dev/wallets";

import type { StateContextProviderProps, CampaignProps } from "../types";

import { ethers } from 'ethers';

type FormCampaignProps = {
    title:string;
    description:string;
    target:number;
    deadline:number;
    image:string;
}

const clientId = import.meta.env.clientId;

const wallet = new MetaMaskWallet({
    clientId:clientId
});


const StateContext = createContext<StateContextProviderProps | null>(null);

const addressContractEnv = import.meta.env.VITE_CONTRACT_ADDRESS ;

export const StateContextProvider:React.FC<StateContextProviderProps> = ({ children } ) => {
    const { contract } = useContract(addressContractEnv);
     const { mutateAsync : createCampaign, isLoading: isLoadingCreateCampaign, error: errorCreateCampaign } = useContractWrite(contract as any, 'createCampaign');
     const { mutateAsync: donateToCampaign, isLoading: isLoadingDonate } = useContractWrite(contract as any, "donateToCampaign")
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
            // @ts-ignore
            const campaigns = await contract.call("getCampaigns");

            const parsedCampaigns = campaigns.map((campaign:CampaignProps, i:number)=>(
                {
                pId:i,
                owner:campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                // @ts-ignore
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
        const donate = async(pId:number, amount:string)=>{
            try {
                const data = await donateToCampaign({
                    args:[pId],
                    overrides:{
                        value:ethers.utils.parseEther(amount)
                    }
                }, 
                
                )
                console.log('data:', data)
                
            } catch (error) {
                console.error("contract call failure", error);             
            }


            // const data = await contract.call("donateToCampaign", [pId], {
            //     value:ethers.utils.parseEther(amount)
            // });
            // return data
        }
        const getDonations = async(pId:number)=>{
            // @ts-ignore
            const donations = await contract.call("getDonators", [pId]);
            const numberOfDonations = donations[0].length
            const parseDonations=[];

            for(let i = 0; i < numberOfDonations; i++){
                parseDonations.push({
                    donator: donations[0][i],
                    donation: ethers.utils.formatEther(donations[1][i].toString())
                })
            };
            return parseDonations;
        }
     
     return (

            <StateContext.Provider 
                value={{
                    address, 
                    connect,
                    contract, 
                    // @ts-ignore
                    createCampaign: publishCampaign,
                    getCampaigns: campaigns,
                    getUserCampaigns,
                    donate,
                    getDonations
                }}
            >
                {children}
            </StateContext.Provider>
        
        );
};

export const useStateContext = () => useContext(StateContext)
 