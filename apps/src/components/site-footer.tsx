import { Link } from 'react-router';
import { Gamepad2, ArrowUpRight } from 'lucide-react';
export function SiteFooter() {
  return <footer className="site-footer"><div><Link className="footer-brand" to="/"><Gamepad2 size={20} />arcade<span className="cyan">zone.</span></Link><p>A little escape. A lot of fun.</p></div><div className="footer-links"><Link to="/#library">Explore games <ArrowUpRight size={14} /></Link><span>© 2026 ArcadeZone</span></div><p className="footer-note">Games run on their creators’ websites. All game names belong to their respective owners. Thumbnails are illustrative artwork.</p></footer>;
}
