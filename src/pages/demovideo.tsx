import Head from "next/head";
import React from "react";
import DemoVideo from "../containers/demoVideo/demoVideo";
import Layout from "../Layout";

const DemoVideoPage = () => {
  return (
    <>
      <Head>
        <title>Spotlight</title>
        <meta name="description" content="The Spotlight Application" />
        <link rel="shortcut icon" href="/static/images/spotlight-icon.ico" />
      </Head>
      <Layout>
        <DemoVideo />
      </Layout>
    </>
  );
};

export default DemoVideoPage;
