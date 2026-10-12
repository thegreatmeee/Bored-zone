import { Link } from 'react-router';
import { Play, Star, ArrowUpRight } from 'lucide-react';
import { gamePath, type Game } from '@/lib/games';
export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  return <Link className="game-card" to={gamePath(game)} aria-label={`Play ${game.title}`}>
    <div className="card-image-wrap"><img src={game.thumbnail} alt={`${game.title} illustrative artwork`} loading="lazy" width="640" height="360" />{index < 2 && <span className={`card-ribbon ${index === 1 ? 'pick' : ''}`}>{index === 0 ? 'FEATURED' : 'OUR PICK'}</span>}<span className="card-play"><Play size={24} fill="currentColor" /></span><span className="card-corner"><ArrowUpRight size={16} /></span></div>
    <div className="card-info"><h3>{game.title}</h3><div className="card-meta"><span className={`game-category category-${game.category.toLowerCase()}`}>{game.category}</span><span className="card-rating" title="Community ratings are not available"><Star size={12} />Unrated</span></div></div>
  </Link>;
}
