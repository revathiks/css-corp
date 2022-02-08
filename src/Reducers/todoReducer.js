const TodoReducer = (state = { todos: [] }, action) => {
    switch (action.type) {
        case 'LOAD_TODO':
            return { todos: action.payload }
        case 'ADD_TODO':
            return { todos: [action.payload, ...state.todos] }
        case 'REMOVE_TODO':
            const result = state.todos.filter((item) => item.id != action.payload.id);
            return { todos: result }
        case 'UPDATE_TODO':
            const index = state.todos.findIndex((item) => item.id === action.payload.id);
            return { todos: [...state.todos.slice(0, index), action.payload, ...state.todos.slice(index + 1)] }
        default:
            return state;

    }
}
export default TodoReducer;