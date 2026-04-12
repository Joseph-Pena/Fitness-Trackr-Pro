import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getActivity, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getActivity(id);
      setActivity(data);
    };
    load();
  }, [id]);

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteActivity(token, id);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!activity) return <p>Loading... </p>;

  return (
    <>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Posted by: {activity.creator?.username}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </>
  );
}
