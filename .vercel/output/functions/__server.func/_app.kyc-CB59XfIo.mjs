import { r as __toESM } from "./_runtime.mjs";
import { _ as submitBvn, a as getKycStatus, t as formatNaira, v as submitId } from "./_ssr/api-B4kmTFOi.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./_ssr/auth-BMM4cY4N.mjs";
import { n as useToast } from "./_ssr/toast-D-Okk_IC.mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.kyc-CB59XfIo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KycPage() {
	const [status, setStatus] = (0, import_react.useState)(null);
	const [bvn, setBvn] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [idFile, setIdFile] = (0, import_react.useState)(null);
	const [idSubmitting, setIdSubmitting] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const { user } = useAuth();
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		getKycStatus().then(setStatus).catch(() => {});
	}, []);
	async function onSubmitBvn() {
		setError(null);
		setSubmitting(true);
		try {
			await submitBvn(bvn);
			const next = await getKycStatus();
			setStatus(next);
			toast("BVN verified");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Verification failed");
		} finally {
			setSubmitting(false);
		}
	}
	async function onSubmitId() {
		if (!idFile) return;
		setIdSubmitting(true);
		try {
			await submitId(idFile);
			const next = await getKycStatus();
			setStatus(next);
			toast("ID submitted");
		} finally {
			setIdSubmitting(false);
		}
	}
	const tier = status?.tier ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[640px] flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Verification"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-[var(--text-secondary)]",
				children: "Increase your daily limits by completing each tier."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-bold",
							children: tier
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-[var(--text-tertiary)]",
							children: "Current tier"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-lg font-bold tabular-nums",
							children: ["Tier ", tier]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-[var(--text-tertiary)]",
							children: "Daily limit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-bold tabular-nums",
							children: status ? formatNaira(status.limits.daily, { withSymbol: false }) : "—"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierBlock, {
				n: 1,
				title: "Basic info",
				status: "complete",
				limit: "₦ 50,000 daily",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldReadonly, {
						label: "Full name",
						value: user?.name ?? "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldReadonly, {
						label: "Email",
						value: user?.email ? `${user.email.slice(0, 15)}...` : "—"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierBlock, {
				n: 2,
				title: "BVN verification",
				status: status?.bvnVerified ? "complete" : "pending",
				limit: "₦ 500,000 daily",
				children: status?.bvnVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-[var(--success)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.CheckCircle, { size: 16 }), "Your BVN has been verified."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-[var(--text-secondary)]",
								children: "Bank Verification Number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "numeric",
								maxLength: 11,
								value: bvn,
								onChange: (e) => setBvn(e.target.value.replace(/[^0-9]/g, "")),
								placeholder: "11 digits",
								className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm tabular-nums placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-tertiary)]",
							children: "Your BVN is encrypted and never stored in plain text. Used for identity verification only."
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.AlertCircle, { size: 14 }), error]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: bvn.length !== 11 || submitting,
							onClick: onSubmitBvn,
							className: "h-11 w-full rounded-xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center justify-center gap-2",
							children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
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
							}) : null, "Verify BVN"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierBlock, {
				n: 3,
				title: "ID verification",
				status: status?.idVerified ? "complete" : status?.bvnVerified ? "pending" : "locked",
				limit: "₦ 5,000,000 daily",
				children: status?.idVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-[var(--info)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Info, { size: 16 }), "Your ID is under review. This unlocks Tier 3 limits."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--text-secondary)]",
							children: "Upload your National ID, Passport, or Driver's License."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							className: "hidden",
							onChange: (e) => setIdFile(e.target.files?.[0] ?? null)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => fileRef.current?.click(),
								disabled: !status?.bvnVerified,
								className: "h-10 rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)] transition-colors disabled:opacity-40",
								children: "Choose file"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-xs text-[var(--text-tertiary)]",
								children: idFile?.name ?? "No file selected"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: !idFile || !status?.bvnVerified || idSubmitting,
							onClick: onSubmitId,
							className: "h-11 w-full rounded-xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center justify-center gap-2",
							children: [idSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
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
							}) : null, "Submit for review"]
						}),
						!status?.bvnVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-tertiary)]",
							children: "Complete Tier 2 first."
						}) : null
					]
				})
			})
		]
	});
}
function TierBlock({ n, title, status, limit, children }) {
	const badge = status === "complete" ? "Complete" : status === "pending" ? "Pending" : "Locked";
	const badgeColor = status === "complete" ? "text-[var(--success)]" : status === "pending" ? "text-[var(--warning)]" : "text-[var(--text-tertiary)]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold tabular-nums ${status === "complete" ? "bg-[var(--success-bg)] text-[var(--success)]" : status === "pending" ? "bg-[var(--warning-bg)] text-[var(--warning)]" : "bg-[var(--bg-surface)] text-[var(--text-tertiary)]"}`,
					children: status === "complete" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Check, { size: 14 }) : n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-0.5 text-xs text-[var(--text-tertiary)]",
					children: ["Unlocks ", limit]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-[10px] font-semibold uppercase tracking-widest ${badgeColor}`,
				children: badge
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 pl-11",
			children
		})]
	});
}
function FieldReadonly({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs text-[var(--text-tertiary)]",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-0.5 text-sm font-medium",
		children: value
	})] });
}
//#endregion
export { KycPage as component };
