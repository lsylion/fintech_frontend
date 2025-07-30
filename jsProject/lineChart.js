let chartInstance = null;
let weeklyPnL = [], monthlyPnL = [];
let weeklyMV = [], monthlyMV = [];
let isMonthly = false;
let activeChartType = "pnl"; // "pnl" 或 "market"

function renderActiveChart() {
  const dataSet = isMonthly
    ? (activeChartType === "pnl" ? monthlyPnL : monthlyMV)
    : (activeChartType === "pnl" ? weeklyPnL : weeklyMV);

  const label = `${isMonthly ? "Monthly" : "Weekly"} ${activeChartType === "pnl" ? "Profit & Loss" : "Market Value"}`;
  const field = activeChartType === "pnl" ? "profitLoss" : "totalMarketValue";

  const ctx = document.getElementById("chartCanvas").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataSet.map(d => d.date),
      datasets: [{
        label: label,
        data: dataSet.map(d => parseFloat(d[field])),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.3
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

async function fetchData() {
  const [pnlW, pnlM, mvW, mvM] = await Promise.all([
    fetch("http://localhost:3000/weeklyProfitAndLoss").then(res => res.json()),
    fetch("http://localhost:3000/monthlyProfitAndLoss").then(res => res.json()),
    fetch("http://localhost:3000/weeklyMarketValue").then(res => res.json()),
    fetch("http://localhost:3000/monthlyMarketValue").then(res => res.json())
  ]);

  weeklyPnL = pnlW.weeklyProfitAndLoss || [];
  monthlyPnL = pnlM.monthlyProfitAndLoss || [];
  weeklyMV = mvW.weeklyMarketValue || [];
  monthlyMV = mvM.monthlyMarketValue || [];
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();

  // 默认首次显示 Profit & Loss 的 weekly 图
  activeChartType = "pnl";
  isMonthly = false;
  renderActiveChart();

  // 监听周期切换
  document.getElementById("weeklyBtn").addEventListener("click", () => {
    isMonthly = false;
    renderActiveChart(); // 如果之前点击了卡片，则更新图表
  });

  document.getElementById("monthlyBtn").addEventListener("click", () => {
    isMonthly = true;
    renderActiveChart(); // 切换后重新渲染当前卡片的图
  });

  // 监听卡片点击
  document.getElementById("profitCard").addEventListener("click", () => {
    activeChartType = "pnl";
    renderActiveChart();
  });

  document.getElementById("marketCard").addEventListener("click", () => {
    activeChartType = "market";
    renderActiveChart();
  });
});
