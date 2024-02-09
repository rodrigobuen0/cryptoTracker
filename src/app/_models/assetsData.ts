export class AssetsData {
    id!: number;
    name!: string;
    symbol!: string;
    slug!: string;
    num_market_pairs!: number;
    date_added!: Date;
    infinite_supply!: boolean;
    platform!: Platform;
    cmc_rank!: number;
    self_reported_circulating_supply?: number;
    self_reported_market_cap?: number;
    tvl_ratio?: number;
    last_updated!: Date;
    quote!: Quote;
  }
  
  export class Platform {
    id!: number;
    name!: string;
    symbol!: string;
    slug!: string;
    token_address!: string;
  }
  
  export class Quote {
    usd!: Usd
  }
  
  export class Usd {
    price!: number;
    volume_24h!: number;
    percent_change_1h!: number;
    percent_change_24h!: number;
    percent_change_7d!: number;
    market_cap!: number;
    last_updated!: Date;
  }