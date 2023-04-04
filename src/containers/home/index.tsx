import React from "react";
import Link from "next/link";
import NFTCard from "../../components/nftCard";
import { ethers } from "ethers";
import { useAccount, useBalance } from "wagmi";

const Home = () => {
  // connect to wallet
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  console.log("Wallet Balance : ", data);

  return (
    <main className="main bg-image fadeIn-animation overflow-x-hidden flex items-center">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:row-start-1 mb-20 md:mb-0">
          <div className="content flex flex-col justify-center">
            <p className="content__first-title">THE FUTURE OF NFT TRADING</p>
            <p className="content__second-title py-11">
              See where prices are going on Algorand with AI.
              Trade on any marketplace with one-click.
            </p>
            <span>
              <a
                href="https://spotlight-explorer.herokuapp.com/"
                className="content__cta-button cursor-pointer text-white hover:text-white text-lg"
              >
                Explore
              </a>
            </span>
          </div>
        </div>
        <div className="row-start-1   flex items-center justify-center md:justify-end mt-20 md:mt-0">
          <div className="nftcard-container">
            <NFTCard
              cardClassName="nftCard__item1"
              title="Augencore"
              subTitle="Cutting edge (SE)"
              caption="Edition of 1,500"
              titlePrice="Current Price"
              price="0.008"
              imageSource="/static/images/nft1.png"
            />
            <NFTCard
              cardClassName="nftCard__item2"
              title="UNIVERSAL"
              subTitle="LIFE WELL"
              caption="Edition of 1,500"
              titlePrice="Current Price"
              price="0.004"
              imageSource="/static/images/nft2.png"
            />
            <NFTCard
              cardClassName="nftCard__item3"
              title="MARCOLIAN"
              subTitle="UNSTABLE DRONE"
              caption="Edition of 45,000"
              titlePrice="Current Price"
              price="0.003"
              imageSource="/static/images/nft3.png"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
