import Head from "next/head";
import Link from "next/link";
import React from "react";
import SellNFT from "../containers/sellNFT";
import Layout from "../Layout";

const SellPage = () => {
  return (
    <>
      <Head>
        <title>Spotlight</title>
        <meta name="description" content="The Spotlight Application" />
        <link rel="shortcut icon" href="/static/images/spotlight-icon.ico" />
      </Head>
      <Layout>
        <SellNFT />
      </Layout>
    </>
  );
};

export default SellPage;
