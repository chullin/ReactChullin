import { permanentRedirect } from 'next/navigation';

export default function LegacyPage() {
  permanentRedirect('/video-player');
}
