import type { Episode } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const twokfive = require("../public/data/2005.json");
const twoksix = require("../public/data/2006.json");
const twokseven = require("../public/data/2007.json");
const twokeight = require("../public/data/2008.json");
const twoknine = require("../public/data/2009.json");
const twokten = require("../public/data/2010.json");
const twokeleven = require("../public/data/2011.json");
const twoktwelve = require("../public/data/2012.json");
const twokthirteen = require("../public/data/2013.json");
const twokfourthteen = require("../public/data/2014.json");
const twokfiftheen = require("../public/data/2015.json");
const twoksixteen = require("../public/data/2016.json");
const twokseventeen = require("../public/data/2017.json");
const twokeighteen = require("../public/data/2018.json");
const twoknineteen = require("../public/data/2019.json");
const twoktwenty = require("../public/data/2020.json");
const twoktwentyone = require("../public/data/2021.json");
const twoktwentytwo = require("../public/data/2022.json");
const tracks = require("../public/data/stats/tracks.json");
const albums = require("../public/data/stats/albums.json");
const artists = require("../public/data/stats/artists.json");
const recency = require("../public/data/stats/recency.json");
const ages = require("../public/data/stats/ages.json");
const popularity = require("../public/data/stats/popularity.json");

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
    Object.values(tracks).map((track: any) => {
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
    Object.values(albums).map((album: any) => {
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
    Object.values(artists).map((artist: any) => {
      return db.artist.create({
        data: {
          count: artist.count,
          id: artist.id,
          name: artist.name,
        },
      });
    })
  );

  console.info("Seeding recency");
  await Promise.all(
    Object.entries(recency).map(([age, count]: any) =>
      db.recency.create({ data: { count, year: parseInt(age) } })
    )
  );
  console.info("Seeding ages");
  await Promise.all(
    Object.entries(ages).map(
      ([age, count]: any) =>
        !isNaN(parseInt(age)) &&
        db.age.create({ data: { count, age: parseInt(age) } })
    )
  );
  console.info("Seeding popularity");
  await Promise.all(
    Object.entries(popularity).map(([id, count]: any) =>
      db.popularity.create({ data: { id, count } })
    )
  );

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

function getYears() {
  const years = Object.keys(AllYears);

  return years.map((year) => ({
    year,
    episodes: (AllYears as any)[year] as Omit<Episode, "yearAired">[],
  }));
}
