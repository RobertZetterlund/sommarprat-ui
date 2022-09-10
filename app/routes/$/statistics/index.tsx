import { Link } from "react-router-dom";
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
    <div className="flex w-full flex-col gap-4 text-slate-100">
      <div>
        <h1 className="text-4xl">Statistik</h1>
        <span className="mb-3 hidden sm:block">
          Önskar du att se sammaställningen i vertikala barer kan du navigera
          till{" "}
          <Link to="/graphs" className="underline">
            grafer
          </Link>{" "}
          där du kan få en vertikal överblick.
        </span>
      </div>

      <>
        <h2 className="mb-3 text-3xl">Mest spelade låtarna.</h2>
        <Bar
          noAnimation
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
      </>
      <>
        <h2 className="mb-3 text-3xl">Mest spelade artisterna.</h2>
        <Bar
          color="red"
          items={Object.values(artists)
            .sort((itemA, itemB) => itemB.count - itemA.count)
            .map((item, idx) => ({
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
      </>
      <>
        <h2 className="mb-3 text-3xl">Mest spelade albumen.</h2>
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
      </>
    </div>
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
    count: 10,
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
  "1uXbwHHfgsXcUKfSZw5ZJ0": {
    album: {
      id: "1gIC63gC3B7o7FfpPACZQJ",
      name: "4",
      img: "https://i.scdn.co/image/ab67616d00004851ff5429125128b43572dbdccd",
    },
    artists: [
      {
        name: "Beyoncé",
        id: "6vWDO969PvNqNYHIOW5v0m",
      },
    ],
    track: {
      id: "1uXbwHHfgsXcUKfSZw5ZJ0",
      name: "Run the World (Girls)",
    },
    count: 11,
  },
  "0nrRP2bk19rLc0orkWPQk2": {
    album: {
      id: "2H6i2CrWgXE1HookLu8Au0",
      name: "True",
      img: "https://i.scdn.co/image/ab67616d00004851e14f11f796cef9f9a82691a7",
    },
    artists: [
      {
        name: "Avicii",
        id: "1vCWHaC5f2uS3yhpwWbIA6",
      },
    ],
    track: {
      id: "0nrRP2bk19rLc0orkWPQk2",
      name: "Wake Me Up",
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
    count: 14,
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
    count: 9,
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
    count: 14,
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
    count: 10,
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
    count: 11,
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
    count: 11,
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
    count: 9,
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
    count: 12,
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
    count: 11,
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
    count: 12,
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
    count: 10,
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
    count: 11,
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
    count: 10,
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
    count: 10,
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
    count: 15,
  },
  "6Rqn2GFlmvmV4w9Ala0I1e": {
    album: {
      id: "3ofZeSWPHZOE5WC2tNZDez",
      name: "I Put A Spell On You",
      img: "https://i.scdn.co/image/ab67616d00004851425e9a15a4a1b9fe123a1aa7",
    },
    artists: [
      {
        name: "Nina Simone",
        id: "7G1GBhoKtEPnP86X2PvEYO",
      },
    ],
    track: {
      id: "6Rqn2GFlmvmV4w9Ala0I1e",
      name: "Feeling Good",
    },
    count: 9,
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
    count: 11,
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
    count: 9,
  },
  "6G0MfBXF1QlLpgP8pKngzs": {
    album: {
      id: "0sKtHhPyVXCic96QFZywih",
      name: "Shoreline",
      img: "https://i.scdn.co/image/ab67616d00004851b3acf13890f0bc4e3d6b6fae",
    },
    artists: [
      {
        name: "Anna Ternheim",
        id: "6xSTQT32ZxLQPe37QIC308",
      },
    ],
    track: {
      id: "6G0MfBXF1QlLpgP8pKngzs",
      name: "Shoreline - Radio Version",
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
    count: 13,
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
  "5S8EZuiSNFR2N5eG58oISQ": {
    album: {
      id: "4zvEPDfNKoC15SoNOAEkBR",
      name: "We Are The Ark",
      img: "https://i.scdn.co/image/ab67616d0000485183391d5d31e98eabefc400fd",
    },
    artists: [
      {
        name: "The Ark",
        id: "73ib5ljBj2xAIR7R3hTwF4",
      },
    ],
    track: {
      id: "5S8EZuiSNFR2N5eG58oISQ",
      name: "It Takes A Fool To Remain Sane",
    },
    count: 8,
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
    count: 13,
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
    count: 14,
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

const albums = {
  "4sVpJJTw1dKDGlTprOvafq": {
    album: {
      id: "4sVpJJTw1dKDGlTprOvafq",
      name: "Kristaller",
      img: "https://i.scdn.co/image/ab67616d000048518e5deed9a2a9ae9a5c8766cb",
    },
    artist: {
      name: "Laleh",
      id: "62QZPjYQMoo5g56FP9Webq",
    },
    count: 12,
  },
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
    count: 19,
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
  "1gIC63gC3B7o7FfpPACZQJ": {
    album: {
      id: "1gIC63gC3B7o7FfpPACZQJ",
      name: "4",
      img: "https://i.scdn.co/image/ab67616d00004851ff5429125128b43572dbdccd",
    },
    artist: {
      name: "Beyoncé",
      id: "6vWDO969PvNqNYHIOW5v0m",
    },
    count: 14,
  },
  "2H6i2CrWgXE1HookLu8Au0": {
    album: {
      id: "2H6i2CrWgXE1HookLu8Au0",
      name: "True",
      img: "https://i.scdn.co/image/ab67616d00004851e14f11f796cef9f9a82691a7",
    },
    artist: {
      name: "Avicii",
      id: "1vCWHaC5f2uS3yhpwWbIA6",
    },
    count: 14,
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
    count: 16,
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
    count: 15,
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
    count: 13,
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
    count: 20,
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
    count: 13,
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
    count: 13,
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
    count: 12,
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
    count: 19,
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
    count: 21,
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
    count: 18,
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
    count: 12,
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
    count: 17,
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
  "3ofZeSWPHZOE5WC2tNZDez": {
    album: {
      id: "3ofZeSWPHZOE5WC2tNZDez",
      name: "I Put A Spell On You",
      img: "https://i.scdn.co/image/ab67616d00004851425e9a15a4a1b9fe123a1aa7",
    },
    artist: {
      name: "Nina Simone",
      id: "7G1GBhoKtEPnP86X2PvEYO",
    },
    count: 13,
  },
  "4xPYddRQPYB5jbTB3e7tL5": {
    album: {
      id: "4xPYddRQPYB5jbTB3e7tL5",
      name: "Pata Pata",
      img: "https://i.scdn.co/image/ab67616d00004851d46caefb22d460eb8ca14db0",
    },
    artist: {
      name: "Miriam Makeba",
      id: "18RkLKfeoUgZflWv9os25W",
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
    count: 15,
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
    count: 14,
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
    count: 13,
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
    count: 13,
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
    count: 14,
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
    count: 17,
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
    count: 16,
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
