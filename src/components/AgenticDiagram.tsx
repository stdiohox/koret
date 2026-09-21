import { Search, Headset, Calendar, ClipboardEdit, Mail } from 'lucide-react';

const nodes = [
  { label: 'Qualify Leads', icon: Search, angle: -90 },
  { label: 'Respond to Customers', icon: Headset, angle: -30 },
  { label: 'Book Calls', icon: Calendar, angle: 30 },
  { label: 'Update Records', icon: ClipboardEdit, angle: 90 },
  { label: 'Follow Up', icon: Mail, angle: 150 },
];

export default function AgenticDiagram() {
  // 135, not 150: at 150 the widest label ("Respond to Customers", ~147 units at
  // 13px) ran to x=403 and the viewBox clipped its tail. 135 pulls that node in to
  // x=317, so the label ends at 390 with room to spare at every angle.
  const radius = 135;
  const center = 200;
  const half = 30; // node box half-size

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full transition-transform duration-500 group-hover:scale-105">
      {nodes.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        // Stop the line short of the node box, or the arrowhead lands underneath it:
        // the boxes are painted after the lines, so a full-length line hides its own
        // marker. `half / max(|cos|,|sin|)` is the box's half-extent along this ray,
        // which is larger on the diagonals than on the axes.
        const reach = radius - half / Math.max(Math.abs(Math.cos(rad)), Math.abs(Math.sin(rad))) - 8;
        const x = center + reach * Math.cos(rad);
        const y = center + reach * Math.sin(rad);
        return (
          <line
            key={`line-${node.label}`}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#FD7F00"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        );
      })}

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#FD7F00" />
        </marker>
      </defs>

      <circle cx={center} cy={center} r="45" fill="#FD7F00" />
      <text x={center} y={center + 5} textAnchor="middle" fontSize="16" fontWeight="700" fill="#ffffff">
        Agent
      </text>

      {nodes.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        const Icon = node.icon;
        return (
          <g key={node.label}>
            <rect x={x - 30} y={y - 30} width="60" height="60" rx="12" fill="#ffffff" stroke="#E1E8F0" />
            <foreignObject x={x - 15} y={y - 15} width="30" height="30">
              <Icon size={30} color="#00419B" strokeWidth={1.5} />
            </foreignObject>
            <text x={x} y={y + 45} textAnchor="middle" fontSize="13" fontWeight="600" fill="#121722">
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
