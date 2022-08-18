import type { Episode } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { db } from "../../utils/db.server";

type LoaderData = {
  episodes: Pick<Episode, "title" | "playlistId">[];
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
    select: { title: true, playlistId: true },
  });

  return json({ episodes, year });
};

export default function Playlists() {
  const { episodes, year } = useLoaderData<LoaderData>();

  return (
    <div className="mb-auto w-full py-5 px-10">
      <h1>{year}</h1>
      <ul>
        {episodes.map(({ title, playlistId }) => (
          <a
            href={`https://open.spotify.com/playlist/${playlistId}`}
            target="_blank"
            rel="noreferrer"
            key={playlistId}
          >
            <li>{title}</li>
          </a>
        ))}
      </ul>
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
