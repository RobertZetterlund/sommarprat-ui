import { Bar } from "../../../components/charts/homemade/bar";
import {
  AlbumLabel,
  ArtistLabel,
  EmbedSpotify,
  ImageLabel,
  TrackLabel,
} from "../../../components/labels";

export default () => {
  return (
    <>
      <div className="flex w-full flex-col text-slate-100">
        <h1 className="mb-3 text-4xl">Mest spelade albumen.</h1>
        <Bar
          color="yellow"
          items={Object.values(albums)
            .sort((itemA, itemB) => itemB.count - itemA.count)
            .map((item) => ({
              label: (
                <div className="flex flex-row items-center gap-2">
                  <AlbumLabel album={item} />
                  <ImageLabel
                    href={`https://open.spotify.com/album/${item.album.id}`}
                    img={item.album.img}
                    alt={item.album.name}
                  />
                </div>
              ),
              value: item.count,
              id: item.album.id,
            }))}
        />
      </div>
      <div className="flex w-full flex-col text-slate-100">
        <h1 className="mb-3 text-4xl">Mest spelade låtarna.</h1>
        <Bar
          color="orange"
          items={Object.values(tracks)
            .sort((itemA, itemB) => itemB.count - itemA.count)
            .map((item) => ({
              label: (
                <div className="flex flex-row items-center gap-2">
                  <TrackLabel track={item} />
                  <ImageLabel
                    href={`https://open.spotify.com/album/${item.album.id}`}
                    img={item.album.img}
                    alt={item.album.name}
                  />
                </div>
              ),
              value: item.count,
              id: item.album.id,
            }))}
        />
      </div>
      <div className="flex w-full flex-col text-slate-100">
        <h1 className="mb-3 text-4xl">Mest spelade artisterna.</h1>
        <Bar
          color="red"
          items={Object.values(artists)
            .sort((itemA, itemB) => itemB.count - itemA.count)
            .map((item) => ({
              label: (
                <div className="flex flex-row items-end gap-2">
                  <ArtistLabel artist={item} />
                  <EmbedSpotify type="artist" id={item.id} title={item.name} />
                </div>
              ),
              value: item.count,
              id: item.id,
            }))}
        />
      </div>
    </>
  );
};

const tracks = {
  "2FnUyLhe7sjXgnZlK9sc0z": {
    album: {
      id: "4sVpJJTw1dKDGlTprOvafq",
      name: "Kristaller",
      img: "https://i.scdn.co/image/ab67616d000048518e5deed9a2a9ae9a5c8766cb",
    },
    artists: [
      {
        name: "Laleh",
        id: "62QZPjYQMoo5g56FP9Webq",
      },
    ],
    track: {
      id: "2FnUyLhe7sjXgnZlK9sc0z",
      name: "Bara Få Va Mig Själv",
    },
    count: 9,
  },
  "0Zii0Q4Z17kd1XMB27CQ2t": {
    album: {
      id: "0pfOSr3PHdLqe9kHcoEPIL",
      name: "Colors",
      img: "https://i.scdn.co/image/ab67616d00004851eeb668b40f24b2417943e211",
    },
    artists: [
      {
        name: "Laleh",
        id: "62QZPjYQMoo5g56FP9Webq",
      },
    ],
    track: {
      id: "0Zii0Q4Z17kd1XMB27CQ2t",
      name: "En stund på jorden",
    },
    count: 9,
  },
  "60nZcImufyMA1MKQY3dcCH": {
    album: {
      id: "0lrmy4pJINsFzycJvttX2W",
      name: "G I R L",
      img: "https://i.scdn.co/image/ab67616d00004851e8107e6d9214baa81bb79bba",
    },
    artists: [
      {
        name: "Pharrell Williams",
        id: "2RdwBSPQiwcmiDo9kixcl8",
      },
    ],
    track: {
      id: "60nZcImufyMA1MKQY3dcCH",
      name: 'Happy - From "Despicable Me 2"',
    },
    count: 10,
  },
  "2bfRfAO1RNWcpNtWJv042o": {
    album: {
      id: "1YqHIqrWx3eopxKFPqjqhT",
      name: "Sjung",
      img: "https://i.scdn.co/image/ab67616d000048516494a5592cca561ea52f6541",
    },
    artists: [
      {
        name: "Laleh",
        id: "62QZPjYQMoo5g56FP9Webq",
      },
    ],
    track: {
      id: "2bfRfAO1RNWcpNtWJv042o",
      name: "Some Die Young",
    },
    count: 10,
  },
  "34BZRKHeouOJqnHwSKMTvm": {
    album: {
      id: "3x0pXGHWxO2xStQupeMmvA",
      name: "Musik vi minns",
      img: "https://i.scdn.co/image/ab67616d000048517d5cdf48f1d31845a30ab3cd",
    },
    artists: [
      {
        name: "Thore Skogman",
        id: "6NTX7EIJQEEUMPIBdYpzhs",
      },
    ],
    track: {
      id: "34BZRKHeouOJqnHwSKMTvm",
      name: "Wiggen",
    },
    count: 10,
  },
  "4bpqcGVSveDZ5E3rgr9v2y": {
    album: {
      id: "1tr1spUupX5qRCMERn63fu",
      name: "Sticker hårt",
      img: "https://i.scdn.co/image/ab67616d00004851602c6ce198a325b301ad2fad",
    },
    artists: [
      {
        name: "Markoolio",
        id: "0cAOG10Gh3ORpBRZ9c7Zam",
      },
    ],
    track: {
      id: "4bpqcGVSveDZ5E3rgr9v2y",
      name: "Sommar och sol",
    },
    count: 9,
  },
  "20FNvyY9tMTlgmpcQrkY5x": {
    album: {
      id: "47LlnxrvG1BG6Pyn8BN41q",
      name: "Svensk jazzhistoria vol. 9 (1960-1964) - Brand New!",
      img: "https://i.scdn.co/image/ab67616d0000485103c76c8961802c750e8c1a09",
    },
    artists: [
      {
        name: "Georg Riedel",
        id: "3Z1yaFUknAq52KBVmrYpqy",
      },
      {
        name: "Jan Johansson",
        id: "6DEfX2tZzx9iANmaErvLGf",
      },
    ],
    track: {
      id: "20FNvyY9tMTlgmpcQrkY5x",
      name: "Visa fran Utanmyra",
    },
    count: 11,
  },
  "4hHbeIIKO5Y5uLyIEbY9Gn": {
    album: {
      id: "66v9QmjAj0Wwhh2OpbU4BE",
      name: "Come Fly With Me (Remastered)",
      img: "https://i.scdn.co/image/ab67616d00004851068a5559744d17bd5e871740",
    },
    artists: [
      {
        name: "Frank Sinatra",
        id: "1Mxqyy3pSjf8kZZL4QVxS0",
      },
    ],
    track: {
      id: "4hHbeIIKO5Y5uLyIEbY9Gn",
      name: "Come Fly With Me - Remastered 1998",
    },
    count: 9,
  },
  "7LVHVU3tWfcxj5aiPFEW4Q": {
    album: {
      id: "4E7bV0pzG0LciBSWTszra6",
      name: "X&Y",
      img: "https://i.scdn.co/image/ab67616d000048514e0362c225863f6ae2432651",
    },
    artists: [
      {
        name: "Coldplay",
        id: "4gzpq5DPGxSnKTe4SA8HAU",
      },
    ],
    track: {
      id: "7LVHVU3tWfcxj5aiPFEW4Q",
      name: "Fix You",
    },
    count: 13,
  },
  "5Z01UMMf7V1o0MzF86s6WJ": {
    album: {
      id: "5qENHeCSlwWpEzb25peRmQ",
      name: "Curtain Call: The Hits (Deluxe Edition)",
      img: "https://i.scdn.co/image/ab67616d00004851eab40fc794b88b9d1e012578",
    },
    artists: [
      {
        name: "Eminem",
        id: "7dGJo4pcD2V6oG8kP0tJRR",
      },
    ],
    track: {
      id: "5Z01UMMf7V1o0MzF86s6WJ",
      name: 'Lose Yourself - From "8 Mile" Soundtrack',
    },
    count: 11,
  },
  "49CcYj1bsJ0fjkICI8hIrR": {
    album: {
      id: "6Ye4WhlxwRkxAyyF1frCdi",
      name: "Jag vill tacka livet - 13 sånger av Violeta Parra",
      img: "https://i.scdn.co/image/ab67616d00004851f92f9109892c50471f98257e",
    },
    artists: [
      {
        name: "Arja Saijonmaa",
        id: "7eoFSuG70jwEpxd1LdKNxK",
      },
    ],
    track: {
      id: "49CcYj1bsJ0fjkICI8hIrR",
      name: "Jag vill tacka Livet",
    },
    count: 8,
  },
  "1mea3bSkSGXuIRvnydlB5b": {
    album: {
      id: "1CEODgTmTwLyabvwd7HBty",
      name: "Viva La Vida or Death and All His Friends",
      img: "https://i.scdn.co/image/ab67616d00004851e21cc1db05580b6f2d2a3b6e",
    },
    artists: [
      {
        name: "Coldplay",
        id: "4gzpq5DPGxSnKTe4SA8HAU",
      },
    ],
    track: {
      id: "1mea3bSkSGXuIRvnydlB5b",
      name: "Viva La Vida",
    },
    count: 8,
  },
  "7s25THrKz86DM225dOYwnr": {
    album: {
      id: "5WndWfzGwCkHzAbQXVkg2V",
      name: "I Never Loved a Man the Way I Love You",
      img: "https://i.scdn.co/image/ab67616d000048516aa9314b7ddfbd8f036ba3ac",
    },
    artists: [
      {
        name: "Aretha Franklin",
        id: "7nwUJBm0HE4ZxD3f5cy5ok",
      },
    ],
    track: {
      id: "7s25THrKz86DM225dOYwnr",
      name: "Respect",
    },
    count: 11,
  },
  "3oEkrIfXfSh9zGnE7eBzSV": {
    album: {
      id: "3ZdkT5buYFi1WQaB0XNNtf",
      name: "Super Trouper",
      img: "https://i.scdn.co/image/ab67616d000048514d08fc99eff4ed52dfce91fa",
    },
    artists: [
      {
        name: "ABBA",
        id: "0LcJLqbBmaGUft1e9Mm8HV",
      },
    ],
    track: {
      id: "3oEkrIfXfSh9zGnE7eBzSV",
      name: "The Winner Takes It All",
    },
    count: 8,
  },
  "6wpGqhRvJGNNXwWlPmkMyO": {
    album: {
      id: "5y6wlw1LnqFnQFruMeiwGU",
      name: "The Joshua Tree (Super Deluxe)",
      img: "https://i.scdn.co/image/ab67616d00004851b7bea3d01f04e6d0408d2afe",
    },
    artists: [
      {
        name: "U2",
        id: "51Blml2LZPmy7TTiAg47vQ",
      },
    ],
    track: {
      id: "6wpGqhRvJGNNXwWlPmkMyO",
      name: "I Still Haven't Found What I'm Looking For",
    },
    count: 10,
  },
  "2aoo2jlRnM3A0NyLQqMN2f": {
    album: {
      id: "5z090LQztiqh13wYspQvKQ",
      name: "Electric Ladyland",
      img: "https://i.scdn.co/image/ab67616d00004851522088789d49e216d9818292",
    },
    artists: [
      {
        name: "Jimi Hendrix",
        id: "776Uo845nYHJpNaStv1Ds4",
      },
    ],
    track: {
      id: "2aoo2jlRnM3A0NyLQqMN2f",
      name: "All Along the Watchtower",
    },
    count: 9,
  },
  "3X4JH0aBqKKAamYkpj5xer": {
    album: {
      id: "5ihQ4Gepi7qXFrKqVF5shn",
      name: "Did You Give The World Some Love Today Baby",
      img: "https://i.scdn.co/image/ab67616d00004851b3738b608863849e936f2d3c",
    },
    artists: [
      {
        name: "Doris",
        id: "4oNCFX4cbl6Jy1VANKiE6A",
      },
    ],
    track: {
      id: "3X4JH0aBqKKAamYkpj5xer",
      name: "Did You Give the World Some Love Today, Baby",
    },
    count: 10,
  },
  "3Dy4REq8O09IlgiwuHQ3sk": {
    album: {
      id: "5gSBDA6ufk8UZejT4XR7av",
      name: "Waterloo",
      img: "https://i.scdn.co/image/ab67616d0000485111c24dc7f5ef909381c0a7d6",
    },
    artists: [
      {
        name: "ABBA",
        id: "0LcJLqbBmaGUft1e9Mm8HV",
      },
    ],
    track: {
      id: "3Dy4REq8O09IlgiwuHQ3sk",
      name: "Waterloo",
    },
    count: 10,
  },
  "7Jh1bpe76CNTCgdgAdBw4Z": {
    album: {
      id: "4I5zzKYd2SKDgZ9DRf5LVk",
      name: '"Heroes" (2017 Remaster)',
      img: "https://i.scdn.co/image/ab67616d00004851204f41d52743c6a9efd62985",
    },
    artists: [
      {
        name: "David Bowie",
        id: "0oSGxfWSnnOXhD2fKuz2Gy",
      },
    ],
    track: {
      id: "7Jh1bpe76CNTCgdgAdBw4Z",
      name: "Heroes - 2017 Remaster",
    },
    count: 8,
  },
  "7pKfPomDEeI4TPT6EOYjn9": {
    album: {
      id: "0xzaemKucrJpYhyl7TltAk",
      name: "Imagine",
      img: "https://i.scdn.co/image/ab67616d0000485199581550ef9746ca582bb3cc",
    },
    artists: [
      {
        name: "John Lennon",
        id: "4x1nvY2FN8jxqAFA0DA02H",
      },
    ],
    track: {
      id: "7pKfPomDEeI4TPT6EOYjn9",
      name: "Imagine - Remastered 2010",
    },
    count: 11,
  },
  "1WVjxyTSZ5UiI6TlcHyUPh": {
    album: {
      id: "7aB0bPRv2elnc0Ou1whaty",
      name: "Öppna Landskap 7595",
      img: "https://i.scdn.co/image/ab67616d00004851cec4d71708dbf4f7f02f8a6a",
    },
    artists: [
      {
        name: "Ulf Lundell",
        id: "5kFHS4mQd9W0r7qDp8ec9A",
      },
    ],
    track: {
      id: "1WVjxyTSZ5UiI6TlcHyUPh",
      name: "Öppna landskap",
    },
    count: 10,
  },
  "3spdoTYpuCpmq19tuD0bOe": {
    album: {
      id: "3IdNQBn7De23AVyv2V67wn",
      name: "My Way (Expanded Edition)",
      img: "https://i.scdn.co/image/ab67616d0000485180aa6a82fce614eea8357253",
    },
    artists: [
      {
        name: "Frank Sinatra",
        id: "1Mxqyy3pSjf8kZZL4QVxS0",
      },
    ],
    track: {
      id: "3spdoTYpuCpmq19tuD0bOe",
      name: "My Way",
    },
    count: 12,
  },
  "4xUqqie4bBKufHtlMuZS3k": {
    album: {
      id: "0gv5aiVS1WBUZOKeb7YawE",
      name: "Platinum - A Life In Music",
      img: "https://i.scdn.co/image/ab67616d0000485152cbfb62c42adc19d5637843",
    },
    artists: [
      {
        name: "Elvis Presley",
        id: "43ZHCT0cAZBISjO8DG9PnE",
      },
    ],
    track: {
      id: "4xUqqie4bBKufHtlMuZS3k",
      name: "Are You Lonesome Tonight?",
    },
    count: 8,
  },
  "5ktvQ11IpqlZF60d0uJmsK": {
    album: {
      id: "4MZqt2uT29Lhjs3C2i54Af",
      name: "Blommig falukorv",
      img: "https://i.scdn.co/image/ab67616d00004851876bd7f70774397025a39cb8",
    },
    artists: [
      {
        name: "Hans Alfredson",
        id: "2wSu2EcQojgAifviEgZmy3",
      },
    ],
    track: {
      id: "5ktvQ11IpqlZF60d0uJmsK",
      name: "Blommig falukorv",
    },
    count: 8,
  },
  "1AHPsqF3EtHeWpOM06Y3Y4": {
    album: {
      id: "24Xm5zS2KvwojChzxLGdn9",
      name: "I Am A Bird Now",
      img: "https://i.scdn.co/image/ab67616d00004851a0591c5bfd1d391228e8423c",
    },
    artists: [
      {
        name: "Antony and the Johnsons",
        id: "4fxp616ALtFWnXfwxnjLzW",
      },
    ],
    track: {
      id: "1AHPsqF3EtHeWpOM06Y3Y4",
      name: "Hope There's Someone",
    },
    count: 8,
  },
  "5CKHhg31HcYYhwUeeGqvhq": {
    album: {
      id: "2miVfa78vOd0o8Vbsgd7g3",
      name: "Silk & Soul (Expanded Edition)",
      img: "https://i.scdn.co/image/ab67616d000048510cf2e3d1e85c5bd6d7bedee0",
    },
    artists: [
      {
        name: "Nina Simone",
        id: "7G1GBhoKtEPnP86X2PvEYO",
      },
    ],
    track: {
      id: "5CKHhg31HcYYhwUeeGqvhq",
      name: "I Wish I Knew How It Would Feel to Be Free",
    },
    count: 11,
  },
  "6dGnYIeXmHdcikdzNNDMm2": {
    album: {
      id: "0ETFjACtuP2ADo6LFhL6HN",
      name: "Abbey Road (Remastered)",
      img: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25",
    },
    artists: [
      {
        name: "The Beatles",
        id: "3WrFJ7ztbogyGnTHbHJFl2",
      },
    ],
    track: {
      id: "6dGnYIeXmHdcikdzNNDMm2",
      name: "Here Comes The Sun - Remastered 2009",
    },
    count: 11,
  },
  "3CepTOU9Y7FezTt0CF3lCw": {
    album: {
      id: "4Em5W5HgYEvhpc2elrpKES",
      name: "Greatest Hits",
      img: "https://i.scdn.co/image/ab67616d000048519a8a66a79fbf93928f897c9b",
    },
    artists: [
      {
        name: "Simon & Garfunkel",
        id: "70cRZdQywnSFp9pnc2WTCE",
      },
    ],
    track: {
      id: "3CepTOU9Y7FezTt0CF3lCw",
      name: "The Sounds of Silence",
    },
    count: 9,
  },
  "4TOMI010Sd4ZAX4aZ5TS85": {
    album: {
      id: "5SqbMEyAt8332ISGiLX0St",
      name: "Transformer",
      img: "https://i.scdn.co/image/ab67616d00004851d55149748dca0e5a1f40778e",
    },
    artists: [
      {
        name: "Lou Reed",
        id: "42TFhl7WlMRXiNqzSrnzPL",
      },
    ],
    track: {
      id: "4TOMI010Sd4ZAX4aZ5TS85",
      name: "Perfect Day",
    },
    count: 9,
  },
  "5Yx5PhdnwhNzLMBl34TZw4": {
    album: {
      id: "02piRJBAWgCu2Et3rOkK4w",
      name: "Easy",
      img: "https://i.scdn.co/image/ab67616d00004851f94f1f43a1bbce6bfd98d303",
    },
    artists: [
      {
        name: "Joni Mitchell",
        id: "5hW4L92KnC6dX9t7tYM4Ve",
      },
    ],
    track: {
      id: "5Yx5PhdnwhNzLMBl34TZw4",
      name: "Both Sides Now",
    },
    count: 10,
  },
  "5oE6INocVL9viDow5y8QNM": {
    album: {
      id: "3mVCQqgwEvwD7lHy9KHi7R",
      name: "...Nothing Like The Sun",
      img: "https://i.scdn.co/image/ab67616d00004851d0c7c131a979c9e5436f89ce",
    },
    artists: [
      {
        name: "Sting",
        id: "0Ty63ceoRnnJKVEYP0VQpk",
      },
    ],
    track: {
      id: "5oE6INocVL9viDow5y8QNM",
      name: "Fragile",
    },
    count: 8,
  },
  "3pRaLNL3b8x5uBOcsgvdqM": {
    album: {
      id: "7yQtjAjhtNi76KRu05XWFS",
      name: "Grace",
      img: "https://i.scdn.co/image/ab67616d000048516a760642a56847027428cb61",
    },
    artists: [
      {
        name: "Jeff Buckley",
        id: "3nnQpaTvKb5jCQabZefACI",
      },
    ],
    track: {
      id: "3pRaLNL3b8x5uBOcsgvdqM",
      name: "Hallelujah",
    },
    count: 11,
  },
  "0GjEhVFGZW8afUYGChu3Rr": {
    album: {
      id: "1V6a99EbTTIegOhWoPxYI9",
      name: "Arrival",
      img: "https://i.scdn.co/image/ab67616d0000485170f7a1b35d5165c85b95a0e0",
    },
    artists: [
      {
        name: "ABBA",
        id: "0LcJLqbBmaGUft1e9Mm8HV",
      },
    ],
    track: {
      id: "0GjEhVFGZW8afUYGChu3Rr",
      name: "Dancing Queen",
    },
    count: 11,
  },
  "0lwJH1BDr8Z4wfXvi6yC9y": {
    album: {
      id: "7pY0hwPU10gaH4qDsDFA6d",
      name: "Ted",
      img: "https://i.scdn.co/image/ab67616d00004851279f48896822185c7ae7ab34",
    },
    artists: [
      {
        name: "Ted Gärdestad",
        id: "6zpub6jbY6CdrcqQsDq8P4",
      },
    ],
    track: {
      id: "0lwJH1BDr8Z4wfXvi6yC9y",
      name: "Sol, vind och vatten",
    },
    count: 8,
  },
  "5I17rGCM1Zn4J9puVHTh8X": {
    album: {
      id: "6ikkPeJhCsStZUcEECJX6e",
      name: "Ingen Annan",
      img: "https://i.scdn.co/image/ab67616d0000485147eba23a799e35950fd983de",
    },
    artists: [
      {
        name: "Björn Skifs",
        id: "1Ek3VdZ8EPmcvgRIqnHlrF",
      },
    ],
    track: {
      id: "5I17rGCM1Zn4J9puVHTh8X",
      name: "Håll mitt hjärta (Same Old Story)",
    },
    count: 8,
  },
  "1qCQTy0fTXerET4x8VHyr9": {
    album: {
      id: "19UoBHanqMth4tk0rFw5RJ",
      name: "What A Wonderful World",
      img: "https://i.scdn.co/image/ab67616d00004851601c5174eb7d0073bb79764f",
    },
    artists: [
      {
        name: "Louis Armstrong",
        id: "19eLuQmk9aCobbVDHc6eek",
      },
    ],
    track: {
      id: "1qCQTy0fTXerET4x8VHyr9",
      name: "What A Wonderful World",
    },
    count: 15,
  },
  "5b7OgznPJJr1vHNYGyvxau": {
    album: {
      id: "2NCtCObbmJoJnplsR5mLAl",
      name: "Sinatra/Basie: The Complete Reprise Studio Recordings",
      img: "https://i.scdn.co/image/ab67616d00004851cb81eb3c1238c60f2bbfd3b5",
    },
    artists: [
      {
        name: "Frank Sinatra",
        id: "1Mxqyy3pSjf8kZZL4QVxS0",
      },
      {
        name: "Count Basie",
        id: "2jFZlvIea42ZvcCw4OeEdA",
      },
    ],
    track: {
      id: "5b7OgznPJJr1vHNYGyvxau",
      name: "Fly Me To The Moon (In Other Words)",
    },
    count: 8,
  },
  "3gXV3hlrEZilq4DclC2hoW": {
    album: {
      id: "47nQ3PCd0XrIHzFIaamtEi",
      name: "The Lost Tapes",
      img: "https://i.scdn.co/image/ab67616d0000485133cb267657c4ff8f172605dd",
    },
    artists: [
      {
        name: "Monica Zetterlund",
        id: "7mvvG63CNSY93JWAJ37rnD",
      },
    ],
    track: {
      id: "3gXV3hlrEZilq4DclC2hoW",
      name: "Ack, Värmeland du sköna",
    },
    count: 8,
  },
  "3dkIE8P7hvl3tHl9KSb6dA": {
    album: {
      id: "2k3nz0I7mJzegtkooii4za",
      name: "Eternelle",
      img: "https://i.scdn.co/image/ab67616d000048513d69a1082b9d676263912178",
    },
    artists: [
      {
        name: "Édith Piaf",
        id: "1WPcVNert9hn7mHsPKDn7j",
      },
    ],
    track: {
      id: "3dkIE8P7hvl3tHl9KSb6dA",
      name: "Non, je ne regrette rien",
    },
    count: 14,
  },
  "1BLXxFPDL2BT37nHKD7KrA": {
    album: {
      id: "4xPYddRQPYB5jbTB3e7tL5",
      name: "Pata Pata",
      img: "https://i.scdn.co/image/ab67616d00004851d46caefb22d460eb8ca14db0",
    },
    artists: [
      {
        name: "Miriam Makeba",
        id: "18RkLKfeoUgZflWv9os25W",
      },
    ],
    track: {
      id: "1BLXxFPDL2BT37nHKD7KrA",
      name: "Pata Pata - Stereo Version",
    },
    count: 9,
  },
  "3RziapqS8nr6DiejCtI3cd": {
    album: {
      id: "5KkQk6jEItnuoB1820v5aA",
      name: "Tio vackra visor och personliga Person",
      img: "https://i.scdn.co/image/ab67616d000048519c34b63edb70626b39d952db",
    },
    artists: [
      {
        name: "Cornelis Vreeswijk",
        id: "5B38ZGYpd0msq1LKOyz2r9",
      },
    ],
    track: {
      id: "3RziapqS8nr6DiejCtI3cd",
      name: "Somliga går med trasiga skor",
    },
    count: 8,
  },
  "5dXdy6YR6lxxC3GxBZcRWv": {
    album: {
      id: "10znRN0s0flCvHfoSYPUzA",
      name: "Turistens klagan",
      img: "https://i.scdn.co/image/ab67616d00004851bfe8deb32bd4dbe31d35b0be",
    },
    artists: [
      {
        name: "Cornelis Vreeswijk",
        id: "5B38ZGYpd0msq1LKOyz2r9",
      },
    ],
    track: {
      id: "5dXdy6YR6lxxC3GxBZcRWv",
      name: "Turistens klagan",
    },
    count: 12,
  },
  "3ZE3wv8V3w2T2f7nOCjV0N": {
    album: {
      id: "6fQElzBNTiEMGdIeY0hy5l",
      name: "Hunky Dory (2015 Remaster)",
      img: "https://i.scdn.co/image/ab67616d00004851e464904cc3fed2b40fc55120",
    },
    artists: [
      {
        name: "David Bowie",
        id: "0oSGxfWSnnOXhD2fKuz2Gy",
      },
    ],
    track: {
      id: "3ZE3wv8V3w2T2f7nOCjV0N",
      name: "Life on Mars? - 2015 Remaster",
    },
    count: 12,
  },
  "2uotez2GWPFpH8MNqyYtW5": {
    album: {
      id: "1IY2V2rDRdsPw7RvwlZ140",
      name: "Kristina från Duvemåla",
      img: "https://i.scdn.co/image/ab67616d0000485142192c478d6c6bad2e1769a8",
    },
    artists: [
      {
        name: "Benny Andersson",
        id: "0kV0e99xlTJcLKSu8KrLyp",
      },
      {
        name: "Helen Sjöholm",
        id: "6M5pgjMS5dVG0hGRh5xADx",
      },
      {
        name: "Malmö Musikteaters kör & ork",
        id: "0UyNGJtAvhdy7TnlzRXZvk",
      },
    ],
    track: {
      id: "2uotez2GWPFpH8MNqyYtW5",
      name: "Du måste finnas",
    },
    count: 11,
  },
  "3NfxSdJnVdon1axzloJgba": {
    album: {
      id: "55HZ2ectg1mMTEKDqIq3kC",
      name: "Aretha Now",
      img: "https://i.scdn.co/image/ab67616d0000485146c31f64babcbfca6e061b6b",
    },
    artists: [
      {
        name: "Aretha Franklin",
        id: "7nwUJBm0HE4ZxD3f5cy5ok",
      },
    ],
    track: {
      id: "3NfxSdJnVdon1axzloJgba",
      name: "I Say a Little Prayer",
    },
    count: 11,
  },
  "4w3tQBXhn5345eUXDGBWZG": {
    album: {
      id: "64Ky1tqKPfwxhJs6msphWd",
      name: "9 To 5 And Odd Jobs",
      img: "https://i.scdn.co/image/ab67616d00004851060ccf36ab5b0e0a739799ec",
    },
    artists: [
      {
        name: "Dolly Parton",
        id: "32vWCbZh0xZ4o9gkz4PsEU",
      },
    ],
    track: {
      id: "4w3tQBXhn5345eUXDGBWZG",
      name: "9 to 5",
    },
    count: 12,
  },
  "7nBARurNPIRVcf81uOFz3i": {
    album: {
      id: "4P1tHWqUAGpCNylsLXOXBf",
      name: "Två Tungor",
      img: "https://i.scdn.co/image/ab67616d000048515db8ca3e78a3da93059cbc3b",
    },
    artists: [
      {
        name: "Fred Åkerström",
        id: "66se5dgU4TBgWvHtXrYrz0",
      },
    ],
    track: {
      id: "7nBARurNPIRVcf81uOFz3i",
      name: "Jag ger dig min morgon",
    },
    count: 10,
  },
  "14lyZKpPu1ECQpfXhgrip6": {
    album: {
      id: "1aCpHSQE5ghxibsQ5gkBe0",
      name: "Bach: The Goldberg Variations, BWV 988 (1981 Gould Remaster)",
      img: "https://i.scdn.co/image/ab67616d00004851c7ed978a7fd1498ce8c031f7",
    },
    artists: [
      {
        name: "Johann Sebastian Bach",
        id: "5aIqB5nVVvmFsvSdExz408",
      },
      {
        name: "Glenn Gould",
        id: "13dkPjqmbcchm8cXjEJQeP",
      },
    ],
    track: {
      id: "14lyZKpPu1ECQpfXhgrip6",
      name: "Goldberg Variations, BWV 988: Variation 4 a 1 Clav.",
    },
    count: 10,
  },
  "2UL2wKmovIqf0GpqZ2Irjn": {
    album: {
      id: "6e3fJwgQ1OgmVBOjlNgcd0",
      name: "Så som i himmelen",
      img: "https://i.scdn.co/image/ab67616d00004851179826a1e3ce129578f0f505",
    },
    artists: [
      {
        name: "Helen Sjöholm",
        id: "6M5pgjMS5dVG0hGRh5xADx",
      },
      {
        name: "Stefan Nilsson",
        id: "2dkyZHLWCFi08dA86UDu1A",
      },
    ],
    track: {
      id: "2UL2wKmovIqf0GpqZ2Irjn",
      name: "Gabriellas sång",
    },
    count: 13,
  },
  "41AZHuVBj101ucLqLykb0a": {
    album: {
      id: "4V98pVvObWpDvwIoAMwyZX",
      name: "I'd Rather Write A Symphony (Remastered 2009)",
      img: "https://i.scdn.co/image/ab67616d0000485186a9e587c59597278a96e8f0",
    },
    artists: [
      {
        name: "Ted Gärdestad",
        id: "6zpub6jbY6CdrcqQsDq8P4",
      },
    ],
    track: {
      id: "41AZHuVBj101ucLqLykb0a",
      name: "För kärlekens skull",
    },
    count: 10,
  },
};

const artists = {
  "4X0v8sFoDZ6rIfkeOeVm2i": {
    name: "Seinabo Sey",
    id: "4X0v8sFoDZ6rIfkeOeVm2i",
    count: 29,
  },
  "5K4W6rqBFWDnAN6FQUkS6x": {
    name: "Kanye West",
    id: "5K4W6rqBFWDnAN6FQUkS6x",
    count: 28,
  },
  "3nFkdlSjzX9mRTtwJOzDYB": {
    name: "JAY-Z",
    id: "3nFkdlSjzX9mRTtwJOzDYB",
    count: 29,
  },
  "4gzpq5DPGxSnKTe4SA8HAU": {
    name: "Coldplay",
    id: "4gzpq5DPGxSnKTe4SA8HAU",
    count: 44,
  },
  "6UE7nl9mha6s8z0wFQFIZ2": {
    name: "Robyn",
    id: "6UE7nl9mha6s8z0wFQFIZ2",
    count: 31,
  },
  "6vWDO969PvNqNYHIOW5v0m": {
    name: "Beyoncé",
    id: "6vWDO969PvNqNYHIOW5v0m",
    count: 31,
  },
  "1dfeR4HaWDbWqFHLkxsg1d": {
    name: "Queen",
    id: "1dfeR4HaWDbWqFHLkxsg1d",
    count: 30,
  },
  "4KXp3xtaz1wWXnu5u34eVX": {
    name: "kent",
    id: "4KXp3xtaz1wWXnu5u34eVX",
    count: 34,
  },
  "3fMbdgg4jU18AjLCKBhRSm": {
    name: "Michael Jackson",
    id: "3fMbdgg4jU18AjLCKBhRSm",
    count: 38,
  },
  "5l8VQNuIg0turYE1VtM9zV": {
    name: "Leonard Cohen",
    id: "5l8VQNuIg0turYE1VtM9zV",
    count: 38,
  },
  "0LcJLqbBmaGUft1e9Mm8HV": {
    name: "ABBA",
    id: "0LcJLqbBmaGUft1e9Mm8HV",
    count: 59,
  },
  "4FNjPnaiiXYeG2qOhVtd8A": {
    name: "Jussi Björling",
    id: "4FNjPnaiiXYeG2qOhVtd8A",
    count: 33,
  },
  "5V0MlUE1Bft0mbLlND7FJz": {
    name: "Ella Fitzgerald",
    id: "5V0MlUE1Bft0mbLlND7FJz",
    count: 44,
  },
  "5a2EaR3hamoenG9rDuVn8j": {
    name: "Prince",
    id: "5a2EaR3hamoenG9rDuVn8j",
    count: 28,
  },
  "43ZHCT0cAZBISjO8DG9PnE": {
    name: "Elvis Presley",
    id: "43ZHCT0cAZBISjO8DG9PnE",
    count: 56,
  },
  "7guDJrEfX3qb6FEbdPA5qi": {
    name: "Stevie Wonder",
    id: "7guDJrEfX3qb6FEbdPA5qi",
    count: 43,
  },
  "74ASZWbe4lXaubB36ztrGX": {
    name: "Bob Dylan",
    id: "74ASZWbe4lXaubB36ztrGX",
    count: 62,
  },
  "2VE6Ge0qFHrqDC6KG6ECJn": {
    name: "Bo Kaspers Orkester",
    id: "2VE6Ge0qFHrqDC6KG6ECJn",
    count: 31,
  },
  "33zLgL7tT1vg7eRpWYX5uI": {
    name: "Lars Winnerbäck",
    id: "33zLgL7tT1vg7eRpWYX5uI",
    count: 26,
  },
  "7Gl6zw4YYJQ1CAgs7oEBPY": {
    name: "Sven-Bertil Taube",
    id: "7Gl6zw4YYJQ1CAgs7oEBPY",
    count: 49,
  },
  "19eLuQmk9aCobbVDHc6eek": {
    name: "Louis Armstrong",
    id: "19eLuQmk9aCobbVDHc6eek",
    count: 37,
  },
  "5B38ZGYpd0msq1LKOyz2r9": {
    name: "Cornelis Vreeswijk",
    id: "5B38ZGYpd0msq1LKOyz2r9",
    count: 72,
  },
  "0oSGxfWSnnOXhD2fKuz2Gy": {
    name: "David Bowie",
    id: "0oSGxfWSnnOXhD2fKuz2Gy",
    count: 68,
  },
  "0Y8KmFkKOgJybpVobn1onU": {
    name: "Luciano Pavarotti",
    id: "0Y8KmFkKOgJybpVobn1onU",
    count: 28,
  },
  "1WPcVNert9hn7mHsPKDn7j": {
    name: "Édith Piaf",
    id: "1WPcVNert9hn7mHsPKDn7j",
    count: 31,
  },
  "7G1GBhoKtEPnP86X2PvEYO": {
    name: "Nina Simone",
    id: "7G1GBhoKtEPnP86X2PvEYO",
    count: 72,
  },
  "7mvvG63CNSY93JWAJ37rnD": {
    name: "Monica Zetterlund",
    id: "7mvvG63CNSY93JWAJ37rnD",
    count: 80,
  },
  "1Mxqyy3pSjf8kZZL4QVxS0": {
    name: "Frank Sinatra",
    id: "1Mxqyy3pSjf8kZZL4QVxS0",
    count: 70,
  },
  "2JXHbGSfNgJ25884YBIruo": {
    name: "Povel Ramel",
    id: "2JXHbGSfNgJ25884YBIruo",
    count: 30,
  },
  "6DEfX2tZzx9iANmaErvLGf": {
    name: "Jan Johansson",
    id: "6DEfX2tZzx9iANmaErvLGf",
    count: 27,
  },
  "3fUWKywZQbkzjqydZH15fT": {
    name: "Evert Taube",
    id: "3fUWKywZQbkzjqydZH15fT",
    count: 26,
  },
  "62QZPjYQMoo5g56FP9Webq": {
    name: "Laleh",
    id: "62QZPjYQMoo5g56FP9Webq",
    count: 77,
  },
  "51Blml2LZPmy7TTiAg47vQ": {
    name: "U2",
    id: "51Blml2LZPmy7TTiAg47vQ",
    count: 43,
  },
  "7nwUJBm0HE4ZxD3f5cy5ok": {
    name: "Aretha Franklin",
    id: "7nwUJBm0HE4ZxD3f5cy5ok",
    count: 43,
  },
  "32vWCbZh0xZ4o9gkz4PsEU": {
    name: "Dolly Parton",
    id: "32vWCbZh0xZ4o9gkz4PsEU",
    count: 29,
  },
  "2QsynagSdAqZj3U9HgDzjD": {
    name: "Bob Marley & The Wailers",
    id: "2QsynagSdAqZj3U9HgDzjD",
    count: 42,
  },
  "3WrFJ7ztbogyGnTHbHJFl2": {
    name: "The Beatles",
    id: "3WrFJ7ztbogyGnTHbHJFl2",
    count: 107,
  },
  "4x1nvY2FN8jxqAFA0DA02H": {
    name: "John Lennon",
    id: "4x1nvY2FN8jxqAFA0DA02H",
    count: 27,
  },
  "66se5dgU4TBgWvHtXrYrz0": {
    name: "Fred Åkerström",
    id: "66se5dgU4TBgWvHtXrYrz0",
    count: 29,
  },
  "3H7Ez7cwaYw4L3ELy4v3Lc": {
    name: "Håkan Hellström",
    id: "3H7Ez7cwaYw4L3ELy4v3Lc",
    count: 63,
  },
  "7IK2JpZglDYTrso4ILEKE0": {
    name: "Eva Dahlgren",
    id: "7IK2JpZglDYTrso4ILEKE0",
    count: 34,
  },
  "4NJhFmfw43RLBLjQvxDuRS": {
    name: "Wolfgang Amadeus Mozart",
    id: "4NJhFmfw43RLBLjQvxDuRS",
    count: 63,
  },
  "6M5pgjMS5dVG0hGRh5xADx": {
    name: "Helen Sjöholm",
    id: "6M5pgjMS5dVG0hGRh5xADx",
    count: 44,
  },
  "3eqjTLE0HfPfh78zjh6TqT": {
    name: "Bruce Springsteen",
    id: "3eqjTLE0HfPfh78zjh6TqT",
    count: 66,
  },
  "6zpub6jbY6CdrcqQsDq8P4": {
    name: "Ted Gärdestad",
    id: "6zpub6jbY6CdrcqQsDq8P4",
    count: 45,
  },
  "22bE4uQ6baNwSHPVcDxLCe": {
    name: "The Rolling Stones",
    id: "22bE4uQ6baNwSHPVcDxLCe",
    count: 39,
  },
  "4bOG1sx3QHFbOUVLNmMpPe": {
    name: "Timbuktu",
    id: "4bOG1sx3QHFbOUVLNmMpPe",
    count: 37,
  },
  "6kACVPfCOnqzgfEF5ryl0x": {
    name: "Johnny Cash",
    id: "6kACVPfCOnqzgfEF5ryl0x",
    count: 45,
  },
  "70cRZdQywnSFp9pnc2WTCE": {
    name: "Simon & Garfunkel",
    id: "70cRZdQywnSFp9pnc2WTCE",
    count: 38,
  },
  "5aIqB5nVVvmFsvSdExz408": {
    name: "Johann Sebastian Bach",
    id: "5aIqB5nVVvmFsvSdExz408",
    count: 79,
  },
};

const albums = {
  "0pfOSr3PHdLqe9kHcoEPIL": {
    album: {
      id: "0pfOSr3PHdLqe9kHcoEPIL",
      name: "Colors",
      img: "https://i.scdn.co/image/ab67616d00004851eeb668b40f24b2417943e211",
    },
    artist: {
      name: "Laleh",
      id: "62QZPjYQMoo5g56FP9Webq",
    },
    count: 18,
  },
  "7g2ZA4JCgG8Jxr67i23xlz": {
    album: {
      id: "7g2ZA4JCgG8Jxr67i23xlz",
      name: "Pretend",
      img: "https://i.scdn.co/image/ab67616d000048510e489f9cd0f28b3ca56b2191",
    },
    artist: {
      name: "Seinabo Sey",
      id: "4X0v8sFoDZ6rIfkeOeVm2i",
    },
    count: 17,
  },
  "1YqHIqrWx3eopxKFPqjqhT": {
    album: {
      id: "1YqHIqrWx3eopxKFPqjqhT",
      name: "Sjung",
      img: "https://i.scdn.co/image/ab67616d000048516494a5592cca561ea52f6541",
    },
    artist: {
      name: "Laleh",
      id: "62QZPjYQMoo5g56FP9Webq",
    },
    count: 13,
  },
  "3x0pXGHWxO2xStQupeMmvA": {
    album: {
      id: "3x0pXGHWxO2xStQupeMmvA",
      name: "Musik vi minns",
      img: "https://i.scdn.co/image/ab67616d000048517d5cdf48f1d31845a30ab3cd",
    },
    artist: {
      name: "Thore Skogman",
      id: "6NTX7EIJQEEUMPIBdYpzhs",
    },
    count: 13,
  },
  "6hmmX5UP4rIvOpGSaPerV8": {
    album: {
      id: "6hmmX5UP4rIvOpGSaPerV8",
      name: "Tracy Chapman",
      img: "https://i.scdn.co/image/ab67616d000048517602becfedf6e25752cb54ff",
    },
    artist: {
      name: "Tracy Chapman",
      id: "7oPgCQqMMXEXrNau5vxYZP",
    },
    count: 14,
  },
  "4E7bV0pzG0LciBSWTszra6": {
    album: {
      id: "4E7bV0pzG0LciBSWTszra6",
      name: "X&Y",
      img: "https://i.scdn.co/image/ab67616d000048514e0362c225863f6ae2432651",
    },
    artist: {
      name: "Coldplay",
      id: "4gzpq5DPGxSnKTe4SA8HAU",
    },
    count: 15,
  },
  "7HUKTP7QFZrpGX4fcOVuLQ": {
    album: {
      id: "7HUKTP7QFZrpGX4fcOVuLQ",
      name: "The Best Loved Swedish Music And Folk Songs",
      img: "https://i.scdn.co/image/ab67616d00004851e72bcba056d758629b48970c",
    },
    artist: {
      name: "Jussi Björling",
      id: "4FNjPnaiiXYeG2qOhVtd8A",
    },
    count: 13,
  },
  "5qENHeCSlwWpEzb25peRmQ": {
    album: {
      id: "5qENHeCSlwWpEzb25peRmQ",
      name: "Curtain Call: The Hits (Deluxe Edition)",
      img: "https://i.scdn.co/image/ab67616d00004851eab40fc794b88b9d1e012578",
    },
    artist: {
      name: "Eminem",
      id: "7dGJo4pcD2V6oG8kP0tJRR",
    },
    count: 11,
  },
  "5WndWfzGwCkHzAbQXVkg2V": {
    album: {
      id: "5WndWfzGwCkHzAbQXVkg2V",
      name: "I Never Loved a Man the Way I Love You",
      img: "https://i.scdn.co/image/ab67616d000048516aa9314b7ddfbd8f036ba3ac",
    },
    artist: {
      name: "Aretha Franklin",
      id: "7nwUJBm0HE4ZxD3f5cy5ok",
    },
    count: 12,
  },
  "3ZdkT5buYFi1WQaB0XNNtf": {
    album: {
      id: "3ZdkT5buYFi1WQaB0XNNtf",
      name: "Super Trouper",
      img: "https://i.scdn.co/image/ab67616d000048514d08fc99eff4ed52dfce91fa",
    },
    artist: {
      name: "ABBA",
      id: "0LcJLqbBmaGUft1e9Mm8HV",
    },
    count: 11,
  },
  "0E4xv5gPjykrwBgBZzI8XG": {
    album: {
      id: "0E4xv5gPjykrwBgBZzI8XG",
      name: "Back To Black (Deluxe Edition)",
      img: "https://i.scdn.co/image/ab67616d0000485176ffb5b5ab045d22c81235c1",
    },
    artist: {
      name: "Amy Winehouse",
      id: "6Q192DXotxtaysaqNPy5yR",
    },
    count: 18,
  },
  "5ihQ4Gepi7qXFrKqVF5shn": {
    album: {
      id: "5ihQ4Gepi7qXFrKqVF5shn",
      name: "Did You Give The World Some Love Today Baby",
      img: "https://i.scdn.co/image/ab67616d00004851b3738b608863849e936f2d3c",
    },
    artist: {
      name: "Doris",
      id: "4oNCFX4cbl6Jy1VANKiE6A",
    },
    count: 12,
  },
  "0xzaemKucrJpYhyl7TltAk": {
    album: {
      id: "0xzaemKucrJpYhyl7TltAk",
      name: "Imagine",
      img: "https://i.scdn.co/image/ab67616d0000485199581550ef9746ca582bb3cc",
    },
    artist: {
      name: "John Lennon",
      id: "4x1nvY2FN8jxqAFA0DA02H",
    },
    count: 12,
  },
  "7aB0bPRv2elnc0Ou1whaty": {
    album: {
      id: "7aB0bPRv2elnc0Ou1whaty",
      name: "Öppna Landskap 7595",
      img: "https://i.scdn.co/image/ab67616d00004851cec4d71708dbf4f7f02f8a6a",
    },
    artist: {
      name: "Ulf Lundell",
      id: "5kFHS4mQd9W0r7qDp8ec9A",
    },
    count: 11,
  },
  "3IdNQBn7De23AVyv2V67wn": {
    album: {
      id: "3IdNQBn7De23AVyv2V67wn",
      name: "My Way (Expanded Edition)",
      img: "https://i.scdn.co/image/ab67616d0000485180aa6a82fce614eea8357253",
    },
    artist: {
      name: "Frank Sinatra",
      id: "1Mxqyy3pSjf8kZZL4QVxS0",
    },
    count: 12,
  },
  "0gv5aiVS1WBUZOKeb7YawE": {
    album: {
      id: "0gv5aiVS1WBUZOKeb7YawE",
      name: "Platinum - A Life In Music",
      img: "https://i.scdn.co/image/ab67616d0000485152cbfb62c42adc19d5637843",
    },
    artist: {
      name: "Elvis Presley",
      id: "43ZHCT0cAZBISjO8DG9PnE",
    },
    count: 14,
  },
  "2miVfa78vOd0o8Vbsgd7g3": {
    album: {
      id: "2miVfa78vOd0o8Vbsgd7g3",
      name: "Silk & Soul (Expanded Edition)",
      img: "https://i.scdn.co/image/ab67616d000048510cf2e3d1e85c5bd6d7bedee0",
    },
    artist: {
      name: "Nina Simone",
      id: "7G1GBhoKtEPnP86X2PvEYO",
    },
    count: 12,
  },
  "5fSDA3K2BP3bHRwOQyySo0": {
    album: {
      id: "5fSDA3K2BP3bHRwOQyySo0",
      name: "O vad en liten gumma kan gno",
      img: "https://i.scdn.co/image/ab67616d00004851a31f8511326313f56a0dbdba",
    },
    artist: {
      name: "Monica Zetterlund",
      id: "7mvvG63CNSY93JWAJ37rnD",
    },
    count: 16,
  },
  "28qbOp4dEh18N5u6FInyOO": {
    album: {
      id: "28qbOp4dEh18N5u6FInyOO",
      name: "Cabaret (Original Soundtrack Recording)",
      img: "https://i.scdn.co/image/ab67616d000048513f0ddaafb889a16220871372",
    },
    artist: {
      name: "Liza Minnelli",
      id: "1pdGj6Gak10Q2ajig4l1Dm",
    },
    count: 13,
  },
  "0ETFjACtuP2ADo6LFhL6HN": {
    album: {
      id: "0ETFjACtuP2ADo6LFhL6HN",
      name: "Abbey Road (Remastered)",
      img: "https://i.scdn.co/image/ab67616d00004851dc30583ba717007b00cceb25",
    },
    artist: {
      name: "The Beatles",
      id: "3WrFJ7ztbogyGnTHbHJFl2",
    },
    count: 19,
  },
  "1BZoqf8Zje5nGdwZhOjAtD": {
    album: {
      id: "1BZoqf8Zje5nGdwZhOjAtD",
      name: "The Miseducation of Lauryn Hill",
      img: "https://i.scdn.co/image/ab67616d00004851e08b1250db5f75643f1508c9",
    },
    artist: {
      name: "Ms. Lauryn Hill",
      id: "2Mu5NfyYm8n5iTomuKAEHl",
    },
    count: 11,
  },
  "321q9p7PELvzcFAWxml7VX": {
    album: {
      id: "321q9p7PELvzcFAWxml7VX",
      name: "Uprising",
      img: "https://i.scdn.co/image/ab67616d000048511c40418d1c37d727e8e91b04",
    },
    artist: {
      name: "Bob Marley & The Wailers",
      id: "2QsynagSdAqZj3U9HgDzjD",
    },
    count: 17,
  },
  "7l3ydaHRFTcEGM0D9rlfqS": {
    album: {
      id: "7l3ydaHRFTcEGM0D9rlfqS",
      name: "de l'accordeoniste a milord",
      img: "https://i.scdn.co/image/ab67616d00004851956e46e66798e6d0d92e5985",
    },
    artist: {
      name: "Édith Piaf",
      id: "1WPcVNert9hn7mHsPKDn7j",
    },
    count: 12,
  },
  "5SqbMEyAt8332ISGiLX0St": {
    album: {
      id: "5SqbMEyAt8332ISGiLX0St",
      name: "Transformer",
      img: "https://i.scdn.co/image/ab67616d00004851d55149748dca0e5a1f40778e",
    },
    artist: {
      name: "Lou Reed",
      id: "42TFhl7WlMRXiNqzSrnzPL",
    },
    count: 14,
  },
  "4MZqt2uT29Lhjs3C2i54Af": {
    album: {
      id: "4MZqt2uT29Lhjs3C2i54Af",
      name: "Blommig falukorv",
      img: "https://i.scdn.co/image/ab67616d00004851876bd7f70774397025a39cb8",
    },
    artist: {
      name: "Hans Alfredson",
      id: "2wSu2EcQojgAifviEgZmy3",
    },
    count: 17,
  },
  "5kQxC90rZ5uCHF6nRDjHPW": {
    album: {
      id: "5kQxC90rZ5uCHF6nRDjHPW",
      name: "100 år med Jussi Björling",
      img: "https://i.scdn.co/image/ab67616d00004851ff8f7a377a871a77bc1a0afc",
    },
    artist: {
      name: "Jussi Björling",
      id: "4FNjPnaiiXYeG2qOhVtd8A",
    },
    count: 11,
  },
  "1V6a99EbTTIegOhWoPxYI9": {
    album: {
      id: "1V6a99EbTTIegOhWoPxYI9",
      name: "Arrival",
      img: "https://i.scdn.co/image/ab67616d0000485170f7a1b35d5165c85b95a0e0",
    },
    artist: {
      name: "ABBA",
      id: "0LcJLqbBmaGUft1e9Mm8HV",
    },
    count: 12,
  },
  "7pY0hwPU10gaH4qDsDFA6d": {
    album: {
      id: "7pY0hwPU10gaH4qDsDFA6d",
      name: "Ted",
      img: "https://i.scdn.co/image/ab67616d00004851279f48896822185c7ae7ab34",
    },
    artist: {
      name: "Ted Gärdestad",
      id: "6zpub6jbY6CdrcqQsDq8P4",
    },
    count: 16,
  },
  "19UoBHanqMth4tk0rFw5RJ": {
    album: {
      id: "19UoBHanqMth4tk0rFw5RJ",
      name: "What A Wonderful World",
      img: "https://i.scdn.co/image/ab67616d00004851601c5174eb7d0073bb79764f",
    },
    artist: {
      name: "Louis Armstrong",
      id: "19eLuQmk9aCobbVDHc6eek",
    },
    count: 15,
  },
  "6nRbwFgnL2EUMSQDLOuXzm": {
    album: {
      id: "6nRbwFgnL2EUMSQDLOuXzm",
      name: "Klassiskt - 27 kända klassiska mästerverk",
      img: "https://i.scdn.co/image/ab67616d000048511aec098f9152dd4cc6489314",
    },
    artist: {
      name: "Hector Berlioz",
      id: "11T8SOX82xraocZzUXzkvM",
    },
    count: 11,
  },
  "2k3nz0I7mJzegtkooii4za": {
    album: {
      id: "2k3nz0I7mJzegtkooii4za",
      name: "Eternelle",
      img: "https://i.scdn.co/image/ab67616d000048513d69a1082b9d676263912178",
    },
    artist: {
      name: "Édith Piaf",
      id: "1WPcVNert9hn7mHsPKDn7j",
    },
    count: 16,
  },
  "7yQtjAjhtNi76KRu05XWFS": {
    album: {
      id: "7yQtjAjhtNi76KRu05XWFS",
      name: "Grace",
      img: "https://i.scdn.co/image/ab67616d000048516a760642a56847027428cb61",
    },
    artist: {
      name: "Jeff Buckley",
      id: "3nnQpaTvKb5jCQabZefACI",
    },
    count: 12,
  },
  "1klALx0u4AavZNEvC4LrTL": {
    album: {
      id: "1klALx0u4AavZNEvC4LrTL",
      name: "The Beatles (Remastered)",
      img: "https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2",
    },
    artist: {
      name: "The Beatles",
      id: "3WrFJ7ztbogyGnTHbHJFl2",
    },
    count: 13,
  },
  "5y6wlw1LnqFnQFruMeiwGU": {
    album: {
      id: "5y6wlw1LnqFnQFruMeiwGU",
      name: "The Joshua Tree (Super Deluxe)",
      img: "https://i.scdn.co/image/ab67616d00004851b7bea3d01f04e6d0408d2afe",
    },
    artist: {
      name: "U2",
      id: "51Blml2LZPmy7TTiAg47vQ",
    },
    count: 13,
  },
  "10znRN0s0flCvHfoSYPUzA": {
    album: {
      id: "10znRN0s0flCvHfoSYPUzA",
      name: "Turistens klagan",
      img: "https://i.scdn.co/image/ab67616d00004851bfe8deb32bd4dbe31d35b0be",
    },
    artist: {
      name: "Cornelis Vreeswijk",
      id: "5B38ZGYpd0msq1LKOyz2r9",
    },
    count: 12,
  },
  "6fQElzBNTiEMGdIeY0hy5l": {
    album: {
      id: "6fQElzBNTiEMGdIeY0hy5l",
      name: "Hunky Dory (2015 Remaster)",
      img: "https://i.scdn.co/image/ab67616d00004851e464904cc3fed2b40fc55120",
    },
    artist: {
      name: "David Bowie",
      id: "0oSGxfWSnnOXhD2fKuz2Gy",
    },
    count: 23,
  },
  "1IY2V2rDRdsPw7RvwlZ140": {
    album: {
      id: "1IY2V2rDRdsPw7RvwlZ140",
      name: "Kristina från Duvemåla",
      img: "https://i.scdn.co/image/ab67616d0000485142192c478d6c6bad2e1769a8",
    },
    artist: {
      name: "Benny Andersson",
      id: "0kV0e99xlTJcLKSu8KrLyp",
    },
    count: 12,
  },
  "45GGSs0jmsNbIAesZ1Rkwp": {
    album: {
      id: "45GGSs0jmsNbIAesZ1Rkwp",
      name: "The Living Road",
      img: "https://i.scdn.co/image/ab67616d00004851bfee69e0b4938bfff2219b8f",
    },
    artist: {
      name: "Lhasa De Sela",
      id: "3IbqRfvnvj5C22pHD38KXI",
    },
    count: 12,
  },
  "6zbpOJwPVtns1Yqnn9lmW1": {
    album: {
      id: "6zbpOJwPVtns1Yqnn9lmW1",
      name: "Svarta Ballader",
      img: "https://i.scdn.co/image/ab67616d00004851092ffb11b996eafd96cc12ca",
    },
    artist: {
      name: "Sofia Karlsson",
      id: "2tKGISNf0bei0IxfLQGMEt",
    },
    count: 12,
  },
  "64o8Xiysec8ro1PqcgYWuh": {
    album: {
      id: "64o8Xiysec8ro1PqcgYWuh",
      name: "Laleh",
      img: "https://i.scdn.co/image/ab67616d000048518222e77e2fbf4a3ce0c6c6b0",
    },
    artist: {
      name: "Laleh",
      id: "62QZPjYQMoo5g56FP9Webq",
    },
    count: 16,
  },
  "55HZ2ectg1mMTEKDqIq3kC": {
    album: {
      id: "55HZ2ectg1mMTEKDqIq3kC",
      name: "Aretha Now",
      img: "https://i.scdn.co/image/ab67616d0000485146c31f64babcbfca6e061b6b",
    },
    artist: {
      name: "Aretha Franklin",
      id: "7nwUJBm0HE4ZxD3f5cy5ok",
    },
    count: 18,
  },
  "1TSO7M4RaU156GYLIKjkL1": {
    album: {
      id: "1TSO7M4RaU156GYLIKjkL1",
      name: "För sent för Edelweiss",
      img: "https://i.scdn.co/image/ab67616d00004851ccc8337effe128a3baaad8cd",
    },
    artist: {
      name: "Håkan Hellström",
      id: "3H7Ez7cwaYw4L3ELy4v3Lc",
    },
    count: 11,
  },
  "64Ky1tqKPfwxhJs6msphWd": {
    album: {
      id: "64Ky1tqKPfwxhJs6msphWd",
      name: "9 To 5 And Odd Jobs",
      img: "https://i.scdn.co/image/ab67616d00004851060ccf36ab5b0e0a739799ec",
    },
    artist: {
      name: "Dolly Parton",
      id: "32vWCbZh0xZ4o9gkz4PsEU",
    },
    count: 12,
  },
  "4P1tHWqUAGpCNylsLXOXBf": {
    album: {
      id: "4P1tHWqUAGpCNylsLXOXBf",
      name: "Två Tungor",
      img: "https://i.scdn.co/image/ab67616d000048515db8ca3e78a3da93059cbc3b",
    },
    artist: {
      name: "Fred Åkerström",
      id: "66se5dgU4TBgWvHtXrYrz0",
    },
    count: 12,
  },
  "6e3fJwgQ1OgmVBOjlNgcd0": {
    album: {
      id: "6e3fJwgQ1OgmVBOjlNgcd0",
      name: "Så som i himmelen",
      img: "https://i.scdn.co/image/ab67616d00004851179826a1e3ce129578f0f505",
    },
    artist: {
      name: "Helen Sjöholm",
      id: "6M5pgjMS5dVG0hGRh5xADx",
    },
    count: 13,
  },
  "4V98pVvObWpDvwIoAMwyZX": {
    album: {
      id: "4V98pVvObWpDvwIoAMwyZX",
      name: "I'd Rather Write A Symphony (Remastered 2009)",
      img: "https://i.scdn.co/image/ab67616d0000485186a9e587c59597278a96e8f0",
    },
    artist: {
      name: "Ted Gärdestad",
      id: "6zpub6jbY6CdrcqQsDq8P4",
    },
    count: 15,
  },
  "3tXuKxDCfmokZIoqzTYAjN": {
    album: {
      id: "3tXuKxDCfmokZIoqzTYAjN",
      name: "Alla vill till himmelen men ingen vill dö",
      img: "https://i.scdn.co/image/ab67616d000048514b22eb1e020e907c69e8543f",
    },
    artist: {
      name: "Timbuktu",
      id: "4bOG1sx3QHFbOUVLNmMpPe",
    },
    count: 11,
  },
  "24Xm5zS2KvwojChzxLGdn9": {
    album: {
      id: "24Xm5zS2KvwojChzxLGdn9",
      name: "I Am A Bird Now",
      img: "https://i.scdn.co/image/ab67616d00004851a0591c5bfd1d391228e8423c",
    },
    artist: {
      name: "Antony and the Johnsons",
      id: "4fxp616ALtFWnXfwxnjLzW",
    },
    count: 14,
  },
  "2BlL4Gv2DLPu8p58Wcmlm9": {
    album: {
      id: "2BlL4Gv2DLPu8p58Wcmlm9",
      name: "American IV: The Man Comes Around",
      img: "https://i.scdn.co/image/ab67616d000048516f4f62da3d811b6501a69ffa",
    },
    artist: {
      name: "Johnny Cash",
      id: "6kACVPfCOnqzgfEF5ryl0x",
    },
    count: 15,
  },
  "0JwHz5SSvpYWuuCNbtYZoV": {
    album: {
      id: "0JwHz5SSvpYWuuCNbtYZoV",
      name: "Bridge Over Troubled Water",
      img: "https://i.scdn.co/image/ab67616d00004851ba7fe7dd76cd4307e57dd75f",
    },
    artist: {
      name: "Simon & Garfunkel",
      id: "70cRZdQywnSFp9pnc2WTCE",
    },
    count: 11,
  },
};
