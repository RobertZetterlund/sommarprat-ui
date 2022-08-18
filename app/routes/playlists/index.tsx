import { Link } from "@remix-run/react";

export default function Playlists() {
  return (
    <div className="mb-auto w-full py-5 px-10">
      <h1>Playlists</h1>
      <ul>
        {[2015, 2016, 2017, 2018].map((y) => (
          <li key={y}>
            <Link to={String(y)}>{y}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
