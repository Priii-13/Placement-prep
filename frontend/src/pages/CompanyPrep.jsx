import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PROBLEMS, COMPANIES } from "@/lib/data";
import { getProgress, toggleProblem, updateStreak } from "@/lib/storage";
import { ArrowLeft, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyColors = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Hard: "bg-destructive/10 text-destructive border-destructive/20"
};

export default function CompanyPrep() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [progress, setProgressState] = useState(getProgress);
  const solvedIds = new Set(progress.filter((p) => p.solved).map((p) => p.problemId));

  const companyStats = useMemo(() =>
  COMPANIES.map((company) => {
    const problems = PROBLEMS.filter((p) => p.companies.includes(company));
    const solved = problems.filter((p) => solvedIds.has(p.id)).length;
    return { company, total: problems.length, solved, pct: problems.length ? Math.round(solved / problems.length * 100) : 0 };
  }).sort((a, b) => b.total - a.total),
  [progress]
  );

  const handleToggle = (problemId) => {
    const updated = toggleProblem(problemId);
    setProgressState(updated);
    if (updated.find((p) => p.problemId === problemId && p.solved)) updateStreak();
  };

  if (!selectedCompany) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="font-display text-3xl font-bold">Company Preparation</h1>
          <p className="text-muted-foreground mt-1">Track problems by company</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyStats.map((c) =>
          <Card key={c.company} className="glass hover:border-primary/40 transition-all cursor-pointer" onClick={() => setSelectedCompany(c.company)}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-primary/10 p-2"><Building2 className="h-4 w-4 text-primary" /></div>
                  <h3 className="font-display font-semibold">{c.company}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{c.solved}/{c.total} solved</p>
                <Progress value={c.pct} className="h-2" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>);

  }

  const problems = PROBLEMS.filter((p) => p.companies.includes(selectedCompany));
  const stat = companyStats.find((c) => c.company === selectedCompany);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setSelectedCompany(null)}><ArrowLeft size={20} /></Button>
        <div>
          <h1 className="font-display text-2xl font-bold">{selectedCompany}</h1>
          <p className="text-sm text-muted-foreground">{stat.solved}/{stat.total} solved · {stat.pct}%</p>
        </div>
      </div>
      <Progress value={stat.pct} className="h-2" />
      <div className="space-y-2">
        {problems.map((p) =>
        <Card key={p.id} className={cn("glass transition-all", solvedIds.has(p.id) && "border-success/30 bg-success/5")}>
            <CardContent className="p-4 flex items-center gap-4">
              <Checkbox checked={solvedIds.has(p.id)} onCheckedChange={() => handleToggle(p.id)} />
              <div className="flex-1"><p className={cn("text-sm font-medium", solvedIds.has(p.id) && "line-through text-muted-foreground")}>{p.title}</p></div>
              <Badge variant="outline" className={cn("text-xs", difficultyColors[p.difficulty])}>{p.difficulty}</Badge>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

}