import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Video from "@/components/Video";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="bg-[url('/images/hero/background.png')] bg-cover h-full">
      <ScrollUp />
      <Hero />
      {/*<Features />*/}
      {/*<Video />*/}
      {/*<Brands />*/}
      {/*<AboutSectionOne />*/}
      {/*<AboutSectionTwo />*/}
      {/*<Testimonials />*/}
      {/*<Pricing />*/}
      {/*<Blog />*/}
      {/*<Contact />*/}
      </div>
    </>
  );
}
