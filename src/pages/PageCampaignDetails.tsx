import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { ComponentButton, ComponentCountBox } from "../components";
import { calculateBarPercentage, daysLeft } from "../../utils";
import { thirdweb } from "../assets";

import type { CampaignProps } from "../types";

type Donator = {
  id: number;
  donator:string;
  donation:string;
}

const PageCampaignDetails:React.FC = () => {
  const { state } = useLocation();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading ] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [donators, setDonators ] = useState<Donator[]>([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async()=>{
    const data = await getDonations(state.pId);
    console.log('data:', data)
    setDonators(data)
  }

  useEffect(()=>{
    if(contract) fetchDonators();
  },[contract, address])

  const handleDonate = async ()=>{
    if(amount){
      setIsLoading(true);
      await donate(state.pId, amount);
      setIsLoading(false);
    }

  }
  
  return (
    <div >
      {isLoading && "Loading..."}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{width:`${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth:'100%'}}>

            </div>
          </div> 
        </div> 
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <ComponentCountBox
            title="Jours restant"
            value={remainingDays}

            />
            <ComponentCountBox
            title={`Go to ${state.target}`}
            value={state.amountCollected}
            
            />
            <ComponentCountBox
            title="Total bailleurs"
            value={donators.length}
            
            />
        </div>      
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
          <h4 className="w-full font-epilogue font-semibold text-[18px] text-white uppercase">Créateur</h4>
            <div className="mt-[20px] flex flex-row flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191] ">10 campagnes</p>
              </div>
            </div>
          </div>
            <div>
            <h4 className="w-full font-epilogue font-semibold text-[18px] text-white  uppercase">Histoire</h4>
              <div className="mt-[20px] ">
                  <p className=" font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify ">{state.description}</p>

              </div>
          </div>
           <div>
            <h4 className="w-full font-epilogue font-semibold text-[18px] text-white  uppercase">Donateurs</h4>
              <div className="mt-[20px] flex flex_col gap-4 ">

                {donators.length > 0 ? donators.map((item, i)=>(
                  <div key={`${item.donator}-${i}`}
                  className="w-full flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{i + 1}. {item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>

                  </div>
                )): (
                  <p className=" font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify ">Pas encore de donateurs. Soyez le premier!</p>
                )}
              </div>
          </div>
        </div>
        <div className="flex-1 ">
            <h4 className="w-full font-epilogue font-semibold text-[18px] text-white  uppercase">Fonds</h4>
              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
                  Fonds de la campagne
                </p>
                  <div className="mt-[30px] ">
                    <input
                    type="number"
                    placeholder="ETH 0.1"
                    step='0.1'
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    value={amount}
                    onChange={(e)=> setAmount(e.target.value)}
                    />
                    <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                      <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Soutenez-le parce que vous y croyez.</h4>
                      <p className="mt-[20px] font-epilogue font-normal text-[#808191] leading-[22px]">Soutenez le projet sans récompense, simplement parce qu'il vous parle.</p>
                    </div>
                    <ComponentButton
                    btnType="button"
                    title="Ajouter des fonds"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={handleDonate}
                    />
                  </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default PageCampaignDetails;