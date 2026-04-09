import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CORE_PROBLEMS, CORE_TOPICS } from "@/lib/data";
import { getProgress, toggleProblem, updateStreak } from "@/lib/storage";
import { Search, ArrowLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoreSubjects() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [search, setSearch] = useState("");
  const [progress, setProgressState] = useState(getProgress);
  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleExpand = (id) => {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedIds(next);
  };

  const solvedIds = new Set(progress.filter((p) => p.solved).map((p) => p.problemId));

  const handleToggle = (problemId) => {
    const updated = toggleProblem(problemId);
    setProgressState(updated);
    if (updated.find((p) => p.problemId === problemId && p.solved)) {
      updateStreak();
    }
  };

  const topicStats = useMemo(() =>
  CORE_TOPICS.map((topic) => {
    const problems = CORE_PROBLEMS.filter((p) => p.topicId === topic.id);
    const solved = problems.filter((p) => solvedIds.has(p.id)).length;
    return { ...topic, total: problems.length, solved, pct: problems.length ? Math.round(solved / problems.length * 100) : 0 };
  }),
  [progress]
  );

  const filteredProblems = useMemo(() => {
    let list = selectedTopic ? CORE_PROBLEMS.filter((p) => p.topicId === selectedTopic) : CORE_PROBLEMS;
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [selectedTopic, search]);

  if (!selectedTopic) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="font-display text-3xl font-bold">Core Subjects</h1>
          <p className="text-muted-foreground mt-1">Master computer science fundamentals (OOPS, DBMS, CN, OS)</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicStats.map((t) =>
          <Card
            key={t.id}
            className="glass hover:border-primary/40 transition-all cursor-pointer group"
            onClick={() => setSelectedTopic(t.id)}>
            
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{t.icon}</span>
                  <span className="text-sm font-bold text-primary">{t.pct}%</span>
                </div>
                <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">{t.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{t.solved} of {t.total} solved</p>
                <Progress value={t.pct} className="h-2" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>);

  }

  const topic = CORE_TOPICS.find((t) => t.id === selectedTopic);
  const topicStat = topicStats.find((t) => t.id === selectedTopic);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => {setSelectedTopic(null);setSearch("");}}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold">{topic.icon} {topic.name}</h1>
          <p className="text-sm text-muted-foreground">{topicStat.solved}/{topicStat.total} solved · {topicStat.pct}%</p>
        </div>
      </div>

      <Progress value={topicStat.pct} className="h-2" />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search questions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        {filteredProblems.map((problem) =>
        <Card key={problem.id} className={cn("glass transition-all", solvedIds.has(problem.id) && "border-success/30 bg-success/5")}>
            <CardContent className="p-0">
              <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => toggleExpand(problem.id)}>
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                  checked={solvedIds.has(problem.id)}
                  onCheckedChange={() => handleToggle(problem.id)} />
                </div>
            
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", solvedIds.has(problem.id) && "line-through text-muted-foreground")}>{problem.title}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {problem.companies.slice(0, 3).map((c) =>
                  <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{c}</span>
                  )}
                  </div>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", expandedIds.has(problem.id) && "rotate-180")} />
              </div>
              
              {expandedIds.has(problem.id) && (
                <div className="px-4 pb-4 pt-0 text-sm text-foreground/90 border-t border-border/50 bg-muted/10">
                  <div className="pt-3 whitespace-pre-line leading-relaxed">
                    {problem.solution || "Solution text will be added soon."}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {filteredProblems.length === 0 &&
        <p className="text-center text-muted-foreground py-8">No questions found</p>
        }
      </div>
    </div>);

}
