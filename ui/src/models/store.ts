import { types } from 'mobx-state-tree';
import { TodoStore } from './todoStore';

export * from './todoStore';

export const Store = types
  .model('Store', {
    todo: TodoStore,
    count: types.number,
  })
  .actions(self => ({
    increment() {
      self.count++;
    },
    decrement() {
      self.count--;
    },
  }));
