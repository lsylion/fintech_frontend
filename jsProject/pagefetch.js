document.getElementById('stockBtn').addEventListener('click', () => showStockData());

async function fetchStockData() {
  const response = await fetch('http://localhost:3000/api/stockdata');//发送http请求。调用API获取数据
  //读取不同股票数据  /api/stockdata?code=000001
  
  const stockData = await response.json();

  return stockData; //返回的数据结构应为 { labels: [...], data: [...] }
}

async function showStockData() {
  const stockData = await fetchStockData();
  createDailyChart(stockData);//画图
  createPieChart(); // 可选
  createHistoryChart(); // 可选
}

function createDailyChart(stockData) {
  const ctx = document.getElementById('dailyChart').getContext('2d');
  if (window.dailyChart) window.dailyChart.destroy(); // 避免重复画图

  window.dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockData.labels,  //x轴数据
      datasets: [{
        label: 'Stock Price',    // 图例标签
        data: stockData.data,    //y轴数据
        borderColor: 'blue',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1 // 曲线平滑度
      }]
    }
  });
}

