import {BetHistoryInfo, OddType} from "@/types/SportsData";
import {Button, Card, CardBody, Divider} from "@nextui-org/react";
import {CardFooter, CardHeader} from "@nextui-org/card";
import React from "react";
import {Contract, ethers} from "ethers";
import {OmniBetsAddress} from "@/public/config";
import {ABI} from "@/public/abi/abi";

type BetHistoryProps = {
    betHistoryInfo: BetHistoryInfo;
}

const HistoryBetCard: React.FC<BetHistoryProps> = ({betHistoryInfo}) => {
    const [buttonText, setButtonText] = React.useState<string>("Claim")
    const buttonNormalBg = {background:  'linear-gradient(90.76deg, rgb(4, 245, 255) 0.13%, rgb(54, 111, 183) 52.45%)'}


    const claimReward = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const betContract = new Contract(OmniBetsAddress, ABI[OmniBetsAddress], provider);


        try {
            const signer = await provider.getSigner();
            const contractWithSigner = betContract.connect(signer);
            const functionSig = "claimReward(bytes32 betId)";
            const transaction = await contractWithSigner[functionSig](betHistoryInfo.betOrder.betId);
            console.log('Transaction successful:', transaction);
            setButtonText("Claimed");
        } catch (error) {
            if (error.data && betContract) {
                // 获取revert信息
                const decodedError = betContract.interface.parseError(error.data).args.toString();
                if (decodedError.trim() == "You lost") {
                    setButtonText("You lost");
                }
                alert(decodedError)

            } else {
                console.error("Error:", error);
            }
        }
    }

    const getOption = () => {
        if (betHistoryInfo.betOrder.option == "0") {
            return betHistoryInfo.matchInfo.participants[0].name
        } else if (betHistoryInfo.betOrder.option == "2") {
            return betHistoryInfo.matchInfo.participants[1].name
        } else {
            return "Draw"
        }

    }

    return(
        <Card  className="w-full bg-black m-2 rounded-lg shadow-black">
      <CardHeader className="text-lg ">{betHistoryInfo.matchInfo.eventGroup}</CardHeader>
      <CardBody className="flex flex-col, flex-nowrap">
        <span className="text-sm text-body-color ">{betHistoryInfo.matchInfo.name}</span>
        <div className="flex flex-row flex-nowrap w-full justify-between p-x-2 mt-2">
          <div className="mb-4 w-1/2 whitespace-nowrap overflow-hidden overflow-ellipsis">{getOption()}</div>
          <div className="w-1/2">Amount: {ethers.formatEther(betHistoryInfo.betOrder.amount)}</div>
        </div>
      </CardBody>
      <Divider/>
      <CardFooter className="text-center p-0" >
        <Button className="text-center w-full" onClick={claimReward} disabled={buttonText != "Claim"}>{buttonText}</Button>
      </CardFooter>
    </Card>
    )

}

export default HistoryBetCard;