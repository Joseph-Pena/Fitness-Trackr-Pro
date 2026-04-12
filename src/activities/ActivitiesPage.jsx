import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";
import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);

  const syncActivites = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivites();
  }, []);

  return (
    <>
      <h1>Activities</h1>
      <ActivityList activities={activities} />
      <ActivityForm syncActivities={syncActivites} />
    </>
  )
}