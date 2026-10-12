import { useEffect, useRef, useState } from 'react';
import { Expand, Minimize, RotateCcw, ExternalLink, Play, LoaderCircle, Volume2, ShieldCheck } from 'lucide-react';
import { type Game } from '@/lib/games';
export function GamePlayer({ game }: { game: Game }) {
  const container = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const [version, setVersion] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => { if (!started || loaded) return; const timer = window.setTimeout(() => setSlow(true), 15000); return () => window.clearTimeout(timer); }, [started, loaded, version]);
  useEffect(() => { const changed = () => setFullscreen(document.fullscreenElement === container.current); document.addEventListener('fullscreenchange', changed); return () => document.removeEventListener('fullscreenchange', changed); }, []);
  const retry = () => { setLoaded(false); setSlow(false); setVersion(value => value + 1); setStarted(true); };
  const toggleFullscreen = async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else if (container.current?.requestFullscreen) await container.current.requestFullscreen(); else setMessage('Fullscreen is not supported on this browser. Open the original game for a larger view.'); } catch { setMessage('Fullscreen was unavailable. Try opening the original game instead.'); } };
  return <section className="player-section" aria-label={`${game.title} game player`}>
    <div className="player-toolbar"><span><span className="status-dot" />{game.title}<span className="player-category">{game.category}</span></span><div><button onClick={retry} title="Restart game"><RotateCcw size={17} /><span>Restart</span></button><button onClick={toggleFullscreen}><Expand size={17} /><span>Fullscreen</span></button><a href={game.embedUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={17} /><span>Open original</span></a></div></div>
    <div ref={container} className="player-container">
      {started ? <><iframe key={`${game.id}-${version}`} src={game.embedUrl} title={`Play ${game.title}`} allowFullScreen allow="fullscreen; gamepad" sandbox="allow-scripts allow-same-origin allow-pointer-lock" referrerPolicy="strict-origin-when-cross-origin" onLoad={() => setLoaded(true)} onError={() => { setSlow(true); setLoaded(true); }} />{!loaded && <div className="player-loading"><LoaderCircle className="spin" size={28} /><p>Loading {game.title}…</p><span>The game is loading from its creator’s website.</span></div>}</> : <div className="player-start"><img src={game.thumbnail} alt="" /><div><span className="feature-label">READY WHEN YOU ARE</span><h2>{game.title}</h2><button className="play-button" onClick={() => setStarted(true)}><Play fill="currentColor" size={20} />Launch game</button><p><Volume2 size={14} />Game audio may play after launch.</p></div></div>}
      {fullscreen && <button className="exit-fullscreen" onClick={toggleFullscreen}><Minimize size={18} />Exit fullscreen</button>}
    </div>
    {slow && <div role="status" className="player-notice">Taking longer than expected? The host may be slow or may not support embedding. <button onClick={retry}>Retry</button> or <a href={game.embedUrl} target="_blank" rel="noopener noreferrer">open the original game</a>.</div>}
    {message && <p role="status" className="player-notice">{message}</p>}
    <div className="player-tip"><ShieldCheck size={15} /><span>Hosted by the game’s creator. If the game stays blank, <a href={game.embedUrl} target="_blank" rel="noopener noreferrer">open it in a new tab <ExternalLink size={12} /></a>.</span><span>Click inside the game to activate controls.</span></div>
  </section>;
}
