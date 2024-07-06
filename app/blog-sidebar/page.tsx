"use client"

import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import EventItem from "@/components/Sportsbook/EventItem";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import Image from "next/image";
import {Accordion, AccordionItem} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {sportsMatches, sportsEventsData} from "@/public/sportsData";
import {SportsEvent, MatchInfo, SportsMatch} from "@/types/SportsData";
import {getMatchesByCategoryAndGroup} from "@/utils/util";
import SportsMatchItem from "@/components/Sportsbook/SportsMatchItem";
import eventItem from "@/components/Sportsbook/EventItem";


const itemClasses = {
  title: "font-normal text-medium, text-left",
  startContent: "mr-2",
  trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-12 flex items-center",
  indicator: "text-medium",
  content: "text-small px-2",
};


const BlogSidebarPage = () => {
  var initialEventGroup = ""
  var initialMatches = []
  if (sportsEventsData.length > 0) {
    initialEventGroup = sportsEventsData[0].eventGroup
    initialMatches = getMatchesByCategoryAndGroup(sportsMatches, sportsEventsData[0].categoryID, sportsEventsData[0].eventGroupID)
  }
  const [eventGroup, setEventGroups] = useState(initialEventGroup);
  const [matches, setMatches] = useState<MatchInfo[]>(initialMatches);

  const onClickEvent = (categoryID: string, eventGroupID: string) => {
    const event = sportsEventsData.find(eventItem => eventItem.eventGroupID == eventGroupID && categoryID ==eventItem.categoryID);
    setMatches(getMatchesByCategoryAndGroup(sportsMatches, event.categoryID, event.eventGroupID))
    setEventGroups(event.eventGroup)
  }

  const onClickMatch = () => {

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
                <div className="flex flex-col gap-y-3"><SportsMatchItem sportsMatches={matches}/></div>

              </div>
            </div>
            <div className="w-full px-4 lg:w-3/12 h-screen overflow-y-scroll">
              <div className="mt-12 mb-10 rounded-md bg-primary bg-opacity-5 p-6 dark:bg-opacity-5 lg:mt-0">
                <form className="flex items-center justify-between">
                  <input
                      type="text"
                      placeholder="Search here..."
                      className="palceholder-body-color mr-5 w-full rounded-md border border-transparent py-3 px-5 text-base font-medium text-body-color outline-none focus:border-primary dark:bg-white dark:bg-opacity-10"
                  />
                  <button
                      className="flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-md bg-primary text-white">
                    <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M19.4062 16.8125L13.9375 12.375C14.9375 11.0625 15.5 9.46875 15.5 7.78125C15.5 5.75 14.7188 3.875 13.2812 2.4375C10.3438 -0.5 5.5625 -0.5 2.59375 2.4375C1.1875 3.84375 0.40625 5.75 0.40625 7.75C0.40625 9.78125 1.1875 11.6562 2.625 13.0937C4.09375 14.5625 6.03125 15.3125 7.96875 15.3125C9.875 15.3125 11.75 14.5938 13.2188 13.1875L18.75 17.6562C18.8438 17.75 18.9688 17.7812 19.0938 17.7812C19.25 17.7812 19.4062 17.7188 19.5312 17.5938C19.6875 17.3438 19.6562 17 19.4062 16.8125ZM3.375 12.3438C2.15625 11.125 1.5 9.5 1.5 7.75C1.5 6 2.15625 4.40625 3.40625 3.1875C4.65625 1.9375 6.3125 1.3125 7.96875 1.3125C9.625 1.3125 11.2812 1.9375 12.5312 3.1875C13.75 4.40625 14.4375 6.03125 14.4375 7.75C14.4375 9.46875 13.7188 11.125 12.5 12.3438C10 14.8438 5.90625 14.8438 3.375 12.3438Z"
                          fill="white"
                      />
                    </svg>
                  </button>
                </form>
              </div>
              <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Related Posts
                </h3>
                <ul className="p-8">
                  <li className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <RelatedPost
                        title="Best way to boost your online sales."
                        image="/images/blog/post-01.jpg"
                        slug="#"
                        date="12 Feb 2025"
                    />
                  </li>
                  <li className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
                    <RelatedPost
                        title="50 Best web design tips & tricks that will help you."
                        image="/images/blog/post-02.jpg"
                        slug="#"
                        date="15 Feb, 2024"
                    />
                  </li>
                  <li>
                    <RelatedPost
                        title="The 8 best landing page builders, reviewed"
                        image="/images/blog/post-03.jpg"
                        slug="#"
                        date="05 Jun, 2024"
                    />
                  </li>
                </ul>
              </div>
              <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Popular Category
                </h3>
                <ul className="py-6 px-8">
                  <li>
                    <a
                        href="#0"
                        className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Tailwind Templates
                    </a>
                  </li>
                  <li>
                    <a
                        href="#0"
                        className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Landing page
                    </a>
                  </li>
                  <li>
                    <a
                        href="#0"
                        className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Startup
                    </a>
                  </li>
                  <li>
                    <a
                        href="#0"
                        className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Business
                    </a>
                  </li>
                  <li>
                    <a
                        href="#0"
                        className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                    >
                      Multipurpose
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
                <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap py-6 px-8">
                  <TagButton text="Themes"/>
                  <TagButton text="UI Kit"/>
                  <TagButton text="Tailwind"/>
                  <TagButton text="Startup"/>
                  <TagButton text="Business"/>
                </div>
              </div>

              <NewsLatterBox/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSidebarPage;
