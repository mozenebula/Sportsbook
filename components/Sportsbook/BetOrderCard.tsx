import {Card, CardBody, Button} from "@nextui-org/react";
import {CardHeader} from "@nextui-org/card";
import {BetInfo, MatchInfo, OddType} from "@/types/SportsData";
import React, {useEffect, useState} from "react";
import {approve} from "@/utils/util";
import {OmniBetsAddress, OBUSDAddress} from "@/public/config";
import {Contract, ethers} from "ethers";
import {ABI} from "@/public/abi/abi";
import {BetOrder} from "@/types/SportsData";


type BetOderProps = {
    betInfo: BetInfo;
}

const BetOrderCard: React.FC<BetOderProps> = ({betInfo}) => {
    const [betOption ,setBetOption] = useState("")
    const [odds, setOdds] = useState("");
    const [betValue, setBetValue] = useState(0);
    const [oddType, setOddType] = useState(BigInt(0));
    const buttonNormalBg = {background:  'linear-gradient(90.76deg, rgb(4, 245, 255) 0.13%, rgb(54, 111, 183) 52.45%)'}

    const generateBetID = () => {
        const timestamp = Date.now();
        const randomNumber = Math.random();
        const randomSuffix = Math.floor(randomNumber * 1000000); // 生成六位数的随机数
        return ethers.keccak256(ethers.toUtf8Bytes(betInfo.matchInfo.name + timestamp + randomSuffix.toString()))
    }

    const bet = async (value: number) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const betContract = new Contract(OmniBetsAddress, ABI[OmniBetsAddress], provider);

        try {
            const signer = await provider.getSigner();
            const contractWithSigner = betContract.connect(signer);
            const functionSig = "createBet(bytes32 matchId, bytes32 betId, uint8 option, uint256 amount)";
            const betValue = BigInt(value * Math.pow(10, 18))
            const transaction = await contractWithSigner[functionSig](betInfo.matchInfo.matchID, generateBetID(), oddType, betValue);
            console.log('Transaction successful:', transaction);
        } catch (error) {
            console.error('Error calling contract method:' + error);
        }
    }


    const clickBet = async () => {
        await approve(OBUSDAddress, OmniBetsAddress, betValue)
        await bet(betValue)
    }

    useEffect(() => {
        if (betInfo?.oddType == OddType.homeWin) {
            setBetOption(betInfo.matchInfo.participants[0].name)
            setOdds(betInfo.matchInfo.odds.homeWin)
            setOddType(BigInt(0))
        } else if (betInfo.oddType == OddType.awayWin) {
            setBetOption(betInfo.matchInfo.participants[1].name)
            setOdds(betInfo.matchInfo.odds.awayWin)
            setOddType(BigInt(2))
        } else {
            setBetOption("Draw")
            setOdds(betInfo.matchInfo.odds.draw)
            setOddType(BigInt(1))
        }

    }, [betInfo]);


    return(
        <div>
        <Card  className="w-full bg-black m-2 rounded-lg shadow-black">
            <CardHeader className="text-lg ">{betInfo.matchInfo.eventGroup}</CardHeader>
            <CardBody className="flex flex-col, flex-nowrap">
                <span className="text-sm text-body-color ">{betInfo.matchInfo.name}</span>
                <div className="flex flex-row flex-nowrap w-full justify-between p-x-2 mt-2">
                    <div className="mb-4 w-1/2 whitespace-nowrap overflow-hidden overflow-ellipsis">{betOption}</div>
                    <div className="w-1/2">Odds: {odds}</div>
                </div>
                <input
                    type="number"
                    name="email"
                    placeholder="Enetr your amount"
                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    onChange={(e) => setBetValue(parseInt(e.target.value))}
                />
            </CardBody>
        </Card>
        <Button className="w-full mt-6 bg-primary m-2 rounded-lg" onClick={clickBet}>Bet</Button>
    </div>);
}


export default BetOrderCard;