// app/snake/page.jsx
'use client';

import React, { useState, useEffect } from 'react';

// Define o tamanho do campo e a velocidade do jogo
const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 8, y: 8 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);

  // Movimento da cobra com setas do teclado
  useEffect(() => {
    const handleKeydown = (event: { key: any; }) => {
      switch (event.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  // Função para atualizar o jogo
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        // Verifica colisões com as bordas
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Verifica se a cobra comeu a comida
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, isGameOver]);

  return (
    <div>
      <h1>Snake Game</h1>
      {isGameOver ? (
        <div>
          <h2>Game Over</h2>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
            gap: '2px',
          }}
        >
          {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
              const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
              const isFood = food.x === col && food.y === row;
              return (
                <div
                  key={`${row}-${col}`}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'lightgray',
                    border: '1px solid black',
                  }}
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
