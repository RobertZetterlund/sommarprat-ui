import { Link } from "@remix-run/react";

import logo from "../../res/images/logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full backdrop-blur">
      <nav className="align-center flex justify-between px-4 py-2">
        <Link
          to={"."}
          className="text-m flex w-fit items-center gap-1 whitespace-nowrap font-semibold text-slate-100"
        >
          <img width={24} height={24} src={logo} alt="Midsommarkrans" />
          Sommarprat-UI
        </Link>
        <div className="flex gap-2">
          <Link
            to={"/playlists"}
            className="w-fit whitespace-nowrap text-sm text-slate-100 underline"
          >
            Spellistor
          </Link>

          <Link
            to={"/statistics"}
            className="w-fit whitespace-nowrap text-sm text-slate-100 underline"
          >
            Statistik
          </Link>
        </div>
      </nav>
    </header>
  );
};
