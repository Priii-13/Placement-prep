import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { PROBLEMS, TOPICS } from "@/lib/data";
import { getProgress, getStreak } from "@/lib/storage";
import { CheckCircle2, Flame, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const progress = getProgress();
  const streak = getStreak();
  const solvedIds = new Set(progress.filter((p) => p.solved).map((p) => p.problemId));

  const totalSolved = solvedIds.size;
  const totalProblems = PROBLEMS.length;

  const topicStats = useMemo(() => {
    return TOPICS.map((topic) => {
      const topicProblems = PROBLEMS.filter((p) => p.topicId === topic.id);
      const solved = topicProblems.filter((p) => solvedIds.has(p.id)).length;
      const pct = topicProblems.length > 0 ? Math.round(solved / topicProblems.length * 100) : 0;
      return { ...topic, total: topicProblems.length, solved, pct };
    });
  }, [progress]);

  const weakTopics = topicStats.filter((t) => t.pct < 30 && t.total > 0);

  const chartData = topicStats.map((t) => ({
    name: t.name.length > 10 ? t.name.slice(0, 10) + "…" : t.name,
    solved: t.solved,
    total: t.total
  }));

  // Difficulty breakdown
  const difficultyStats = useMemo(() => {
    const easy = PROBLEMS.filter((p) => p.difficulty === "Easy");
    const medium = PROBLEMS.filter((p) => p.difficulty === "Medium");
    const hard = PROBLEMS.filter((p) => p.difficulty === "Hard");
    return [
    { label: "Easy", solved: easy.filter((p) => solvedIds.has(p.id)).length, total: easy.length, color: "text-success" },
    { label: "Medium", solved: medium.filter((p) => solvedIds.has(p.id)).length, total: medium.length, color: "text-warning" },
    { label: "Hard", solved: hard.filter((p) => solvedIds.has(p.id)).length, total: hard.length, color: "text-destructive" }];

  }, [progress]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold">
          Welcome back, <span className="text-primary">{user?.name?.split(" ")[0]}</span> 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's your preparation overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3"><CheckCircle2 className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold font-display">{totalSolved}</p>
                <p className="text-xs text-muted-foreground">of {totalProblems} solved</p>
              </div>
            </div>
            <Progress value={totalSolved / totalProblems * 100} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-destructive/10 p-3"><Flame className="h-5 w-5 text-destructive" /></div>
              <div>
                <p className="text-2xl font-bold font-display">{streak.current}</p>
                <p className="text-xs text-muted-foreground">day streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-accent/10 p-3"><TrendingUp className="h-5 w-5 text-accent" /></div>
              <div>
                <p className="text-2xl font-bold font-display">{Math.round(totalSolved / totalProblems * 100)}%</p>
                <p className="text-xs text-muted-foreground">completion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-warning/10 p-3"><AlertTriangle className="h-5 w-5 text-warning" /></div>
              <div>
                <p className="text-2xl font-bold font-display">{weakTopics.length}</p>
                <p className="text-xs text-muted-foreground">weak topics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Difficulty breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {difficultyStats.map((d) =>
        <Card key={d.label} className="glass">
            <CardContent className="p-4 text-center">
              <p className={`text-xl font-bold font-display ${d.color}`}>{d.solved}/{d.total}</p>
              <p className="text-xs text-muted-foreground">{d.label}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Chart + Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass lg:col-span-2">
          <CardHeader><CardTitle className="font-display text-lg">Topic-wise Progress</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} angle={-35} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="solved" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Weak Topics</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {weakTopics.length === 0 ?
            <p className="text-sm text-muted-foreground">No weak topics! Great job 🎉</p> :

            weakTopics.map((t) =>
            <div key={t.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{t.icon} {t.name}</span>
                    <span className="text-warning font-medium">{t.pct}%</span>
                  </div>
                  <Progress value={t.pct} className="h-1.5" />
                </div>
            )
            }
          </CardContent>
        </Card>
      </div>

      {/* Topic Progress Grid */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-4">All Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicStats.map((t) =>
          <Card key={t.id} className="glass hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{t.icon} <span className="text-sm font-medium">{t.name}</span></span>
                  <span className="text-xs font-medium text-muted-foreground">{t.solved}/{t.total}</span>
                </div>
                <Progress value={t.pct} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{t.pct}% complete</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>);

}