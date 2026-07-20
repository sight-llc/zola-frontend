import { type SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGElement> & { size?: number };

function createIcon(children: React.ReactNode) {
  return ({ size = 20, className = "", ...rest }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Icons = {
  Home: createIcon(<><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></>),
  Send: createIcon(<><path d="M4 20 20 4M20 4v10M20 4H10" /></>),
  Receive: createIcon(<><path d="M20 4 4 20M4 20V10M4 20h10" /></>),
  List: createIcon(<><path d="M4 6h16M4 12h16M4 18h16" /></>),
  Settings: createIcon(<><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></>),
  ArrowUp: createIcon(<><path d="M5 12h14M13 5l7 7-7 7"/></>),
  ArrowDown: createIcon(<><path d="M19 12H5M11 5l-7 7 7 7"/></>),
  ChevronLeft: createIcon(<><path d="M15 18l-6-6 6-6"/></>),
  ChevronRight: createIcon(<><path d="M9 6l6 6-6 6"/></>),
  X: createIcon(<><path d="M18 6 6 18M6 6l12 12"/></>),
  Check: createIcon(<><path d="M5 12l5 5L20 7"/></>),
  Plus: createIcon(<><path d="M12 5v14M5 12h14"/></>),
  Eye: createIcon(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>),
  EyeOff: createIcon(<><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a19.6 19.6 0 0 1 4.22-5.06M9.9 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 7 10 7a19.62 19.62 0 0 1-3.17 4.19M1 1l22 22"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></>),
  Copy: createIcon(<><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></>),
  Search: createIcon(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>),
  User: createIcon(<><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></>),
  Shield: createIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>),
  Bank: createIcon(<><rect x="3" y="10" width="18" height="11" rx="1"/><path d="M2 10 12 2l10 8"/></>),
  Wallet: createIcon(<><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="17" cy="12" r="1.5"/><path d="M2 9h20"/></>),
  TrendingUp: createIcon(<><path d="M23 6-13.5 16.5 8.25 11.25 1 18.5"/><path d="M17 6h6v6"/></>),
  Zap: createIcon(<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></>),
  Sparkles: createIcon(<><path d="M12 3v4M8 8l-3-3M18 8l3-3M6 16H2M22 16h-4M8 20l-2 2M16 20l2 2M12 17v4"/></>),
  MessageCircle: createIcon(<><path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z"/><path d="M12 8v4M12 16h.01"/></>),
  Share2: createIcon(<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M15.5 7.5 8.5 12.5M15.5 16.5 8.5 13.5"/></>),
  Clock: createIcon(<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>),
  Smartphone: createIcon(<><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></>),
  Globe: createIcon(<><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>),
  Info: createIcon(<><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></>),
  AlertCircle: createIcon(<><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>),
  CheckCircle: createIcon(<><path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"/><path d="m9 12 2 2 4-4"/></>),
  CreditCard: createIcon(<><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></>),
  Building: createIcon(<><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01"/></>),
  QrCode: createIcon(<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>),
  Gift: createIcon(<><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 6 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 6 12 7z"/></>),
  Percent: createIcon(<><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>),
  LogOut: createIcon(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>),
  Menu: createIcon(<><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>),
  Sun: createIcon(<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l1.41-1.41M4.93 19.07 6.34 17.66"/></>),
  Moon: createIcon(<><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>),
  PiggyBank: createIcon(<><path d="M19 12V7H5v5a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4Z"/><path d="M21 12V7h-2l-1-3-3 1L13 5H5a3 3 0 0 0-3 3v4a4 4 0 0 0 4 4h5"/><circle cx="9" cy="10" r="1"/></>),
  ArrowRight: createIcon(<><path d="M5 12h14M13 5l7 7-7 7"/></>),
  ArrowLeft: createIcon(<><path d="M19 12H5M11 5l-7 7 7 7"/></>),
  Download: createIcon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></>),
  Upload: createIcon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></>),
  Filter: createIcon(<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>),
  RefreshCw: createIcon(<><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>),
  Lock: createIcon(<><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>),
  Phone: createIcon(<><polyline points="22 2 11 13"/><path d="M22 2v7h-7M6 18 2 22"/><path d="M2 22 9 15"/></>),
  Mail: createIcon(<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></>),
  Paperclip: createIcon(<><path d="M21.44 11.05-12.46 21.56a4.5 4.5 0 0 1-6.36-6.36l11.4-11.4a3 3 0 1 1 4.24 4.24L7.14 19.64"/></>),
  Trash2: createIcon(<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>),
};