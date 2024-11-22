let v = class H extends Error {
  constructor(t, n, r) {
    super(
      typeof n == "object" ? n.message : n || t,
      {
        cause: typeof n == "object" ? n.cause : r
      }
    ), this.type = t, Object.setPrototypeOf(this, H.prototype);
  }
};
function G(e) {
  return e.replace(/[A-Z]/g, (t) => `_${t.toLowerCase()}`);
}
function we(e) {
  return e.replace(/_[a-z]/g, (t) => t[1].toUpperCase());
}
const he = "ERR_INVALID_VALUE", de = "ERR_UNEXPECTED_VALUE", me = "ERR_UNEXPECTED_TYPE", K = "ERR_PARSE";
function V(e, t) {
  const n = {};
  for (const r in e) {
    const o = e[r];
    if (!o)
      continue;
    let s, a;
    typeof o == "function" ? (s = r, a = o) : [s, a] = o;
    try {
      const i = a(t(s));
      i !== void 0 && (n[r] = i);
    } catch (i) {
      throw new v(
        K,
        `Parser for "${r}" property failed${s === r ? "" : `. Source field: "${s}"`}`,
        i
      );
    }
  }
  return n;
}
function Z(e) {
  let t = e;
  if (typeof t == "string")
    try {
      t = JSON.parse(t);
    } catch (n) {
      throw new v(he, { cause: n });
    }
  if (typeof t != "object" || !t || Array.isArray(t))
    throw new v(de);
  return t;
}
function g(e, t) {
  return (n) => {
    const r = (o) => {
      if (!(n && o === void 0))
        try {
          return t(o);
        } catch (s) {
          throw new v(K, {
            message: `"${e}" transformer failed to parse the value`,
            cause: s
          });
        }
    };
    return /* @__PURE__ */ Object.assign(
      r,
      {
        isValid(o) {
          try {
            return r(o), !0;
          } catch {
            return !1;
          }
        }
      }
    );
  };
}
function l(e, t) {
  return g(t || "object", (n) => {
    const r = Z(n);
    return V(e, (o) => r[o]);
  });
}
function R(e) {
  throw new v(me, `Unexpected value received: ${JSON.stringify(e)}`);
}
const $ = g("boolean", (e) => {
  if (typeof e == "boolean")
    return e;
  const t = String(e);
  if (t === "1" || t === "true")
    return !0;
  if (t === "0" || t === "false")
    return !1;
  R(e);
}), _ = g("string", (e) => {
  if (typeof e == "string" || typeof e == "number")
    return e.toString();
  R(e);
}), P = g("number", (e) => {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    const t = Number(e);
    if (!Number.isNaN(t))
      return t;
  }
  R(e);
}), Ee = g("date", (e) => e instanceof Date ? e : new Date(P()(e) * 1e3));
function z(e, t) {
  return g(t || "searchParams", (n) => {
    typeof n != "string" && !(n instanceof URLSearchParams) && R(n);
    const r = typeof n == "string" ? new URLSearchParams(n) : n;
    return V(e, (o) => {
      const s = r.get(o);
      return s === null ? void 0 : s;
    });
  });
}
function U(e) {
  for (const t in e)
    e[t] = [G(t), e[t]];
  return e;
}
const ye = (e) => {
  const t = P(), n = P(!0), r = _(), o = _(!0), s = $(!0), a = l(U({
    addedToAttachmentMenu: s,
    allowsWriteToPm: s,
    firstName: r,
    id: t,
    isBot: s,
    isPremium: s,
    languageCode: o,
    lastName: o,
    photoUrl: o,
    username: o
  }), "User")(!0);
  return z(
    U({
      authDate: Ee(),
      canSendAfter: n,
      chat: l(
        U({
          id: t,
          type: r,
          title: r,
          photoUrl: o,
          username: o
        }),
        "Chat"
      )(!0),
      chatInstance: o,
      chatType: o,
      hash: r,
      queryId: o,
      receiver: a,
      startParam: o,
      user: a
    }),
    "initData"
  )(e);
};
function ve(e) {
  return /^#[\da-f]{6}$/i.test(e);
}
function Pe(e) {
  return /^#[\da-f]{3}$/i.test(e);
}
function Re(e) {
  const t = e.replace(/\s/g, "").toLowerCase();
  if (ve(t))
    return t;
  if (Pe(t)) {
    let r = "#";
    for (let o = 0; o < 3; o += 1)
      r += t[1 + o].repeat(2);
    return r;
  }
  const n = t.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || t.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
  if (!n)
    throw new Error(`Value "${e}" does not satisfy any of known RGB formats.`);
  return n.slice(1).reduce((r, o) => {
    const s = parseInt(o, 10).toString(16);
    return r + (s.length === 1 ? "0" : "") + s;
  }, "#");
}
const Te = g("rgb", (e) => Re(_()(e))), Se = g(
  "themeParams",
  (e) => {
    const t = Te(!0);
    return Object.entries(Z(e)).reduce((n, [r, o]) => (n[we(r)] = t(o), n), {});
  }
);
// @__NO_SIDE_EFFECTS__
function X(e) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(e).map(([t, n]) => [G(t), n])
    )
  );
}
const Ae = (e) => {
  const t = _(), n = _(!0), r = $(!0);
  return z({
    botInline: ["tgWebAppBotInline", r],
    initData: ["tgWebAppData", ye(!0)],
    initDataRaw: ["tgWebAppData", n],
    platform: ["tgWebAppPlatform", t],
    showSettings: ["tgWebAppShowSettings", r],
    startParam: ["tgWebAppStartParam", n],
    themeParams: ["tgWebAppThemeParams", Se()],
    version: ["tgWebAppVersion", t]
  }, "launchParams")(e);
};
// @__NO_SIDE_EFFECTS__
function $e(e) {
  const { initDataRaw: t, startParam: n, showSettings: r, botInline: o } = e, s = new URLSearchParams();
  return s.set("tgWebAppPlatform", e.platform), s.set("tgWebAppThemeParams", /* @__PURE__ */ X(e.themeParams)), s.set("tgWebAppVersion", e.version), t && s.set("tgWebAppData", t), n && s.set("tgWebAppStartParam", n), typeof r == "boolean" && s.set("tgWebAppShowSettings", r ? "1" : "0"), typeof o == "boolean" && s.set("tgWebAppBotInline", o ? "1" : "0"), s.toString();
}
const Y = l({
  eventType: _(),
  eventData: (e) => e
}, "miniAppsMessage"), Q = g("fn", (e) => {
  if (typeof e == "function")
    return e;
  R(e);
});
function Ne(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
const Ce = l({
  TelegramWebviewProxy: l({ postEvent: Q() })()
});
function ee(e) {
  return Ce().isValid(e);
}
function De() {
  try {
    return window.self !== window.top;
  } catch {
    return !0;
  }
}
var Ue = Object.defineProperty, je = (e, t, n) => t in e ? Ue(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => je(e, typeof t != "symbol" ? t + "" : t, n);
class b extends Error {
  constructor(t, n, r) {
    super(
      typeof n == "object" ? n.message : n || t,
      {
        cause: typeof n == "object" ? n.cause : r
      }
    ), this.type = t, Object.setPrototypeOf(this, b.prototype);
  }
}
function x(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function L(...e) {
  const t = e.flat(1);
  return [
    t.push.bind(t),
    () => {
      t.forEach((n) => {
        n();
      });
    }
  ];
}
function xe(e, t) {
  return e instanceof b && e.type === t;
}
function W(e) {
  return (t) => xe(t, e);
}
const ne = "ERR_ABORTED", re = "ERR_CANCELED", oe = "ERR_TIMED_OUT";
function M(e) {
  return new b(ne, { cause: e });
}
const ot = W(oe), st = W(ne), at = W(re);
function q(e, t) {
  return e.reject = t.reject, e;
}
class w extends Promise {
  constructor(t, n) {
    let r, o;
    typeof t == "function" ? (r = t, o = n) : o = t;
    let s, a;
    super((i, c) => {
      o || (o = {});
      const { abortSignal: u } = o;
      if (u && u.aborted)
        return c(M(u.reason));
      const [f, h] = L(), d = (m) => (...ge) => (h(), m(...ge)), T = new AbortController(), { signal: S } = T;
      a = d((m) => {
        T.abort(m), c(m);
      }), s = d(i), u && f(
        x(u, "abort", () => {
          a(M(u.reason));
        })
      );
      const { timeout: D } = o;
      if (D) {
        const m = setTimeout(() => {
          a(new b(oe, `Timeout reached: ${D}ms`));
        }, D);
        f(() => {
          clearTimeout(m);
        });
      }
      r && r(s, a, S);
    }), te(this, "reject"), this.reject = a;
  }
  /**
   * Creates a new BetterPromise instance using executor, resolving promise when a result
   * was returned.
   * @param fn - function returning promise result.
   * @param options - additional options.
   */
  static withFn(t, n) {
    return new w((r, o, s) => {
      try {
        const a = t(s);
        return a instanceof Promise ? a.then(r, o) : r(a);
      } catch (a) {
        o(a);
      }
    }, n);
  }
  /**
   * @see Promise.resolve
   */
  static resolve(t) {
    return new w((n) => {
      n(t);
    });
  }
  /**
   * @see Promise.reject
   */
  static reject(t) {
    return new w((n, r) => {
      r(t);
    });
  }
  /**
   * Cancels the promise execution.
   */
  cancel() {
    this.reject(new b(re));
  }
  /**
   * @see Promise.catch
   */
  catch(t) {
    return this.then(void 0, t);
  }
  /**
   * @see Promise.finally
   */
  finally(t) {
    return q(super.finally(t), this);
  }
  /**
   * @see Promise.then
   */
  then(t, n) {
    return q(super.then(t, n), this);
  }
}
function F(e, t) {
  return e.resolve = t.resolve, e;
}
class A extends w {
  constructor(t, n) {
    let r, o;
    typeof t == "function" ? (r = t, o = n) : o = t;
    let s;
    super((a, i, c) => {
      s = a, r && r(a, i, c);
    }, o), te(this, "resolve"), this.resolve = s;
  }
  /**
   * Creates a new EnhancedPromise instance using executor, resolving promise when a result
   * was returned.
   * @param fn - function returning promise result.
   * @param options - additional options.
   */
  static withFn(t, n) {
    return new A(
      (r, o, s) => w.withFn(t, { abortSignal: s }).then(r, o),
      n
    );
  }
  /**
   * @see Promise.resolve
   */
  static resolve(t) {
    return new A((n) => {
      n(t);
    });
  }
  /**
   * @see Promise.reject
   */
  static reject(t) {
    return new A((n, r) => {
      r(t);
    });
  }
  /**
   * @see Promise.catch
   */
  catch(t) {
    return this.then(void 0, t);
  }
  /**
   * @see Promise.finally
   */
  finally(t) {
    return F(super.finally(t), this);
  }
  /**
   * @see Promise.then
   */
  then(t, n) {
    return F(super.then(t, n), this);
  }
}
function it(e, t) {
  return new w((n) => {
    setTimeout(n, e);
  }, { abortSignal: t });
}
function se(e) {
  return `tapps/${e}`;
}
function ke(e, t) {
  sessionStorage.setItem(se(e), JSON.stringify(t));
}
function Le(e) {
  const t = sessionStorage.getItem(se(e));
  try {
    return t ? JSON.parse(t) : void 0;
  } catch {
  }
}
function ct(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function ut(e) {
  return e.replace(/[A-Z]/g, (t) => `_${t.toLowerCase()}`);
}
function pt(e) {
  return e.replace(/_[a-z]/g, (t) => t[1].toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function We(e, t) {
  t || (t = {});
  const {
    textColor: n,
    bgColor: r,
    shouldLog: o = !0
  } = t;
  function s(a, ...i) {
    if (!o || typeof o == "function" && !o())
      return;
    const c = "font-weight:bold;padding:0 5px;border-radius:5px";
    console[a](
      `%c${Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
        timeZone: "UTC"
      }).format(/* @__PURE__ */ new Date())}%c / %c${e}`,
      `${c};background-color: lightblue;color:black`,
      "",
      `${c};${n ? `color:${n};` : ""}${r ? `background-color:${r}` : ""}`,
      ...i
    );
  }
  return [
    function(...a) {
      s("log", ...a);
    },
    function(...a) {
      s("error", ...a);
    }
  ];
}
function ft(e, t) {
  document.documentElement.style.setProperty(e, t);
}
function _t(e) {
  document.documentElement.style.removeProperty(e);
}
function Oe(e, t) {
  t();
}
// @__NO_SIDE_EFFECTS__
function E(e, t) {
  t || (t = {});
  const n = t.equals || Object.is;
  let r = [], o = e;
  const s = (u) => {
    if (!n(o, u)) {
      const f = o;
      o = u, Oe(c, () => {
        [...r].forEach(([h, d]) => {
          h(u, f), d && i(h, !0);
        });
      });
    }
  };
  function a(u) {
    const f = typeof u != "object" ? { once: u } : u;
    return {
      once: f.once || !1,
      signal: f.signal || !1
    };
  }
  const i = (u, f) => {
    const h = a(f), d = r.findIndex(([T, S]) => T === u && S.once === h.once && S.signal === h.signal);
    d >= 0 && r.splice(d, 1);
  }, c = Object.assign(
    function() {
      return Ie(c), o;
    },
    {
      destroy() {
        r = [];
      },
      set: s,
      reset() {
        s(e);
      },
      sub(u, f) {
        return r.push([u, a(f)]), () => i(u, f);
      },
      unsub: i,
      unsubAll() {
        r = r.filter((u) => u[1].signal);
      }
    }
  );
  return c;
}
const j = [];
function Ie(e) {
  j.length && j[j.length - 1].add(e);
}
const ae = /* @__PURE__ */ E(!1), [O, Me] = /* @__PURE__ */ We("Bridge", {
  bgColor: "#9147ff",
  textColor: "white",
  shouldLog: ae
}), qe = {
  clipboard_text_received: l({
    req_id: _(),
    data: (e) => e === null ? e : _(!0)(e)
  }, "clipboard_text_received"),
  custom_method_invoked: l({
    req_id: _(),
    result: (e) => e,
    error: _(!0)
  }, "custom_method_invoked"),
  popup_closed: g("popup_closed", (e) => e ? l({
    button_id: (t) => t == null ? void 0 : _()(t)
  })()(e) : {}),
  viewport_changed: l({
    height: P(),
    width: (e) => e == null ? window.innerWidth : P()(e),
    is_state_stable: $(),
    is_expanded: $()
  }, "viewport_changed")
};
function Fe(e) {
  const t = window, [, n] = L(
    // Add "resize" event listener to make sure, we always have fresh viewport information.
    // The desktop version of Telegram is sometimes not sending the "viewport_changed"
    // event. For example, when the Main Button is shown. That's why we should
    // add our own listener to make sure viewport information is always fresh.
    // Issue: https://github.com/Telegram-Mini-Apps/telegram-apps/issues/10
    x(t, "resize", () => {
      e(["viewport_changed", {
        width: window.innerWidth,
        height: window.innerHeight,
        is_state_stable: !0,
        is_expanded: !0
      }]);
    }),
    // Add listener, which handles events sent from the Telegram web application and also events
    // generated by the local emitEvent function.
    x(t, "message", (r) => {
      if (r.source !== t.parent)
        return;
      let o;
      try {
        o = Y()(r.data);
      } catch {
        return;
      }
      const { eventType: s, eventData: a } = o, i = qe[s];
      try {
        const c = i ? i()(a) : a;
        O("Event received:", c ? { eventType: s, eventData: c } : { eventType: s }), e([s, c]);
      } catch (c) {
        Me(
          [
            `An error occurred processing the "${s}" event from the Telegram application.`,
            "Please, file an issue here:",
            "https://github.com/Telegram-Mini-Apps/telegram-apps/issues/new/choose"
          ].join(`
`),
          o,
          c
        );
      }
    })
  );
  return n;
}
const N = /* @__PURE__ */ E(), C = /* @__PURE__ */ E();
function ie() {
  return C() || C.set(Fe(N.set)), N;
}
const y = /* @__PURE__ */ E({});
function ce(e) {
  let t = y()[e];
  return t || (t = /* @__PURE__ */ E(void 0, {
    equals() {
      return !1;
    }
  }), ie().sub((n) => {
    n && n[0] === e && t.set(n[1]);
  }), y.set({ ...y(), [e]: t })), t;
}
function Je(e, t, n) {
  return ce(e).sub(t, n);
}
const Be = "ERR_METHOD_UNSUPPORTED", He = "ERR_RETRIEVE_LP_FAILED", Ge = "ERR_METHOD_PARAMETER_UNSUPPORTED", Ke = "ERR_UNKNOWN_ENV", Ve = "ERR_INVOKE_CUSTOM_METHOD_RESPONSE", ue = /* @__PURE__ */ E("https://web.telegram.org");
function pe(e, t) {
  O("Posting event:", t ? { eventType: e, eventData: t } : { eventType: e });
  const n = window;
  if (ee(n)) {
    n.TelegramWebviewProxy.postEvent(e, JSON.stringify(t));
    return;
  }
  const r = JSON.stringify({ eventType: e, eventData: t });
  if (De())
    return n.parent.postMessage(r, ue());
  const { external: o } = n;
  if (l({ notify: Q() })().isValid(o)) {
    o.notify(r);
    return;
  }
  throw new b(Ke);
}
function fe(e, t, n) {
  n || (n = {});
  const { capture: r } = n, [o, s] = L();
  return new w((a) => {
    (Array.isArray(t) ? t : [t]).forEach((i) => {
      o(
        Je(i, (c) => {
          (!r || (Array.isArray(t) ? r({
            event: i,
            payload: c
          }) : r(c))) && a(c);
        })
      );
    }), (n.postEvent || pe)(e, n.params);
  }, n).finally(s);
}
function I(e) {
  return Ae()(e);
}
function _e(e) {
  return I(
    e.replace(/^[^?#]*[?#]/, "").replace(/[?#]/g, "&")
  );
}
function Ze() {
  return _e(window.location.href);
}
function ze() {
  const e = performance.getEntriesByType("navigation")[0];
  if (!e)
    throw new Error("Unable to get first navigation entry.");
  return _e(e.name);
}
const Xe = "launchParams";
function Ye() {
  return I(Le(Xe) || "");
}
function le(e) {
  ke("launchParams", /* @__PURE__ */ $e(e));
}
function be(e) {
  return e instanceof Error ? e.message + (e.cause ? `
  ${be(e.cause)}` : "") : JSON.stringify(e);
}
function Qe() {
  const e = [];
  for (const t of [
    // Try to retrieve launch parameters from the current location. This method can return
    // nothing in case, location was changed, and then the page was reloaded.
    Ze,
    // Then, try using the lower level API - window.performance.
    ze,
    // Finally, try to extract launch parameters from the session storage.
    Ye
  ])
    try {
      const n = t();
      return le(n), n;
    } catch (n) {
      e.push(n);
    }
  throw new b(He, [
    "Unable to retrieve launch parameters from any known source. Perhaps, you have opened your app outside Telegram?",
    "📖 Refer to docs for more information:",
    "https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/environment",
    "Collected errors:",
    ...e.map((t) => `— ${be(t)}`)
  ].join(`
`));
}
function lt(e) {
  if (e === "simple")
    try {
      return Qe(), !0;
    } catch {
      return !1;
    }
  return w.withFn(async () => {
    if (ee(window))
      return !0;
    try {
      return await fe("web_app_request_theme", "theme_changed", { timeout: 100 }), !0;
    } catch {
      return !1;
    }
  }, e);
}
function k(e, t) {
  window.dispatchEvent(new MessageEvent("message", {
    data: JSON.stringify({ eventType: e, eventData: t }),
    // We specify window.parent to imitate the case, the parent iframe sent us this event.
    source: window.parent
  }));
}
function et(e, t) {
  if (typeof t == "string")
    try {
      const { eventType: n } = Y()(t);
      n === "web_app_request_theme" && k("theme_changed", {
        theme_params: JSON.parse(/* @__PURE__ */ X(e))
      }), n === "web_app_request_viewport" && k("viewport_changed", {
        width: window.innerWidth,
        height: window.innerHeight,
        is_state_stable: !0,
        is_expanded: !0
      });
    } catch {
    }
}
function bt(e) {
  var r;
  const t = typeof e == "string" ? I(e) : e;
  le(t);
  const n = (r = window.TelegramWebviewProxy) == null ? void 0 : r.postEvent;
  window.TelegramWebviewProxy = {
    postEvent(o, s) {
      et(t.themeParams, JSON.stringify({ eventType: o, eventData: s })), n == null || n(o, s);
    }
  }, O("Environment was mocked by the mockTelegramEnv function");
}
function gt() {
  [
    ["TelegramGameProxy_receiveEvent"],
    // Windows Phone.
    ["TelegramGameProxy", "receiveEvent"],
    // Desktop.
    ["Telegram", "WebView", "receiveEvent"]
    // Android and iOS.
  ].forEach((e) => {
    let t = window;
    e.forEach((n, r, o) => {
      if (r === o.length - 1) {
        t[n] = k;
        return;
      }
      n in t || (t[n] = {}), t = t[n];
    });
  });
}
function wt() {
  ["TelegramGameProxy_receiveEvent", "TelegramGameProxy", "Telegram"].forEach((e) => {
    delete window[e];
  });
}
function ht(e, t, n) {
  ce(e).unsub(t, n);
}
function dt(e, t) {
  return ie().sub(e, t);
}
function mt(e, t) {
  N.unsub(e, t);
}
function tt(e) {
  return ({ req_id: t }) => t === e;
}
function J(e) {
  return e.split(".").map(Number);
}
function nt(e, t) {
  const n = J(e), r = J(t), o = Math.max(n.length, r.length);
  for (let s = 0; s < o; s += 1) {
    const a = n[s] || 0, i = r[s] || 0;
    if (a !== i)
      return a > i ? 1 : -1;
  }
  return 0;
}
function p(e, t) {
  return nt(e, t) <= 0;
}
function B(e, t, n) {
  if (typeof n == "string") {
    if (e === "web_app_open_link") {
      if (t === "try_instant_view")
        return p("6.4", n);
      if (t === "try_browser")
        return p("7.6", n);
    }
    if (e === "web_app_set_header_color" && t === "color")
      return p("6.9", n);
    if (e === "web_app_close" && t === "return_back")
      return p("7.6", n);
    if (e === "web_app_setup_main_button" && t === "has_shine_effect")
      return p("7.10", n);
  }
  switch (e) {
    case "web_app_open_tg_link":
    case "web_app_open_invoice":
    case "web_app_setup_back_button":
    case "web_app_set_background_color":
    case "web_app_set_header_color":
    case "web_app_trigger_haptic_feedback":
      return p("6.1", t);
    case "web_app_open_popup":
      return p("6.2", t);
    case "web_app_close_scan_qr_popup":
    case "web_app_open_scan_qr_popup":
    case "web_app_read_text_from_clipboard":
      return p("6.4", t);
    case "web_app_switch_inline_query":
      return p("6.7", t);
    case "web_app_invoke_custom_method":
    case "web_app_request_write_access":
    case "web_app_request_phone":
      return p("6.9", t);
    case "web_app_setup_settings_button":
      return p("6.10", t);
    case "web_app_biometry_get_info":
    case "web_app_biometry_open_settings":
    case "web_app_biometry_request_access":
    case "web_app_biometry_request_auth":
    case "web_app_biometry_update_token":
      return p("7.2", t);
    case "web_app_setup_swipe_behavior":
      return p("7.7", t);
    case "web_app_share_to_story":
      return p("7.8", t);
    case "web_app_setup_secondary_button":
    case "web_app_set_bottom_bar_color":
      return p("7.10", t);
    default:
      return [
        "iframe_ready",
        "iframe_will_reload",
        "web_app_close",
        "web_app_data_send",
        "web_app_expand",
        "web_app_open_link",
        "web_app_ready",
        "web_app_request_theme",
        "web_app_request_viewport",
        "web_app_setup_main_button",
        "web_app_setup_closing_behavior"
      ].includes(e);
  }
}
function Et(e, t) {
  t || (t = "strict");
  const n = typeof t == "function" ? t : (r) => {
    const { method: o, version: s } = r;
    let a, i;
    if ("param" in r ? (a = `Parameter "${r.param}" of "${o}" method is unsupported in Mini Apps version ${s}`, i = Ge) : (a = `Method "${o}" is unsupported in Mini Apps version ${s}`, i = Be), t === "strict")
      throw new b(i, a);
    return console.warn(a);
  };
  return (r, o) => B(r, e) ? Ne(o) && r === "web_app_set_header_color" && "color" in o && !B(r, "color", e) ? n({ version: e, method: r, param: "color" }) : pe(r, o) : n({ version: e, method: r });
}
function yt(e, t, n, r) {
  return fe("web_app_invoke_custom_method", "custom_method_invoked", {
    ...r || {},
    params: { method: e, params: t, req_id: n },
    capture: tt(n)
  }).then(({ result: o, error: s }) => {
    if (s)
      throw new b(Ve, s);
    return o;
  });
}
function rt(e) {
  e.unsubAll(), e.reset();
}
function vt() {
  var e;
  (e = C()) == null || e(), [
    ...Object.values(y()),
    y,
    N,
    C,
    ue,
    ae
  ].forEach(rt);
}
export {
  ae as $debug,
  ue as $targetOrigin,
  w as CancelablePromise,
  ne as ERR_ABORTED,
  re as ERR_CANCELED,
  Ve as ERR_CUSTOM_METHOD_ERR_RESPONSE,
  Ge as ERR_METHOD_PARAMETER_UNSUPPORTED,
  Be as ERR_METHOD_UNSUPPORTED,
  He as ERR_RETRIEVE_LP_FAILED,
  oe as ERR_TIMED_OUT,
  Ke as ERR_UNKNOWN_ENV,
  A as EnhancedPromise,
  b as TypedError,
  x as addEventListener,
  ct as camelToKebab,
  ut as camelToSnake,
  tt as captureSameReq,
  nt as compareVersions,
  M as createAbortError,
  L as createCbCollector,
  We as createLogger,
  Et as createPostEvent,
  W as createTypedErrorPredicate,
  gt as defineEventHandlers,
  _t as deleteCssVar,
  k as emitMiniAppsEvent,
  Le as getStorageValue,
  ee as hasWebviewProxy,
  yt as invokeCustomMethod,
  st as isAbortError,
  at as isCanceledError,
  De as isIframe,
  lt as isTMA,
  ot as isTimeoutError,
  bt as mockTelegramEnv,
  ht as off,
  Je as on,
  pe as postEvent,
  wt as removeEventHandlers,
  fe as request,
  vt as resetPackageState,
  Qe as retrieveLaunchParams,
  ft as setCssVar,
  ke as setStorageValue,
  it as sleep,
  pt as snakeToCamel,
  dt as subscribe,
  B as supports,
  mt as unsubscribe
};
//# sourceMappingURL=index.js.map
