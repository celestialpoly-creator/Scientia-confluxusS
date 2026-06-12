import React, { useState, useEffect } from "react";
import { Zap, RefreshCw, ShieldAlert, CheckCircle2 } from "lucide-react";

interface Node {
  id: number;
  x: number;
  y: number;
  state: "stable" | "excited" | "perturbed";
  label: string;
}

interface Connection {
  from: number;
  to: number;
}

export default function StabilityVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, x: 70, y: 50, state: "stable", label: "α₁" },
    { id: 2, x: 190, y: 70, state: "perturbed", label: "β₁" },
    { id: 3, x: 310, y: 40, state: "stable", label: "γ₁" },
    { id: 4, x: 100, y: 150, state: "excited", label: "α₂" },
    { id: 5, x: 220, y: 160, state: "stable", label: "β₂" },
    { id: 6, x: 330, y: 140, state: "excited", label: "γ₂" },
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
  ]);

  const [fidelity, setFidelity] = useState<number>(84.3);
  const [errorRate, setErrorRate] = useState<number>(2.41);
  const [braidActive, setBraidActive] = useState<boolean>(false);
  const [noiseInterval, setNoiseInterval] = useState<number>(0);

  // Periodic random disturbance to keep it dynamic but manageable
  useEffect(() => {
    const interval = window.setInterval(() => {
      setNodes((prevNodes) => {
        const randomIndex = Math.floor(Math.random() * prevNodes.length);
        return prevNodes.map((node, idx) => {
          if (idx === randomIndex && node.state === "stable") {
            const nextStates: ("excited" | "perturbed")[] = ["excited", "perturbed"];
            const nextState = nextStates[Math.floor(Math.random() * nextStates.length)];
            return { ...node, state: nextState };
          }
          return node;
        });
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Recalculate states based on nodes
  useEffect(() => {
    const total = nodes.length;
    const stableCount = nodes.filter((n) => n.state === "stable").length;
    const computedFidelity = 60 + (stableCount / total) * 40 - (braidActive ? 0 : 5);
    const computedError = 0.5 + ((total - stableCount) / total) * 4;

    setFidelity(parseFloat(computedFidelity.toFixed(1)));
    setErrorRate(parseFloat(computedError.toFixed(2)));
  }, [nodes, braidActive]);

  const handleNodeClick = (id: number) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === id) {
          const nextState = node.state === "stable" ? "excited" : "stable";
          return { ...node, state: nextState };
        }
        return node;
      })
    );
  };

  const stabilizeAll = () => {
    setBraidActive(true);
    // Simulate complex topological matching algorithm
    setNodes((prevNodes) =>
      prevNodes.map((node) => ({ ...node, state: "stable" }))
    );
    setTimeout(() => {
      setBraidActive(false);
    }, 1200);
  };

  const scrambleLattice = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const states: ("stable" | "excited" | "perturbed")[] = ["stable", "excited", "perturbed"];
        const randomState = states[Math.floor(Math.random() * states.length)];
        return { ...node, state: randomState };
      })
    );
  };

  return (
    <div id="stability-simulator" className="bg-surface-container border border-outline-variant p-5 rounded-lg flex flex-col md:flex-row gap-5 mb-8">
      {/* Simulation Screen */}
      <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded p-4 relative overflow-hidden flex flex-col justify-between h-[280px]">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:16px_16px] opacity-70 pointer-events-none" />

        {/* Top bar info */}
        <div className="relative z-10 flex justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-1.5 text-on-surface">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>LATTICE STATUS: {fidelity > 90 ? "TOPOLOGICALLY PROTECTED" : "COHERENCE WARNING"}</span>
          </div>
          <span className="text-on-surface-variant font-semibold">InSb NANOWIRE MATRIX v1.08</span>
        </div>

        {/* Interactive SVG Lattice */}
        <div className="relative w-full h-[180px] mt-2 flex items-center justify-center">
          <svg className="w-full h-full max-w-[400px]" viewBox="0 0 400 200">
            {/* Draw Connections */}
            {connections.map((conn, idx) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isBothStable = fromNode.state === "stable" && toNode.state === "stable";
              let strokeColor = "stroke-surface-container-highest";
              let strokeWidth = 1.5;
              let strokeDash = "0";

              if (braidActive) {
                strokeColor = "stroke-secondary";
                strokeWidth = 2.5;
              } else if (isBothStable) {
                strokeColor = "stroke-secondary/60";
                strokeWidth = 2;
              } else if (fromNode.state === "excited" || toNode.state === "excited") {
                strokeColor = "stroke-error/40";
                strokeDash = "4 4";
              }

              return (
                <line
                  key={`conn-${idx}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={`transition-all duration-500 ${strokeColor}`}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                />
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              let fillClass = "fill-surface-container-highest stroke-outline";
              let glowColor = "rgba(0,0,0,0)";

              if (node.state === "stable") {
                fillClass = "fill-secondary text-on-secondary stroke-secondary";
                glowColor = "#ccff00";
              } else if (node.state === "excited") {
                fillClass = "fill-error-container stroke-error";
                glowColor = "#ff4545";
              } else if (node.state === "perturbed") {
                fillClass = "fill-surface-container stroke-outline-variant";
              }

              return (
                <g
                  key={`node-${node.id}`}
                  className="cursor-pointer select-none group"
                  onClick={() => handleNodeClick(node.id)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    className={`transition-all duration-300 ${fillClass}`}
                    strokeWidth={2}
                    style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className={`font-mono text-[11px] font-bold group-hover:scale-110 transition-transform ${node.state === 'stable' ? 'fill-black' : 'fill-white'}`}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Tip text */}
        <div className="relative z-10 text-[11px] text-on-surface-variant text-center font-sans tracking-wide">
          💡 Click excited/perturbed nodes to manually stabilize, or trigger <b className="text-secondary">Self-Healing Braid</b>.
        </div>
      </div>

      {/* Control Pane & Realtime Analytics */}
      <div className="w-full md:w-[260px] flex flex-col justify-between">
        <div>
          <h4 className="font-headline-sm text-sm tracking-tight text-primary mb-2 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-secondary" /> Topological Stability
          </h4>
          <p className="text-xs text-on-surface-variant font-sans mb-4">
            Simulate non-abelian anyon braiding in Indium Antimonide junctions to maintain logical qubit state integrity.
          </p>

          {/* Diagnostic Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-4 font-mono">
            <div className="bg-surface-container-low border border-outline-variant rounded p-2 text-center">
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider">Fidelity</span>
              <span className={`text-base font-bold transition-all ${fidelity > 90 ? "text-secondary" : "text-primary"}`}>
                {fidelity}%
              </span>
            </div>
            <div className="bg-surface-container-low border border-outline-variant rounded p-2 text-center">
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider">Error Rate</span>
              <span className={`text-base font-bold transition-all ${errorRate > 3 ? "text-error" : "text-primary"}`}>
                {errorRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={stabilizeAll}
            disabled={braidActive}
            id="braid-healing-btn"
            className="flex items-center justify-center gap-2 w-full py-2 bg-primary-container text-white text-xs font-semibold rounded hover:bg-black transition-all active:scale-[0.98] disabled:opacity-55"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${braidActive ? "animate-spin" : ""}`} />
            Self-Healing Braid
          </button>
          
          <button
            onClick={scrambleLattice}
            id="inject-noise-btn"
            className="flex items-center justify-center gap-2 w-full py-2 border border-outline text-primary text-xs font-semibold rounded hover:bg-surface-container-high transition-all active:scale-[0.98]"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Inject Noise
          </button>
        </div>
      </div>
    </div>
  );
}
