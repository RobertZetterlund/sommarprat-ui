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
                <BarGraph width={Math.min(width, 700)} height={500} />
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
                  width={Math.min(width, 700)}
                  height={500}
                  data={_data}
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
  "81": 8,
  "82": 8,
  "83": 14,
  "84": 3,
  "85": 5,
  "86": 5,
  "87": 2,
  "88": 6,
  "89": 4,
  "90": 1,
  "91": 2,
  "92": 4,
  "93": 2,
  "95": 1,
  "98": 2,
  "99": 1,
  "100": 2,
  "101": 2,
  "104": 1,
  "105": 1,
  "115": 1,
  "120": 1,
  "-8": 36,
  "-6": 38,
  "-25": 8,
  "-1": 45,
  "-9": 35,
  "-3": 52,
  "-21": 11,
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
  "-28": 3,
  "-18": 12,
  "-22": 13,
  "-26": 3,
  "-24": 6,
  "-65": 1,
  "-33": 2,
  "-27": 6,
  "-38": 3,
  "-32": 2,
  "-30": 3,
  "-23": 11,
  "-29": 3,
  "-44": 1,
  "-31": 2,
  "-34": 1,
};

const _data = Object.entries(ages)
  .map(([year, count]) => ({
    x: parseInt(year),
    y: count,
  }))
  .sort((a, b) => a.x - b.x);
