import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, toggle, remove } from "./redux-store/actions";

function Todo() {
    const [newTodo, setNewTodo] = useState("");
    const dispatch = useDispatch();
    const todo = useSelector(state => state.todo);

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            dispatch(addtodo(newTodo));
            setNewTodo("");
        }
    };

    console.log("the todos are", todo);

    return (
        <div style={styles.container}>
            <div style={styles.todoListContainer}>
                <h1 style={styles.title}>Todo List</h1>
                {todo && todo.length > 0 ? (
                    todo.map((item) => (
                        <div key={item.id} style={styles.todoItem}>
                            {item && item.text ? (
                                <span style={styles.todoText}>
                                    <b>{item.text}</b>
                                    <div style={styles.buttonsContainer}>
                                        <button 
                                            onClick={() => { dispatch(toggle(item.id)) }} 
                                            style={{ 
                                                ...styles.statusButton, 
                                                backgroundColor: item.completed ? 'green' : 'red', 
                                                color: item.completed ? 'black' : 'white' 
                                            }}>
                                            {item.completed ? 'Completed' : 'Not Completed'}
                                        </button>
                                        <button 
                                            onClick={() => { dispatch(remove(item.id)) }} 
                                            style={styles.deleteButton}>
                                            Delete
                                        </button>
                                    </div>
                                </span>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <h2 style={styles.noTodosText}>No Todos</h2>
                )}
            </div>

            <div style={styles.addTodoContainer}>
                <h1 style={styles.addTodoTitle}>Add Todo</h1>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    style={styles.input}
                />
                <button onClick={handleAddTodo} style={styles.addButton}>Add Todo</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    },
    todoListContainer: {
        width: '600px',
        maxHeight: '400px',
        overflowY: 'scroll',
        padding: '20px',
        border: '2px solid #333',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    todoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    todoText: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    buttonsContainer: {
        display: 'flex',
        gap: '10px',
    },
    statusButton: {
        border: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '30px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    noTodosText: {
        textAlign: 'center',
        color: '#999',
    },
    addTodoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
    },
    addTodoTitle: {
        marginBottom: '10px',
        color: '#333',
    },
    input: {
        border: '2px solid #333',
        padding: '10px',
        width: '100%',
        borderRadius: '30px',
        marginBottom: '10px',
    },
    addButton: {
        backgroundColor: 'green',
        color: 'black',
        padding: '10px 20px',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Todo;
