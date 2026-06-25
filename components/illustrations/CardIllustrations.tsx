type CardIllustrationProps = {
  id: string;
  className?: string;
};

export function CardIllustration({ id, className = "h-full w-full" }: CardIllustrationProps) {
  const stroke = "#1a1a1a";
  const dash = "4 3";

  switch (id) {
    case "colors-worksheets":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
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
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => {
              const isPenguin = (row > 2 && row < 8 && col > 2 && col < 8) || (row === 2 && col > 4 && col < 6);
              const isBow = row === 2 && col === 6;
              const fill = isBow ? "#FF99CC" : isPenguin ? "#1a1a1a" : row % 2 === col % 2 ? "#E8E8E8" : "#fff";
              return <rect key={`${row}-${col}`} x={22 + col * 7.5} y={12 + row * 7.5} width="7" height="7" fill={fill} stroke="#ccc" strokeWidth="0.3" />;
            }),
          )}
        </svg>
      );
    case "colors-how-to-draw":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <polygon points="55,22 78,58 32,58" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="42" cy="42" r="14" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="68" cy="42" r="14" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="48" cy="48" r="3" fill={stroke} />
          <circle cx="62" cy="48" r="3" fill={stroke} />
          <polygon points="55,56 50,64 60,64" fill={stroke} />
          <line x1="38" y1="54" x2="28" y2="50" stroke={stroke} strokeWidth="1.5" />
          <line x1="38" y1="58" x2="28" y2="62" stroke={stroke} strokeWidth="1.5" />
          <line x1="72" y1="54" x2="82" y2="50" stroke={stroke} strokeWidth="1.5" />
          <line x1="72" y1="58" x2="82" y2="62" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "colors-create":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M45 35 Q60 20 75 35 Q85 45 80 60 Q75 75 60 72 Q45 69 40 55 Q35 42 45 35" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M48 38 Q55 28 62 38" fill="none" stroke="#FF99CC" strokeWidth="2" strokeDasharray={dash} />
          <path d="M42 58 Q35 72 30 82" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <path d="M50 62 Q48 78 46 88" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <path d="M60 64 Q60 80 58 90" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <path d="M70 58 Q75 74 78 84" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <path d="M78 55 Q88 68 92 78" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <circle cx="52" cy="48" r="3" fill={stroke} />
          <circle cx="68" cy="48" r="3" fill={stroke} />
        </svg>
      );
    case "colors-pair":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M28 25 Q28 15 38 15 Q48 15 48 25 L48 75 Q48 88 38 88 Q28 88 28 75 Z" fill="#fff" stroke={stroke} strokeWidth="2" />
          <path d="M72 25 Q72 15 82 15 Q92 15 92 25 L92 75 Q92 88 82 88 Q72 88 72 75 Z" fill="#fff" stroke={stroke} strokeWidth="2" />
          <circle cx="38" cy="40" r="5" fill="#FF99CC" />
          <circle cx="82" cy="40" r="5" fill="#FF99CC" />
          <circle cx="38" cy="55" r="4" fill="#FF99CC" />
          <circle cx="82" cy="55" r="4" fill="#FF99CC" />
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
    case "connect-ditto":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M22 70 L42 35 L58 55 L78 28" fill="none" stroke={stroke} strokeWidth="2" />
          <polygon points="42,35 48,24 55,34" fill={stroke} />
          <path d="M62 70 L82 35 L98 55" fill="none" stroke="#FFCC00" strokeWidth="2" />
          <polygon points="82,35 88,24 95,34" fill="#FF5555" />
          <line x1="20" y1="78" x2="100" y2="78" stroke="#99CCFF" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      );
    case "connect-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <rect x="18" y="28" width="18" height="18" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="27" cy="62" r="10" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="82" cy="32" r="10" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="72" y="58" width="18" height="18" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M36 37 L72 58" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
        </svg>
      );
    case "connect-jigsaw":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <rect x="28" y="22" width="32" height="32" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="60" y="22" width="32" height="32" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="28" y="54" width="32" height="32" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="60" y="54" width="32" height="32" fill="#999" stroke={stroke} strokeWidth="2" />
          <polygon points="44,38 52,48 36,48" fill="#666" />
        </svg>
      );
    case "connect-tracing":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <polygon points="60,18 95,82 25,82" fill="none" stroke={stroke} strokeWidth="2.5" />
          <polygon points="60,32 82,72 38,72" fill="none" stroke="#FF3333" strokeWidth="2" strokeDasharray={dash} />
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
          <circle cx="30" cy="28" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M28 30 L32 30 M30 28 L30 32" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case "mazes-numbers":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M20 70 Q35 30 55 40 Q75 50 90 25 Q100 15 105 35" fill="none" stroke={stroke} strokeWidth="2" />
          <text x="22" y="68" fontSize="10">🍒</text>
          <text x="48" y="42" fontSize="10">🍌</text>
          <text x="72" y="48" fontSize="10">🍎</text>
          <text x="92" y="30" fontSize="14" fontWeight="bold" fill={stroke}>1</text>
        </svg>
      );
    case "mazes-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M18 72 Q30 25 50 35 Q70 45 80 20 Q95 5 102 40 Q108 70 85 75 Q60 80 40 70 Q25 65 18 72" fill="none" stroke={stroke} strokeWidth="2" />
          <text x="28" y="58" fontSize="12" fontWeight="bold" fill={stroke}>C</text>
          <text x="52" y="42" fontSize="10">⭐</text>
          <text x="72" y="55" fontSize="10">🐟</text>
          <text x="88" y="38" fontSize="10">🐱</text>
        </svg>
      );
    case "mazes-shapes":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <path d="M15 75 Q25 20 45 30 Q65 40 75 15 Q90 0 100 35 Q108 65 90 72 Q70 80 50 70 Q30 60 15 75" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="22" y="58" width="12" height="12" fill="none" stroke={stroke} strokeWidth="1.5" />
          <polygon points="50,48 58,62 42,62" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="72" cy="45" r="7" fill="none" stroke={stroke} strokeWidth="1.5" />
          <text x="84" y="42" fontSize="10">☀️</text>
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
    case "alpha-practice":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          {[30,45,60,75].map(y => <line key={y} x1="15" y1={y} x2="105" y2={y} stroke="#99CCFF" strokeWidth="1" strokeDasharray="3 3" />)}
          <text x="38" y="62" fontSize="32" fill="none" stroke="#999" strokeWidth="2" strokeDasharray={dash}>A</text>
          <text x="72" y="68" fontSize="28" fill="none" stroke="#999" strokeWidth="2" strokeDasharray={dash}>a</text>
        </svg>
      );
    case "alpha-worksheets":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="28" y="42" fontSize="22" fontWeight="bold" fill={stroke}>A</text>
          <text x="55" y="42" fontSize="22" fontWeight="bold" fill={stroke}>B</text>
          <line x1="78" y1="38" x2="95" y2="38" stroke={stroke} strokeWidth="2" />
          <text x="28" y="72" fontSize="22" fontWeight="bold" fill={stroke}>X</text>
          <line x1="52" y1="68" x2="72" y2="68" stroke={stroke} strokeWidth="2" />
          <text x="82" y="72" fontSize="22" fontWeight="bold" fill={stroke}>Z</text>
        </svg>
      );
    case "alpha-cursive-upper":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <line x1="15" y1="30" x2="105" y2="30" stroke="#5599DD" strokeWidth="1.5" />
          <line x1="15" y1="50" x2="105" y2="50" stroke="#FF8888" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="15" y1="70" x2="105" y2="70" stroke="#5599DD" strokeWidth="1.5" />
          <text x="38" y="66" fontSize="34" fontFamily='var(--font-cursive), Caveat, cursive' fontWeight="700" fill={stroke}>A</text>
          <text x="68" y="66" fontSize="30" fontFamily='var(--font-cursive), Caveat, cursive' fontWeight="700" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray={dash}>A</text>
        </svg>
      );
    case "alpha-cursive-lower":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <line x1="15" y1="30" x2="105" y2="30" stroke="#5599DD" strokeWidth="1.5" />
          <line x1="15" y1="50" x2="105" y2="50" stroke="#FF8888" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="15" y1="70" x2="105" y2="70" stroke="#5599DD" strokeWidth="1.5" />
          <text x="38" y="68" fontSize="34" fontFamily='var(--font-cursive), Caveat, cursive' fontWeight="700" fill={stroke}>a</text>
          <text x="72" y="68" fontSize="30" fontFamily='var(--font-cursive), Caveat, cursive' fontWeight="700" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray={dash}>a</text>
        </svg>
      );
    case "alpha-letter-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="28" y="36" fontSize="22" fontWeight="bold" fill={stroke}>H</text>
          <text x="28" y="58" fontSize="22" fontWeight="bold" fill={stroke}>J</text>
          <text x="28" y="80" fontSize="22" fontWeight="bold" fill={stroke}>B</text>
          <text x="82" y="36" fontSize="22" fill={stroke}>j</text>
          <text x="82" y="58" fontSize="22" fill={stroke}>b</text>
          <text x="82" y="80" fontSize="22" fill={stroke}>h</text>
        </svg>
      );
    case "alpha-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="28" y="36" fontSize="22" fontWeight="bold" fill={stroke}>A</text>
          <text x="28" y="58" fontSize="22" fontWeight="bold" fill={stroke}>R</text>
          <text x="28" y="80" fontSize="22" fontWeight="bold" fill={stroke}>F</text>
          <path d="M72 28 Q88 20 96 28" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M76 32 Q88 26 92 32" fill="none" stroke={stroke} strokeWidth="1" />
          <circle cx="82" cy="58" r="10" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M80 52 Q82 48 84 52" fill="none" stroke={stroke} strokeWidth="1" />
          <line x1="84" y1="50" x2="88" y2="46" stroke={stroke} strokeWidth="0.8" />
          <line x1="74" y1="78" x2="74" y2="64" stroke={stroke} strokeWidth="1.5" />
          <path d="M74 66 L92 70 L92 78 L74 74 Z" fill="none" stroke={stroke} strokeWidth="1.2" />
        </svg>
      );
    case "alpha-jigsaw":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <line x1="60" y1="20" x2="60" y2="80" stroke="#ccc" strokeWidth="1" />
          <line x1="30" y1="50" x2="90" y2="50" stroke="#ccc" strokeWidth="1" />
          <text x="60" y="62" textAnchor="middle" fontSize="44" fontWeight="bold" fill="#999">A</text>
        </svg>
      );
    case "num-tracing":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <line x1="12" y1="28" x2="108" y2="28" stroke="#6BB6FF" strokeWidth="1.5" />
          <line x1="12" y1="50" x2="108" y2="50" stroke="#E53935" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="12" y1="72" x2="108" y2="72" stroke="#6BB6FF" strokeWidth="1.5" />
          <text
            x="60"
            y="68"
            textAnchor="middle"
            fontSize="52"
            fontFamily="var(--font-fredoka), Fredoka, sans-serif"
            fontWeight="700"
            fill="#fff"
            stroke={stroke}
            strokeWidth="2.5"
            paintOrder="stroke fill"
          >
            1
          </text>
        </svg>
      );
    case "num-counting":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="22" y="58" textAnchor="middle" fontSize="40" fontWeight="bold" fill={stroke}>1</text>
          <circle cx="72" cy="42" r="10" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M72 32 Q74 28 76 32" fill="none" stroke={stroke} strokeWidth="1.5" />
          <line x1="74" y1="27" x2="76" y2="24" stroke={stroke} strokeWidth="1.5" />
          <text x="30" y="88" fontSize="14" fontWeight="bold" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray={dash}>1</text>
          <text x="55" y="88" fontSize="14" fontWeight="bold" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray={dash}>1</text>
          <text x="80" y="88" fontSize="14" fontWeight="bold" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray={dash}>1</text>
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
    case "num-worksheets":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="22" y="42" fontSize="18" fontWeight="bold" fill={stroke}>1</text>
          <text x="42" y="42" fontSize="18" fontWeight="bold" fill={stroke}>2</text>
          <line x1="62" y1="38" x2="82" y2="38" stroke={stroke} strokeWidth="2" />
          <text x="22" y="72" fontSize="18" fontWeight="bold" fill={stroke}>8</text>
          <line x1="42" y1="68" x2="62" y2="68" stroke={stroke} strokeWidth="2" />
          <text x="72" y="72" fontSize="18" fontWeight="bold" fill={stroke}>10</text>
        </svg>
      );
    case "num-match":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <text x="28" y="38" fontSize="20" fontWeight="bold" fill={stroke}>2</text>
          <text x="28" y="58" fontSize="20" fontWeight="bold" fill={stroke}>1</text>
          <circle cx="28" cy="48" r="1.5" fill={stroke} />
          <circle cx="32" cy="48" r="1.5" fill={stroke} />
          <circle cx="82" cy="38" r="8" fill="none" stroke={stroke} strokeWidth="2" />
          <line x1="82" y1="30" x2="82" y2="24" stroke={stroke} strokeWidth="2" />
          <circle cx="82" cy="62" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="88" cy="62" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M38 55 L72 60" stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
        </svg>
      );
    case "num-jigsaw":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <line x1="60" y1="22" x2="60" y2="78" stroke="#ccc" strokeWidth="1" />
          <line x1="32" y1="50" x2="88" y2="50" stroke="#ccc" strokeWidth="1" />
          <text x="60" y="64" textAnchor="middle" fontSize="44" fontWeight="bold" fill="#999">1</text>
          <rect x="62" y="52" width="24" height="24" fill="#bbb" stroke={stroke} strokeWidth="1" />
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
          <path d="M25 68 L55 38 L85 68 Z" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <line x1="55" y1="38" x2="55" y2="22" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
          <path d="M20 70 Q55 62 90 70" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
          <path d="M20 74 Q55 66 90 74" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
          <circle cx="88" cy="28" r="8" fill="none" stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        </svg>
      );
    case "shapes-worksheets":
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden>
          <rect x="40" y="25" width="40" height="50" rx="5" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M48 40 Q55 35 62 40" fill="none" stroke={stroke} strokeWidth="1.5" />
          <circle cx="52" cy="48" r="2" fill={stroke} />
          <circle cx="68" cy="48" r="2" fill={stroke} />
          <path d="M52 55 Q60 62 68 55" fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}
