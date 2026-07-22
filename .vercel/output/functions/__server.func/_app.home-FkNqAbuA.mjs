import { r as __toESM } from "./_runtime.mjs";
import { a as getKycStatus, c as getTransactions, l as getVirtualAccount, n as getBalance, t as formatNaira } from "./_ssr/api-B4kmTFOi.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./_ssr/auth-BMM4cY4N.mjs";
import { n as useToast } from "./_ssr/toast-D-Okk_IC.mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
import { t as useNotifications } from "./_ssr/useNotifications-ppHu6Qaj.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.home-FkNqAbuA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var THEME_KEY = "zola.theme";
function getSystemTheme() {
	if (typeof window === "undefined") return "dark";
	return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function getStoredTheme() {
	if (typeof window === "undefined") return "dark";
	return localStorage.getItem(THEME_KEY) ?? getSystemTheme();
}
function applyTheme(theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.classList.toggle("light", theme === "light");
}
if (typeof window !== "undefined") applyTheme(getStoredTheme());
var listeners = /* @__PURE__ */ new Set();
function subscribe(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
function getSnapshot() {
	return getStoredTheme();
}
function useTheme() {
	const theme = (0, import_react.useSyncExternalStore)(subscribe, getSnapshot);
	return {
		theme,
		toggleTheme: (0, import_react.useCallback)(() => {
			const next = theme === "dark" ? "light" : "dark";
			localStorage.setItem(THEME_KEY, next);
			applyTheme(next);
			listeners.forEach((cb) => cb());
		}, [theme])
	};
}
function greeting() {
	const h = (/* @__PURE__ */ new Date()).getHours();
	if (h < 12) return "Good morning";
	if (h < 18) return "Good afternoon";
	return "Good evening";
}
function HomePage() {
	const { user } = useAuth();
	const { toast } = useToast();
	const { unreadNotifications } = useNotifications();
	const { theme, toggleTheme } = useTheme();
	const [balance, setBalance] = (0, import_react.useState)(null);
	const [prevBalance, setPrevBalance] = (0, import_react.useState)(null);
	const [account, setAccount] = (0, import_react.useState)(null);
	const [txns, setTxns] = (0, import_react.useState)(null);
	const [kyc, setKyc] = (0, import_react.useState)(null);
	const [balanceHidden, setBalanceHidden] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return false;
		return localStorage.getItem("zola.balanceHidden") === "1";
	});
	const [balanceRevealed, setBalanceRevealed] = (0, import_react.useState)(!balanceHidden);
	(0, import_react.useEffect)(() => {
		getBalance().then((b) => {
			setBalance(b.balance);
			setPrevBalance(b.balance);
		}).catch(() => {});
		getVirtualAccount().then(setAccount).catch(() => {});
		getTransactions().then((t) => setTxns(t.slice(0, 5))).catch(() => {});
		getKycStatus().then(setKyc).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		if (unreadNotifications.some((n) => n.event_type === "PAYMENT.RECEIVED")) getBalance().then((b) => setBalance(b.balance));
	}, [unreadNotifications]);
	function toggleBalance() {
		setBalanceHidden((prev) => {
			const next = !prev;
			if (typeof window !== "undefined") localStorage.setItem("zola.balanceHidden", next ? "1" : "0");
			if (!next) {
				setBalanceRevealed(true);
				setTimeout(() => setBalanceRevealed(false), 2e3);
			}
			return next;
		});
	}
	const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-NG", {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-7 animate-stagger",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-2xl font-bold tracking-tight text-[var(--text-primary)]",
						children: [
							greeting(),
							", ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate inline-block max-w-[180px] align-bottom",
								children: user?.name.split(" ")[0]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-[var(--text-secondary)]",
						children: today
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: toggleTheme,
					className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all active:scale-90 ml-3 border border-[var(--border-subtle)]",
					"aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
					children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Sun, { size: 17 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Moon, { size: 17 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-2xl bg-[var(--gradient-card)] p-6 shadow-lg md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -inset-40 bg-gradient-radial from-[var(--text-primary)]/[0.03] to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium tracking-wider text-[var(--text-secondary)]/70 uppercase",
									children: "Available balance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: toggleBalance,
									"aria-label": balanceHidden ? "Show balance" : "Hide balance",
									className: "rounded-lg p-1 text-[var(--text-tertiary)] hover:bg-[var(--bg-surface)]/30 hover:text-[var(--text-primary)] transition-all",
									children: balanceHidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.EyeOff, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Eye, { size: 14 })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]/60",
								children: "Wallet"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: balance == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[2.5rem] w-48 rounded-lg bg-[var(--bg-surface)]/30 skeleton" }) : balanceHidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[2rem] leading-none font-bold tabular-nums tracking-tight text-[var(--text-tertiary)]",
								children: "₦ ••••••••"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[2rem] leading-none font-bold tabular-nums tracking-tight text-[var(--text-primary)]",
								style: { animation: balanceRevealed ? "balanceReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" : "none" },
								children: formatNaira(balance)
							})
						}),
						account ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center gap-3 rounded-xl bg-[var(--bg-surface)]/20 px-4 py-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Building, {
										size: 14,
										className: "text-[var(--text-tertiary)] shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[var(--text-secondary)]/80 truncate",
										children: account.bankName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--text-tertiary)]/40 shrink-0",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums font-medium text-[var(--text-primary)]/90 truncate",
									children: account.accountNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										navigator.clipboard.writeText(account.accountNumber);
										toast("Account number copied");
									},
									className: "ml-auto rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]/20 p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-surface)]/40 hover:text-[var(--text-primary)] transition-all shrink-0",
									"aria-label": "Copy account number",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Copy, { size: 13 })
								})
							]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-4 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/send",
						label: "Send",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ArrowUp, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/receive",
						label: "Top Up",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ArrowDown, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						to: "/transactions",
						label: "History",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Clock, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						label: "Invite",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Gift, { size: 18 }),
						onClick: () => {
							navigator.clipboard.writeText("Join me on Zola");
							toast("Invite link copied");
						}
					})
				]
			}),
			kyc && kyc.tier < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/kyc",
				className: "group relative overflow-hidden rounded-xl border border-[var(--warning-bg)] bg-[var(--warning-bg)] px-5 py-4 transition-all hover:brightness-110 active:scale-[0.99]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--warning)]/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Shield, {
								size: 18,
								className: "text-[var(--warning)]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold text-[var(--warning)]",
								children: "Verify your identity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-xs text-[var(--warning)]/70 truncate",
								children: "Unlock higher daily limits"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ChevronRight, {
						size: 16,
						className: "text-[var(--warning)]/30 group-hover:text-[var(--warning)] transition-colors shrink-0 ml-2"
					})]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 transition-all hover:border-[var(--border-default)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--success-bg)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.TrendingUp, {
								size: 16,
								className: "text-[var(--success)]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-lg font-bold tabular-nums text-[var(--text-primary)]",
							children: txns ? txns.filter((t) => t.type === "credit").length : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[var(--text-tertiary)]",
								children: "—"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-xs text-[var(--text-tertiary)]",
							children: "Money in"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 transition-all hover:border-[var(--border-default)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--error-bg)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ArrowUp, {
								size: 16,
								className: "text-[var(--error)] rotate-45"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-lg font-bold tabular-nums text-[var(--text-primary)]",
							children: txns ? txns.filter((t) => t.type === "debit").length : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[var(--text-tertiary)]",
								children: "—"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-xs text-[var(--text-tertiary)]",
							children: "Money out"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-[var(--text-primary)]",
					children: "Recent activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/transactions",
					className: "text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors",
					children: "View all"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-1",
				children: txns == null ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonRow, {}, i)) : txns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-14 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Clock, {
								size: 20,
								className: "text-[var(--text-tertiary)]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium text-[var(--text-tertiary)]",
							children: "No activity yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-tertiary)]/60 max-w-[220px]",
							children: "Your transactions will appear here once you send or receive money."
						})
					]
				}) : txns.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "animate-in",
					style: { animationDelay: `${i * 30}ms` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnRow, { t })
				}, t.id))
			})] })
		]
	});
}
function QuickAction({ to, label, icon, onClick }) {
	const base = "flex flex-col items-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-4 text-center transition-all duration-[var(--duration-fast)] hover:border-[var(--border-default)] hover:shadow-md active:scale-[0.95]";
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)]",
		children: icon
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[11px] font-medium text-[var(--text-secondary)] leading-none",
		children: label
	})] });
	if (onClick) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: base,
		onClick,
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: base,
		children: content
	});
}
function TxnRow({ t }) {
	const credit = t.type === "credit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/transactions/$id",
		params: { id: t.id },
		className: "group flex items-center gap-4 rounded-xl px-3 py-3 transition-all hover:bg-[var(--bg-surface)] -mx-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${credit ? "bg-[var(--success-bg)] text-[var(--success)]" : "bg-[var(--error-bg)] text-[var(--error)]"}`,
				children: credit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ArrowDown, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ArrowUp, {
					size: 16,
					className: "rotate-45"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm font-medium text-[var(--text-primary)]",
					children: t.counterparty
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-xs text-[var(--text-tertiary)] mt-0.5",
					children: t.narration || "Transfer"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `tabular-nums text-sm font-semibold ${credit ? "text-[var(--success)]" : "text-[var(--text-primary)]"}`,
					children: [
						credit ? "+" : "−",
						" ",
						formatNaira(t.amount, { withSymbol: false })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] text-[var(--text-tertiary)] mt-0.5",
					children: relativeDate(t.date)
				})]
			})
		]
	});
}
function relativeDate(iso) {
	const d = new Date(iso);
	const diff = Date.now() - d.getTime();
	const h = Math.floor(diff / 36e5);
	if (h < 1) return "Just now";
	if (h < 24) return `${h}h ago`;
	const days = Math.floor(h / 24);
	if (days === 1) return "Yesterday";
	if (days < 7) return `${days}d ago`;
	return d.toLocaleDateString("en-NG", {
		month: "short",
		day: "numeric"
	});
}
function SkeletonRow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 rounded-xl px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 rounded-xl skeleton" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-32 skeleton rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-48 skeleton rounded-md" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-16 skeleton rounded-md" })
		]
	});
}
//#endregion
export { TxnRow, HomePage as component, relativeDate };
