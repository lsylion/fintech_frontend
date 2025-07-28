document.getElementById('stockBtn').addEventListener('click', () => showStockData());

// 初始化全局变量，存储 Chart 实例
window.dailyChart = null;

async function fetchStockData() {
  try {
    const response = await fetch('http://172.30.1.26:3000/ai-thor-mock/api/stockdata');
    if (!response.ok) {
      throw new Error(`网络错误，状态码：${response.status}`);
    }
    const stockData = await response.json();
    console.log('Fetched stock data:', stockData);
    return stockData; // 返回结构 { labels: [...], high: [...], close: [...] }
  } catch (error) {
    console.error('获取股票数据失败:', error);
    alert('获取股票数据失败，请检查网络或服务器');
    return null;
  }
}

async function showStockData() {
  const stockData = await fetchStockData();
  if (!stockData || !stockData.labels || !stockData.high || !stockData.close) {
    alert('股票数据格式错误或为空');
    return;
  }
  createDailyChart(stockData);
}

function createDailyChart(stockData) {
  const canvas = document.getElementById('dailyChart');
  if (!canvas) {
    console.error('Canvas element #dailyChart not found');
    return;
  }

  const ctx = canvas.getContext('2d');

  // 销毁旧图表，防止重复绘制
  if (window.dailyChart instanceof Chart) {
    window.dailyChart.destroy();
  }

  window.dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockData.labels,
      datasets: [
        {
          label: '最高价（Hight）',
          data: stockData.high,
          borderColor: 'red',
          fill: false,
          tension: 0.1
        },
        {
          label: '收盘价（Close）',
          data: stockData.close,
          borderColor: 'blue',
          fill: false,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '股票价格趋势图'
        }
      }
    }
  });
}
