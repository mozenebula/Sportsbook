import { Typed, ethers, Contract, Wallet } from 'ethers';
import { ContractABI } from '@/types/constractABI';
import { ABI } from '@/public/abi/abi';
import { RouterAddress } from '@/public/config';
import {MatchInfo, SportsData, SportsMatch} from "@/types/SportsData";
import { format, isToday, isTomorrow } from 'date-fns';



export async function balanceOf(contract: string) {
    try {
      if (window.ethereum.isConnected) {
        const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/b77d80e759ce4c0e94276a0afa6ea0fa');
        const coin = new Contract(contract, ABI[contract], provider)
        // 调用合约的一个读取方法（不会修改状态）
        const result = await coin.balanceOf(Typed.address(window.ethereum.selectedAddress))
        const decimals = await coin.decimals()
        console.log("decimals: ", decimals)
        console.log('Result:', result / BigInt(10 ** Number(decimals)));
        return result / BigInt(10 ** Number(decimals));
      }
        
      } catch (error) {
        console.error('Error reading contract data:', error.message);
      }
}

export async function approve(contract: string,desContract: string, value: number) {
  if (window.ethereum.isConnected) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const coinContract = new Contract(contract, ABI[contract], provider);
    try {
      const signer = await provider.getSigner();
      const contractWithSigner = coinContract.connect(signer)
      const bigValue: BigInt = BigInt(value) *  BigInt(Math.pow(10, 18))
      const transaction = await contractWithSigner["approve(address spender, uint value)"](desContract, bigValue);
    
      // 等待交易确认
      await transaction.wait();
      console.log('Transaction successful:', transaction);
      return true
    } catch (error) {
      console.error('Error calling contract method:', error);
      return false
    }
  }
}

export async function addLiquidity(tokenA: string, tokenB:string, amountADesired: number, amountBDesired: number, to: string) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const routerContract = new Contract(RouterAddress, ABI[RouterAddress], provider);
  try {
    
    const signer = await provider.getSigner();
    const contractWithSigner = routerContract.connect(signer)
    const functionFig = "addLiquidity(address tokenA, address tokenB, uint amountADesired,uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline)"
    const deadline = (getCurrentUnixTimestamp() + 1000)
    const valueA = BigInt(amountADesired) *  BigInt(Math.pow(10, 18))
    const valueB = BigInt(amountBDesired) *  BigInt(Math.pow(10, 18))
    const transaction = await contractWithSigner[functionFig](tokenA, tokenB, valueA, valueB, BigInt(0), BigInt(0), to, deadline);
     // 等待交易确认
     await transaction.wait();
     console.log('Transaction successful:', transaction);   
  } catch (error) {
    console.error('Error calling contract method:', error);
  }
  }

export async function swapExactTokensForTokens(amountIn: number, amountOutMin: number, path: string[], to: string) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const routerContract = new Contract(RouterAddress, ABI[RouterAddress], provider);
  try {

    const signer = await provider.getSigner();
    const contractWithSigner = routerContract.connect(signer)
    const functionFig = "swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)"
    const deadline = (getCurrentUnixTimestamp() + 1000)
    const valueIn = BigInt(amountIn * Math.pow(10, 18))
    const valueOut = BigInt(amountOutMin * Math.pow(10, 18))
    const transaction = await contractWithSigner[functionFig](valueIn, valueOut, path, to, deadline)
    console.log('Transaction successful:', transaction); 
  } catch (error) {
    console.error('Error calling contract method:', error);
  } 
}

export async function getAmountsOut(amountIn: number,path: string[]) {
  try {
    if (window.ethereum.isConnected) {
      const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/b77d80e759ce4c0e94276a0afa6ea0fa');
      const router = new Contract(RouterAddress, ABI[RouterAddress], provider)
      let decimals: number[] = []
      for(let i = 0; i < path.length; i++) {
        const contract = new Contract(path[i], ABI[path[i]], provider)
        let decimal = await contract.decimals()
        decimals[i] = Number(decimal)
      }
      const functionSig = "getAmountsOut(uint amountIn, address[] memory path)"
      const valueIn = BigInt(amountIn) * BigInt(Math.pow(10, decimals[0]))
      const result = await router[functionSig](valueIn, path)
      console.log("getAmountsOut Result ", result)
      return result[(path.length - 1)] / BigInt(10 ** decimals[(path.length - 1)]);
    }
  } catch (error) {
    console.error('Error reading contract data:', error.message);
  }
}

export async function getAmountsIn(amountIn: number,path: string[]) {
  try {
    if (window.ethereum.isConnected) {
      const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/b77d80e759ce4c0e94276a0afa6ea0fa');
      const router = new Contract(RouterAddress, ABI[RouterAddress], provider)
      let decimals: number[] = []
      for(let i = 0; i < path.length; i++) {
        const contract = new Contract(path[i], ABI[path[i]], provider)
        let decimal = await contract.decimals()
        decimals[i] = Number(decimal)
      }
      const functionSig = "getAmountsIn(uint amountOut, address[] memory path)"
      const valueIn = BigInt(amountIn) * BigInt(Math.pow(10, decimals[0]))
      const result = await router[functionSig](valueIn, path)
      console.log("getAmountsIn Result ", result)
      return result[0] / BigInt(10 ** decimals[(0)]);
    }
  } catch (error) {
    console.error('Error reading contract data:', error.message);
  }

}

export function getCurrentUnixTimestamp(): number {
  // 获取当前时间的毫秒数
  const currentMilliseconds: number = new Date().getTime();
  
  return Math.floor(currentMilliseconds / 1000);
}


export function formatDate(timestamp: string): string {
  const date = new Date(parseInt(timestamp) * 1000);
  return format(date, 'EEEE, d MMMM, yyyy');
}


export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const timePart = format(date, 'HH:mm');
  let datePart: string;

  if (isToday(date)) {
    datePart = 'Today';
  } else if (isTomorrow(date)) {
    datePart = 'Tomorrow';
  } else {
    datePart = format(date, 'EEE d MMM');
  }

  return `${timePart} - ${datePart}`;
}

export function getMatchesByCategoryAndGroup(
    sportsMatches: SportsMatch,
    categoryID: string,
    eventGroupID: string
): MatchInfo[] {
  return sportsMatches[categoryID]?.[eventGroupID] ?? [];
}






