export type LearningVideo = {
  id: string;
  lesson: string;
  title: string;
  author: string;
  channel: string;
  start?: number;
  note?: string;
};

export const learningVideos: LearningVideo[] = [
  {
    id: '3pai8p41vVk',
    lesson: 'preparo',
    title: 'Composteira Bokashi, como iniciar a compostagem passo a passo',
    author: 'Ecotrecos',
    channel: 'https://www.youtube.com/@Ecotrecos',
  },
  {
    id: 'p6CjJfykZ1M',
    lesson: 'destino',
    title: 'compostashi | Segunda Fase da Compostagem Bokashi',
    author: 'compostashi',
    channel: 'https://www.youtube.com/@compostashi',
  },
];

export const videoWatchUrl = (video: LearningVideo) =>
  `https://www.youtube.com/watch?v=${video.id}${video.start ? `&t=${video.start}s` : ''}`;
