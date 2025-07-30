const RATE = 7.3;

function formatNumber(num) {
  return num.toLocaleString("en-US");
}

// 获取当日金价
 async function fetchGoldPrice() {
    try {
      const response = await fetch('http://localhost:3000/goldPriceToday');
      if (!response.ok) throw new Error('网络错误');

      const data = await response.json();
      // 假设返回 { price: "1972.35" }
      const priceElement = document.querySelector('.gold-price');
      priceElement.textContent = `$${parseFloat(data.goldPrice).toFixed(2)}`;
    } catch (error) {
      console.error('获取金价失败:', error);
      document.querySelector('.gold-price').textContent = '数据获取失败';
    }
  }

  // 页面加载时立即调用一次
  fetchGoldPrice();

  // 每隔60秒刷新一次金价（可根据需求调整间隔）
  setInterval(fetchGoldPrice, 60000);

// 1. 总资产
async function fetchTotalAssets() {
  const res = await fetch("http://localhost:3000/totalAssets");
  const data = await res.json();
  return data.total;
}

// 2. 总盈亏
async function fetchTotalProfit() {
  const res = await fetch("http://localhost:3000/totalProfitAndLoss");
  const data = await res.json();
  return data.profit;
}

// 3. 每日盈亏
async function fetchDailyProfit() {
  const res = await fetch("http://localhost:3000/dailyProfitAndLoss");
  const data = await res.json();
  return data.dailyProfitAndLoss;
}

// 4. 市值
async function fetchMarketValue() {
  const res = await fetch("http://localhost:3000/marketValue");
  const data = await res.json();
  return data.totalMarketValue;
}

async function updateAllCards() {
  try {
    const [assets, profit, daily, market] = await Promise.all([
      fetchTotalAssets(),
      fetchTotalProfit(),
      fetchDailyProfit(),
      fetchMarketValue()
    ]);

    // 更新总资产卡
    document.getElementById('totalAssets').textContent = `$ ${formatNumber(assets)}`;
    document.getElementById('totalRMB').textContent = `¥ ${formatNumber((assets * RATE).toFixed(2))}`;

    // 更新总盈亏卡
    document.getElementById('profitUSD').textContent = `$ ${formatNumber(profit)}`;
    document.getElementById('profitCNY').textContent = `¥ ${formatNumber((profit * RATE).toFixed(2))}`;

    // 更新每日盈余卡
    document.getElementById('dailyUSD').textContent = `$ ${formatNumber(daily)}`;
    document.getElementById('dailyCNY').textContent = `¥ ${formatNumber((daily * RATE).toFixed(2))}`;

    // 更新市值卡
    document.getElementById('marketUSD').textContent = `$ ${formatNumber(market)}`;
    // document.getElementById('marketRate').textContent = `${market.rate}%`;

  } catch (err) {
    console.error('更新卡片失败:', err);
  }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', updateAllCards);

// 点击卡片时更新（这里只用了资产卡示例）
document.getElementById('assetCard').addEventListener('click', updateAllCards);
