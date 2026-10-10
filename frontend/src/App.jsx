import { useState } from 'react'

export default function App() {
  const [activeTab, setActiveTab] = useState('queue')

  // Mock initial data for your academic interests & papers
  const [interests] = useState([
    { id: 1, name: 'Immersive Analytics & VR', activePapers: 12 },
    { id: 2, name: 'Scientific Data Visualization', activePapers: 28 },
    { id: 3, name: 'Distributed Backend Microservices', activePapers: 7 },
  ])

  const [queue, setQueue] = useState([
    {
      id: 1,
      title: 'Real-Time Rendering of Multi-Terabyte Astronomical Datasets in Virtual Reality',
      authors: 'V. Vance, J. Kepler et al.',
      venue: 'IEEE Transactions on Visualization and Computer Graphics',
      tldr: 'Proposes a hybrid Level-of-Detail (LoD) streaming framework that maintains 90 FPS across dome and VR displays for massive point clouds.',
      status: 'In Queue',
    },
    {
      id: 2,
      title: 'A Fault-Tolerant Consensus Protocol for Distributed Edge Worker Tracking',
      authors: 'M. H. System et al.',
      venue: 'OSDI 2025',
      tldr: 'Introduces an optimized Raft-based consensus topology designed to reduce heartbeat latency over lossy wireless edge networks.',
      status: 'In Queue',
    }
  ])

  const [feed, setFeed] = useState([
    {
      id: 3,
      title: 'Neural Implicit Surfaces for High-Precision Scientific Iso-Contouring',
      authors: 'A. Turing, C. Shannon',
      venue: 'SIGGRAPH 2026',
      tldr: 'Replaces traditional marching cubes algorithms with coordinate-based neural networks to represent continuous volumetric fields memory-efficiently.',
      matchScore: '96% Match',
      area: 'Scientific Data Visualization'
    }
  ])

  const addToQueue = (paper) => {
    setFeed(feed.filter(p => p.id !== paper.id))
    setQueue([...queue, { ...paper, status: 'In Queue' }])
  }

  const removeFromQueue = (id) => {
    setQueue(queue.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              List Queue
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">
            System Status: Connected
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-6xl mx-auto px-6 py-8 flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Areas of Interest */}
        <aside className="space-y-6 md:col-span-1">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Areas of Interest
            </h3>
            <div className="space-y-2">
              {interests.map((tag) => (
                <div 
                  key={tag.id}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer group"
                >
                  <div className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition">
                    {tag.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {tag.activePapers} new papers indexed
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Queue Capacity
            </h4>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {queue.length} <span className="text-xs text-slate-400 font-normal">/ 5 max active</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Keep your queue capped to prevent cognitive overload.
            </p>
          </div>
        </aside>

        {/* Right Content Area: Tabs & Papers */}
        <section className="md:col-span-3 space-y-6">
          {/* Tab Switcher */}
          <div className="flex border-b border-slate-800 space-x-6">
            <button
              onClick={() => setActiveTab('queue')}
              className={`pb-3 text-sm font-medium transition relative ${
                activeTab === 'queue' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Reading Queue ({queue.length})
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`pb-3 text-sm font-medium transition relative ${
                activeTab === 'feed' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Smart Recommendations Feed ({feed.length})
            </button>
          </div>

          {/* TAB 1: READING QUEUE */}
          {activeTab === 'queue' && (
            <div className="space-y-4">
              {queue.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 text-sm">Your queue is empty. Pull items from your recommendation feed.</p>
                </div>
              ) : (
                queue.map((paper) => (
                  <div key={paper.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-slate-100 leading-snug">
                        {paper.title}
                      </h4>
                      <span className="shrink-0 text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20">
                        {paper.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      {paper.authors} — <span className="text-slate-300 italic">{paper.venue}</span>
                    </p>
                    <p className="text-sm text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                      <span className="font-semibold text-slate-400">TLDR:</span> {paper.tldr}
                    </p>
                    <div className="flex justify-end space-x-3 pt-2">
                      <button 
                        onClick={() => removeFromQueue(paper.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 transition"
                      >
                        Archive / Remove
                      </button>
                      <button className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-lg transition shadow-sm">
                        Mark as Read
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: FEED */}
          {activeTab === 'feed' && (
            <div className="space-y-4">
              {feed.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 text-sm">No new recommendations available right now. Check back later or add seed papers.</p>
                </div>
              ) : (
                feed.map((paper) => (
                  <div key={paper.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-slate-100 leading-snug">
                        {paper.title}
                      </h4>
                      <span className="shrink-0 text-xs font-mono bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded border border-blue-500/20">
                        {paper.matchScore}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      {paper.authors} — <span className="text-slate-300 italic">{paper.venue}</span>
                    </p>
                    <p className="text-sm text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                      <span className="font-semibold text-slate-400">TLDR:</span> {paper.tldr}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-500 font-mono">Tag: {paper.area}</span>
                      <div className="space-x-3">
                        <button className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 transition">
                          Not Relevant
                        </button>
                        <button 
                          onClick={() => addToQueue(paper)}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium px-4 py-1.5 rounded-lg transition"
                        >
                          + Add to Queue
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </section>
      </main>
    </div>
  )
}