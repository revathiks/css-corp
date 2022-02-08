import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { ThemeContext } from '../../context/themeContext';

const TodoList = ({ todoList, toggleComplete, deleteTodo, httpStatus }) => {
  console.log('TodoList render');
  //console.log(todoList, 6);

  return (
    <div className="flex-1">
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div>
            <p>{theme}</p>
            <button type="button" onClick={toggleTheme}>
              Change Theme
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          httpStatus={httpStatus.filter((x) => x.id === item.id)}
        />
      ))}
      {/* {todoList.reduce((p, item) => {
        const ui = (
          <TodoItem
            key={item.id}
            item={item}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        );
        switch (filterType) {
          case 'pending':
            if (item.isDone === false) {
              return [...p, ui];
            }
            break;
          case 'completed':
            if (item.isDone === true) {
              return [...p, ui];
            }
            break;

          default:
            return [...p, ui];
        }
        return p;
      }, [])} */}
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      text: PropTypes.string,
      isDone: PropTypes.bool,
      timeStamp: PropTypes.string,
    }),
  ).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  httpStatus: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      status: PropTypes.oneOf(['REQUEST', 'FAIL']),
      id: PropTypes.number,
      payload: PropTypes.objectOf(Error),
    }),
  ).isRequired,
};

export default memo(TodoList);
