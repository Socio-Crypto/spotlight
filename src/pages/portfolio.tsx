import Head from "next/head";
import React from "react";
import Portfolio from "../containers/portfolio";
import Layout from "../Layout";

const PortfolioPage = () => {
  return (
    <>
      <Head>
        <title>Spotlight</title>
        <meta name="description" content="The Spotlight Application" />
        <link rel="shortcut icon" href="/static/images/spotlight-icon.ico" />
      </Head>
      <Layout>
        <Portfolio />
      </Layout>
    </>
  );
};

export default PortfolioPage;
