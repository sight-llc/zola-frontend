import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/toast-D-Okk_IC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ToastCtx = (0, import_react.createContext)(null);
function ToastProvider({ children }) {
	const [toasts, setToasts] = (0, import_react.useState)([]);
	const toast = (0, import_react.useCallback)((message) => {
		const id = Date.now() + Math.random();
		setToasts((t) => [...t, {
			id,
			message
		}]);
		setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3e3);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastCtx.Provider, {
		value: { toast },
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2",
				children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto rounded-md border border-border bg-[#0A0A0A] px-4 py-2.5 text-sm text-white shadow-sm transition-all",
					style: { animation: "zola-toast 150ms ease" },
					children: t.message
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes zola-toast { from { opacity: 0; transform: translateY(4px);} to {opacity:1; transform:none;} }` })
		]
	});
}
function useToast() {
	const ctx = (0, import_react.useContext)(ToastCtx);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
}
//#endregion
export { useToast as n, ToastProvider as t };
