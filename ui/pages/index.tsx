import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../src/storeProvider';
import { Layout } from '../src/components/layout';

export default function IndexPage() {
  const store = useStore();

  return useObserver(() => {
    return (
      <Layout>
        <div>test</div>
      </Layout>
    );
  });
}
