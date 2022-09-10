import type { Episode } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import twokfive from "~/res/data/2005.json";
import twoksix from "~/res/data/2006.json";
import twokseven from "~/res/data/2007.json";
import twokeight from "~/res/data/2008.json";
import twoknine from "~/res/data/2009.json";
import twokten from "~/res/data/2010.json";
import twokeleven from "~/res/data/2011.json";
import twoktwelve from "~/res/data/2012.json";
import twokthirteen from "~/res/data/2013.json";
import twokfourthteen from "~/res/data/2014.json";
import twokfiftheen from "~/res/data/2015.json";
import twoksixteen from "~/res/data/2016.json";
import twokseventeen from "~/res/data/2017.json";
import twokeighteen from "~/res/data/2018.json";
import twoknineteen from "~/res/data/2019.json";
import twoktwenty from "~/res/data/2020.json";
import twoktwentyone from "~/res/data/2021.json";
import twoktwentytwo from "~/res/data/2022.json";

import tracks from "~/res/data/stats/tracks.json";
import albums from "~/res/data/stats/albums.json";
import artists from "~/res/data/stats/artists.json";

//import recency from "~/res/data/stats/recency.json";

const AllYears = {
  "2005": twokfive,
  "2006": twoksix,
  "2007": twokseven,
  "2008": twokeight,
  "2009": twoknine,
  "2010": twokten,
  "2011": twokeleven,
  "2012": twoktwelve,
  "2013": twokthirteen,
  "2014": twokfourthteen,
  "2015": twokfiftheen,
  "2016": twoksixteen,
  "2017": twokseventeen,
  "2018": twokeighteen,
  "2019": twoknineteen,
  "2020": twoktwenty,
  "2021": twoktwentyone,
  "2022": twoktwentytwo,
};

const db = new PrismaClient();

async function seed() {
  console.info("seeding episodes...");
  await Promise.all(
    getYears().map(async (year) => {
      await Promise.all(
        year.episodes.map((episode) => {
          return db.episode.create({
            data: {
              ...episode,
              yearAired: parseInt(year.year),
            },
          });
        })
      );
    })
  );
  console.info("seeding top tracks");
  await Promise.all(
    Object.values(tracks).map((track) => {
      return db.track.create({
        data: {
          albumId: track.album.id,
          albumImg: track.album.img,
          albumName: track.album.name,
          artistId: track.artists[0].id,
          artistName: track.artists[0].name,
          count: track.count,
          id: track.track.id,
          name: track.track.name,
        },
      });
    })
  );
  console.info("seeding top albums");
  await Promise.all(
    Object.values(albums).map((album) => {
      return db.album.create({
        data: {
          artistId: album.artist.id,
          artistName: album.artist.name,
          count: album.count,
          id: album.album.id,
          name: album.album.name,
          img: album.album.img,
        },
      });
    })
  );
  console.info("seeding top artists");
  await Promise.all(
    Object.values(artists).map((artist) => {
      return db.artist.create({
        data: {
          count: artist.count,
          id: artist.id,
          name: artist.name,
        },
      });
    })
  );

  console.log(`Database has been seeded. 🌱`);
}

seed();

function getYears() {
  const years = Object.keys(AllYears);

  return years.map((year) => ({
    year,
    episodes: (AllYears as any)[year] as Omit<Episode, "yearAired">[],
  }));
}
