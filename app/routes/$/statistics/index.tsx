import type { Album, Artist, Track } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Link } from "react-router-dom";
import { TopAlbums } from "../../../components/TopAlbums";
import { TopArtists } from "../../../components/TopArtists";
import { TopTracks } from "../../../components/TopTracks";
import { db } from "../../../utils/db.server";

type LoaderData = {
  topTracks: Track[];
  topAlbums: Album[];
  topArtists: Artist[];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Statistics",
});

export const loader: LoaderFunction = async () => {
  const topTracks = await db.track.findMany({
    orderBy: { count: "desc" },
    take: 50,
  });
  const topAlbums = await db.album.findMany({
    orderBy: { count: "desc" },
    take: 50,
  });
  const topArtists = await db.artist.findMany({
    orderBy: { count: "desc" },
    take: 50,
  });

  return json({ topTracks, topAlbums, topArtists });
};

export default () => {
  const { topAlbums, topArtists, topTracks } = useLoaderData<LoaderData>();

  return (
    <div className="flex w-full flex-col gap-4 text-slate-100">
      <div>
        <h1 className="text-4xl">Statistics</h1>
      </div>

      <h2 className="mb-3 text-3xl">
        <span
          id="tracks"
          className="pointer-events-none invisible -mt-12 pt-12"
        />
        Most played songs.
      </h2>
      <TopTracks tracks={topTracks} />
      <h2 className="mb-3 text-3xl">
        <span
          id="artists"
          className="pointer-events-none invisible -mt-12 pt-12"
        />
        Most played artists.
      </h2>
      <TopArtists artists={topArtists} />
      <h2 className="mb-3 text-3xl">
        <span
          id="albums"
          className="pointer-events-none invisible -mt-12 pt-12"
        />
        Most played albums.
      </h2>
      <TopAlbums albums={topAlbums} />
      <span className="my-12 hidden sm:block">
        If you wish to see more data in vertical bar charts, you can navigate to{" "}
        <Link to="/graphs" className="underline">
          /graphs
        </Link>{" "}
        .
      </span>
    </div>
  );
};
