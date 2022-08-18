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
      <h1>Playlists</h1>
      <ul>
        {yearsAired.map((year) => (
          <li key={year}>
            <Link to={String(year)}>{year}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
