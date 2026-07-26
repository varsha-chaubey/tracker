import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import booImg from "../../public/hey.png";
import NavBar from "./NavBar";
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');`;

const TARGET_SECONDS = 5 * 60 * 60; // 5 hours

const CATEGORY_STYLES = {
  Backend: { color: "#5EC8B8", label: "Backend" },
  Database: { color: "#F2A93B", label: "Database" },
  "System Design": { color: "#B489F2", label: "System Design" },
  Testing: { color: "#F27A66", label: "Testing" },
  Interview: { color: "#E8E6E0", label: "Interview Prep" },
};

const ROADMAP = [
  { day: 1, week: 1, category: "Backend", title: "Node Core Fundamentals", topics: ["Node architecture: V8 + libuv", "CommonJS vs ESM", "npm/package.json & semver deep dive", "fs module & path module", "Build an EventEmitter from scratch", "DSA: 2 problems"] },
  { day: 2, week: 1, category: "Backend", title: "Async Node, Deeply", topics: ["Callbacks -> callback hell", "Promises internals & chaining", "async/await + error handling patterns", "Event loop phases (timers/poll/check)", "Microtask vs macrotask queue examples", "Build a small async file-processing script", "DSA: 2 problems"] },
  { day: 3, week: 1, category: "Backend", title: "Express: Basics -> Intermediate", topics: ["Routing & req/res lifecycle", "Built-in / third-party / custom middleware", "Modular routers", "Error-handling middleware", "Request validation (zod/express-validator)", "Build a full CRUD API", "DSA: 2 problems"] },
  { day: 4, week: 1, category: "Backend", title: "Authentication, Properly", topics: ["Password hashing (bcrypt) & salting", "JWT structure/signing/verification/refresh tokens", "Session vs token-based auth", "OAuth 2.0 flow (auth code + PKCE)", "Role-based access control", "Build a complete auth system", "DSA: 2 problems"] },
  { day: 5, week: 1, category: "Backend", title: "Advanced Express & Node", topics: ["File uploads (multer) & streaming", "Rate limiting, helmet, CORS deep dive", "Response caching & ETags", "Clustering & worker threads", "Secrets/env config management", "Add rate limiting + uploads to your API", "DSA: 2 problems"] },
  { day: 6, week: 1, category: "Backend", title: "Docs, Logging, Deployment", topics: ["API docs (Swagger/OpenAPI)", "Logging (winston/pino) & monitoring basics", "Dockerize a Node app", "Deploy to Render/Railway with basic CI/CD", "DSA: 2 problems"] },
  { day: 7, week: 1, category: "Interview", title: "Build Day + Mock #1", topics: ["Ship one complete production backend end-to-end", "Push to GitHub with a real README", "1 backend mock interview", "1 hard DSA problem"] },

  { day: 8, week: 2, category: "Database", title: "SQL Core", topics: ["Joins (inner/outer/self), constraints, keys", "Transactions basics", "Write 15 queries on a sample schema", "DSA: 2 problems"] },
  { day: 9, week: 2, category: "Database", title: "Query Optimization", topics: ["Indexes (B-tree, composite)", "EXPLAIN/ANALYZE plans", "The N+1 query problem", "Optimize a slow query from a real project", "DSA: 2 problems"] },
  { day: 10, week: 2, category: "Database", title: "Schema Design", topics: ["Normal forms 1NF-3NF", "When to denormalize", "Design a schema for a healthcare-style app", "DSA: 2 problems"] },
  { day: 11, week: 2, category: "Database", title: "MongoDB Deep Dive", topics: ["Aggregation pipeline stages, $lookup", "Indexing strategy in Mongo", "Write 8 aggregation queries", "DSA: 2 problems"] },
  { day: 12, week: 2, category: "Database", title: "Transactions & Consistency", topics: ["ACID vs BASE", "Transactions in MySQL vs MongoDB", "Handling a failed payment transaction", "DSA: 2 problems"] },
  { day: 13, week: 2, category: "Database", title: "DB Build Day", topics: ["Add a real DB-heavy feature to a project", "Document 3 DB decisions and why", "DSA: 2 problems"] },
  { day: 14, week: 2, category: "Interview", title: "Revise + Mock #2", topics: ["Full Week 2 revision", "1 DB-design mock interview", "1 hard DSA problem"] },

  { day: 15, week: 3, category: "System Design", title: "HLD Foundations", topics: ["Scalability, load balancing, CAP theorem", "Vertical vs horizontal scaling", "Sketch a load-balanced architecture", "DSA: 2 problems"] },
  { day: 16, week: 3, category: "System Design", title: "Caching", topics: ["Redis, CDN, cache invalidation", "Write-through vs write-back", "Find caching opportunities in your own projects", "DSA: 2 problems"] },
  { day: 17, week: 3, category: "System Design", title: "Message Queues & Event-Driven Systems", topics: ["Kafka/RabbitMQ basics, pub-sub", "Map this to your WebSocket experience", "When to queue vs call directly", "DSA: 2 problems"] },
  { day: 18, week: 3, category: "System Design", title: "Practice HLD: URL Shortener", topics: ["Full design on paper", "Write it as an interview answer with tradeoffs", "DSA: 2 problems"] },
  { day: 19, week: 3, category: "System Design", title: "Practice HLD: Real-Time Chat App", topics: ["Design leveraging your WebRTC background", "Explain what makes it scale to 1000+ users", "DSA: 2 problems"] },
  { day: 20, week: 3, category: "System Design", title: "Practice HLD + LLD: Notification System", topics: ["Design a notification system", "1 LLD exercise (parking lot / rate limiter)", "DSA: 2 problems"] },
  { day: 21, week: 3, category: "Interview", title: "Mock #3: Full System Design Round", topics: ["45-min mock, no notes", "Revise weak points", "1 DSA problem"] },

  { day: 22, week: 4, category: "Testing", title: "Unit Testing", topics: ["Jest mocking, spies, snapshot gotchas", "Write real unit tests for one component", "1 DSA problem"] },
  { day: 23, week: 4, category: "Testing", title: "Integration Testing", topics: ["Supertest for API testing", "Write integration tests for your backend project", "1 DSA problem"] },
  { day: 24, week: 4, category: "Testing", title: "E2E Testing", topics: ["Cypress or Playwright basics", "Write one full E2E flow", "1 DSA problem"] },
  { day: 25, week: 4, category: "Interview", title: "Behavioral Prep", topics: ["5 STAR stories: leadership, conflict, failure, scale, debugging", "1 DSA problem"] },
  { day: 26, week: 4, category: "Interview", title: "Resume, LinkedIn, Portfolio Polish", topics: ["Add everything built this month", "Tailor resume per target company", "1 DSA problem"] },
  { day: 27, week: 4, category: "Interview", title: "Full Mock Loop", topics: ["DSA round", "System Design round", "Backend/DB round", "Note the weakest one honestly"] },
  { day: 28, week: 4, category: "Interview", title: "Gap Review", topics: ["Full day only on your weakest area from Day 27"] },
  { day: 29, week: 4, category: "Interview", title: "Start Applying Hard", topics: ["10-15 tailored applications", "Set up an interview tracker sheet", "Message 2 referrals", "1 DSA problem"] },
  { day: 30, week: 4, category: "Interview", title: "Final Revision + Apply", topics: ["Revise all 4 weeks end to end", "10-15 more applications", "Reflect on what you're proudest of"] },
];

const STORAGE_KEY = "study-tracker-v2";

// server running point.
const API_BASE = "http://localhost:5000";
const PROGRESS_URL = `${API_BASE}/api/progress/${STORAGE_KEY}`;

function emptyState() {
  const days = {};
  ROADMAP.forEach((d) => {
    days[d.day] = {
      sessions: [],
      topics: d.topics.map((t, i) => ({ id: `p${i}`, text: t, done: false, custom: false })),
    };
  });
  return { active: null, days };
}

function fmtHMS(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function fmtClock(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function fmtDuration(seconds) {
  const s = Math.max(0, Math.round(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

export default function App() {
  const [state, setState] = useState(emptyState());
  const [selectedDay, setSelectedDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState("idle");
  const [newTopicText, setNewTopicText] = useState("");
  const [, forceTick] = useState(0);
  const saveTimer = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(PROGRESS_URL);
        if (!res.ok) throw new Error("Failed to fetch progress");
        const result = await res.json();
        if (!cancelled && result && result.data) {
          const base = emptyState();
          setState({
            active: result.data.active || null,
            days: { ...base.days, ...result.data.days },
          });
        }
      } catch (e) {
        console.error("Could not load saved progress — is the backend running?", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // live tick while a session is active, so timers visually update every second
  useEffect(() => {
    if (!state.active) return;
    const id = setInterval(() => forceTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [state.active]);

  const persist = useCallback((next) => {
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(PROGRESS_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: next }),
        });
        if (!res.ok) throw new Error("Save failed");
        setSaveState("saved");
      } catch (e) {
        console.error("Could not save progress — is the backend running?", e);
        setSaveState("error");
      }
    }, 250);
  }, []);

  const updateState = (updater) => {
    setState((prev) => {
      const next = updater(prev);
      persist(next);
      return next;
    });
  };

  const startSession = () => {
    updateState((prev) => {
      if (prev.active) return prev; // already running somewhere
      return { ...prev, active: { day: selectedDay, start: Date.now() } };
    });
  };

  const stopSession = () => {
    updateState((prev) => {
      if (!prev.active) return prev;
      const { day, start } = prev.active;
      const dayData = prev.days[day];
      const sessions = [...dayData.sessions, { start, end: Date.now() }];
      return {
        ...prev,
        active: null,
        days: { ...prev.days, [day]: { ...dayData, sessions } },
      };
    });
  };

  const toggleTopic = (day, id) => {
    updateState((prev) => {
      const dayData = prev.days[day];
      const topics = dayData.topics.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      return { ...prev, days: { ...prev.days, [day]: { ...dayData, topics } } };
    });
  };

  const addCustomTopic = (day, text) => {
    if (!text.trim()) return;
    updateState((prev) => {
      const dayData = prev.days[day];
      const id = `c${Date.now()}`;
      const topics = [...dayData.topics, { id, text: text.trim(), done: false, custom: true }];
      return { ...prev, days: { ...prev.days, [day]: { ...dayData, topics } } };
    });
  };

  const removeTopic = (day, id) => {
    updateState((prev) => {
      const dayData = prev.days[day];
      const topics = dayData.topics.filter((t) => t.id !== id);
      return { ...prev, days: { ...prev.days, [day]: { ...dayData, topics } } };
    });
  };

  const resetAll = () => {
    const fresh = emptyState();
    setState(fresh);
    persist(fresh);
  };

  const dayStudySeconds = (day) => {
    const dayData = state.days[day];
    if (!dayData) return 0;
    let total = dayData.sessions.reduce((sum, s) => sum + (s.end - s.start) / 1000, 0);
    if (state.active && state.active.day === day) {
      total += (Date.now() - state.active.start) / 1000;
    }
    return total;
  };

  const dayStatus = (day) => {
    const secs = dayStudySeconds(day);
    if (secs <= 0) return "empty";
    if (secs >= TARGET_SECONDS) return "green";
    return "red";
  };

  const overallStats = useMemo(() => {
    let greenDays = 0;
    let totalHours = 0;
    let streak = 0;
    let streakBroken = false;
    for (let i = ROADMAP.length - 1; i >= 0; i--) {
      const day = ROADMAP[i].day;
      const status = dayStatus(day);
      if (status === "green" && !streakBroken) streak++;
      else if (day <= selectedDay) streakBroken = true;
    }
    ROADMAP.forEach((d) => {
      const secs = dayStudySeconds(d.day);
      totalHours += secs / 3600;
      if (secs >= TARGET_SECONDS) greenDays++;
    });
    return { greenDays, totalHours, streak };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const current = ROADMAP.find((d) => d.day === selectedDay);
  const currentData = state.days[selectedDay] || { sessions: [], topics: [] };
  const secondsToday = dayStudySeconds(selectedDay);
  const isRunningToday = state.active && state.active.day === selectedDay;
  const isRunningElsewhere = state.active && state.active.day !== selectedDay;
  const pct = Math.min(100, (secondsToday / TARGET_SECONDS) * 100);
  const remaining = TARGET_SECONDS - secondsToday;
  const topicsDone = currentData.topics.filter((t) => t.done).length;

  if (loading) {
    return (
      <div style={{ paddingTop: "150px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <style>{FONT_IMPORT}</style>
        <div style={{ color: "#8A93A6", fontFamily: "'JetBrains Mono', monospace" }}>
         <h1 style={{textAlign:"center"}}>Waking Up....</h1>
          <img src={booImg} alt="loading" style={{textAlign:"center"}}/>   
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <style>{FONT_IMPORT}</style>
      <header style={styles.header}>
        <div>
          <div style={styles.eyebrow}>30-DAY BUILD LOG</div>
          <h1 style={styles.h1}>Time Ghost👻</h1>
        </div>

        <NavBar />
        <div style={styles.statRow}>
          <Stat label="Green days" value={`${overallStats.greenDays}/30`} />
          <Stat label="Streak" value={`${overallStats.streak}d`} />
          <Stat label="Total hours" value={`${overallStats.totalHours.toFixed(1)}h`} />
        </div>
      </header>

      <div style={styles.legend}>
        <LegendDot color="#5FD68C" label="5h+ complete" />
        <LegendDot color="#F2646C" label="Under 5h" />
        <LegendDot color="#1D222E" label="Not started" />
      </div>

      <div style={styles.grid}>
        {ROADMAP.map((d) => {
          const status = dayStatus(d.day);
          const isSelected = d.day === selectedDay;
          const bg = status === "green" ? "#5FD68C" : status === "red" ? "#F2646C" : "#1D222E";
          const textColor = status === "empty" ? "#8A93A6" : "#12151C";
          return (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              style={{
                ...styles.cell,
                background: bg,
                border: isSelected ? "2px solid #E8E6E0" : "2px solid transparent",
              }}
              title={`Day ${d.day}: ${d.title} — ${fmtDuration(dayStudySeconds(d.day))}`}
            >
              <span style={{ ...styles.cellNum, color: textColor }}>{d.day}</span>
            </button>
          );
        })}
      </div>

      {current && (
        <div style={styles.detailPanel}>
          <div style={styles.detailHeader}>
            <div>
              <div style={{ ...styles.eyebrow, color: CATEGORY_STYLES[current.category].color }}>
                WEEK {current.week} &middot; DAY {current.day} &middot; {CATEGORY_STYLES[current.category].label.toUpperCase()}
              </div>
              <h2 style={styles.h2}>{current.title}</h2>
            </div>
            <div style={styles.navButtons}>
              <button style={styles.navBtn} onClick={() => setSelectedDay((d) => Math.max(1, d - 1))} disabled={selectedDay === 1}>&larr;</button>
              <button style={styles.navBtn} onClick={() => setSelectedDay((d) => Math.min(30, d + 1))} disabled={selectedDay === 30}>&rarr;</button>
            </div>
          </div>

          {/* Timer block */}
          <div style={styles.timerBlock}>
            <div style={styles.timerBarTrack}>
              <div style={{ ...styles.timerBarFill, width: `${pct}%`, background: secondsToday >= TARGET_SECONDS ? "#5FD68C" : "#F2A93B" }} />
            </div>
            <div style={styles.timerRow}>
              <div>
                <div style={styles.timerValue}>{fmtHMS(secondsToday)} <span style={styles.timerTarget}>/ 05:00:00</span></div>
                <div style={styles.timerSub}>
                  {secondsToday >= TARGET_SECONDS
                    ? "Target complete for today 🎯"
                    : `${fmtDuration(remaining)} left to hit today's target`}
                </div>
              </div>
              <div>
                {isRunningToday ? (
                  <button style={{ ...styles.timerBtn, background: "#F2646C" }} onClick={stopSession}>Take a Break</button>
                ) : (
                  <button
                    style={{ ...styles.timerBtn, background: isRunningElsewhere ? "#3A4152" : "#5EC8B8", cursor: isRunningElsewhere ? "not-allowed" : "pointer" }}
                    onClick={startSession}
                    disabled={isRunningElsewhere}
                  >
                    {isRunningElsewhere ? `Day ${state.active.day} running...` : "Start Studying"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Session log */}
          <div style={styles.sectionLabel}>Today's sessions</div>
          <div style={styles.sessionLog}>
            {currentData.sessions.length === 0 && !isRunningToday && (
              <div style={styles.emptyNote}>No sessions yet — hit "Start Studying" when you sit down.</div>
            )}
            {currentData.sessions.map((s, idx) => {
              const prevEnd = idx > 0 ? currentData.sessions[idx - 1].end : null;
              const gap = prevEnd ? (s.start - prevEnd) / 1000 : null;
              return (
                <React.Fragment key={idx}>
                  {gap !== null && gap > 1 && (
                    <div style={styles.gapRow}>break: {fmtDuration(gap)}</div>
                  )}
                  <div style={styles.sessionRow}>
                    <span>{fmtClock(s.start)} &rarr; {fmtClock(s.end)}</span>
                    <span style={styles.sessionDuration}>{fmtDuration((s.end - s.start) / 1000)}</span>
                  </div>
                </React.Fragment>
              );
            })}
            {isRunningToday && (
              <div style={{ ...styles.sessionRow, color: "#5EC8B8" }}>
                <span>{fmtClock(state.active.start)} &rarr; now (running)</span>
                <span style={styles.sessionDuration}>live</span>
              </div>
            )}
          </div>

          {/* Topics checklist */}
          <div style={styles.sectionLabel}>Today's topics ({topicsDone}/{currentData.topics.length})</div>
          <div style={styles.taskList}>
            {currentData.topics.map((t) => (
              <div key={t.id} style={styles.taskRow}>
                <label style={styles.taskLabel}>
                  <input type="checkbox" checked={t.done} onChange={() => toggleTopic(selectedDay, t.id)} style={styles.checkbox} />
                  <span style={{ ...styles.taskText, textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.5 : 1 }}>{t.text}</span>
                </label>
                {t.custom && (
                  <button style={styles.removeBtn} onClick={() => removeTopic(selectedDay, t.id)}>&times;</button>
                )}
              </div>
            ))}
          </div>

          <div style={styles.addTopicRow}>
            <input
              type="text"
              value={newTopicText}
              onChange={(e) => setNewTopicText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addCustomTopic(selectedDay, newTopicText);
                  setNewTopicText("");
                }
              }}
              placeholder="Add your own topic for today..."
              style={styles.addTopicInput}
            />
            <button
              style={styles.addTopicBtn}
              onClick={() => { addCustomTopic(selectedDay, newTopicText); setNewTopicText(""); }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <span style={styles.saveIndicator}>{saveState === "saving" ? "saving..." : saveState === "error" ? "save failed" : "saved"}</span>
        <button style={styles.resetBtn} onClick={resetAll}>Reset all progress</button>
      </footer>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={styles.statBox}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div style={styles.legendItem}>
      <span style={{ ...styles.dot, background: color }} />
      <span style={styles.legendLabel}>{label}</span>
    </div>
  );
}

const styles = {
  wrap: { fontFamily: "'Space Grotesk', sans-serif", background: "#12151C", color: "#E8E6E0", padding: "28px 24px 40px", minHeight: "600px", borderRadius: "12px", boxSizing: "border-box" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "18px" },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1.5px", color: "#8A93A6", marginBottom: "6px" },
  h1: { fontSize: "26px", margin: 0, fontWeight: 700, letterSpacing: "-0.5px" },
  h2: { fontSize: "20px", margin: "2px 0 0", fontWeight: 600 },
  statRow: { display: "flex", gap: "10px" },
  statBox: { background: "#1A1F2B", padding: "8px 14px", borderRadius: "8px", minWidth: "84px", textAlign: "center" },
  statValue: { fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 700, color: "#F2A93B" },
  statLabel: { fontSize: "10px", color: "#8A93A6", marginTop: "2px", letterSpacing: "0.4px" },
  legend: { display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "12px" },
  legendItem: { display: "flex", alignItems: "center", gap: "6px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", display: "inline-block" },
  legendLabel: { fontSize: "11px", color: "#8A93A6" },
  grid: { display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "6px", marginBottom: "24px" },
  cell: { aspectRatio: "1", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  cellNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700 },
  detailPanel: { background: "#1A1F2B", borderRadius: "10px", padding: "20px 22px" },
  detailHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" },
  navButtons: { display: "flex", gap: "8px" },
  navBtn: { background: "#242A38", border: "none", color: "#E8E6E0", width: "32px", height: "32px", borderRadius: "6px", cursor: "pointer", fontSize: "14px" },
  timerBlock: { background: "#12151C", borderRadius: "10px", padding: "16px 18px", marginBottom: "20px" },
  timerBarTrack: { width: "100%", height: "6px", background: "#242A38", borderRadius: "4px", overflow: "hidden", marginBottom: "14px" },
  timerBarFill: { height: "100%", transition: "width 0.4s ease" },
  timerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" },
  timerValue: { fontFamily: "'JetBrains Mono', monospace", fontSize: "26px", fontWeight: 700 },
  timerTarget: { fontSize: "16px", color: "#8A93A6", fontWeight: 500 },
  timerSub: { fontSize: "12px", color: "#8A93A6", marginTop: "4px" },
  timerBtn: { border: "none", color: "#12151C", fontWeight: 700, padding: "12px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
  sectionLabel: { fontSize: "11px", color: "#8A93A6", letterSpacing: "0.5px", marginBottom: "8px", marginTop: "18px", textTransform: "uppercase" },
  sessionLog: { display: "flex", flexDirection: "column", gap: "4px", marginBottom: "6px" },
  sessionRow: { display: "flex", justifyContent: "space-between", background: "#12151C", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" },
  sessionDuration: { color: "#5EC8B8" },
  gapRow: { fontSize: "11px", color: "#8A93A6", fontFamily: "'JetBrains Mono', monospace", padding: "2px 12px" },
  emptyNote: { fontSize: "12px", color: "#8A93A6", fontStyle: "italic", padding: "8px 0" },
  taskList: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" },
  taskRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" },
  taskLabel: { display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", flex: 1 },
  checkbox: { marginTop: "3px", width: "16px", height: "16px", accentColor: "#F2A93B", cursor: "pointer" },
  taskText: { fontSize: "14px", lineHeight: "1.5" },
  removeBtn: { background: "transparent", border: "none", color: "#8A93A6", cursor: "pointer", fontSize: "16px", lineHeight: 1 },
  addTopicRow: { display: "flex", gap: "8px", marginTop: "6px" },
  addTopicInput: { flex: 1, background: "#12151C", border: "1px solid #2A3140", borderRadius: "8px", color: "#E8E6E0", padding: "10px 12px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", boxSizing: "border-box" },
  addTopicBtn: { background: "#242A38", border: "none", color: "#E8E6E0", padding: "0 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" },
  saveIndicator: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#5EC8B8" },
  resetBtn: { background: "transparent", border: "1px solid #2A3140", color: "#8A93A6", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" },
};
