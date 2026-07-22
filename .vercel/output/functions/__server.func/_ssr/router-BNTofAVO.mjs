import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as AuthProvider } from "./auth-BMM4cY4N.mjs";
import { t as ToastProvider } from "./toast-D-Okk_IC.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$10 } from "../_app.transactions._id-BKK6cAyB.mjs";
import { t as Route$11 } from "../_app.home-Dfpsg_WT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BNTofAVO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-pjapgTFE.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-6xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "This page doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Please try again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Try again"
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Zola — Banking built for you" },
			{
				name: "description",
				content: "Zola is a Nigerian consumer wallet with dedicated NUBAN accounts, BVN-linked KYC, and instant transfers — powered by Meroe."
			},
			{
				property: "og:title",
				content: "Zola — Banking built for you"
			},
			{
				property: "og:description",
				content: "Your money. Your rails. Dedicated NUBAN, instant transfers, no fees."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#0A0A0A"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/screenonly.png",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: "/screenonly.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
		children,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
	] });
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
var $$splitComponentImporter$8 = () => import("./auth-VVlenu9d.mjs");
var Route$8 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — Zola" }, {
		name: "description",
		content: "Sign in to Zola or create your account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_app-j-FPFFZb.mjs");
var Route$7 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./routes-BDsm8U41.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("../_app.transactions-X5SncgtX.mjs");
var Route$5 = createFileRoute("/_app/transactions")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("../_app.settings-0WzXFKUh.mjs");
var Route$4 = createFileRoute("/_app/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("../_app.send-DxQVT5_b.mjs");
var Route$3 = createFileRoute("/_app/send")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_app.receive-DF_k86pL.mjs");
var Route$2 = createFileRoute("/_app/receive")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_app.kyc-CB59XfIo.mjs");
var Route$1 = createFileRoute("/_app/kyc")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_app.transactions.index-a1NgCAy4.mjs");
var Route = createFileRoute("/_app/transactions/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AuthRoute = Route$8.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var AppRoute = Route$7.update({
	id: "/_app",
	getParentRoute: () => Route$9
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AppTransactionsRoute = Route$5.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppSendRoute = Route$3.update({
	id: "/send",
	path: "/send",
	getParentRoute: () => AppRoute
});
var AppReceiveRoute = Route$2.update({
	id: "/receive",
	path: "/receive",
	getParentRoute: () => AppRoute
});
var AppKycRoute = Route$1.update({
	id: "/kyc",
	path: "/kyc",
	getParentRoute: () => AppRoute
});
var AppHomeRoute = Route$11.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => AppRoute
});
var AppTransactionsIndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppTransactionsRoute
});
var AppTransactionsRouteChildren = {
	AppTransactionsIdRoute: Route$10.update({
		id: "/$id",
		path: "/$id",
		getParentRoute: () => AppTransactionsRoute
	}),
	AppTransactionsIndexRoute
};
var AppRouteChildren = {
	AppHomeRoute,
	AppKycRoute,
	AppReceiveRoute,
	AppSendRoute,
	AppSettingsRoute,
	AppTransactionsRoute: AppTransactionsRoute._addFileChildren(AppTransactionsRouteChildren)
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	AuthRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
