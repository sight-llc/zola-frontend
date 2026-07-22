import { r as __toESM } from "../_runtime.mjs";
import { f as register, u as login } from "./api-B4kmTFOi.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-BMM4cY4N.mjs";
import { n as useToast } from "./toast-D-Okk_IC.mjs";
import { t as Icons } from "./Icons-Nrs4ZB_z.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-VVlenu9d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CACHE_NAME = "zola-auth-images";
async function resolveCachedUrl(src) {
	try {
		if (typeof caches === "undefined") return src;
		const cache = await caches.open(CACHE_NAME);
		const hit = await cache.match(src);
		if (hit) {
			const blob = await hit.blob();
			return URL.createObjectURL(blob);
		}
		const res = await fetch(src, { mode: "cors" });
		if (!res.ok) return src;
		await cache.put(src, res.clone());
		const blob = await res.blob();
		return URL.createObjectURL(blob);
	} catch {
		return src;
	}
}
/**
* Returns a cached (blob) URL for the given image src.
* - On first load: fetches from network, caches it, returns blob URL.
* - On subsequent loads: reads from Cache API, returns blob URL.
* - If cache and network both fail: returns the original src (graceful degradation).
*/
function useCachedImage(src) {
	const [url, setUrl] = (0, import_react.useState)(src);
	const urlRef = (0, import_react.useRef)(src);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		resolveCachedUrl(src).then((resolved) => {
			if (cancelled) {
				if (resolved !== src && resolved.startsWith("blob:")) URL.revokeObjectURL(resolved);
				return;
			}
			if (urlRef.current !== src && urlRef.current.startsWith("blob:")) URL.revokeObjectURL(urlRef.current);
			urlRef.current = resolved;
			setUrl(resolved);
		}).catch(() => {
			if (!cancelled) setUrl(src);
		});
		return () => {
			cancelled = true;
		};
	}, [src]);
	return url;
}
function AuthPage() {
	const [mode, setMode] = (0, import_react.useState)("login");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [passwordVisible, setPasswordVisible] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const { setUser, user, ready } = useAuth();
	const { toast } = useToast();
	const nav = useNavigate();
	const img1 = useCachedImage("https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop&crop=face&q=80");
	const img2 = useCachedImage("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=400&fit=crop&crop=face&q=80");
	const img3 = useCachedImage("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=300&fit=crop&crop=face&q=80");
	(0, import_react.useEffect)(() => {
		if (ready && user) nav({
			to: "/home",
			replace: true
		});
	}, [
		user,
		ready,
		nav
	]);
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		if (!email || !password || mode === "register" && !name) {
			setError("Please fill in all fields.");
			return;
		}
		if (mode === "register" && phone && !/^\+?\d{7,15}$/.test(phone.replace(/[\s\-]/g, ""))) {
			setError("Please enter a valid phone number.");
			return;
		}
		setLoading(true);
		try {
			const res = mode === "login" ? await login(email, password) : await register(name, email, password, phone || void 0);
			setUser(res.user);
			toast(mode === "login" ? "Welcome back" : "Account created");
			nav({
				to: "/home",
				replace: true
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-[var(--bg-primary)] md:grid md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-h-dvh flex-col bg-[var(--bg-secondary)] px-6 py-8 md:px-12 md:py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none md:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img1,
							alt: "",
							className: "pointer-events-none absolute -right-10 -top-4 h-32 w-32 rotate-12 rounded-2xl object-cover opacity-10 select-none grayscale"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img2,
							alt: "",
							className: "pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 -rotate-6 rounded-2xl object-cover opacity-10 select-none grayscale"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img3,
							alt: "",
							className: "pointer-events-none absolute bottom-[18%] right-[8%] h-20 w-20 rounded-xl object-cover opacity-10 select-none grayscale"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img1,
							alt: "",
							className: "pointer-events-none absolute left-[12%] top-[12%] h-20 w-20 rotate-45 rounded-xl object-cover opacity-8 select-none grayscale"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img2,
							alt: "",
							className: "pointer-events-none absolute right-[15%] top-[30%] h-16 w-16 -rotate-12 rounded-xl object-cover opacity-8 select-none grayscale"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img3,
							alt: "",
							className: "pointer-events-none absolute left-[5%] bottom-[35%] h-14 w-14 rotate-[30deg] rounded-lg object-cover opacity-8 select-none grayscale"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 flex items-center gap-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 items-center justify-center rounded-xl bg-black",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/authicon.png",
							alt: "Zola",
							className: "h-5 w-5 object-contain"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mx-auto mt-28 flex w-full max-w-sm flex-col md:mt-40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight",
							children: mode === "login" ? "Welcome back" : "Get started"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-[var(--text-secondary)]",
							children: mode === "login" ? "Sign in to your Zola wallet." : "Create your account in minutes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							className: "mt-8 flex flex-col gap-4",
							children: [
								mode === "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-[var(--text-secondary)]",
										children: "Full name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Chisom Okafor",
										autoComplete: "name"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-[var(--text-secondary)]",
										children: "Phone number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										value: phone,
										onChange: (e) => setPhone(e.target.value),
										placeholder: "080 1234 5678",
										className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]",
										autoComplete: "tel"
									})]
								})] }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-[var(--text-secondary)]",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "you@company.com",
										className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]",
										autoComplete: "email"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-[var(--text-secondary)]",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: passwordVisible ? "text" : "password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											placeholder: "••••••••",
											className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] pr-10 pl-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]",
											autoComplete: mode === "login" ? "current-password" : "new-password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setPasswordVisible(!passwordVisible),
											className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors",
											"aria-label": passwordVisible ? "Hide password" : "Show password",
											tabIndex: -1,
											children: passwordVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Eye, { size: 16 })
										})]
									})]
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.AlertCircle, { size: 14 }), error]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: loading,
									className: "mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none",
									children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "h-4 w-4 animate-spin",
										viewBox: "0 0 24 24",
										fill: "none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "10",
											stroke: "currentColor",
											strokeOpacity: "0.25",
											strokeWidth: "3"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M22 12a10 10 0 0 1-10 10",
											stroke: "currentColor",
											strokeWidth: "3",
											strokeLinecap: "round"
										})]
									}) : null, mode === "login" ? "Sign in" : "Create account"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 text-center text-xs text-[var(--text-tertiary)]",
							children: [mode === "login" ? "Don't have an account? " : "Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setMode(mode === "login" ? "register" : "login");
									setError(null);
								},
								className: "font-medium text-[var(--text-primary)] underline underline-offset-2 hover:text-[var(--text-link)]",
								children: mode === "login" ? "Create one" : "Sign in"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-auto pt-8 text-xs text-[var(--text-tertiary)]",
					children: "© 2026 Zola. Built on Meroe infrastructure."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] md:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img1,
					alt: "",
					className: "pointer-events-none absolute -right-16 -top-8 h-72 w-72 rotate-12 rounded-3xl object-cover opacity-30 select-none grayscale",
					loading: "lazy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img2,
					alt: "",
					className: "pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 -rotate-6 rounded-3xl object-cover opacity-25 select-none grayscale",
					loading: "lazy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: img3,
					alt: "",
					className: "pointer-events-none absolute bottom-[30%] right-[10%] h-40 w-40 rounded-2xl object-cover opacity-20 select-none grayscale",
					loading: "lazy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute -top-12 left-[8%] text-[220px] font-bold text-white/[0.04] select-none",
					children: "₦"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute top-[20%] right-[8%] text-[100px] font-semibold text-white/[0.06] select-none",
					children: "$"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute bottom-[10%] left-[15%] text-[140px] font-bold text-white/[0.05] select-none",
					children: "€"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute bottom-[25%] right-[12%] text-[70px] font-semibold text-white/[0.08] select-none",
					children: "£"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex h-full flex-col items-center justify-center px-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-[380px] rounded-2xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-sm",
						style: {
							transform: "perspective(1200px) rotateZ(-6deg) rotateX(4deg)",
							boxShadow: "0 30px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06) inset"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-lg bg-white/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/authicon.png",
										alt: "Zola",
										className: "h-5 w-5 object-contain brightness-0 invert"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/60",
									children: "Virtual"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 font-mono text-2xl font-semibold tabular-nums tracking-widest text-white",
								children: "4563 8745 1230 9876"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-wider text-white/40",
									children: "Card Holder"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm font-bold tracking-tight",
									children: "Zola"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-wider text-white/40",
										children: "Expires"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm font-bold tabular-nums",
										children: "12/28"
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-white",
							children: "Banking built for you."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-white/50 max-w-sm mx-auto",
							children: "Your money. Your rails. Dedicated NUBAN, instant transfers, no fees."
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { AuthPage as component };
