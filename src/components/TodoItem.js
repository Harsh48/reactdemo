import React from 'react';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { inject, observer } from 'mobx-react';

const TodoItem = inject('TodoStore')(observer(props => {
  const TodoStore = props.TodoStore;

  return (
    <div>
      <div key={props.todo.todo_id.N} className="todo-item">
        <div className="todo-item-left">
          <input type="checkbox" onChange={(event) => TodoStore.checkTodo(props.todo, event)} />

          {!props.todo.editing &&
          <div
            className={classnames({'todo-item-label': true})}
            onDoubleClick={(event) => TodoStore.editTodo(props.todo, event)}
          >
            {props.todo.todo_message.S}
          </div>
          }

          {props.todo.editing &&
          <input
            className="todo-item-edit" type="text" autoFocus
            defaultValue={props.todo.todo_message.S}
            onBlur={(event) => TodoStore.doneEdit(props.todo, event)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                TodoStore.doneEdit(props.todo, event);
              } else if (event.key === 'Escape') {
                TodoStore.cancelEdit(props.todo, event);
              }
            }}
          />
          }

        </div>
        <div className="remove-item" onClick={(event) => TodoStore.deleteTodo(props.todo.todo_id.N)}>
          &times;
        </div>
      </div>
    </div>
  );
}));

TodoItem.wrappedComponent.propTypes = {
  todo: PropTypes.object.isRequired,
  TodoStore: PropTypes.object.isRequired,
};

export default TodoItem;
