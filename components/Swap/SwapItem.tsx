import { CoinInfo } from "@/types/coinInfo"
import Image  from "next/image"

const SwapItem = ({coinInfo, onItemSelected}) => {
    return (
        <div className="p-0">
                        <div className="flex items-center justify-between mb-4 flex items-center rounded-[30px] text-def lg:text-[24px] font-medium cursor-pointer" onClick={()=>onItemSelected(coinInfo)}>
                            <div className="flex items-center p-1 shrink-0 rounded-lg">
                                <div className="flex shrink-0">
                                    <Image className="mr-2 shrink-0" src={coinInfo.icon} alt="" width="36" height="36"/>
                                </div>
                                <div className="flex flex-col text-4 lg:text-[24px]">
                                    <span className="font-bold text-[18px]">{coinInfo.name}</span>
                                    <span className="font-normal text-gray text-[14px] lg:text-[16px]">{coinInfo.description}</span>
                                </div>
                            </div>
                            <span className="font-normal text-[18px]">$0.00</span>
                        </div>
                    </div>
    )
}

export default SwapItem