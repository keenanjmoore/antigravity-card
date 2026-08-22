const lt = globalThis, Tt = lt.ShadowRoot && (lt.ShadyCSS === void 0 || lt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mt = Symbol(), It = /* @__PURE__ */ new WeakMap();
let nr = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Tt && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = It.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && It.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const sr = (c) => new nr(typeof c == "string" ? c : c + "", void 0, Mt), lr = (c, ...e) => {
  const t = c.length === 1 ? c[0] : e.reduce((r, i, a) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + c[a + 1], c[0]);
  return new nr(t, c, Mt);
}, wr = (c, e) => {
  if (Tt) c.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = lt.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, c.appendChild(r);
  }
}, Ot = Tt ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return sr(t);
})(c) : c;
const { is: Sr, defineProperty: $r, getOwnPropertyDescriptor: Cr, getOwnPropertyNames: kr, getOwnPropertySymbols: Tr, getPrototypeOf: Mr } = Object, pt = globalThis, Ft = pt.trustedTypes, Ar = Ft ? Ft.emptyScript : "", Pr = pt.reactiveElementPolyfillSupport, je = (c, e) => c, ct = { toAttribute(c, e) {
  switch (e) {
    case Boolean:
      c = c ? Ar : null;
      break;
    case Object:
    case Array:
      c = c == null ? c : JSON.stringify(c);
  }
  return c;
}, fromAttribute(c, e) {
  let t = c;
  switch (e) {
    case Boolean:
      t = c !== null;
      break;
    case Number:
      t = c === null ? null : Number(c);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(c);
      } catch {
        t = null;
      }
  }
  return t;
} }, At = (c, e) => !Sr(c, e), Ut = { attribute: !0, type: String, converter: ct, reflect: !1, useDefault: !1, hasChanged: At };
Symbol.metadata ??= Symbol("metadata"), pt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ie = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ut) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && $r(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: a } = Cr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const n = i?.call(this);
      a?.call(this, o), this.requestUpdate(e, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(je("elementProperties"))) return;
    const e = Mr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(je("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(je("properties"))) {
      const t = this.properties, r = [...kr(t), ...Tr(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(Ot(i));
    } else e !== void 0 && t.push(Ot(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return wr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : ct).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ct;
      this._$Em = i;
      const n = o.fromAttribute(t, a.type);
      this[i] = n ?? this._$Ej?.get(i) ?? n, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, a) {
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (a = this[e]), r ??= o.getPropertyOptions(e), !((r.hasChanged ?? At)(a, t) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: a }, o) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, a] of r) {
        const { wrapped: o } = a, n = this[i];
        o !== !0 || this._$AL.has(i) || n === void 0 || this.C(i, void 0, a, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
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
Ie.elementStyles = [], Ie.shadowRootOptions = { mode: "open" }, Ie[je("elementProperties")] = /* @__PURE__ */ new Map(), Ie[je("finalized")] = /* @__PURE__ */ new Map(), Pr?.({ ReactiveElement: Ie }), (pt.reactiveElementVersions ??= []).push("2.1.2");
const Pt = globalThis, Gt = (c) => c, dt = Pt.trustedTypes, Vt = dt ? dt.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, cr = "$lit$", se = `lit$${Math.random().toFixed(9).slice(2)}$`, dr = "?" + se, Er = `<${dr}>`, be = document, et = () => be.createComment(""), tt = (c) => c === null || typeof c != "object" && typeof c != "function", Et = Array.isArray, Nr = (c) => Et(c) || typeof c?.[Symbol.iterator] == "function", yt = `[ 	
\f\r]`, Je = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wt = /-->/g, Yt = />/g, he = RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xt = /'/g, Kt = /"/g, ur = /^(?:script|style|textarea|title)$/i, Lr = (c) => (e, ...t) => ({ _$litType$: c, strings: e, values: t }), S = Lr(1), ve = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), qt = /* @__PURE__ */ new WeakMap(), me = be.createTreeWalker(be, 129);
function pr(c, e) {
  if (!Et(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Vt !== void 0 ? Vt.createHTML(e) : e;
}
const Dr = (c, e) => {
  const t = c.length - 1, r = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Je;
  for (let n = 0; n < t; n++) {
    const d = c[n];
    let h, u, s = -1, f = 0;
    for (; f < d.length && (o.lastIndex = f, u = o.exec(d), u !== null); ) f = o.lastIndex, o === Je ? u[1] === "!--" ? o = Wt : u[1] !== void 0 ? o = Yt : u[2] !== void 0 ? (ur.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = he) : u[3] !== void 0 && (o = he) : o === he ? u[0] === ">" ? (o = i ?? Je, s = -1) : u[1] === void 0 ? s = -2 : (s = o.lastIndex - u[2].length, h = u[1], o = u[3] === void 0 ? he : u[3] === '"' ? Kt : Xt) : o === Kt || o === Xt ? o = he : o === Wt || o === Yt ? o = Je : (o = he, i = void 0);
    const p = o === he && c[n + 1].startsWith("/>") ? " " : "";
    a += o === Je ? d + Er : s >= 0 ? (r.push(h), d.slice(0, s) + cr + d.slice(s) + se + p) : d + se + (s === -2 ? n : p);
  }
  return [pr(c, a + (c[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class rt {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const n = e.length - 1, d = this.parts, [h, u] = Dr(e, t);
    if (this.el = rt.createElement(h, r), me.currentNode = this.el.content, t === 2 || t === 3) {
      const s = this.el.content.firstChild;
      s.replaceWith(...s.childNodes);
    }
    for (; (i = me.nextNode()) !== null && d.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const s of i.getAttributeNames()) if (s.endsWith(cr)) {
          const f = u[o++], p = i.getAttribute(s).split(se), v = /([.?@])?(.*)/.exec(f);
          d.push({ type: 1, index: a, name: v[2], strings: p, ctor: v[1] === "." ? Rr : v[1] === "?" ? Br : v[1] === "@" ? zr : _t }), i.removeAttribute(s);
        } else s.startsWith(se) && (d.push({ type: 6, index: a }), i.removeAttribute(s));
        if (ur.test(i.tagName)) {
          const s = i.textContent.split(se), f = s.length - 1;
          if (f > 0) {
            i.textContent = dt ? dt.emptyScript : "";
            for (let p = 0; p < f; p++) i.append(s[p], et()), me.nextNode(), d.push({ type: 2, index: ++a });
            i.append(s[f], et());
          }
        }
      } else if (i.nodeType === 8) if (i.data === dr) d.push({ type: 2, index: a });
      else {
        let s = -1;
        for (; (s = i.data.indexOf(se, s + 1)) !== -1; ) d.push({ type: 7, index: a }), s += se.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const r = be.createElement("template");
    return r.innerHTML = e, r;
  }
}
function Ue(c, e, t = c, r) {
  if (e === ve) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const a = tt(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(c), i._$AT(c, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = Ue(c, i._$AS(c, e.values), i, r)), e;
}
class Hr {
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
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? be).importNode(t, !0);
    me.currentNode = i;
    let a = me.nextNode(), o = 0, n = 0, d = r[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let h;
        d.type === 2 ? h = new Ge(a, a.nextSibling, this, e) : d.type === 1 ? h = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (h = new Ir(a, this, e)), this._$AV.push(h), d = r[++n];
      }
      o !== d?.index && (a = me.nextNode(), o++);
    }
    return me.currentNode = be, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class Ge {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    e = Ue(this, e, t), tt(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== ve && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Nr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== w && tt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(be.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = rt.createElement(pr(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const a = new Hr(i, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = qt.get(e.strings);
    return t === void 0 && qt.set(e.strings, t = new rt(e)), t;
  }
  k(e) {
    Et(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const a of e) i === t.length ? t.push(r = new Ge(this.O(et()), this.O(et()), this, this.options)) : r = t[i], r._$AI(a), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = Gt(e).nextSibling;
      Gt(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class _t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, a) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = w;
  }
  _$AI(e, t = this, r, i) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = Ue(this, e, t, 0), o = !tt(e) || e !== this._$AH && e !== ve, o && (this._$AH = e);
    else {
      const n = e;
      let d, h;
      for (e = a[0], d = 0; d < a.length - 1; d++) h = Ue(this, n[r + d], t, d), h === ve && (h = this._$AH[d]), o ||= !tt(h) || h !== this._$AH[d], h === w ? e = w : e !== w && (e += (h ?? "") + a[d + 1]), this._$AH[d] = h;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Rr extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
}
class Br extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
}
class zr extends _t {
  constructor(e, t, r, i, a) {
    super(e, t, r, i, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ue(this, e, t, 0) ?? w) === ve) return;
    const r = this._$AH, i = e === w && r !== w || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== w && (r === w || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Ir = class {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ue(this, e);
  }
};
const Or = { I: Ge }, Fr = Pt.litHtmlPolyfillSupport;
Fr?.(rt, Ge), (Pt.litHtmlVersions ??= []).push("3.3.3");
const Ur = (c, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = t?.renderBefore ?? null;
    r._$litPart$ = i = new Ge(e.insertBefore(et(), a), a, void 0, t ?? {});
  }
  return i._$AI(c), i;
};
const Nt = globalThis;
let Fe = class extends Ie {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ur(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ve;
  }
};
Fe._$litElement$ = !0, Fe.finalized = !0, Nt.litElementHydrateSupport?.({ LitElement: Fe });
const Gr = Nt.litElementPolyfillSupport;
Gr?.({ LitElement: Fe });
(Nt.litElementVersions ??= []).push("4.2.2");
const Vr = { attribute: !0, type: String, converter: ct, reflect: !1, hasChanged: At }, Wr = (c = Vr, e, t) => {
  const { kind: r, metadata: i } = t;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((c = Object.create(c)).wrapped = !0), a.set(t.name, c), r === "accessor") {
    const { name: o } = t;
    return { set(n) {
      const d = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(o, d, c, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, c, n), n;
    } };
  }
  if (r === "setter") {
    const { name: o } = t;
    return function(n) {
      const d = this[o];
      e.call(this, n), this.requestUpdate(o, d, c, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function ht(c) {
  return (e, t) => typeof t == "object" ? Wr(c, e, t) : ((r, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, r), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(c, e, t);
}
function ft(c) {
  return ht({ ...c, state: !0, attribute: !1 });
}
function _r(c) {
  return (e, t) => {
    const r = typeof e == "function" ? e : e[t];
    Object.assign(r, c);
  };
}
const Yr = { CHILD: 2 }, Xr = (c) => (...e) => ({ _$litDirective$: c, values: e });
let Kr = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    this._$Ct = e, this._$AM = t, this._$Ci = r;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const { I: qr } = Or, Jt = (c) => c, Zt = () => document.createComment(""), Ze = (c, e, t) => {
  const r = c._$AA.parentNode, i = e === void 0 ? c._$AB : e._$AA;
  if (t === void 0) {
    const a = r.insertBefore(Zt(), i), o = r.insertBefore(Zt(), i);
    t = new qr(a, o, c, c.options);
  } else {
    const a = t._$AB.nextSibling, o = t._$AM, n = o !== c;
    if (n) {
      let d;
      t._$AQ?.(c), t._$AM = c, t._$AP !== void 0 && (d = c._$AU) !== o._$AU && t._$AP(d);
    }
    if (a !== i || n) {
      let d = t._$AA;
      for (; d !== a; ) {
        const h = Jt(d).nextSibling;
        Jt(r).insertBefore(d, i), d = h;
      }
    }
  }
  return t;
}, fe = (c, e, t = c) => (c._$AI(e, t), c), Jr = {}, Zr = (c, e = Jr) => c._$AH = e, Qr = (c) => c._$AH, xt = (c) => {
  c._$AR(), c._$AA.remove();
};
const Qt = (c, e, t) => {
  const r = /* @__PURE__ */ new Map();
  for (let i = e; i <= t; i++) r.set(c[i], i);
  return r;
}, jr = Xr(class extends Kr {
  constructor(c) {
    if (super(c), c.type !== Yr.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(c, e, t) {
    let r;
    t === void 0 ? t = e : e !== void 0 && (r = e);
    const i = [], a = [];
    let o = 0;
    for (const n of c) i[o] = r ? r(n, o) : o, a[o] = t(n, o), o++;
    return { values: a, keys: i };
  }
  render(c, e, t) {
    return this.dt(c, e, t).values;
  }
  update(c, [e, t, r]) {
    const i = Qr(c), { values: a, keys: o } = this.dt(e, t, r);
    if (!Array.isArray(i)) return this.ut = o, a;
    const n = this.ut ??= [], d = [];
    let h, u, s = 0, f = i.length - 1, p = 0, v = a.length - 1;
    for (; s <= f && p <= v; ) if (i[s] === null) s++;
    else if (i[f] === null) f--;
    else if (n[s] === o[p]) d[p] = fe(i[s], a[p]), s++, p++;
    else if (n[f] === o[v]) d[v] = fe(i[f], a[v]), f--, v--;
    else if (n[s] === o[v]) d[v] = fe(i[s], a[v]), Ze(c, d[v + 1], i[s]), s++, v--;
    else if (n[f] === o[p]) d[p] = fe(i[f], a[p]), Ze(c, i[s], i[f]), f--, p++;
    else if (h === void 0 && (h = Qt(o, p, v), u = Qt(n, s, f)), h.has(n[s])) if (h.has(n[f])) {
      const m = u.get(o[p]), b = m !== void 0 ? i[m] : null;
      if (b === null) {
        const l = Ze(c, i[s]);
        fe(l, a[p]), d[p] = l;
      } else d[p] = fe(b, a[p]), Ze(c, i[s], b), i[m] = null;
      p++;
    } else xt(i[f]), f--;
    else xt(i[s]), s++;
    for (; p <= v; ) {
      const m = Ze(c, d[v + 1]);
      fe(m, a[p]), d[p++] = m;
    }
    for (; s <= f; ) {
      const m = i[s++];
      m !== null && xt(m);
    }
    return this.ut = o, Zr(c, d), ve;
  }
});
var jt, er;
(function(c) {
  c.language = "language", c.system = "system", c.comma_decimal = "comma_decimal", c.decimal_comma = "decimal_comma", c.space_comma = "space_comma", c.none = "none";
})(jt || (jt = {})), function(c) {
  c.language = "language", c.system = "system", c.am_pm = "12", c.twenty_four = "24";
}(er || (er = {}));
function ei(c) {
  return c.substr(0, c.indexOf("."));
}
var ti = ["closed", "locked", "off"], it = function(c, e, t, r) {
  r = r || {}, t = t ?? {};
  var i = new Event(e, { bubbles: r.bubbles === void 0 || r.bubbles, cancelable: !!r.cancelable, composed: r.composed === void 0 || r.composed });
  return i.detail = t, c.dispatchEvent(i), i;
}, Qe = function(c) {
  it(window, "haptic", c);
}, ri = function(c, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), it(window, "location-changed", { replace: t });
}, ii = function(c, e, t) {
  t === void 0 && (t = !0);
  var r, i = ei(e), a = i === "group" ? "homeassistant" : i;
  switch (i) {
    case "lock":
      r = t ? "unlock" : "lock";
      break;
    case "cover":
      r = t ? "open_cover" : "close_cover";
      break;
    default:
      r = t ? "turn_on" : "turn_off";
  }
  return c.callService(a, r, { entity_id: e });
}, oi = function(c, e) {
  var t = ti.includes(c.states[e].state);
  return ii(c, e, t);
}, ai = function(c, e, t, r) {
  if (r || (r = { action: "more-info" }), !r.confirmation || r.confirmation.exemptions && r.confirmation.exemptions.some(function(a) {
    return a.user === e.user.id;
  }) || (Qe("warning"), confirm(r.confirmation.text || "Are you sure you want to " + r.action + "?"))) switch (r.action) {
    case "more-info":
      (t.entity || t.camera_image) && it(c, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      r.navigation_path && ri(0, r.navigation_path);
      break;
    case "url":
      r.url_path && window.open(r.url_path);
      break;
    case "toggle":
      t.entity && (oi(e, t.entity), Qe("success"));
      break;
    case "call-service":
      if (!r.service) return void Qe("failure");
      var i = r.service.split(".", 2);
      e.callService(i[0], i[1], r.service_data, r.target), Qe("success");
      break;
    case "fire-dom-event":
      it(c, "ll-custom", r);
  }
}, ni = function(c, e, t, r) {
  var i;
  r === "double_tap" && t.double_tap_action ? i = t.double_tap_action : r === "hold" && t.hold_action ? i = t.hold_action : r === "tap" && t.tap_action && (i = t.tap_action), ai(c, e, t, i);
};
const $t = {
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
}, tr = {
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
    generateStyles: (c) => {
      const e = c.glassmorphism_blur ?? 16, t = c.glassmorphism_opacity ?? 0.25;
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
    generateStyles: (c) => {
      const e = c.neumorphism_depth ?? 6;
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
    generateStyles: (c) => {
      const e = c.cyberpunk_glow ?? "#00f0ff";
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
}, Dt = class Dt {
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
    const r = e.card_padding_vertical ?? e.card_padding ?? 0, i = e.card_padding_horizontal ?? e.card_padding ?? 15, a = e.card_padding_top ?? r, o = e.card_padding_bottom ?? r, n = e.card_padding_left ?? i, d = e.card_padding_right ?? i, h = e.card_margin ?? -1, u = e.card_margin_vertical ?? h, s = e.card_margin_horizontal ?? h, f = e.card_margin_top ?? u, p = e.card_margin_bottom ?? u, v = e.card_margin_left ?? s, m = e.card_margin_right ?? s;
    let b = "";
    (f !== void 0 || p !== void 0 || v !== void 0 || m !== void 0) && (b = `margin: ${f ?? 0}px ${m ?? 0}px ${p ?? 0}px ${v ?? 0}px;`);
    const l = e.border_radius ?? 12, _ = e.slider_style === "google", g = e.slider_style === "full", y = _ ? 42 : g ? 40 : 12, $ = e.slider_height !== void 0 ? e.slider_height : y, x = _ ? 21 : g ? 0 : $ / 2, k = e.slider_border_radius !== void 0 ? e.slider_border_radius : x, T = e.card_border_width ?? (e.card_border_color ? 1 : 0), M = e.card_border_style ?? "solid", C = T > 0 ? `border: ${T}px ${M} ${e.card_border_color || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", N = e.card_width ? `width: ${e.card_width};` : "", P = e.card_max_width ? `max-width: ${e.card_max_width};` : "", F = e.card_height ? `height: ${e.card_height};` : "", q = e.card_min_height !== void 0 ? `min-height: ${e.card_min_height}px;` : "", ce = e.fill_container === !0 ? "height: 100%; width: 100%;" : "", ye = e.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", xe = e.backdrop_blur !== void 0 ? `backdrop-filter: blur(${e.backdrop_blur}px); -webkit-backdrop-filter: blur(${e.backdrop_blur}px);` : "", we = e.card_opacity !== void 0 ? `opacity: ${e.card_opacity / 100};` : "", Y = e.transition_duration !== void 0 ? `transition: all ${e.transition_duration}ms ease;` : "", Se = e.card_padding_vertical ?? 0, $e = e.card_padding_horizontal ?? 0, Ce = 0, ke = 0, Te = e.sub_button_padding ?? 6, Me = e.sub_button_container_padding ?? 0, We = e.sub_button_alignment ? `--ag-sub-button-alignment: ${e.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", Ae = e.text_scrolling_speed ? `--ag-scroll-speed: ${e.text_scrolling_speed}s;` : "", Pe = e.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${e.full_slider_opacity / 100};` : "", L = e.theme_preset || "default", J = tr[L] || tr.default, de = J.generateStyles(e), U = [
      b,
      `border-radius: ${l}px;`,
      C,
      N,
      P,
      F,
      q,
      ce,
      ye,
      xe,
      we,
      Y,
      `--ag-card-padding: ${a}px ${d}px ${o}px ${n}px;`,
      `--ag-text-padding: ${Se}px ${$e}px;`,
      `--ag-features-padding: ${Ce}px ${ke}px;`,
      `--ag-sub-button-padding: ${Te}px;`,
      `--ag-sub-button-container-padding: ${Me}px;`,
      `--ag-content-spacing: ${e.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${e.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${e.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${e.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${e.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${$}px;`,
      `--ag-slider-radius: ${k}px;`,
      `--ag-text-alignment: ${e.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${e.content_alignment ?? "flex-start"};`,
      We,
      Ae,
      Pe,
      de
    ].filter(Boolean).join(" ").trim(), ue = [
      "ha-card",
      J.cssClass,
      `layout-${e.layout || "default"}`,
      e.card_layout === "large" ? "card-large" : "",
      `hover-${e.hover_effect ?? "glow"}`,
      `slider-style-${e.slider_style ?? "circle"}`,
      e.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" "), G = Number(e.text_offset_x) || -28, Ee = Number(e.text_offset_y) || 2, z = `transform: translate(${G}px, ${Ee}px);`, re = Number(e.primary_text_start_offset ?? e.primary_text_offset_x) || 8, Ne = Number(e.primary_text_end_offset) || 250, pe = Number(e.primary_text_offset_y) || 0, Le = re !== 0 || pe !== 0 ? `transform: translate(${re}px, ${pe}px);` : "", De = re !== 0 || Ne !== 0 ? `margin-left: ${re}px; margin-right: ${Ne}px;` : "", He = `${Le} ${De}`.trim(), Z = Number(e.secondary_text_start_offset ?? e.secondary_text_offset_x) || 8, Q = Number(e.secondary_text_end_offset) || 250, I = Number(e.secondary_text_offset_y) || 0, V = Z !== 0 || I !== 0 ? `transform: translate(${Z}px, ${I}px);` : "", Ye = Z !== 0 || Q !== 0 ? `margin-left: ${Z}px; margin-right: ${Q}px;` : "", Xe = `${V} ${Ye}`.trim(), ie = Number(e.features_offset_x) || 0, oe = Number(e.features_offset_y) || 0, Re = ie !== 0 || oe !== 0 ? `transform: translate(${ie}px, ${oe}px);` : "", ae = Number(e.slider_start_offset) || 0, _e = Number(e.slider_end_offset) || 0, E = [
      ae ? `margin-left: ${ae}px !important;` : "",
      _e ? `margin-right: ${_e}px !important;` : ""
    ].filter(Boolean).join(" "), W = Number(e.color_temp_start_offset) || 0, A = Number(e.color_temp_end_offset) || 0, X = [
      W ? `margin-left: ${W}px !important;` : "",
      A ? `margin-right: ${A}px !important;` : ""
    ].filter(Boolean).join(" "), Be = Number(e.color_slider_start_offset) || 0, ne = Number(e.color_slider_end_offset) || 0, gt = [
      Be ? `margin-left: ${Be}px !important;` : "",
      ne ? `margin-right: ${ne}px !important;` : ""
    ].filter(Boolean).join(" "), Ke = e.text_box_width ? `max-width: ${e.text_box_width}; width: ${e.text_box_width};` : "width: 100%; max-width: 100%;", bt = e.font_family_primary ? `font-family: ${e.font_family_primary};` : "", vt = `font-size: ${e.font_size_primary ?? 14}px;`, at = `font-weight: ${e.font_weight_primary ?? "800"};`, Rt = `text-transform: ${e.text_transform_primary ?? "capitalize"};`, qe = `letter-spacing: ${e.letter_spacing ?? -0.5}px;`, Bt = `line-height: ${e.line_height ?? 1.1};`, mr = `${bt} ${vt} ${at} ${Rt} ${qe} ${Bt}`.trim(), gr = e.font_family_secondary ? `font-family: ${e.font_family_secondary};` : "", br = `font-size: ${e.font_size_secondary ?? 15}px;`, vr = e.font_weight_secondary ? `font-weight: ${e.font_weight_secondary};` : "", yr = `text-transform: ${e.text_transform_secondary ?? "capitalize"};`, xr = `${gr} ${br} ${vr} ${yr} ${qe} ${Bt}`.trim(), zt = {
      staticCardStyles: U,
      staticCardClasses: ue,
      textOffsetStyle: z,
      primaryTextOffsetStyle: He,
      secondaryTextOffsetStyle: Xe,
      featuresOffsetStyle: Re,
      mainSliderMarginOffsets: E,
      colorTempMarginOffsets: X,
      colorHueMarginOffsets: gt,
      textBoxWidth: Ke,
      primaryTextStyle: mr,
      secondaryTextStyle: xr
    };
    return this._computedStylesCache.set(t, zt), zt;
  }
};
Dt._computedStylesCache = /* @__PURE__ */ new Map();
let Ct = Dt;
class si {
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
const ut = new si();
class li {
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
const ge = new li(), ci = {
  preserveDrawingBuffer: !1,
  powerPreference: "low-power",
  alpha: !0,
  antialias: !1,
  depth: !1,
  stencil: !1
};
function di(c, e = ci) {
  try {
    const t = c.getContext("webgl2", e) || c.getContext("webgl", e) || c.getContext("experimental-webgl", e);
    return t ? (t.getExtension("ANGLE_instanced_arrays"), t.getExtension("EXT_color_buffer_half_float"), t.getExtension("OES_texture_half_float"), c.addEventListener("webglcontextlost", (r) => {
      r.preventDefault(), console.warn("Antigravity WebGL context lost");
    }, { passive: !1 }), c.addEventListener("webglcontextrestored", () => {
      console.info("Antigravity WebGL context restored");
    }, { passive: !0 }), t) : null;
  } catch (t) {
    return console.warn("WebGL init failed:", t), null;
  }
}
function hr(c) {
  if (c)
    try {
      const e = c.getParameter(c.MAX_VERTEX_ATTRIBS) || 16;
      for (let t = 0; t < e; ++t)
        c.disableVertexAttribArray(t);
      c.bindBuffer(c.ARRAY_BUFFER, null), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null), c.bindRenderbuffer(c.RENDERBUFFER, null), c.bindFramebuffer(c.FRAMEBUFFER, null);
    } catch (e) {
      console.warn("WebGL cleanup warning:", e);
    }
}
async function fr() {
  const c = performance.now();
  let e = 0, t = 0;
  const r = (v, m) => {
    t++, v ? e++ : console.error(`❌ Assertion failed: ${m}`);
  }, i = ut.getMemorySnapshot();
  r(i.activeCardsCount >= 0, "Memory tracker active card count is non-negative");
  let a = !1;
  if (typeof document < "u") {
    const v = document.createElement("canvas"), m = di(v);
    m && (a = !0, r(m.getParameter(m.MAX_VERTEX_ATTRIBS) > 0, "WebGL attributes available"), hr(m));
  }
  const o = 1e3;
  let n = 0;
  for (let v = 0; v < o; v++) {
    const m = performance.now();
    n += performance.now() - m;
  }
  const d = Number((n / o).toFixed(4));
  r(d < 0.1, "Benchmark iteration takes under 0.1ms");
  const h = ge.isPowerSaveActive(), u = ge.getTargetFrameIntervalMs();
  r(u === 16 || u === 33, "Frame target is either 16ms or 33ms");
  const s = performance.now() - c, f = e === t, p = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: typeof navigator < "u" ? navigator.userAgent : "Node/Test",
    renderBenchmarkMs: d,
    memoryUsageMB: i.usedJSHeapSizeMB || 0,
    powerSaveModeActive: h,
    webglSupported: a,
    assertionsPassed: e,
    totalAssertions: t,
    passed: f
  };
  return console.info(
    `%c 🧪 ANTIGRAVITY CI RUNNER %c Passed ${e}/${t} | Benchmark: ${d}ms/op | Duration: ${s.toFixed(2)}ms `,
    "color: white; background: #2e7d32; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
    "color: #2e7d32; background: #e8f5e9; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
  ), p;
}
typeof window < "u" && window.__RUN_CI__ && fr();
const ui = lr`
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
class pi {
  /**
   * Resolves display properties and default service execution for a sub-button action type.
   */
  static resolve(e, t, r, i, a, o, n, d, h) {
    if (h && h.action && h.action !== "none" && h.action !== "default")
      return {
        icon: a || i?.attributes?.icon || "mdi:checkbox-blank-circle",
        title: o || (i?.attributes?.friendly_name ?? ""),
        label: o,
        isActive: n ?? !1,
        animClass: "",
        defaultAction: void 0
      };
    const u = t || r || "";
    let s = a, f = "", p = n ?? !1, v = "", m = o, b;
    switch (e) {
      case "play_pause": {
        const l = i?.state === "playing";
        p = l, s || (s = l ? "mdi:pause" : "mdi:play"), f = l ? "Pause" : "Play", b = (_) => {
          _?.callService("media_player", "media_play_pause", { entity_id: u });
        };
        break;
      }
      case "next": {
        s || (s = "mdi:skip-next"), f = "Next Track", b = (l) => {
          l?.callService("media_player", "media_next_track", { entity_id: u });
        };
        break;
      }
      case "previous": {
        s || (s = "mdi:skip-previous"), f = "Previous Track", b = (l) => {
          l?.callService("media_player", "media_previous_track", { entity_id: u });
        };
        break;
      }
      case "vol_up": {
        s || (s = "mdi:volume-plus"), f = "Volume +5%", m || (m = "+5%"), b = (l) => {
          l?.callService("media_player", "volume_up", { entity_id: u });
        };
        break;
      }
      case "vol_down": {
        s || (s = "mdi:volume-minus"), f = "Volume -5%", m || (m = "-5%"), b = (l) => {
          l?.callService("media_player", "volume_down", { entity_id: u });
        };
        break;
      }
      case "mute": {
        const l = i?.attributes?.is_volume_muted === !0;
        p = l, s || (s = l ? "mdi:volume-off" : "mdi:volume-high"), f = l ? "Unmute" : "Mute", b = (_) => {
          _?.callService("media_player", "volume_mute", { entity_id: u, is_volume_muted: !l });
        };
        break;
      }
      case "source": {
        const l = i?.attributes?.source || "", _ = i?.attributes?.source_list || [], g = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
        s || (s = "mdi:import"), f = `Source: ${l} -> ${g}`, m || (m = l || "Source"), b = (y) => {
          g && y?.callService("media_player", "select_source", { entity_id: u, source: g });
        };
        break;
      }
      case "sound_mode": {
        const l = i?.attributes?.sound_mode || "", _ = i?.attributes?.sound_mode_list || [], g = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
        s || (s = "mdi:surround-sound"), f = `Sound: ${l} -> ${g}`, m || (m = l || "Sound"), b = (y) => {
          g && y?.callService("media_player", "select_sound_mode", { entity_id: u, sound_mode: g });
        };
        break;
      }
      case "shuffle": {
        const l = i?.attributes?.shuffle === !0;
        p = l, s || (s = l ? "mdi:shuffle" : "mdi:shuffle-disabled"), f = l ? "Shuffle: On" : "Shuffle: Off", b = (_) => {
          _?.callService("media_player", "shuffle_set", { entity_id: u, shuffle: !l });
        };
        break;
      }
      case "repeat": {
        const l = i?.attributes?.repeat || "off", _ = ["off", "all", "one"], g = _[(_.indexOf(l) + 1) % _.length] || "off";
        p = l !== "off", s || (s = l === "one" ? "mdi:repeat-once" : l === "all" ? "mdi:repeat" : "mdi:repeat-off"), f = `Repeat: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("media_player", "repeat_set", { entity_id: u, repeat: g });
        };
        break;
      }
      case "chime": {
        s || (s = "mdi:bell-ring-outline"), f = "Play Chime", b = (l) => {
          l?.callService("chime_tts", "say", { entity_id: u, message: "ding-dong" }).catch(() => {
            l?.callService("media_player", "media_play", { entity_id: u });
          });
        };
        break;
      }
      case "tts_announce": {
        s || (s = "mdi:bullhorn-variant-outline"), f = "Voice Announcement", b = (l) => {
          l?.callService("tts", "speak", { media_player_entity_id: u, message: "Attention: Test announcement" }).catch(() => {
            l?.callService("tts", "google_translate_say", { entity_id: u, message: "Attention: Test announcement" });
          });
        };
        break;
      }
      case "media_zone": {
        s || (s = "mdi:speaker-multiple"), f = "Group Speakers / Zone", b = (l) => {
          l?.callService("media_player", "join", { entity_id: u });
        };
        break;
      }
      case "media_preset": {
        s || (s = "mdi:radio-tower"), f = "Play Radio Stream / Preset", b = (l) => {
          l?.callService("media_player", "play_media", {
            entity_id: u,
            media_content_id: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
            media_content_type: "music"
          });
        };
        break;
      }
      case "door_hold": {
        s || (s = "mdi:door-open"), f = "Hold Gate / Door Open", b = (l) => {
          l?.callService("cover", "open_cover", { entity_id: u });
        };
        break;
      }
      case "aux_heat": {
        const l = i?.attributes?.aux_heat === "on" || i?.attributes?.aux_heat === !0;
        p = l, s || (s = l ? "mdi:radiator" : "mdi:radiator-disabled"), f = l ? "Disable Aux Heat" : "Enable Aux Heat", b = (_) => {
          _?.callService("climate", "set_aux_heat", { entity_id: u, aux_heat: !l });
        };
        break;
      }
      case "cover_preset": {
        s || (s = "mdi:window-shutter"), f = "Go to Shading Position (50%)", b = (l) => {
          l?.callService("cover", "set_cover_position", { entity_id: u, position: 50 });
        };
        break;
      }
      case "temp_up": {
        const _ = d === "°F" || d === "F" ? 1 : 0.5, g = Number(i?.attributes?.temperature ?? i?.attributes?.target_temp_high ?? 20), y = Number(i?.attributes?.max_temp ?? 35), $ = Math.min(y, g + _);
        s || (s = "mdi:thermometer-chevron-up"), f = `Temperature +${_}°`, m || (m = `+${_}°`), b = (x) => {
          x?.callService("climate", "set_temperature", { entity_id: u, temperature: $ });
        };
        break;
      }
      case "temp_down": {
        const _ = d === "°F" || d === "F" ? 1 : 0.5, g = Number(i?.attributes?.temperature ?? i?.attributes?.target_temp_low ?? 20), y = Number(i?.attributes?.min_temp ?? 10), $ = Math.max(y, g - _);
        s || (s = "mdi:thermometer-chevron-down"), f = `Temperature -${_}°`, m || (m = `-${_}°`), b = (x) => {
          x?.callService("climate", "set_temperature", { entity_id: u, temperature: $ });
        };
        break;
      }
      case "fan_oscillate": {
        const l = i?.attributes?.oscillating === !0;
        p = l, s || (s = l ? "mdi:arrow-oscillating" : "mdi:fan-off"), f = l ? "Stop Oscillation" : "Start Oscillation", b = (_) => {
          _?.callService("fan", "oscillate", { entity_id: u, oscillating: !l });
        };
        break;
      }
      case "fan_direction": {
        const l = i?.attributes?.direction || "forward", _ = l === "forward" ? "reverse" : "forward";
        p = l === "reverse", s || (s = l === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"), f = `Direction: ${l} -> ${_}`, m || (m = l), b = (g) => {
          g?.callService("fan", "set_direction", { entity_id: u, direction: _ });
        };
        break;
      }
      case "humidifier_mode": {
        const l = i?.attributes?.mode || i?.state || "auto", _ = i?.attributes?.available_modes || ["auto", "eco", "boost", "sleep"], g = _[(_.indexOf(l) + 1) % _.length] || "auto";
        s || (s = "mdi:water-sync"), f = `Humidifier Mode: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("humidifier", "set_mode", { entity_id: u, mode: g });
        };
        break;
      }
      case "siren_toggle": {
        const l = i?.state === "on";
        p = l, s || (s = l ? "mdi:bullhorn" : "mdi:bullhorn-outline"), f = l ? "Turn Off Siren" : "Trigger Siren", b = (_) => {
          _?.callService("siren", "toggle", { entity_id: u });
        };
        break;
      }
      case "open_close": {
        const l = i?.state === "open" || i?.state === "on" || i?.attributes?.current_position !== void 0 && i.attributes.current_position > 0;
        p = l;
        const _ = i?.attributes?.device_class;
        s || (_ === "garage" || _ === "garage_door" ? s = l ? "mdi:garage-open" : "mdi:garage" : _ === "blind" || _ === "shade" ? s = l ? "mdi:blinds-open" : "mdi:blinds" : _ === "curtain" ? s = l ? "mdi:curtains-open" : "mdi:curtains" : _ === "damper" ? s = l ? "mdi:circle-slice-8" : "mdi:circle-outline" : s = l ? "mdi:window-shutter-open" : "mdi:window-shutter"), f = l ? "Close" : "Open", b = (g) => {
          g?.callService("cover", "toggle", { entity_id: u });
        };
        break;
      }
      case "stop": {
        s || (s = "mdi:stop"), f = "Stop", b = (l) => {
          l?.callService("cover", "stop_cover", { entity_id: u });
        };
        break;
      }
      case "open_tilt": {
        s || (s = "mdi:arrow-top-right-bottom-left"), f = "Open Tilt", b = (l) => {
          l?.callService("cover", "open_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "close_tilt": {
        s || (s = "mdi:arrow-bottom-left-top-right"), f = "Close Tilt", b = (l) => {
          l?.callService("cover", "close_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "stop_tilt": {
        s || (s = "mdi:stop"), f = "Stop Tilt", b = (l) => {
          l?.callService("cover", "stop_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "lock_unlock": {
        const l = i?.state === "locked", _ = i?.state === "jammed";
        p = !l, _ && (v = "lock-jammed"), s || (s = _ ? "mdi:lock-alert" : l ? "mdi:lock" : "mdi:lock-open-variant"), f = _ ? "Jammed (Alert!)" : l ? "Unlock" : "Lock", b = (g) => {
          g?.callService("lock", l ? "unlock" : "lock", { entity_id: u });
        };
        break;
      }
      case "fan_speed": {
        const l = i?.attributes?.percentage ?? 0;
        s || (s = "mdi:fan"), n && (v = "anim-spin"), f = `Speed: ${l}%`, m || (m = l > 0 ? `${l}%` : "Off"), b = (_) => {
          let g = 33;
          l >= 90 ? g = 0 : l >= 60 ? g = 100 : l >= 30 && (g = 66), _?.callService("fan", "set_percentage", { entity_id: u, percentage: g });
        };
        break;
      }
      case "fan_mode": {
        const l = i?.attributes?.fan_mode || "auto", _ = i?.attributes?.fan_modes || ["auto", "low", "medium", "high"], g = _[(_.indexOf(l) + 1) % _.length] || "auto";
        s || (s = "mdi:fan"), f = `Fan Mode: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("climate", "set_fan_mode", { entity_id: u, fan_mode: g });
        };
        break;
      }
      case "swing_mode": {
        const l = i?.attributes?.swing_mode || "off", _ = i?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], g = _[(_.indexOf(l) + 1) % _.length] || "off";
        s || (s = "mdi:arrow-split-horizontal"), f = `Swing: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("climate", "set_swing_mode", { entity_id: u, swing_mode: g });
        };
        break;
      }
      case "climate_preset": {
        const l = i?.attributes?.preset_mode || "none", _ = i?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], g = _[(_.indexOf(l) + 1) % _.length] || "none";
        s || (l === "eco" ? s = "mdi:leaf" : l === "boost" ? s = "mdi:rocket-launch" : l === "away" ? s = "mdi:home-export-outline" : l === "sleep" ? s = "mdi:bed" : s = "mdi:thermostat"), f = `Preset: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("climate", "set_preset_mode", { entity_id: u, preset_mode: g });
        };
        break;
      }
      case "clean": {
        const l = i?.state === "cleaning";
        p = l, s || (s = l ? "mdi:pause" : "mdi:robot-vacuum"), f = l ? "Pause Vacuum" : "Start Vacuum", b = (_) => {
          _?.callService("vacuum", l ? "pause" : "start", { entity_id: u });
        };
        break;
      }
      case "dock": {
        s || (s = "mdi:home-import-outline"), f = "Return to Dock", b = (l) => {
          l?.callService("vacuum", "return_to_base", { entity_id: u });
        };
        break;
      }
      case "locate": {
        s || (s = "mdi:map-marker-question-outline"), f = "Locate", b = (l) => {
          l?.callService("vacuum", "locate", { entity_id: u });
        };
        break;
      }
      case "clean_zone":
      case "spot_clean": {
        s || (s = e === "clean_zone" ? "mdi:map-marker-radius-outline" : "mdi:target-variant"), f = e === "clean_zone" ? "Zone / Room Clean" : "Spot Clean Mode", b = (l) => {
          l?.callService("vacuum", "clean_spot", { entity_id: u });
        };
        break;
      }
      case "alarm_keypad": {
        s || (s = "mdi:dialpad"), f = "Open PIN Keypad";
        break;
      }
      case "valve_close": {
        const l = i?.state === "closed" || i?.state === "off";
        p = !l, s || (s = l ? "mdi:valve-closed" : "mdi:valve-open"), f = l ? "Valve is Closed" : "Emergency Close Valve", b = (_) => {
          u.split(".")[0] === "valve" ? _?.callService("valve", "close_valve", { entity_id: u }) : _?.callService("switch", "turn_off", { entity_id: u });
        };
        break;
      }
      case "pool_speed": {
        const l = i?.attributes?.percentage ?? 50, _ = l > 50 ? 30 : 100;
        s || (s = "mdi:pool"), f = `Pool Speed: ${l}% -> ${_}%`, m || (m = `${l}%`), b = (g) => {
          g?.callService("fan", "set_percentage", { entity_id: u, percentage: _ });
        };
        break;
      }
      case "vacuum_fan_speed": {
        const l = i?.attributes?.fan_speed || "standard", _ = i?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], g = _[(_.indexOf(l) + 1) % _.length] || "standard";
        s || (s = "mdi:fan"), f = `Suction: ${l} -> ${g}`, m || (m = l), b = (y) => {
          y?.callService("vacuum", "set_fan_speed", { entity_id: u, fan_speed: g });
        };
        break;
      }
      case "counter_inc": {
        s || (s = "mdi:plus-box"), f = "Increment Counter (+1)", m || (m = "+1"), b = (l) => {
          l?.callService("counter", "increment", { entity_id: u });
        };
        break;
      }
      case "counter_dec": {
        s || (s = "mdi:minus-box"), f = "Decrement Counter (-1)", m || (m = "-1"), b = (l) => {
          l?.callService("counter", "decrement", { entity_id: u });
        };
        break;
      }
      case "hvac_mode": {
        const l = i?.state || "off", _ = i?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], g = _[(_.indexOf(l) + 1) % _.length] || "auto";
        p = l !== "off", s || (l === "heat" ? s = "mdi:fire" : l === "cool" ? s = "mdi:snowflake" : l === "dry" ? s = "mdi:water-percent" : l === "fan_only" ? s = "mdi:fan" : l === "auto" ? s = "mdi:thermostat-auto" : s = "mdi:power"), f = `Mode: ${l} -> Next: ${g}`, m || (m = l), b = (y) => {
          y?.callService("climate", "set_hvac_mode", { entity_id: u, hvac_mode: g });
        };
        break;
      }
      case "light_effect":
      case "effect_next": {
        const l = i?.attributes?.effect_list || [], _ = i?.attributes?.effect || "None", g = l.length > 0 ? l[(l.indexOf(_) + 1) % l.length] || l[0] : "None";
        s || (s = e === "light_effect" ? "mdi:creation" : "mdi:arrow-right-bold-circle-outline"), p = _ !== "None" && _ !== "off" && (n ?? !1), f = e === "light_effect" ? `Effect: ${_} -> Next: ${g}` : `Next Effect: ${g}`, m || (m = _ !== "None" ? _ : "Effect"), b = (y) => {
          l.length > 0 && y?.callService("light", "turn_on", { entity_id: u, effect: g });
        };
        break;
      }
      case "effect_prev": {
        const l = i?.attributes?.effect_list || [], _ = i?.attributes?.effect || "None", g = l.indexOf(_), y = g <= 0 ? l.length - 1 : g - 1, $ = l.length > 0 ? l[y] : "None";
        s || (s = "mdi:arrow-left-bold-circle-outline"), f = `Previous Effect: ${$}`, m || (m = $), b = (x) => {
          l.length > 0 && x?.callService("light", "turn_on", { entity_id: u, effect: $ });
        };
        break;
      }
      case "white_mode": {
        s || (s = "mdi:white-balance-sunny"), f = "Set Neutral White (4000K)", b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp: 250 });
        };
        break;
      }
      case "brightness": {
        const l = i?.attributes?.brightness, _ = l !== void 0 ? Math.round(l / 255 * 100) : 0;
        s || (s = "mdi:brightness-6"), f = `Brightness: ${_}%`, m || (m = `${_}%`), b = (g) => {
          let y = 25;
          _ >= 85 ? y = 0 : _ >= 60 ? y = 100 : _ >= 35 ? y = 75 : _ >= 10 && (y = 50), y === 0 ? g?.callService("light", "turn_off", { entity_id: u }) : g?.callService("light", "turn_on", { entity_id: u, brightness_pct: y });
        };
        break;
      }
      case "garage_toggle": {
        const l = i?.state === "open" || i?.state === "opening";
        p = l, s || (s = l ? "mdi:garage-open" : "mdi:garage"), f = l ? "Close Garage" : "Open Garage", b = (_) => {
          _?.callService("cover", "toggle", { entity_id: u });
        };
        break;
      }
      case "dim_up": {
        const l = u.split(".")[0];
        if (l === "number" || l === "input_number") {
          const _ = Number(i?.state) || 0, g = Number(i?.attributes?.step) || 1, y = Number(i?.attributes?.max) || 100, $ = Math.min(y, _ + g);
          s || (s = "mdi:plus-circle-outline"), f = `Value +${g}`, m || (m = `+${g}`), b = (x) => {
            x?.callService(l, "set_value", { entity_id: u, value: $ });
          };
        } else {
          const _ = i?.attributes?.brightness ?? 0, g = Math.min(255, _ + 26);
          s || (s = "mdi:brightness-5"), f = "Brightness +10%", m || (m = "+10%"), b = (y) => {
            y?.callService("light", "turn_on", { entity_id: u, brightness: g });
          };
        }
        break;
      }
      case "dim_down": {
        const l = u.split(".")[0];
        if (l === "number" || l === "input_number") {
          const _ = Number(i?.state) || 0, g = Number(i?.attributes?.step) || 1, y = Number(i?.attributes?.min) || 0, $ = Math.max(y, _ - g);
          s || (s = "mdi:minus-circle-outline"), f = `Value -${g}`, m || (m = `-${g}`), b = (x) => {
            x?.callService(l, "set_value", { entity_id: u, value: $ });
          };
        } else {
          const _ = i?.attributes?.brightness ?? 0, g = Math.max(1, _ - 26);
          s || (s = "mdi:brightness-4"), f = "Brightness -10%", m || (m = "-10%"), b = (y) => {
            y?.callService("light", "turn_on", { entity_id: u, brightness: g });
          };
        }
        break;
      }
      case "humidity_up": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), _ = Math.min(100, l + 5);
        s || (s = "mdi:water-plus"), f = `Humidity +5% (${_}%)`, m || (m = "+5%"), b = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: _ });
        };
        break;
      }
      case "humidity_down": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), _ = Math.max(0, l - 5);
        s || (s = "mdi:water-minus"), f = `Humidity -5% (${_}%)`, m || (m = "-5%"), b = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: _ });
        };
        break;
      }
      case "humidity_step_up": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), _ = Math.min(100, l + 1);
        s || (s = "mdi:water-plus"), f = `Humidity +1% (${_}%)`, m || (m = "+1%"), b = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: _ });
        };
        break;
      }
      case "humidity_step_down": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), _ = Math.max(0, l - 1);
        s || (s = "mdi:water-minus"), f = `Humidity -1% (${_}%)`, m || (m = "-1%"), b = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: _ });
        };
        break;
      }
      case "input_select": {
        const l = i?.state || "", _ = i?.attributes?.options || [], g = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
        s || (s = "mdi:form-dropdown"), f = `Option: ${l} -> Next: ${g}`, m || (m = l), b = (y) => {
          const $ = u.split(".")[0] === "select" ? "select" : "input_select";
          y?.callService($, "select_next", { entity_id: u });
        };
        break;
      }
      case "temp_warm": {
        s || (s = "mdi:weather-sunny"), f = "Warm White (2700K)", m || (m = "2700K"), b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: 2700 });
        };
        break;
      }
      case "temp_cool": {
        s || (s = "mdi:weather-sunset-up"), f = "Cool Daylight (6000K)", m || (m = "6000K"), b = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: 6e3 });
        };
        break;
      }
      case "color_temp": {
        s || (s = "mdi:palette-swatch-outline"), f = "Color Temperature", m || (m = "Temp"), b = (l) => {
          const _ = i?.attributes?.color_temp_kelvin || 3e3;
          let g = 2700;
          _ < 3300 ? g = 4e3 : _ < 5e3 ? g = 6e3 : g = 2700, l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: g });
        };
        break;
      }
      case "button":
      default: {
        s || (s = i?.attributes?.icon || "mdi:checkbox-blank-circle"), f = o || (i?.attributes?.friendly_name ?? "");
        break;
      }
    }
    return {
      icon: s,
      title: f,
      label: m,
      isActive: p,
      animClass: v,
      defaultAction: b
    };
  }
}
const j = /* @__PURE__ */ new Map(), rr = 200;
class ir {
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
      const t = j.get(e);
      if (t) return t;
      const r = Date.parse(e);
      if (!isNaN(r)) {
        const d = new Date(r);
        if (j.size >= rr) {
          const h = j.keys().next().value;
          h !== void 0 && j.delete(h);
        }
        return j.set(e, d), d;
      }
      let i = e.trim();
      i.includes(" ") && !i.includes("T") && (i = i.replace(" ", "T")), i.includes("T") && !i.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(i) && !/[+-]\d{4}$/.test(i) && (i += "Z");
      const a = Number(i);
      let o;
      !isNaN(a) && i !== "" && !i.includes("T") ? o = new Date(a > 1e11 ? a : a * 1e3) : o = new Date(i);
      const n = isNaN(o.getTime()) ? null : o;
      if (n) {
        if (j.size >= rr) {
          const d = j.keys().next().value;
          d !== void 0 && j.delete(d);
        }
        j.set(e, n);
      }
      return n;
    }
    return null;
  }
  /**
   * Format a past timestamp to relative time string (compact or human-friendly).
   */
  static formatTimeAgo(e, t = !1, r) {
    const i = this.parseDate(e);
    if (!i) return "";
    const a = Math.max(0, ((r ?? Date.now()) - i.getTime()) / 1e3 | 0);
    if (a < 5) return t ? "< 5s" : "just now";
    if (a < 60) return t ? `${a}s` : `${a} seconds ago`;
    const o = a / 60 | 0;
    if (o < 60) return t ? `${o}m` : `${o} ${o === 1 ? "minute" : "minutes"} ago`;
    const n = o / 60 | 0;
    if (n < 24) return `${n}h${t ? "" : " ago"}`;
    const d = n / 24 | 0;
    if (d < 7) return `${d}d${t ? "" : " ago"}`;
    const h = d / 7 | 0;
    if (h < 4) return `${h}w${t ? "" : " ago"}`;
    const u = d / 30 | 0;
    return u < 12 ? `${u}mo${t ? "" : " ago"}` : `${d / 365 | 0}y${t ? "" : " ago"}`;
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
  static getInfoContent(e, t, r, i) {
    if (!t) return "";
    switch ((e || "").toLowerCase().replace(/_/g, "-")) {
      case "name":
        return r?.name || t.attributes?.friendly_name || r?.entity || "";
      case "state": {
        const o = (t.entity_id || "").split(".")[0];
        if (o === "timer") {
          if (t.state === "paused")
            return `${t.attributes?.remaining || "Paused"} (Paused)`;
          if (t.state === "active" && t.attributes?.finishes_at) {
            const n = Date.parse(t.attributes.finishes_at);
            if (!isNaN(n)) {
              const d = Math.max(0, Math.round((n - Date.now()) / 1e3)), h = Math.floor(d / 60), u = d % 60, s = Math.floor(h / 60), f = (h % 60).toString().padStart(2, "0"), p = u.toString().padStart(2, "0");
              return s > 0 ? `${s}:${f}:${p}` : `${f}:${p}`;
            }
          }
        }
        if (o === "binary_sensor") {
          const n = t.attributes?.device_class;
          return n === "tamper" && t.state === "on" ? "⚠️ Tamper Detected" : n === "problem" && t.state === "on" ? "⚠️ Problem Detected" : n === "smoke" && t.state === "on" ? "🔥 Smoke Detected!" : n === "gas" && t.state === "on" ? "⚠️ Gas Detected!" : n === "moisture" && t.state === "on" ? "💧 Moisture Detected!" : this.formatForDuration(t.last_changed);
        }
        if (o === "vacuum") {
          const n = t.state;
          let d = n;
          n === "cleaning" ? d = "🧹 Cleaning" : n === "docked" ? d = "🏠 Docked" : n === "returning" ? d = "🔄 Returning" : n === "paused" ? d = "⏸️ Paused" : n === "error" && (d = "⚠️ Error");
          const h = t.attributes?.battery_level;
          return h !== void 0 ? `${d} • 🔋${h}%` : d;
        }
        if (o === "weather") {
          const n = t.attributes?.temperature, d = i?.config?.unit_system?.temperature || "°F", h = (t.state || "").replace(/-/g, " ");
          return n !== void 0 ? `${n}${d} • ${h}` : h;
        }
        if (o === "climate") {
          const n = t.state || "", d = t.attributes?.current_temperature, h = t.attributes?.temperature ?? t.attributes?.target_temp_high, u = t.attributes?.unit_of_measurement || i?.config?.unit_system?.temperature || "°", s = t.attributes?.preset_mode, f = t.attributes?.hvac_action, v = [d !== void 0 && h !== void 0 ? `${d}${u} → ${h}${u}` : h !== void 0 ? `${h}${u}` : "", f, s].filter(Boolean).join(" • ");
          return v ? `${n} (${v})` : n;
        }
        if (o === "fan") {
          const n = t.attributes?.percentage, d = t.attributes?.oscillating ? "∿ Oscillating" : "", h = t.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [n !== void 0 ? `${n}%` : t.state, d, h].filter(Boolean).join(" • ");
        }
        if (o === "alarm_control_panel") {
          const n = t.state;
          if (n === "armed_home") return "🛡️ Armed Home";
          if (n === "armed_away") return "🛡️ Armed Away";
          if (n === "disarmed") return "Disarmed";
          if (n === "triggered") return "⚠️ TRIGGERED";
          if (n === "pending") return "⏳ Arming Pending...";
          if (n === "arming") return "⏳ Arming...";
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
          const n = t.attributes?.brightness, d = n !== void 0 ? Math.round(n / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${d}% • ${t.attributes.color_temp_kelvin}K`;
        }
        if (t.attributes?.device_class === "timestamp" || t.attributes?.device_class === "date" || typeof t.state == "string" && (t.state.includes("T") || t.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(t.state))) {
          const n = this.formatRelativeTime(t.state);
          if (n) return n;
        }
        if (t.attributes?.display_precision !== void 0 && !isNaN(Number(t.state))) {
          const n = Number(t.attributes.display_precision), d = Number(t.state).toFixed(n), h = t.attributes?.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "";
          return `${d}${h}`;
        }
        if (typeof i?.formatEntityState == "function")
          try {
            return i.formatEntityState(t);
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
        const o = t.attributes?.temperature ?? t.attributes?.current_temperature, n = t.attributes?.unit_of_measurement || i?.config?.unit_system?.temperature || "°C";
        return o !== void 0 ? `${o} ${n}` : "";
      }
      case "humidity": {
        const o = t.attributes?.humidity ?? t.attributes?.current_humidity, n = t.attributes?.unit_of_measurement || "%";
        return o !== void 0 ? `${o}${n.startsWith("%") ? n : ` ${n}`}` : "";
      }
      case "battery": {
        const o = t.attributes?.battery_level ?? t.attributes?.battery ?? (t.attributes?.device_class === "battery" ? t.state : void 0);
        if (o !== void 0) {
          const n = Number(o);
          if (!isNaN(n)) {
            let d = "#4caf50";
            return n <= 20 ? d = "#f44336" : n <= 50 && (d = "#ff9800"), S`<span style="color: ${d}; font-weight: bold;">${n}%</span>`;
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
const _i = 256, hi = Object.freeze(
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
const fi = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i, mi = /^\[\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\]$/;
class gi {
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
    let r = null;
    if (t.charCodeAt(0) === 35) {
      const a = t.substring(1), o = a.length;
      if (o === 3 || o === 4) {
        const n = parseInt(a[0] + a[0], 16), d = parseInt(a[1] + a[1], 16), h = parseInt(a[2] + a[2], 16);
        !isNaN(n) && !isNaN(d) && !isNaN(h) && (r = [n, d, h]);
      } else if (o >= 6) {
        const n = parseInt(a.substring(0, 2), 16), d = parseInt(a.substring(2, 4), 16), h = parseInt(a.substring(4, 6), 16);
        !isNaN(n) && !isNaN(d) && !isNaN(h) && (r = [n, d, h]);
      }
    } else if (t.startsWith("rgb")) {
      const a = t.match(fi);
      if (a) {
        const o = parseInt(a[1], 10), n = parseInt(a[2], 10), d = parseInt(a[3], 10);
        !isNaN(o) && !isNaN(n) && !isNaN(d) && (r = [
          Math.max(0, Math.min(255, o)),
          Math.max(0, Math.min(255, n)),
          Math.max(0, Math.min(255, d))
        ]);
      }
    } else if (t.charCodeAt(0) === 91 && t.charCodeAt(t.length - 1) === 93) {
      const a = t.match(mi);
      a && (r = [
        Math.max(0, Math.min(255, parseInt(a[1], 10))),
        Math.max(0, Math.min(255, parseInt(a[2], 10))),
        Math.max(0, Math.min(255, parseInt(a[3], 10)))
      ]);
    }
    if (this._cache.size >= _i) {
      let a = null, o = 1 / 0;
      for (const [n, d] of this._cacheAccessTimes)
        d < o && (o = d, a = n);
      a !== null && (this._cache.delete(a), this._cacheAccessTimes.delete(a));
    }
    const i = Date.now();
    return this._cache.set(t, r), this._cacheAccessTimes.set(t, i), r;
  }
  /**
   * Convert an [r, g, b] tuple to a 6-character hex string (#rrggbb).
   */
  rgbToHex(e) {
    if (!e || isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2])) return "#000000";
    const t = Math.max(0, Math.min(255, e[0] | 0)).toString(16).padStart(2, "0"), r = Math.max(0, Math.min(255, e[1] | 0)).toString(16).padStart(2, "0"), i = Math.max(0, Math.min(255, e[2] | 0)).toString(16).padStart(2, "0");
    return `#${t}${r}${i}`;
  }
  /**
   * Extract Hue angle (0-360) from an RGB tuple with strict NaN and bounds guards.
   */
  rgbToHue(e, t, r) {
    if (isNaN(e) || isNaN(t) || isNaN(r)) return 0;
    e = Math.max(0, Math.min(255, e)) / 255, t = Math.max(0, Math.min(255, t)) / 255, r = Math.max(0, Math.min(255, r)) / 255;
    const i = Math.max(e, t, r), a = Math.min(e, t, r), o = i - a;
    let n = 0;
    return o === 0 ? 0 : (i === e ? n = (t - r) / o + (t < r ? 6 : 0) : i === t ? n = (r - e) / o + 2 : i === r && (n = (e - t) / o + 4), Math.round(n / 6 * 360) % 360);
  }
  /**
   * Convert HSV values (h: 0-360, s: 0-1, v: 0-1) to an RGB tuple.
   */
  hsvToRgb(e, t, r) {
    e = isNaN(e) ? 0 : Math.max(0, Math.min(360, e)), t = isNaN(t) ? 0 : Math.max(0, Math.min(1, t)), r = isNaN(r) ? 0 : Math.max(0, Math.min(1, r));
    const i = r * t, a = i * (1 - Math.abs(e / 60 % 2 - 1)), o = r - i;
    let n = 0, d = 0, h = 0;
    return e >= 0 && e < 60 ? (n = i, d = a) : e >= 60 && e < 120 ? (n = a, d = i) : e >= 120 && e < 180 ? (d = i, h = a) : e >= 180 && e < 240 ? (d = a, h = i) : e >= 240 && e < 300 ? (n = a, h = i) : e >= 300 && e <= 360 && (n = i, h = a), [
      Math.round((n + o) * 255),
      Math.round((d + o) * 255),
      Math.round((h + o) * 255)
    ];
  }
  /**
   * Convert Kelvin temperature to an approximation RGB tuple.
   */
  kelvinToRgb(e) {
    if (isNaN(e)) return [255, 255, 255];
    const t = Math.max(1e3, Math.min(4e4, e)) / 100;
    let r = 0, i = 0, a = 0;
    return t <= 66 ? r = 255 : r = Math.min(255, Math.max(0, 329.698727446 * Math.pow(t - 60, -0.1332047592))), t <= 66 ? i = Math.min(255, Math.max(0, 99.4708025861 * Math.log(t) - 161.1195681661)) : i = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(t - 60, -0.0755148492))), t >= 66 ? a = 255 : t <= 19 ? a = 0 : a = Math.min(255, Math.max(0, 138.5177312231 * Math.log(t - 10) - 305.0447927307)), [Math.round(r), Math.round(i), Math.round(a)];
  }
  /**
   * Linear interpolation between two RGB tuples.
   */
  lerpRgb(e, t, r) {
    if (!e || !t) return [0, 0, 0];
    const i = isNaN(r) ? 0 : Math.max(0, Math.min(1, r));
    return [
      Math.round(e[0] + (t[0] - e[0]) * i),
      Math.round(e[1] + (t[1] - e[1]) * i),
      Math.round(e[2] + (t[2] - e[2]) * i)
    ];
  }
  /**
   * Convert HS values (h: 0-360, s: 0-100) to an RGB tuple.
   */
  hsToRgb(e, t) {
    e = (e % 360 + 360) % 360 / 360, t = Math.max(0, Math.min(100, t)) / 100;
    const r = 1, i = Math.floor(e * 6), a = e * 6 - i, o = r * (1 - t), n = r * (1 - a * t), d = r * (1 - (1 - a) * t);
    let h = 0, u = 0, s = 0;
    switch (i % 6) {
      case 0:
        h = r, u = d, s = o;
        break;
      case 1:
        h = n, u = r, s = o;
        break;
      case 2:
        h = o, u = r, s = d;
        break;
      case 3:
        h = o, u = n, s = r;
        break;
      case 4:
        h = d, u = o, s = r;
        break;
      case 5:
        h = r, u = o, s = n;
        break;
    }
    return [Math.round(h * 255), Math.round(u * 255), Math.round(s * 255)];
  }
}
const H = new gi(), K = H.parseColorToRgb.bind(H), nt = H.rgbToHex.bind(H), bi = H.rgbToHue.bind(H);
H.hsvToRgb.bind(H);
const kt = H.hsToRgb.bind(H), ee = H.kelvinToRgb.bind(H), wt = H.lerpRgb.bind(H), vi = [
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
], yi = [
  { k: 2200, label: "2200K", rgb: ee(2200) },
  { k: 2700, label: "2700K", rgb: ee(2700) },
  { k: 3e3, label: "3000K", rgb: ee(3e3) },
  { k: 4e3, label: "4000K", rgb: ee(4e3) },
  { k: 5e3, label: "5000K", rgb: ee(5e3) },
  { k: 6500, label: "6500K", rgb: ee(6500) }
], xi = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Ht = class Ht {
  /**
   * Determine whether an entity is currently in an active state.
   */
  static isEntityActive(e) {
    return e ? hi.has(e.state) : !1;
  }
  /**
   * Extract clean domain from entity ID.
   */
  static getDomain(e) {
    return !e || typeof e != "string" ? "" : e.split(".")[0] || "";
  }
  /**
   * Clean redundant domain words from friendly names (e.g. "Living Room Motion" -> "Living Room").
   */
  static getCleanName(e, t, r) {
    if (r && r.trim())
      return r.trim();
    const i = t?.attributes?.friendly_name;
    if (!i)
      return e ? e.split(".")[1]?.replace(/_/g, " ") || e : "";
    if (this._nameCache.has(i))
      return this._nameCache.get(i);
    let a = i.replace(/\b(Motion Sensor|Motion Detector|Motion|Opening|Contact Sensor|Contact|Door Sensor|Door Lock|Lock|Smart Plug Dimmer|Smart Plug|Dimmer|Light Switch|Switch)\b/gi, "").replace(/\s+/g, " ").trim();
    return a || (a = i), this._nameCache.set(i, a), a;
  }
  /**
   * Resolve live light color from state attributes (prioritizing RGB / HS over color temp).
   */
  static getLightLiveColor(e) {
    if (!e || !e.attributes || e.state !== void 0 && e.state !== "on") return null;
    const t = e.attributes;
    if (t.color_mode === "color_temp") {
      const i = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [a, o, n] = ee(i);
      return `rgb(${a}, ${o}, ${n})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [i, a, o] = kt(t.hs_color[0], t.hs_color[1]);
      return `rgb(${i}, ${a}, ${o})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const i = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [a, o, n] = ee(i);
      return `rgb(${a}, ${o}, ${n})`;
    }
    return e.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  /**
   * Alias for getLightLiveColor
   */
  static getLiveLightColor(e) {
    return this.getLightLiveColor(e);
  }
  /**
   * Get hex color code for the live state.
   */
  static getLiveHex(e) {
    if (!e?.attributes || e.state !== "on") return "#ffffff";
    const t = e.attributes;
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return nt(t.rgb_color);
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2)
      return nt(kt(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const a = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return nt(ee(a));
    }
    const r = this.getLightLiveColor(e);
    if (!r) return "#ffffff";
    const i = K(r);
    return i ? nt(i) : "#ffffff";
  }
  /**
   * Get live hue (0-360) for color wheel or hue slider.
   */
  static getLiveHue(e) {
    if (!e) return 0;
    if (Array.isArray(e.attributes?.hs_color) && e.attributes.hs_color.length >= 1)
      return Math.round(e.attributes.hs_color[0]) % 360;
    if (Array.isArray(e.attributes?.rgb_color) && e.attributes.rgb_color.length >= 3) {
      const [t, r, i] = e.attributes.rgb_color;
      return bi(t, r, i);
    }
    return 0;
  }
  /**
   * Detect supported color and brightness modes for light entities.
   */
  static detectLightFeatures(e) {
    const t = e?.attributes?.supported_color_modes;
    let r = e?.attributes?.brightness !== void 0, i = !1, a = !1;
    if (Array.isArray(t))
      for (let o = 0; o < t.length; o++) {
        const n = t[o];
        n !== "onoff" && (r = !0), n === "color_temp" && (i = !0), xi.has(n) && (a = !0);
      }
    return { supportsBrightness: r, supportsColorTemp: i, supportsColor: a };
  }
  /**
   * Determine the default active color for an entity based on its domain and state.
   */
  static getDefaultActiveColor(e, t, r = null) {
    if (e === "climate") {
      if (t?.state === "heat") return "var(--state-climate-heat-color, #ff7043)";
      if (t?.state === "cool") return "var(--state-climate-cool-color, #42a5f5)";
      if (t?.state === "dry") return "var(--state-climate-dry-color, #ab47bc)";
      if (t?.state === "fan_only") return "var(--state-climate-fan_only-color, #26a69a)";
    } else if (e === "light") {
      if (r) return r;
    } else if (e === "binary_sensor" || e === "lock" || e === "switch")
      return "#d60000";
    return "var(--primary-color)";
  }
  /**
   * Determine the default inactive color for an entity based on its domain.
   */
  static getDefaultInactiveColor(e) {
    return e === "light" ? "#000000" : e === "binary_sensor" || e === "lock" || e === "switch" ? "#03b500" : "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
  }
};
Ht._nameCache = /* @__PURE__ */ new Map();
let te = Ht;
class O {
  /**
   * Render a generic slider container with support for Google, Full, and Compact themes.
   */
  static renderGenericSlider(e, t, r, i, a, o, n, d, h, u, s, f, p, v, m = "", b = "", l, _ = "") {
    const g = e.slider_style === "google", y = g && e.show_slider_percent !== !1 || e.show_slider_percent === !0, $ = v ? v(n, d) : `${d}%`, x = l !== void 0 ? l : $, k = e.slider_stepped_movement === !1 ? "any" : o, T = t !== "color_temp" && t !== "color_hue", M = e.slider_style === "full", C = T && M ? "main-slider-full" : "";
    let N = _;
    if (T && M) {
      const P = Number(e.slider_start_offset) || 0, F = Number(e.slider_end_offset) || 0;
      N = `left: ${P}px !important; right: ${F}px !important; width: calc(100% - ${P + F}px) !important;`;
    }
    return S`
      <div class="slider-container ${m} ${C} ${g ? "slider-google-wrap" : ""}" style="${N} ${b}">
        <input type="range" min=${i} max=${a} step=${k} .value=${n}
               aria-label="${r}"
               style="--slider-pct: ${d}%;"
               @pointerdown=${f.onPointerDown}
               @pointermove=${f.onPointerMove}
               @pointerup=${f.onPointerUp}
               @pointercancel=${f.onPointerCancel}
               @input=${(P) => f.onSliderInput(P, t, h, u, s, p, v)}
               @change=${(P) => f.onSliderChange(P, h, u, s)} />
        ${y && x ? S`<span class="slider-percent-badge">${x}</span>` : w}
      </div>
    `;
  }
  /**
   * Render decay / cooldown progress bar slider.
   */
  static renderDecaySlider(e, t = "") {
    return !e.enabled || !e.activeFade ? S`` : S`
      <div class="slider-container decay-slider-container" style="${t}">
        <div class="decay-slider-track" style="--decay-pct: ${e.progressPct}%; --decay-color: ${e.currentColor};">
          <div class="decay-slider-fill"></div>
        </div>
        <span class="decay-slider-badge">${e.stageLabel}</span>
      </div>
    `;
  }
  /**
   * Render light brightness slider.
   */
  static renderLightSlider(e, t, r, i = "") {
    const a = te.isEntityActive(t), o = t.attributes.brightness ?? 0, n = Math.max(0, Math.min(100, Math.round(o / 255 * 100))), d = te.getLightLiveColor(t), h = (e.use_light_color !== !1 || !e.slider_color) && d ? `--slider-color: ${d};` : "";
    return this.renderGenericSlider(
      e,
      "brightness",
      "Brightness",
      0,
      255,
      1,
      o,
      n,
      "light",
      "turn_on",
      (u) => ({ brightness: u }),
      r,
      (u) => Math.round(u / 255 * 100),
      (u, s) => !a || s <= 0 ? "" : `${s}%`,
      "",
      h,
      void 0,
      i
    );
  }
  /**
   * Render color temperature slider or chip presets.
   */
  static renderColorTempSlider(e, t, r, i = "") {
    const a = e.color_temp_type || "gradient", o = t.attributes.color_temp_kelvin !== void 0 || t.attributes.min_color_temp_kelvin !== void 0 || t.attributes.max_color_temp_kelvin !== void 0, n = o ? t.attributes.min_color_temp_kelvin || 2e3 : t.attributes.min_mireds || 153, d = o ? t.attributes.max_color_temp_kelvin || 6500 : t.attributes.max_mireds || 500, h = o ? t.attributes.color_temp_kelvin || 3e3 : t.attributes.color_temp || 300, u = d - n, s = u > 0 ? Math.max(0, Math.min(100, Math.round((h - n) / u * 100))) : 0, f = o ? "color_temp_kelvin" : "color_temp", p = a === "google" || a === "gradient" && e.slider_style === "google", v = p ? 42 : a === "thin" ? 6 : 12, m = p ? 21 : a === "thin" ? 3 : 6, b = e.color_temp_height !== void 0 ? e.color_temp_height : e.slider_height ?? v, l = e.color_temp_border_radius !== void 0 ? e.color_temp_border_radius : e.slider_border_radius ?? m, _ = o ? `${h} K` : `${h} mireds`;
    if (a === "presets") {
      const g = Number(e.color_temp_start_offset) || 0, y = Number(e.color_temp_end_offset) || 0, $ = [
        g ? `margin-left: ${g}px;` : "",
        y ? `margin-right: ${y}px;` : ""
      ].filter(Boolean).join(" ");
      return S`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${$}">
          ${yi.map((x) => {
        const [k, T, M] = x.rgb, C = Math.abs(h - x.k) < 200, N = () => {
          r.forwardHaptic && r.forwardHaptic("light"), r.callService("light", "turn_on", { entity_id: e.entity, [f]: x.k });
        };
        return S`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${x.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${b}px; border-radius: ${l}px; border: ${C ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${k}, ${T}, ${M}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${C ? "0 0 8px rgba(" + k + "," + T + "," + M + ", 0.8)" : "none"};"
                @keydown=${(P) => {
          (P.key === "Enter" || P.key === " ") && (P.preventDefault(), P.stopPropagation(), N());
        }}
                @click=${(P) => {
          P.stopPropagation(), N();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${k}, ${T}, ${M}); display: inline-block;"></span>
                ${x.label}
              </button>
            `;
      })}
        </div>
      `;
    }
    return this.renderGenericSlider(
      e,
      "color_temp",
      "Color Temperature",
      n,
      d,
      1,
      h,
      s,
      "light",
      "turn_on",
      (g) => ({ [f]: g }),
      r,
      (g) => u > 0 ? Math.round((g - n) / u * 100) : 0,
      (g) => o ? `${g} K` : `${g} mireds`,
      `color-temp ${o ? "kelvin" : "mireds"} ${p ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${b}px; --ag-slider-radius: ${l}px;`,
      _,
      i
    );
  }
  /**
   * Render color hue slider, preset palette swatches, or wheel picker.
   */
  static renderColorSlider(e, t, r, i = "") {
    const a = e.color_picker_type || "slider";
    if (a === "wheel")
      return this.renderColorPicker(e, t, r);
    if (a === "swatches") {
      const p = te.getLiveHex(t).toLowerCase(), v = e.color_slider_height !== void 0 ? e.color_slider_height : 32, m = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : 8, b = Number(e.color_slider_start_offset) || 0, l = Number(e.color_slider_end_offset) || 0, _ = [
        b ? `margin-left: ${b}px;` : "",
        l ? `margin-right: ${l}px;` : ""
      ].filter(Boolean).join(" ");
      return S`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${_}">
          ${vi.map((g) => {
        const y = p === g.hex.toLowerCase(), $ = () => {
          r.forwardHaptic && r.forwardHaptic("light"), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: g.rgb });
        };
        return S`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${g.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${g.label}"
                style="flex: 1; min-width: 28px; height: ${v}px; border-radius: ${m}px; background: ${g.hex}; border: ${y ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${y ? "0 0 10px " + g.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @keydown=${(x) => {
          (x.key === "Enter" || x.key === " ") && (x.preventDefault(), x.stopPropagation(), $());
        }}
                @click=${(x) => {
          x.stopPropagation(), $();
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const o = e.slider_style === "google", n = e.color_slider_height !== void 0 ? e.color_slider_height : e.slider_height ?? (o ? 42 : 36), d = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : e.slider_border_radius ?? (o ? 21 : 8), h = te.getLiveHue(t), u = `hsl(${h}, 100%, 50%)`, s = Math.round(h / 360 * 100);
    let f;
    return e.color_swatch_presets !== !1 && (f = S`
        <div class="color-swatch-chips">
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Red Color" style="background: #f44336;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [244, 67, 54] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [244, 67, 54] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Orange Color" style="background: #ff9800;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [255, 152, 0] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [255, 152, 0] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Yellow Color" style="background: #ffeb3b;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [255, 235, 59] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [255, 235, 59] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Green Color" style="background: #4caf50;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [76, 175, 80] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [76, 175, 80] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Cyan Color" style="background: #00bcd4;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [0, 188, 212] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [0, 188, 212] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Blue Color" style="background: #2196f3;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [33, 150, 243] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [33, 150, 243] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Purple Color" style="background: #9c27b0;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [156, 39, 176] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [156, 39, 176] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Pink Color" style="background: #e91e63;" @click=${(p) => {
      p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [233, 30, 99] });
    }} @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: [233, 30, 99] }));
    }}></span>
        </div>
      `), this.renderGenericSlider(
      e,
      "color_hue",
      "Light Color Hue",
      0,
      360,
      1,
      h,
      s,
      "light",
      "turn_on",
      (p) => {
        const [v, m, b] = kt(p, 100);
        return { rgb_color: [v, m, b] };
      },
      r,
      (p) => Math.round(p / 360 * 100),
      (p) => `${p}°`,
      `color-hue ${o ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${n}px; --ag-slider-radius: ${d}px; --color-hue-val: ${u};`,
      f,
      i
    );
  }
  /**
   * Render HTML color picker.
   */
  static renderColorPicker(e, t, r) {
    const i = te.getLiveHex(t), a = e.color_slider_height !== void 0 ? e.color_slider_height : e.slider_height ?? 36, o = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : e.slider_border_radius ?? 8;
    return S`
      <div class="color-picker" title="Adjust Light Color" style="height: ${a}px; border-radius: ${o}px;">
        <input type="color" 
               .value=${i} 
               @input=${(n) => r.onColorInput(n, !0)}
               @change=${(n) => r.onColorInput(n, !1)} />
        <span class="color-label">Color (${i})</span>
      </div>
    `;
  }
  /**
   * Render cover position slider.
   */
  static renderCoverSlider(e, t, r, i = "") {
    const a = t.attributes.current_position ?? (t.state === "open" || t.state === "opening" ? 100 : 0);
    return this.renderGenericSlider(
      e,
      "cover",
      "Cover Position",
      0,
      100,
      1,
      a,
      a,
      "cover",
      "set_cover_position",
      (o) => ({ position: o }),
      r,
      (o) => o,
      (o, n) => `${n}%`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render fan speed percentage slider.
   */
  static renderFanSlider(e, t, r, i = "") {
    const a = t.attributes.percentage ?? 0, o = t.attributes.percentage_step ?? 1;
    return this.renderGenericSlider(
      e,
      "fan",
      "Fan Speed",
      0,
      100,
      o,
      a,
      a,
      "fan",
      "set_percentage",
      (n) => {
        const d = o > 1 ? Math.round(n / o) * o : n;
        return { percentage: Math.min(100, Math.max(0, d)) };
      },
      r,
      (n) => n,
      (n, d) => `${d}%`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render media volume slider.
   */
  static renderMediaSlider(e, t, r, i = "") {
    const a = t.attributes.is_volume_muted === !0, o = a ? 0 : Math.round((t.attributes.volume_level ?? 0) * 100), n = a ? "Muted (0%)" : void 0;
    return this.renderGenericSlider(
      e,
      "media",
      "Volume",
      0,
      100,
      1,
      o,
      o,
      "media_player",
      "volume_set",
      (d) => ({ volume_level: d / 100 }),
      r,
      (d) => d,
      (d, h) => a ? "Muted" : `${h}%`,
      "media",
      "",
      n,
      i
    );
  }
  /**
   * Render number domain slider.
   */
  static renderNumberSlider(e, t, r, i = "") {
    const a = Number(t.attributes.min ?? 0);
    let o = Number(t.attributes.max ?? 100);
    a >= o && (o = a + 100);
    const n = Number(t.attributes.step ?? 1), d = Number(t.state), h = isNaN(d) ? a : d, u = o - a, s = u > 0 ? Math.max(0, Math.min(100, Math.round((h - a) / u * 100))) : 0, f = (e.entity || "number").split(".")[0], p = t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "", v = n.toString(), m = v.includes(".") ? v.split(".")[1].length : 0;
    return this.renderGenericSlider(
      e,
      "number",
      "Value",
      a,
      o,
      n,
      h,
      s,
      f,
      "set_value",
      (b) => ({ value: m > 0 ? Number(b.toFixed(m)) : Math.round(b) }),
      r,
      (b) => u > 0 ? Math.round((b - a) / u * 100) : 0,
      (b) => `${m > 0 ? Number(b).toFixed(m) : Math.round(Number(b))}${p}`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render climate temperature slider.
   */
  static renderClimateSlider(e, t, r, i, a = "") {
    const o = r?.config?.unit_system?.temperature === "°F" || r?.config?.unit_system?.temperature === "F", n = o ? "°F" : "°C", d = o ? 60 : 16, h = o ? 85 : 30, u = t.attributes.min_temp ?? d, s = t.attributes.max_temp ?? h, f = t.attributes.target_temp_step ?? t.attributes.target_temperature_step ?? (o ? 1 : 0.5), p = t.attributes.target_temp_low !== void 0 && t.attributes.target_temp_high !== void 0, v = t.attributes.temperature ?? t.attributes.target_temp_low ?? t.attributes.target_temp_high ?? u, m = s - u, b = m > 0 ? Math.max(0, Math.min(100, Math.round((v - u) / m * 100))) : 0;
    return this.renderGenericSlider(
      e,
      "climate",
      "Temperature",
      u,
      s,
      f,
      v,
      b,
      "climate",
      "set_temperature",
      (l) => p ? { target_temp_low: l, target_temp_high: Math.min(s, l + (o ? 4 : 2)) } : { temperature: l },
      i,
      (l) => m > 0 ? Math.round((l - u) / m * 100) : 0,
      (l) => `${l}${n}`,
      "climate-temp",
      "",
      `${v}${n}`,
      a
    );
  }
  /**
   * Render humidifier slider.
   */
  static renderHumidifierSlider(e, t, r, i = "") {
    const a = t.attributes?.min_humidity ?? 0, o = t.attributes?.max_humidity ?? 100, n = t.attributes?.humidity ?? t.attributes?.target_humidity ?? a, d = o - a, h = d > 0 ? Math.max(0, Math.min(100, Math.round((n - a) / d * 100))) : 0;
    return this.renderGenericSlider(
      e,
      "humidifier",
      "Humidity",
      a,
      o,
      1,
      n,
      h,
      "humidifier",
      "set_humidity",
      (u) => ({ humidity: u }),
      r,
      (u) => d > 0 ? Math.round((u - a) / d * 100) : 0,
      (u, s) => `${s}%`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render compact sub-slider inside sub-button row.
   */
  static renderSubSlider(e, t, r, i, a, o, n, d) {
    const h = i || t.states[e.entity || ""], u = r || e.entity || "", s = h?.attributes?.volume_level !== void 0 || h?.entity_id?.startsWith("media_player."), f = h?.attributes?.percentage !== void 0 || h?.entity_id?.startsWith("fan."), p = h?.attributes?.current_position !== void 0 || h?.entity_id?.startsWith("cover.");
    let v = 0, m = 0, b = 255, l = "1", _ = "turn_on", g = "light", y = "brightness";
    s ? (v = h?.attributes?.volume_level ?? 0, b = 1, l = "0.01", _ = "set_volume_level", g = "media_player", y = "volume_level") : f ? (v = h?.attributes?.percentage ?? 0, b = 100, l = "1", _ = "set_percentage", g = "fan", y = "percentage") : p ? (v = h?.attributes?.current_position ?? 0, b = 100, l = "1", _ = "set_cover_position", g = "cover", y = "position") : v = h?.attributes?.brightness ?? 0;
    const $ = Math.round(b === 1 ? v * 100 : b === 100 ? v : v / 255 * 100);
    return a === "slider" ? S`
        <div class="sub-button-slider-container ${n}" style="${o}" title="Level: ${$}%">
          <input type="range" 
                 min="${m}" 
                 max=${b} 
                 step=${l} 
                 .value=${v}
                 @pointerdown=${(x) => x.stopPropagation()}
                 @input=${(x) => {
      x.stopPropagation();
      const k = parseFloat(x.target.value), T = Math.round(b === 1 ? k * 100 : b === 100 ? k : k / 255 * 100), M = x.target.closest(".sub-button-slider-container");
      M && M.style.setProperty("--sub-slider-pct", `${T}%`), d(`sub_${u}`, () => {
        t.callService(g, _, { entity_id: u, [y]: k });
      }, 50);
    }}
                 @change=${(x) => {
      x.stopPropagation();
      const k = parseFloat(x.target.value);
      t.callService(g, _, { entity_id: u, [y]: k });
    }}
                 style="--sub-slider-pct: ${$}%;" />
        </div>
      ` : S`
      <div class="sub-button-group-updown" style="${o}">
        <button type="button" class="sub-button ${n}" title="Decrease Level"
                @click=${(x) => {
      x.stopPropagation();
      const T = Math.max(m, v - (b === 1 ? 0.05 : b === 100 ? 5 : 25));
      t.callService(g, _, { entity_id: u, [y]: T });
    }}>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </button>
        <span class="sub-button-updown-val">${$}%</span>
        <button type="button" class="sub-button ${n}" title="Increase Level"
                @click=${(x) => {
      x.stopPropagation();
      const T = Math.min(b, v + (b === 1 ? 0.05 : b === 100 ? 5 : 25));
      t.callService(g, _, { entity_id: u, [y]: T });
    }}>
          <ha-icon icon="mdi:chevron-up"></ha-icon>
        </button>
      </div>
    `;
  }
  /**
   * Render sub color picker.
   */
  static renderSubColorPicker(e, t, r, i, a, o, n, d) {
    const h = r || e.states[t || ""], u = t || h?.entity_id, s = te.getLiveHex(h);
    return S`
      <div class="sub-button sub-button-color-picker ${a}" style="${i}" title="Color (${s})">
        <input type="color" 
               .value=${s} 
               @click=${(f) => f.stopPropagation()}
               @input=${(f) => o.onColorInput(f, !0, u, `sub_color_${u}`)}
               @change=${(f) => o.onColorInput(f, !1, u, `sub_color_${u}`)} />
        <ha-icon icon="mdi:palette" style="color: ${s};"></ha-icon>
        ${n ? S`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${n}</span>` : w}
        ${d ? S`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${d}</span>` : w}
      </div>
    `;
  }
}
var wi = Object.defineProperty, Lt = (c, e, t, r) => {
  for (var i = void 0, a = c.length - 1, o; a >= 0; a--)
    (o = c[a]) && (i = o(e, t, i) || i);
  return i && wi(e, t, i), i;
};
const Si = [
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
], $i = [
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
], Ci = [
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
], ki = [
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
], Ti = [
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
], or = [
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
function mt(c) {
  return [
    { name: `sub_button_${c}_entity`, selector: { entity: {} } },
    { name: `sub_button_${c}_type`, selector: { select: { options: [
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
    { name: `sub_button_${c}_icon`, selector: { icon: {} } },
    { name: `sub_button_${c}_name`, selector: { text: {} } },
    { name: `sub_button_${c}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${c}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${c}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${c}_tap_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${c}_hold_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${c}_double_tap_action`, selector: { "ui-action": {} } }
  ];
}
const Mi = mt(1), Ai = mt(2), Pi = mt(3), Ei = mt(4), Ni = [
  { name: "tap_action", selector: { "ui-action": {} } },
  { name: "hold_action", selector: { "ui-action": {} } },
  { name: "double_tap_action", selector: { "ui-action": {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
];
function B(c) {
  if (!c) return;
  if (Array.isArray(c)) {
    const r = (i) => Math.round(Math.max(0, Math.min(255, i))).toString(16).padStart(2, "0");
    return `#${r(c[0] ?? 0)}${r(c[1] ?? 0)}${r(c[2] ?? 0)}`;
  }
  if (typeof c != "string") return;
  if (c.startsWith("#")) return c;
  const e = c.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (e) {
    const r = (i) => Math.round(Math.max(0, Math.min(255, parseInt(i, 10)))).toString(16).padStart(2, "0");
    return `#${r(e[1])}${r(e[2])}${r(e[3])}`;
  }
  const t = c.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/);
  if (t) {
    const r = (i) => Math.round(Math.max(0, Math.min(255, parseInt(i, 10)))).toString(16).padStart(2, "0");
    return `#${r(t[1])}${r(t[2])}${r(t[3])}`;
  }
  return c;
}
function D(c) {
  const e = B(c);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), r = parseInt(e.slice(3, 5), 16), i = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(r) || isNaN(i)))
    return [t, r, i];
}
const Li = {
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
class ot extends Fe {
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
      const r = typeof t.bg_color == "string" ? t.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      r && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(r[1]) * 100)), t.bg_color = B(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = B(t.card_border_color)), t.active_color && (t.active_color = B(t.active_color)), t.inactive_color && (t.inactive_color = B(t.inactive_color)), t.slider_color && (t.slider_color = B(t.slider_color)), t.slider_track_color && (t.slider_track_color = B(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = B(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = B(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = B(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = B(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = B(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = B(t.sub_button_4_color)), this._config = {
      ...$t,
      ...t
    };
  }
  _computeLabel(e) {
    return Li[e.name] || e.name;
  }
  _transformConfigForForm() {
    const e = { ...this._config };
    return e.bg_color = D(e.bg_color), e.card_border_color = D(e.card_border_color), e.active_color = D(e.active_color), e.inactive_color = D(e.inactive_color), e.slider_color = D(e.slider_color), e.slider_track_color = D(e.slider_track_color), e.text_color_primary = D(e.text_color_primary), e.text_color_secondary = D(e.text_color_secondary), e.sub_button_1_color = D(e.sub_button_1_color), e.sub_button_2_color = D(e.sub_button_2_color), e.sub_button_3_color = D(e.sub_button_3_color), e.sub_button_4_color = D(e.sub_button_4_color), e.fade_stage_1_color = D(e.fade_stage_1_color), e.fade_stage_2_color = D(e.fade_stage_2_color), e.fade_stage_3_color = D(e.fade_stage_3_color), e;
  }
  _valueChanged(e, t) {
    const r = e.detail.value, i = { ...this._config };
    if (t) {
      for (const a of t)
        if (a.name in r) {
          const o = r[a.name];
          Array.isArray(o) && o.length === 3 && o.every((n) => typeof n == "number") ? i[a.name] = `rgb(${o[0]}, ${o[1]}, ${o[2]})` : i[a.name] = o;
        }
    } else
      Object.assign(i, r);
    this._config = i, it(this, "config-changed", { config: this._config });
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    }, this.requestUpdate();
  }
  _renderSection(e, t, r, i, a) {
    const o = !!this._openPanels[e];
    return S`
      <div class="custom-panel ${o ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${r}</span>
          </div>
          <ha-icon class="chevron-icon ${o ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${o ? S`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${a}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(n) => this._valueChanged(n, i)}
            ></ha-form>
          </div>
        ` : w}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, r, i) {
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
              .data=${i}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(n) => this._valueChanged(n, r)}
            ></ha-form>
          </div>
        ` : w}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return S``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", r = this._config?.sub_button_2_entity || "", i = this._config?.sub_button_3_entity || "", a = this._config?.sub_button_4_entity || "", o = !!this._openPanels.sub_buttons;
    return S`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", Si, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", $i, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Ci, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", ki, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Ti, e)}

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
                .schema=${or}
                .computeLabel=${this._computeLabel}
                @value-changed=${(n) => this._valueChanged(n, or)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, Mi, e)}
                ${this._renderSubButtonPanel(2, r, Ai, e)}
                ${this._renderSubButtonPanel(3, i, Pi, e)}
                ${this._renderSubButtonPanel(4, a, Ei, e)}
              </div>
            </div>
          ` : w}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", Ni, e)}
      </div>
    `;
  }
  static get styles() {
    return lr`
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
Lt([
  ht({ attribute: !1 })
], ot.prototype, "hass");
Lt([
  ft()
], ot.prototype, "_config");
Lt([
  ft()
], ot.prototype, "_openPanels");
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", ot);
customElements.get("antigravity-card-editor") || customElements.define("antigravity-card-editor", ot);
var Di = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, Ve = (c, e, t, r) => {
  for (var i = r > 1 ? void 0 : r ? Hi(e, t) : e, a = c.length - 1, o; a >= 0; a--)
    (o = c[a]) && (i = (r ? o(e, t, i) : o(i)) || i);
  return r && i && Di(e, t, i), i;
};
typeof window < "u" && (window.runAntigravityCI = fr, window.antigravityMemoryReport = () => ut.logStatus(), window.antigravityPowerStatus = () => ge.isPowerSaveActive());
const Ri = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${Ri} `,
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
let Oe = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  Oe = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (Oe = Date.now());
}, { passive: !0 }));
const Bi = /* @__PURE__ */ new Set([
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
]), zi = /* @__PURE__ */ new Set([
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
]), Ii = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Oi = /* @__PURE__ */ new Set([
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
]), Fi = /^\d+\s*,\s*\d+\s*,\s*\d+$/, Ui = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;
function St(c) {
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
const st = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function R(c, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if (Qe(c), typeof window < "u" && window.dispatchEvent(new CustomEvent("haptic", { detail: c, bubbles: !0, composed: !0 })), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let t = 6;
        c === "heavy" ? t = 20 : c === "medium" ? t = 12 : c === "success" ? t = [40, 40, 80] : c === "warning" ? t = [50, 30, 50] : c === "error" && (t = [50, 100, 50]), navigator.vibrate(t);
      }
    } catch {
    }
}
const ze = /* @__PURE__ */ new Map(), ar = 250;
function Gi(c) {
  if (!c) return "";
  const e = ze.get(c);
  if (e !== void 0) return e;
  const t = c.trim();
  if (!t)
    return ze.set(c, ""), "";
  let r = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? r = t : Fi.test(t) ? r = `rgb(${t})` : Ui.test(t) ? r = `rgba(${t})` : t.toLowerCase() === "state" ? r = "var(--state-icon-color, var(--primary-color))" : zi.has(t.toLowerCase()) && (r = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), ze.size >= ar) {
    const i = Math.floor(ar / 4), a = ze.keys();
    for (let o = 0; o < i; o++) {
      const n = a.next().value;
      n !== void 0 && ze.delete(n);
    }
  }
  return ze.set(c, r), r;
}
class le extends Fe {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._powerUnsubscribe = null, this._gl = null, this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const i = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), a = Number(t.value) || 0, o = t.style.getPropertyValue("--slider-pct") || "", n = i?.textContent || "";
      this._sliderStateMap.set(t, {
        startX: e.clientX,
        startY: e.clientY,
        initialVal: a,
        initialPct: o,
        initialBadge: n,
        isScrolling: !1,
        isSliding: !1
      });
    }, this._onSliderPointerMove = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = this._sliderStateMap.get(t);
      if (!r) return;
      const i = Math.abs(e.clientX - r.startX), a = Math.abs(e.clientY - r.startY);
      !r.isSliding && !r.isScrolling ? a > 6 && a > i ? (r.isScrolling = !0, this._revertSlider(t, r)) : i > 6 && i >= a && (r.isSliding = !0) : r.isScrolling && this._revertSlider(t, r);
    }, this._onSliderPointerCancel = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = this._sliderStateMap.get(t);
      r && (r.isScrolling = !0, this._revertSlider(t, r), this._sliderStateMap.delete(t));
    }, this._onSliderPointerUp = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = this._sliderStateMap.get(t);
      if (r) {
        if (r.isScrolling) {
          this._revertSlider(t, r), this._sliderStateMap.delete(t);
          return;
        }
        if (this.config.tap_slider_to_toggle && !r.isSliding) {
          const i = Math.abs(e.clientX - r.startX), a = Math.abs(e.clientY - r.startY);
          i < 6 && a < 6 && (this._revertSlider(t, r), R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
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
    return { ...$t };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...$t,
      ...e
    }, this._cachedSubButtons = null;
    const t = /* @__PURE__ */ new Set();
    if (this.config.entity && t.add(this.config.entity), this.config.sub_button_1_entity && t.add(this.config.sub_button_1_entity), this.config.sub_button_2_entity && t.add(this.config.sub_button_2_entity), this.config.sub_button_3_entity && t.add(this.config.sub_button_3_entity), this.config.sub_button_4_entity && t.add(this.config.sub_button_4_entity), this.config.tap_action?.target?.entity_id) {
      const r = this.config.tap_action.target.entity_id;
      typeof r == "string" ? t.add(r) : Array.isArray(r) && r.forEach((i) => t.add(i));
    }
    if (this.config.hold_action?.target?.entity_id) {
      const r = this.config.hold_action.target.entity_id;
      typeof r == "string" ? t.add(r) : Array.isArray(r) && r.forEach((i) => t.add(i));
    }
    this._monitoredEntities = Array.from(t), this._computeStaticStylesAndClasses();
  }
  shouldUpdate(e) {
    if (!this.config || !this.hass || e.has("config") || e.has("preview") || e.has("_collapsed")) return !0;
    const t = e.get("hass");
    if (!t || t.themes !== this.hass.themes || t.locale !== this.hass.locale || t.language !== this.hass.language || t.selectedTheme !== this.hass.selectedTheme)
      return !0;
    const r = this._monitoredEntities, i = r.length;
    for (let a = 0; a < i; a++) {
      const o = r[a];
      if (t.states[o] !== this.hass.states[o])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const e = this.config.card_padding_vertical ?? this.config.card_padding ?? 0, t = this.config.card_padding_horizontal ?? this.config.card_padding ?? 15, r = this.config.card_padding_top ?? e, i = this.config.card_padding_bottom ?? e, a = this.config.card_padding_left ?? t, o = this.config.card_padding_right ?? t, n = this.config.card_margin ?? -1, d = this.config.card_margin_vertical ?? n, h = this.config.card_margin_horizontal ?? n, u = this.config.card_margin_top ?? d, s = this.config.card_margin_bottom ?? d, f = this.config.card_margin_left ?? h, p = this.config.card_margin_right ?? h;
    let v = "";
    (u !== void 0 || s !== void 0 || f !== void 0 || p !== void 0) && (v = `margin: ${u ?? 0}px ${p ?? 0}px ${s ?? 0}px ${f ?? 0}px;`);
    const m = this.config.border_radius ?? 12, b = this.config.slider_style === "google", l = this.config.slider_style === "full", _ = b ? 42 : l ? 40 : 12, g = this.config.slider_height !== void 0 ? this.config.slider_height : _, y = b ? 21 : l ? 0 : g / 2, $ = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : y, x = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), k = this.config.card_border_style ?? "solid", T = x > 0 ? `border: ${x}px ${k} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", M = this.config.card_width ? `width: ${this.config.card_width};` : "", C = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", N = this.config.card_height ? `height: ${this.config.card_height};` : "", P = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", F = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", q = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", ce = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", ye = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", xe = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", we = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, Y = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, Se = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, $e = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Ce = this.config.sub_button_padding ?? 6, ke = this.config.sub_button_container_padding ?? 0, Te = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", Me = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", We = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      v,
      `border-radius: ${m}px;`,
      T,
      M,
      C,
      N,
      P,
      F,
      q,
      ce,
      ye,
      xe,
      `--ag-card-padding: ${r}px ${o}px ${i}px ${a}px;`,
      `--ag-text-padding: ${we}px ${Y}px;`,
      `--ag-features-padding: ${Se}px ${$e}px;`,
      `--ag-sub-button-padding: ${Ce}px;`,
      `--ag-sub-button-container-padding: ${ke}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${g}px;`,
      `--ag-slider-radius: ${$}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      Te,
      Me,
      We
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const Ae = this.config.text_offset_x !== void 0 ? Number(this.config.text_offset_x) : -28, Pe = this.config.text_offset_y !== void 0 ? Number(this.config.text_offset_y) : 2;
    this._textOffsetStyle = Ae !== 0 || Pe !== 0 ? `transform: translate(${Ae}px, ${Pe}px);` : "";
    const L = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x ?? 8), J = Number(this.config.primary_text_end_offset ?? 250), de = Number(this.config.primary_text_offset_y) || 0, U = L !== 0 || de !== 0 ? `transform: translate(${L}px, ${de}px);` : "", ue = L !== 0 || J !== 0 ? `margin-left: ${L}px; margin-right: ${J}px;` : "";
    this._primaryTextOffsetStyle = `${U} ${ue}`.trim();
    const G = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x ?? 8), Ee = Number(this.config.secondary_text_end_offset ?? 250), z = Number(this.config.secondary_text_offset_y) || 0, re = G !== 0 || z !== 0 ? `transform: translate(${G}px, ${z}px);` : "", Ne = G !== 0 || Ee !== 0 ? `margin-left: ${G}px; margin-right: ${Ee}px;` : "";
    this._secondaryTextOffsetStyle = `${re} ${Ne}`.trim();
    const pe = Number(this.config.features_offset_x) || 0, Le = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = pe !== 0 || Le !== 0 ? `transform: translate(${pe}px, ${Le}px);` : "";
    const De = Number(this.config.slider_start_offset) || 0, He = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      De ? `margin-left: ${De}px !important;` : "",
      He ? `margin-right: ${He}px !important;` : ""
    ].filter(Boolean).join(" ");
    const Z = Number(this.config.color_temp_start_offset) || 0, Q = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      Z ? `margin-left: ${Z}px !important;` : "",
      Q ? `margin-right: ${Q}px !important;` : ""
    ].filter(Boolean).join(" ");
    const I = Number(this.config.color_slider_start_offset) || 0, V = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      I ? `margin-left: ${I}px !important;` : "",
      V ? `margin-right: ${V}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const Ye = `text-transform: ${this.config.text_transform_primary ?? "capitalize"};`, Xe = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, ie = `letter-spacing: ${this.config.letter_spacing ?? -0.5}px;`, oe = `line-height: ${this.config.line_height ?? 1.1};`, Re = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${Re}; ${Ye} ${ie} ${oe}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${Xe} ${ie} ${oe}`;
    const ae = this.config.entity, _e = [];
    for (let E = 1; E <= 4; E++) {
      const W = this.config[`sub_button_${E}_entity`], A = this.config[`sub_button_${E}_icon`], X = this.config[`sub_button_${E}_name`], Be = this.config[`sub_button_${E}_tap_action`], ne = this.config[`sub_button_${E}_hold_action`], gt = this.config[`sub_button_${E}_double_tap_action`], Ke = this.config[`sub_button_${E}_type`], bt = this.config[`sub_button_${E}_color`], vt = this.config[`sub_button_${E}_show_background`], at = this.config[`sub_button_${E}_show_state`];
      if (!!(W || A || X || Ke && Ke !== "button" || at)) {
        const qe = W || ae;
        _e.push(Object.freeze({
          key: `${qe || "sub"}_${E}`,
          entity: qe,
          type: Ke || "button",
          icon: A,
          color: bt,
          bg: vt,
          name: X,
          showState: at === !0,
          tapAction: Be,
          holdAction: ne,
          doubleTapAction: gt
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(_e), this.config.fade_transition_enabled) {
      const E = Number(this.config.fade_stage_1_duration) || 60, W = Number(this.config.fade_stage_2_duration) || 600, A = Number(this.config.fade_stage_3_duration) || 1800, X = K(this.config.fade_stage_1_color) || [255, 152, 0], Be = K(this.config.fade_stage_2_color) || [205, 220, 57], ne = K(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: E,
        d2: W,
        d3: A,
        totalDuration: E + W + A,
        c1Rgb: X,
        c2Rgb: Be,
        c3Rgb: ne,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: ne ? St(ne) : "",
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
    const r = this.config.entity.split(".")[0] === "light", i = e.state === "on", a = this.config.hide_color_temp_when_off !== !1, o = this.config.hide_color_picker_when_off !== !1, n = this.config.hide_color_slider_when_off !== !1, d = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, h = r && this.config.show_color_temp === !0 && (d !== void 0 || e.attributes?.supported_color_modes?.some((l) => ["color_temp"].includes(l))) && (!a || i), u = e.attributes?.supported_color_modes, s = Array.isArray(u) && u.some((l) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(l)), f = this.config.color_picker_type !== "wheel", p = r && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && f) && s && (!n || i), v = r && this.config.show_color_picker === !0 && !f && s && (!o || i), m = h || p || v, b = this._getSubButtons();
    this._cachedHasCollapsible = m || b.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), ut.registerCard(this), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._powerUnsubscribe = ge.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    }), this._updatePowerSaveAttribute(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _updatePowerSaveAttribute() {
    ge.isPowerSaveActive(this.hass) ? this.setAttribute("power-save", "") : this.removeAttribute("power-save");
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const e = this.config?.primary_info, t = this.config?.secondary_info, r = this.config?.entity, i = r ? r.split(".")[0] : "", a = (i === "binary_sensor" || i === "timer") && (e === "state" || t === "state"), o = this.config?.fade_transition_enabled === !0, n = r && this.hass ? this.hass.states[r] : null;
    let d = !1;
    if (o && n) {
      const u = this._calculateMultiStageFade(n);
      d = u.enabled && u.activeFade && u.progressPct < 100;
    }
    const h = d || a || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (h && !this._relativeTimer) {
      let u = d ? 1e3 : 5e3;
      const s = n?.attributes?.last_triggered || n?.last_changed || n?.last_updated;
      if (s && !d && !a) {
        const f = this._parseDate(s);
        if (f) {
          const p = Math.max(0, (Date.now() - f.getTime()) / 1e3 | 0);
          p > 3600 ? u = 6e4 : p > 60 && (u = 15e3);
        }
      }
      ge.isPowerSaveActive(this.hass) && (u = Math.max(u, 1e4)), this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute("offscreen") && this.style.display !== "none") {
          if (d && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, u);
    } else !h && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  _isFadeActive() {
    const e = this.config?.entity;
    if (!e || !this.hass) return !1;
    const t = this.hass.states[e];
    if (!t) return !1;
    const r = this._calculateMultiStageFade(t);
    return r.enabled && r.activeFade && r.progressPct < 100;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), ut.unregisterCard(this), this._powerUnsubscribe && (this._powerUnsubscribe(), this._powerUnsubscribe = null), this._gl && (hr(this._gl), this._gl = null), this._throttleMap.clear(), this._subTapTimerMap.forEach((e) => clearTimeout(e)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
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
    const t = this.config.entity, r = t ? this.hass.states[t] : void 0;
    if (!r) {
      this._toggleDisplay(!1);
      return;
    }
    const i = r.state === "on" || this._isEntityActive(r);
    let a = !1;
    (e === "on" && !i || e === "off" && i) && (a = !0), this._toggleDisplay(a);
  }
  _isEntityActive(e) {
    return e ? Bi.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t = "", r = "") {
    if (!this.config?.fade_transition_enabled || !e)
      return st;
    const i = this._isEntityActive(e), a = this.config.fade_trigger ?? "on_inactive";
    if (!(a === "on_inactive" && !i || a === "on_active" && i || a === "both"))
      return st;
    const n = i ? this._resolveColor(this.config.inactive_color) || r || "#4caf50" : this._resolveColor(this.config.active_color) || t || "#d60000", d = i ? this._resolveColor(this.config.active_color) || t || "#d60000" : this._resolveColor(this.config.inactive_color) || r || "#03b100", h = K(n) || [214, 0, 0], u = K(d) || [3, 177, 0], s = this._fadeStaticConfig, f = s?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), p = s?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), v = s?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), m = s?.totalDuration ?? f + p + v;
    if (m <= 0)
      return st;
    this._lastTrackedState !== null && this._lastTrackedState !== e.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = e.state;
    const b = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : h, l = s?.c1Rgb ?? (K(this.config.fade_stage_1_color) || [255, 152, 0]), _ = this.config.fade_stage_2_pickup !== !1 ? l : h, g = s?.c2Rgb ?? (K(this.config.fade_stage_2_color) || [205, 220, 57]), y = this.config.fade_stage_3_pickup !== !1 ? g : l, $ = s?.c3Rgb ?? (K(this.config.fade_stage_3_color) || u), x = this._parseDate(e.attributes?.last_triggered || e.last_changed || e.last_updated);
    if (!x)
      return st;
    const k = Math.max(0, (Date.now() - x.getTime()) / 1e3);
    if (k >= m)
      return this._currentLiveRgb = $, this._previousLiveRgb = null, s?.restingResult ? s.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: St($),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let T, M = 1, C = 0;
    const N = Math.max(0, Math.round(m - k));
    k < f && f > 0 ? (M = 1, C = k / f, T = wt(b, l, C)) : k < f + p && p > 0 ? (M = 2, C = (k - f) / p, T = wt(_, g, C)) : v > 0 ? (M = 3, C = (k - f - p) / v, T = wt(y, $, C)) : (M = 0, T = $), this._currentLiveRgb = T;
    const P = Math.min(100, Math.round(k / m * 100)), F = St(T);
    let q = "";
    return N >= 60 ? q = `${Math.ceil(N / 60)}m left` : q = `${N}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: F,
      progressPct: P,
      remainingSeconds: N,
      currentStage: M,
      stageLabel: q
    };
  }
  _resolveColor(e) {
    return Gi(e);
  }
  _parseDate(e) {
    return ir.parseDate(e);
  }
  _getInfoContent(e, t) {
    return ir.getInfoContent(e, t, this.config, this.hass);
  }
  _dispatchAction(e, t, r) {
    const i = r || this.config.entity, a = i ? i.split(".")[0] : "", o = Oi.has(a);
    let n = t;
    if (n || (e === "double_tap" ? n = this.config.double_tap_action : e === "hold" ? n = this.config.hold_action || (o ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? o && this.config.tap_action.action === "toggle" ? n = { action: "none" } : n = this.config.tap_action : n = o ? { action: "none" } : { action: "toggle" }), !(!n || n.action === "none")) {
      if (n.action === "more-info") {
        const d = n.entity || i;
        if (d) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: d },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (n.action === "toggle" && i) {
        if (o)
          return;
        const d = a === "lock" ? this._isEntityActive(this.hass?.states[i]) ? "lock" : "unlock" : "toggle", h = ["lock", "cover"].includes(a) ? a : a === "group" ? "homeassistant" : a;
        this.hass?.callService(h, d, { entity_id: i });
        return;
      }
      if (n.action === "navigate" && n.navigation_path) {
        history.pushState(null, "", n.navigation_path), window.dispatchEvent(new CustomEvent("location-changed", {
          detail: { replace: !1 },
          bubbles: !0,
          composed: !0
        }));
        return;
      }
      if (n.action === "url" && n.url_path) {
        window.open(n.url_path, "_blank");
        return;
      }
      if (n.action === "call-service" && n.service) {
        const [d, h] = n.service.split(".", 2);
        this.hass?.callService(d, h, n.data || n.service_data || {}, n.target);
        return;
      }
      o && (!n.action || n.action === "toggle") || ni(this, this.hass, { ...this.config, entity: i }, e);
    }
  }
  _handleTap(e) {
    if (e.stopPropagation(), this._isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - Oe < 800) {
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
    const r = (this.config.collapse_controls_trigger || "hold") === "double_tap";
    if (!(r || this.config.double_tap_action && this.config.double_tap_action.action !== "none")) {
      R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, R("medium", this.config.haptic_feedback !== !1), r && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - Oe < 800 || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), R("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(e) {
    if (e.preventDefault(), e.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - Oe < 800 || this._held) return;
    R("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - Oe < 800 || this._activePointerId !== null && this._activePointerId !== e.pointerId || (this._activePointerId = e.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = e.clientX, this._startY = e.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), R("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(e) {
    if (this._isSubElement(e) || this._activePointerId !== null && this._activePointerId !== e.pointerId) return;
    const t = e.clientX - this._startX, r = e.clientY - this._startY, i = Math.hypot(t, r), a = Math.max(1, Date.now() - this._pointerDownTime), o = i / a;
    (i > 8 || o > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
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
  _handleSubPointerDown(e, t, r) {
    e.stopPropagation(), this._subHeld = !1, this._subMoved = !1, this._subCanceled = !1, this._subPointerDownTime = Date.now(), this._subStartX = e.clientX, this._subStartY = e.clientY, this._subHoldTimer = setTimeout(() => {
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, R("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", r || { action: "more-info" }, t));
    }, 500);
  }
  _handleSubPointerMove(e) {
    e.stopPropagation();
    const t = e.clientX - this._subStartX, r = e.clientY - this._subStartY, i = Math.hypot(t, r), a = Math.max(1, Date.now() - this._subPointerDownTime), o = i / a;
    (i > 8 || o > 0.5) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  _handleSubPointerUp(e) {
    e.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubPointerCancel(e) {
    e.stopPropagation(), this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubTap(e, t, r, i, a) {
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
    const o = i && i.action !== "none", n = t || "sub_default", d = () => {
      R("light", this.config.haptic_feedback !== !1), r && r.action && r.action !== "none" && r.action !== "default" ? this._dispatchAction("tap", r, t) : a ? a() : this._dispatchAction("tap", { action: "toggle" }, t);
    };
    if (!o) {
      d();
      return;
    }
    const h = this._subTapTimerMap.get(n);
    if (h) {
      clearTimeout(h), this._subTapTimerMap.delete(n), R("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", i, t);
      return;
    }
    const u = setTimeout(() => {
      this._subTapTimerMap.delete(n), d();
    }, 250);
    this._subTapTimerMap.set(n, u);
  }
  _handleSubContextMenu(e, t, r) {
    e.preventDefault(), e.stopPropagation(), !this._subHeld && (R("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", r || { action: "more-info" }, t));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(e, t, r) {
    const i = r ?? (ge.isPowerSaveActive(this.hass) ? 60 : 30), a = this._throttleMap.get(e) ?? 0, o = Date.now();
    if (!(o - a < i)) {
      this._throttleMap.set(e, o);
      try {
        t();
      } finally {
        setTimeout(() => {
          this._throttleMap.get(e) === o && this._throttleMap.delete(e);
        }, i + 50);
      }
    }
  }
  _revertSlider(e, t) {
    e.value = String(t.initialVal), e.style.setProperty("--slider-pct", t.initialPct);
    const i = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    i && (i.textContent = t.initialBadge);
  }
  _sliderInput(e, t, r, i, a, o, n) {
    e.stopPropagation();
    const d = e.target, h = this._sliderStateMap.get(d);
    if (h?.isScrolling) {
      this._revertSlider(d, h);
      return;
    }
    const u = Number(d.value), s = isNaN(u) ? 0 : u, f = o ? o(s) : s;
    if (h) {
      if (h.rafPending) return;
      h.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (h && (h.rafPending = !1), h?.isScrolling) {
        this._revertSlider(d, h);
        return;
      }
      d.style.setProperty("--slider-pct", `${f}%`);
      const p = d.closest(".slider-container, .sub-button-slider-container"), v = p?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (v && (v.textContent = n ? n(s, f) : `${f}%`), t === "color_hue" && p) {
        p.style.setProperty("--color-hue-val", `hsl(${s}, 100%, 50%)`);
        const m = p.querySelector(".color-chip-badge span");
        m && (m.style.background = `hsl(${s}, 100%, 50%)`);
      }
    }), R("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(e, t, r, i) {
    e.stopPropagation();
    const a = e.target, o = this._sliderStateMap.get(a);
    if (o?.isScrolling) {
      this._revertSlider(a, o), o.isScrolling = !1;
      return;
    }
    const n = Number(a.value), d = isNaN(n) ? 0 : n;
    if (!(o && d === o.initialVal)) {
      if (t === "light" && r === "turn_on") {
        const h = Math.round(d / 255 * 100);
        if (d <= 3 || h <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (t === "fan" && r === "set_percentage" && d <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(t, r, { entity_id: this.config.entity, ...i(d) });
    }
  }
  _getLightLiveColor(e) {
    return te.getLightLiveColor(e);
  }
  _handleColorInput(e, t, r, i) {
    e.stopPropagation();
    const a = e.target.value;
    if (!a) return;
    const o = K(a);
    if (!o) return;
    const n = r || this.config.entity, d = () => {
      this.hass.callService("light", "turn_on", { entity_id: n, rgb_color: o });
    };
    t ? this._throttledCall(i || "color_picker", d) : d();
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
    const r = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", i = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", a = this._isEntityActive(t), o = e.split(".")[0];
    let n = "var(--primary-color)", d = null;
    o === "climate" ? t.state === "heat" ? n = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? n = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? n = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (n = "var(--state-climate-fan_only-color, #26a69a)") : o === "light" ? (d = this._getLightLiveColor(t), d && (n = d)) : (o === "binary_sensor" || o === "lock" || o === "switch") && (n = "#d60000");
    const h = this.config.color_type === "card";
    let u = this._resolveColor(this.config.active_color);
    (!u || this.config.use_light_color) && (o === "light" && d ? u = d : u = n);
    let s = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    o === "light" ? s = "#000000" : (o === "binary_sensor" || o === "lock" || o === "switch") && (s = "#03b500");
    const f = this._resolveColor(this.config.inactive_color) || s, p = this.config.show_slider !== !1, v = o === "light", m = o === "cover", b = o === "fan", l = o === "humidifier", _ = o === "media_player", g = o === "number" || o === "input_number", y = o === "climate", $ = this.config.hide_slider_when_off !== !1, x = this.config.hide_color_temp_when_off !== !1, k = this.config.hide_color_picker_when_off !== !1, T = this.config.hide_color_slider_when_off !== !1, M = t.attributes?.supported_color_modes;
    let C = t.attributes?.brightness !== void 0, N = !1, P = !1;
    if (Array.isArray(M))
      for (let A = 0; A < M.length; A++) {
        const X = M[A];
        X !== "onoff" && (C = !0), X === "color_temp" && (N = !0), Ii.has(X) && (P = !0);
      }
    const F = v && p && C && (!$ || a), q = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, ce = v && p && this.config.show_color_temp === !0 && (q !== void 0 || N) && (!x || a), ye = this.config.color_picker_type !== "wheel", xe = v && p && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && ye) && P && (!T || a), we = v && p && this.config.show_color_picker === !0 && !ye && P && (!k || a), Y = t.state !== "unavailable" && t.state !== "unknown", Se = m && Y && p && t.attributes?.current_position !== void 0, $e = b && Y && a && p && t.attributes?.percentage !== void 0, Ce = l && Y && a && p && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), ke = _ && Y && a && p && t.attributes?.volume_level !== void 0, Te = g && Y && p, Me = y && Y && a && p && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), We = (this.config.bg_opacity ?? 10) / 100, Ae = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : h && a && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${u};`, Pe = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : h && a ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", L = this._calculateMultiStageFade(t, n, f), J = this.config.fade_target ?? "card", de = this._resolveColor(this.config.bg_color);
    let U;
    L.activeFade && (J === "card" || J === "all" || h) ? U = L.currentColor : h ? o === "light" ? U = a ? d || u : this.config.inactive_color ? f : "#000000" : U = a ? u : f : de ? U = de : o === "light" && !a ? U = "#000000" : U = `rgba(150, 150, 150, ${We})`;
    let ue = this._resolveColor(this.config.active_color) || (o === "light" && d ? d : u) || "var(--primary-color)";
    L.activeFade && (J === "all" || this.config.active_glow === !0) && (ue = L.currentColor);
    let G = "";
    this.config.box_shadow === "soft" && (G = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (G = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (G = a || L.activeFade ? `box-shadow: 0 0 22px ${ue}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const Ee = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", z = t?.attributes?.device_class, re = o === "binary_sensor" && (z === "motion" || z === "occupancy" || z === "presence"), Ne = o === "binary_sensor" && (z === "door" || z === "window" || z === "garage_door" || z === "opening"), pe = re && (a || L.activeFade && L.currentStage === 1) ? "motion-active" : "", Le = Ne && a ? "door-open" : "", De = o === "climate" && t?.attributes?.hvac_action ? `hvac-${t.attributes.hvac_action}` : "", He = o === "cover" ? t?.state === "opening" ? "cover-opening" : t?.state === "closing" ? "cover-closing" : "" : "", Z = `${this._staticCardClasses} ${Ee} ${pe} ${Le} ${De} ${He}`, Q = this._getSubButtons();
    let I = "";
    this.config.text_color_mode === "active_accent" && a ? I += `--primary-text-color: ${u}; ` : this.config.text_color_primary ? I += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : h && a && (I += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? I += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : h && a && (I += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const V = this.config.features_position === "inline", Ye = this.config.text_scrolling_primary || "none", Xe = this.config.text_scrolling_secondary || "none", ie = S`
      ${F ? this._renderLightSlider(t) : w}
      ${Se ? this._renderCoverSlider(t) : w}
      ${$e ? this._renderFanSlider(t) : w}
      ${Ce ? this._renderHumidifierSlider(t) : w}
      ${ke ? this._renderMediaSlider(t) : w}
      ${Te ? this._renderNumberSlider(t) : w}
      ${Me ? this._renderClimateSlider(t) : w}
    `, oe = S`
      ${ce ? this._renderColorTempSlider(t) : w}
      ${xe ? this._renderColorSlider(t) : w}
      ${we ? this._renderColorPicker(t) : w}
    `, Re = F || Se || $e || Ce || ke || Te || Me, ae = ce || xe || we, _e = !V && ae || Q.length > 0, E = this.config.decay_slider_position ?? "bottom", W = Ct.sanitizeCustomStyles(this.config.custom_styles);
    return S`
      ${W ? S`<style>${sr(W)}</style>` : w}
      <ha-card 
        class="${Z}" 
        ?active=${a}
        style="${this._staticCardStyles} background: ${U}; ${G} ${Ae} ${Pe} ${I} --ag-glow-color: ${ue}; --ag-active-color: ${u};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${V ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${E === "top" ? this._renderDecaySlider(L) : w}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${r ? S`
                <div class="text-marquee-container scroll-${Ye}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${r}</span>
                </div>` : w}
              ${i ? S`
                <div class="text-marquee-container scroll-${Xe}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${i}</span>
                </div>` : w}
            </div>
            ${E === "inline" ? S`<div class="inline-sliders">${this._renderDecaySlider(L)}</div>` : w}
            ${V && Re ? S`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${ie}</div>` : w}
            ${V && ae ? S`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${oe}</div>` : w}
          </div>
          
          ${E === "bottom" ? this._renderDecaySlider(L) : w}
          ${!V && Re ? S`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${ie}</div>` : w}

          ${_e ? S`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!V && ae ? S`<div class="features-container" style="${this._featuresOffsetStyle}">${oe}</div>` : w}

              ${Q.length > 0 ? S`
                <div class="sub-buttons-container">
                  ${jr(
      Q,
      (A) => A.key,
      (A) => this._renderSubButton(A.entity || "", A.icon, A.color, A.bg !== !1, A.name, A.tapAction, A.holdAction, A.type, A.doubleTapAction, A.showState)
    )}
                </div>
              ` : w}
            </div>
          ` : w}

        </div>
      </ha-card>
    `;
  }
  _getSliderCallbacks() {
    return {
      onPointerDown: this._onSliderPointerDown,
      onPointerMove: this._onSliderPointerMove,
      onPointerUp: this._onSliderPointerUp,
      onPointerCancel: this._onSliderPointerCancel,
      onSliderInput: (e, t, r, i, a, o, n) => this._sliderInput(e, t, r, i, a, o, n),
      onSliderChange: (e, t, r, i) => this._sliderChange(e, t, r, i),
      onColorInput: (e, t, r, i) => this._handleColorInput(e, t, r, i),
      callService: (e, t, r) => this.hass.callService(e, t, r),
      forwardHaptic: (e) => R(e, this.config.haptic_feedback !== !1)
    };
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(e) {
    if (!this.config.show_decay_slider || !e.enabled || !e.activeFade)
      return w;
    const t = this.config.slider_style === "google", r = this.config.decay_slider_height ?? (t ? 32 : 10), i = this.config.slider_border_radius ?? (t ? 16 : 5), a = Math.max(0, 100 - e.progressPct);
    return S`
      <div class="decay-slider-container" style="--decay-color: ${e.currentColor};">
        <div class="decay-slider-track" style="height: ${r}px; border-radius: ${i}px;">
          <div class="decay-slider-fill" style="width: ${a}%; background: ${e.currentColor}; border-radius: ${i}px;"></div>
          <span class="decay-slider-badge">${e.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(e) {
    return O.renderLightSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderColorTempSlider(e) {
    return O.renderColorTempSlider(this.config, e, this._getSliderCallbacks(), this._colorTempMarginOffsets);
  }
  _renderColorSlider(e) {
    return O.renderColorSlider(this.config, e, this._getSliderCallbacks(), this._colorHueMarginOffsets);
  }
  _renderColorPicker(e) {
    return O.renderColorPicker(this.config, e, this._getSliderCallbacks());
  }
  _renderCoverSlider(e) {
    return O.renderCoverSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderFanSlider(e) {
    return O.renderFanSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderMediaSlider(e) {
    return O.renderMediaSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderNumberSlider(e) {
    return O.renderNumberSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderClimateSlider(e) {
    return O.renderClimateSlider(this.config, e, this.hass, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  _renderHumidifierSlider(e) {
    return O.renderHumidifierSlider(this.config, e, this._getSliderCallbacks(), this._mainSliderMarginOffsets);
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(e, t, r, i, a) {
    return O.renderSubSlider(
      this.config,
      this.hass,
      e,
      t,
      r,
      i,
      a,
      this._throttledCall.bind(this)
    );
  }
  _renderSubColorPicker(e, t, r, i, a, o) {
    return O.renderSubColorPicker(
      this.hass,
      e,
      t,
      r,
      i,
      this._getSliderCallbacks(),
      a,
      o
    );
  }
  _renderSubButton(e, t, r, i = !0, a, o, n, d = "button", h, u = !1) {
    const s = e ? this.hass?.states[e] : this.hass?.states[this.config.entity || ""], f = this._isEntityActive(s), p = r ? `color: ${r};` : "", v = i ? "" : "no-bg", m = r ? this._resolveColor(r) : void 0;
    if (d === "slider" || d === "google_slider") {
      const C = r ? `--primary-color: ${r}; --slider-color: ${r};` : "";
      return this._renderSubSlider(e, s, d, C, v);
    }
    let b;
    u && s && (b = this._getInfoContent("state", s));
    const l = (e || this.config.entity || "").split(".")[0];
    if (d === "color_picker" && (l === "light" || !e && this.config.entity?.startsWith("light.")))
      return this._renderSubColorPicker(e, s, p, v, a, b);
    const _ = pi.resolve(
      d,
      e,
      this.config.entity,
      s,
      t,
      a,
      f,
      this.hass?.config?.unit_system?.temperature,
      o
    ), g = _.icon, y = _.title, $ = _.label, x = _.isActive, k = _.animClass;
    let T;
    _.defaultAction && (T = () => _.defaultAction(this.hass, this.config.entity));
    const M = (C) => {
      this._handleSubTap(C, e, o, h, T);
    };
    return S`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${v}" 
        ?active=${x} 
        style="${p} ${x && m && i ? `background: ${m}; color: #fff;` : ""}"
        title="${y}"
        @click=${M}
        @dblclick=${(C) => C.stopPropagation()}
        @keydown=${(C) => {
      (C.key === "Enter" || C.key === " ") && (C.preventDefault(), C.stopPropagation(), M(C));
    }}
        @pointerdown=${(C) => this._handleSubPointerDown(C, e, n)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(C) => this._handleSubContextMenu(C, e, n)}>
        <ha-icon .icon=${g} class="${k}"></ha-icon>
        ${$ ? S`<span class="sub-button-label">${$}</span>` : w}
        ${b ? S`<span class="sub-button-state">${b}</span>` : w}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return ui;
  }
}
Ve([
  ht({ attribute: !1 })
], le.prototype, "hass", 2);
Ve([
  ht({ type: Boolean })
], le.prototype, "preview", 2);
Ve([
  ft()
], le.prototype, "config", 2);
Ve([
  ft()
], le.prototype, "_collapsed", 2);
Ve([
  _r({ passive: !0 })
], le.prototype, "_handlePointerMove", 1);
Ve([
  _r({ passive: !0 })
], le.prototype, "_handleSubPointerMove", 1);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", le);
customElements.get("antigravity-card") || customElements.define("antigravity-card", le);
export {
  le as AntigravityCard,
  Ri as CARD_VERSION
};
