import React from "react";
import { Button, Select, Layout, Space, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useState, useEffect } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetsForm from "../AddAssetsForm";

const headerStyle = {
  textAlign: "center",
  height: 64,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [isModalOpen, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => {
      document.removeEventListener("keypress", keypress);
    };
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((coin) => coin.id === value));
    setSelect(false);
    setModal(true);
  }

  const showModal = () => {
    setModal(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        value="press / to open"
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              atl={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
      <Button onClick={() => setDrawer(true)} type="primary">
        Add asset
      </Button>
      <Drawer
        width={600}
        title="Add asset"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setDrawer((prev) => !prev)}
        open={drawer}
      >
        <AddAssetsForm />
      </Drawer>
    </Layout.Header>
  );
}
