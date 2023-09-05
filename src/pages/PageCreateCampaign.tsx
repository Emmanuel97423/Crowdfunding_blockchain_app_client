import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { money } from '../assets';
import { ComponentButton, ComponentFormField } from "../components";
import { checkIfImage } from "../../utils";

const PageCreateCampaign:React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
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

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    console.log(form)
  }
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && 'Chargement...'}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Commencer une campagne</h1>
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <ComponentFormField
          labelName='Votre Nom *'
          placeholder="John Doe"
          inputType="text"
          value={form.name}
          handleChange={(e:any)=>{handleFormFieldChange('name',e)}}
          />
           <ComponentFormField
          labelName='Campagne *'
          placeholder="Nom de la campagne"
          inputType="text"
          value={form.title}
          handleChange={(e:any)=>{handleFormFieldChange('title',e)}}

          />
        </div>
         <ComponentFormField
          labelName='Histoire *'
          placeholder="Votre histoire"
          isTextArea
          inputType="text"
          value={form.description}
          handleChange={(e:any)=>{handleFormFieldChange('description',e)}}
          />
          <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
            <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
            <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">Vous recevrez 100% du montant récolté</h4>
          </div>
          <div className='flex flex-wrap gap-[40px]'>
          <ComponentFormField
          labelName='Goal *'
          placeholder="ETH 0.50"
          inputType="number"
          value={form.target}
          handleChange={(e:any)=>{handleFormFieldChange('target',e)}}
          />
           <ComponentFormField
          labelName='Date de fin *'
          placeholder="Date de fin"
          inputType="date"
          value={form.deadline}
          handleChange={(e:any)=>{handleFormFieldChange('deadline',e)}}
          />
          <ComponentFormField
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