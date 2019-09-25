import React from 'react';
import { useStore } from '../src/storeProvider';
import { useObserver } from 'mobx-react-lite';
import { Button, Badge, Box, Chip } from '@material-ui/core';

export default function IndexPage() {
  const store = useStore();

  return useObserver(() => (
    <Box>
      <Button onClick={store.decrement}>Decrement</Button>
      <Chip label={store.count} variant="outlined" />
      <Button color="primary" onClick={store.increment}>
        Increment
      </Button>
    </Box>
  ));
}
