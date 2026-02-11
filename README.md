# Stock Tracker Widget (ST.IO)

A Chrome extension that adds a floating stock tracker to any webpage. Add symbols, see live prices and change percentages, and optionally show a ticker bar at the top of the page.

## Features

- **Floating widget** – "ST.IO" button opens the tracker on any page
- **Add stocks** – Enter a symbol (e.g. AAPL, TSLA) and press Enter or click Add Stock
- **Live prices** – Prices and daily change/percent from TwelveData
- **Ticker view** – Optional scrolling ticker bar at the top with all watched symbols
- **Persistent list** – Watchlist stored in Chrome local storage and restored on load
- **Background updates** – Prices refresh every 5 minutes via the background service worker

## Installation

### Load unpacked (developer)

1. Clone or download this repo and open the project folder.
2. Go to `chrome://extensions/`, turn on **Developer mode**, then click **Load unpacked** and select the `stock-tracker-extension` folder.
3. (Optional) Pin the extension from the puzzle menu so the ST.IO widget is easy to access.

### API key (required for live data)

The extension uses [TwelveData](https://twelvedata.com/) for stock prices. You need an API key:

1. Sign up at [TwelveData](https://twelvedata.com/) and get an API key.
2. Extension service workers cannot read `.env` files. Set your key in `background.js` where the API is called (e.g. the `apiKey` variable used in the TwelveData request). Do not commit the key; use a build step or keep it local only.

See `INSTALL.md` if you have more detailed setup steps.

## Usage

1. **Open the widget** – On any page, click the **ST.IO** label. The main widget opens with the input and stock list.
2. **Add a stock** – Type a symbol (e.g. `AAPL`) and press **Enter** or click **Add Stock**.
3. **Ticker view** – Click the gear (⚙️) in the widget header → **Ticker View** to show or hide the top ticker bar. The choice is remembered.
4. **Close** – Click **✕** to close the main widget. ST.IO stays on the page to reopen it.

## Data source

- **TwelveData** – Real-time and delayed prices; free tier has rate limits. See [TwelveData docs](https://twelvedata.com/documentation).

## Tech stack

- **Manifest V3** – Chrome extension with service worker
- **Vanilla JS** – No frameworks; `content.js` (widget + ticker), `background.js` (API + storage)
- **Chrome APIs** – `storage.local`, `alarms`, `runtime.sendMessage`, content scripts
- **Styling** – `styles.css` (widget and ticker)

## Project structure

```
stock-tracker-extension/
├── manifest.json     # Extension config, permissions, content script
├── content.js        # Widget UI, stock list, ticker view logic
├── background.js     # Service worker: TwelveData fetch, storage, alarms
├── styles.css        # Widget and ticker styles
├── popup.html        # Extension popup (optional entry point)
├── popup.js          # Popup logic (if any)
├── icon16.png        # Extension icons
├── icon48.png
├── icon128.png
├── create_icons.html # Helper to generate icons
├── .env              # API key (create locally, do not commit)
└── README.md
```

## Permissions

- **storage** – Save watchlist and ticker view preference
- **alarms** – 5-minute refresh interval
- **notifications** – Reserved for future use
- **host_permissions** – `api.twelvedata.com` (and optionally financialmodelingprep.com) for fetching prices

## Troubleshooting

- **Widget not showing** – Reload the tab after installing or updating the extension; ensure the extension is enabled at `chrome://extensions/`.
- **Prices not loading** – Check your API key and TwelveData rate limits; open DevTools (F12) → Console and look for `[ST.IO]` / `[Background]` logs.
- **Ticker empty** – Add at least one stock in the main widget first; ticker view only shows symbols that are in the list.

## Privacy

- Data is stored only in your browser (Chrome local storage).
- No analytics or tracking; requests go to TwelveData (and any other configured APIs) only for price data.

## License

Use and modify as you like. Stock data is subject to TwelveData’s terms of service.
