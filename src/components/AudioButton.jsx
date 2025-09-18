import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <audio ref={audioRef} src="/song/MemePark.mp3" preload="none" loop />

      <motion.button
        type="button"
        onClick={toggle}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        aria-pressed={playing}
        aria-label={playing ? 'Pause' : 'Play'}
        className="
    fixed top-3 right-3 z-[9999]
    inline-flex items-center justify-center
    h-20 w-20 lg:h-32 lg:w-32
   
    transition-all duration-200
    select-none
  ">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={playing ? 'pause' : 'play'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="
        font-sp sp-font  
        uppercase tracking-wide
        text-white hover:text-yellow-300
        text-2xl text-outline-soft
      ">
            {playing ? 'Pause' : 'Play'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
