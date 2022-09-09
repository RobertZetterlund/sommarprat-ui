import type { IParallax } from "@react-spring/parallax";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";
import BarGraph from "../components/charts/bar";
import { GraphEntry } from "../components/landing/GraphEntry";
import { Header } from "../components/layout/header";
import useWindowSize from "../hooks/useWindowSize";

export default function Index() {
  const ref = useRef<IParallax>(null);

  const { width } = useWindowSize();

  return (
    <div className="bg-[#236C02]">
      <Parallax pages={4} ref={ref}>
        <ParallaxLayer sticky={{ start: 0, end: 2 }} style={{ height: 40 }}>
          <Header />
        </ParallaxLayer>
        <ParallaxLayer offset={0.02} speed={-0.5} factor={1}>
          <img
            src={`/landing/bg-1.svg`}
            alt={"Blue sky background with a yellow sun."}
            className="fixed min-h-screen min-w-full bg-gradient-to-b from-[#1b3e6a] to-[#236C02] object-cover"
            width={1512}
            height={982}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.3} factor={2}>
          <img
            src={`/landing/bg-2.svg`}
            alt={"White clouds"}
            className="min-h-screen min-w-full object-cover"
            width={1512}
            height={982}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1} factor={2}>
          <img
            src={`/landing/bg-3.svg`}
            alt={"A horizontal range of trees in a dark green color"}
            className="min-h-screen min-w-full object-cover"
            width={1512}
            height={982}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.1} factor={2}>
          <img
            src={`/landing/bg-4.svg`}
            alt={"A horizontal range of trees in a light green color"}
            className="absolute min-h-screen min-w-full object-cover"
            width={1512}
            height={982}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.8} speed={0} factor={2}>
          <div className="flex h-full flex-col bg-[#236C02] px-4">
            <div className="flex flex-col gap-2 pb-10">
              <h1 className="text-5xl text-slate-100 ">Sommarprat-ui.</h1>
              <h2 className=" text-xl text-slate-200">
                En sammanställning av värdarnas musikval i Sommar i P1.
              </h2>
            </div>

            <div className="flex gap-2 rounded bg-slate-900 bg-opacity-40 p-4 text-slate-100">
              <svg
                className="shrink-0 self-center"
                stroke="white"
                fill="white"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
              </svg>
              <p>
                Sommar i P1 is one of the biggest radio shows in Sweden and a
                staple in Swedish culture. Everyone knows the well-known
                signature and the show itself. It is on air every year during
                the summer, and has been ever since its start in 1959. The show
                is made up by interesting Swedish-speaking persons who get free
                hands to create their own hour and a half-long show. They get to
                choose their own music and what they want to talk about. Being a
                host on Sommar i P1 has been compared to receiving a knighthood
                in Sweden.
              </p>
            </div>

            <GraphEntry>
              <div>
                <h2>Hur viktigt är hur nyligen låten släpptes?</h2>
                <p>Många väljer att spela låtar som nyligen släppts</p>
              </div>
              <div className="flex justify-center">
                <BarGraph
                  data={_recency}
                  width={Math.min(width - 40, 1000)}
                  height={500}
                  xLabel={"År innan låten släpptes"}
                  yLabel={"Antalet spelningar"}
                  renderLabel={(item) => {
                    return (
                      <div>
                        x: {item.x}
                        <br />
                        y: {item.y}
                      </div>
                    );
                  }}
                />
              </div>
            </GraphEntry>
            <GraphEntry>
              <div>
                <h2>Hur gammal var värden när låtarna de valt släpptes?</h2>
                <p>
                  Det finns teorier att man skapar sin musiksmak i ung ålder.
                </p>
              </div>
              <div className="flex justify-center">
                <BarGraph
                  width={Math.min(width - 40, 1000)}
                  height={500}
                  data={_data}
                  xLabel={"Ålder på värden då låten släpptes"}
                  yLabel={"Antalet låtar spelade"}
                  renderLabel={(item) => {
                    return (
                      <div>
                        x: {item.x}
                        <br />
                        y: {item.y}
                      </div>
                    );
                  }}
                />
              </div>
            </GraphEntry>
            <GraphEntry>
              <div>
                <h2>De mest spelade albumen</h2>
                <p>...</p>
              </div>
              <div className="flex justify-center">
                <BarGraph
                  width={Math.min(width - 40, 1000)}
                  height={500}
                  data={_albums}
                  yLabel={"Antalet spelade låtar på albumet"}
                  renderLabel={(item) => {
                    return (
                      <div>
                        <p>{item.meta?.album.name}</p>
                        <img
                          src={item.meta?.album.img}
                          alt={item.meta?.album.name}
                        />
                      </div>
                    );
                  }}
                />
              </div>
            </GraphEntry>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

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
