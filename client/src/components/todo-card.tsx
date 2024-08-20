import { Itodo } from "./add-todo";
import { CheckCheck, Trash2 } from "lucide-react";
import "../App.css";
import { ChangeEvent } from "react";
import React from "react";
import { useCallback } from "react";
import { usePostData } from "../@hooks/use-post";

export const Todo = ({ id, title, created_At, completed, content }: Itodo) => {
    const date = new Date(created_At).toDateString();
    const handleCompleted = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            try {
                const response = await fetch("http://localhost/api/todos", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: id, completed: !completed }),
                    method: "PUT",
                });
                if (response.ok) {
                    console.log(response);
                }
            } catch (error: any) {
                console.log(error);
            }
        },
        [id, title, content, completed],
    );

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const { isSuccessful } = usePostData(
                "http://localhost/api/todos",
                id,
                "DELETE",
            );
            if (isSuccessful) {
                console.log("fuck you ");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div key={id} className="todo-card">
            <div className="flex gap-2 justify-between">
                <span>{date} </span>
                <div className="action-buttons  gap-2">
                    <button onClick={handleCompleted} className="button-check">
                        <CheckCheck color="whitesmoke" size={15} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="button-trash w-sm"
                    >
                        <Trash2 color="red" size={15} />
                    </button>
                </div>
            </div>

            <span>{title} </span>
            <span className={completed ? "completed" : ""}>{content}</span>
        </div>
    );
};
