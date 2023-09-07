import { useNavigate } from "react-router-dom";

import { ComponentFundCard } from "../..";
import { loader } from "../../../assets";

import type { CampaignProps } from "../../../types";

type DisplayCampaignsProps = {
  title:string;
  isLoading:boolean;
  campaigns:CampaignProps[]
}
const PageHomeDisplayCampaigns:React.FC<DisplayCampaignsProps> = ({title, isLoading, campaigns} : DisplayCampaignsProps) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign:CampaignProps)=>{
      navigate(`/campaign-details/${campaign.title}`, { state: campaign})
  }
  return (
    <div>
      <h1 className="font-epilogue font-semiblod text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
      <div className="flex justify-center items-center flex-wrap mt-[20px] gap-[26px]">
        {
          isLoading && (
              <img src={loader} alt="loader" className="w-[100px] h-[100x] object-contain"/>
          )
        }
        {
          !isLoading && campaigns.length === 0  && (
            <p className="font-epilogue font-semibold text-[14px] text-[#818183] ">
              Il n'y a aucune campagne...
            </p>
          )
        }

        {
          !isLoading && campaigns.length > 0 && campaigns.map((campaign) => 
          <ComponentFundCard
          key={campaign.pId}
          {...campaign}
          handleClick={()=> handleNavigate(campaign)}

          />
          )
        }

      </div>
    </div>
  )
}

export default PageHomeDisplayCampaigns