document.getElementById('stockBtn').addEventListener('click', () => showStockData());
document.getElementById('bondsBtn').addEventListener('click', () => showBondsData());
// document.getElementById('goldBtn').addEventListener('click', () => showGoldData());
// document.getElementById('cashBtn').addEventListener('click', () => showCashData());

let dailyChart, historyChart, pieChart;

const stockData = {
  labels: ['2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04', '2025-07-05'], // Example dates
  data: [150, 155, 160, 158, 162] // Example stock prices
};

const cashData = {
  labels: ['Stocks', 'Bonds', 'Gold', 'Cash'],
  data: [60, 20, 10, 10] // Example percentage breakdown
};

const historicalData = {
  labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05'],
  data: [1000, 1200, 1100, 1300, 1400]
};

function createDailyChart() {
  const ctx = document.getElementById('dailyChart').getContext('2d');
  dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockData.labels,
      datasets: [{
        label: 'Stock Price',
        data: stockData.data,
        borderColor: 'blue',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1
      }]
    }
  });
}

function createPieChart() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: cashData.labels,
      datasets: [{
        data: cashData.data,
        backgroundColor: ['red', 'green', 'yellow', 'blue']
      }]
    }
  });
}

function createHistoryChart() {
  const ctx = document.getElementById('historyChart').getContext('2d');
  historyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: historicalData.labels,
      datasets: [{
        label: 'Account Balance',
        data: historicalData.data,
        backgroundColor: 'purple'
      }]
    }
  });
}

function showStockData() {
  createDailyChart();
  createPieChart();
  createHistoryChart();
}

function showBondsData() {
  // Implement the logic for bonds data visualization
}

function showGoldData() {
  // Implement the logic for gold data visualization
}

function showCashData() {
  // Implement the logic for cash data visualization
}

showStockData(); // Show stock data by default
