const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface StockData {
  ticker: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockResponse {
  ticker: string;
  start_date: string;
  end_date: string;
  data: StockData[];
  percent_change: number;
}

export interface ComparisonResponse {
  comparison: Array<{
    ticker: string;
    percent_change: number;
    data: StockData[];
  }>;
  start_date: string;
  end_date: string;
}

export const api = {
  async fetchStock(ticker: string): Promise<{ message: string; records: number }> {
    const res = await fetch(`${API_URL}/fetch/${ticker}`);
    if (!res.ok) throw new Error('Failed to fetch stock');
    return res.json();
  },

  async getStock(ticker: string, startDate: string, endDate: string): Promise<StockResponse> {
    const res = await fetch(
      `${API_URL}/stock?ticker=${ticker}&start=${startDate}&end=${endDate}`
    );
    if (!res.ok) throw new Error('Failed to get stock data');
    return res.json();
  },

  async compareStocks(
    ticker1: string,
    ticker2: string,
    startDate: string,
    endDate: string
  ): Promise<ComparisonResponse> {
    const res = await fetch(
      `${API_URL}/compare?ticker1=${ticker1}&ticker2=${ticker2}&start=${startDate}&end=${endDate}`
    );
    if (!res.ok) throw new Error('Failed to compare stocks');
    return res.json();
  },
  async getCurrentPrices() {
    const res = await fetch(`${API_URL}/current-prices`)
    if (!res.ok) throw new Error('Failed to fetch current prices')
    return res.json()
  },
};
