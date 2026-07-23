import React from "react";
import { Flex, Typography } from "antd";

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex align="center">
      <img
        src={coin.icon}
        style={{ width: 40, marginRight: 10 }}
        alt={coin.name}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && coin.symbol}, {coin.name}
      </Typography.Title>
    </Flex>
  );
}
