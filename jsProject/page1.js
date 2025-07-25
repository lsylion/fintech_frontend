document.getElementById('stockBtn').addEventListener('click', () => showStockData());
document.getElementById('bondsBtn').addEventListener('click', () => showBondsData());
// document.getElementById('goldBtn').addEventListener('click', () => showGoldData());
// document.getElementById('cashBtn').addEventListener('click', () => showCashData());
document.getElementById('dailyBtn').addEventListener('click', () => switchChart('daily'));
document.getElementById('weeklyBtn').addEventListener('click', () => switchChart('weekly'));
document.getElementById('monthlyBtn').addEventListener('click', () => switchChart('monthly'));

let dailyChart, historyChart, pieChart;

const stockData_daily = {
  labels: ['2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04', '2025-07-05'],
  high:   [152.3, 157.8, 162.0, 160.5, 165.2], // 最高价
  close:  [150.1, 155.0, 160.2, 158.3, 162.7]  // 收盘价
};
const stockData_weekly = {
  labels: ['2025-06-01', '2025-06-08', '2025-06-15', '2025-06-22', '2025-07-05'],
  high:   [155.0, 140.2, 172.5, 130.8, 155.6],
  close:  [150.0, 135.5, 169.0, 128.0, 152.0]
};
const stockData_monthly = {
  labels: ['2025-03-05', '2025-04-02', '2025-05-03', '2025-06-04', '2025-07-05'],
  high:   [125.0, 160.0, 145.0, 142.0, 175.0],
  close:  [120.0, 155.0, 140.0, 138.0, 169.0]
};

const cashData = {
  labels: ['Stocks', 'Bonds', 'Gold', 'Cash'],
  data: [60, 20, 10, 10] // Example percentage breakdown
};

const historicalData = {
  labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05'],
  data: [1000, 1200, 1100, 1300, 1400]
};

// 历史资产走势数据（模拟）
const assetHistoryData = {
  labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07'],
  values: [100000, 120000, 115000, 130000, 140000, 138000, 150000]
};

// 将时间类型转换为Chart实例的键
function getChartKey(type) {
  return `${type}ChartInstance`;
}

// 初始化所有图表容器
function initChartContainers() {
  const chartContainers = {
    daily: document.getElementById('dailyChart'),
    weekly: document.getElementById('weeklyChart'),
    monthly: document.getElementById('monthlyChart')
  };
  
  // 初始显示日线图
  Object.keys(chartContainers).forEach(key => {
    chartContainers[key].style.display = key === 'daily' ? 'block' : 'none';
  });
  
  return chartContainers;
}

// 创建统一图表函数
function createChart(type, data) {
  const ctx = document.getElementById(`${type}Chart`).getContext('2d');
  
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: '最高价',
          data: data.high,
          borderColor: 'grey',
          backgroundColor: 'rgba(61,52,39,0.1)',
          fill: false,
          tension: 0.1
        },
        {
          label: '收盘价',
          data: data.close,
          borderColor: 'blue',
          backgroundColor: 'rgba(0,123,255,0.1)',
          fill: false,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          grace: '10%'
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      }
    }
  });
}

// 图表切换函数（重写版）
function switchChart(type) {
  // 确保当前图表实例存在
  if (!window.chartInstances) window.chartInstances = {};
  
  // 隐藏所有图表
  const types = ['daily', 'weekly', 'monthly'];
  types.forEach(t => {
    const chartEl = document.getElementById(`${t}Chart`);
    if (chartEl) chartEl.style.display = 'none';
  });
  
  // 显示当前图表
  const currentChartEl = document.getElementById(`${type}Chart`);
  if (currentChartEl) {
    currentChartEl.style.display = 'block';
    
    // 获取当前图表实例键
    const chartKey = getChartKey(type);
    
    // 如果图表尚未创建
    if (!window.chartInstances[chartKey]) {
      // 获取对应数据
      const chartData = {
        daily: stockData_daily,
        weekly: stockData_weekly,
        monthly: stockData_monthly
      }[type];
      
      // 创建新图表
      if (chartData) {
        window.chartInstances[chartKey] = createChart(type, chartData);
      }
    }
    
    // 强制更新图表尺寸
    setTimeout(() => {
      if (window.chartInstances[chartKey]) {
        window.chartInstances[chartKey].resize();
        window.chartInstances[chartKey].update();
      }
    }, 50);
  }
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

function createAssetHistoryChart() {
  const ctx = document.getElementById('dailyChart').getContext('2d');
  if (dailyChart) dailyChart.destroy();
  dailyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: assetHistoryData.labels,
      datasets: [
        {
          label: '历史资产走势',
          data: assetHistoryData.values,
          borderColor: 'green',
          backgroundColor: 'rgba(39, 174, 96, 0.15)',
          fill: true,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
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

// DOM加载初始化
document.addEventListener('DOMContentLoaded', function() {
  // 初始化图表容器
  initChartContainers();
  
  // 初始显示日线图
  window.chartInstances = {};
  window.chartInstances.dailyChartInstance = createChart('daily', stockData_daily);
  
  // 其他初始化代码
  createPieChart();
  createHistoryChart();
});

