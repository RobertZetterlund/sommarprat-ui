import type { Episode } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { db } from "../../../../utils/db.server";
import { ErrorBox } from "../../../../components/error";
import { EpisodeSquares } from "../../../../components/EpisodeSquares";

export const meta: MetaFunction = (d) => ({
  title: d.data.year ? `Hosts ${d.data.year}` : "Sommarprat-ui",
});

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

  if (isNaN(year) || year < 2005) {
    throw new Response("Year not found.", {
      status: 404,
    });
  }

  const episodes = await db.episode.findMany({
    where: { yearAired: year },
    select,
  });

  if (episodes.length === 0) {
    throw new Response("Year not found.", {
      status: 404,
    });
  }

  const sortedEpisodes = episodes.sort((a, b) => a.date.localeCompare(b.date));

  return json({ episodes: sortedEpisodes, year });
};

export default function Playlists() {
  const { episodes, year } = useLoaderData<LoaderData>();

  return (
    <>
      <h1 className="text-4xl text-slate-100">Hosts {year}</h1>
      <EpisodeSquares episodes={episodes} />
    </>
  );
}

export function CatchBoundary() {
  const params = useParams();
  const caught = useCatch();
  switch (caught.status) {
    case 400: {
      return <ErrorBox text={"What you're trying to do is not allowed."} />;
    }
    case 404: {
      return (
        <ErrorBox
          text={`Unable to find year "${params.year}". SR started tracking the music in their API in the year 2005`}
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
