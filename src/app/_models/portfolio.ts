import { Ativos } from "./ativos";

export class Portfolio {
    portfolioID?: number;
  userID?: string;
  assetID?: number;
  quantidadeTotal?: number;
  valorMedio?: number;
  ativoCripto?: Ativos;
}