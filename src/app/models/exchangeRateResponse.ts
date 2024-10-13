export interface ExchangeRateResponse {
    rates: { [key: string]: number };  // A dictionary where the key is the currency code and the value is the rate
    base: string;
    date: string;
}  