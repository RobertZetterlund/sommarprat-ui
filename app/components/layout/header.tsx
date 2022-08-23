import { Link } from "@remix-run/react";

import logo from "../../res/images/midsommarkrans.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-blue-400">
      <nav className="align-center flex justify-between px-4 py-2">
        <Link
          to={"."}
          className="text-m flex w-fit items-center gap-1 whitespace-nowrap font-semibold text-slate-100"
        >
          <img width={24} height={24} src={logo} alt="Midsommarkrans" />
          Sommarprat-UI
        </Link>
        <Link
          to={"/playlists"}
          className="w-fit whitespace-nowrap text-sm text-slate-100 underline"
        >
          Spellistor
        </Link>
      </nav>
    </header>
  );
};
