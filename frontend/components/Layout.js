import React from "react";
import Head from "next/head";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>React NodeSend</title>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="styles/globals.css" />
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="container mx-auto">{children}</main>
      </div>
    </>
  );
};

export default Layout;
