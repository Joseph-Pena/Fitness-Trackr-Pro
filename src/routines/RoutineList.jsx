import { NavLink } from "react-router";

export default function RoutineList({ routines }) {
    return (
        <ul>
            {routines.map((routine) => (
                <li key={routine.id}>
                    <NavLink to={`/routines/${routine.id}`}>{routine.name}</NavLink>
                </li>
            ))}
        </ul>
    );
}