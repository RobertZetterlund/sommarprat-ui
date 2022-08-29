export const AlbumLabel = ({
  item,
}: {
  item: {
    album: { id: string; name: string };
    artist: { id: string; name: string };
  };
}) => {
  return (
    <div className="flex flex-col md:ml-auto">
      <a
        className="w-fit text-slate-100 hover:underline md:ml-auto"
        href={`https://open.spotify.com/album/${item.album.id}`}
      >
        {item.album.name}
      </a>
      <a
        className="w-fit text-slate-300 hover:underline md:ml-auto"
        href={`https://open.spotify.com/artist/${item.artist.id}`}
      >
        {item.artist.name}
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
