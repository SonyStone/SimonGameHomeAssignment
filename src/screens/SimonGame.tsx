import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { GameOverModal } from '../components/GameOverModal';
import { useSimonGameLogic } from '../hooks/useSimonGameLogic';
import { useAppDispatch } from '../redux/hooks';
import { addResult, saveResults } from '../redux/resultsSlice';
import { cn } from '../utils/cn';

const padsData = [
  {
    id: 0,
    color:
      'bg-green-500 border-green-500 active:bg-green-300 disabled:bg-green-700 disabled:border-green-700 active:border-white',
    activeColor: '!bg-green-300 !border-white',
    soundName: 'green.mp3'
  },
  {
    id: 1,
    color:
      'bg-red-500 border-red-500 active:bg-red-300 disabled:bg-red-700 disabled:border-red-700 active:border-white',
    activeColor: '!bg-red-300 !border-white',
    soundName: 'red.mp3'
  },
  {
    id: 2,
    color:
      'bg-yellow-500 border-yellow-500 active:bg-yellow-300 disabled:bg-yellow-700 disabled:border-yellow-700 active:border-white',
    activeColor: '!bg-yellow-300 !border-white',
    soundName: 'yellow.mp3'
  },
  {
    id: 3,
    color:
      'bg-blue-500 border-blue-500 active:bg-blue-300 disabled:bg-blue-700 disabled:border-blue-700 active:border-white',
    activeColor: '!bg-blue-300 !border-white',
    soundName: 'blue.mp3'
  }
] as const;

export function SimonGame({ onFinish }: { onFinish?: () => void }) {
  const { score, gameOver, isPlayingSequence, activePadId, handlePadPress, startNewGame } = useSimonGameLogic(padsData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    startNewGame();
  }, []);

  const handleSubmitScore = (playerName: string) => {
    dispatch(addResult({ playerName, score }));
    dispatch(saveResults());
    onFinish?.();
  };

  const renderPads = padsData.map((pad) => (
    <Pressable
      android_disableSound={true}
      key={pad.id}
      onPress={() => handlePadPress(pad.id)}
      className={cn(
        pad.color,
        pad.id === activePadId && pad.activeColor,
        'm-4 aspect-square h-24 rounded-full border-4 portrait:w-1/3 landscape:w-1/5'
      )}
      disabled={isPlayingSequence || gameOver}
    />
  ));

  return (
    <View className="flex-1 p-4">
      <Text className="my-4 text-center text-2xl text-slate-900 dark:text-slate-100">Score: {score}</Text>
      <View className="flex-row flex-wrap justify-center">{renderPads}</View>
      {gameOver && <GameOverModal onRestart={startNewGame} onSubmit={handleSubmitScore} score={score} />}
    </View>
  );
}
