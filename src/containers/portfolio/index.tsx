import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, List, Avatar } from "antd";
import { NextPage } from "next";
import { useAccount } from "wagmi";
// import { Alchemy, Network, OwnedNftsResponse } from "alchemy-sdk";

const Portfolio: NextPage = () => {
  // connect to wallet
  // const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  // const [nfts, setNfts] = useState<OwnedNftsResponse | undefined>(undefined);

  //   console.log("Wallet Balance : ", data);

  // const getAllNfts = () => {
  //   const config = {
  //     apiKey: "nc1GMGpEM_GsVHnvyCQmTl582SCayxcu",
  //     network: Network.ETH_MAINNET,
  //   };
  //   const alchemy = new Alchemy(config);

  //   const main = async () => {
  //     // Get all NFTs
  //     const nfts = await alchemy.nft.getNftsForOwner(address ?? "");
  //     // Print NFTs
  //     setNfts(nfts);
  //   };

  //   const runMain = async () => {
  //     try {
  //       await main();
  //       // process.exit(0);
  //     } catch (error) {
  //       console.log(error);
  //       // process.exit(1);
  //     }
  //   };

  //   runMain();
  // };

  // useEffect(() => {
  //   if (address) getAllNfts();
  // }, [address, getAllNfts]);

  // console.log(nfts);

  const listData: any[] = [
    {
      key: 1,
      title: <p className="text-xl">Mutant Ape Yacht Club #15616</p>,
      contractAddress: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
      tokenId: "15616",
    },
    {
      key: 2,
      title: <p className="text-xl">BASTARD GAN PUNKS V2 #6855</p>,
      contractAddress: "0x31385d3520bced94f77aae104b406994d8f2168c",
      tokenId: "6855",
    },
  ];

  return (
    <main className="main bg-image overflow-hidden">
      <div className="container grid grid-cols-1 pt-10">
        <h1 className="text-white text-3xl pb-5">Portfolio (DEMO)</h1>
        <div className="p-6 rounded-md bg-white">
          {listData.length ? (
            <List
              itemLayout="horizontal"
              dataSource={listData}
              renderItem={(item, index) => (
                <List.Item
                  key={item.key}
                  actions={[
                    <a
                      key={index}
                      href={`https://spotlight-explorer.herokuapp.com/?tokenid=${item.tokenId}&contractaddress=${item.contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button type="default">Explore</Button>
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.contractAddress}
                  />
                </List.Item>
              )}
            />
          ) : (
            <div>
              <p>You have not any NFT</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
