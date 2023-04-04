import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Button, Drawer, notification } from "antd";
import { useAccount, useBalance } from "wagmi";
// import { useMobileCheck } from "../../hooks/useMobileCheck";

const Header = () => {
  // const [isMobile] = useMobileCheck();
  const [open, setOpen] = useState(false);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  const toggleDrawer = () => {
    setOpen((status) => !status);
  };

  console.log(data);

  return (
    <header className="header" style={{ zIndex: 9999 }}>
      <div className="container flex justify-between items-center">
        <Link href="/">
          <img
            className="cursor-pointer header-logo"
            src="/static/images/spotlight-logo.png"
            alt="spotlight-logo"
          />
        </Link>
        <span className="items-center hidden md:flex">
          <span>
            <Link href="/demovideo">
              <p className="text-white cursor-pointer">Demo Video</p>
            </Link>
          </span>
          <span className="mx-8">
            <Link href="https://spotlight-explorer.herokuapp.com/road-map" passHref>
              <a target='_blank'>
                <p className="text-white cursor-pointer">Road Map</p>
              </a>
            </Link>
          </span>
          <span className="mx-4">
            <Link href="https://spotlight-explorer.herokuapp.com/gallery">
              <p className="text-white cursor-pointer">Gallery</p>
            </Link>
          </span>
          {/* <span className="mx-8">
            {isConnected ? (
              <Link href="/portfolio">
                <p className="text-white cursor-pointer">Portfolio</p>
              </Link>
            ) : (
              <p
                className="text-white cursor-pointer"
                onClick={() => {
                  notification.open({
                    message: `Wallet Not Connnected`,
                    description: "Please Connect Your Wallet",
                    placement: "bottomRight",
                    style: { zIndex: 999999 },
                  });
                }}
              >
                Portfolio
              </p>
            )}
          </span>
          <ConnectButton /> */}
        </span>
      </div>
    </header>
  );
};

export default Header;
