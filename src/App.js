import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchCryptos } from './CryptoAPI';
import CryptoDetails from './CryptoDetails'; // Ensure this component is set up for showing details
import CryptoChart from './CryptoChart'; // Import the CryptoChart component

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCryptos = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCryptos();
        // Initialize each crypto with an additional isVisible property
        const processedData = data.map(crypto => ({
          ...crypto,
          priceChangeDirection: crypto.price_change_percentage_24h >= 0 ? 'up' : 'down',
          isVisible: false // Initial visibility set to false
        }));
        setCryptos(processedData);
      } catch (error) {
        console.error('Failed to fetch cryptocurrency data:', error);
        setCryptos([]);
      } finally {
        setIsLoading(false);
      }
    };

    getCryptos();
    const interval = setInterval(getCryptos, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleCryptoClick = (id) => {
    // Toggle visibility of the selected crypto
    const updatedCryptos = cryptos.map(crypto => {
      if (crypto.id === id) {
        return { ...crypto, isVisible: !crypto.isVisible };
      }
      return crypto;
    });
    setCryptos(updatedCryptos);
  };

  return (
    <div className="App" style={{ backgroundColor: 'black', color: 'white' }}>
      <h1>Cryptocurrency Tracker</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {cryptos.length > 0 ? (
            cryptos.map((crypto) => (
              <React.Fragment key={crypto.id}>
                <li style={{ backgroundColor: crypto.priceChangeDirection === 'up' ? 'green' : 'red', cursor: 'pointer' }}
                    onClick={() => handleCryptoClick(crypto.id)}>
                  {crypto.name} ({crypto.symbol.toUpperCase()}): ${crypto.current_price}
                </li>
                {crypto.isVisible && (
                  <div style={{ padding: '10px', backgroundColor: '#333' }}>
                    <CryptoDetails crypto={crypto} />
                    <CryptoChart crypto={crypto} />
                    <button onClick={() => handleCryptoClick(crypto.id)} style={{ color: 'white', backgroundColor: 'red', padding: '5px', cursor: 'pointer' }}>Close</button>
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <p>No cryptocurrency data available.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
