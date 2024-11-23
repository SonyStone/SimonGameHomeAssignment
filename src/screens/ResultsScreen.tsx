import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import type { RootStackParamList } from '../App';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadResults } from '../redux/resultsSlice';
import type { GameScreenNavigationProp } from './GameScreen';

interface Result {
  playerName: string;
  score: number;
}

export type ResultsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Results'>;

export function ResultsScreen() {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.results.results);

  useEffect(() => {
    dispatch(loadResults());
  }, [dispatch]);

  const startNewGame = () => {
    navigation.navigate('Game', {});
  };

  const sortedResults = results
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const renderItem = ({ item, index }: { item: Result; index: number }) => (
    <View className="flex-row justify-between border-b border-gray-300 p-2">
      <Text className="text-lg">
        {index + 1}. {item.playerName}
      </Text>
      <Text className="text-lg">{item.score}</Text>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
      }}
    >
      <View className="flex-1 p-4">
        <Text className="mb-4 text-center text-2xl font-bold">Top 10 Scores</Text>
        <FlatList data={sortedResults} keyExtractor={(_, index) => index.toString()} renderItem={renderItem} />
        <Pressable
          onPress={startNewGame}
          className="mt-4 items-center justify-center self-center rounded-full bg-blue-500 px-8 py-4"
        >
          <Text className="text-2xl text-white">Start New Game</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
