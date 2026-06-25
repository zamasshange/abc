type CardIllustrationProps = {
  id: string;
  className?: string;
};

export function CardIllustration({ id, className = "h-full w-full" }: CardIllustrationProps) {
  const stroke = "#1a1a1a";
  const dash = "4 3";
  const svgProps = {
    className,
    preserveAspectRatio: "xMidYMid meet" as const,
    "aria-hidden": true as const,
  };

  switch (id) {
    case "colors-worksheets":
      return (
        <svg viewBox="0 0 120 100" {...svgProps}>
          <path d="M25 75 L45 35 L65 50 L90 20" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="45,35 50,22 58,32" fill={stroke} />
          <path d="M18 22 L22 18 L26 22 L22 26 Z" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="88" cy="28" r="4" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M86 28 L90 28 M88 26 L88 30" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case "colors-matching":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <ellipse cx="45" cy="55" rx="22" ry="28" fill="#C68642" stroke={stroke} strokeWidth="2" />
          <circle cx="38" cy="45" r="4" fill={stroke} />
          <circle cx="52" cy="45" r="4" fill={stroke} />
          <path d="M38 58 Q45 65 52 58" fill="none" stroke={stroke} strokeWidth="2" />
          <ellipse cx="75" cy="55" rx="22" ry="28" fill="#fff" stroke={stroke} strokeWidth="2" />
          <circle cx="68" cy="45" r="4" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="82" cy="45" r="4" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M68 58 Q75 65 82 58" fill="none" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "colors-fill":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M35 70 Q45 30 60 35 Q75 40 70 65 Q65 80 50 75 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="48" cy="50" r="8" fill="none" stroke={stroke} strokeWidth="1.5" />
          <text x="45" y="53" fontSize="8" fill={stroke}>1</text>
          <text x="58" y="48" fontSize="8" fill={stroke}>2</text>
          <circle cx="95" cy="30" r="5" fill="#FF99CC" />
          <text x="92" y="33" fontSize="7" fill="#fff">1</text>
          <circle cx="95" cy="45" r="5" fill="#FF5599" />
          <text x="92" y="48" fontSize="7" fill="#fff">2</text>
          <circle cx="95" cy="60" r="5" fill="#99EEFF" />
          <text x="92" y="63" fontSize="7" fill="#fff">3</text>
        </svg>
      );
    case "colors-pixel":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => {
              const colors = ["#1a1a1a", "#fff", "#FF99CC", "#1a1a1a", "#fff", "#FF99CC", "#1a1a1a", "#fff"];
              const c = colors[(row + col) % colors.length];
              return <rect key={`${row}-${col}`} x={30 + col * 8} y={20 + row * 8} width="7" height="7" fill={c} stroke="#ccc" strokeWidth="0.3" />;
            })
          )}
          <ellipse cx="54" cy="28" rx="6" ry="4" fill="#FF99CC" />
        </svg>
      );
    case "connect-practice":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {[[20,70],[35,55],[50,60],[65,45],[80,50],[95,35]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill={stroke} />
              <text x={x-3} y={y-6} fontSize="7" fill={stroke}>{i+1}</text>
            </g>
          ))}
          <path d="M20 70 L35 55 L50 60 L65 45 L80 50 L95 35" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
          <rect x="15" y="72" width="30" height="12" rx="2" fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "connect-easy":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <circle cx="60" cy="50" r="25" fill="none" stroke={stroke} strokeWidth="2" />
          {[[60,25],[75,35],[80,50],[75,65],[60,75],[45,65],[40,50],[45,35]].map(([x,y], i) => (
            <g key={i}><circle cx={x} cy={y} r="3" fill={stroke} /><text x={x-3} y={y-5} fontSize="6" fill={stroke}>{i+1}</text></g>
          ))}
        </svg>
      );
    case "connect-hard":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <circle cx="60" cy="50" r="30" fill="none" stroke={stroke} strokeWidth="1.5" />
          {Array.from({length:9}).map((_, i) => {
            const a = (i/9)*Math.PI*2 - Math.PI/2;
            const x = 60 + Math.cos(a)*30;
            const y = 50 + Math.sin(a)*30;
            return <g key={i}><circle cx={x} cy={y} r="2.5" fill={stroke} /><text x={x-3} y={y-5} fontSize="6" fill={stroke}>{i+1}</text></g>;
          })}
        </svg>
      );
    case "connect-learn":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M30 60 Q30 30 55 30 Q80 30 80 55 Q80 75 55 75 Q30 75 30 60" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M55 30 Q80 30 80 55" fill="none" stroke="#FF5555" strokeWidth="2" strokeDasharray={dash} />
          <path d="M30 45 L45 35" stroke="#FF5555" strokeWidth="2" fill="none" />
        </svg>
      );
    case "mazes-practice":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <circle cx="60" cy="50" r="35" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="60" cy="50" r="22" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="60" cy="50" r="10" fill="none" stroke={stroke} strokeWidth="1.5" />
          <text x="57" y="53" fontSize="10">🥕</text>
          <text x="22" y="78" fontSize="12">🐰</text>
        </svg>
      );
    case "mazes-easy":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <polygon points="60,15 95,50 80,85 40,85 25,50" fill="none" stroke={stroke} strokeWidth="2" />
          <polygon points="60,30 80,50 70,70 50,70 40,50" fill="none" stroke={stroke} strokeWidth="1.5" />
          <text x="57" y="53" fontSize="10">🌸</text>
          <text x="18" y="55" fontSize="12">🐝</text>
        </svg>
      );
    case "mazes-hard":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M60 20 C85 20 95 40 90 55 C85 75 60 85 40 75 C20 65 25 35 45 25 C50 22 55 20 60 20 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <text x="55" y="50" fontSize="10">🍎</text>
          <text x="20" y="70" fontSize="12">🐌</text>
        </svg>
      );
    case "mazes-worksheets":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <rect x="25" y="20" width="70" height="60" fill="none" stroke={stroke} strokeWidth="2" />
          <polygon points="35,35 45,50 35,65" fill="none" stroke={stroke} strokeWidth="1.5" />
          <rect x="55" y="35" width="15" height="15" fill="none" stroke={stroke} strokeWidth="1.5" />
          <text x="28" y="30" fontSize="10">🦀</text>
        </svg>
      );
    case "lines-dots":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {/* Penguin */}
          <ellipse cx="32" cy="58" rx="14" ry="18" fill="#fff" stroke={stroke} strokeWidth="2" />
          <ellipse cx="32" cy="52" rx="10" ry="12" fill="#fff" stroke={stroke} strokeWidth="1.5" />
          <circle cx="28" cy="50" r="2.5" fill={stroke} />
          <circle cx="36" cy="50" r="2.5" fill={stroke} />
          <polygon points="28,38 32,28 36,38" fill={stroke} />
          <rect x="26" y="36" width="12" height="4" rx="1" fill="#fff" stroke={stroke} strokeWidth="1" />
          <ellipse cx="32" cy="56" rx="4" ry="3" fill="#FF8866" />
          {/* Dotted line */}
          <circle cx="68" cy="52" r="4" fill={stroke} />
          <circle cx="102" cy="52" r="4" fill={stroke} />
          <line x1="72" y1="52" x2="98" y2="52" stroke={stroke} strokeWidth="2.5" strokeDasharray={dash} />
        </svg>
      );
    case "lines-line":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {/* Mountain */}
          <path d="M18 72 L38 38 L52 55 L68 28 L82 72 Z" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <line x1="38" y1="38" x2="38" y2="28" stroke={stroke} strokeWidth="2" />
          <polygon points="38,22 33,30 43,30" fill="#FF4444" />
          {/* V-shaped dotted line */}
          <circle cx="72" cy="68" r="4" fill={stroke} />
          <circle cx="102" cy="68" r="4" fill={stroke} />
          <path d="M72 68 L87 38 L102 68" fill="none" stroke={stroke} strokeWidth="2.5" strokeDasharray={dash} strokeLinejoin="round" />
        </svg>
      );
    case "lines-curve":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {/* Chair */}
          <rect x="18" y="58" width="28" height="5" rx="1" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="22" y1="58" x2="22" y2="40" stroke={stroke} strokeWidth="2" />
          <line x1="42" y1="58" x2="42" y2="40" stroke={stroke} strokeWidth="2" />
          <path d="M22 40 Q32 28 42 40" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="22" y1="48" x2="42" y2="48" stroke={stroke} strokeWidth="1.5" />
          {/* Arc dotted line */}
          <circle cx="72" cy="68" r="4" fill={stroke} />
          <circle cx="102" cy="68" r="4" fill={stroke} />
          <path d="M72 68 Q87 32 102 68" fill="none" stroke={stroke} strokeWidth="2.5" strokeDasharray={dash} />
        </svg>
      );
    case "lines-practice":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {/* Dog */}
          <ellipse cx="30" cy="58" rx="16" ry="13" fill="#fff" stroke={stroke} strokeWidth="2" />
          <circle cx="24" cy="52" r="3" fill={stroke} />
          <circle cx="36" cy="52" r="3" fill={stroke} />
          <ellipse cx="18" cy="48" rx="6" ry="8" fill="#fff" stroke={stroke} strokeWidth="1.5" />
          <ellipse cx="42" cy="48" rx="6" ry="8" fill="#fff" stroke={stroke} strokeWidth="1.5" />
          <path d="M26 62 Q30 66 34 62" fill="none" stroke={stroke} strokeWidth="1.5" />
          {/* Bone */}
          <ellipse cx="95" cy="72" rx="12" ry="5" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="85" cy="72" r="5" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="105" cy="72" r="5" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="50" cy="58" r="3.5" fill={stroke} />
          <line x1="54" y1="58" x2="82" y2="70" stroke={stroke} strokeWidth="2.5" strokeDasharray={dash} />
        </svg>
      );
    case "alpha-trace-upper":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <line x1="15" y1="28" x2="105" y2="28" stroke="#5599DD" strokeWidth="1.5" />
          <line x1="15" y1="48" x2="105" y2="48" stroke="#FF8888" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="15" y1="68" x2="105" y2="68" stroke="#5599DD" strokeWidth="1.5" />
          <text x="60" y="66" textAnchor="middle" fontSize="44" fontWeight="bold" fill="none" stroke={stroke} strokeWidth="2.5">A</text>
          {[[48,66],[60,38],[72,66],[52,54],[68,54]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#FF3333" />
          ))}
        </svg>
      );
    case "alpha-trace-lower":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {[30,45,60,75].map(y => <line key={y} x1="20" y1={y} x2="100" y2={y} stroke="#FFCCCC" strokeWidth="1" strokeDasharray="3 3" />)}
          <text x="60" y="72" textAnchor="middle" fontSize="48" fontWeight="bold" fill="none" stroke={stroke} strokeWidth="2">a</text>
          <circle cx="60" cy="55" r="18" fill="none" stroke="#FF3333" strokeWidth="2" strokeDasharray="3 2" />
        </svg>
      );
    case "alpha-upper":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="35" y="68" textAnchor="middle" fontSize="48" fontWeight="bold" fill={stroke}>A</text>
          <circle cx="80" cy="55" r="14" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M80 42 Q80 35 80 42" fill="none" stroke="#2DB84D" strokeWidth="2" />
        </svg>
      );
    case "alpha-lower":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="35" y="72" textAnchor="middle" fontSize="48" fontWeight="bold" fill={stroke}>a</text>
          <circle cx="80" cy="55" r="14" fill="none" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "num-tracing":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {[22,36,50,64,78].map(y => <line key={y} x1="12" y1={y} x2="108" y2={y} stroke="#FFAAAA" strokeWidth="1" strokeDasharray="4 3" />)}
          <text x="55" y="72" textAnchor="middle" fontSize="50" fontWeight="bold" fill="none" stroke={stroke} strokeWidth="3">1</text>
          {[[55,28],[55,45],[55,62],[55,78]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#FF3333" />
          ))}
        </svg>
      );
    case "num-counting":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="30" y="68" textAnchor="middle" fontSize="52" fontWeight="bold" fill={stroke}>2</text>
          <circle cx="75" cy="50" r="8" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="75" y1="42" x2="75" y2="35" stroke={stroke} strokeWidth="2" />
          <circle cx="90" cy="55" r="8" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="90" y1="47" x2="90" y2="40" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "num-practice":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <rect x="15" y="25" width="40" height="50" fill="none" stroke="#999" strokeWidth="2" strokeDasharray={dash} />
          <text x="35" y="65" textAnchor="middle" fontSize="40" fill="none" stroke="#999" strokeWidth="2" strokeDasharray={dash}>4</text>
          {[0,1,2,3].map(i => (
            <path key={i} d={`M${65+i*12} 70 Q${68+i*12} 50 ${71+i*12} 70`} fill="none" stroke={stroke} strokeWidth="1.5" />
          ))}
        </svg>
      );
    case "num-spelling":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="25" y="60" fontSize="36" fill="#999" fontWeight="bold">1</text>
          <text x="50" y="62" fontSize="28" fill="none" stroke="#999" strokeWidth="2" strokeDasharray={dash}>one</text>
        </svg>
      );
    case "shapes-learn":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <circle cx="40" cy="45" r="18" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <polygon points="80,25 95,65 65,65" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        </svg>
      );
    case "shapes-practice":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <polygon points="40,30 55,65 25,65" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <polygon points="80,35 95,55 80,75 65,55" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        </svg>
      );
    case "shapes-drawings":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M30 70 L50 50 L70 55 L90 40" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <path d="M25 75 Q40 65 55 75 T85 75" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
          <circle cx="75" cy="25" r="8" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        </svg>
      );
    case "shapes-worksheets":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <rect x="40" y="25" width="40" height="50" rx="5" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M48 40 Q55 35 62 40" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="52" cy="48" r="2" fill={stroke} />
          <circle cx="68" cy="48" r="2" fill={stroke} />
        </svg>
      );
    case "colors-how-to-draw":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <circle cx="40" cy="35" r="16" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="65" cy="35" r="16" fill="none" stroke={stroke} strokeWidth="2" />
          <polygon points="52,48 42,72 62,72" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="48" cy="58" r="2.5" fill={stroke} />
          <circle cx="56" cy="58" r="2.5" fill={stroke} />
        </svg>
      );
    case "colors-create":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M60 25 Q75 35 70 55 Q65 75 50 70 Q35 65 40 45 Q45 30 60 25" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M45 50 Q50 40 55 50" fill="none" stroke="#FF9800" strokeWidth="2" strokeDasharray={dash} />
          <line x1="48" y1="62" x2="42" y2="78" stroke={stroke} strokeWidth="2" />
          <line x1="55" y1="62" x2="50" y2="80" stroke={stroke} strokeWidth="2" />
          <line x1="62" y1="62" x2="68" y2="78" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "colors-pair":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M30 35 Q30 20 40 20 Q50 20 50 35 L50 70 Q50 85 40 85 Q30 85 30 70 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M70 35 Q70 20 80 20 Q90 20 90 35 L90 70 Q90 85 80 85 Q70 85 70 70 Z" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="38" cy="40" r="3" fill="#FF99CC" />
          <circle cx="78" cy="40" r="3" fill="#FF99CC" />
        </svg>
      );
    case "mazes-numbers":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <ellipse cx="60" cy="50" rx="35" ry="28" fill="none" stroke={stroke} strokeWidth="2" />
          <text x="55" y="55" fontSize="20" fontWeight="bold">1</text>
          <text x="22" y="78" fontSize="10">🍒</text>
          <text x="88" y="35" fontSize="10">🍌</text>
        </svg>
      );
    case "mazes-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <ellipse cx="60" cy="50" rx="35" ry="28" fill="none" stroke={stroke} strokeWidth="2" />
          <text x="30" y="55" fontSize="14" fontWeight="bold">C</text>
          <text x="85" y="40" fontSize="12">⭐</text>
          <text x="85" y="65" fontSize="12">🐟</text>
        </svg>
      );
    case "mazes-shapes":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <ellipse cx="60" cy="50" rx="35" ry="28" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="82" y="38" width="14" height="14" fill="none" stroke={stroke} strokeWidth="1.5" />
          <polygon points="25,65 35,45 45,65" fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "alpha-cursive":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {[32, 48, 64, 80].map((y) => <line key={y} x1="15" y1={y} x2="105" y2={y} stroke="#FFAAAA" strokeWidth="1" />)}
          <text x="35" y="68" fontSize="36" fill={stroke} fontStyle="italic">a</text>
          <text x="65" y="68" fontSize="36" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray={dash} fontStyle="italic">a</text>
        </svg>
      );
    case "alpha-letter-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="30" y="40" fontSize="22" fontWeight="bold">B</text>
          <text x="30" y="72" fontSize="22" fontWeight="bold">A</text>
          <text x="80" y="40" fontSize="22" fontWeight="bold">a</text>
          <text x="80" y="72" fontSize="22" fontWeight="bold">b</text>
          <line x1="38" y1="38" x2="72" y2="70" stroke="#999" strokeWidth="1.5" strokeDasharray={dash} />
        </svg>
      );
    case "alpha-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="25" y="45" fontSize="24" fontWeight="bold">A</text>
          <text x="25" y="78" fontSize="24" fontWeight="bold">B</text>
          <circle cx="80" cy="42" r="12" fill="none" stroke={stroke} strokeWidth="2" />
          <ellipse cx="80" cy="72" rx="10" ry="12" fill="none" stroke={stroke} strokeWidth="2" />
        </svg>
      );
    case "alpha-jigsaw":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="60" y="68" textAnchor="middle" fontSize="52" fontWeight="bold" fill="#999">A</text>
          <line x1="60" y1="25" x2="60" y2="80" stroke="#bbb" strokeWidth="2" />
          <line x1="35" y1="52" x2="85" y2="52" stroke="#bbb" strokeWidth="2" />
        </svg>
      );
    case "num-worksheets":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="20" y="40" fontSize="16">1 2 ___</text>
          <text x="20" y="65" fontSize="16">8 ___ 10</text>
        </svg>
      );
    case "num-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="25" y="38" fontSize="28" fontWeight="bold">2</text>
          <text x="55" y="38" fontSize="28" fontWeight="bold">1</text>
          <text x="80" y="55" fontSize="14">🍭🍭</text>
          <text x="80" y="75" fontSize="14">🍭</text>
          <line x1="40" y1="42" x2="75" y2="52" stroke="#999" strokeWidth="1.5" strokeDasharray={dash} />
        </svg>
      );
    case "num-jigsaw":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="60" y="68" textAnchor="middle" fontSize="52" fontWeight="bold" fill="#999">1</text>
          <line x1="60" y1="25" x2="60" y2="80" stroke="#bbb" strokeWidth="2" />
          <line x1="35" y1="52" x2="85" y2="52" stroke="#bbb" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
}
