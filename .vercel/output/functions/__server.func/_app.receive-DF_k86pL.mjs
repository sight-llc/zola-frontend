import { r as __toESM } from "./_runtime.mjs";
import { l as getVirtualAccount } from "./_ssr/api-B4kmTFOi.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useToast } from "./_ssr/toast-D-Okk_IC.mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.receive-DF_k86pL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReceivePage() {
	const [acct, setAcct] = (0, import_react.useState)(null);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		getVirtualAccount().then(setAcct).catch(() => {});
	}, []);
	function copy(text, label) {
		navigator.clipboard.writeText(text);
		toast(`${label} copied`);
	}
	function share() {
		if (!acct) return;
		const str = `Bank: ${acct.bankName} | Account: ${acct.accountNumber} | Name: ${acct.accountName}`;
		if (navigator.share) navigator.share({
			title: "My Zola account",
			text: str,
			url: window.location.href
		}).catch(() => copy(str, "Account details"));
		else copy(str, "Account details");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[520px] flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight text-[var(--text-primary)]",
					children: "Receive money"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-1.5 max-w-sm text-sm text-[var(--text-secondary)] leading-relaxed",
					children: "Share your account details to receive transfers from any Nigerian bank."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-2xl bg-[var(--gradient-card)] p-6 shadow-lg md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -inset-40 bg-gradient-radial from-[var(--text-primary)]/[0.03] to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Wallet, {
							size: 20,
							className: "text-[var(--text-secondary)]/70"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]/60",
							children: "NUBAN"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]",
										children: "Account number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-mono text-xl font-semibold tabular-nums tracking-wider text-[var(--text-primary)] truncate",
										children: acct?.accountNumber ?? "———————"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => acct && copy(acct.accountNumber, "Account number"),
									className: "rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)]/20 p-2 text-[var(--text-tertiary)] hover:bg-[var(--bg-surface)]/40 hover:text-[var(--text-primary)] transition-all ml-3 shrink-0",
									"aria-label": "Copy account number",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Copy, { size: 14 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]",
										children: "Bank"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm font-medium text-[var(--text-primary)] truncate",
										children: acct?.bankName ?? "—"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => acct && copy(acct.bankName, "Bank name"),
									className: "rounded-lg p-1.5 text-[var(--text-tertiary)]/60 hover:text-[var(--text-primary)]/80 transition-colors shrink-0",
									"aria-label": "Copy bank name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Copy, { size: 12 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]",
										children: "Account name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm font-medium text-[var(--text-primary)] truncate",
										children: acct?.accountName ?? "—"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => acct && copy(acct.accountName, "Account name"),
									className: "rounded-lg p-1.5 text-[var(--text-tertiary)]/60 hover:text-[var(--text-primary)]/80 transition-colors shrink-0",
									"aria-label": "Copy account name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Copy, { size: 12 })
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: share,
				className: "h-12 w-full rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.97] shadow-[var(--shadow-button)] inline-flex items-center justify-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Share2, { size: 16 }), "Share details"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Info, {
						size: 16,
						className: "text-[var(--text-tertiary)] shrink-0"
					}), "How it works"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-3 text-xs text-[var(--text-secondary)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1 w-1 rounded-full bg-[var(--text-tertiary)] shrink-0" }), "Share your account number and bank name with the sender."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1 w-1 rounded-full bg-[var(--text-tertiary)] shrink-0" }), "They initiate a transfer from any Nigerian bank app."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1 w-1 rounded-full bg-[var(--text-tertiary)] shrink-0" }), "Funds appear in your Zola wallet instantly."]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { ReceivePage as component };
