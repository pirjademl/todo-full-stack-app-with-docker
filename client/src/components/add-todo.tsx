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
        <form
            onSubmit={handleSubmit}
            className="flex w-full  justify-between gap-2"
        >
            <div className="flex gap-2">
                <input
                    required
                    name="title"
                    className="w-full input"
                    onChange={handleChange}
                    placeholder="enter title"
                />
                <input
                    name="content"
                    className="w-full input textarea"
                    onChange={handleChange}
                    placeholder="enter content"
                />
            </div>
            <button className="button w-full" type="submit">
                Add note
            </button>
        </form>
    );
};
