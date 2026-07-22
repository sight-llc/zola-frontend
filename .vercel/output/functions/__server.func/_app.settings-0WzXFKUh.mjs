import { r as __toESM } from "./_runtime.mjs";
import { a as getKycStatus, h as setPin } from "./_ssr/api-B4kmTFOi.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./_ssr/auth-BMM4cY4N.mjs";
import { n as useToast } from "./_ssr/toast-D-Okk_IC.mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as InputOTPGroup, r as InputOTPSlot, t as InputOTP } from "./_ssr/input-otp-CqkdaMEi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.settings-0WzXFKUh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user, signOut } = useAuth();
	const [kyc, setKyc] = (0, import_react.useState)(null);
	const [pwOpen, setPwOpen] = (0, import_react.useState)(false);
	const [pinOpen, setPinOpen] = (0, import_react.useState)(false);
	const nav = useNavigate();
	(0, import_react.useEffect)(() => {
		getKycStatus().then(setKyc).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[640px] flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-[var(--text-secondary)]",
				children: "Manage your Zola account."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 pb-4 border-b border-[var(--border-subtle)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-[var(--accent-foreground)]",
						children: user?.name?.split(" ").map((n) => n[0]).slice(0, 2).join("") ?? "?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: user?.name ?? "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-[var(--text-tertiary)]",
						children: user?.email ?? "—"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full name",
						value: user?.name ?? "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						value: user?.email ? `${user.email.slice(0, 20)}...` : "—"
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Security" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
					label: "Password",
					description: "Last changed —",
					action: "Change",
					onClick: () => setPwOpen(true)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingRow, {
					label: "Transaction PIN",
					description: user?.pin_set ? "Set up for secure transfers" : "Required for transfers",
					status: user?.pin_set ? "Set" : void 0,
					action: !user?.pin_set ? "Set PIN" : void 0,
					onClick: () => !user?.pin_set && setPinOpen(true)
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Verification" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--info-bg)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Shield, {
								size: 18,
								className: "text-[var(--info)]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: "Identity tier"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-[var(--text-tertiary)]",
							children: [
								"Tier ",
								kyc?.tier ?? "—",
								" of 3"
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/kyc",
						className: "h-9 inline-flex items-center rounded-lg border border-[var(--border-default)] px-3 text-xs font-medium hover:bg-[var(--bg-surface)] transition-colors",
						children: "Manage"
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "About" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-surface)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Info, {
								size: 18,
								className: "text-[var(--text-tertiary)]"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: "Version"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-[var(--text-tertiary)]",
							children: "1.0.0"
						})] })]
					})
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					signOut();
					nav({ to: "/auth" });
				},
				className: "flex items-center justify-center gap-2 rounded-2xl border border-[var(--error-bg)] bg-[var(--error-bg)] px-5 py-3 text-sm font-medium text-[var(--error)] hover:brightness-95 transition-all",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.LogOut, { size: 16 }), "Sign out"]
			}),
			pwOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordModal, { onClose: () => setPwOpen(false) }) : null,
			pinOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinModal, { onClose: () => setPinOpen(false) }) : null
		]
	});
}
function SectionTitle({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]",
		children
	});
}
function Field({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs text-[var(--text-tertiary)]",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-0.5 text-sm font-medium",
		children: value
	})] });
}
function SettingRow({ label, description, status, action, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium",
				children: label
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-[var(--text-tertiary)]",
				children: description
			}) : null] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-[var(--success)]",
				children: status
			}) : null, action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick,
				className: "h-9 rounded-lg border border-[var(--border-default)] px-3 text-xs font-medium hover:bg-[var(--bg-surface)] transition-colors",
				children: action
			}) : null]
		})]
	});
}
function PasswordModal({ onClose }) {
	const [cur, setCur] = (0, import_react.useState)("");
	const [next, setNext] = (0, import_react.useState)("");
	const [curVisible, setCurVisible] = (0, import_react.useState)(false);
	const [nextVisible, setNextVisible] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { toast } = useToast();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-md animate-in-scale rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Lock, { size: 18 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold",
						children: "Change password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--text-tertiary)]",
						children: "Choose a strong, unique password."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium text-[var(--text-secondary)]",
							children: "Current password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: curVisible ? "text" : "password",
								value: cur,
								onChange: (e) => setCur(e.target.value),
								className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] pr-10 pl-4 text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCurVisible(!curVisible),
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors",
								"aria-label": curVisible ? "Hide current password" : "Show current password",
								tabIndex: -1,
								children: curVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Eye, { size: 16 })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium text-[var(--text-secondary)]",
							children: "New password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: nextVisible ? "text" : "password",
								value: next,
								onChange: (e) => setNext(e.target.value),
								className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] pr-10 pl-4 text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setNextVisible(!nextVisible),
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors",
								"aria-label": nextVisible ? "Hide new password" : "Show new password",
								tabIndex: -1,
								children: nextVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Eye, { size: 16 })
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "h-10 rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)]",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: !cur || next.length < 8 || loading,
						onClick: () => {
							setLoading(true);
							setTimeout(() => {
								setLoading(false);
								toast("Password updated");
								onClose();
							}, 700);
						},
						className: "h-10 rounded-xl bg-[var(--accent)] px-4 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-40",
						children: loading ? "Updating…" : "Update"
					})]
				})
			]
		})
	});
}
function PinModal({ onClose }) {
	const [pin, setPinInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const { toast } = useToast();
	async function handleSetPin() {
		if (pin.length !== 4) return;
		setLoading(true);
		setError(null);
		try {
			await setPin(pin);
			toast("Transaction PIN set");
			onClose();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to set PIN");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-md animate-in-scale rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Lock, { size: 18 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold",
						children: "Set Transaction PIN"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--text-tertiary)]",
						children: "Create a 4-digit PIN for secure transfers."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTP, {
						maxLength: 4,
						value: pin,
						onChange: setPinInput,
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPGroup, {
							className: "flex gap-3",
							children: [
								0,
								1,
								2,
								3
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
								index: i,
								className: "h-14 w-14 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] text-xl font-bold tabular-nums text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--border-focus)]"
							}, i))
						})
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)] mt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.AlertCircle, { size: 14 }), error]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "h-10 rounded-xl border border-[var(--border-default)] px-4 text-sm font-medium hover:bg-[var(--bg-surface)]",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: pin.length !== 4 || loading,
						onClick: handleSetPin,
						className: "h-10 rounded-xl bg-[var(--accent)] px-4 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:opacity-40",
						children: loading ? "Setting…" : "Set PIN"
					})]
				})
			]
		})
	});
}
//#endregion
export { SettingsPage as component };
