import type { Episode } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { ErrorBox } from "../../../../components/error";
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

  if (!playlistId || playlistId.length < 5) {
    throw new Response("Episode not found.", {
      status: 404,
    });
  }

  const episode = await db.episode.findFirst({
    where: { yearAired: year, playlistId: { contains: playlistId } },
    select,
  });

  if (!episode) {
    throw new Response("Episode not found.", {
      status: 404,
    });
  }

  return json({ episode });
};

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
        <a
          href={episode.episodeUrl}
          className="text-3xl text-slate-100 hover:underline"
        >
          {episode.title}
        </a>
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
      />
    </div>
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
          text={"You're looking for something that does not exist"}
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
  const { year } = useParams();
  return <ErrorBox text={`There was an error loading year ${year}. Sorry.`} />;
}
