const API = import.meta.env.VITE_API;

export async function getRoutines() {
  try {
    const response = await fetch(API + "/routines");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getRoutine(id) {
  try {
    const response = await fetch(API + "/routines/" + id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createRoutine(token, routine) {
  if (!token) throw Error("You must be signed in to create a routine.");

  const response = await fetch(API + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteRoutine(token, id) {
  if (!token) throw Error("You must be signed in to delete a routine.");

  const response = await fetch(API + "/routines/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function addRoutineActivity(token, routineId, set) {
  if (!token) throw Error("You must be signed in to add a set.");

  const response = await fetch(API + "/routines/" + routineId + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(set),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteRoutineActivity(token, routineActivityId) {
  if (!token) throw Error("You must be signed in to remove a set.");

  const response = await fetch(API + "/routine_activities/" + routineActivityId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token},
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}