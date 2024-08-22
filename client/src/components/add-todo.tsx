import { ChangeEvent, FC, FormEvent, useState } from "react";
import "../App.css";
export interface Itodo {
    id: string;
    title: string;
    content: string;
    completed: number;
    created_At: string;
}
interface addTodoProps {
    onAddTodo: (todo: Itodo) => void;
}

export const AddTodo: FC<addTodoProps> = ({ onAddTodo }) => {
    const [todoItem, setTodoItem] = useState({
        title: "",
        content: "",
        completed: 0,
    });
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("http://localhost/api/todos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(todoItem),
        });
        const newTodo = await response.json();
        onAddTodo(newTodo);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTodoItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
                <input
                    required
                    name="title"
                    className="form-input"
                    onChange={handleChange}
                    placeholder="enter title"
                />
                <input
                    name="content"
                    className="form-input"
                    onChange={handleChange}
                    placeholder="enter content"
                />
            </div>
            <button className="submit-button" type="submit">
                Add note
            </button>
        </form>
    );
};
