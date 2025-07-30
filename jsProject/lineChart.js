let chartInstance = null;
let weeklyData = [];
let monthlyData = [];

async function fetchData(type) {
  const res = await fetch(`http://localhost:3000/${type}ProfitAndLoss`);
  const json = await res.json();
  return json[`${type}ProfitAndLoss`] || [];
}

function renderChart(data, label) {
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  // 清除旧图表
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map(item => item.date),
      datasets: [{
        label,
        data: data.map(item => parseFloat(item.profitLoss)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            callback: value => `$${value.toLocaleString()}`
          }
        }
      }
    }
  });
}

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", async () => {
  weeklyData = await fetchData("weekly");
  monthlyData = await fetchData("monthly");

  // 默认显示 weekly
  renderChart(weeklyData, "Weekly Profit/Loss");

  // 按钮绑定
  document.getElementById("weeklyBtn").addEventListener("click", () => {
    renderChart(weeklyData, "Weekly Profit/Loss");
  });

  document.getElementById("monthlyBtn").addEventListener("click", () => {
    renderChart(monthlyData, "Monthly Profit/Loss");
  });
});
