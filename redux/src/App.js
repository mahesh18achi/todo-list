import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, toggle, remove } from "./redux-store/actions";

function Todo() {
    const [newTodo, setNewTodo] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const todo = useSelector(state => state.todo);
    const todoListRef = useRef(null);

    const handleAddTodo = () => {
        if (newTodo.trim() === "") {
            setError("Please enter a todo item.");
        } else {
            dispatch(addtodo(newTodo));
            setNewTodo("");
            setError("");
        }
    };

    useEffect(() => {
        if (todoListRef.current) {
            todoListRef.current.scrollTo({ top: todoListRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [todo]);

    return (
        <div style={styles.container}>


<div style={styles.addTodoContainer}>
                <h1 style={styles.addTodoTitle}> Todo App</h1>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    style={styles.input}
                />
                <button onClick={handleAddTodo} style={styles.addButton}>Add Todo</button>
            </div>












            {error && (
                <div style={styles.errorCard}>
                    <p>{error}</p>
                    <button onClick={() => setError("")} style={styles.closeButton}>Close</button>
                </div>
            )}
            <div ref={todoListRef} style={styles.todoListContainer}>
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
                                                backgroundColor: item.completed ? 'lightgreen' : 'red',
                                                color: item.completed ? 'black' : 'white'
                                            }}>
                                            {item.completed ? 'Completed' : 'Not Completed'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (item.completed) {
                                                    dispatch(remove(item.id));
                                                } else {
                                                    alert("You cannot delete an item before completing it.");
                                                }
                                            }}
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

            
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        background: 'linear-gradient( #4E65FF , #92EFFD)',
        minHeight: '100vh',
    },
    errorCard: {
        position: 'absolute',
        top: '20px',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
    },
    closeButton: {
        backgroundColor: 'green',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft:'10px',
        transition: 'background-color 0.3s',
        
    },
    todoListContainer: {
        width: '600px',
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #fff',
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
        padding: '10px 0',
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
        backgroundColor: 'orange',
        color: 'black',
        padding: '10px 20px',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginBottom:'30px'
    },
};

export default Todo;
