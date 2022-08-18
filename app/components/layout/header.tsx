import logo from "../../res/midsommarkrans.png";

export const Header = () => (
  <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-emerald-600">
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <span className="flex items-center">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Midsommarkrans" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Sommarprat-UI
          </span>
        </span>
        <div className="flex items-center lg:order-2">
          <a
            href="/"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            All playlists
          </a>
        </div>
      </div>
    </nav>
  </header>
);
