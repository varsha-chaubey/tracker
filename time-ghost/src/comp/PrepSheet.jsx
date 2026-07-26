import React, { useState } from "react";
import NavBar from "./NavBar";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');`;



const INTERVIEWS = [
  {
    id: "vapl",
    company: "Vacis Automation Pvt. Ltd. (VAPL)",
    role: "React Developer",
    date: "Interview #1",
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
    ],
  },
//    {
//     id: "vapo",
//     company: "Vacis Automation Pvt. Ltd. (VAPL)",
//     role: "React Developer",
//     date: "Interview #2",
//     sections: [
//       {
//         title: "A. HTML — Theory",
//         questions: [
//           "What is the difference between semantic and non-semantic HTML elements? Give examples.",
//           "Explain the difference between <div> and <span>.",
//           "What is the purpose of the alt attribute on <img>? Why does it matter for accessibility and SEO?",
//           "What's the difference between localStorage, sessionStorage, and cookies?",
//           "What is the difference between id and class attributes?",
//           "Explain the difference between block-level and inline elements.",
//           "What are data attributes (data-*) and when would you use them?",
//           "What is the difference between defer and async when loading a <script> tag?",
//           "How does the browser construct the DOM from HTML? What is the DOM tree?",
//           "What is the difference between HTML4 and HTML5? Name a few new HTML5 elements/APIs.",
//         ],
//       },
//       {
//         title: "B. CSS — Theory",
//         questions: [
//           "Explain the CSS Box Model.",
//           "What is the difference between flexbox and grid? When would you choose one over the other?",
//           "Explain CSS specificity and how conflicting rules are resolved.",
//           "What is the difference between position: relative, absolute, fixed, and sticky?",
//           "What are pseudo-classes and pseudo-elements? Give examples of each.",
//           "Explain the difference between em, rem, %, vh/vw, and px units.",
//           "What is a media query, and how do you implement responsive design using it?",
//           "What is the difference between display: none and visibility: hidden?",
//           "Explain CSS specificity for inline styles, IDs, classes, and !important.",
//           "What are CSS custom properties (variables), and how do you define/use them?",
//         ],
//       },
//       {
//         title: "C. JavaScript — Theory",
//         questions: [
//           "Explain the difference between var, let, and const.",
//           "What is hoisting in JavaScript?",
//           "Explain closures with an example.",
//           "What is the difference between == and ===?",
//           "Explain the JavaScript event loop, call stack, and task queue (microtasks vs macrotasks).",
//           "What is the difference between Promise, async/await, and callbacks?",
//           "Explain 'this' keyword behavior in regular functions vs arrow functions.",
//           "What is event bubbling and event capturing? How do you stop propagation?",
//           "What is debouncing vs throttling? When would you use each?",
//           "Explain prototypal inheritance in JavaScript.",
//           "What is the difference between null and undefined?",
//           "What are higher-order functions? Give examples (map, filter, reduce).",
//           "Explain shallow copy vs deep copy. How do you deep clone an object?",
//           "What is destructuring, and how is it used with objects/arrays?",
//           "What are the differences between call, apply, and bind?",
//           "Explain how JavaScript's garbage collection works.",
//           "What is currying in JavaScript? Give a practical example.",
//           "Explain the difference between synchronous and asynchronous code execution.",
//           "What are generators (function*) and how are they used?",
//           "Explain memoization and how it improves performance (relevant to your useMemo/useCallback work).",
//         ],
//       },
//       {
//         title: "D. React — Theory",
//         questions: [
//           "Explain the Virtual DOM and reconciliation process.",
//           "What is the difference between state and props?",
//           "Explain the React component lifecycle (or lifecycle equivalents using hooks).",
//           "What are useState and useEffect, and how do dependency arrays work?",
//           "What is the difference between controlled and uncontrolled components?",
//           "Explain useMemo vs useCallback — when do you use each, and why?",
//           "What is React.memo and how does it prevent unnecessary re-renders?",
//           "Explain the Context API. When would you use it over Redux?",
//           "What is prop drilling, and how do you avoid it?",
//           "Explain Redux core concepts: store, actions, reducers, middleware (Redux Toolkit specifically).",
//           "What are custom hooks? Explain a use case you've built.",
//           "What is the difference between useRef and useState?",
//           "How does React handle keys in lists, and why are they important?",
//           "Explain error boundaries in React.",
//           "What is SSR vs CSR vs SSG? (ties into your Next.js SSR/ISR experience)",
//           "How would you integrate Axios with React for API calls, including error handling and interceptors?",
//           "How would you build a dashboard with Recharts — ResponsiveContainer, LineChart, Tooltip, etc.? (flagged gap — review docs)",
//           "What are React Portals, and when would you use them?",
//           "Explain code-splitting and lazy loading in React (React.lazy, Suspense).",
//           "How do you optimize a React app's performance in production? Walk through your real ~40% re-render reduction work.",
//         ],
//       },
//       {
//         title: "E. Next.js — Theory",
//         questions: [
//           "What is the difference between SSR, SSG, ISR, and CSR in Next.js?",
//           "Explain the Next.js file-based routing system.",
//           "What are API routes in Next.js, and when would you use them vs a separate backend?",
//           "What is getServerSideProps vs getStaticProps vs getStaticPaths?",
//           "How does Next.js handle image optimization (next/image)?",
//           "What is middleware in Next.js, and what are common use cases?",
//           "Explain the App Router vs Pages Router in Next.js.",
//           "How does Next.js handle environment variables — public vs private?",
//           "How would you handle authentication (JWT/OAuth) in a Next.js app?",
//           "How do you deploy a Next.js app vs a plain React SPA? (bridge into Docker talking points)",
//         ],
//       },
//       {
//         title: "F. TypeScript — Theory",
//         questions: [
//           "What is the difference between interface and type in TypeScript?",
//           "Explain generics in TypeScript with an example.",
//           "What are union types and intersection types?",
//           "What is the difference between any, unknown, and never?",
//           "How do you type React component props and state in TypeScript?",
//           "What are utility types (Partial, Pick, Omit, Record)? Give use cases.",
//           "Explain type narrowing and type guards.",
//           "What is the difference between readonly and const?",
//           "How do enums work in TypeScript, and when would you prefer a union type instead?",
//           "How would you type a reusable component library?",
//         ],
//       },
//       {
//         title: "G. REST API / Backend-Adjacent — Theory",
//         questions: [
//           "What is REST, and what are its core architectural constraints?",
//           "Explain the difference between PUT, PATCH, and POST.",
//           "How do you handle authentication in REST APIs (JWT vs session vs OAuth 2.0)?",
//           "How do you handle error responses and status codes properly in API design?",
//           "What is CORS, and how do you resolve CORS issues in frontend-backend integration?",
//           "How would you design pagination, filtering, and sorting for a REST API returning large datasets?",
//           "What is the difference between REST and GraphQL?",
//           "How do you handle race conditions or duplicate requests with Axios + React?",
//           "What is an API gateway, and how does Nginx function as a reverse proxy? (flagged gap — review nginx.conf basics)",
//           "How would you structure error handling and retries for WebSocket connections dropping mid-session?",
//         ],
//       },
//       {
//         title: "Gap Prep Notes (15 min review)",
//         questions: [
//           "Docker: basic Dockerfile for React/Next.js (multi-stage build: Node build stage + Nginx serve stage), docker-compose basics.",
//           "Nginx: reverse proxy block syntax (proxy_pass, location, serving a static build).",
//           "Recharts: skim LineChart, BarChart, ResponsiveContainer docs — mentioned twice in JD.",
//           "Kubernetes/PostgreSQL: honest one-liner ready — 'haven't used in production yet, understand core concepts, have MongoDB/MySQL experience.'",
//         ],
//       },
//       {
//         title: "H. Machine Test — JavaScript Coding",
//         questions: [
//           "Write a function to flatten a deeply nested array without using Array.flat().",
//           "Implement a debounce function from scratch.",
//           "Implement a throttle function from scratch.",
//           "Write a function to deep clone an object (without structuredClone or JSON methods).",
//           "Implement a simple Promise.all polyfill.",
//           "Write a function to find the first non-repeating character in a string.",
//           "Implement a memoization utility function (generic, works for any function).",
//           "Write code to remove duplicate values from an array of objects based on a key.",
//           "Implement curry(fn) — a generic currying function.",
//           "Write a function to check if two objects are deeply equal.",
//         ],
//       },
//       {
//         title: "H. Machine Test — React Coding",
//         questions: [
//           "Build a custom useDebounce hook and use it in a search input component.",
//           "Build a paginated table component fetching from an API (mock data), with loading and error states.",
//           "Fix a given buggy component that re-renders infinitely due to a useEffect dependency issue.",
//           "Build a custom useFetch hook: loading, error, data states, with cleanup on unmount (abort controller).",
//           "Implement an infinite scroll list using IntersectionObserver.",
//           "Build a controlled multi-step form with validation, no third-party form library.",
//           "Implement a simple global state manager using Context API + useReducer (mini-Redux).",
//           "Build a reusable <Modal /> component using a React Portal.",
//           "Optimize a given list-rendering component — apply React.memo, useMemo, useCallback correctly.",
//           "Build a dashboard widget fetching via Axios, rendering in a chart, with a loading skeleton.",
//         ],
//       },
//     ],
//   },
];

function buildInitialChecks(interviews) {
  const checks = {};
  interviews.forEach((iv) => {
    iv.sections.forEach((sec, si) => {
      sec.questions.forEach((_, qi) => {
        checks[`${iv.id}-${si}-${qi}`] = false;
      });
    });
  });
  return checks;
}

export default function PrepSheet() {
  const [interviews] = useState(INTERVIEWS);
  const [selectedId, setSelectedId] = useState(INTERVIEWS[0]?.id || null);
  const [checks, setChecks] = useState(() => buildInitialChecks(INTERVIEWS));

  const toggle = (key) => setChecks((prev) => ({ ...prev, [key]: !prev[key] }));

  const interviewProgress = (iv) => {
    let total = 0;
    let done = 0;
    iv.sections.forEach((sec, si) => {
      sec.questions.forEach((_, qi) => {
        total++;
        if (checks[`${iv.id}-${si}-${qi}`]) done++;
      });
    });
    return { total, done };
  };

  const selected = interviews.find((iv) => iv.id === selectedId);
  const selectedProgress = selected ? interviewProgress(selected) : { total: 0, done: 0 };

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
          {interviews.map((iv) => {
            const prog = interviewProgress(iv);
            const pct = prog.total ? Math.round((prog.done / prog.total) * 100) : 0;
            const isActive = iv.id === selectedId;
            return (
              <button
                key={iv.id}
                onClick={() => setSelectedId(iv.id)}
                style={{
                  ...styles.companyLink,
                  border: isActive ? "1px solid #F2A93B" : "1px solid #2A3140",
                  background: isActive ? "#1E2430" : "#12151C",
                }}
              >
                <div style={styles.companyName}>{iv.company}</div>
                <div style={styles.companyMeta}>{iv.role} &middot; {iv.date}</div>
                <div style={styles.miniBarTrack}>
                  <div style={{ ...styles.miniBarFill, width: `${pct}%` }} />
                </div>
                <div style={styles.companyProgressText}>{prog.done}/{prog.total} reviewed</div>
              </button>
            );
          })}
          {/* <div style={styles.addNote}>
            New interview lined up? Add a new object to the INTERVIEWS array in this file with the same
            shape as the VAPL entry — it'll show up here automatically.
          </div> */}
        </aside>

        <main style={styles.main}>
          {!selected && <div style={styles.emptyNote}>No interview selected yet.</div>}
          {selected && (
            <>
              <div style={styles.mainHeader}>
                <h2 style={styles.h2}>{selected.company}</h2>
                <div style={styles.mainSub}>{selected.role} — {selected.date}</div>
              </div>

              {selected.sections.map((sec, si) => {
                const secDone = sec.questions.filter((_, qi) => checks[`${selected.id}-${si}-${qi}`]).length;
                return (
                  <div key={si} style={styles.sectionBlock}>
                    <div style={styles.sectionHeaderRow}>
                      <span style={styles.sectionTitle}>{sec.title}</span>
                      <span style={styles.sectionCount}>{secDone}/{sec.questions.length}</span>
                    </div>
                    <div style={styles.taskList}>
                      {sec.questions.map((q, qi) => {
                        const key = `${selected.id}-${si}-${qi}`;
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
  sidebar: { flex: "0 0 260px", display: "flex", flexDirection: "column", gap: "8px", overflow: "auto", paddingRight: "8px" },
  companyLink: { textAlign: "left", borderRadius: "10px", padding: "12px 14px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "6px" },
  companyName: { fontSize: "13px", fontWeight: 700, color: "#E8E6E0", lineHeight: 1.3 },
  companyMeta: { fontSize: "11px", color: "#8A93A6" },
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
