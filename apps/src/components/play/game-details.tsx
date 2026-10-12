import { Keyboard, Info } from 'lucide-react';
import { type Game } from '@/lib/games';
export function GameDetails({ game }: { game: Game }) {
  return <section className="game-details"><div><div className="section-eyebrow"><Info size={14} />ABOUT THE GAME</div><h1>{game.title}</h1><p>{game.description}</p><span className={`game-category category-${game.category.toLowerCase()}`}>{game.category}</span><span className="details-free">Free browser game</span></div><div className="controls-panel"><h2><Keyboard size={22} />How to play</h2><p>{game.controls}</p><span>Tip: Click the game first so it can receive keyboard input.</span></div></section>;
}
