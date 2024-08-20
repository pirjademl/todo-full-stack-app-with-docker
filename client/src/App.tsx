import "./App.css";
import { useFetch } from "./@hooks/use-fetch";
import { AddTodo, Itodo } from "./components/add-todo";
import { Todo } from "./components/todo-card";
import { useCallback } from "react";
function App() {
    console.log("rerendered");
    const { isLoading, isError, data } = useFetch("http://localhost/api/todos");
    if (isLoading) {
        return <p>loading.....</p>;
    }
    if (isError) {
        return <p>error Laoding data</p>;
    }

    return (
        <div>
            <AddTodo />
            <div className="grid">
                {data.map((todo: Itodo) => (
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
