interface Strategy {
  position_sizing: {
    initial_risk: number;
    equity_risk: number;
    on_going_limit: number;
  };
  buy_sell_engine: {
    is_on_going: boolean;
    side: "both" | "buy" | "sell";
    buy_condition: string;
    sell_condition: string;
  };
}

interface Asset {
  allocation: number;
  strategy: Strategy;
}

export interface BacktestConfig {
  name: string;
  backtest_time: {
    start: string;
    end: string;
  };
  indicator: {
    ema: number;
    atr: number;
    volatility_factor: number;
  };
  broker: {
    max_slot: number;
    capital: number;
  };
  assets: {
    [key: string]: Asset;
  };
  reporter: {
    report_path: string;
  };
}

// const backtestConfig: BacktestConfig = {
//   "name": "ema_coin",
//   "backtest_time": {
//     "start": "2011-08-18",
//     "end": "2024-03-12"
//   },
//   "indicator": {
//     "ema": 15,
//     "atr": 14,
//     "volatility_factor": 1
//   },
//   "broker": {
//     "max_slot": 2,
//     "capital": 100000
//   },
//   "assets": {
//     "BTCUSD": {
//       "allocation": 0.5,
//       "strategy": {
//         "position_sizing": {
//           "initial_risk": 0.02,
//           "equity_risk": 0.5,
//           "on_going_limit": 0.95
//         },
//         "buy_sell_engine": {
//           "is_on_going": true,
//           "side": "both",
//           "buy_condition": "tclose.crossover.upper_band",
//           "sell_condition": "tclose.crossover.lower_band"
//         }
//       }
//     },
//     "ETHUSD": {
//       "allocation": 0.5,
//       "strategy": {
//         "position_sizing": {
//           "initial_risk": 0.02,
//           "equity_risk": 0.5,
//           "on_going_limit": 0.95
//         },
//         "buy_sell_engine": {
//           "is_on_going": true,
//           "side": "both",
//           "buy_condition": "tclose.crossover.upper_band",
//           "sell_condition": "tclose.crossover.lower_band"
//         }
//       }
//     }
//   },
//   "reporter": {
//     "report_path": "Output"
//   }
// };
