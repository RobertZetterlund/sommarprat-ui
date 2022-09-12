import type { Episode } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "../../../utils/db.server";

type LoaderData = {
  yearsAired: Episode["yearAired"][];
};

export const loader: LoaderFunction = async () => {
  const yearsAired = (
    await db.episode.groupBy({
      by: ["yearAired"],
    })
  )
    .map((ep) => ep.yearAired)
    .sort((epA, epB) => epB - epA);

  return json({ yearsAired });
};

export const meta: MetaFunction = () => ({
  title: "Playlists",
});

export default function Playlists() {
  const { yearsAired } = useLoaderData<LoaderData>();

  return (
    <>
      <h1 className="text-4xl text-slate-100">All Playlists</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {yearsAired.map((year, idx) => (
          <li key={year} className="w-full overflow-hidden rounded shadow-lg">
            <Link to={String(year)}>
              <img
                src={`/thumbnails/${year}.jpg`}
                className="aspect-square w-full object-cover"
                alt={`Collection of hosts year ${year}`}
                loading={idx <= 5 ? "eager" : undefined}
              />
              <span className="px-2 py-1 text-xl font-bold text-slate-100 hover:underline">{`Hosts ${year}`}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
