import { useCallback, useEffect, useRef } from 'react';
import Sound from 'react-native-sound';
import { createSound } from '../utils/createSound';

export const useSounds = (options: Readonly<{ soundName: string }[]>) => {
  const soundsRef = useRef<{ [key: string]: Sound }>({});

  // Load sounds
  useEffect(() => {
    for (const option of options) {
      createSound(option.soundName).then((sound) => {
        soundsRef.current[option.soundName] = sound;
      });
    }

    return () => {
      for (const sound of Object.values(soundsRef.current)) {
        sound.release();
      }
    };
  }, []);

  const play = useCallback((soundName: string) => {
    const sound = soundsRef.current[soundName];
    if (sound) {
      sound.stop(() => {
        sound.play();
      });
    } else {
      console.log('Sound not loaded:', soundName);
    }
  }, []);

  return play;
};
