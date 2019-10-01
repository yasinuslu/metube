import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStore, TStore } from '../src/storeProvider';
import { Layout } from '../src/components/layout';
import { VideoList } from '../src/components/videoList';

export default function IndexPage() {
  const store = useStore();

  return useObserver(() => {
    return (
      <Layout>
        <VideoList videos={store.video.videos} />
      </Layout>
    );
  });
}

IndexPage.getInitialProps = async (ctx, store: TStore) => {
  await store.video.fetchVideos();
};
