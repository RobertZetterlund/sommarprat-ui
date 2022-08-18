import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";

type LoaderData = {
  year: number;
  content: string[];
};

const temp_data: LoaderData[] = [
  { year: 2015, content: ["2015 var året då David Davidsson sommarpratade"] },
  { year: 2016, content: ["2016 var året då Anders Andersson sommarpratade"] },
  { year: 2017, content: ["2017 var året då Bernt Berntsson sommarpratade"] },
];

export const loader: LoaderFunction = async ({ params }) => {
  const year = params.year ? parseInt(params.year) : NaN;

  if (isNaN(year) || year < 2015 || year > 2017) {
    throw new Response("Year not found.", {
      status: 404,
    });
  }

  const data = temp_data.find((p) => p.year === year);

  if (!data) {
    throw new Response("Year not found.", {
      status: 404,
    });
  }

  return json(data);
};

export default function Playlists() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="mb-auto w-full py-5 px-10">
      <h1>{data.year}</h1>
      <ul>
        {data.content.map((content) => (
          <li key={content}>{content}</li>
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
          Huh? Looks like there is no data for {params.year}.
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
