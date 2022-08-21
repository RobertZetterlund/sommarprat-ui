import type { Episode } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "../../utils/db.server";

type LoaderData = {
  yearsAired: Episode["yearAired"][];
};

export const loader: LoaderFunction = async () => {
  const yearsAired = (
    await db.episode.groupBy({
      by: ["yearAired"],
    })
  ).map((ep) => ep.yearAired);

  return json({ yearsAired });
};

export default function Playlists() {
  const { yearsAired } = useLoaderData<LoaderData>();

  return (
    <div className="mb-auto w-full py-5 px-10">
      <ul className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {yearsAired.map((year) => (
          <li key={year} className="w-full overflow-hidden rounded shadow-lg">
            <Link to={String(year)}>
              <img
                src={`/thumbnails/${year}.jpg`}
                className="aspect-square w-full"
                alt={`Collection of hosts year ${year}`}
                loading="lazy"
              />
              <span className="px-2 py-1 text-xl font-bold text-slate-100">{`Sommarprat ${year}`}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
