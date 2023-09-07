import {useState , useEffect} from 'react';

import { useStateContext } from "../context";

import { PageHomeDisplayCampaigns } from "../components";


type CampaignProps = {
  address: number;
  title:string;
  description:string;
  target:string;
  deadline:number;
  imgUrl:string;
}

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
    <PageHomeDisplayCampaigns
    title="Toutes les campagnes"
    isLoading={isLoading}
    campaigns={campaigns}
    />
  )
}

export default PageHome;