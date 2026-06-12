import React, { useState } from "react";
import { TopicDossier, CoreConcept } from "../types";
import { Compass, Beaker, CheckCircle, ArrowRight, Activity, Globe, Info, Sparkles } from "lucide-react";

interface ExploreTabProps {
  dossier: TopicDossier;
  onSearchTopic: (topic: string) => void;
}

export default function ExploreTab({ dossier, onSearchTopic }: ExploreTabProps) {
  const [activeConcept, setActiveConcept] = useState<string>(dossier.concepts[0]?.id || "");

  // Helper to render interactive SVG diagram based on concept hint
  const renderConceptDiagram = (hint?: string) => {
    switch (hint) {
      case "atom":
        return (
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center bg-zinc-950 rounded-lg border border-outline-variant/30 overflow-hidden">
            <div className="absolute w-6 h-6 bg-secondary rounded-full animate-ping opacity-60" />
            <div className="absolute w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-[9px] text-black font-bold">M</span>
            </div>
            {/* Orbit paths */}
            <div className="absolute w-24 h-24 border border-dashed border-white/20 rounded-full animate-[spin_8s_linear_infinite]" />
            <div className="absolute w-32 h-16 border border-dashed border-white/20 rounded-full rotate-45 animate-[spin_12s_linear_infinite]" />
            {/* Orbiting tiny particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-secondary rounded-full" />
          </div>
        );
      case "vortex":
        return (
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center bg-zinc-950 rounded-lg border border-outline-variant/30 overflow-hidden">
            {/* Spiraling elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,255,0,0.15)_0%,transparent_70%)]" />
            <svg className="w-28 h-28 text-secondary animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
              <path
                d="M 50 10 A 40 40 0 0 1 90 50 A 40 40 0 0 1 50 90 A 40 40 0 0 1 10 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <path
                d="M 50 20 A 30 30 0 0 1 80 50 A 30 30 0 0 1 50 80 A 30 30 0 0 1 20 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <circle cx="50" cy="50" r="4" fill="white" />
            </svg>
          </div>
        );
      case "wave":
        return (
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center bg-zinc-950 rounded-lg border border-outline-variant/30 overflow-hidden">
            <svg className="w-32 h-16 text-secondary" viewBox="0 0 120 60">
              <path
                d="M 0 30 Q 15 5, 30 30 T 60 30 T 90 30 T 120 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="animate-[pulse_2s_infinite]"
              />
              <path
                d="M 0 30 Q 15 55, 30 30 T 60 30 T 90 30 T 120 30"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.4"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center bg-zinc-950 rounded-lg border border-outline-variant/30 overflow-hidden">
            {/* Distributed points cluster */}
            <div className="absolute w-2 h-2 bg-secondary rounded-full top-[20%] left-[30%] animate-pulse" />
            <div className="absolute w-2.5 h-2.5 bg-white rounded-full top-[60%] left-[20%] animate-ping duration-1000" />
            <div className="absolute w-2 h-2 bg-secondary rounded-full top-[40%] left-[70%]" />
            <div className="absolute w-3 h-3 bg-white/40 rounded-full top-[75%] left-[65%]" />
            <div className="absolute w-1.5 h-1.5 bg-secondary rounded-full top-[15%] left-[80%] animate-pulse" />
          </div>
        );
    }
  };

  const activeConceptData = dossier.concepts.find(c => c.id === activeConcept) || dossier.concepts[0];

  return (
    <div className="space-y-8 animate-fade-in text-on-background">
      {/* Search Header Info */}
      <section className="bg-surface-container border border-outline-variant p-6 rounded-lg relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2.5 py-1 rounded">
              {dossier.category}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold tracking-tight leading-tight mt-3 mb-1">
              {dossier.topic}
            </h2>
            <p className="font-sans text-xs text-on-surface-variant font-semibold italic">
              Integrated Academic Research Dossier
            </p>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-high border border-outline-variant px-3 py-1.5 rounded-full text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse mr-1" />
            <span>KNOWLEDGE COMPILED: JUN 2026</span>
          </div>
        </div>

        <div className="mt-6 border-t border-outline-variant/50 pt-5 text-sm leading-relaxed max-w-4xl text-on-surface">
          <p className="font-serif text-lg italic text-white/90 font-medium mb-3">"{dossier.description}"</p>
          <div className="flex items-start gap-2 text-on-surface-variant text-xs mt-3 bg-surface-container-low p-3 rounded border border-outline-variant/40">
            <Info className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Historical Genesis:</strong> {dossier.eraSummary}
            </p>
          </div>
        </div>
      </section>

      {/* Real-time Web Search Grounding References */}
      {dossier.sources && dossier.sources.length > 0 && (
        <section className="bg-slate-900/40 border border-secondary/20 p-5 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4.5 h-4.5 text-secondary animate-pulse" />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              REAL-TIME OBSERVATIONAL WEB SOURCES USED (GOOGLE SEARCH GROUNDING)
            </span>
          </div>
          <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
            These active scientific journals, research centers, and global observation portals were live-scanned during the scan to compile and verify this dossier:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {dossier.sources.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 hover:border-secondary/60 p-3 rounded text-xs transition-all group"
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <p className="font-serif font-bold text-white/90 group-hover:text-secondary truncate text-xs">
                    {source.title}
                  </p>
                  <p className="font-mono text-[9px] text-on-surface-variant truncate">
                    {source.uri}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Grid: Laboratory replication & concept systems */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lab replication report card (Left, 7 cols) */}
        <div className="lg:col-span-7 bg-surface-container border border-outline-variant rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Beaker className="w-5 h-5 text-secondary" /> Active Lab Trials (2026)
            </h3>
            <span className="font-mono text-xs text-secondary bg-secondary/5 border border-secondary/20 px-2 py-0.5 rounded font-bold">
              EXPERIMENTAL SCAN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Closeness progress visualizer */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-surface-container-lowest rounded border border-outline-variant/60 text-center">
              <span className="text-[10px] font-mono tracking-widest uppercase text-on-surface-variant mb-1 font-bold">
                LAB CLOSENESS
              </span>
              <div className="relative flex items-center justify-center w-24 h-24 my-2">
                {/* Radial progress ring */}
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle cx="48" cy="48" r="40" fill="transparent" stroke="#121212" strokeWidth="6" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="#ccff00"
                    strokeWidth="6"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * (dossier.labStatus.currentNearness || 50)) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute font-mono text-2xl font-bold text-white">
                  {dossier.labStatus.currentNearness}%
                </div>
              </div>
              <span className="text-[10px] font-sans font-bold text-secondary">
                {dossier.labStatus.currentNearness >= 90 ? "PROXIMATE EDGE" : "IN PROGRESS"}
              </span>
            </div>

            {/* Status summaries */}
            <div className="md:col-span-8 text-xs space-y-3">
              <p className="text-on-surface leading-relaxed">{dossier.labStatus.statusSummary}</p>
              <div>
                <span className="inline-block text-[10px] uppercase font-mono font-bold bg-secondary text-black px-1.5 py-0.5 rounded mr-2">
                  2026 STATE
                </span>
                <span className="text-on-surface-variant italic leading-relaxed">{dossier.labStatus.achievements2026}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/50 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-bold mb-1.5">
                EXPERIMENTAL TECHNIQUES
              </p>
              <div className="bg-surface-container-low border border-outline-variant/30 p-2.5 rounded text-on-surface leading-relaxed">
                {dossier.labStatus.methodologyUsed}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant font-bold mb-1.5">
                NEXT FRONTIER STAGE
              </p>
              <div className="bg-surface-container-low border border-outline-variant/30 p-2.5 rounded text-on-surface leading-relaxed">
                {dossier.labStatus.futureMilestream}
              </div>
            </div>
          </div>

          <div className="border-t border-outline-variant/50 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 font-bold">
              COLLABORATING RESEARCH INSTITUTIONS
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {dossier.labStatus.labsAttempting.map((lab, index) => (
                <li key={index} className="flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant/30 px-3 py-1.5 rounded text-on-surface truncate">
                  <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  <span className="truncate">{lab}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Core theory concept selector (Right, 5 cols) */}
        <div className="lg:col-span-5 bg-surface-container border border-outline-variant rounded-lg p-6 h-full flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white border-b border-outline-variant/60 pb-3 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-secondary" /> Core Concept Models
            </h3>

            {/* Tiny selector tabs */}
            <div className="flex gap-2 mb-4 bg-surface-container-lowest p-1 rounded border border-outline-variant/40">
              {dossier.concepts.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => setActiveConcept(concept.id)}
                  className={`flex-1 text-center py-1.5 rounded text-[10px] font-mono tracking-wider font-bold transition-all uppercase ${
                    activeConcept === concept.id
                      ? "bg-secondary text-black"
                      : "text-on-surface-variant hover:text-white"
                  }`}
                >
                  {concept.id}
                </button>
              ))}
            </div>

            {/* Concept details */}
            {activeConceptData && (
              <div className="space-y-4">
                <div className="bg-surface-container-low border border-outline-variant p-4 rounded min-h-[140px] flex flex-col justify-center">
                  <h4 className="font-serif text-base text-secondary font-bold mb-2">
                    {activeConceptData.title}
                  </h4>
                  <p className="font-sans text-xs text-on-surface leading-relaxed">
                    {activeConceptData.explanation}
                  </p>
                </div>

                {/* Conceptual diagram */}
                <div className="py-2">
                  <p className="text-center font-mono text-[9px] text-on-surface-variant tracking-wider uppercase mb-2 font-bold">
                    [ CONFLICTING MODEL MATRIX SCHEME ]
                  </p>
                  {renderConceptDiagram(activeConceptData.svgDiagramHint)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Follow-up Searches */}
      {dossier.relatedQueries && dossier.relatedQueries.length > 0 && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5">
          <p className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-secondary" /> RECOMMENDED DEEP-SEARCH SUB-TRAILS
          </p>
          <div className="flex flex-wrap gap-2.5">
            {dossier.relatedQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => onSearchTopic(query)}
                className="group text-xs font-medium font-sans text-on-surface border border-outline-variant hover:border-secondary hover:bg-secondary/5 px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{query}</span>
                <ArrowRight className="w-3 h-3 text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
