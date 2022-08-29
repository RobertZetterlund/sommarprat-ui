import type { IParallax } from "@react-spring/parallax";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import { useRef } from "react";
import { Bar } from "../components/charts/homemade/bar";
import { Placement } from "../components/charts/homemade/placement";
import { MyChart } from "../components/charts/xy";
import { AlbumLabel, ImageLabel } from "../components/labels";

export default function Index() {
  const ref = useRef<IParallax>(null);

  return (
    <div className="bg-[#287504]">
      <Parallax pages={4} ref={ref}>
        <ParallaxLayer offset={0.02} speed={-0.5} factor={1}>
          <img
            src={`/landing/bg-1.svg`}
            alt={"Blue sky background with a yellow sun."}
            className="fixed min-h-screen min-w-full bg-gradient-to-b from-blue-400 to-[#287504] object-cover"
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
          <div className="flex h-full flex-col bg-[#287504] px-4">
            <div className="flex flex-col gap-2 pb-10">
              <h1 className="text-5xl text-slate-100 ">Sommarprat-ui.</h1>
              <h2 className=" text-xl text-slate-200">
                En sammanställning av värdarnas musikval i Sommar i P1.
              </h2>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0} factor={2}>
          <div className="flex flex-col bg-[#287504] p-4 text-slate-100">
            <h2 className="mb-3 text-2xl text-slate-100">
              Mest spelade albumen.
            </h2>
            <Bar
              items={Object.values(data)
                .sort(
                  (itemA, itemB) => itemB.count["2021"] - itemA.count["2021"]
                )
                .map((item) => ({
                  label: (
                    <div className="flex flex-row items-center gap-2">
                      <AlbumLabel item={item} />
                      <ImageLabel
                        href={`https://open.spotify.com/album/${item.album.id}`}
                        img={item.album.img}
                        alt={item.album.name}
                      />
                    </div>
                  ),
                  value: item.count["2021"],
                  id: item.album.id,
                }))}
            />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

const data = {
  "74s1xuJFJGvRCPjlh2d2oE": {
    album: {
      id: "74s1xuJFJGvRCPjlh2d2oE",
      name: "History, Mystery",
      img: "https://i.scdn.co/image/ab67616d00001e022ead318e165905a49a4eca81",
    },
    artist: {
      name: "Bill Frisell",
      id: "3SONlwqLIP2GtaMh9pLYe5",
    },
    count: {
      "2005": 0,
      "2006": 0,
      "2007": 0,
      "2008": 0,
      "2009": 0,
      "2010": 0,
      "2011": 0,
      "2012": 0,
      "2013": 3,
      "2014": 10,
      "2015": 16,
      "2016": 25,
      "2017": 34,
      "2018": 43,
      "2019": 52,
      "2020": 55,
      "2021": 63,
    },
  },
  "7f4Mh7Lv8liYFDYQLw2g5T": {
    album: {
      id: "7f4Mh7Lv8liYFDYQLw2g5T",
      name: "Släpp in lite höst",
      img: "https://i.scdn.co/image/ab67616d00001e02c798f4d5a667e5456cf06dc0",
    },
    artist: {
      name: "Henrik Dorsin",
      id: "26ELugcMgfqnLLFQHlhrSd",
    },
    count: {
      "2005": 0,
      "2006": 0,
      "2007": 0,
      "2008": 0,
      "2009": 0,
      "2010": 0,
      "2011": 0,
      "2012": 10,
      "2013": 10,
      "2014": 10,
      "2015": 10,
      "2016": 10,
      "2017": 20,
      "2018": 20,
      "2019": 20,
      "2020": 20,
      "2021": 20,
    },
  },
  "0pfOSr3PHdLqe9kHcoEPIL": {
    album: {
      id: "0pfOSr3PHdLqe9kHcoEPIL",
      name: "Colors",
      img: "https://i.scdn.co/image/ab67616d00001e02eeb668b40f24b2417943e211",
    },
    artist: {
      name: "Laleh",
      id: "62QZPjYQMoo5g56FP9Webq",
    },
    count: {
      "2005": 0,
      "2006": 0,
      "2007": 0,
      "2008": 0,
      "2009": 0,
      "2010": 0,
      "2011": 0,
      "2012": 1,
      "2013": 1,
      "2014": 1,
      "2015": 3,
      "2016": 6,
      "2017": 8,
      "2018": 13,
      "2019": 15,
      "2020": 17,
      "2021": 20,
    },
  },
  "0E4xv5gPjykrwBgBZzI8XG": {
    album: {
      id: "0E4xv5gPjykrwBgBZzI8XG",
      name: "Back To Black (Deluxe Edition)",
      img: "https://i.scdn.co/image/ab67616d00001e0276ffb5b5ab045d22c81235c1",
    },
    artist: {
      name: "Amy Winehouse",
      id: "6Q192DXotxtaysaqNPy5yR",
    },
    count: {
      "2005": 0,
      "2006": 0,
      "2007": 1,
      "2008": 3,
      "2009": 4,
      "2010": 5,
      "2011": 7,
      "2012": 8,
      "2013": 8,
      "2014": 9,
      "2015": 9,
      "2016": 11,
      "2017": 13,
      "2018": 13,
      "2019": 14,
      "2020": 18,
      "2021": 18,
    },
  },
  "4MZqt2uT29Lhjs3C2i54Af": {
    album: {
      id: "4MZqt2uT29Lhjs3C2i54Af",
      name: "Blommig falukorv",
      img: "https://i.scdn.co/image/ab67616d00001e02876bd7f70774397025a39cb8",
    },
    artist: {
      name: "Hans Alfredson",
      id: "2wSu2EcQojgAifviEgZmy3",
    },
    count: {
      "2005": 0,
      "2006": 3,
      "2007": 4,
      "2008": 4,
      "2009": 5,
      "2010": 7,
      "2011": 7,
      "2012": 10,
      "2013": 13,
      "2014": 13,
      "2015": 13,
      "2016": 14,
      "2017": 16,
      "2018": 17,
      "2019": 19,
      "2020": 19,
      "2021": 19,
    },
  },
  "0ETFjACtuP2ADo6LFhL6HN": {
    album: {
      id: "0ETFjACtuP2ADo6LFhL6HN",
      name: "Abbey Road (Remastered)",
      img: "https://i.scdn.co/image/ab67616d00001e02dc30583ba717007b00cceb25",
    },
    artist: {
      name: "The Beatles",
      id: "3WrFJ7ztbogyGnTHbHJFl2",
    },
    count: {
      "2005": 0,
      "2006": 2,
      "2007": 3,
      "2008": 5,
      "2009": 7,
      "2010": 8,
      "2011": 8,
      "2012": 10,
      "2013": 11,
      "2014": 12,
      "2015": 12,
      "2016": 13,
      "2017": 14,
      "2018": 16,
      "2019": 18,
      "2020": 19,
      "2021": 20,
    },
  },
  "6fQElzBNTiEMGdIeY0hy5l": {
    album: {
      id: "6fQElzBNTiEMGdIeY0hy5l",
      name: "Hunky Dory (2015 Remaster)",
      img: "https://i.scdn.co/image/ab67616d00001e02e464904cc3fed2b40fc55120",
    },
    artist: {
      name: "David Bowie",
      id: "0oSGxfWSnnOXhD2fKuz2Gy",
    },
    count: {
      "2005": 1,
      "2006": 4,
      "2007": 4,
      "2008": 7,
      "2009": 8,
      "2010": 10,
      "2011": 10,
      "2012": 10,
      "2013": 12,
      "2014": 12,
      "2015": 12,
      "2016": 13,
      "2017": 16,
      "2018": 18,
      "2019": 18,
      "2020": 18,
      "2021": 19,
    },
  },
  "7pY0hwPU10gaH4qDsDFA6d": {
    album: {
      id: "7pY0hwPU10gaH4qDsDFA6d",
      name: "Ted",
      img: "https://i.scdn.co/image/ab67616d00001e02279f48896822185c7ae7ab34",
    },
    artist: {
      name: "Ted Gärdestad",
      id: "6zpub6jbY6CdrcqQsDq8P4",
    },
    count: {
      "2005": 1,
      "2006": 3,
      "2007": 5,
      "2008": 6,
      "2009": 6,
      "2010": 9,
      "2011": 9,
      "2012": 11,
      "2013": 11,
      "2014": 12,
      "2015": 12,
      "2016": 12,
      "2017": 12,
      "2018": 13,
      "2019": 13,
      "2020": 14,
      "2021": 15,
    },
  },
  "2k3nz0I7mJzegtkooii4za": {
    album: {
      id: "2k3nz0I7mJzegtkooii4za",
      name: "Eternelle",
      img: "https://i.scdn.co/image/ab67616d00001e023d69a1082b9d676263912178",
    },
    artist: {
      name: "Édith Piaf",
      id: "1WPcVNert9hn7mHsPKDn7j",
    },
    count: {
      "2005": 3,
      "2006": 3,
      "2007": 4,
      "2008": 5,
      "2009": 6,
      "2010": 6,
      "2011": 6,
      "2012": 8,
      "2013": 8,
      "2014": 8,
      "2015": 8,
      "2016": 11,
      "2017": 13,
      "2018": 13,
      "2019": 13,
      "2020": 15,
      "2021": 16,
    },
  },
  "2BlL4Gv2DLPu8p58Wcmlm9": {
    album: {
      id: "2BlL4Gv2DLPu8p58Wcmlm9",
      name: "American IV: The Man Comes Around",
      img: "https://i.scdn.co/image/ab67616d00001e026f4f62da3d811b6501a69ffa",
    },
    artist: {
      name: "Johnny Cash",
      id: "6kACVPfCOnqzgfEF5ryl0x",
    },
    count: {
      "2005": 1,
      "2006": 3,
      "2007": 3,
      "2008": 5,
      "2009": 6,
      "2010": 6,
      "2011": 8,
      "2012": 10,
      "2013": 10,
      "2014": 12,
      "2015": 13,
      "2016": 13,
      "2017": 13,
      "2018": 13,
      "2019": 14,
      "2020": 15,
      "2021": 15,
    },
  },
};
