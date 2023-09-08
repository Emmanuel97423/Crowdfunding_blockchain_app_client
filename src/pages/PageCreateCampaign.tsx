import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from "../context";
import { money } from '../assets';
import { ComponentButton, ComponentFormField, ComponentTransactionLoader } from "../components";
import { checkIfImage } from "../../utils";

import type { StateContextProviderProps } from "../types";

const PageCreateCampaign:React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } : StateContextProviderProps = useStateContext();
  const [form, setForm] = useState({
    name:'',
    title:'',
    description:'',
    target:'',
    deadline:'',
    image:''
  });
  
  const handleFormFieldChange = (fieldName:string, e:React.ChangeEvent<HTMLInputElement>)=>{
    setForm({...form, [fieldName]: e.target.value});
  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    checkIfImage(form.image, async(exists)=>{
      if(exists) {
        setIsLoading(true);
        await createCampaign({...form, target:ethers.utils.parseUnits(form.target, 18)});
        setIsLoading(false);
        navigate('/')
      } else {
        alert('Please select a valid URL');
        setForm({...form, image:""})
      }
    })
  }
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <ComponentTransactionLoader/>}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Commencer une campagne</h1>
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <ComponentFormField
          name='name'
          labelName='Votre Nom *'
          placeholder="John Doe"
          inputType="text"
          value={form.name}
          handleChange={(e:any)=>{handleFormFieldChange('name',e)}}
          autoCompleteName="off"
          />
           <ComponentFormField
           name="title"
          labelName='Campagne *'
          placeholder="Nom de la campagne"
          inputType="text"
          value={form.title}
          handleChange={(e:any)=>{handleFormFieldChange('title',e)}}

          />
        </div>
         <ComponentFormField
         name="description"
          labelName='Histoire *'
          placeholder="Votre histoire"
          isTextArea
          inputType="text"
          value={form.description}
          handleChange={(e:any)=>{handleFormFieldChange('description',e)}}
          />
          <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
            <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
            <h4 className="font-epilogue font-bold md:text-[25px] sm:text-[12px] text-white ml-[20px] ">Vous recevrez 100% du montant récolté</h4>
          </div>
          <div className='flex flex-wrap gap-[40px]'>
          <ComponentFormField
          name='target'
          labelName='Goal *'
          placeholder="ETH 0.50"
          inputType="number"
          value={form.target}
          handleChange={(e:any)=>{handleFormFieldChange('target',e)}}
          />
           <ComponentFormField
           name="deadline"
          labelName='Date de fin *'
          placeholder="Date de fin"
          inputType="date"
          value={form.deadline}
          handleChange={(e:any)=>{handleFormFieldChange('deadline',e)}}
          />
          <ComponentFormField
          name="image"
          labelName='Image de la campagne *'
          placeholder="Url de l'image pour la campagne"
          inputType="url"
          value={form.image}
          handleChange={(e:any)=>{handleFormFieldChange('image',e)}}
          />
        </div>

          <div className='flex justify-center items-center mt-[40px]'>
            <ComponentButton
            btnType='submit'
            title='Soumettre la campagne'
            styles='bg-[#1dc071]'
            handleClick={()=>{}}
            />
          </div>
      </form>
    </div>
  )
}

export default PageCreateCampaign