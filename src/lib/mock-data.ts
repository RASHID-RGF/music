export type Track = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number; // seconds
  cover: string;
  audio: string;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  cover: string;
  year: number;
  trackIds: string[];
};

export type Artist = {
  id: string;
  name: string;
  image: string;
  monthlyListeners: number;
  bio: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  cover: string;
  trackIds: string[];
  curator: string;
};

const audio = (n: number) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;
const cover = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;

export const artists: Artist[] = [
  {
    id: "a1",
    name: "Nova Lux",
    image: cover("nova"),
    monthlyListeners: 12_400_000,
    bio: "Electronic dreamscapes from Berlin.",
  },
  {
    id: "a2",
    name: "Kairo Velvet",
    image: cover("kairo"),
    monthlyListeners: 8_900_000,
    bio: "Neo-soul producer & singer.",
  },
  {
    id: "a3",
    name: "Atlas Sound Co.",
    image: cover("atlas"),
    monthlyListeners: 4_200_000,
    bio: "Cinematic indie collective.",
  },
  {
    id: "a4",
    name: "Mira Sol",
    image: cover("mira"),
    monthlyListeners: 21_800_000,
    bio: "Pop with a synthwave heart.",
  },
  {
    id: "a5",
    name: "Phaze IV",
    image: cover("phaze"),
    monthlyListeners: 3_100_000,
    bio: "Underground house, 4am energy.",
  },
  {
    id: "a6",
    name: "Lowtide",
    image: cover("lowtide"),
    monthlyListeners: 5_600_000,
    bio: "Lo-fi beats to drift to.",
  },
];

export const albums: Album[] = [
  {
    id: "al1",
    title: "Neon Cartography",
    artist: "Nova Lux",
    artistId: "a1",
    cover: cover("neon-carto"),
    year: 2024,
    trackIds: ["t1", "t2", "t3"],
  },
  {
    id: "al2",
    title: "Velvet Hours",
    artist: "Kairo Velvet",
    artistId: "a2",
    cover: cover("velvet-hours"),
    year: 2023,
    trackIds: ["t4", "t5"],
  },
  {
    id: "al3",
    title: "Atlas, Vol. I",
    artist: "Atlas Sound Co.",
    artistId: "a3",
    cover: cover("atlas-1"),
    year: 2025,
    trackIds: ["t6", "t7"],
  },
  {
    id: "al4",
    title: "Solstice",
    artist: "Mira Sol",
    artistId: "a4",
    cover: cover("solstice"),
    year: 2024,
    trackIds: ["t8", "t9"],
  },
  {
    id: "al5",
    title: "Afterparty",
    artist: "Phaze IV",
    artistId: "a5",
    cover: cover("afterparty"),
    year: 2025,
    trackIds: ["t10"],
  },
  {
    id: "al6",
    title: "Drift",
    artist: "Lowtide",
    artistId: "a6",
    cover: cover("drift"),
    year: 2022,
    trackIds: ["t11", "t12"],
  },
];

export const tracks: Track[] = [
  {
    id: "t1",
    title: "Aurora Drive",
    artist: "Nova Lux",
    artistId: "a1",
    album: "Neon Cartography",
    albumId: "al1",
    duration: 218,
    cover: cover("neon-carto"),
    audio: audio(1),
  },
  {
    id: "t2",
    title: "Midnight Atlas",
    artist: "Nova Lux",
    artistId: "a1",
    album: "Neon Cartography",
    albumId: "al1",
    duration: 245,
    cover: cover("neon-carto"),
    audio: audio(2),
  },
  {
    id: "t3",
    title: "Glass Cities",
    artist: "Nova Lux",
    artistId: "a1",
    album: "Neon Cartography",
    albumId: "al1",
    duration: 192,
    cover: cover("neon-carto"),
    audio: audio(3),
  },
  {
    id: "t4",
    title: "Honeyglow",
    artist: "Kairo Velvet",
    artistId: "a2",
    album: "Velvet Hours",
    albumId: "al2",
    duration: 201,
    cover: cover("velvet-hours"),
    audio: audio(4),
  },
  {
    id: "t5",
    title: "Slow Burn",
    artist: "Kairo Velvet",
    artistId: "a2",
    album: "Velvet Hours",
    albumId: "al2",
    duration: 234,
    cover: cover("velvet-hours"),
    audio: audio(5),
  },
  {
    id: "t6",
    title: "Compass North",
    artist: "Atlas Sound Co.",
    artistId: "a3",
    album: "Atlas, Vol. I",
    albumId: "al3",
    duration: 287,
    cover: cover("atlas-1"),
    audio: audio(6),
  },
  {
    id: "t7",
    title: "Paper Lanterns",
    artist: "Atlas Sound Co.",
    artistId: "a3",
    album: "Atlas, Vol. I",
    albumId: "al3",
    duration: 256,
    cover: cover("atlas-1"),
    audio: audio(7),
  },
  {
    id: "t8",
    title: "Sundial",
    artist: "Mira Sol",
    artistId: "a4",
    album: "Solstice",
    albumId: "al4",
    duration: 199,
    cover: cover("solstice"),
    audio: audio(8),
  },
  {
    id: "t9",
    title: "Halogen Heart",
    artist: "Mira Sol",
    artistId: "a4",
    album: "Solstice",
    albumId: "al4",
    duration: 223,
    cover: cover("solstice"),
    audio: audio(9),
  },
  {
    id: "t10",
    title: "Strobe Theory",
    artist: "Phaze IV",
    artistId: "a5",
    album: "Afterparty",
    albumId: "al5",
    duration: 312,
    cover: cover("afterparty"),
    audio: audio(10),
  },
  {
    id: "t11",
    title: "Quiet Tides",
    artist: "Lowtide",
    artistId: "a6",
    album: "Drift",
    albumId: "al6",
    duration: 178,
    cover: cover("drift"),
    audio: audio(11),
  },
  {
    id: "t12",
    title: "Paperback Summer",
    artist: "Lowtide",
    artistId: "a6",
    album: "Drift",
    albumId: "al6",
    duration: 205,
    cover: cover("drift"),
    audio: audio(12),
  },
];

export const playlists: Playlist[] = [
  {
    id: "p1",
    title: "Daily Mix 1",
    description: "Made for you — synthwave, electronic & dream-pop.",
    curator: "VibeFlow AI",
    cover: cover("daily1"),
    trackIds: ["t1", "t8", "t10", "t3", "t9"],
  },
  {
    id: "p2",
    title: "Late Night Drive",
    description: "Smooth beats for the long road home.",
    curator: "VibeFlow",
    cover: cover("latenight"),
    trackIds: ["t2", "t5", "t11", "t6"],
  },
  {
    id: "p3",
    title: "Focus Flow",
    description: "Instrumentals to deep-work to.",
    curator: "VibeFlow",
    cover: cover("focus"),
    trackIds: ["t11", "t12", "t7", "t6"],
  },
  {
    id: "p4",
    title: "Sunrise Sessions",
    description: "Start the day with warm, uplifting tones.",
    curator: "VibeFlow",
    cover: cover("sunrise"),
    trackIds: ["t4", "t8", "t12"],
  },
  {
    id: "p5",
    title: "Underground 4AM",
    description: "Pounding house from the deepest clubs.",
    curator: "Phaze IV",
    cover: cover("under4"),
    trackIds: ["t10", "t5", "t2"],
  },
  {
    id: "p6",
    title: "Indie Discoveries",
    description: "Fresh tracks from rising artists this week.",
    curator: "VibeFlow",
    cover: cover("indiedisc"),
    trackIds: ["t6", "t7", "t9", "t1"],
  },
];

export const podcasts = [
  {
    id: "pc1",
    title: "Beat Theory",
    host: "Nova Lux",
    cover: cover("beat-theory"),
    description: "Producers unpack their craft.",
  },
  {
    id: "pc2",
    title: "After the Encore",
    host: "Atlas Sound",
    cover: cover("encore-pod"),
    description: "Tour stories from working musicians.",
  },
  {
    id: "pc3",
    title: "Crate Diggers",
    host: "Lowtide",
    cover: cover("crate"),
    description: "The hunt for rare records.",
  },
];

export const findTrack = (id: string) => tracks.find((t) => t.id === id);
export const findAlbum = (id: string) => albums.find((a) => a.id === id);
export const findArtist = (id: string) => artists.find((a) => a.id === id);
export const findPlaylist = (id: string) => playlists.find((p) => p.id === id);

export const formatDuration = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};
