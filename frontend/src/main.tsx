import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import "./styles.css";

type DocumentItem = { name: string; detail: string; status: string; tone: "ready" | "action" };
type TimelineItem = { title: string; date: string; done: boolean };
type Dashboard = { applicant: string; journey: { origin: string; destination: string; pathway: string }; readiness: number; documents: DocumentItem[]; timeline: TimelineItem[] };

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function App() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [apiOnline, setApiOnline] = useState(false);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/dashboard`)
      .then((response) => {
        if (!response.ok) throw new Error("Dashboard request failed");
        return response.json() as Promise<Dashboard>;
      })
      .then((data) => { setDashboard(data); setApiOnline(true); })
      .catch(() => setApiOnline(false));
  }, []);

  const applicant = dashboard?.applicant || "Bhumika Warke";
  const journey = dashboard?.journey || { origin: "India", destination: "Japan", pathway: "Higher education pathway" };
  const documents = dashboard?.documents || [];
  const timeline = dashboard?.timeline || [];
  const readiness = dashboard?.readiness || 0;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">M</span><span>MEDBRIDGE</span></div>
        <div className="workspace-label">YOUR JOURNEY</div>
        <nav className="navigation" aria-label="Main navigation">
          <a className="nav-item active" href="#overview"><span className="nav-icon">+</span>Overview</a>
          <a className="nav-item" href="#documents"><span className="nav-icon">[ ]</span>Documents <span className="nav-count">1</span></a>
          <a className="nav-item" href="#applications"><span className="nav-icon">-&gt;</span>Applications</a>
          <a className="nav-item" href="#messages"><span className="nav-icon">o</span>Messages</a>
        </nav>
        <div className="sidebar-bottom">
          <a className="nav-item" href="#help"><span className="nav-icon">?</span>Help center</a>
          <div className="profile-chip"><span className="avatar">BW</span><span><strong>Bhumika Warke</strong><small>Applicant</small></span><span className="more">...</span></div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> {journey.origin} to {journey.destination}</div><div className="top-actions"><span className={`api-status ${apiOnline ? "online" : "offline"}`}>{apiOnline ? "API connected" : "API offline"}</span><button className="icon-button" aria-label="Notifications">*</button><button className="language">EN <span>v</span></button></div></header>
        <div className="page-heading"><div><p className="eyebrow">WEDNESDAY, 26 AUGUST 2026</p><h1>Good morning, {applicant.split(" ")[0]}.</h1><p className="subtitle">Your path to studying in {journey.destination} is taking shape.</p></div><a className="primary-button" href="#documents">Continue journey <span>-&gt;</span></a></div>

        <section className="journey-banner" aria-label="Journey progress">
          <div className="journey-copy"><span className="route-label">CURRENT JOURNEY</span><h2>{journey.origin} <span className="route-arrow">-&gt;</span> {journey.destination}</h2><p>{journey.pathway}</p></div>
          <div className="progress-wrap"><div className="progress-meta"><span>Overall readiness</span><strong>{readiness}%</strong></div><div className="progress-track"><span style={{ width: `${readiness}%` }} /></div><p>One action is keeping your application from moving forward.</p></div>
          <div className="journey-stamp"><span>EST.</span><strong>SEP<br />2026</strong></div>
        </section>

        <div className="content-grid">
          <section className="panel documents-panel" id="documents"><div className="panel-heading"><div><p className="eyebrow">DOCUMENTS</p><h2>Readiness checklist</h2></div><a href="#documents">View all <span>-&gt;</span></a></div><div className="document-list">{documents.map((document) => <div className="document-row" key={document.name}><span className={`document-icon ${document.tone}`}>{document.tone === "ready" ? "OK" : "!"}</span><span className="document-info"><strong>{document.name}</strong><small>{document.detail}</small></span><span className={`status ${document.tone}`}>{document.status}</span><span className="row-arrow">-&gt;</span></div>)}</div></section>
          <section className="panel next-panel"><p className="eyebrow">UP NEXT</p><h2>Complete your academic record</h2><p className="next-description">Your transcripts help partner universities understand your background and recommend the right programs.</p><button className="secondary-button">Upload transcripts <span>+</span></button><div className="secure-note"><span className="lock">*</span> Encrypted and private by design</div></section>
        </div>

        <section className="panel timeline-panel" id="applications"><div className="panel-heading"><div><p className="eyebrow">YOUR PROGRESS</p><h2>Journey timeline</h2></div><span className="updated">Updated just now</span></div><div className="timeline">{timeline.map((item, index) => <div className={`timeline-item ${item.done ? "done" : ""}`} key={item.title}><div className="timeline-marker">{item.done ? "OK" : index + 1}</div><div><strong>{item.title}</strong><small>{item.date}</small></div></div>)}</div></section>
        <footer><span>MEDBRIDGE</span><span>Your documents. Your journey. Your trust.</span><span>{apiOnline ? "API CONNECTED" : "START BACKEND"}</span></footer>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>,
);
