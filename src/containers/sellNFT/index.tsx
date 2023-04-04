import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, notification, Spin } from "antd";
import { NextPage } from "next";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { createRaribleSdk } from "@rarible/sdk";
import { toItemId } from "@rarible/types";
import { useRouter } from "next/router";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { EthereumWallet } from "@rarible/sdk-wallet";
import Web3 from "web3";
import { Web3Ethereum } from "@rarible/web3-ethereum";
// import { Contract, getDefaultProvider } from "ethers";
// import { wallet } from "../../testforRunning/constants";
import { EvmChain, GasToken } from "@axelar-network/axelarjs-sdk";
// import { getGasFee, ownerOf, print } from "../../utils";
// import NftLinker from "../../contracts/NftLinker.json";

interface SellFormType {
  blockchain: any;
  contractAddress: string | string[] | undefined;
  tokenId: string | string[] | undefined;
  price: string | string[] | undefined;
}

interface ChainsType {
  name: EvmChain;
  chainId: number;
  rpc: string;
  gateway: string;
  gasReceiver: string;
  tokenName: string;
  tokenSymbol: string;
  executableSample: string;
  constAddressDeployer: string;
  crossChainToken: string;
  erc721: any;
  nftLinker: string;
  contract: any;
  wallet: any;
}

const blockChains = {
  avalanche: "avalanche",
  ethereum: "ethereum",
  polygon: "polygon",
};

const SellNFT: NextPage = () => {
  const router = useRouter();
  const [sellForm] = Form.useForm<SellFormType>();
  const [loading, setLoading] = useState(false);
  const [txhash, setTxhash] = useState<string>();
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [destTxHash, setDestTxHash] = useState<string>();
  const [owner, setOwner] = useState({});

  const allChains: any = require("../../config/testnet.json");

  // const nftSender = async (onSrcConfirmed: (txHash: string) => void) => {
  //   const sourceChain = allChains.find(
  //     (chain: any) => chain.name === sellForm.getFieldValue("blockchain")
  //   );

  //   const rpc = await sourceChain.rpc;

  //   const provider = await getDefaultProvider(rpc);

  //   sourceChain.wallet = await wallet.connect(provider);

  //   sourceChain.contract = await new Contract(
  //     sourceChain.nftLinker as string,
  //     NftLinker.abi,
  //     sourceChain.wallet
  //   );
  //   // sourceChain.erc721 = await new Contract(
  //   //   sourceChain.erc721 as string,
  //   //   ERC721.abi,
  //   //   sourceChain.wallet
  //   // );

  //   const gasFee = getGasFee(
  //     sourceChain.name,
  //     EvmChain.ETHEREUM,
  //     GasToken.AVAX
  //   );

  //   // const owner = await ownerOf(sourceChain, sellForm.getFieldValue("tokenId"));

  //   // console.log({ owner });

  //   console.log("--- Initially ---", owner);
  //   // await print(sourceChain, sellForm.getFieldValue("tokenId"));

  //   // await (
  //   //   await sourceChain.erc721.approve(
  //   //     sourceChain.contract.address,
  //   //     owner.tokenId
  //   //   )
  //   // ).wait();
  //   const tx = await (
  //     await sourceChain.contract.sendNFT(
  //       sellForm.getFieldValue("contractAddress"),
  //       sellForm.getFieldValue("tokenId"),
  //       EvmChain.ETHEREUM,
  //       "0xa7E03b981A6a2bDADc3E995A0C97f5bfA59d356B",
  //       {
  //         value: gasFee,
  //       }
  //     )
  //   ).wait();
  //   console.log("tx", tx);

  //   onSrcConfirmed(tx.transactionHash);

  //   // while (true) {
  //   //   const owner = await ownerOf(
  //   //     sourceChain,
  //   //     sellForm.getFieldValue("tokenId")
  //   //   );
  //   //   if (owner.chain == sourceChain.name) {
  //   //     onSent(owner);
  //   //     break;
  //   //   }
  //   //   await sleep(2000);
  //   // }

  //   console.log("--- Then ---");
  //   // await print(sourceChain, sellForm.getFieldValue("tokenId"));
  // };

  // get parameter from url
  const { bc, ca, ti, p } = router.query;

  // fill form with query
  useEffect(() => {
    const blockChain: any = bc;
    const contractAddress: any = ca;
    const tokenId: any = ti;
    const price: any = p;

    sellForm.setFieldsValue({
      blockchain: blockChain,
      contractAddress: contractAddress,
      tokenId: tokenId,
      price: price,
    });
  }, [bc, ca, ti, p, sellForm]);

  // connect to wallet
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  console.log("Wallet Balance : ", data);

  const { chain, chains } = useNetwork();

  const sdkBlockChainObject = {
    ethereum: "ETHEREUM",
    avalanche: "AVALANCHE",
    polygon: "POLYGON",
  };

  // sdk
  async function sellOnTheSameChain(wallet: any, formData: any) {
    setLoading(true);
    const provider = new HDWalletProvider({
      url: "https://goerli.infura.io/v3/4e60cef6e7b64273a57f454391a75f90",
      privateKeys: [
        "60d673c0546baaae5db89a666d110286f88b1506fa506915b496702eba78fc5d",
      ],
      chainId: 5,
    });
    const web3 = new Web3(provider);
    const web3Ethereum = new Web3Ethereum({ web3 });
    const ethWallet = new EthereumWallet(web3Ethereum);

    const sdk = await createRaribleSdk(ethWallet, "testnet");

    const blockchain: string = formData.blockchain;

    const sellResponse = await sdk.order.sell({
      itemId: toItemId(
        `${blockchain.toUpperCase()}:${formData.contractAddress}:${
          formData.tokenId
        }`
      ),
    });

    
    console.log("sellResponse", sellResponse);

    const expirationTime: number = sellForm.getFieldValue("expirationTime");
    const time: number = sellForm.getFieldValue("time");

    const sellOrderId = await sellResponse.submit({
      amount: 1,
      price: 0.01,
      currency: { "@type": "ETH" },
      expirationDate: new Date(Date.now() + expirationTime * time),
    });
    setLoading(false);
    setResponseMessage(sellOrderId);

    return sellOrderId;
  }

  async function sellOnTheCrossChain(formData: any): Promise<boolean> {
    setLoading(true);
    const onSrcConfirmed = (txhash: string) => {
      setDestTxHash("");
      setTxhash(txhash);
      setLoading(false);
    };
    // const onSent = (owner: any) => {
    //   setOwner(owner);
    //   setLoading(false);
    // };

    // await nftSender(onSrcConfirmed);
    return true;
  }

  const sellNftHandler = async () => {
    if (!isConnected) {
      notification.open({
        message: `Wallet Not Connnected`,
        description: "Please Connect Your Wallet",
        placement: "bottomRight",
        style: { zIndex: 999999 },
      });
      return;
    }

    const formData = sellForm.getFieldsValue();

    if (formData.blockchain === "ethereum") {
      const sellOrderId = await sellOnTheSameChain(address, formData);
    } else {
      const status = await sellOnTheCrossChain(formData);
      if (status) {
        const sellOrderId = await sellOnTheSameChain(address, formData);
      }
    }
  };

  return (
    <main className="main bg-image overflow-hidden">
      <div className="grid grid-cols-11 fadeInUp-animation">
        <div className="col-start-5 col-end-8 px-6 py-5 rounded-md bg-white">
          <h1 className="mb-5 text-center font-bold text-xl">Sell NFT</h1>
          <Form<SellFormType>
            form={sellForm}
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{
              blockchain: "ethereum",
              expirationTime: 1,
              time: "604800000",
            }}
          >
            <Form.Item
              name="contractAddress"
              label="Contract Address"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your Contract Address!",
              //   },
              // ]}
            >
              <Input
                disabled={ca ? true : false}
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Contract Address"
              />
            </Form.Item>
            <Form.Item
              name="tokenId"
              label="Token Id"

              // rules={[
              //   { required: true, message: "Please input your Token Id!" },
              // ]}
            >
              <Input
                disabled={ti ? true : false}
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tokan Id"
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              // rules={[{ required: true, message: "Please input your Price!" }]}
            >
              <Input placeholder="Price" />
            </Form.Item>
            <Form.Item
              name="blockchain"
              label="Blockchain"
              // rules={[
              //   { required: true, message: "Please input your Blockchain!" },
              // ]}
            >
              <Select placeholder="Select The Blockchain">
                <Select.Option value="avalanche">Avalanche</Select.Option>
                <Select.Option value="ethereum">Ethereum</Select.Option>
                <Select.Option value="polygon">Polygon</Select.Option>
              </Select>
            </Form.Item>
            <div className="grid grid-cols-2 gap-5">
              <Form.Item
                name="expirationTime"
                label="Expiration Time"
                // rules={[{ required: true, message: "Please input your Price!" }]}
              >
                <Select placeholder="Select The Time">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                  <Select.Option value="4">4</Select.Option>
                  <Select.Option value="5">5</Select.Option>
                  <Select.Option value="6">6</Select.Option>
                  <Select.Option value="7">7</Select.Option>
                  <Select.Option value="8">8</Select.Option>
                  <Select.Option value="9">9</Select.Option>
                  <Select.Option value="10">10</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="time"
                label=" "
                // rules={[{ required: true, message: "Please input your Price!" }]}
              >
                <Select placeholder="Select The Time">
                  <Select.Option value="3600000">Hour</Select.Option>
                  <Select.Option value="86400000">Day</Select.Option>
                  <Select.Option value="604800000">Week</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item>
              {!responseMessage ? (
                <Button
                  // type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={sellNftHandler}
                  disabled={loading}
                >
                  {loading ? <Spin size="small" /> : <span>Sell NFT</span>}
                </Button>
              ) : (
                <div className="pt-3">
                  <p className="text-green-600 font-bold">
                    Successfully put on sale
                  </p>
                  <Button
                    // type="primary"
                    htmlType="submit"
                    className="login-form-button mt-2"
                    onClick={sellNftHandler}
                    size="small"
                  >
                    <a
                      href={`https://testnet.rarible.com/token/${sellForm.getFieldValue(
                        "contractAddress"
                      )}:${sellForm.getFieldValue("tokenId")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>See NFT in the marketplace</span>
                    </a>
                  </Button>
                </div>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default SellNFT;
