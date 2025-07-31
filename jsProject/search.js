
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById('stockSearchInput');
  const searchBtn = document.getElementById('searchBtn');
  const clearBtn = document.getElementById('clearBtn');
  const outputDiv = document.getElementById('searchOutput');
  const tradeButtons = document.getElementById('tradeButtons');

  let currentTrade = null; // 保存交易上下文

  // 搜索按钮点击事件
  searchBtn.addEventListener('click', () => {
    const stockCode = input.value.trim().toUpperCase();
    if (!stockCode) {
      alert("Please enter a stock code.");
      return;
    }

    fetch("http://localhost:3000/stockData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock_code: stockCode })
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log("接口返回数据:", data);

        if (data && data.name && data.close) {
          outputDiv.innerHTML = `
            <p><strong>${data.name}</strong> (${stockCode})</p>
            <p>Volume: ${data.volume}</p>
            <p>Open Price: $${data.open}</p>
            <p>Low Price: $${data.low}</p>
            <p>Close Price: $${data.close}</p>
            <div class="trade-buttons">
              <button id="buyBtn">Purchase</button>
              <button id="sellBtn">Sell</button>
            </div>
          `;

          // 等元素插入后再绑定按钮事件
          document.getElementById('buyBtn').addEventListener('click', () => {
            openTradeModal("Buy", stockCode, {
              name: data.name,
              price: data.low,
              quantity: data.quantity
            });
          });

          document.getElementById('sellBtn').addEventListener('click', () => {
            openTradeModal("Sell", stockCode, {
              name: data.name,
              price: data.close,
              quantity: data.quantity
            });
          });
          fetchAndRenderStockHistory(stockCode); // ✅ 加这行来画图
        } else {
          outputDiv.innerHTML = "<p>Stock not found or error in response.</p>";
        }
      })
      .catch(error => {
        console.error("请求失败:", error);
        outputDiv.innerHTML = "<p>Error fetching stock data.</p>";
      });
  });

  // 清空按钮
  clearBtn.addEventListener('click', () => {
    input.value = "";
    outputDiv.innerHTML = "";
  });

  // 打开弹窗函数
  function openTradeModal(type, code, stock) {
    console.log("当前股票对象:", stock);
    document.getElementById('tradeModal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = `${type} ${code}`;
    document.getElementById('modalCode').textContent = code;
    document.getElementById('modalName').textContent = stock.name;
    document.getElementById('modalPrice').textContent = stock.price;
    document.getElementById('quantityInput').value = 1;

    // 已持有数量（后台返回）
    document.getElementById('modalOwned').textContent = stock.quantity ?? "0";

    currentTrade = { type, code, stock };
  }

  // 关闭按钮事件
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('tradeModal').style.display = 'none';
  });
  document.getElementById('cancelTradeBtn').addEventListener('click', () => {
    document.getElementById('tradeModal').style.display = 'none';
  });

  //新增显示股票历史7天数据功能
function fetchAndRenderStockHistory(stockCode) {
  fetch("http://localhost:3000/weeklyStockData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock_data: stockCode, period: 7 })
  })
    .then(res => {
      if (!res.ok) throw new Error("获取历史数据失败");
      return res.json();
    })
    .then(historyData => {
      if (!Array.isArray(historyData) || historyData.length === 0) {
        console.warn("历史数据为空");
        return;
      }

      const canvas = document.getElementById("lineChartCanvas");
      if (!canvas) {
        console.warn("图表容器未找到: #chartCanvas");
        return;
      }
      const ctx = canvas.getContext("2d");

      // 这里严格判断并销毁旧图表
      if (window.dailyChart instanceof Chart) {
        window.dailyChart.destroy();
        window.dailyChart = null;
      }

      // 新建 Chart 实例并赋值给全局变量
      window.dailyChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: historyData.map(d => d.labels || d.date),
          datasets: [
            {
              label: "Open Price",
              data: historyData.map(d => parseFloat(d.open)),
              borderColor: "rgba(255, 159, 64, 1)",
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              fill: false,
              tension: 0.3
            },
            {
              label: "Close Price",
              data: historyData.map(d => parseFloat(d.close)),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: false,
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `${stockCode} - 7-Day Open vs Close`
            }
          }
        }
      });
    })
    .catch(err => {
      console.error("绘制历史图表失败:", err);
    });
    //设置id为lineChartCanvas的canvas元素显示
    document.getElementById("lineChartCanvas").style.display = "block";
}




  function refreshStockInfo(stockCode) {
  fetch("http://localhost:3000/stockData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock_code: stockCode })
  })
    .then(response => {
      if (!response.ok) throw new Error('刷新失败');
      return response.json();
    })
    .then(data => {
      if (data && data.name && data.close) {
        // 更新 outputDiv 的内容
        outputDiv.innerHTML = `
          <p><strong>${data.name}</strong> (${stockCode})</p>
          <p>Volume: ${data.volume}</p>
          <p>Open Price: $${data.open}</p>
          <p>Low Price: $${data.low}</p>
          <p>Close Price: $${data.close}</p>
          <div class="trade-buttons">
            <button id="buyBtn">Purchase</button>
            <button id="sellBtn">Sell</button>
          </div>
        `;

        // 重新绑定按钮事件
        document.getElementById('buyBtn').addEventListener('click', () => {
          openTradeModal("Buy", stockCode, {
            name: data.name,
            price: data.low,
            quantity: data.quantity
          });
        });

        document.getElementById('sellBtn').addEventListener('click', () => {
          openTradeModal("Sell", stockCode, {
            name: data.name,
            price: data.close,
            quantity: data.quantity
          });
        });
      } else {
        outputDiv.innerHTML = "<p>Stock not found or error in response.</p>";
      }
    })
    .catch(err => {
      console.error("刷新股票信息失败:", err);
    });
}


  // 确认交易按钮
  document.getElementById('confirmTradeBtn').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const { type, code, stock } = currentTrade;

    // 构造发送数据
    const payload = {
      symbol: code,
      quantity: quantity,
      action: type.toLowerCase() // "Buy" → "buy", "Sell" → "sell"
    };

    // 发送交易请求到后端
    fetch("http://localhost:3000/updateStockQuantity", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error("交易请求失败");
        return res.json();
      })
      .then(data => {
        console.log("交易成功:", data);
        alert(`${type} ${quantity} shares of ${code} (${stock.name}) at ${stock.price}`);
        document.getElementById('tradeModal').style.display = 'none';
        // location.reload();
        refreshStockInfo(code);

      })
      .catch(err => {
        console.error("交易失败:", err);
        alert("交易失败，请检查网络或服务端日志");
      });
  });
});

