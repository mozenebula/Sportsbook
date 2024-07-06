import { calculateOverrideValues } from "next/dist/server/font-utils";
import { useState } from "react";

const SlipPopup = ({getSlippage}) => {
    const [chooseButton, setchooseButton] = useState(0)

    const slippage = [0.5, 1.0, 2.0]
    const [inputValue, setInputValue] = useState('');
    const [showAlert, setShowAlert] = useState(false)

    const handClick = (index) => {
        setchooseButton(index)
    }

    const chooseSlippageRate = () => {
        if (chooseButton == null && inputValue == null) {
            getSlippage(null)
            console.log(chooseButton + " " + inputValue)
            return
        }
        console.log("value " + parseFloat((parseFloat(inputValue) / 100).toFixed(2)) + " button " + slippage[chooseButton])
        var value = parseFloat((parseFloat(inputValue) / 100).toFixed(2))
        if (isNaN(value)) {
            value = parseFloat((slippage[chooseButton] / 100).toFixed(2))
        }
        console.log("value " + value)
        getSlippage(value)
    }

    const handInputChange = (e) => {
        const value = e.target.value;

        // 使用正则表达式检查输入是否为数字
        if (/^[+]?\d*\.?\d*$/.test(value) || value === '') {
            if ((parseInt(value, 10) > 50)) {
                setShowAlert(true);
            } else {
                setInputValue(value);
            }         
        }
    }


    return(
        <div className="flex p-6 rounded-xl flex-col border-[1px] border-[#0C3F6D] absolute top-[28px] right-0 w-[320px] lg:w-[380px] z-[10]" style={{boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.47), -17px -5px 16px rgba(0, 0, 0, 0.25)', background: 'rgb(21, 29, 68)'}}>
            <div className="mb-6 w-full flex justify-between">
                <span className="text-white font-bold text-[24px]">Transaction Setting</span>
                <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-g h-6 cursor-pointer" onClick={chooseSlippageRate}><path d="M13.8782 12.4989L19.606 6.78357C20.1283 6.26117 20.1283 5.4142 19.606 4.8918C19.0837 4.3694 18.2368 4.3694 17.7145 4.8918L12 10.6204L6.28552 4.8918C5.7632 4.3694 4.91634 4.3694 4.39402 4.8918C3.87169 5.4142 3.87169 6.26117 4.39402 6.78357L10.1218 12.4989L4.39402 18.2142C4.14184 18.4643 4 18.8048 4 19.16C4 19.5153 4.14184 19.8558 4.39402 20.1059C4.64413 20.3581 4.9846 20.5 5.33977 20.5C5.69494 20.5 6.03541 20.3581 6.28552 20.1059L12 14.3773L17.7145 20.1059C17.9646 20.3581 18.3051 20.5 18.6602 20.5C19.0154 20.5 19.3559 20.3581 19.606 20.1059C19.8582 19.8558 20 19.5153 20 19.16C20 18.8048 19.8582 18.4643 19.606 18.2142L13.8782 12.4989Z" fill="white"></path></svg>
            </div>
            <div className="flex-col">
                <div className="relative flex items-center mb-5">
                    <span className="block text-[18px] font-bold">Max Slippage</span>
                    <div className="ml-2 group flex">
                        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.99974 1.36641C3.88854 1.36641 1.36641 3.88854 1.36641 6.99974C1.36641 10.111 3.88854 12.6331 6.99974 12.6331C10.111 12.6331 12.6331 10.111 12.6331 6.99974C12.6331 3.88854 10.111 1.36641 6.99974 1.36641ZM0.0664062 6.99974C0.0664062 3.17056 3.17056 0.0664062 6.99974 0.0664062C10.8289 0.0664062 13.9331 3.17056 13.9331 6.99974C13.9331 10.8289 10.8289 13.9331 6.99974 13.9331C3.17056 13.9331 0.0664062 10.8289 0.0664062 6.99974ZM5.69974 6.78307C5.69974 6.42409 5.99076 6.13307 6.34974 6.13307H7.21641C7.57539 6.13307 7.86641 6.42409 7.86641 6.78307V9.16641H8.08307C8.44205 9.16641 8.73307 9.45743 8.73307 9.81641C8.73307 10.1754 8.44205 10.4664 8.08307 10.4664H6.34974C5.99076 10.4664 5.69974 10.1754 5.69974 9.81641C5.69974 9.45743 5.99076 9.16641 6.34974 9.16641H6.56641V7.43307H6.34974C5.99076 7.43307 5.69974 7.14206 5.69974 6.78307ZM6.99974 5.26641C7.47839 5.26641 7.86641 4.87838 7.86641 4.39974C7.86641 3.9211 7.47839 3.53307 6.99974 3.53307C6.5211 3.53307 6.13307 3.9211 6.13307 4.39974C6.13307 4.87838 6.5211 5.26641 6.99974 5.26641Z" fill="currentColor"></path></svg>
                        <span className="w-[280px] left-0 group-hover:visible invisible group-hover:opacity-100 transition-opacity bg-[#242C58] text-sm text-gray-100 rounded-md absolute opacity-0 top-[30px] p-3 z-[1]">Your transaction will revert if the price Changes unfavorably by more than this percentage</span>
                    </div>
                </div>
                <div className="flex text-xs lg:text-[16px]">
                    {slippage.map((item, index) =>  <div className="w-[69px] flex justify-center items-center p-2 mr-2 rounded-xl cursor-pointer" style={{border: `1px solid ${index === chooseButton?'rgb(10, 232, 249)':'rgb(12, 63, 109)'}`}} onClick={() => handClick(index)}>{item}%</div>)}
                    <div className="rounded-xl bg-transparent overflow-hidden relative bg-transparent">
                        <input placeholder="Custom" className=" p-2 rounded-xl bg-transparent w-full h-full outline-none" style={{border: '1px solid white; max-width: 100px'}} onClick={()=>handClick(null)} onChange={handInputChange} type="text" value={inputValue} maxLength={5}/>
                        <div className="absolute right-[16px] top-[50%] pointer-events-none justify-end w-full flex items-center" style={{transform: 'translate(0px, -50%)'}}><span>%</span>
                        </div>
                    </div>
                </div>
                {
                    showAlert && <div className="flex text-[#961515] font-bold items-center mt-4">
                    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.99974 1.36641C3.88854 1.36641 1.36641 3.88854 1.36641 6.99974C1.36641 10.111 3.88854 12.6331 6.99974 12.6331C10.111 12.6331 12.6331 10.111 12.6331 6.99974C12.6331 3.88854 10.111 1.36641 6.99974 1.36641ZM0.0664062 6.99974C0.0664062 3.17056 3.17056 0.0664062 6.99974 0.0664062C10.8289 0.0664062 13.9331 3.17056 13.9331 6.99974C13.9331 10.8289 10.8289 13.9331 6.99974 13.9331C3.17056 13.9331 0.0664062 10.8289 0.0664062 6.99974ZM5.69974 6.78307C5.69974 6.42409 5.99076 6.13307 6.34974 6.13307H7.21641C7.57539 6.13307 7.86641 6.42409 7.86641 6.78307V9.16641H8.08307C8.44205 9.16641 8.73307 9.45743 8.73307 9.81641C8.73307 10.1754 8.44205 10.4664 8.08307 10.4664H6.34974C5.99076 10.4664 5.69974 10.1754 5.69974 9.81641C5.69974 9.45743 5.99076 9.16641 6.34974 9.16641H6.56641V7.43307H6.34974C5.99076 7.43307 5.69974 7.14206 5.69974 6.78307ZM6.99974 5.26641C7.47839 5.26641 7.86641 4.87838 7.86641 4.39974C7.86641 3.9211 7.47839 3.53307 6.99974 3.53307C6.5211 3.53307 6.13307 3.9211 6.13307 4.39974C6.13307 4.87838 6.5211 5.26641 6.99974 5.26641Z" fill="currentColor"></path></svg>
                    <span className="text-[16px]">Max value = 50%</span>
            </div>
                }
            </div>
        </div>
    );
}

export default SlipPopup