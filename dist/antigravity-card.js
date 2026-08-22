const nt = globalThis, kt = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ct = Symbol(), Ht = /* @__PURE__ */ new WeakMap();
let ri = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (kt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ht.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ht.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const oi = (l) => new ri(typeof l == "string" ? l : l + "", void 0, Ct), ai = (l, ...e) => {
  const t = l.length === 1 ? l[0] : e.reduce((i, r, a) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + l[a + 1], l[0]);
  return new ri(t, l, Ct);
}, vi = (l, e) => {
  if (kt) l.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = nt.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, l.appendChild(i);
  }
}, Bt = kt ? (l) => l : (l) => l instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return oi(t);
})(l) : l;
const { is: yi, defineProperty: xi, getOwnPropertyDescriptor: wi, getOwnPropertyNames: Si, getOwnPropertySymbols: $i, getPrototypeOf: ki } = Object, dt = globalThis, zt = dt.trustedTypes, Ci = zt ? zt.emptyScript : "", Ti = dt.reactiveElementPolyfillSupport, Ze = (l, e) => l, st = { toAttribute(l, e) {
  switch (e) {
    case Boolean:
      l = l ? Ci : null;
      break;
    case Object:
    case Array:
      l = l == null ? l : JSON.stringify(l);
  }
  return l;
}, fromAttribute(l, e) {
  let t = l;
  switch (e) {
    case Boolean:
      t = l !== null;
      break;
    case Number:
      t = l === null ? null : Number(l);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(l);
      } catch {
        t = null;
      }
  }
  return t;
} }, Tt = (l, e) => !yi(l, e), It = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: Tt };
Symbol.metadata ??= Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Be = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = It) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && xi(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: a } = wi(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const s = r?.call(this);
      a?.call(this, o), this.requestUpdate(e, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? It;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ze("elementProperties"))) return;
    const e = ki(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ze("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ze("properties"))) {
      const t = this.properties, i = [...Si(t), ...$i(t)];
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
      for (const r of i) t.unshift(Bt(r));
    } else e !== void 0 && t.push(Bt(e));
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
    return vi(e, this.constructor.elementStyles), e;
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
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : st).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : st;
      this._$Em = r;
      const s = o.fromAttribute(t, a.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, a) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (a = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? Tt)(a, t) || i.useDefault && i.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: a }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, a] of i) {
        const { wrapped: o } = a, s = this[r];
        o !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, a, s);
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
Be.elementStyles = [], Be.shadowRootOptions = { mode: "open" }, Be[Ze("elementProperties")] = /* @__PURE__ */ new Map(), Be[Ze("finalized")] = /* @__PURE__ */ new Map(), Ti?.({ ReactiveElement: Be }), (dt.reactiveElementVersions ??= []).push("2.1.2");
const Mt = globalThis, Ft = (l) => l, lt = Mt.trustedTypes, Ot = lt ? lt.createPolicy("lit-html", { createHTML: (l) => l }) : void 0, ni = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, si = "?" + ae, Mi = `<${si}>`, ge = document, Qe = () => ge.createComment(""), je = (l) => l === null || typeof l != "object" && typeof l != "function", At = Array.isArray, Ai = (l) => At(l) || typeof l?.[Symbol.iterator] == "function", bt = `[ 	
\f\r]`, qe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ut = /-->/g, Gt = />/g, he = RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Wt = /"/g, li = /^(?:script|style|textarea|title)$/i, Pi = (l) => (e, ...t) => ({ _$litType$: l, strings: e, values: t }), S = Pi(1), me = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), pe = ge.createTreeWalker(ge, 129);
function ci(l, e) {
  if (!At(l) || !l.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ot !== void 0 ? Ot.createHTML(e) : e;
}
const Ei = (l, e) => {
  const t = l.length - 1, i = [];
  let r, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = qe;
  for (let s = 0; s < t; s++) {
    const u = l[s];
    let p, d, n = -1, _ = 0;
    for (; _ < u.length && (o.lastIndex = _, d = o.exec(u), d !== null); ) _ = o.lastIndex, o === qe ? d[1] === "!--" ? o = Ut : d[1] !== void 0 ? o = Gt : d[2] !== void 0 ? (li.test(d[2]) && (r = RegExp("</" + d[2], "g")), o = he) : d[3] !== void 0 && (o = he) : o === he ? d[0] === ">" ? (o = r ?? qe, n = -1) : d[1] === void 0 ? n = -2 : (n = o.lastIndex - d[2].length, p = d[1], o = d[3] === void 0 ? he : d[3] === '"' ? Wt : Vt) : o === Wt || o === Vt ? o = he : o === Ut || o === Gt ? o = qe : (o = he, r = void 0);
    const g = o === he && l[s + 1].startsWith("/>") ? " " : "";
    a += o === qe ? u + Mi : n >= 0 ? (i.push(p), u.slice(0, n) + ni + u.slice(n) + ae + g) : u + ae + (n === -2 ? s : g);
  }
  return [ci(l, a + (l[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class et {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let a = 0, o = 0;
    const s = e.length - 1, u = this.parts, [p, d] = Ei(e, t);
    if (this.el = et.createElement(p, i), pe.currentNode = this.el.content, t === 2 || t === 3) {
      const n = this.el.content.firstChild;
      n.replaceWith(...n.childNodes);
    }
    for (; (r = pe.nextNode()) !== null && u.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const n of r.getAttributeNames()) if (n.endsWith(ni)) {
          const _ = d[o++], g = r.getAttribute(n).split(ae), y = /([.?@])?(.*)/.exec(_);
          u.push({ type: 1, index: a, name: y[2], strings: g, ctor: y[1] === "." ? Li : y[1] === "?" ? Di : y[1] === "@" ? Ri : ut }), r.removeAttribute(n);
        } else n.startsWith(ae) && (u.push({ type: 6, index: a }), r.removeAttribute(n));
        if (li.test(r.tagName)) {
          const n = r.textContent.split(ae), _ = n.length - 1;
          if (_ > 0) {
            r.textContent = lt ? lt.emptyScript : "";
            for (let g = 0; g < _; g++) r.append(n[g], Qe()), pe.nextNode(), u.push({ type: 2, index: ++a });
            r.append(n[_], Qe());
          }
        }
      } else if (r.nodeType === 8) if (r.data === si) u.push({ type: 2, index: a });
      else {
        let n = -1;
        for (; (n = r.data.indexOf(ae, n + 1)) !== -1; ) u.push({ type: 7, index: a }), n += ae.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = ge.createElement("template");
    return i.innerHTML = e, i;
  }
}
function Fe(l, e, t = l, i) {
  if (e === me) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const a = je(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(l), r._$AT(l, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = Fe(l, r._$AS(l, e.values), r, i)), e;
}
class Ni {
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
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? ge).importNode(t, !0);
    pe.currentNode = r;
    let a = pe.nextNode(), o = 0, s = 0, u = i[0];
    for (; u !== void 0; ) {
      if (o === u.index) {
        let p;
        u.type === 2 ? p = new Oe(a, a.nextSibling, this, e) : u.type === 1 ? p = new u.ctor(a, u.name, u.strings, this, e) : u.type === 6 && (p = new Hi(a, this, e)), this._$AV.push(p), u = i[++s];
      }
      o !== u?.index && (a = pe.nextNode(), o++);
    }
    return pe.currentNode = ge, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class Oe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = Fe(this, e, t), je(e) ? e === x || e == null || e === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : e !== this._$AH && e !== me && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ai(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== x && je(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ge.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = et.createElement(ci(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const a = new Ni(r, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Yt.get(e.strings);
    return t === void 0 && Yt.set(e.strings, t = new et(e)), t;
  }
  k(e) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const a of e) r === t.length ? t.push(i = new Oe(this.O(Qe()), this.O(Qe()), this, this.options)) : i = t[r], i._$AI(a), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = Ft(e).nextSibling;
      Ft(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ut {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, a) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = x;
  }
  _$AI(e, t = this, i, r) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = Fe(this, e, t, 0), o = !je(e) || e !== this._$AH && e !== me, o && (this._$AH = e);
    else {
      const s = e;
      let u, p;
      for (e = a[0], u = 0; u < a.length - 1; u++) p = Fe(this, s[i + u], t, u), p === me && (p = this._$AH[u]), o ||= !je(p) || p !== this._$AH[u], p === x ? e = x : e !== x && (e += (p ?? "") + a[u + 1]), this._$AH[u] = p;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Li extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === x ? void 0 : e;
  }
}
class Di extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== x);
  }
}
class Ri extends ut {
  constructor(e, t, i, r, a) {
    super(e, t, i, r, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Fe(this, e, t, 0) ?? x) === me) return;
    const i = this._$AH, r = e === x && i !== x || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== x && (i === x || r);
    r && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Hi = class {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Fe(this, e);
  }
};
const Bi = { I: Oe }, zi = Mt.litHtmlPolyfillSupport;
zi?.(et, Oe), (Mt.litHtmlVersions ??= []).push("3.3.3");
const Ii = (l, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const a = t?.renderBefore ?? null;
    i._$litPart$ = r = new Oe(e.insertBefore(Qe(), a), a, void 0, t ?? {});
  }
  return r._$AI(l), r;
};
const Pt = globalThis;
let Ie = class extends Be {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ii(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return me;
  }
};
Ie._$litElement$ = !0, Ie.finalized = !0, Pt.litElementHydrateSupport?.({ LitElement: Ie });
const Fi = Pt.litElementPolyfillSupport;
Fi?.({ LitElement: Ie });
(Pt.litElementVersions ??= []).push("4.2.2");
const Oi = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: Tt }, Ui = (l = Oi, e, t) => {
  const { kind: i, metadata: r } = t;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), i === "setter" && ((l = Object.create(l)).wrapped = !0), a.set(t.name, l), i === "accessor") {
    const { name: o } = t;
    return { set(s) {
      const u = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(o, u, l, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(o, void 0, l, s), s;
    } };
  }
  if (i === "setter") {
    const { name: o } = t;
    return function(s) {
      const u = this[o];
      e.call(this, s), this.requestUpdate(o, u, l, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ht(l) {
  return (e, t) => typeof t == "object" ? Ui(l, e, t) : ((i, r, a) => {
    const o = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, i), o ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(l, e, t);
}
function _t(l) {
  return ht({ ...l, state: !0, attribute: !1 });
}
function di(l) {
  return (e, t) => {
    const i = typeof e == "function" ? e : e[t];
    Object.assign(i, l);
  };
}
const Gi = { CHILD: 2 }, Vi = (l) => (...e) => ({ _$litDirective$: l, values: e });
let Wi = class {
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
const { I: Yi } = Bi, Xt = (l) => l, qt = () => document.createComment(""), Ke = (l, e, t) => {
  const i = l._$AA.parentNode, r = e === void 0 ? l._$AB : e._$AA;
  if (t === void 0) {
    const a = i.insertBefore(qt(), r), o = i.insertBefore(qt(), r);
    t = new Yi(a, o, l, l.options);
  } else {
    const a = t._$AB.nextSibling, o = t._$AM, s = o !== l;
    if (s) {
      let u;
      t._$AQ?.(l), t._$AM = l, t._$AP !== void 0 && (u = l._$AU) !== o._$AU && t._$AP(u);
    }
    if (a !== r || s) {
      let u = t._$AA;
      for (; u !== a; ) {
        const p = Xt(u).nextSibling;
        Xt(i).insertBefore(u, r), u = p;
      }
    }
  }
  return t;
}, _e = (l, e, t = l) => (l._$AI(e, t), l), Xi = {}, qi = (l, e = Xi) => l._$AH = e, Ki = (l) => l._$AH, vt = (l) => {
  l._$AR(), l._$AA.remove();
};
const Kt = (l, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) i.set(l[r], r);
  return i;
}, Ji = Vi(class extends Wi {
  constructor(l) {
    if (super(l), l.type !== Gi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(l, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const r = [], a = [];
    let o = 0;
    for (const s of l) r[o] = i ? i(s, o) : o, a[o] = t(s, o), o++;
    return { values: a, keys: r };
  }
  render(l, e, t) {
    return this.dt(l, e, t).values;
  }
  update(l, [e, t, i]) {
    const r = Ki(l), { values: a, keys: o } = this.dt(e, t, i);
    if (!Array.isArray(r)) return this.ut = o, a;
    const s = this.ut ??= [], u = [];
    let p, d, n = 0, _ = r.length - 1, g = 0, y = a.length - 1;
    for (; n <= _ && g <= y; ) if (r[n] === null) n++;
    else if (r[_] === null) _--;
    else if (s[n] === o[g]) u[g] = _e(r[n], a[g]), n++, g++;
    else if (s[_] === o[y]) u[y] = _e(r[_], a[y]), _--, y--;
    else if (s[n] === o[y]) u[y] = _e(r[n], a[y]), Ke(l, u[y + 1], r[n]), n++, y--;
    else if (s[_] === o[g]) u[g] = _e(r[_], a[g]), Ke(l, r[n], r[_]), _--, g++;
    else if (p === void 0 && (p = Kt(o, g, y), d = Kt(s, n, _)), p.has(s[n])) if (p.has(s[_])) {
      const m = d.get(o[g]), b = m !== void 0 ? r[m] : null;
      if (b === null) {
        const c = Ke(l, r[n]);
        _e(c, a[g]), u[g] = c;
      } else u[g] = _e(b, a[g]), Ke(l, r[n], b), r[m] = null;
      g++;
    } else vt(r[_]), _--;
    else vt(r[n]), n++;
    for (; g <= y; ) {
      const m = Ke(l, u[y + 1]);
      _e(m, a[g]), u[g++] = m;
    }
    for (; n <= _; ) {
      const m = r[n++];
      m !== null && vt(m);
    }
    return this.ut = o, qi(l, u), me;
  }
});
var Jt, Zt;
(function(l) {
  l.language = "language", l.system = "system", l.comma_decimal = "comma_decimal", l.decimal_comma = "decimal_comma", l.space_comma = "space_comma", l.none = "none";
})(Jt || (Jt = {})), function(l) {
  l.language = "language", l.system = "system", l.am_pm = "12", l.twenty_four = "24";
}(Zt || (Zt = {}));
function Zi(l) {
  return l.substr(0, l.indexOf("."));
}
var Qi = ["closed", "locked", "off"], tt = function(l, e, t, i) {
  i = i || {}, t = t ?? {};
  var r = new Event(e, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return r.detail = t, l.dispatchEvent(r), r;
}, Je = function(l) {
  tt(window, "haptic", l);
}, ji = function(l, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), tt(window, "location-changed", { replace: t });
}, er = function(l, e, t) {
  t === void 0 && (t = !0);
  var i, r = Zi(e), a = r === "group" ? "homeassistant" : r;
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
  return l.callService(a, i, { entity_id: e });
}, tr = function(l, e) {
  var t = Qi.includes(l.states[e].state);
  return er(l, e, t);
}, ir = function(l, e, t, i) {
  if (i || (i = { action: "more-info" }), !i.confirmation || i.confirmation.exemptions && i.confirmation.exemptions.some(function(a) {
    return a.user === e.user.id;
  }) || (Je("warning"), confirm(i.confirmation.text || "Are you sure you want to " + i.action + "?"))) switch (i.action) {
    case "more-info":
      (t.entity || t.camera_image) && tt(l, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      i.navigation_path && ji(0, i.navigation_path);
      break;
    case "url":
      i.url_path && window.open(i.url_path);
      break;
    case "toggle":
      t.entity && (tr(e, t.entity), Je("success"));
      break;
    case "call-service":
      if (!i.service) return void Je("failure");
      var r = i.service.split(".", 2);
      e.callService(r[0], r[1], i.service_data, i.target), Je("success");
      break;
    case "fire-dom-event":
      tt(l, "ll-custom", i);
  }
}, rr = function(l, e, t, i) {
  var r;
  i === "double_tap" && t.double_tap_action ? r = t.double_tap_action : i === "hold" && t.hold_action ? r = t.hold_action : i === "tap" && t.tap_action && (r = t.tap_action), ir(l, e, t, r);
};
const St = {
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
  slider_height: 11,
  slider_border_radius: 5,
  slider_start_offset: 0,
  slider_end_offset: 0,
  slider_spacing: 8,
  show_slider: !1,
  hide_slider_when_off: !0,
  // Light color and temperature sliders
  show_color_temp: !0,
  hide_color_temp_when_off: !0,
  color_temp_type: "gradient",
  color_temp_height: 12,
  color_temp_border_radius: 5,
  color_temp_start_offset: 0,
  color_temp_end_offset: 0,
  show_color_picker: !1,
  hide_color_picker_when_off: !0,
  show_color_slider: !0,
  hide_color_slider_when_off: !0,
  color_slider_height: 12,
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
  overflow_hidden: !1,
  visibility_state: "always",
  layout: "horizontal",
  card_layout: "normal",
  primary_info: "name",
  secondary_info: "last-updated",
  font_size_primary: 14,
  font_size_secondary: 15,
  font_weight_primary: "800",
  text_color_primary: "rgb(255, 255, 255)",
  text_color_secondary: "rgb(255, 255, 255)",
  text_scrolling_primary: "none",
  text_scrolling_secondary: "none",
  text_scrolling_speed: 10,
  text_transform_primary: "capitalize",
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
  text_offset_x: -28,
  text_offset_y: 2,
  primary_text_offset_x: 0,
  primary_text_offset_y: 0,
  primary_text_start_offset: 8,
  primary_text_end_offset: 250,
  secondary_text_offset_x: 0,
  secondary_text_offset_y: 0,
  secondary_text_start_offset: 8,
  secondary_text_end_offset: 250,
  features_offset_x: 0,
  features_offset_y: 0,
  // Box shadow and blur
  box_shadow: "none",
  backdrop_blur: 0,
  transition_duration: 1e4,
  // Actions
  tap_action: { action: "toggle" },
  hold_action: { action: "more-info" }
}, Qt = {
  default: {
    name: "default",
    label: "Default (Card Colors)",
    cssClass: "theme-default",
    generateStyles: () => ""
  },
  glassmorphism: {
    name: "glassmorphism",
    label: "Frosted Glassmorphism",
    cssClass: "theme-glassmorphism",
    generateStyles: (l) => {
      const e = l.glassmorphism_blur ?? 16, t = l.glassmorphism_opacity ?? 0.25;
      return `
        --theme-backdrop-filter: blur(${e}px);
        --theme-background: rgba(255, 255, 255, ${t});
        --theme-border: 1px solid rgba(255, 255, 255, 0.2);
        --theme-box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
      `;
    }
  },
  neumorphism: {
    name: "neumorphism",
    label: "Soft Neumorphism",
    cssClass: "theme-neumorphism",
    generateStyles: (l) => {
      const e = l.neumorphism_depth ?? 6;
      return `
        --theme-background: var(--card-background-color, #e0e5ec);
        --theme-box-shadow: ${e}px ${e}px ${e * 2}px rgba(163, 177, 198, 0.6),
                            -${e}px -${e}px ${e * 2}px rgba(255, 255, 255, 0.8);
        --theme-border: none;
      `;
    }
  },
  cyberpunk: {
    name: "cyberpunk",
    label: "Cyberpunk Neon",
    cssClass: "theme-cyberpunk",
    generateStyles: (l) => {
      const e = l.cyberpunk_glow ?? "#00f0ff";
      return `
        --theme-background: #0d0f18;
        --theme-border: 2px solid ${e};
        --theme-box-shadow: 0 0 15px ${e}44, inset 0 0 10px ${e}22;
        --primary-text-color: #00f0ff;
        --secondary-text-color: #ff003c;
      `;
    }
  },
  aurora: {
    name: "aurora",
    label: "Nordic Aurora",
    cssClass: "theme-aurora",
    generateStyles: () => `
      --theme-background: linear-gradient(135deg, rgba(32, 78, 95, 0.8), rgba(67, 154, 134, 0.7), rgba(164, 219, 178, 0.6));
      --theme-backdrop-filter: blur(20px);
      --theme-border: 1px solid rgba(255, 255, 255, 0.3);
      --primary-text-color: #ffffff;
      --secondary-text-color: rgba(255, 255, 255, 0.85);
    `
  },
  oled: {
    name: "oled",
    label: "OLED Pitch Black",
    cssClass: "theme-oled",
    generateStyles: () => `
      --theme-background: #000000;
      --theme-border: 1px solid #1f1f1f;
      --theme-box-shadow: none;
      --primary-text-color: #ffffff;
      --secondary-text-color: #888888;
    `
  },
  sunset: {
    name: "sunset",
    label: "Sunset Gradient",
    cssClass: "theme-sunset",
    generateStyles: () => `
      --theme-background: linear-gradient(135deg, #ff512f, #dd2476);
      --theme-border: none;
      --theme-box-shadow: 0 10px 20px rgba(221, 36, 118, 0.3);
      --primary-text-color: #ffffff;
      --secondary-text-color: rgba(255, 255, 255, 0.9);
    `
  },
  flat: {
    name: "flat",
    label: "Minimal Flat",
    cssClass: "theme-flat",
    generateStyles: () => `
      --theme-background: var(--card-background-color, #242424);
      --theme-border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
      --theme-box-shadow: none;
    `
  },
  material_you: {
    name: "material_you",
    label: "Material You Pill",
    cssClass: "theme-material-you",
    generateStyles: () => `
      --theme-background: var(--primary-color-light, rgba(98, 0, 234, 0.12));
      --theme-border: none;
      --theme-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      --ha-card-border-radius: 28px;
    `
  },
  retro_synth: {
    name: "retro_synth",
    label: "80s Synthwave",
    cssClass: "theme-retro-synth",
    generateStyles: () => `
      --theme-background: linear-gradient(180deg, #2b1055, #7597de);
      --theme-border: 2px solid #ff007f;
      --theme-box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
      --primary-text-color: #ffe6ff;
      --secondary-text-color: #00ffff;
    `
  },
  minimal: {
    name: "minimal",
    label: "Minimalist Clean",
    cssClass: "theme-minimal",
    generateStyles: () => `
      --theme-background: transparent;
      --theme-border: none;
      --theme-box-shadow: none;
    `
  },
  custom: {
    name: "custom",
    label: "Custom Styling",
    cssClass: "theme-custom",
    generateStyles: () => ""
  }
}, Nt = class Nt {
  /**
   * Sanitize custom styles string to reject tag breakouts and script tags.
   */
  static sanitizeCustomStyles(e) {
    return !e || typeof e != "string" ? "" : /<\/?(script|style|iframe|object|embed)/i.test(e) ? (console.warn("[Antigravity] custom_styles contains invalid HTML tags. Ignored for security."), "") : e;
  }
  /**
   * Precompute static style strings on configuration changes with memoization.
   */
  static computeStaticStyles(e) {
    if (!e)
      return {
        staticCardStyles: "",
        staticCardClasses: "ha-card",
        textOffsetStyle: "",
        primaryTextOffsetStyle: "",
        secondaryTextOffsetStyle: "",
        featuresOffsetStyle: "",
        mainSliderMarginOffsets: "",
        colorTempMarginOffsets: "",
        colorHueMarginOffsets: "",
        textBoxWidth: "width: 100%; max-width: 100%;",
        primaryTextStyle: "",
        secondaryTextStyle: ""
      };
    const t = [
      e.theme_preset,
      e.card_padding,
      e.card_padding_vertical,
      e.card_padding_horizontal,
      e.card_margin,
      e.border_radius,
      e.slider_style,
      e.slider_height,
      e.slider_border_radius,
      e.content_spacing,
      e.text_spacing,
      e.features_margin,
      e.sub_button_spacing,
      e.sub_button_padding,
      e.text_offset_x,
      e.text_offset_y,
      e.primary_text_start_offset,
      e.primary_text_end_offset,
      e.secondary_text_start_offset,
      e.secondary_text_end_offset,
      e.font_size_primary,
      e.font_size_secondary,
      e.font_weight_primary,
      e.letter_spacing,
      e.line_height,
      e.layout,
      e.card_layout,
      e.full_slider_opacity,
      e.text_color_mode,
      e.hover_effect
    ].join("|");
    if (this._computedStylesCache.has(t))
      return this._computedStylesCache.get(t);
    const i = e.card_padding_vertical ?? e.card_padding ?? 0, r = e.card_padding_horizontal ?? e.card_padding ?? 15, a = e.card_padding_top ?? i, o = e.card_padding_bottom ?? i, s = e.card_padding_left ?? r, u = e.card_padding_right ?? r, p = e.card_margin ?? -1, d = e.card_margin_vertical ?? p, n = e.card_margin_horizontal ?? p, _ = e.card_margin_top ?? d, g = e.card_margin_bottom ?? d, y = e.card_margin_left ?? n, m = e.card_margin_right ?? n;
    let b = "";
    (_ !== void 0 || g !== void 0 || y !== void 0 || m !== void 0) && (b = `margin: ${_ ?? 0}px ${m ?? 0}px ${g ?? 0}px ${y ?? 0}px;`);
    const c = e.border_radius ?? 12, h = e.slider_style === "google", f = e.slider_style === "full", v = h ? 42 : f ? 40 : 12, w = e.slider_height !== void 0 ? e.slider_height : v, $ = h ? 21 : f ? 0 : w / 2, M = e.slider_border_radius !== void 0 ? e.slider_border_radius : $, T = e.card_border_width ?? (e.card_border_color ? 1 : 0), C = e.card_border_style ?? "solid", k = T > 0 ? `border: ${T}px ${C} ${e.card_border_color || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", z = e.card_width ? `width: ${e.card_width};` : "", Y = e.card_max_width ? `max-width: ${e.card_max_width};` : "", j = e.card_height ? `height: ${e.card_height};` : "", X = e.card_min_height !== void 0 ? `min-height: ${e.card_min_height}px;` : "", se = e.fill_container === !0 ? "height: 100%; width: 100%;" : "", be = e.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", ve = e.backdrop_blur !== void 0 ? `backdrop-filter: blur(${e.backdrop_blur}px); -webkit-backdrop-filter: blur(${e.backdrop_blur}px);` : "", ye = e.card_opacity !== void 0 ? `opacity: ${e.card_opacity / 100};` : "", G = e.transition_duration !== void 0 ? `transition: all ${e.transition_duration}ms ease;` : "", xe = e.card_padding_vertical ?? 0, we = e.card_padding_horizontal ?? 0, Se = 0, $e = 0, ke = e.sub_button_padding ?? 6, Ce = e.sub_button_container_padding ?? 0, Ge = e.sub_button_alignment ? `--ag-sub-button-alignment: ${e.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", Te = e.text_scrolling_speed ? `--ag-scroll-speed: ${e.text_scrolling_speed}s;` : "", Me = e.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${e.full_slider_opacity / 100};` : "", E = e.theme_preset || "default", q = Qt[E] || Qt.default, le = q.generateStyles(e), I = [
      b,
      `border-radius: ${c}px;`,
      k,
      z,
      Y,
      j,
      X,
      se,
      be,
      ve,
      ye,
      G,
      `--ag-card-padding: ${a}px ${u}px ${o}px ${s}px;`,
      `--ag-text-padding: ${xe}px ${we}px;`,
      `--ag-features-padding: ${Se}px ${$e}px;`,
      `--ag-sub-button-padding: ${ke}px;`,
      `--ag-sub-button-container-padding: ${Ce}px;`,
      `--ag-content-spacing: ${e.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${e.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${e.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${e.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${e.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${w}px;`,
      `--ag-slider-radius: ${M}px;`,
      `--ag-text-alignment: ${e.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${e.content_alignment ?? "flex-start"};`,
      Ge,
      Te,
      Me,
      le
    ].filter(Boolean).join(" ").trim(), ce = [
      "ha-card",
      q.cssClass,
      `layout-${e.layout || "default"}`,
      e.card_layout === "large" ? "card-large" : "",
      `hover-${e.hover_effect ?? "glow"}`,
      `slider-style-${e.slider_style ?? "circle"}`,
      e.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" "), F = Number(e.text_offset_x) || -28, Ae = Number(e.text_offset_y) || 2, H = `transform: translate(${F}px, ${Ae}px);`, ee = Number(e.primary_text_start_offset ?? e.primary_text_offset_x) || 8, Pe = Number(e.primary_text_end_offset) || 250, de = Number(e.primary_text_offset_y) || 0, Ee = ee !== 0 || de !== 0 ? `transform: translate(${ee}px, ${de}px);` : "", Ne = ee !== 0 || Pe !== 0 ? `margin-left: ${ee}px; margin-right: ${Pe}px;` : "", Le = `${Ee} ${Ne}`.trim(), K = Number(e.secondary_text_start_offset ?? e.secondary_text_offset_x) || 8, J = Number(e.secondary_text_end_offset) || 250, B = Number(e.secondary_text_offset_y) || 0, O = K !== 0 || B !== 0 ? `transform: translate(${K}px, ${B}px);` : "", Ve = K !== 0 || J !== 0 ? `margin-left: ${K}px; margin-right: ${J}px;` : "", We = `${O} ${Ve}`.trim(), te = Number(e.features_offset_x) || 0, ie = Number(e.features_offset_y) || 0, De = te !== 0 || ie !== 0 ? `transform: translate(${te}px, ${ie}px);` : "", re = Number(e.slider_start_offset) || 0, ue = Number(e.slider_end_offset) || 0, P = [
      re ? `margin-left: ${re}px !important;` : "",
      ue ? `margin-right: ${ue}px !important;` : ""
    ].filter(Boolean).join(" "), U = Number(e.color_temp_start_offset) || 0, A = Number(e.color_temp_end_offset) || 0, V = [
      U ? `margin-left: ${U}px !important;` : "",
      A ? `margin-right: ${A}px !important;` : ""
    ].filter(Boolean).join(" "), Re = Number(e.color_slider_start_offset) || 0, oe = Number(e.color_slider_end_offset) || 0, ft = [
      Re ? `margin-left: ${Re}px !important;` : "",
      oe ? `margin-right: ${oe}px !important;` : ""
    ].filter(Boolean).join(" "), Ye = e.text_box_width ? `max-width: ${e.text_box_width}; width: ${e.text_box_width};` : "width: 100%; max-width: 100%;", gt = e.font_family_primary ? `font-family: ${e.font_family_primary};` : "", mt = `font-size: ${e.font_size_primary ?? 14}px;`, rt = `font-weight: ${e.font_weight_primary ?? "800"};`, Lt = `text-transform: ${e.text_transform_primary ?? "capitalize"};`, Xe = `letter-spacing: ${e.letter_spacing ?? -0.5}px;`, Dt = `line-height: ${e.line_height ?? 1.1};`, _i = `${gt} ${mt} ${rt} ${Lt} ${Xe} ${Dt}`.trim(), pi = e.font_family_secondary ? `font-family: ${e.font_family_secondary};` : "", fi = `font-size: ${e.font_size_secondary ?? 15}px;`, gi = e.font_weight_secondary ? `font-weight: ${e.font_weight_secondary};` : "", mi = `text-transform: ${e.text_transform_secondary ?? "capitalize"};`, bi = `${pi} ${fi} ${gi} ${mi} ${Xe} ${Dt}`.trim(), Rt = {
      staticCardStyles: I,
      staticCardClasses: ce,
      textOffsetStyle: H,
      primaryTextOffsetStyle: Le,
      secondaryTextOffsetStyle: We,
      featuresOffsetStyle: De,
      mainSliderMarginOffsets: P,
      colorTempMarginOffsets: V,
      colorHueMarginOffsets: ft,
      textBoxWidth: Ye,
      primaryTextStyle: _i,
      secondaryTextStyle: bi
    };
    return this._computedStylesCache.set(t, Rt), Rt;
  }
};
Nt._computedStylesCache = /* @__PURE__ */ new Map();
let $t = Nt;
class or {
  constructor() {
    this._activeCardInstances = /* @__PURE__ */ new Set(), this._peakMemoryMB = 0, this._isLogging = !1;
  }
  registerCard(e) {
    this._activeCardInstances.add(e), this._updatePeakMemory();
  }
  unregisterCard(e) {
    this._activeCardInstances.delete(e);
  }
  getActiveCardCount() {
    return this._activeCardInstances.size;
  }
  _updatePeakMemory() {
    const e = performance?.memory;
    if (e?.usedJSHeapSize) {
      const t = Number((e.usedJSHeapSize / 1048576).toFixed(2));
      t > this._peakMemoryMB && (this._peakMemoryMB = t);
    }
  }
  getMemorySnapshot() {
    this._updatePeakMemory();
    const e = performance?.memory, t = {
      activeCardsCount: this._activeCardInstances.size,
      peakJSHeapSizeMB: this._peakMemoryMB > 0 ? this._peakMemoryMB : void 0,
      timestamp: Date.now()
    };
    return e && (t.usedJSHeapSizeMB = Number((e.usedJSHeapSize / (1024 * 1024)).toFixed(2)), t.totalJSHeapSizeMB = Number((e.totalJSHeapSize / (1024 * 1024)).toFixed(2)), t.jsHeapSizeLimitMB = Number((e.jsHeapSizeLimit / (1024 * 1024)).toFixed(2))), t;
  }
  enableDebugLogging(e = !0) {
    this._isLogging = e;
  }
  logStatus() {
    if (!this._isLogging) return;
    const e = this.getMemorySnapshot();
    e.usedJSHeapSizeMB !== void 0 && console.info(
      `%c 🧠 ANTIGRAVITY MEMORY %c ${e.usedJSHeapSizeMB}MB / ${e.totalJSHeapSizeMB}MB (Peak: ${e.peakJSHeapSizeMB ?? e.usedJSHeapSizeMB}MB, Active Cards: ${e.activeCardsCount}) `,
      "color: white; background: #00897b; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
      "color: #00897b; background: #e0f2f1; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
    );
  }
}
const ct = new or();
class ar {
  constructor() {
    this._battery = null, this._isLowPower = !1, this._listeners = /* @__PURE__ */ new Set(), this._onChargingChange = null, this._onLevelChange = null, this._onConnectionChange = null, this._initBattery(), this._initSaveDataListener();
  }
  async _initBattery() {
    if (typeof navigator < "u" && "getBattery" in navigator)
      try {
        this._battery = await navigator.getBattery(), this._updatePowerState(), this._onChargingChange = () => {
          this._updatePowerState(), this._notifyListeners();
        }, this._onLevelChange = () => {
          this._updatePowerState(), this._notifyListeners();
        }, this._battery.addEventListener("chargingchange", this._onChargingChange), this._battery.addEventListener("levelchange", this._onLevelChange);
      } catch {
      }
  }
  _initSaveDataListener() {
    if (typeof navigator < "u" && navigator.connection) {
      const e = navigator.connection;
      e.saveData && (this._isLowPower = !0), this._onConnectionChange = () => {
        e.saveData && (this._isLowPower = !0, this._notifyListeners());
      }, e.addEventListener?.("change", this._onConnectionChange);
    }
  }
  _updatePowerState() {
    if (!this._battery) return;
    const e = !this._battery.charging && this._battery.level < 0.2, t = navigator?.connection?.saveData === !0;
    this._isLowPower = e || t;
  }
  addChangeListener(e) {
    return this._listeners.add(e), () => this._listeners.delete(e);
  }
  get listenerCount() {
    return this._listeners.size;
  }
  _notifyListeners() {
    for (const e of this._listeners)
      try {
        e();
      } catch (t) {
        console.error("Error in power listener:", t);
      }
    typeof window < "u" && window.dispatchEvent(new CustomEvent("antigravity-power-change", {
      detail: { isLowPower: this._isLowPower }
    }));
  }
  /**
   * Determine if power save mode should be active.
   * Considers hardware battery level, saveData headers, and HA helper state.
   */
  isPowerSaveActive(e) {
    return e?.states?.["input_boolean.antigravity_power_save"]?.state === "on" ? !0 : this._isLowPower;
  }
  /**
   * Get recommended animation throttle limit in ms.
   * Returns 16ms (~60fps) in normal mode, or 33ms (~30fps) in power-save mode.
   */
  getTargetFrameIntervalMs(e) {
    return this.isPowerSaveActive(e) ? 33 : 16;
  }
  /**
   * For testing or manual override
   */
  setMockLowPower(e) {
    this._isLowPower = e, this._notifyListeners();
  }
  /**
   * Cleanup global listeners upon teardown
   */
  destroy() {
    this._battery && (this._onChargingChange && this._battery.removeEventListener("chargingchange", this._onChargingChange), this._onLevelChange && this._battery.removeEventListener("levelchange", this._onLevelChange)), typeof navigator < "u" && navigator.connection && this._onConnectionChange && navigator.connection.removeEventListener?.("change", this._onConnectionChange), this._listeners.clear();
  }
}
const fe = new ar(), nr = {
  preserveDrawingBuffer: !1,
  powerPreference: "low-power",
  alpha: !0,
  antialias: !1,
  depth: !1,
  stencil: !1
};
function sr(l, e = nr) {
  try {
    const t = l.getContext("webgl2", e) || l.getContext("webgl", e) || l.getContext("experimental-webgl", e);
    return t ? (t.getExtension("ANGLE_instanced_arrays"), t.getExtension("EXT_color_buffer_half_float"), t.getExtension("OES_texture_half_float"), l.addEventListener("webglcontextlost", (i) => {
      i.preventDefault(), console.warn("Antigravity WebGL context lost");
    }, { passive: !1 }), l.addEventListener("webglcontextrestored", () => {
      console.info("Antigravity WebGL context restored");
    }, { passive: !0 }), t) : null;
  } catch (t) {
    return console.warn("WebGL init failed:", t), null;
  }
}
function ui(l) {
  if (l)
    try {
      const e = l.getParameter(l.MAX_VERTEX_ATTRIBS) || 16;
      for (let t = 0; t < e; ++t)
        l.disableVertexAttribArray(t);
      l.bindBuffer(l.ARRAY_BUFFER, null), l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, null), l.bindRenderbuffer(l.RENDERBUFFER, null), l.bindFramebuffer(l.FRAMEBUFFER, null);
    } catch (e) {
      console.warn("WebGL cleanup warning:", e);
    }
}
async function hi() {
  const l = performance.now();
  let e = 0, t = 0;
  const i = (y, m) => {
    t++, y ? e++ : console.error(`❌ Assertion failed: ${m}`);
  }, r = ct.getMemorySnapshot();
  i(r.activeCardsCount >= 0, "Memory tracker active card count is non-negative");
  let a = !1;
  if (typeof document < "u") {
    const y = document.createElement("canvas"), m = sr(y);
    m && (a = !0, i(m.getParameter(m.MAX_VERTEX_ATTRIBS) > 0, "WebGL attributes available"), ui(m));
  }
  const o = 1e3;
  let s = 0;
  for (let y = 0; y < o; y++) {
    const m = performance.now();
    s += performance.now() - m;
  }
  const u = Number((s / o).toFixed(4));
  i(u < 0.1, "Benchmark iteration takes under 0.1ms");
  const p = fe.isPowerSaveActive(), d = fe.getTargetFrameIntervalMs();
  i(d === 16 || d === 33, "Frame target is either 16ms or 33ms");
  const n = performance.now() - l, _ = e === t, g = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: typeof navigator < "u" ? navigator.userAgent : "Node/Test",
    renderBenchmarkMs: u,
    memoryUsageMB: r.usedJSHeapSizeMB || 0,
    powerSaveModeActive: p,
    webglSupported: a,
    assertionsPassed: e,
    totalAssertions: t,
    passed: _
  };
  return console.info(
    `%c 🧪 ANTIGRAVITY CI RUNNER %c Passed ${e}/${t} | Benchmark: ${u}ms/op | Duration: ${n.toFixed(2)}ms `,
    "color: white; background: #2e7d32; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
    "color: #2e7d32; background: #e8f5e9; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
  ), g;
}
typeof window < "u" && window.__RUN_CI__ && hi();
const lr = ai`
  :host {
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  :host([hidden]),
  :host([offscreen]) *,
  :host([offscreen]) .anim-spin,
  :host([offscreen]) .anim-bounce,
  :host([offscreen]) .pulse,
  :host([offscreen]) .scroll-content {
    animation-play-state: paused !important;
  }
  :host([power-save]) {
    --ag-transition-speed: 0.1s;
  }
  :host([power-save]) .pulse,
  :host([power-save]) .anim-spin,
  :host([power-save]) .anim-bounce {
    animation: none !important;
  }
  :host([power-save]) .theme-glassmorphism,
  :host([power-save]) .theme-aurora {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: var(--card-background-color, rgba(30, 30, 30, 0.9)) !important;
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
    contain: layout paint style;
    content-visibility: auto;
    contain-intrinsic-size: 64px;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    --ha-card-border-width: 0;
    position: relative;
    outline: none;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  ha-card:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  .sub-button {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }
  .sub-button ha-icon,
  .sub-button ha-svg-icon {
    pointer-events: none;
  }
  .sub-button:hover {
    will-change: transform, background, color;
  }
  .sub-button:active {
    transform: scale(0.93) translate3d(0, 0, 0) !important;
    will-change: transform, background, color;
  }
  .color-temp-chips,
  .color-swatch-chips,
  .sub-buttons-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
    contain: layout style;
  }
  .color-temp-chips::-webkit-scrollbar,
  .color-swatch-chips::-webkit-scrollbar,
  .sub-buttons-container::-webkit-scrollbar {
    display: none;
  }
  .active-border-gradient {
    border: 2px solid transparent !important;
    background-image: linear-gradient(var(--card-background-color, #1e1e1e), var(--card-background-color, #1e1e1e)), linear-gradient(135deg, #6200ea, #00e5ff, #76ff03) !important;
    background-origin: border-box !important;
    background-clip: padding-box, border-box !important;
  }
  .glass-specular-edge {
    box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.28), 0 8px 32px 0 rgba(0, 0, 0, 0.3) !important;
  }
  .card-chip .card-content {
    min-height: 32px !important;
    padding: 4px 8px !important;
  }
  .color-swatch-chip[active] {
    outline: 2px solid #ffffff;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.85);
  }
  .alarm-pending {
    animation: ag-alarm-pulse 1.5s infinite alternate;
  }
  @keyframes ag-alarm-pulse {
    from { box-shadow: 0 0 4px #ff9800; }
    to { box-shadow: 0 0 16px #ff9800, inset 0 0 8px rgba(255, 152, 0, 0.3); }
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
    display: grid;
    grid-template-rows: 1fr;
    gap: var(--ag-features-margin, 4px);
    opacity: 1;
    overflow: hidden;
    transform: translateZ(0);
    transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, margin 0.35s ease;
  }
  .collapsible-wrapper.collapsed {
    grid-template-rows: 0fr !important;
    opacity: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    pointer-events: none !important;
  }
  .collapsible-wrapper > div {
    overflow: hidden;
    min-height: 0;
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
    font-size: clamp(12px, 2.8vw, var(--ag-primary-font-size, 14px));
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
    font-size: clamp(11px, 2.5vw, var(--ag-secondary-font-size, 15px));
    pointer-events: none;
  }
  .hvac-heating {
    box-shadow: 0 0 16px rgba(255, 112, 67, 0.45) !important;
  }
  .hvac-cooling {
    box-shadow: 0 0 16px rgba(41, 182, 246, 0.45) !important;
  }
  .hvac-drying {
    box-shadow: 0 0 16px rgba(171, 71, 188, 0.45) !important;
  }
  .cover-opening ha-icon {
    animation: ag-bounce-up 1s infinite alternate ease-in-out;
  }
  .cover-closing ha-icon {
    animation: ag-bounce-down 1s infinite alternate ease-in-out;
  }
  @keyframes ag-bounce-up {
    from { transform: translateY(0); }
    to { transform: translateY(-3px); }
  }
  @keyframes ag-bounce-down {
    from { transform: translateY(0); }
    to { transform: translateY(3px); }
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
    opacity: var(--ag-full-slider-opacity, 1) !important;
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

  /* --- DECAY / COOLDOWN SLIDER --- */
  .decay-slider-container {
    width: 100%;
    margin-bottom: 2px;
  }
  .decay-slider-track {
    width: 100%;
    position: relative;
    background: rgba(140, 140, 140, 0.15);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .decay-slider-fill {
    height: 100%;
    width: var(--decay-pct, 0%);
    transition: width 0.3s linear;
  }
  .decay-slider-badge {
    position: absolute;
    right: 8px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.6);
    pointer-events: none;
  }

  /* --- COLOR TEMP & SWATCH CHIP PRESS ANIMATIONS --- */
  .color-temp-chips, .color-swatch-chips {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .temp-chip, .color-swatch-chip {
    cursor: pointer;
    outline: none;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.15s ease;
  }
  .temp-chip {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-weight: 600;
  }
  .temp-chip:hover, .color-swatch-chip:hover {
    filter: brightness(1.2);
  }
  .temp-chip:active, .color-swatch-chip:active {
    transform: scale(0.9) translate3d(0, 0, 0) !important;
  }
  .color-swatch-chip {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  /* --- LOCK JAMMED SHAKE ANIMATION --- */
  .lock-jammed {
    animation: ag-shake 0.5s ease-in-out infinite;
  }
  @keyframes ag-shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-3px); }
    40%, 80% { transform: translateX(3px); }
  }
`;
class cr {
  /**
   * Resolves display properties and default service execution for a sub-button action type.
   */
  static resolve(e, t, i, r, a, o, s, u, p) {
    if (p && p.action && p.action !== "none" && p.action !== "default")
      return {
        icon: a || r?.attributes?.icon || "mdi:checkbox-blank-circle",
        title: o || (r?.attributes?.friendly_name ?? ""),
        label: o,
        isActive: s ?? !1,
        animClass: "",
        defaultAction: void 0
      };
    const d = t || i || "";
    let n = a, _ = "", g = s ?? !1, y = "", m = o, b;
    switch (e) {
      case "play_pause": {
        const c = r?.state === "playing";
        g = c, n || (n = c ? "mdi:pause" : "mdi:play"), _ = c ? "Pause" : "Play", b = (h) => {
          h?.callService("media_player", "media_play_pause", { entity_id: d });
        };
        break;
      }
      case "next": {
        n || (n = "mdi:skip-next"), _ = "Next Track", b = (c) => {
          c?.callService("media_player", "media_next_track", { entity_id: d });
        };
        break;
      }
      case "previous": {
        n || (n = "mdi:skip-previous"), _ = "Previous Track", b = (c) => {
          c?.callService("media_player", "media_previous_track", { entity_id: d });
        };
        break;
      }
      case "vol_up": {
        n || (n = "mdi:volume-plus"), _ = "Volume +5%", m || (m = "+5%"), b = (c) => {
          c?.callService("media_player", "volume_up", { entity_id: d });
        };
        break;
      }
      case "vol_down": {
        n || (n = "mdi:volume-minus"), _ = "Volume -5%", m || (m = "-5%"), b = (c) => {
          c?.callService("media_player", "volume_down", { entity_id: d });
        };
        break;
      }
      case "mute": {
        const c = r?.attributes?.is_volume_muted === !0;
        g = c, n || (n = c ? "mdi:volume-off" : "mdi:volume-high"), _ = c ? "Unmute" : "Mute", b = (h) => {
          h?.callService("media_player", "volume_mute", { entity_id: d, is_volume_muted: !c });
        };
        break;
      }
      case "source": {
        const c = r?.attributes?.source || "", h = r?.attributes?.source_list || [], f = h.length > 0 ? h[(h.indexOf(c) + 1) % h.length] || h[0] : c;
        n || (n = "mdi:import"), _ = `Source: ${c} -> ${f}`, m || (m = c || "Source"), b = (v) => {
          f && v?.callService("media_player", "select_source", { entity_id: d, source: f });
        };
        break;
      }
      case "sound_mode": {
        const c = r?.attributes?.sound_mode || "", h = r?.attributes?.sound_mode_list || [], f = h.length > 0 ? h[(h.indexOf(c) + 1) % h.length] || h[0] : c;
        n || (n = "mdi:surround-sound"), _ = `Sound: ${c} -> ${f}`, m || (m = c || "Sound"), b = (v) => {
          f && v?.callService("media_player", "select_sound_mode", { entity_id: d, sound_mode: f });
        };
        break;
      }
      case "shuffle": {
        const c = r?.attributes?.shuffle === !0;
        g = c, n || (n = c ? "mdi:shuffle" : "mdi:shuffle-disabled"), _ = c ? "Shuffle: On" : "Shuffle: Off", b = (h) => {
          h?.callService("media_player", "shuffle_set", { entity_id: d, shuffle: !c });
        };
        break;
      }
      case "repeat": {
        const c = r?.attributes?.repeat || "off", h = ["off", "all", "one"], f = h[(h.indexOf(c) + 1) % h.length] || "off";
        g = c !== "off", n || (n = c === "one" ? "mdi:repeat-once" : c === "all" ? "mdi:repeat" : "mdi:repeat-off"), _ = `Repeat: ${c} -> ${f}`, m || (m = c), b = (v) => {
          v?.callService("media_player", "repeat_set", { entity_id: d, repeat: f });
        };
        break;
      }
      case "chime": {
        n || (n = "mdi:bell-ring-outline"), _ = "Play Chime", b = (c) => {
          c?.callService("chime_tts", "say", { entity_id: d, message: "ding-dong" }).catch(() => {
            c?.callService("media_player", "media_play", { entity_id: d });
          });
        };
        break;
      }
      case "tts_announce": {
        n || (n = "mdi:bullhorn-variant-outline"), _ = "Voice Announcement", b = (c) => {
          c?.callService("tts", "speak", { media_player_entity_id: d, message: "Attention: Test announcement" }).catch(() => {
            c?.callService("tts", "google_translate_say", { entity_id: d, message: "Attention: Test announcement" });
          });
        };
        break;
      }
      case "media_zone": {
        n || (n = "mdi:speaker-multiple"), _ = "Group Speakers / Zone", b = (c) => {
          c?.callService("media_player", "join", { entity_id: d });
        };
        break;
      }
      case "media_preset": {
        n || (n = "mdi:radio-tower"), _ = "Play Radio Stream / Preset", b = (c) => {
          c?.callService("media_player", "play_media", {
            entity_id: d,
            media_content_id: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
            media_content_type: "music"
          });
        };
        break;
      }
      case "door_hold": {
        n || (n = "mdi:door-open"), _ = "Hold Gate / Door Open", b = (c) => {
          c?.callService("cover", "open_cover", { entity_id: d });
        };
        break;
      }
      case "aux_heat": {
        const c = r?.attributes?.aux_heat === "on" || r?.attributes?.aux_heat === !0;
        g = c, n || (n = c ? "mdi:radiator" : "mdi:radiator-disabled"), _ = c ? "Disable Aux Heat" : "Enable Aux Heat", b = (h) => {
          h?.callService("climate", "set_aux_heat", { entity_id: d, aux_heat: !c });
        };
        break;
      }
      case "cover_preset": {
        n || (n = "mdi:window-shutter"), _ = "Go to Shading Position (50%)", b = (c) => {
          c?.callService("cover", "set_cover_position", { entity_id: d, position: 50 });
        };
        break;
      }
      case "temp_up": {
        const h = u === "°F" || u === "F" ? 1 : 0.5, f = Number(r?.attributes?.temperature ?? r?.attributes?.target_temp_high ?? 20), v = Number(r?.attributes?.max_temp ?? 35), w = Math.min(v, f + h);
        n || (n = "mdi:thermometer-chevron-up"), _ = `Temperature +${h}°`, m || (m = `+${h}°`), b = ($) => {
          $?.callService("climate", "set_temperature", { entity_id: d, temperature: w });
        };
        break;
      }
      case "temp_down": {
        const h = u === "°F" || u === "F" ? 1 : 0.5, f = Number(r?.attributes?.temperature ?? r?.attributes?.target_temp_low ?? 20), v = Number(r?.attributes?.min_temp ?? 10), w = Math.max(v, f - h);
        n || (n = "mdi:thermometer-chevron-down"), _ = `Temperature -${h}°`, m || (m = `-${h}°`), b = ($) => {
          $?.callService("climate", "set_temperature", { entity_id: d, temperature: w });
        };
        break;
      }
      case "fan_oscillate": {
        const c = r?.attributes?.oscillating === !0;
        g = c, n || (n = c ? "mdi:arrow-oscillating" : "mdi:fan-off"), _ = c ? "Stop Oscillation" : "Start Oscillation", b = (h) => {
          h?.callService("fan", "oscillate", { entity_id: d, oscillating: !c });
        };
        break;
      }
      case "fan_direction": {
        const c = r?.attributes?.direction || "forward", h = c === "forward" ? "reverse" : "forward";
        g = c === "reverse", n || (n = c === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"), _ = `Direction: ${c} -> ${h}`, m || (m = c), b = (f) => {
          f?.callService("fan", "set_direction", { entity_id: d, direction: h });
        };
        break;
      }
      case "humidifier_mode": {
        const c = r?.attributes?.mode || r?.state || "auto", h = r?.attributes?.available_modes || ["auto", "eco", "boost", "sleep"], f = h[(h.indexOf(c) + 1) % h.length] || "auto";
        n || (n = "mdi:water-sync"), _ = `Humidifier Mode: ${c} -> ${f}`, m || (m = c), b = (v) => {
          v?.callService("humidifier", "set_mode", { entity_id: d, mode: f });
        };
        break;
      }
      case "siren_toggle": {
        const c = r?.state === "on";
        g = c, n || (n = c ? "mdi:bullhorn" : "mdi:bullhorn-outline"), _ = c ? "Turn Off Siren" : "Trigger Siren", b = (h) => {
          h?.callService("siren", "toggle", { entity_id: d });
        };
        break;
      }
      case "open_close": {
        const c = r?.state === "open" || r?.state === "on" || r?.attributes?.current_position !== void 0 && r.attributes.current_position > 0;
        g = c;
        const h = r?.attributes?.device_class;
        n || (h === "garage" || h === "garage_door" ? n = c ? "mdi:garage-open" : "mdi:garage" : h === "blind" || h === "shade" ? n = c ? "mdi:blinds-open" : "mdi:blinds" : h === "curtain" ? n = c ? "mdi:curtains-open" : "mdi:curtains" : h === "damper" ? n = c ? "mdi:circle-slice-8" : "mdi:circle-outline" : n = c ? "mdi:window-shutter-open" : "mdi:window-shutter"), _ = c ? "Close" : "Open", b = (f) => {
          f?.callService("cover", "toggle", { entity_id: d });
        };
        break;
      }
      case "stop": {
        n || (n = "mdi:stop"), _ = "Stop", b = (c) => {
          c?.callService("cover", "stop_cover", { entity_id: d });
        };
        break;
      }
      case "open_tilt": {
        n || (n = "mdi:arrow-top-right-bottom-left"), _ = "Open Tilt", b = (c) => {
          c?.callService("cover", "open_cover_tilt", { entity_id: d });
        };
        break;
      }
      case "close_tilt": {
        n || (n = "mdi:arrow-bottom-left-top-right"), _ = "Close Tilt", b = (c) => {
          c?.callService("cover", "close_cover_tilt", { entity_id: d });
        };
        break;
      }
      case "stop_tilt": {
        n || (n = "mdi:stop"), _ = "Stop Tilt", b = (c) => {
          c?.callService("cover", "stop_cover_tilt", { entity_id: d });
        };
        break;
      }
      case "lock_unlock": {
        const c = r?.state === "locked", h = r?.state === "jammed";
        g = !c, h && (y = "lock-jammed"), n || (n = h ? "mdi:lock-alert" : c ? "mdi:lock" : "mdi:lock-open-variant"), _ = h ? "Jammed (Alert!)" : c ? "Unlock" : "Lock", b = (f) => {
          f?.callService("lock", c ? "unlock" : "lock", { entity_id: d });
        };
        break;
      }
      case "fan_speed": {
        const c = r?.attributes?.percentage ?? 0;
        n || (n = "mdi:fan"), s && (y = "anim-spin"), _ = `Speed: ${c}%`, m || (m = c > 0 ? `${c}%` : "Off"), b = (h) => {
          let f = 33;
          c >= 90 ? f = 0 : c >= 60 ? f = 100 : c >= 30 && (f = 66), h?.callService("fan", "set_percentage", { entity_id: d, percentage: f });
        };
        break;
      }
      case "fan_mode": {
        const c = r?.attributes?.fan_mode || "auto", h = r?.attributes?.fan_modes || ["auto", "low", "medium", "high"], f = h[(h.indexOf(c) + 1) % h.length] || "auto";
        n || (n = "mdi:fan"), _ = `Fan Mode: ${c} -> ${f}`, m || (m = c), b = (v) => {
          v?.callService("climate", "set_fan_mode", { entity_id: d, fan_mode: f });
        };
        break;
      }
      case "swing_mode": {
        const c = r?.attributes?.swing_mode || "off", h = r?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], f = h[(h.indexOf(c) + 1) % h.length] || "off";
        n || (n = "mdi:arrow-split-horizontal"), _ = `Swing: ${c} -> ${f}`, m || (m = c), b = (v) => {
          v?.callService("climate", "set_swing_mode", { entity_id: d, swing_mode: f });
        };
        break;
      }
      case "climate_preset": {
        const c = r?.attributes?.preset_mode || "none", h = r?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], f = h[(h.indexOf(c) + 1) % h.length] || "none";
        n || (c === "eco" ? n = "mdi:leaf" : c === "boost" ? n = "mdi:rocket-launch" : c === "away" ? n = "mdi:home-export-outline" : c === "sleep" ? n = "mdi:bed" : n = "mdi:thermostat"), _ = `Preset: ${c} -> ${f}`, m || (m = c), b = (v) => {
          v?.callService("climate", "set_preset_mode", { entity_id: d, preset_mode: f });
        };
        break;
      }
      case "clean": {
        const c = r?.state === "cleaning";
        g = c, n || (n = c ? "mdi:pause" : "mdi:robot-vacuum"), _ = c ? "Pause Vacuum" : "Start Vacuum", b = (h) => {
          h?.callService("vacuum", c ? "pause" : "start", { entity_id: d });
        };
        break;
      }
      case "dock": {
        n || (n = "mdi:home-import-outline"), _ = "Return to Dock", b = (c) => {
          c?.callService("vacuum", "return_to_base", { entity_id: d });
        };
        break;
      }
      case "locate": {
        n || (n = "mdi:map-marker-question-outline"), _ = "Locate", b = (c) => {
          c?.callService("vacuum", "locate", { entity_id: d });
        };
        break;
      }
      case "clean_zone":
      case "spot_clean": {
        n || (n = e === "clean_zone" ? "mdi:map-marker-radius-outline" : "mdi:target-variant"), _ = e === "clean_zone" ? "Zone / Room Clean" : "Spot Clean Mode", b = (c) => {
          c?.callService("vacuum", "clean_spot", { entity_id: d });
        };
        break;
      }
      case "alarm_keypad": {
        n || (n = "mdi:dialpad"), _ = "Open PIN Keypad";
        break;
      }
      case "valve_close": {
        const c = r?.state === "closed" || r?.state === "off";
        g = !c, n || (n = c ? "mdi:valve-closed" : "mdi:valve-open"), _ = c ? "Valve is Closed" : "Emergency Close Valve", b = (h) => {
          d.split(".")[0] === "valve" ? h?.callService("valve", "close_valve", { entity_id: d }) : h?.callService("switch", "turn_off", { entity_id: d });
        };
        break;
      }
      case "pool_speed": {
        const c = r?.attributes?.percentage ?? 50, h = c > 50 ? 30 : 100;
        n || (n = "mdi:pool"), _ = `Pool Speed: ${c}% -> ${h}%`, m || (m = `${c}%`), b = (f) => {
          f?.callService("fan", "set_percentage", { entity_id: d, percentage: h });
        };
        break;
      }
      case "vacuum_fan_speed": {
        const c = r?.attributes?.fan_speed || "standard", h = r?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], f = h[(h.indexOf(c) + 1) % h.length] || "standard";
        n || (n = "mdi:fan"), _ = `Suction: ${c} -> ${f}`, m || (m = c), b = (v) => {
          v?.callService("vacuum", "set_fan_speed", { entity_id: d, fan_speed: f });
        };
        break;
      }
      case "counter_inc": {
        n || (n = "mdi:plus-box"), _ = "Increment Counter (+1)", m || (m = "+1"), b = (c) => {
          c?.callService("counter", "increment", { entity_id: d });
        };
        break;
      }
      case "counter_dec": {
        n || (n = "mdi:minus-box"), _ = "Decrement Counter (-1)", m || (m = "-1"), b = (c) => {
          c?.callService("counter", "decrement", { entity_id: d });
        };
        break;
      }
      case "hvac_mode": {
        const c = r?.state || "off", h = r?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], f = h[(h.indexOf(c) + 1) % h.length] || "auto";
        g = c !== "off", n || (c === "heat" ? n = "mdi:fire" : c === "cool" ? n = "mdi:snowflake" : c === "dry" ? n = "mdi:water-percent" : c === "fan_only" ? n = "mdi:fan" : c === "auto" ? n = "mdi:thermostat-auto" : n = "mdi:power"), _ = `Mode: ${c} -> Next: ${f}`, m || (m = c), b = (v) => {
          v?.callService("climate", "set_hvac_mode", { entity_id: d, hvac_mode: f });
        };
        break;
      }
      case "light_effect":
      case "effect_next": {
        const c = r?.attributes?.effect_list || [], h = r?.attributes?.effect || "None", f = c.length > 0 ? c[(c.indexOf(h) + 1) % c.length] || c[0] : "None";
        n || (n = e === "light_effect" ? "mdi:creation" : "mdi:arrow-right-bold-circle-outline"), g = h !== "None" && h !== "off" && (s ?? !1), _ = e === "light_effect" ? `Effect: ${h} -> Next: ${f}` : `Next Effect: ${f}`, m || (m = h !== "None" ? h : "Effect"), b = (v) => {
          c.length > 0 && v?.callService("light", "turn_on", { entity_id: d, effect: f });
        };
        break;
      }
      case "effect_prev": {
        const c = r?.attributes?.effect_list || [], h = r?.attributes?.effect || "None", f = c.indexOf(h), v = f <= 0 ? c.length - 1 : f - 1, w = c.length > 0 ? c[v] : "None";
        n || (n = "mdi:arrow-left-bold-circle-outline"), _ = `Previous Effect: ${w}`, m || (m = w), b = ($) => {
          c.length > 0 && $?.callService("light", "turn_on", { entity_id: d, effect: w });
        };
        break;
      }
      case "white_mode": {
        n || (n = "mdi:white-balance-sunny"), _ = "Set Neutral White (4000K)", b = (c) => {
          c?.callService("light", "turn_on", { entity_id: d, color_temp: 250 });
        };
        break;
      }
      case "brightness": {
        const c = r?.attributes?.brightness, h = c !== void 0 ? Math.round(c / 255 * 100) : 0;
        n || (n = "mdi:brightness-6"), _ = `Brightness: ${h}%`, m || (m = `${h}%`), b = (f) => {
          let v = 25;
          h >= 85 ? v = 0 : h >= 60 ? v = 100 : h >= 35 ? v = 75 : h >= 10 && (v = 50), v === 0 ? f?.callService("light", "turn_off", { entity_id: d }) : f?.callService("light", "turn_on", { entity_id: d, brightness_pct: v });
        };
        break;
      }
      case "garage_toggle": {
        const c = r?.state === "open" || r?.state === "opening";
        g = c, n || (n = c ? "mdi:garage-open" : "mdi:garage"), _ = c ? "Close Garage" : "Open Garage", b = (h) => {
          h?.callService("cover", "toggle", { entity_id: d });
        };
        break;
      }
      case "dim_up": {
        const c = d.split(".")[0];
        if (c === "number" || c === "input_number") {
          const h = Number(r?.state) || 0, f = Number(r?.attributes?.step) || 1, v = Number(r?.attributes?.max) || 100, w = Math.min(v, h + f);
          n || (n = "mdi:plus-circle-outline"), _ = `Value +${f}`, m || (m = `+${f}`), b = ($) => {
            $?.callService(c, "set_value", { entity_id: d, value: w });
          };
        } else {
          const h = r?.attributes?.brightness ?? 0, f = Math.min(255, h + 26);
          n || (n = "mdi:brightness-5"), _ = "Brightness +10%", m || (m = "+10%"), b = (v) => {
            v?.callService("light", "turn_on", { entity_id: d, brightness: f });
          };
        }
        break;
      }
      case "dim_down": {
        const c = d.split(".")[0];
        if (c === "number" || c === "input_number") {
          const h = Number(r?.state) || 0, f = Number(r?.attributes?.step) || 1, v = Number(r?.attributes?.min) || 0, w = Math.max(v, h - f);
          n || (n = "mdi:minus-circle-outline"), _ = `Value -${f}`, m || (m = `-${f}`), b = ($) => {
            $?.callService(c, "set_value", { entity_id: d, value: w });
          };
        } else {
          const h = r?.attributes?.brightness ?? 0, f = Math.max(1, h - 26);
          n || (n = "mdi:brightness-4"), _ = "Brightness -10%", m || (m = "-10%"), b = (v) => {
            v?.callService("light", "turn_on", { entity_id: d, brightness: f });
          };
        }
        break;
      }
      case "humidity_up": {
        const c = Number(r?.attributes?.humidity ?? r?.attributes?.target_humidity ?? 50), h = Math.min(100, c + 5);
        n || (n = "mdi:water-plus"), _ = `Humidity +5% (${h}%)`, m || (m = "+5%"), b = (f) => {
          f?.callService("humidifier", "set_humidity", { entity_id: d, humidity: h });
        };
        break;
      }
      case "humidity_down": {
        const c = Number(r?.attributes?.humidity ?? r?.attributes?.target_humidity ?? 50), h = Math.max(0, c - 5);
        n || (n = "mdi:water-minus"), _ = `Humidity -5% (${h}%)`, m || (m = "-5%"), b = (f) => {
          f?.callService("humidifier", "set_humidity", { entity_id: d, humidity: h });
        };
        break;
      }
      case "humidity_step_up": {
        const c = Number(r?.attributes?.humidity ?? r?.attributes?.target_humidity ?? 50), h = Math.min(100, c + 1);
        n || (n = "mdi:water-plus"), _ = `Humidity +1% (${h}%)`, m || (m = "+1%"), b = (f) => {
          f?.callService("humidifier", "set_humidity", { entity_id: d, humidity: h });
        };
        break;
      }
      case "humidity_step_down": {
        const c = Number(r?.attributes?.humidity ?? r?.attributes?.target_humidity ?? 50), h = Math.max(0, c - 1);
        n || (n = "mdi:water-minus"), _ = `Humidity -1% (${h}%)`, m || (m = "-1%"), b = (f) => {
          f?.callService("humidifier", "set_humidity", { entity_id: d, humidity: h });
        };
        break;
      }
      case "input_select": {
        const c = r?.state || "", h = r?.attributes?.options || [], f = h.length > 0 ? h[(h.indexOf(c) + 1) % h.length] || h[0] : c;
        n || (n = "mdi:form-dropdown"), _ = `Option: ${c} -> Next: ${f}`, m || (m = c), b = (v) => {
          const w = d.split(".")[0] === "select" ? "select" : "input_select";
          v?.callService(w, "select_next", { entity_id: d });
        };
        break;
      }
      case "temp_warm": {
        n || (n = "mdi:weather-sunny"), _ = "Warm White (2700K)", m || (m = "2700K"), b = (c) => {
          c?.callService("light", "turn_on", { entity_id: d, color_temp_kelvin: 2700 });
        };
        break;
      }
      case "temp_cool": {
        n || (n = "mdi:weather-sunset-up"), _ = "Cool Daylight (6000K)", m || (m = "6000K"), b = (c) => {
          c?.callService("light", "turn_on", { entity_id: d, color_temp_kelvin: 6e3 });
        };
        break;
      }
      case "color_temp": {
        n || (n = "mdi:palette-swatch-outline"), _ = "Color Temperature", m || (m = "Temp"), b = (c) => {
          const h = r?.attributes?.color_temp_kelvin || 3e3;
          let f = 2700;
          h < 3300 ? f = 4e3 : h < 5e3 ? f = 6e3 : f = 2700, c?.callService("light", "turn_on", { entity_id: d, color_temp_kelvin: f });
        };
        break;
      }
      case "button":
      default: {
        n || (n = r?.attributes?.icon || "mdi:checkbox-blank-circle"), _ = o || (r?.attributes?.friendly_name ?? "");
        break;
      }
    }
    return {
      icon: n,
      title: _,
      label: m,
      isActive: g,
      animClass: y,
      defaultAction: b
    };
  }
}
const Z = /* @__PURE__ */ new Map(), jt = 200;
class ei {
  /**
   * Parse date strings, numbers, or Date instances safely with LRU caching.
   */
  static parseDate(e) {
    if (!e) return null;
    if (e instanceof Date) return isNaN(e.getTime()) ? null : e;
    if (typeof e == "number") {
      const t = new Date(e > 1e11 ? e : e * 1e3);
      return isNaN(t.getTime()) ? null : t;
    }
    if (typeof e == "string") {
      const t = Z.get(e);
      if (t) return t;
      const i = Date.parse(e);
      if (!isNaN(i)) {
        const u = new Date(i);
        if (Z.size >= jt) {
          const p = Z.keys().next().value;
          p !== void 0 && Z.delete(p);
        }
        return Z.set(e, u), u;
      }
      let r = e.trim();
      r.includes(" ") && !r.includes("T") && (r = r.replace(" ", "T")), r.includes("T") && !r.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(r) && !/[+-]\d{4}$/.test(r) && (r += "Z");
      const a = Number(r);
      let o;
      !isNaN(a) && r !== "" && !r.includes("T") ? o = new Date(a > 1e11 ? a : a * 1e3) : o = new Date(r);
      const s = isNaN(o.getTime()) ? null : o;
      if (s) {
        if (Z.size >= jt) {
          const u = Z.keys().next().value;
          u !== void 0 && Z.delete(u);
        }
        Z.set(e, s);
      }
      return s;
    }
    return null;
  }
  /**
   * Format a past timestamp to relative time string (compact or human-friendly).
   */
  static formatTimeAgo(e, t = !1, i) {
    const r = this.parseDate(e);
    if (!r) return "";
    const a = Math.max(0, ((i ?? Date.now()) - r.getTime()) / 1e3 | 0);
    if (a < 5) return t ? "< 5s" : "just now";
    if (a < 60) return t ? `${a}s` : `${a} seconds ago`;
    const o = a / 60 | 0;
    if (o < 60) return t ? `${o}m` : `${o} ${o === 1 ? "minute" : "minutes"} ago`;
    const s = o / 60 | 0;
    if (s < 24) return `${s}h${t ? "" : " ago"}`;
    const u = s / 24 | 0;
    if (u < 7) return `${u}d${t ? "" : " ago"}`;
    const p = u / 7 | 0;
    if (p < 4) return `${p}w${t ? "" : " ago"}`;
    const d = u / 30 | 0;
    return d < 12 ? `${d}mo${t ? "" : " ago"}` : `${u / 365 | 0}y${t ? "" : " ago"}`;
  }
  static formatRelativeTime(e, t) {
    return this.formatTimeAgo(e, !1, t);
  }
  static formatForDuration(e, t) {
    return this.formatTimeAgo(e, !0, t);
  }
  /**
   * Compute primary/secondary content string or TemplateResult for a given info type and stateObj.
   */
  static getInfoContent(e, t, i, r) {
    if (!t) return "";
    switch ((e || "").toLowerCase().replace(/_/g, "-")) {
      case "name":
        return i?.name || t.attributes?.friendly_name || i?.entity || "";
      case "state": {
        const o = (t.entity_id || "").split(".")[0];
        if (o === "timer") {
          if (t.state === "paused")
            return `${t.attributes?.remaining || "Paused"} (Paused)`;
          if (t.state === "active" && t.attributes?.finishes_at) {
            const s = Date.parse(t.attributes.finishes_at);
            if (!isNaN(s)) {
              const u = Math.max(0, Math.round((s - Date.now()) / 1e3)), p = Math.floor(u / 60), d = u % 60, n = Math.floor(p / 60), _ = (p % 60).toString().padStart(2, "0"), g = d.toString().padStart(2, "0");
              return n > 0 ? `${n}:${_}:${g}` : `${_}:${g}`;
            }
          }
        }
        if (o === "binary_sensor") {
          const s = t.attributes?.device_class;
          return s === "tamper" && t.state === "on" ? "⚠️ Tamper Detected" : s === "problem" && t.state === "on" ? "⚠️ Problem Detected" : s === "smoke" && t.state === "on" ? "🔥 Smoke Detected!" : s === "gas" && t.state === "on" ? "⚠️ Gas Detected!" : s === "moisture" && t.state === "on" ? "💧 Moisture Detected!" : this.formatForDuration(t.last_changed);
        }
        if (o === "vacuum") {
          const s = t.state;
          let u = s;
          s === "cleaning" ? u = "🧹 Cleaning" : s === "docked" ? u = "🏠 Docked" : s === "returning" ? u = "🔄 Returning" : s === "paused" ? u = "⏸️ Paused" : s === "error" && (u = "⚠️ Error");
          const p = t.attributes?.battery_level;
          return p !== void 0 ? `${u} • 🔋${p}%` : u;
        }
        if (o === "weather") {
          const s = t.attributes?.temperature, u = r?.config?.unit_system?.temperature || "°F", p = (t.state || "").replace(/-/g, " ");
          return s !== void 0 ? `${s}${u} • ${p}` : p;
        }
        if (o === "climate") {
          const s = t.state || "", u = t.attributes?.current_temperature, p = t.attributes?.temperature ?? t.attributes?.target_temp_high, d = t.attributes?.unit_of_measurement || r?.config?.unit_system?.temperature || "°", n = t.attributes?.preset_mode, _ = t.attributes?.hvac_action, y = [u !== void 0 && p !== void 0 ? `${u}${d} → ${p}${d}` : p !== void 0 ? `${p}${d}` : "", _, n].filter(Boolean).join(" • ");
          return y ? `${s} (${y})` : s;
        }
        if (o === "fan") {
          const s = t.attributes?.percentage, u = t.attributes?.oscillating ? "∿ Oscillating" : "", p = t.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [s !== void 0 ? `${s}%` : t.state, u, p].filter(Boolean).join(" • ");
        }
        if (o === "alarm_control_panel") {
          const s = t.state;
          if (s === "armed_home") return "🛡️ Armed Home";
          if (s === "armed_away") return "🛡️ Armed Away";
          if (s === "disarmed") return "Disarmed";
          if (s === "triggered") return "⚠️ TRIGGERED";
          if (s === "pending") return "⏳ Arming Pending...";
          if (s === "arming") return "⏳ Arming...";
        }
        if (o === "lock") {
          if (t.state === "locked") return "Locked";
          if (t.state === "unlocked") return "Unlocked";
          if (t.state === "jammed") return "Jammed (Alert!)";
          if (t.state === "locking") return "Locking...";
          if (t.state === "unlocking") return "Unlocking...";
        }
        if (o === "button" || o === "input_button")
          return "Press to run";
        if (o === "light" && t.state === "on") {
          const s = t.attributes?.brightness, u = s !== void 0 ? Math.round(s / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${u}% • ${t.attributes.color_temp_kelvin}K`;
        }
        if (t.attributes?.device_class === "timestamp" || t.attributes?.device_class === "date" || typeof t.state == "string" && (t.state.includes("T") || t.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(t.state))) {
          const s = this.formatRelativeTime(t.state);
          if (s) return s;
        }
        if (t.attributes?.display_precision !== void 0 && !isNaN(Number(t.state))) {
          const s = Number(t.attributes.display_precision), u = Number(t.state).toFixed(s), p = t.attributes?.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "";
          return `${u}${p}`;
        }
        if (typeof r?.formatEntityState == "function")
          try {
            return r.formatEntityState(t);
          } catch {
          }
        return `${t.state} ${t.attributes?.unit_of_measurement || ""}`.trim();
      }
      case "last-changed":
      case "last-changed-relative":
      case "relative-time": {
        const o = t.attributes?.last_triggered || t.last_changed;
        return this.formatForDuration(o);
      }
      case "last-updated":
      case "last-updated-relative":
        return this.formatForDuration(t.last_updated);
      case "last-triggered": {
        const o = t.attributes?.last_triggered || t.last_changed;
        return this.formatForDuration(o);
      }
      case "brightness": {
        const o = t.attributes?.brightness;
        return o !== void 0 ? `${Math.round(o / 255 * 100)}%` : "";
      }
      case "temperature": {
        const o = t.attributes?.temperature ?? t.attributes?.current_temperature, s = t.attributes?.unit_of_measurement || r?.config?.unit_system?.temperature || "°C";
        return o !== void 0 ? `${o} ${s}` : "";
      }
      case "humidity": {
        const o = t.attributes?.humidity ?? t.attributes?.current_humidity, s = t.attributes?.unit_of_measurement || "%";
        return o !== void 0 ? `${o}${s.startsWith("%") ? s : ` ${s}`}` : "";
      }
      case "battery": {
        const o = t.attributes?.battery_level ?? t.attributes?.battery ?? (t.attributes?.device_class === "battery" ? t.state : void 0);
        if (o !== void 0) {
          const s = Number(o);
          if (!isNaN(s)) {
            let u = "#4caf50";
            return s <= 20 ? u = "#f44336" : s <= 50 && (u = "#ff9800"), S`<span style="color: ${u}; font-weight: bold;">${s}%</span>`;
          }
          return `${o}%`;
        }
        return "";
      }
      case "none":
      default:
        return "";
    }
  }
}
const dr = 256;
Object.freeze(
  /* @__PURE__ */ new Set([
    "on",
    "open",
    "opening",
    "closing",
    "unlocked",
    "unlocking",
    "locking",
    "playing",
    "buffering",
    "active",
    "running",
    "cool",
    "heat",
    "auto",
    "heat_cool",
    "fan_only",
    "dry",
    "home",
    "occupied",
    "motion",
    "cleaning",
    "returning"
  ])
);
Object.freeze(
  /* @__PURE__ */ new Set([
    "binary_sensor",
    "sensor",
    "weather",
    "sun",
    "device_tracker",
    "person",
    "zone",
    "camera",
    "image"
  ])
);
Object.freeze(
  /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww", "color_temp"])
);
Object.freeze(
  /* @__PURE__ */ new Set([
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
  ])
);
const ur = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i, hr = /^\[\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\]$/;
class _r {
  constructor() {
    this._cache = /* @__PURE__ */ new Map(), this._cacheAccessTimes = /* @__PURE__ */ new Map();
  }
  /**
   * Parse any CSS color string into an [r, g, b] integer tuple.
   * Uses a true LRU cache with access timestamp tracking.
   */
  parseColorToRgb(e) {
    if (!e || typeof e != "string") return null;
    const t = e.trim();
    if (!t) return null;
    if (this._cache.has(t))
      return this._cacheAccessTimes.set(t, Date.now()), this._cache.get(t);
    let i = null;
    if (t.charCodeAt(0) === 35) {
      const a = t.substring(1), o = a.length;
      if (o === 3 || o === 4) {
        const s = parseInt(a[0] + a[0], 16), u = parseInt(a[1] + a[1], 16), p = parseInt(a[2] + a[2], 16);
        !isNaN(s) && !isNaN(u) && !isNaN(p) && (i = [s, u, p]);
      } else if (o >= 6) {
        const s = parseInt(a.substring(0, 2), 16), u = parseInt(a.substring(2, 4), 16), p = parseInt(a.substring(4, 6), 16);
        !isNaN(s) && !isNaN(u) && !isNaN(p) && (i = [s, u, p]);
      }
    } else if (t.startsWith("rgb")) {
      const a = t.match(ur);
      if (a) {
        const o = parseInt(a[1], 10), s = parseInt(a[2], 10), u = parseInt(a[3], 10);
        !isNaN(o) && !isNaN(s) && !isNaN(u) && (i = [
          Math.max(0, Math.min(255, o)),
          Math.max(0, Math.min(255, s)),
          Math.max(0, Math.min(255, u))
        ]);
      }
    } else if (t.charCodeAt(0) === 91 && t.charCodeAt(t.length - 1) === 93) {
      const a = t.match(hr);
      a && (i = [
        Math.max(0, Math.min(255, parseInt(a[1], 10))),
        Math.max(0, Math.min(255, parseInt(a[2], 10))),
        Math.max(0, Math.min(255, parseInt(a[3], 10)))
      ]);
    }
    if (this._cache.size >= dr) {
      let a = null, o = 1 / 0;
      for (const [s, u] of this._cacheAccessTimes)
        u < o && (o = u, a = s);
      a !== null && (this._cache.delete(a), this._cacheAccessTimes.delete(a));
    }
    const r = Date.now();
    return this._cache.set(t, i), this._cacheAccessTimes.set(t, r), i;
  }
  /**
   * Convert an [r, g, b] tuple to a 6-character hex string (#rrggbb).
   */
  rgbToHex(e) {
    if (!e || isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2])) return "#000000";
    const t = Math.max(0, Math.min(255, e[0] | 0)).toString(16).padStart(2, "0"), i = Math.max(0, Math.min(255, e[1] | 0)).toString(16).padStart(2, "0"), r = Math.max(0, Math.min(255, e[2] | 0)).toString(16).padStart(2, "0");
    return `#${t}${i}${r}`;
  }
  /**
   * Extract Hue angle (0-360) from an RGB tuple with strict NaN and bounds guards.
   */
  rgbToHue(e, t, i) {
    if (isNaN(e) || isNaN(t) || isNaN(i)) return 0;
    e = Math.max(0, Math.min(255, e)) / 255, t = Math.max(0, Math.min(255, t)) / 255, i = Math.max(0, Math.min(255, i)) / 255;
    const r = Math.max(e, t, i), a = Math.min(e, t, i), o = r - a;
    let s = 0;
    return o === 0 ? 0 : (r === e ? s = (t - i) / o + (t < i ? 6 : 0) : r === t ? s = (i - e) / o + 2 : r === i && (s = (e - t) / o + 4), Math.round(s / 6 * 360) % 360);
  }
  /**
   * Convert HSV values (h: 0-360, s: 0-1, v: 0-1) to an RGB tuple.
   */
  hsvToRgb(e, t, i) {
    e = isNaN(e) ? 0 : Math.max(0, Math.min(360, e)), t = isNaN(t) ? 0 : Math.max(0, Math.min(1, t)), i = isNaN(i) ? 0 : Math.max(0, Math.min(1, i));
    const r = i * t, a = r * (1 - Math.abs(e / 60 % 2 - 1)), o = i - r;
    let s = 0, u = 0, p = 0;
    return e >= 0 && e < 60 ? (s = r, u = a) : e >= 60 && e < 120 ? (s = a, u = r) : e >= 120 && e < 180 ? (u = r, p = a) : e >= 180 && e < 240 ? (u = a, p = r) : e >= 240 && e < 300 ? (s = a, p = r) : e >= 300 && e <= 360 && (s = r, p = a), [
      Math.round((s + o) * 255),
      Math.round((u + o) * 255),
      Math.round((p + o) * 255)
    ];
  }
  /**
   * Convert Kelvin temperature to an approximation RGB tuple.
   */
  kelvinToRgb(e) {
    if (isNaN(e)) return [255, 255, 255];
    const t = Math.max(1e3, Math.min(4e4, e)) / 100;
    let i = 0, r = 0, a = 0;
    return t <= 66 ? i = 255 : i = Math.min(255, Math.max(0, 329.698727446 * Math.pow(t - 60, -0.1332047592))), t <= 66 ? r = Math.min(255, Math.max(0, 99.4708025861 * Math.log(t) - 161.1195681661)) : r = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(t - 60, -0.0755148492))), t >= 66 ? a = 255 : t <= 19 ? a = 0 : a = Math.min(255, Math.max(0, 138.5177312231 * Math.log(t - 10) - 305.0447927307)), [Math.round(i), Math.round(r), Math.round(a)];
  }
  /**
   * Linear interpolation between two RGB tuples.
   */
  lerpRgb(e, t, i) {
    if (!e || !t) return [0, 0, 0];
    const r = isNaN(i) ? 0 : Math.max(0, Math.min(1, i));
    return [
      Math.round(e[0] + (t[0] - e[0]) * r),
      Math.round(e[1] + (t[1] - e[1]) * r),
      Math.round(e[2] + (t[2] - e[2]) * r)
    ];
  }
  /**
   * Convert HS values (h: 0-360, s: 0-100) to an RGB tuple.
   */
  hsToRgb(e, t) {
    e = (e % 360 + 360) % 360 / 360, t = Math.max(0, Math.min(100, t)) / 100;
    const i = 1, r = Math.floor(e * 6), a = e * 6 - r, o = i * (1 - t), s = i * (1 - a * t), u = i * (1 - (1 - a) * t);
    let p = 0, d = 0, n = 0;
    switch (r % 6) {
      case 0:
        p = i, d = u, n = o;
        break;
      case 1:
        p = s, d = i, n = o;
        break;
      case 2:
        p = o, d = i, n = u;
        break;
      case 3:
        p = o, d = s, n = i;
        break;
      case 4:
        p = u, d = o, n = i;
        break;
      case 5:
        p = i, d = o, n = s;
        break;
    }
    return [Math.round(p * 255), Math.round(d * 255), Math.round(n * 255)];
  }
}
const D = new _r(), W = D.parseColorToRgb.bind(D), ot = D.rgbToHex.bind(D), pr = D.rgbToHue.bind(D);
D.hsvToRgb.bind(D);
const yt = D.hsToRgb.bind(D), Q = D.kelvinToRgb.bind(D), xt = D.lerpRgb.bind(D), fr = [
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
], gr = [
  { k: 2200, label: "2200K", rgb: Q(2200) },
  { k: 2700, label: "2700K", rgb: Q(2700) },
  { k: 3e3, label: "3000K", rgb: Q(3e3) },
  { k: 4e3, label: "4000K", rgb: Q(4e3) },
  { k: 5e3, label: "5000K", rgb: Q(5e3) },
  { k: 6500, label: "6500K", rgb: Q(6500) }
];
var mr = Object.defineProperty, Et = (l, e, t, i) => {
  for (var r = void 0, a = l.length - 1, o; a >= 0; a--)
    (o = l[a]) && (r = o(e, t, r) || r);
  return r && mr(e, t, r), r;
};
const br = [
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
], vr = [
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
], yr = [
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
], xr = [
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
  { name: "primary_text_start_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_end_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_start_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_end_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "features_offset_x", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "features_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } }
], wr = [
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
  { name: "primary_text_start_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_end_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "primary_text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_start_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_end_offset", selector: { number: { min: -150, max: 250, mode: "slider" } } },
  { name: "secondary_text_offset_y", selector: { number: { min: -150, max: 250, mode: "slider" } } },
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
], ti = [
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
function pt(l) {
  return [
    { name: `sub_button_${l}_entity`, selector: { entity: {} } },
    { name: `sub_button_${l}_type`, selector: { select: { options: [
      { value: "button", label: "Standard Action Button (Default)" },
      { value: "play_pause", label: "Media: Play/Pause Dynamic Toggle" },
      { value: "next", label: "Media: Next Track" },
      { value: "previous", label: "Media: Previous Track" },
      { value: "vol_up", label: "Media: Volume Up (+5%)" },
      { value: "vol_down", label: "Media: Volume Down (-5%)" },
      { value: "mute", label: "Media: Mute / Unmute Toggle" },
      { value: "source", label: "Media: Cycle Input Source" },
      { value: "sound_mode", label: "Media: Cycle Sound DSP Mode" },
      { value: "shuffle", label: "Media: Toggle Shuffle Mode" },
      { value: "repeat", label: "Media: Cycle Repeat Mode" },
      { value: "chime", label: "Audio: Play Chime / Doorbell Sound" },
      { value: "tts_announce", label: "Audio: TTS Voice Announcement" },
      { value: "media_zone", label: "Media: Cycle Speaker Output Zone" },
      { value: "media_preset", label: "Media: Play Favorite Radio / Stream" },
      { value: "open_close", label: "Cover: Open/Close Dynamic Toggle" },
      { value: "stop", label: "Cover: Stop Position" },
      { value: "open_tilt", label: "Cover: Open Tilt Position" },
      { value: "close_tilt", label: "Cover: Close Tilt Position" },
      { value: "stop_tilt", label: "Cover: Stop Tilt Position" },
      { value: "cover_preset", label: "Cover: Go to Favorite Preset (50%)" },
      { value: "lock_unlock", label: "Lock: Lock/Unlock Dynamic Toggle" },
      { value: "garage_toggle", label: "Cover: Garage Door Smart Toggle" },
      { value: "door_hold", label: "Gate/Door: Hold Open Contact" },
      { value: "fan_speed", label: "Fan: Cycle Speed Preset" },
      { value: "fan_mode", label: "Climate: Cycle Fan Speed Mode" },
      { value: "fan_oscillate", label: "Fan: Toggle Oscillation" },
      { value: "fan_direction", label: "Fan: Toggle Direction (Forward/Reverse)" },
      { value: "swing_mode", label: "Climate: Cycle Vane Swing Mode" },
      { value: "climate_preset", label: "Climate: Cycle Preset (Eco/Comfort/Boost)" },
      { value: "temp_up", label: "Climate: Temperature Step Up (+0.5°C / +1°F)" },
      { value: "temp_down", label: "Climate: Temperature Step Down (-0.5°C / -1°F)" },
      { value: "aux_heat", label: "Climate: Toggle Aux / Emergency Heat" },
      { value: "clean", label: "Vacuum: Start Cleaning" },
      { value: "dock", label: "Vacuum: Return to Base / Dock" },
      { value: "locate", label: "Vacuum: Play Sound / Locate" },
      { value: "clean_zone", label: "Vacuum: Trigger Zone Cleaning" },
      { value: "spot_clean", label: "Vacuum: Spot Clean Mode" },
      { value: "vacuum_fan_speed", label: "Vacuum: Cycle Suction Power" },
      { value: "siren_toggle", label: "Siren: Toggle Emergency Siren/Strobe" },
      { value: "alarm_keypad", label: "Security: Open Alarm PIN Keypad" },
      { value: "valve_close", label: "Valve: Emergency Close Shutoff" },
      { value: "pool_speed", label: "Pool: Toggle High/Low Pump Speed" },
      { value: "hvac_mode", label: "Climate: Cycle Operating Mode" },
      { value: "light_effect", label: "Light: Cycle Color Animation Effect" },
      { value: "effect_next", label: "Light: Next Animation Effect" },
      { value: "effect_prev", label: "Light: Previous Animation Effect" },
      { value: "white_mode", label: "Light: Set Pure Neutral White" },
      { value: "dim_up", label: "Light/Number: Step Up (+10% / +Step)" },
      { value: "dim_down", label: "Light/Number: Step Down (-10% / -Step)" },
      { value: "humidity_up", label: "Humidifier: Step Target Up (+5%)" },
      { value: "humidity_down", label: "Humidifier: Step Target Down (-5%)" },
      { value: "humidity_step_up", label: "Humidifier: Fine Step Up (+1%)" },
      { value: "humidity_step_down", label: "Humidifier: Fine Step Down (-1%)" },
      { value: "humidifier_mode", label: "Humidifier: Cycle Operating Mode" },
      { value: "counter_inc", label: "Counter: Increment (+1)" },
      { value: "counter_dec", label: "Counter: Decrement (-1)" },
      { value: "input_select", label: "Input Select: Cycle Next Option" },
      { value: "temp_warm", label: "Light: Shift Temperature Warmer (+200K)" },
      { value: "temp_cool", label: "Light: Shift Temperature Cooler (-200K)" },
      { value: "slider", label: "Inline Control: Mini Horizontal Slider" },
      { value: "google_slider", label: "Inline Control: Google Home Pill Slider" },
      { value: "color_temp", label: "Inline Control: Mini Color Temp Slider" },
      { value: "color_picker", label: "Inline Control: Mini RGB Hue Slider" },
      { value: "brightness", label: "Inline Control: Direct Brightness Slider" }
    ] } } },
    { name: `sub_button_${l}_icon`, selector: { icon: {} } },
    { name: `sub_button_${l}_name`, selector: { text: {} } },
    { name: `sub_button_${l}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${l}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${l}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${l}_tap_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${l}_hold_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${l}_double_tap_action`, selector: { "ui-action": {} } }
  ];
}
const Sr = pt(1), $r = pt(2), kr = pt(3), Cr = pt(4), Tr = [
  { name: "tap_action", selector: { "ui-action": {} } },
  { name: "hold_action", selector: { "ui-action": {} } },
  { name: "double_tap_action", selector: { "ui-action": {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
];
function R(l) {
  if (!l) return;
  if (Array.isArray(l)) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, r))).toString(16).padStart(2, "0");
    return `#${i(l[0] ?? 0)}${i(l[1] ?? 0)}${i(l[2] ?? 0)}`;
  }
  if (typeof l != "string") return;
  if (l.startsWith("#")) return l;
  const e = l.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (e) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, parseInt(r, 10)))).toString(16).padStart(2, "0");
    return `#${i(e[1])}${i(e[2])}${i(e[3])}`;
  }
  const t = l.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/);
  if (t) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, parseInt(r, 10)))).toString(16).padStart(2, "0");
    return `#${i(t[1])}${i(t[2])}${i(t[3])}`;
  }
  return l;
}
function N(l) {
  const e = R(l);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(i) || isNaN(r)))
    return [t, i, r];
}
const Mr = {
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
  primary_text_start_offset: "Primary Text Start Position (Left Offset px)",
  primary_text_end_offset: "Primary Text End Position (Right Margin px)",
  primary_text_offset_x: "Primary Text Horizontal Offset X (px)",
  primary_text_offset_y: "Primary Text Vertical Offset Y (px)",
  secondary_text_start_offset: "Secondary Text Start Position (Left Offset px)",
  secondary_text_end_offset: "Secondary Text End Position (Right Margin px)",
  secondary_text_offset_x: "Secondary Text Horizontal Offset X (px)",
  secondary_text_offset_y: "Secondary Text Vertical Offset Y (px)",
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
class it extends Ie {
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
      i && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(i[1]) * 100)), t.bg_color = R(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = R(t.card_border_color)), t.active_color && (t.active_color = R(t.active_color)), t.inactive_color && (t.inactive_color = R(t.inactive_color)), t.slider_color && (t.slider_color = R(t.slider_color)), t.slider_track_color && (t.slider_track_color = R(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = R(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = R(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = R(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = R(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = R(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = R(t.sub_button_4_color)), this._config = {
      ...St,
      ...t
    };
  }
  _computeLabel(e) {
    return Mr[e.name] || e.name;
  }
  _transformConfigForForm() {
    const e = { ...this._config };
    return e.bg_color = N(e.bg_color), e.card_border_color = N(e.card_border_color), e.active_color = N(e.active_color), e.inactive_color = N(e.inactive_color), e.slider_color = N(e.slider_color), e.slider_track_color = N(e.slider_track_color), e.text_color_primary = N(e.text_color_primary), e.text_color_secondary = N(e.text_color_secondary), e.sub_button_1_color = N(e.sub_button_1_color), e.sub_button_2_color = N(e.sub_button_2_color), e.sub_button_3_color = N(e.sub_button_3_color), e.sub_button_4_color = N(e.sub_button_4_color), e.fade_stage_1_color = N(e.fade_stage_1_color), e.fade_stage_2_color = N(e.fade_stage_2_color), e.fade_stage_3_color = N(e.fade_stage_3_color), e;
  }
  _valueChanged(e, t) {
    const i = e.detail.value, r = { ...this._config };
    if (t) {
      for (const a of t)
        if (a.name in i) {
          const o = i[a.name];
          Array.isArray(o) && o.length === 3 && o.every((s) => typeof s == "number") ? r[a.name] = `rgb(${o[0]}, ${o[1]}, ${o[2]})` : r[a.name] = o;
        }
    } else
      Object.assign(r, i);
    this._config = r, tt(this, "config-changed", { config: this._config });
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    }, this.requestUpdate();
  }
  _renderSection(e, t, i, r, a) {
    const o = !!this._openPanels[e];
    return S`
      <div class="custom-panel ${o ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${i}</span>
          </div>
          <ha-icon class="chevron-icon ${o ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${o ? S`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${a}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, r)}
            ></ha-form>
          </div>
        ` : x}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, i, r) {
    const a = `sub${e}`, o = !!this._openPanels[a];
    return S`
      <div class="sub-nested-panel ${o ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(a)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${o ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${o ? S`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, i)}
            ></ha-form>
          </div>
        ` : x}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return S``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", i = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", a = this._config?.sub_button_4_entity || "", o = !!this._openPanels.sub_buttons;
    return S`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", br, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", vr, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", yr, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", xr, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", wr, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${o ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${o ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${o ? S`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${ti}
                .computeLabel=${this._computeLabel}
                @value-changed=${(s) => this._valueChanged(s, ti)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, Sr, e)}
                ${this._renderSubButtonPanel(2, i, $r, e)}
                ${this._renderSubButtonPanel(3, r, kr, e)}
                ${this._renderSubButtonPanel(4, a, Cr, e)}
              </div>
            </div>
          ` : x}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", Tr, e)}
      </div>
    `;
  }
  static get styles() {
    return ai`
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
Et([
  ht({ attribute: !1 })
], it.prototype, "hass");
Et([
  _t()
], it.prototype, "_config");
Et([
  _t()
], it.prototype, "_openPanels");
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", it);
customElements.get("antigravity-card-editor") || customElements.define("antigravity-card-editor", it);
var Ar = Object.defineProperty, Pr = Object.getOwnPropertyDescriptor, Ue = (l, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? Pr(e, t) : e, a = l.length - 1, o; a >= 0; a--)
    (o = l[a]) && (r = (i ? o(e, t, r) : o(r)) || r);
  return i && r && Ar(e, t, r), r;
};
typeof window < "u" && (window.runAntigravityCI = hi, window.antigravityMemoryReport = () => ct.logStatus(), window.antigravityPowerStatus = () => fe.isPowerSaveActive());
const Er = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${Er} `,
  "color: white; background: #6200ea; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #6200ea; background: #ede7f6; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
);
if (typeof CSS < "u" && "registerProperty" in CSS)
  try {
    CSS.registerProperty({
      name: "--slider-pct",
      syntax: "<percentage>",
      inherits: !0,
      initialValue: "0%"
    }), CSS.registerProperty({
      name: "--decay-pct",
      syntax: "<percentage>",
      inherits: !0,
      initialValue: "100%"
    }), CSS.registerProperty({
      name: "--glow-intensity",
      syntax: "<number>",
      inherits: !0,
      initialValue: "1"
    });
  } catch {
  }
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
let ze = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  ze = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (ze = Date.now());
}, { passive: !0 }));
const Nr = /* @__PURE__ */ new Set([
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
  "heat_pump",
  "running",
  "detected",
  "motion",
  "occupied",
  "present"
]), Lr = /* @__PURE__ */ new Set([
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
]), Dr = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Rr = /* @__PURE__ */ new Set([
  "binary_sensor",
  "sensor",
  "camera",
  "weather",
  "sun",
  "zone",
  "person",
  "device_tracker",
  "update",
  "image",
  "calendar",
  "event",
  "counter"
]), Hr = /^\d+\s*,\s*\d+\s*,\s*\d+$/, Br = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;
function wt(l) {
  return `rgb(${l[0]}, ${l[1]}, ${l[2]})`;
}
const at = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function L(l, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if (Je(l), typeof window < "u" && window.dispatchEvent(new CustomEvent("haptic", { detail: l, bubbles: !0, composed: !0 })), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let t = 6;
        l === "heavy" ? t = 20 : l === "medium" ? t = 12 : l === "success" ? t = [40, 40, 80] : l === "warning" ? t = [50, 30, 50] : l === "error" && (t = [50, 100, 50]), navigator.vibrate(t);
      }
    } catch {
    }
}
const He = /* @__PURE__ */ new Map(), ii = 250;
function zr(l) {
  if (!l) return "";
  const e = He.get(l);
  if (e !== void 0) return e;
  const t = l.trim();
  if (!t)
    return He.set(l, ""), "";
  let i = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? i = t : Hr.test(t) ? i = `rgb(${t})` : Br.test(t) ? i = `rgba(${t})` : t.toLowerCase() === "state" ? i = "var(--state-icon-color, var(--primary-color))" : Lr.has(t.toLowerCase()) && (i = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), He.size >= ii) {
    const r = Math.floor(ii / 4), a = He.keys();
    for (let o = 0; o < r; o++) {
      const s = a.next().value;
      s !== void 0 && He.delete(s);
    }
  }
  return He.set(l, i), i;
}
class ne extends Ie {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._powerUnsubscribe = null, this._gl = null, this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), a = Number(t.value) || 0, o = t.style.getPropertyValue("--slider-pct") || "", s = r?.textContent || "";
      this._sliderStateMap.set(t, {
        startX: e.clientX,
        startY: e.clientY,
        initialVal: a,
        initialPct: o,
        initialBadge: s,
        isScrolling: !1,
        isSliding: !1
      });
    }, this._onSliderPointerMove = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const i = this._sliderStateMap.get(t);
      if (!i) return;
      const r = Math.abs(e.clientX - i.startX), a = Math.abs(e.clientY - i.startY);
      !i.isSliding && !i.isScrolling ? a > 6 && a > r ? (i.isScrolling = !0, this._revertSlider(t, i)) : r > 6 && r >= a && (i.isSliding = !0) : i.isScrolling && this._revertSlider(t, i);
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
          const r = Math.abs(e.clientX - i.startX), a = Math.abs(e.clientY - i.startY);
          r < 6 && a < 6 && (this._revertSlider(t, i), L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
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
    return { ...St };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...St,
      ...e
    }, this._cachedSubButtons = null;
    const t = /* @__PURE__ */ new Set();
    if (this.config.entity && t.add(this.config.entity), this.config.sub_button_1_entity && t.add(this.config.sub_button_1_entity), this.config.sub_button_2_entity && t.add(this.config.sub_button_2_entity), this.config.sub_button_3_entity && t.add(this.config.sub_button_3_entity), this.config.sub_button_4_entity && t.add(this.config.sub_button_4_entity), this.config.tap_action?.target?.entity_id) {
      const i = this.config.tap_action.target.entity_id;
      typeof i == "string" ? t.add(i) : Array.isArray(i) && i.forEach((r) => t.add(r));
    }
    if (this.config.hold_action?.target?.entity_id) {
      const i = this.config.hold_action.target.entity_id;
      typeof i == "string" ? t.add(i) : Array.isArray(i) && i.forEach((r) => t.add(r));
    }
    this._monitoredEntities = Array.from(t), this._computeStaticStylesAndClasses();
  }
  shouldUpdate(e) {
    if (!this.config || !this.hass || e.has("config") || e.has("preview") || e.has("_collapsed")) return !0;
    const t = e.get("hass");
    if (!t || t.themes !== this.hass.themes || t.locale !== this.hass.locale || t.language !== this.hass.language || t.selectedTheme !== this.hass.selectedTheme)
      return !0;
    const i = this._monitoredEntities, r = i.length;
    for (let a = 0; a < r; a++) {
      const o = i[a];
      if (t.states[o] !== this.hass.states[o])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const e = this.config.card_padding_vertical ?? this.config.card_padding ?? 0, t = this.config.card_padding_horizontal ?? this.config.card_padding ?? 15, i = this.config.card_padding_top ?? e, r = this.config.card_padding_bottom ?? e, a = this.config.card_padding_left ?? t, o = this.config.card_padding_right ?? t, s = this.config.card_margin ?? -1, u = this.config.card_margin_vertical ?? s, p = this.config.card_margin_horizontal ?? s, d = this.config.card_margin_top ?? u, n = this.config.card_margin_bottom ?? u, _ = this.config.card_margin_left ?? p, g = this.config.card_margin_right ?? p;
    let y = "";
    (d !== void 0 || n !== void 0 || _ !== void 0 || g !== void 0) && (y = `margin: ${d ?? 0}px ${g ?? 0}px ${n ?? 0}px ${_ ?? 0}px;`);
    const m = this.config.border_radius ?? 12, b = this.config.slider_style === "google", c = this.config.slider_style === "full", h = b ? 42 : c ? 40 : 12, f = this.config.slider_height !== void 0 ? this.config.slider_height : h, v = b ? 21 : c ? 0 : f / 2, w = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : v, $ = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), M = this.config.card_border_style ?? "solid", T = $ > 0 ? `border: ${$}px ${M} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", C = this.config.card_width ? `width: ${this.config.card_width};` : "", k = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", z = this.config.card_height ? `height: ${this.config.card_height};` : "", Y = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", j = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", X = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", se = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", be = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", ve = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", ye = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, G = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, xe = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, we = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Se = this.config.sub_button_padding ?? 6, $e = this.config.sub_button_container_padding ?? 0, ke = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", Ce = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", Ge = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      y,
      `border-radius: ${m}px;`,
      T,
      C,
      k,
      z,
      Y,
      j,
      X,
      se,
      be,
      ve,
      `--ag-card-padding: ${i}px ${o}px ${r}px ${a}px;`,
      `--ag-text-padding: ${ye}px ${G}px;`,
      `--ag-features-padding: ${xe}px ${we}px;`,
      `--ag-sub-button-padding: ${Se}px;`,
      `--ag-sub-button-container-padding: ${$e}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${f}px;`,
      `--ag-slider-radius: ${w}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      ke,
      Ce,
      Ge
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const Te = this.config.text_offset_x !== void 0 ? Number(this.config.text_offset_x) : -28, Me = this.config.text_offset_y !== void 0 ? Number(this.config.text_offset_y) : 2;
    this._textOffsetStyle = Te !== 0 || Me !== 0 ? `transform: translate(${Te}px, ${Me}px);` : "";
    const E = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x ?? 8), q = Number(this.config.primary_text_end_offset ?? 250), le = Number(this.config.primary_text_offset_y) || 0, I = E !== 0 || le !== 0 ? `transform: translate(${E}px, ${le}px);` : "", ce = E !== 0 || q !== 0 ? `margin-left: ${E}px; margin-right: ${q}px;` : "";
    this._primaryTextOffsetStyle = `${I} ${ce}`.trim();
    const F = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x ?? 8), Ae = Number(this.config.secondary_text_end_offset ?? 250), H = Number(this.config.secondary_text_offset_y) || 0, ee = F !== 0 || H !== 0 ? `transform: translate(${F}px, ${H}px);` : "", Pe = F !== 0 || Ae !== 0 ? `margin-left: ${F}px; margin-right: ${Ae}px;` : "";
    this._secondaryTextOffsetStyle = `${ee} ${Pe}`.trim();
    const de = Number(this.config.features_offset_x) || 0, Ee = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = de !== 0 || Ee !== 0 ? `transform: translate(${de}px, ${Ee}px);` : "";
    const Ne = Number(this.config.slider_start_offset) || 0, Le = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      Ne ? `margin-left: ${Ne}px !important;` : "",
      Le ? `margin-right: ${Le}px !important;` : ""
    ].filter(Boolean).join(" ");
    const K = Number(this.config.color_temp_start_offset) || 0, J = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      K ? `margin-left: ${K}px !important;` : "",
      J ? `margin-right: ${J}px !important;` : ""
    ].filter(Boolean).join(" ");
    const B = Number(this.config.color_slider_start_offset) || 0, O = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      B ? `margin-left: ${B}px !important;` : "",
      O ? `margin-right: ${O}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const Ve = `text-transform: ${this.config.text_transform_primary ?? "capitalize"};`, We = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, te = `letter-spacing: ${this.config.letter_spacing ?? -0.5}px;`, ie = `line-height: ${this.config.line_height ?? 1.1};`, De = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${De}; ${Ve} ${te} ${ie}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${We} ${te} ${ie}`;
    const re = this.config.entity, ue = [];
    for (let P = 1; P <= 4; P++) {
      const U = this.config[`sub_button_${P}_entity`], A = this.config[`sub_button_${P}_icon`], V = this.config[`sub_button_${P}_name`], Re = this.config[`sub_button_${P}_tap_action`], oe = this.config[`sub_button_${P}_hold_action`], ft = this.config[`sub_button_${P}_double_tap_action`], Ye = this.config[`sub_button_${P}_type`], gt = this.config[`sub_button_${P}_color`], mt = this.config[`sub_button_${P}_show_background`], rt = this.config[`sub_button_${P}_show_state`];
      if (!!(U || A || V || Ye && Ye !== "button" || rt)) {
        const Xe = U || re;
        ue.push(Object.freeze({
          key: `${Xe || "sub"}_${P}`,
          entity: Xe,
          type: Ye || "button",
          icon: A,
          color: gt,
          bg: mt,
          name: V,
          showState: rt === !0,
          tapAction: Re,
          holdAction: oe,
          doubleTapAction: ft
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(ue), this.config.fade_transition_enabled) {
      const P = Number(this.config.fade_stage_1_duration) || 60, U = Number(this.config.fade_stage_2_duration) || 600, A = Number(this.config.fade_stage_3_duration) || 1800, V = W(this.config.fade_stage_1_color) || [255, 152, 0], Re = W(this.config.fade_stage_2_color) || [205, 220, 57], oe = W(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: P,
        d2: U,
        d3: A,
        totalDuration: P + U + A,
        c1Rgb: V,
        c2Rgb: Re,
        c3Rgb: oe,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: oe ? wt(oe) : "",
          progressPct: 100,
          remainingSeconds: 0,
          currentStage: 0,
          stageLabel: "Resting"
        })
      };
    } else
      this._fadeStaticConfig = null;
  }
  _getSubButtons() {
    return this._cachedSubButtons || [];
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
    const i = this.config.entity.split(".")[0] === "light", r = e.state === "on", a = this.config.hide_color_temp_when_off !== !1, o = this.config.hide_color_picker_when_off !== !1, s = this.config.hide_color_slider_when_off !== !1, u = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, p = i && this.config.show_color_temp === !0 && (u !== void 0 || e.attributes?.supported_color_modes?.some((c) => ["color_temp"].includes(c))) && (!a || r), d = e.attributes?.supported_color_modes, n = Array.isArray(d) && d.some((c) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(c)), _ = this.config.color_picker_type !== "wheel", g = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && _) && n && (!s || r), y = i && this.config.show_color_picker === !0 && !_ && n && (!o || r), m = p || g || y, b = this._getSubButtons();
    this._cachedHasCollapsible = m || b.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), ct.registerCard(this), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._powerUnsubscribe = fe.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    }), this._updatePowerSaveAttribute(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _updatePowerSaveAttribute() {
    fe.isPowerSaveActive(this.hass) ? this.setAttribute("power-save", "") : this.removeAttribute("power-save");
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const e = this.config?.primary_info, t = this.config?.secondary_info, i = this.config?.entity, r = i ? i.split(".")[0] : "", a = (r === "binary_sensor" || r === "timer") && (e === "state" || t === "state"), o = this.config?.fade_transition_enabled === !0, s = i && this.hass ? this.hass.states[i] : null;
    let u = !1;
    if (o && s) {
      const d = this._calculateMultiStageFade(s);
      u = d.enabled && d.activeFade && d.progressPct < 100;
    }
    const p = u || a || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (p && !this._relativeTimer) {
      let d = u ? 1e3 : 5e3;
      const n = s?.attributes?.last_triggered || s?.last_changed || s?.last_updated;
      if (n && !u && !a) {
        const _ = this._parseDate(n);
        if (_) {
          const g = Math.max(0, (Date.now() - _.getTime()) / 1e3 | 0);
          g > 3600 ? d = 6e4 : g > 60 && (d = 15e3);
        }
      }
      fe.isPowerSaveActive(this.hass) && (d = Math.max(d, 1e4)), this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute("offscreen") && this.style.display !== "none") {
          if (u && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, d);
    } else !p && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  _isFadeActive() {
    const e = this.config?.entity;
    if (!e || !this.hass) return !1;
    const t = this.hass.states[e];
    if (!t) return !1;
    const i = this._calculateMultiStageFade(t);
    return i.enabled && i.activeFade && i.progressPct < 100;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ct.unregisterCard(this), this._powerUnsubscribe && (this._powerUnsubscribe(), this._powerUnsubscribe = null), this._gl && (ui(this._gl), this._gl = null), this._throttleMap.clear(), this._subTapTimerMap.forEach((e) => clearTimeout(e)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  firstUpdated(e) {
    super.firstUpdated(e);
  }
  updated(e) {
    if (super.updated(e), this._updateVisibility(), e.has("config") || e.has("_collapsed"))
      this._recomputeHasCollapsible(), this._setupRelativeTimer();
    else if (e.has("hass") && this.config?.entity) {
      const t = e.get("hass");
      (!t || t.states[this.config.entity] !== this.hass.states[this.config.entity]) && (this._recomputeHasCollapsible(), this._setupRelativeTimer());
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
    let a = !1;
    (e === "on" && !r || e === "off" && r) && (a = !0), this._toggleDisplay(a);
  }
  _isEntityActive(e) {
    return e ? Nr.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t = "", i = "") {
    if (!this.config?.fade_transition_enabled || !e)
      return at;
    const r = this._isEntityActive(e), a = this.config.fade_trigger ?? "on_inactive";
    if (!(a === "on_inactive" && !r || a === "on_active" && r || a === "both"))
      return at;
    const s = r ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || t || "#d60000", u = r ? this._resolveColor(this.config.active_color) || t || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", p = W(s) || [214, 0, 0], d = W(u) || [3, 177, 0], n = this._fadeStaticConfig, _ = n?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), g = n?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), y = n?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), m = n?.totalDuration ?? _ + g + y;
    if (m <= 0)
      return at;
    this._lastTrackedState !== null && this._lastTrackedState !== e.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = e.state;
    const b = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : p, c = n?.c1Rgb ?? (W(this.config.fade_stage_1_color) || [255, 152, 0]), h = this.config.fade_stage_2_pickup !== !1 ? c : p, f = n?.c2Rgb ?? (W(this.config.fade_stage_2_color) || [205, 220, 57]), v = this.config.fade_stage_3_pickup !== !1 ? f : c, w = n?.c3Rgb ?? (W(this.config.fade_stage_3_color) || d), $ = this._parseDate(e.attributes?.last_triggered || e.last_changed || e.last_updated);
    if (!$)
      return at;
    const M = Math.max(0, (Date.now() - $.getTime()) / 1e3);
    if (M >= m)
      return this._currentLiveRgb = w, this._previousLiveRgb = null, n?.restingResult ? n.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: wt(w),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let T, C = 1, k = 0;
    const z = Math.max(0, Math.round(m - M));
    M < _ && _ > 0 ? (C = 1, k = M / _, T = xt(b, c, k)) : M < _ + g && g > 0 ? (C = 2, k = (M - _) / g, T = xt(h, f, k)) : y > 0 ? (C = 3, k = (M - _ - g) / y, T = xt(v, w, k)) : (C = 0, T = w), this._currentLiveRgb = T;
    const Y = Math.min(100, Math.round(M / m * 100)), j = wt(T);
    let X = "";
    return z >= 60 ? X = `${Math.ceil(z / 60)}m left` : X = `${z}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: j,
      progressPct: Y,
      remainingSeconds: z,
      currentStage: C,
      stageLabel: X
    };
  }
  _resolveColor(e) {
    return zr(e);
  }
  _parseDate(e) {
    return ei.parseDate(e);
  }
  _getInfoContent(e, t) {
    return ei.getInfoContent(e, t, this.config, this.hass);
  }
  _dispatchAction(e, t, i) {
    const r = i || this.config.entity, a = r ? r.split(".")[0] : "", o = Rr.has(a);
    let s = t;
    if (s || (e === "double_tap" ? s = this.config.double_tap_action : e === "hold" ? s = this.config.hold_action || (o ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? o && this.config.tap_action.action === "toggle" ? s = { action: "none" } : s = this.config.tap_action : s = o ? { action: "none" } : { action: "toggle" }), !(!s || s.action === "none")) {
      if (s.action === "more-info") {
        const u = s.entity || r;
        if (u) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: u },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (s.action === "toggle" && r) {
        if (o)
          return;
        const u = a === "lock" ? this._isEntityActive(this.hass?.states[r]) ? "lock" : "unlock" : "toggle", p = ["lock", "cover"].includes(a) ? a : a === "group" ? "homeassistant" : a;
        this.hass?.callService(p, u, { entity_id: r });
        return;
      }
      if (s.action === "navigate" && s.navigation_path) {
        history.pushState(null, "", s.navigation_path), window.dispatchEvent(new CustomEvent("location-changed", {
          detail: { replace: !1 },
          bubbles: !0,
          composed: !0
        }));
        return;
      }
      if (s.action === "url" && s.url_path) {
        window.open(s.url_path, "_blank");
        return;
      }
      if (s.action === "call-service" && s.service) {
        const [u, p] = s.service.split(".", 2);
        this.hass?.callService(u, p, s.data || s.service_data || {}, s.target);
        return;
      }
      o && (!s.action || s.action === "toggle") || rr(this, this.hass, { ...this.config, entity: r }, e);
    }
  }
  _handleTap(e) {
    if (e.stopPropagation(), this._isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - ze < 800) {
      this._pointerDownReceived = !1;
      return;
    }
    if (!this._pointerDownReceived)
      return;
    if (this._pointerDownReceived = !1, this._moved || this._canceled) {
      this._moved = !1, this._canceled = !1;
      return;
    }
    if (this._held) {
      this._held = !1;
      return;
    }
    if (this._pointerDownTime && Date.now() - this._pointerDownTime > 600)
      return;
    const i = (this.config.collapse_controls_trigger || "hold") === "double_tap";
    if (!(i || this.config.double_tap_action && this.config.double_tap_action.action !== "none")) {
      L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, L("medium", this.config.haptic_feedback !== !1), i && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - ze < 800 || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(e) {
    if (e.preventDefault(), e.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - ze < 800 || this._held) return;
    L("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - ze < 800 || this._activePointerId !== null && this._activePointerId !== e.pointerId || (this._activePointerId = e.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = e.clientX, this._startY = e.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), L("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(e) {
    if (this._isSubElement(e) || this._activePointerId !== null && this._activePointerId !== e.pointerId) return;
    const t = e.clientX - this._startX, i = e.clientY - this._startY, r = Math.hypot(t, i), a = Math.max(1, Date.now() - this._pointerDownTime), o = r / a;
    (r > 8 || o > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerUp(e) {
    this._isSubElement(e) || (this._activePointerId = null, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerCancel(e) {
    this._isSubElement(e) || (this._activePointerId = null, this._canceled = !0, this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _isSubElement(e) {
    const t = e.target;
    return t ? t.tagName === "INPUT" || t.hasAttribute("data-ag-sub") ? !0 : !!t.closest?.("[data-ag-sub], .sub-button, .sub-color-picker, .sub-button-slider-container, .slider-container, .slider-google-wrap, .sub-button-google-slider, .color-picker") : !1;
  }
  _handleSubPointerDown(e, t, i) {
    e.stopPropagation(), this._subHeld = !1, this._subMoved = !1, this._subCanceled = !1, this._subPointerDownTime = Date.now(), this._subStartX = e.clientX, this._subStartY = e.clientY, this._subHoldTimer = setTimeout(() => {
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, L("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
    }, 500);
  }
  _handleSubPointerMove(e) {
    e.stopPropagation();
    const t = e.clientX - this._subStartX, i = e.clientY - this._subStartY, r = Math.hypot(t, i), a = Math.max(1, Date.now() - this._subPointerDownTime), o = r / a;
    (r > 8 || o > 0.5) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  _handleSubPointerUp(e) {
    e.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubPointerCancel(e) {
    e.stopPropagation(), this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubTap(e, t, i, r, a) {
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
    const o = r && r.action !== "none", s = t || "sub_default", u = () => {
      L("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, t) : a ? a() : this._dispatchAction("tap", { action: "toggle" }, t);
    };
    if (!o) {
      u();
      return;
    }
    const p = this._subTapTimerMap.get(s);
    if (p) {
      clearTimeout(p), this._subTapTimerMap.delete(s), L("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", r, t);
      return;
    }
    const d = setTimeout(() => {
      this._subTapTimerMap.delete(s), u();
    }, 250);
    this._subTapTimerMap.set(s, d);
  }
  _handleSubContextMenu(e, t, i) {
    e.preventDefault(), e.stopPropagation(), !this._subHeld && (L("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(e, t, i) {
    const r = i ?? (fe.isPowerSaveActive(this.hass) ? 60 : 30), a = this._throttleMap.get(e) ?? 0, o = Date.now();
    if (!(o - a < r)) {
      this._throttleMap.set(e, o);
      try {
        t();
      } finally {
        setTimeout(() => {
          this._throttleMap.get(e) === o && this._throttleMap.delete(e);
        }, r + 50);
      }
    }
  }
  _revertSlider(e, t) {
    e.value = String(t.initialVal), e.style.setProperty("--slider-pct", t.initialPct);
    const r = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    r && (r.textContent = t.initialBadge);
  }
  _sliderInput(e, t, i, r, a, o, s) {
    e.stopPropagation();
    const u = e.target, p = this._sliderStateMap.get(u);
    if (p?.isScrolling) {
      this._revertSlider(u, p);
      return;
    }
    const d = Number(u.value), n = isNaN(d) ? 0 : d, _ = o ? o(n) : n;
    if (p) {
      if (p.rafPending) return;
      p.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (p && (p.rafPending = !1), p?.isScrolling) {
        this._revertSlider(u, p);
        return;
      }
      u.style.setProperty("--slider-pct", `${_}%`);
      const g = u.closest(".slider-container, .sub-button-slider-container"), y = g?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (y && (y.textContent = s ? s(n, _) : `${_}%`), t === "color_hue" && g) {
        g.style.setProperty("--color-hue-val", `hsl(${n}, 100%, 50%)`);
        const m = g.querySelector(".color-chip-badge span");
        m && (m.style.background = `hsl(${n}, 100%, 50%)`);
      }
    }), L("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(e, t, i, r) {
    e.stopPropagation();
    const a = e.target, o = this._sliderStateMap.get(a);
    if (o?.isScrolling) {
      this._revertSlider(a, o), o.isScrolling = !1;
      return;
    }
    const s = Number(a.value), u = isNaN(s) ? 0 : s;
    if (!(o && u === o.initialVal)) {
      if (t === "light" && i === "turn_on") {
        const p = Math.round(u / 255 * 100);
        if (u <= 3 || p <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (t === "fan" && i === "set_percentage" && u <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(t, i, { entity_id: this.config.entity, ...r(u) });
    }
  }
  _getLightLiveColor(e) {
    if (!e || !e.attributes || e.state !== "on") return null;
    const t = e.attributes;
    if (t.color_mode === "color_temp") {
      const r = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [a, o, s] = Q(r);
      return `rgb(${a}, ${o}, ${s})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [r, a, o] = yt(t.hs_color[0], t.hs_color[1]);
      return `rgb(${r}, ${a}, ${o})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const r = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [a, o, s] = Q(r);
      return `rgb(${a}, ${o}, ${s})`;
    }
    return e.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(e) {
    if (!e?.attributes || e.state !== "on") return "#ffffff";
    const t = e.attributes;
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return ot(t.rgb_color);
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2)
      return ot(yt(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const a = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return ot(Q(a));
    }
    const i = this._getLightLiveColor(e);
    if (!i) return "#ffffff";
    const r = W(i);
    return r ? ot(r) : "#ffffff";
  }
  _getLiveHue(e) {
    if (!e) return 0;
    if (Array.isArray(e.attributes?.hs_color) && e.attributes.hs_color.length >= 1)
      return Math.round(e.attributes.hs_color[0]) % 360;
    if (Array.isArray(e.attributes?.rgb_color) && e.attributes.rgb_color.length >= 3) {
      const [t, i, r] = e.attributes.rgb_color;
      return pr(t, i, r);
    }
    return 0;
  }
  _handleColorInput(e, t, i, r) {
    e.stopPropagation();
    const a = e.target.value;
    if (!a) return;
    const o = W(a);
    if (!o) return;
    const s = i || this.config.entity, u = () => {
      this.hass.callService("light", "turn_on", { entity_id: s, rgb_color: o });
    };
    t ? this._throttledCall(r || "color_picker", u) : u();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return S``;
    const e = this.config.entity;
    if (!e)
      return S`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const t = this.hass.states[e];
    if (!t)
      return S`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${e}</code></span>
        </ha-card>
      `;
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", r = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", a = this._isEntityActive(t), o = e.split(".")[0];
    let s = "var(--primary-color)", u = null;
    o === "climate" ? t.state === "heat" ? s = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? s = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? s = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (s = "var(--state-climate-fan_only-color, #26a69a)") : o === "light" ? (u = this._getLightLiveColor(t), u && (s = u)) : (o === "binary_sensor" || o === "lock" || o === "switch") && (s = "#d60000");
    const p = this.config.color_type === "card";
    let d = this._resolveColor(this.config.active_color);
    (!d || this.config.use_light_color) && (o === "light" && u ? d = u : d = s);
    let n = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    o === "light" ? n = "#000000" : (o === "binary_sensor" || o === "lock" || o === "switch") && (n = "#03b500");
    const _ = this._resolveColor(this.config.inactive_color) || n, g = this.config.show_slider !== !1, y = o === "light", m = o === "cover", b = o === "fan", c = o === "humidifier", h = o === "media_player", f = o === "number" || o === "input_number", v = o === "climate", w = this.config.hide_slider_when_off !== !1, $ = this.config.hide_color_temp_when_off !== !1, M = this.config.hide_color_picker_when_off !== !1, T = this.config.hide_color_slider_when_off !== !1, C = t.attributes?.supported_color_modes;
    let k = t.attributes?.brightness !== void 0, z = !1, Y = !1;
    if (Array.isArray(C))
      for (let A = 0; A < C.length; A++) {
        const V = C[A];
        V !== "onoff" && (k = !0), V === "color_temp" && (z = !0), Dr.has(V) && (Y = !0);
      }
    const j = y && g && k && (!w || a), X = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, se = y && g && this.config.show_color_temp === !0 && (X !== void 0 || z) && (!$ || a), be = this.config.color_picker_type !== "wheel", ve = y && g && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && be) && Y && (!T || a), ye = y && g && this.config.show_color_picker === !0 && !be && Y && (!M || a), G = t.state !== "unavailable" && t.state !== "unknown", xe = m && G && g && t.attributes?.current_position !== void 0, we = b && G && a && g && t.attributes?.percentage !== void 0, Se = c && G && a && g && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), $e = h && G && a && g && t.attributes?.volume_level !== void 0, ke = f && G && g, Ce = v && G && a && g && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), Ge = (this.config.bg_opacity ?? 10) / 100, Te = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : p && a && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${d};`, Me = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : p && a ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", E = this._calculateMultiStageFade(t, s, _), q = this.config.fade_target ?? "card", le = this._resolveColor(this.config.bg_color);
    let I;
    E.activeFade && (q === "card" || q === "all" || p) ? I = E.currentColor : p ? o === "light" ? I = a ? u || d : this.config.inactive_color ? _ : "#000000" : I = a ? d : _ : le ? I = le : o === "light" && !a ? I = "#000000" : I = `rgba(150, 150, 150, ${Ge})`;
    let ce = this._resolveColor(this.config.active_color) || (o === "light" && u ? u : d) || "var(--primary-color)";
    E.activeFade && (q === "all" || this.config.active_glow === !0) && (ce = E.currentColor);
    let F = "";
    this.config.box_shadow === "soft" && (F = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (F = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (F = a || E.activeFade ? `box-shadow: 0 0 22px ${ce}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const Ae = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", H = t?.attributes?.device_class, ee = o === "binary_sensor" && (H === "motion" || H === "occupancy" || H === "presence"), Pe = o === "binary_sensor" && (H === "door" || H === "window" || H === "garage_door" || H === "opening"), de = ee && (a || E.activeFade && E.currentStage === 1) ? "motion-active" : "", Ee = Pe && a ? "door-open" : "", Ne = o === "climate" && t?.attributes?.hvac_action ? `hvac-${t.attributes.hvac_action}` : "", Le = o === "cover" ? t?.state === "opening" ? "cover-opening" : t?.state === "closing" ? "cover-closing" : "" : "", K = `${this._staticCardClasses} ${Ae} ${de} ${Ee} ${Ne} ${Le}`, J = this._getSubButtons();
    let B = "";
    this.config.text_color_mode === "active_accent" && a ? B += `--primary-text-color: ${d}; ` : this.config.text_color_primary ? B += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : p && a && (B += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? B += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : p && a && (B += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const O = this.config.features_position === "inline", Ve = this.config.text_scrolling_primary || "none", We = this.config.text_scrolling_secondary || "none", te = S`
      ${j ? this._renderLightSlider(t) : x}
      ${xe ? this._renderCoverSlider(t) : x}
      ${we ? this._renderFanSlider(t) : x}
      ${Se ? this._renderHumidifierSlider(t) : x}
      ${$e ? this._renderMediaSlider(t) : x}
      ${ke ? this._renderNumberSlider(t) : x}
      ${Ce ? this._renderClimateSlider(t) : x}
    `, ie = S`
      ${se ? this._renderColorTempSlider(t) : x}
      ${ve ? this._renderColorSlider(t) : x}
      ${ye ? this._renderColorPicker(t) : x}
    `, De = j || xe || we || Se || $e || ke || Ce, re = se || ve || ye, ue = !O && re || J.length > 0, P = this.config.decay_slider_position ?? "bottom", U = $t.sanitizeCustomStyles(this.config.custom_styles);
    return S`
      ${U ? S`<style>${oi(U)}</style>` : x}
      <ha-card 
        class="${K}" 
        ?active=${a}
        style="${this._staticCardStyles} background: ${I}; ${F} ${Te} ${Me} ${B} --ag-glow-color: ${ce}; --ag-active-color: ${d};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${O ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${P === "top" ? this._renderDecaySlider(E) : x}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${i ? S`
                <div class="text-marquee-container scroll-${Ve}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : x}
              ${r ? S`
                <div class="text-marquee-container scroll-${We}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${r}</span>
                </div>` : x}
            </div>
            ${P === "inline" ? S`<div class="inline-sliders">${this._renderDecaySlider(E)}</div>` : x}
            ${O && De ? S`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${te}</div>` : x}
            ${O && re ? S`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${ie}</div>` : x}
          </div>
          
          ${P === "bottom" ? this._renderDecaySlider(E) : x}
          ${!O && De ? S`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${te}</div>` : x}

          ${ue ? S`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!O && re ? S`<div class="features-container" style="${this._featuresOffsetStyle}">${ie}</div>` : x}

              ${J.length > 0 ? S`
                <div class="sub-buttons-container">
                  ${Ji(
      J,
      (A) => A.key,
      (A) => this._renderSubButton(A.entity || "", A.icon, A.color, A.bg !== !1, A.name, A.tapAction, A.holdAction, A.type, A.doubleTapAction, A.showState)
    )}
                </div>
              ` : x}
            </div>
          ` : x}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(e) {
    if (!this.config.show_decay_slider || !e.enabled || !e.activeFade)
      return x;
    const t = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (t ? 32 : 10), r = this.config.slider_border_radius ?? (t ? 16 : 5), a = Math.max(0, 100 - e.progressPct);
    return S`
      <div class="decay-slider-container" style="--decay-color: ${e.currentColor};">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${r}px;">
          <div class="decay-slider-fill" style="width: ${a}%; background: ${e.currentColor}; border-radius: ${r}px;"></div>
          <span class="decay-slider-badge">${e.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(e, t, i, r, a, o, s, u, p, d, n, _, g = "", y = "", m) {
    const b = this.config.slider_style === "google", c = b && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, h = _ ? _(o, s) : `${s}%`, f = m !== void 0 ? m : h, v = this.config.slider_stepped_movement === !1 ? "any" : a, w = e !== "color_temp" && e !== "color_hue", $ = this.config.slider_style === "full", M = w && $ ? "main-slider-full" : "";
    let T = "";
    if (w && $) {
      const C = Number(this.config.slider_start_offset) || 0, k = Number(this.config.slider_end_offset) || 0;
      T = `left: ${C}px !important; right: ${k}px !important; width: calc(100% - ${C + k}px) !important;`;
    } else e === "color_temp" ? T = this._colorTempMarginOffsets : e === "color_hue" ? T = this._colorHueMarginOffsets : T = this._mainSliderMarginOffsets;
    return S`
      <div class="slider-container ${g} ${M} ${b ? "slider-google-wrap" : ""}" style="${T} ${y}">
        <input type="range" min=${i} max=${r} step=${v} .value=${o}
               aria-label="${t}"
               style="--slider-pct: ${s}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(C) => this._sliderInput(C, e, u, p, d, n, _)}
               @change=${(C) => this._sliderChange(C, u, p, d)} />
        ${c && f ? S`<span class="slider-percent-badge">${f}</span>` : x}
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(e) {
    const t = this._isEntityActive(e), i = e.attributes.brightness ?? 0, r = Math.max(0, Math.min(100, Math.round(i / 255 * 100))), a = this._getLightLiveColor(e), o = (this.config.use_light_color !== !1 || !this.config.slider_color) && a ? `--slider-color: ${a};` : "";
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
      (s, u) => !t || u <= 0 ? "" : `${u}%`,
      "",
      o
    );
  }
  _renderColorTempSlider(e) {
    const t = this.config.color_temp_type || "gradient", i = e.attributes.color_temp_kelvin !== void 0 || e.attributes.min_color_temp_kelvin !== void 0 || e.attributes.max_color_temp_kelvin !== void 0, r = i ? e.attributes.min_color_temp_kelvin || 2e3 : e.attributes.min_mireds || 153, a = i ? e.attributes.max_color_temp_kelvin || 6500 : e.attributes.max_mireds || 500, o = i ? e.attributes.color_temp_kelvin || 3e3 : e.attributes.color_temp || 300, s = a - r, u = s > 0 ? Math.max(0, Math.min(100, Math.round((o - r) / s * 100))) : 0, p = i ? "color_temp_kelvin" : "color_temp", d = t === "google" || t === "gradient" && this.config.slider_style === "google", n = d ? 42 : t === "thin" ? 6 : 12, _ = d ? 21 : t === "thin" ? 3 : 6, g = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? n, y = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? _, m = i ? `${o} K` : `${o} mireds`;
    if (t === "presets") {
      const b = Number(this.config.color_temp_start_offset) || 0, c = Number(this.config.color_temp_end_offset) || 0, h = [
        b ? `margin-left: ${b}px;` : "",
        c ? `margin-right: ${c}px;` : ""
      ].filter(Boolean).join(" ");
      return S`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${h}">
          ${gr.map((f) => {
        const [v, w, $] = f.rgb, M = Math.abs(o - f.k) < 200, T = () => {
          L("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, [p]: f.k });
        };
        return S`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${f.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${g}px; border-radius: ${y}px; border: ${M ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${v}, ${w}, ${$}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${M ? "0 0 8px rgba(" + v + "," + w + "," + $ + ", 0.8)" : "none"};"
                @keydown=${(C) => {
          (C.key === "Enter" || C.key === " ") && (C.preventDefault(), C.stopPropagation(), T());
        }}
                @click=${(C) => {
          C.stopPropagation(), T();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${v}, ${w}, ${$}); display: inline-block;"></span>
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
      a,
      1,
      o,
      u,
      "light",
      "turn_on",
      (b) => ({ [p]: b }),
      (b) => s > 0 ? Math.round((b - r) / s * 100) : 0,
      (b) => i ? `${b} K` : `${b} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${d ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${g}px; --ag-slider-radius: ${y}px;`,
      m
    );
  }
  _renderColorSlider(e) {
    const t = this.config.color_picker_type || "slider";
    if (t === "wheel")
      return this._renderColorPicker(e);
    if (t === "swatches") {
      const d = this._getLiveHex(e).toLowerCase(), n = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, _ = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, g = Number(this.config.color_slider_start_offset) || 0, y = Number(this.config.color_slider_end_offset) || 0, m = [
        g ? `margin-left: ${g}px;` : "",
        y ? `margin-right: ${y}px;` : ""
      ].filter(Boolean).join(" ");
      return S`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${m}">
          ${fr.map((b) => {
        const c = d === b.hex.toLowerCase(), h = () => {
          L("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: b.rgb });
        };
        return S`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${b.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${b.label}"
                style="flex: 1; min-width: 28px; height: ${n}px; border-radius: ${_}px; background: ${b.hex}; border: ${c ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${c ? "0 0 10px " + b.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @keydown=${(f) => {
          (f.key === "Enter" || f.key === " ") && (f.preventDefault(), f.stopPropagation(), h());
        }}
                @click=${(f) => {
          f.stopPropagation(), h();
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this.config.slider_style === "google", r = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? (i ? 42 : 36), a = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? (i ? 21 : 8), o = this._getLiveHue(e), s = `hsl(${o}, 100%, 50%)`, u = Math.round(o / 360 * 100);
    let p;
    return this.config.color_swatch_presets !== !1 && (p = S`
        <div class="color-swatch-chips">
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Red Color" style="background: #f44336;" @click=${(d) => {
      d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [244, 67, 54] });
    }} @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [244, 67, 54] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Orange Color" style="background: #ff9800;" @click=${(d) => {
      d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [255, 152, 0] });
    }} @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [255, 152, 0] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Yellow Color" style="background: #ffeb3b;" @click=${(d) => {
      d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [255, 235, 59] });
    }} @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [255, 235, 59] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Green Color" style="background: #4caf50;" @click=${(d) => {
      d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [76, 175, 80] });
    }} @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [76, 175, 80] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Cyan Color" style="background: #00bcd4;" @click=${(d) => {
      d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [0, 188, 212] });
    }} @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [0, 188, 212] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Blue Color" style="background: #2196f3;" @click=${(d) => {
      d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [33, 150, 243] });
    }} @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [33, 150, 243] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Purple Color" style="background: #9c27b0;" @click=${(d) => {
      d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [156, 39, 176] });
    }} @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [156, 39, 176] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Pink Color" style="background: #e91e63;" @click=${(d) => {
      d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [233, 30, 99] });
    }} @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), d.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [233, 30, 99] }));
    }}></span>
        </div>
      `), this._renderGenericSlider(
      "color_hue",
      "Light Color Hue",
      0,
      360,
      1,
      o,
      u,
      "light",
      "turn_on",
      (d) => {
        const [n, _, g] = yt(d, 100);
        return { rgb_color: [n, _, g] };
      },
      (d) => Math.round(d / 360 * 100),
      (d) => `${d}°`,
      `color-hue ${i ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${r}px; --ag-slider-radius: ${a}px; --color-hue-val: ${s};`,
      p
    );
  }
  _renderColorPicker(e) {
    const t = this._getLiveHex(e), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, r = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return S`
      <div class="color-picker" title="Adjust Light Color" style="height: ${i}px; border-radius: ${r}px;">
        <input type="color" 
               .value=${t} 
               @input=${(a) => this._handleColorInput(a, !0)}
               @change=${(a) => this._handleColorInput(a, !1)} />
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
      (r) => {
        const a = i > 1 ? Math.round(r / i) * i : r;
        return { percentage: Math.min(100, Math.max(0, a)) };
      },
      (r) => r,
      (r, a) => `${a}%`
    );
  }
  _renderMediaSlider(e) {
    const t = e.attributes.is_volume_muted === !0, i = t ? 0 : Math.round((e.attributes.volume_level ?? 0) * 100), r = t ? "Muted (0%)" : void 0;
    return this._renderGenericSlider(
      "media",
      "Volume",
      0,
      100,
      1,
      i,
      i,
      "media_player",
      "volume_set",
      (a) => ({ volume_level: a / 100 }),
      (a) => a,
      (a, o) => t ? "Muted" : `${o}%`,
      "media",
      "",
      r
    );
  }
  _renderNumberSlider(e) {
    const t = Number(e.attributes.min ?? 0);
    let i = Number(e.attributes.max ?? 100);
    t >= i && (i = t + 100);
    const r = Number(e.attributes.step ?? 1), a = Number(e.state), o = isNaN(a) ? t : a, s = i - t, u = s > 0 ? Math.max(0, Math.min(100, Math.round((o - t) / s * 100))) : 0, p = (this.config.entity || "number").split(".")[0], d = e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : "", n = r.toString(), _ = n.includes(".") ? n.split(".")[1].length : 0;
    return this._renderGenericSlider(
      "number",
      "Value",
      t,
      i,
      r,
      o,
      u,
      p,
      "set_value",
      (g) => ({ value: _ > 0 ? Number(g.toFixed(_)) : Math.round(g) }),
      (g) => s > 0 ? Math.round((g - t) / s * 100) : 0,
      (g) => `${_ > 0 ? Number(g).toFixed(_) : Math.round(Number(g))}${d}`
    );
  }
  _renderClimateSlider(e) {
    const t = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = t ? "°F" : "°C", r = t ? 60 : 16, a = t ? 85 : 30, o = e.attributes.min_temp ?? r, s = e.attributes.max_temp ?? a, u = e.attributes.target_temp_step ?? e.attributes.target_temperature_step ?? (t ? 1 : 0.5), p = e.attributes.target_temp_low !== void 0 && e.attributes.target_temp_high !== void 0, d = e.attributes.temperature ?? e.attributes.target_temp_low ?? e.attributes.target_temp_high ?? o, n = s - o, _ = n > 0 ? Math.max(0, Math.min(100, Math.round((d - o) / n * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      o,
      s,
      u,
      d,
      _,
      "climate",
      "set_temperature",
      (g) => p ? { target_temp_low: g, target_temp_high: Math.min(s, g + (t ? 4 : 2)) } : { temperature: g },
      (g) => n > 0 ? Math.round((g - o) / n * 100) : 0,
      (g) => `${g}${i}`,
      "climate-temp",
      "",
      `${d}${i}`
    );
  }
  _renderHumidifierSlider(e) {
    const t = e.attributes?.min_humidity ?? 0, i = e.attributes?.max_humidity ?? 100, r = e.attributes?.humidity ?? e.attributes?.target_humidity ?? t, a = i - t, o = a > 0 ? Math.max(0, Math.min(100, Math.round((r - t) / a * 100))) : 0;
    return this._renderGenericSlider(
      "humidifier",
      "Humidity",
      t,
      i,
      1,
      r,
      o,
      "humidifier",
      "set_humidity",
      (s) => ({ humidity: s }),
      (s) => a > 0 ? Math.round((s - t) / a * 100) : 0,
      (s, u) => `${u}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(e, t, i, r, a) {
    const o = t || this.hass.states[this.config.entity || ""], s = e || this.config.entity || "", u = o?.attributes?.volume_level !== void 0 || o?.entity_id?.startsWith("media_player."), p = o?.attributes?.percentage !== void 0 || o?.entity_id?.startsWith("fan."), d = o?.attributes?.current_position !== void 0 || o?.entity_id?.startsWith("cover.");
    let n = 0, _ = 0, g = 255, y = "1", m = "turn_on", b = "light", c = "brightness";
    u ? (n = o?.attributes?.volume_level ?? 0, g = 1, y = "0.01", m = "set_volume_level", b = "media_player", c = "volume_level") : p ? (n = o?.attributes?.percentage ?? 0, g = 100, y = "1", m = "set_percentage", b = "fan", c = "percentage") : d ? (n = o?.attributes?.current_position ?? 0, g = 100, y = "1", m = "set_cover_position", b = "cover", c = "position") : n = o?.attributes?.brightness ?? 0;
    const h = Math.round(g === 1 ? n * 100 : g === 100 ? n : n / 255 * 100);
    return i === "slider" ? S`
        <div class="sub-button-slider-container ${a}" style="${r}" title="Level: ${h}%">
          <input type="range" 
                 min="${_}" 
                 max=${g} 
                 step=${y} 
                 .value=${n}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const v = parseFloat(f.target.value), w = Math.round(g === 1 ? v * 100 : g === 100 ? v : v / 255 * 100), $ = f.target.closest(".sub-button-slider-container");
      $ && $.setAttribute("title", `Level: ${w}%`), this._throttledCall("sub_slider_" + s, () => {
        this.hass?.callService(b, m, { entity_id: s, [c]: v });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const v = parseFloat(f.target.value);
      this.hass?.callService(b, m, { entity_id: s, [c]: v });
    }} />
        </div>
      ` : S`
        <div class="sub-button-google-slider ${a}" style="${r} --slider-pct: ${h}%;" title="Level: ${h}%">
          <input type="range" 
                 min="${_}" 
                 max=${g} 
                 step=${y} 
                 .value=${n}
                 style="--slider-pct: ${h}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const v = parseFloat(f.target.value), w = Math.round(g === 1 ? v * 100 : g === 100 ? v : v / 255 * 100), $ = f.target;
      requestAnimationFrame(() => {
        $.style.setProperty("--slider-pct", `${w}%`);
        const M = $.closest(".sub-button-google-slider");
        if (M) {
          M.style.setProperty("--slider-pct", `${w}%`), M.title = `Level: ${w}%`;
          const T = M.querySelector(".sub-slider-pct");
          T && (T.textContent = `${w}%`);
        }
      }), this._throttledCall("sub_slider_" + s, () => {
        this.hass?.callService(b, m, { entity_id: s, [c]: v });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const v = parseFloat(f.target.value);
      this.hass?.callService(b, m, { entity_id: s, [c]: v });
    }} />
          <span class="sub-slider-pct">${h}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(e, t, i, r, a, o) {
    const s = t || this.hass.states[this.config.entity || ""], u = this._getLiveHex(s);
    return S`
      <div class="sub-button sub-color-picker ${r}" 
           tabindex="0" 
           role="button" 
           title="Select Color (${u})" 
           style="${i} background: ${u} !important; border: 2px solid rgba(255,255,255,0.7); box-shadow: 0 1px 4px rgba(0,0,0,0.3);"
           @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.currentTarget.querySelector("input")?.click());
    }}>
        <input type="color" 
               aria-label="Color Picker"
               .value=${u} 
               @input=${(p) => this._handleColorInput(p, !0, e || this.config.entity, "sub_color_picker_" + e)}
               @change=${(p) => this._handleColorInput(p, !1, e || this.config.entity)} />
        ${a ? S`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${a}</span>` : x}
        ${o ? S`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${o}</span>` : x}
      </div>
    `;
  }
  _renderSubButton(e, t, i, r = !0, a, o, s, u = "button", p, d = !1) {
    const n = e ? this.hass?.states[e] : this.hass?.states[this.config.entity || ""], _ = this._isEntityActive(n), g = i ? `color: ${i};` : "", y = r ? "" : "no-bg", m = i ? this._resolveColor(i) : void 0;
    if (u === "slider" || u === "google_slider") {
      const k = i ? `--primary-color: ${i}; --slider-color: ${i};` : "";
      return this._renderSubSlider(e, n, u, k, y);
    }
    let b;
    d && n && (b = this._getInfoContent("state", n));
    const c = (e || this.config.entity || "").split(".")[0];
    if (u === "color_picker" && (c === "light" || !e && this.config.entity?.startsWith("light.")))
      return this._renderSubColorPicker(e, n, g, y, a, b);
    const h = cr.resolve(
      u,
      e,
      this.config.entity,
      n,
      t,
      a,
      _,
      this.hass?.config?.unit_system?.temperature,
      o
    ), f = h.icon, v = h.title, w = h.label, $ = h.isActive, M = h.animClass;
    let T;
    h.defaultAction && (T = () => h.defaultAction(this.hass, this.config.entity));
    const C = (k) => {
      this._handleSubTap(k, e, o, p, T);
    };
    return S`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${y}" 
        ?active=${$} 
        style="${g} ${$ && m && r ? `background: ${m}; color: #fff;` : ""}"
        title="${v}"
        @click=${C}
        @dblclick=${(k) => k.stopPropagation()}
        @keydown=${(k) => {
      (k.key === "Enter" || k.key === " ") && (k.preventDefault(), k.stopPropagation(), C(k));
    }}
        @pointerdown=${(k) => this._handleSubPointerDown(k, e, s)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(k) => this._handleSubContextMenu(k, e, s)}>
        <ha-icon .icon=${f} class="${M}"></ha-icon>
        ${w ? S`<span class="sub-button-label">${w}</span>` : x}
        ${b ? S`<span class="sub-button-state">${b}</span>` : x}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return lr;
  }
}
Ue([
  ht({ attribute: !1 })
], ne.prototype, "hass", 2);
Ue([
  ht({ type: Boolean })
], ne.prototype, "preview", 2);
Ue([
  _t()
], ne.prototype, "config", 2);
Ue([
  _t()
], ne.prototype, "_collapsed", 2);
Ue([
  di({ passive: !0 })
], ne.prototype, "_handlePointerMove", 1);
Ue([
  di({ passive: !0 })
], ne.prototype, "_handleSubPointerMove", 1);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", ne);
customElements.get("antigravity-card") || customElements.define("antigravity-card", ne);
export {
  ne as AntigravityCard,
  Er as CARD_VERSION
};
