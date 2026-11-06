'use client';

import SiteCard from '@/components/SiteCard';
import SitePageHeading from '@/components/SitePageHeading';
import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { 
  CardBody, 
  CardHeader, 
  Input, 
  Button, 
  Chip,
  Listbox,
  ListboxItem
} from '@heroui/react';
import { 
  Play, 
  RefreshCcw, 
  Video, 
  Link as LinkIcon, 
  Info,
  Layers
} from 'lucide-react';

export default function VideoPlayerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playlistUrl, setPlaylistUrl] = useState('https://chullin.github.io/video_segments/Shadow/playlist.m3u8');
  const [status, setStatus] = useState('準備中');
  const [segIndex, setSegIndex] = useState('-');
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);

  const playlists = [
    { name: 'Shadow playlist.m3u8', url: 'https://chullin.github.io/video_segments/Shadow/playlist.m3u8' },
    { name: 'Dify playlist.m3u8', url: 'https://chullin.github.io/video_segments/Dify/Difyplaylist.m3u8' },
    { name: 'Dify no Music playlist.m3u8', url: 'https://chullin.github.io/video_segments/Dify_noMusic/Difyplaylist.m3u8' },
    { name: 'Camera Review playlist.m3u8', url: 'https://chullin.github.io/video_segments/Camera/Cameraplaylist.m3u8' },
  ];

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
    <div className="site-page">
      <div className="site-container space-y-10">
        <SitePageHeading
          eyebrow="Video & Streaming"
          title="Segmented Player"
          description="High-performance HLS video streaming showcase"
        />

        <SiteCard className="overflow-visible">
          <CardBody className="p-5 sm:p-8 space-y-8">
            <div className="space-y-4">
              <Input
                label="M3U8 Playlist URL"
                placeholder="Enter playlist URL..."
                labelPlacement="outside"
                value={playlistUrl}
                onValueChange={setPlaylistUrl}
                startContent={<LinkIcon size={18} className="text-gray-400" />}
                variant="bordered"
                radius="lg"
                classNames={{
                  label: "font-black text-gray-700",
                  inputWrapper: "border-gray-100 focus-within:border-primary",
                }}
              />
            </div>

            <div className="relative group rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-black aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls
                preload="auto"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div className="flex flex-wrap gap-3">
                <Chip
                  variant="flat"
                  color="primary"
                  startContent={<Info size={14} />}
                  className="font-bold border-none"
                >
                  {status}
                </Chip>
                <Chip
                  variant="flat"
                  color="secondary"
                  startContent={<Layers size={14} />}
                  className="font-bold border-none"
                >
                  {segIndex}
                </Chip>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="flat"
                  color="default"
                  radius="full"
                  className="font-bold flex-1"
                  onPress={() => startPlayback(playlistUrl)}
                  startContent={<RefreshCcw size={18} />}
                >
                  重新載入
                </Button>
                <Button
                  color="primary"
                  radius="full"
                  className="font-black flex-1 shadow-lg shadow-orange-700/20"
                  onPress={togglePlay}
                  startContent={<Play size={18} fill="currentColor" />}
                >
                  播放 / 暫停
                </Button>
              </div>
            </div>
          </CardBody>
        </SiteCard>

        <SiteCard>
          <CardHeader className="px-8 pt-8 pb-0">
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 p-2 rounded-xl text-orange-700">
                <Video size={20} />
              </div>
              <h3 className="text-xl font-black text-gray-900">影片連結清單</h3>
            </div>
          </CardHeader>
          <CardBody className="p-8">
            <Listbox 
              aria-label="Playlist Selection"
              className="p-0 gap-2"
              itemClasses={{
                base: "px-4 py-3 rounded-2xl data-[hover=true]:bg-orange-50 transition-all",
                title: "font-bold text-gray-700",
              }}
            >
              {playlists.map((item, idx) => (
                <ListboxItem
                  key={idx}
                  onPress={() => handlePlaylistClick(item.url, item.name)}
                  startContent={<Play size={16} fill="currentColor" className="text-orange-600" />}
                >
                  {item.name}
                </ListboxItem>
              ))}
            </Listbox>
          </CardBody>
        </SiteCard>
      </div>
    </div>
  );
}
