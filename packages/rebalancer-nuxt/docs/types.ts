type Asset = {
  id: string; //uuid
  name: string;
  amount: number;
};

type AssetClass = {
  id: string; // uuid
  name: string;
  targetRate: number;
  assets: Asset[];
};

type Portfolio = {
  id: string; // uuid
  name: string;
  owner: string; // firebase user id
  assetClasses: AssetClass[];
};
