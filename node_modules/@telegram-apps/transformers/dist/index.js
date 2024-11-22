class i extends Error {
  constructor(e, r, a) {
    super(
      typeof r == "object" ? r.message : r || e,
      {
        cause: typeof r == "object" ? r.cause : a
      }
    ), this.type = e, Object.setPrototypeOf(this, i.prototype);
  }
}
function b(t) {
  return t.replace(/[A-Z]/g, (e) => `_${e.toLowerCase()}`);
}
function E(t) {
  return t.replace(/_[a-z]/g, (e) => e[1].toUpperCase());
}
const R = "ERR_INVALID_VALUE", S = "ERR_UNEXPECTED_VALUE", w = "ERR_UNEXPECTED_TYPE", h = "ERR_PARSE";
function y(t, e) {
  const r = {};
  for (const a in t) {
    const n = t[a];
    if (!n)
      continue;
    let o, c;
    typeof n == "function" ? (o = a, c = n) : [o, c] = n;
    try {
      const p = c(e(o));
      p !== void 0 && (r[a] = p);
    } catch (p) {
      throw new i(
        h,
        `Parser for "${a}" property failed${o === a ? "" : `. Source field: "${o}"`}`,
        p
      );
    }
  }
  return r;
}
function d(t) {
  let e = t;
  if (typeof e == "string")
    try {
      e = JSON.parse(e);
    } catch (r) {
      throw new i(R, { cause: r });
    }
  if (typeof e != "object" || !e || Array.isArray(e))
    throw new i(S);
  return e;
}
function s(t, e) {
  return (r) => {
    const a = (n) => {
      if (!(r && n === void 0))
        try {
          return e(n);
        } catch (o) {
          throw new i(h, {
            message: `"${t}" transformer failed to parse the value`,
            cause: o
          });
        }
    };
    return /* @__PURE__ */ Object.assign(
      a,
      {
        isValid(n) {
          try {
            return a(n), !0;
          } catch {
            return !1;
          }
        }
      }
    );
  };
}
function l(t, e) {
  return s(e || "object", (r) => {
    const a = d(r);
    return y(t, (n) => a[n]);
  });
}
function f(t) {
  throw new i(w, `Unexpected value received: ${JSON.stringify(t)}`);
}
const A = s("boolean", (t) => {
  if (typeof t == "boolean")
    return t;
  const e = String(t);
  if (e === "1" || e === "true")
    return !0;
  if (e === "0" || e === "false")
    return !1;
  f(t);
}), u = s("string", (t) => {
  if (typeof t == "string" || typeof t == "number")
    return t.toString();
  f(t);
}), g = s("number", (t) => {
  if (typeof t == "number")
    return t;
  if (typeof t == "string") {
    const e = Number(t);
    if (!Number.isNaN(e))
      return e;
  }
  f(t);
}), D = s("date", (t) => t instanceof Date ? t : new Date(g()(t) * 1e3));
function P(t, e) {
  return s(e || "searchParams", (r) => {
    typeof r != "string" && !(r instanceof URLSearchParams) && f(r);
    const a = typeof r == "string" ? new URLSearchParams(r) : r;
    return y(t, (n) => {
      const o = a.get(n);
      return o === null ? void 0 : o;
    });
  });
}
function m(t) {
  for (const e in t)
    t[e] = [b(e), t[e]];
  return t;
}
const U = (t) => {
  const e = g(), r = g(!0), a = u(), n = u(!0), o = A(!0), c = l(m({
    addedToAttachmentMenu: o,
    allowsWriteToPm: o,
    firstName: a,
    id: e,
    isBot: o,
    isPremium: o,
    languageCode: n,
    lastName: n,
    photoUrl: n,
    username: n
  }), "User")(!0);
  return P(
    m({
      authDate: D(),
      canSendAfter: r,
      chat: l(
        m({
          id: e,
          type: a,
          title: a,
          photoUrl: n,
          username: n
        }),
        "Chat"
      )(!0),
      chatInstance: n,
      chatType: n,
      hash: a,
      queryId: n,
      receiver: c,
      startParam: n,
      user: c
    }),
    "initData"
  )(t);
};
function N(t) {
  return /^#[\da-f]{6}$/i.test(t);
}
function O(t) {
  return /^#[\da-f]{3}$/i.test(t);
}
function W(t) {
  const e = t.replace(/\s/g, "").toLowerCase();
  if (N(e))
    return e;
  if (O(e)) {
    let a = "#";
    for (let n = 0; n < 3; n += 1)
      a += e[1 + n].repeat(2);
    return a;
  }
  const r = e.match(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/) || e.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),\d{1,3}\)$/);
  if (!r)
    throw new Error(`Value "${t}" does not satisfy any of known RGB formats.`);
  return r.slice(1).reduce((a, n) => {
    const o = parseInt(n, 10).toString(16);
    return a + (o.length === 1 ? "0" : "") + o;
  }, "#");
}
const _ = s("rgb", (t) => W(u()(t))), T = s(
  "themeParams",
  (t) => {
    const e = _(!0);
    return Object.entries(d(t)).reduce((r, [a, n]) => (r[E(a)] = e(n), r), {});
  }
);
// @__NO_SIDE_EFFECTS__
function V(t) {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(t).map(([e, r]) => [b(e), r])
    )
  );
}
const $ = (t) => {
  const e = u(), r = u(!0), a = A(!0);
  return P({
    botInline: ["tgWebAppBotInline", a],
    initData: ["tgWebAppData", U(!0)],
    initDataRaw: ["tgWebAppData", r],
    platform: ["tgWebAppPlatform", e],
    showSettings: ["tgWebAppShowSettings", a],
    startParam: ["tgWebAppStartParam", r],
    themeParams: ["tgWebAppThemeParams", T()],
    version: ["tgWebAppVersion", e]
  }, "launchParams")(t);
};
// @__NO_SIDE_EFFECTS__
function j(t) {
  const { initDataRaw: e, startParam: r, showSettings: a, botInline: n } = t, o = new URLSearchParams();
  return o.set("tgWebAppPlatform", t.platform), o.set("tgWebAppThemeParams", /* @__PURE__ */ V(t.themeParams)), o.set("tgWebAppVersion", t.version), e && o.set("tgWebAppData", e), r && o.set("tgWebAppStartParam", r), typeof a == "boolean" && o.set("tgWebAppShowSettings", a ? "1" : "0"), typeof n == "boolean" && o.set("tgWebAppBotInline", n ? "1" : "0"), o.toString();
}
const L = l({
  eventType: u(),
  eventData: (t) => t
}, "miniAppsMessage");
function I(t, e) {
  return s(e || "array", (r) => {
    let a;
    if (Array.isArray(r))
      a = r;
    else if (typeof r == "string")
      try {
        const n = JSON.parse(r);
        Array.isArray(n) && (a = n);
      } catch {
      }
    return a || f(r), a.map(t);
  });
}
const C = s("fn", (t) => {
  if (typeof t == "function")
    return t;
  f(t);
});
function B(t) {
  return !!t && typeof t == "object" && !Array.isArray(t);
}
export {
  R as ERR_INVALID_VALUE,
  h as ERR_PARSE,
  w as ERR_UNEXPECTED_TYPE,
  S as ERR_UNEXPECTED_VALUE,
  I as array,
  A as boolean,
  s as createTransformerGen,
  D as date,
  C as fn,
  U as initData,
  N as isRGB,
  O as isRGBShort,
  B as isRecord,
  $ as launchParams,
  L as miniAppsMessage,
  g as number,
  l as object,
  _ as rgb,
  P as searchParams,
  j as serializeLaunchParams,
  V as serializeThemeParams,
  u as string,
  T as themeParams,
  W as toRGB,
  d as toRecord
};
//# sourceMappingURL=index.js.map
