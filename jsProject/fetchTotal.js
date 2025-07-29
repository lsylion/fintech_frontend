
const cardUrls = [
    'http://localhost:3000/totalAssets',
    'https://your-api.com/total-profit',
    'https://your-api.com/daily-surplus',
    'https://your-api.com/market-value'
  ];

  async function fetchTotalAssets() {
    try {
      const response = await fetch('http://localhost:3000/totalAssets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // method: 'POST',
        // body: JSON.stringify({ key: 'value' }) // 如果需要发送数据，可以在这里添加
      });
      if (!response.ok) throw new Error('Network response is abnormal');
      return await response.json();
    } catch (error) {
      console.error('Failed to obtain total assets:', error);
      throw error; // 重新抛出错误以便外部处理
    }
    }

  async function updateCard() {
  try {
    const data = await fetchTotalAssets();
    //
    // if (!data || data.total === undefined) throw new Error('Missing data');
    //
    // const usd = data.total;

    // 数据验证增强版
    if (!data || typeof data.totalAssets !== 'number') {
      throw new Error(`Invalid data: ${JSON.stringify(data)}`);
    }
    // 强制保留2位小数（兼容字符串/数字类型）
    const usd = parseFloat(data.totalAssets).toFixed(2);

    const cny = usd * 7.3; // 汇率可改为动态来源

    document.getElementById('totalAssets').textContent = `$ ${formatNumber(usd)}`;
    document.getElementById('totalRMB').textContent = `¥ ${formatNumber(cny.toFixed(2))}`;
  } catch (error) {
    console.error('Failed to update the card:', error);
    document.getElementById('totalAssets').textContent = 'Loading failed';
    document.getElementById('totalRMB').textContent = 'Loading failed';
  }
}

  // 页面加载时执行
  // document.addEventListener('DOMContentLoaded', updateCard);
 // 页面加载时执行
  // document.addEventListener('DOMContentLoaded', updateCard);
  document.addEventListener("DOMContentLoaded", async function () {
    try{
    const data = await fetchTotalAssets();

    // if (!data || data.totalAssets === undefined) throw new Error('Countless data');


    const usd = data.total;
    const cny = usd * 7.3; // 假设汇率为 1 USD = 7.3 CNY

    // 更新 DOM
    document.getElementById('totalAssets').textContent = `$ ${formatNumber(usd)}`;
    document.getElementById('totalRMB').textContent = `¥ ${formatNumber(cny.toFixed(2))}`;
    }
    catch (error) {
      console.error('Failed to update the card:', error);
      document.getElementById('totalAssets').textContent = 'Loading failed';
      document.getElementById('totalRMB').textContent = 'Loading failed';
    }
  });

  // function formatNumber(num) {
  //   return num.toLocaleString("en-US");
  // }
// 修改后的 formatNumber 函数（增加防御性处理）
  function formatNumber(num) {
    // 处理无效数字情况
    const parsedNum = parseFloat(num);
    if (isNaN(parsedNum)) return "--"; // 返回占位符

    // 处理有效数字
    return parsedNum.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatNumber(num) {
    return num.toLocaleString("en-US");
  }


// 初始获取
fetchTotalAssets();
// 更新卡片内容
document.getElementById('assetCard').addEventListener('click', updateCard);