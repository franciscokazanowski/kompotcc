'use client';
import { useState } from 'react';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { type LearningVideo, videoWatchUrl } from '@/lib/videos';

export function LessonVideo({ video }: { video: LearningVideo }) {
  const [playing, setPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState<'maxresdefault' | 'hqdefault' | null>('maxresdefault');
  const params = new URLSearchParams({ playsinline: '1', autoplay: '1', rel: '0' });
  if (video.start) params.set('start', String(video.start));
  return <section className="lesson-video" aria-label="Vídeo complementar">
    <span className="eyebrow">PARA VER NA PRÁTICA · OPCIONAL</span>
    <h3>{video.title}</h3>
    {video.note && <p className="video-note">{video.note}</p>}
    {playing ? <iframe
      className="video-player"
      src={`https://www.youtube-nocookie.com/embed/${video.id}?${params}`}
      title={video.title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    /> : <button className={`video-placeholder${thumbnail ? ' video-poster' : ''}`} onClick={() => setPlaying(true)} aria-label={`Assistir: ${video.title}`}>
      {thumbnail && <img
        src={`https://img.youtube.com/vi/${video.id}/${thumbnail}.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setThumbnail(current => current === 'maxresdefault' ? 'hqdefault' : null)}
      />}
      <span className="video-poster-action"><PlayCircle size={52} strokeWidth={1.5}/><span>Assistir ao vídeo</span></span>
    </button>}
    <div className="video-credit"><span>Vídeo de <a href={video.channel} target="_blank" rel="noopener noreferrer">{video.author}</a>.</span>
      <a href={videoWatchUrl(video)} target="_blank" rel="noopener noreferrer">Abrir no YouTube <ExternalLink size={13}/></a>
    </div>
    {video.start && <p className="video-chapter">Começa em {Math.floor(video.start / 60)}:{String(video.start % 60).padStart(2, '0')}.</p>}
  </section>;
}
