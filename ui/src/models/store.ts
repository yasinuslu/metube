import { types } from 'mobx-state-tree';
import { TodoStore } from './todoStore';
import { AuthStore } from './authStore';

export * from './todoStore';
export * from './authStore';

export const Store = types
  .model('Store', {
    todo: TodoStore,
    auth: AuthStore,
  })
  .actions(() => ({}));

export const createStore = () => {
  return Store.create({
    todo: TodoStore.create(),
    auth: {
      userId: null,
      token: null,
    },
  });
};
