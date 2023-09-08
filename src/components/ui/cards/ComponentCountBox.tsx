type CounterBoxProps = {
    title:string;
    value:number | string;
}

const ComponentCountBox:React.FC<CounterBoxProps> = ({ title, value}) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
        <h4 className="w-full font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1C24] rounded-t-[10px] text-center truncate">{value}</h4>
        <p className="font-epilogue front-normal text-[16-px] text-center text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-b-[10px]">{title}</p>
    </div>
  )
}

export default ComponentCountBox;