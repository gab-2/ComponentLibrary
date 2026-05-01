export const tokens = {
  "color": {
    "primary": {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#2563eb",
      "600": "#1d4ed8",
      "700": "#1e40af",
      "800": "#1e3a8a",
      "900": "#172554"
    },
    "neutral": {
      "0": "#ffffff",
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717",
      "950": "#0a0a0a"
    },
    "success": {
      "50": "#f0fdf4",
      "100": "#dcfce7",
      "500": "#22c55e",
      "600": "#16a34a",
      "700": "#15803d"
    },
    "warning": {
      "50": "#fffbeb",
      "100": "#fef3c7",
      "500": "#f59e0b",
      "600": "#d97706",
      "700": "#b45309"
    },
    "danger": {
      "50": "#fef2f2",
      "100": "#fee2e2",
      "500": "#ef4444",
      "600": "#dc2626",
      "700": "#b91c1c"
    }
  },
  "radius": {
    "none": "0px",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "2xl": "24px",
    "full": "9999px"
  },
  "spacing": {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px",
    "20": "80px",
    "24": "96px"
  },
  "font": {
    "family": {
      "sans": "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      "mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
    },
    "size": {
      "xs": "12px",
      "sm": "14px",
      "md": "16px",
      "lg": "18px",
      "xl": "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px"
    },
    "weight": {
      "regular": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    },
    "lineHeight": {
      "tight": "1.2",
      "normal": "1.5",
      "relaxed": "1.75"
    }
  },
  "shadow": {
    "sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px rgba(0, 0, 0, 0.07)",
    "lg": "0 10px 15px rgba(0, 0, 0, 0.10)",
    "xl": "0 20px 25px rgba(0, 0, 0, 0.12)"
  },
  "zIndex": {
    "base": "0",
    "dropdown": "1000",
    "sticky": "1100",
    "overlay": "1200",
    "modal": "1300",
    "popover": "1400",
    "toast": "1500",
    "tooltip": "1600"
  },
  "breakpoint": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  },
  "motion": {
    "duration": {
      "fast": "120ms",
      "normal": "180ms",
      "slow": "240ms"
    },
    "easing": {
      "standard": "cubic-bezier(0.2, 0, 0, 1)",
      "in": "cubic-bezier(0.4, 0, 1, 1)",
      "out": "cubic-bezier(0, 0, 0.2, 1)"
    }
  }
} as const;
export type Tokens = typeof tokens;
