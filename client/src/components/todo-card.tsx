import { Itodo } from "./add-todo";
import { CheckCheck, Trash2 } from "lucide-react";
import { ChangeEvent, memo } from "react";
import React from "react";
import { useCallback } from "react";

export const Todo = React.memo(
    ({ id, title, created_At, completed, content }: Itodo) => {
        const date = new Date(created_At).toDateString();
        const handleCompleted = useCallback(
            async (e: React.MouseEvent<HTMLButtonElement>) => {
                try {
                    const response = await fetch(
                        `http://localhost/api/todos/${id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: id,
                                completed: !completed,
                            }),
                            method: "PUT",
                        },
                    );
                    if (response.ok) {
                        console.log(response);
                    }
                } catch (error: any) {
                    console.log(error);
                }
            },
            [id, title, content, completed],
        );

        const handleDelete = useCallback(
            async (e: React.MouseEvent<HTMLButtonElement>) => {
                try {
                    const response = await fetch(
                        `http://localhost/api/todos/${id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "DELETE",
                        },
                    );
                    if (response.ok) {
                        console.log(response);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            [id, title, content, completed],
        );
        return (
            <div key={id} className="todo-card">
                <div className="todo-top">
                    <span>{date} </span>
                    <div className="action-buttons  gap-2">
                        <button
                            onClick={handleCompleted}
                            className="button-check"
                        >
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
    },
);
