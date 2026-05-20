export function generateAISignal(price: number) {

    const momentum =
      Math.random() * 100;
  
    const volatility =
      Math.random() * 100;
  
    let signal = "WAIT ⚡";
    let strike = "ATM";
    let mood = "SIDEWAYS";
  
    if (momentum > 70 && volatility < 80) {
  
      signal = "BUY CE 🚀";
      mood = "BULLISH";
  
      if (momentum > 85) {
        strike = "OTM";
      } else {
        strike = "ATM";
      }
  
    }
  
    else if (momentum < 35) {
  
      signal = "BUY PE 🔻";
      mood = "BEARISH";
  
      if (volatility > 70) {
        strike = "ITM";
      } else {
        strike = "ATM";
      }
  
    }
  
    if (volatility > 85) {
  
      signal = "SCALP ⚡";
      mood = "VOLATILE";
      strike = "ATM";
  
    }
  
    return {
      signal,
      strike,
      mood,
      confidence:
        Math.floor(momentum),
      momentum:
        Math.floor(momentum),
      volatility:
        Math.floor(volatility),
    };
  }