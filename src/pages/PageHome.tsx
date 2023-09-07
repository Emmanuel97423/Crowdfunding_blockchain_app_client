import {useState , useEffect} from 'react';

import { useStateContext } from "../context";

import { ComponentDisplayCampaigns } from "../components";

import type { CampaignProps } from '../types';


const PageHome:React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<CampaignProps[]>([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async()=>{
      setIsLoading(true);
      const data = await getCampaigns();
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

export default PageHome;