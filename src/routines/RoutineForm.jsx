import { useState } from "react";
import { createRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function RoutineForm({ syncRoutines }) {
    const { token } = useAuth();
    const [error, setError] = useState(null);

    const tryCreate = async (FormData) => {
        setError(null);
        const name = FormData.get("name");
        const goal = FormData.get("goal");
        try {
            await createRoutine(token, { name, goal });
            syncRoutines();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <>
            <h2>Add a new routine</h2>
            <form action={tryCreate}>
                <label>
                    Name
                    <input type="text" name="name" required />
                </label>
                <label>
                    Goal
                    <input type="text" name="goal" required />
                </label>
                <button>Create routine</button>
            </form>
            {error && <p role="alert">{error}</p>}
        </>
    );
}