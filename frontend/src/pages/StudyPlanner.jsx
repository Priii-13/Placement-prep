import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { getGoals, saveGoal, deleteGoal } from "@/lib/storage";

import { Plus, Trash2, Target, Calendar } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function StudyPlanner() {
  const [goals, setGoals] = useState(getGoals);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) {toast.error("Enter a goal title");return;}
    const updated = saveGoal({
      title: newTitle.trim(),
      targetDate: newDate || new Date().toISOString().split("T")[0],
      completed: false
    });
    setGoals(updated);
    setNewTitle("");
    setNewDate("");
    toast.success("Goal added");
  };

  const handleToggle = (goal) => {
    const updated = saveGoal({ ...goal, completed: !goal.completed });
    setGoals(updated);
  };

  const handleDelete = (id) => {
    const updated = deleteGoal(id);
    setGoals(updated);
    toast.success("Goal removed");
  };

  const today = new Date().toISOString().split("T")[0];
  const todayGoals = goals.filter((g) => g.targetDate === today);
  const upcomingGoals = goals.filter((g) => g.targetDate > today);
  const pastGoals = goals.filter((g) => g.targetDate < today);

  const completionRate = goals.length ? Math.round(goals.filter((g) => g.completed).length / goals.length * 100) : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-3xl font-bold">Study Planner</h1>
        <p className="text-muted-foreground mt-1">Schedule and track your daily goals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass"><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold font-display text-primary">{goals.length}</p>
          <p className="text-xs text-muted-foreground">Total Goals</p>
        </CardContent></Card>
        <Card className="glass"><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold font-display text-success">{goals.filter((g) => g.completed).length}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </CardContent></Card>
        <Card className="glass"><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold font-display text-accent">{completionRate}%</p>
          <p className="text-xs text-muted-foreground">Rate</p>
        </CardContent></Card>
      </div>

      {/* Add Goal */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Goal title (e.g., Solve 5 DP problems)" className="flex-1" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
            <Input type="date" className="w-40" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <Button onClick={handleAdd} className="gradient-primary text-white border-0"><Plus size={16} className="mr-1" /> Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Today */}
      {todayGoals.length > 0 &&
      <div>
          <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Today</h2>
          <div className="space-y-2">
            {todayGoals.map((g) =>
          <GoalItem key={g.id} goal={g} onToggle={handleToggle} onDelete={handleDelete} />
          )}
          </div>
        </div>
      }

      {/* Upcoming */}
      {upcomingGoals.length > 0 &&
      <div>
          <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> Upcoming</h2>
          <div className="space-y-2">
            {upcomingGoals.map((g) =>
          <GoalItem key={g.id} goal={g} onToggle={handleToggle} onDelete={handleDelete} />
          )}
          </div>
        </div>
      }

      {/* Past */}
      {pastGoals.length > 0 &&
      <div>
          <h2 className="font-display text-lg font-semibold mb-3 text-muted-foreground">Past</h2>
          <div className="space-y-2">
            {pastGoals.map((g) =>
          <GoalItem key={g.id} goal={g} onToggle={handleToggle} onDelete={handleDelete} />
          )}
          </div>
        </div>
      }

      {goals.length === 0 &&
      <p className="text-center text-muted-foreground py-8">No goals yet. Add your first study goal above!</p>
      }
    </div>);

}

function GoalItem({ goal, onToggle, onDelete }) {
  return (
    <Card className={cn("glass transition-all", goal.completed && "border-success/30 bg-success/5")}>
      <CardContent className="p-4 flex items-center gap-4">
        <Checkbox checked={goal.completed} onCheckedChange={() => onToggle(goal)} />
        <div className="flex-1">
          <p className={cn("text-sm font-medium", goal.completed && "line-through text-muted-foreground")}>{goal.title}</p>
          <p className="text-[10px] text-muted-foreground">{goal.targetDate}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onDelete(goal.id)}><Trash2 size={14} /></Button>
      </CardContent>
    </Card>);

}