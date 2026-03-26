'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function SegmentedVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [url, setUrl] = useState('/video_segments/Shadow/playlist.m3u8');
  const [status, setStatus] = useState('準備中');

  useEffect(() => {
    const player = videoRef.current;
    if (!player) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(player);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStatus('hls loaded');
      });
      return () => {
        hls.destroy();
      };
    }

    if (player.canPlayType('application/vnd.apple.mpegurl')) {
      player.src = url;
      setStatus('native hls');
    } else {
      setStatus('HLS not supported');
    }
  }, [url]);

  return (
    <div className='container py-4'>
      <h2>Segmented Video Player</h2>
      <div className='mb-3'>
        <label className='form-label'>播放清單(M3U8)</label>
        <input className='form-control' value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <video ref={videoRef} controls style={{ width: '100%', background: '#000' }} />
      <p className='mt-2'>狀態: {status}</p>
    </div>
  );
}
