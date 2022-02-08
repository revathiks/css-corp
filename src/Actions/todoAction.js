export const todoAction = (todoText) => async (dispatch, getState) => {
    const res = await fetch('http://localhost:3000/todo-list', {
        method: 'POST',
        body: JSON.stringify({
            text: todoText,
            timeStamp: ''//format(new Date(), 'MM-dd-yy HH:mm')'',
        }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    const json = await res.json();
    dispatch({
        type: 'ADD_TODO', payload: json
    })
}

export const loadTodoAction = () => async (dispatch, getState) => {
    const res = await fetch('http://localhost:3000/todo-list');
    const json = await res.json();
    console.log(json);
    dispatch({
        type: 'LOAD_TODO', payload: json
    })
}
export const deleteTodoAction = (item) => async (dispatch, getState) => {
    await fetch(`http://localhost:3000/todo-list/${item.id}`, {
        method: 'DELETE',
    });

    dispatch({
        type: 'REMOVE_TODO', payload: item
    })
}
export const updateTodoAction = (item) => async (dispatch, getState) => {
    const res = await fetch(`http://localhost:3000/todo-list/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    const json = await res.json();
    dispatch({
        type: 'UPDATE_TODO', payload: json
    })
}