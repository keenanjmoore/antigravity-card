const Pe = globalThis, Ze = Pe.ShadowRoot && (Pe.ShadyCSS === void 0 || Pe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qe = Symbol(), at = /* @__PURE__ */ new WeakMap();
let Ct = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Qe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ze && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = at.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && at.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ut = (n) => new Ct(typeof n == "string" ? n : n + "", void 0, Qe), Tt = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, r, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[o + 1], n[0]);
  return new Ct(t, n, Qe);
}, Ft = (n, e) => {
  if (Ze) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = Pe.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, n.appendChild(i);
  }
}, st = Ze ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ut(t);
})(n) : n;
const { is: Gt, defineProperty: Vt, getOwnPropertyDescriptor: Wt, getOwnPropertyNames: Yt, getOwnPropertySymbols: qt, getPrototypeOf: Kt } = Object, He = globalThis, lt = He.trustedTypes, Xt = lt ? lt.emptyScript : "", Zt = He.reactiveElementPolyfillSupport, he = (n, e) => n, Ee = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Xt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Je = (n, e) => !Gt(n, e), ct = { attribute: !0, type: String, converter: Ee, reflect: !1, useDefault: !1, hasChanged: Je };
Symbol.metadata ??= Symbol("metadata"), He.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ee = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ct) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && Vt(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: o } = Wt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const s = r?.call(this);
      o?.call(this, a), this.requestUpdate(e, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(he("elementProperties"))) return;
    const e = Kt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(he("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(he("properties"))) {
      const t = this.properties, i = [...Yt(t), ...qt(t)];
      for (const r of i) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, r] of t) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const r = this._$Eu(t, i);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) t.unshift(st(r));
    } else e !== void 0 && t.push(st(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ft(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : Ee).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Ee;
      this._$Em = r;
      const s = a.fromAttribute(t, o.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, o) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? Je)(o, t) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: o }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) {
        const { wrapped: a } = o, s = this[r];
        a !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, o, s);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ee.elementStyles = [], ee.shadowRootOptions = { mode: "open" }, ee[he("elementProperties")] = /* @__PURE__ */ new Map(), ee[he("finalized")] = /* @__PURE__ */ new Map(), Zt?.({ ReactiveElement: ee }), (He.reactiveElementVersions ??= []).push("2.1.2");
const je = globalThis, dt = (n) => n, Le = je.trustedTypes, ut = Le ? Le.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, At = "$lit$", U = `lit$${Math.random().toFixed(9).slice(2)}$`, Mt = "?" + U, Qt = `<${Mt}>`, Y = document, _e = () => Y.createComment(""), pe = (n) => n === null || typeof n != "object" && typeof n != "function", et = Array.isArray, Jt = (n) => et(n) || typeof n?.[Symbol.iterator] == "function", Ve = `[ 	
\f\r]`, le = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, _t = />/g, G = RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, gt = /"/g, Pt = /^(?:script|style|textarea|title)$/i, jt = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), w = jt(1), q = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), W = Y.createTreeWalker(Y, 129);
function Et(n, e) {
  if (!et(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(e) : e;
}
const ei = (n, e) => {
  const t = n.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = le;
  for (let s = 0; s < t; s++) {
    const l = n[s];
    let d, h, c = -1, _ = 0;
    for (; _ < l.length && (a.lastIndex = _, h = a.exec(l), h !== null); ) _ = a.lastIndex, a === le ? h[1] === "!--" ? a = ht : h[1] !== void 0 ? a = _t : h[2] !== void 0 ? (Pt.test(h[2]) && (r = RegExp("</" + h[2], "g")), a = G) : h[3] !== void 0 && (a = G) : a === G ? h[0] === ">" ? (a = r ?? le, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? G : h[3] === '"' ? gt : pt) : a === gt || a === pt ? a = G : a === ht || a === _t ? a = le : (a = G, r = void 0);
    const p = a === G && n[s + 1].startsWith("/>") ? " " : "";
    o += a === le ? l + Qt : c >= 0 ? (i.push(d), l.slice(0, c) + At + l.slice(c) + U + p) : l + U + (c === -2 ? s : p);
  }
  return [Et(n, o + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class ge {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, h] = ei(e, t);
    if (this.el = ge.createElement(d, i), W.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = W.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(At)) {
          const _ = h[a++], p = r.getAttribute(c).split(U), b = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: o, name: b[2], strings: p, ctor: b[1] === "." ? ii : b[1] === "?" ? ri : b[1] === "@" ? oi : Ne }), r.removeAttribute(c);
        } else c.startsWith(U) && (l.push({ type: 6, index: o }), r.removeAttribute(c));
        if (Pt.test(r.tagName)) {
          const c = r.textContent.split(U), _ = c.length - 1;
          if (_ > 0) {
            r.textContent = Le ? Le.emptyScript : "";
            for (let p = 0; p < _; p++) r.append(c[p], _e()), W.nextNode(), l.push({ type: 2, index: ++o });
            r.append(c[_], _e());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Mt) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(U, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += U.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = Y.createElement("template");
    return i.innerHTML = e, i;
  }
}
function ie(n, e, t = n, i) {
  if (e === q) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const o = pe(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(n), r._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = ie(n, r._$AS(n, e.values), r, i)), e;
}
class ti {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? Y).importNode(t, !0);
    W.currentNode = r;
    let o = W.nextNode(), a = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new re(o, o.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (d = new ni(o, this, e)), this._$AV.push(d), l = i[++s];
      }
      a !== l?.index && (o = W.nextNode(), a++);
    }
    return W.currentNode = Y, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class re {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = ie(this, e, t), pe(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Jt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== v && pe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Y.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = ge.createElement(Et(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new ti(r, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = ft.get(e.strings);
    return t === void 0 && ft.set(e.strings, t = new ge(e)), t;
  }
  k(e) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const o of e) r === t.length ? t.push(i = new re(this.O(_e()), this.O(_e()), this, this.options)) : i = t[r], i._$AI(o), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = dt(e).nextSibling;
      dt(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ne {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, o) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  _$AI(e, t = this, i, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = ie(this, e, t, 0), a = !pe(e) || e !== this._$AH && e !== q, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = o[0], l = 0; l < o.length - 1; l++) d = ie(this, s[i + l], t, l), d === q && (d = this._$AH[l]), a ||= !pe(d) || d !== this._$AH[l], d === v ? e = v : e !== v && (e += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ii extends Ne {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === v ? void 0 : e;
  }
}
class ri extends Ne {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== v);
  }
}
class oi extends Ne {
  constructor(e, t, i, r, o) {
    super(e, t, i, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ie(this, e, t, 0) ?? v) === q) return;
    const i = this._$AH, r = e === v && i !== v || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== v && (i === v || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let ni = class {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ie(this, e);
  }
};
const ai = { I: re }, si = je.litHtmlPolyfillSupport;
si?.(ge, re), (je.litHtmlVersions ??= []).push("3.3.3");
const li = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    i._$litPart$ = r = new re(e.insertBefore(_e(), o), o, void 0, t ?? {});
  }
  return r._$AI(n), r;
};
const tt = globalThis;
let te = class extends ee {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = li(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return q;
  }
};
te._$litElement$ = !0, te.finalized = !0, tt.litElementHydrateSupport?.({ LitElement: te });
const ci = tt.litElementPolyfillSupport;
ci?.({ LitElement: te });
(tt.litElementVersions ??= []).push("4.2.2");
const di = { attribute: !0, type: String, converter: Ee, reflect: !1, hasChanged: Je }, ui = (n = di, e, t) => {
  const { kind: i, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(t.name, n), i === "accessor") {
    const { name: a } = t;
    return { set(s) {
      const l = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(a, l, n, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, n, s), s;
    } };
  }
  if (i === "setter") {
    const { name: a } = t;
    return function(s) {
      const l = this[a];
      e.call(this, s), this.requestUpdate(a, l, n, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Re(n) {
  return (e, t) => typeof t == "object" ? ui(n, e, t) : ((i, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(n, e, t);
}
function De(n) {
  return Re({ ...n, state: !0, attribute: !1 });
}
function Lt(n) {
  return (e, t) => {
    const i = typeof e == "function" ? e : e[t];
    Object.assign(i, n);
  };
}
const hi = { CHILD: 2 }, _i = (n) => (...e) => ({ _$litDirective$: n, values: e });
let pi = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const { I: gi } = ai, bt = (n) => n, mt = () => document.createComment(""), ce = (n, e, t) => {
  const i = n._$AA.parentNode, r = e === void 0 ? n._$AB : e._$AA;
  if (t === void 0) {
    const o = i.insertBefore(mt(), r), a = i.insertBefore(mt(), r);
    t = new gi(o, a, n, n.options);
  } else {
    const o = t._$AB.nextSibling, a = t._$AM, s = a !== n;
    if (s) {
      let l;
      t._$AQ?.(n), t._$AM = n, t._$AP !== void 0 && (l = n._$AU) !== a._$AU && t._$AP(l);
    }
    if (o !== r || s) {
      let l = t._$AA;
      for (; l !== o; ) {
        const d = bt(l).nextSibling;
        bt(i).insertBefore(l, r), l = d;
      }
    }
  }
  return t;
}, V = (n, e, t = n) => (n._$AI(e, t), n), fi = {}, bi = (n, e = fi) => n._$AH = e, mi = (n) => n._$AH, We = (n) => {
  n._$AR(), n._$AA.remove();
};
const vt = (n, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) i.set(n[r], r);
  return i;
}, vi = _i(class extends pi {
  constructor(n) {
    if (super(n), n.type !== hi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(n, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const r = [], o = [];
    let a = 0;
    for (const s of n) r[a] = i ? i(s, a) : a, o[a] = t(s, a), a++;
    return { values: o, keys: r };
  }
  render(n, e, t) {
    return this.dt(n, e, t).values;
  }
  update(n, [e, t, i]) {
    const r = mi(n), { values: o, keys: a } = this.dt(e, t, i);
    if (!Array.isArray(r)) return this.ut = a, o;
    const s = this.ut ??= [], l = [];
    let d, h, c = 0, _ = r.length - 1, p = 0, b = o.length - 1;
    for (; c <= _ && p <= b; ) if (r[c] === null) c++;
    else if (r[_] === null) _--;
    else if (s[c] === a[p]) l[p] = V(r[c], o[p]), c++, p++;
    else if (s[_] === a[b]) l[b] = V(r[_], o[b]), _--, b--;
    else if (s[c] === a[b]) l[b] = V(r[c], o[b]), ce(n, l[b + 1], r[c]), c++, b--;
    else if (s[_] === a[p]) l[p] = V(r[_], o[p]), ce(n, r[c], r[_]), _--, p++;
    else if (d === void 0 && (d = vt(a, p, b), h = vt(s, c, _)), d.has(s[c])) if (d.has(s[_])) {
      const y = h.get(a[p]), S = y !== void 0 ? r[y] : null;
      if (S === null) {
        const g = ce(n, r[c]);
        V(g, o[p]), l[p] = g;
      } else l[p] = V(S, o[p]), ce(n, r[c], S), r[y] = null;
      p++;
    } else We(r[_]), _--;
    else We(r[c]), c++;
    for (; p <= b; ) {
      const y = ce(n, l[b + 1]);
      V(y, o[p]), l[p++] = y;
    }
    for (; c <= _; ) {
      const y = r[c++];
      y !== null && We(y);
    }
    return this.ut = a, bi(n, l), q;
  }
});
var yt, xt;
(function(n) {
  n.language = "language", n.system = "system", n.comma_decimal = "comma_decimal", n.decimal_comma = "decimal_comma", n.space_comma = "space_comma", n.none = "none";
})(yt || (yt = {})), function(n) {
  n.language = "language", n.system = "system", n.am_pm = "12", n.twenty_four = "24";
}(xt || (xt = {}));
function yi(n) {
  return n.substr(0, n.indexOf("."));
}
var xi = ["closed", "locked", "off"], fe = function(n, e, t, i) {
  i = i || {}, t = t ?? {};
  var r = new Event(e, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return r.detail = t, n.dispatchEvent(r), r;
}, ue = function(n) {
  fe(window, "haptic", n);
}, $i = function(n, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), fe(window, "location-changed", { replace: t });
}, wi = function(n, e, t) {
  t === void 0 && (t = !0);
  var i, r = yi(e), o = r === "group" ? "homeassistant" : r;
  switch (r) {
    case "lock":
      i = t ? "unlock" : "lock";
      break;
    case "cover":
      i = t ? "open_cover" : "close_cover";
      break;
    default:
      i = t ? "turn_on" : "turn_off";
  }
  return n.callService(o, i, { entity_id: e });
}, Si = function(n, e) {
  var t = xi.includes(n.states[e].state);
  return wi(n, e, t);
}, ki = function(n, e, t, i) {
  if (i || (i = { action: "more-info" }), !i.confirmation || i.confirmation.exemptions && i.confirmation.exemptions.some(function(o) {
    return o.user === e.user.id;
  }) || (ue("warning"), confirm(i.confirmation.text || "Are you sure you want to " + i.action + "?"))) switch (i.action) {
    case "more-info":
      (t.entity || t.camera_image) && fe(n, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      i.navigation_path && $i(0, i.navigation_path);
      break;
    case "url":
      i.url_path && window.open(i.url_path);
      break;
    case "toggle":
      t.entity && (Si(e, t.entity), ue("success"));
      break;
    case "call-service":
      if (!i.service) return void ue("failure");
      var r = i.service.split(".", 2);
      e.callService(r[0], r[1], i.service_data, i.target), ue("success");
      break;
    case "fire-dom-event":
      fe(n, "ll-custom", i);
  }
}, $t = function(n, e, t, i) {
  var r;
  i === "double_tap" && t.double_tap_action ? r = t.double_tap_action : i === "hold" && t.hold_action ? r = t.hold_action : i === "tap" && t.tap_action && (r = t.tap_action), ki(n, e, t, r);
};
const Ke = {
  // Multi-Stage Fade & Decay defaults
  fade_transition_enabled: !1,
  fade_trigger: "on_inactive",
  fade_target: "card",
  fade_smooth_retrigger: !0,
  show_decay_slider: !1,
  decay_slider_height: 10,
  decay_slider_position: "bottom",
  fade_stage_1_duration: 60,
  fade_stage_1_pickup: !0,
  fade_stage_1_color: "#ff9800",
  fade_stage_2_duration: 600,
  fade_stage_2_pickup: !0,
  fade_stage_2_color: "#cddc39",
  fade_stage_3_duration: 1800,
  fade_stage_3_pickup: !0,
  fade_stage_3_color: "#4caf50",
  entity: "",
  name: "",
  // Visual appearance defaults
  bg_color: "",
  bg_opacity: 10,
  border_radius: 12,
  card_border_width: 0,
  card_border_style: "none",
  card_border_color: "",
  card_opacity: 100,
  card_padding: 12,
  card_padding_vertical: 0,
  card_padding_horizontal: 15,
  card_margin: -1,
  card_width: "",
  card_max_width: "",
  card_height: "",
  card_min_height: 0,
  text_box_width: "",
  aspect_ratio: "",
  // Hover and interaction
  hover_effect: "glow",
  active_glow: !1,
  // Theme and presets
  theme_preset: "default",
  color_type: "card",
  active_color: "",
  inactive_color: "",
  // Slider styling & layer isolation
  use_light_color: !1,
  haptic_feedback: !0,
  haptic_type: "light",
  slider_stepped_movement: !1,
  tap_slider_to_toggle: !1,
  slider_style: "circle",
  full_slider_opacity: 100,
  show_slider_percent: !1,
  slider_color: "",
  slider_track_color: "",
  slider_height: 14,
  slider_border_radius: 6,
  slider_start_offset: 0,
  slider_end_offset: 0,
  slider_spacing: 8,
  show_slider: !0,
  hide_slider_when_off: !0,
  // Light color and temperature sliders
  show_color_temp: !1,
  hide_color_temp_when_off: !0,
  color_temp_type: "gradient",
  color_temp_height: 14,
  color_temp_border_radius: 6,
  color_temp_start_offset: 0,
  color_temp_end_offset: 0,
  show_color_picker: !1,
  hide_color_picker_when_off: !0,
  show_color_slider: !1,
  hide_color_slider_when_off: !0,
  color_slider_height: 14,
  color_slider_border_radius: 6,
  color_slider_start_offset: 0,
  color_slider_end_offset: 0,
  color_picker_type: "slider",
  // Controls position and secondary collapse trigger
  features_position: "bottom",
  collapse_controls_trigger: "none",
  text_color_mode: "selected",
  // Text and visibility options
  show_name: !0,
  show_state: !0,
  fill_container: !1,
  overflow_hidden: !0,
  visibility_state: "always",
  layout: "default",
  card_layout: "normal",
  primary_info: "name",
  secondary_info: "state",
  font_size_primary: 14,
  font_size_secondary: 12,
  font_weight_primary: "bold",
  text_color_primary: "",
  text_color_secondary: "",
  text_scrolling_primary: "none",
  text_scrolling_secondary: "none",
  text_scrolling_speed: 10,
  text_transform_primary: "none",
  text_transform_secondary: "capitalize",
  letter_spacing: -0.5,
  line_height: 1.1,
  // Spacing defaults
  content_spacing: 6,
  text_spacing: -1,
  features_margin: -3,
  sub_button_spacing: -4,
  sub_button_padding: 6,
  sub_button_alignment: "flex-end",
  text_offset_x: 0,
  text_offset_y: 0,
  features_offset_x: 0,
  features_offset_y: 0,
  // Box shadow and blur
  box_shadow: "none",
  backdrop_blur: 0,
  transition_duration: 300,
  // Actions
  tap_action: { action: "toggle" },
  hold_action: { action: "more-info" },
  double_tap_action: { action: "none" },
  // Sub-button 1 defaults
  sub_button_1_entity: "",
  sub_button_1_type: "button",
  sub_button_1_icon: "",
  sub_button_1_color: "",
  sub_button_1_show_background: !0,
  sub_button_1_show_state: !1,
  sub_button_1_name: "",
  sub_button_1_tap_action: { action: "toggle" },
  sub_button_1_hold_action: { action: "none" },
  sub_button_1_double_tap_action: { action: "none" },
  // Sub-button 2 defaults
  sub_button_2_entity: "",
  sub_button_2_type: "button",
  sub_button_2_icon: "",
  sub_button_2_color: "",
  sub_button_2_show_background: !0,
  sub_button_2_show_state: !1,
  sub_button_2_name: "",
  sub_button_2_tap_action: { action: "toggle" },
  sub_button_2_hold_action: { action: "none" },
  sub_button_2_double_tap_action: { action: "none" },
  sub_button_3_entity: "",
  sub_button_3_type: "button",
  sub_button_3_icon: "",
  sub_button_3_color: "",
  sub_button_3_show_background: !0,
  sub_button_3_show_state: !1,
  sub_button_3_name: "",
  sub_button_3_tap_action: { action: "toggle" },
  sub_button_3_hold_action: { action: "none" },
  sub_button_3_double_tap_action: { action: "none" },
  sub_button_4_entity: "",
  sub_button_4_type: "button",
  sub_button_4_icon: "",
  sub_button_4_color: "",
  sub_button_4_show_background: !0,
  sub_button_4_show_state: !1,
  sub_button_4_name: "",
  sub_button_4_tap_action: { action: "toggle" },
  sub_button_4_hold_action: { action: "none" },
  sub_button_4_double_tap_action: { action: "none" },
  // Miscellaneous
  custom_styles: ""
};
var Ci = Object.defineProperty, it = (n, e, t, i) => {
  for (var r = void 0, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (r = a(e, t, r) || r);
  return r && Ci(e, t, r), r;
};
const Ti = [
  { name: "entity", selector: { entity: {} } },
  { name: "name", selector: { text: {} } },
  { name: "visibility_state", selector: { select: { options: [
    { value: "always", label: "Always Visible (Default)" },
    { value: "on", label: "Show ONLY When ON (Hide When OFF)" },
    { value: "off", label: "Show ONLY When OFF (Hide When ON)" }
  ] } } },
  { name: "layout", selector: { select: { options: [
    { value: "default", label: "Default (Horizontal Row)" },
    { value: "horizontal", label: "Horizontal Compact" },
    { value: "vertical", label: "Vertical Centered" }
  ] } } },
  { name: "card_layout", selector: { select: { options: [
    { value: "normal", label: "Normal" },
    { value: "large", label: "Large (Bubble Style)" }
  ] } } },
  { name: "primary_info", selector: { select: { options: [
    { value: "name", label: "Name (Default)" },
    { value: "state", label: "State" },
    { value: "last-changed", label: "Last Changed (Relative: e.g. 5 min ago)" },
    { value: "last-updated", label: "Last Updated (Relative: e.g. 5 min ago)" },
    { value: "last-triggered", label: "Last Triggered (Automations/Scripts)" },
    { value: "brightness", label: "Brightness % (Lights)" },
    { value: "temperature", label: "Temperature (Climate/Sensors)" },
    { value: "humidity", label: "Humidity % (Sensors)" },
    { value: "battery", label: "Battery Level %" },
    { value: "none", label: "None" }
  ] } } },
  { name: "secondary_info", selector: { select: { options: [
    { value: "state", label: "State (Default)" },
    { value: "name", label: "Name" },
    { value: "last-changed", label: "Last Changed (Relative: e.g. 5 min ago)" },
    { value: "last-updated", label: "Last Updated (Relative: e.g. 5 min ago)" },
    { value: "last-triggered", label: "Last Triggered (Automations/Scripts)" },
    { value: "brightness", label: "Brightness % (Lights)" },
    { value: "temperature", label: "Temperature (Climate/Sensors)" },
    { value: "humidity", label: "Humidity % (Sensors)" },
    { value: "battery", label: "Battery Level %" },
    { value: "none", label: "None" }
  ] } } },
  { name: "aspect_ratio", selector: { text: { suffix: "e.g. 1/1, 2/1" } } },
  { name: "show_name", selector: { boolean: {} } },
  { name: "show_state", selector: { boolean: {} } },
  { name: "fill_container", selector: { boolean: {} } },
  { name: "overflow_hidden", selector: { boolean: {} } }
], Ai = [
  { name: "theme_preset", selector: { select: { options: [
    { value: "default", label: "Default (Card Colors)" },
    { value: "glassmorphism", label: "Frosted Glass (Glassmorphism)" },
    { value: "neumorphism", label: "Soft Neumorphism Extrusion" },
    { value: "cyberpunk", label: "Cyberpunk Neon Glow" },
    { value: "minimal_flat", label: "Clean Minimal Flat" },
    { value: "sunset_gradient", label: "Warm Sunset Gradient" },
    { value: "oled_black", label: "OLED Pitch Black" },
    { value: "aurora", label: "Nordic Aurora Ambient Flow" },
    { value: "material_you", label: "Material You Adaptive Pill" },
    { value: "retro_synth", label: "80s Synthwave / Neon Grid Glow" }
  ] } } },
  { name: "hover_effect", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "lift", label: "Elevate & Lift (TranslateY)" },
    { value: "glow", label: "Glow Border" },
    { value: "scale", label: "Smooth Micro-Scale (1.02x)" }
  ] } } },
  { name: "bg_color", selector: { color_rgb: {} } },
  { name: "bg_opacity", selector: { number: { min: 0, max: 100, mode: "slider" } } },
  { name: "active_color", selector: { color_rgb: {} } },
  { name: "inactive_color", selector: { color_rgb: {} } },
  { name: "text_color_primary", selector: { color_rgb: {} } },
  { name: "text_color_secondary", selector: { color_rgb: {} } },
  { name: "card_border_width", selector: { number: { min: 0, max: 20, mode: "slider" } } },
  { name: "card_border_color", selector: { color_rgb: {} } },
  { name: "card_border_style", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "solid", label: "Solid" },
    { value: "dashed", label: "Dashed" },
    { value: "dotted", label: "Dotted" }
  ] } } },
  { name: "border_radius", selector: { number: { min: 0, max: 100, mode: "slider" } } },
  { name: "box_shadow", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "soft", label: "Soft Drop" },
    { value: "deep", label: "Deep Shadow" },
    { value: "glow", label: "Neon Glow" }
  ] } } },
  { name: "backdrop_blur", selector: { number: { min: 0, max: 50, mode: "slider" } } },
  { name: "card_opacity", selector: { number: { min: 0, max: 100, mode: "slider" } } },
  { name: "transition_duration", selector: { number: { min: 0, max: 3e3, mode: "slider", step: 50 } } },
  { name: "active_glow", selector: { boolean: {} } },
  // Multi-Stage Fade Transitions & Decay Sliders
  { name: "fade_transition_enabled", selector: { boolean: {} } },
  { name: "fade_trigger", selector: { select: { options: [
    { value: "on_inactive", label: "On Inactive (Cooldown / Motion Cleared)" },
    { value: "on_active", label: "On Active (Warmup / Motion Active)" },
    { value: "both", label: "Both Active and Inactive" }
  ] } } },
  { name: "fade_target", selector: { select: { options: [
    { value: "card", label: "Card Background" },
    { value: "slider", label: "Decay Slider Only" },
    { value: "all", label: "All Elements (Card & Slider)" }
  ] } } },
  { name: "fade_smooth_retrigger", selector: { boolean: {} } },
  { name: "show_decay_slider", selector: { boolean: {} } },
  { name: "decay_slider_height", selector: { number: { min: 4, max: 48, mode: "slider", step: 1 } } },
  { name: "decay_slider_position", selector: { select: { options: [
    { value: "bottom", label: "Bottom (Below Text/Features)" },
    { value: "top", label: "Top (Above Text)" },
    { value: "inline", label: "Inline (Inside Header)" }
  ] } } },
  { name: "fade_stage_1_duration", selector: { number: { min: 0, max: 1800, mode: "slider", unit_of_measurement: "sec", step: 5 } } },
  { name: "fade_stage_1_pickup", selector: { boolean: {} } },
  { name: "fade_stage_1_color", selector: { color_rgb: {} } },
  { name: "fade_stage_2_duration", selector: { number: { min: 0, max: 3600, mode: "slider", unit_of_measurement: "sec", step: 10 } } },
  { name: "fade_stage_2_pickup", selector: { boolean: {} } },
  { name: "fade_stage_2_color", selector: { color_rgb: {} } },
  { name: "fade_stage_3_duration", selector: { number: { min: 0, max: 7200, mode: "slider", unit_of_measurement: "sec", step: 30 } } },
  { name: "fade_stage_3_pickup", selector: { boolean: {} } },
  { name: "fade_stage_3_color", selector: { color_rgb: {} } }
], Mi = [
  { name: "use_light_color", label: "Dynamic Light Color Accent (Mushroom/Bubble Style)", selector: { boolean: {} } },
  { name: "haptic_feedback", label: "Haptic Feedback Vibrations (Mobile / Companion App)", selector: { boolean: {} } },
  { name: "haptic_type", label: "Haptic Vibration Intensity / Pattern", selector: { select: { options: [
    { value: "light", label: "Light Tap (Default)" },
    { value: "selection", label: "Selection Tick" },
    { value: "medium", label: "Medium Pulse" },
    { value: "heavy", label: "Heavy Thud" },
    { value: "success", label: "Success Pattern" },
    { value: "warning", label: "Warning Pattern" },
    { value: "error", label: "Error Pattern" }
  ] } } },
  { name: "slider_stepped_movement", label: "Stepped Slider Movement (Discrete Values vs Smooth)", selector: { boolean: {} } },
  { name: "tap_slider_to_toggle", label: "Tap Slider Body to Toggle Entity (Slider-Button Card Style)", selector: { boolean: {} } },
  { name: "show_slider", selector: { boolean: {} } },
  { name: "hide_slider_when_off", selector: { boolean: {} } },
  { name: "slider_style", selector: { select: { options: [
    { value: "circle", label: "Circle Knob (Line with Round Thumb - Default)" },
    { value: "google", label: "Google Home / Material 3 Pill Slider" },
    { value: "filled", label: "Hue-Style Filled Capsule (Fluid Pill / No Knob)" },
    { value: "thin", label: "Thin Minimalist Line (Compact Knob)" },
    { value: "glow", label: "Neon Glow Laser Line" },
    { value: "segmented", label: "Segmented Stepped Bar" },
    { value: "full", label: "Full Card Slider (slider-button-card style)" }
  ] } } },
  { name: "full_slider_opacity", selector: { number: { min: 5, max: 100, mode: "slider" } } },
  { name: "show_slider_percent", selector: { boolean: {} } },
  { name: "slider_color", selector: { color_rgb: {} } },
  { name: "slider_track_color", selector: { color_rgb: {} } },
  { name: "slider_height", selector: { number: { min: 2, max: 80, mode: "slider" } } },
  { name: "slider_border_radius", selector: { number: { min: 0, max: 40, mode: "slider" } } },
  { name: "slider_start_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "slider_end_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "show_color_temp", selector: { boolean: {} } },
  { name: "hide_color_temp_when_off", selector: { boolean: {} } },
  { name: "color_temp_type", selector: { select: { options: [
    { value: "gradient", label: "Kelvin Gradient Slider (Default)" },
    { value: "google", label: "Google Home Pill Temperature Slider" },
    { value: "presets", label: "Preset Temperature Quick Buttons (2200K - 6500K)" },
    { value: "thin", label: "Thin Minimalist Line Slider" }
  ] } } },
  { name: "color_temp_height", selector: { number: { min: 2, max: 80, mode: "slider" } } },
  { name: "color_temp_border_radius", selector: { number: { min: 0, max: 40, mode: "slider" } } },
  { name: "color_temp_start_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "color_temp_end_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "show_color_slider", selector: { boolean: {} } },
  { name: "hide_color_slider_when_off", selector: { boolean: {} } },
  { name: "color_slider_height", selector: { number: { min: 2, max: 80, mode: "slider" } } },
  { name: "color_slider_border_radius", selector: { number: { min: 0, max: 40, mode: "slider" } } },
  { name: "color_slider_start_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "color_slider_end_offset", selector: { number: { min: -100, max: 100, mode: "slider" } } },
  { name: "color_picker_type", selector: { select: { options: [
    { value: "slider", label: "Hue Spectrum 360° Rainbow Slider (Default)" },
    { value: "google", label: "Google Home Material 3 Rainbow Pill Slider" },
    { value: "wheel", label: "Interactive Color Wheel" },
    { value: "swatches", label: "Quick Color Swatches (Palette Buttons)" }
  ] } } },
  { name: "features_position", selector: { select: { options: [
    { value: "bottom", label: "Bottom Stack (Under Info)" },
    { value: "inline", label: "Inline (Right of Info - Bubble Card Style)" }
  ] } } },
  { name: "collapse_controls_trigger", selector: { select: { options: [
    { value: "none", label: "Always Expanded (Disabled)" },
    { value: "hold", label: "Long Press / Hold Card (Recommended)" },
    { value: "double_tap", label: "Double Tap Card" }
  ] } } }
], Pi = [
  { name: "card_padding", label: "Card Base Padding (All Sides px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_vertical", label: "Card Vertical Padding (Top/Bottom px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_horizontal", label: "Card Horizontal Padding (Left/Right px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_top", label: "Card Padding Top (px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_bottom", label: "Card Padding Bottom (px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_left", label: "Card Padding Left (px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_padding_right", label: "Card Padding Right (px)", selector: { number: { min: 0, max: 64, mode: "slider" } } },
  { name: "card_margin", label: "Card Base Margin (All Sides px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_vertical", label: "Card Vertical Margin (Top/Bottom px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_horizontal", label: "Card Horizontal Margin (Left/Right px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_top", label: "Card Margin Top (px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_bottom", label: "Card Margin Bottom (px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_left", label: "Card Margin Left (px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "card_margin_right", label: "Card Margin Right (px)", selector: { number: { min: -30, max: 64, mode: "slider" } } },
  { name: "content_spacing", label: "Content Gap (Text & Features px)", selector: { number: { min: -20, max: 80, mode: "slider" } } },
  { name: "text_spacing", label: "Text Gap (Primary & Secondary px)", selector: { number: { min: -20, max: 48, mode: "slider" } } },
  { name: "features_margin", label: "Controls Top Margin (px)", selector: { number: { min: -30, max: 80, mode: "slider" } } },
  { name: "slider_spacing", label: "Gap Between Multiple Sliders (px)", selector: { number: { min: -10, max: 48, mode: "slider" } } },
  // Component Inner Paddings
  { name: "text_padding", label: "Text Block Base Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "text_padding_vertical", label: "Text Vertical Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "text_padding_horizontal", label: "Text Horizontal Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "features_padding", label: "Controls Container Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "features_padding_vertical", label: "Controls Vertical Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "features_padding_horizontal", label: "Controls Horizontal Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  // Sizing & Positioning
  { name: "card_width", selector: { text: { suffix: "e.g. 100%, 300px, auto" } } },
  { name: "card_max_width", selector: { text: { suffix: "e.g. 400px, 100%" } } },
  { name: "card_height", selector: { text: { suffix: "e.g. auto, 120px, 100%" } } },
  { name: "card_min_height", selector: { number: { min: 0, max: 500, mode: "slider", step: 10 } } },
  { name: "text_box_width", selector: { text: { suffix: "e.g. 100%, 180px, auto" } } },
  { name: "text_alignment", selector: { select: { options: [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
    { value: "justify", label: "Justify" }
  ] } } },
  { name: "content_alignment", selector: { select: { options: [
    { value: "flex-start", label: "Start (Top/Left)" },
    { value: "center", label: "Center" },
    { value: "flex-end", label: "End (Bottom/Right)" },
    { value: "space-between", label: "Space Between" },
    { value: "space-around", label: "Space Around" }
  ] } } },
  { name: "text_offset_x", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "features_offset_x", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "features_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } }
], Ei = [
  { name: "text_color_mode", selector: { select: { options: [
    { value: "selected", label: "Fixed Selected Color (Default)" },
    { value: "inverse", label: "Inverse Dynamic Text (Blend Mode Difference)" },
    { value: "active_accent", label: "Adaptive Active Accent (Dynamic Color when On)" }
  ] } } },
  { name: "font_size_primary", selector: { number: { min: 10, max: 36, mode: "slider" } } },
  { name: "font_size_secondary", selector: { number: { min: 10, max: 24, mode: "slider" } } },
  { name: "font_weight_primary", selector: { select: { options: [
    { value: "normal", label: "Normal (400)" },
    { value: "500", label: "Medium (500)" },
    { value: "bold", label: "Bold (700)" },
    { value: "800", label: "Heavy (800)" }
  ] } } },
  { name: "text_color_primary", selector: { color_rgb: {} } },
  { name: "text_color_secondary", selector: { color_rgb: {} } },
  { name: "text_scrolling_primary", selector: { select: { options: [
    { value: "none", label: "None (Standard Truncate with Ellipsis)" },
    { value: "marquee", label: "Marquee (Smooth Bounce / Ping-Pong)" },
    { value: "continuous", label: "Continuous Ticker Loop" },
    { value: "hover", label: "Scroll on Hover Only" }
  ] } } },
  { name: "text_scrolling_secondary", selector: { select: { options: [
    { value: "none", label: "None (Standard Truncate with Ellipsis)" },
    { value: "marquee", label: "Marquee (Smooth Bounce / Ping-Pong)" },
    { value: "continuous", label: "Continuous Ticker Loop" },
    { value: "hover", label: "Scroll on Hover Only" }
  ] } } },
  { name: "text_scrolling_speed", selector: { number: { min: 4, max: 30, mode: "slider", step: 1 } } },
  { name: "text_transform_primary", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "uppercase", label: "UPPERCASE" },
    { value: "capitalize", label: "Capitalize" },
    { value: "lowercase", label: "lowercase" }
  ] } } },
  { name: "text_transform_secondary", selector: { select: { options: [
    { value: "none", label: "None" },
    { value: "uppercase", label: "UPPERCASE" },
    { value: "capitalize", label: "Capitalize (Default)" },
    { value: "lowercase", label: "lowercase" }
  ] } } },
  { name: "letter_spacing", selector: { number: { min: -4, max: 16, mode: "slider", step: 0.5 } } },
  { name: "line_height", selector: { number: { min: 0.5, max: 3.5, mode: "slider", step: 0.05 } } }
], wt = [
  { name: "sub_button_alignment", selector: { select: { options: [
    { value: "flex-end", label: "Right Aligned (Default)" },
    { value: "flex-start", label: "Left Aligned" },
    { value: "center", label: "Centered" },
    { value: "space-between", label: "Space Between (Spread Evenly)" },
    { value: "space-around", label: "Space Around" }
  ] } } },
  { name: "sub_button_spacing", label: "Gap Between Sub-Buttons (px)", selector: { number: { min: -10, max: 64, mode: "slider" } } },
  { name: "sub_button_padding", label: "Sub-Button Internal Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } },
  { name: "sub_button_container_padding", label: "Container Top Padding (px)", selector: { number: { min: 0, max: 48, mode: "slider" } } }
];
function Be(n) {
  return [
    { name: `sub_button_${n}_entity`, selector: { entity: {} } },
    { name: `sub_button_${n}_type`, selector: { select: { options: [
      { value: "button", label: "Standard Action Button (Default)" },
      { value: "play_pause", label: "Media: Play/Pause Dynamic Toggle" },
      { value: "next", label: "Media: Next Track" },
      { value: "previous", label: "Media: Previous Track" },
      { value: "open_close", label: "Cover: Open/Close Dynamic Toggle" },
      { value: "stop", label: "Cover: Stop Position" },
      { value: "lock_unlock", label: "Lock: Lock/Unlock Dynamic Toggle" },
      { value: "garage_toggle", label: "Cover: Garage Door Smart Toggle" },
      { value: "fan_speed", label: "Fan: Cycle Speed Preset" },
      { value: "clean", label: "Vacuum: Start Cleaning" },
      { value: "dock", label: "Vacuum: Return to Base / Dock" },
      { value: "locate", label: "Vacuum: Play Sound / Locate" },
      { value: "hvac_mode", label: "Climate: Cycle Operating Mode" },
      { value: "light_effect", label: "Light: Cycle Color Animation Effect" },
      { value: "dim_up", label: "Light: Step Brightness Up (+10%)" },
      { value: "dim_down", label: "Light: Step Brightness Down (-10%)" },
      { value: "temp_warm", label: "Light: Shift Temperature Warmer (+200K)" },
      { value: "temp_cool", label: "Light: Shift Temperature Cooler (-200K)" },
      { value: "slider", label: "Inline Control: Mini Horizontal Slider" },
      { value: "google_slider", label: "Inline Control: Google Home Pill Slider" },
      { value: "color_temp", label: "Inline Control: Mini Color Temp Slider" },
      { value: "color_picker", label: "Inline Control: Mini RGB Hue Slider" },
      { value: "brightness", label: "Inline Control: Direct Brightness Slider" }
    ] } } },
    { name: `sub_button_${n}_icon`, selector: { icon: {} } },
    { name: `sub_button_${n}_name`, selector: { text: {} } },
    { name: `sub_button_${n}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${n}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${n}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${n}_tap_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${n}_hold_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${n}_double_tap_action`, selector: { "ui-action": {} } }
  ];
}
const Li = Be(1), Hi = Be(2), Ni = Be(3), Ri = Be(4), Di = [
  { name: "tap_action", selector: { "ui-action": {} } },
  { name: "hold_action", selector: { "ui-action": {} } },
  { name: "double_tap_action", selector: { "ui-action": {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
];
function H(n) {
  if (!n) return;
  if (Array.isArray(n)) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, r))).toString(16).padStart(2, "0");
    return `#${i(n[0] ?? 0)}${i(n[1] ?? 0)}${i(n[2] ?? 0)}`;
  }
  if (typeof n != "string") return;
  if (n.startsWith("#")) return n;
  const e = n.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (e) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, parseInt(r, 10)))).toString(16).padStart(2, "0");
    return `#${i(e[1])}${i(e[2])}${i(e[3])}`;
  }
  const t = n.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/);
  if (t) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, parseInt(r, 10)))).toString(16).padStart(2, "0");
    return `#${i(t[1])}${i(t[2])}${i(t[3])}`;
  }
  return n;
}
function P(n) {
  const e = H(n);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(i) || isNaN(r)))
    return [t, i, r];
}
const Bi = {
  entity: "Entity",
  name: "Name (Optional Override)",
  theme_preset: "Visual Design Theme Preset",
  hover_effect: "Card Hover / Interaction Effect",
  layout: "Content Flow Layout",
  card_layout: "Card Sizing",
  primary_info: "Primary Text Display",
  secondary_info: "Secondary Text Display",
  features_position: "Slider / Controls Position",
  aspect_ratio: "Card Aspect Ratio",
  show_name: "Show Primary Name",
  show_state: "Show Secondary State",
  visibility_state: "Conditional Visibility / Display Filter",
  fill_container: "Fill Container Height (100%)",
  overflow_hidden: "Clip Overflow Content",
  show_slider: "Interactive Slider",
  hide_slider_when_off: "Hide Main Slider When Off",
  slider_style: "Slider Visual Style",
  full_slider_opacity: "Full Card Slider Background Opacity %",
  show_slider_percent: "Show Live Percentage Badge on Slider",
  slider_height: "Slider Track Height (px)",
  slider_border_radius: "Slider Track Roundness (px)",
  slider_start_offset: "Main Slider Start Position (Left Offset px)",
  slider_end_offset: "Main Slider End Position (Right Offset px)",
  show_color_temp: "Expanding Color Temp Slider (Lights)",
  hide_color_temp_when_off: "Hide Color Temp Slider When Off",
  color_temp_height: "Color Temp Slider Height (px)",
  color_temp_border_radius: "Color Temp Slider Corner Radius (px)",
  color_temp_start_offset: "Color Temp Start Position (Left Offset px)",
  color_temp_end_offset: "Color Temp End Position (Right Offset px)",
  show_color_slider: "Expanding Color Hue Slider (Lights)",
  hide_color_slider_when_off: "Hide Color Hue Slider When Off",
  color_slider_height: "Color Hue Slider Height (px)",
  color_slider_border_radius: "Color Hue Slider Corner Radius (px)",
  color_slider_start_offset: "Color Hue Start Position (Left Offset px)",
  color_slider_end_offset: "Color Hue End Position (Right Offset px)",
  font_size_primary: "Primary Font Size (px)",
  font_size_secondary: "Secondary Font Size (px)",
  font_weight_primary: "Primary Text Weight",
  text_color_primary: "Primary Text Color",
  text_color_secondary: "Secondary Text Color",
  text_scrolling_primary: "Primary Text Scrolling Effect",
  text_scrolling_secondary: "Secondary Text Scrolling Effect",
  text_scrolling_speed: "Text Scrolling Speed (seconds)",
  text_transform_primary: "Primary Text Case",
  text_transform_secondary: "Secondary Text Case",
  letter_spacing: "Letter Spacing (px)",
  line_height: "Line Height",
  card_padding: "Card Inner Base Padding (px)",
  card_padding_vertical: "Vertical Padding (Top/Bottom px)",
  card_padding_horizontal: "Horizontal Padding (Left/Right px)",
  card_padding_top: "Top Padding (px)",
  card_padding_bottom: "Bottom Padding (px)",
  card_padding_left: "Left Padding (px)",
  card_padding_right: "Right Padding (px)",
  card_margin: "Card Outer Margin (px)",
  card_margin_vertical: "Card Vertical Margin / Separator (px)",
  card_margin_horizontal: "Card Horizontal Margin / Separator (px)",
  card_margin_top: "Card Margin Top (px)",
  card_margin_bottom: "Card Margin Bottom (px)",
  card_margin_left: "Card Margin Left (px)",
  card_margin_right: "Card Margin Right (px)",
  text_padding: "Text Base Padding (px)",
  text_padding_vertical: "Text Vertical Padding (px)",
  text_padding_horizontal: "Text Horizontal Padding (px)",
  features_padding: "Controls Container Padding (px)",
  features_padding_vertical: "Controls Vertical Padding (px)",
  features_padding_horizontal: "Controls Horizontal Padding (px)",
  sub_button_container_padding: "Sub-Buttons Container Padding (px)",
  content_spacing: "Content Gap (Text, Features px)",
  text_spacing: "Text Gap (Primary & Secondary px)",
  features_margin: "Features Margin Top (px)",
  slider_spacing: "Gap Between Multiple Sliders (px)",
  sub_button_spacing: "Sub-Buttons Gap (px)",
  sub_button_padding: "Sub-Buttons Padding (px)",
  sub_button_alignment: "Sub-Buttons Alignment & Distribution",
  card_width: "Card Width (e.g. 100%, 300px)",
  card_max_width: "Card Max Width (e.g. 400px, 100%)",
  card_height: "Card Fixed Height (e.g. auto, 120px)",
  card_min_height: "Card Minimum Height (px)",
  text_box_width: "Text Box / Info Area Width (e.g. 100%, 180px, auto)",
  text_alignment: "Text Alignment",
  content_alignment: "Content Box Alignment",
  text_offset_x: "Text Offset X (px)",
  text_offset_y: "Text Offset Y (px)",
  features_offset_x: "Controls Offset X (px)",
  features_offset_y: "Controls Offset Y (px)",
  fade_transition_enabled: "Enable Multi-Stage Fade & Decay",
  fade_trigger: "Fade Trigger Mode",
  fade_target: "Fade Color Application Target",
  fade_smooth_retrigger: "Smooth Re-trigger (Pick up current live color if state changes mid-fade)",
  show_decay_slider: "Show Live Cooldown / Decay Progress Bar",
  decay_slider_height: "Decay Slider Height (px)",
  decay_slider_position: "Decay Slider Position",
  fade_stage_1_duration: "Stage 1 Duration (e.g. 60s for 1 min quick fade)",
  fade_stage_1_pickup: "Stage 1: Pick up from active/live state color",
  fade_stage_1_color: "Stage 1 Target Color (e.g. Amber / Orange)",
  fade_stage_2_duration: "Stage 2 Duration (e.g. 600s for 10 min mid fade)",
  fade_stage_2_pickup: "Stage 2: Pick up where Stage 1 left off",
  fade_stage_2_color: "Stage 2 Target Color (e.g. Yellow / Lime)",
  fade_stage_3_duration: "Stage 3 Duration (e.g. 1800s for 30 min final fade)",
  fade_stage_3_pickup: "Stage 3: Pick up where Stage 2 left off",
  fade_stage_3_color: "Stage 3 Final Color (e.g. Resting Green)",
  bg_color: "Card Background Color",
  bg_opacity: "Background Opacity %",
  border_radius: "Border Radius (px)",
  card_border_width: "Border Width (px)",
  card_border_color: "Border Color",
  card_border_style: "Border Style",
  active_color: "Active State Color",
  inactive_color: "Inactive State Color",
  box_shadow: "Box Shadow Preset",
  backdrop_blur: "Backdrop Blur (Frosted Glass px)",
  card_opacity: "Card Opacity %",
  transition_duration: "Transition Speed (ms)",
  active_glow: "Glow Card Outer Border When Active",
  tap_action: "Card Tap Action",
  hold_action: "Card Hold Action",
  double_tap_action: "Card Double Tap Action",
  sub_button_1_entity: "Entity",
  sub_button_1_type: "Control Type",
  sub_button_1_icon: "Icon Override",
  sub_button_1_name: "Label Text",
  sub_button_1_show_state: "Show Live State Text / Chip",
  sub_button_1_color: "Color",
  sub_button_1_show_background: "Show Background",
  sub_button_1_tap_action: "Tap Action",
  sub_button_1_hold_action: "Hold Action",
  sub_button_1_double_tap_action: "Double Tap Action",
  sub_button_2_entity: "Entity",
  sub_button_2_type: "Control Type",
  sub_button_2_icon: "Icon Override",
  sub_button_2_name: "Label Text",
  sub_button_2_show_state: "Show Live State Text / Chip",
  sub_button_2_color: "Color",
  sub_button_2_show_background: "Show Background",
  sub_button_2_tap_action: "Tap Action",
  sub_button_2_hold_action: "Hold Action",
  sub_button_2_double_tap_action: "Double Tap Action",
  sub_button_3_entity: "Entity",
  sub_button_3_type: "Control Type",
  sub_button_3_icon: "Icon Override",
  sub_button_3_name: "Label Text",
  sub_button_3_show_state: "Show Live State Text / Chip",
  sub_button_3_color: "Color",
  sub_button_3_show_background: "Show Background",
  sub_button_3_tap_action: "Tap Action",
  sub_button_3_hold_action: "Hold Action",
  sub_button_3_double_tap_action: "Double Tap Action",
  sub_button_4_entity: "Entity",
  sub_button_4_type: "Control Type",
  sub_button_4_icon: "Icon Override",
  sub_button_4_name: "Label Text",
  sub_button_4_show_state: "Show Live State Text / Chip",
  sub_button_4_color: "Color",
  sub_button_4_show_background: "Show Background",
  sub_button_4_tap_action: "Tap Action",
  sub_button_4_hold_action: "Hold Action",
  sub_button_4_double_tap_action: "Double Tap Action",
  custom_styles: "Scoped Custom CSS Injection"
};
class be extends te {
  constructor() {
    super(...arguments), this._openPanels = {
      core: !0,
      appearance: !1,
      controls: !0,
      spacing: !1,
      typography: !1,
      sub_buttons: !1,
      actions: !1,
      sub1: !1,
      sub2: !1,
      sub3: !1,
      sub4: !1
    };
  }
  setConfig(e) {
    const t = { ...e };
    if (t.bg_color) {
      const i = typeof t.bg_color == "string" ? t.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      i && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(i[1]) * 100)), t.bg_color = H(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = H(t.card_border_color)), t.active_color && (t.active_color = H(t.active_color)), t.inactive_color && (t.inactive_color = H(t.inactive_color)), t.slider_color && (t.slider_color = H(t.slider_color)), t.slider_track_color && (t.slider_track_color = H(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = H(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = H(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = H(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = H(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = H(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = H(t.sub_button_4_color)), this._config = {
      ...Ke,
      ...t
    };
  }
  _computeLabel(e) {
    return Bi[e.name] || e.name;
  }
  _transformConfigForForm() {
    const e = { ...this._config };
    return e.bg_color = P(e.bg_color), e.card_border_color = P(e.card_border_color), e.active_color = P(e.active_color), e.inactive_color = P(e.inactive_color), e.slider_color = P(e.slider_color), e.slider_track_color = P(e.slider_track_color), e.text_color_primary = P(e.text_color_primary), e.text_color_secondary = P(e.text_color_secondary), e.sub_button_1_color = P(e.sub_button_1_color), e.sub_button_2_color = P(e.sub_button_2_color), e.sub_button_3_color = P(e.sub_button_3_color), e.sub_button_4_color = P(e.sub_button_4_color), e.fade_stage_1_color = P(e.fade_stage_1_color), e.fade_stage_2_color = P(e.fade_stage_2_color), e.fade_stage_3_color = P(e.fade_stage_3_color), e;
  }
  _valueChanged(e, t) {
    const i = e.detail.value, r = { ...this._config };
    if (t) {
      for (const o of t)
        if (o.name in i) {
          const a = i[o.name];
          Array.isArray(a) && a.length === 3 && a.every((s) => typeof s == "number") ? r[o.name] = `rgb(${a[0]}, ${a[1]}, ${a[2]})` : r[o.name] = a;
        }
    } else
      Object.assign(r, i);
    this._config = r, fe(this, "config-changed", { config: this._config });
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    }, this.requestUpdate();
  }
  _renderSection(e, t, i, r, o) {
    const a = !!this._openPanels[e];
    return w`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${i}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? w`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${o}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, r)}
            ></ha-form>
          </div>
        ` : v}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, i, r) {
    const o = `sub${e}`, a = !!this._openPanels[o];
    return w`
      <div class="sub-nested-panel ${a ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(o)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? w`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, i)}
            ></ha-form>
          </div>
        ` : v}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return w``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", i = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", o = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return w`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", Ti, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", Ai, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Mi, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", Pi, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Ei, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${a ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${a ? w`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${wt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(s) => this._valueChanged(s, wt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, Li, e)}
                ${this._renderSubButtonPanel(2, i, Hi, e)}
                ${this._renderSubButtonPanel(3, r, Ni, e)}
                ${this._renderSubButtonPanel(4, o, Ri, e)}
              </div>
            </div>
          ` : v}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", Di, e)}
      </div>
    `;
  }
  static get styles() {
    return Tt`
      .editor-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
      }
      .custom-panel {
        border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        border-radius: 10px;
        background: var(--card-background-color, rgba(125, 125, 125, 0.05));
        overflow: hidden;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .custom-panel.open {
        border-color: var(--primary-color, #03a9f4);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        cursor: pointer;
        user-select: none;
        background: transparent;
        transition: background-color 0.15s ease;
      }
      .panel-header:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .header-icon {
        font-size: 18px;
        line-height: 1;
      }
      .header-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color, #ffffff);
      }
      .chevron-icon {
        color: var(--secondary-text-color, #9e9e9e);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease;
      }
      .chevron-icon.rotated {
        transform: rotate(180deg);
        color: var(--primary-color, #03a9f4);
      }
      .panel-body {
        padding: 14px 16px 18px;
        border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
        animation: fadeIn 0.2s ease;
      }
      .section-subtitle {
        font-size: 12px;
        font-weight: 600;
        color: var(--secondary-text-color, #9e9e9e);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
      }
      .sub-buttons-nested-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 16px;
      }
      .sub-nested-panel {
        border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
        border-radius: 8px;
        background: rgba(125, 125, 125, 0.04);
        overflow: hidden;
      }
      .sub-nested-panel.open {
        border-color: rgba(3, 169, 244, 0.4);
      }
      .sub-panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        cursor: pointer;
        user-select: none;
      }
      .sub-panel-header:hover {
        background: rgba(255, 255, 255, 0.03);
      }
      .sub-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--secondary-text-color, #757575);
      }
      .sub-dot.active {
        background: #4caf50;
        box-shadow: 0 0 6px #4caf50;
      }
      .sub-title {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color, #ffffff);
      }
      .sub-panel-body {
        padding: 12px 14px 14px;
        border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.06));
        background: rgba(0, 0, 0, 0.1);
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }
}
it([
  Re({ attribute: !1 })
], be.prototype, "hass");
it([
  De()
], be.prototype, "_config");
it([
  De()
], be.prototype, "_openPanels");
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", be);
customElements.get("antigravity-card-editor") || customElements.define("antigravity-card-editor", be);
var Oi = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, oe = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? zi(e, t) : e, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (r = (i ? a(e, t, r) : a(r)) || r);
  return i && r && Oi(e, t, r), r;
};
const Ii = "112";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${Ii} `,
  "color: white; background: #6200ea; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #6200ea; background: #ede7f6; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "antigravity-no-icon-card",
  name: "Antigravity No Icon Card",
  preview: !0,
  description: "An ultra-streamlined, high-performance custom card merging Bubble Card styling with Mushroom Card controls, multi-stage transitions, and zero icon overhead."
});
window.customCards.push({
  type: "antigravity-card",
  name: "Antigravity Card",
  preview: !0,
  description: "Default Antigravity Card (No Icon)"
});
const Ui = /* @__PURE__ */ new Set([
  "on",
  "home",
  "playing",
  "paused",
  "buffering",
  "open",
  "opening",
  "closing",
  "unlocked",
  "locking",
  "unlocking",
  "heat",
  "cool",
  "heat_cool",
  "auto",
  "fan_only",
  "dry",
  "armed_home",
  "armed_away",
  "armed_night",
  "armed_vacation",
  "armed_custom_bypass",
  "triggered",
  "pending",
  "arming",
  "cleaning",
  "returning",
  "above_horizon",
  "active",
  "electric",
  "gas",
  "heat_pump"
]), Fi = /* @__PURE__ */ new Set([
  "primary",
  "accent",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey",
  "black",
  "white",
  "disabled"
]), Ht = /^\d+\s*,\s*\d+\s*,\s*\d+$/, Gi = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;
function B(n) {
  const e = Math.max(1e3, Math.min(4e4, n)) / 100;
  let t, i, r;
  if (e <= 66)
    t = 255;
  else {
    const o = e - 60;
    t = 329.698727446 * Math.pow(o, -0.1332047592), t = Math.max(0, Math.min(255, t));
  }
  if (e <= 66)
    i = e, i = 99.4708025861 * Math.log(i) - 161.1195681661, i = Math.max(0, Math.min(255, i));
  else {
    const o = e - 60;
    i = 288.1221695283 * Math.pow(o, -0.0755148492), i = Math.max(0, Math.min(255, i));
  }
  if (e >= 66)
    r = 255;
  else if (e <= 19)
    r = 0;
  else {
    const o = e - 10;
    r = 138.5177312231 * Math.log(o) - 305.0447927307, r = Math.max(0, Math.min(255, r));
  }
  return [Math.round(t), Math.round(i), Math.round(r)];
}
function Ae(n) {
  return !Array.isArray(n) || n.length < 3 ? "#ffffff" : "#" + n.slice(0, 3).map((e) => Math.round(Number(e) || 0).toString(16).padStart(2, "0")).join("");
}
function Vi(n, e, t) {
  n /= 255, e /= 255, t /= 255;
  const i = Math.max(n, e, t), r = Math.min(n, e, t);
  let o = 0;
  const a = i - r;
  if (a === 0) return 0;
  switch (i) {
    case n:
      o = (e - t) / a + (e < t ? 6 : 0);
      break;
    case e:
      o = (t - n) / a + 2;
      break;
    case t:
      o = (n - e) / a + 4;
      break;
  }
  return Math.round(o * 60);
}
function Ye(n, e) {
  n = n % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const t = 1, i = Math.floor(n * 6), r = n * 6 - i, o = t * (1 - e), a = t * (1 - r * e), s = t * (1 - (1 - r) * e);
  let l = 0, d = 0, h = 0;
  switch (i % 6) {
    case 0:
      l = t, d = s, h = o;
      break;
    case 1:
      l = a, d = t, h = o;
      break;
    case 2:
      l = o, d = t, h = s;
      break;
    case 3:
      l = o, d = a, h = t;
      break;
    case 4:
      l = s, d = o, h = t;
      break;
    case 5:
      l = t, d = o, h = a;
      break;
  }
  return [Math.round(l * 255), Math.round(d * 255), Math.round(h * 255)];
}
const Xe = [
  { hex: "#f44336", label: "Red", rgb: [244, 67, 54] },
  { hex: "#ff9800", label: "Orange", rgb: [255, 152, 0] },
  { hex: "#ffeb3b", label: "Yellow", rgb: [255, 235, 59] },
  { hex: "#4caf50", label: "Green", rgb: [76, 175, 80] },
  { hex: "#00bcd4", label: "Cyan", rgb: [0, 188, 212] },
  { hex: "#2196f3", label: "Blue", rgb: [33, 150, 243] },
  { hex: "#9c27b0", label: "Purple", rgb: [156, 39, 176] },
  { hex: "#e91e63", label: "Pink", rgb: [233, 30, 99] },
  { hex: "#ffffff", label: "White", rgb: [255, 255, 255] },
  { hex: "#ffe0b2", label: "Warm", rgb: [255, 224, 178] }
], Wi = [
  { k: 2200, label: "2200K", rgb: B(2200) },
  { k: 2700, label: "2700K", rgb: B(2700) },
  { k: 3e3, label: "3000K", rgb: B(3e3) },
  { k: 4e3, label: "4000K", rgb: B(4e3) },
  { k: 5e3, label: "5000K", rgb: B(5e3) },
  { k: 6500, label: "6500K", rgb: B(6500) }
], de = /* @__PURE__ */ new Map(), Yi = 200;
function J(n) {
  if (!n) return null;
  const e = n.trim().toLowerCase();
  if (!e) return null;
  const t = de.get(e);
  if (t !== void 0) return t;
  const i = qi(e);
  if (de.size >= Yi) {
    const r = de.keys().next().value;
    r && de.delete(r);
  }
  return de.set(e, i), i;
}
function qi(n) {
  if (n.startsWith("#")) {
    const e = n.slice(1);
    if (e.length === 3)
      return [
        parseInt(e[0] + e[0], 16),
        parseInt(e[1] + e[1], 16),
        parseInt(e[2] + e[2], 16)
      ];
    if (e.length >= 6)
      return [
        parseInt(e.slice(0, 2), 16),
        parseInt(e.slice(2, 4), 16),
        parseInt(e.slice(4, 6), 16)
      ];
  }
  if (n.startsWith("rgb")) {
    const e = n.indexOf("("), t = n.lastIndexOf(")");
    if (e !== -1 && t !== -1) {
      const i = n.slice(e + 1, t).split(",").map((r) => parseFloat(r.trim()));
      if (i.length >= 3 && !i.slice(0, 3).some(isNaN))
        return [
          Math.max(0, Math.min(255, Math.round(i[0]))),
          Math.max(0, Math.min(255, Math.round(i[1]))),
          Math.max(0, Math.min(255, Math.round(i[2])))
        ];
    }
  }
  if (Ht.test(n)) {
    const e = n.split(",").map((t) => parseInt(t.trim(), 10));
    if (e.length >= 3 && !e.some(isNaN))
      return [e[0], e[1], e[2]];
  }
  for (let e = 0; e < Xe.length; e++) {
    const t = Xe[e];
    if (n === t.label.toLowerCase() || n === t.hex)
      return [t.rgb[0], t.rgb[1], t.rgb[2]];
  }
  return null;
}
function qe(n, e, t) {
  const i = Math.max(0, Math.min(1, t));
  return [
    Math.round(n[0] + (e[0] - n[0]) * i),
    Math.round(n[1] + (e[1] - n[1]) * i),
    Math.round(n[2] + (e[2] - n[2]) * i)
  ];
}
function St(n) {
  return `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
}
const Me = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function E(n, e = !0) {
  if (e)
    try {
      ue(n);
    } catch {
    }
}
const j = /* @__PURE__ */ new Map(), kt = 250;
function Ki(n) {
  if (!n) return "";
  const e = j.get(n);
  if (e !== void 0) return e;
  const t = n.trim();
  if (!t)
    return j.set(n, ""), "";
  let i = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? i = t : Ht.test(t) ? i = `rgb(${t})` : Gi.test(t) ? i = `rgba(${t})` : t.toLowerCase() === "state" ? i = "var(--state-icon-color, var(--primary-color))" : Fi.has(t.toLowerCase()) && (i = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), j.size >= kt) {
    const r = Math.floor(kt / 4), o = j.keys();
    for (let a = 0; a < r; a++) {
      const s = o.next().value;
      s !== void 0 && j.delete(s);
    }
  }
  return j.set(n, i), i;
}
class F extends te {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._canceled = !1, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new Map(), this._onSliderPointerDown = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), o = Number(t.value) || 0, a = t.style.getPropertyValue("--slider-pct") || "", s = r?.textContent || "";
      this._sliderStateMap.set(t, {
        startX: e.clientX,
        startY: e.clientY,
        initialVal: o,
        initialPct: a,
        initialBadge: s,
        isScrolling: !1,
        isSliding: !1
      });
    }, this._onSliderPointerMove = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const i = this._sliderStateMap.get(t);
      if (!i) return;
      const r = Math.abs(e.clientX - i.startX), o = Math.abs(e.clientY - i.startY);
      !i.isSliding && !i.isScrolling ? o > 6 && o > r ? (i.isScrolling = !0, this._revertSlider(t, i)) : r > 6 && r >= o && (i.isSliding = !0) : i.isScrolling && this._revertSlider(t, i);
    }, this._onSliderPointerCancel = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const i = this._sliderStateMap.get(t);
      i && (i.isScrolling = !0, this._revertSlider(t, i), this._sliderStateMap.delete(t));
    }, this._onSliderPointerUp = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const i = this._sliderStateMap.get(t);
      if (i) {
        if (i.isScrolling) {
          this._revertSlider(t, i), this._sliderStateMap.delete(t);
          return;
        }
        if (this.config.tap_slider_to_toggle && !i.isSliding) {
          const r = Math.abs(e.clientX - i.startX), o = Math.abs(e.clientY - i.startY);
          r < 6 && o < 6 && (this._revertSlider(t, i), E("light", this.config.haptic_feedback !== !1), $t(this, this.hass, this.config, "tap"));
        }
      }
    };
  }
  // --- SECTIONS LAYOUT SUPPORT ---
  getGridOptions() {
    const e = this.config?.card_layout === "large";
    return {
      columns: { min: 2, default: 4, max: 6 },
      rows: { min: 1, default: e ? 2 : 1, max: 4 }
    };
  }
  // --- CARD SIZE FOR MASONRY/PANEL VIEWS ---
  getCardSize() {
    return this.config?.card_layout === "large" ? 3 : 2;
  }
  static getStubConfig() {
    return { ...Ke };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...Ke,
      ...e
    }, this._cachedSubButtons = null;
    const t = [];
    this.config.entity && t.push(this.config.entity), this.config.sub_button_1_entity && t.push(this.config.sub_button_1_entity), this.config.sub_button_2_entity && t.push(this.config.sub_button_2_entity), this.config.sub_button_3_entity && t.push(this.config.sub_button_3_entity), this.config.sub_button_4_entity && t.push(this.config.sub_button_4_entity), this._monitoredEntities = t, this._computeStaticStylesAndClasses();
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const e = this.config.card_padding ?? 12, t = this.config.card_padding_vertical ?? 4, i = this.config.card_padding_horizontal ?? e, r = this.config.card_padding_top ?? t, o = this.config.card_padding_bottom ?? t, a = this.config.card_padding_left ?? i, s = this.config.card_padding_right ?? i, l = this.config.card_margin, d = this.config.card_margin_vertical ?? l, h = this.config.card_margin_horizontal ?? l, c = this.config.card_margin_top ?? d, _ = this.config.card_margin_bottom ?? d, p = this.config.card_margin_left ?? h, b = this.config.card_margin_right ?? h;
    let y = "";
    (c !== void 0 || _ !== void 0 || p !== void 0 || b !== void 0) && (y = `margin: ${c ?? 0}px ${b ?? 0}px ${_ ?? 0}px ${p ?? 0}px;`);
    const S = this.config.border_radius ?? 12, g = this.config.slider_style === "google", C = this.config.slider_style === "full", f = g ? 42 : C ? 40 : 12, k = g ? 21 : C ? 15 : 6;
    let $ = "";
    this.config.card_width && ($ += `width: ${this.config.card_width}; `), this.config.card_max_width && ($ += `max-width: ${this.config.card_max_width}; `), this.config.card_height && ($ += `height: ${this.config.card_height}; `), this.config.card_min_height !== void 0 && this.config.card_min_height > 0 && ($ += `min-height: ${this.config.card_min_height}px; `);
    let x = "";
    this.config.card_border_width && this.config.card_border_width > 0 && this.config.card_border_style && this.config.card_border_style !== "none" && (x = `border: ${this.config.card_border_width}px ${this.config.card_border_style} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color)"};`);
    const T = this.config.backdrop_blur ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", u = this.config.fill_container ? "height: 100%;" : "", m = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", A = this.config.aspect_ratio ? `aspect-ratio: ${this.config.aspect_ratio};` : "", N = this.config.card_opacity !== void 0 && this.config.card_opacity < 100 ? `opacity: ${this.config.card_opacity / 100};` : "", R = this.config.transition_duration ?? 300, O = R > 0 ? `transition: background ${R}ms ease-out, box-shadow ${R}ms ease-out, border-color ${R}ms ease-out, opacity ${R}ms ease-out;` : "transition: none;", ne = `--ag-sub-btn-align: ${this.config.sub_button_alignment ?? "flex-end"};`, me = `--ag-full-slider-opacity: ${(this.config.full_slider_opacity ?? 30) / 100};`, z = `--ag-marquee-speed: ${this.config.text_scrolling_speed ?? 10}s;`, ve = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, ye = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, xe = this.config.text_padding !== void 0 || this.config.text_padding_vertical !== void 0 || this.config.text_padding_horizontal !== void 0 ? `--ag-text-padding: ${ve}px ${ye}px;` : "", $e = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, we = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Se = this.config.features_padding !== void 0 || this.config.features_padding_vertical !== void 0 || this.config.features_padding_horizontal !== void 0 ? `--ag-features-padding: ${$e}px ${we}px;` : "", ze = this.config.sub_button_container_padding !== void 0 ? `--ag-sub-btn-container-padding: ${this.config.sub_button_container_padding}px;` : "";
    this._staticCardStyles = [
      $,
      `border-radius: ${S}px;`,
      `padding: ${r}px ${s}px ${o}px ${a}px;`,
      x,
      T,
      u,
      m,
      A,
      N,
      O,
      y,
      xe,
      Se,
      ze,
      `--ag-slider-height: ${this.config.slider_height ?? f}px;`,
      `--ag-slider-radius: ${this.config.slider_border_radius ?? k}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 12}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? 0}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? 4}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 4}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? 8}px;`,
      `--ag-sub-button-padding: ${this.config.sub_button_padding ?? 6}px;`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      ne,
      z,
      me
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "none"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const ke = Number(this.config.text_offset_x) || 0, Ce = Number(this.config.text_offset_y) || 0;
    this._textOffsetStyle = ke !== 0 || Ce !== 0 ? `transform: translate(${ke}px, ${Ce}px);` : "";
    const L = Number(this.config.features_offset_x) || 0, K = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = L !== 0 || K !== 0 ? `transform: translate(${L}px, ${K}px);` : "";
    const ae = Number(this.config.slider_start_offset) || 0, I = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      ae ? `margin-left: ${ae}px !important;` : "",
      I ? `margin-right: ${I}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const se = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", X = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, Te = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", D = this.config.line_height ? `line-height: ${this.config.line_height};` : "", Ie = this.config.font_weight_primary ?? "bold";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${Ie}; ${se} ${Te} ${D}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 12}px; ${X} ${Te} ${D}`;
  }
  // --- PERFORMANCE: Zero-allocation re-render check ---
  shouldUpdate(e) {
    if (!this.config || !this.hass || e.has("config") || e.has("preview") || e.has("_collapsed")) return !0;
    const t = e.get("hass");
    if (!t || t.themes !== this.hass.themes || t.locale !== this.hass.locale || t.language !== this.hass.language || t.config !== this.hass.config)
      return !0;
    const i = this._monitoredEntities;
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      if (t.states[o] !== this.hass.states[o])
        return !0;
    }
    return !1;
  }
  _getSubButtons() {
    if (this._cachedSubButtons) return this._cachedSubButtons;
    const e = this.config.entity, t = [];
    for (let i = 1; i <= 4; i++) {
      const r = this.config[`sub_button_${i}_entity`], o = this.config[`sub_button_${i}_icon`], a = this.config[`sub_button_${i}_name`], s = this.config[`sub_button_${i}_tap_action`], l = this.config[`sub_button_${i}_hold_action`], d = this.config[`sub_button_${i}_double_tap_action`], h = this.config[`sub_button_${i}_type`], c = this.config[`sub_button_${i}_color`], _ = this.config[`sub_button_${i}_show_background`], p = this.config[`sub_button_${i}_show_state`];
      if (!!(r || o || a || h && h !== "button" || p)) {
        const y = r || e;
        t.push({
          key: `${y || "sub"}_${i}`,
          entity: y,
          type: h || "button",
          icon: o,
          color: c,
          bg: _,
          name: a,
          showState: p === !0,
          tapAction: s,
          holdAction: l,
          doubleTapAction: d
        });
      }
    }
    return this._cachedSubButtons = t, this._cachedSubButtons;
  }
  _hasCollapsible() {
    return this._cachedHasCollapsible;
  }
  _recomputeHasCollapsible() {
    if (!this.hass || !this.config || !this.config.entity) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const e = this.hass.states[this.config.entity];
    if (!e) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const i = this.config.entity.split(".")[0] === "light", r = e.state === "on", o = this.config.hide_color_temp_when_off !== !1, a = this.config.hide_color_picker_when_off !== !1, s = this.config.hide_color_slider_when_off !== !1, l = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, d = i && this.config.show_color_temp === !0 && (l !== void 0 || e.attributes?.supported_color_modes?.some((g) => ["color_temp"].includes(g))) && (!o || r), h = e.attributes?.supported_color_modes, c = Array.isArray(h) && h.some((g) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(g)), _ = this.config.color_picker_type !== "wheel", p = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && _) && c && (!s || r), b = i && this.config.show_color_picker === !0 && !_ && c && (!a || r), y = d || p || b, S = this._getSubButtons();
    this._cachedHasCollapsible = y || S.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const e = this.config?.primary_info, t = this.config?.secondary_info, i = this.config?.entity, r = i ? i.split(".")[0] : "", o = (r === "binary_sensor" || r === "timer") && (e === "state" || t === "state"), a = this.config?.fade_transition_enabled === !0, s = i && this.hass ? this.hass.states[i] : null, l = r === "light" && s?.state === "on", d = a && (l || s?.last_changed && Date.now() - new Date(s.last_changed).getTime() < 36e5), h = d || o || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (h && !this._relativeTimer) {
      const c = d ? 1e3 : 5e3;
      this._relativeTimer = setInterval(() => {
        !this.hasAttribute("offscreen") && this.style.display !== "none" && this.requestUpdate();
      }, c);
    } else !h && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._throttleMap.clear(), this._subTapTimerMap.forEach((e) => clearTimeout(e)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null), this._sliderStateMap.clear();
  }
  firstUpdated(e) {
    super.firstUpdated(e);
  }
  updated(e) {
    if (super.updated(e), this._updateVisibility(), e.has("config") || e.has("_collapsed"))
      this._recomputeHasCollapsible(), this._setupRelativeTimer();
    else if (e.has("hass") && this.config?.entity) {
      const t = e.get("hass");
      (!t || t.states[this.config.entity] !== this.hass.states[this.config.entity]) && this._recomputeHasCollapsible();
    }
  }
  _toggleDisplay(e) {
    if (this.preview) {
      this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1;
      return;
    }
    e ? (this.style.setProperty("display", "none", "important"), this.hidden = !0) : (this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1);
  }
  _updateVisibility() {
    if (!this.config || !this.hass) return;
    const e = this.config.visibility_state;
    if (!e || e === "always") {
      this._toggleDisplay(!1);
      return;
    }
    const t = this.config.entity, i = t ? this.hass.states[t] : void 0;
    if (!i) {
      this._toggleDisplay(!1);
      return;
    }
    const r = i.state === "on" || this._isEntityActive(i);
    let o = !1;
    (e === "on" && !r || e === "off" && r) && (o = !0), this._toggleDisplay(o);
  }
  _isEntityActive(e) {
    return e ? Ui.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t, i) {
    if (!this.config?.fade_transition_enabled || !e)
      return Me;
    const r = this._isEntityActive(e), o = this.config.fade_trigger ?? "on_inactive";
    if (!(o === "on_inactive" && !r || o === "on_active" && r || o === "both"))
      return Me;
    const s = r ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || t || "#d60000", l = r ? this._resolveColor(this.config.active_color) || t || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", d = J(s) || [214, 0, 0], h = J(l) || [3, 177, 0], c = Number(this.config.fade_stage_1_duration) ?? 60, _ = Number(this.config.fade_stage_2_duration) ?? 600, p = Number(this.config.fade_stage_3_duration) ?? 1800;
    this._lastTrackedState !== null && this._lastTrackedState !== e.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = e.state;
    const b = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : d, y = J(this.config.fade_stage_1_color) || [255, 152, 0], S = this.config.fade_stage_2_pickup !== !1 ? y : d, g = J(this.config.fade_stage_2_color) || [205, 220, 57], C = this.config.fade_stage_3_pickup !== !1 ? g : y, f = J(this.config.fade_stage_3_color) || h, k = c + _ + p;
    if (k <= 0)
      return Me;
    const $ = this._parseDate(e.last_changed || e.last_updated);
    if (!$)
      return Me;
    const x = Math.max(0, (Date.now() - $.getTime()) / 1e3);
    if (x >= k)
      return this._currentLiveRgb = f, this._previousLiveRgb = null, {
        enabled: !0,
        activeFade: !1,
        currentColor: St(f),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let T, u = 1, m = 0;
    const A = Math.max(0, Math.round(k - x));
    x < c && c > 0 ? (u = 1, m = x / c, T = qe(b, y, m)) : x < c + _ && _ > 0 ? (u = 2, m = (x - c) / _, T = qe(S, g, m)) : p > 0 ? (u = 3, m = (x - c - _) / p, T = qe(C, f, m)) : (u = 0, T = f), this._currentLiveRgb = T;
    const N = Math.min(100, Math.round(x / k * 100)), R = St(T);
    let O = "";
    return A >= 60 ? O = `${Math.ceil(A / 60)}m left` : O = `${A}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: R,
      progressPct: N,
      remainingSeconds: A,
      currentStage: u,
      stageLabel: O
    };
  }
  _resolveColor(e) {
    return Ki(e);
  }
  // Shared date parser — eliminates duplication between _formatRelativeTime and _formatForDuration
  _parseDate(e) {
    if (!e) return null;
    if (e instanceof Date) return isNaN(e.getTime()) ? null : e;
    if (typeof e == "number") {
      const t = new Date(e > 1e11 ? e : e * 1e3);
      return isNaN(t.getTime()) ? null : t;
    }
    if (typeof e == "string") {
      const t = Date.parse(e);
      if (!isNaN(t))
        return new Date(t);
      let i = e.trim();
      i.includes(" ") && !i.includes("T") && (i = i.replace(" ", "T")), i.includes("T") && !i.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(i) && !/[+-]\d{4}$/.test(i) && (i += "Z");
      const r = Number(i);
      let o;
      return !isNaN(r) && i !== "" && !i.includes("T") ? o = new Date(r > 1e11 ? r : r * 1e3) : o = new Date(i), isNaN(o.getTime()) ? null : o;
    }
    return null;
  }
  _formatTimeAgo(e, t = !1, i) {
    const r = this._parseDate(e);
    if (!r) return "";
    const o = Math.max(0, Math.round(((i ?? Date.now()) - r.getTime()) / 1e3));
    if (o < 5) return t ? "< 5 sec" : "just now";
    if (o < 60) return t ? `${o} sec` : `${o} seconds ago`;
    const a = Math.round(o / 60);
    if (a < 60) return t ? `${a} ${a === 1 ? "min" : "mins"}` : `${a} ${a === 1 ? "minute" : "minutes"} ago`;
    const s = Math.round(a / 60);
    if (s < 24) return `${s} ${s === 1 ? "hour" : "hours"}${t ? "" : " ago"}`;
    const l = Math.round(s / 24);
    if (l < 7) return `${l} ${l === 1 ? "day" : "days"}${t ? "" : " ago"}`;
    const d = Math.round(l / 7);
    if (d < 4) return `${d} ${d === 1 ? "week" : "weeks"}${t ? "" : " ago"}`;
    const h = Math.round(l / 30);
    if (h < 12) return `${h} ${h === 1 ? "month" : "months"}${t ? "" : " ago"}`;
    const c = Math.round(l / 365);
    return `${c} ${c === 1 ? "year" : "years"}${t ? "" : " ago"}`;
  }
  _formatRelativeTime(e, t) {
    return this._formatTimeAgo(e, !1, t);
  }
  _formatForDuration(e, t) {
    return this._formatTimeAgo(e, !0, t);
  }
  _getInfoContent(e, t) {
    if (!t) return "";
    switch ((e || "").toLowerCase().replace(/_/g, "-")) {
      case "name":
        return this.config.name || t.attributes.friendly_name || this.config.entity || "";
      case "state": {
        const r = (t.entity_id || "").split(".")[0];
        if (r === "timer" && t.state === "active" && t.attributes?.finishes_at) {
          const o = Date.parse(t.attributes.finishes_at);
          if (!isNaN(o)) {
            const a = Math.max(0, Math.round((o - Date.now()) / 1e3)), s = Math.floor(a / 60), l = a % 60, d = Math.floor(s / 60), h = (s % 60).toString().padStart(2, "0"), c = l.toString().padStart(2, "0");
            return d > 0 ? `${d}:${h}:${c}` : `${h}:${c}`;
          }
        }
        if (r === "binary_sensor")
          return this._formatForDuration(t.last_changed);
        if (r === "lock") {
          if (t.state === "locked") return "Locked";
          if (t.state === "unlocked") return "Unlocked";
          if (t.state === "jammed") return "Jammed (Alert!)";
          if (t.state === "locking") return "Locking...";
          if (t.state === "unlocking") return "Unlocking...";
        }
        if (r === "light" && t.state === "on") {
          const o = t.attributes?.brightness, a = o !== void 0 ? Math.round(o / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${a}% • ${t.attributes.color_temp_kelvin}K`;
        }
        if (t.attributes?.device_class === "timestamp" || t.attributes?.device_class === "date" || typeof t.state == "string" && (t.state.includes("T") || t.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(t.state))) {
          const o = this._formatRelativeTime(t.state);
          if (o) return o;
        }
        if (typeof this.hass.formatEntityState == "function")
          try {
            return this.hass.formatEntityState(t);
          } catch {
          }
        return `${t.state} ${t.attributes?.unit_of_measurement || ""}`.trim();
      }
      case "last-changed":
      case "last-changed-relative":
      case "relative-time": {
        const r = t.attributes?.last_triggered || t.last_changed;
        return this._formatForDuration(r);
      }
      case "last-updated":
      case "last-updated-relative":
        return this._formatForDuration(t.last_updated);
      case "last-triggered": {
        const r = t.attributes?.last_triggered || t.last_changed;
        return this._formatForDuration(r);
      }
      case "brightness": {
        const r = t.attributes?.brightness;
        return r !== void 0 ? `${Math.round(r / 255 * 100)}%` : "";
      }
      case "temperature": {
        const r = t.attributes?.temperature ?? t.attributes?.current_temperature, o = t.attributes?.unit_of_measurement || this.hass.config?.unit_system?.temperature || "°C";
        return r !== void 0 ? `${r} ${o}` : "";
      }
      case "humidity": {
        const r = t.attributes?.humidity ?? t.attributes?.current_humidity, o = t.attributes?.unit_of_measurement || "%";
        return r !== void 0 ? `${r}${o.startsWith("%") ? o : ` ${o}`}` : "";
      }
      case "battery": {
        const r = t.attributes?.battery_level ?? t.attributes?.battery ?? (t.attributes?.device_class === "battery" ? t.state : void 0);
        if (r !== void 0) {
          const o = Number(r);
          if (!isNaN(o)) {
            let a = "#4caf50";
            return o <= 20 ? a = "#f44336" : o <= 50 && (a = "#ff9800"), w`<span style="color: ${a}; font-weight: bold;">${o}%</span>`;
          }
          return `${r}%`;
        }
        return "";
      }
      case "none":
      default:
        return "";
    }
  }
  // _pointerDownTime: reserved for future gesture duration checks
  _dispatchAction(e, t, i) {
    const r = i || this.config.entity;
    let o = t;
    if (o || (e === "double_tap" ? o = this.config.double_tap_action : e === "hold" ? o = this.config.hold_action : o = this.config.tap_action || { action: "toggle" }), !(!o || o.action === "none")) {
      if (o.action === "more-info") {
        const a = o.entity || r;
        if (a) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: a },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (o.action === "toggle" && r) {
        const a = r.split(".")[0], s = a === "lock" ? this._isEntityActive(this.hass?.states[r]) ? "lock" : "unlock" : "toggle", l = ["lock", "cover"].includes(a) ? a : a === "group" ? "homeassistant" : a;
        this.hass?.callService(l, s, { entity_id: r });
        return;
      }
      if (o.action === "navigate" && o.navigation_path) {
        history.pushState(null, "", o.navigation_path), window.dispatchEvent(new CustomEvent("location-changed", {
          detail: { replace: !1 },
          bubbles: !0,
          composed: !0
        }));
        return;
      }
      if (o.action === "url" && o.url_path) {
        window.open(o.url_path, "_blank");
        return;
      }
      if (o.action === "call-service" && o.service) {
        const [a, s] = o.service.split(".", 2);
        this.hass?.callService(a, s, o.data || o.service_data || {}, o.target);
        return;
      }
      $t(this, this.hass, { ...this.config, entity: r }, e);
    }
  }
  _handleTap(e) {
    if (e.stopPropagation(), this._isSubElement(e)) return;
    if (this._moved || this._canceled) {
      this._moved = !1, this._canceled = !1;
      return;
    }
    if (this._held) {
      this._held = !1;
      return;
    }
    const i = (this.config.collapse_controls_trigger || "hold") === "double_tap";
    if (!(i || this.config.double_tap_action && this.config.double_tap_action.action !== "none")) {
      E("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, E("medium", this.config.haptic_feedback !== !1), i && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, E("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(e) {
    this._isSubElement(e) || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), E("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(e) {
    if (e.preventDefault(), e.stopPropagation(), this._held) return;
    E("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(e) {
    this._isSubElement(e) || (this._held = !1, this._moved = !1, this._canceled = !1, this._startX = e.clientX, this._startY = e.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), E("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(e) {
    this._isSubElement(e) || Math.hypot(e.clientX - this._startX, e.clientY - this._startY) > 8 && (this._moved = !0, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerUp(e) {
    this._isSubElement(e) || this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null);
  }
  _handlePointerCancel(e) {
    this._isSubElement(e) || (this._canceled = !0, this._moved = !0, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _isSubElement(e) {
    const t = e.target;
    return t ? t.tagName === "INPUT" || t.hasAttribute("data-ag-sub") ? !0 : !!t.closest?.("[data-ag-sub], .sub-button, .sub-color-picker, .sub-button-slider-container, .slider-container, .slider-google-wrap, .sub-button-google-slider, .color-picker") : !1;
  }
  _handleSubPointerDown(e, t, i) {
    e.stopPropagation(), this._subHeld = !1, this._subMoved = !1, this._subCanceled = !1, this._subPointerDownTime = Date.now(), this._subStartX = e.clientX, this._subStartY = e.clientY, this._subHoldTimer = setTimeout(() => {
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, E("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
    }, 500);
  }
  _handleSubPointerMove(e) {
    e.stopPropagation(), Math.hypot(e.clientX - this._subStartX, e.clientY - this._subStartY) > 8 && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  _handleSubPointerUp(e) {
    e.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubPointerCancel(e) {
    e.stopPropagation(), this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubTap(e, t, i, r, o) {
    if (e.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null), this._subMoved || this._subCanceled) {
      this._subMoved = !1, this._subCanceled = !1;
      return;
    }
    if (this._subHeld) {
      this._subHeld = !1;
      return;
    }
    if (this._subPointerDownTime && Date.now() - this._subPointerDownTime > 600)
      return;
    const a = r && r.action !== "none", s = t || "sub_default", l = () => {
      E("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, t) : o ? o() : this._dispatchAction("tap", { action: "toggle" }, t);
    };
    if (!a) {
      l();
      return;
    }
    const d = this._subTapTimerMap.get(s);
    if (d) {
      clearTimeout(d), this._subTapTimerMap.delete(s), E("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", r, t);
      return;
    }
    const h = setTimeout(() => {
      this._subTapTimerMap.delete(s), l();
    }, 250);
    this._subTapTimerMap.set(s, h);
  }
  _handleSubContextMenu(e, t, i) {
    e.preventDefault(), e.stopPropagation(), !this._subHeld && (E("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(e, t) {
    const i = Date.now();
    i - (this._throttleMap.get(e) ?? 0) < 100 || (this._throttleMap.set(e, i), t());
  }
  _revertSlider(e, t) {
    e.value = String(t.initialVal), e.style.setProperty("--slider-pct", t.initialPct);
    const r = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    r && (r.textContent = t.initialBadge);
  }
  _sliderInput(e, t, i, r, o, a, s) {
    e.stopPropagation();
    const l = e.target, d = this._sliderStateMap.get(l);
    if (d?.isScrolling) {
      this._revertSlider(l, d);
      return;
    }
    const h = Number(l.value), c = isNaN(h) ? 0 : h, _ = a ? a(c) : c;
    if (d) {
      if (d.rafPending) return;
      d.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (d && (d.rafPending = !1), d?.isScrolling) {
        this._revertSlider(l, d);
        return;
      }
      l.style.setProperty("--slider-pct", `${_}%`);
      const p = l.closest(".slider-container, .sub-button-slider-container"), b = p?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (b && (b.textContent = s ? s(c, _) : `${_}%`), t === "color_hue" && p) {
        p.style.setProperty("--color-hue-val", `hsl(${c}, 100%, 50%)`);
        const y = p.querySelector(".color-chip-badge span");
        y && (y.style.background = `hsl(${c}, 100%, 50%)`);
      }
    }), E("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(e, t, i, r) {
    e.stopPropagation();
    const o = e.target, a = this._sliderStateMap.get(o);
    if (a?.isScrolling) {
      this._revertSlider(o, a), a.isScrolling = !1;
      return;
    }
    const s = Number(o.value), l = isNaN(s) ? 0 : s;
    if (!(a && l === a.initialVal)) {
      if (t === "light" && i === "turn_on") {
        const d = Math.round(l / 255 * 100);
        if (l <= 3 || d <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (t === "fan" && i === "set_percentage" && l <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(t, i, { entity_id: this.config.entity, ...r(l) });
    }
  }
  _getLightLiveColor(e) {
    if (!e || !e.attributes || e.state !== "on") return null;
    const t = e.attributes;
    if (t.color_mode === "color_temp") {
      const r = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [o, a, s] = B(r);
      return `rgb(${o}, ${a}, ${s})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [r, o, a] = Ye(t.hs_color[0], t.hs_color[1]);
      return `rgb(${r}, ${o}, ${a})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const r = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [o, a, s] = B(r);
      return `rgb(${o}, ${a}, ${s})`;
    }
    return e.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(e) {
    if (!e?.attributes || e.state !== "on") return "#ffffff";
    const t = e.attributes;
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return Ae(t.rgb_color);
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2)
      return Ae(Ye(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const o = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return Ae(B(o));
    }
    const i = this._getLightLiveColor(e);
    if (!i) return "#ffffff";
    const r = J(i);
    return r ? Ae(r) : "#ffffff";
  }
  _getLiveHue(e) {
    if (!e) return 0;
    if (Array.isArray(e.attributes?.hs_color) && e.attributes.hs_color.length >= 1)
      return Math.round(e.attributes.hs_color[0]) % 360;
    if (Array.isArray(e.attributes?.rgb_color) && e.attributes.rgb_color.length >= 3) {
      const [t, i, r] = e.attributes.rgb_color;
      return Vi(t, i, r);
    }
    return 0;
  }
  _handleColorInput(e, t, i, r) {
    e.stopPropagation();
    const o = e.target.value;
    if (!o || o.length < 7) return;
    const a = parseInt(o.slice(1, 3), 16), s = parseInt(o.slice(3, 5), 16), l = parseInt(o.slice(5, 7), 16);
    if (isNaN(a) || isNaN(s) || isNaN(l)) return;
    const d = i || this.config.entity, h = () => {
      this.hass.callService("light", "turn_on", { entity_id: d, rgb_color: [a, s, l] });
    };
    t ? this._throttledCall(r || "color_picker", h) : h();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return w``;
    const e = this.config.entity;
    if (!e)
      return w`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const t = this.hass.states[e];
    if (!t)
      return w`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${e}</code></span>
        </ha-card>
      `;
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", r = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", o = this._isEntityActive(t), a = e.split(".")[0];
    let s = "var(--primary-color)", l = null;
    a === "climate" ? t.state === "heat" ? s = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? s = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? s = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (s = "var(--state-climate-fan_only-color, #26a69a)") : a === "light" && (l = this._getLightLiveColor(t), l && (s = l));
    const d = this.config.color_type === "card";
    let h = this._resolveColor(this.config.active_color);
    (!h || this.config.use_light_color) && (a === "light" && l && (this.config.use_light_color || !this.config.active_color) ? h = l : h = s);
    const c = this._resolveColor(this.config.inactive_color) || "var(--secondary-background-color, rgba(150, 150, 150, 0.2))", _ = this.config.show_slider !== !1, p = a === "light", b = a === "cover", y = a === "fan", S = a === "humidifier", g = a === "media_player", C = a === "number" || a === "input_number", f = a === "climate", k = this.config.hide_slider_when_off !== !1, $ = this.config.hide_color_temp_when_off !== !1, x = this.config.hide_color_picker_when_off !== !1, T = this.config.hide_color_slider_when_off !== !1, u = t.attributes?.brightness !== void 0 || t.attributes?.supported_color_modes?.some((M) => M !== "onoff"), m = p && _ && u && (!k || o), A = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, N = p && this.config.show_color_temp === !0 && (A !== void 0 || t.attributes?.supported_color_modes?.some((M) => ["color_temp"].includes(M))) && (!$ || o), R = t.attributes?.supported_color_modes, O = Array.isArray(R) && R.some((M) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(M)), ne = this.config.color_picker_type !== "wheel", me = p && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && ne) && O && (!T || o), Oe = p && this.config.show_color_picker === !0 && !ne && O && (!x || o), z = t.state !== "unavailable" && t.state !== "unknown", ve = b && z && _ && t.attributes?.current_position !== void 0, ye = y && z && o && _ && t.attributes?.percentage !== void 0, xe = S && z && o && _ && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), $e = g && z && o && _ && t.attributes?.volume_level !== void 0, we = C && z && _, Se = f && z && o && _ && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), ze = (this.config.bg_opacity ?? 10) / 100, ke = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : d && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${h};`, Ce = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : d && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", L = this._calculateMultiStageFade(t, s, c), K = this.config.fade_target ?? "card", ae = this._resolveColor(this.config.bg_color);
    let I;
    L.activeFade && (K === "card" || K === "all" || d) ? I = L.currentColor : d ? I = o ? a === "light" && l ? l : h : c : ae ? I = ae : I = `rgba(150, 150, 150, ${ze})`;
    let se = this._resolveColor(this.config.active_color) || (a === "light" && l ? l : h) || "var(--primary-color)";
    L.activeFade && (K === "all" || this.config.active_glow === !0) && (se = L.currentColor);
    let X = "";
    this.config.box_shadow === "soft" && (X = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (X = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (X = o || L.activeFade ? `box-shadow: 0 0 22px ${se}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const Te = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", D = t?.attributes?.device_class, Ie = a === "binary_sensor" && (D === "motion" || D === "occupancy" || D === "presence"), Nt = a === "binary_sensor" && (D === "door" || D === "window" || D === "garage_door" || D === "opening"), Rt = Ie && (o || L.activeFade && L.currentStage === 1) ? "motion-active" : "", Dt = Nt && o ? "door-open" : "", Bt = `${this._staticCardClasses} ${Te} ${Rt} ${Dt}`, Ue = this._getSubButtons();
    this.config.font_weight_primary;
    let Z = "";
    this.config.text_color_mode === "active_accent" && o ? Z += `--primary-text-color: ${h}; ` : this.config.text_color_primary ? Z += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : d && o && (Z += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? Z += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : d && o && (Z += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const Q = this.config.features_position === "inline", Ot = this.config.text_scrolling_primary || "none", zt = this.config.text_scrolling_secondary || "none", rt = w`
      ${m ? this._renderLightSlider(t) : v}
      ${ve ? this._renderCoverSlider(t) : v}
      ${ye ? this._renderFanSlider(t) : v}
      ${xe ? this._renderHumidifierSlider(t) : v}
      ${$e ? this._renderMediaSlider(t) : v}
      ${we ? this._renderNumberSlider(t) : v}
      ${Se ? this._renderClimateSlider(t) : v}
    `, ot = w`
      ${N ? this._renderColorTempSlider(t) : v}
      ${me ? this._renderColorSlider(t) : v}
      ${Oe ? this._renderColorPicker(t) : v}
    `, nt = m || ve || ye || xe || $e || we || Se, Fe = N || me || Oe, It = !Q && Fe || Ue.length > 0, Ge = this.config.decay_slider_position ?? "bottom";
    return w`
      ${this.config.custom_styles ? w`<style>${this.config.custom_styles}</style>` : v}
      <ha-card 
        tabindex="0"
        class="${Bt}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${I}; ${X} ${ke} ${Ce} ${Z} --ag-glow-color: ${se}; --ag-active-color: ${h};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${Q ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${Ge === "top" ? this._renderDecaySlider(L) : v}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${i ? w`
                <div class="text-marquee-container scroll-${Ot}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : v}
              ${r ? w`
                <div class="text-marquee-container scroll-${zt}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${r}</span>
                </div>` : v}
            </div>
            ${Ge === "inline" ? w`<div class="inline-sliders">${this._renderDecaySlider(L)}</div>` : v}
            ${Q && nt ? w`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${rt}</div>` : v}
            ${Q && Fe ? w`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${ot}</div>` : v}
          </div>
          
          ${Ge === "bottom" ? this._renderDecaySlider(L) : v}
          ${!Q && nt ? w`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${rt}</div>` : v}

          ${It ? w`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!Q && Fe ? w`<div class="features-container" style="${this._featuresOffsetStyle}">${ot}</div>` : v}

              ${Ue.length > 0 ? w`
                <div class="sub-buttons-container">
                  ${vi(
      Ue,
      (M) => M.key,
      (M) => this._renderSubButton(M.entity || "", M.icon, M.color, M.bg !== !1, M.name, M.tapAction, M.holdAction, M.type, M.doubleTapAction, M.showState)
    )}
                </div>
              ` : v}
            </div>
          ` : v}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(e) {
    if (!this.config.show_decay_slider || !e.enabled || !e.activeFade)
      return v;
    const t = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (t ? 32 : 10), r = this.config.slider_border_radius ?? (t ? 16 : 5), o = Math.max(0, 100 - e.progressPct);
    return w`
      <div class="decay-slider-container" style="--decay-color: ${e.currentColor};">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${r}px;">
          <div class="decay-slider-fill" style="width: ${o}%; background: ${e.currentColor}; border-radius: ${r}px;"></div>
          <span class="decay-slider-badge">${e.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(e, t, i, r, o, a, s, l, d, h, c, _, p = "", b = "", y) {
    const S = this.config.slider_style === "google", g = S && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, C = _ ? _(a, s) : `${s}%`, f = y !== void 0 ? y : C, k = this.config.slider_stepped_movement === !1 ? "any" : o, $ = e !== "color_temp" && e !== "color_hue", x = this.config.slider_style === "full", T = $ && x ? "main-slider-full" : "";
    let u = 0, m = 0;
    e === "color_temp" ? (u = Number(this.config.color_temp_start_offset) || 0, m = Number(this.config.color_temp_end_offset) || 0) : e === "color_hue" ? (u = Number(this.config.color_slider_start_offset) || 0, m = Number(this.config.color_slider_end_offset) || 0) : (u = Number(this.config.slider_start_offset) || 0, m = Number(this.config.slider_end_offset) || 0);
    let A = "";
    return $ && x ? A = `left: ${u}px !important; right: ${m}px !important; width: calc(100% - ${u + m}px) !important;` : A = [
      u ? `margin-left: ${u}px !important;` : "",
      m ? `margin-right: ${m}px !important;` : ""
    ].filter(Boolean).join(" "), w`
      <div class="slider-container ${p} ${T} ${S ? "slider-google-wrap" : ""}" style="${A} ${b}">
        <input type="range" min=${i} max=${r} step=${k} .value=${a}
               aria-label="${t}"
               style="--slider-pct: ${s}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(N) => this._sliderInput(N, e, l, d, h, c, _)}
               @change=${(N) => this._sliderChange(N, l, d, h)} />
        ${g && f ? w`<span class="slider-percent-badge">${f}</span>` : v}
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(e) {
    const t = this._isEntityActive(e), i = e.attributes.brightness ?? 0, r = Math.max(0, Math.min(100, Math.round(i / 255 * 100))), o = this._getLightLiveColor(e), a = (this.config.use_light_color !== !1 || !this.config.slider_color) && o ? `--slider-color: ${o};` : "";
    return this._renderGenericSlider(
      "brightness",
      "Brightness",
      0,
      255,
      1,
      i,
      r,
      "light",
      "turn_on",
      (s) => ({ brightness: s }),
      (s) => Math.round(s / 255 * 100),
      (s, l) => !t || l <= 0 ? "" : `${l}%`,
      "",
      a
    );
  }
  _renderColorTempSlider(e) {
    const t = this.config.color_temp_type || "gradient", i = e.attributes.color_temp_kelvin !== void 0 || e.attributes.min_color_temp_kelvin !== void 0 || e.attributes.max_color_temp_kelvin !== void 0, r = i ? e.attributes.min_color_temp_kelvin || 2e3 : e.attributes.min_mireds || 153, o = i ? e.attributes.max_color_temp_kelvin || 6500 : e.attributes.max_mireds || 500, a = i ? e.attributes.color_temp_kelvin || 3e3 : e.attributes.color_temp || 300, s = o - r, l = s > 0 ? Math.max(0, Math.min(100, Math.round((a - r) / s * 100))) : 0, d = i ? "color_temp_kelvin" : "color_temp", h = t === "google" || t === "gradient" && this.config.slider_style === "google", c = h ? 42 : t === "thin" ? 6 : 12, _ = h ? 21 : t === "thin" ? 3 : 6, p = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? c, b = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? _, y = i ? `${a} K` : `${a} mireds`;
    if (t === "presets") {
      const S = Number(this.config.color_temp_start_offset) || 0, g = Number(this.config.color_temp_end_offset) || 0, C = [
        S ? `margin-left: ${S}px;` : "",
        g ? `margin-right: ${g}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${C}">
          ${Wi.map((f) => {
        const [k, $, x] = f.rgb, T = Math.abs(a - f.k) < 200;
        return w`
              <button 
                type="button"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${p}px; border-radius: ${b}px; border: ${T ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${k}, ${$}, ${x}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${T ? "0 0 8px rgba(" + k + "," + $ + "," + x + ", 0.8)" : "none"};"
                @click=${(u) => {
          u.stopPropagation(), E("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, [d]: f.k });
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${k}, ${$}, ${x}); display: inline-block;"></span>
                ${f.label}
              </button>
            `;
      })}
        </div>
      `;
    }
    return this._renderGenericSlider(
      "color_temp",
      "Color Temperature",
      r,
      o,
      1,
      a,
      l,
      "light",
      "turn_on",
      (S) => ({ [d]: S }),
      (S) => s > 0 ? Math.round((S - r) / s * 100) : 0,
      (S) => i ? `${S} K` : `${S} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${h ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${p}px; --ag-slider-radius: ${b}px;`,
      y
    );
  }
  _renderColorSlider(e) {
    const t = this.config.color_picker_type || "slider";
    if (t === "wheel")
      return this._renderColorPicker(e);
    if (t === "swatches") {
      const _ = this._getLiveHex(e).toLowerCase(), p = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, b = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, y = Number(this.config.color_slider_start_offset) || 0, S = Number(this.config.color_slider_end_offset) || 0, g = [
        y ? `margin-left: ${y}px;` : "",
        S ? `margin-right: ${S}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${g}">
          ${Xe.map((C) => {
        const f = _ === C.hex.toLowerCase();
        return w`
              <button 
                type="button"
                tabindex="0"
                class="color-swatch-chip"
                title="${C.label}"
                style="flex: 1; min-width: 28px; height: ${p}px; border-radius: ${b}px; background: ${C.hex}; border: ${f ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${f ? "0 0 10px " + C.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @click=${(k) => {
          k.stopPropagation(), E("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: C.rgb });
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this._getLiveHue(e), r = Math.max(0, Math.min(100, Math.round(i / 360 * 100))), o = t === "google" || this.config.slider_style === "google", a = o ? 42 : 12, s = o ? 21 : 6, l = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? a, d = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? s, h = `hsl(${i}, 100%, 50%)`, c = w`
      <span class="color-chip-badge" style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${h}; border: 1.5px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
        ${i}°
      </span>
    `;
    return this._renderGenericSlider(
      "color_hue",
      "Color Hue",
      0,
      360,
      1,
      i,
      r,
      "light",
      "turn_on",
      (_) => {
        const [p, b, y] = Ye(_, 100);
        return { rgb_color: [p, b, y] };
      },
      (_) => Math.round(_ / 360 * 100),
      (_) => `${_}°`,
      `color-hue ${o ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${l}px; --ag-slider-radius: ${d}px; --color-hue-val: ${h};`,
      c
    );
  }
  _renderColorPicker(e) {
    const t = this._getLiveHex(e), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, r = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return w`
      <div class="color-picker" title="Adjust Light Color" style="height: ${i}px; border-radius: ${r}px;">
        <input type="color" 
               .value=${t} 
               @input=${(o) => this._handleColorInput(o, !0)}
               @change=${(o) => this._handleColorInput(o, !1)} />
        <span class="color-label">Color (${t})</span>
      </div>
    `;
  }
  _renderCoverSlider(e) {
    const t = e.attributes.current_position ?? (e.state === "open" || e.state === "opening" ? 100 : 0);
    return this._renderGenericSlider(
      "cover",
      "Cover Position",
      0,
      100,
      1,
      t,
      t,
      "cover",
      "set_cover_position",
      (i) => ({ position: i }),
      (i) => i,
      (i, r) => `${r}%`
    );
  }
  _renderFanSlider(e) {
    const t = e.attributes.percentage ?? 0, i = e.attributes.percentage_step ?? 1;
    return this._renderGenericSlider(
      "fan",
      "Fan Speed",
      0,
      100,
      i,
      t,
      t,
      "fan",
      "set_percentage",
      (r) => ({ percentage: r }),
      (r) => r,
      (r, o) => `${o}%`
    );
  }
  _renderMediaSlider(e) {
    const t = Math.round((e.attributes.volume_level ?? 0) * 100);
    return this._renderGenericSlider(
      "media",
      "Volume",
      0,
      100,
      1,
      t,
      t,
      "media_player",
      "volume_set",
      (i) => ({ volume_level: i / 100 }),
      (i) => i,
      (i, r) => `${r}%`
    );
  }
  _renderNumberSlider(e) {
    const t = Number(e.attributes.min ?? 0), i = Number(e.attributes.max ?? 100), r = Number(e.attributes.step ?? 1), o = Number(e.state), a = isNaN(o) ? t : o, s = i - t, l = s > 0 ? Math.max(0, Math.min(100, Math.round((a - t) / s * 100))) : 0, d = (this.config.entity || "number").split(".")[0], h = e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : "";
    return this._renderGenericSlider(
      "number",
      "Value",
      t,
      i,
      r,
      a,
      l,
      d,
      "set_value",
      (c) => ({ value: c }),
      (c) => s > 0 ? Math.round((c - t) / s * 100) : 0,
      (c) => `${r < 1 ? Number(c).toFixed(1) : c}${h}`
    );
  }
  _renderClimateSlider(e) {
    const t = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = t ? "°F" : "°C", r = t ? 60 : 16, o = t ? 85 : 30, a = e.attributes.min_temp ?? r, s = e.attributes.max_temp ?? o, l = e.attributes.target_temp_step ?? e.attributes.target_temperature_step ?? (t ? 1 : 0.5), d = e.attributes.temperature ?? e.attributes.target_temp_low ?? e.attributes.target_temp_high ?? a, h = s - a, c = h > 0 ? Math.max(0, Math.min(100, Math.round((d - a) / h * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      a,
      s,
      l,
      d,
      c,
      "climate",
      "set_temperature",
      (_) => ({ temperature: _ }),
      (_) => h > 0 ? Math.round((_ - a) / h * 100) : 0,
      (_) => `${_}${i}`,
      "climate-temp",
      "",
      `${d}${i}`
    );
  }
  _renderHumidifierSlider(e) {
    const t = e.attributes?.min_humidity ?? 0, i = e.attributes?.max_humidity ?? 100, r = e.attributes?.humidity ?? e.attributes?.target_humidity ?? t, o = i - t, a = o > 0 ? Math.max(0, Math.min(100, Math.round((r - t) / o * 100))) : 0;
    return this._renderGenericSlider(
      "humidifier",
      "Humidity",
      t,
      i,
      1,
      r,
      a,
      "humidifier",
      "set_humidity",
      (s) => ({ humidity: s }),
      (s) => o > 0 ? Math.round((s - t) / o * 100) : 0,
      (s, l) => `${l}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(e, t, i, r, o) {
    const a = t || this.hass.states[this.config.entity || ""], s = e || this.config.entity || "", l = a?.attributes?.volume_level !== void 0 || a?.entity_id?.startsWith("media_player."), d = a?.attributes?.percentage !== void 0 || a?.entity_id?.startsWith("fan."), h = a?.attributes?.current_position !== void 0 || a?.entity_id?.startsWith("cover.");
    let c = 0, _ = 0, p = 255, b = "1", y = "turn_on", S = "light", g = "brightness";
    l ? (c = a?.attributes?.volume_level ?? 0, p = 1, b = "0.01", y = "set_volume_level", S = "media_player", g = "volume_level") : d ? (c = a?.attributes?.percentage ?? 0, p = 100, b = "1", y = "set_percentage", S = "fan", g = "percentage") : h ? (c = a?.attributes?.current_position ?? 0, p = 100, b = "1", y = "set_cover_position", S = "cover", g = "position") : c = a?.attributes?.brightness ?? 0;
    const C = Math.round(p === 1 ? c * 100 : p === 100 ? c : c / 255 * 100);
    return i === "slider" ? w`
        <div class="sub-button-slider-container ${o}" style="${r}" title="Level: ${C}%">
          <input type="range" 
                 min="${_}" 
                 max=${p} 
                 step=${b} 
                 .value=${c}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value), $ = Math.round(p === 1 ? k * 100 : p === 100 ? k : k / 255 * 100), x = f.target.closest(".sub-button-slider-container");
      x && x.setAttribute("title", `Level: ${$}%`), this._throttledCall("sub_slider_" + s, () => {
        this.hass.callService(S, y, { entity_id: s, [g]: k });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value);
      this.hass.callService(S, y, { entity_id: s, [g]: k });
    }} />
        </div>
      ` : w`
        <div class="sub-button-google-slider ${o}" style="${r} --slider-pct: ${C}%;" title="Level: ${C}%">
          <input type="range" 
                 min="${_}" 
                 max=${p} 
                 step=${b} 
                 .value=${c}
                 style="--slider-pct: ${C}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value), $ = Math.round(p === 1 ? k * 100 : p === 100 ? k : k / 255 * 100), x = f.target;
      x.style.setProperty("--slider-pct", `${$}%`);
      const T = x.closest(".sub-button-google-slider");
      if (T) {
        T.style.setProperty("--slider-pct", `${$}%`), T.setAttribute("title", `Level: ${$}%`);
        const u = T.querySelector(".sub-slider-pct");
        u && (u.textContent = `${$}%`);
      }
      this._throttledCall("sub_slider_" + s, () => {
        this.hass.callService(S, y, { entity_id: s, [g]: k });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value);
      this.hass.callService(S, y, { entity_id: s, [g]: k });
    }} />
          <span class="sub-slider-pct">${C}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(e, t, i, r, o, a) {
    const s = t || this.hass.states[this.config.entity || ""], l = this._getLiveHex(s);
    return w`
      <div class="sub-button sub-color-picker ${r}" 
           tabindex="0" 
           role="button" 
           title="Select Color (${l})" 
           style="${i}"
           @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.currentTarget.querySelector("input")?.click());
    }}>
        <input type="color" 
               aria-label="Color Picker"
               .value=${l} 
               @input=${(d) => this._handleColorInput(d, !0, e || this.config.entity, "sub_color_picker_" + e)}
               @change=${(d) => this._handleColorInput(d, !1, e || this.config.entity)} />
        ${o ? w`<span class="sub-button-label">${o}</span>` : v}
        ${a ? w`<span class="sub-button-state">${a}</span>` : v}
      </div>
    `;
  }
  _renderSubButton(e, t, i, r = !0, o, a, s, l = "button", d, h = !1) {
    const c = e ? this.hass.states[e] : void 0;
    if (e && !c)
      return w`
        <div class="sub-button missing" title="Entity not found: ${e}">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        </div>
      `;
    const _ = c ? this._isEntityActive(c) : !1;
    let p = this._resolveColor(i);
    !p && _ && c?.attributes?.rgb_color && Array.isArray(c.attributes.rgb_color) && (p = `rgb(${c.attributes.rgb_color.join(",")})`);
    const b = p ? `color: ${p};` : "", y = r ? "" : "no-bg", S = h && c ? this._getInfoContent("state", c) : "";
    if (l === "slider" || l === "google_slider")
      return this._renderSubSlider(e, c, l, b, y);
    if (l === "color_picker")
      return this._renderSubColorPicker(e, c, b, y, o, S);
    let g = t, C = _, f = o || "", k = "", $ = o, x;
    if (a && a.action && a.action !== "none" && a.action !== "default")
      g || (g = c?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (l) {
        case "play_pause": {
          const u = c?.state === "playing";
          C = u, g || (g = u ? "mdi:pause" : "mdi:play"), f = u ? "Pause" : "Play", x = () => {
            this.hass.callService("media_player", "media_play_pause", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "next": {
          g || (g = "mdi:skip-next"), f = "Next Track", x = () => {
            this.hass.callService("media_player", "media_next_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "previous": {
          g || (g = "mdi:skip-previous"), f = "Previous Track", x = () => {
            this.hass.callService("media_player", "media_previous_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "open_close": {
          const u = c?.state === "open" || c?.state === "on" || c?.attributes?.current_position !== void 0 && c.attributes.current_position > 0;
          C = u, g || (g = u ? "mdi:window-shutter-open" : "mdi:window-shutter"), f = u ? "Close" : "Open", x = () => {
            this.hass.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "stop": {
          g || (g = "mdi:stop"), f = "Stop", x = () => {
            this.hass.callService("cover", "stop_cover", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const u = c?.state === "locked";
          C = !u, g || (g = u ? "mdi:lock" : "mdi:lock-open-variant"), f = u ? "Unlock" : "Lock", x = () => {
            this.hass.callService("lock", u ? "unlock" : "lock", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const u = c?.attributes?.percentage ?? 0;
          g || (g = "mdi:fan"), _ && (k = "anim-spin"), f = `Speed: ${u}%`, $ || ($ = u > 0 ? `${u}%` : "Off"), x = () => {
            let m = 33;
            u >= 90 ? m = 0 : u >= 60 ? m = 100 : u >= 30 && (m = 66), this.hass.callService("fan", "set_percentage", { entity_id: e || this.config.entity, percentage: m });
          };
          break;
        }
        case "clean": {
          const u = c?.state === "cleaning";
          C = u, g || (g = u ? "mdi:pause" : "mdi:robot-vacuum"), f = u ? "Pause Vacuum" : "Start Vacuum", x = () => {
            this.hass.callService("vacuum", u ? "pause" : "start", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dock": {
          g || (g = "mdi:home-import-outline"), f = "Return to Dock", x = () => {
            this.hass.callService("vacuum", "return_to_base", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "locate": {
          g || (g = "mdi:map-marker-question-outline"), f = "Locate", x = () => {
            this.hass.callService("vacuum", "locate", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const u = c?.state || "off", m = c?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], A = m[(m.indexOf(u) + 1) % m.length] || "auto";
          C = u !== "off", g || (u === "heat" ? g = "mdi:fire" : u === "cool" ? g = "mdi:snowflake" : u === "dry" ? g = "mdi:water-percent" : u === "fan_only" ? g = "mdi:fan" : u === "auto" ? g = "mdi:thermostat-auto" : g = "mdi:power"), f = `Mode: ${u} -> Next: ${A}`, $ || ($ = u), x = () => {
            this.hass.callService("climate", "set_hvac_mode", { entity_id: e || this.config.entity, hvac_mode: A });
          };
          break;
        }
        case "light_effect": {
          const u = c?.attributes?.effect_list || [], m = c?.attributes?.effect || "None", A = u.length > 0 ? u[(u.indexOf(m) + 1) % u.length] || u[0] : "None";
          g || (g = "mdi:creation"), C = m !== "None" && m !== "off" && _, f = `Effect: ${m} -> Next: ${A}`, $ || ($ = m !== "None" ? m : "Effect"), x = () => {
            u.length > 0 && this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, effect: A });
          };
          break;
        }
        case "brightness": {
          const u = c?.attributes?.brightness, m = u !== void 0 ? Math.round(u / 255 * 100) : 0;
          g || (g = "mdi:brightness-6"), f = `Brightness: ${m}%`, $ || ($ = `${m}%`), x = () => {
            let A = 255;
            m >= 85 ? A = 76 : m >= 50 ? A = 255 : A = 178, this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: A });
          };
          break;
        }
        case "garage_toggle": {
          const u = c?.state === "open" || c?.state === "opening";
          C = u, g || (g = u ? "mdi:garage-open" : "mdi:garage"), f = u ? "Close Garage" : "Open Garage", x = () => {
            this.hass.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const u = c?.attributes?.brightness ?? 0, m = Math.min(255, u + 26);
          g || (g = "mdi:brightness-5"), f = "Brightness +10%", $ || ($ = "+10%"), x = () => {
            this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: m });
          };
          break;
        }
        case "dim_down": {
          const u = c?.attributes?.brightness ?? 0, m = Math.max(1, u - 26);
          g || (g = "mdi:brightness-4"), f = "Brightness -10%", $ || ($ = "-10%"), x = () => {
            this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: m });
          };
          break;
        }
        case "temp_warm": {
          g || (g = "mdi:weather-sunny"), f = "Warm White (2700K)", $ || ($ = "2700K"), x = () => {
            this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          g || (g = "mdi:weather-sunset-up"), f = "Cool Daylight (6000K)", $ || ($ = "6000K"), x = () => {
            this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          g || (g = "mdi:palette-swatch-outline"), f = "Color Temperature", $ || ($ = "Temp"), x = () => {
            const u = c?.attributes?.color_temp_kelvin || 3e3;
            let m = 2700;
            u < 3300 ? m = 4e3 : u < 5e3 ? m = 6e3 : m = 2700, this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: m });
          };
          break;
        }
        case "button":
        default: {
          g || (g = c?.attributes?.icon || "mdi:checkbox-blank-circle"), f = o || (c?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const T = (u) => {
      this._handleSubTap(u, e, a, d, x);
    };
    return w`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${y}" 
        ?active=${C} 
        style="${b} ${C && p && r ? `background: ${p}; color: #fff;` : ""}"
        title="${f}"
        @click=${T}
        @keydown=${(u) => {
      (u.key === "Enter" || u.key === " ") && (u.preventDefault(), u.stopPropagation(), T(u));
    }}
        @pointerdown=${(u) => this._handleSubPointerDown(u, e, s)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(u) => this._handleSubContextMenu(u, e, s)}>
        <ha-icon .icon=${g} class="${k}"></ha-icon>
        ${$ ? w`<span class="sub-button-label">${$}</span>` : v}
        ${S ? w`<span class="sub-button-state">${S}</span>` : v}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return Tt`
      :host([hidden]),
      :host([offscreen]) *,
      :host([offscreen]) .anim-spin,
      :host([offscreen]) .anim-bounce,
      :host([offscreen]) .pulse,
      :host([offscreen]) .scroll-content {
        animation-play-state: paused !important;
      }
      :host([hidden]) {
        display: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      :host {
        display: block;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
      }
      :host([hidden]) {
        display: none !important;
      }
      input[type="range"] {
        touch-action: pan-y;
        -webkit-appearance: none;
        appearance: none;
      }
      ha-card {
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        --ha-card-border-width: 0;
        position: relative;
        outline: none;
      }
      ha-card:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .sub-button {
        transform: translateZ(0);
      }
      .sub-button:hover, .sub-button:active {
        will-change: transform, background, color;
      }
      .warning-card {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--warning-color, #ff9800);
        background: rgba(255, 152, 0, 0.08);
        border: 1px solid rgba(255, 152, 0, 0.2);
        border-radius: 12px;
        font-size: 13px;
        font-weight: 500;
      }
      .warning-card code {
        background: rgba(0, 0, 0, 0.2);
        padding: 2px 6px;
        border-radius: 4px;
      }
      .card-content {
        display: flex;
        flex-direction: column;
        gap: var(--ag-features-margin, 12px);
        width: 100%;
        box-sizing: border-box;
      }
      .card-content.features-inline .info-container { flex-wrap: wrap; }

      /* --- THEME PRESETS --- */
      .theme-glassmorphism {
        background: rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(16px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25) !important;
      }
      .theme-neumorphism {
        background: var(--card-background-color, #1e1e1e) !important;
        box-shadow: 6px 6px 14px rgba(0,0,0,0.4), -6px -6px 14px rgba(255,255,255,0.05) !important;
        border: none !important;
      }
      .theme-cyberpunk {
        background: rgba(10, 10, 20, 0.95) !important;
        border: 1px solid #00ffcc !important;
        box-shadow: 0 0 15px rgba(0, 255, 204, 0.35), inset 0 0 15px rgba(255, 0, 128, 0.2) !important;
      }
      .theme-minimal_flat {
        background: var(--card-background-color, rgba(150, 150, 150, 0.05)) !important;
        border: none !important;
        box-shadow: none !important;
      }
      .theme-sunset_gradient {
        background: linear-gradient(135deg, rgba(255, 94, 98, 0.85), rgba(255, 153, 102, 0.85)) !important;
        color: white !important;
      }
      .theme-oled_black {
        background: #000000 !important;
        border: 1px solid #222222 !important;
        box-shadow: none !important;
      }
      .theme-aurora {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.25)) !important;
        backdrop-filter: blur(20px) saturate(190%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(190%) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
      }
      .theme-material_you {
        background: var(--ha-card-background, var(--card-background-color, rgba(150, 150, 150, 0.08))) !important;
        border: 1px solid var(--divider-color, rgba(150, 150, 150, 0.25)) !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
      }
      .theme-retro_synth {
        background: linear-gradient(135deg, #18002e 0%, #0d001a 100%) !important;
        border: 1px solid #ff007f !important;
        box-shadow: 0 0 15px rgba(255, 0, 127, 0.35), inset 0 0 15px rgba(0, 255, 255, 0.15) !important;
      }

      /* --- HOVER EFFECTS --- */
      .hover-lift:hover {
        will-change: transform, box-shadow;
        transform: translateY(-3px) translateZ(0);
        box-shadow: 0 8px 20px rgba(0,0,0,0.25);
      }
      .hover-glow:hover {
        box-shadow: 0 0 24px var(--ag-glow-color, var(--ag-active-color, var(--primary-color))) !important;
      }
      ha-card[active].card-active-glow {
        box-shadow: 0 0 22px var(--ag-glow-color, var(--ag-active-color, var(--primary-color))), 0 0 45px rgba(255, 255, 255, 0.18) !important;
      }
      .hover-scale:hover {
        will-change: transform;
        transform: scale(1.02) translateZ(0);
      }

      /* --- CARD LAYOUT: LARGE --- */
      .card-large .card-content {
        min-height: 64px;
        justify-content: center;
      }
      .card-large .info-container {
        gap: 16px !important;
      }

      /* --- CONTENT LAYOUT --- */
      .layout-default .info-container, .layout-horizontal .info-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--ag-content-spacing, 12px);
        width: 100%;
        box-sizing: border-box;
        min-width: 0;
      }
      .layout-default .info, .layout-horizontal .info { align-items: flex-start; }
      .layout-vertical .info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ag-content-spacing, 8px);
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        min-width: 0;
      }
      .layout-vertical .info { align-items: center; }

      /* --- COLLAPSIBLE CONTROLS ACCORDION --- */
      .collapsible-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--ag-features-margin, 4px);
        max-height: 500px;
        opacity: 1;
        overflow: hidden;
        /* Removed static will-change to avoid permanent compositor layer promotion.
           The browser's transition engine handles this efficiently. */
        transform: translateZ(0);
        transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin 0.35s ease;
      }
      .collapsible-wrapper.collapsed {
        max-height: 0 !important;
        opacity: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        pointer-events: none !important;
      }
      .inline-sliders.collapsed {
        display: none !important;
      }

      /* --- INVERSE TEXT COLOR MODE --- */
      .text-color-mode-inverse .primary,
      .text-color-mode-inverse .secondary {
        mix-blend-mode: difference !important;
        color: #ffffff !important;
      }

      /* --- INLINE FEATURES POSITION --- */
      .features-container {
        display: flex;
        flex-direction: column;
        gap: var(--ag-slider-spacing, 4px);
        width: 100%;
        padding: var(--ag-features-padding, 0px);
      }
      .inline-sliders {
        flex: 1;
        min-width: 80px;
        display: flex;
        flex-direction: column;
        gap: var(--ag-slider-spacing, 4px);
      }

      .door-open {
        border-color: rgba(255, 152, 0, 0.5) !important;
      }

      /* --- TEXT & MARQUEE SCROLLING --- */
      .info {
        display: flex;
        flex-direction: column;
        flex: 1 1 0%;
        width: 100%;
        min-width: 0;
        justify-content: center;
        overflow: hidden;
        gap: var(--ag-text-spacing, 0px);
        padding: var(--ag-text-padding, 0px);
        box-sizing: border-box;
      }
      .text-marquee-container {
        display: flex;
        overflow: hidden;
        width: 100%;
        max-width: 100%;
        position: relative;
        white-space: nowrap;
      }
      .primary {
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        pointer-events: none;
      }
      .secondary {
        font-weight: 500;
        opacity: 0.7;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        pointer-events: none;
      }

      /* Bounce / Ping-Pong Marquee Animation */
      .text-marquee-container.scroll-marquee .scroll-content {
        overflow: visible;
        text-overflow: clip;
        width: auto;
        display: inline-block;
        will-change: transform;
        animation: text-marquee-bounce var(--ag-marquee-speed, 10s) ease-in-out infinite alternate;
      }

      /* Continuous Ticker Loop Animation */
      .text-marquee-container.scroll-continuous .scroll-content {
        overflow: visible;
        text-overflow: clip;
        width: auto;
        display: inline-block;
        will-change: transform;
        animation: text-marquee-continuous var(--ag-marquee-speed, 10s) linear infinite;
      }

      /* Scroll on Hover Animation */
      .text-marquee-container.scroll-hover:hover .scroll-content,
      ha-card:hover .text-marquee-container.scroll-hover .scroll-content {
        overflow: visible;
        text-overflow: clip;
        width: auto;
        display: inline-block;
        will-change: transform;
        animation: text-marquee-bounce var(--ag-marquee-speed, 6s) ease-in-out infinite alternate;
      }

      @keyframes text-marquee-bounce {
        0%, 20% {
          transform: translateX(0%);
        }
        80%, 100% {
          transform: translateX(-40%);
        }
      }

      @keyframes text-marquee-continuous {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      /* --- DECAY / COOLDOWN SLIDER --- */
      .decay-slider-container {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        margin: 2px 0;
      }
      .decay-slider-track {
        width: 100%;
        background: var(--slider-track-color, rgba(150, 150, 150, 0.2));
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
      .decay-slider-fill {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        transition: width 1s linear, background-color 1s ease-out;
      }
      .decay-slider-badge {
        position: relative;
        z-index: 2;
        margin-left: auto;
        margin-right: 8px;
        font-size: 11px;
        font-weight: 700;
        color: var(--primary-text-color, #ffffff);
        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        pointer-events: none;
      }

      /* --- FULL CARD SLIDER --- */
      .slider-style-full {
        position: relative;
        overflow: hidden !important;
      }
      .slider-style-full .card-content {
        position: relative;
        z-index: 2;
        pointer-events: none;
      }
      .slider-style-full .collapsible-wrapper {
        position: relative !important;
        z-index: 2 !important;
        pointer-events: auto !important;
      }
      .slider-style-full .info {
        position: relative !important;
        z-index: 2 !important;
        pointer-events: none !important;
      }
      .slider-style-full .info .primary,
      .slider-style-full .info .secondary {
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
      }
      .slider-style-full .main-slider-full {
        position: absolute !important;
        top: 0 !important;
        left: 0;
        right: 0;
        width: 100%;
        height: 100% !important;
        padding: 0 !important;
        z-index: 1 !important;
        pointer-events: auto !important;
        border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
        overflow: hidden !important;
        opacity: var(--ag-full-slider-opacity, 0.3) !important;
      }
      .slider-style-full .main-slider-full input[type=range] {
        height: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        cursor: grab !important;
        border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
        overflow: hidden !important;
      }
      .slider-style-full .main-slider-full input[type=range]::-webkit-slider-runnable-track {
        height: 100% !important;
        border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
        border: none !important;
        background: linear-gradient(
          to right,
          var(--slider-color, var(--primary-color)) 0%,
          var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
          var(--slider-track-color, transparent) var(--slider-pct, 100%),
          var(--slider-track-color, transparent) 100%
        ) !important;
      }
      .slider-style-full .main-slider-full input[type=range]::-moz-range-track {
        height: 100% !important;
        border-radius: var(--ag-slider-radius, var(--ha-card-border-radius, 12px)) !important;
        border: none !important;
        background: linear-gradient(
          to right,
          var(--slider-color, var(--primary-color)) 0%,
          var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
          var(--slider-track-color, transparent) var(--slider-pct, 100%),
          var(--slider-track-color, transparent) 100%
        ) !important;
      }
      .slider-style-full .main-slider-full input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
        border: none !important;
      }
      .slider-style-full .main-slider-full input[type=range]::-moz-range-thumb {
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
        border: none !important;
      }
      .slider-style-full .card-content > .features-container {
        height: 0 !important;
        margin: 0 !important;
        gap: 0 !important;
        padding: 0 !important;
      }
      .slider-style-full .info-container > .inline-sliders {
        height: 0 !important;
        margin: 0 !important;
        gap: 0 !important;
        padding: 0 !important;
      }

      /* --- CAPSULE SLIDERS (BUBBLE & MUSHROOM SIGNATURE) --- */
      .slider-container { padding: 0 2px; }
      .slider-container input[type=range] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%; margin: 0; cursor: grab;
        background: transparent;
        height: calc(var(--ag-slider-height, 12px) + 12px);
        touch-action: pan-y;
      }
      .slider-container input[type=range]::-webkit-slider-runnable-track {
        background: linear-gradient(
          to right,
          var(--slider-color, var(--primary-color)) 0%,
          var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
          var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
          var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
        );
        height: var(--ag-slider-height, 12px);
        border-radius: var(--ag-slider-radius, 6px);
        transition: background 0.05s ease;
      }
      /* --- SLIDER STYLE 1: CIRCLE KNOB (DEFAULT) --- */
      .slider-style-circle .slider-container input[type=range]::-webkit-slider-thumb,
      .slider-container input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 22px; height: 22px;
        border-radius: 50%;
        background: var(--slider-color, var(--primary-color));
        border: 2px solid var(--card-background-color, #fff);
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        margin-top: calc((var(--ag-slider-height, 12px) - 22px) / 2);
        cursor: grab;
        transition: transform 0.15s ease;
      }
      .slider-style-circle .slider-container input[type=range]::-webkit-slider-thumb:hover,
      .slider-container input[type=range]::-webkit-slider-thumb:hover {
        transform: scale(1.15);
      }
      .slider-style-circle .slider-container input[type=range]:active::-webkit-slider-thumb,
      .slider-container input[type=range]:active::-webkit-slider-thumb {
        cursor: grabbing;
        transform: scale(1.25);
      }
      /* Firefox */
      .slider-container input[type=range]::-moz-range-track {
        background: linear-gradient(
          to right,
          var(--slider-color, var(--primary-color)) 0%,
          var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
          var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
          var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
        );
        height: var(--ag-slider-height, 12px); border-radius: var(--ag-slider-radius, 6px); border: none;
      }
      .slider-container input[type=range]::-moz-range-thumb {
        width: 18px; height: 18px;
        border-radius: 50%;
        background: var(--slider-color, var(--primary-color));
        border: 2px solid var(--card-background-color, #fff);
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        cursor: grab;
      }
      .slider-container.color-temp.kelvin input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #ff9b2b 0%, #ffffff 50%, #b5d5ff 100%); }
      .slider-container.color-temp.kelvin input[type=range]::-moz-range-track { background: linear-gradient(90deg, #ff9b2b 0%, #ffffff 50%, #b5d5ff 100%); }
      .slider-container.color-temp.mireds input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #b5d5ff 0%, #ffffff 50%, #ff9b2b 100%); }
      .slider-container.color-temp.mireds input[type=range]::-moz-range-track { background: linear-gradient(90deg, #b5d5ff 0%, #ffffff 50%, #ff9b2b 100%); }
      .slider-container.climate-temp input[type=range]::-webkit-slider-runnable-track { background: linear-gradient(90deg, #42a5f5 0%, #ffca28 50%, #ff7043 100%) !important; }
      .slider-container.climate-temp input[type=range]::-moz-range-track { background: linear-gradient(90deg, #42a5f5 0%, #ffca28 50%, #ff7043 100%) !important; }

      /* --- COLOR HUE SPECTRUM SLIDER --- */
      .slider-container.color-hue input[type=range]::-webkit-slider-runnable-track {
        background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%) !important;
      }
      .slider-container.color-hue input[type=range]::-moz-range-track {
        background: linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%) !important;
      }
      /* Removed: .slider-container.color-hue.slider-google-wrap track rules
         are redundant — the parent .slider-container.color-hue selector
         already applies the spectrum gradient to both variants. */
      .slider-container.color-hue input[type=range]::-webkit-slider-thumb {
        background: var(--color-hue-val, #ffffff);
        border: 2px solid #ffffff;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.45);
      }
      .slider-container.color-hue input[type=range]::-moz-range-thumb {
        background: var(--color-hue-val, #ffffff);
        border: 2px solid #ffffff;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.45);
      }
      .slider-container.color-hue.slider-google-wrap input[type=range]::-webkit-slider-thumb,
      .slider-container.color-hue.slider-google-wrap input[type=range]::-moz-range-thumb {
        background: #ffffff;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
      }

      /* --- SLIDER STYLE 2: FILLED HUE CAPSULE (FLUID PILL / NO KNOB) --- */
      .slider-style-filled .slider-container input[type=range]::-webkit-slider-runnable-track {
        height: var(--ag-slider-height, 18px);
        border-radius: var(--ag-slider-radius, 9px);
        overflow: hidden;
      }
      .slider-style-filled .slider-container input[type=range]::-webkit-slider-thumb {
        width: 0px; height: var(--ag-slider-height, 18px);
        opacity: 0;
        cursor: grab;
      }
      .slider-style-filled .slider-container input[type=range]::-moz-range-track {
        height: var(--ag-slider-height, 18px);
        border-radius: var(--ag-slider-radius, 9px);
        overflow: hidden;
      }
      .slider-style-filled .slider-container input[type=range]::-moz-range-thumb {
        width: 0px; height: var(--ag-slider-height, 18px);
        opacity: 0;
        cursor: grab;
      }

      /* --- SLIDER STYLE 3: THIN MINIMALIST LINE --- */
      .slider-style-thin .slider-container input[type=range]::-webkit-slider-runnable-track {
        height: 4px;
        border-radius: 2px;
      }
      .slider-style-thin .slider-container input[type=range]::-webkit-slider-thumb {
        width: 14px; height: 14px;
        border-radius: 50%;
        margin-top: calc((4px - 14px) / 2);
      }
      .slider-style-thin .slider-container input[type=range]::-moz-range-track {
        height: 4px; border-radius: 2px;
      }
      .slider-style-thin .slider-container input[type=range]::-moz-range-thumb {
        width: 12px; height: 12px;
      }

      /* --- SLIDER STYLE 4: NEON GLOW LASER LINE --- */
      .slider-style-glow .slider-container input[type=range]::-webkit-slider-runnable-track {
        height: var(--ag-slider-height, 8px);
        border-radius: var(--ag-slider-radius, 4px);
        box-shadow: 0 0 12px var(--slider-color, var(--primary-color));
      }
      .slider-style-glow .slider-container input[type=range]::-webkit-slider-thumb {
        width: 18px; height: 18px;
        background: #ffffff;
        border: 2px solid var(--slider-color, var(--primary-color));
        box-shadow: 0 0 12px var(--slider-color, var(--primary-color));
        margin-top: calc((var(--ag-slider-height, 8px) - 18px) / 2);
      }

      /* --- SLIDER STYLE 5: SEGMENTED STEPPED BAR --- */
      .slider-style-segmented .slider-container input[type=range]::-webkit-slider-runnable-track {
        height: var(--ag-slider-height, 14px);
        border-radius: var(--ag-slider-radius, 4px);
        background-image: repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px),
          linear-gradient(
            to right,
            var(--slider-color, var(--primary-color)) 0%,
            var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
            var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
            var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
          );
      }

      /* --- COLOR PICKER --- */
      .color-picker { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: bold; color: var(--secondary-text-color); padding: 0 4px; }
      .color-picker input[type="color"] { border: none; width: 32px; height: 32px; border-radius: 50%; overflow: hidden; cursor: pointer; padding: 0; background: transparent; }
      .color-picker input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
      .color-picker input[type="color"]::-webkit-color-swatch { border: none; border-radius: 50%; }

      /* --- SUB-BUTTONS (1-4) --- */
      .sub-buttons-container { display: flex; gap: var(--ag-sub-button-spacing, 8px); padding-top: var(--ag-sub-btn-container-padding, 8px); border-top: 1px solid var(--divider-color, rgba(150, 150, 150, 0.2)); justify-content: var(--ag-sub-btn-align, flex-end); align-items: center; flex-wrap: wrap; }
      .sub-button { display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 36px; height: auto; padding: var(--ag-sub-button-padding, 6px); border-radius: 50%; background: var(--secondary-background-color, rgba(150,150,150,0.2)); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; gap: 2px; outline: none; }
      .sub-button:hover { filter: brightness(1.15); transform: scale(1.08); }
      .sub-button:active { transform: scale(0.95); }
      .sub-button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }
      .sub-button.no-bg { background: transparent !important; }
      .sub-button[active] { background: var(--primary-color); color: var(--text-primary-color); }
      .sub-button.no-bg[active] { background: transparent !important; color: var(--primary-color) !important; }
      .sub-button.missing { background: var(--error-color, red); color: var(--text-primary-color, white); font-weight: bold; }
      .sub-button-label { font-size: 9px; font-weight: 500; opacity: 0.8; white-space: nowrap; max-width: 48px; overflow: hidden; text-overflow: ellipsis; }
      .sub-button-state { font-size: 8.5px; font-weight: 700; opacity: 0.85; letter-spacing: 0.2px; white-space: nowrap; max-width: 54px; overflow: hidden; text-overflow: ellipsis; }

      .sub-color-picker {
        position: relative;
        overflow: hidden;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .sub-color-picker input[type="color"] {
        position: absolute;
        width: 140%;
        height: 140%;
        top: -20%;
        left: -20%;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        padding: 0;
        background: transparent;
      }
      .sub-color-picker input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
      .sub-color-picker input[type="color"]::-webkit-color-swatch { border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; }

      .sub-button-slider-container {
        min-width: 70px;
        max-width: 110px;
        height: 24px;
        display: flex;
        align-items: center;
      }
      .sub-button-slider-container input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 16px;
        border-radius: 8px;
        background: transparent;
        cursor: grab;
      }
      .sub-button-slider-container input[type="range"]::-webkit-slider-runnable-track {
        height: 14px;
        border-radius: 7px;
        background: linear-gradient(
          to right,
          var(--slider-color, var(--primary-color)) 0%,
          var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
          var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) var(--slider-pct, 100%),
          var(--slider-track-color, var(--divider-color, rgba(150, 150, 150, 0.2))) 100%
        );
      }
      .sub-button-slider-container input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 0px;
        height: 14px;
        opacity: 0;
      }
      /* --- SLIDER STYLE 6: GOOGLE HOME / MATERIAL 3 PILL --- */
      .slider-style-google .slider-container,
      .slider-container.slider-google-wrap {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: var(--ag-slider-height, 42px);
        border-radius: var(--ag-slider-radius, 21px);
        background: var(--slider-track-color, rgba(140, 140, 140, 0.16));
        overflow: hidden;
        box-sizing: border-box;
        transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .slider-style-google .slider-container:focus-within,
      .slider-style-google .slider-container:hover,
      .slider-container.slider-google-wrap:focus-within,
      .slider-container.slider-google-wrap:hover {
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 2px 8px rgba(0, 0, 0, 0.18);
      }
      .slider-style-google .slider-container input[type=range],
      .slider-container.slider-google-wrap input[type=range] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: transparent;
        -webkit-appearance: none;
        appearance: none;
        cursor: grab;
        z-index: 2;
      }
      .slider-style-google .slider-container input[type=range]::-webkit-slider-runnable-track,
      .slider-container.slider-google-wrap input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(
          to right,
          var(--slider-color, var(--primary-color)) 0%,
          var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
          transparent var(--slider-pct, 100%),
          transparent 100%
        );
        transition: background 0.05s ease;
      }
      .slider-style-google .slider-container input[type=range]::-webkit-slider-thumb,
      .slider-container.slider-google-wrap input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 4px;
        height: 24px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
        margin-top: calc((var(--ag-slider-height, 42px) - 24px) / 2);
        cursor: grab;
        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background 0.15s ease;
      }
      .slider-style-google .slider-container input[type=range]:active::-webkit-slider-thumb,
      .slider-container.slider-google-wrap input[type=range]:active::-webkit-slider-thumb {
        cursor: grabbing;
        transform: scaleY(1.25);
        background: #ffffff;
      }
      /* Firefox */
      .slider-style-google .slider-container input[type=range]::-moz-range-track,
      .slider-container.slider-google-wrap input[type=range]::-moz-range-track {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(
          to right,
          var(--slider-color, var(--primary-color)) 0%,
          var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
          transparent var(--slider-pct, 100%),
          transparent 100%
        );
        border: none;
      }
      .slider-style-google .slider-container input[type=range]::-moz-range-thumb,
      .slider-container.slider-google-wrap input[type=range]::-moz-range-thumb {
        width: 4px;
        height: 24px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
        border: none;
        cursor: grab;
      }
      /* Live Percentage / Value Badge Inside Google Slider */
      .slider-percent-badge {
        position: absolute;
        right: 14px;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.3px;
        color: var(--primary-text-color, #ffffff);
        pointer-events: none;
        z-index: 3;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        user-select: none;
        transition: opacity 0.2s ease;
      }

      .sub-button-google-slider {
        position: relative;
        min-width: 85px;
        max-width: 120px;
        height: 28px;
        border-radius: 14px;
        background: var(--slider-track-color, rgba(140, 140, 140, 0.18));
        overflow: hidden;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
      .sub-button-google-slider input[type="range"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: grab;
        z-index: 2;
      }
      .sub-button-google-slider input[type="range"]::-webkit-slider-runnable-track {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(
          to right,
          var(--slider-color, var(--primary-color)) 0%,
          var(--slider-color, var(--primary-color)) var(--slider-pct, 100%),
          transparent var(--slider-pct, 100%),
          transparent 100%
        );
      }
      .sub-button-google-slider input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 3px;
        height: 16px;
        border-radius: 1.5px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        margin-top: calc((28px - 16px) / 2);
      }
      .sub-button-google-slider .sub-slider-pct {
        position: absolute;
        right: 8px;
        font-size: 10px;
        font-weight: 700;
        color: var(--primary-text-color, #ffffff);
        pointer-events: none;
        z-index: 3;
        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
      }
    `;
  }
}
oe([
  Re({ attribute: !1 })
], F.prototype, "hass", 2);
oe([
  Re({ type: Boolean })
], F.prototype, "preview", 2);
oe([
  De()
], F.prototype, "config", 2);
oe([
  De()
], F.prototype, "_collapsed", 2);
oe([
  Lt({ passive: !0 })
], F.prototype, "_handlePointerMove", 1);
oe([
  Lt({ passive: !0 })
], F.prototype, "_handleSubPointerMove", 1);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", F);
customElements.get("antigravity-card") || customElements.define("antigravity-card", F);
export {
  F as AntigravityCard,
  Ii as CARD_VERSION
};
