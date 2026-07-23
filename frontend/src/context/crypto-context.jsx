import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { fakeFetchCrypto, fakeAssets } from "../components/api.js";
import { percentDifference } from "../components/utils.js";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  const mapAssets = (assets, result) => {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  };

  useEffect(() => {
    async function preLoad() {
      setLoading(true);

      const { result } = await fakeFetchCrypto();
      const assets = await fakeAssets();

      setCrypto(result);
      setAssets(mapAssets(assets, result));

      setLoading(false);
    }
    preLoad();
  }, []);

  const addAsset = (newAsset) => {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  };

  return (
    <CryptoContext.Provider value={{ addAsset, loading, crypto, assets }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
