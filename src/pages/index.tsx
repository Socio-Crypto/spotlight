import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Home from "../containers/home";
import Layout from "../Layout";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotlight</title>
        <meta name="description" content="The Spotlight Application" />
        <link rel="shortcut icon" href="/static/images/spotlight-icon.ico" />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default HomePage;
