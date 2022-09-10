import type { Artist } from "@prisma/client";
import { ExpandableBars } from "./charts/ExpandableBars";
import { ArtistLabel } from "./labels";

export const TopArtists = ({
  artists,
  expanded = false,
  noAnimate = false,
}: {
  artists: Artist[];
  expanded?: boolean;
  noAnimate?: boolean;
}) => {
  return (
    <>
      <ExpandableBars
        expanded={expanded}
        noAnimation={noAnimate}
        color="red"
        items={artists.map((item) => ({
          label: (
            <div className="flex flex-row items-end">
              <ArtistLabel artist={item} />
            </div>
          ),
          value: item.count,
          id: item.id,
        }))}
      />
    </>
  );
};
