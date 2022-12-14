import type { Episode } from "@prisma/client";
import { Link } from "@remix-run/react";
import { episodeLink } from "../utils/links";
import SpotifyLogo from "../res/images/spotify.svg";
import SRLogo from "../res/images/SR.svg";
import type { ImgHTMLAttributes } from "react";

export const EpisodeSquare = ({
  episode,
  loading = undefined,
}: {
  episode: Episode;
  loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
}) => {
  const { date, episodeUrl, imageurl, playlistId, title } = episode;
  return (
    <li className="w-full overflow-hidden rounded shadow-lg" key={playlistId}>
      <div className="group relative">
        <img
          src={imageurl}
          className="aspect-square w-full object-cover"
          alt={`${title} wearing a midsommarkrans most likely`}
          loading={loading}
        />
        <Link
          className="absolute top-2 right-2 z-10 flex items-end"
          to={episodeLink(episode)}
          aria-label={`Visit the page of ${title}`}
        >
          <svg
            className="rounded bg-slate-800 p-1"
            stroke="white"
            fill="white"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="2em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
            <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
          </svg>
        </Link>
        <div className="absolute bottom-0 flex w-full flex-col items-end justify-between bg-gray-700 bg-opacity-50 p-2 duration-500">
          <div className="mt-auto flex w-full justify-between">
            <a
              href={`https://open.spotify.com/playlist/${playlistId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={SpotifyLogo}
                alt="Spotify Logo"
                className="h-6 w-6"
                width={24}
                height={24}
              />
            </a>
            <a href={episodeUrl} target="_blank" rel="noreferrer">
              <img
                src={SRLogo}
                alt="Sveriges Radio Logo"
                width={24}
                height={24}
                className="h-6 w-6 "
              />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-2 py-1">
        <Link
          to={episodeLink(episode)}
          className="text-slate-100 hover:underline"
        >
          <span className="text-xl font-bold">{title}</span>
        </Link>
        <span className="text-xs text-slate-200">{date}</span>
      </div>
    </li>
  );
};

export const EpisodeSquares = ({ episodes }: { episodes: Episode[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {episodes.map((episode, idx) => (
        <EpisodeSquare
          episode={episode}
          key={episode.playlistId}
          loading={idx < 2 ? "eager" : undefined}
        />
      ))}
    </ul>
  );
};
