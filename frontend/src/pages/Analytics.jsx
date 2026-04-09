import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROBLEMS, TOPICS } from "@/lib/data";
import { getProgress } from "@/lib/storage";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line } from
"recharts";

const COLORS = [
"hsl(250, 80%, 60%)", "hsl(170, 60%, 45%)", "hsl(38, 90%, 55%)",
"hsl(0, 72%, 55%)", "hsl(280, 65%, 60%)", "hsl(200, 70%, 50%)"];


export default function Analytics() {
  const progress = getProgress();
  const solvedIds = new Set(progress.filter((p) => p.solved).map((p) => p.problemId));

  const topicData = useMemo(() =>
  TOPICS.map((t) => {
    const problems = PROBLEMS.filter((p) => p.topicId === t.id);
    return { name: t.name, solved: problems.filter((p) => solvedIds.has(p.id)).length, total: problems.length };
  }),
  [progress]
  );

  const diffData = useMemo(() => {
    const groups = { Easy: 0, Medium: 0, Hard: 0, "Easy Total": 0, "Medium Total": 0, "Hard Total": 0 };
    PROBLEMS.forEach((p) => {
      groups[`${p.difficulty} Total`]++;
      if (solvedIds.has(p.id)) groups[p.difficulty]++;
    });
    return [
    { name: "Easy", solved: groups.Easy, total: groups["Easy Total"] },
    { name: "Medium", solved: groups.Medium, total: groups["Medium Total"] },
    { name: "Hard", solved: groups.Hard, total: groups["Hard Total"] }];

  }, [progress]);

  const pieData = useMemo(() =>
  TOPICS.map((t) => ({
    name: t.name,
    value: PROBLEMS.filter((p) => p.topicId === t.id && solvedIds.has(p.id)).length
  })).filter((d) => d.value > 0),
  [progress]
  );

  // Weekly activity (last 7 days)
  const weeklyData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split("T")[0];
      const dayLabel = d.toLocaleDateString("en", { weekday: "short" });
      const count = progress.filter((p) => p.solved && p.solvedAt?.startsWith(dateStr)).length;
      days.push({ day: dayLabel, count });
    }
    return days;
  }, [progress]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-display text-3xl font-bold">Progress Analytics</h1>
        <p className="text-muted-foreground mt-1">Visualize your preparation journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="glass">
          <CardHeader><CardTitle className="font-display text-lg">Weekly Activity</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Distribution Pie */}
        <Card className="glass">
          <CardHeader><CardTitle className="font-display text-lg">Solved by Topic</CardTitle></CardHeader>
          <CardContent>
            {pieData.length === 0 ?
            <p className="text-center text-muted-foreground py-12">Solve some problems to see the chart</p> :

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            }
          </CardContent>
        </Card>

        {/* Difficulty Distribution */}
        <Card className="glass">
          <CardHeader><CardTitle className="font-display text-lg">Difficulty Breakdown</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={diffData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="solved" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic-wise Bar */}
        <Card className="glass">
          <CardHeader><CardTitle className="font-display text-lg">All Topics Overview</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topicData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={100} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="solved" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>);

}