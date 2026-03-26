'use client';

import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playlistUrl, setPlaylistUrl] = useState('https://chullin.github.io/video_segments/Shadow/playlist.m3u8');
  const [status, setStatus] = useState('準備中');
  const [segIndex, setSegIndex] = useState('-');
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);

  const startPlayback = (url: string) => {
    const video = videoRef.current;
    if (!video) return;

    if (hlsInstance) {
      hlsInstance.destroy();
      setHlsInstance(null);
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStatus('使用 hls.js 播放');
        setSegIndex('HLS (manifest)');
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setStatus('HLS 發生致命錯誤');
          hls.destroy();
        }
      });
      setHlsInstance(hls);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      setStatus('使用瀏覽器原生 HLS 播放');
      setSegIndex('HLS (native)');
    } else {
      setStatus('您的瀏覽器不支援 HLS 播放');
    }
  };

  useEffect(() => {
    startPlayback(playlistUrl);
    return () => {
      if (hlsInstance) hlsInstance.destroy();
    };
  }, []);

  const handlePlaylistClick = (url: string, name: string) => {
    setPlaylistUrl(url);
    setStatus(`已選擇影片：${name}`);
    startPlayback(url);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="player-wrap" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 className="mb-4">Segmented Video Player</h2>

        <div className="mb-3">
          <label className="form-label small">播放清單（m3u8）URL：</label>
          <input
            className="form-control"
            type="text"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
          />
        </div>

        <video
          ref={videoRef}
          className="w-100 rounded shadow mb-3"
          controls
          preload="auto"
          style={{ background: '#000' }}
        ></video>

        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="small text-muted">狀態: <span>{status}</span></div>
          <div className="small text-muted">段落: <span>{segIndex}</span></div>
          <div className="ms-auto d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm" onClick={() => startPlayback(playlistUrl)}>
              重新載入
            </button>
            <button className="btn btn-primary btn-sm" onClick={togglePlay}>
              播放 / 暫停
            </button>
          </div>
        </div>

        <section className="bg-light p-4 rounded">
          <h3 className="h5 mb-3">影片連結清單:</h3>
          <ul className="list-unstyled d-flex flex-column gap-2">
            {[
              { name: 'Shadow playlist.m3u8', url: 'https://chullin.github.io/video_segments/Shadow/playlist.m3u8' },
              { name: 'Dify playlist.m3u8', url: 'https://chullin.github.io/video_segments/Dify/Difyplaylist.m3u8' },
              { name: 'Dify no Music playlist.m3u8', url: 'https://chullin.github.io/video_segments/Dify_noMusic/Difyplaylist.m3u8' },
              { name: 'Camera Review playlist.m3u8', url: 'https://chullin.github.io/video_segments/Camera/Cameraplaylist.m3u8' },
            ].map((item, idx) => (
              <li
                key={idx}
                className="text-primary text-decoration-underline"
                style={{ cursor: 'pointer' }}
                onClick={() => handlePlaylistClick(item.url, item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
