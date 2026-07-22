import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-BMM4cY4N.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BDsm8U41.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { user, ready } = useAuth();
	const nav = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		nav({
			to: user ? "/home" : "/auth",
			replace: true
		});
	}, [
		user,
		ready,
		nav
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-[var(--bg-primary)]",
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
}
//#endregion
export { Index as component };
