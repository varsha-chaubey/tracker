import React, { useState, useEffect, useCallback, useRef } from "react";
import NavBar from "./NavBar";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');`;

// Same backend used by the tracker — separate key so the two don't collide.
const API_BASE = "http://localhost:5000";
const STORAGE_KEY = "prepsheet-v1";
const PROGRESS_URL = `${API_BASE}/api/progress/${STORAGE_KEY}`;



const INTERVIEWS = [
  {
    id: "vapl",
    company: "Vacis Automation Pvt. Ltd. (VAPL)",
    role: "React Developer",
    rounds: [
      {
        id: "r1",
        label: "Round 1",
        sections: [
      {
        title: "A. HTML — Theory",
        questions: [
          "What is the difference between semantic and non-semantic HTML elements? Give examples.",
          "Explain the difference between <div> and <span>.",
          "What is the purpose of the alt attribute on <img>? Why does it matter for accessibility and SEO?",
          "What's the difference between localStorage, sessionStorage, and cookies?",
          "What is the difference between id and class attributes?",
          "Explain the difference between block-level and inline elements.",
          "What are data attributes (data-*) and when would you use them?",
          "What is the difference between defer and async when loading a <script> tag?",
          "How does the browser construct the DOM from HTML? What is the DOM tree?",
          "What is the difference between HTML4 and HTML5? Name a few new HTML5 elements/APIs.",
        ],
      },
      {
        title: "B. CSS — Theory",
        questions: [
          "Explain the CSS Box Model.",
          "What is the difference between flexbox and grid? When would you choose one over the other?",
          "Explain CSS specificity and how conflicting rules are resolved.",
          "What is the difference between position: relative, absolute, fixed, and sticky?",
          "What are pseudo-classes and pseudo-elements? Give examples of each.",
          "Explain the difference between em, rem, %, vh/vw, and px units.",
          "What is a media query, and how do you implement responsive design using it?",
          "What is the difference between display: none and visibility: hidden?",
          "Explain CSS specificity for inline styles, IDs, classes, and !important.",
          "What are CSS custom properties (variables), and how do you define/use them?",
        ],
      },
      {
        title: "C. JavaScript — Theory",
        questions: [
          "Explain the difference between var, let, and const.",
          "What is hoisting in JavaScript?",
          "Explain closures with an example.",
          "What is the difference between == and ===?",
          "Explain the JavaScript event loop, call stack, and task queue (microtasks vs macrotasks).",
          "What is the difference between Promise, async/await, and callbacks?",
          "Explain 'this' keyword behavior in regular functions vs arrow functions.",
          "What is event bubbling and event capturing? How do you stop propagation?",
          "What is debouncing vs throttling? When would you use each?",
          "Explain prototypal inheritance in JavaScript.",
          "What is the difference between null and undefined?",
          "What are higher-order functions? Give examples (map, filter, reduce).",
          "Explain shallow copy vs deep copy. How do you deep clone an object?",
          "What is destructuring, and how is it used with objects/arrays?",
          "What are the differences between call, apply, and bind?",
          "Explain how JavaScript's garbage collection works.",
          "What is currying in JavaScript? Give a practical example.",
          "Explain the difference between synchronous and asynchronous code execution.",
          "What are generators (function*) and how are they used?",
          "Explain memoization and how it improves performance (relevant to your useMemo/useCallback work).",
        ],
      },
      {
        title: "D. React — Theory",
        questions: [
          "Explain the Virtual DOM and reconciliation process.",
          "What is the difference between state and props?",
          "Explain the React component lifecycle (or lifecycle equivalents using hooks).",
          "What are useState and useEffect, and how do dependency arrays work?",
          "What is the difference between controlled and uncontrolled components?",
          "Explain useMemo vs useCallback — when do you use each, and why?",
          "What is React.memo and how does it prevent unnecessary re-renders?",
          "Explain the Context API. When would you use it over Redux?",
          "What is prop drilling, and how do you avoid it?",
          "Explain Redux core concepts: store, actions, reducers, middleware (Redux Toolkit specifically).",
          "What are custom hooks? Explain a use case you've built.",
          "What is the difference between useRef and useState?",
          "How does React handle keys in lists, and why are they important?",
          "Explain error boundaries in React.",
          "What is SSR vs CSR vs SSG? (ties into your Next.js SSR/ISR experience)",
          "How would you integrate Axios with React for API calls, including error handling and interceptors?",
          "How would you build a dashboard with Recharts — ResponsiveContainer, LineChart, Tooltip, etc.? (flagged gap — review docs)",
          "What are React Portals, and when would you use them?",
          "Explain code-splitting and lazy loading in React (React.lazy, Suspense).",
          "How do you optimize a React app's performance in production? Walk through your real ~40% re-render reduction work.",
        ],
      },
      {
        title: "E. Next.js — Theory",
        questions: [
          "What is the difference between SSR, SSG, ISR, and CSR in Next.js?",
          "Explain the Next.js file-based routing system.",
          "What are API routes in Next.js, and when would you use them vs a separate backend?",
          "What is getServerSideProps vs getStaticProps vs getStaticPaths?",
          "How does Next.js handle image optimization (next/image)?",
          "What is middleware in Next.js, and what are common use cases?",
          "Explain the App Router vs Pages Router in Next.js.",
          "How does Next.js handle environment variables — public vs private?",
          "How would you handle authentication (JWT/OAuth) in a Next.js app?",
          "How do you deploy a Next.js app vs a plain React SPA? (bridge into Docker talking points)",
        ],
      },
      {
        title: "F. TypeScript — Theory",
        questions: [
          "What is the difference between interface and type in TypeScript?",
          "Explain generics in TypeScript with an example.",
          "What are union types and intersection types?",
          "What is the difference between any, unknown, and never?",
          "How do you type React component props and state in TypeScript?",
          "What are utility types (Partial, Pick, Omit, Record)? Give use cases.",
          "Explain type narrowing and type guards.",
          "What is the difference between readonly and const?",
          "How do enums work in TypeScript, and when would you prefer a union type instead?",
          "How would you type a reusable component library?",
        ],
      },
      {
        title: "G. REST API / Backend-Adjacent — Theory",
        questions: [
          "What is REST, and what are its core architectural constraints?",
          "Explain the difference between PUT, PATCH, and POST.",
          "How do you handle authentication in REST APIs (JWT vs session vs OAuth 2.0)?",
          "How do you handle error responses and status codes properly in API design?",
          "What is CORS, and how do you resolve CORS issues in frontend-backend integration?",
          "How would you design pagination, filtering, and sorting for a REST API returning large datasets?",
          "What is the difference between REST and GraphQL?",
          "How do you handle race conditions or duplicate requests with Axios + React?",
          "What is an API gateway, and how does Nginx function as a reverse proxy? (flagged gap — review nginx.conf basics)",
          "How would you structure error handling and retries for WebSocket connections dropping mid-session?",
        ],
      },
      {
        title: "Gap Prep Notes (15 min review)",
        questions: [
          "Docker: basic Dockerfile for React/Next.js (multi-stage build: Node build stage + Nginx serve stage), docker-compose basics.",
          "Nginx: reverse proxy block syntax (proxy_pass, location, serving a static build).",
          "Recharts: skim LineChart, BarChart, ResponsiveContainer docs — mentioned twice in JD.",
          "Kubernetes/PostgreSQL: honest one-liner ready — 'haven't used in production yet, understand core concepts, have MongoDB/MySQL experience.'",
        ],
      },
      {
        title: "H. Machine Test — JavaScript Coding",
        questions: [
          "Write a function to flatten a deeply nested array without using Array.flat().",
          "Implement a debounce function from scratch.",
          "Implement a throttle function from scratch.",
          "Write a function to deep clone an object (without structuredClone or JSON methods).",
          "Implement a simple Promise.all polyfill.",
          "Write a function to find the first non-repeating character in a string.",
          "Implement a memoization utility function (generic, works for any function).",
          "Write code to remove duplicate values from an array of objects based on a key.",
          "Implement curry(fn) — a generic currying function.",
          "Write a function to check if two objects are deeply equal.",
        ],
      },
      {
        title: "H. Machine Test — React Coding",
        questions: [
          "Build a custom useDebounce hook and use it in a search input component.",
          "Build a paginated table component fetching from an API (mock data), with loading and error states.",
          "Fix a given buggy component that re-renders infinitely due to a useEffect dependency issue.",
          "Build a custom useFetch hook: loading, error, data states, with cleanup on unmount (abort controller).",
          "Implement an infinite scroll list using IntersectionObserver.",
          "Build a controlled multi-step form with validation, no third-party form library.",
          "Implement a simple global state manager using Context API + useReducer (mini-Redux).",
          "Build a reusable <Modal /> component using a React Portal.",
          "Optimize a given list-rendering component — apply React.memo, useMemo, useCallback correctly.",
          "Build a dashboard widget fetching via Axios, rendering in a chart, with a loading skeleton.",
        ],
      },
        ], // end Round 1 sections
      },
      {
        id: "r2",
        label: "Round 2 — Final Panel (Technical + Non-Technical)",
        sections: [
          {
            title: "Part 1 — Self Introduction (Practice Aloud, ~90 sec)",
            questions: [
              "Structure: Who you are -> strongest experience -> one standout achievement -> what you're looking for now.",
              "\"I'm a frontend-focused full-stack engineer with 4 years of experience, currently working with React.js, Next.js, and TypeScript, with a strong specialization in real-time systems — WebRTC, WebSockets, and Socket.io. Most recently, at GOC Productions, I architected a 0-to-1 real-time multiplayer platform that scaled to over 1,000 concurrent users at sub-100ms latency, using an event-driven WebSocket architecture. Before that, at NotHuman.AI, I led a team of 3-4 engineers across three concurrent production platforms in healthcare, analytics, and enterprise domains. Across my roles, I've focused heavily on performance — things like cutting re-render frequency by around 40% through memoization, and reducing API overhead by about 35% through optimized data pipelines. I'm currently looking for a role where I can bring that combination of strong frontend architecture and real-time systems experience to a growing product team.\"",
              "Adjust the \"currently working\" phrase based on what you and your recruiter have actually agreed to say about your current status — don't let the script imply something that isn't true.",
            ],
          },
          {
            title: "Part 2 — Non-Technical / Behavioral (~8-10 min)",
            questions: [
              "Walk me through your career journey — why did you move across these companies?",
              "Tell me about a time you disagreed with a teammate or manager on a technical decision. How did you handle it?",
              "You've led teams of 3-4 engineers — what's your approach to mentoring junior developers?",
              "Tell me about a production issue you had to fix under pressure. What was your process?",
              "How do you prioritize when you have multiple platforms/projects running at once? (directly relevant — you did this at NotHuman.AI)",
              "What's a mistake you made in a past project, and what did you learn from it?",
              "Why are you interested in this role/company specifically?",
              "How do you handle feedback or code review pushback on your work?",
              "Where do you see yourself in the next 2-3 years?",
              "Do you have any questions for us? (Always have 2-3 ready — e.g. \"What does the tech stack and deployment pipeline look like day-to-day?\" or \"What's the biggest technical challenge the team is currently facing?\")",
            ],
          },
          {
            title: "Part 3 — Technical: React",
            questions: [
              "Explain React's Virtual DOM and how the reconciliation algorithm works.",
              "What causes a React component to re-render? How do you prevent unnecessary re-renders? (You have a real, numbers-backed answer here — the 40% re-render reduction via memoization + Redux normalization.)",
              "Difference between useMemo, useCallback, and React.memo — when do you use each?",
              "Explain the React component lifecycle in functional components using Hooks.",
              "How does useEffect work? What are common mistakes developers make with it (missing deps, infinite loops, stale closures)?",
              "Explain Context API. When would you use it instead of Redux?",
              "What are custom Hooks? When would you create one?",
              "Explain lazy loading, Suspense, and code splitting in React.",
              "What are Error Boundaries, and how do they improve app stability?",
              "How would you optimize the performance of a large React application end-to-end?",
            ],
          },
          {
            title: "Part 4 — Technical: JavaScript",
            questions: [
              "Explain the event loop — call stack, callback queue, and microtask queue.",
              "What are closures? Give a practical use case.",
              "Difference between Promises and async/await.",
              "Explain 'this' — how does it behave differently in regular vs. arrow functions?",
              "What are debouncing and throttling? When would you use each?",
            ],
          },
          {
            title: "Part 5 — Technical: Frontend Fundamentals",
            questions: [
              "Explain the browser rendering process from HTML load to screen paint.",
              "Flexbox vs. CSS Grid — when do you choose one over the other?",
              "What is semantic HTML, and why does it matter?",
              "How do you build responsive web applications? Which techniques do you use most?",
              "What are common frontend performance optimization techniques?",
            ],
          },
          {
            title: "Part 6 — Technical: API Integration",
            questions: [
              "How do you integrate REST APIs in React using Axios?",
              "How do Axios request/response interceptors work?",
              "How do you handle API loading states, errors, and retries?",
              "How would you implement JWT-based authentication in a React app? (You've done this for real — Strapi CMS + JWT at NotHuman.AI.)",
              "How do you avoid duplicate API calls and race conditions in React?",
            ],
          },
          {
            title: "Part 7 — Data Visualization & Express.js",
            questions: [
              "How would you build responsive, interactive dashboards using Recharts? What performance considerations matter (large datasets, re-render cost)?",
              "Explain the request lifecycle in an Express.js application.",
              "How does Express middleware work? Walk through the execution flow.",
            ],
          },
          {
            title: "Part 8 — Docker",
            questions: [
              "What are Docker images vs. containers?",
              "How would you Dockerize a React application? Explain the Dockerfile and multi-stage builds.",
              "How do Docker networking and volumes work, and when would you use them?",
            ],
          },
          {
            title: "Part 9 — Nginx",
            questions: [
              "Why is Nginx commonly used with React apps?",
              "How would you configure Nginx to support React client-side routing (the try_files fallback)?",
              "Explain how Nginx works as a reverse proxy.",
            ],
          },
          {
            title: "Part 10 — Backend Fundamentals",
            questions: [
              "What makes a REST API \"RESTful\"?",
              "Difference between Authentication and Authorization.",
              "What is CORS, why does it occur, and how do you resolve it?",
              "Explain common HTTP methods and status codes.",
              "What are common techniques for securing REST APIs?",
            ],
          },
          {
            title: "Part 11 — PostgreSQL (Flagged Gap)",
            questions: [
              "Explain the different types of SQL joins with examples.",
              "What are indexes, and when should they be used?",
              "Explain database transactions and ACID properties.",
            ],
          },
          {
            title: "Part 12 — Kubernetes (Flagged Gap)",
            questions: [
              "What are Pods, Deployments, and Services in Kubernetes?",
              "How would you deploy a Dockerized React app on Kubernetes?",
              "What are ConfigMaps and Secrets, and why do they matter?",
            ],
          },
          {
            title: "Part 13 — System Design: Core Questionnaire",
            questions: [
              "Design a scalable React dashboard that displays multiple real-time charts.",
              "Design a role-based authentication and authorization system for a React app.",
              "Design a frontend architecture for a large enterprise React app with multiple modules.",
              "Design a secure file upload and management system.",
              "Design a notification system supporting real-time updates.",
            ],
          },
          {
            title: "Part 13 — System Design: Additional (Advanced React System Design & Optimization)",
            questions: [
              "Design the frontend architecture for a live multiplayer application supporting 1,000+ concurrent users — how would you structure state, connections, and rendering? (This is essentially describing your GOC Productions work — use your real architecture as the answer.)",
              "How would you design a WebSocket connection manager that handles reconnection, message queuing, and multiple simultaneous rooms/sessions?",
              "How would you architect a React app to support both real-time (WebSocket) and traditional REST data in the same UI without state conflicts?",
              "Design a component architecture for a design system/reusable component library meant to be shared across multiple product teams. (Ties directly to your typed component library work.)",
              "How would you structure global state in a large app — Redux, Context, Zustand, or server state (React Query)? Justify your choice for different types of data.",
              "Design a search-with-filters feature for a large dataset (like your healthcare platform work) — how do you keep it fast and avoid excessive API calls?",
              "How would you design an infinite-scroll feed that stays performant with 10,000+ items rendered over time?",
              "How would you architect code-splitting and route-based lazy loading for a large multi-module enterprise app?",
              "Design a caching strategy for API responses in a React app — where would you cache (memory, React Query, service worker) and for how long?",
              "How would you design a permission-based UI where different user roles see different components/routes/actions?",
              "How would you handle a scenario where two users edit the same resource simultaneously (optimistic updates + conflict resolution)?",
              "Design a file upload feature that supports large files, progress indication, and resumable uploads.",
              "How would you structure a monorepo for a React + Node.js full-stack app with shared TypeScript types?",
              "Design an error-tracking and logging strategy for a production React app (client-side errors reaching the team reliably).",
              "How would you optimize the Largest Contentful Paint (LCP) and other Core Web Vitals for a content-heavy page? (You have real numbers here — \"Good\" Core Web Vitals across 3 platforms.)",
              "Design a feature-flag system to safely roll out new UI features to a subset of users.",
              "How would you design a multi-step form (like an onboarding flow) that persists progress if the user refreshes or leaves mid-way?",
              "Design a real-time collaborative feature (e.g., live cursors or shared editing) — what's the data flow from one user's action to another user seeing it?",
              "How would you approach migrating a large legacy React class-component codebase to functional components + hooks without breaking production?",
              "Design the frontend deployment pipeline for a React app — from a Docker build through Nginx serving to production, including how you'd handle zero-downtime deploys and rollbacks. (Direct match to Docker & Nginx sections above — tie it all together in one flow if asked.)",
            ],
          },
          {
            title: "Gap Prep Notes (Flagged Gaps — Quick Review)",
            questions: [
              "PostgreSQL: production DB experience is MongoDB/MySQL. Safe honest line ready: \"I've worked mainly with MongoDB and MySQL in production, but the relational concepts — joins, indexing, transactions — carry over; happy to walk through how I'd apply them.\"",
              "Kubernetes: not on your resume. Answer at the concept level (pods/deployments/services), and be honest that your hands-on deployment experience has been via Vercel/CI-CD rather than K8s.",
              "Recharts: skim the docs for ResponsiveContainer, LineChart, and Tooltip — you don't have it explicitly listed on your resume, so know the basic shape even without deep hands-on claims.",
              "Nginx config syntax: review a basic reverse proxy + try_files block once before the call — it's asked directly and ties into your Docker deployment story.",
            ],
          },
        ],
      },
    ],
  },
];

function buildInitialChecks(interviews) {
  const checks = {};
  interviews.forEach((iv) => {
    iv.rounds.forEach((round) => {
      round.sections.forEach((sec, si) => {
        sec.questions.forEach((_, qi) => {
          checks[`${iv.id}-${round.id}-${si}-${qi}`] = false;
        });
      });
    });
  });
  return checks;
}

export default function PrepSheet() {
  const [interviews] = useState(INTERVIEWS);
  const [selectedId, setSelectedId] = useState(INTERVIEWS[0]?.id || null);
  const [selectedRoundId, setSelectedRoundId] = useState(INTERVIEWS[0]?.rounds[0]?.id || null);
  const [checks, setChecks] = useState(() => buildInitialChecks(INTERVIEWS));
  const [loading, setLoading] = useState(true);
  const saveTimer = useRef(null);

  // Load saved progress from the backend on mount.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(PROGRESS_URL);
        if (!res.ok) throw new Error("Failed to fetch prepsheet progress");
        const result = await res.json();
        if (!cancelled && result && result.data) {
          const base = buildInitialChecks(INTERVIEWS);
          setChecks({ ...base, ...(result.data.checks || {}) });
          if (result.data.selectedId) setSelectedId(result.data.selectedId);
          if (result.data.selectedRoundId) setSelectedRoundId(result.data.selectedRoundId);
        }
      } catch (e) {
        console.error("Could not load PrepSheet progress — is the backend running?", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Debounced save to the backend whenever checks or selection change (but not before the
  // initial load finishes, so we never overwrite saved data with the blank default state).
  const persist = useCallback((nextChecks, nextSelectedId, nextRoundId) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await fetch(PROGRESS_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: { checks: nextChecks, selectedId: nextSelectedId, selectedRoundId: nextRoundId },
          }),
        });
      } catch (e) {
        console.error("Could not save PrepSheet progress — is the backend running?", e);
      }
    }, 250);
  }, []);

  const toggle = (key) => {
    setChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      persist(next, selectedId, selectedRoundId);
      return next;
    });
  };

  const selectRound = (companyId, roundId) => {
    setSelectedId(companyId);
    setSelectedRoundId(roundId);
    persist(checks, companyId, roundId);
  };

  const roundProgress = (iv, round) => {
    let total = 0;
    let done = 0;
    round.sections.forEach((sec, si) => {
      sec.questions.forEach((_, qi) => {
        total++;
        if (checks[`${iv.id}-${round.id}-${si}-${qi}`]) done++;
      });
    });
    return { total, done };
  };

  const selected = interviews.find((iv) => iv.id === selectedId);
  const selectedRound = selected?.rounds.find((r) => r.id === selectedRoundId);
  const selectedProgress = selected && selectedRound ? roundProgress(selected, selectedRound) : { total: 0, done: 0 };

  if (loading) {
    return (
      <div style={styles.wrap}>
        <style>{FONT_IMPORT}</style>
        <div style={{ padding: "40px", color: "#8A93A6", fontFamily: "'JetBrains Mono', monospace" }}>
          loading prepsheet...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrap} >
      <style>{FONT_IMPORT}</style>
      

      <header style={styles.header}>
        <div>
          <div style={styles.eyebrow}>INTERVIEW ATTEMPTS LOG</div>
          <h1 style={styles.h1}>PrepSheet</h1>
        </div>
        <NavBar />
        <div style={styles.statRow}>
          <Stat label="Attempts" value={`${interviews.length}`} />
          <Stat
            label="This round"
            value={selectedProgress.total ? `${selectedProgress.done}/${selectedProgress.total}` : "—"}
          />
        </div>
      </header>

      <div style={styles.body}>
        <aside style={styles.sidebar}>
          <div style={styles.sectionLabel}>Interview Companies</div>
          {interviews.map((iv) => (
            <div key={iv.id} style={styles.companyGroup}>
              <div style={styles.companyHeader}>
                <div style={styles.companyName}>{iv.company}</div>
                <div style={styles.companyMeta}>{iv.role}</div>
              </div>
              {iv.rounds.map((round) => {
                const prog = roundProgress(iv, round);
                const pct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
                const isActive = iv.id === selectedId && round.id === selectedRoundId;
                return (
                  <button
                    key={round.id}
                    onClick={() => selectRound(iv.id, round.id)}
                    style={{
                      ...styles.roundLink,
                      border: isActive ? "1px solid #F2A93B" : "1px solid #2A3140",
                      background: isActive ? "#1E2430" : "#12151C",
                    }}
                  >
                    <div style={styles.roundLabel}>{round.label}</div>
                    <div style={styles.miniBarTrack}>
                      <div style={{ ...styles.miniBarFill, width: `${pct}%` }} />
                    </div>
                    <div style={styles.companyProgressText}>{prog.done}/{prog.total} reviewed</div>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <main style={styles.main}>
          {!selected && <div style={styles.emptyNote}>No interview selected yet.</div>}
          {selected && selectedRound && (
            <>
              <div style={styles.mainHeader}>
                <h2 style={styles.h2}>{selected.company}</h2>
                <div style={styles.mainSub}>{selected.role} — {selectedRound.label}</div>
              </div>

              {selectedRound.sections.map((sec, si) => {
                const secDone = sec.questions.filter((_, qi) => checks[`${selected.id}-${selectedRound.id}-${si}-${qi}`]).length;
                return (
                  <div key={si} style={styles.sectionBlock}>
                    <div style={styles.sectionHeaderRow}>
                      <span style={styles.sectionTitle}>{sec.title}</span>
                      <span style={styles.sectionCount}>{secDone}/{sec.questions.length}</span>
                    </div>
                    <div style={styles.taskList}>
                      {sec.questions.map((q, qi) => {
                        const key = `${selected.id}-${selectedRound.id}-${si}-${qi}`;
                        const done = !!checks[key];
                        return (
                          <label key={key} style={styles.taskRow}>
                            <input
                              type="checkbox"
                              checked={done}
                              onChange={() => toggle(key)}
                              style={styles.checkbox}
                            />
                            <span style={{ ...styles.taskText, textDecoration: done ? "line-through" : "none", opacity: done ? 0.45 : 1 }}>
                              {q}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </main>
      </div>

      {/* <footer style={styles.footer}>
        <span style={styles.saveIndicator}>Not saved to server — resets on page reload</span>
      </footer> */}
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

const styles = {
  wrap: { display: "flex", flexDirection: "column", fontFamily: "'Space Grotesk', sans-serif", background: "#12151C", color: "#E8E6E0", height: "100vh", boxSizing: "border-box" },
  header: { padding: "28px 24px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", flexShrink: 0 },
  eyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1.5px", color: "#8A93A6", marginBottom: "6px" },
  h1: { fontSize: "26px", margin: 0, fontWeight: 700, letterSpacing: "-0.5px" },
  h2: { fontSize: "20px", margin: "2px 0 0", fontWeight: 600 },
  statRow: { display: "flex", gap: "10px" },
  statBox: { background: "#1A1F2B", padding: "8px 14px", borderRadius: "8px", minWidth: "84px", textAlign: "center" },
  statValue: { fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 700, color: "#F2A93B" },
  statLabel: { fontSize: "10px", color: "#8A93A6", marginTop: "2px", letterSpacing: "0.4px" },
  sectionLabel: { fontSize: "11px", color: "#8A93A6", letterSpacing: "0.5px", marginBottom: "8px", textTransform: "uppercase" },
  emptyNote: { fontSize: "12px", color: "#8A93A6", fontStyle: "italic", padding: "8px 0" },

  body: { display: "flex", gap: "18px", padding: "0 24px", flex: 1, minHeight: 0, overflow: "hidden" },
  sidebar: { flex: "0 0 260px", display: "flex", flexDirection: "column", gap: "16px", overflow: "auto", paddingRight: "8px" },
  companyGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  companyHeader: { padding: "4px 4px 8px", borderBottom: "1px solid #2A3140", marginBottom: "2px" },
  companyLink: { textAlign: "left", borderRadius: "10px", padding: "12px 14px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "6px" },
  companyName: { fontSize: "13px", fontWeight: 700, color: "#E8E6E0", lineHeight: 1.3 },
  companyMeta: { fontSize: "11px", color: "#8A93A6" },
  roundLink: { textAlign: "left", borderRadius: "8px", padding: "10px 12px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "6px", marginLeft: "6px" },
  roundLabel: { fontSize: "12px", fontWeight: 700, color: "#E8E6E0", lineHeight: 1.3 },
  miniBarTrack: { width: "100%", height: "4px", background: "#242A38", borderRadius: "3px", overflow: "hidden", marginTop: "2px" },
  miniBarFill: { height: "100%", background: "#F2A93B", transition: "width 0.3s ease" },
  companyProgressText: { fontSize: "10px", color: "#5EC8B8", fontFamily: "'JetBrains Mono', monospace" },
  addNote: { fontSize: "11px", color: "#8A93A6", fontStyle: "italic", marginTop: "8px", lineHeight: 1.5, padding: "10px", background: "#12151C", borderRadius: "8px" },

  main: { marginBottom: "15px", flex: 1, background: "#1A1F2B", borderRadius: "10px", padding: "20px 22px", minWidth: "300px", overflow: "auto", minHeight: 0 },
  mainHeader: { marginBottom: "12px" },
  mainSub: { fontSize: "12px", color: "#8A93A6", marginTop: "2px" },
  sectionBlock: { marginBottom: "18px" },
  sectionHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  sectionTitle: { fontSize: "13px", fontWeight: 700, color: "#B489F2" },
  sectionCount: { fontSize: "11px", color: "#8A93A6", fontFamily: "'JetBrains Mono', monospace" },

  taskList: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" },
  taskRow: { display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" },
  checkbox: { marginTop: "3px", width: "16px", height: "16px", accentColor: "#F2A93B", cursor: "pointer" },
  taskText: { fontSize: "14px", lineHeight: "1.5" },

  footer: { padding: "20px 24px 28px", display: "flex", justifyContent: "flex-end", alignItems: "center", flexShrink: 0 },
  saveIndicator: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#8A93A6" },
};