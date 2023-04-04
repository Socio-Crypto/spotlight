import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import Link from "next/link";
import { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { useRouter } from "next/router";

interface BuyFormType {
  blockchain: any;
  contractAddress: string | string[] | undefined;
  tokenId: string | string[] | undefined;
  price: string | string[] | undefined;
}

const BuyNFT: NextPage = () => {
  const router = useRouter();
  const [buyForm] = Form.useForm<BuyFormType>();

  // connect to wallet
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  // get parameter from url
  const { bc, ca, ti, p } = router.query;

  // fill form with query
  useEffect(() => {
    const blockChain: any = bc;
    const contractAddress: any = ca;
    const tokenId: any = ti;
    const price: any = p;

    buyForm.setFieldsValue({
      blockchain: blockChain,
      contractAddress: contractAddress,
      tokenId: tokenId,
      price: price,
    });
  }, [bc, ca, ti, p, buyForm]);

  return (
    <main className="main bg-image overflow-hidden">
      <div className="grid grid-cols-11 fadeInUp-animation">
        <div className="col-start-5 col-end-8 p-6 rounded-md bg-white">
          <h1 className="mb-5 text-center font-bold text-xl">Buy NFT</h1>
          <Form
            form={buyForm}
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
              <Button
                disabled={true}
                // type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Buy NFT
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default BuyNFT;
