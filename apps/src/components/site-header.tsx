import { useEffect, useState } from 'react';
import { Form, Link, useLocation, useNavigate, useNavigation, useSubmit } from 'react-router';
import { Gamepad2, Search, Shuffle, X, Zap, Grid2X2, Swords, Puzzle, Flag, Users, Trophy, Globe, Smile } from 'lucide-react';
import { categories, games, gamePath } from '@/lib/games';

const icons = [Swords, Puzzle, Flag, Users, Trophy, Globe, Smile];
export function SiteHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const navigation = useNavigation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category') || 'All';
  const query = params.get('q') || '';
  const [search, setSearch] = useState(query);
  useEffect(() => setSearch(query), [query]);
  const clearParams = new URLSearchParams();
  if (category !== 'All') clearParams.set('category', category);
  const filterLink = (value: string) => { const next = new URLSearchParams(); if (query) next.set('q', query); if (value !== 'All') next.set('category', value); return `/?${next.toString()}#library`; };
  return <header className="site-header">
    <div className="header-main">
      <Link className="brand" to="/" aria-label="ArcadeZone home"><span className="brand-symbol"><Gamepad2 size={27} /></span><span>arcade<span className="cyan">zone</span><span className="brand-dot">.</span></span></Link>
      <Form method="get" action="/" replace className="search-form" role="search" onChange={event => submit(event.currentTarget, { replace: true, preventScrollReset: true })}>
        <Search size={19} aria-hidden="true" /><input name="q" maxLength={120} value={search} onChange={event => setSearch(event.target.value)} placeholder="Find your next favorite game..." aria-label="Search games" autoComplete="off" />
        {category !== 'All' && <input type="hidden" name="category" value={category} />}
        {query ? <Link to={`/?${clearParams.toString()}#library`} className="search-clear" aria-label="Clear search"><X size={16} /></Link> : <span className="search-hint">SEARCH</span>}
        {navigation.state !== 'idle' && <span className="search-spinner" aria-label="Searching" />}
      </Form>
      <button className="random-button" onClick={() => { const pool = games.filter(game => gamePath(game) !== location.pathname); const game = pool[Math.floor(Math.random() * pool.length)]; if (game) navigate(gamePath(game)); }}><Shuffle size={17} /><span>Random game</span></button>
    </div>
    <nav className="category-nav" aria-label="Game categories"><div className="category-inner">
      <Link to={filterLink('All')} className={`category-pill ${category === 'All' ? 'active' : ''}`}><Grid2X2 size={16} />All games</Link><span className="category-divider" />
      {categories.map((item, i) => { const Icon = icons[i]; return <Link key={item} to={filterLink(item)} className={`category-pill ${category === item ? 'active' : ''}`}><Icon size={16} />{item}</Link>; })}
      <span className="instant-label"><Zap size={14} />Instant play. Always free.</span>
    </div></nav>
  </header>;
}
