# 📊 Stock Tracker Widget - Chrome Extension

A beautiful, real-time stock tracking widget that appears on any webpage. Track multiple stocks with live price updates, custom alerts, and mini charts.

## ✨ Features

- **Real-Time Price Updates** - Prices refresh automatically every 60 seconds
- **Custom Watchlists** - Add unlimited stocks to track
- **Price Alerts** - Set alerts for when stocks reach target prices
- **Mini Charts** - View 5-day price trends at a glance
- **Sleek Design** - Modern, dark-themed UI with smooth animations
- **Minimizable Widget** - Compact mode for distraction-free browsing
- **Browser Notifications** - Get notified of price alerts and significant changes
- **Persistent Storage** - Your watchlist syncs across all tabs

## 🎨 Design Features

- Modern glassmorphism design with backdrop blur
- Smooth animations and transitions
- Distinctive typography using Outfit and JetBrains Mono fonts
- Color-coded price changes (green for gains, red for losses)
- Interactive hover states and micro-interactions
- Responsive mini charts for each stock

## 📦 Installation

### From Source (Developer Mode)

1. **Download the extension files** to a folder on your computer

2. **Open Chrome Extensions page**
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**
   - Click "Load unpacked"
   - Select the `stock-tracker-extension` folder
   - The extension icon should appear in your toolbar

5. **Pin the extension** (optional)
   - Click the puzzle piece icon in your toolbar
   - Find "Stock Tracker Widget" and click the pin icon

## 🚀 Usage

### Adding Stocks

1. Visit any webpage - the widget appears in the bottom-right corner
2. Enter a stock symbol (e.g., AAPL, TSLA, GOOGL) in the input field
3. Click "Add" or press Enter
4. The stock will appear with real-time price data

### Setting Price Alerts

1. Click on any stock in your watchlist
2. Enter your target price in the prompt
3. The extension will notify you when the price crosses your threshold
4. View all active alerts in the "Alerts" tab

### Widget Controls

- **Refresh Button (↻)** - Manually refresh all stock prices
- **Minimize Button (−)** - Collapse to a compact circular icon
- **Remove Button (×)** - Delete individual stocks from watchlist

### Popup Menu

Click the extension icon to access:
- Stock count overview
- Refresh all prices
- Toggle widget visibility
- Clear all stocks

### Tabs

- **List** - View all tracked stocks with prices and charts
- **Alerts** - Manage and view active price alerts

## 📊 Data Source

This extension uses the **Yahoo Finance API** for real-time stock data:
- No API key required
- Free to use
- Covers major stock exchanges worldwide
- Updates every 60 seconds

## 🎯 Supported Stock Symbols

You can track any stock listed on major exchanges:
- **US Stocks**: AAPL, MSFT, GOOGL, AMZN, TSLA, etc.
- **International**: Add exchange suffix (e.g., NESN.SW for Nestlé)
- **Crypto**: BTC-USD, ETH-USD, etc.
- **ETFs**: SPY, QQQ, VOO, etc.

## ⚙️ Settings & Customization

### Automatic Updates
- Prices refresh every 60 seconds in the widget
- Background service checks every 5 minutes
- Manual refresh available anytime

### Notifications
The extension sends browser notifications for:
- Price alerts being triggered
- Significant price movements (>5% change)

### Storage
- All data stored locally in your browser
- Watchlist persists across browser sessions
- No account or login required

## 🔧 Technical Details

### Built With
- **Manifest V3** - Latest Chrome extension standard
- **Vanilla JavaScript** - No external dependencies
- **CSS3** - Modern animations and effects
- **Chrome Storage API** - Persistent data storage
- **Chrome Alarms API** - Scheduled updates
- **Chrome Notifications API** - Alert system

### Files Structure
```
stock-tracker-extension/
├── manifest.json          # Extension configuration
├── content.js            # Main widget logic
├── background.js         # Background service worker
├── popup.html           # Extension popup interface
├── popup.js             # Popup interactions
├── styles.css           # Widget styling
└── icon*.png           # Extension icons
```

### Permissions
- `storage` - Save your watchlist
- `alarms` - Schedule price updates
- `notifications` - Send price alerts
- `host_permissions` - Fetch stock data from Yahoo Finance

## 🐛 Troubleshooting

### Widget not appearing?
- Refresh the page after installing the extension
- Check if the extension is enabled in `chrome://extensions/`
- Try toggling the widget using the extension icon

### Prices not updating?
- Check your internet connection
- Some stock symbols may be invalid
- Yahoo Finance API may have rate limits

### Stock not found?
- Verify the symbol is correct (use official ticker)
- Try adding exchange suffix for international stocks
- Check if the market is open (prices don't update when closed)

## 📝 Tips & Tricks

1. **Keyboard Shortcut** - Press Enter after typing a symbol to add quickly
2. **Minimize for Focus** - Use the minimize button to reduce distraction
3. **Alert Strategy** - Set alerts above resistance and below support levels
4. **Symbol Formatting** - Symbols are automatically converted to uppercase
5. **Quick Remove** - Hover over stocks to reveal the remove button

## 🎨 Customization

Want to customize the appearance? Edit `styles.css`:

```css
:root {
  --stock-primary: #0f172a;      /* Dark background */
  --stock-accent: #3b82f6;       /* Blue accent color */
  --stock-success: #10b981;      /* Green for gains */
  --stock-danger: #ef4444;       /* Red for losses */
}
```

## 🔒 Privacy

- **No data collection** - Everything stored locally
- **No tracking** - No analytics or user tracking
- **No account required** - Works immediately after installation
- **Open source** - All code is visible and auditable

## 📄 License

This extension is provided as-is for personal use. The stock data is provided by Yahoo Finance and subject to their terms of service.

## 🆘 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Verify stock symbols are correct
3. Ensure you have an internet connection
4. Try refreshing the page or reloading the extension

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Detailed stock charts with different timeframes
- [ ] Portfolio tracking with gains/losses
- [ ] Multiple watchlists
- [ ] Export/import watchlists
- [ ] Custom refresh intervals
- [ ] Dark/light theme toggle
- [ ] Multiple widget positions
- [ ] Stock news integration
- [ ] Cryptocurrency support enhancement

## 🙏 Credits

- **Design**: Modern glassmorphism UI
- **Fonts**: Outfit & JetBrains Mono from Google Fonts
- **Data**: Yahoo Finance API
- **Icons**: Custom-generated extension icons

---

**Enjoy tracking your stocks!** 📈✨
# stock-tracker-extension
