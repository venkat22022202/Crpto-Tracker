// CryptoDetails.js
import React from 'react';

function CryptoDetails({ crypto }) {
  return (
    <div style={{ backgroundColor: 'grey', color: 'white', padding: '10px', margin: '10px' }}>
      <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <p>Current Price: ${crypto.current_price}</p>
      <p>Market Cap: ${crypto.market_cap}</p>
      <p>24h High: ${crypto.high_24h}</p>
      <p>24h Low: ${crypto.low_24h}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default CryptoDetails;
