const popupWidget = document.createElement("div");
popupWidget.textContent = "ST.IO";
popupWidget.className = "pop_wrapper";
popupWidget.style.display = "flex";
document.body.prepend(popupWidget); // Add element to the top of the body

const mainWidget = document.createElement("div");
mainWidget.style.display = "none"; // Initially hidden
mainWidget.className = "main_widget";
mainWidget.innerHTML = `
  <div>
    <div class="mw-header">
      <h3 class="mw-title">Stock Tracker</h3>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button class="mw-close">✕</button>
        <div class="dropdown-container">
          <button class="dropdown-toggle">⚙️</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" data-action="ticker-view">Ticker View</a>
            <a class="dropdown-item" data-action="info">Info</a>
            <a class="dropdown-item" data-action="dev-info">Developer Info</a>
          </div>
        </div>
      </div>
    </div>
    <div class="mw-content">
      <input type="text" class="stock-input" placeholder="Enter stock symbol (e.g., AAPL)">
      <button class="stock-btn">Add Stock</button>
      <div class="stock-list"></div>
    </div>
  </div>
`;
document.body.appendChild(mainWidget);

const closeButton = mainWidget.querySelector(".mw-close");
const addStockBtn = mainWidget.querySelector(".stock-btn");
const stockInput = mainWidget.querySelector(".stock-input");

closeButton.addEventListener("click", toggleWidget);

// Dropdown functionality
const dropdownToggle = mainWidget.querySelector(".dropdown-toggle");
const dropdownMenu = mainWidget.querySelector(".dropdown-menu");
const dropdownItems = mainWidget.querySelectorAll(".dropdown-item");

dropdownToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-container")) {
    dropdownMenu.classList.remove("active");
  }
});

// Handle dropdown menu items
dropdownItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const action = item.getAttribute("data-action");
    handleDropdownAction(action);
    dropdownMenu.classList.remove("active");
  });
});

function handleDropdownAction(action) {
  switch (action) {
    case "ticker-view":
      toggleTickerView();
      break;
    case "info":
      console.log("[ST.IO] Opening info...");
      alert(
        "Stock Tracker Widget v1.0\nTrack your favorite stocks in real-time!",
      );
      break;
    case "dev-info":
      console.log("[ST.IO] Opening developer info...");
      alert(
        "Developer: BraidonH\nRepository: stock-tracker-extension\nAPI: TwelveData",
      );
      break;
  }
}

function toggleTickerView() {
  let stockTickerTop = document.querySelector(".stock-ticker-top");

  if (stockTickerTop) {
    // Toggle off
    stockTickerTop.remove();
    console.log("[ST.IO] Ticker view closed");
    return;
  }

  // Create ticker container
  stockTickerTop = document.createElement("div");
  stockTickerTop.className = "stock-ticker-top";

  // Get all stock items from the list
  const stockItems = document.querySelectorAll("[class*='stock-item-']");

  if (stockItems.length === 0) {
    alert("No stocks added yet. Add stocks to see them in ticker view!");
    return;
  }

  // Build ticker content
  let tickerHTML = '<div class="ticker-scroll">';

  stockItems.forEach((item) => {
    const symbolEl = item.querySelector("strong");
    const priceEl = item.querySelector("p");
    const changeEl = item.querySelector("[style*='color']");

    const symbol = symbolEl ? symbolEl.textContent : "N/A";
    const price = priceEl ? priceEl.textContent : "$0.00";
    const changeText = changeEl ? changeEl.textContent : "N/A";
    const changeColor = changeEl ? changeEl.style.color : "#0f172a";

    tickerHTML += `
      <div class="ticker-item">
        <span class="ticker-symbol">${symbol}</span>
        <span class="ticker-price">${price}</span>
        <span class="ticker-change" style="color: ${changeColor};">${changeText}</span>
      </div>
    `;
  });

  tickerHTML += "</div>";
  stockTickerTop.innerHTML = tickerHTML;
  document.body.insertBefore(stockTickerTop, document.body.firstChild);
  console.log("[ST.IO] Ticker view opened");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && stockInput.value.trim().toUpperCase()) {
    fetchStockPrice(stockInput.value.trim().toUpperCase());
    stockInput.value = "";
  }
});
addStockBtn.addEventListener("click", () => {
  const symbol = stockInput.value.trim().toUpperCase();
  if (symbol) {
    fetchStockPrice(symbol);
    stockInput.value = "";
  }
});

function toggleWidget() {
  const widget = document.querySelector(".pop_wrapper");
  const mainWidget = document.querySelector(".main_widget");
  if (widget) {
    widget.style.display = widget.style.display === "none" ? "flex" : "none";
  }
  if (mainWidget.style.display === "none") {
    mainWidget.style.display = "block";
  } else {
    mainWidget.style.display = "none";
  }
}

// Fetch stock data from background script
function fetchStockPrice(symbol) {
  console.log(`[ST.IO] Fetching price for ${symbol}...`);

  chrome.runtime.sendMessage(
    { action: "fetchStock", symbol: symbol },
    (response) => {
      console.log("[ST.IO] Background response:", response);

      if (response && response.success && response.data) {
        console.log(
          `[ST.IO] ${symbol} Price:`,
          response.data.regularMarketPrice,
        );
        updateStockDisplay(symbol, response.data);
      } else {
        console.error(
          "[ST.IO] Failed to fetch stock:",
          response?.error || "Unknown error",
        );
      }
    },
  );
}

function updateStockDisplay(symbol, data) {
  const stockList = document.querySelector(".stock-list");
  if (!stockList) return;

  const price = data.regularMarketPrice || "N/A";
  const change = data.regularMarketChange || 0;
  const changePercent = data.regularMarketChangePercent || 0;
  //check if stock item already exists
  const existingItem = document.querySelector(`.stock-item-${symbol}`);
  if (existingItem) {
    return; // Don't add duplicate entries
  }

  const stockItem = document.createElement("div");
  stockItem.className = `stock-item-${symbol}`;
  stockItem.style.display = "flex";
  stockItem.style.justifyContent = "space-between";
  stockItem.style.alignItems = "center";
  stockItem.style.padding = "6px 0";
  stockItem.style.maxHeight = "max-content";
  stockItem.style.border = "1px solid #334155";
  stockItem.style.borderRadius = "8px";
  stockItem.style.backgroundColor = "#0f1724"; /* deep slate */
  stockItem.style.color = "#E6EEF8"; /* pale text for contrast */
  stockItem.style.padding = "12px";
  stockItem.style.boxShadow = "0 1px 4px rgba(2,6,23,0.6)";
  stockItem.innerHTML = `
    <div>
      <strong>${symbol}</strong>
      <p>$${price}</p>
    </div>
    <div style="text-align: right; color: ${change < 0 ? "#ef4444" : "#34d399"}">
      ${change > 0 ? "+" : ""}${change.toFixed(2)} (${changePercent > 0 ? "+" : ""}${changePercent.toFixed(2)}%)
    </div>
  `;
  stockList.insertBefore(stockItem, stockList.firstChild);
}

popupWidget.addEventListener("click", toggleWidget);

(function init() {
  console.log("[ST.IO] Initializing Stock Tracker Widget...");
  chrome.storage.local.get(null, (items) => {
    // If there's an error reading storage, log and stop.
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    // Collect stored stock entries and render them. If stored data
    // includes a price object, render immediately; otherwise refetch.
    const stockEntries = Object.keys(items)
      .filter((k) => k.startsWith("stock_"))
      .map((k) => ({
        key: k,
        symbol: k.replace(/^stock_/, ""),
        value: items[k],
      }));
    console.log("[ST.IO] Stored stocks:", stockEntries);

    stockEntries.forEach((entry) => {
      if (entry.value && entry.value.regularMarketPrice != null) {
        updateStockDisplay(entry.symbol, entry.value);
      } else {
        // If we don't have stored price data, fetch fresh data.
        fetchStockPrice(entry.symbol);
      }
    });
  });
})();
