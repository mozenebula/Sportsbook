'use client';
import Link from "next/link";
import Image from "next/image";
import CoinSwapPopup from "@/components/Swap/CoinSwapPopup";
import { useState, useEffect } from "react";
import { coinData, RouterAddress } from "@/public/config";
import { CoinInfo } from "@/types/coinInfo";
import SlipPopup from "@/components/Swap/SlipPopup";
import { balanceOf, approve, getAmountsOut, swapExactTokensForTokens } from "@/utils/util";
import ChooseButton from "@/components/Swap/ChooseButton"
import DefaultButton from "@/components/Swap/DefaultButton";
import { Contract, ethers } from "ethers";
import { ABI } from "@/public/abi/abi";
const SwapPage = () => {

  enum SWAP {
    Source = "SOURCE",
    Des = "DES"
  }

  const buttonDisabledBg = {background: 'linear-gradient(90.76deg, rgb(12, 58, 87) 0.13%, rgb(20, 40, 93) 52.45%)'}
  const buttonNolmalBg = {background:  'linear-gradient(90.76deg, rgb(4, 245, 255) 0.13%, rgb(54, 111, 183) 52.45%)'}
  const exceedStyle = {background: 'rgba(255, 83, 83, 0.2)',borderRadius: '16px',boxShadow: 'rgba(28, 28, 34, 0.33) 0px 3px 7px',}


  const [source, setSource] = useState(coinData[0])
  const [des, setDes] = useState(null)
  const [postion, setPosition] = useState(SWAP.Source)
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [isSlipVisible, setSlipVisble] = useState(false)
  const [slippageRate, setSlipageRate] = useState(0.02)
  const [sourceBalance, setSourceBalance] = useState(BigInt(0));
  const [desBalance, setDesBalance] = useState(BigInt(0));
  const [sourceValue, setSourceValue] = useState(null)
  const [desValue, setDesValue] = useState(null)
  const [sourceCardstyle, setSourceCardStyle] = useState(null)
  const [desCardstyle, setDesCardStyle] = useState(null)
  const [sourceApproved, setSourceApproved] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonText, setButtonText] = useState(`Approve ${source.name}`)

  useEffect(()=> {
    const getSourceBalance = async () => {
      const balance = await balanceOf(source.contract)
      setSourceBalance(balance)
    }
    setButtonText(`Approve ${source.name}`)
    getSourceBalance()
  }, [source])

  useEffect(() => {
    const getDesBalance = async () => {
      if(des) {
        const balance = await balanceOf(des.contract)
        setDesBalance(balance)
      } else {
        setDesBalance(BigInt(0))
      }   
    }
    getDesBalance()
  }, [des])

  useEffect(() => {
    const calculateOutFromIn = async () => {
      if (sourceValue != null && des != null) {
        const path = [source.contract, des.contract]
        const out = await getAmountsOut(sourceValue, path)
        console.log("Out ",  out)
        setDesValue(Number(out))
      }
    }
    calculateOutFromIn()
  }, [sourceValue, des])

  const togglePopup = (postion: SWAP) => {
    setPopupVisible(true)
    setPosition(postion)
  };

  const showSlip = () => {
    setSlipVisble(true)
  }

  const getSlippage = (rate) => {
    setSlipageRate(rate)
    setSlipVisble(false)
    console.log(rate)
  }


  const onItemSelected = async(item: CoinInfo) => {
    setPopupVisible(false)
    if (item == null) {
      return
    }
    if (postion == SWAP.Source) {
      setSource(item)
    } else {
      setDes(item)
    }
  }

  const change = ()=> {
    var temp = des
    setDes(source)
    setSource(temp)
  }

  const handleClick = async () => {
    if (window.ethereum&&window.ethereum.isConnected) {
      if(sourceValue > 0 && sourceValue < sourceBalance && !sourceApproved) {
        const sourceFlag =  await approve(source.contract, RouterAddress, sourceValue);
        setSourceApproved(sourceFlag)
        setButtonText("Swap")
      }
      if (!buttonDisabled && sourceApproved) {
        const amountMin = desValue * (1 - slippageRate)
        swapExactTokensForTokens(sourceValue, amountMin, [source.contract, des.contract], window.ethereum.selectedAddress)
        setSourceApproved(false)
      }
    } else {
      console.log('MetaMask is not installed');
    }
  }

  const handleInputChange = async (e, position) => {
    const value = e.target.value;

    // 使用正则表达式检查输入是否为整数或小数
    if (/^-?\d*\.?\d*$/.test(value) || value === '') {
      if (position == SWAP.Source) {
        setSourceValue(value);
        if(value > sourceBalance) {
          setSourceCardStyle(exceedStyle);
          setButtonDisabled(true);
        } else {
          setSourceCardStyle(null);
          setButtonDisabled(false);
        }
      } else {
        setDesValue(value)
        if(value > desBalance) {
          setDesCardStyle(exceedStyle);
          setButtonDisabled(true);
        } else {
          setDesCardStyle(null)
        } 
      }      
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mb-4 lg:mb-6 mx-auto max-w-[500px]">
                <div className="border-b-[1px] border-[#0C3F6D] pb-3 lg:pb-6">
                  <div className="relative flex justify-between items-center">
                    <span className="text-[24px] font-bold">
                    Swap
                    </span>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={showSlip}>
                      <path 
                        fill-rule="evenodd" 
                        clip-rule="evenodd" 
                        d="M11.1437 2.78707C11.4258 2.76254 11.7115 2.75 12.0005 2.75C12.2894 2.75 12.5752 2.76254 12.8573 2.78707C12.9105 2.79169 13.0195 2.84224 13.0624 3.0064L13.496 4.66433C13.7159 5.50514 14.3197 6.11415 14.9919 6.44709C15.2522 6.576 15.5031 6.72129 15.7433 6.88164C16.3682 7.29891 17.1983 7.51754 18.0369 7.28746L19.6913 6.83353C19.8546 6.78869 19.953 6.85747 19.9839 6.90137C20.3117 7.36772 20.5994 7.86386 20.8424 8.38481C20.8646 8.4326 20.8755 8.55188 20.7548 8.67119L19.5326 9.87887C18.9153 10.4888 18.6891 11.3151 18.7367 12.0638C18.7458 12.2079 18.7505 12.3533 18.7505 12.5C18.7505 12.6467 18.7458 12.7921 18.7367 12.9362C18.6891 13.6849 18.9153 14.5112 19.5326 15.1211L20.7548 16.3287C20.8755 16.4481 20.8646 16.5674 20.8424 16.6152C20.5994 17.1362 20.3117 17.6322 19.9839 18.0986C19.953 18.1425 19.8546 18.2113 19.6913 18.1665L18.0369 17.7125C17.1983 17.4824 16.3682 17.7011 15.7433 18.1184C15.5031 18.2787 15.2522 18.424 14.9919 18.5529C14.3197 18.8858 13.7159 19.4948 13.496 20.3357L13.0624 21.9936C13.0195 22.1577 12.9105 22.2083 12.8573 22.2129C12.5752 22.2374 12.2894 22.25 12.0005 22.25C11.7115 22.25 11.4258 22.2374 11.1437 22.2129C11.0904 22.2083 10.9815 22.1577 10.9386 21.9936L10.5049 20.3355C10.285 19.4948 9.68123 18.8858 9.00907 18.5529C8.7488 18.424 8.49793 18.2787 8.25779 18.1184C7.63286 17.7011 6.8027 17.4824 5.96414 17.7125L4.30966 18.1665C4.14629 18.2113 4.04788 18.1425 4.01701 18.0986C3.6893 17.6322 3.40156 17.1362 3.15863 16.6152C3.13634 16.5674 3.12541 16.4481 3.24614 16.3287L4.46846 15.121C5.08574 14.5111 5.31199 13.6848 5.26435 12.9362C5.2552 12.7921 5.25053 12.6467 5.25053 12.5C5.25053 12.3533 5.2552 12.2079 5.26435 12.0638C5.31199 11.3152 5.08574 10.4889 4.46846 9.87896L3.24614 8.67119C3.12541 8.5519 3.13634 8.43261 3.15863 8.38482C3.40156 7.86386 3.6893 7.36772 4.01702 6.90137C4.04788 6.85747 4.14629 6.78871 4.30966 6.83353L5.96414 7.28747C6.8027 7.51756 7.63286 7.29893 8.25779 6.88166C8.49793 6.72132 8.7488 6.57604 9.00907 6.44712C9.68122 6.11418 10.285 5.50517 10.5049 4.66437L10.9386 3.0064C10.9815 2.84224 11.0904 2.79169 11.1437 2.78707ZM12.0005 0.5C11.6464 0.5 11.2956 0.515368 10.9488 0.545515C9.83465 0.642371 9.01535 1.46756 8.76178 2.43707L8.32814 4.09506C8.30195 4.19523 8.20979 4.33214 8.01038 4.43091C7.66297 4.60299 7.32838 4.79678 7.00837 5.01046C6.8239 5.13362 6.65948 5.14511 6.55949 5.11767L4.90501 4.66371C3.94015 4.39898 2.81789 4.69444 2.1761 5.60773C1.77301 6.18135 1.41873 6.7921 1.11944 7.43393C0.646987 8.44712 0.952723 9.56818 1.66471 10.2717L2.88703 11.4794C2.96074 11.5523 3.03295 11.7002 3.01889 11.921C3.00671 12.1126 3.00053 12.3056 3.00053 12.5C3.00053 12.6944 3.00671 12.8874 3.01889 13.079C3.03295 13.2998 2.96074 13.4477 2.88703 13.5206L1.66471 14.7283C0.952721 15.4318 0.646987 16.5529 1.11944 17.5661C1.41873 18.208 1.77301 18.8186 2.1761 19.3922C2.81789 20.3055 3.94015 20.601 4.90501 20.3363L6.55949 19.8824C6.65948 19.8549 6.82391 19.8664 7.00837 19.9895C7.32838 20.2033 7.66297 20.3971 8.01038 20.5691C8.20979 20.6678 8.30195 20.8048 8.32814 20.9049L8.76178 22.5629C9.01535 23.5325 9.83465 24.3576 10.9488 24.4545C11.2956 24.4847 11.6464 24.5 12.0005 24.5C12.3546 24.5 12.7054 24.4847 13.0521 24.4545C14.1663 24.3576 14.9856 23.5325 15.2391 22.5629L15.6728 20.9049C15.699 20.8048 15.7911 20.6679 15.9906 20.5691C16.338 20.3971 16.6727 20.2033 16.9926 19.9895C17.1771 19.8664 17.3415 19.8549 17.4416 19.8824L19.0959 20.3363C20.0609 20.601 21.183 20.3055 21.8249 19.3923C22.2279 18.8186 22.5822 18.208 22.8815 17.5661C23.354 16.5529 23.0483 15.4318 22.3362 14.7283L21.114 13.5206C21.0402 13.4478 20.9681 13.2999 20.9822 13.0791C20.9943 12.8875 21.0005 12.6944 21.0005 12.5C21.0005 12.3056 20.9943 12.1125 20.9822 11.9209C20.9681 11.7001 21.0402 11.5522 21.114 11.4794L22.3362 10.2717C23.0483 9.56816 23.354 8.4471 22.8815 7.43392C22.5822 6.79208 22.2279 6.18134 21.8249 5.60773C21.183 4.69442 20.0609 4.39898 19.0959 4.66371L17.4416 5.11764C17.3415 5.14508 17.1771 5.13361 16.9926 5.01044C16.6727 4.79675 16.338 4.60295 15.9906 4.43085C15.7911 4.33209 15.699 4.19519 15.6728 4.09501L15.2391 2.43707C14.9856 1.46756 14.1663 0.642369 13.0521 0.545514C12.7054 0.515367 12.3546 0.5 12.0005 0.5ZM14.2505 12.5C14.2505 13.7426 13.2431 14.75 12.0005 14.75C10.7578 14.75 9.75049 13.7426 9.75049 12.5C9.75049 11.2574 10.7578 10.25 12.0005 10.25C13.2431 10.25 14.2505 11.2574 14.2505 12.5ZM16.5005 12.5C16.5005 14.9853 14.4858 17 12.0005 17C9.51521 17 7.50049 14.9853 7.50049 12.5C7.50049 10.0147 9.51521 8 12.0005 8C14.4858 8 16.5005 10.0147 16.5005 12.5Z" 
                        fill="white">
                      </path>
                    </svg>
                    {isSlipVisible && <SlipPopup getSlippage={getSlippage}></SlipPopup>}
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-[500px] rounded-lg bg-opacity-5  dark:bg-swap py-6 px-6 mb-[-20px]" style={sourceCardstyle}>
                <div className="flex justify-between">
                  <div className="flex-col flex-1">
                    <div className="flex w-full">
                      <div className="relative shrink-0  pr-4" onClick={() => togglePopup(SWAP.Source)}>
                      {source == null? <DefaultButton></DefaultButton> : <ChooseButton coinInfo={source}></ChooseButton>}
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center mb-4 flex-col w-full text-right text-[18px] lg:text-[24px] font-bold items-end">
                          <input className="bg-transparent text-right text-white outline-none w-full lg:max-w-auto" 
                          value={sourceValue} onChange={(e) => handleInputChange(e, SWAP.Source)} disabled={!source}
                          placeholder={source==null? "":"0.00"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <div className="w-full">
                      <div className="flex items-center">
                        <span className="text-[14px] lg:text-[16px]">Balance: {sourceBalance.toString()}
                        </span>
                      </div>
                      </div>
                      {sourceCardstyle != null &&
                      <span className="text-[#FF3D3D] text-xs min-w-[150px] text-right lg:text-[16px] font-bold">Exceeds Balance</span>
                      }
                    </div>
                  </div>
                </div>
              </div> 
              <div className="mx-auto max-w-[500px] text-center">
              <button>
              <div className="cursor-pointer flex items-center justify-center w-[46px] h-[46px] bg-[#1D285A] rounded-full p-2" style={{ border: '2px solid rgb(12, 63, 109)' }} onClick={change}>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px]"><path d="M4.16699 14.166L6.66699 16.666L9.16699 14.166" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.333 3.33398L13.333 16.6673M6.66634 16.6673L6.66634 3.33398L6.66634 16.6673Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.833 5.83398L13.333 3.33398L10.833 5.83398" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
              </button>
              </div>
              <div className="mx-auto max-w-[500px] rounded-lg bg-opacity-5 py-6 px-6 dark:bg-swap mt-[-20px]" style={desCardstyle}>
                <div className="flex justify-between">
                  <div className="flex-col flex-1">
                    <div className="flex w-full">
                      <div className="relative shrink-0  pr-4" onClick={() => togglePopup(SWAP.Des)}>
                      {des == null? <DefaultButton></DefaultButton> : <ChooseButton coinInfo={des}></ChooseButton>}
                      </div>
                      <div className="w-full">
                        <div className="flex justify-center mb-4 flex-col w-full text-right text-[18px] lg:text-[24px] font-bold items-end">
                          <input className="bg-transparent text-right text-white outline-none w-full lg:max-w-auto"
                          value={desValue} onChange={(e) => handleInputChange(e, SWAP.Des)} disabled={!des}
                          placeholder={des == null?"":"0.00"}/>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <div className="w-full">
                      <div className="flex items-center">
                        <span className="text-[14px] lg:text-[16px]">Balance: {desBalance.toString()}
                        </span>
                      </div>
                      </div>
                      {desCardstyle != null &&
                      <span className="text-[#FF3D3D] text-xs min-w-[150px] text-right lg:text-[16px] font-bold">Exceeds Balance</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div><div></div>
              <div className={`bg-primary mx-auto max-w-[500px] mt-6 cursor-pointer rounded-lg flex lg:p-3 p-2 items-center justify-center cursor-not-allowed ${buttonDisabled?"text-[#3A4164]":"text-white"}`} style={buttonDisabled?buttonDisabledBg:buttonNolmalBg} onClick={handleClick}>
                <span className="flex text-[18px] normal-case lg:text-6 ">{buttonText}</span>
              </div>
              </div>
            </div>
          </div>
        </div>
        {isPopupVisible&&<CoinSwapPopup coinInfos={postion == SWAP.Source? coinData.filter(item => item !=des): coinData.filter(item => item != source)} onItemSelected={onItemSelected}></CoinSwapPopup>}
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SwapPage;
