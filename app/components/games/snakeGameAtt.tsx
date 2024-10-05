// app/snake/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

// Tipos para as coordenadas
interface Coordinate {
  x: number;
  y: number;
}

// Definindo os valores iniciais e o tamanho do grid
const GRID_SIZE = 20;
const INITIAL_SNAKE: Coordinate[] = [{ x: 8, y: 8 }];
const INITIAL_DIRECTION: Coordinate = { x: 1, y: 0 };

// Função para gerar comida sem colidir com a cobra
const generateFood = (snake: Coordinate[]): Coordinate => {
  let newFood: Coordinate;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Coordinate[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Coordinate>(generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Coordinate>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Atualização do movimento da cobra
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead: Coordinate = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        // Verificar colisão com bordas ou com o corpo da cobra
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Verificar se a cobra comeu a comida
        if (newHead.x === food.x && newHead.y === food.y) {
          // Gerar nova comida e aumentar a pontuação
          const newFood = generateFood(newSnake);
          setFood(newFood);
          setScore(score + 1);
        } else {
          newSnake.pop(); // Remover o último segmento se não comeu comida
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, isGameOver, score]);

  // Controle de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">Jogo da Cobrinha</h1>
      <div className="text-lg font-semibold text-white mb-4">Pontuação: {score}</div>

      {isGameOver ? (
        <div className="text-center">
          <h2 className="text-red-500 text-2xl font-bold">Game Over</h2>
          <button
            className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            onClick={() => window.location.reload()}
          >
            Jogar Novamente
          </button>
        </div>
      ) : (
        <div
          className="grid border-4 border-gray-500 rounded-lg shadow-lg p-4 bg-gray-400"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
          }}
        >
          {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
              const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
              const isFood = food.x === col && food.y === row;
              return (
                <div
                  key={`${row}-${col}`}
                  className={`w-5 h-5 ${isSnake ? 'bg-green-500 rounded-lg border' : isFood ? 'bg-red-500 rounded-full shadow-md' : 'bg-gray-400'}`}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
