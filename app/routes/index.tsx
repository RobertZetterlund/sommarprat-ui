import type { Album, Artist, Episode, Track } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useEffect, useState } from "react";
import { EpisodeSquare } from "../components/EpisodeSquares";
import { TopAlbums } from "../components/TopAlbums";
import { TopArtists } from "../components/TopArtists";
import { TopTracks } from "../components/TopTracks";
import { db } from "../utils/db.server";

type LoaderData = {
  topTracks: Track[];
  topAlbums: Album[];
  topArtists: Artist[];
  highlightedEpisodes: Episode[];
  epCount: number;
  avgHostAge: number;
};

const notableHosts = [
  "0Derk8qpnDa3W0ZfkCnYvQ", // Zara Larsson
  "25SOoCQFzJUhzJLrekKQTI", // Greta Thunberg
  //"7gWPYSs8DAbWrYnaywHiRq", // Hans Rosling
  //"1Nv0tZDjZQnCYvgGHbXcwp", // Nils Van der poel
  "5bvD6DnpKkWPgdvhUFx4wF", // Daniel Ek
  "4uHPiMfv4rWmPOvzcQnLH5", // Felix "Pewdiepie" Kjellberg
];

// yeah... it is this easy :D
export const loader: LoaderFunction = async () => {
  const topTracks = await db.track.findMany({
    orderBy: { count: "desc" },
    take: 10,
  });
  const topAlbums = await db.album.findMany({
    orderBy: { count: "desc" },
    take: 10,
  });
  const topArtists = await db.artist.findMany({
    orderBy: { count: "desc" },
    take: 10,
  });

  const epCount = await db.episode.count();

  // Lets highlight Zara Larsson and other notable hosts.
  const highlightedEpisodes = await db.episode.findMany({
    where: { playlistId: { in: notableHosts } },
    take: 4,
  });

  return json({
    topTracks,
    topAlbums,
    topArtists,
    epCount,
    highlightedEpisodes,
  });
};

const TREES = "/landing/tree-clouds.svg";

export const links: LinksFunction = () => [{ rel: "prefetch", href: TREES }];

export default function Index() {
  const { topTracks, topAlbums, topArtists, epCount, highlightedEpisodes } =
    useLoaderData<LoaderData>();

  const [sunUp, setSunUp] = useState<boolean>(false);
  useEffect(() => {
    setSunUp(true);
  }, []);

  return (
    <div className="w-full text-slate-50">
      <div className="relative h-screen min-h-screen w-full overflow-hidden">
        <div className="fixed -z-10 flex w-full overflow-hidden">
          <img
            src={`/landing/sun.svg`}
            alt={"A yellow sun."}
            style={sunUp ? { transform: "translatey(0)" } : undefined}
            className="-z-10 min-h-screen w-full translate-y-1/2 object-cover transition-transform delay-100 duration-1000"
            width={1512}
            height={982}
          />
        </div>
        <img
          src={TREES}
          alt={"Green forest."}
          className="absolute left-0 bottom-0 -z-10 h-screen w-full object-cover"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 70%, #477035 70%, #477035 100%)",
          }}
          width={1512}
          height={982}
        />
        <div className="absolute bottom-16 flex flex-col gap-2 px-4 lg:px-16">
          <h1 className="text-5xl text-slate-100 ">Sommarprat-ui</h1>
          <h2 className="text-xl text-slate-200">
            A collection of the musical selection of the hosts of Sommar i P1
          </h2>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 bg-[#477035] px-4 pb-12 lg:px-16">
        <div className="z-10 -mt-8 mb-8 flex gap-2 rounded bg-slate-900 bg-opacity-40 p-4 text-slate-100">
          <svg
            className="shrink-0 self-center"
            stroke="white"
            fill="white"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
            <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
          </svg>
          <p>
            Sommar i P1 is one of the biggest radio shows in Sweden and a staple
            in Swedish culture. Everyone knows the well-known signature and the
            show itself. It is on air every year during the summer, and has been
            ever since its start in 1959. The show is made up by interesting
            Swedish-speaking persons who get free hands to create their own hour
            and a half-long show. They get to choose their own music and what
            they want to talk about. Being a host on Sommar i P1 has been
            compared to receiving a knighthood in Sweden.
          </p>
        </div>

        <div>
          <h2 className="text-3xl">Radio Sweden (SR)</h2>
          <p>
            have tracked the songs that have played in their channels since
            2005, available via their{" "}
            <a
              className="underline"
              href="https://sverigesradio.se/artikel/api-villkor"
            >
              {" "}
              public api
            </a>
            . By querying the{" "}
            <a
              className="underline"
              href="https://developer.spotify.com/console/get-search-item/"
            >
              spotify search api
            </a>
            , I have created{" "}
            <Link className="underline" to="playlists">
              {epCount} playlists
            </Link>{" "}
            on spotify available on this website. A few notable hosts include
            the singer Zara Larsson, environmental activist Greta Thunberg and
            the president of Spotify Daniel Ek.
          </p>
          <ul className="grid grid-cols-1 gap-4 px-16 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {highlightedEpisodes.map((episode, index) => (
              <EpisodeSquare key={episode.playlistId} episode={episode} />
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col">
          <h2 className="mb-3 text-3xl">Most played songs</h2>
          <div className="p-4 md:px-16">
            <TopTracks tracks={topTracks} expanded />
          </div>
          <Link className="self-center underline" to={"/statistics#tracks"}>
            See all
          </Link>
        </div>
        <div className="flex w-full flex-col">
          <h2 className="mb-3 text-3xl">Most played artists</h2>
          <div className="p-4 md:px-16">
            <TopArtists artists={topArtists} expanded />
          </div>
          <Link className="self-center underline" to={"/statistics#artists"}>
            See all
          </Link>
        </div>
        <div className="flex w-full flex-col">
          <h2 className="mb-3 text-3xl">Most played albums</h2>
          <div className="p-4 md:px-16">
            <TopAlbums albums={topAlbums} expanded />
          </div>
          <Link className="self-center underline" to={"/statistics#albums"}>
            See all
          </Link>
        </div>
      </div>
    </div>
  );
}
