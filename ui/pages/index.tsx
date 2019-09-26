import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../src/storeProvider';
import { Layout } from '../src/components/layout';
import { VideoList } from '../src/components/videoList';
import { TVideo } from '../src/types';

function getVideos(): TVideo[] {
  return Array.from({ length: 20 }).map((__, index) => ({
    id: `item_${index}`,
    title: `Video ${index}`,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, nihil.',
    cover: 'https://placekitten.com/355/200',
    url: 'https://www.youtube.com/watch?v=SB-qEYVdvXA',
  }));
}

export default function IndexPage() {
  const store = useStore();

  return useObserver(() => {
    return (
      <Layout>
        <VideoList videos={getVideos()} />
      </Layout>
    );
  });
}
