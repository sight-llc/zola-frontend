import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.transactions._id-BKK6cAyB.js
var $$splitErrorComponentImporter = () => import("./_app.transactions._id-Tdy2qhPQ.mjs");
var $$splitNotFoundComponentImporter = () => import("./_app.transactions._id-BDII98h3.mjs");
var $$splitComponentImporter = () => import("./_app.transactions._id-o5MC_jhH.mjs");
var Route = createFileRoute("/_app/transactions/$id")({
	head: () => ({ meta: [{ title: "Transaction — Zola" }, {
		name: "description",
		content: "Transaction details."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
