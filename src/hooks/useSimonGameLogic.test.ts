import { act, renderHook } from '@testing-library/react-native';
import { useSimonGameLogic } from './useSimonGameLogic';

jest.mock('../utils/sleep', () => ({
  sleep: jest.fn(() => Promise.resolve())
}));

jest.mock('./useSounds', () => ({
  useSounds: jest.fn(() => jest.fn())
}));

export const padsData = [
  {
    id: 0,
    soundName: 'green.mp3'
  },
  {
    id: 1,
    soundName: 'red.mp3'
  },
  {
    id: 2,
    soundName: 'yellow.mp3'
  },
  {
    id: 3,
    soundName: 'blue.mp3'
  }
] as const;

describe('useSimonGameLogic', () => {
  it('initializes correctly', () => {
    const { result } = renderHook(() => useSimonGameLogic(padsData));

    expect(result.current.score).toBe(0);
    expect(result.current.gameOver).toBe(false);
    expect(result.current.isPlayingSequence).toBe(false);
  });

  it('handles correct pad press', async () => {
    const { result } = renderHook(() => useSimonGameLogic(padsData));

    await act(async () => {
      await result.current.startNewGame();
    });

    const correctPadId = result.current.sequence[0];
    await act(async () => {
      await result.current.handlePadPress(correctPadId);
    });

    expect(result.current.score).toBe(1);
    expect(result.current.gameOver).toBe(false);
  });

  it('handles incorrect pad press', async () => {
    const { result } = renderHook(() => useSimonGameLogic(padsData));

    await act(async () => {
      await result.current.startNewGame();
    });

    const incorrectPadId = 999; // Assuming this ID doesn't exist
    await act(async () => {
      await result.current.handlePadPress(incorrectPadId);
    });

    expect(result.current.gameOver).toBe(true);
  });

  it('handles multiple levels', async () => {
    const { result } = renderHook(() => useSimonGameLogic(padsData));

    await act(async () => {
      await result.current.startNewGame();
    });

    expect(result.current.score).toBe(0);
    expect(result.current.gameOver).toBe(false);

    {
      const correctPadId = result.current.sequence[0];
      await act(async () => {
        await result.current.handlePadPress(correctPadId);
      });
    }

    expect(result.current.score).toBe(1);
    expect(result.current.gameOver).toBe(false);

    {
      for (const correctPadId of result.current.sequence) {
        await act(async () => {
          await result.current.handlePadPress(correctPadId);
        });
      }
    }

    expect(result.current.score).toBe(2);
    expect(result.current.gameOver).toBe(false);

    {
      for (const correctPadId of result.current.sequence) {
        await act(async () => {
          await result.current.handlePadPress(correctPadId);
        });
      }
    }

    expect(result.current.score).toBe(3);
    expect(result.current.gameOver).toBe(false);

    {
      const incorrectPadId = 999; // Assuming this ID doesn't exist
      await act(async () => {
        await result.current.handlePadPress(incorrectPadId);
      });
    }

    expect(result.current.score).toBe(3);
    expect(result.current.gameOver).toBe(true);
  });
});
