import { Ativos } from "./ativos";

export interface Transacao {
    transactionID: number;
    userID: string;
    portfolioID: number;
    assetID: number;
    tipo: TipoTransacao;
    quantidade: number;
    precoPorUnidade: number;
    taxa: number;
    dataTransacao: Date;
    ativos?: Ativos;
    custo: number;
  }
  
  export enum TipoTransacao {
    Compra = 0,
    Venda = 1,
  }