import type { Episode } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { db } from "../../../../utils/db.server";
import SpotifyLogo from "../../../../res/images/spotify.svg";
import SRLogo from "../../../../res/images/SR.svg";
import { ErrorBox } from "../../../../components/error";
import { shortenPlayListId } from "../../../../utils/links";

const EpisodeLoaderDataSelections: (keyof Episode)[] = [
  "title",
  "playlistId",
  "imageurl",
  "date",
  "episodeUrl",
];

const select = EpisodeLoaderDataSelections.reduce(
  (acc, curr) => ({ [curr]: true, ...acc }),
  {} as { [key in keyof Episode]: boolean }
);

type LoaderData = {
  episodes: Pick<Episode, typeof EpisodeLoaderDataSelections[number]>[];
  year: number;
};

export const loader: LoaderFunction = async ({ params }) => {
  const year = params.year ? parseInt(params.year) : NaN;

  if (isNaN(year) || year < 2005 || year > 2021) {
    throw new Response("Year not found.", {
      status: 404,
    });
  }

  const episodes = await db.episode.findMany({
    where: { yearAired: year },
    select,
  });

  const sortedEpisodes = episodes.sort((a, b) => a.date.localeCompare(b.date));

  return json({ episodes: sortedEpisodes, year });
};

// Maybe embed
/**
 * <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/3VGmQvnsGwB9DpVGG73eor?utm_source=generator"
 * width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen;
 * picture-in-picture" loading="lazy"></iframe>
 */
export default function Playlists() {
  const { episodes, year } = useLoaderData<LoaderData>();

  return (
    <>
      <h1 className="text-4xl text-slate-100">Sommarpratare {year}</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {episodes.map(({ title, playlistId, imageurl, date, episodeUrl }) => (
          <li
            className="w-full overflow-hidden rounded shadow-lg"
            key={playlistId}
          >
            <div className="group relative">
              <img
                src={imageurl}
                className="aspect-square w-full"
                alt={`${title} wearing a midsommarkrans most likely`}
                loading="lazy"
              />
              <div className="absolute top-0 left-0 flex h-0 w-full flex-col items-end justify-between bg-gray-700 bg-opacity-0 p-2	duration-500 group-hover:h-full group-hover:bg-opacity-50">
                <Link
                  className="flex items-end rounded bg-slate-800 p-1 duration-100 hover:-translate-y-1"
                  to={shortenPlayListId(playlistId)}
                >
                  <svg
                    stroke="white"
                    fill="white"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1.25em"
                    width="1.25em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                    <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                  </svg>
                </Link>
                <div className="mt-auto flex w-full justify-between">
                  <a
                    href={`https://open.spotify.com/playlist/${playlistId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="duration-100 hover:-translate-y-1"
                  >
                    <img
                      src={SpotifyLogo}
                      alt="Spotify Logo"
                      className="h-8 w-8 opacity-0 duration-300 group-hover:opacity-100"
                    />
                  </a>
                  <a
                    href={episodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="duration-100 hover:-translate-y-1"
                  >
                    <img
                      src={SRLogo}
                      alt="Sveriges Radio Logo"
                      className="h-8 w-8 opacity-0 duration-300 group-hover:opacity-100"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col px-2 py-1">
              <Link
                to={shortenPlayListId(playlistId)}
                className="text-slate-100 hover:underline"
              >
                <span className="text-xl font-bold">{title}</span>
              </Link>
              <span className="text-xs text-slate-200">{date}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  switch (caught.status) {
    case 400: {
      return <ErrorBox text={"What you're trying to do is not allowed."} />;
    }
    case 404: {
      return (
        <ErrorBox
          text={"SR started tracking the music in their API in the year 2005"}
          code={404}
        />
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  const { year } = useParams();
  return <ErrorBox text={`There was an error loading year ${year}. Sorry.`} />;
}
