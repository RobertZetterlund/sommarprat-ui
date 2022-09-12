import type { Album, Track } from "@prisma/client";

export const AlbumLabel = ({ album }: { album: Album }) => {
  return (
    <div className="flex flex-col md:ml-auto">
      <a
        className="w-fit text-slate-100 hover:underline md:ml-auto"
        href={`https://open.spotify.com/album/${album.id}`}
      >
        {album.name}
      </a>
      <a
        className="w-fit text-slate-300 hover:underline md:ml-auto"
        href={`https://open.spotify.com/artist/${album.artistId}`}
      >
        {album.artistName}
      </a>
    </div>
  );
};

export const ArtistLabel = ({
  artist,
}: {
  artist: {
    name: string;
    id: string;
    count: number;
  };
}) => {
  return (
    <div className="flex flex-col md:ml-auto">
      <a
        className="w-fit text-slate-50 hover:underline md:ml-auto"
        href={`https://open.spotify.com/artist/${artist.id}`}
      >
        {artist.name}
      </a>
    </div>
  );
};

/**
 * @deprecated Unfortunately it takes a while to load this one.
 */
export const EmbedSpotify = ({
  id,
  title,
  type,
}: {
  id: string;
  title: string;
  type: "artist" | "playlist" | "track" | "album";
}) => (
  <iframe
    className="-order-1 self-start rounded-md md:order-10 md:self-end"
    title={title}
    src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}
    width="80"
    height="80"
    frameBorder="0"
    allowFullScreen={false}
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />
);

export const TrackLabel = ({ track }: { track: Track }) => {
  return (
    <div className="flex flex-col md:ml-auto">
      <a
        className="w-fit text-slate-100 hover:underline md:ml-auto"
        href={`https://open.spotify.com/track/${track.id}`}
      >
        {track.name}
      </a>
      <a
        className="w-fit text-slate-300 hover:underline md:ml-auto"
        href={`https://open.spotify.com/artist/${track.artistId}`}
      >
        {track.artistName}
      </a>
    </div>
  );
};

export const ImageLabel = ({
  href,
  alt,
  img,
}: {
  href: string;
  alt: string;
  img: string;
}) => (
  <a href={href} className="-order-1 md:order-10">
    <img
      className="min-h-[60px] min-w-[60px] rounded"
      height={60}
      width={60}
      src={img}
      alt={alt}
      loading="lazy"
    />
  </a>
);
