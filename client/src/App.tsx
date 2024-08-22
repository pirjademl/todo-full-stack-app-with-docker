import { AddTodo, Itodo } from "./components/add-todo";
import { Todo } from "./components/todo-card";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
function App() {
    const [todos, setTodos] = useState<Itodo[]>([]);

    useEffect(() => {
        fetch("http://localhost/api/todos")
            .then((todos) => todos.json())
            .then(setTodos);
    });

    const onNewTodo = (todo: Itodo) => {
        setTodos((prevtodo) => [...prevtodo, todo]);
    };
    if (!todos) {
        return <p>Error</p>;
    }

    return (
        <div className="">
            <AddTodo onAddTodo={onNewTodo} />
            <div className="grid">
                {todos?.map((todo: Itodo) => (
                    <Todo
                        title={todo.title}
                        id={todo.id}
                        content={todo.content}
                        completed={todo.completed}
                        created_At={todo.created_At}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
