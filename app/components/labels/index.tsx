export const AlbumLabel = ({
  album,
}: {
  album: {
    album: { id: string; name: string };
    artist: { id: string; name: string };
  };
}) => {
  return (
    <div className="flex flex-col md:ml-auto">
      <a
        className="w-fit text-slate-100 hover:underline md:ml-auto"
        href={`https://open.spotify.com/album/${album.album.id}`}
      >
        {album.album.name}
      </a>
      <a
        className="w-fit text-slate-300 hover:underline md:ml-auto"
        href={`https://open.spotify.com/artist/${album.artist.id}`}
      >
        {album.artist.name}
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
        className="w-fit text-slate-300 hover:underline md:ml-auto"
        href={`https://open.spotify.com/artist/${artist.id}`}
      >
        {artist.name}
      </a>
    </div>
  );
};

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

export const TrackLabel = ({
  track,
}: {
  track: {
    track: { id: string; name: string };
    artists: { id: string; name: string }[];
  };
}) => {
  return (
    <div className="flex flex-col md:ml-auto">
      <a
        className="w-fit text-slate-100 hover:underline md:ml-auto"
        href={`https://open.spotify.com/album/${track.track.id}`}
      >
        {track.track.name}
      </a>
      <a
        className="w-fit text-slate-300 hover:underline md:ml-auto"
        href={`https://open.spotify.com/artist/${track.artists[0].id}`}
      >
        {track.artists[0].name}
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
