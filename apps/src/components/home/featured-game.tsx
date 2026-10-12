import { Link } from 'react-router';
import { ArrowUpRight, Play, Sparkles, Zap, Monitor } from 'lucide-react';
import { games, gamePath } from '@/lib/games';
export function FeaturedGame() {
  const game = games[0];
  return <section className="featured-section" aria-labelledby="hero-title">
    <div className="welcome-line"><span><span className="status-dot" />YOUR BREAK STARTS HERE</span><span>NO DOWNLOADS. NO WAITING.</span></div>
    <div className="featured-banner">
      <img className="hero-image" src={game.thumbnail} alt="Futuristic racing car on an electric-blue night circuit" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-copy"><div className="feature-label"><Sparkles size={14} />GAME OF THE DAY</div><h1 id="hero-title">Less waiting.<br /><span>More playing.</span></h1><p>Meet HexGL. Hit the track, find your flow,<br className="desktop-break" /> and leave the real world in the rearview.</p><div className="hero-tags"><span>Racing</span><span>WebGL</span><span><Monitor size={12} />Keyboard</span></div><Link className="play-button" to={gamePath(game)}><Play size={18} fill="currentColor" />Play HexGL <ArrowUpRight size={18} /></Link><div className="hero-free"><Zap size={12} />Free to play. Right in your browser.</div></div>
      <div className="hero-caption"><span>FEATURED / 01</span><strong>HEXGL</strong><span>FAST TRACK. FULL THROTTLE.</span></div>
    </div>
  </section>;
}
