import { types, destroy, getRoot, getParentOfType } from 'mobx-state-tree';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type TTodo = ReturnType<typeof Todo.create>;

export const Todo = types
  .model('Todo', {
    id: types.number,
    title: types.string,
    done: false,
  })
  .actions(self => ({
    toggle() {
      self.done = !self.done;
    },
    remove() {
      getParentOfType(self, TodoStore).removeTodo(self);
      // getRoot(self).removeTodo(self);
    },
  }));

export const TodoStore = types
  .model('TodoStore', {
    todos: types.array(Todo),
  })
  .actions(self => ({
    addTodo(title: string) {
      const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
      self.todos.unshift({
        id,
        title,
      });
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    removeTodo(todo) {
      destroy(todo);
    },
  }));
