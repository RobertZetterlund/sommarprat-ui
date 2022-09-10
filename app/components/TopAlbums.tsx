import type { Album } from "@prisma/client";
import { ExpandableBars } from "./charts/ExpandableBars";
import { AlbumLabel, ImageLabel } from "./labels";

export const TopAlbums = ({
  albums,
  expanded = false,
  noAnimate = false,
}: {
  albums: Album[];
  expanded?: boolean;
  noAnimate?: boolean;
}) => {
  return (
    <>
      <ExpandableBars
        expanded={expanded}
        noAnimation={noAnimate}
        color="yellow"
        items={albums.map((album) => ({
          label: (
            <div className="flex flex-row items-center gap-2">
              <AlbumLabel album={album} />
              <ImageLabel
                href={`https://open.spotify.com/album/${album.id}`}
                img={album.img}
                alt={album.name}
              />
            </div>
          ),
          value: album.count,
          id: album.id,
        }))}
      />
    </>
  );
};
