import React, { useState, useEffect, useRef } from 'react';
import loadable from '@loadable/component';
import ThemeProvider from '../../context/themeContext';
import { todoAction, loadTodoAction, deleteTodoAction, updateTodoAction } from '../../Actions/todoAction'
import { useSelector, useDispatch } from 'react-redux';
import TodoForm from './todoForm';


const TodoFilter = loadable(
  () => import(/* webpackChunkName: "TodoFilter" */ './todoFilter'),
  { fallback: <h1>Loading...</h1> },
);

const TodoList = loadable(
  () => import(/* webpackChunkName: "TodoList" */ './todoList'),
  { fallback: <h1>Loading...</h1> },
);



const Todo = () => {
  const todoLists = useSelector(state => state.todo.todos);
  const [filterType, setFilterType] = useState('all');
  const [httpStatus, setHttpStatus] = useState([]);
  const inputRef = useRef();
  const dispatch = useDispatch();



  const loadingStatus = ({ type, id = -1 }) => {
    setHttpStatus((val) => {
      const index = val.findIndex((x) => x.type === type && x.id === id);
      const data = { type, status: 'REQUEST', id };
      if (index === -1) {
        return [...val, data];
      }
      return [...val.slice(0, index), data, ...val.slice(index + 1)];
    });
  };

  const successStatus = ({ type, id = -1 }) => {
    setHttpStatus((val) =>
      val.filter((x) => !(x.type === type && x.id === id)),
    );
  };

  const errorStatus = ({ type, payload, id = -1 }) => {
    setHttpStatus((val) =>
      val.map((x) => {
        if (x.type === type && x.id === id) {
          return { ...x, status: 'FAIL', payload };
        }
        return x;
      }),
    );
  };
  const loadTodo = async () => {
    const type = 'LOAD_TODO';
    try {
      loadingStatus({ type });
      dispatch(loadTodoAction())
      //setTodoList(json);
      successStatus({ type });
    } catch (error) {
      errorStatus({ type, payload: error });
    }
  };
  // component Did mount
  useEffect(() => {
    loadTodo();
  }, []);

  const addTodo = async (event) => {
    const type = 'ADD_TODO';
    try {
      event.preventDefault();
      loadingStatus({ type });
      const todoText = inputRef.current.value;
      if (!todoText) throw new Error('Please Enter Data..');
      dispatch(todoAction(todoText))

      setFilterType('all');
      successStatus({ type });
      inputRef.current.value = '';
    } catch (error) {
      errorStatus({ type, payload: error });
    }
  };

  const toggleComplete = async (item) => {
    const type = 'UPDATE_TODO';
    try {
      loadingStatus({ type, id: item.id });
      dispatch(updateTodoAction(item))
      successStatus({ type, id: item.id });
    } catch (error) {
      errorStatus({ type, payload: error, id: item.id });
    }
  };

  const deleteTodo = async (item) => {
    const type = 'DELETE_TODO';
    try {
      loadingStatus({ type, id: item.id });
      // await fetch(`http://localhost:3000/todo-list/${item.id}`, {
      //   method: 'DELETE',
      // });
      // setTodoList((val) => {
      //   const index = val.findIndex((x) => x.id === item.id);
      //   return [...todoList.slice(0, index), ...todoList.slice(index + 1)];
      // });
      dispatch(deleteTodoAction(item));
      successStatus({ type, id: item.id });
    } catch (error) {
      errorStatus({ type, payload: error, id: item.id });
    }
  };

  const loadStatus = httpStatus.find((x) => x.type === 'LOAD_TODO');
  const addStatus = httpStatus.find((x) => x.type === 'ADD_TODO');
  const todoListStatus = httpStatus.filter(
    (x) => x.type === 'UPDATE_TODO' || x.type === 'DELETE_TODO',
  );

  return (
    <div className="h-screen flex flex-col bg-slate-200 md:bg-green-300 ">
      {loadStatus?.status === 'REQUEST' && <h1>Api is calling...</h1>}
      {loadStatus?.status === 'FAIL' && <h1>{loadStatus.payload.message}</h1>}
      <h1 className="text-4xl text-center my-4 font-bold text-red-400">
        Todo App
      </h1>
      <TodoForm addTodo={addTodo} ref={inputRef} httpStatus={addStatus} />
      {todoLists.length > 0 ? (
        <ThemeProvider>
          <TodoList
            todoList={todoLists}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            httpStatus={todoListStatus}
          />
        </ThemeProvider>
      ) : (
        <div className="h-screen">
          <h1 className="text-center">Please add tasdk</h1>
        </div>
      )}

      <TodoFilter filterType={filterType} handleFilter={loadTodo} />
    </div>
  );
};

export default Todo;
