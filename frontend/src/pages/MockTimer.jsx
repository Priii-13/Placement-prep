import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Timer, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROBLEMS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const difficultyColors = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Hard: "bg-destructive/10 text-destructive border-destructive/20"
};

const PRESETS = [
{ label: "30 min", seconds: 30 * 60 },
{ label: "45 min", seconds: 45 * 60 },
{ label: "60 min", seconds: 60 * 60 },
{ label: "90 min", seconds: 90 * 60 }];


export default function MockTimer() {
  const [totalSeconds, setTotalSeconds] = useState(45 * 60);
  const [remaining, setRemaining] = useState(45 * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [sessionCompleted, setSessionCompleted] = useState(new Set());
  const intervalRef = useRef(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {clearInterval(intervalRef.current);intervalRef.current = null;}
    setRunning(false);
  }, []);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            stop();
            setFinished(true);
            // Audio alert
            try {
              const ctx = new AudioContext();
              const osc = ctx.createOscillator();
              osc.connect(ctx.destination);
              osc.frequency.value = 800;
              osc.start();
              setTimeout(() => {osc.stop();ctx.close();}, 500);
            } catch {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {if (intervalRef.current) clearInterval(intervalRef.current);};
  }, [running, stop]);

  const handleStart = () => {
    setRunning(true);
    setFinished(false);
    
    if (remaining === totalSeconds && sessionQuestions.length === 0) {
      const shuffled = [...PROBLEMS].sort(() => 0.5 - Math.random());
      setSessionQuestions(shuffled.slice(0, 4));
      setSessionCompleted(new Set());
    }
  };
  const handlePause = () => stop();
  const handleReset = () => {
    stop();
    setRemaining(totalSeconds);
    setFinished(false);
    setSessionQuestions([]);
    setSessionCompleted(new Set());
  };
  const handlePreset = (seconds) => {
    stop();
    setTotalSeconds(seconds);
    setRemaining(seconds);
    setFinished(false);
    setSessionQuestions([]);
    setSessionCompleted(new Set());
  };

  const toggleProblem = (id) => {
    const next = new Set(sessionCompleted);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSessionCompleted(next);
  };

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = totalSeconds > 0 ? (totalSeconds - remaining) / totalSeconds * 100 : 0;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="font-display text-3xl font-bold">Mock Interview Timer</h1>
        <p className="text-muted-foreground mt-1">Practice under timed conditions</p>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-3 justify-center">
        {PRESETS.map((p) =>
        <Button
          key={p.label}
          variant={totalSeconds === p.seconds ? "default" : "outline"}
          onClick={() => handlePreset(p.seconds)}
          className={cn(totalSeconds === p.seconds && "gradient-primary text-white border-0")}>
          
            {p.label}
          </Button>
        )}
      </div>

      {/* Timer Display */}
      <Card className="glass">
        <CardContent className="p-8 flex flex-col items-center">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Circle progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke={finished ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                className="transition-all duration-1000" />
              
            </svg>
            <div className="text-center z-10">
              <p className={cn("font-display text-5xl font-bold tabular-nums", finished && "text-destructive animate-pulse")}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {finished ? "Time's up!" : running ? "Running" : "Ready"}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mt-6">
            {!running ?
            <Button onClick={handleStart} disabled={remaining === 0 && !finished} className="gradient-primary text-white border-0 gap-2">
                <Play size={18} /> {remaining === totalSeconds ? "Start" : "Resume"}
              </Button> :

            <Button onClick={handlePause} variant="outline" className="gap-2">
                <Pause size={18} /> Pause
              </Button>
            }
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw size={18} /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="glass">
        <CardContent className="p-5">
          <h3 className="font-display font-semibold mb-2 flex items-center gap-2"><Timer className="h-4 w-4 text-primary" /> Interview Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Read the problem carefully before coding (2-3 min)</li>
            <li>Discuss your approach and edge cases first</li>
            <li>Start with a brute force, then optimize</li>
            <li>Keep talking — explain your thought process</li>
            <li>Test with examples before submitting</li>
          </ul>
        </CardContent>
      </Card>
    </div>);

}