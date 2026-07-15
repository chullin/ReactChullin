import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export function SiteHeader() {
  return <Navbar />;
}

export function SiteFooter() {
  return <Footer className="relative z-20" />;
}
