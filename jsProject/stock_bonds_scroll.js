
  async function fetchAndRender(url, containerId, formatter) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('接口返回失败');

      const data = await response.json();
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      const displayList = formatter(data);
      const combined = [...displayList, ...displayList]; // 双份用于滚动

      combined.forEach(item => {
        const div = document.createElement('div');
        div.className = 'scroll-item';
        div.innerText = item;
        container.appendChild(div);
      });
    } catch (err) {
      console.error(`加载${containerId}失败:`, err);
      document.getElementById(containerId).innerHTML = `<div class='scroll-item'>加载失败</div>`;
    }
  }

  // 股票格式化函数
  function formatStocks(data) {
    return data.slice(0, 10).map(stock =>
      `${stock.symbol}\nOpen: ${stock.open}\nClose: ${stock.close}`
    );
  }

 function formatBonds(data) {
  return data.top10Bonds
    .filter(bond => /^[A-Za-z]/.test(bond.symbol.replace(/^(\^)/, "")))
    .map(bond =>
      `${bond.symbol.replace(/^(\^)/, "")}: ${parseFloat(bond.close).toFixed(4)}`
    );
}



  window.addEventListener("DOMContentLoaded", () => {
  // 页面加载完成时自动加载 Stocks 和 Bonds 数据
  fetchAndRender('http://localhost:3000/todayStockData', 'scrollListStocks', formatStocks);
  fetchAndRender('http://localhost:3000/top10Bonds', 'scrollListBonds', formatBonds);
});

