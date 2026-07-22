import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./_ssr/auth-BMM4cY4N.mjs";
import { n as useToast } from "./_ssr/toast-D-Okk_IC.mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
import { t as useNotifications } from "./_ssr/useNotifications-ppHu6Qaj.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-j-FPFFZb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ZolaLogo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `inline-flex items-center gap-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/screenicon.png",
				alt: "Zola",
				className: "h-5 w-5 object-contain"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-base font-bold tracking-tight",
			children: "Zola"
		})]
	});
}
var NAV_ITEMS$1 = [
	{
		to: "/home",
		label: "Home",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Home, {})
	},
	{
		to: "/send",
		label: "Send",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Send, { size: 18 })
	},
	{
		to: "/receive",
		label: "Receive",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Receive, { size: 18 })
	},
	{
		to: "/transactions",
		label: "Activity",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Clock, {})
	}
];
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isActive = (to) => pathname === to || pathname.startsWith(to + "/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-[var(--z-nav)] pointer-events-none md:hidden safe-area-bottom",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-center gap-3 px-4 pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-1.5 shadow-lg backdrop-blur-xl",
				children: NAV_ITEMS$1.map((item) => {
					const active = isActive(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: `flex h-14 min-w-14 flex-col items-center justify-center gap-0.5 rounded-full px-3 transition-all ${active ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `transition-colors ${active ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"}`,
							children: item.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium",
							children: item.label
						})]
					}, item.to);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/settings",
				className: `pointer-events-auto flex h-15 w-15 mb-[5px] shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] shadow-lg backdrop-blur-xl transition-all ${isActive("/settings") ? "text-[var(--accent)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Settings, { size: 20 })
			})]
		})
	});
}
var NAV_ITEMS = [
	{
		to: "/home",
		label: "Home",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Home, {})
	},
	{
		to: "/send",
		label: "Send",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Send, { size: 18 })
	},
	{
		to: "/receive",
		label: "Top Up",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Receive, { size: 18 })
	},
	{
		to: "/transactions",
		label: "Activity",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Clock, {})
	},
	{
		to: "/settings",
		label: "Settings",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Settings, {})
	}
];
function AppShell() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, ready, signOut } = useAuth();
	const { toast } = useToast();
	const { unreadCount, unreadNotifications, markRead } = useNotifications();
	const seenIds = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const nav = useNavigate();
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (ready && !user) nav({ to: "/auth" });
	}, [
		ready,
		user,
		nav
	]);
	(0, import_react.useEffect)(() => {
		const fresh = unreadNotifications.filter((n) => !seenIds.current.has(n.id));
		if (fresh.length === 0) return;
		fresh.forEach((n) => {
			seenIds.current.add(n.id);
			toast(n.description);
		});
		markRead(fresh.map((n) => n.id));
	}, [unreadNotifications]);
	if (!ready || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-6 bg-[var(--bg-primary)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-1.5",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 w-2 rounded-full bg-[var(--text-tertiary)]",
				style: {
					animation: `bounce 1s ease-in-out infinite`,
					animationDelay: `${i * .15}s`
				}
			}, i))
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-[var(--duration-normal)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-[var(--z-nav)] hidden w-60 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 items-center gap-2.5 px-5 border-b border-[var(--border-subtle)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZolaLogo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1 px-2 pt-4",
						children: NAV_ITEMS.map((item) => {
							const active = pathname === item.to || pathname.startsWith(item.to + "/");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-[var(--duration-fast)] ${active ? "bg-[var(--bg-surface)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `shrink-0 transition-colors ${active ? "text-[var(--accent)]" : "text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]"}`,
										children: item.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: item.label
									}),
									item.label === "Activity" && unreadCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto flex h-2 w-2 rounded-full bg-red-500" }) : null
								]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-[var(--border-subtle)] p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl px-3 py-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-bold text-[var(--accent-foreground)]",
									children: user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium text-[var(--text-primary)]",
										children: user.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-[var(--text-tertiary)]",
										children: user.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										signOut();
										nav({ to: "/auth" });
									},
									className: "rounded-lg p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-all shrink-0",
									"aria-label": "Sign out",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.LogOut, { size: 15 })
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "md:pl-60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-5xl px-4 py-6 pb-28 md:px-8 md:py-10 md:pb-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
}
var SplitComponent = AppShell;
//#endregion
export { SplitComponent as component };
