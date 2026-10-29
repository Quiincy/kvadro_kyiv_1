import React from 'react'
import {
  Phone,
  Send,
  Camera,
  Menu,
  X,
  Zap,
  Route,
  Compass,
  Calendar,
  CalendarCheck,
  CreditCard,
  Star,
  Check,
  CheckCircle2,
  Info,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Navigation,
  Shirt,
  Coffee,
  Truck,
  Gift,
  ShieldCheck,
  Shield,
  Timer,
  Clock,
  FileText,
  Flag,
  Trees,
  PartyPopper,
  Users,
  Tag,
  Images,
  ExternalLink,
  ChevronDown,
  Gauge,
  Car,
  Bike,
  Sparkles,
  Award,
  GlassWater,
  Flame,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  // Navigation / Controls
  menu: Menu,
  close: X,
  call: Phone,
  phone: Phone,
  send: Send,
  photo_camera: Camera,
  camera: Camera,

  // Directions & Locations
  route: Route,
  compass: Compass,
  location_on: MapPin,
  pin_drop: MapPin,
  near_me: Navigation,
  navigation: Navigation,
  arrow_forward: ArrowRight,
  arrow_outward: ArrowUpRight,
  open_in_new: ExternalLink,
  expand_more: ChevronDown,

  // Vehicles & Speed
  sports_motorsports: Gauge,
  speed: Gauge,
  gauge: Gauge,
  directions_car: Car,
  two_wheeler: Bike,
  flame: Flame,
  bolt: Zap,
  zap: Zap,

  // Booking & Commerce
  calendar_today: Calendar,
  calendar_month: Calendar,
  calendar: Calendar,
  event_available: CalendarCheck,
  payments: CreditCard,
  price_change: Tag,
  sell: Tag,
  tag: Tag,
  loyalty: Gift,
  redeem: Gift,
  gift: Gift,
  local_shipping: Truck,
  truck: Truck,

  // Amenities & Perks
  timer: Timer,
  dry_cleaning: Shirt,
  checkroom: Shirt,
  shirt: Shirt,
  local_cafe: Coffee,
  coffee: Coffee,
  local_bar: GlassWater,
  bar: GlassWater,

  // Status, Trust & Badges
  star: Star,
  stars: Star,
  check: Check,
  check_circle: CheckCircle2,
  task_alt: CheckCircle2,
  verified: ShieldCheck,
  shield: Shield,
  shieldcheck: ShieldCheck,
  award: Award,
  info: Info,
  schedule: Clock,
  clock: Clock,
  article: FileText,
  sports_score: Flag,
  flag: Flag,
  forest: Trees,
  celebration: PartyPopper,
  groups: Users,
  photo_library: Images,
}

interface MaterialIconProps {
  name?: string
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function MaterialIcon({
  name,
  children,
  className = '',
  style,
}: MaterialIconProps) {
  const iconRaw = name || (typeof children === 'string' ? children.trim() : '')
  const key = iconRaw.toLowerCase().replace(/[^a-z0-9_]/g, '')
  const IconComponent = ICON_MAP[key] || Sparkles

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={style}
      aria-hidden="true"
    >
      <IconComponent className="w-[1em] h-[1em] stroke-[2]" />
    </span>
  )
}
