import { useState } from "react";
import{ Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../../assets";
import { navlinks } from "../../constants";

type IconProps = {
  name?:string;
  styles?: string;
  imgUrl:string;
  isActive?:string;
  disabled?:boolean;
  handleClick?:()=>void;
}

const Icon = ({isActive, styles, name, imgUrl, disabled, handleClick}) =>{
    return(
          <div className={`w-[48px] h-[48px] rounded-[10px] 
            ${isActive && isActive === name && 'bg-[#2c2f32]'} 
            flex justify-center items-center 
            ${!disabled && 'cursor-pointer'} 
            ${styles}`}
            onClick={handleClick}
            >
              {
                !isActive ? (
                  <img src={imgUrl} alt="fund-logo" className="w-1/2 h-1/2"/>
                ) : (
                  <img src={imgUrl} alt="fund-logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}/>
                )
              }
          </div>
          )
}

const ComponentSidebar:React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className="flex justify-between flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} isActive={undefined} name={undefined} disabled={undefined} handleClick={undefined}/>
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#c1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link)=>(
            <Icon
              styles={undefined} 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              } }            />
          ))}
        </div>
        <Icon styles="bg-[1c1c24] shadow-secondary" imgUrl={sun} isActive={undefined} name={undefined} disabled={undefined}/>
      </div>
    </div>
  )
}

export default ComponentSidebar