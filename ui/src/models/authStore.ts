import { types } from 'mobx-state-tree';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type TAuthStore = ReturnType<typeof AuthStore.create>;

export const AuthStore = types
  .model('AuthStore', {
    userId: types.maybeNull(types.string),
    token: types.maybeNull(types.string),
  })
  .actions(() => ({}));
