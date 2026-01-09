import { 
  Lightning, 
  WifiHigh, 
  Television, 
  Phone, 
  Rocket, 
  ShieldCheck, 
  Clock,
  CheckCircle,
  Star,
  MapPin,
  Envelope,
  WhatsappLogo,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  ArrowRight,
  Play,
  Pause,
  CaretLeft,
  CaretRight,
  X,
  List,
  House,
  Gear,
  CurrencyDollar,
  Users,
  Headset,
  ChatCircleDots,
  Trophy,
  Medal,
  Target,
  TrendUp,
  CloudCheck,
  Router,
  WifiSlash,
  Speedometer,
  Broadcast,
  Gauge,
  Sun,
  Moon,
  MagnifyingGlass,
  PhoneCall,
  CalendarCheck
} from '@phosphor-icons/react';

// Icon wrapper with hover animation
interface AnimatedIconProps {
  icon: React.ElementType;
  size?: number;
  className?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  color?: string;
}

export function AnimatedIcon({ 
  icon: Icon, 
  size = 24, 
  className = '', 
  weight = 'duotone',
  color
}: AnimatedIconProps) {
  return (
    <Icon 
      size={size} 
      weight={weight}
      color={color}
      className={`transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_currentColor] ${className}`}
    />
  );
}

// Gradient icon with glow effect
export function GradientIcon({ 
  icon: Icon, 
  size = 24, 
  gradientId = 'iconGradient',
  className = ''
}: AnimatedIconProps & { gradientId?: string }) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
      <Icon 
        size={size} 
        weight="duotone"
        className="transition-all duration-300 hover:scale-110"
        style={{ fill: `url(#${gradientId})` }}
      />
    </div>
  );
}

// Export all icons for easy importing
export {
  Lightning,
  WifiHigh,
  Television,
  Phone,
  Rocket,
  ShieldCheck,
  Clock,
  CheckCircle,
  Star,
  MapPin,
  Envelope,
  WhatsappLogo,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  ArrowRight,
  Play,
  Pause,
  CaretLeft,
  CaretRight,
  X,
  List,
  House,
  Gear,
  CurrencyDollar,
  Users,
  Headset,
  ChatCircleDots,
  Trophy,
  Medal,
  Target,
  TrendUp,
  CloudCheck,
  Router,
  WifiSlash,
  Speedometer,
  Broadcast,
  Gauge,
  Sun,
  Moon,
  MagnifyingGlass,
  PhoneCall,
  CalendarCheck
};

// Icon set for services
export const serviceIcons = {
  internet: WifiHigh,
  tv: Television,
  phone: Phone,
  speed: Speedometer,
  router: Router,
  broadcast: Broadcast,
};

// Icon set for features
export const featureIcons = {
  fast: Lightning,
  secure: ShieldCheck,
  support: Headset,
  uptime: Clock,
  check: CheckCircle,
  trophy: Trophy,
};
