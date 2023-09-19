export const GameStatus = {
  IDLE: 'idle',
  DRAW: 'draw',
  PLAYER_WINS: 'player-wins',
  CPU_WINS: 'cpu-wins',
} as const;

export type GameStatusType = (typeof GameStatus)[keyof typeof GameStatus];
