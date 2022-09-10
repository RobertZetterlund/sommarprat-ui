import type { Track } from "@prisma/client";
import { ExpandableBars } from "./charts/ExpandableBars";
import { ImageLabel, TrackLabel } from "./labels";

export const TopTracks = ({
  tracks,
  expanded = false,
  noAnimate = false,
}: {
  tracks: Track[];
  expanded?: boolean;
  noAnimate?: boolean;
}) => {
  return (
    <>
      <ExpandableBars
        noAnimation={noAnimate}
        expanded={expanded}
        color="orange"
        items={tracks.map((track) => ({
          label: (
            <div className="flex flex-row items-center gap-2">
              <TrackLabel track={track} />
              <ImageLabel
                href={`https://open.spotify.com/album/${track.albumId}`}
                img={track.albumImg}
                alt={track.albumName}
              />
            </div>
          ),
          value: track.count,
          id: track.id,
        }))}
      />
    </>
  );
};
