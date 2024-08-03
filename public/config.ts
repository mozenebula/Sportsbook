import { CoinInfo } from "@/types/coinInfo";
import {Network} from "@/types/network";


export const coinData: CoinInfo[] = [
    {
        name: "DZRO",
        description: "Dzero",
        icon: "/images/swap/eth.png",
        contract: "0xB26198aBF5efb99C3D81094bd20778C977E63731"
    },
    {
        name: "DPT",
        description: "Desport",
        icon: "/images/swap/DAI.png",
        contract: "0x647Ce0f7017C0F0B7020bca3BaF4B43a7eE2AbCf"
    },
    {
        name: "USDT",
        description: "Tether USD",
        icon: "/images/swap/usdt.png",
        contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    },
    {
        name: "USDC",
        description: "USD Coin",
        icon: "/images/swap/usdc.png",
        contract: ""
    }
]


export const RouterAddress = "0x4657901554d4cc9fd88379a6cb37b5bc647f7a48"

export const OmniBetsAddress = "0x983C0c7bc6F04A871b26324CD40A67225162097b"

export const OBUSDAddress = "0xCcB600331dAde64d5258ABa7e479A1617B917b93"

export const networks: CoinInfo[] = [
    {
        name: "Sepolia",
        icon: "/images/swap/eth.png",
        description: "",
        contract: "https://sepolia.infura.io/v3/b77d80e759ce4c0e94276a0afa6ea0fa"
    },
    {
        name: "Shibuya",
        icon: "/images/shibuya.png",
        description: "",
        contract: "https://evm.shibuya.astar.network"
    }
]

export const transferToken: CoinInfo[] = [
    {
        name: "OBUSD",
        icon: "/images/OBUSD.png",
        description: "Sepolia",
        contract: "0xCcB600331dAde64d5258ABa7e479A1617B917b93"
    },
    {
        name: "OBUSD_SHIBUYA",
        icon: "/images/OBUSD.png",
        description: "Shibuya",
        contract: ""
    }
]