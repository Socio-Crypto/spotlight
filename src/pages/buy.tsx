import Head from "next/head";
import React from "react";
import BuyNFT from "../containers/buyNFT";
import Layout from "../Layout";

const BuyPage = () => {
  return (
    <>
      <Head>
        <title>Spotlight</title>
        <meta name="description" content="The Spotlight Application" />
        <link rel="shortcut icon" href="/static/images/spotlight-icon.ico" />
      </Head>
      <Layout>
        <BuyNFT />
      </Layout>
    </>
  );
};

export default BuyPage;
