import { useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ButtonRedirect = () => {
  return (
    <>
      <EncryptButton />
    </>
  );
};

const TARGET_TEXT = 'ENTER';
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = '!@#$%^&*():{};|,.<>/?';

const EncryptButton = () => {
  const intervalRef = useRef(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split('')
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  const handleClick = () => {
    const DEST = 'https://ignatevink.fun';
    window.location.assign(DEST);
  };

  return (
    <motion.button
      href="https://ignatevink.fun"
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={handleClick}
      className="grouprelative overflow-hidden rounded-lg border-[1px] border-neutral-500 bg-neutral-700 px-6 py-3 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300">
      <span className="font-spmono">{text}</span>

      <motion.span
        initial={{
          y: '100%',
        }}
        animate={{
          y: '-100%',
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 1,
          ease: 'linear',
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default ButtonRedirect;
