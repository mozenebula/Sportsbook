import { CoinInfo } from "@/types/coinInfo"
import Image from "next/image";

const ChooseButton = ({coinInfo}) => {
    return (
    <div className="w-full flex relative flex-col max-w-[200px]">
    <div className="flex items-center justify-between mb-4 flex items-center rounded-[30px] text-def lg:text-[24px] font-medium cursor-pointer">
      <div className="flex items-center p-1 shrink-0 bg-white_10 rounded-[30px]">
      <div className="flex shrink-0">
        <Image className="mr-2 shrink-0" src={coinInfo.icon} alt="" width="36" height="36"/>
      </div>
    <div className="flex flex-col text-4 lg:text-[24px]">
    <span className="text-white font-bold text-def lg:text-[24px]">{coinInfo.name}</span></div><svg viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 mr-2 h-4 w-4"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1704 0.329501C15.6098 0.768836 15.6098 1.48116 15.1704 1.92049L8.79549 8.29545C8.35616 8.7348 7.64384 8.7348 7.2045 8.29545L0.829501 1.92049C0.390166 1.48116 0.390166 0.768836 0.829501 0.329501C1.26884 -0.109834 1.98116 -0.109834 2.42049 0.329501L8 5.90901L13.5795 0.329501C14.0189 -0.109834 14.7311 -0.109834 15.1704 0.329501Z" fill="white"></path></svg></div></div>
    </div>);
}

export default ChooseButton