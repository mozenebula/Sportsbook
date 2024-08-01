"use client"

import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import EventItem from "@/components/Sportsbook/EventItem";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import {Accordion, AccordionItem, CardProvider, Divider} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {sportsMatches, sportsEventsData} from "@/public/sportsData";
import {SportsEvent, MatchInfo, OddType, BetInfo, BetOrder, BetHistoryInfo} from "@/types/SportsData";
import {getMatchesByCategoryAndGroup} from "@/utils/util";
import SportsMatchItem from "@/components/Sportsbook/SportsMatchItem";
import eventItem from "@/components/Sportsbook/EventItem";
import {Tabs, Tab, Card, CardBody, Input} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {CardFooter, CardHeader} from "@nextui-org/card";
import BetOrderCard from "@/components/Sportsbook/BetOrderCard";
import HistoryBetCard from "@/components/Sportsbook/HistoryBetCard";
import {ethers} from "ethers";
import {OmniBetsAddress} from "@/public/config";
import {ABI} from "@/public/abi/abi";
import historyBetCard from "@/components/Sportsbook/HistoryBetCard";



const itemClasses = {
  title: "font-normal text-medium, text-left",
  startContent: "mr-2",
  trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-12 flex items-center",
  indicator: "text-medium",
  content: "text-small px-2",
};


const BlogSidebarPage = () => {
  let initialEventGroup = "";
  let initialMatches = [];
  if (sportsEventsData.length > 0) {
    initialEventGroup = sportsEventsData[0].eventGroup
    initialMatches = getMatchesByCategoryAndGroup(sportsMatches, sportsEventsData[0].categoryID, sportsEventsData[0].eventGroupID)
  }
  const [eventGroup, setEventGroups] = useState(initialEventGroup);
  const [matches, setMatches] = useState<MatchInfo[]>(initialMatches);
  const [betInfo, setBetInfo] = useState<BetInfo>(null);
  const [betHistory, setBetHistory] = useState<BetHistoryInfo[]>([]);

  useEffect(()=> {
    const getHistory  = async () => {
      const betHistory = await fetchHistoryBet(OmniBetsAddress, ABI[OmniBetsAddress], "createBetEvent")
      let betOrderHistory: BetHistoryInfo[] = [];
      sportsEventsData.map((sportsEvent) => {
        sportsMatches[sportsEvent.categoryID][sportsEvent.eventGroupID]?.map((match) => {
          betHistory.map((bet) => {
            if(bet.matchId == match.matchID) {
              betOrderHistory.push({matchInfo: match, betOrder: bet});
            }
          })
        })
      })
      setBetHistory(betOrderHistory)
      console.log("BetHistory" + JSON.stringify(betOrderHistory))
    }
    getHistory()
  }, []);

  const onClickEvent = (categoryID: string, eventGroupID: string) => {
    const event = sportsEventsData.find(eventItem => eventItem.eventGroupID == eventGroupID && categoryID ==eventItem.categoryID);
    setMatches(getMatchesByCategoryAndGroup(sportsMatches, event.categoryID, event.eventGroupID))
    setEventGroups(event.eventGroup)
  }

  const onClickMatch = (match: MatchInfo, oddType: OddType ) => {
    const betInfo:BetInfo = {
      matchInfo: match,
      oddType: oddType
    }
    console.log(betInfo)
    setBetInfo(betInfo)
  }


  async function fetchHistoryBet(contractAddress, abi, eventName, fromBlock = 0, toBlock = 'latest') {
    // 创建提供商（这里使用 MetaMask）
    const provider = new ethers.BrowserProvider(window.ethereum);

    // 创建合约实例
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // 获取事件签名
    const eventFragment = contract.interface.getEvent(eventName);
    const eventSignature = `${eventFragment.name}(${eventFragment.inputs.map(input => input.type).join(',')})`;
    const eventTopic = ethers.id(eventSignature);
    const uidTopic = ethers.hexlify(ethers.zeroPadValue(ethers.getAddress(window.ethereum.selectedAddress), 32));

    // 获取日志
    const logs = await provider.getLogs({
      fromBlock,
      toBlock,
      address: contractAddress,
      topics: [eventTopic, uidTopic]
    });

    const betOrders: BetOrder[] = logs.map(log => {
      const parsedLog = contract.interface.parseLog(log);
      return {
        matchId: parsedLog.args.matchId,
        betId: parsedLog.args.betId,
        uid: parsedLog.args.uid,
        option: parsedLog.args.option.toString(),
        amount: parsedLog.args.amount.toString()
      };
    });
    return betOrders;
  }

  return (
    <>
      <section className="overflow-hidden pt-[180px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-3/12 h-screen overflow-y-scroll">
              <div className="mb-2 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                 Popular Matches
                </h3>
                <ul className="p-2">
                  {sportsEventsData.filter(sportsEvent => sportsEvent.isPopular == true)
                      .map((sportsEvent) => (
                          <li className="mb-1 pb-1 dark:border-white dark:border-opacity-10" onClick={() =>onClickEvent(sportsEvent.categoryID,sportsEvent.eventGroupID)}>
                            <EventItem
                                name={sportsEvent.eventGroup}
                                icon="/images/sportsbook/football.svg"
                                count={getMatchesByCategoryAndGroup(sportsMatches, sportsEvent.categoryID, sportsEvent.eventGroupID).length}
                                isPopular={true}
                            />
                          </li>
                      ))}
                </ul>
              </div>
              <div className="mb-2 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Sports
                </h3>
                <Accordion showDivider={false} itemClasses={itemClasses} isCompact>
                  <AccordionItem key="1" aria-label="Football" title="Football" startContent={
                    <img src="/images/sportsbook/football.svg" className="w-6 h-6"/>
                  } className="text-left">
                    <ul className="p-0">
                      {sportsEventsData.filter(sportEvent => sportEvent.categoryID=="FOOTBALL").map((sportsEvent: SportsEvent) => (
                        <li className="mb-1 pb-1 dark:border-white dark:border-opacity-10" onClick={() =>onClickEvent(sportsEvent.categoryID, sportsEvent.eventGroupID)}>
                          <EventItem
                              name={sportsEvent.eventGroup}
                              icon="/images/sportsbook/dot.svg"
                              count={getMatchesByCategoryAndGroup(sportsMatches, sportsEvent.categoryID, sportsEvent.eventGroupID).length}
                              isPopular={false}
                          />
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                  <AccordionItem key="2" aria-label="Basketball" title="Basketball" startContent={
                    <img src="/images/sportsbook/basketball.svg" className="w-6 h-6"/>
                  } className="text-left">
                    <ul className="p-0">
                      {sportsEventsData.filter(sportEvent => sportEvent.categoryID == "BASKETBALL").map((sportsEvent: SportsEvent) => (
                          <li className="mb-1 pb-1 dark:border-white dark:border-opacity-10" onClick={() =>onClickEvent(sportsEvent.categoryID, sportsEvent.eventGroupID)}>
                            <EventItem
                                name={sportsEvent.eventGroup}
                                icon="/images/sportsbook/dot.svg"
                                count={getMatchesByCategoryAndGroup(sportsMatches, sportsEvent.categoryID, sportsEvent.eventGroupID).length}
                                isPopular={false}
                            />
                          </li>
                      ))}
                    </ul>
                  </AccordionItem>
                  <AccordionItem key="3" aria-label="Tennis" title="Tennis" startContent={
                    <img src="/images/sportsbook/tennis.svg" className="w-6 h-6"/>
                  } className="text-left">
                    <ul className="p-0">
                      {sportsEventsData.filter(sportEvent => sportEvent.categoryID == "TENNIS").map((sportsEvent: SportsEvent) => (
                          <li className="mb-1 pb-1 dark:border-white dark:border-opacity-10" onClick={() =>onClickEvent(sportsEvent.categoryID, sportsEvent.eventGroupID)}>
                            <EventItem
                                name={sportsEvent.eventGroup}
                                icon="/images/sportsbook/dot.svg"
                                count={getMatchesByCategoryAndGroup(sportsMatches, sportsEvent.categoryID, sportsEvent.eventGroupID).length}
                                isPopular={false}
                            />
                          </li>
                      ))}
                    </ul>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 h-screen overflow-y-scroll">
              <div>
                <h4 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {eventGroup}
                </h4>
                <div className="flex flex-col gap-y-3"><SportsMatchItem sportsMatches={matches} onClick={onClickMatch}/></div>

              </div>
            </div>
            <div className="w-full px-4 lg:w-3/12 h-screen overflow-y-scroll">
              <div className="flex w-full flex-col mb-2 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <Tabs aria-label="Options" classNames={{
                  tabList: "gap-6 w-full relative rounded-none px-0 py-0 border-b border-divider",
                  cursor: "w-full",
                  tab: "max-w-fit px-0 h-12",
                  tabContent: "group-data-[selected=true]:text-[#3B82F6]"}}>
                  <Tab key="Order" title="Order" className="rounded-lg flex flex-col flex-nowrap items-center p-4">
                    {betInfo && <BetOrderCard betInfo={betInfo}></BetOrderCard> }
                  </Tab>
                  <Tab key="music" title="History" className="rounded-lg flex flex-col flex-nowrap items-center p-4" >
                    {
                      betHistory.map((bets) => (
                          <HistoryBetCard betHistoryInfo={bets}></HistoryBetCard>
                      ))
                    }

                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSidebarPage;
