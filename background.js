// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("Stock Tracker Widget installed!");
  }

  if (details.reason === "update") {
    console.log(
      `Updated from ${details.previousVersion} to ${chrome.runtime.getManifest().version}`,
    );
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchStock") {
    const symbol = request.symbol;
    console.log(`[Background] Fetching stock data for ${symbol}...`);

    // Fetch stock data from TwelveData API

    const apiUrl = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`;
    console.log(`[Background] API URL: ${apiUrl}`);

    fetch(apiUrl)
      .then((response) => {
        console.log(`[Background] Response status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`[Background] API response for ${symbol}:`, data);

        if (data && data.price !== undefined) {
          chrome.storage.local.set({ [`stock_${symbol}`]: data }); // Cache data in chrome.storage
          sendResponse({
            success: true,
            data: {
              regularMarketPrice: parseFloat(data.price),
              regularMarketChange: data.change || 0,
              regularMarketChangePercent: data.percent_change || 0,
            },
          });
        } else {
          throw new Error("Invalid response structure from TwelveData API");
        }
      })
      .catch((error) => {
        console.error(`[Background] Stock fetch error for ${symbol}:`, error);
        sendResponse({
          success: false,
          error: error.message,
        });
      });

    // Return true to indicate async response
    return true;
  }
});

// Handle alarms for periodic price updates
chrome.alarms.create("updateStocks", { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "updateStocks") {
    console.log("[Background] Updating stock prices...");
    // Send message to content script to refresh prices
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs
          .sendMessage(tab.id, { action: "refreshPrices" })
          .catch(() => {
            // Ignore errors if content script not loaded
          });
      });
    });
  }
});
