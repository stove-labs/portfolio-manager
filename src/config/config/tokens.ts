export interface Token {
  id: string;
  name: string;
  symbol: string;
  contract: {
    address: string;
  };
  metadata: {
    decimals: string;
  };
  pool?: {
    address: string;
  };
}

export const tokens: Record<string, Token> = {
  '0': {
    id: '0',
    name: 'Tezos',
    symbol: 'XTZ',
    contract: {
      address: '0',
    },
    metadata: {
      decimals: '6',
    },
  },
  '42290944933889': {
    id: '42290944933889',
    name: 'Kolibri USD',
    symbol: 'kUSD',
    contract: {
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6',
    },
  },
  '74079757402113': {
    id: '74079757402113',
    name: 'Quipuswap',
    symbol: 'QUIPU',
    contract: {
      address: 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1X3zxdTzPB9DgVzA3ad6dgZe9JEamoaeRy',
    },
  },
  '24975299837953': {
    id: '24975299837953',
    name: 'tzBTC',
    symbol: 'tzBTC',
    contract: {
      address: 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1WBLrLE2vG8SedBqiSJFm4VVAZZBytJYHc',
    },
  },
  '102649443647489': {
    id: '102649443647489',
    name: 'Ctez',
    symbol: 'ctez',
    contract: {
      address: 'KT1SjXiUX63QvdNMcM2m492f7kuf8JxXRLp4',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1FbYwEWU8BTfrvNoL5xDEC5owsDxv9nqKT',
    },
  },
  '64296253915137': {
    id: '64296253915137',
    name: 'YOU Governance',
    symbol: 'YOU',
    contract: {
      address: 'KT1Xobej4mc6XgEjDoJoHtTKgbD1ELMvcQuL',
    },
    metadata: {
      decimals: '12',
    },
    pool: {
      address: 'KT1PL1YciLdwMbydt21Ax85iZXXyGSrKT2BE',
    },
  },
  '26669696942081': {
    id: '26669696942081',
    name: 'USDtez',
    symbol: 'USDtz',
    contract: {
      address: 'KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1WxgZ1ZSfMgmsSDDcUn8Xn577HwnQ7e1Lb',
    },
  },
  '64295961362433': {
    id: '64295961362433',
    name: 'Youves Synthetic Asset',
    symbol: 'uUSD',
    contract: {
      address: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
    },
    metadata: {
      decimals: '12',
    },
    pool: {
      address: 'KT1EtjRRCBC2exyCRXz8UfV7jz7svnkqi7di',
    },
  },
  '51004943892481': {
    id: '51004943892481',
    name: 'CRUNCH',
    symbol: 'CRUNCH',
    contract: {
      address: 'KT1BHCumksALJQJ8q8to2EPigPW6qpyTr7Ng',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1RRgK6eXvCWCiEGWhRZCSVGzhDzwXEEjS4',
    },
  },
  '42697861627905': {
    id: '42697861627905',
    name: 'Stably USD',
    symbol: 'USDS',
    contract: {
      address: 'KT1REEb5VxWRjcHm5GzDMwErMmNFftsE5Gpf',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1KFszq8UFCcWxnXuhZPUyHT9FK3gjmSKm6',
    },
  },
  '64215905730561': {
    id: '64215905730561',
    name: 'GIF DAO',
    symbol: 'GIF',
    contract: {
      address: 'KT1XTxpQvo7oRCqp85LikEZgAZ22uDxhbWJv',
    },
    metadata: {
      decimals: '9',
    },
    pool: {
      address: 'KT1LuXT6jZPhUH1qCnSUqAzFedjoBwePLQnF',
    },
  },
  '314971957231617': {
    id: '314971957231617',
    name: 'Upsorber',
    symbol: 'UP',
    contract: {
      address: 'KT1TgmD7kXQzofpuc9VbTRMdZCS2e6JDuTtc',
    },
    metadata: {
      decimals: '0',
    },
    pool: {
      address: 'KT1V4jaZpCwhfitTnUucY1EHiRfz3bjqznAU',
    },
  },
  '54428481617921': {
    id: '54428481617921',
    name: 'Plenty DAO',
    symbol: 'PLENTY',
    contract: {
      address: 'KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1X1LgNkQShpF9nRLYw3Dgdy4qp38MX617z',
    },
  },
  '56900173430785': {
    id: '56900173430785',
    name: 'MoneyHero',
    symbol: 'MYH',
    contract: {
      address: 'KT1BB1uMwVvJ1M3vVHXWALs1RWdgTp1rnXTR',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1Ed11bNukFdYSc3qQFZ2HGYdF13XU6WZ4A',
    },
  },
  '49622357639169': {
    id: '49622357639169',
    name: 'Wrapped WBTC',
    symbol: 'wWBTC',
    contract: {
      address: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1DksKXvCBJN7Mw6frGj6y6F3CbABWZVpj1',
    },
  },
  '70098668748801': {
    id: '70098668748801',
    name: 'Unobtanium',
    symbol: 'UNO',
    contract: {
      address: 'KT1ErKVqEhG9jxXgUG2KGLW3bNM7zXHX8SDF',
    },
    metadata: {
      decimals: '9',
    },
    pool: {
      address: 'KT1Cq3pyv6QEXugsAC2iyXr7ecFqN7fJVTnA',
    },
  },
  '62111003705345': {
    id: '62111003705345',
    name: 'akaSwap DAO',
    symbol: 'akaDAO',
    contract: {
      address: 'KT1AM3PV1cwmGRw28DVTgsjjsjHvmL6z4rGh',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1Qej1k8WxPvBLUjGVtFXStgzQtcx3itSk5',
    },
  },
  '103613471916033': {
    id: '103613471916033',
    name: 'Pixel',
    symbol: 'PXL',
    contract: {
      address: 'KT1F1mn2jbqQCJcsNgYKVAQjvenecNMY2oPK',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1UJ1hVTdiUen7H3zk1CXGC7PbANb57VkS4',
    },
  },
  '49618849103873': {
    id: '49618849103873',
    name: 'Wrapped CRO',
    symbol: 'wCRO',
    contract: {
      address: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1GSjkSg6MFmEMnTJSk6uyYpWXaEYFahrS4',
    },
  },
  '62690811707393': {
    id: '62690811707393',
    name: 'GOeureka',
    symbol: 'GOT',
    contract: {
      address: 'KT1GioMCKwRyWoQpdrwxvsPVEsFJkkLyquVZ',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1JyPE1BWdYoRGBvvKhEPbcVRd3C9NCCwQC',
    },
  },
  '39560350269441': {
    id: '39560350269441',
    name: 'wXTZ',
    symbol: 'wXTZ',
    contract: {
      address: 'KT1VYsVfmobT7rsMVivvZ4J8i3bPiqz12NaH',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1W3VGRUjvS869r4ror8kdaxqJAZUbPyjMT',
    },
  },
  '49973284569089': {
    id: '49973284569089',
    name: 'Wrap Governance Token',
    symbol: 'WRAP',
    contract: {
      address: 'KT1LRboPna9yQY9BrjtQYDS1DVxhKESK4VVd',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1FG63hhFtMEEEtmBSX2vuFmP87t9E7Ab4t',
    },
  },
  '79606729146369': {
    id: '79606729146369',
    name: 'Instaraise',
    symbol: 'INSTA',
    contract: {
      address: 'KT19y6R8x53uDKiM46ahgguS6Tjqhdj2rSzZ',
    },
    metadata: {
      decimals: '9',
    },
    pool: {
      address: 'KT1UzjhUhau9g5MjPxKUzM6KRJNwdW1oo52G',
    },
  },
  '49405113663489': {
    id: '49405113663489',
    name: 'Smartlink',
    symbol: 'SMAK',
    contract: {
      address: 'KT1TwzD6zV3WeJ39ukuqxcfK2fJCnhvrdN1X',
    },
    metadata: {
      decimals: '3',
    },
    pool: {
      address: 'KT1Gdix8LoDoQng7YqdPNhdP5V7JRX8FqWvM',
    },
  },
  '73626279739393': {
    id: '73626279739393',
    name: 'TezID',
    symbol: 'IDZ',
    contract: {
      address: 'KT1WapdVeFqhCfqwdHWwTzSTX7yXoHgiPRPU',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT18rJtJNmwTfbJMinWqHzpkLeBQa4BVqGoJ',
    },
  },
  '113455975628801': {
    id: '113455975628801',
    name: 'BTCtez',
    symbol: 'BTCtz',
    contract: {
      address: 'KT1T87QbpXEVgkwsNPzz8iRoah3SS3D1MDmh',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1B6nXwMpGTjYjVQporXUFDQNDGnfCFsx4a',
    },
  },
  '55218327781377': {
    id: '55218327781377',
    name: 'Kalamint',
    symbol: 'KALAM',
    contract: {
      address: 'KT1A5P4ejnLix13jtadsfV9GCnXLMNnab8UT',
    },
    metadata: {
      decimals: '9',
    },
    pool: {
      address: 'KT1J3wTYb4xk5BsSBkg6ML55bX1xq7desS34',
    },
  },
  '49572933009409': {
    id: '49572933009409',
    name: 'Wrapped USDC',
    symbol: 'wUSDC',
    contract: {
      address: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1U2hs5eNdeCpHouAvQXGMzGFGJowbhjqmo',
    },
  },
  '50275099344897': {
    id: '50275099344897',
    name: 'Soil',
    symbol: 'SOIL',
    contract: {
      address: 'KT1TtaMcoSx5cZrvaVBWsFoeZ1L15cxo5AEy',
    },
    metadata: {
      decimals: '4',
    },
    pool: {
      address: 'KT1NXdxJkCiPkhwPvaT9CytFowuUoNcwGM1p',
    },
  },
  '39000533368833': {
    id: '39000533368833',
    name: 'ETHtez',
    symbol: 'ETHtz',
    contract: {
      address: 'KT19at7rQUvyjxnZ2fBv7D9zc8rkyG7gAoU8',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1Evsp2yA19Whm24khvFPcwimK6UaAJu8Zo',
    },
  },
  '50143780929537': {
    id: '50143780929537',
    name: 'Sebuh.net',
    symbol: 'SEB',
    contract: {
      address: 'KT1981tPmXh4KrUQKZpQKb55kREX7QGJcF3E',
    },
    metadata: {
      decimals: '2',
    },
    pool: {
      address: 'KT1S4WyNiYPoYheihysddNh5hojNFdiVBwZL',
    },
  },
  '90206519689217': {
    id: '90206519689217',
    name: 'CryptoEasy',
    symbol: 'EASY',
    contract: {
      address: 'KT1QgAtLPu3SNq9c6DPLanwL5bvfX3rgh2CS',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1QHbWZPsXK8rpKkudNLmx4VVvgHvGqjnwP',
    },
  },
  '65269186691073': {
    id: '65269186691073',
    name: 'Tezard Coin',
    symbol: 'TZD',
    contract: {
      address: 'KT1RhRYoGmhDr4DShdggQqumRAhwAETxrs3t',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1ERmjYo3hotAFmegVCJ2EAgUmc7RtXyV87',
    },
  },
  '250498914451457': {
    id: '250498914451457',
    name: 'TCOIN',
    symbol: 'TCOIN',
    contract: {
      address: 'KT1GorwGk5WXLUc3sEWrmPLQBSekmYrtz1sn',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1LepCZGCagf8ZnRtpHa9RBqCkqx1QCBNmn',
    },
  },
  '50671978020865': {
    id: '50671978020865',
    name: 'FLAME',
    symbol: 'FLAME',
    contract: {
      address: 'KT1Wa8yqRBpFCusJWgcQyjhRz7hUQAmFxW7j',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1Q93ftAUzvfMGPwC78nX8eouL1VzmHPd4d',
    },
  },
  '44839247806465': {
    id: '44839247806465',
    name: 'STKR',
    symbol: 'STKR',
    contract: {
      address: 'KT1AEfeckNbdEYwaMKkytBwPJPycz7jdSGea',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1BMEEPX7MWzwwadW3NCSZe9XGmFJ7rs7Dr',
    },
  },
  '210247483392001': {
    id: '210247483392001',
    name: 'thr33p3nny',
    symbol: '3P',
    contract: {
      address: 'KT1CegZeeBZLjvy2oD4gcZwf17ucs4fwvXH8',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1Kst3eyiY6e4E2CnFvuQHirfCShuWP6ent',
    },
  },
  '49594865025025': {
    id: '49594865025025',
    name: 'Wrapped USDT',
    symbol: 'wUSDT',
    contract: {
      address: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1T4pfr6NL8dUiz8ibesjEvH2Ne3k6AuXgn',
    },
  },
  '44127677841409': {
    id: '44127677841409',
    name: 'Hic et nunc DAO',
    symbol: 'hDAO',
    contract: {
      address: 'KT1AFA2mwNUMNd4SsujE1YYp29vd8BZejyKW',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1QxLqukyfohPV5kPkw97Rs6cw1DDDvYgbB',
    },
  },
  '49593753534465': {
    id: '49593753534465',
    name: 'Wrapped WETH',
    symbol: 'wWETH',
    contract: {
      address: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1DuYujxrmgepwSDHtADthhKBje9BosUs1w',
    },
  },
  '102443544215553': {
    id: '102443544215553',
    name: 'Aqar Tezos Token',
    symbol: 'AQRtz',
    contract: {
      address: 'KT19wuExNXayErfuCkcy6Z56cd1FWzF96xXk',
    },
    metadata: {
      decimals: '14',
    },
    pool: {
      address: 'KT1Sjz9RF7bABNi6rwaoWS8jGNmyf2RxJkrQ',
    },
  },
  '49616867295233': {
    id: '49616867295233',
    name: 'Wrapped BUSD',
    symbol: 'wBUSD',
    contract: {
      address: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1UMAE2PBskeQayP5f2ZbGiVYF7h8bZ2gyp',
    },
  },
  '81476758536193': {
    id: '81476758536193',
    name: 'Machinery',
    symbol: 'MCH',
    contract: {
      address: 'KT1ErKVqEhG9jxXgUG2KGLW3bNM7zXHX8SDF',
    },
    metadata: {
      decimals: '9',
    },
    pool: {
      address: 'KT1JAgJC6FTJ9SzGGits8GVonCr8cfFp5HGV',
    },
  },
  '81473818329089': {
    id: '81473818329089',
    name: 'Energy',
    symbol: 'ENR',
    contract: {
      address: 'KT1ErKVqEhG9jxXgUG2KGLW3bNM7zXHX8SDF',
    },
    metadata: {
      decimals: '9',
    },
    pool: {
      address: 'KT1GxxLmBC7tfx4Enpe5YLaCXppAKKfzNRYF',
    },
  },
  '46807373578241': {
    id: '46807373578241',
    name: 'Salsa DAO',
    symbol: 'sDAO',
    contract: {
      address: 'KT19ovJhcsUn4YU8Q5L3BGovKSixfbWcecEA',
    },
    metadata: {
      decimals: '0',
    },
    pool: {
      address: 'KT1PrRTVNgxkRgyqqNQvwTiVhd55dqyxXJ6n',
    },
  },
  '140494114914305': {
    id: '140494114914305',
    name: 'DickrDaoButtz',
    symbol: 'DKRBT',
    contract: {
      address: 'KT18quSVkqhbJS38d5sbRAEkXd5GoNqmAoro',
    },
    metadata: {
      decimals: '2',
    },
    pool: {
      address: 'KT1RKdp1rL3c3wxy6XWE8ZdUXdihrGjb4eGB',
    },
  },
  '228061983277057': {
    id: '228061983277057',
    name: 'Ethereum WETH',
    symbol: 'WETH.e',
    contract: {
      address: 'KT1UsSfaXyqcjSVPeiD7U1bWgKy3taYN7NWY',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1NTDC4QcjVEba5WLJytkCMu4rF6tYVnfTK',
    },
  },
  '63140252352513': {
    id: '63140252352513',
    name: 'Kolibri DAO',
    symbol: 'kDAO',
    contract: {
      address: 'KT1JkoE42rrMBP9b2oDhbx6EUr26GcySZMUH',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1NEa7CmaLaWgHNi6LkRi5Z1f4oHfdzRdGA',
    },
  },
  '57462293004289': {
    id: '57462293004289',
    name: 'Crunchy DAO',
    symbol: 'crDAO',
    contract: {
      address: 'KT1XPFjZqCULSnqfKaaYy8hJjeY63UNSGwXg',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1FHiJmJUgZMPtv5F8M4ZEa6cb1D9Lf758T',
    },
  },
  '128110530920449': {
    id: '128110530920449',
    name: 'ShuttleOne Token',
    symbol: 'SZO',
    contract: {
      address: 'KT1WzRVUnrJ4mNu59m9hPQZDY8Nq9JWtUbRf',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1KnbXt3MCjXZNHJtUvzrK8wvBCBUcvhwrq',
    },
  },
  '49619261194241': {
    id: '49619261194241',
    name: 'Wrapped DAI',
    symbol: 'wDAI',
    contract: {
      address: 'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ',
    },
    metadata: {
      decimals: '9',
    },
    pool: {
      address: 'KT1PQ8TMzGMfViRq4tCMFKD2QF5zwJnY67Xn',
    },
  },
};
