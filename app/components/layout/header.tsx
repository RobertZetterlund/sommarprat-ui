import { Link } from "@remix-run/react";
import logo from "../../res/images/midsommarkrans.png";

export const Header = () => {
  return (
    <header style={{ zIndex: 1 }}>
      <nav className="px-4 py-2.5">
        <div className="mx-auto flex flex-wrap items-center justify-between">
          <span className="flex items-center">
            <img
              width={36}
              height={36}
              src={logo}
              className="mr-3 h-9"
              alt="Midsommarkrans"
            />
            <Link
              to={"."}
              className="self-center whitespace-nowrap text-xl font-semibold text-white"
            >
              Sommarprat-UI
            </Link>
          </span>

          <a
            href="/playlists"
            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 mr-2 rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4 lg:px-5 lg:py-2.5"
          >
            Alla års spellistor
          </a>
        </div>
      </nav>
    </header>
  );
};
