import type { Album, Artist, Track } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
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

      <h2 id="tracks" className="mb-3 -mt-12 pt-12 text-3xl">
        Mest spelade låtarna.
      </h2>
      <TopTracks tracks={topTracks} />
      <h2 id="artists" className="mb-3 -mt-12 pt-12 text-3xl">
        Mest spelade artisterna.
      </h2>
      <TopArtists artists={topArtists} />
      <h2 id="albums" className="mb-3 -mt-12 pt-12 text-3xl">
        Mest spelade albumen.
      </h2>
      <TopAlbums albums={topAlbums} />
    </div>
  );
};
