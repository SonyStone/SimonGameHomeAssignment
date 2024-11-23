import { useCallback, useState } from 'react';
import { Vibration } from 'react-native';
import { useSounds } from '../hooks/useSounds';
import { useStateRef } from '../hooks/useStateRef';
import { getRandomNumberInRange } from '../utils/getRandomNumberInRange';
import { sleep } from '../utils/sleep';

const SONG_DELAY_TIME = 200;
const NEXT_LEVEL_DELAY_TIME = 500;

export function useSimonGameLogic(
  padsData: Readonly<
    {
      soundName: string;
      id: number;
    }[]
  >
) {
  const [isPlayingSequence, setIsPlayingSequence, isPlayingSequenceRef] = useStateRef(false);
  const [score, setScore] = useState(0);
  const [activePadId, setActivePadId] = useState<number | null>(null);

  const [sequence, setSequence, sequenceRef] = useStateRef<number[]>([]);
  const [, setPlayerGuesses, playerGuessesRef] = useStateRef<number[]>([]);
  const [gameOver, setGameOver, gameOverRef] = useStateRef(false);

  const playSound = useSounds(padsData);

  // Resets the game state and starts the first level.
  const startNewGame = useCallback(async () => {
    setGameOver(false);
    setScore(0);
    setSequence([]);
    setPlayerGuesses([]);
    await sleep(SONG_DELAY_TIME);
    await addNextColorToSequence();
    await playSequence();
  }, []);

  // Adds a random pad to the sequence.
  const addNextColorToSequence = useCallback(() => {
    const nextColorId = getRandomNumberInRange(0, padsData.length - 1);
    const newSequence = [...sequenceRef.current, nextColorId];
    setSequence(newSequence);
  }, []);

  // Plays the current sequence to the player.
  const playSequence = useCallback(async () => {
    setIsPlayingSequence(true);
    const currentSequence = sequenceRef.current;
    for (let i = 0; i < currentSequence.length; i++) {
      if (gameOverRef.current) {
        break; // Exit if the game is over
      }
      const padId = currentSequence[i];
      setActivePadId(padId);
      playSound(padsData[padId].soundName);
      await sleep(SONG_DELAY_TIME);
      setActivePadId(null);
      await sleep(SONG_DELAY_TIME);
    }
    setIsPlayingSequence(false);
    setPlayerGuesses([]);
  }, []);

  // Handles player input, checks if the guess is correct, and moves to the next level or ends the game.
  const handlePadPress = useCallback(async (padId: number) => {
    if (isPlayingSequenceRef.current || gameOverRef.current) {
      return;
    }

    if (!padsData[padId]) {
      console.error('Invalid pad id:', padId);
      setGameOver(true);
      return;
    }

    playSound(padsData[padId].soundName);

    const newGuesses = [...playerGuessesRef.current, padId];
    setPlayerGuesses(newGuesses);
    const currentGuessIndex = newGuesses.length - 1;

    const currentSequence = sequenceRef.current;
    if (padId !== currentSequence[currentGuessIndex]) {
      Vibration.vibrate(100);
      setGameOver(true);
      return;
    }

    if (newGuesses.length === currentSequence.length) {
      setScore((prevScore) => prevScore + 1);
      await sleep(NEXT_LEVEL_DELAY_TIME);
      if (!gameOverRef.current) {
        await nextLevel();
      }
    }
  }, []);

  // Prepares the game for the next level.
  const nextLevel = useCallback(async () => {
    if (gameOverRef.current) {
      return;
    }
    addNextColorToSequence();
    await sleep(SONG_DELAY_TIME);
    await playSequence();
  }, []);

  return {
    padsData,
    score,
    gameOver,
    isPlayingSequence,
    activePadId,
    sequence,
    handlePadPress,
    startNewGame
  };
}
