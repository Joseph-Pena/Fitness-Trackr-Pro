import { useState, useEffect } from "react";

import { getActivities } from "../api/activities";
import { addRoutineActivity } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function SetForm({ routineId, syncRoutine }) {
    const { token } = useAuth();
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            const data = await getActivities();
            setActivities(data);
        };
        load();
    }, []);

    const tryAddSet = async (FormData) => {
        setError(null);
        const activityId = FormData.get("activityId");
        const count = FormData.get("count");
        try {
            await addRoutineActivity(token, routineId, { activityId, count, duration: 1 });
            syncRoutine();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <>
            <h2>Add a set</h2>
            <form action={tryAddSet}>
                <label>
                    Activity
                    <select name="activityId">
                        {activities.map((activity) => (
                            <option key={activity.id} value={activity.id}>
                                {activity.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Count
                    <input type="number" name="count" min="1" required />
                </label>
                <button>Add set</button>
            </form>
            {error && <p role="alert">{error}</p>}
        </>
    );
}