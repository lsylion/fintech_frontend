const stockDetailsMap = {
  "WWW": {
    name: "World Wide Web Corp",
    price: "$123.45",
    change: "+1.23%",
    marketCap: "10B",
    description: "Leading tech company in web technologies."
  },
  "AAPL": {
    name: "Apple Inc.",
    price: "$193.50",
    change: "+0.56%",
    marketCap: "2.5T",
    description: "Technology giant."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('stockSearchInput');
  const searchBtn = document.getElementById('searchBtn');
  const clearBtn = document.getElementById('clearBtn');
  const result = document.getElementById('searchResult');

  function renderStockDetails(stock) {
    result.innerHTML = `
      <div class="stock-item">
        <h3>${stock.name}</h3>
        <p><strong>Price:</strong> ${stock.price}</p>
        <p><strong>Change:</strong> ${stock.change}</p>
        <p><strong>Market Cap:</strong> ${stock.marketCap}</p>
        <p>${stock.description}</p>
      </div>
    `;
  }

  function handleSearch() {
    const code = input.value.trim().toUpperCase();

    if (!code) {
      result.textContent = "Please enter a stock code.";
      return;
    }

    const stock = stockDetailsMap[code];

    if (stock) {
      renderStockDetails(stock);
    } else {
      result.textContent = `No data found for "${code}".`;
    }
  }

  function handleClear() {
    input.value = '';
    result.textContent = 'Quick Search Results';
  }

  // Event listeners
  searchBtn.addEventListener('click', handleSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  clearBtn.addEventListener('click', handleClear);
});
