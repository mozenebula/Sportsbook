import Image from "next/image"
import PopupItem from "./PopupItem"


const PopupPage = ({title, coinInfos, onItemSelected}) => {

    return (<>
    <div className="fixed flex items-center justify-center z-[20] top-0 left-0 right-0 lg:w-full h-full">
        <div className="absolute w-full h-full bg-black flex justify-center" style={{opacity: "0.9"}}>
            <div className="p-6 mx-4 lg:mx-0 z-[1] bg-[#010620] rounded-xl m-auto flex flex-col w-full lg:w-[528px]" style={{border: "1px solid rgb(12, 63, 109)"}}>
                <div className="w-full flex justify-between items-center mb-8 border-b-[1px] border-[#0C3F6D] pb-6">
                    <span className="block text-[24px] font-bold text-white ">{title}</span>
                    <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer" onClick={() => onItemSelected(null)}>
                        <path d="M13.8782 12.4989L19.606 6.78357C20.1283 6.26117 20.1283 5.4142 19.606 4.8918C19.0837 4.3694 18.2368 4.3694 17.7145 4.8918L12 10.6204L6.28552 4.8918C5.7632 4.3694 4.91634 4.3694 4.39402 4.8918C3.87169 5.4142 3.87169 6.26117 4.39402 6.78357L10.1218 12.4989L4.39402 18.2142C4.14184 18.4643 4 18.8048 4 19.16C4 19.5153 4.14184 19.8558 4.39402 20.1059C4.64413 20.3581 4.9846 20.5 5.33977 20.5C5.69494 20.5 6.03541 20.3581 6.28552 20.1059L12 14.3773L17.7145 20.1059C17.9646 20.3581 18.3051 20.5 18.6602 20.5C19.0154 20.5 19.3559 20.3581 19.606 20.1059C19.8582 19.8558 20 19.5153 20 19.16C20 18.8048 19.8582 18.4643 19.606 18.2142L13.8782 12.4989Z" fill="white">
                        </path>
                    </svg>
                </div>
                <div className="">
                   {
                    coinInfos.map((item, index) => (<PopupItem key={index} coinInfo={item} onItemSelected={onItemSelected}></PopupItem>))
                   }
                </div>
            </div>
        </div>
    </div>
    </>)
}

export default PopupPage