import React, { useState } from 'react';
import { Sliders, Layers, Play, ShieldCheck, FileSearch, Sparkles } from 'lucide-react';

const SIMULATED_BOXES = [
  { id: 1, x: 38, y: 52, w: 74, h: 42, conf: 0.92, label: 'Pothole #1' },
  { id: 2, x: 155, y: 40, w: 62, h: 36, conf: 0.85, label: 'Pothole #2' },
  { id: 3, x: 245, y: 68, w: 54, h: 30, conf: 0.74, label: 'Pothole #3' },
  { id: 4, x: 112, y: 88, w: 46, h: 24, conf: 0.58, label: 'Pothole #4' },
];

export function YoloThresholdSimulator() {
  const [threshold, setThreshold] = useState(0.5);
  const visibleBoxes = SIMULATED_BOXES.filter((b) => b.conf >= threshold);

  return (
    <div className="sim-box">
      <div className="sim-header">
        <span className="sim-title">
          <Sliders size={13} style={{ display: 'inline', marginRight: 6 }} />
          STREAMLIT YOLOv8 THRESHOLD SIMULATOR
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.73rem',
            color: '#6ee7b7',
          }}
        >
          Conf &ge; {threshold.toFixed(2)} &bull; {visibleBoxes.length} detected
        </span>
      </div>

      <svg
        viewBox="0 0 340 130"
        style={{
          width: '100%',
          height: '122px',
          borderRadius: '10px',
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
          border: '1px solid rgba(148,163,184,0.2)',
          marginBottom: '10px',
        }}
      >
        {/* Stylized perspective road */}
        <polygon points="75,18 265,18 335,128 5,128" fill="#1e293b" />
        <line
          x1="170"
          y1="20"
          x2="170"
          y2="128"
          stroke="#475569"
          strokeWidth="2"
          strokeDasharray="8 6"
        />

        {/* Pothole surface patches */}
        <ellipse cx="75" cy="73" rx="28" ry="13" fill="#090d16" />
        <ellipse cx="186" cy="58" rx="22" ry="10" fill="#090d16" />
        <ellipse cx="272" cy="83" rx="18" ry="9" fill="#090d16" />
        <ellipse cx="135" cy="100" rx="15" ry="7" fill="#090d16" />

        {/* Dynamic bounding boxes */}
        {visibleBoxes.map((b) => (
          <g key={b.id}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              fill="rgba(34, 211, 238, 0.12)"
              stroke="#22d3ee"
              strokeWidth="1.8"
              rx="3"
            />
            <rect x={b.x} y={b.y - 14} width={64} height={14} fill="#22d3ee" rx="2" />
            <text
              x={b.x + 4}
              y={b.y - 4}
              fill="#040714"
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
            >
              pothole {b.conf.toFixed(2)}
            </text>
          </g>
        ))}
      </svg>

      <input
        type="range"
        min="0.30"
        max="0.95"
        step="0.05"
        value={threshold}
        onChange={(e) => setThreshold(parseFloat(e.target.value))}
        className="sim-slider"
        aria-label="YOLOv8 confidence threshold"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          marginTop: 4,
        }}
      >
        <span>Dataset: 651 imgs / 1,784 labels</span>
        <span>Pipeline: Train &rarr; Eval &rarr; ONNX</span>
      </div>
    </div>
  );
}

export function UNetMaskSimulator() {
  const [maskMode, setMaskMode] = useState('overlay');
  const [opacity, setOpacity] = useState(0.75);

  return (
    <div className="sim-box" style={{ borderColor: 'rgba(52, 211, 153, 0.28)' }}>
      <div className="sim-header">
        <span className="sim-title" style={{ color: '#34d399' }}>
          <Layers size={13} style={{ display: 'inline', marginRight: 6 }} />
          U-NET PIXEL MASK EVALUATOR
        </span>
        <div style={{ display: 'flex', gap: 5 }}>
          {['input', 'gt', 'pred', 'overlay'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setMaskMode(mode)}
              style={{
                padding: '3px 7px',
                borderRadius: '6px',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                border: '1px solid rgba(52,211,153,0.35)',
                background:
                  maskMode === mode ? 'rgba(52,211,153,0.22)' : 'transparent',
                color: maskMode === mode ? '#6ee7b7' : '#94a3b8',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 340 120"
        style={{
          width: '100%',
          height: '115px',
          borderRadius: '10px',
          background: '#090e1c',
          border: '1px solid rgba(148,163,184,0.2)',
          marginBottom: '10px',
        }}
      >
        {/* Base grayscale/textural input visual */}
        {(maskMode === 'input' || maskMode === 'overlay') && (
          <g>
            <rect width="340" height="120" fill="#182235" />
            <circle cx="100" cy="60" r="34" fill="#334155" />
            <ellipse cx="225" cy="64" rx="48" ry="26" fill="#2d3b52" />
            <rect x="20" y="18" width="42" height="18" rx="4" fill="#263349" />
          </g>
        )}

        {/* Ground Truth Mask */}
        {(maskMode === 'gt' || maskMode === 'overlay') && (
          <g opacity={maskMode === 'gt' ? 0.95 : opacity * 0.55}>
            <circle cx="100" cy="60" r="34" fill="#22d3ee" />
            <ellipse cx="225" cy="64" rx="48" ry="26" fill="#22d3ee" />
          </g>
        )}

        {/* Predicted Segmentation Mask */}
        {(maskMode === 'pred' || maskMode === 'overlay') && (
          <g opacity={maskMode === 'pred' ? 0.95 : opacity * 0.7}>
            <circle
              cx="102"
              cy="60"
              r="33"
              fill="#34d399"
              stroke="#6ee7b7"
              strokeWidth="1.5"
            />
            <ellipse
              cx="224"
              cy="64"
              rx="46"
              ry="25"
              fill="#34d399"
              stroke="#6ee7b7"
              strokeWidth="1.5"
            />
          </g>
        )}

        <text
          x="12"
          y="108"
          fill="#cbd5e1"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
        >
          View: {maskMode.toUpperCase()} | Loss: BCE + Dice | Skip Connections: Active
        </text>
      </svg>

      {maskMode === 'overlay' && (
        <input
          type="range"
          min="0.15"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="sim-slider"
          style={{ accentColor: '#34d399' }}
          aria-label="Segmentation mask overlay opacity"
        />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          marginTop: 4,
        }}
      >
        <span>
          <Play size={10} style={{ display: 'inline', marginRight: 4 }} />
          Callbacks: EarlyStopping, ModelCheckpoint
        </span>
        <span>ReduceLROnPlateau</span>
      </div>
    </div>
  );
}

const EXPIRY_STAGES = [
  {
    id: 'extract',
    label: '1. Gemini Vision',
    badge: 'Auto-Extracted',
    color: '#a78bfa',
    detail: 'Extracted: Laptop Pro • Purchased 2025-11-10 • Warranty Expiry: 2026-11-10 • Price & Serial #',
  },
  {
    id: 'track',
    label: '2. Status Track',
    badge: 'Expiring Soon',
    color: '#fbbf24',
    detail: 'Dashboard updated in MongoDB + Cloudinary receipt archived • Calendar alert scheduled.',
  },
  {
    id: 'cron',
    label: '3. Cron Alerts',
    badge: '30 / 15 / 7 / 1d',
    color: '#34d399',
    detail: 'Node-Cron dispatched multi-stage Resend email notification before warranty expiration.',
  },
];

export function ExpiryStageSimulator() {
  const [stageIdx, setStageIdx] = useState(0);
  const stage = EXPIRY_STAGES[stageIdx];

  return (
    <div className="sim-box" style={{ borderColor: 'rgba(167, 139, 250, 0.28)' }}>
      <div className="sim-header">
        <span className="sim-title" style={{ color: '#a78bfa' }}>
          <Sparkles size={13} style={{ display: 'inline', marginRight: 6 }} />
          EXPIRYGUARD AI PIPELINE FLOW
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: stage.color,
          }}
        >
          {stage.badge}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {EXPIRY_STAGES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStageIdx(idx)}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              border: `1px solid ${stageIdx === idx ? s.color : 'rgba(148,163,184,0.25)'}`,
              background: stageIdx === idx ? `${s.color}22` : 'transparent',
              color: stageIdx === idx ? '#f8fafc' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        style={{
          padding: '10px 12px',
          borderRadius: '10px',
          background: 'rgba(15, 23, 42, 0.72)',
          border: '1px solid rgba(148, 163, 184, 0.16)',
          fontSize: '0.76rem',
          color: '#cbd5e1',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.5,
        }}
      >
        {stage.detail}
      </div>
    </div>
  );
}

const TALENT_PROFILES = [
  {
    id: 'human',
    label: 'Verified Candidate',
    aiScore: 12,
    botScore: 8,
    verdict: 'Authentic Human Application — Ranked for HR Review',
    color: '#34d399',
  },
  {
    id: 'llm',
    label: 'LLM-Generated Resume',
    aiScore: 88,
    botScore: 22,
    verdict: 'Flagged by Desklib + HuggingFace AI Text Detector',
    color: '#fbbf24',
  },
  {
    id: 'bot',
    label: 'Bot Mass-Apply',
    aiScore: 76,
    botScore: 94,
    verdict: 'Blocked by IP Clustering & Submission Velocity Sentinel',
    color: '#f472b6',
  },
];

export function TalentScoreSimulator() {
  const [selected, setSelected] = useState(0);
  const profile = TALENT_PROFILES[selected];

  return (
    <div className="sim-box" style={{ borderColor: 'rgba(244, 114, 182, 0.28)' }}>
      <div className="sim-header">
        <span className="sim-title" style={{ color: '#f472b6' }}>
          <ShieldCheck size={13} style={{ display: 'inline', marginRight: 6 }} />
          TALENTAI AUTHENTICITY &amp; BOT SENTINEL
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: profile.color,
          }}
        >
          BullMQ Worker
        </span>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {TALENT_PROFILES.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelected(idx)}
            style={{
              padding: '5px 9px',
              borderRadius: '8px',
              fontSize: '0.71rem',
              fontFamily: 'var(--font-mono)',
              border: `1px solid ${selected === idx ? p.color : 'rgba(148,163,184,0.25)'}`,
              background: selected === idx ? `${p.color}22` : 'transparent',
              color: selected === idx ? '#f8fafc' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
        }}
      >
        <div
          style={{
            padding: '7px 10px',
            borderRadius: '8px',
            background: 'rgba(15, 23, 42, 0.72)',
            color: '#cbd5e1',
          }}
        >
          AI Text Risk: <strong style={{ color: profile.color }}>{profile.aiScore}%</strong>
        </div>
        <div
          style={{
            padding: '7px 10px',
            borderRadius: '8px',
            background: 'rgba(15, 23, 42, 0.72)',
            color: '#cbd5e1',
          }}
        >
          Bot Velocity: <strong style={{ color: profile.color }}>{profile.botScore}%</strong>
        </div>
      </div>

      <div
        style={{
          fontSize: '0.74rem',
          color: profile.color,
          fontFamily: 'var(--font-mono)',
        }}
      >
        Verdict: {profile.verdict}
      </div>
    </div>
  );
}

const RAG_QUERIES = [
  {
    id: 'hba1c',
    label: 'HbA1c Query',
    route: 'PyPDFLoader -> ChromaDB Top-K -> ChatGroq',
    answer: '"According to the report, the reference range for HbA1c in non-diabetic adults is < 5.7%."',
  },
  {
    id: 'ocr',
    label: 'Corrupted Unicode PDF',
    route: '\\uE000-\\uF8FF Detected -> 3x PyMuPDF + Tesseract OCR -> ChromaDB',
    answer: 'Transparently switched to 3x zoom OCR fallback and indexed clean diagnostic values.',
  },
  {
    id: 'guardrail',
    label: 'Out-of-Context Guardrail',
    route: 'ChromaDB Similarity Search -> Strict Medical Prompt',
    answer: '"Not mentioned in the report." (Zero-hallucination guardrail enforced)',
  },
];

export function RagPipelineSimulator() {
  const [qIdx, setQIdx] = useState(0);
  const item = RAG_QUERIES[qIdx];

  return (
    <div className="sim-box" style={{ borderColor: 'rgba(52, 211, 153, 0.28)' }}>
      <div className="sim-header">
        <span className="sim-title" style={{ color: '#34d399' }}>
          <FileSearch size={13} style={{ display: 'inline', marginRight: 6 }} />
          MEDICAL RAG + OCR FALLBACK TRACE
        </span>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {RAG_QUERIES.map((q, idx) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setQIdx(idx)}
            style={{
              padding: '5px 9px',
              borderRadius: '8px',
              fontSize: '0.71rem',
              fontFamily: 'var(--font-mono)',
              border: `1px solid ${qIdx === idx ? '#34d399' : 'rgba(148,163,184,0.25)'}`,
              background: qIdx === idx ? 'rgba(52,211,153,0.18)' : 'transparent',
              color: qIdx === idx ? '#f8fafc' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div
        style={{
          padding: '9px 11px',
          borderRadius: '10px',
          background: 'rgba(15, 23, 42, 0.72)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: '#6ee7b7',
          marginBottom: 6,
        }}
      >
        Pipeline: {item.route}
      </div>
      <div
        style={{
          fontSize: '0.76rem',
          color: '#cbd5e1',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.45,
        }}
      >
        {item.answer}
      </div>
    </div>
  );
}
