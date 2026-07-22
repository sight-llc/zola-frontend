import { r as __toESM } from "./_runtime.mjs";
import { s as getTransaction, t as formatNaira } from "./_ssr/api-B4kmTFOi.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useToast } from "./_ssr/toast-D-Okk_IC.mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
import { g as Link, v as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_app.transactions._id-BKK6cAyB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.transactions._id-o5MC_jhH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TxnDetailsPage() {
	const { id } = Route.useParams();
	const router = useRouter();
	const { toast } = useToast();
	const [txn, setTxn] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getTransaction(id).then((t) => {
			if (!cancelled) setTxn(t);
		}).catch(() => {
			if (!cancelled) setTxn(null);
		});
		return () => {
			cancelled = true;
		};
	}, [id]);
	if (txn === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[520px] flex-col gap-6 pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-20 rounded-lg skeleton" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 w-full rounded-2xl skeleton" })]
	});
	if (txn === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[520px] flex-col items-center gap-6 pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-surface)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.AlertCircle, {
					size: 20,
					className: "text-[var(--text-tertiary)]"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-[var(--text-tertiary)]",
				children: "Transaction not found."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/transactions",
				className: "h-10 inline-flex items-center rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)] transition-colors",
				children: "Back to transactions"
			})
		]
	});
	const credit = txn.type === "credit";
	const dateStr = new Date(txn.date).toLocaleString("en-NG", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[520px] flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => router.history.back(),
				className: "flex items-center gap-1.5 self-start text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ChevronLeft, { size: 14 }), "Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 pt-2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex h-16 w-16 items-center justify-center rounded-2xl ${credit ? "bg-[var(--success-bg)] text-[var(--success)]" : "bg-[var(--error-bg)] text-[var(--error)]"}`,
					children: credit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ArrowDown, { size: 24 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ArrowUp, {
						size: 24,
						className: "rotate-45"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]",
						children: credit ? "Money in" : "Money out"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mt-2 text-4xl font-bold tabular-nums tracking-tight ${credit ? "text-[var(--success)]" : ""}`,
						children: [
							credit ? "+" : "−",
							" ",
							formatNaira(txn.amount)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 text-sm text-[var(--text-secondary)]",
						children: txn.counterparty
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold mb-4",
					children: "Transaction details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [[
						{
							label: "Status",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--success)]" }), "Successful"]
							})
						},
						{
							label: "Type",
							value: credit ? "Credit" : "Debit"
						},
						{
							label: "Counterparty",
							value: txn.counterparty
						},
						{
							label: "Narration",
							value: txn.narration || "—"
						},
						{
							label: "Date",
							value: dateStr,
							mono: true
						},
						{
							label: "Fee",
							value: "₦ 0.00",
							mono: true
						}
					].map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-[var(--text-secondary)]",
							children: field.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-sm ${field.mono ? "tabular-nums" : ""} font-medium text-[var(--text-primary)]`,
							children: field.value
						})]
					}, field.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-[var(--text-secondary)]",
							children: "Reference"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tabular-nums text-[var(--text-primary)] font-medium max-w-[160px] truncate",
								children: txn.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									navigator.clipboard.writeText(txn.id);
									toast("Reference copied");
								},
								className: "rounded-lg border border-[var(--border-default)] p-1 text-[var(--text-tertiary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-all",
								"aria-label": "Copy reference",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Copy, { size: 12 })
							})]
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { TxnDetailsPage as component };
