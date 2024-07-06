import { CoinInfo } from "@/types/coinInfo";

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

export const FactoryAddress = "0xB21e7B6c45f15690cC67c3a0C030C7FfCdd82bfE"

export const RouterAddress = "0x4657901554d4cc9fd88379a6cb37b5bc647f7a48"