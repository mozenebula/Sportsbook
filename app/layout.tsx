"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import React from "react";
import Hero from "@/components/Hero";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const isHero = React.isValidElement(children) && children.type === Hero ;

    return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className="dark:bg-black pb-0">
      <Providers>
          <Header/>
          {children}
          {/*<Footer />*/}
          {/*<ScrollToTop/>*/}
      </Providers>
      </body>
    </html>
  );
}

import {Providers} from "./providers";

