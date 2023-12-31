import {useState , useEffect} from 'react';

import { useStateContext } from "../context";

import { ComponentDisplayCampaigns } from "../components";

import type { CampaignProps } from "../types";


const PageProfile:React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<CampaignProps[]>([]);
        // @ts-ignore

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async()=>{
      setIsLoading(true);
      const data = await getUserCampaigns();
      setCampaigns(data);
      setIsLoading(false);

  }
  useEffect(()=>{
  if(contract) fetchCampaigns() ;

  },[address, contract])

  return (
    <ComponentDisplayCampaigns
    title="Toutes les campagnes"
    isLoading={isLoading}
    campaigns={campaigns}
    />
  )
}

export default PageProfile;