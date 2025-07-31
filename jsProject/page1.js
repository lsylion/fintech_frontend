let pieChart = null;

async function fetchTotalAssetsAndRenderPie() {
  try {
    const response = await fetch('http://localhost:3000/totalAssets');
    if (!response.ok) throw new Error('接口错误');

    const data = await response.json(); // 解析 JSON
    const cashData = {
      labels: ['Stocks', 'Bonds', 'Gold', 'Cash'],
      data: [data.totalStocks, data.totalBonds, data.totalGold, data.cash]
    };

    renderPieChart(cashData);
  } catch (err) {
    console.error('获取总资产失败：', err);
  }
}

function renderPieChart(cashData) {
  const ctx = document.getElementById('pieChart').getContext('2d');
  if (pieChart) pieChart.destroy(); // 如果已存在，销毁旧图表

  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: cashData.labels,
      datasets: [{
        data: cashData.data,
        backgroundColor: [
          '#718cdfcd', 
          '#6bd5aec4', 
          '#f6f654c6', 
          '#ef8c84c0'
        ]
      }]
    }
  });
}

document.addEventListener("DOMContentLoaded", fetchTotalAssetsAndRenderPie);
