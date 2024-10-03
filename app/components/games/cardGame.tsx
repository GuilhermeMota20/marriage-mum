// app/cards/page.tsx
'use client';

import React, { useState } from 'react';
import { GuitarIcon, Rocket, Flame, Shield, Skull, User, Truck, Target, Sword } from 'lucide-react'; // Importando ícones

// Tipos para os dados das cartas e personagens
interface Card {
  id: number;
  name: string;
  damage: number;
  icon: React.ReactNode; // Substituímos imagem por ícone
}

interface Character {
  name: string;
  hp: number;
}

// Definindo as cartas disponíveis para o jogador
const playerCards: Card[] = [
  { id: 1, name: 'Marco - Heavy Machine Gun', damage: 25, icon: <Sword  className="text-yellow-400 w-12 h-12" /> },
  { id: 2, name: 'Tarma - Rocket Launcher', damage: 30, icon: <Rocket className="text-red-400 w-12 h-12" /> },
  { id: 3, name: 'Fio - Flame Shot', damage: 20, icon: <Flame className="text-orange-400 w-12 h-12" /> },
  { id: 4, name: 'Eri - Shotgun', damage: 35, icon: <Shield className="text-blue-400 w-12 h-12" /> },
];

// Cartas para o inimigo
const enemyCards: Card[] = [
  { id: 1, name: 'Rebel Soldier - Knife', damage: 15, icon: <User className="text-gray-400 w-12 h-12" /> },
  { id: 2, name: 'Rebel Tank - Cannon Shot', damage: 40, icon: <Truck className="text-green-400 w-12 h-12" /> },
  { id: 3, name: 'General Morden - Machine Gun', damage: 30, icon: <Skull className="text-red-500 w-12 h-12" /> },
];

// Componente principal do minigame
const CardGame: React.FC = () => {
  const [player, setPlayer] = useState<Character>({ name: 'Player', hp: 100 });
  const [enemy, setEnemy] = useState<Character>({ name: 'Enemy Soldier', hp: 100 });
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState<string>('');

  // Função para lidar com o turno do jogador
  const handlePlayerAttack = (card: Card) => {
    if (!isPlayerTurn) return; // Bloquear se não for o turno do jogador

    const newEnemyHp = Math.max(0, enemy.hp - card.damage);
    setEnemy({ ...enemy, hp: newEnemyHp });
    setMessage(`Você atacou com ${card.name} causando ${card.damage} de dano!`);
    
    setIsPlayerTurn(false);

    // Verificar se o inimigo foi derrotado
    if (newEnemyHp === 0) {
      setMessage('Você venceu!');
    } else {
      setTimeout(handleEnemyTurn, 1000); // Espera e chama o turno do inimigo
    }
  };

  // Função para lidar com o turno do inimigo
  const handleEnemyTurn = () => {
    const randomCard = enemyCards[Math.floor(Math.random() * enemyCards.length)];
    const newPlayerHp = Math.max(0, player.hp - randomCard.damage);
    setPlayer({ ...player, hp: newPlayerHp });
    setMessage(`O inimigo atacou com ${randomCard.name}, causando ${randomCard.damage} de dano!`);

    // Verificar se o jogador foi derrotado
    if (newPlayerHp === 0) {
      setMessage('Você foi derrotado!');
    } else {
      setIsPlayerTurn(true); // Jogador volta a jogar
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Metal Slug RPG Card Game</h1>
      <div className="flex justify-between w-full max-w-3xl mb-8">
        {/* Player Info */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl mb-2">Jogador</h2>
          <p className="text-lg">HP: {player.hp}</p>
        </div>
        {/* Enemy Info */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl mb-2">Inimigo</h2>
          <p className="text-lg">HP: {enemy.hp}</p>
        </div>
      </div>

      <div className="text-center mb-6">
        <p>{message}</p>
      </div>

      {/* Exibir cartas para o jogador selecionar */}
      <div className="grid grid-cols-2 gap-4">
        {isPlayerTurn && playerCards.map((card) => (
          <button
            key={card.id}
            className="border-2 border-gray-500 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition flex flex-col items-center"
            onClick={() => handlePlayerAttack(card)}
          >
            {card.icon}
            <p className="mt-2">{card.name}</p>
            <p>Dano: {card.damage}</p>
          </button>
        ))}
      </div>

      {/* Reiniciar o jogo */}
      {player.hp === 0 || enemy.hp === 0 ? (
        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          onClick={() => window.location.reload()}
        >
          Jogar Novamente
        </button>
      ) : null}
    </div>
  );
};

export default CardGame;
