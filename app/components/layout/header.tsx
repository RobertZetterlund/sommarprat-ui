import { Link } from "@remix-run/react";

import logo from "../../res/images/logo.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1b3e6a] shadow-xl">
      <nav className="align-center flex justify-between px-4 py-2">
        <Link
          to={"."}
          className="text-m flex w-fit items-center gap-1 whitespace-nowrap font-semibold text-slate-100"
        >
          <img
            width={24}
            height={24}
            src={logo}
            alt="A vinyl record with the color of a sun and with a cloud covering parts of it."
            className="rounded"
          />
          Sommarprat-UI
        </Link>
        <div className="flex gap-2">
          <Link
            to={"/playlists"}
            className="w-fit whitespace-nowrap text-sm text-slate-100 underline"
          >
            Playlists
          </Link>
          <Link
            to={"/statistics"}
            className="w-fit whitespace-nowrap text-sm text-slate-100 underline"
          >
            Statistics
          </Link>
        </div>
      </nav>
    </header>
  );
};
