import { Link } from "react-router-dom";
import { TopAlbums } from "../../../components/TopAlbums";
import { TopArtists } from "../../../components/TopArtists";
import { TopTracks } from "../../../components/TopTracks";

export default () => {
  return (
    <div className="flex w-full flex-col gap-4 text-slate-100">
      <div>
        <h1 className="text-4xl">Statistik</h1>
        <span className="mb-3 hidden sm:block">
          Önskar du att se sammaställningen i vertikala barer kan du navigera
          till{" "}
          <Link to="/graphs" className="underline">
            grafer
          </Link>{" "}
          där du kan få en vertikal överblick.
        </span>
      </div>

      <>
        <TopTracks />
      </>
      <>
        <TopArtists />
      </>
      <>
        <TopAlbums />
      </>
    </div>
  );
};
