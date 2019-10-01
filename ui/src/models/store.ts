import { types } from 'mobx-state-tree';
import { AuthStore } from './authStore';
import { VideoStore } from './videoStore';

export * from './authStore';

export const Store = types
  .model('Store', {
    auth: AuthStore,
    video: VideoStore,
  })
  .actions(() => ({}));

export const createStore = () => {
  return Store.create({
    auth: {
      userId: null,
      token: null,
    },
    video: {},
  });
};
