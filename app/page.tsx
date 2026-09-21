'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Database,
  Download,
  Layers3,
  LocateFixed,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  PanelRight,
  Play,
  Plus,
  Search,
  Send,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

const traceSteps = [
  { label: 'Query understanding', meta: 'Intent + AOI extracted', state: 'complete', icon: MessageSquareText },
  { label: 'Data retrieval', meta: 'Sentinel-2 / 12 scenes', state: 'complete', icon: Database },
  { label: 'GIS analysis', meta: 'Change detection · NDWI', state: 'active', icon: Layers3 },
  { label: 'Evidence synthesis', meta: 'Grounding result', state: 'queued', icon: Sparkles },
]

function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'green' | 'amber' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function MapPanel({ compare, onCompare }: { compare: number; onCompare: (value: number) => void }) {
  return (
    <section className="map-panel">
      <div className="map-topbar">
        <div className="map-title"><LocateFixed size={14} /> AOI / Kohat District</div>
        <div className="map-actions"><button aria-label="Zoom out"><ZoomOut size={14} /></button><button aria-label="Zoom in"><ZoomIn size={14} /></button><button aria-label="Center map"><Crosshair size={14} /></button></div>
      </div>
      <div className="map-canvas">
        <div className="map-grid" />
        <div className="map-river river-one" /><div className="map-river river-two" />
        <div className="contour contour-one" /><div className="contour contour-two" />
        <div className="aoi-box"><span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" /><span className="aoi-label">AOI · 42.7 km²</span></div>
        <div className="flood-zone zone-one" /><div className="flood-zone zone-two" /><div className="map-pin pin-one" /><div className="map-pin pin-two" />
        <div className="map-label label-north">KOHAT</div><div className="map-label label-river">INDUS BASIN</div><div className="map-label label-south">HANGU</div>
        {compare > 0 && <div className="compare-line" style={{ left: `${compare}%` }}><span>2024-08-14</span></div>}
        <div className="map-scale">0&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;10 km</div>
        <div className="map-coordinates">33°35'N&nbsp;&nbsp; 71°27'E</div>
      </div>
      <div className="map-footer"><div className="legend"><span><i className="legend-swatch water" /> Flood extent</span><span><i className="legend-swatch boundary" /> AOI boundary</span><span><i className="legend-swatch cloud" /> Cloud mask</span></div><span className="map-source">© Sentinel-2 L2A · EPSG:4326</span></div>
      {compare > 0 && <div className="compare-control"><span>Before</span><input aria-label="Compare imagery dates" type="range" min="10" max="90" value={compare} onChange={(event) => onCompare(Number(event.target.value))} /><span>After</span></div>}
    </section>
  )
}

export default function Page() {
  const [query, setQuery] = useState('Show me flood extent near Kohat over the last 2 weeks')
  const [submitted, setSubmitted] = useState(true)
  const [traceOpen, setTraceOpen] = useState(true)
  const [compare, setCompare] = useState(0)

  function submitQuery(event: React.FormEvent) {
    event.preventDefault()
    if (!query.trim()) return
    setSubmitted(true)
    setCompare(0)
  }

  return (
    <main className="satquery-app">
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><span /><span /><span /></div><div><strong>satquery<span>_ai</span></strong><small>SPATIAL INTELLIGENCE / Z-AXIS</small></div></div>
        <nav className="topnav"><button className="nav-active">Workspace</button><button>Saved analyses</button><button>Data sources</button></nav>
        <div className="top-actions"><span className="system-status"><i /> Systems nominal</span><button className="icon-button" aria-label="Settings"><Settings2 size={16} /></button><div className="avatar">ZA</div></div>
        <button className="mobile-menu" aria-label="Open menu"><Menu size={18} /></button>
      </header>

      <div className="workspace-shell">
        <aside className="left-rail">
          <button className="new-analysis"><Plus size={15} /> New analysis</button>
          <div className="rail-section"><div className="rail-heading">Recent queries <span>03</span></div><button className="rail-query active"><span className="query-dot" />Flood extent near Kohat<small>Just now</small></button><button className="rail-query"><span className="query-dot muted" />Urban expansion · Lahore<small>Yesterday</small></button><button className="rail-query"><span className="query-dot muted" />Crop stress anomaly<small>18 Sep 2026</small></button></div>
          <div className="rail-section saved"><div className="rail-heading">Pinned AOIs</div><button className="rail-query"><span className="pin-icon" />Kohat District<small>Pakistan · 42.7 km²</small></button><button className="rail-query"><span className="pin-icon" />Indus floodplain<small>Pakistan · 218.4 km²</small></button></div>
          <div className="rail-bottom"><span className="storage"><span className="storage-bar"><i /></span> 2.4 GB / 10 GB</span><button className="user-row"><span className="avatar small">ZA</span><span><strong>Team Z-Axis</strong><small>SIH 2026 workspace</small></span><MoreHorizontal size={15} /></button></div>
        </aside>

        <section className="main-workspace">
          <div className="workspace-heading"><div><div className="eyebrow">LIVE ANALYSIS <span>·</span> 21 SEP 2026 / 14:32 UTC</div><h1>Flood extent near Kohat</h1><p className="heading-meta"><span>ANALYSIS ID <b>SQ-26167-042</b></span><span>STATUS <b className="text-green">PROCESSING</b></span><span>LATENCY <b>4.2s</b></span></p></div><div className="heading-buttons"><button className="quiet-button"><Download size={14} /> Export</button><button className="quiet-button"><MoreHorizontal size={16} /></button></div></div>
          <form className="command-bar" onSubmit={submitQuery}><Search size={16} /><input aria-label="Ask SatQuery AI" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && (event.nativeEvent as KeyboardEvent).isComposing) event.preventDefault() }} /><button type="submit"><Send size={15} /> Run query <kbd>↵</kbd></button></form>
          <div className="content-grid">
            <div className="evidence-column">
              <div className="result-intro"><div className="result-symbol"><Sparkles size={16} /></div><div><div className="eyebrow">SPATIAL RESULT <span>·</span> CONFIDENCE 0.82</div><h2>{submitted ? 'Flooding detected across the Kohat basin' : 'Ready for a spatial query'}</h2><p>Sentinel-2 imagery indicates <strong>moderate flood expansion</strong> along the Togh Serai river corridor between 14–21 Sep 2026. Maximum observed extent: 8.6 km².</p></div></div>
              <div className="badges"><Badge tone="green">Imagery-confirmed: YES</Badge><Badge>Sensor: Sentinel-2 optical</Badge><Badge>Cloud cover: 4.1%</Badge><Badge>Confidence: 0.82</Badge></div>
              <MapPanel compare={compare} onCompare={setCompare} />
              <div className="evidence-row"><div className="evidence-card"><div className="card-label">OBSERVED CHANGE</div><strong>+31.4%</strong><span>flooded surface area</span><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div></div><div className="evidence-card"><div className="card-label">PEAK EXTENT</div><strong>8.6 km²</strong><span>21 Sep · 09:41 UTC</span><div className="card-link">View polygon <ArrowUpRight size={13} /></div></div><div className="evidence-card"><div className="card-label">SCENES USED</div><strong>12 / 12</strong><span>0 rejected · 2 weeks</span><div className="card-link">Inspect imagery <ArrowUpRight size={13} /></div></div></div>
              <div className="coordinates-strip"><div><span className="card-label">AOI BOUNDING BOX</span><strong>71.28, 33.44&nbsp;&nbsp;—&nbsp;&nbsp;71.60, 33.76</strong></div><button className="quiet-button">Copy coordinates</button></div>
            </div>
            <aside className={`trace-panel ${traceOpen ? 'open' : 'closed'}`}><button className="trace-header" onClick={() => setTraceOpen(!traceOpen)}><span><PanelRight size={15} /> EXECUTION TRACE</span><ChevronDown size={15} className={traceOpen ? 'rotate' : ''} /></button>{traceOpen && <div className="trace-body"><div className="trace-status"><span className="pulse" /> Agent pipeline active <span>00:04.2</span></div><div className="dag">{traceSteps.map((step, index) => { const Icon = step.icon; return <div className="dag-step" key={step.label}><div className={`dag-node ${step.state}`}><Icon size={15} /></div><div className="dag-copy"><strong>{step.label}</strong><span>{step.meta}</span></div>{index < traceSteps.length - 1 && <div className={`dag-line ${step.state === 'complete' ? 'complete' : ''}`} />}</div> })}</div><div className="json-block"><div><span>PIPELINE.JSON</span><button aria-label="Close JSON"><X size={13} /></button></div><pre>{`{\n  "intent": "flood_extent",\n  "aoi": "Kohat, PK",\n  "window": "P14D",\n  "sensor": ["S2"],\n  "method": "NDWI > 0.31"\n}`}</pre></div><button className="trace-detail"><SlidersHorizontal size={14} /> View full trace <ChevronRight size={14} /></button></div>}</aside>
          </div>
        </section>
      </div>
      <footer className="app-footer"><span><i className="live-dot" /> Vercel Edge / ap-south-1</span><span>DATA FRESHNESS <b>08 min</b></span><span>© SATQUERY AI · SIH 2026 · PS 26167</span><span className="footer-right">Press <kbd>⌘ K</kbd> for command palette</span></footer>
    </main>
  )
}
