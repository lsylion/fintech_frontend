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

 function renderStockDetails(stock, code) {
  result.innerHTML = `
    <div class="stock-item">
      <h3>${stock.name}</h3>
      <p><strong>Price:</strong> ${stock.price}</p>
      <p><strong>Change:</strong> ${stock.change}</p>
      <p><strong>Market Cap:</strong> ${stock.marketCap}</p>
      <p>${stock.description}</p>
      <div class="trade-buttons">
        <button id="buyBtn">Purchase</button>
        <button id="sellBtn">Sell</button>
      </div>
    </div>
  `;

  document.getElementById('buyBtn').addEventListener('click', () => {
    openTradeModal("Buy", code, stock);
  });

  document.getElementById('sellBtn').addEventListener('click', () => {
    openTradeModal("Sell", code, stock);
  });
}
function openTradeModal(type, code, stock) {
  document.getElementById('tradeModal').style.display = 'flex';
  document.getElementById('modalTitle').textContent = `${type} ${code}`;
  document.getElementById('modalCode').textContent = code;
  document.getElementById('modalName').textContent = stock.name;
  document.getElementById('modalPrice').textContent = stock.price;
  document.getElementById('quantityInput').value = 1;

  // 模拟获取当前持有数量（后续你可以通过接口替换）
  document.getElementById('modalOwned').textContent = type === "Buy" ? "0" : "35";

  // 保存交易上下文
  currentTrade = { type, code, stock };
}

// 关闭弹窗
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('tradeModal').style.display = 'none';
});

document.getElementById('cancelTradeBtn').addEventListener('click', () => {
  document.getElementById('tradeModal').style.display = 'none';
});

let currentTrade = null;

// 确认交易
document.getElementById('confirmTradeBtn').addEventListener('click', () => {
  const quantity = parseInt(document.getElementById('quantityInput').value);
  if (!quantity || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  const { type, code, stock } = currentTrade;
  alert(`${type} ${quantity} shares of ${code} (${stock.name}) at ${stock.price}`);

  // 后续这里可以调用你的后端 API 进行交易
  document.getElementById('tradeModal').style.display = 'none';
});




  function handleSearch() {
    const code = input.value.trim().toUpperCase();

    if (!code) {
      result.textContent = "Please enter a stock code.";
      return;
    }

    const stock = stockDetailsMap[code];

    if (stock) {
      renderStockDetails(stock, code);
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
