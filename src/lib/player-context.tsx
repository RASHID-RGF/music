import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Track } from "./mock-data";

type PlayerState = {
  queue: Track[];
  index: number;
  current: Track | null;
  playing: boolean;
  progress: number; // 0..1
  currentTime: number;
  duration: number;
  volume: number;
  liked: Set<string>;
};

type PlayerCtx = PlayerState & {
  playQueue: (tracks: Track[], startIndex?: number) => void;
  playTrack: (t: Track) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (ratio: number) => void;
  setVolume: (v: number) => void;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
};

const Ctx = createContext<PlayerCtx | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [liked, setLiked] = useState<Set<string>>(() => new Set());

  const current = queue[index] ?? null;

  // Hydrate liked from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("vf:liked");
      if (raw) setLiked(new Set(JSON.parse(raw)));
    } catch {
      // ignore
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("vf:liked", JSON.stringify(Array.from(liked)));
    } catch {
      // ignore
    }
  }, [liked]);

  // create audio element once
  useEffect(() => {
    const el = new Audio();
    el.preload = "metadata";
    el.volume = volume;
    audioRef.current = el;
    const onTime = () => setCurrentTime(el.currentTime);
    const onDur = () => setDuration(el.duration || 0);
    const onEnd = () => nextRef.current?.();
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onDur);
    el.addEventListener("ended", onEnd);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onDur);
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load new src whenever current changes
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;

    // Use a full reload when switching tracks so `duration`/`loadedmetadata`
    // are updated correctly. Also reset time to ensure playback starts at 0.
    const shouldReload = el.src !== current.audio;
    if (shouldReload) {
      el.src = current.audio;
      el.currentTime = 0;
    } else {
      // Same src but we still want to ensure we don't resume from a stale time.
      el.currentTime = 0;
    }

    el.play().catch(() => {});
  }, [current]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1 < queue.length ? i + 1 : 0));
  }, [queue.length]);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 >= 0 ? i - 1 : Math.max(queue.length - 1, 0)));
  }, [queue.length]);
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  const playQueue = useCallback((tracks: Track[], startIndex = 0) => {
    if (!tracks.length) return;
    setQueue(tracks);
    setIndex(startIndex);
  }, []);
  const playTrack = useCallback(
    (t: Track) => {
      playQueue([t], 0);
    },
    [playQueue],
  );

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }, [current]);

  const seek = useCallback(
    (ratio: number) => {
      const el = audioRef.current;
      if (!el || !duration) return;
      el.currentTime = Math.max(0, Math.min(1, ratio)) * duration;
    },
    [duration],
  );

  const setVolume = useCallback((v: number) => setVolumeState(Math.max(0, Math.min(1, v))), []);

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  }, []);
  const isLiked = useCallback((id: string) => liked.has(id), [liked]);

  const value = useMemo<PlayerCtx>(
    () => ({
      queue,
      index,
      current,
      playing,
      progress: duration ? currentTime / duration : 0,
      currentTime,
      duration,
      volume,
      liked,
      playQueue,
      playTrack,
      toggle,
      next,
      prev,
      seek,
      setVolume,
      toggleLike,
      isLiked,
    }),
    [
      queue,
      index,
      current,
      playing,
      currentTime,
      duration,
      volume,
      liked,
      playQueue,
      playTrack,
      toggle,
      next,
      prev,
      seek,
      setVolume,
      toggleLike,
      isLiked,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePlayer must be used inside PlayerProvider");
  return v;
}
