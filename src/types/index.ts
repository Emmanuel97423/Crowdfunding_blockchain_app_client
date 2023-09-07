import React from 'react';
import { SmartContract, BaseContractForAddress } from '@thirdweb-dev/react';
import { BaseContract } from 'ethers';

export interface StateContextProviderProps {
  children: React.ReactNode;
  address?: string | undefined;
  contract?: SmartContract<BaseContract> | SmartContract<BaseContractForAddress<never>> | undefined;
  createCampaign?:()=>{} | null;
}

export type CampaignProps = {
    owner:string;
    title:string;
    description:string;
    target:string;
    deadline:number;
    amountCollected:number;
    image:string;
    pId?:number;
}