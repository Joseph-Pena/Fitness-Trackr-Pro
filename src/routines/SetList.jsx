import { useAuth } from "../auth/AuthContext";
import { deleteRoutineActivity } from "../api/routines";
import { useState } from "react";

export default function SetList({ sets, syncRoutine }) {
    if (!sets || sets.length === 0) {
        return <p>This routine doesn&apos;t have any sets. Add one?</p>;
    }

    return (
        <ul>
            {sets.map((set) => (
                <SetItem key={set.id} set={set} syncRoutine={syncRoutine} />
            ))}
        </ul>
    );
}

function SetItem({ set, syncRoutine }) {
    const { token } = useAuth();
    const [error, setError] = useState(null);

    const tryDelete = async () => {
        setError(null);
        try {
            await deleteRoutineActivity(token, set.id);
            syncRoutine();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <li>
            <p>{set.name} × {set.count}</p>
            {token && <button onClick={tryDelete}>Delete set</button>}
            {error && <p role="alert">{error}</p>}
        </li>
    );
}