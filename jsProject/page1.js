document.getElementById('stockBtn').addEventListener('click', () => showStockData());
document.getElementById('bondsBtn').addEventListener('click', () => showBondsData());
// document.getElementById('goldBtn').addEventListener('click', () => showGoldData());
// document.getElementById('cashBtn').addEventListener('click', () => showCashData());
document.getElementById('dailyBtn').addEventListener('click', () => switchChart('daily'));
document.getElementById('weeklyBtn').addEventListener('click', () => switchChart('weekly'));
document.getElementById('monthlyBtn').addEventListener('click', () => switchChart('monthly'));

let dailyChart, historyChart, pieChart;

const stockData_daily = {
  labels: ['2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04', '2025-07-05'], // Example dates
  data: [150, 155, 160, 158, 162] // Example stock prices
};
const stockData_weekly = {
  labels: ['2025-06-01', '2025-06-08', '2025-06-15', '2025-06-22', '2025-07-05'], // Example dates
  data: [150, 135, 169, 128, 152] // Example stock prices
};
const stockData_monthly = {
  labels: ['2025-03-05', '2025-04-02', '2025-05-03', '2025-06-04', '2025-07-05'], // Example dates
  data: [120, 155, 140, 138, 169] // Example stock prices
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
      labels: stockData_daily.labels,
      datasets: [{
        label: 'Stock Price',
        data: stockData_daily.data,
        borderColor: 'blue',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1
      }]
    }
  });
}

function createWeeklyChart() {
  const ctx = document.getElementById('dailyChart').getContext('2d');
  dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockData_weekly.labels,
      datasets: [{
        label: 'Stock Price',
        data: stockData_weekly.data,
        borderColor: 'blue',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1
      }]
    }
  });
}

function createMonthlyChart() {
  const ctx = document.getElementById('dailyChart').getContext('2d');
  dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockData_monthly.labels,
      datasets: [{
        label: 'Stock Price',
        data: stockData_monthly.data,
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
        backgroundColor: 'rgba(47, 95, 107, 0.67)',
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

function switchChart(type) {
  if (dailyChart) {
    dailyChart.destroy();
  }
  if (type === 'daily') {
    createDailyChart();
  } else if (type === 'weekly') {
    createWeeklyChart();
  } else if (type === 'monthly') {
    createMonthlyChart();
  }
}

showStockData(); // Show stock data by default
