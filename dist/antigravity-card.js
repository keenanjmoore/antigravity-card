const Xe = globalThis, yt = Xe.ShadowRoot && (Xe.ShadyCSS === void 0 || Xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xt = Symbol(), Ht = /* @__PURE__ */ new WeakMap();
let cr = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== xt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (yt && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Ht.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Ht.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const dr = (c) => new cr(typeof c == "string" ? c : c + "", void 0, xt), ur = (c, ...e) => {
  const t = c.length === 1 ? c[0] : e.reduce((r, i, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + c[o + 1], c[0]);
  return new cr(t, c, xt);
}, Er = (c, e) => {
  if (yt) c.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = Xe.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, c.appendChild(r);
  }
}, Rt = yt ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return dr(t);
})(c) : c;
const { is: Lr, defineProperty: Dr, getOwnPropertyDescriptor: Nr, getOwnPropertyNames: Hr, getOwnPropertySymbols: Rr, getPrototypeOf: Br } = Object, je = globalThis, Bt = je.trustedTypes, zr = Bt ? Bt.emptyScript : "", Ir = je.reactiveElementPolyfillSupport, Ee = (c, e) => c, qe = { toAttribute(c, e) {
  switch (e) {
    case Boolean:
      c = c ? zr : null;
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
} }, St = (c, e) => !Lr(c, e), zt = { attribute: !0, type: String, converter: qe, reflect: !1, useDefault: !1, hasChanged: St };
Symbol.metadata ??= Symbol("metadata"), je.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let pe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = zt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Dr(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: o } = Nr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const s = i?.call(this);
      o?.call(this, a), this.requestUpdate(e, s, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ee("elementProperties"))) return;
    const e = Br(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ee("properties"))) {
      const t = this.properties, r = [...Hr(t), ...Rr(t)];
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
      for (const i of r) t.unshift(Rt(i));
    } else e !== void 0 && t.push(Rt(e));
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
    return Er(e, this.constructor.elementStyles), e;
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
      const o = (r.converter?.toAttribute !== void 0 ? r.converter : qe).toAttribute(t, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : qe;
      this._$Em = i;
      const s = a.fromAttribute(t, o.type);
      this[i] = s ?? this._$Ej?.get(i) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, o) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (o = this[e]), r ??= a.getPropertyOptions(e), !((r.hasChanged ?? St)(o, t) || r.useDefault && r.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: o }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, o] of r) {
        const { wrapped: a } = o, s = this[i];
        a !== !0 || this._$AL.has(i) || s === void 0 || this.C(i, void 0, o, s);
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
pe.elementStyles = [], pe.shadowRootOptions = { mode: "open" }, pe[Ee("elementProperties")] = /* @__PURE__ */ new Map(), pe[Ee("finalized")] = /* @__PURE__ */ new Map(), Ir?.({ ReactiveElement: pe }), (je.reactiveElementVersions ??= []).push("2.1.2");
const wt = globalThis, It = (c) => c, Je = wt.trustedTypes, Ot = Je ? Je.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, _r = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, hr = "?" + j, Or = `<${hr}>`, ne = document, De = () => ne.createComment(""), Ne = (c) => c === null || typeof c != "object" && typeof c != "function", $t = Array.isArray, Fr = (c) => $t(c) || typeof c?.[Symbol.iterator] == "function", pt = `[ 	
\f\r]`, Me = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Ut = />/g, re = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gt = /'/g, Vt = /"/g, pr = /^(?:script|style|textarea|title)$/i, Ur = (c) => (e, ...t) => ({ _$litType$: c, strings: e, values: t }), w = Ur(1), se = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), Wt = /* @__PURE__ */ new WeakMap(), oe = ne.createTreeWalker(ne, 129);
function mr(c, e) {
  if (!$t(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ot !== void 0 ? Ot.createHTML(e) : e;
}
const Gr = (c, e) => {
  const t = c.length - 1, r = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Me;
  for (let s = 0; s < t; s++) {
    const d = c[s];
    let h, u, n = -1, p = 0;
    for (; p < d.length && (a.lastIndex = p, u = a.exec(d), u !== null); ) p = a.lastIndex, a === Me ? u[1] === "!--" ? a = Ft : u[1] !== void 0 ? a = Ut : u[2] !== void 0 ? (pr.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = re) : u[3] !== void 0 && (a = re) : a === re ? u[0] === ">" ? (a = i ?? Me, n = -1) : u[1] === void 0 ? n = -2 : (n = a.lastIndex - u[2].length, h = u[1], a = u[3] === void 0 ? re : u[3] === '"' ? Vt : Gt) : a === Vt || a === Gt ? a = re : a === Ft || a === Ut ? a = Me : (a = re, i = void 0);
    const b = a === re && c[s + 1].startsWith("/>") ? " " : "";
    o += a === Me ? d + Or : n >= 0 ? (r.push(h), d.slice(0, n) + _r + d.slice(n) + j + b) : d + j + (n === -2 ? s : b);
  }
  return [mr(c, o + (c[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class He {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let o = 0, a = 0;
    const s = e.length - 1, d = this.parts, [h, u] = Gr(e, t);
    if (this.el = He.createElement(h, r), oe.currentNode = this.el.content, t === 2 || t === 3) {
      const n = this.el.content.firstChild;
      n.replaceWith(...n.childNodes);
    }
    for (; (i = oe.nextNode()) !== null && d.length < s; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const n of i.getAttributeNames()) if (n.endsWith(_r)) {
          const p = u[a++], b = i.getAttribute(n).split(j), v = /([.?@])?(.*)/.exec(p);
          d.push({ type: 1, index: o, name: v[2], strings: b, ctor: v[1] === "." ? Wr : v[1] === "?" ? Yr : v[1] === "@" ? Kr : et }), i.removeAttribute(n);
        } else n.startsWith(j) && (d.push({ type: 6, index: o }), i.removeAttribute(n));
        if (pr.test(i.tagName)) {
          const n = i.textContent.split(j), p = n.length - 1;
          if (p > 0) {
            i.textContent = Je ? Je.emptyScript : "";
            for (let b = 0; b < p; b++) i.append(n[b], De()), oe.nextNode(), d.push({ type: 2, index: ++o });
            i.append(n[p], De());
          }
        }
      } else if (i.nodeType === 8) if (i.data === hr) d.push({ type: 2, index: o });
      else {
        let n = -1;
        for (; (n = i.data.indexOf(j, n + 1)) !== -1; ) d.push({ type: 7, index: o }), n += j.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const r = ne.createElement("template");
    return r.innerHTML = e, r;
  }
}
function ge(c, e, t = c, r) {
  if (e === se) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const o = Ne(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(c), i._$AT(c, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = ge(c, i._$AS(c, e.values), i, r)), e;
}
class Vr {
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
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? ne).importNode(t, !0);
    oe.currentNode = i;
    let o = oe.nextNode(), a = 0, s = 0, d = r[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let h;
        d.type === 2 ? h = new be(o, o.nextSibling, this, e) : d.type === 1 ? h = new d.ctor(o, d.name, d.strings, this, e) : d.type === 6 && (h = new Xr(o, this, e)), this._$AV.push(h), d = r[++s];
      }
      a !== d?.index && (o = oe.nextNode(), a++);
    }
    return oe.currentNode = ne, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class be {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    e = ge(this, e, t), Ne(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== se && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Fr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== S && Ne(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ne.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = He.createElement(mr(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const o = new Vr(i, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Wt.get(e.strings);
    return t === void 0 && Wt.set(e.strings, t = new He(e)), t;
  }
  k(e) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const o of e) i === t.length ? t.push(r = new be(this.O(De()), this.O(De()), this, this.options)) : r = t[i], r._$AI(o), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = It(e).nextSibling;
      It(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class et {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, o) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = S;
  }
  _$AI(e, t = this, r, i) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = ge(this, e, t, 0), a = !Ne(e) || e !== this._$AH && e !== se, a && (this._$AH = e);
    else {
      const s = e;
      let d, h;
      for (e = o[0], d = 0; d < o.length - 1; d++) h = ge(this, s[r + d], t, d), h === se && (h = this._$AH[d]), a ||= !Ne(h) || h !== this._$AH[d], h === S ? e = S : e !== S && (e += (h ?? "") + o[d + 1]), this._$AH[d] = h;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Wr extends et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
}
class Yr extends et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== S);
  }
}
class Kr extends et {
  constructor(e, t, r, i, o) {
    super(e, t, r, i, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ge(this, e, t, 0) ?? S) === se) return;
    const r = this._$AH, i = e === S && r !== S || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== S && (r === S || i);
    i && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Xr = class {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ge(this, e);
  }
};
const qr = { I: be }, Jr = wt.litHtmlPolyfillSupport;
Jr?.(He, be), (wt.litHtmlVersions ??= []).push("3.3.3");
const Zr = (c, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const o = t?.renderBefore ?? null;
    r._$litPart$ = i = new be(e.insertBefore(De(), o), o, void 0, t ?? {});
  }
  return i._$AI(c), i;
};
const Ct = globalThis;
let fe = class extends pe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Zr(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return se;
  }
};
fe._$litElement$ = !0, fe.finalized = !0, Ct.litElementHydrateSupport?.({ LitElement: fe });
const Qr = Ct.litElementPolyfillSupport;
Qr?.({ LitElement: fe });
(Ct.litElementVersions ??= []).push("4.2.2");
const jr = { attribute: !0, type: String, converter: qe, reflect: !1, hasChanged: St }, ei = (c = jr, e, t) => {
  const { kind: r, metadata: i } = t;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), r === "setter" && ((c = Object.create(c)).wrapped = !0), o.set(t.name, c), r === "accessor") {
    const { name: a } = t;
    return { set(s) {
      const d = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(a, d, c, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, c, s), s;
    } };
  }
  if (r === "setter") {
    const { name: a } = t;
    return function(s) {
      const d = this[a];
      e.call(this, s), this.requestUpdate(a, d, c, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function tt(c) {
  return (e, t) => typeof t == "object" ? ei(c, e, t) : ((r, i, o) => {
    const a = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(c, e, t);
}
function rt(c) {
  return tt({ ...c, state: !0, attribute: !1 });
}
const ti = { CHILD: 2 }, ri = (c) => (...e) => ({ _$litDirective$: c, values: e });
let ii = class {
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
const { I: oi } = qr, Yt = (c) => c, Kt = () => document.createComment(""), Ae = (c, e, t) => {
  const r = c._$AA.parentNode, i = e === void 0 ? c._$AB : e._$AA;
  if (t === void 0) {
    const o = r.insertBefore(Kt(), i), a = r.insertBefore(Kt(), i);
    t = new oi(o, a, c, c.options);
  } else {
    const o = t._$AB.nextSibling, a = t._$AM, s = a !== c;
    if (s) {
      let d;
      t._$AQ?.(c), t._$AM = c, t._$AP !== void 0 && (d = c._$AU) !== a._$AU && t._$AP(d);
    }
    if (o !== i || s) {
      let d = t._$AA;
      for (; d !== o; ) {
        const h = Yt(d).nextSibling;
        Yt(r).insertBefore(d, i), d = h;
      }
    }
  }
  return t;
}, ie = (c, e, t = c) => (c._$AI(e, t), c), ai = {}, ni = (c, e = ai) => c._$AH = e, si = (c) => c._$AH, mt = (c) => {
  c._$AR(), c._$AA.remove();
};
const Xt = (c, e, t) => {
  const r = /* @__PURE__ */ new Map();
  for (let i = e; i <= t; i++) r.set(c[i], i);
  return r;
}, li = ri(class extends ii {
  constructor(c) {
    if (super(c), c.type !== ti.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(c, e, t) {
    let r;
    t === void 0 ? t = e : e !== void 0 && (r = e);
    const i = [], o = [];
    let a = 0;
    for (const s of c) i[a] = r ? r(s, a) : a, o[a] = t(s, a), a++;
    return { values: o, keys: i };
  }
  render(c, e, t) {
    return this.dt(c, e, t).values;
  }
  update(c, [e, t, r]) {
    const i = si(c), { values: o, keys: a } = this.dt(e, t, r);
    if (!Array.isArray(i)) return this.ut = a, o;
    const s = this.ut ??= [], d = [];
    let h, u, n = 0, p = i.length - 1, b = 0, v = o.length - 1;
    for (; n <= p && b <= v; ) if (i[n] === null) n++;
    else if (i[p] === null) p--;
    else if (s[n] === a[b]) d[b] = ie(i[n], o[b]), n++, b++;
    else if (s[p] === a[v]) d[v] = ie(i[p], o[v]), p--, v--;
    else if (s[n] === a[v]) d[v] = ie(i[n], o[v]), Ae(c, d[v + 1], i[n]), n++, v--;
    else if (s[p] === a[b]) d[b] = ie(i[p], o[b]), Ae(c, i[n], i[p]), p--, b++;
    else if (h === void 0 && (h = Xt(a, b, v), u = Xt(s, n, p)), h.has(s[n])) if (h.has(s[p])) {
      const f = u.get(a[b]), m = f !== void 0 ? i[f] : null;
      if (m === null) {
        const l = Ae(c, i[n]);
        ie(l, o[b]), d[b] = l;
      } else d[b] = ie(m, o[b]), Ae(c, i[n], m), i[f] = null;
      b++;
    } else mt(i[p]), p--;
    else mt(i[n]), n++;
    for (; b <= v; ) {
      const f = Ae(c, d[v + 1]);
      ie(f, o[b]), d[b++] = f;
    }
    for (; n <= p; ) {
      const f = i[n++];
      f !== null && mt(f);
    }
    return this.ut = a, ni(c, d), se;
  }
}), bt = {
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
}, qt = {
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
}, Le = class Le {
  /**
   * Sanitize custom styles string to reject tag breakouts and script tags with memoization.
   */
  static sanitizeCustomStyles(e) {
    if (!e || typeof e != "string") return "";
    const t = this._sanitizedStylesCache.get(e);
    return t !== void 0 ? t : /<\/?(script|style|iframe|object|embed)/i.test(e) ? (console.warn("[Antigravity] custom_styles contains invalid HTML tags. Ignored for security."), this._sanitizedStylesCache.set(e, ""), "") : (this._sanitizedStylesCache.size > 50 && this._sanitizedStylesCache.clear(), this._sanitizedStylesCache.set(e, e), e);
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
    const t = this._weakStylesCache.get(e);
    if (t) return t;
    const r = `${e.theme_preset}|${e.card_padding}|${e.card_padding_vertical}|${e.card_padding_horizontal}|${e.card_margin}|${e.border_radius}|${e.slider_style}|${e.slider_height}|${e.slider_border_radius}|${e.content_spacing}|${e.text_spacing}|${e.features_margin}|${e.sub_button_spacing}|${e.sub_button_padding}|${e.text_offset_x}|${e.text_offset_y}|${e.primary_text_start_offset}|${e.primary_text_end_offset}|${e.secondary_text_start_offset}|${e.secondary_text_end_offset}|${e.font_size_primary}|${e.font_size_secondary}|${e.font_weight_primary}|${e.letter_spacing}|${e.line_height}|${e.layout}|${e.card_layout}|${e.full_slider_opacity}|${e.text_color_mode}|${e.hover_effect}`;
    if (this._computedStylesCache.has(r)) {
      const Nt = this._computedStylesCache.get(r);
      return this._weakStylesCache.set(e, Nt), Nt;
    }
    const i = e.card_padding_vertical ?? e.card_padding ?? 0, o = e.card_padding_horizontal ?? e.card_padding ?? 15, a = e.card_padding_top ?? i, s = e.card_padding_bottom ?? i, d = e.card_padding_left ?? o, h = e.card_padding_right ?? o, u = e.card_margin ?? -1, n = e.card_margin_vertical ?? u, p = e.card_margin_horizontal ?? u, b = e.card_margin_top ?? n, v = e.card_margin_bottom ?? n, f = e.card_margin_left ?? p, m = e.card_margin_right ?? p;
    let l = "";
    (b !== void 0 || v !== void 0 || f !== void 0 || m !== void 0) && (l = `margin: ${b ?? 0}px ${m ?? 0}px ${v ?? 0}px ${f ?? 0}px;`);
    const _ = e.border_radius ?? 12, g = e.slider_style === "google", y = e.slider_style === "full", $ = g ? 42 : y ? 40 : 12, x = e.slider_height !== void 0 ? e.slider_height : $, A = g ? 21 : y ? 0 : x / 2, k = e.slider_border_radius !== void 0 ? e.slider_border_radius : A, T = e.card_border_width ?? (e.card_border_color ? 1 : 0), E = e.card_border_style ?? "solid", L = T > 0 ? `border: ${T}px ${E} ${e.card_border_color || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", M = e.card_width ? `width: ${e.card_width};` : "", C = e.card_max_width ? `max-width: ${e.card_max_width};` : "", ee = e.card_height ? `height: ${e.card_height};` : "", K = e.card_min_height !== void 0 ? `min-height: ${e.card_min_height}px;` : "", X = e.fill_container === !0 ? "height: 100%; width: 100%;" : "", q = e.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", te = e.backdrop_blur !== void 0 ? `backdrop-filter: blur(${e.backdrop_blur}px); -webkit-backdrop-filter: blur(${e.backdrop_blur}px);` : "", I = e.card_opacity !== void 0 ? `opacity: ${e.card_opacity / 100};` : "", O = e.transition_duration !== void 0 ? `transition: all ${e.transition_duration}ms ease;` : "", J = e.card_padding_vertical ?? 0, Z = e.card_padding_horizontal ?? 0, ze = 0, Ie = 0, Oe = e.sub_button_padding ?? 6, at = e.sub_button_container_padding ?? 0, nt = e.sub_button_alignment ? `--ag-sub-button-alignment: ${e.sub_button_alignment};` : "--ag-sub-button-alignment: flex-end;", st = e.text_scrolling_speed ? `--ag-scroll-speed: ${e.text_scrolling_speed}s;` : "", N = e.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${e.full_slider_opacity / 100};` : "", ye = e.theme_preset || "default", xe = qt[ye] || qt.default, Fe = xe.generateStyles(e), F = [
      l,
      `border-radius: ${_}px;`,
      L,
      M,
      C,
      ee,
      K,
      X,
      q,
      te,
      I,
      O,
      `--ag-card-padding: ${a}px ${h}px ${s}px ${d}px;`,
      `--ag-text-padding: ${J}px ${Z}px;`,
      `--ag-features-padding: ${ze}px ${Ie}px;`,
      `--ag-sub-button-padding: ${Oe}px;`,
      `--ag-sub-button-container-padding: ${at}px;`,
      `--ag-content-spacing: ${e.content_spacing ?? 6}px;`,
      `--ag-text-spacing: ${e.text_spacing ?? -1}px;`,
      `--ag-features-margin: ${e.features_margin ?? -3}px;`,
      `--ag-slider-spacing: ${e.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${e.sub_button_spacing ?? -4}px;`,
      `--ag-slider-height: ${x}px;`,
      `--ag-slider-radius: ${k}px;`,
      `--ag-text-alignment: ${e.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${e.content_alignment ?? "flex-start"};`,
      nt,
      st,
      N,
      Fe
    ].filter(Boolean).join(" ").trim(), Se = [
      "ha-card",
      xe.cssClass,
      `layout-${e.layout || "default"}`,
      e.card_layout === "large" ? "card-large" : "",
      `hover-${e.hover_effect ?? "glow"}`,
      `slider-style-${e.slider_style ?? "circle"}`,
      e.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" "), le = Number(e.text_offset_x) || -28, lt = Number(e.text_offset_y) || 2, U = `transform: translate(${le}px, ${lt}px);`, ce = Number(e.primary_text_start_offset ?? e.primary_text_offset_x) || 8, Ue = Number(e.primary_text_end_offset) || 250, Ge = Number(e.primary_text_offset_y) || 0, ct = ce !== 0 || Ge !== 0 ? `transform: translate(${ce}px, ${Ge}px);` : "", dt = ce !== 0 || Ue !== 0 ? `margin-left: ${ce}px; margin-right: ${Ue}px;` : "", ut = `${ct} ${dt}`.trim(), de = Number(e.secondary_text_start_offset ?? e.secondary_text_offset_x) || 8, ue = Number(e.secondary_text_end_offset) || 250, G = Number(e.secondary_text_offset_y) || 0, Q = de !== 0 || G !== 0 ? `transform: translate(${de}px, ${G}px);` : "", _t = de !== 0 || ue !== 0 ? `margin-left: ${de}px; margin-right: ${ue}px;` : "", ht = `${Q} ${_t}`.trim(), we = Number(e.features_offset_x) || 0, $e = Number(e.features_offset_y) || 0, Ve = we !== 0 || $e !== 0 ? `transform: translate(${we}px, ${$e}px);` : "", _e = Number(e.slider_start_offset) || 0, We = Number(e.slider_end_offset) || 0, Ce = [
      _e ? `margin-left: ${_e}px !important;` : "",
      We ? `margin-right: ${We}px !important;` : ""
    ].filter(Boolean).join(" "), ke = Number(e.color_temp_start_offset) || 0, P = Number(e.color_temp_end_offset) || 0, Te = [
      ke ? `margin-left: ${ke}px !important;` : "",
      P ? `margin-right: ${P}px !important;` : ""
    ].filter(Boolean).join(" "), At = Number(e.color_slider_start_offset) || 0, Pt = Number(e.color_slider_end_offset) || 0, vr = [
      At ? `margin-left: ${At}px !important;` : "",
      Pt ? `margin-right: ${Pt}px !important;` : ""
    ].filter(Boolean).join(" "), yr = e.text_box_width ? `max-width: ${e.text_box_width}; width: ${e.text_box_width};` : "width: 100%; max-width: 100%;", xr = e.font_family_primary ? `font-family: ${e.font_family_primary};` : "", Sr = `font-size: ${e.font_size_primary ?? 14}px;`, wr = `font-weight: ${e.font_weight_primary ?? "800"};`, $r = `text-transform: ${e.text_transform_primary ?? "capitalize"};`, Et = `letter-spacing: ${e.letter_spacing ?? -0.5}px;`, Lt = `line-height: ${e.line_height ?? 1.1};`, Cr = `${xr} ${Sr} ${wr} ${$r} ${Et} ${Lt}`.trim(), kr = e.font_family_secondary ? `font-family: ${e.font_family_secondary};` : "", Tr = `font-size: ${e.font_size_secondary ?? 15}px;`, Mr = e.font_weight_secondary ? `font-weight: ${e.font_weight_secondary};` : "", Ar = `text-transform: ${e.text_transform_secondary ?? "capitalize"};`, Pr = `${kr} ${Tr} ${Mr} ${Ar} ${Et} ${Lt}`.trim(), Dt = {
      staticCardStyles: F,
      staticCardClasses: Se,
      textOffsetStyle: U,
      primaryTextOffsetStyle: ut,
      secondaryTextOffsetStyle: ht,
      featuresOffsetStyle: Ve,
      mainSliderMarginOffsets: Ce,
      colorTempMarginOffsets: Te,
      colorHueMarginOffsets: vr,
      textBoxWidth: yr,
      primaryTextStyle: Cr,
      secondaryTextStyle: Pr
    };
    return this._computedStylesCache.set(r, Dt), Dt;
  }
};
Le._weakStylesCache = /* @__PURE__ */ new WeakMap(), Le._computedStylesCache = /* @__PURE__ */ new Map(), Le._sanitizedStylesCache = /* @__PURE__ */ new Map();
let Ze = Le;
class ci {
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
const Qe = new ci();
class di {
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
const ae = new di(), ui = {
  preserveDrawingBuffer: !1,
  powerPreference: "low-power",
  alpha: !0,
  antialias: !1,
  depth: !1,
  stencil: !1
};
function _i(c, e = ui) {
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
function fr(c) {
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
async function gr() {
  const c = performance.now();
  let e = 0, t = 0;
  const r = (v, f) => {
    t++, v ? e++ : console.error(`❌ Assertion failed: ${f}`);
  }, i = Qe.getMemorySnapshot();
  r(i.activeCardsCount >= 0, "Memory tracker active card count is non-negative");
  let o = !1;
  if (typeof document < "u") {
    const v = document.createElement("canvas"), f = _i(v);
    f && (o = !0, r(f.getParameter(f.MAX_VERTEX_ATTRIBS) > 0, "WebGL attributes available"), fr(f));
  }
  const a = 1e3;
  let s = 0;
  for (let v = 0; v < a; v++) {
    const f = performance.now();
    s += performance.now() - f;
  }
  const d = Number((s / a).toFixed(4));
  r(d < 0.1, "Benchmark iteration takes under 0.1ms");
  const h = ae.isPowerSaveActive(), u = ae.getTargetFrameIntervalMs();
  r(u === 16 || u === 33, "Frame target is either 16ms or 33ms");
  const n = performance.now() - c, p = e === t, b = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: typeof navigator < "u" ? navigator.userAgent : "Node/Test",
    renderBenchmarkMs: d,
    memoryUsageMB: i.usedJSHeapSizeMB || 0,
    powerSaveModeActive: h,
    webglSupported: o,
    assertionsPassed: e,
    totalAssertions: t,
    passed: p
  };
  return console.info(
    `%c 🧪 ANTIGRAVITY CI RUNNER %c Passed ${e}/${t} | Benchmark: ${d}ms/op | Duration: ${n.toFixed(2)}ms `,
    "color: white; background: #2e7d32; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
    "color: #2e7d32; background: #e8f5e9; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
  ), b;
}
typeof window < "u" && window.__RUN_CI__ && gr();
const hi = ur`
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
    --ag-transition-speed: 0.05s;
  }
  :host([power-save]) .pulse,
  :host([power-save]) .anim-spin,
  :host([power-save]) .anim-bounce,
  :host([power-save]) .scroll-content {
    animation: none !important;
  }
  :host([power-save]) .theme-glassmorphism,
  :host([power-save]) .theme-aurora,
  :host([power-save]) .theme-cyberpunk {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: var(--card-background-color, rgba(30, 30, 30, 0.95)) !important;
  }
  :host([power-save]) ha-card {
    box-shadow: none !important;
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
    contain: paint layout;
    will-change: transform;
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
class Jt {
  /**
   * Resolves display properties and default service execution for a sub-button action type.
   */
  static resolve(e, t, r, i, o, a, s, d, h) {
    if (h && h.action && h.action !== "none" && h.action !== "default")
      return {
        icon: o || i?.attributes?.icon || "mdi:checkbox-blank-circle",
        title: a || (i?.attributes?.friendly_name ?? ""),
        label: a,
        isActive: s ?? !1,
        animClass: "",
        defaultAction: void 0
      };
    const u = t || r || "";
    let n = o, p = "", b = s ?? !1, v = "", f = a, m;
    switch (e) {
      case "play_pause": {
        const l = i?.state === "playing";
        b = l, n || (n = l ? "mdi:pause" : "mdi:play"), p = l ? "Pause" : "Play", m = (_) => {
          _?.callService("media_player", "media_play_pause", { entity_id: u });
        };
        break;
      }
      case "next": {
        n || (n = "mdi:skip-next"), p = "Next Track", m = (l) => {
          l?.callService("media_player", "media_next_track", { entity_id: u });
        };
        break;
      }
      case "previous": {
        n || (n = "mdi:skip-previous"), p = "Previous Track", m = (l) => {
          l?.callService("media_player", "media_previous_track", { entity_id: u });
        };
        break;
      }
      case "vol_up": {
        n || (n = "mdi:volume-plus"), p = "Volume +5%", f || (f = "+5%"), m = (l) => {
          l?.callService("media_player", "volume_up", { entity_id: u });
        };
        break;
      }
      case "vol_down": {
        n || (n = "mdi:volume-minus"), p = "Volume -5%", f || (f = "-5%"), m = (l) => {
          l?.callService("media_player", "volume_down", { entity_id: u });
        };
        break;
      }
      case "mute": {
        const l = i?.attributes?.is_volume_muted === !0;
        b = l, n || (n = l ? "mdi:volume-off" : "mdi:volume-high"), p = l ? "Unmute" : "Mute", m = (_) => {
          _?.callService("media_player", "volume_mute", { entity_id: u, is_volume_muted: !l });
        };
        break;
      }
      case "source": {
        const l = i?.attributes?.source || "", _ = i?.attributes?.source_list || [], g = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
        n || (n = "mdi:import"), p = `Source: ${l} -> ${g}`, f || (f = l || "Source"), m = (y) => {
          g && y?.callService("media_player", "select_source", { entity_id: u, source: g });
        };
        break;
      }
      case "sound_mode": {
        const l = i?.attributes?.sound_mode || "", _ = i?.attributes?.sound_mode_list || [], g = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
        n || (n = "mdi:surround-sound"), p = `Sound: ${l} -> ${g}`, f || (f = l || "Sound"), m = (y) => {
          g && y?.callService("media_player", "select_sound_mode", { entity_id: u, sound_mode: g });
        };
        break;
      }
      case "shuffle": {
        const l = i?.attributes?.shuffle === !0;
        b = l, n || (n = l ? "mdi:shuffle" : "mdi:shuffle-disabled"), p = l ? "Shuffle: On" : "Shuffle: Off", m = (_) => {
          _?.callService("media_player", "shuffle_set", { entity_id: u, shuffle: !l });
        };
        break;
      }
      case "repeat": {
        const l = i?.attributes?.repeat || "off", _ = ["off", "all", "one"], g = _[(_.indexOf(l) + 1) % _.length] || "off";
        b = l !== "off", n || (n = l === "one" ? "mdi:repeat-once" : l === "all" ? "mdi:repeat" : "mdi:repeat-off"), p = `Repeat: ${l} -> ${g}`, f || (f = l), m = (y) => {
          y?.callService("media_player", "repeat_set", { entity_id: u, repeat: g });
        };
        break;
      }
      case "chime": {
        n || (n = "mdi:bell-ring-outline"), p = "Play Chime", m = (l) => {
          l?.callService("chime_tts", "say", { entity_id: u, message: "ding-dong" }).catch(() => {
            l?.callService("media_player", "media_play", { entity_id: u });
          });
        };
        break;
      }
      case "tts_announce": {
        n || (n = "mdi:bullhorn-variant-outline"), p = "Voice Announcement", m = (l) => {
          l?.callService("tts", "speak", { media_player_entity_id: u, message: "Attention: Test announcement" }).catch(() => {
            l?.callService("tts", "google_translate_say", { entity_id: u, message: "Attention: Test announcement" });
          });
        };
        break;
      }
      case "media_zone": {
        n || (n = "mdi:speaker-multiple"), p = "Group Speakers / Zone", m = (l) => {
          l?.callService("media_player", "join", { entity_id: u });
        };
        break;
      }
      case "media_preset": {
        n || (n = "mdi:radio-tower"), p = "Play Radio Stream / Preset", m = (l) => {
          l?.callService("media_player", "play_media", {
            entity_id: u,
            media_content_id: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
            media_content_type: "music"
          });
        };
        break;
      }
      case "door_hold": {
        n || (n = "mdi:door-open"), p = "Hold Gate / Door Open", m = (l) => {
          l?.callService("cover", "open_cover", { entity_id: u });
        };
        break;
      }
      case "aux_heat": {
        const l = i?.attributes?.aux_heat === "on" || i?.attributes?.aux_heat === !0;
        b = l, n || (n = l ? "mdi:radiator" : "mdi:radiator-disabled"), p = l ? "Disable Aux Heat" : "Enable Aux Heat", m = (_) => {
          _?.callService("climate", "set_aux_heat", { entity_id: u, aux_heat: !l });
        };
        break;
      }
      case "cover_preset": {
        n || (n = "mdi:window-shutter"), p = "Go to Shading Position (50%)", m = (l) => {
          l?.callService("cover", "set_cover_position", { entity_id: u, position: 50 });
        };
        break;
      }
      case "temp_up": {
        const _ = d === "°F" || d === "F" ? 1 : 0.5, g = Number(i?.attributes?.temperature ?? i?.attributes?.target_temp_high ?? 20), y = Number(i?.attributes?.max_temp ?? 35), $ = Math.min(y, g + _);
        n || (n = "mdi:thermometer-chevron-up"), p = `Temperature +${_}°`, f || (f = `+${_}°`), m = (x) => {
          x?.callService("climate", "set_temperature", { entity_id: u, temperature: $ });
        };
        break;
      }
      case "temp_down": {
        const _ = d === "°F" || d === "F" ? 1 : 0.5, g = Number(i?.attributes?.temperature ?? i?.attributes?.target_temp_low ?? 20), y = Number(i?.attributes?.min_temp ?? 10), $ = Math.max(y, g - _);
        n || (n = "mdi:thermometer-chevron-down"), p = `Temperature -${_}°`, f || (f = `-${_}°`), m = (x) => {
          x?.callService("climate", "set_temperature", { entity_id: u, temperature: $ });
        };
        break;
      }
      case "fan_oscillate": {
        const l = i?.attributes?.oscillating === !0;
        b = l, n || (n = l ? "mdi:arrow-oscillating" : "mdi:fan-off"), p = l ? "Stop Oscillation" : "Start Oscillation", m = (_) => {
          _?.callService("fan", "oscillate", { entity_id: u, oscillating: !l });
        };
        break;
      }
      case "fan_direction": {
        const l = i?.attributes?.direction || "forward", _ = l === "forward" ? "reverse" : "forward";
        b = l === "reverse", n || (n = l === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"), p = `Direction: ${l} -> ${_}`, f || (f = l), m = (g) => {
          g?.callService("fan", "set_direction", { entity_id: u, direction: _ });
        };
        break;
      }
      case "humidifier_mode": {
        const l = i?.attributes?.mode || i?.state || "auto", _ = i?.attributes?.available_modes || ["auto", "eco", "boost", "sleep"], g = _[(_.indexOf(l) + 1) % _.length] || "auto";
        n || (n = "mdi:water-sync"), p = `Humidifier Mode: ${l} -> ${g}`, f || (f = l), m = (y) => {
          y?.callService("humidifier", "set_mode", { entity_id: u, mode: g });
        };
        break;
      }
      case "siren_toggle": {
        const l = i?.state === "on";
        b = l, n || (n = l ? "mdi:bullhorn" : "mdi:bullhorn-outline"), p = l ? "Turn Off Siren" : "Trigger Siren", m = (_) => {
          _?.callService("siren", "toggle", { entity_id: u });
        };
        break;
      }
      case "open_close": {
        const l = i?.state === "open" || i?.state === "on" || i?.attributes?.current_position !== void 0 && i.attributes.current_position > 0;
        b = l;
        const _ = i?.attributes?.device_class;
        n || (_ === "garage" || _ === "garage_door" ? n = l ? "mdi:garage-open" : "mdi:garage" : _ === "blind" || _ === "shade" ? n = l ? "mdi:blinds-open" : "mdi:blinds" : _ === "curtain" ? n = l ? "mdi:curtains-open" : "mdi:curtains" : _ === "damper" ? n = l ? "mdi:circle-slice-8" : "mdi:circle-outline" : n = l ? "mdi:window-shutter-open" : "mdi:window-shutter"), p = l ? "Close" : "Open", m = (g) => {
          g?.callService("cover", "toggle", { entity_id: u });
        };
        break;
      }
      case "stop": {
        n || (n = "mdi:stop"), p = "Stop", m = (l) => {
          l?.callService("cover", "stop_cover", { entity_id: u });
        };
        break;
      }
      case "open_tilt": {
        n || (n = "mdi:arrow-top-right-bottom-left"), p = "Open Tilt", m = (l) => {
          l?.callService("cover", "open_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "close_tilt": {
        n || (n = "mdi:arrow-bottom-left-top-right"), p = "Close Tilt", m = (l) => {
          l?.callService("cover", "close_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "stop_tilt": {
        n || (n = "mdi:stop"), p = "Stop Tilt", m = (l) => {
          l?.callService("cover", "stop_cover_tilt", { entity_id: u });
        };
        break;
      }
      case "lock_unlock": {
        const l = i?.state === "locked", _ = i?.state === "jammed";
        b = !l, _ && (v = "lock-jammed"), n || (n = _ ? "mdi:lock-alert" : l ? "mdi:lock" : "mdi:lock-open-variant"), p = _ ? "Jammed (Alert!)" : l ? "Unlock" : "Lock", m = (g) => {
          g?.callService("lock", l ? "unlock" : "lock", { entity_id: u });
        };
        break;
      }
      case "fan_speed": {
        const l = i?.attributes?.percentage ?? 0;
        n || (n = "mdi:fan"), s && (v = "anim-spin"), p = `Speed: ${l}%`, f || (f = l > 0 ? `${l}%` : "Off"), m = (_) => {
          let g = 33;
          l >= 90 ? g = 0 : l >= 60 ? g = 100 : l >= 30 && (g = 66), _?.callService("fan", "set_percentage", { entity_id: u, percentage: g });
        };
        break;
      }
      case "fan_mode": {
        const l = i?.attributes?.fan_mode || "auto", _ = i?.attributes?.fan_modes || ["auto", "low", "medium", "high"], g = _[(_.indexOf(l) + 1) % _.length] || "auto";
        n || (n = "mdi:fan"), p = `Fan Mode: ${l} -> ${g}`, f || (f = l), m = (y) => {
          y?.callService("climate", "set_fan_mode", { entity_id: u, fan_mode: g });
        };
        break;
      }
      case "swing_mode": {
        const l = i?.attributes?.swing_mode || "off", _ = i?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], g = _[(_.indexOf(l) + 1) % _.length] || "off";
        n || (n = "mdi:arrow-split-horizontal"), p = `Swing: ${l} -> ${g}`, f || (f = l), m = (y) => {
          y?.callService("climate", "set_swing_mode", { entity_id: u, swing_mode: g });
        };
        break;
      }
      case "climate_preset": {
        const l = i?.attributes?.preset_mode || "none", _ = i?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], g = _[(_.indexOf(l) + 1) % _.length] || "none";
        n || (l === "eco" ? n = "mdi:leaf" : l === "boost" ? n = "mdi:rocket-launch" : l === "away" ? n = "mdi:home-export-outline" : l === "sleep" ? n = "mdi:bed" : n = "mdi:thermostat"), p = `Preset: ${l} -> ${g}`, f || (f = l), m = (y) => {
          y?.callService("climate", "set_preset_mode", { entity_id: u, preset_mode: g });
        };
        break;
      }
      case "clean": {
        const l = i?.state === "cleaning";
        b = l, n || (n = l ? "mdi:pause" : "mdi:robot-vacuum"), p = l ? "Pause Vacuum" : "Start Vacuum", m = (_) => {
          _?.callService("vacuum", l ? "pause" : "start", { entity_id: u });
        };
        break;
      }
      case "dock": {
        n || (n = "mdi:home-import-outline"), p = "Return to Dock", m = (l) => {
          l?.callService("vacuum", "return_to_base", { entity_id: u });
        };
        break;
      }
      case "locate": {
        n || (n = "mdi:map-marker-question-outline"), p = "Locate", m = (l) => {
          l?.callService("vacuum", "locate", { entity_id: u });
        };
        break;
      }
      case "clean_zone":
      case "spot_clean": {
        n || (n = e === "clean_zone" ? "mdi:map-marker-radius-outline" : "mdi:target-variant"), p = e === "clean_zone" ? "Zone / Room Clean" : "Spot Clean Mode", m = (l) => {
          l?.callService("vacuum", "clean_spot", { entity_id: u });
        };
        break;
      }
      case "alarm_keypad": {
        n || (n = "mdi:dialpad"), p = "Open PIN Keypad";
        break;
      }
      case "valve_close": {
        const l = i?.state === "closed" || i?.state === "off";
        b = !l, n || (n = l ? "mdi:valve-closed" : "mdi:valve-open"), p = l ? "Valve is Closed" : "Emergency Close Valve", m = (_) => {
          u.split(".")[0] === "valve" ? _?.callService("valve", "close_valve", { entity_id: u }) : _?.callService("switch", "turn_off", { entity_id: u });
        };
        break;
      }
      case "pool_speed": {
        const l = i?.attributes?.percentage ?? 50, _ = l > 50 ? 30 : 100;
        n || (n = "mdi:pool"), p = `Pool Speed: ${l}% -> ${_}%`, f || (f = `${l}%`), m = (g) => {
          g?.callService("fan", "set_percentage", { entity_id: u, percentage: _ });
        };
        break;
      }
      case "vacuum_fan_speed": {
        const l = i?.attributes?.fan_speed || "standard", _ = i?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], g = _[(_.indexOf(l) + 1) % _.length] || "standard";
        n || (n = "mdi:fan"), p = `Suction: ${l} -> ${g}`, f || (f = l), m = (y) => {
          y?.callService("vacuum", "set_fan_speed", { entity_id: u, fan_speed: g });
        };
        break;
      }
      case "counter_inc": {
        n || (n = "mdi:plus-box"), p = "Increment Counter (+1)", f || (f = "+1"), m = (l) => {
          l?.callService("counter", "increment", { entity_id: u });
        };
        break;
      }
      case "counter_dec": {
        n || (n = "mdi:minus-box"), p = "Decrement Counter (-1)", f || (f = "-1"), m = (l) => {
          l?.callService("counter", "decrement", { entity_id: u });
        };
        break;
      }
      case "hvac_mode": {
        const l = i?.state || "off", _ = i?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], g = _[(_.indexOf(l) + 1) % _.length] || "auto";
        b = l !== "off", n || (l === "heat" ? n = "mdi:fire" : l === "cool" ? n = "mdi:snowflake" : l === "dry" ? n = "mdi:water-percent" : l === "fan_only" ? n = "mdi:fan" : l === "auto" ? n = "mdi:thermostat-auto" : n = "mdi:power"), p = `Mode: ${l} -> Next: ${g}`, f || (f = l), m = (y) => {
          y?.callService("climate", "set_hvac_mode", { entity_id: u, hvac_mode: g });
        };
        break;
      }
      case "light_effect":
      case "effect_next": {
        const l = i?.attributes?.effect_list || [], _ = i?.attributes?.effect || "None", g = l.length > 0 ? l[(l.indexOf(_) + 1) % l.length] || l[0] : "None";
        n || (n = e === "light_effect" ? "mdi:creation" : "mdi:arrow-right-bold-circle-outline"), b = _ !== "None" && _ !== "off" && (s ?? !1), p = e === "light_effect" ? `Effect: ${_} -> Next: ${g}` : `Next Effect: ${g}`, f || (f = _ !== "None" ? _ : "Effect"), m = (y) => {
          l.length > 0 && y?.callService("light", "turn_on", { entity_id: u, effect: g });
        };
        break;
      }
      case "effect_prev": {
        const l = i?.attributes?.effect_list || [], _ = i?.attributes?.effect || "None", g = l.indexOf(_), y = g <= 0 ? l.length - 1 : g - 1, $ = l.length > 0 ? l[y] : "None";
        n || (n = "mdi:arrow-left-bold-circle-outline"), p = `Previous Effect: ${$}`, f || (f = $), m = (x) => {
          l.length > 0 && x?.callService("light", "turn_on", { entity_id: u, effect: $ });
        };
        break;
      }
      case "white_mode": {
        n || (n = "mdi:white-balance-sunny"), p = "Set Neutral White (4000K)", m = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp: 250 });
        };
        break;
      }
      case "brightness": {
        const l = i?.attributes?.brightness, _ = l !== void 0 ? Math.round(l / 255 * 100) : 0;
        n || (n = "mdi:brightness-6"), p = `Brightness: ${_}%`, f || (f = `${_}%`), m = (g) => {
          let y = 25;
          _ >= 85 ? y = 0 : _ >= 60 ? y = 100 : _ >= 35 ? y = 75 : _ >= 10 && (y = 50), y === 0 ? g?.callService("light", "turn_off", { entity_id: u }) : g?.callService("light", "turn_on", { entity_id: u, brightness_pct: y });
        };
        break;
      }
      case "garage_toggle": {
        const l = i?.state === "open" || i?.state === "opening";
        b = l, n || (n = l ? "mdi:garage-open" : "mdi:garage"), p = l ? "Close Garage" : "Open Garage", m = (_) => {
          _?.callService("cover", "toggle", { entity_id: u });
        };
        break;
      }
      case "dim_up": {
        const l = u.split(".")[0];
        if (l === "number" || l === "input_number") {
          const _ = Number(i?.state) || 0, g = Number(i?.attributes?.step) || 1, y = Number(i?.attributes?.max) || 100, $ = Math.min(y, _ + g);
          n || (n = "mdi:plus-circle-outline"), p = `Value +${g}`, f || (f = `+${g}`), m = (x) => {
            x?.callService(l, "set_value", { entity_id: u, value: $ });
          };
        } else {
          const _ = i?.attributes?.brightness ?? 0, g = Math.min(255, _ + 26);
          n || (n = "mdi:brightness-5"), p = "Brightness +10%", f || (f = "+10%"), m = (y) => {
            y?.callService("light", "turn_on", { entity_id: u, brightness: g });
          };
        }
        break;
      }
      case "dim_down": {
        const l = u.split(".")[0];
        if (l === "number" || l === "input_number") {
          const _ = Number(i?.state) || 0, g = Number(i?.attributes?.step) || 1, y = Number(i?.attributes?.min) || 0, $ = Math.max(y, _ - g);
          n || (n = "mdi:minus-circle-outline"), p = `Value -${g}`, f || (f = `-${g}`), m = (x) => {
            x?.callService(l, "set_value", { entity_id: u, value: $ });
          };
        } else {
          const _ = i?.attributes?.brightness ?? 0, g = Math.max(1, _ - 26);
          n || (n = "mdi:brightness-4"), p = "Brightness -10%", f || (f = "-10%"), m = (y) => {
            y?.callService("light", "turn_on", { entity_id: u, brightness: g });
          };
        }
        break;
      }
      case "humidity_up": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), _ = Math.min(100, l + 5);
        n || (n = "mdi:water-plus"), p = `Humidity +5% (${_}%)`, f || (f = "+5%"), m = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: _ });
        };
        break;
      }
      case "humidity_down": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), _ = Math.max(0, l - 5);
        n || (n = "mdi:water-minus"), p = `Humidity -5% (${_}%)`, f || (f = "-5%"), m = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: _ });
        };
        break;
      }
      case "humidity_step_up": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), _ = Math.min(100, l + 1);
        n || (n = "mdi:water-plus"), p = `Humidity +1% (${_}%)`, f || (f = "+1%"), m = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: _ });
        };
        break;
      }
      case "humidity_step_down": {
        const l = Number(i?.attributes?.humidity ?? i?.attributes?.target_humidity ?? 50), _ = Math.max(0, l - 1);
        n || (n = "mdi:water-minus"), p = `Humidity -1% (${_}%)`, f || (f = "-1%"), m = (g) => {
          g?.callService("humidifier", "set_humidity", { entity_id: u, humidity: _ });
        };
        break;
      }
      case "input_select": {
        const l = i?.state || "", _ = i?.attributes?.options || [], g = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
        n || (n = "mdi:form-dropdown"), p = `Option: ${l} -> Next: ${g}`, f || (f = l), m = (y) => {
          const $ = u.split(".")[0] === "select" ? "select" : "input_select";
          y?.callService($, "select_next", { entity_id: u });
        };
        break;
      }
      case "temp_warm": {
        n || (n = "mdi:weather-sunny"), p = "Warm White (2700K)", f || (f = "2700K"), m = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: 2700 });
        };
        break;
      }
      case "temp_cool": {
        n || (n = "mdi:weather-sunset-up"), p = "Cool Daylight (6000K)", f || (f = "6000K"), m = (l) => {
          l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: 6e3 });
        };
        break;
      }
      case "color_temp": {
        n || (n = "mdi:palette-swatch-outline"), p = "Color Temperature", f || (f = "Temp"), m = (l) => {
          const _ = i?.attributes?.color_temp_kelvin || 3e3;
          let g = 2700;
          _ < 3300 ? g = 4e3 : _ < 5e3 ? g = 6e3 : g = 2700, l?.callService("light", "turn_on", { entity_id: u, color_temp_kelvin: g });
        };
        break;
      }
      case "button":
      default: {
        n || (n = i?.attributes?.icon || "mdi:checkbox-blank-circle"), p = a || (i?.attributes?.friendly_name ?? "");
        break;
      }
    }
    return {
      icon: n,
      title: p,
      label: f,
      isActive: b,
      animClass: v,
      defaultAction: m
    };
  }
  /**
   * Render sub button template with complete styles, icons, labels, and gesture events.
   */
  static renderSubButton(e, t, r, i, o, a = !0, s, d, h, u = "button", n, p = !1, b = !1, v, f, m) {
    const l = r ? t?.states[r] : t?.states[e.entity || ""], _ = this.resolve(
      u,
      r,
      e.entity,
      l,
      i,
      s,
      b,
      t?.config?.unit_system?.temperature,
      d
    ), g = _.icon, y = _.title, $ = _.label, x = _.isActive, A = _.animClass;
    let k;
    _.defaultAction && (k = () => _.defaultAction(t, e.entity));
    const T = (C) => {
      m?.onTap(C, r, d, n, k);
    }, E = o ? `color: ${o};` : "", L = a ? "" : "no-bg", M = x && v && a ? `background: ${v}; color: #fff;` : "";
    return w`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${L}" 
        ?active=${x} 
        style="${E} ${M}"
        title="${y}"
        @click=${T}
        @dblclick=${(C) => C.stopPropagation()}
        @keydown=${(C) => {
      (C.key === "Enter" || C.key === " ") && (C.preventDefault(), C.stopPropagation(), T(C));
    }}
        @pointerdown=${(C) => m?.onPointerDown(C, r, h)}
        @pointermove=${(C) => m?.onPointerMove(C)}
        @pointerup=${(C) => m?.onPointerUp(C)}
        @pointercancel=${(C) => m?.onPointerCancel(C)}
        @contextmenu=${(C) => m?.onContextMenu(C, r, h)}>
        <ha-icon .icon=${g} class="${A}"></ha-icon>
        ${$ ? w`<span class="sub-button-label">${$}</span>` : S}
        ${f ? w`<span class="sub-button-state">${f}</span>` : S}
      </div>
    `;
  }
  /**
   * Precompute and freeze the configured sub-buttons array from card config.
   */
  static extractSubButtons(e) {
    if (!e) return [];
    const t = e.entity, r = [];
    for (let i = 1; i <= 4; i++) {
      const o = e[`sub_button_${i}_entity`], a = e[`sub_button_${i}_icon`], s = e[`sub_button_${i}_name`], d = e[`sub_button_${i}_tap_action`], h = e[`sub_button_${i}_hold_action`], u = e[`sub_button_${i}_double_tap_action`], n = e[`sub_button_${i}_type`], p = e[`sub_button_${i}_color`], b = e[`sub_button_${i}_show_background`], v = e[`sub_button_${i}_show_state`];
      if (!!(o || a || s || n && n !== "button" || v)) {
        const m = o || t;
        r.push(Object.freeze({
          key: `${m || "sub"}_${i}`,
          entity: m,
          type: n || "button",
          icon: a,
          color: p,
          bg: b,
          name: s,
          showState: v === !0,
          tapAction: d,
          holdAction: h,
          doubleTapAction: u
        }));
      }
    }
    return Object.freeze(r);
  }
}
const V = /* @__PURE__ */ new Map(), Zt = 200, pi = Array.from({ length: 60 }, (c, e) => `${e}s`), mi = Array.from({ length: 60 }, (c, e) => `${e} seconds ago`), fi = Array.from({ length: 60 }, (c, e) => `${e}m`), gi = Array.from({ length: 60 }, (c, e) => e === 1 ? "1 minute ago" : `${e} minutes ago`), bi = Array.from({ length: 24 }, (c, e) => `${e}h`), vi = Array.from({ length: 24 }, (c, e) => `${e}h ago`);
class Qt {
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
      const t = V.get(e);
      if (t) return t;
      const r = Date.parse(e);
      if (!isNaN(r)) {
        const d = new Date(r);
        if (V.size >= Zt) {
          const h = V.keys().next().value;
          h !== void 0 && V.delete(h);
        }
        return V.set(e, d), d;
      }
      let i = e.trim();
      i.includes(" ") && !i.includes("T") && (i = i.replace(" ", "T")), i.includes("T") && !i.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(i) && !/[+-]\d{4}$/.test(i) && (i += "Z");
      const o = Number(i);
      let a;
      !isNaN(o) && i !== "" && !i.includes("T") ? a = new Date(o > 1e11 ? o : o * 1e3) : a = new Date(i);
      const s = isNaN(a.getTime()) ? null : a;
      if (s) {
        if (V.size >= Zt) {
          const d = V.keys().next().value;
          d !== void 0 && V.delete(d);
        }
        V.set(e, s);
      }
      return s;
    }
    return null;
  }
  /**
   * Format a past timestamp to relative time string (compact or human-friendly) with LUT caching.
   */
  static formatTimeAgo(e, t = !1, r) {
    const i = this.parseDate(e);
    if (!i) return "";
    const o = Math.max(0, ((r ?? Date.now()) - i.getTime()) / 1e3 | 0);
    if (o < 5) return t ? "< 5s" : "just now";
    if (o < 60) return t ? pi[o] || `${o}s` : mi[o] || `${o} seconds ago`;
    const a = o / 60 | 0;
    if (a < 60) return t ? fi[a] || `${a}m` : gi[a] || `${a} minutes ago`;
    const s = a / 60 | 0;
    if (s < 24) return t ? bi[s] || `${s}h` : vi[s] || `${s}h ago`;
    const d = s / 24 | 0;
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
        const a = (t.entity_id || "").split(".")[0];
        if (a === "timer") {
          if (t.state === "paused")
            return `${t.attributes?.remaining || "Paused"} (Paused)`;
          if (t.state === "active" && t.attributes?.finishes_at) {
            const s = Date.parse(t.attributes.finishes_at);
            if (!isNaN(s)) {
              const d = Math.max(0, Math.round((s - Date.now()) / 1e3)), h = Math.floor(d / 60), u = d % 60, n = Math.floor(h / 60), p = (h % 60).toString().padStart(2, "0"), b = u.toString().padStart(2, "0");
              return n > 0 ? `${n}:${p}:${b}` : `${p}:${b}`;
            }
          }
        }
        if (a === "binary_sensor") {
          const s = t.attributes?.device_class;
          return s === "tamper" && t.state === "on" ? "⚠️ Tamper Detected" : s === "problem" && t.state === "on" ? "⚠️ Problem Detected" : s === "smoke" && t.state === "on" ? "🔥 Smoke Detected!" : s === "gas" && t.state === "on" ? "⚠️ Gas Detected!" : s === "moisture" && t.state === "on" ? "💧 Moisture Detected!" : this.formatForDuration(t.last_changed);
        }
        if (a === "vacuum") {
          const s = t.state;
          let d = s;
          s === "cleaning" ? d = "🧹 Cleaning" : s === "docked" ? d = "🏠 Docked" : s === "returning" ? d = "🔄 Returning" : s === "paused" ? d = "⏸️ Paused" : s === "error" && (d = "⚠️ Error");
          const h = t.attributes?.battery_level;
          return h !== void 0 ? `${d} • 🔋${h}%` : d;
        }
        if (a === "weather") {
          const s = t.attributes?.temperature, d = i?.config?.unit_system?.temperature || "°F", h = (t.state || "").replace(/-/g, " ");
          return s !== void 0 ? `${s}${d} • ${h}` : h;
        }
        if (a === "climate") {
          const s = t.state || "", d = t.attributes?.current_temperature, h = t.attributes?.temperature ?? t.attributes?.target_temp_high, u = t.attributes?.unit_of_measurement || i?.config?.unit_system?.temperature || "°", n = t.attributes?.preset_mode, p = t.attributes?.hvac_action, v = [d !== void 0 && h !== void 0 ? `${d}${u} → ${h}${u}` : h !== void 0 ? `${h}${u}` : "", p, n].filter(Boolean).join(" • ");
          return v ? `${s} (${v})` : s;
        }
        if (a === "fan") {
          const s = t.attributes?.percentage, d = t.attributes?.oscillating ? "∿ Oscillating" : "", h = t.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [s !== void 0 ? `${s}%` : t.state, d, h].filter(Boolean).join(" • ");
        }
        if (a === "alarm_control_panel") {
          const s = t.state;
          if (s === "armed_home") return "🛡️ Armed Home";
          if (s === "armed_away") return "🛡️ Armed Away";
          if (s === "disarmed") return "Disarmed";
          if (s === "triggered") return "⚠️ TRIGGERED";
          if (s === "pending") return "⏳ Arming Pending...";
          if (s === "arming") return "⏳ Arming...";
        }
        if (a === "lock") {
          if (t.state === "locked") return "Locked";
          if (t.state === "unlocked") return "Unlocked";
          if (t.state === "jammed") return "Jammed (Alert!)";
          if (t.state === "locking") return "Locking...";
          if (t.state === "unlocking") return "Unlocking...";
        }
        if (a === "button" || a === "input_button")
          return "Press to run";
        if (a === "light" && t.state === "on") {
          const s = t.attributes?.brightness, d = s !== void 0 ? Math.round(s / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${d}% • ${t.attributes.color_temp_kelvin}K`;
        }
        if (t.attributes?.device_class === "timestamp" || t.attributes?.device_class === "date" || typeof t.state == "string" && (t.state.includes("T") || t.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(t.state))) {
          const s = this.formatRelativeTime(t.state);
          if (s) return s;
        }
        if (t.attributes?.display_precision !== void 0 && !isNaN(Number(t.state))) {
          const s = Number(t.attributes.display_precision), d = Number(t.state).toFixed(s), h = t.attributes?.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "";
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
        const a = t.attributes?.last_triggered || t.last_changed;
        return this.formatForDuration(a);
      }
      case "last-updated":
      case "last-updated-relative":
        return this.formatForDuration(t.last_updated);
      case "last-triggered": {
        const a = t.attributes?.last_triggered || t.last_changed;
        return this.formatForDuration(a);
      }
      case "brightness": {
        const a = t.attributes?.brightness;
        return a !== void 0 ? `${Math.round(a / 255 * 100)}%` : "";
      }
      case "temperature": {
        const a = t.attributes?.temperature ?? t.attributes?.current_temperature, s = t.attributes?.unit_of_measurement || i?.config?.unit_system?.temperature || "°C";
        return a !== void 0 ? `${a} ${s}` : "";
      }
      case "humidity": {
        const a = t.attributes?.humidity ?? t.attributes?.current_humidity, s = t.attributes?.unit_of_measurement || "%";
        return a !== void 0 ? `${a}${s.startsWith("%") ? s : ` ${s}`}` : "";
      }
      case "battery": {
        const a = t.attributes?.battery_level ?? t.attributes?.battery ?? (t.attributes?.device_class === "battery" ? t.state : void 0);
        if (a !== void 0) {
          const s = Number(a);
          if (!isNaN(s)) {
            let d = "#4caf50";
            return s <= 20 ? d = "#f44336" : s <= 50 && (d = "#ff9800"), w`<span style="color: ${d}; font-weight: bold;">${s}%</span>`;
          }
          return `${a}%`;
        }
        return "";
      }
      case "none":
      default:
        return "";
    }
  }
}
const yi = 60, xi = 600, Si = 1800, jt = 250, er = 400, ft = 8, wi = 30, $i = 60, Ci = 256, ki = "#ff9800", Ti = "#cddc39", Mi = "#4caf50", kt = Object.freeze(
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
), Ai = Object.freeze(
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
), Pi = Object.freeze(
  /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww", "color_temp"])
), Ei = Object.freeze(
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
    "blue-grey"
  ])
), Li = /^\d+\s*,\s*\d+\s*,\s*\d+$/, Di = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,[\d.]+$/;
var tr, rr;
(function(c) {
  c.language = "language", c.system = "system", c.comma_decimal = "comma_decimal", c.decimal_comma = "decimal_comma", c.space_comma = "space_comma", c.none = "none";
})(tr || (tr = {})), function(c) {
  c.language = "language", c.system = "system", c.am_pm = "12", c.twenty_four = "24";
}(rr || (rr = {}));
function Ni(c) {
  return c.substr(0, c.indexOf("."));
}
var Hi = ["closed", "locked", "off"], Re = function(c, e, t, r) {
  r = r || {}, t = t ?? {};
  var i = new Event(e, { bubbles: r.bubbles === void 0 || r.bubbles, cancelable: !!r.cancelable, composed: r.composed === void 0 || r.composed });
  return i.detail = t, c.dispatchEvent(i), i;
}, Pe = function(c) {
  Re(window, "haptic", c);
}, Ri = function(c, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), Re(window, "location-changed", { replace: t });
}, Bi = function(c, e, t) {
  t === void 0 && (t = !0);
  var r, i = Ni(e), o = i === "group" ? "homeassistant" : i;
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
  return c.callService(o, r, { entity_id: e });
}, zi = function(c, e) {
  var t = Hi.includes(c.states[e].state);
  return Bi(c, e, t);
}, Ii = function(c, e, t, r) {
  if (r || (r = { action: "more-info" }), !r.confirmation || r.confirmation.exemptions && r.confirmation.exemptions.some(function(o) {
    return o.user === e.user.id;
  }) || (Pe("warning"), confirm(r.confirmation.text || "Are you sure you want to " + r.action + "?"))) switch (r.action) {
    case "more-info":
      (t.entity || t.camera_image) && Re(c, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      r.navigation_path && Ri(0, r.navigation_path);
      break;
    case "url":
      r.url_path && window.open(r.url_path);
      break;
    case "toggle":
      t.entity && (zi(e, t.entity), Pe("success"));
      break;
    case "call-service":
      if (!r.service) return void Pe("failure");
      var i = r.service.split(".", 2);
      e.callService(i[0], i[1], r.service_data, r.target), Pe("success");
      break;
    case "fire-dom-event":
      Re(c, "ll-custom", r);
  }
}, Oi = function(c, e, t, r) {
  var i;
  r === "double_tap" && t.double_tap_action ? i = t.double_tap_action : r === "hold" && t.hold_action ? i = t.hold_action : r === "tap" && t.tap_action && (i = t.tap_action), Ii(c, e, t, i);
};
const Fi = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i, Ui = /^\[\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\]$/, he = /* @__PURE__ */ new Map(), ir = 250;
function Gi(c) {
  if (!c) return "";
  const e = he.get(c);
  if (e !== void 0) return e;
  const t = c.trim();
  if (!t)
    return he.set(c, ""), "";
  let r = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? r = t : Li.test(t) ? r = `rgb(${t})` : Di.test(t) ? r = `rgba(${t})` : t.toLowerCase() === "state" ? r = "var(--state-icon-color, var(--primary-color))" : Ei.has(t.toLowerCase()) && (r = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), he.size >= ir) {
    const i = Math.floor(ir / 4), o = he.keys();
    for (let a = 0; a < i; a++) {
      const s = o.next().value;
      s !== void 0 && he.delete(s);
    }
  }
  return he.set(c, r), r;
}
class Vi {
  constructor() {
    this._cache = /* @__PURE__ */ new Map(), this._cacheAccessTimes = /* @__PURE__ */ new Map(), this._kelvinCache = /* @__PURE__ */ new Map();
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
      const o = t.substring(1), a = o.length;
      if (a === 3 || a === 4) {
        const s = parseInt(o[0] + o[0], 16), d = parseInt(o[1] + o[1], 16), h = parseInt(o[2] + o[2], 16);
        !isNaN(s) && !isNaN(d) && !isNaN(h) && (r = [s, d, h]);
      } else if (a >= 6) {
        const s = parseInt(o.substring(0, 2), 16), d = parseInt(o.substring(2, 4), 16), h = parseInt(o.substring(4, 6), 16);
        !isNaN(s) && !isNaN(d) && !isNaN(h) && (r = [s, d, h]);
      }
    } else if (t.startsWith("rgb")) {
      const o = t.match(Fi);
      if (o) {
        const a = parseInt(o[1], 10), s = parseInt(o[2], 10), d = parseInt(o[3], 10);
        !isNaN(a) && !isNaN(s) && !isNaN(d) && (r = [
          Math.max(0, Math.min(255, a)),
          Math.max(0, Math.min(255, s)),
          Math.max(0, Math.min(255, d))
        ]);
      }
    } else if (t.charCodeAt(0) === 91 && t.charCodeAt(t.length - 1) === 93) {
      const o = t.match(Ui);
      o && (r = [
        Math.max(0, Math.min(255, parseInt(o[1], 10))),
        Math.max(0, Math.min(255, parseInt(o[2], 10))),
        Math.max(0, Math.min(255, parseInt(o[3], 10)))
      ]);
    }
    if (this._cache.size >= Ci) {
      let o = null, a = 1 / 0;
      for (const [s, d] of this._cacheAccessTimes)
        d < a && (a = d, o = s);
      o !== null && (this._cache.delete(o), this._cacheAccessTimes.delete(o));
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
    const i = Math.max(e, t, r), o = Math.min(e, t, r), a = i - o;
    let s = 0;
    return a === 0 ? 0 : (i === e ? s = (t - r) / a + (t < r ? 6 : 0) : i === t ? s = (r - e) / a + 2 : i === r && (s = (e - t) / a + 4), Math.round(s / 6 * 360) % 360);
  }
  /**
   * Convert HSV values (h: 0-360, s: 0-1, v: 0-1) to an RGB tuple.
   */
  hsvToRgb(e, t, r) {
    e = isNaN(e) ? 0 : Math.max(0, Math.min(360, e)), t = isNaN(t) ? 0 : Math.max(0, Math.min(1, t)), r = isNaN(r) ? 0 : Math.max(0, Math.min(1, r));
    const i = r * t, o = i * (1 - Math.abs(e / 60 % 2 - 1)), a = r - i;
    let s = 0, d = 0, h = 0;
    return e >= 0 && e < 60 ? (s = i, d = o) : e >= 60 && e < 120 ? (s = o, d = i) : e >= 120 && e < 180 ? (d = i, h = o) : e >= 180 && e < 240 ? (d = o, h = i) : e >= 240 && e < 300 ? (s = o, h = i) : e >= 300 && e <= 360 && (s = i, h = o), [
      Math.round((s + a) * 255),
      Math.round((d + a) * 255),
      Math.round((h + a) * 255)
    ];
  }
  /**
   * Convert Kelvin temperature to an approximation RGB tuple with fast integer LUT caching.
   */
  kelvinToRgb(e) {
    if (isNaN(e)) return [255, 255, 255];
    const t = Math.round(e / 10) * 10, r = this._kelvinCache.get(t);
    if (r) return r;
    const i = Math.max(1e3, Math.min(4e4, t)) / 100;
    let o = 0, a = 0, s = 0;
    i <= 66 ? o = 255 : o = Math.min(255, Math.max(0, 329.698727446 * Math.pow(i - 60, -0.1332047592))), i <= 66 ? a = Math.min(255, Math.max(0, 99.4708025861 * Math.log(i) - 161.1195681661)) : a = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(i - 60, -0.0755148492))), i >= 66 ? s = 255 : i <= 19 ? s = 0 : s = Math.min(255, Math.max(0, 138.5177312231 * Math.log(i - 10) - 305.0447927307));
    const d = [Math.round(o), Math.round(a), Math.round(s)];
    return this._kelvinCache.size < 500 && this._kelvinCache.set(t, d), d;
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
    const r = 1, i = Math.floor(e * 6), o = e * 6 - i, a = r * (1 - t), s = r * (1 - o * t), d = r * (1 - (1 - o) * t);
    let h = 0, u = 0, n = 0;
    switch (i % 6) {
      case 0:
        h = r, u = d, n = a;
        break;
      case 1:
        h = s, u = r, n = a;
        break;
      case 2:
        h = a, u = r, n = d;
        break;
      case 3:
        h = a, u = s, n = r;
        break;
      case 4:
        h = d, u = a, n = r;
        break;
      case 5:
        h = r, u = a, n = s;
        break;
    }
    return [Math.round(h * 255), Math.round(u * 255), Math.round(n * 255)];
  }
}
const R = new Vi(), me = R.parseColorToRgb.bind(R), Ye = R.rgbToHex.bind(R), Wi = R.rgbToHue.bind(R);
R.hsvToRgb.bind(R);
const vt = R.hsToRgb.bind(R), W = R.kelvinToRgb.bind(R), gt = R.lerpRgb.bind(R), or = [
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
], Yi = [
  { k: 2200, label: "2200K", rgb: W(2200) },
  { k: 2700, label: "2700K", rgb: W(2700) },
  { k: 3e3, label: "3000K", rgb: W(3e3) },
  { k: 4e3, label: "4000K", rgb: W(4e3) },
  { k: 5e3, label: "5000K", rgb: W(5e3) },
  { k: 6500, label: "6500K", rgb: W(6500) }
];
let ar = 0;
function H(c = "light", e = !0) {
  if (!e) return;
  const t = Date.now();
  if (!(t - ar < 40)) {
    ar = t;
    try {
      Pe(c);
    } catch {
    }
  }
}
const Ki = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Mt = class Mt {
  /**
   * Determine whether an entity is currently in an active state.
   */
  static isEntityActive(e) {
    return e ? kt.has(e.state) : !1;
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
    let o = i.replace(/\b(Motion Sensor|Motion Detector|Motion|Opening|Contact Sensor|Contact|Door Sensor|Door Lock|Lock|Smart Plug Dimmer|Smart Plug|Dimmer|Light Switch|Switch)\b/gi, "").replace(/\s+/g, " ").trim();
    return o || (o = i), this._nameCache.set(i, o), o;
  }
  /**
   * Resolve live light color from state attributes (prioritizing RGB / HS over color temp).
   */
  static getLightLiveColor(e) {
    if (!e || !e.attributes || e.state !== void 0 && e.state !== "on") return null;
    const t = e.attributes;
    if (t.color_mode === "color_temp") {
      const i = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [o, a, s] = W(i);
      return `rgb(${o}, ${a}, ${s})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [i, o, a] = vt(t.hs_color[0], t.hs_color[1]);
      return `rgb(${i}, ${o}, ${a})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const i = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [o, a, s] = W(i);
      return `rgb(${o}, ${a}, ${s})`;
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
      return Ye(t.rgb_color);
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2)
      return Ye(vt(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const o = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return Ye(W(o));
    }
    const r = this.getLightLiveColor(e);
    if (!r) return "#ffffff";
    const i = me(r);
    return i ? Ye(i) : "#ffffff";
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
      return Wi(t, r, i);
    }
    return 0;
  }
  /**
   * Detect supported color and brightness modes for light entities.
   */
  static detectLightFeatures(e) {
    const t = e?.attributes?.supported_color_modes;
    let r = e?.attributes?.brightness !== void 0, i = !1, o = !1;
    if (Array.isArray(t))
      for (let a = 0; a < t.length; a++) {
        const s = t[a];
        s !== "onoff" && (r = !0), s === "color_temp" && (i = !0), Ki.has(s) && (o = !0);
      }
    return { supportsBrightness: r, supportsColorTemp: i, supportsColor: o };
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
Mt._nameCache = /* @__PURE__ */ new Map();
let Y = Mt;
class z {
  /**
   * Render a generic slider container with support for Google, Full, and Compact themes.
   */
  static renderGenericSlider(e, t, r, i, o, a, s, d, h, u, n, p, b, v, f = "", m = "", l, _ = "") {
    const g = e.slider_style === "google", y = g && e.show_slider_percent !== !1 || e.show_slider_percent === !0, $ = v ? v(s, d) : `${d}%`, x = l !== void 0 ? l : $, A = e.slider_stepped_movement === !1 ? "any" : a, k = t !== "color_temp" && t !== "color_hue", T = e.slider_style === "full", E = k && T ? "main-slider-full" : "";
    let L = _;
    if (k && T) {
      const M = Number(e.slider_start_offset) || 0, C = Number(e.slider_end_offset) || 0;
      L = `left: ${M}px !important; right: ${C}px !important; width: calc(100% - ${M + C}px) !important;`;
    }
    return w`
      <div class="slider-container ${f} ${E} ${g ? "slider-google-wrap" : ""}" style="${L} ${m}">
        <input type="range" min=${i} max=${o} step=${A} .value=${s}
               aria-label="${r}"
               style="--slider-pct: ${d}%;"
               @pointerdown=${p.onPointerDown}
               @pointermove=${p.onPointerMove}
               @pointerup=${p.onPointerUp}
               @pointercancel=${p.onPointerCancel}
               @input=${(M) => p.onSliderInput(M, t, h, u, n, b, v)}
               @change=${(M) => p.onSliderChange(M, h, u, n)} />
        ${y && x ? w`<span class="slider-percent-badge">${x}</span>` : S}
      </div>
    `;
  }
  /**
   * Render decay / cooldown progress bar slider.
   */
  static renderDecaySlider(e, t = "") {
    return !e.enabled || !e.activeFade ? w`` : w`
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
    const o = Y.isEntityActive(t), a = t.attributes.brightness ?? 0, s = Math.max(0, Math.min(100, Math.round(a / 255 * 100))), d = Y.getLightLiveColor(t), h = (e.use_light_color !== !1 || !e.slider_color) && d ? `--slider-color: ${d};` : "";
    return this.renderGenericSlider(
      e,
      "brightness",
      "Brightness",
      0,
      255,
      1,
      a,
      s,
      "light",
      "turn_on",
      (u) => ({ brightness: u }),
      r,
      (u) => Math.round(u / 255 * 100),
      (u, n) => !o || n <= 0 ? "" : `${n}%`,
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
    const o = e.color_temp_type || "gradient", a = t.attributes.color_temp_kelvin !== void 0 || t.attributes.min_color_temp_kelvin !== void 0 || t.attributes.max_color_temp_kelvin !== void 0, s = a ? t.attributes.min_color_temp_kelvin || 2e3 : t.attributes.min_mireds || 153, d = a ? t.attributes.max_color_temp_kelvin || 6500 : t.attributes.max_mireds || 500, h = a ? t.attributes.color_temp_kelvin || 3e3 : t.attributes.color_temp || 300, u = d - s, n = u > 0 ? Math.max(0, Math.min(100, Math.round((h - s) / u * 100))) : 0, p = a ? "color_temp_kelvin" : "color_temp", b = o === "google" || o === "gradient" && e.slider_style === "google", v = b ? 42 : o === "thin" ? 6 : 12, f = b ? 21 : o === "thin" ? 3 : 6, m = e.color_temp_height !== void 0 ? e.color_temp_height : e.slider_height ?? v, l = e.color_temp_border_radius !== void 0 ? e.color_temp_border_radius : e.slider_border_radius ?? f, _ = a ? `${h} K` : `${h} mireds`;
    if (o === "presets") {
      const g = Number(e.color_temp_start_offset) || 0, y = Number(e.color_temp_end_offset) || 0, $ = [
        g ? `margin-left: ${g}px;` : "",
        y ? `margin-right: ${y}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${$}">
          ${Yi.map((x) => {
        const [A, k, T] = x.rgb, E = Math.abs(h - x.k) < 200, L = () => {
          r.forwardHaptic && r.forwardHaptic("light"), r.callService("light", "turn_on", { entity_id: e.entity, [p]: x.k });
        };
        return w`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${x.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${m}px; border-radius: ${l}px; border: ${E ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${A}, ${k}, ${T}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${E ? "0 0 8px rgba(" + A + "," + k + "," + T + ", 0.8)" : "none"};"
                @keydown=${(M) => {
          (M.key === "Enter" || M.key === " ") && (M.preventDefault(), M.stopPropagation(), L());
        }}
                @click=${(M) => {
          M.stopPropagation(), L();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${A}, ${k}, ${T}); display: inline-block;"></span>
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
      s,
      d,
      1,
      h,
      n,
      "light",
      "turn_on",
      (g) => ({ [p]: g }),
      r,
      (g) => u > 0 ? Math.round((g - s) / u * 100) : 0,
      (g) => a ? `${g} K` : `${g} mireds`,
      `color-temp ${a ? "kelvin" : "mireds"} ${b ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${m}px; --ag-slider-radius: ${l}px;`,
      _,
      i
    );
  }
  /**
   * Render color hue slider, preset palette swatches, or wheel picker.
   */
  static renderColorSlider(e, t, r, i = "") {
    const o = e.color_picker_type || "slider";
    if (o === "wheel")
      return this.renderColorPicker(e, t, r);
    if (o === "swatches") {
      const b = Y.getLiveHex(t).toLowerCase(), v = e.color_slider_height !== void 0 ? e.color_slider_height : 32, f = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : 8, m = Number(e.color_slider_start_offset) || 0, l = Number(e.color_slider_end_offset) || 0, _ = [
        m ? `margin-left: ${m}px;` : "",
        l ? `margin-right: ${l}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${_}">
          ${or.map((g) => {
        const y = b === g.hex.toLowerCase(), $ = () => {
          r.forwardHaptic && r.forwardHaptic("light"), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: g.rgb });
        };
        return w`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${g.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${g.label}"
                style="flex: 1; min-width: 28px; height: ${v}px; border-radius: ${f}px; background: ${g.hex}; border: ${y ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${y ? "0 0 10px " + g.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
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
    const a = e.slider_style === "google", s = e.color_slider_height !== void 0 ? e.color_slider_height : e.slider_height ?? (a ? 42 : 36), d = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : e.slider_border_radius ?? (a ? 21 : 8), h = Y.getLiveHue(t), u = `hsl(${h}, 100%, 50%)`, n = Math.round(h / 360 * 100);
    let p;
    return e.color_swatch_presets !== !1 && (p = w`
        <div class="color-swatch-chips">
          ${or.slice(0, 8).map((b) => w`
            <span 
              class="color-swatch-chip" 
              role="button" 
              tabindex="0" 
              aria-label="Set ${b.label} Color" 
              style="background: ${b.hex};" 
              @click=${(v) => {
      v.stopPropagation(), r.forwardHaptic && r.forwardHaptic("light"), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: b.rgb });
    }} 
              @keydown=${(v) => {
      (v.key === "Enter" || v.key === " ") && (v.preventDefault(), v.stopPropagation(), r.forwardHaptic && r.forwardHaptic("light"), r.callService("light", "turn_on", { entity_id: e.entity, rgb_color: b.rgb }));
    }}>
            </span>
          `)}
        </div>
      `), this.renderGenericSlider(
      e,
      "color_hue",
      "Light Color Hue",
      0,
      360,
      1,
      h,
      n,
      "light",
      "turn_on",
      (b) => {
        const [v, f, m] = vt(b, 100);
        return { rgb_color: [v, f, m] };
      },
      r,
      (b) => Math.round(b / 360 * 100),
      (b) => `${b}°`,
      `color-hue ${a ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${s}px; --ag-slider-radius: ${d}px; --color-hue-val: ${u};`,
      p,
      i
    );
  }
  /**
   * Render HTML color picker.
   */
  static renderColorPicker(e, t, r) {
    const i = Y.getLiveHex(t), o = e.color_slider_height !== void 0 ? e.color_slider_height : e.slider_height ?? 36, a = e.color_slider_border_radius !== void 0 ? e.color_slider_border_radius : e.slider_border_radius ?? 8;
    return w`
      <div class="color-picker" title="Adjust Light Color" style="height: ${o}px; border-radius: ${a}px;">
        <input type="color" 
               .value=${i} 
               @input=${(s) => r.onColorInput(s, !0)}
               @change=${(s) => r.onColorInput(s, !1)} />
        <span class="color-label">Color (${i})</span>
      </div>
    `;
  }
  /**
   * Render cover position slider.
   */
  static renderCoverSlider(e, t, r, i = "") {
    const o = t.attributes.current_position ?? (t.state === "open" || t.state === "opening" ? 100 : 0);
    return this.renderGenericSlider(
      e,
      "cover",
      "Cover Position",
      0,
      100,
      1,
      o,
      o,
      "cover",
      "set_cover_position",
      (a) => ({ position: a }),
      r,
      (a) => a,
      (a, s) => `${s}%`,
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
    const o = t.attributes.percentage ?? 0, a = t.attributes.percentage_step ?? 1;
    return this.renderGenericSlider(
      e,
      "fan",
      "Fan Speed",
      0,
      100,
      a,
      o,
      o,
      "fan",
      "set_percentage",
      (s) => {
        const d = a > 1 ? Math.round(s / a) * a : s;
        return { percentage: Math.min(100, Math.max(0, d)) };
      },
      r,
      (s) => s,
      (s, d) => `${d}%`,
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
    const o = t.attributes.is_volume_muted === !0, a = o ? 0 : Math.round((t.attributes.volume_level ?? 0) * 100), s = o ? "Muted (0%)" : void 0;
    return this.renderGenericSlider(
      e,
      "media",
      "Volume",
      0,
      100,
      1,
      a,
      a,
      "media_player",
      "volume_set",
      (d) => ({ volume_level: d / 100 }),
      r,
      (d) => d,
      (d, h) => o ? "Muted" : `${h}%`,
      "media",
      "",
      s,
      i
    );
  }
  /**
   * Render number domain slider.
   */
  static renderNumberSlider(e, t, r, i = "") {
    const o = Number(t.attributes.min ?? 0);
    let a = Number(t.attributes.max ?? 100);
    o >= a && (a = o + 100);
    const s = Number(t.attributes.step ?? 1), d = Number(t.state), h = isNaN(d) ? o : d, u = a - o, n = u > 0 ? Math.max(0, Math.min(100, Math.round((h - o) / u * 100))) : 0, p = (e.entity || "number").split(".")[0], b = t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "", v = s.toString(), f = v.includes(".") ? v.split(".")[1].length : 0;
    return this.renderGenericSlider(
      e,
      "number",
      "Value",
      o,
      a,
      s,
      h,
      n,
      p,
      "set_value",
      (m) => ({ value: f > 0 ? Number(m.toFixed(f)) : Math.round(m) }),
      r,
      (m) => u > 0 ? Math.round((m - o) / u * 100) : 0,
      (m) => `${f > 0 ? Number(m).toFixed(f) : Math.round(Number(m))}${b}`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render climate temperature slider.
   */
  static renderClimateSlider(e, t, r, i, o = "") {
    const a = r?.config?.unit_system?.temperature === "°F" || r?.config?.unit_system?.temperature === "F", s = a ? "°F" : "°C", d = a ? 60 : 16, h = a ? 85 : 30, u = t.attributes.min_temp ?? d, n = t.attributes.max_temp ?? h, p = t.attributes.target_temp_step ?? t.attributes.target_temperature_step ?? (a ? 1 : 0.5), b = t.attributes.target_temp_low !== void 0 && t.attributes.target_temp_high !== void 0, v = t.attributes.temperature ?? t.attributes.target_temp_low ?? t.attributes.target_temp_high ?? u, f = n - u, m = f > 0 ? Math.max(0, Math.min(100, Math.round((v - u) / f * 100))) : 0;
    return this.renderGenericSlider(
      e,
      "climate",
      "Temperature",
      u,
      n,
      p,
      v,
      m,
      "climate",
      "set_temperature",
      (l) => b ? { target_temp_low: l, target_temp_high: Math.min(n, l + (a ? 4 : 2)) } : { temperature: l },
      i,
      (l) => f > 0 ? Math.round((l - u) / f * 100) : 0,
      (l) => `${l}${s}`,
      "climate-temp",
      "",
      `${v}${s}`,
      o
    );
  }
  /**
   * Render humidifier slider.
   */
  static renderHumidifierSlider(e, t, r, i = "") {
    const o = t.attributes?.min_humidity ?? 0, a = t.attributes?.max_humidity ?? 100, s = t.attributes?.humidity ?? t.attributes?.target_humidity ?? o, d = a - o, h = d > 0 ? Math.max(0, Math.min(100, Math.round((s - o) / d * 100))) : 0;
    return this.renderGenericSlider(
      e,
      "humidifier",
      "Humidity",
      o,
      a,
      1,
      s,
      h,
      "humidifier",
      "set_humidity",
      (u) => ({ humidity: u }),
      r,
      (u) => d > 0 ? Math.round((u - o) / d * 100) : 0,
      (u, n) => `${n}%`,
      "",
      "",
      void 0,
      i
    );
  }
  /**
   * Render compact sub-slider inside sub-button row.
   */
  static renderSubSlider(e, t, r, i, o, a, s, d) {
    const h = i || t.states[e.entity || ""], u = r || e.entity || "", n = h?.attributes?.volume_level !== void 0 || h?.entity_id?.startsWith("media_player."), p = h?.attributes?.percentage !== void 0 || h?.entity_id?.startsWith("fan."), b = h?.attributes?.current_position !== void 0 || h?.entity_id?.startsWith("cover.");
    let v = 0, f = 0, m = 255, l = "1", _ = "turn_on", g = "light", y = "brightness";
    n ? (v = h?.attributes?.volume_level ?? 0, m = 1, l = "0.01", _ = "set_volume_level", g = "media_player", y = "volume_level") : p ? (v = h?.attributes?.percentage ?? 0, m = 100, l = "1", _ = "set_percentage", g = "fan", y = "percentage") : b ? (v = h?.attributes?.current_position ?? 0, m = 100, l = "1", _ = "set_cover_position", g = "cover", y = "position") : v = h?.attributes?.brightness ?? 0;
    const $ = Math.round(m === 1 ? v * 100 : m === 100 ? v : v / 255 * 100);
    return o === "slider" ? w`
        <div class="sub-button-slider-container ${s}" style="${a}" title="Level: ${$}%">
          <input type="range" 
                 min="${f}" 
                 max=${m} 
                 step=${l} 
                 .value=${v}
                 @pointerdown=${(x) => x.stopPropagation()}
                 @input=${(x) => {
      x.stopPropagation();
      const A = parseFloat(x.target.value), k = Math.round(m === 1 ? A * 100 : m === 100 ? A : A / 255 * 100), T = x.target.closest(".sub-button-slider-container");
      T && T.style.setProperty("--sub-slider-pct", `${k}%`), d(`sub_${u}`, () => {
        t.callService(g, _, { entity_id: u, [y]: A });
      }, 50);
    }}
                 @change=${(x) => {
      x.stopPropagation();
      const A = parseFloat(x.target.value);
      t.callService(g, _, { entity_id: u, [y]: A });
    }}
                 style="--sub-slider-pct: ${$}%;" />
        </div>
      ` : w`
      <div class="sub-button-group-updown" style="${a}">
        <button type="button" class="sub-button ${s}" title="Decrease Level"
                @click=${(x) => {
      x.stopPropagation();
      const k = Math.max(f, v - (m === 1 ? 0.05 : m === 100 ? 5 : 25));
      t.callService(g, _, { entity_id: u, [y]: k });
    }}>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </button>
        <span class="sub-button-updown-val">${$}%</span>
        <button type="button" class="sub-button ${s}" title="Increase Level"
                @click=${(x) => {
      x.stopPropagation();
      const k = Math.min(m, v + (m === 1 ? 0.05 : m === 100 ? 5 : 25));
      t.callService(g, _, { entity_id: u, [y]: k });
    }}>
          <ha-icon icon="mdi:chevron-up"></ha-icon>
        </button>
      </div>
    `;
  }
  /**
   * Render sub color picker.
   */
  static renderSubColorPicker(e, t, r, i, o, a, s, d) {
    const h = r || e.states[t || ""], u = t || h?.entity_id, n = Y.getLiveHex(h);
    return w`
      <div class="sub-button sub-button-color-picker ${o}" style="${i}" title="Color (${n})">
        <input type="color" 
               .value=${n} 
               @click=${(p) => p.stopPropagation()}
               @input=${(p) => a.onColorInput(p, !0, u, `sub_color_${u}`)}
               @change=${(p) => a.onColorInput(p, !1, u, `sub_color_${u}`)} />
        <ha-icon icon="mdi:palette" style="color: ${n};"></ha-icon>
        ${s ? w`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${s}</span>` : S}
        ${d ? w`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${d}</span>` : S}
      </div>
    `;
  }
}
class Xi {
  constructor() {
    this._sliderStateMap = /* @__PURE__ */ new WeakMap();
  }
  handlePointerDown(e) {
    const t = e.currentTarget;
    if (!t) return;
    const i = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), o = Number(t.value) || 0, a = t.style.getPropertyValue("--slider-pct") || "", s = i?.textContent || "";
    this._sliderStateMap.set(t, {
      startX: e.clientX,
      startY: e.clientY,
      initialVal: o,
      initialPct: a,
      initialBadge: s,
      isScrolling: !1,
      isSliding: !1
    });
  }
  handlePointerMove(e) {
    const t = e.currentTarget;
    if (!t) return;
    const r = this._sliderStateMap.get(t);
    if (!r) return;
    const i = Math.abs(e.clientX - r.startX), o = Math.abs(e.clientY - r.startY);
    !r.isSliding && !r.isScrolling ? o > 6 && o > i ? (r.isScrolling = !0, this.revertSlider(t, r)) : i > 6 && i >= o && (r.isSliding = !0) : r.isScrolling && this.revertSlider(t, r);
  }
  handlePointerCancel(e) {
    const t = e.currentTarget;
    if (!t) return;
    const r = this._sliderStateMap.get(t);
    r && (r.isScrolling = !0, this.revertSlider(t, r), this._sliderStateMap.delete(t));
  }
  handlePointerUp(e, t, r) {
    const i = e.currentTarget;
    if (!i) return;
    const o = this._sliderStateMap.get(i);
    if (o) {
      if (o.isScrolling) {
        this.revertSlider(i, o), this._sliderStateMap.delete(i);
        return;
      }
      if (t?.tap_slider_to_toggle && !o.isSliding) {
        const a = Math.abs(e.clientX - o.startX), s = Math.abs(e.clientY - o.startY);
        a < 6 && s < 6 && (this.revertSlider(i, o), r && r());
      }
    }
  }
  revertSlider(e, t) {
    e.value = String(t.initialVal), e.style.setProperty("--slider-pct", t.initialPct);
    const i = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    i && (i.textContent = t.initialBadge);
  }
  handleSliderInput(e, t, r, i, o) {
    e.stopPropagation();
    const a = e.target, s = this._sliderStateMap.get(a);
    if (s?.isScrolling) {
      this.revertSlider(a, s);
      return;
    }
    const d = Number(a.value), h = isNaN(d) ? 0 : d, u = i ? i(h) : h;
    if (s) {
      if (s.rafPending) return;
      s.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (s && (s.rafPending = !1), s?.isScrolling) {
        this.revertSlider(a, s);
        return;
      }
      a.style.setProperty("--slider-pct", `${u}%`);
      const n = a.closest(".slider-container, .sub-button-slider-container"), p = n?.querySelector(".slider-percent-badge, .sub-slider-pct");
      p && (p.textContent = o ? o(h, u) : `${u}%`), t === "color_hue" && n && n.style.setProperty("--color-hue-val", `hsl(${h}, 100%, 50%)`);
    }), H("selection", r?.haptic_feedback !== !1);
  }
  handleSliderChange(e, t, r, i, o, a) {
    e.stopPropagation();
    const s = e.target, d = this._sliderStateMap.get(s);
    if (d?.isScrolling) {
      this.revertSlider(s, d), d.isScrolling = !1;
      return;
    }
    const h = Number(s.value), u = isNaN(h) ? 0 : h;
    if (!(d && u === d.initialVal)) {
      if (t === "light" && r === "turn_on") {
        const n = Math.round(u / 255 * 100);
        if (u <= 3 || n <= 1) {
          o.callService("light", "turn_off", { entity_id: i.entity });
          return;
        }
      }
      if (t === "fan" && r === "set_percentage" && u <= 0) {
        o.callService("fan", "turn_off", { entity_id: i.entity });
        return;
      }
      o.callService(t, r, { entity_id: i.entity, ...a(u) });
    }
  }
}
let br = 0;
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (br = Date.now());
});
class nr {
  constructor() {
    this._startX = 0, this._startY = 0, this._moved = !1, this._held = !1, this._canceled = !1, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._mountTime = Date.now(), this._activePointerId = null, this._holdTimer = null, this._tapTimer = null, this._subStartX = 0, this._subStartY = 0, this._subMoved = !1, this._subHeld = !1, this._subCanceled = !1, this._subHoldTimer = null, this._subTapTimerMap = /* @__PURE__ */ new Map();
  }
  /**
   * Safe action dispatching with domain checks and non-toggleable entity protection.
   */
  static dispatchAction(e, t, r, i, o, a, s) {
    if (!t) return;
    const d = a || r.entity, h = d ? d.split(".")[0] : "", u = Ai.has(h);
    let n = o;
    if (n || (i === "double_tap" ? n = r.double_tap_action : i === "hold" ? n = r.hold_action || (u ? { action: "more-info" } : { action: "toggle" }) : r.tap_action && r.tap_action.action && r.tap_action.action !== "default" ? u && r.tap_action.action === "toggle" ? n = { action: "none" } : n = r.tap_action : n = u ? { action: "none" } : { action: "toggle" }), !(!n || n.action === "none")) {
      if (n.action === "more-info") {
        const p = n.entity || d;
        if (p) {
          e.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: p },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (n.action === "toggle" && d) {
        if (u) return;
        const p = t.states[d], b = s ? s(p) : p?.state === "on", v = h === "lock" ? b ? "lock" : "unlock" : "toggle", f = ["lock", "cover"].includes(h) ? h : h === "group" ? "homeassistant" : h;
        t.callService(f, v, { entity_id: d });
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
        const [p, b] = n.service.split(".", 2);
        t.callService(p, b, n.data || n.service_data || {}, n.target);
        return;
      }
      u && (!n.action || n.action === "toggle") || Oi(e, t, { ...r, entity: d }, i);
    }
  }
  // --- MAIN CARD POINTER EVENT LIFECYCLE ---
  handlePointerDown(e, t, r) {
    if (!this.isSubElement(e) && (this._startX = e.clientX, this._startY = e.clientY, this._moved = !1, this._held = !1, this._canceled = !1, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._activePointerId = e.pointerId, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), t && r)) {
      const i = t.hold_action_time ?? er;
      this._holdTimer = setTimeout(() => {
        !this._moved && !this._canceled && this._pointerDownReceived && (this._held = !0, H("medium", t.haptic_feedback !== !1), (t.collapse_controls_trigger || "hold") === "hold" && r.toggleCollapse ? r.toggleCollapse() : r.dispatchAction("hold"));
      }, i);
    }
  }
  handlePointerMove(e, t = ft) {
    if (this._moved || this._canceled || !this._pointerDownReceived || this._activePointerId !== null && e.pointerId !== void 0 && e.pointerId !== this._activePointerId) return !1;
    const r = Math.abs(e.clientX - this._startX), i = Math.abs(e.clientY - this._startY);
    return r > t || i > t ? (this._moved = !0, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), !0) : !1;
  }
  handlePointerUp(e) {
    return this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._activePointerId = null, !this._moved && !this._canceled;
  }
  handlePointerCancel(e) {
    this._canceled = !0, this._moved = !0, this._pointerDownReceived = !1, this._activePointerId = null, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null);
  }
  handleTap(e, t, r) {
    if (e.stopPropagation(), this.isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - br < 800) {
      this._pointerDownReceived = !1;
      return;
    }
    if (!this._pointerDownReceived) return;
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
    const o = (t.collapse_controls_trigger || "hold") === "double_tap";
    if (!(o || t.double_tap_action && t.double_tap_action.action !== "none")) {
      H("light", t.haptic_feedback !== !1), r.dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, H("light", t.haptic_feedback !== !1), o && r.toggleCollapse ? r.toggleCollapse() : r.dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, H("light", t.haptic_feedback !== !1), r.dispatchAction("tap");
    }, jt);
  }
  handleContextMenu(e, t, r) {
    if (this.isSubElement(e)) return;
    if (this._held) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    const i = t.hold_action && t.hold_action.action !== "none" && t.hold_action.action !== "default", o = (t.collapse_controls_trigger || "hold") === "hold";
    (i || o) && (e.preventDefault(), e.stopPropagation(), this._held = !0, H("medium", t.haptic_feedback !== !1), o && r.toggleCollapse ? r.toggleCollapse() : r.dispatchAction("hold"));
  }
  handleKeyDown(e, t, r) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.stopPropagation(), H("light", t.haptic_feedback !== !1), r.dispatchAction("tap"));
  }
  // --- SUB-BUTTON GESTURES & TAP ROUTING ---
  handleSubPointerDown(e, t, r, i, o) {
    if (this._subStartX = e.clientX, this._subStartY = e.clientY, this._subMoved = !1, this._subHeld = !1, this._subCanceled = !1, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null), r && r.action !== "none") {
      const a = i.hold_action_time ?? er;
      this._subHoldTimer = setTimeout(() => {
        !this._subMoved && !this._subCanceled && (this._subHeld = !0, H("medium", i.haptic_feedback !== !1), o.dispatchAction("hold", r, t));
      }, a);
    }
  }
  handleSubPointerMove(e) {
    if (this._subMoved || this._subCanceled) return;
    const t = Math.abs(e.clientX - this._subStartX), r = Math.abs(e.clientY - this._subStartY);
    (t > ft || r > ft) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  handleSubPointerUp() {
    this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  handleSubPointerCancel() {
    this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  handleSubTap(e, t, r, i, o, a, s) {
    if (e.stopPropagation(), this._subMoved || this._subCanceled) {
      this._subMoved = !1, this._subCanceled = !1;
      return;
    }
    if (this._subHeld) {
      this._subHeld = !1;
      return;
    }
    const d = i && i.action !== "none", h = `sub_${t || a.entity || "main"}`;
    if (!d) {
      H("light", a.haptic_feedback !== !1), o && (!r || r.action === "default") ? o() : s.dispatchAction("tap", r, t);
      return;
    }
    const u = this._subTapTimerMap.get(h);
    if (u) {
      clearTimeout(u), this._subTapTimerMap.delete(h), H("light", a.haptic_feedback !== !1), s.dispatchAction("double_tap", i, t);
      return;
    }
    const n = setTimeout(() => {
      this._subTapTimerMap.delete(h), H("light", a.haptic_feedback !== !1), o && (!r || r.action === "default") ? o() : s.dispatchAction("tap", r, t);
    }, jt);
    this._subTapTimerMap.set(h, n);
  }
  handleSubContextMenu(e, t, r, i, o) {
    r && r.action !== "none" && (e.preventDefault(), e.stopPropagation(), H("medium", i.haptic_feedback !== !1), o.dispatchAction("hold", r, t));
  }
  isSubElement(e) {
    return !!e.target?.closest?.('.sub-button, .sub-button-container, .slider-container, input[type="range"], input[type="color"], .color-picker, .color-swatch-chip, .temp-preset-chip, [data-ag-sub]');
  }
  cleanup() {
    this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
    for (const e of this._subTapTimerMap.values())
      clearTimeout(e);
    this._subTapTimerMap.clear();
  }
}
const Ke = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "rgb(0, 0, 0)",
  colorHex: "#000000",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
class qi {
  constructor() {
    this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this._cachedDurations = null, this._lastFadeConfigHash = null, this._hexCache = /* @__PURE__ */ new Map(), this._lastResult = null, this._lastColorRgbKey = "", this._lastColorRgbStr = "", this._lastColorHexStr = "";
  }
  _fastParseHex(e, t) {
    if (!e) return t;
    const r = this._hexCache.get(e);
    if (r) return r;
    const i = me(e) || t;
    return this._hexCache.size < 50 && this._hexCache.set(e, i), i;
  }
  /**
   * Precompute static duration and color bounds on configuration update.
   * Uses hashing to avoid re-parsing regexes when config is unchanged.
   */
  precomputeDurations(e) {
    if (!e?.fade_transition_enabled)
      return this._cachedDurations = null, this._lastFadeConfigHash = null, null;
    const t = `${e.fade_stage_1_duration}_${e.fade_stage_1_color}_${e.fade_stage_2_duration}_${e.fade_stage_2_color}_${e.fade_stage_3_duration}_${e.fade_stage_3_color}`;
    if (t === this._lastFadeConfigHash && this._cachedDurations)
      return this._cachedDurations;
    const r = Number(e.fade_stage_1_duration) || yi, i = Number(e.fade_stage_2_duration) || xi, o = Number(e.fade_stage_3_duration) || Si, a = r + i + o;
    if (a <= 0)
      return this._cachedDurations = null, this._lastFadeConfigHash = t, null;
    const s = me(e.fade_stage_1_color || ki) || [255, 152, 0], d = me(e.fade_stage_2_color || Ti) || [205, 220, 57], h = me(e.fade_stage_3_color || Mi) || [76, 175, 80];
    return this._cachedDurations = { d1: r, d2: i, d3: o, totalDuration: a, c1: s, c2: d, c3: h }, this._lastFadeConfigHash = t, this._cachedDurations;
  }
  /**
   * Calculate live 3-stage fade color, stage number, and progress percentage.
   */
  calculateFade(e, t, r, i, o) {
    if (!e?.fade_transition_enabled || !t || !r)
      return Ke;
    const a = kt.has(t.state), s = e.fade_trigger ?? "on_inactive";
    if (!(s === "on_inactive" && !a || s === "on_active" && a || s === "both"))
      return Ke;
    const h = a ? o : i, u = a ? i : o, n = this._fastParseHex(h, [214, 0, 0]), p = this._fastParseHex(u, [3, 177, 0]), { d1: b, d2: v, d3: f, totalDuration: m, c1: l, c2: _, c3: g } = r;
    this._lastTrackedState !== null && this._lastTrackedState !== t.state && this._currentLiveRgb && e.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = t.state;
    const y = t.attributes?.last_triggered || t.last_changed || t.last_updated, $ = (typeof y == "string" ? y : "").trim();
    if (!$)
      return Ke;
    const x = Date.parse($);
    if (isNaN(x))
      return Ke;
    const A = Date.now(), k = Math.max(0, (A - x) / 1e3 | 0);
    let T, E = 1, L = 0;
    const M = e.fade_stage_1_pickup !== !1 && this._previousLiveRgb ? this._previousLiveRgb : n;
    if (k < b) {
      E = 1;
      const O = b > 0 ? k / b : 1;
      T = gt(M, l, O), L = Math.round(k / m * 100);
    } else if (k < b + v) {
      E = 2;
      const O = k - b, J = v > 0 ? O / v : 1, Z = e.fade_stage_2_pickup !== !1 ? l : n;
      T = gt(Z, _, J), L = Math.round(k / m * 100);
    } else if (k < m) {
      E = 3;
      const O = k - (b + v), J = f > 0 ? O / f : 1, Z = e.fade_stage_3_pickup !== !1 ? _ : n;
      T = gt(Z, g, J), L = Math.round(k / m * 100);
    } else
      E = 3, T = p, L = 100;
    this._currentLiveRgb = T;
    const C = Math.max(0, m - k);
    let ee = "";
    C >= 60 ? ee = `${Math.ceil(C / 60)}m left` : ee = `${C}s left`;
    const K = T[0], X = T[1], q = T[2], te = `${K}_${X}_${q}`;
    te !== this._lastColorRgbKey && (this._lastColorRgbKey = te, this._lastColorRgbStr = `rgb(${K}, ${X}, ${q})`, this._lastColorHexStr = `#${((1 << 24) + (K << 16) + (X << 8) + q).toString(16).slice(1)}`);
    const I = Math.min(100, L);
    return this._lastResult && this._lastResult.currentStage === E && this._lastResult.progressPct === I && this._lastResult.remainingSeconds === C && this._lastResult.currentColor === this._lastColorRgbStr ? this._lastResult : (this._lastResult = {
      enabled: !0,
      activeFade: !0,
      currentColor: this._lastColorRgbStr,
      colorHex: this._lastColorHexStr,
      progressPct: I,
      remainingSeconds: C,
      currentStage: E,
      stageLabel: ee
    }, this._lastResult);
  }
  reset() {
    this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this._cachedDurations = null, this._lastFadeConfigHash = null, this._lastResult = null, this._lastColorRgbKey = "", this._hexCache.clear();
  }
}
const sr = new qi();
var Ji = Object.defineProperty, Tt = (c, e, t, r) => {
  for (var i = void 0, o = c.length - 1, a; o >= 0; o--)
    (a = c[o]) && (i = a(e, t, i) || i);
  return i && Ji(e, t, i), i;
};
const Zi = [
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
], Qi = [
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
], ji = [
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
], eo = [
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
], to = [
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
], lr = [
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
function it(c) {
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
const ro = it(1), io = it(2), oo = it(3), ao = it(4), no = [
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
const so = {
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
class Be extends fe {
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
    }, this._formDataCache = /* @__PURE__ */ new WeakMap();
  }
  setConfig(e) {
    const t = { ...e };
    if (t.bg_color) {
      const r = typeof t.bg_color == "string" ? t.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      r && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(r[1]) * 100)), t.bg_color = B(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = B(t.card_border_color)), t.active_color && (t.active_color = B(t.active_color)), t.inactive_color && (t.inactive_color = B(t.inactive_color)), t.slider_color && (t.slider_color = B(t.slider_color)), t.slider_track_color && (t.slider_track_color = B(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = B(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = B(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = B(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = B(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = B(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = B(t.sub_button_4_color)), this._config = {
      ...bt,
      ...t
    };
  }
  _computeLabel(e) {
    return so[e.name] || e.name;
  }
  _transformConfigForForm() {
    if (!this._config) return {};
    const e = this._formDataCache.get(this._config);
    if (e) return e;
    const t = { ...this._config };
    return t.bg_color = D(t.bg_color), t.card_border_color = D(t.card_border_color), t.active_color = D(t.active_color), t.inactive_color = D(t.inactive_color), t.slider_color = D(t.slider_color), t.slider_track_color = D(t.slider_track_color), t.text_color_primary = D(t.text_color_primary), t.text_color_secondary = D(t.text_color_secondary), t.sub_button_1_color = D(t.sub_button_1_color), t.sub_button_2_color = D(t.sub_button_2_color), t.sub_button_3_color = D(t.sub_button_3_color), t.sub_button_4_color = D(t.sub_button_4_color), t.fade_stage_1_color = D(t.fade_stage_1_color), t.fade_stage_2_color = D(t.fade_stage_2_color), t.fade_stage_3_color = D(t.fade_stage_3_color), this._formDataCache.set(this._config, t), t;
  }
  _valueChanged(e, t) {
    const r = e.detail.value, i = { ...this._config };
    if (t) {
      for (const o of t)
        if (o.name in r) {
          const a = r[o.name];
          Array.isArray(a) && a.length === 3 && a.every((s) => typeof s == "number") ? i[o.name] = `rgb(${a[0]}, ${a[1]}, ${a[2]})` : i[o.name] = a;
        }
    } else
      Object.assign(i, r);
    this._config = i, Re(this, "config-changed", { config: this._config });
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    }, this.requestUpdate();
  }
  _renderSection(e, t, r, i, o) {
    const a = !!this._openPanels[e];
    return w`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${r}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? w`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${o}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, i)}
            ></ha-form>
          </div>
        ` : S}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, r, i) {
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
              .data=${i}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, r)}
            ></ha-form>
          </div>
        ` : S}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return w``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", r = this._config?.sub_button_2_entity || "", i = this._config?.sub_button_3_entity || "", o = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return w`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", Zi, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", Qi, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", ji, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", eo, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", to, e)}

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
                .schema=${lr}
                .computeLabel=${this._computeLabel}
                @value-changed=${(s) => this._valueChanged(s, lr)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, ro, e)}
                ${this._renderSubButtonPanel(2, r, io, e)}
                ${this._renderSubButtonPanel(3, i, oo, e)}
                ${this._renderSubButtonPanel(4, o, ao, e)}
              </div>
            </div>
          ` : S}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", no, e)}
      </div>
    `;
  }
  static get styles() {
    return ur`
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
Tt([
  tt({ attribute: !1 })
], Be.prototype, "hass");
Tt([
  rt()
], Be.prototype, "_config");
Tt([
  rt()
], Be.prototype, "_openPanels");
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", Be);
customElements.get("antigravity-card-editor") || customElements.define("antigravity-card-editor", Be);
var lo = Object.defineProperty, ot = (c, e, t, r) => {
  for (var i = void 0, o = c.length - 1, a; o >= 0; o--)
    (a = c[o]) && (i = a(e, t, i) || i);
  return i && lo(e, t, i), i;
};
typeof window < "u" && (window.runAntigravityCI = gr, window.antigravityMemoryReport = () => Qe.logStatus(), window.antigravityPowerStatus = () => ae.isPowerSaveActive());
const co = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${co} `,
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
class ve extends fe {
  constructor() {
    super(...arguments), this.preview = !1, this._collapsed = !0, this._interaction = new nr(), this._sliderDrag = new Xi(), this._throttleMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._powerUnsubscribe = null, this._gl = null, this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._fadeStaticConfig = null, this._sanitizedCustomStyles = "", this._interactionCallbacks = {
      dispatchAction: (e, t, r) => this._dispatchAction(e, t, r),
      toggleCollapse: () => {
        this._hasCollapsible() && (this._collapsed = !this._collapsed);
      },
      callService: (e, t, r) => this.hass?.callService(e, t, r)
    }, this._sliderCallbacks = {
      onPointerDown: (e) => this._onSliderPointerDown(e),
      onPointerMove: (e) => this._onSliderPointerMove(e),
      onPointerUp: (e) => this._onSliderPointerUp(e),
      onPointerCancel: (e) => this._onSliderPointerCancel(e),
      onSliderInput: (e, t, r, i, o, a, s) => this._sliderInput(e, t, r, i, o, a, s),
      onSliderChange: (e, t, r, i) => this._sliderChange(e, t, r, i),
      onColorInput: (e, t, r, i) => this._handleColorInput(e, t, r, i),
      callService: (e, t, r) => this.hass.callService(e, t, r),
      forwardHaptic: (e) => H(e, this.config.haptic_feedback !== !1)
    }, this._subButtonCallbacks = {
      onTap: (e, t, r, i, o) => this._handleSubTap(e, t, r, i, o),
      onPointerDown: (e, t, r) => this._handleSubPointerDown(e, t, r),
      onPointerMove: (e) => this._handleSubPointerMove(e),
      onPointerUp: (e) => this._handleSubPointerUp(e),
      onPointerCancel: (e) => this._handleSubPointerCancel(e),
      onContextMenu: (e, t, r) => this._handleSubContextMenu(e, t, r)
    }, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._onSliderPointerDown = (e) => {
      this._sliderDrag.handlePointerDown(e);
    }, this._onSliderPointerMove = (e) => {
      this._sliderDrag.handlePointerMove(e);
    }, this._onSliderPointerCancel = (e) => {
      this._sliderDrag.handlePointerCancel(e);
    }, this._onSliderPointerUp = (e) => {
      this._sliderDrag.handlePointerUp(e, this.config, () => {
        H("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      });
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
    return { ...bt };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...bt,
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
    if (t.states === this.hass.states)
      return !1;
    const r = this._monitoredEntities, i = r.length;
    if (i === 1) {
      const o = r[0];
      return t.states[o] !== this.hass.states[o];
    }
    for (let o = 0; o < i; o++) {
      const a = r[o];
      if (t.states[a] !== this.hass.states[a])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const e = Ze.computeStaticStyles(this.config);
    this._staticCardStyles = e.staticCardStyles, this._staticCardClasses = e.staticCardClasses, this._textOffsetStyle = e.textOffsetStyle, this._primaryTextOffsetStyle = e.primaryTextOffsetStyle, this._secondaryTextOffsetStyle = e.secondaryTextOffsetStyle, this._featuresOffsetStyle = e.featuresOffsetStyle, this._mainSliderMarginOffsets = e.mainSliderMarginOffsets, this._colorTempMarginOffsets = e.colorTempMarginOffsets, this._colorHueMarginOffsets = e.colorHueMarginOffsets, this._textBoxWidth = e.textBoxWidth, this._primaryTextStyle = e.primaryTextStyle, this._secondaryTextStyle = e.secondaryTextStyle, this._cachedSubButtons = Jt.extractSubButtons(this.config), this._fadeStaticConfig = sr.precomputeDurations(this.config), this._sanitizedCustomStyles = Ze.sanitizeCustomStyles(this.config.custom_styles);
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
    const r = this.config.entity.split(".")[0] === "light", i = e.state === "on", o = this.config.hide_color_temp_when_off !== !1, a = this.config.hide_color_picker_when_off !== !1, s = this.config.hide_color_slider_when_off !== !1, d = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, h = r && this.config.show_color_temp === !0 && (d !== void 0 || e.attributes?.supported_color_modes?.some((l) => ["color_temp"].includes(l))) && (!o || i), u = e.attributes?.supported_color_modes, n = Array.isArray(u) && u.some((l) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(l)), p = this.config.color_picker_type !== "wheel", b = r && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && p) && n && (!s || i), v = r && this.config.show_color_picker === !0 && !p && n && (!a || i), f = h || b || v, m = this._getSubButtons();
    this._cachedHasCollapsible = f || m.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), Qe.registerCard(this), this._powerUnsubscribe = ae.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    }), this._updatePowerSaveAttribute(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _updatePowerSaveAttribute() {
    ae.isPowerSaveActive(this.hass) ? this.setAttribute("power-save", "") : this.removeAttribute("power-save");
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const e = this.config?.primary_info, t = this.config?.secondary_info, r = this.config?.entity, i = r ? r.split(".")[0] : "", o = (i === "binary_sensor" || i === "timer") && (e === "state" || t === "state"), a = this.config?.fade_transition_enabled === !0, s = r && this.hass ? this.hass.states[r] : null;
    let d = !1;
    if (a && s) {
      const u = this._calculateMultiStageFade(s);
      d = u.enabled && u.activeFade && u.progressPct < 100;
    }
    const h = d || o || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (h && !this._relativeTimer) {
      let u = d ? 1e3 : 5e3;
      const n = s?.attributes?.last_triggered || s?.last_changed || s?.last_updated;
      if (n && !d && !o) {
        const p = this._parseDate(n);
        if (p) {
          const b = Math.max(0, (Date.now() - p.getTime()) / 1e3 | 0);
          b > 3600 ? u = 6e4 : b > 60 && (u = 15e3);
        }
      }
      ae.isPowerSaveActive(this.hass) && (u = Math.max(u, 1e4)), this._relativeTimer = setInterval(() => {
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
    super.disconnectedCallback(), Qe.unregisterCard(this), this._powerUnsubscribe && (this._powerUnsubscribe(), this._powerUnsubscribe = null), this._gl && (fr(this._gl), this._gl = null), this._throttleMap.clear(), this._interaction.cleanup(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
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
    let o = !1;
    (e === "on" && !i || e === "off" && i) && (o = !0), this._toggleDisplay(o);
  }
  _isEntityActive(e) {
    return e ? kt.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t = "", r = "") {
    return sr.calculateFade(
      this.config,
      e,
      this._fadeStaticConfig,
      this._resolveColor(this.config.active_color) || t || "#d60000",
      this._resolveColor(this.config.inactive_color) || r || "#03b100"
    );
  }
  _resolveColor(e) {
    return Gi(e);
  }
  _parseDate(e) {
    return Qt.parseDate(e);
  }
  _getInfoContent(e, t) {
    return Qt.getInfoContent(e, t, this.config, this.hass);
  }
  // --- NATIVE ACTION ROUTING & TOUCH GESTURE HANDLING ---
  _dispatchAction(e, t, r) {
    nr.dispatchAction(
      this,
      this.hass,
      this.config,
      e,
      t,
      r,
      (i) => this._isEntityActive(i)
    );
  }
  _handleTap(e) {
    this._interaction.handleTap(e, this.config, this._interactionCallbacks);
  }
  _handleKeyDown(e) {
    this._interaction.handleKeyDown(e, this.config, this._interactionCallbacks);
  }
  _handleContextMenu(e) {
    this._interaction.handleContextMenu(e, this.config, this._interactionCallbacks);
  }
  _handlePointerDown(e) {
    this._interaction.handlePointerDown(e, this.config, this._interactionCallbacks);
  }
  _handlePointerMove(e) {
    this._interaction.handlePointerMove(e);
  }
  _handlePointerUp(e) {
    this._interaction.handlePointerUp(e);
  }
  _handlePointerCancel(e) {
    this._interaction.handlePointerCancel(e);
  }
  // --- SUB BUTTON ROUTING ---
  _handleSubPointerDown(e, t, r) {
    this._interaction.handleSubPointerDown(e, t, r, this.config, this._interactionCallbacks);
  }
  _handleSubPointerMove(e) {
    this._interaction.handleSubPointerMove(e);
  }
  _handleSubPointerUp(e) {
    this._interaction.handleSubPointerUp();
  }
  _handleSubPointerCancel(e) {
    this._interaction.handleSubPointerCancel();
  }
  _handleSubTap(e, t, r, i, o) {
    this._interaction.handleSubTap(e, t, r, i, o, this.config, this._interactionCallbacks);
  }
  _handleSubContextMenu(e, t, r) {
    this._interaction.handleSubContextMenu(e, t, r, this.config, this._interactionCallbacks);
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(e, t, r) {
    const i = Date.now(), o = r ?? (ae.isPowerSaveActive(this.hass) ? $i : wi), a = this._throttleMap.get(e) || 0;
    i - a >= o ? (this._throttleMap.set(e, i), t()) : setTimeout(() => {
      const s = Date.now(), d = this._throttleMap.get(e) || 0;
      s - d >= o && (this._throttleMap.set(e, s), t());
    }, o + 50);
  }
  _sliderInput(e, t, r, i, o, a, s) {
    this._sliderDrag.handleSliderInput(e, t, this.config, a, s);
  }
  _sliderChange(e, t, r, i) {
    this._sliderDrag.handleSliderChange(e, t, r, this.config, this.hass, i);
  }
  _getLightLiveColor(e) {
    return Y.getLightLiveColor(e);
  }
  _handleColorInput(e, t, r, i) {
    e.stopPropagation();
    const o = e.target.value;
    if (!o) return;
    const a = me(o);
    if (!a) return;
    const s = r || this.config.entity, d = () => {
      this.hass.callService("light", "turn_on", { entity_id: s, rgb_color: a });
    };
    t ? this._throttledCall(i || "color_picker", d) : d();
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
    const r = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", i = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", o = this._isEntityActive(t), a = e.split(".")[0];
    let s = "var(--primary-color)", d = null;
    a === "climate" ? t.state === "heat" ? s = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? s = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? s = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (s = "var(--state-climate-fan_only-color, #26a69a)") : a === "light" ? (d = this._getLightLiveColor(t), d && (s = d)) : (a === "binary_sensor" || a === "lock" || a === "switch") && (s = "#d60000");
    const h = this.config.color_type === "card";
    let u = this._resolveColor(this.config.active_color);
    (!u || this.config.use_light_color) && (a === "light" && d ? u = d : u = s);
    let n = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    a === "light" ? n = "#000000" : (a === "binary_sensor" || a === "lock" || a === "switch") && (n = "#03b500");
    const p = this._resolveColor(this.config.inactive_color) || n, b = this.config.show_slider !== !1, v = a === "light", f = a === "cover", m = a === "fan", l = a === "humidifier", _ = a === "media_player", g = a === "number" || a === "input_number", y = a === "climate", $ = this.config.hide_slider_when_off !== !1, x = this.config.hide_color_temp_when_off !== !1, A = this.config.hide_color_picker_when_off !== !1, k = this.config.hide_color_slider_when_off !== !1, T = t.attributes?.supported_color_modes;
    let E = t.attributes?.brightness !== void 0, L = !1, M = !1;
    if (Array.isArray(T))
      for (let P = 0; P < T.length; P++) {
        const Te = T[P];
        Te !== "onoff" && (E = !0), Te === "color_temp" && (L = !0), Pi.has(Te) && (M = !0);
      }
    const C = v && b && E && (!$ || o), ee = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, K = v && b && this.config.show_color_temp === !0 && (ee !== void 0 || L) && (!x || o), X = this.config.color_picker_type !== "wheel", q = v && b && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && X) && M && (!k || o), te = v && b && this.config.show_color_picker === !0 && !X && M && (!A || o), I = t.state !== "unavailable" && t.state !== "unknown", O = f && I && b && t.attributes?.current_position !== void 0, J = m && I && o && b && t.attributes?.percentage !== void 0, Z = l && I && o && b && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), ze = _ && I && o && b && t.attributes?.volume_level !== void 0, Ie = g && I && b, Oe = y && I && o && b && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), at = (this.config.bg_opacity ?? 10) / 100, nt = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : h && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${u};`, st = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : h && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", N = this._calculateMultiStageFade(t, s, p), ye = this.config.fade_target ?? "card", xe = this._resolveColor(this.config.bg_color), Fe = typeof N.currentColor == "string" ? N.currentColor : Array.isArray(N.currentColor) ? `rgb(${N.currentColor.join(",")})` : "";
    let F;
    N.activeFade && (ye === "card" || ye === "all" || h) ? F = Fe : h ? a === "light" ? F = o ? d || u : this.config.inactive_color ? p : "#000000" : F = o ? u : p : xe ? F = xe : a === "light" && !o ? F = "#000000" : F = `rgba(150, 150, 150, ${at})`;
    let Se = this._resolveColor(this.config.active_color) || (a === "light" && d ? d : u) || "var(--primary-color)";
    N.activeFade && (ye === "all" || this.config.active_glow === !0) && (Se = Fe);
    let le = "";
    this.config.box_shadow === "soft" && (le = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (le = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (le = o || N.activeFade ? `box-shadow: 0 0 22px ${Se}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const lt = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", U = t?.attributes?.device_class, ce = a === "binary_sensor" && (U === "motion" || U === "occupancy" || U === "presence"), Ue = a === "binary_sensor" && (U === "door" || U === "window" || U === "garage_door" || U === "opening"), Ge = ce && (o || N.activeFade && N.currentStage === 1) ? "motion-active" : "", ct = Ue && o ? "door-open" : "", dt = a === "climate" && t?.attributes?.hvac_action ? `hvac-${t.attributes.hvac_action}` : "", ut = a === "cover" ? t?.state === "opening" ? "cover-opening" : t?.state === "closing" ? "cover-closing" : "" : "", de = `${this._staticCardClasses} ${lt} ${Ge} ${ct} ${dt} ${ut}`, ue = this._getSubButtons();
    let G = "";
    this.config.text_color_mode === "active_accent" && o ? G += `--primary-text-color: ${u}; ` : this.config.text_color_primary ? G += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : h && o && (G += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? G += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : h && o && (G += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const Q = this.config.features_position === "inline", _t = this.config.text_scrolling_primary || "none", ht = this.config.text_scrolling_secondary || "none", we = w`
      ${C ? this._renderLightSlider(t) : S}
      ${O ? this._renderCoverSlider(t) : S}
      ${J ? this._renderFanSlider(t) : S}
      ${Z ? this._renderHumidifierSlider(t) : S}
      ${ze ? this._renderMediaSlider(t) : S}
      ${Ie ? this._renderNumberSlider(t) : S}
      ${Oe ? this._renderClimateSlider(t) : S}
    `, $e = w`
      ${K ? this._renderColorTempSlider(t) : S}
      ${q ? this._renderColorSlider(t) : S}
      ${te ? this._renderColorPicker(t) : S}
    `, Ve = C || O || J || Z || ze || Ie || Oe, _e = K || q || te, We = !Q && _e || ue.length > 0, Ce = this.config.decay_slider_position ?? "bottom", ke = this._sanitizedCustomStyles;
    return w`
      ${ke ? w`<style>${dr(ke)}</style>` : S}
      <ha-card 
        class="${de}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${F}; ${le} ${nt} ${st} ${G} --ag-glow-color: ${Se}; --ag-active-color: ${u};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${Q ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${Ce === "top" ? this._renderDecaySlider(N) : S}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${r ? w`
                <div class="text-marquee-container scroll-${_t}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${r}</span>
                </div>` : S}
              ${i ? w`
                <div class="text-marquee-container scroll-${ht}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${i}</span>
                </div>` : S}
            </div>
            ${Ce === "inline" ? w`<div class="inline-sliders">${this._renderDecaySlider(N)}</div>` : S}
            ${Q && Ve ? w`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${we}</div>` : S}
            ${Q && _e ? w`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${$e}</div>` : S}
          </div>
          
          ${Ce === "bottom" ? this._renderDecaySlider(N) : S}
          ${!Q && Ve ? w`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${we}</div>` : S}

          ${We ? w`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!Q && _e ? w`<div class="features-container" style="${this._featuresOffsetStyle}">${$e}</div>` : S}

              ${ue.length > 0 ? w`
                <div class="sub-buttons-container">
                  ${li(
      ue,
      (P) => P.key,
      (P) => this._renderSubButton(P.entity || "", P.icon, P.color, P.bg !== !1, P.name, P.tapAction, P.holdAction, P.type, P.doubleTapAction, P.showState)
    )}
                </div>
              ` : S}
            </div>
          ` : S}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(e) {
    if (!this.config.show_decay_slider || !e.enabled || !e.activeFade)
      return S;
    const t = this.config.slider_style === "google", r = this.config.decay_slider_height ?? (t ? 32 : 10), i = this.config.slider_border_radius ?? (t ? 16 : 5), o = Math.max(0, 100 - e.progressPct);
    return w`
      <div class="decay-slider-container" style="--decay-color: ${e.currentColor};">
        <div class="decay-slider-track" style="height: ${r}px; border-radius: ${i}px;">
          <div class="decay-slider-fill" style="width: ${o}%; background: ${e.currentColor}; border-radius: ${i}px;"></div>
          <span class="decay-slider-badge">${e.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(e) {
    return z.renderLightSlider(this.config, e, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }
  _renderColorTempSlider(e) {
    return z.renderColorTempSlider(this.config, e, this._sliderCallbacks, this._colorTempMarginOffsets);
  }
  _renderColorSlider(e) {
    return z.renderColorSlider(this.config, e, this._sliderCallbacks, this._colorHueMarginOffsets);
  }
  _renderColorPicker(e) {
    return z.renderColorPicker(this.config, e, this._sliderCallbacks);
  }
  _renderCoverSlider(e) {
    return z.renderCoverSlider(this.config, e, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }
  _renderFanSlider(e) {
    return z.renderFanSlider(this.config, e, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }
  _renderMediaSlider(e) {
    return z.renderMediaSlider(this.config, e, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }
  _renderNumberSlider(e) {
    return z.renderNumberSlider(this.config, e, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }
  _renderClimateSlider(e) {
    return z.renderClimateSlider(this.config, e, this.hass, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }
  _renderHumidifierSlider(e) {
    return z.renderHumidifierSlider(this.config, e, this._sliderCallbacks, this._mainSliderMarginOffsets);
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(e, t, r, i, o) {
    return z.renderSubSlider(
      this.config,
      this.hass,
      e,
      t,
      r,
      i,
      o,
      this._throttledCall.bind(this)
    );
  }
  _renderSubColorPicker(e, t, r, i, o, a) {
    return z.renderSubColorPicker(
      this.hass,
      e,
      t,
      r,
      i,
      this._sliderCallbacks,
      o,
      a
    );
  }
  _renderSubButton(e, t, r, i = !0, o, a, s, d = "button", h, u = !1) {
    const n = e ? this.hass?.states[e] : this.hass?.states[this.config.entity || ""], p = this._isEntityActive(n), b = r ? `color: ${r};` : "", v = i ? "" : "no-bg", f = r ? this._resolveColor(r) : void 0;
    if (d === "slider" || d === "google_slider") {
      const _ = r ? `--primary-color: ${r}; --slider-color: ${r};` : "";
      return this._renderSubSlider(e, n, d, _, v);
    }
    let m;
    u && n && (m = this._getInfoContent("state", n));
    const l = (e || this.config.entity || "").split(".")[0];
    return d === "color_picker" && (l === "light" || !e && this.config.entity?.startsWith("light.")) ? this._renderSubColorPicker(e, n, b, v, o, m) : Jt.renderSubButton(
      this.config,
      this.hass,
      e,
      t,
      r,
      i,
      o,
      a,
      s,
      d,
      h,
      u,
      p,
      f,
      m,
      this._subButtonCallbacks
    );
  }
  // --- STATIC STYLES ---
  static get styles() {
    return hi;
  }
}
ot([
  tt({ attribute: !1 })
], ve.prototype, "hass");
ot([
  tt({ type: Boolean })
], ve.prototype, "preview");
ot([
  rt()
], ve.prototype, "config");
ot([
  rt()
], ve.prototype, "_collapsed");
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", ve);
customElements.get("antigravity-card") || customElements.define("antigravity-card", ve);
export {
  ve as AntigravityCard,
  co as CARD_VERSION
};
