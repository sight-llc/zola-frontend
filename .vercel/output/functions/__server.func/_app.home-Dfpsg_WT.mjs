import { t as formatNaira } from "./_ssr/api-B4kmTFOi.mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
import { g as Link, m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.home-Dfpsg_WT.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./_app.home-FkNqAbuA.mjs");
var Route = createFileRoute("/_app/home")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
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
//#endregion
export { TxnRow as n, Route as t };
