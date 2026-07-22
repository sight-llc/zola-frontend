import { r as __toESM } from "./_runtime.mjs";
import { m as sendMoney, n as getBalance, p as resolveAccount, r as getBanks, t as formatNaira } from "./_ssr/api-B4kmTFOi.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useToast } from "./_ssr/toast-D-Okk_IC.mjs";
import { t as Icons } from "./_ssr/Icons-Nrs4ZB_z.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as Check, n as ChevronUp, r as ChevronDown } from "./_libs/lucide-react.mjs";
import { i as cn, n as InputOTPGroup, r as InputOTPSlot, t as InputOTP } from "./_ssr/input-otp-CqkdaMEi.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "./_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.send-DxQVT5_b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function SendPage() {
	const [step, setStep] = (0, import_react.useState)(1);
	const [bankCode, setBankCode] = (0, import_react.useState)("058");
	const [accountNumber, setAccountNumber] = (0, import_react.useState)("");
	const [resolving, setResolving] = (0, import_react.useState)(false);
	const [resolved, setResolved] = (0, import_react.useState)(null);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [narration, setNarration] = (0, import_react.useState)("");
	const [pin, setPin] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [reference, setReference] = (0, import_react.useState)(null);
	const [balance, setBalance] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [banks, setBanks] = (0, import_react.useState)([]);
	const [banksLoading, setBanksLoading] = (0, import_react.useState)(true);
	const [banksError, setBanksError] = (0, import_react.useState)(null);
	const { toast } = useToast();
	(0, import_react.useEffect)(() => {
		async function fetchBanks() {
			setBanksLoading(true);
			setBanksError(null);
			try {
				const fetchedBanks = await getBanks();
				setBanks(fetchedBanks);
			} catch (e) {
				setBanksError(e instanceof Error ? e.message : "Failed to load banks");
			} finally {
				setBanksLoading(false);
			}
		}
		fetchBanks();
	}, []);
	(0, import_react.useEffect)(() => {
		getBalance().then((b) => setBalance(b.balance)).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		setResolved(null);
		setError(null);
		if (accountNumber.length === 10) {
			setResolving(true);
			resolveAccount(bankCode, accountNumber).then((r) => setResolved({
				name: r.accountName,
				bank: r.bankName
			})).catch((e) => setError(e.message)).finally(() => setResolving(false));
		}
	}, [accountNumber, bankCode]);
	const amountNum = Number(amount.replace(/[^0-9.]/g, "")) || 0;
	async function submit() {
		if (!resolved) return;
		setSubmitting(true);
		try {
			const res = await sendMoney(bankCode, accountNumber, resolved.name, amountNum, narration, pin);
			setReference(res.reference);
			setStep(5);
			toast("Transfer successful");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Transfer failed");
		} finally {
			setSubmitting(false);
		}
	}
	function reset() {
		setStep(1);
		setAccountNumber("");
		setResolved(null);
		setAmount("");
		setNarration("");
		setPin("");
		setReference(null);
		setError(null);
	}
	async function retryFetchBanks() {
		setBanksLoading(true);
		setBanksError(null);
		try {
			const fetchedBanks = await getBanks();
			setBanks(fetchedBanks);
		} catch (e) {
			setBanksError(e instanceof Error ? e.message : "Failed to load banks");
		} finally {
			setBanksLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[520px] flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					if (step > 1 && step < 5) setStep(step - 1);
					else if (step === 5) reset();
					else window.history.back();
				},
				className: "flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.ChevronLeft, { size: 14 }), "Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Send money"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-[var(--text-secondary)]",
				children: "Transfer to any Nigerian bank account."
			})] }),
			step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in-scale",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-bold",
							children: "1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Recipient details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--text-tertiary)]",
							children: "Who are you sending to?"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-[var(--text-secondary)]",
									children: "Bank"
								}), banksLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-11 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 flex items-center text-xs text-[var(--text-tertiary)]",
									children: "Loading banks…"
								}) : banksError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-[var(--error)]",
										children: banksError
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: retryFetchBanks,
										className: "h-9 rounded-lg border border-[var(--border-default)] px-3 text-xs font-medium hover:bg-[var(--bg-surface)] transition-colors self-start",
										children: "Retry"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: bankCode,
									onValueChange: setBankCode,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm text-left hover:border-[var(--border-strong)] transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a bank" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										className: "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-lg",
										children: banks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: b.bankCode,
											className: "px-3 py-2.5 text-sm hover:bg-[var(--bg-surface)] cursor-pointer",
											children: b.bankName
										}, b.bankCode))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-[var(--text-secondary)]",
									children: "Account number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "numeric",
									maxLength: 10,
									value: accountNumber,
									onChange: (e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, "")),
									placeholder: "10 digits",
									className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm tabular-nums placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
								})]
							}),
							resolving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-11 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 flex items-center text-xs text-[var(--text-tertiary)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-3 w-3 rounded-full border-2 border-[var(--text-tertiary)] border-t-transparent animate-spin mr-2" }), "Resolving account…"]
							}) : null,
							resolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-xl bg-[var(--success-bg)] px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.CheckCircle, {
									size: 16,
									className: "text-[var(--success)] shrink-0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-[var(--success)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: resolved.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[var(--success)]/70",
										children: [" · ", resolved.bank]
									})]
								})]
							}) : null,
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.AlertCircle, { size: 14 }), error]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: !resolved,
								onClick: () => setStep(2),
								className: "mt-2 h-12 w-full rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none",
								children: "Continue"
							})
						]
					})]
				})
			}),
			step === 2 && resolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in-scale",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3 rounded-xl bg-[var(--bg-surface)] px-4 py-3 text-sm mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.User, {
									size: 16,
									className: "shrink-0 text-[var(--text-tertiary)]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-[var(--text-secondary)]",
									children: "To"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 truncate font-medium text-[var(--text-primary)]",
									children: resolved.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-[var(--text-tertiary)]",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 truncate text-[var(--text-secondary)]",
									children: resolved.bank
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2 pb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-semibold text-[var(--text-tertiary)] mt-2",
										children: "₦"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										autoFocus: true,
										inputMode: "decimal",
										value: amount,
										onChange: (e) => setAmount(e.target.value.replace(/[^0-9.]/g, "")),
										placeholder: "0.00",
										className: "w-56 bg-transparent text-center text-5xl font-bold tabular-nums text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-[var(--text-tertiary)] tabular-nums",
									children: ["Available: ", formatNaira(balance)]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5 mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-[var(--text-secondary)]",
								children: "Narration (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "What's this for?",
								value: narration,
								onChange: (e) => setNarration(e.target.value),
								className: "h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] px-4 text-sm placeholder:text-[var(--text-tertiary)] transition-all hover:border-[var(--border-strong)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)]"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStep(1),
								className: "h-12 flex-1 rounded-2xl border border-[var(--border-default)] text-sm font-medium transition-all hover:bg-[var(--bg-surface)]",
								children: "Change"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "h-12 flex-[2] rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none",
								disabled: amountNum <= 0 || amountNum > balance,
								onClick: () => setStep(3),
								children: "Review transfer"
							})]
						})
					]
				})
			}),
			step === 3 && resolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in-scale",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.CheckCircle, {
								size: 20,
								className: "text-[var(--success)]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold",
								children: "Review transfer"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								{
									label: "Recipient",
									value: resolved.name
								},
								{
									label: "Bank",
									value: resolved.bank
								},
								{
									label: "Account",
									value: accountNumber
								},
								{
									label: "Amount",
									value: formatNaira(amountNum),
									highlight: true
								},
								{
									label: "Narration",
									value: narration || "—"
								},
								{
									label: "Fee",
									value: "₦ 0.00"
								}
							].map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[var(--text-secondary)]",
									children: field.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-sm tabular-nums ${field.highlight ? "font-bold text-[var(--text-primary)]" : "font-medium text-[var(--text-primary)]"}`,
									children: field.value
								})]
							}, field.label))
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.AlertCircle, { size: 14 }), error]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStep(2),
								className: "h-12 flex-1 rounded-2xl border border-[var(--border-default)] text-sm font-medium transition-all hover:bg-[var(--bg-surface)]",
								children: "Edit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "h-12 flex-[2] rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98]",
								disabled: !resolved,
								onClick: () => setStep(4),
								children: "Confirm with PIN"
							})]
						})
					]
				})
			}),
			step === 4 && resolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in-scale",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-4 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.Lock, { size: 20 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: "Enter transaction PIN"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-[var(--text-tertiary)]",
									children: [
										"Confirm sending ",
										formatNaira(amountNum),
										" to ",
										resolved.name
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTP, {
								maxLength: 4,
								value: pin,
								onChange: setPin,
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
										className: "h-14 w-14 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-secondary)] text-xl font-bold tabular-nums text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--border-focus)] [&[data-selected]]:border-[var(--border-focus)]"
									}, i))
								})
							})
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2 rounded-xl bg-[var(--error-bg)] px-4 py-3 text-xs text-[var(--error)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.AlertCircle, { size: 14 }), error]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStep(3),
								className: "h-12 flex-1 rounded-2xl border border-[var(--border-default)] text-sm font-medium transition-all hover:bg-[var(--bg-surface)]",
								children: "Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: pin.length !== 4 || submitting,
								onClick: submit,
								className: "h-12 flex-[2] rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center justify-center gap-2",
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
								}) : null, submitting ? "Sending…" : `Send ${formatNaira(amountNum)}`]
							})]
						})
					]
				})
			}),
			step === 5 && resolved && reference ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-in-scale text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--success-bg)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icons.CheckCircle, {
								size: 28,
								className: "text-[var(--success)]"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-5 text-xl font-bold",
							children: [formatNaira(amountNum), " sent"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-[var(--text-secondary)]",
							children: resolved.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-xl bg-[var(--bg-surface)] px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-[var(--text-tertiary)]",
								children: "Reference"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-xs tabular-nums text-[var(--text-primary)] font-medium",
								children: reference
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/transactions",
								className: "h-12 w-full inline-flex items-center justify-center rounded-2xl border border-[var(--border-default)] text-sm font-medium transition-all hover:bg-[var(--bg-surface)]",
								children: "View transaction"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: reset,
								className: "h-12 w-full rounded-2xl bg-[var(--accent)] text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98]",
								children: "Send another"
							})]
						})
					]
				})
			}) : null
		]
	});
}
//#endregion
export { SendPage as component };
