import type { Episode } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { db } from "../../../../utils/db.server";

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
  episode: Pick<Episode, typeof EpisodeLoaderDataSelections[number]>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const year = params.year ? parseInt(params.year) : NaN;
  const playlistId = params.playlistId;

  if (isNaN(year) || year < 2005 || year > 2021) {
    throw new Response("Year not found.", {
      status: 404,
    });
  }

  const episode = await db.episode.findFirst({
    where: { yearAired: year, playlistId: { contains: playlistId } },
    select,
  });

  return json({ episode });
};

// Maybe embed
/**
 * <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/3VGmQvnsGwB9DpVGG73eor?utm_source=generator"
 * width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen;
 * picture-in-picture" loading="lazy"></iframe>
 */
export default function Playlists() {
  const { episode } = useLoaderData<LoaderData>();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <img
        src={episode.imageurl}
        height={400}
        width={400}
        alt={episode.title}
      />

      <div>
        <h1 className="text-3xl text-slate-100">{episode.title}</h1>
      </div>
      <iframe
        title={episode.title}
        className="rounded"
        src={`https://open.spotify.com/embed/playlist/${episode.playlistId}?utm_source=generator`}
        width="100%"
        height="540"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 400: {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    case 404: {
      return (
        <div className="error-container">
          SR started tracking the music in their API 2005, so I can't help you
          with whatever this is ---{">"} {params.year}.
        </div>
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
  return (
    <div className="error-container">{`There was an error loading year ${year}. Sorry.`}</div>
  );
}
