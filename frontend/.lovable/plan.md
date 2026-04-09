

# Placement Preparation Tracker

A full-featured placement prep web app using React + Tailwind + Supabase (replacing Express/MongoDB with equivalent functionality).

## Backend (Supabase)
- **Auth**: Email/password signup, login, logout via Supabase Auth
- **Database**: PostgreSQL tables with Row-Level Security
  - `profiles` — user profile data, streak info
  - `topics` — DSA topics (Arrays, Strings, DP, Graphs, Trees, etc.)
  - `problems` — pre-populated problem list (~150 curated problems across topics)
  - `user_progress` — tracks solved/unsolved per user per problem
  - `company_questions` — company-tagged questions
  - `notes` — user notes with title, content, tags
  - `study_goals` — daily/weekly planned goals

## Pages & Features

### 1. Auth Pages
- Signup, Login, Logout with form validation
- Protected routes via auth context

### 2. Dashboard
- Total problems solved / total available
- Daily streak counter (calculated from consecutive days with activity)
- Topic-wise progress bars (mini overview)
- Weekly activity heatmap/chart
- Weak topics alert (topics below 30% completion)

### 3. DSA Tracker
- Topic cards (Arrays, Strings, Linked Lists, Trees, Graphs, DP, Greedy, Backtracking, etc.)
- Click topic → see problem list with difficulty tags (Easy/Medium/Hard)
- Toggle solved/unsolved with checkbox
- Filter by difficulty, search problems
- Progress bar per topic

### 4. Company-wise Preparation
- Company list (Google, Amazon, Microsoft, Meta, etc.)
- Click company → see tagged problems
- Track completion per company

### 5. Notes Section
- Create/edit/delete notes with rich text
- Tag notes by topic
- Search notes

### 6. Progress Analytics
- Weekly/monthly solved chart (line/bar chart using Recharts)
- Topic-wise pie chart
- Difficulty distribution chart

### 7. Study Planner
- Set daily problem-solving goals
- Weekly schedule view
- Mark goals as complete

### 8. Mock Interview Timer
- Configurable countdown timer (30/45/60 min)
- Start/pause/reset controls
- Audio alert on completion

### 9. Dark/Light Mode
- Toggle in navbar, persisted to localStorage

## Design
- Modern, clean dashboard layout
- Sidebar navigation
- Responsive (mobile-friendly)
- Color-coded difficulty badges (green/yellow/red)
- Progress bars and streak fire icons for motivation

## State Management
- React Context for auth state
- TanStack Query for server data

