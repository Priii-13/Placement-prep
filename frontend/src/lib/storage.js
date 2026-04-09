// localStorage-based persistence layer

import { v4 } from "./uuid";

const KEYS = {
  AUTH: "ppt_auth",
  TOKEN: "ppt_auth_token",
  PROGRESS: "ppt_progress",
  NOTES: "ppt_notes",
  GOALS: "ppt_goals",
  THEME: "ppt_theme",
  STREAK: "ppt_streak"
};

// Auth






export function getUser() {
  const raw = localStorage.getItem(KEYS.AUTH);
  return raw ? JSON.parse(raw) : null;
}

export function setUser(user) {
  if (user) {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.AUTH);
  }
}

export function getToken() {
  return localStorage.getItem(KEYS.TOKEN);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(KEYS.TOKEN, token);
  } else {
    localStorage.removeItem(KEYS.TOKEN);
  }
}


// Progress
export function getProgress() {
  const raw = localStorage.getItem(KEYS.PROGRESS);
  return raw ? JSON.parse(raw) : [];
}

export function setProgress(progress) {
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
}

export function toggleProblem(problemId) {
  const progress = getProgress();
  const existing = progress.find((p) => p.problemId === problemId);
  let updated;
  if (existing) {
    if (existing.solved) {
      updated = progress.filter((p) => p.problemId !== problemId);
    } else {
      updated = progress.map((p) =>
      p.problemId === problemId ? { ...p, solved: true, solvedAt: new Date().toISOString() } : p
      );
    }
  } else {
    updated = [...progress, { problemId, solved: true, solvedAt: new Date().toISOString() }];
  }
  setProgress(updated);
  return updated;
}

// Notes
export function getNotes() {
  const raw = localStorage.getItem(KEYS.NOTES);
  return raw ? JSON.parse(raw) : [];
}

export function saveNote(note) {
  const notes = getNotes();
  const now = new Date().toISOString();
  if (note.id) {
    const updated = notes.map((n) =>
    n.id === note.id ? { ...n, ...note, updatedAt: now } : n
    );
    localStorage.setItem(KEYS.NOTES, JSON.stringify(updated));
    return updated;
  } else {
    const newNote = { ...note, id: v4(), createdAt: now, updatedAt: now };
    const updated = [newNote, ...notes];
    localStorage.setItem(KEYS.NOTES, JSON.stringify(updated));
    return updated;
  }
}

export function deleteNote(id) {
  const notes = getNotes().filter((n) => n.id !== id);
  localStorage.setItem(KEYS.NOTES, JSON.stringify(notes));
  return notes;
}

// Goals
export function getGoals() {
  const raw = localStorage.getItem(KEYS.GOALS);
  return raw ? JSON.parse(raw) : [];
}

export function saveGoal(goal) {
  const goals = getGoals();
  const now = new Date().toISOString();
  if (goal.id) {
    const updated = goals.map((g) =>
    g.id === goal.id ? { ...g, ...goal } : g
    );
    localStorage.setItem(KEYS.GOALS, JSON.stringify(updated));
    return updated;
  } else {
    const newGoal = { ...goal, id: v4(), createdAt: now };
    const updated = [...goals, newGoal];
    localStorage.setItem(KEYS.GOALS, JSON.stringify(updated));
    return updated;
  }
}

export function deleteGoal(id) {
  const goals = getGoals().filter((g) => g.id !== id);
  localStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
  return goals;
}

// Theme
export function getTheme() {
  return localStorage.getItem(KEYS.THEME) || "dark";
}

export function setTheme(theme) {
  localStorage.setItem(KEYS.THEME, theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}

// Streak
export function getStreak() {
  const raw = localStorage.getItem(KEYS.STREAK);
  return raw ? JSON.parse(raw) : { current: 0, lastDate: null };
}

export function updateStreak() {
  const streak = getStreak();
  const today = new Date().toISOString().split("T")[0];
  if (streak.lastDate === today) return streak;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const newStreak = streak.lastDate === yesterday ?
  { current: streak.current + 1, lastDate: today } :
  { current: 1, lastDate: today };
  localStorage.setItem(KEYS.STREAK, JSON.stringify(newStreak));
  return newStreak;
}