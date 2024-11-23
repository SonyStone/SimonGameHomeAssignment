import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

interface Result {
  playerName: string;
  score: number;
}

interface ResultsState {
  results: Result[];
}

const initialState: ResultsState = {
  results: []
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<Result>) => {
      state.results.push(action.payload);
    },
    setResults: (state, action: PayloadAction<Result[]>) => {
      state.results = action.payload;
    }
  }
});

export const { addResult, setResults } = resultsSlice.actions;

export default resultsSlice.reducer;

// Thunk to load results from AsyncStorage
export const loadResults = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
  try {
    const storedResults = await AsyncStorage.getItem('results');
    if (storedResults) {
      const parsedResults: Result[] = JSON.parse(storedResults);
      dispatch(setResults(parsedResults));
    }
  } catch (error) {
    console.error('Error loading results from AsyncStorage:', error);
  }
};

// Thunk to save results to AsyncStorage
export const saveResults = (): ThunkAction<void, RootState, unknown, any> => async (dispatch, getState) => {
  try {
    const results = getState().results.results;
    await AsyncStorage.setItem('results', JSON.stringify(results));
  } catch (error) {
    console.error('Error saving results to AsyncStorage:', error);
  }
};
