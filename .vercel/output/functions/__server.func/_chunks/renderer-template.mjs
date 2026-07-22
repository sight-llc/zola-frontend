import { r as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Zola — Banking built for you</title>\n    <link rel=\"icon\" href=\"/favicon.svg\" type=\"image/svg+xml\" />\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n    <link\n      href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap\"\n      rel=\"stylesheet\"\n    />\n    <script>\n      // Restore theme preference on load — prevents flash\n      (function() {\n        var t = localStorage.getItem(\"zola.theme\");\n        if (!t) { t = window.matchMedia(\"(prefers-color-scheme: light)\").matches ? \"light\" : \"dark\"; }\n        document.documentElement.classList.add(t);\n      })();\n    <\/script>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n  </body>\n</html>", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
