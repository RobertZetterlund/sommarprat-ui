import type {
  Age,
  Album,
  Artist,
  Episode,
  Popularity,
  Recency,
  Track,
} from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
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
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
  age: Age[];
  recency: Recency[];
  topPopular: Popularity[];
  botPopular: Popularity[];
};

export const meta: MetaFunction = () => ({
  title: "Graphs",
});

export const loader: LoaderFunction = async () => {
  const recency = await db.recency.findMany({ orderBy: { count: "desc" } });
  const age = await db.age.findMany({ orderBy: { count: "desc" } });
  const topPopular = await db.popularity.findMany({
    orderBy: { count: "desc" },
    take: 50,
  });
  const botPopular = await db.popularity.findMany({
    orderBy: { count: "asc" },
    take: 50,
  });

  const popularityEpisodes = await db.episode.findMany({
    where: {
      playlistId: {
        in: topPopular.concat(botPopular).map(({ id }) => id),
      },
    },
  });

  const albums = await db.album.findMany({ orderBy: { count: "desc" } });
  const artists = await db.artist.findMany({ orderBy: { count: "desc" } });
  const tracks = await db.track.findMany({ orderBy: { count: "desc" } });

  const popularityEpisodeById = Object.fromEntries(
    new Map(popularityEpisodes.map((ep) => [ep.playlistId, ep]))
  );

  return json({
    popularityEpisodeById,
    albums,
    tracks,
    artists,
    botPopular,
    topPopular,
    recency,
    age,
  });
};

export default () => {
  const {
    popularityEpisodeById,
    albums,
    artists,
    tracks,
    age,
    botPopular,
    recency,
    topPopular,
  } = useLoaderData<LoaderData>();

  console.info("topPopular", topPopular);
  console.info("popularityEpisodeById", popularityEpisodeById);

  const [sizeRef, { width }] = useElementSize();

  const barWidth = Math.min(width, 1000);

  return (
    <div className="text-slate-100" ref={sizeRef}>
      <h1 className="text-4xl">Graphs</h1>
      <p className="mt-2 block sm:hidden">
        Unfortunately, this page is not optimized for mobile. It still works,
        but the visualization requires you to click on a very thin graph. Hope
        you understand.
      </p>

      <GraphEntry>
        <div>
          <h2 className="text-2xl">Most played albums</h2>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={barWidth}
            height={500}
            data={albums.map((album, idx) => ({
              x: idx + 1,
              y: album.count,
              meta: album,
            }))}
            yLabel={"Amount of songs played from album"}
            linksTo={(item) =>
              item.meta ? `https://open.spotify.com/album/${item.meta?.id}` : ""
            }
            renderLabel={(item) => {
              return (
                <div className="flex gap-2">
                  <span className="self-center text-lg">{item.x}</span>
                  <img
                    width={60}
                    height={60}
                    src={item.meta?.img}
                    alt={item.meta?.name}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-s text-slate-50">
                      {item.meta?.name}
                    </span>
                    <span className="text-xs text-slate-300">
                      {item.meta?.name}
                    </span>
                    <span className="text-slate-400">{`${item.y} plays`}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2 className="text-2xl">Most played artists</h2>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={barWidth}
            height={500}
            data={artists.map((artist, idx) => ({
              x: idx + 1,
              y: artist.count,
              meta: artist,
            }))}
            yLabel={"Amount of songs played from artist"}
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
                    <span className="text-slate-400">{`${item.y} plays`}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2 className="text-2xl">Most played tracks</h2>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={barWidth}
            height={500}
            data={tracks.map((track, idx) => ({
              x: idx + 1,
              y: track.count,
              meta: track,
            }))}
            yLabel={"Times played"}
            linksTo={(item) =>
              item.meta?.id
                ? `https://open.spotify.com/track/${item.meta.id}`
                : ""
            }
            renderLabel={(item) => {
              return (
                <div className="flex gap-2">
                  <span className="self-center text-lg">{item.x}</span>
                  <img
                    width={60}
                    height={60}
                    src={item.meta?.albumImg}
                    alt={item.meta?.albumName}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-s text-slate-50">
                      {item.meta?.albumName}
                    </span>
                    <span className="text-xs text-slate-300">
                      {item.meta?.artistName}
                    </span>
                    <span className="text-slate-400">{`${item.y} plays`}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2 className="text-2xl">Recency of the release date of the track</h2>
        </div>
        <div className="flex justify-center">
          <BarChart
            data={recency.map((r) => ({ x: r.year, y: r.count }))}
            width={barWidth}
            height={500}
            xLabel={"Recency of release (year)"}
            yLabel={"Times played"}
            renderLabel={(item) => {
              return (
                <div>
                  {`Tracks released ${item.x} years before`}
                  <br />
                  {`were played ${item.y} times.`}
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2 className="text-2xl">
            What age was the host when the tracks they picked was released?
          </h2>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={barWidth}
            height={500}
            data={age.map((age) => ({ x: age.age, y: age.count }))}
            xLabel={"Age of host when track was released"}
            yLabel={"Times played"}
            renderLabel={(item) => {
              return (
                <div>
                  {`${item.y} tracks were played where the host was`}
                  <br />
                  {`${item.x} years old when it was released`}
                </div>
              );
            }}
          />
        </div>
      </GraphEntry>
      <GraphEntry>
        <div>
          <h2 className="text-2xl">Hosts with the most popular music</h2>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={barWidth}
            height={500}
            data={topPopular.map((p, i) => ({
              x: i,
              y: p.count,
              meta: p,
            }))}
            customYMax={100}
            yLabel={"Average popularity of the host's playlist"}
            linksTo={(item) => {
              if (item.meta && popularityEpisodeById[item.meta.id]) {
                const ep = popularityEpisodeById[item.meta.id];
                return episodeLink(ep);
              }
              return "";
            }}
            renderLabel={(item) => {
              if (item.meta && popularityEpisodeById[item.meta.id]) {
                const ep = popularityEpisodeById[item.meta.id];
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
          <h2 className="text-2xl">Hosts with the least popular music</h2>
        </div>
        <div className="flex justify-center">
          <BarChart
            width={barWidth}
            height={500}
            customYMax={100}
            data={botPopular.map((p, i) => ({
              x: i,
              y: p.count,
              meta: p,
            }))}
            yLabel={"Average popularity of the host's playlist"}
            linksTo={(item) => {
              if (item.meta && popularityEpisodeById[item.meta.id]) {
                const ep = popularityEpisodeById[item.meta.id];
                return episodeLink(ep);
              }
              return "";
            }}
            renderLabel={(item) => {
              if (item.meta && popularityEpisodeById[item.meta.id]) {
                const ep = popularityEpisodeById[item.meta.id];
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
