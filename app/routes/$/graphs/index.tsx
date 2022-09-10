import type { Episode } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import BarChart from "../../../components/charts/BarChart";
import { GraphEntry } from "../../../components/landing/GraphEntry";
import useElementSize from "../../../hooks/useElementSize";
import { db } from "../../../utils/db.server";
import { episodeLink } from "../../../utils/links";

type LoaderData = {
  popularityEpisodeById: {
    [key: string]: Episode;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const popularityEpisodes = await db.episode.findMany({
    where: {
      playlistId: {
        in: Top50PlayLists.concat(Bottom50Playlists).map((m) => m.meta.id),
      },
    },
  });

  const popularityEpisodeById = Object.fromEntries(
    new Map(popularityEpisodes.map((ep) => [ep.playlistId, ep]))
  );

  return json({ popularityEpisodeById });
};

export default () => {
  const { popularityEpisodeById } = useLoaderData<LoaderData>();

  const [sizeRef, { width }] = useElementSize();

  return (
    <div className="text-slate-100" ref={sizeRef}>
      <h1 className="text-4xl">Grafer över statistik</h1>
      <p className="mt-2 block sm:hidden">
        Tyvärr är denna sida inte optimerad för mobilen. Det funkar det
        fortfarande, men visualiseringen kräver att du klickar på en väldigt
        smal graf. Hoppas du har förtåelse.
      </p>

      <GraphEntry>
        <div>
          <h2>De mest spelade albumen</h2>
          <p>...</p>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={Math.min(width, 1000)}
            height={500}
            data={_albums}
            yLabel={"Antalet spelade låtar på albumet"}
            linksTo={(item) =>
              item.meta
                ? `https://open.spotify.com/album/${item.meta?.album.id}`
                : ""
            }
            renderLabel={(item) => {
              return (
                <div className="flex gap-2">
                  <span className="self-center text-lg">{item.x}</span>
                  <img
                    width={60}
                    height={60}
                    src={item.meta?.album.img}
                    alt={item.meta?.album.name}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-s text-slate-50">
                      {item.meta?.album.name}
                    </span>
                    <span className="text-xs text-slate-300">
                      {item.meta?.artist.name}
                    </span>
                    <span className="text-slate-400">{`${item.y} spelningar`}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2>De mest spelade artisterna</h2>
          <p>...</p>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={Math.min(width, 1000)}
            height={500}
            data={_artists}
            yLabel={"Mest spelade artisterna"}
            linksTo={(item) =>
              item.meta?.id
                ? `https://open.spotify.com/artist/${item.meta.id}`
                : ""
            }
            renderLabel={(item) => {
              return (
                <div className="flex gap-2">
                  <span className="self-center text-lg">{item.x}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-s text-slate-50">
                      {item.meta?.name}
                    </span>

                    <span className="text-slate-400">{`${item.y} spelningar`}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2>De mest spelade låtarna</h2>
          <p>...</p>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={Math.min(width - 40, 1000)}
            height={500}
            data={_tracks}
            yLabel={"Antalet spelningar för låten"}
            linksTo={(item) =>
              item.meta?.track
                ? `https://open.spotify.com/track/${item.meta.track.id}`
                : ""
            }
            renderLabel={(item) => {
              return (
                <div className="flex gap-2">
                  <span className="self-center text-lg">{item.x}</span>
                  <img
                    width={60}
                    height={60}
                    src={item.meta?.album.img}
                    alt={item.meta?.album.name}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-s text-slate-50">
                      {item.meta?.album.name}
                    </span>
                    <span className="text-xs text-slate-300">
                      {item.meta?.artists[0].name}
                    </span>
                    <span className="text-slate-400">{`${item.y} spelningar`}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2>Hur viktigt är hur nyligen låten släpptes?</h2>
          <p>Många väljer att spela låtar som nyligen släppts</p>
        </div>
        <div className="flex justify-center">
          <BarChart
            data={_recency}
            width={Math.min(width - 40, 1000)}
            height={500}
            xLabel={"År innan låten släpptes"}
            yLabel={"Antalet spelningar"}
            renderLabel={(item) => {
              return (
                <div>
                  {`Låtar som släpptes ${item.x} år innan`}
                  <br />
                  {`spelades ${item.y} gånger.`}
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2>Hur gammal var värden när låtarna de valt släpptes?</h2>
          <p>Det finns teorier att man skapar sin musiksmak i ung ålder.</p>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={Math.min(width, 1000)}
            height={500}
            data={_data}
            xLabel={"Ålder på värden då låten släpptes"}
            yLabel={"Antalet låtar spelade"}
            renderLabel={(item) => {
              return (
                <div>
                  {`Det spelades ${item.y} låtar där värden var`}
                  <br />
                  {`${item.x} år när låten släpptes.`}
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2>Sommarvärdar med populärast musik 2022</h2>
          <p>...</p>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={Math.min(width - 40, 1000)}
            height={500}
            data={popularity.slice(0, 51)}
            customYMax={100}
            yLabel={"Genomsnittlig popularitet för värdens spellista"}
            linksTo={(item) => {
              if (item.meta?.id && popularityEpisodeById[item.meta?.id]) {
                const ep = popularityEpisodeById[item.meta?.id];
                return episodeLink(ep);
              }
              return "";
            }}
            renderLabel={(item) => {
              if (item.meta?.id && popularityEpisodeById[item.meta?.id]) {
                const ep = popularityEpisodeById[item.meta?.id];
                return (
                  <div className="flex flex-col gap-2">
                    <img
                      className="self-center"
                      alt={ep.title}
                      src={ep.imageurl}
                      height={100}
                      width={100}
                    />

                    <div className="flex flex-col gap-1">
                      <span>{ep.title}</span>
                      <span className="text-slate-400">{ep.date}</span>
                    </div>
                  </div>
                );
              }
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2>Sommarvärdar med minst populärast musik 2022</h2>
          <p>...</p>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={Math.min(width - 40, 1000)}
            height={500}
            customYMax={100}
            data={popularity
              .slice(popularity.length - 50)
              .map((item, i) => ({ ...item, x: i + 1 }))}
            yLabel={"Genomsnittlig popularitet för värdens spellista"}
            linksTo={(item) => {
              if (item.meta?.id && popularityEpisodeById[item.meta?.id]) {
                const ep = popularityEpisodeById[item.meta?.id];
                return episodeLink(ep);
              }
              return "";
            }}
            renderLabel={(item) => {
              if (item.meta?.id && popularityEpisodeById[item.meta?.id]) {
                const ep = popularityEpisodeById[item.meta?.id];
                return (
                  <div className="flex flex-col gap-2">
                    <img
                      className="self-center"
                      alt={ep.title}
                      src={ep.imageurl}
                      height={100}
                      width={100}
                    />

                    <div className="flex flex-col gap-1">
                      <span>{ep.title}</span>
                      <span className="text-slate-400">{ep.date}</span>
                    </div>
                  </div>
                );
              }
            }}
          />
        </div>
      </GraphEntry>
    </div>
  );
};

const ages = {
  "0": 68,
  "1": 73,
  "2": 69,
  "3": 92,
  "4": 107,
  "5": 86,
  "6": 93,
  "7": 115,
  "8": 104,
  "9": 102,
  "10": 118,
  "11": 146,
  "12": 132,
  "13": 152,
  "14": 166,
  "15": 165,
  "16": 173,
  "17": 174,
  "18": 157,
  "19": 172,
  "20": 168,
  "21": 160,
  "22": 180,
  "23": 193,
  "24": 201,
  "25": 194,
  "26": 194,
  "27": 204,
  "28": 193,
  "29": 206,
  "30": 202,
  "31": 175,
  "32": 183,
  "33": 188,
  "34": 205,
  "35": 172,
  "36": 176,
  "37": 204,
  "38": 174,
  "39": 174,
  "40": 183,
  "41": 152,
  "42": 144,
  "43": 140,
  "44": 140,
  "45": 142,
  "46": 138,
  "47": 120,
  "48": 120,
  "49": 110,
  "50": 94,
  "51": 106,
  "52": 100,
  "53": 76,
  "54": 72,
  "55": 87,
  "56": 101,
  "57": 68,
  "58": 51,
  "59": 75,
  "60": 61,
  "61": 79,
  "62": 68,
  "63": 47,
  "64": 51,
  "65": 47,
  "66": 37,
  "67": 43,
  "68": 42,
  "69": 37,
  "70": 31,
  "71": 32,
  "72": 31,
  "73": 29,
  "74": 22,
  "75": 15,
  "76": 18,
  "77": 21,
  "78": 17,
  "79": 13,
  "80": 10,
  "-8": 36,
  "-6": 38,
  "-1": 45,
  "-9": 35,
  "-3": 52,
  "-2": 66,
  "-12": 32,
  "-15": 30,
  "-11": 37,
  "-5": 42,
  "-7": 35,
  "-16": 22,
  "-10": 34,
  "-14": 22,
  "-4": 50,
  "-13": 23,
  "-20": 12,
  "-17": 18,
  "-19": 13,
  "-18": 12,
};

const _data = Object.entries(ages)
  .map(([year, count]) => ({
    x: parseInt(year),
    y: count,
  }))
  .sort((a, b) => a.x - b.x);

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

const _albums = Object.entries(albums)
  .map(([id, item]) => ({
    y: item.count,
    meta: item,
  }))
  .sort((a, b) => b.y - a.y)
  .map((item, index) => ({
    y: item.y,
    x: index + 1,
    meta: item.meta,
  }));

const raw_recency = {
  0: 588,
  1: 668,
  2: 565,
  3: 480,
  4: 431,
  5: 380,
  6: 402,
  7: 350,
  8: 328,
  9: 318,
  10: 347,
  11: 292,
  12: 243,
  13: 234,
  14: 219,
  15: 246,
  16: 198,
  17: 232,
  18: 227,
  19: 187,
  20: 208,
  21: 205,
  22: 179,
  23: 165,
  24: 158,
  25: 164,
  26: 160,
  27: 131,
  28: 148,
  29: 110,
  30: 136,
  31: 129,
  32: 137,
  33: 134,
  34: 139,
  35: 157,
  36: 132,
  37: 161,
  38: 156,
  39: 150,
  40: 140,
  41: 132,
  42: 132,
  43: 136,
  44: 120,
  45: 124,
  46: 104,
  47: 108,
  48: 87,
  49: 89,
  50: 95,
};

const _recency = Object.entries(raw_recency).map(([year, count]) => ({
  x: parseInt(year),
  y: count,
}));

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

const _tracks = Object.entries(tracks)
  .map(([id, item]) => ({
    y: item.count,
    meta: item,
  }))
  .sort((a, b) => b.y - a.y)
  .map((item, index) => ({
    y: item.y,
    x: index + 1,
    meta: item.meta,
  }));

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

const _artists = Object.entries(artists)
  .map(([id, item]) => ({
    y: item.count,
    meta: item,
  }))
  .sort((a, b) => b.y - a.y)
  .map((item, index) => ({
    y: item.y,
    x: index + 1,
    meta: item.meta,
  }));

const _popularity = {
  "08ZLc9WNQbqZXFEnhq49iC": 41.54545454545455,
  "0KDDWtEpID10fdHzn1O4uM": 35.18181818181818,
  "0UV6ugLlmQcaXkCyxKIot5": 44.4,
  "0uwETSTgX6bsyVtN9XBpng": 38.642857142857146,
  "0vm8fYbM4EpW52v9wbxeVT": 39.54545454545455,
  "14Jyq3pydCKAhxlbazocpI": 32.53333333333333,
  "17jjeEiFXukY4dd6gD4nVB": 41.76923076923077,
  "1C3dvEJnzYQ2bp2TkPvZLS": 33.470588235294116,
  "1DiX8eJ0DVfDoe5d8iGeh4": 60.142857142857146,
  "1Q0gdkJI0jAzAG6ph30JpH": 46.15384615384615,
  "1Tlgeg7HgKGt5bEbZ3NQd2": 23.1,
  "1YxVCq5fiZ8W8CZzZcUDiM": 40.083333333333336,
  "1bOU1rCKCWtICC0yGbSf9z": 48.166666666666664,
  "1cFEdEQBBEZO4eBnOLCxWo": 41.25,
  "1hZcE98qVLPMck2Yf0lflA": 33.357142857142854,
  "1ktKbWqVoQG7j77OomCmic": 34.35294117647059,
  "1vf4NJVrjQj5ZClD6Rgs9F": 43.06666666666667,
  "2FfiFKAQHpssBLS0Q0UHnx": 35.333333333333336,
  "2LaeljUOo0mZ5eJhr9rIUW": 36.666666666666664,
  "2g8O2KPcR990Tx4krfcTYX": 29.714285714285715,
  "2jU48Fblhg4ne2QiaaPMGD": 38.72727272727273,
  "2pUbOOIpYi7fSF0ZwKNYJ5": 39.11764705882353,
  "2qsvLsBV4nUkLOjBFH98YL": 26,
  "2vd3xA5yrIkuqVBwp3WHVs": 48.09090909090909,
  "3B60dA339cQHjdJNDWV7nF": 40.625,
  "3IFdO1Z8GVb1aYxhqvPLZj": 26.133333333333333,
  "45nWiO2qtRnDfaBU6t80DC": 33.84615384615385,
  "4A4UEs1wuzihUw4m2GEEXa": 20.833333333333332,
  "4AZJC20nYYA9uostAy92d4": 24.533333333333335,
  "4Dp8p6UUSm15OqihueCNbv": 42.733333333333334,
  "4HkiTr7WLOXpkUoiftrcX9": 31.133333333333333,
  "4Me9ldvbTTYEUkuR3fSY67": 35.8,
  "4R2gAZX7GyyYc8FmKPMdzs": 25.90909090909091,
  "4Uh0rQoZnkRWFJSxgCywVz": 32.5625,
  "4fLFG0iteaR15u2kk0Rm4t": 41.833333333333336,
  "4z7KHORyXAIL4zv4C5xcHp": 34.30769230769231,
  "57eIZ684byuSRWuYSo2g45": 39.30769230769231,
  "5L4oEMyh1a3gQxJ6H61y8J": 32.529411764705884,
  "5RhCliSKVOVWVzYu9rVxGO": 53.95,
  "5VvKg3Do4Fa1ZGLK8ZG5Eg": 35.05555555555556,
  "5WkMEmhd0zVbNbtkPUBTdm": 44.44444444444444,
  "5h45cS7mAfPXOVLgyABaGG": 32.53333333333333,
  "5rUa07jAiKxAmi7gTTYyEv": 28,
  "5tlu6HqMvfa4eR2KwqR2Uw": 26.105263157894736,
  "5vpIROBiwRaSPB39UKO8jA": 30.25,
  "5wPWGPlvnnPdx1XPMuxy3c": 39.1,
  "5xmZ9tTOvPq9Ykl1SKh2qp": 45,
  "60xKUADE4AB7BueconVsPx": 36.54545454545455,
  "6rNV4zFpqMpnXHK4TBkb4Z": 26.76923076923077,
  "6thG5oDu2Le7zFltkk9uX9": 32.22222222222222,
  "78WKAD1wDA71vdvBYxbKOK": 55.25,
  "7avfmo4C77LBE0iYZOnioX": 27.294117647058822,
  "7gWPYSs8DAbWrYnaywHiRq": 41.25,
  "7h36Xng4GW71UIYvDIaN6Q": 50,
  "0AGDTREdqxtl6GsjdcY8bW": 18.833333333333332,
  "0BFjnzDci4rUnHSNIyVlSC": 21.09090909090909,
  "0CIbHcNV5NwD2miM9JwfBC": 33.7,
  "0MAp2KPScTmCdbPMWwcp8b": 40.36363636363637,
  "0jKdlueyu7fRyPQE06hx1d": 17.142857142857142,
  "0tU9T7eMyTI5I8928PeE1D": 46.23529411764706,
  "125rU5MfC06WfpQk6dezQM": 26.785714285714285,
  "1P46gFKPO5aWOu1zZnvbvo": 33.73684210526316,
  "1fuMLE9x7HqG2xS8ep6pAW": 37.57142857142857,
  "1k6rhRuK164cBNKWTZdyIE": 33.285714285714285,
  "20loOqreVejOshvFeb6scq": 30.416666666666668,
  "28ahByyk0X9d81s6vCIRuy": 62.84615384615385,
  "2ANnCHGqIPIo7SByLKevaW": 26.789473684210527,
  "2Z9q7TwSYSGLn9954pa1kU": 26,
  "2ccv6vq7zqJcLm6mjuxPSL": 36.5,
  "2cwLzojJifFIJh4GqZ9ocF": 52.142857142857146,
  "2g8wr3DLHxIhr4fklmIGn9": 40.714285714285715,
  "2qOk3f7YlZSzEx4whzRWws": 39.625,
  "2tDHKfVEeaobDT1hKzssXl": 40,
  "32H2b2uz92j7V7g2sT7cd8": 30.058823529411764,
  "38xY3ozgQksYzKyMkudEmr": 48.857142857142854,
  "3DqA1M0vpl2Znye9GjhiT9": 26.90909090909091,
  "3FalQwyXEQdVYHZO1RxOnZ": 44.733333333333334,
  "3HpqyJxbV3k0tISl3G30zJ": 39.18181818181818,
  "3LBhogR8PUqG6xEew5G709": 40.54545454545455,
  "3LGttvzzPq9tyXxZaXSSL4": 34.93333333333333,
  "3LnwyltI4WVHCuImUEXbRb": 41.2,
  "3Pst9AFyztEcKyuxZwdd46": 43.1875,
  "3XXtf1epqWt4uB06XgZ1db": 33.083333333333336,
  "3ZuBDyd3bw4Fi1CSjZKzIk": 32.1,
  "3uQ3S1U2SQXySqVkmfHs00": 40.166666666666664,
  "4Q1uzDe9HSahS2v5u4W8x5": 36.92307692307692,
  "4ZcZ2mAQKUVhnlOy9Pt6Bj": 44.888888888888886,
  "4bjXyJGgmYEHdeRgmSWuEn": 35.1875,
  "4dgckKrFbnyqECegccXJfM": 46,
  "4zVEivyxDu0XlWeal6Bkrl": 38.57142857142857,
  "4zhuMPUouy93BfCGYPKAx1": 32.357142857142854,
  "5S22BmTf8HCvPi30yKVu9l": 54,
  "5UHGSGiDLK0kcJVNhPsiQ8": 32,
  "5bDav3Phl0FMucIL1a4veu": 41.31578947368421,
  "5vwvNQUelQzVvujx9ELtmw": 34.45454545454545,
  "5xSpGWsLpIyo9PedpQHE9n": 42.111111111111114,
  "612nqVlhkat4OItQDkr2Kh": 28.941176470588236,
  "6561wvG24d7dDZXHB9wn5m": 22.11111111111111,
  "68BExEQ6qFR32yhXlITV7C": 23.285714285714285,
  "6TuMHlz2Zg64urSq4hnXqa": 41.06666666666667,
  "6UBkvJTkj3EJ2wUlEAMobG": 33.1875,
  "6cJ33KXZVcWyxKlRY9k9iA": 37.25,
  "6moHg1SSPCTBCboTNvQM6w": 25,
  "7JFcDwBn4ONJN4xqyMvVa9": 30.4,
  "7KUMla0Fh9uVMsAuc0zkAD": 30.153846153846153,
  "7k9NCgIhL6mdvw2hVgHjYx": 44.357142857142854,
  "7us0Vhvfs2lOrLNZAISqGS": 20.928571428571427,
  "7x65FT5wI4tIPeuAVEpkdX": 31.473684210526315,
  "01JKUvT1Cl0ctMQoxFXNu3": 49.083333333333336,
  "0QOCzAXIEQ50qCewERwye0": 38.333333333333336,
  "0SbzpBWPnhGRgAsp8HWdEP": 28.642857142857142,
  "0lP8o9jqM8u8BmnJrGOSYH": 27.666666666666668,
  "1DcsT21iyzXhp1V2VIhQ5j": 53.45454545454545,
  "1Ir6QCUbp3G9GhNMFgiiYk": 57.30769230769231,
  "1KOB8TxRFUxKoeySbdrq03": 38.1875,
  "1fLkVdAtfhGROC6pTqBduq": 44.333333333333336,
  "1mX59ZVlivWvBkyEjd15yX": 37.857142857142854,
  "1rQ2xCENULJvEORNynPXs2": 32.30769230769231,
  "1tkaWyHyIkjcIyh8Fvv5vf": 41.166666666666664,
  "2S4nfjfNssNuXrL5vyhEM5": 23.785714285714285,
  "2UTBQRTDSNOEZjwTxEVl2Q": 53.3,
  "2c75XZbMoJaRNNrkDS4F2u": 43.57142857142857,
  "2gIxJre3eytc01LIT7kAIT": 41.785714285714285,
  "2gvgeWRRhrPayVcSnyCDS3": 48.375,
  "2kzxA7GF6kdySvKWlTjGUN": 38.07142857142857,
  "2lUIEzIyMFEy5iYEmvO5Mo": 24.2,
  "2tk2heRIiI8d5xNEMUWQGm": 30.23076923076923,
  "3GLc70sR92V0SXlwAdSVXc": 39,
  "3RyPi6rC0KtKEGfLtDr7Oh": 42.75,
  "3TaTTaccCyTGkxwoyJ1Juy": 49.69230769230769,
  "3ivuHuZV9rnsrpYlxOKC74": 46.583333333333336,
  "3uSi3MG6R4OjRRRgm9PKNc": 28.526315789473685,
  "3wkAKJLP9MsVP3bwfcQGyb": 43.714285714285715,
  "3yKbTAnsRzbyGlRLawah4R": 15.307692307692308,
  "4CeWIKqAesKVWxy7XbxULD": 38.4,
  "4H3zZriwZvgUf0XFd1qi0Q": 44.92307692307692,
  "4Rz7oa8foWUGYjj81Wcmog": 40.54545454545455,
  "4alqF3DFOYHl4xsXqzrDHC": 44.07142857142857,
  "4bJyyCTOFqu5MaCVpGcOVR": 39.23076923076923,
  "4xd3mp18ZQIyqhDfIKZ87E": 57,
  "5FGo4Eg2wUfrR7KiN4sOCC": 51.90909090909091,
  "5OIreYUUTmZOzu78D7ZfcQ": 48.9,
  "5S8zYGqTH4dVtrEWE0r8fK": 54.18181818181818,
  "5UWkIZL2loYd1X8FILmEt4": 45.23529411764706,
  "5VtWQCsUXwfnusd0o97RxG": 22.071428571428573,
  "5X40cKdjq4OpRHnFk1pj4l": 34.07142857142857,
  "5YqT3L4sgOyKNSR6yU72qx": 44.25,
  "5dvvU91tsHptAMkjK6IYuT": 27.714285714285715,
  "5jSsprZTZdnVhN3aPovryK": 39.23076923076923,
  "5wqIuVPpIw8ixQLTxyALgR": 26.833333333333332,
  "675KRcrJ5QMi3Hr9ooPWIz": 18,
  "6HyJww6DhxbLX5uw4ctIEY": 35.583333333333336,
  "6I5mUYSVGGSKQiIxdswOfg": 40,
  "6QrzuEXMEeFlBOPpisKfNm": 40.06666666666667,
  "6anozoKv4LOmj8VPoOuY0N": 18,
  "6dEcMZYHSbQJjVptT8uqOV": 36.125,
  "6hmBFkgjhVnSmVqT7pTSQ5": 44.22222222222222,
  "6lhhMrrLnrSt6B7onPR8bs": 31.666666666666668,
  "6t0ZbQAfcRulwmmM1ZBnuA": 40.42857142857143,
  "6y3XcynUn7vmVKhX1jRhtr": 50.2,
  "7EJ48QDZSzMp8bJ51K96FP": 35.07692307692308,
  "7eyTTLiH0lXQUA7XNM8SWV": 57.61538461538461,
  "7qIWkt31a5OH7PiHbiMaym": 31.76923076923077,
  "00dksqafbJpoLzisbsmJE6": 27.11764705882353,
  "0E4Qe0EkJeYx2ZymAmOlgX": 36.72727272727273,
  "0VRbFzWPcIQNgidB3LI8oN": 46.357142857142854,
  "0lIqNFEetVhoxD2gdt0bKC": 44.15384615384615,
  "0v3boy07bmWjNsSTWR0UyR": 45.76923076923077,
  "0zGpqtzZDGZGLcind10bQY": 33.916666666666664,
  "10Hk85YkWo7MbjwQ2Ny3nf": 35.857142857142854,
  "15tiMmFY3SqxtIGZa4DSkP": 34.27272727272727,
  "1AFiKiylj3Kz3Te8aC7H7m": 47.84615384615385,
  "1ENWTNJ8dQDlBox71vrXiC": 37.53333333333333,
  "1HS8tw7QizvbBqZGvuv9OI": 46.666666666666664,
  "1M59f3pnCGQUg4S6UKyBXr": 22.3,
  "1MXoxSZ4NdZnlIYsEoxp1M": 29.357142857142858,
  "1cj6qeTbdIc225nlrLKO5c": 41.666666666666664,
  "1dvSnFr15XT9G1CGaBJgO1": 47.083333333333336,
  "1h9XIXj5249XrDUGt343B5": 30.928571428571427,
  "1ua5GrlRlNWA7zH7ll7QIg": 53.23076923076923,
  "2AEkDtc0KQG7WCrZ7BdYqO": 24.68421052631579,
  "2DiwwZsXRWeKiIcmOq9jIp": 33.214285714285715,
  "2ZhzFBkZkVgNLJa6JbdWnT": 40.38461538461539,
  "2jRIUgkVwON6lBsHOy9CRU": 21.6875,
  "35neQcrXQ9cxH3dSrxLPVj": 42.92307692307692,
  "3JYEOvYIhZzWry4RrIU2IA": 36.38461538461539,
  "3VEUQDtP57VzirjlcnYe6N": 38.45454545454545,
  "3YXj6mkjazivCm3ql2muvO": 37.333333333333336,
  "3hjRmnjL3PpGdok0eKvLry": 45,
  "3j13E4H8jeElMWT69Bzat5": 32.5,
  "3nih1ShKYMk79yPGygGEzq": 33.93333333333333,
  "3rKXN8XBuhtEpgRBn99Hvo": 40.142857142857146,
  "3tltQfYjEKNU2CuVWttD5q": 41.083333333333336,
  "4FHsrpTkwF4nAeyUoAXQ79": 51.8235294117647,
  "4FzJKKdeB4CVM9GBacVtl4": 36.77777777777778,
  "4Hx3rJM9t2V1K7q72n5JvV": 44.588235294117645,
  "4Tcnv8p90pdEkus3bEBMZS": 42.166666666666664,
  "4X9wFhsPRG6ki00KP2xR2I": 48.4375,
  "4t0dTvo23cFyPkjio3ZaF0": 29.5,
  "4xU6WZTNPPyI75tJJkqUgl": 33.857142857142854,
  "4yajixsuMR3vSr1DGjSSWo": 42.583333333333336,
  "5EUEaZ1eKugVD8DD3UZRXO": 47.61538461538461,
  "5Gsnjqgn4s6LfQhZVGWSUC": 19.444444444444443,
  "5NeyTwwkUD46a0HK0KuW3X": 33.142857142857146,
  "5eS3VOeTtULJpZYEjpJ69D": 30.1875,
  "5rf8beLTTm17GJVDp49je5": 48.5,
  "5zYCySBTSfRz0hN6O5Zt2T": 55.6,
  "5zrAqkytAqjV9fx02RZDFW": 41.81818181818182,
  "65Gq5sfjQzHMDnbUnr2QSR": 58.42857142857143,
  "68LgnbatXD9iDHHY6yHI9E": 27.833333333333332,
  "6Lqmv4zgi7rZY7NsILBqxY": 52.92307692307692,
  "6NEothtdnvyEp7leqJRW9i": 29.066666666666666,
  "6NmWyCLasFYJ2D7aGZfhTk": 39.42857142857143,
  "6gpA0tTZO3BWWtHutmkyP9": 33.285714285714285,
  "6hNuy2jXWMICIvlqhMf69x": 33.25,
  "7AtQ6ZcivjVElaQT3k6Ccx": 49.833333333333336,
  "7IFAuf5snwNWNbY1ZJSi2k": 42.61538461538461,
  "7mdQ8mNvU5JYVmyWo9z4vp": 13.909090909090908,
  "7o0BeySLo46XlJttb1Uolz": 32.69230769230769,
  "04HemMaHnAtk0zQUr7b6Er": 53.92857142857143,
  "09ETqjWLLUwlad5qShEaOw": 55.69230769230769,
  "0IjfXV4dBeqSeeQEG3xu3U": 59,
  "0Jl02LC8bht8af8QgkybWr": 15.333333333333334,
  "0kSKiHAyhP5isbu6Ef2oJ2": 41.35294117647059,
  "0ovIzpqvmhV7YhbGMhuume": 39.63636363636363,
  "0sHqjaHaM6trthuYI3fdzB": 33.888888888888886,
  "1B3oJB46cUVlvsLuAofuCT": 46.57142857142857,
  "1d2HVQGygmw5XfKvoP6UFL": 25.166666666666668,
  "29T0mkAwyi008hgAhQiQsi": 37.72727272727273,
  "2HReRFWo5S2m5yjtqb4Pr9": 42.09090909090909,
  "2c5lp5y7cjbfKbSXJutckJ": 38.72222222222222,
  "2kQmFoZq9eziCHfsJ1aruA": 43.63636363636363,
  "2mu9n0TDyczxaJMbsR8wtO": 46.72727272727273,
  "2pQJ9i8RcriKeZcDDVLxuo": 36.92307692307692,
  "2qOIsmJd2sTVLYH3oS60CH": 36.5,
  "306gXPD032dOscnhH0srrS": 52.666666666666664,
  "39yivRg0PecqYonfDiyhSd": 39.857142857142854,
  "3BPUzsw3H9snahgtWlFTMl": 27.5,
  "3BneIF8MP4qF6A8VIsLta2": 44.8,
  "3CUnVOysHyKykO0DhyhQv0": 32.421052631578945,
  "3F4SuKaDbRcjYolgWjEyrc": 55.23076923076923,
  "3SOeNICQzifwVErH0kVIqa": 48.90909090909091,
  "3XpzAvj2hMyffPU3Ae9hgt": 43.666666666666664,
  "3ZzofNy7xmmOR4mop15Oo4": 49.6,
  "3cQKpX7wRU3OBgdDpoa0P9": 40.473684210526315,
  "3f0eXgMKtefLOYJgkBFmx9": 50.8,
  "3nJPMU818z4k4FRYpNOXHn": 33.07142857142857,
  "3p0AxnCgIcXPMWNYtYaGvu": 24.533333333333335,
  "41RAudkufTtqSzq5hQUIWF": 39.21052631578947,
  "4CiavMWG8DWmFxYiiAMJXL": 23.642857142857142,
  "4FmLMpfgTUDonIVNzaeqiN": 32.78947368421053,
  "4TqvggJdYI45h8gzMzuDYA": 38.76470588235294,
  "4ZnacSjHXVft7tcrnS7crj": 30,
  "4lq2DaLWQHOc0diCnFOup7": 30.31578947368421,
  "4y0WoLNBdJOkE55lBgL8gL": 22.6,
  "5CmLv19ZfaQxRAVaZ30wxY": 48.733333333333334,
  "5CoFaN0EEoIfjgXLg7badv": 28.058823529411764,
  "5DQtYe2sUJj5U0oaIlaq3g": 39.214285714285715,
  "5GXeC5YAl7JlOsmgBGXTds": 19.473684210526315,
  "5ObWgXtXg3M7GmC09TptH1": 36.421052631578945,
  "5PR9GaMXQPQnNubym4Feel": 26.615384615384617,
  "5S4u6byRv0f7rVxKMnsLry": 33,
  "5S7pKbyaVWvJJKBXhMkyPS": 15.272727272727273,
  "5hbi45DcfDx1TfSpkqRLIe": 43.75,
  "5jgcQELqlbe8aoygDwzLTS": 19.153846153846153,
  "5uuRKEQDBu3VvSY7ObvukZ": 36.69230769230769,
  "5vI0aESfoHRyfDFUCHnJFd": 23.8,
  "6FdNjvMIdmyBFqgFyHn84s": 43.333333333333336,
  "6g0neMNoNzFHdXM6vzFUhf": 27.384615384615383,
  "6gWhwgHT9WyOyW4KC7sfT4": 30.692307692307693,
  "6lJqqaVRrP1vzM8hRBLCnY": 47.69230769230769,
  "6vGsR3OgDisfSS0yG1Q4EE": 27.375,
  "705SNWi34H1ViW4HQH77Pg": 39,
  "70WbyRMIwm0BKwKwOXCmLK": 18.375,
  "71htkj19DTcfy0S2cHU0ZT": 24.38888888888889,
  "7dGFyDe9A9b6T95q2wOXgS": 25.76923076923077,
  "7rH9gNDDCy5VBDGY8zsyNJ": 41,
  "7whQQzbGKQe9OAxQNUg7Qm": 63,
  "00X3uFq4a33tksmauWwhYv": 38.69230769230769,
  "02U9rneurJxtqDNpkgsgfL": 29.733333333333334,
  "03GEtIwbgCwcQCJTzjduK4": 28.642857142857142,
  "03IztfqHubYpKDpsaOYMCJ": 32.53846153846154,
  "03iZLnM9mpzx0kVihtCO34": 40.92857142857143,
  "0ICbi1BIMZZUokSQjuaMqu": 40.15384615384615,
  "0PjPhkCrRQuShkfa2HOhVu": 46.53846153846154,
  "0Q0yz0E0BDTzzp5RBI8Ww2": 67.45454545454545,
  "0WKpsOVIws9OzhB9bdBl0I": 56.333333333333336,
  "0YPEre8bySvxbTlUoaJc4M": 33.15384615384615,
  "0yKfubPLYDTJvVHBHOTfl3": 20.176470588235293,
  "18K7wIb4iWzI5idfTY1Qo9": 32.46153846153846,
  "1IRjTjjYkdi45hy44SQgay": 43.84615384615385,
  "1VNgjdFVn2S1yr63IXkKO2": 35,
  "1VbBWWmZQ9Sin0SiluGB6Z": 39.05882352941177,
  "1fXl1h1ToQUdIDw3LP5uMe": 40.53846153846154,
  "1krgMlX4CQAynmWDcSW8B0": 41.38461538461539,
  "1vcKwGF8ccZ4oapHjieV0m": 49,
  "2RrOIOvMycEiUKViBVg2jL": 45.785714285714285,
  "2URPJaXMFgKqKdeNyelXjb": 37.642857142857146,
  "2ZxLktYlJH8TK8qV9lJ2H0": 54.6,
  "2pOWWjUscZ3yVnjPJARqqD": 39.15384615384615,
  "34SO2ElQsfKaG6ckCfej4T": 41.72727272727273,
  "3Bz6suKhkCKq3EINSxw7g0": 45.86666666666667,
  "3JkcABbQFh4mRFqlfiLdd9": 29.25,
  "3OKrTtC4sBn35tlcToNyhD": 31.636363636363637,
  "3PAoY0OdoWx7s01vQlVEsI": 31.294117647058822,
  "3PR9gr9HotMK6W6WEVDNSK": 31.272727272727273,
  "3ZyrZcSY3JvIeyj2OiImw8": 40.833333333333336,
  "3eNio9Fc5uaM7A2WcOACE6": 33.84615384615385,
  "3kIEjBe056JqLWlcqVguCG": 50.583333333333336,
  "3oJYeHjgsLdngoVRADJUJ5": 51.72727272727273,
  "3yrdR6Wx17f0eOrZSY2tt0": 50,
  "4HBcHJ2ClUpN9rKhlQd98W": 37.916666666666664,
  "4dVyCSXPaLFNCyHAb67Wfv": 37.15384615384615,
  "51zFx4u90jG7e1jFPzN59M": 40.4,
  "58GIwuSLGltnPG58bF16xi": 52.714285714285715,
  "5JYH25m99skqkxQEqvNFKi": 59.583333333333336,
  "5LgdYLibqrMJVMdjggLTSw": 43,
  "5Lp4Y73dCjL57AQahaievB": 54.142857142857146,
  "5RsTZrtfuspgEm8PBQWbth": 42.75,
  "5aIBRSWOsPCqY4p7eU16oM": 21,
  "5pJlXonvzEQBWy5XqDrkFB": 43.388888888888886,
  "5umYTGakdtHQvwdM9nQVL1": 37.357142857142854,
  "5zhtRlT7InCqZFQvsYmPDk": 40.625,
  "62PoY60dton5nAYsO1QpXz": 36.81818181818182,
  "64Ni8jKkS85EZaXtIme8qp": 29.416666666666668,
  "64XTsY4j9U7YQsw9AIovsN": 53.125,
  "66HcX7DqOncZRidtcbaAph": 31.142857142857142,
  "6E5l1VjVifiAXUE32gSf2G": 39.3,
  "6WY0xN4JvMWWAxHnbq8mNI": 38.63636363636363,
  "6lhlZGSguCQ4T0ewH0smbu": 46.733333333333334,
  "6yPrp1Mk7wB4wHtiLVLNX9": 51.30769230769231,
  "7AEssobmNieSB0bPnZkoKm": 32,
  "7bepyTPaVPeJNHDows6gGY": 26.5,
  "7cLrc69t8tKYyyOOvVaq9e": 44.76923076923077,
  "7dp7un8AcrdGeExIFbWCrE": 30.25,
  "04cXeNCgYd8FZzokc0O0mg": 56.72727272727273,
  "04nltLrAUdEdEXVHxl7A5Y": 32.2,
  "0BUisxY6MiTRGxUYpUbpIE": 40.72727272727273,
  "0DODQdYdpKPBMXSh7AqLnr": 25,
  "0GVdESvYDJ53CGQGiQyoyf": 26.473684210526315,
  "0WtCA8YpFWVIuEYuGshfYC": 34.6875,
  "0gzYDcMkpBbmkpSsSRNrhk": 26.4,
  "0hW4r31vVJYebpAxPcIExt": 44.083333333333336,
  "0lOAkJRusW2z7uPUFoxK54": 32.833333333333336,
  "0qe8Zs5MlxM6960sM5zw7Z": 32.36842105263158,
  "0yvZtazYXfJ0wgS1iUjQR1": 22.583333333333332,
  "0yyKuetCcCheQrdPxYxuKW": 44,
  "1P1A210PR3Kz2e2UnSbzXP": 39.46153846153846,
  "1Rz7gDRQyCAldEYKuGAler": 32.84615384615385,
  "1S0HeL2xWyCoZrmmB2L1cP": 39.07142857142857,
  "1aVYO95xWTvh8dY2AJF9jW": 17.571428571428573,
  "1flp20EM5JYPGvLF589erE": 31.363636363636363,
  "1ux5X4jEK7GGfsChKYB37M": 49.22222222222222,
  "22hUSMmZ4KggQQmfyQ9dkC": 39.625,
  "25QlHEs0jLgmhUDdyigolc": 45.375,
  "2FBTUe6vbOR4RtSFKcrZ9Q": 40.9,
  "2G2iledVmZsocil9GyHC6k": 36.266666666666666,
  "2QqkGSgXxe9NW7SnApfNDm": 59.46666666666667,
  "2bNqbyJy7ONe9s7aqQqUb9": 52.07692307692308,
  "2cUVoe7ogYRHtXOGniQebG": 28.75,
  "2oWmhXQrr52FI4PQK7Q05P": 35.13333333333333,
  "2otrOc8Hd5NbIEC3E4U7Qx": 40.166666666666664,
  "3Ivj7W23TOcRZmbXrAIhzz": 32.333333333333336,
  "3KyXTNOK2LeJYI7N9NUOPs": 57.27272727272727,
  "3Q6bQkrTotsQbxjl1WNgkr": 33.38461538461539,
  "3VquIRT6D9AVUZoLa6b07o": 33.8421052631579,
  "3X5sQFpULF3nAD4eDXUegO": 40.94736842105263,
  "40NDNbqut8QY1P3lrre3Z7": 51.625,
  "43DxJiMq3vxdCI4uZYBxcD": 38.916666666666664,
  "446EfOPuDoAAk8K4acBSEN": 31.125,
  "4MIDPmvcJ7sGnD6xwlu8ua": 30.375,
  "4R5k4few1N27N2MxQA8eXC": 28.166666666666668,
  "4UeTkIqluDDwKqF1jiDMya": 50.61538461538461,
  "5Fg9s6NR2qI81CEIz0F7JN": 42.083333333333336,
  "5KttejcPeX6H4VdarubtSA": 36.54545454545455,
  "5LxvKN7xN1BlnRfzxbVhO9": 37.69230769230769,
  "5kCaHUJO0oNjSeYYIbAJvh": 48.27272727272727,
  "5nH8advXfcOqbdjSyAPULJ": 38,
  "5oRuoGRWcytAQETywlQ9II": 25.105263157894736,
  "62WkzZ6WIUt3Gs2W9o91ki": 41.36363636363637,
  "64u8Uy6jVRg0P774qWft0p": 33.785714285714285,
  "67TFF2y7WPgrD3wlWMjOLY": 21.181818181818183,
  "6JUr66lITyznOMUs51lD29": 36.714285714285715,
  "6Q1kNF5pTepTkONym3sVTM": 40.30769230769231,
  "6RF5UCLzhTllw6p5fzM528": 31.8,
  "6ffIAygsH7Y7mvJGLBShSe": 50.666666666666664,
  "6pPfUXQ6JxLBn0TZoUwOPy": 46.72727272727273,
  "6uskRqI5ZkXyZdUBpC1MaA": 30.181818181818183,
  "70jSFr6l6Wgn88KWwx6l7L": 39.25,
  "7aF9kQePJHj3uFviFxUBJK": 45.07142857142857,
  "7n0MC558ucaG3CUlQgdnHU": 39.90909090909091,
  "7r78gQXM6lJ9XtDEgQuGcD": 56.38461538461539,
  "7ub16D1BLv1GRr0F0xrWjp": 34.6875,
  "08Y1XDVuX8EOjdRMDlmDPq": 57.916666666666664,
  "0B85l9fT2K0EDWXxYArM33": 47,
  "0FGKjLK7d93uNIYsdlhITk": 31.36842105263158,
  "0HC9p35xfn5IDmydxrdurY": 47.53846153846154,
  "0IYydqbWiV3ePz0LNVddOy": 33.5,
  "0IgePMOc6OBjMTXji0XxBN": 45.916666666666664,
  "0QUGm5Rd5UpaKIQ4fmIAx6": 44.36363636363637,
  "0iTWRn7GoNRVsbN8sdJtdF": 34.6875,
  "0krQEyJ9pVwKCXLtLU0ur9": 19.90909090909091,
  "0n3fakUJb8yPcJ1QRdOAcW": 50.333333333333336,
  "0tnkdQk3QiGFcmOA18MCDO": 23.272727272727273,
  "1125AO6407s1N0jLoOxW7j": 48.72727272727273,
  "12du0keauLWmfFAH4Xgc88": 28.7,
  "1BOUv5puMZd19DBpbjoO1S": 20.272727272727273,
  "1H0POVwpx0PLg9lPf4AKcg": 42.266666666666666,
  "1MaCVwPxm9Tf1Kaw10mA9L": 40.23076923076923,
  "1lqkF2vnQdWqNSzaUo01h6": 29.210526315789473,
  "1n0UIiJIoDBhfB9VN9BsV9": 41,
  "1s3XektXnysoWJcDyrX347": 34.77777777777778,
  "1uqnl6mTbC8E3XON5VJvCf": 47.142857142857146,
  "22zw4KpulPRGnYaf7MhK5P": 46.5,
  "2FYSRq3VD0CTTB69NoDCJ8": 41.5,
  "2VN2fKs2W8slZ3QD8hPzdl": 34.733333333333334,
  "2XXgYeGdCFHyGbBX5sMJVv": 30.071428571428573,
  "2dmfy368m9jVH5gb7XceYR": 25.5,
  "2lVZYre39hOQZXoe4pObhT": 21.31578947368421,
  "34FJM7X5BWVb9CbESEj2T9": 34.42857142857143,
  "3HdPhFKsbChwPI0J09M6WW": 46.5,
  "3dgkvtyhGBvMNj5oKa9rD8": 43.857142857142854,
  "40Oif1CQzuuXIc0A2wI69e": 43.92307692307692,
  "4OJA3Gn3jfLBcyHkOYn8YM": 53,
  "4Ozqy8R95h5Hwx0bjw3qSl": 55.416666666666664,
  "4Q0L0rJsPFMWJ3kHaBJdMp": 36.333333333333336,
  "4UHsTD7eBi8eOKlpbQqkNn": 44.84615384615385,
  "4WQ6spJBBly623xj6VaSrk": 31.083333333333332,
  "4f4CwrsGstBv8WJ9fqq1MJ": 54.45454545454545,
  "4gMejopYOgXBHW9FwpD4Zj": 38.63636363636363,
  "52EwrUygqCjhzQfXyLQq0b": 50.81818181818182,
  "5IX5EhxtOtNxWuGfGbgNmO": 50.214285714285715,
  "5KTjmE3YuMR9QOHdzHNSzN": 29.333333333333332,
  "5SxsuCjewObGczdY917UZ5": 27.6875,
  "5TZOwFuJDspI6QU6Eh3iNh": 33.6,
  "5bBULBCMtPSo63UFK3p8G5": 35.53333333333333,
  "5gXnfJBLd0C5K7OJL5yhOE": 43.416666666666664,
  "5mluJFwwAGomZwhfDSDKBI": 15.3125,
  "5uu3LtmO9DS6h0QEerTbI0": 50.8,
  "5yRg9MEHfOHix3CQVeBZKE": 30.615384615384617,
  "63suFKD5lPOeXJ3Sh0eRti": 30.466666666666665,
  "65yLqvDc3kehc5zAblaZSl": 33.6,
  "68AvILlSpjzkCYoiv2OwvI": 36.84615384615385,
  "6Q7wV3z8jlO5OJNQlAPmyE": 39.38461538461539,
  "6UtD5fUJMFJQL0jINRtLv8": 46.05263157894737,
  "6cnQQOuKyOQBRjzuioJNOs": 38.06666666666667,
  "6yuXa4hLrUiSORhSyzvy1p": 39.333333333333336,
  "76W3ocxf1OWRh1ULHO2oyk": 42.285714285714285,
  "7HYzZgfuJvFJ30pYsd8tcQ": 34.785714285714285,
  "7qaj0qrk7aNHav69TMkAvR": 51.23076923076923,
  "0TNL9EwiwmQmXSQiz2BD1U": 32.5,
  "0TuZpgYqmiOn3miVm0YKnb": 29.615384615384617,
  "0eNUrcASOz928mZ5IHWYE5": 47.416666666666664,
  "0gXd2pO3Av1MB6GuoXhLiT": 34.72222222222222,
  "0n0LuhCYnjWYPOGZiC1hWX": 41.18181818181818,
  "0pKsbyRsQKOvdmnPg6yO5W": 39.54545454545455,
  "0wT0hGP00zjbPkNTY4j695": 40.84615384615385,
  "15R4IH5NhjkdbAhqdrTlr2": 42.142857142857146,
  "1UaIUsqWyyITl3vacBzKkR": 26.555555555555557,
  "1XXevs7O80dzv5EjlVdtIc": 40.2,
  "1axHjwidxKkjgrtVffocYI": 41.285714285714285,
  "1ff1z7fxnXgC0OFMhh6hJU": 51.09090909090909,
  "1gKwohVm8qSlmIYiEZU59V": 41.06666666666667,
  "1hUcMXK9kv08s6bXTuu6oC": 40.416666666666664,
  "1hWSAgFcEzpyA0R9TN4aIK": 39.09090909090909,
  "1pYRvbrGCSThXrswxm0Y7q": 31.866666666666667,
  "1zC2QiGJUoOO6x4gderst2": 46.5,
  "22rVudIHbcBjrhOOAD7mPi": 30.416666666666668,
  "2HrZUe46IdG4Cf0Xmu4wm9": 43.142857142857146,
  "2MHT2qFVkpig1MxzcMzQRe": 45.142857142857146,
  "2eXNibgdEfhn7gjYEO1Ehi": 33.53846153846154,
  "2zTSDySdRoGfDyl7qopqUT": 38.5,
  "3FN2r5X4CFpPwLcOIU2DGD": 44.333333333333336,
  "3LfGrqXEBCkYVoZN9leBgk": 38,
  "3NcTcdrg6POuAxdPd1Bupr": 44.583333333333336,
  "3Z0GhcFMpnV6btdDmRJCfl": 33.642857142857146,
  "3zOjAerwB4I3ODE1sQoEZW": 34.92307692307692,
  "3zgfVzAfZxPaEWuXROap8X": 21.076923076923077,
  "464DcXE6XHSNJAI76aAUMK": 44.916666666666664,
  "4XoBMVQVWOF3tQnBu4QmmK": 43.09090909090909,
  "4YxS9YjOtgtXxy0lI4iwqU": 53.642857142857146,
  "4blSWRK9W8WR8rqIWYNfLc": 39.285714285714285,
  "4fCGJOCg2xjjcROT8yNp8T": 24.444444444444443,
  "4vsbwRh8Gcl5Lh1oIVzPDN": 15.333333333333334,
  "4x6BTfePpsfpO6UnnjNHY3": 37.285714285714285,
  "5CipwcWOpJpwqsPxC2Y04g": 69.18181818181819,
  "5GFCwA0vUFsL7FTr4nUqMH": 47.69230769230769,
  "5Gh9dCDOLWfc65PyLbkpoq": 43.23076923076923,
  "5RNUqYbN1xOfYNXW181gms": 51.61538461538461,
  "5TJlsxMZd64P4B7AVBCJmr": 30.88888888888889,
  "5UdgFTEKPEX5ajrsif2P8x": 47.285714285714285,
  "5bVLWOI9v5qcz8wFSIcufz": 45.470588235294116,
  "5kR2wSpDmhhoCMJaSHleUD": 37.6,
  "5kpQ8gKk5Hqb1TSyIoV8aG": 21.384615384615383,
  "63YizIPa3ye4UnSYbqq8Kc": 32.54545454545455,
  "66C2EcpFPAUNMAd3LT75D6": 39.785714285714285,
  "6Lf3mDH5bPuwUVjgvLcFAe": 43.76923076923077,
  "7FH7q5qTbRj5iQJzAdAyN2": 53.27272727272727,
  "7FZ4hGEDJwaXrGQZ7sKaEi": 27,
  "7HbUJVZgVMMWBHinFtdfYY": 24,
  "7bJHk4JePvwpb1FAmfYHOT": 65.85,
  "7eVSuDCYSuiWhXyOxU8ZUA": 22.466666666666665,
  "7m3ZFkatZL7YPQm5IzliMY": 33.54545454545455,
  "7nkXBAQl2vlCMkde6nOfyg": 43.18181818181818,
  "7okKyxbNLqK49rR06ZBc8l": 52.916666666666664,
  "7s0gZn7g72QAAxUTmZB6Ez": 34.18181818181818,
  "0CcLNCc4Gt4vFmzREMit49": 45.083333333333336,
  "0P0ZaZAHouadVBTVUVR96E": 38.46153846153846,
  "0dWsfxKWGWuFbKg8u4tuka": 45.13333333333333,
  "0etkJdQMcZbct0kcR59mh8": 25.666666666666668,
  "0yJMfz1Bgwo985Lj2vSINU": 11.333333333333334,
  "1D8udOC6A1aXj5ei0tMszT": 28.5,
  "1M01qqGBHJgrFXVSpoGuDd": 23.88235294117647,
  "1RaAmDHpRwLIwlU3tkYdVD": 50.142857142857146,
  "1W4y9LmNO70tGiRvOBr7vQ": 36.07692307692308,
  "1XpHIJQp4bmrCxnjoiul2A": 30.1,
  "1YYiHHgQyFbHRgV8VW2tvK": 32.69230769230769,
  "1bAuCGijf3U2E9qmELkbMi": 57.54545454545455,
  "1chai9m11IEsQljntheHah": 35.93333333333333,
  "1iTnB3OtVPVkhwMuvw5dDw": 45.15384615384615,
  "1ruTx9oC6SIx7dIlhezgoZ": 30.77777777777778,
  "1sTLdCRGiau72bDtGg8vPg": 35.57142857142857,
  "1tNm5ZOdLlb83ZpjRF0zp9": 24.545454545454547,
  "1te2wDY6tWy3AqWAFfxB1O": 16.384615384615383,
  "1wCeJQFRKndkert6ihmXrr": 31.5,
  "20ajIidFvqgwAUSQ2Ac9RJ": 46.61538461538461,
  "2ER8ZHzmF8YBJQCLHChsyL": 45.8125,
  "2LrUlTc02oJZThoMA53wCh": 15.357142857142858,
  "2p3ysutMjqE0COLRi0frvx": 33.07692307692308,
  "2rVhQG6mAElXYPgV0iSTKo": 23.1,
  "3AfkWhettZCFXqEckJVKhY": 24.8,
  "3ENjyzgJ5QTQsZHSbEjTDI": 47.38461538461539,
  "3IJR9jtuWDHAvoAlEQr9Yr": 63.4,
  "3Lv4KydTSZV14S06hXuRlq": 40.13333333333333,
  "3NAP8Bu14LRgbvVHJsFcD0": 37.38461538461539,
  "3mGYvzNVDTD7H4AqmHyKzJ": 38.411764705882355,
  "3qguDmAkw8nOfpnUMa9cYs": 37.583333333333336,
  "3tsXVqSm4kQTitC4AYZLCC": 46.6,
  "3ylA3JPDzz3az8Ow5Kt8Az": 38.583333333333336,
  "40sEF871Viy0YzrdbBLrnP": 44.733333333333334,
  "40yycLkpebclDp87YKrpCv": 27.916666666666668,
  "434AJM0UPojFZJujdR2qlb": 47.36363636363637,
  "4474DLeH5gyJbDXSuiY53W": 50.07692307692308,
  "4HZv32SSj09O8pzNbOMpLq": 44.30769230769231,
  "4TLYeQU1CzCrO85eeDazqJ": 35.416666666666664,
  "4V9ICHGjRzmKbAwkQXKbKV": 49.785714285714285,
  "4YVMgfCDT71b3YNby8LKrt": 32.11764705882353,
  "4bBR7EeA7pdR86tnCaaMkJ": 19.727272727272727,
  "4grrfyiwfh1Qaqy9TlUB4A": 38.93333333333333,
  "4uHPiMfv4rWmPOvzcQnLH5": 36.6,
  "4xkhXpxdPtLQsZ4QMwWyJh": 55,
  "5Az4QLE6N9cGNoWZTQtTY1": 58.76923076923077,
  "66ADckje8VMv1QATG3W0pN": 52.75,
  "66rDNkfNnfPonsOJ9xZ6uS": 41.81818181818182,
  "6SWzm5GltIZ4wXLm01HW8V": 21,
  "6WRduKjh7JrRrCXsiIbSLx": 40.333333333333336,
  "6cf0RJd1IRFn1CJixcuEs9": 37.25,
  "6dwzgWrKlFq6BqYMnjyok2": 44.5,
  "6gOatphnTP2oNArn5zQzVT": 52.61538461538461,
  "6lbZN4QGKExm3xlilSCden": 50.642857142857146,
  "7050PAK0SXLdnqxRQVPFEZ": 38,
  "7JmcjLdGsnmnwXaM2ZCj5I": 40.92857142857143,
  "7j0fwqrjZl1EFxMYzBWW0v": 58.84615384615385,
  "7kICfXLlOMgTo7PbQ0z1iM": 45,
  "0BFHdKUUEorg7p45ekkuvO": 43.90909090909091,
  "0CMkJZDrk57fxrGqLuxV08": 28.6,
  "0HzXy66PQByVcVfFy1451j": 20.25,
  "0mf9WP7dEXkHTxom1yJ6Fx": 36.30769230769231,
  "0tGqWkNrQWeOvTKYakwlWN": 49.5,
  "0tc4ewo1hQkxhxwtuuhWda": 56.166666666666664,
  "10dMUnNc6VSXNGL4Dp36R5": 50.84615384615385,
  "1K6mHnw00WkJ3jpwOIJKoa": 45,
  "1RzdoYgosgH3fOoUKOyUI9": 32.416666666666664,
  "1S7FGbh0NqTHGs5WyVaz7X": 54.733333333333334,
  "1Td5pO43OuMAoir50hZbh0": 34.36363636363637,
  "1ZymNjJUNcisSfFG0DtN2j": 31.733333333333334,
  "1dfoMOPpXKSk7v3oVg4Se1": 38.416666666666664,
  "1eHKim3YrU5rXxf5IWjPE7": 48.73684210526316,
  "1v9pE9yYjXKMNEuSXXzi68": 50.75,
  "2EGNiPcc1cxhU5T6t7Qxy6": 19.5,
  "2EjtqDJhfArswl1GF6E3qA": 33.833333333333336,
  "2VrUYHlhFax1HOwOiMZ5aO": 46.7,
  "2gRerWtTdBsIYJO3EyFWoQ": 57,
  "2pxP0O45imFIrvaQ3kNbF6": 32.18181818181818,
  "2rmjIq3ulfqOnzxtFxAl5r": 25.5,
  "2w0xh0XXzVvlGC6wWhM6oh": 47.583333333333336,
  "3148OJDcF88R9aYRkHy1cF": 34.5,
  "31fT3k8o7zN3jf30V9HWzG": 25,
  "3Jsnc9YbGJOjsJo0V4vUzg": 64.91666666666667,
  "3LmcKe3MVKc51eeYq7NNE6": 33.92307692307692,
  "3OF0nJw5PqhtzBKgyG7Z7W": 60.45454545454545,
  "3Ui0d7raAicFbllskBA6Sp": 46.333333333333336,
  "3qAibRpiqsQhiCKcShy6C6": 45.54545454545455,
  "3tvO1GngNKuK05NNQYdN8n": 35.5,
  "4OLdo0i4HIvNogGsDOQRra": 40.53846153846154,
  "4Oc558XPDj8tTXl8AlzMey": 44.083333333333336,
  "4d5VD20xfvkZHpiTK6SBhb": 34.18181818181818,
  "5H3Hokavct5YCygHOFaF4p": 32.93333333333333,
  "5JHcuprb7hbcEJqekxLeBt": 61.083333333333336,
  "5Y2m0RDDkbInL5wz357x3T": 28.923076923076923,
  "5YnKw6A6fqABmE7gyIjvcu": 26.272727272727273,
  "5c4BKwAxPvxfK3TjBAhkLM": 27.6,
  "5p04xvqHsONWfUVaWUuX5Z": 46.76923076923077,
  "5sKO6fWlbhd3g41nof8EFI": 46.07692307692308,
  "5uYrylZqBksukDeeZ5BCIV": 30.75,
  "5zbdNBrCNzppEPybcGviJT": 50.083333333333336,
  "602aGPuY3KNj28fZQqBExO": 49.166666666666664,
  "62X3wQBExDt39GuYMggLLQ": 48.388888888888886,
  "6EBJAon0qqxEO5tWfuauQt": 26.692307692307693,
  "6Fim35PJaoBiXEzh6ya0cl": 30,
  "6OihiCQ4ftr72HfcKJRigr": 59.9,
  "6UEXWf9hP9APHOMVo703v8": 38.18181818181818,
  "6UspE19FCbRZPgLH0Cffrj": 55.714285714285715,
  "6XCYdmJz7y59YY54yNzDFU": 38.07142857142857,
  "6nJAi45FhyPZNHNK92x4Dy": 45.27272727272727,
  "6ziVs9EASsYZjF1o4j0owr": 53.13333333333333,
  "7B5ooHK4Xak1H7vu5S6kNd": 48.92857142857143,
  "7D8nDNWCtFI2b328np8HbR": 55.142857142857146,
  "7eaRV5cV2MHn20FdoJKVBE": 38.4,
  "7m894gyf1JaneXuYIvw9a4": 34.23529411764706,
  "7mOgHlE5CAytWx4afI4fW7": 54.583333333333336,
  "7xLtnpTKiAssfvSrNwcqJW": 50.42857142857143,
  "0ByYdTiPHpAyxYLcayPfQY": 37.8,
  "0CwgZRn5fPeBQjIdYguemL": 57.8,
  "0FKfR5dLtAFTid57rta1oi": 31.125,
  "0HgYWu7thLmn1lwKO994qn": 64.72727272727273,
  "0KwD7N8bTX9Msx9Ic7oqGO": 38.294117647058826,
  "0WDfUiBWkw22lS6Z3T5IQH": 48.375,
  "0Ykj1ugKryaB1isFOuxxlN": 62.3125,
  "0aBJSv9LdvBfN5Hur4WABq": 29.5,
  "0qfEonjUx3EJn8W2at5ajj": 41.25,
  "0rSqTudoSfyzcegZEGHCmk": 47.53846153846154,
  "0yk9HOpr6M1zEPu9JDW1bX": 48.2,
  "0zAD1rLuZK0J6yv3bMKlyk": 56.44444444444444,
  "15dZdxMN6YHgI3PVG6q6Nk": 50.166666666666664,
  "19fy06JU0UH71gmjhdIY36": 55,
  "1Ekv68DcCzOpyaZDmilD42": 20.7,
  "1LdPp5pu2hGUJaD8wrh8o2": 34.53846153846154,
  "1ToqLkupGdzvKqMNvgTgeJ": 27.09090909090909,
  "1VYdhXsJtqpnyKj4p3PguR": 51.8,
  "1abvL6BNpiPY2RjVEHxnQt": 48.916666666666664,
  "1poeeX4aw4eHZAkCgpo73h": 42.916666666666664,
  "2CghtrF4QgM7AVfzidJmM1": 36.875,
  "2GiQ4GrSgZw0deIdUVFaiN": 27.5,
  "2Qj1WFW7FjTpYO8pY1oEgM": 51,
  "2ZXZqmQ9Tii8rdEER7WiYP": 47.72727272727273,
  "2bEoUgyNptbFZjJ85aA6Ks": 36.111111111111114,
  "2biXpm2HAaLW1nAF6QCQEn": 24.615384615384617,
  "2lt5VfhXNuiYoiLfiz65Bv": 38.69230769230769,
  "307LSK1s6M4QTQSFZCCffV": 41.583333333333336,
  "32YJEnDxVHyeP7EiTW6Q98": 44.916666666666664,
  "33HKxTBsFs7ZefmKLjcco7": 42.7,
  "38nk3bm7tMgKdG2fwx7Ryt": 35,
  "3FlMlG1V6uhSDsq7scGPzD": 50.61538461538461,
  "3XAFWlzs6OxhFwRE3Fo2kB": 44.888888888888886,
  "3s4BQwkoQPqfnQgQbs0bLx": 33.23076923076923,
  "3uY8oO4KKssG5ciufYuID2": 43.083333333333336,
  "3yvt8ZADyUxZ5tc2ERo03l": 45.93333333333333,
  "463PiFBM40e7GjRJmxOKdj": 45.81818181818182,
  "4ALiTJTvyZvLXWzEoToL2H": 51.083333333333336,
  "4HqlWBZcE4xEEVOuA48rIM": 47.785714285714285,
  "4QLw0UWe99TeG6QC56xKjE": 43.38461538461539,
  "4RuJB5yz7McXiVQ04PNYd7": 31.90909090909091,
  "4S3qIRhCBLUR7KdaGoc6yE": 55.1,
  "4YwLI1RQk3ljQszTpZuAWp": 52.38461538461539,
  "5At03QTvrpjzqOdeRXfPMX": 41.30769230769231,
  "5KJi3110WmM12LELj8nyXm": 54.15384615384615,
  "5XJx8cv0axrJZopYr0La0b": 15.23076923076923,
  "5YgoQ9RwB3ZRl0MYKp7MOr": 31.076923076923077,
  "6L61wMxUCUWHktgrKM3Lwj": 41.666666666666664,
  "6RQrdQeSR2J5fFJUXq3zYQ": 50.125,
  "6Wrqyn9M1EKcVl7Ye8yoCC": 35.92307692307692,
  "6Xkx4OLTexQIVxVLJh3PUT": 41.76923076923077,
  "6sNvcboUYymD5dur3Nb9u5": 36,
  "6sbxV2dgcaIh4IniZxnjvx": 26.5625,
  "71hbNXM2QBk0fFYWoofB3S": 51,
  "76LKpwkRqEavbj1DPq7ASM": 48.23076923076923,
  "7FBEeNE7AJAwxx9aJ2CRoy": 23.46153846153846,
  "7aQMiaBCGEevHcyPyulUmM": 29.72222222222222,
  "7boOuFbGvdl49VgenwquCS": 50.25,
  "7jvITZQcA0KpniuebeYJXl": 37.266666666666666,
  "7o7qSfvTaFgAeQVHIKoOcb": 46.75,
  "017zoxjT8xDcGjcbHE8Tz9": 45.666666666666664,
  "0C2r5kvrhBvOGBMu2HqCDx": 50.07142857142857,
  "0NSdejoVQhIlZpvLNIqtJT": 35.92857142857143,
  "0Tqp35Bwhv1LVtplDJlA4R": 33,
  "0kE5wlfnrhyqV4PKgZRLaq": 28.333333333333332,
  "0sGtLQit48DswK1EnR2WFc": 42.3,
  "0vfEw3M5ecLrAtvtyBPGyB": 46.27272727272727,
  "1400TlGph2C6kgmnbbhKPG": 53.666666666666664,
  "1DYR1zD9fYssBX3Pzx4H4P": 47.76923076923077,
  "1E7foxiExnfjSUUDqc9XXn": 53.77777777777778,
  "1EnLikuLEMYFGdxE16ziSx": 36.86666666666667,
  "1KB6JVUPp7R1gARfpcrQn6": 15.666666666666666,
  "1LMjAskQm27GGlMFcwqrjc": 26.294117647058822,
  "1dXaHdBZtd6xwh9yBaw8gJ": 47.57142857142857,
  "1sTxKwvTL22lcZUO86stbK": 29.166666666666668,
  "1sUgpK02Npywkuwmczt7Vz": 42.4,
  "2DgpaI5q3WbsFGJk2ZSeVb": 41.916666666666664,
  "2RJAo9ujrYeA9MApE5zx8O": 32.13333333333333,
  "2bJKhzySOwceamfi74dKJj": 52.07692307692308,
  "2p414czbrRw2G4Y76xmUuA": 35.142857142857146,
  "2pF8L3UhfxZUL0aZu5gdnp": 23.272727272727273,
  "35zQ7teh3Z6YJOztV908nn": 50.916666666666664,
  "3LUU6w5A4xqFbr4ts6bhCs": 37.05555555555556,
  "3XwTIfvafBDTsW3jaqk3rC": 35.266666666666666,
  "3guDW2h3ROXVkHaVkO5Taj": 32.8,
  "3igWyHVHVMvKyduOPRpiIU": 35,
  "3lqV5jDBpRofp4J3rAGlEd": 25.545454545454547,
  "3qlSf58Q2B8KWCVNCjUsFr": 29.23076923076923,
  "420arnJMwyKslbPkeNoWK2": 53,
  "45gSBO3SAOFt3JFOrD5fWg": 37.214285714285715,
  "4JIZhWmgTmxHhqFeDa6n8F": 50.266666666666666,
  "4MrWGERwW0PcnMyuoTGliB": 23.46153846153846,
  "4QThBeB6aXMGFNQhTf5PI6": 38.588235294117645,
  "4TkFmYNf3PP26zhgrFCyuG": 40.6,
  "4inLCoExE9Yj60JqPWOflr": 47.15384615384615,
  "4mHtSN18oHmiDR9mo53msi": 59.666666666666664,
  "4vR3oCN0p06vPCWvzePzse": 34.81818181818182,
  "5F1Umef9xyfR7iKMyNv9gH": 46.81818181818182,
  "5HPBwlvS6hGcz0vKVht2hT": 52.54545454545455,
  "5YxaSCtriSqtMLvCVlQFr4": 42.8,
  "5Zox35XNgB4GboXOpoHxwE": 61.18181818181818,
  "5adQ2ZjEcdyGpAFUv2PCm1": 45.583333333333336,
  "5lT6GcJKqlYPWhtBHyBMbH": 34.75,
  "64ctWdCmIGRdtTnpNA4Vvw": 61,
  "6JFEmhqOQumO3OxavFkdbB": 27.235294117647058,
  "6PaWwwhC2sWUrxB7UDaJ1m": 36.75,
  "6SG9W8DNhPTZ8DYQf3p7ze": 37.54545454545455,
  "6WWNKg7GGRSsVnkISVqZgw": 16.05263157894737,
  "6acxTNNAIdw0gbdU2AI9lI": 40.76923076923077,
  "6foiWGee6xPDiU1qPVwdu3": 48.06666666666667,
  "6fshAHu7e7OMPEbSkIaSr3": 26.625,
  "6iEdR0hw4n9x5YNyQZ46fL": 33.38461538461539,
  "6mKXADqI6ymJ3FetqpV43t": 31.833333333333332,
  "6n8O0cbGNkp54SYA2u3UG9": 39.36363636363637,
  "6qpxUUPVfypS9l5h7cfbk2": 52.875,
  "6xXgHprJuEZDz7xHDwEZ7M": 50.666666666666664,
  "7AV2tXa7uZLG8rYmlKYw0D": 20.133333333333333,
  "7DInjsYgSdf9zShdFXagz6": 39.916666666666664,
  "7yBbgH5L0Agb9R5lu7w56H": 31,
  "0I3gUF3H0r7UrPAvQPnz44": 39.69230769230769,
  "0b2IVhRXCvAeQMLWvgOHKb": 30,
  "0u2uFvQPrPZoWMvw3mWUkU": 44.42857142857143,
  "0x900vhDjHnJ45HRlhmkbP": 49.333333333333336,
  "10oDrVYxtA9cAxwlzMzSYg": 52.2,
  "15wIsCIlFuOXWaThAF8JlW": 43.916666666666664,
  "19lx7LiDE26DQtzxj9o8YA": 44.23076923076923,
  "1ZDOdchOVXEpjM6gvkxerD": 50.083333333333336,
  "1b2K7XYVogLhfyjnevuZR3": 46.07142857142857,
  "1eOErJljbKfvYFXzF5NzNf": 55.75,
  "1gJ7wiohEsG2WJl2bEewK4": 26.235294117647058,
  "1gjE1pFyq2E098PjMhaoRC": 47.15384615384615,
  "1kzgNC3cUcpx9KjCpSPIqD": 37.666666666666664,
  "1wS3AQQoN66TDUsWNIpkqt": 50.916666666666664,
  "22zJzEGmvKstVxVDLtAFOY": 45.36363636363637,
  "2UGNpey7iHsAXDg06txy3P": 40.27272727272727,
  "2cNVOWwTSoMVZlbE7Fiy5m": 55.916666666666664,
  "2cQsBKFXwFXRTbrdlV3poz": 30.785714285714285,
  "2ukat5URXO3dyYOsANEGcs": 34.333333333333336,
  "33Z3omzgFOBUjBMFor0cqo": 51.53846153846154,
  "37afQ1XcGKahroISFlGYiV": 28.75,
  "3QYRadREu1h8qBu7Px14Gg": 36.916666666666664,
  "3YJTc46LXqkAauNaUulB08": 38.73684210526316,
  "3c0dp8ehu70aalirkOfhzm": 35.666666666666664,
  "3sTVUiEaTRl5hqPflO5hQY": 33.333333333333336,
  "43GJ6jpTXruDSuDMU4ZaxS": 54.57142857142857,
  "4GaKBHX7TBD4m3cRKTFW9i": 33.285714285714285,
  "4MFPbnjWafssiOapz6rWxz": 52.38461538461539,
  "4WC4wsZQBQE6Y0JAB57UBV": 26,
  "4cufozEJX5K1k20idlTbGI": 54.3,
  "4eLxjAPi0fASEagkT2Xql8": 48.53846153846154,
  "4iRfmH7nwBJsAJNgjWZdm2": 59.42857142857143,
  "4oo81KHQ9CNEV73XNgf2zu": 45.07142857142857,
  "4tuRYrdEamsstZ9A5cPr2x": 43.642857142857146,
  "56BbhHUsqkBCZv31BjoWDB": 46.714285714285715,
  "5YIHyRH54xC8a03wM6Wt2y": 48,
  "5hQYdocxrcIitaRNdiMEjB": 38.25,
  "5rTKvhQy6OUsUhDlKXgRnB": 52.42857142857143,
  "5uuktD6jXhgxhLrB701ATx": 34.55555555555556,
  "63jyVncFLz4THbVnHUXL59": 28.181818181818183,
  "64XvUjUnGHlPckowwlby4h": 28.066666666666666,
  "67sh10BkTyY7pxyOc4EFuB": 52.333333333333336,
  "68aZ2laOTsGWK4I2EmaRO2": 38.30769230769231,
  "69aDQKQLqgbyTi6LsmFJeE": 28.785714285714285,
  "6Dhuhx0ILT3bEtwELJH8o3": 46.27272727272727,
  "6FxEI5DmdN8znqZpzMIAh8": 33.833333333333336,
  "6LaDsoDE9KejuTSML0QR5e": 33.875,
  "6ZhMentvityKstRZO4Xvpg": 48.083333333333336,
  "6cVSdrAsdaBDkwmnwuCy9L": 47.916666666666664,
  "6n8LI5Nw2cRJx6cdDWlZpA": 21.3,
  "6ujvpWQz1gBZhupaRRvmEi": 44.36363636363637,
  "6vAU4iPAbtvYBTdkR5Iejt": 24.46153846153846,
  "75xQe4aff71AHxLvPgMcyf": 46.875,
  "77p5Ok5mgg94DKi1C5DgML": 63.75,
  "7cl8hyZwDiRMlhugRJKPpt": 31.857142857142858,
  "7kqeHRRbtXC65x4v3v3xHJ": 52.833333333333336,
  "7p1j0ifrSuB0iJE49Dq8pn": 51.416666666666664,
  "7vyX0PVR6dCTsW3DXYQys5": 44.666666666666664,
  "00h8tMurrpEoCy8C56nqkQ": 55.69230769230769,
  "0Emyh0wVvFaKyopENcNfPd": 62.083333333333336,
  "0FITbUrv7XllTk1oySWin8": 51.166666666666664,
  "0FbSbHyhgdxHgYdqajUxTh": 51.333333333333336,
  "0WmLQONMFmI6zVHJW4mbV9": 55.23076923076923,
  "0ZTxw1vUsH8xJPpjIkxsG7": 48.36363636363637,
  "0b3ooPYFvl0mJw2zkPmu5Q": 41.84615384615385,
  "0dweRXNt6wQgtlocDFPmTF": 27.833333333333332,
  "0exUEcbTnvWv9iMYLq3yZB": 47.07692307692308,
  "0geFC6k4TzwlCfrqeHjTNg": 53,
  "0tTicUcdXEYICtIHvYBvFT": 33.76923076923077,
  "17Us8RHpbIYQYDw7ObtxVq": 48.09090909090909,
  "1RsgGnDI2GCI8pzx2GaxdC": 54.61538461538461,
  "1eZJt2oRg6yRphOISN8wlr": 25.5,
  "1nvmeEPbAxDY8hUSBq6c18": 47.083333333333336,
  "1x0s51zxco7I8m3muVAnlf": 21.846153846153847,
  "22cXiETMyYu7G3Dpny586m": 47.07692307692308,
  "23zFquwfzajgls0ekx8Fxe": 29.529411764705884,
  "28IyVIrPEI4EMb9DBKeBWc": 14,
  "2QhFdRUrRVjUNpgL740S1n": 42,
  "2T3S6vtWdHrRN6IJZy38eg": 32.92307692307692,
  "2dp6Xm4DSlcplrqVsZDGRK": 27.46153846153846,
  "2it13soQvploYY6KI11oHO": 51.5,
  "2jAa0oN7x78Stby19jI7y4": 18.6,
  "2xogYqMyzDjfQe0x2icWRS": 30,
  "36sQGTIe0ptTA0pDwplQh7": 53.714285714285715,
  "371OeDy2oOq8eqc7PpCf42": 24,
  "3KJM3ERIOGEz6BwkjXixjv": 41.23076923076923,
  "3Ycc6yv3pkxTTykpI8Jrmi": 60.07142857142857,
  "3gAnhFGWNHJy5pPe65ZcC0": 49.73684210526316,
  "3kEmOOFgexY8eLWOB8koRl": 52.142857142857146,
  "3ncp6RPNj2m0vcajuKNeLr": 44.4,
  "3q4Bbft70mNQ14qLW9YgIt": 48.611111111111114,
  "415qLb2zbQhs728uFZMLyj": 70.71428571428571,
  "42BccM4tmmZ0P4gCyTJIk7": 54.53333333333333,
  "4MYs5RGgA7EXTqOGOlinOl": 58.416666666666664,
  "4QtJoiXK8Wbb2EqSzidTWY": 31.235294117647058,
  "4eSuICXJHdywRVjGKtdrCu": 39.6,
  "4mFOPWrY8898J44tDTEUhj": 32.25,
  "4snnAotkni3iqvQq5ZkOIH": 45.86666666666667,
  "4yqJ9eRpteRMEmONQ1KUof": 49.733333333333334,
  "5014do4oKojlcVmzq2tUzF": 46.84615384615385,
  "50xFkV4XYPM31D7qKV9gRt": 33.81818181818182,
  "57r46fdLtzWZWwIU5lU4tH": 65.18181818181819,
  "5DuajxHhqePKRC2R1RJkOq": 41.07142857142857,
  "5P0cTs7RlQG9zv5hCC33Rt": 45.357142857142854,
  "5U8CTQxZC1tDTAAouUSBdE": 38.0625,
  "5ZKTX3BNjFLWBEHPD9raQ7": 47.44444444444444,
  "5jCrSemuMRAYMrVxtpLL8V": 60.4,
  "5n1t1Zu8QHtyVGBniESSg6": 33.375,
  "64ze1MMr2vOS7Oedy5ZoDq": 58,
  "6SDCvS4ai9DnclRloiO6h1": 21.363636363636363,
  "6lr1X8ifMpwh8Dc1boZoF9": 33.333333333333336,
  "7AFYoZSMEJSEh9irYbytGF": 31.466666666666665,
  "7H4L75kX1HZAYarJXeEs6r": 45.92307692307692,
  "7KLjaMlHJNyZDXxlWJ76GU": 49.42857142857143,
  "7fDbPWhICoNCbBLVSKmj6Q": 47.15384615384615,
  "7zzAv8jV03CVE78weOosNq": 15.692307692307692,
  "04qQ53dlTA1VbgTZRqkEPv": 28.583333333333332,
  "0M7oIoR6GQ0nZpwJMu00PV": 53,
  "0Ucpqjb5ZJbguI4uCbmMqm": 46.083333333333336,
  "0YnBv32Re3mwr19pDHX0yA": 39,
  "0kaViVb3K9q2G0hWLFj7Uc": 26.785714285714285,
  "0ytkO0TgcRX6todTOIy6RJ": 48,
  "0zHhIBz4B6gyaMf0W4BQWK": 36.333333333333336,
  "1GJNySw2S2hJ9jOnFdU2ck": 40.84615384615385,
  "1NLTNCVZpbUj4OlGSxmvtS": 41.07142857142857,
  "1TZFPigHyuNYFNKRaKZupV": 39.714285714285715,
  "1VLLbpytPyxi5f1Uryzx4i": 36.875,
  "1l2vxXdobgugnoanEqRDPW": 59.5,
  "1wjJ8Qg2ZchLtSytmipi8B": 40.5625,
  "25SOoCQFzJUhzJLrekKQTI": 44.333333333333336,
  "2IJHFFeJdS2c4vKPbfLaZq": 50.42857142857143,
  "2JiVNiUrIpMu5xOW6yx1xw": 58.142857142857146,
  "2LBy2Hcpmauax2jEk24hle": 61,
  "2ZIXG0eJQZCGnDm8C7filn": 41.666666666666664,
  "2m6LDLwVb46C0st5vDW8nU": 41.21052631578947,
  "2oXHuSgR1mPRc4eJ2njs6I": 40.75,
  "2ovusBVQYBZzRXr8gz0xQ2": 57.27272727272727,
  "2tRlLqIgloTAJf85e6CjaB": 59.9,
  "37KoxqVCi6txdYndSYtMqg": 41.53333333333333,
  "38KBGnjWiruxKCaZLljSdH": 31.333333333333332,
  "38N2HlokCYWcoQNo41iLlX": 53.07692307692308,
  "3GUumCDJBmr7xIorcLNCJ8": 33.1875,
  "3NwW5TcBdJCBM2uNN5e2Qb": 40.77777777777778,
  "3Ogjry7hYnuDfoyiNopfOD": 29.4,
  "3bc5rKbAqGP2SDbM7IyzuG": 40,
  "3j8siME7ieFz85qsRt0ZMQ": 42.86666666666667,
  "3lsJr2ZC5D6WWIIpWEwdya": 56,
  "3mXby7Msu1ObHmZGagKgPN": 39.23529411764706,
  "44wLSP1SXTHUqSbkcHwArk": 44.5,
  "46aZNPKtM3kTVqjGptLUoJ": 56.25,
  "49yWY0tf82gOOeu99nNSvv": 48.45454545454545,
  "4PvxgTv2WPMKEy6kqJj2kx": 32,
  "4YFZj4HpdZyKEJgz0CTIyT": 42.45454545454545,
  "4eyMUM0Qns3wI38LSFcd3G": 51.1875,
  "4pik6sCsAPQSJ5E0k7BTqw": 43,
  "4xreMrr7It9PIl98RdQfef": 43.69230769230769,
  "59aaHAHGgI2aRoSr6NtexN": 58.54545454545455,
  "5MenyOmnIdpm4UPOjPPeLi": 33.11764705882353,
  "5PJSVWoaKTlD1wo2NbrJ0V": 40,
  "5TkH4v1dfsWAXhBAoMHgQb": 49.93333333333333,
  "5X9GtelzRdBkOYHaREZ7Ee": 50.45454545454545,
  "5Y2AptX857ryLbMPQaWBX4": 51.333333333333336,
  "5aE7xRhQDm7E5CRFhoWd3R": 31.166666666666668,
  "5eLdhJZeCe4BWjKA1Wa2Wp": 26.5,
  "63uFelnyBPH91VMHaHQswT": 42.63636363636363,
  "64rzcjWWGRHSL4y7toMhVs": 49.857142857142854,
  "6ZMr6AvUXBv58ngkXES0MS": 33.642857142857146,
  "6bILECF9wMaCjKVai4GM5Y": 40.8235294117647,
  "6i1aVpXHH5s3coB1yVJcj0": 46.416666666666664,
  "6xfJvslCIy0IwDToWHIFiH": 51.875,
  "6zNti59GZR0loSeRjnZ5Ds": 48.416666666666664,
  "7cYZVRKTJjm5k3J6IDwUPV": 26.94736842105263,
  "7ohtezy6uDcrQQB6emIbmj": 44.142857142857146,
  "7v97N4eYnrWqeYMnAHBYg5": 28.27777777777778,
  "03no29MpzgaI6bEBtG6NAw": 24.571428571428573,
  "0Derk8qpnDa3W0ZfkCnYvQ": 54,
  "0KbAHJkmhnOzrDygWZUSkX": 45,
  "0T0DHuAtY7io4JFfLjHw30": 40.07692307692308,
  "1IkL4zuUCV2etCNTbDsnqe": 32.166666666666664,
  "1MQriFfAPMBR3PmtFMarIe": 50.27272727272727,
  "1Nv0tZDjZQnCYvgGHbXcwp": 50.333333333333336,
  "1SxTJGVQhR42ENbrAVfdqH": 30.833333333333332,
  "1U7mTmxte9hpsFAcUNQuyb": 38.166666666666664,
  "1azqMk4SIMKKUFjtQZaQZe": 43.07692307692308,
  "1hIHrE1W4kDmp8h55UVOtt": 23,
  "1hxiSReiQsFnSIMqK8rZVB": 65,
  "1iEtiOHBST1Y37CJIt2kNn": 40.18181818181818,
  "1kAqec8j9uchRqzvBHDfQZ": 30.066666666666666,
  "1ry6S5aRdU42pEQsfxQmrh": 47.69230769230769,
  "1tM5DyGFbFT77HEHZzCy5O": 28.72222222222222,
  "1x9aluIRGo6HTSKGy8WVob": 24.22222222222222,
  "20ouG7Ti67FtGYEGyrKWGo": 49.75,
  "23YwhmXpERYwBoXyiqKn4E": 46.92307692307692,
  "2FlduZ4UoT2st9QOwNY9cF": 43.333333333333336,
  "2Gck68Uq8q0JB8azCUzfSy": 48,
  "2Kw2xfat9VMJVPjtk9mB1J": 51.833333333333336,
  "2NLSnEOvfrBXoCLi23Olrg": 38.54545454545455,
  "2W7H2jgFiEb3U0z0zgJ61A": 39.07692307692308,
  "2dRoD3XIe0CN6nF9QNiroz": 46.5,
  "2iuSgmHSz3gfyg1LV2qSh2": 37.23529411764706,
  "2nZL70NBp8CAXyPjMLCpYQ": 49.72727272727273,
  "3NjT0cKBJ6ieoQZGo0aPLB": 55.714285714285715,
  "3NuEOf3QIqf1IFzeEFVBMp": 51.75,
  "3PVnJV7epA3B8taKwDzW1B": 30.36842105263158,
  "3QDqocFyo5fWMdpj3vWXye": 53.92307692307692,
  "3c4NtV7DsQSKHL3r3vImD3": 55.73684210526316,
  "3tj2RH9jTpPY5FY2lGPM1C": 41.666666666666664,
  "448Q7s6Re6WPkfJrmHlfly": 42.5,
  "45QeGwFZZ5fLFUoG9Z7COs": 41.25,
  "4Eih91XAR8mrjxahmTNAC0": 45.388888888888886,
  "4ElVIEJiT0LKgNm6iAMRFV": 53,
  "4LtVZNqrYmx8rRySXjdlfo": 53.81818181818182,
  "4dzDmXTy0KcdO8XzGiaxXB": 37.142857142857146,
  "5509958K4goVqoUzcgrdkS": 48.3,
  "59XRgPSPHt0XjcBKPrnudX": 42.15384615384615,
  "5IitxJdSP8ps5aHMDfVSP8": 40.46153846153846,
  "5PntyfsurKXqW8kc5QcXxV": 33.083333333333336,
  "5S2KOjXwXrRUFmstPK7LJj": 39,
  "5f4dEsu2NonFs33lwgtCV6": 35.285714285714285,
  "5lakNR2vKh1xGZPZnAqIsh": 35.46153846153846,
  "6GEMxfPnocTKKEdH0tnDPr": 32.07142857142857,
  "6dzDlGQg6vpEDp6jTnYbJo": 53.75,
  "6rHKaQbJkYrdZ480RnzW7f": 51.7,
  "6vqtvqJicv1TsAgRe0lSqg": 46.36363636363637,
  "6vt1FwntYkXAFtLazET3oC": 19.083333333333332,
  "6yK3caKOrZnWZfNRJxudwH": 29.6875,
  "6yW6t37kV4zaWVcHyp5SIZ": 59.69230769230769,
  "73VUN4eky3OvUySaejTyj0": 54.46153846153846,
  "74O6Dksa3sajJztR0YZZ5C": 45.93333333333333,
  "7HNPNvtM3fj3FUM3OsnVug": 50.38461538461539,
  "7iFVpbBDOwx48XfszY7OM0": 49.36363636363637,
  "7j71kFAfY4cQ0YpWLVTwnu": 31.666666666666668,
  "07leRqn9JlltU1PYtw2xeL": 51.5,
  "07w8FFNe2F7N5BcLwXmvTM": 46.666666666666664,
  "0MZjusMC7jiTo5mlaokLss": 58.45454545454545,
  "0NAUphSQRuPaYtvEvrklcE": 29.38888888888889,
  "0eEIz8gfBnYVP4OzW2NDj6": 35.9375,
  "0eoh2vp4wG0Adrr2SPTWAH": 42.30769230769231,
  "0gzWzDP6O3x4VRYk4ftMA6": 47.06666666666667,
  "0qLNtTceGZCm7hRfsiZZl5": 47.53846153846154,
  "17cDuD558dbX8n9SCgYMTN": 41.55,
  "1ANu8r1fWLZCDeU0MXaVMc": 45.10526315789474,
  "1MbN7k6aXnF1ZREBjz2kGs": 38.666666666666664,
  "1QjvXffncPgW5UPFAFWMfq": 44.84615384615385,
  "1Ve3Ji4YX8XsnGEPq25Kb2": 55,
  "1uZTB3hTt0pBdcJOet23wE": 49.6875,
  "22F396SCko1BeObkenQOv2": 55.9,
  "2KQLqbZsJeTMWacqCX8ChK": 40.166666666666664,
  "2VtKQC2VpLzPkpCDid9v7V": 57.76470588235294,
  "2VvneLRPzO8df15rxlG2Pa": 36.36363636363637,
  "2WQVBoSQ2vaHEy1cJiLfSr": 37.916666666666664,
  "2h9KQeUa0WPHf1Ya4v7Stc": 61.63636363636363,
  "2kpXwYv6oeB4uqJEEIpagk": 47.833333333333336,
  "31FIVSokeaaoxDXS7FI74N": 47.53333333333333,
  "34Pb65yZ9OIhHw0F73z51H": 30.25,
  "36e9LfWL6Ap2Yl6meDmhAU": 38,
  "3826rhiNVBEFmPolAkDFnR": 64.91666666666667,
  "3TN68mh0BnbBdrBEo8jn6h": 60.18181818181818,
  "3VGmQvnsGwB9DpVGG73eor": 51.45454545454545,
  "3dlzupELRmPlKnLBVxOzGR": 61.4,
  "3kbyuE7eRKPI9PKJn9Uy4k": 42.07142857142857,
  "3kzvmeeFxuOI9jyubTYqLt": 46.666666666666664,
  "4AZDSVGrydkNls3zgv4XBt": 67.76923076923077,
  "4DgV4zmlvk5IpKBouseenD": 37.81818181818182,
  "4HL1LjST99HmSlvzVmxFQu": 46.88235294117647,
  "4NUUet46Z4NTHgakTaEeVx": 45.15384615384615,
  "4b7SsdFZTQ71AiM4D7isuA": 42.61538461538461,
  "4bZQvt9ks5Eu8hKLOdX4CZ": 41.15384615384615,
  "4eeRfxttoMOuaa59EqQ1K5": 37.857142857142854,
  "4gP9HajUJ0vziLl6ie1rvx": 46.18181818181818,
  "4wTV1Z1Q9KF86OAzAn07CU": 39.416666666666664,
  "53G5yG1THCrb5wa4WqaAhv": 47.5,
  "5GBbJujv8RSgw8sHm6NKsf": 58.06666666666667,
  "5NvBHXY8ahSD7bpo81QgQ6": 33.23076923076923,
  "5Sa3JC0GYK5BBw8pzeGsAh": 41.285714285714285,
  "5VFKSDChAhviGyGGl1ELsJ": 50.90909090909091,
  "5fUsiUoNH3VL7Bg7ix5Nll": 59,
  "5pRt6CYJqyT7oMmPf64dBZ": 39.38461538461539,
  "66UQK70ngsUJVjtlbHDjWK": 41.63636363636363,
  "6HwntygW1QLwQru64r5obZ": 40.84615384615385,
  "6KHCUhC1KyK4tpQhd4B9XE": 23.88888888888889,
  "6kqrdNvN73elFMmrD1xZFZ": 53.53846153846154,
  "6pLoh5V0SjMxp3FkusyY1O": 43.13333333333333,
  "6yJsrH569BXx9BPgv6Ipwp": 25.357142857142858,
  "79fiqNvqFyMxkSF4PmWsCM": 34.86666666666667,
  "7IH6Ptw4j8vsdnuWX9dxoy": 35.84615384615385,
  "7IY2u6ITdt543WAeUCgtmi": 60.76923076923077,
  "7hxoxlDexElSeqMgxNGDWT": 44.142857142857146,
  "7ng3NTRqoWw9hFVmypXdWv": 24.4375,
  "7oluPNTlmiiPiAtFn28BFY": 50.09090909090909,
};

const popularity = Object.entries(_popularity)
  .sort(([, a], [, b]) => b - a)
  .map(([id, count], idx) => ({ x: idx + 1, y: count, meta: { id } }));

const Top50PlayLists = popularity.slice(0, 51);
const Bottom50Playlists = popularity.slice(popularity.length - 50);
