let chartInstance = null;
let weeklyPnL = [], monthlyPnL = [];// P&L历史数据
let weeklyMV = [], monthlyMV = [];// marketvalue历史数据
let weeklyMD = [], monthlyMD = [];//total assets历史数据
let isMonthly = false;
let activeChartType = "pnl"; // "pnl" 或 "market"


function renderActiveChart() {
  let dataSet = [];
  let label = "";
  let field = "";

  if (activeChartType === "pnl") {
    dataSet = isMonthly ? monthlyPnL : weeklyPnL;
    label = `${isMonthly ? "Monthly" : "Weekly"} Profit & Loss`;
    field = "profitLoss";
  } else if (activeChartType === "market") {
    dataSet = isMonthly ? monthlyMV : weeklyMV;
    label = `${isMonthly ? "Monthly" : "Weekly"} Market Value`;
    field = "totalMarketValue";
  }  else if (activeChartType === "total") {
     dataSet = isMonthly ? monthlyMD : weeklyMD; // ← 修改这里
     label = `${isMonthly ? "Monthly" : "Weekly"} Total Assets`;
     field = "close";
  }


  const ctx = document.getElementById("chartCanvas").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataSet.map(d => d.date),
      datasets: [{
        label: label,
        data: dataSet.map(d => parseFloat(d[field])),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
  const [pnlW, pnlM, mvW, mvM, mdAll] = await Promise.all([
    fetch("http://localhost:3000/weeklyProfitAndLoss").then(res => res.json()),
    fetch("http://localhost:3000/monthlyProfitAndLoss").then(res => res.json()),
    fetch("http://localhost:3000/weeklyMarketValue").then(res => res.json()),
    fetch("http://localhost:3000/monthlyMarketValue").then(res => res.json()),
    fetch("http://localhost:3000/weeklyMarketData").then(res => res.json())
  ]);

  weeklyPnL = pnlW.weeklyProfitAndLoss || [];
  monthlyPnL = pnlM.monthlyProfitAndLoss || [];
  weeklyMV = mvW.weeklyMarketValue || [];
  monthlyMV = mvM.monthlyMarketValue || [];
  
 // ✅ 正确使用 mdAll
  const marketData = mdAll.marketData || mdAll; // 有些接口直接返回数组，有些包在对象里
  monthlyMD = marketData;
  weeklyMD = marketData.slice(-8,-); // 取最后 7 条数据作为 weekly 数据
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
  document.getElementById("assetCard").addEventListener("click", () => {
  activeChartType = "total";
  renderActiveChart();
});

});
