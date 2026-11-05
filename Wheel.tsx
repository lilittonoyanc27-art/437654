import React, { useRef, useState } from 'react';
import { sound } from './sound';
import { Play, Sparkles } from 'lucide-react';

export interface WheelSector {
  label: string;
  subLabel?: string;
  points: number;
  color: string;
  textColor: string;
  isSpecial?: boolean;
}

export const SECTORS: WheelSector[] = [
  { label: '500', points: 500, color: '#16a34a', textColor: '#ffffff' },
  { label: '⚽ GOL!', subLabel: '1000', points: 1000, color: '#eab308', textColor: '#0f172a', isSpecial: true },
  { label: '250', points: 250, color: '#2563eb', textColor: '#ffffff' },
  { label: '750', points: 750, color: '#9333ea', textColor: '#ffffff' },
  { label: '⭐ 2X', subLabel: 'Doble', points: 1500, color: '#dc2626', textColor: '#ffffff', isSpecial: true },
  { label: '100', points: 100, color: '#0891b2', textColor: '#ffffff' },
  { label: '1000', points: 1000, color: '#f97316', textColor: '#ffffff' },
  { label: '🎁 BONUS', subLabel: '1200', points: 1200, color: '#ec4899', textColor: '#ffffff', isSpecial: true },
  { label: '300', points: 300, color: '#059669', textColor: '#ffffff' },
  { label: '1500', points: 1500, color: '#d97706', textColor: '#ffffff' },
  { label: '400', points: 400, color: '#4f46e5', textColor: '#ffffff' },
  { label: '🎯 TOP', subLabel: '2000', points: 2000, color: '#84cc16', textColor: '#0f172a', isSpecial: true },
];

interface WheelProps {
  onSpinEnd: (sector: WheelSector) => void;
  disabled?: boolean;
  isSpinning?: boolean;
}

export const Wheel: React.FC<WheelProps> = ({ onSpinEnd, disabled, isSpinning: externalIsSpinning }) => {
  const [rotation, setRotation] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [pointerJiggle, setPointerJiggle] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  const numSectors = SECTORS.length;
  const sectorAngle = 360 / numSectors;

  const spin = () => {
    if (spinning || disabled || externalIsSpinning) return;
    setSpinning(true);

    // Initial click sound
    sound.playSpinTick(600);

    // Determine random sector
    const extraRotations = 5 + Math.floor(Math.random() * 4); // 5 to 8 full spins
    const targetSectorIndex = Math.floor(Math.random() * numSectors);

    // Pointer is at TOP (90 deg or 270 deg depending on coordinate setup).
    // Let's standard: 0 deg = right (3 o'clock). Top pointer is at 270 deg (-90 deg).
    // Each sector i is from (i * sectorAngle) to ((i + 1) * sectorAngle).
    // Middle of sector i is i * sectorAngle + sectorAngle / 2.
    // When wheel rotates by R degrees, sector i ends up at: (initialAngle + R) % 360.
    // We want that sector to align with top pointer (270°).
    // So 270 - (targetSectorIndex * sectorAngle + sectorAngle / 2) + extraRotations * 360.
    const targetAngle = 270 - (targetSectorIndex * sectorAngle + sectorAngle / 2);
    const totalRotation = rotation + (360 - (rotation % 360)) + extraRotations * 360 + ((targetAngle % 360 + 360) % 360);

    const startRot = rotation;
    const delta = totalRotation - startRot;
    const duration = 4000; // ms
    const startTime = performance.now();
    let lastTickAngle = startRot;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic / quintic for realistic drum decel
      const ease = 1 - Math.pow(1 - progress, 3.5);
      const currentRot = startRot + delta * ease;
      setRotation(currentRot);

      // Trigger tick sound as pegs pass
      if (Math.abs(currentRot - lastTickAngle) >= sectorAngle * 0.95) {
        sound.playSpinTick(450 + (1 - progress) * 150);
        setPointerJiggle(true);
        setTimeout(() => setPointerJiggle(false), 50);
        lastTickAngle = currentRot;
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        sound.playWhistle();
        const finalSector = SECTORS[targetSectorIndex];
        onSpinEnd(finalSector);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const isActuallySpinning = spinning || externalIsSpinning;

  return (
    <div className="flex flex-col items-center select-none">
      {/* Drum Stage Container */}
      <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center p-3">
        {/* Glow ambient circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-emerald-500/20 to-blue-500/20 blur-2xl animate-pulse" />

        {/* Outer Golden & Stadium Stadium Rim */}
        <div className="absolute inset-2 rounded-full border-8 border-amber-400/90 shadow-[0_0_35px_rgba(245,158,11,0.45)] bg-slate-900/80 backdrop-blur-md flex items-center justify-center">
          {/* Subtle perimeter light studs */}
          {Array.from({ length: 24 }).map((_, idx) => {
            const angle = (idx * 360) / 24;
            return (
              <div
                key={idx}
                className="absolute w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_6px_#fde047]"
                style={{
                  transform: `rotate(${angle}deg) translate(0, -135px)`,
                }}
              />
            );
          })}
        </div>

        {/* Pointer / Needle at Top */}
        <div 
          className={`absolute top-0 z-30 flex flex-col items-center transition-transform duration-75 ${
            pointerJiggle ? '-translate-y-1 rotate-3 scale-110' : 'translate-y-0 rotate-0'
          }`}
        >
          <div className="w-7 h-10 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 clip-triangle shadow-2xl flex items-center justify-center border-t-2 border-white">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-inner" />
          </div>
        </div>

        {/* Rotating SVG Wheel */}
        <div
          className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 rounded-full overflow-hidden shadow-2xl transition-transform"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </radialGradient>
            </defs>

            {SECTORS.map((sector, index) => {
              const startAngle = index * sectorAngle;
              const endAngle = (index + 1) * sectorAngle;

              // Convert polar to cartesian
              const r = 200;
              const cx = 200;
              const cy = 200;
              const x1 = cx + r * Math.cos((Math.PI * startAngle) / 180);
              const y1 = cy + r * Math.sin((Math.PI * startAngle) / 180);
              const x2 = cx + r * Math.cos((Math.PI * endAngle) / 180);
              const y2 = cy + r * Math.sin((Math.PI * endAngle) / 180);

              const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
              const midAngle = startAngle + sectorAngle / 2;

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={sector.color}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="transition-colors hover:brightness-110"
                  />
                  {/* Text inside slice */}
                  <g transform={`rotate(${midAngle}, 200, 200)`}>
                    <text
                      x="330"
                      y="204"
                      textAnchor="middle"
                      fill={sector.textColor}
                      fontWeight="800"
                      fontSize="17"
                      fontFamily="system-ui, sans-serif"
                      transform="rotate(90, 330, 204)"
                      className="tracking-wider drop-shadow-md select-none"
                    >
                      {sector.label}
                    </text>
                    {sector.subLabel && (
                      <text
                        x="270"
                        y="203"
                        textAnchor="middle"
                        fill={sector.textColor}
                        fontWeight="700"
                        fontSize="11"
                        fontFamily="system-ui, sans-serif"
                        transform="rotate(90, 270, 203)"
                        opacity="0.9"
                      >
                        {sector.subLabel}
                      </text>
                    )}
                  </g>
                </g>
              );
            })}

            {/* Inner Ring */}
            <circle cx="200" cy="200" r="48" fill="url(#hubGrad)" stroke="#ffffff" strokeWidth="3" />
            <circle cx="200" cy="200" r="32" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
          </svg>
        </div>

        {/* Center Button: "GIRAR / ՊՏՏԵԼ" */}
        <button
          onClick={spin}
          disabled={isActuallySpinning || disabled}
          aria-label="Spin the wheel"
          className={`absolute z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-white font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.7)] border-4 border-amber-300 transition-all duration-200 active:scale-95 ${
            isActuallySpinning || disabled
              ? 'bg-slate-700 opacity-80 cursor-not-allowed border-slate-500'
              : 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 hover:scale-105 cursor-pointer hover:shadow-[0_0_30px_rgba(245,158,11,0.9)] animate-pulse'
          }`}
        >
          <span className="text-xl sm:text-2xl">⚽</span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-black text-slate-900 leading-tight">
            {isActuallySpinning ? '...' : 'GIRAR'}
          </span>
          <span className="text-[9px] font-bold text-slate-900/80 -mt-0.5">
            ՊՏՏԵԼ
          </span>
        </button>
      </div>

      {/* Action Button Below Wheel */}
      <button
        onClick={spin}
        disabled={isActuallySpinning || disabled}
        className={`mt-4 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 text-sm sm:text-base shadow-lg transition-all duration-200 ${
          isActuallySpinning || disabled
            ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
            : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-900/40 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40'
        }`}
      >
        <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
        <span>{isActuallySpinning ? 'Барабан вращается... / Պտտվում է...' : 'Крутить барабан / Պտտել բարաբանը'}</span>
        <Play className="w-4 h-4 fill-white ml-1" />
      </button>
    </div>
  );
};
