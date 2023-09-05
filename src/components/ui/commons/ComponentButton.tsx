
type ButtonProps = {
  btnType:"button" | "submit" | "reset" | undefined
  title:string;
  styles:string;
  handleClick:() => void;
}
const ComponentButton = ({btnType, title, styles, handleClick,  }: ButtonProps) => {
  return (
    <button 
    type={btnType} 
    title={title}
    className={`font-epilogue font-semibold test-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
    onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default ComponentButton;