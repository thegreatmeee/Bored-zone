import { useState } from 'react';
import { Link, useNavigation } from 'react-router';
import { ArrowDown, SearchX, SlidersHorizontal, Flame, LayoutGrid } from 'lucide-react';
import { GameCard } from '@/components/game-card';
import { type Game } from '@/lib/games';
export function GameLibrary({ games, query, category, total }: { games: Game[]; query: string; category: string; total: number }) {
  const [sort, setSort] = useState('featured');
  const [picks, setPicks] = useState(false);
  const navigation = useNavigation();
  const shown = (picks ? games.filter(game => ['hexgl', '2048', 'clumsy-bird', '0h-h1'].includes(game.id)) : games).slice().sort((a, b) => sort === 'az' ? a.title.localeCompare(b.title, 'en') : 0);
  return <section className="library" id="library" aria-labelledby="library-title" aria-busy={navigation.state !== 'idle'}>
    <div className="library-heading"><div><div className="section-eyebrow"><Flame size={15} />FIND YOUR NEXT OBSESSION</div><h2 id="library-title">{query ? `Results for “${query}”` : category !== 'All' ? `${category} games` : 'Pick a game. Jump right in.'}</h2></div><span className="library-count">{shown.length} games <span>·</span> Endless possibilities</span></div>
    <div className="library-toolbar"><div className="library-tabs"><button className={!picks ? 'selected' : ''} onClick={() => setPicks(false)}><LayoutGrid size={15} />All games <span>{total}</span></button><button className={picks ? 'selected' : ''} onClick={() => setPicks(true)}><Flame size={15} />Our picks</button></div><label className="sort-control"><SlidersHorizontal size={14} /><span>Sort by:</span><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort games"><option value="featured">Featured</option><option value="az">Name A–Z</option></select></label></div>
    {shown.length ? <div className={`game-grid ${navigation.state !== 'idle' ? 'is-loading' : ''}`}>{shown.map((game, index) => <GameCard key={game.id} game={game} index={index} />)}</div> : <div className="empty-state"><SearchX size={36} /><h3>No games here just yet</h3><p>{query ? 'Try another title or explore a different category.' : 'This category is ready for new additions. Explore the rest of the arcade in the meantime.'}</p><Link to="/#library" onClick={() => setPicks(false)}>Explore all games <ArrowDown size={16} /></Link></div>}
    {!!shown.length && <div className="library-end"><span /> <p>You’re all caught up. Your next high score is waiting.</p><span /></div>}
  </section>;
}
