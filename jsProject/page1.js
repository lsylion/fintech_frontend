document.getElementById('stockBtn').addEventListener('click', () => showStockData());
document.getElementById('bondsBtn').addEventListener('click', () => showBondsData());
// document.getElementById('goldBtn').addEventListener('click', () => showGoldData());
// document.getElementById('cashBtn').addEventListener('click', () => showCashData());
// document.getElementById('dailyBtn').addEventListener('click', () => switchChart('daily'));


// document.getElementById("clearBtn").addEventListener("click", () => {
//   stockSearchInput.value = "";
//   searchResult.innerHTML = "请输入股票代码进行搜索";
//   updateHistory7DaysChart(null);
//   stockSearchInput.focus();
// });



// // 模拟不同股票的7天历史数据（日期和价格）
// const stockHistory7DaysData = {
//   "WWW": {
//     labels: ["2025-07-21", "2025-07-22", "2025-07-23", "2025-07-24", "2025-07-25", "2025-07-26", "2025-07-27"],
//     prices: [120, 122, 119, 121, 123, 125, 124]
//   },
//   "AAPL": {
//     labels: ["2025-07-21", "2025-07-22", "2025-07-23", "2025-07-24", "2025-07-25", "2025-07-26", "2025-07-27"],
//     prices: [190, 192, 191, 193, 195, 194, 196]
//   }
//   // 可继续扩展更多股票历史数据
// };




const cashData = {
  labels: ['Stocks', 'Bonds', 'Gold', 'Cash'],
  data: [60, 20, 10, 10] // Example percentage breakdown
};



function createPieChart() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: cashData.labels,
      datasets: [{
        data: cashData.data,
        backgroundColor: [  "#718cdfcd", 
      "#6bd5aec4", 
      "#f6f654c6", 
      "#ef8c84c0"]
      }]
    }
  });
}



// 初始化并渲染默认图表（weekly）
document.addEventListener("DOMContentLoaded", async () => {

  createPieChart();
});





