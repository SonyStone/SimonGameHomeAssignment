import { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

export function GameOverModal({
  score,
  onRestart,
  onSubmit
}: {
  score: number;
  onRestart?: () => void;
  onSubmit?: (playerName: string) => void;
}): React.JSX.Element {
  const [playerName, setPlayerName] = useState('');

  return (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View className="flex-1 items-center justify-center">
        <View className="elevation-lg m-5 items-center gap-4 rounded-3xl bg-white p-9 shadow-slate-600 dark:bg-gray-800">
          <Text className="text-center text-4xl text-slate-900 dark:text-slate-100">Game Over</Text>
          <Text className="text-center text-2xl text-slate-900 dark:text-slate-100">Your Score: {score}</Text>
          <TextInput
            placeholder="Enter your name"
            value={playerName}
            onChangeText={setPlayerName}
            className="w-full rounded-md border-2 border-blue-500 p-2 text-xl text-slate-900 dark:text-slate-100"
          />
          <Pressable
            onPress={() => onSubmit?.(playerName)}
            className="rounded-md bg-blue-500 p-2"
            disabled={!playerName.trim()}
          >
            <Text className="text-2xl font-semibold text-slate-100">Submit Score</Text>
          </Pressable>
          <Pressable
            className="rounded-md bg-blue-500 p-2"
            onPress={() => {
              onRestart?.();
            }}
          >
            <Text className="px-2 text-2xl font-semibold text-slate-100">Restart Game?</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
