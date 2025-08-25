import { useEffect, useRef, useState } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AudioButton() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // clean up on unmount
  useEffect(() => () => audioRef.current?.pause(), []);

  const toggle = async () => {
    try {
      if (!audioRef.current) return;
      if (!playing) {
        await audioRef.current.play(); // user-gesture, so allowed
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
    } catch (err) {
      console.error('Audio play failed:', err);
    }
  };

  return (
    <>
      {/* Keep audio element around but hidden */}
      <audio ref={audioRef} src="/song/main.mp3" preload="none" />

      <motion.button
        type="button"
        onClick={toggle}
        whileTap={{ scale: 0.95 }}
        className="
          fixed top-3 right-3 z-[9999]
          inline-flex items-center justify-center
          h-10 w-10 rounded-full
          border border-neutral-500
          bg-neutral-800/80 text-neutral-200
          backdrop-blur shadow
          hover:bg-neutral-700/90 hover:text-indigo-300
          transition-colors
        "
        aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <FiPause /> : <FiPlay />}
      </motion.button>
    </>
  );
}
