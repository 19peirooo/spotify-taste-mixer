"use client"

export default function AudioPlayer({url}) {
    const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={previewUrl}></audio>

      <button
        onClick={togglePlay}
        className="px-4 py-2 rounded bg-green-500 text-white"
      >
        {playing ? "⏸️ Pausar" : "▶️ Reproducir"}
      </button>
    </div>
  );
}