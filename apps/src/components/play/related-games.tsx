import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { GameCard } from '@/components/game-card';
import { type Game } from '@/lib/games';
export function RelatedGames({ games }: { games: Game[] }) {
  return <section className="related-games"><div className="related-heading"><h2>Keep the good times going.</h2><Link to="/#library">All games <ArrowUpRight size={16} /></Link></div><div className="game-grid">{games.map(game => <GameCard key={game.id} game={game} index={3} />)}</div></section>;
}
