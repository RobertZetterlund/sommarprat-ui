import type { Episode } from "@prisma/client";

export const episodeLink = (episode: Episode) => {
  const year = episode.yearAired ?? episode.date.split("-")[0];

  return `/playlists/${year}/${episode.playlistId.slice(0, 6)}`;
};
