import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.transactions._id-Tdy2qhPQ.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "mx-auto flex max-w-[520px] flex-col items-center gap-6 pt-12",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--error-bg)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.AlertCircle, {
				size: 20,
				className: "text-[var(--error)]"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-[var(--error)]",
			children: "Something went wrong loading this transaction."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/transactions",
			className: "h-10 inline-flex items-center rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)] transition-colors",
			children: "Back to transactions"
		})
	]
});
//#endregion
export { SplitErrorComponent as errorComponent };
