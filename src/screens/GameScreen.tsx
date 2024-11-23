import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../App';
import type { ResultsScreenNavigationProp } from './ResultsScreen';
import { SimonGame } from './SimonGame';

export type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

export default function GameScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
      }}
    >
      {!gameStarted ? (
        <View className="flex-1 justify-center gap-4 p-4">
          <Text className="text-center text-6xl text-slate-900 dark:text-slate-100">Simon Game</Text>
          <Pressable
            onPress={() => setGameStarted(true)}
            className="my-4 items-center justify-center self-center rounded-full border-4 border-blue-500 bg-blue-500 px-8 py-4 active:border-white active:bg-blue-300"
          >
            <Text className="text-2xl text-white">Start New Game</Text>
          </Pressable>
          <Pressable
            className="items-center justify-center self-center rounded-full border-4 border-blue-500 px-6 py-4 active:border-white active:bg-blue-300"
            onPress={() => {
              navigation.navigate('Results', {});
            }}
          >
            <Text className="text-xl font-semibold text-blue-500">Go to Results</Text>
          </Pressable>
        </View>
      ) : (
        <SimonGame
          onFinish={() => {
            setGameStarted(false);
            navigation.navigate('Results', {});
          }}
        />
      )}
    </SafeAreaView>
  );
}
