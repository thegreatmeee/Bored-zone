import { Zap, Download, Gamepad2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
export function PlayPromise() {
  return <section className="play-promise"><div className="promise-mark"><Gamepad2 size={35} /></div><div><h2>Big fun. Zero baggage.</h2><p>No installs. No sign-ups. Just good games.</p></div><div className="promise-benefits"><span><Zap size={17} />Instant play</span><span><Download size={17} />Nothing to download</span></div><Link to="/#library" aria-label="Back to game library"><ArrowUpRight size={25} /></Link></section>;
}
