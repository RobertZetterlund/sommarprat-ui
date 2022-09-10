import { ExpandableBars } from "./charts/ExpandableBars";
import { ArtistLabel } from "./labels";

export const TopArtists = () => {
  return (
    <>
      <h2 className="mb-3 text-3xl">Mest spelade artisterna.</h2>
      <ExpandableBars
        color="red"
        items={Object.values(artists)
          .sort((itemA, itemB) => itemB.count - itemA.count)
          .map((item) => ({
            label: (
              <div className="flex flex-row items-end">
                <ArtistLabel artist={item} />
              </div>
            ),
            value: item.count,
            id: item.id,
          }))}
      />
    </>
  );
};

const artists = {
  "4X0v8sFoDZ6rIfkeOeVm2i": {
    name: "Seinabo Sey",
    id: "4X0v8sFoDZ6rIfkeOeVm2i",
    count: 32,
  },
  "5K4W6rqBFWDnAN6FQUkS6x": {
    name: "Kanye West",
    id: "5K4W6rqBFWDnAN6FQUkS6x",
    count: 30,
  },
  "3nFkdlSjzX9mRTtwJOzDYB": {
    name: "JAY-Z",
    id: "3nFkdlSjzX9mRTtwJOzDYB",
    count: 31,
  },
  "4gzpq5DPGxSnKTe4SA8HAU": {
    name: "Coldplay",
    id: "4gzpq5DPGxSnKTe4SA8HAU",
    count: 47,
  },
  "6UE7nl9mha6s8z0wFQFIZ2": {
    name: "Robyn",
    id: "6UE7nl9mha6s8z0wFQFIZ2",
    count: 33,
  },
  "6vWDO969PvNqNYHIOW5v0m": {
    name: "Beyoncé",
    id: "6vWDO969PvNqNYHIOW5v0m",
    count: 37,
  },
  "1dfeR4HaWDbWqFHLkxsg1d": {
    name: "Queen",
    id: "1dfeR4HaWDbWqFHLkxsg1d",
    count: 36,
  },
  "4KXp3xtaz1wWXnu5u34eVX": {
    name: "kent",
    id: "4KXp3xtaz1wWXnu5u34eVX",
    count: 35,
  },
  "3fMbdgg4jU18AjLCKBhRSm": {
    name: "Michael Jackson",
    id: "3fMbdgg4jU18AjLCKBhRSm",
    count: 40,
  },
  "5l8VQNuIg0turYE1VtM9zV": {
    name: "Leonard Cohen",
    id: "5l8VQNuIg0turYE1VtM9zV",
    count: 41,
  },
  "0LcJLqbBmaGUft1e9Mm8HV": {
    name: "ABBA",
    id: "0LcJLqbBmaGUft1e9Mm8HV",
    count: 65,
  },
  "4FNjPnaiiXYeG2qOhVtd8A": {
    name: "Jussi Björling",
    id: "4FNjPnaiiXYeG2qOhVtd8A",
    count: 35,
  },
  "5V0MlUE1Bft0mbLlND7FJz": {
    name: "Ella Fitzgerald",
    id: "5V0MlUE1Bft0mbLlND7FJz",
    count: 46,
  },
  "5a2EaR3hamoenG9rDuVn8j": {
    name: "Prince",
    id: "5a2EaR3hamoenG9rDuVn8j",
    count: 32,
  },
  "43ZHCT0cAZBISjO8DG9PnE": {
    name: "Elvis Presley",
    id: "43ZHCT0cAZBISjO8DG9PnE",
    count: 59,
  },
  "7guDJrEfX3qb6FEbdPA5qi": {
    name: "Stevie Wonder",
    id: "7guDJrEfX3qb6FEbdPA5qi",
    count: 47,
  },
  "74ASZWbe4lXaubB36ztrGX": {
    name: "Bob Dylan",
    id: "74ASZWbe4lXaubB36ztrGX",
    count: 64,
  },
  "2VE6Ge0qFHrqDC6KG6ECJn": {
    name: "Bo Kaspers Orkester",
    id: "2VE6Ge0qFHrqDC6KG6ECJn",
    count: 32,
  },
  "33zLgL7tT1vg7eRpWYX5uI": {
    name: "Lars Winnerbäck",
    id: "33zLgL7tT1vg7eRpWYX5uI",
    count: 27,
  },
  "7Gl6zw4YYJQ1CAgs7oEBPY": {
    name: "Sven-Bertil Taube",
    id: "7Gl6zw4YYJQ1CAgs7oEBPY",
    count: 49,
  },
  "19eLuQmk9aCobbVDHc6eek": {
    name: "Louis Armstrong",
    id: "19eLuQmk9aCobbVDHc6eek",
    count: 40,
  },
  "5B38ZGYpd0msq1LKOyz2r9": {
    name: "Cornelis Vreeswijk",
    id: "5B38ZGYpd0msq1LKOyz2r9",
    count: 75,
  },
  "0oSGxfWSnnOXhD2fKuz2Gy": {
    name: "David Bowie",
    id: "0oSGxfWSnnOXhD2fKuz2Gy",
    count: 75,
  },
  "0Y8KmFkKOgJybpVobn1onU": {
    name: "Luciano Pavarotti",
    id: "0Y8KmFkKOgJybpVobn1onU",
    count: 29,
  },
  "1WPcVNert9hn7mHsPKDn7j": {
    name: "Édith Piaf",
    id: "1WPcVNert9hn7mHsPKDn7j",
    count: 32,
  },
  "7G1GBhoKtEPnP86X2PvEYO": {
    name: "Nina Simone",
    id: "7G1GBhoKtEPnP86X2PvEYO",
    count: 82,
  },
  "7mvvG63CNSY93JWAJ37rnD": {
    name: "Monica Zetterlund",
    id: "7mvvG63CNSY93JWAJ37rnD",
    count: 85,
  },
  "1Mxqyy3pSjf8kZZL4QVxS0": {
    name: "Frank Sinatra",
    id: "1Mxqyy3pSjf8kZZL4QVxS0",
    count: 72,
  },
  "2JXHbGSfNgJ25884YBIruo": {
    name: "Povel Ramel",
    id: "2JXHbGSfNgJ25884YBIruo",
    count: 30,
  },
  "6DEfX2tZzx9iANmaErvLGf": {
    name: "Jan Johansson",
    id: "6DEfX2tZzx9iANmaErvLGf",
    count: 28,
  },
  "3fUWKywZQbkzjqydZH15fT": {
    name: "Evert Taube",
    id: "3fUWKywZQbkzjqydZH15fT",
    count: 26,
  },
  "62QZPjYQMoo5g56FP9Webq": {
    name: "Laleh",
    id: "62QZPjYQMoo5g56FP9Webq",
    count: 80,
  },
  "51Blml2LZPmy7TTiAg47vQ": {
    name: "U2",
    id: "51Blml2LZPmy7TTiAg47vQ",
    count: 45,
  },
  "7nwUJBm0HE4ZxD3f5cy5ok": {
    name: "Aretha Franklin",
    id: "7nwUJBm0HE4ZxD3f5cy5ok",
    count: 47,
  },
  "32vWCbZh0xZ4o9gkz4PsEU": {
    name: "Dolly Parton",
    id: "32vWCbZh0xZ4o9gkz4PsEU",
    count: 30,
  },
  "2QsynagSdAqZj3U9HgDzjD": {
    name: "Bob Marley & The Wailers",
    id: "2QsynagSdAqZj3U9HgDzjD",
    count: 44,
  },
  "3WrFJ7ztbogyGnTHbHJFl2": {
    name: "The Beatles",
    id: "3WrFJ7ztbogyGnTHbHJFl2",
    count: 115,
  },
  "4x1nvY2FN8jxqAFA0DA02H": {
    name: "John Lennon",
    id: "4x1nvY2FN8jxqAFA0DA02H",
    count: 30,
  },
  "66se5dgU4TBgWvHtXrYrz0": {
    name: "Fred Åkerström",
    id: "66se5dgU4TBgWvHtXrYrz0",
    count: 29,
  },
  "3H7Ez7cwaYw4L3ELy4v3Lc": {
    name: "Håkan Hellström",
    id: "3H7Ez7cwaYw4L3ELy4v3Lc",
    count: 65,
  },
  "7IK2JpZglDYTrso4ILEKE0": {
    name: "Eva Dahlgren",
    id: "7IK2JpZglDYTrso4ILEKE0",
    count: 35,
  },
  "4NJhFmfw43RLBLjQvxDuRS": {
    name: "Wolfgang Amadeus Mozart",
    id: "4NJhFmfw43RLBLjQvxDuRS",
    count: 64,
  },
  "6M5pgjMS5dVG0hGRh5xADx": {
    name: "Helen Sjöholm",
    id: "6M5pgjMS5dVG0hGRh5xADx",
    count: 45,
  },
  "3eqjTLE0HfPfh78zjh6TqT": {
    name: "Bruce Springsteen",
    id: "3eqjTLE0HfPfh78zjh6TqT",
    count: 69,
  },
  "6zpub6jbY6CdrcqQsDq8P4": {
    name: "Ted Gärdestad",
    id: "6zpub6jbY6CdrcqQsDq8P4",
    count: 47,
  },
  "22bE4uQ6baNwSHPVcDxLCe": {
    name: "The Rolling Stones",
    id: "22bE4uQ6baNwSHPVcDxLCe",
    count: 43,
  },
  "4bOG1sx3QHFbOUVLNmMpPe": {
    name: "Timbuktu",
    id: "4bOG1sx3QHFbOUVLNmMpPe",
    count: 40,
  },
  "6kACVPfCOnqzgfEF5ryl0x": {
    name: "Johnny Cash",
    id: "6kACVPfCOnqzgfEF5ryl0x",
    count: 48,
  },
  "70cRZdQywnSFp9pnc2WTCE": {
    name: "Simon & Garfunkel",
    id: "70cRZdQywnSFp9pnc2WTCE",
    count: 39,
  },
  "5aIqB5nVVvmFsvSdExz408": {
    name: "Johann Sebastian Bach",
    id: "5aIqB5nVVvmFsvSdExz408",
    count: 84,
  },
};
