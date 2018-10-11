type Portfolio = {
  id: string; // id of firestore
  name: string;
  owner: string; // firebase user id
  assetClasses: AssetClass[];
};

type AssetClass = {
  id: string; // generated uuid
  name: string;
  targetRate: number;
  assets: Asset[];
};

type Asset = {
  id: string; // generated uuid
  name: string;
  amount: number;
};
