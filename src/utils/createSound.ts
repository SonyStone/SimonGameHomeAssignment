import Sound from 'react-native-sound';

export const createSound = (soundName: string) =>
  new Promise<Sound>((resolve, reject) => {
    const sound = new Sound(soundName, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        reject(error);
      }
      resolve(sound);
    });
  });
