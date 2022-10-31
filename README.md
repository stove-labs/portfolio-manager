# Portfolio Manager by Stove Labs

The Portfolio Manager by Stove Labs is all-in-one Tezos dashboard with configurable widgets and more.

Contents:

- [Price oracles](#price-oracles-both-on-chain-and-usdeur)
- [Available widgets](#available-widgets)
  - [Token balance](#token-balance)
  - [Relative token balance change chart](#relative-token-balance-change-chart)
- [Planned features](#planned-features)
- [Contributing](#contributing)

## Price oracles (both on-chain and USD/EUR)

Prices for tokens are determined in $TOKEN/XTZ format through Quipuswap DEX. The XTZ/(EUR, USD) price is fetched from the public and free Coinbase API.
Resulting $TOKEN/(EUR,USD) price is routed through the XTZ pair accordingly. All prices are calculated through spot prices.

## Available widgets

### Token balance

**Shown data:**

- Current token balance
- Current fiat balance
- Historical token balance
- Historical fiat balance (using the current token spot price, not the historical one)
- Relative percentage change for both token and fiat balances

**Available settings:**

- Token
- Historical period (30d, 7d, 24h)

### Relative token balance change chart

**Shown data:**

- Historical token balances for the given historical time period (10 entries total shown on the chart
- Relative token balance change
  - either from start to end of the chart, or from start to the highlighted point on the chart
- Relative token balance change in fiat

**Available settings:**

- Token
- Historical period (30d, 7d, 24h)

## Planned features

- Dashboard pages to group various dashboard configurations (e.g. by DeFi project)
- Widgets:
  - Delegation info
  - Token price
  - Pool liquidity (quipuswap)
  - Tezos domains
  - Token list
  - Operation list (+ mempool support using Better Call Dev)
  - ... is there something you'd like to add? Please open an issue.

## Contributing

If you'd like to contribute by fixing bugs, adding new features or simply by reporting an existing bug - please open an issue in this repository.
