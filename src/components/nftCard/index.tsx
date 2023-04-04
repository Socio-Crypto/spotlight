import React, { FC } from "react";

type Props = {
  title: string;
  subTitle: string;
  caption: string;
  titlePrice: string;
  price: string;
  cardClassName?: string;
  imageSource: string;
};

const NFTCard: FC<Props> = (props) => {
  const {
    title,
    subTitle,
    caption,
    titlePrice,
    price,
    cardClassName,
    imageSource,
  } = props;

  return (
    <div
      className={
        cardClassName ? `${cardClassName} nftCard absolute` : "nftCard"
      }
    >
      <img src={imageSource} alt="avatar1" />
      <div className="flex justify-between pt-6">
        <span>
          <p className="nftCard__title">{title}</p>
          <p className="nftCard__sub-title">{subTitle}</p>
          <p className="nftCard__caption pt-2">{caption}</p>
        </span>
        <span>
          <h1 className="nftCard__price-title pb-1">{titlePrice}</h1>
          <span className="flex justify-between nftCard__price-border">
            <img src="/static/images/ethereum-logo.png" alt="ethereum-logo" />
            <p className="nftCard__price">{price}</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default NFTCard;
