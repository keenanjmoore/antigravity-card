const Qe = globalThis, xt = Qe.ShadowRoot && (Qe.ShadyCSS === void 0 || Qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = Symbol(), Pt = /* @__PURE__ */ new WeakMap();
let Xt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (xt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Pt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Pt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ai = (a) => new Xt(typeof a == "string" ? a : a + "", void 0, wt), Zt = (a, ...e) => {
  const t = a.length === 1 ? a[0] : e.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + a[o + 1], a[0]);
  return new Xt(t, a, wt);
}, si = (a, e) => {
  if (xt) a.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = Qe.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, a.appendChild(i);
  }
}, Et = xt ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ai(t);
})(a) : a;
const { is: li, defineProperty: ci, getOwnPropertyDescriptor: di, getOwnPropertyNames: ui, getOwnPropertySymbols: hi, getPrototypeOf: _i } = Object, tt = globalThis, Dt = tt.trustedTypes, pi = Dt ? Dt.emptyScript : "", fi = tt.reactiveElementPolyfillSupport, Se = (a, e) => a, je = { toAttribute(a, e) {
  switch (e) {
    case Boolean:
      a = a ? pi : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, e) {
  let t = a;
  switch (e) {
    case Boolean:
      t = a !== null;
      break;
    case Number:
      t = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(a);
      } catch {
        t = null;
      }
  }
  return t;
} }, $t = (a, e) => !li(a, e), Lt = { attribute: !0, type: String, converter: je, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ??= Symbol("metadata"), tt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ae = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Lt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && ci(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: o } = di(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: r, set(n) {
      const s = r?.call(this);
      o?.call(this, n), this.requestUpdate(e, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Se("elementProperties"))) return;
    const e = _i(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Se("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Se("properties"))) {
      const t = this.properties, i = [...ui(t), ...hi(t)];
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
      for (const r of i) t.unshift(Et(r));
    } else e !== void 0 && t.push(Et(e));
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
    return si(e, this.constructor.elementStyles), e;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : je).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : je;
      this._$Em = r;
      const s = n.fromAttribute(t, o.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, o) {
    if (e !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[e]), i ??= n.getPropertyOptions(e), !((i.hasChanged ?? $t)(o, t) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: o }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        const { wrapped: n } = o, s = this[r];
        n !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, o, s);
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
ae.elementStyles = [], ae.shadowRootOptions = { mode: "open" }, ae[Se("elementProperties")] = /* @__PURE__ */ new Map(), ae[Se("finalized")] = /* @__PURE__ */ new Map(), fi?.({ ReactiveElement: ae }), (tt.reactiveElementVersions ??= []).push("2.1.2");
const St = globalThis, Nt = (a) => a, et = St.trustedTypes, Rt = et ? et.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, Jt = "$lit$", W = `lit$${Math.random().toFixed(9).slice(2)}$`, Qt = "?" + W, gi = `<${Qt}>`, Q = document, ke = () => Q.createComment(""), Ce = (a) => a === null || typeof a != "object" && typeof a != "function", kt = Array.isArray, mi = (a) => kt(a) || typeof a?.[Symbol.iterator] == "function", pt = `[ 	
\f\r]`, ye = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ht = /-->/g, Ot = />/g, X = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Bt = /'/g, zt = /"/g, jt = /^(?:script|style|textarea|title)$/i, bi = (a) => (e, ...t) => ({ _$litType$: a, strings: e, values: t }), S = bi(1), j = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Ft = /* @__PURE__ */ new WeakMap(), J = Q.createTreeWalker(Q, 129);
function ei(a, e) {
  if (!kt(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Rt !== void 0 ? Rt.createHTML(e) : e;
}
const vi = (a, e) => {
  const t = a.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = ye;
  for (let s = 0; s < t; s++) {
    const d = a[s];
    let p, h, c = -1, v = 0;
    for (; v < d.length && (n.lastIndex = v, h = n.exec(d), h !== null); ) v = n.lastIndex, n === ye ? h[1] === "!--" ? n = Ht : h[1] !== void 0 ? n = Ot : h[2] !== void 0 ? (jt.test(h[2]) && (r = RegExp("</" + h[2], "g")), n = X) : h[3] !== void 0 && (n = X) : n === X ? h[0] === ">" ? (n = r ?? ye, c = -1) : h[1] === void 0 ? c = -2 : (c = n.lastIndex - h[2].length, p = h[1], n = h[3] === void 0 ? X : h[3] === '"' ? zt : Bt) : n === zt || n === Bt ? n = X : n === Ht || n === Ot ? n = ye : (n = X, r = void 0);
    const g = n === X && a[s + 1].startsWith("/>") ? " " : "";
    o += n === ye ? d + gi : c >= 0 ? (i.push(p), d.slice(0, c) + Jt + d.slice(c) + W + g) : d + W + (c === -2 ? s : g);
  }
  return [ei(a, o + (a[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Te {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const s = e.length - 1, d = this.parts, [p, h] = vi(e, t);
    if (this.el = Te.createElement(p, i), J.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = J.nextNode()) !== null && d.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(Jt)) {
          const v = h[n++], g = r.getAttribute(c).split(W), x = /([.?@])?(.*)/.exec(v);
          d.push({ type: 1, index: o, name: x[2], strings: g, ctor: x[1] === "." ? xi : x[1] === "?" ? wi : x[1] === "@" ? $i : it }), r.removeAttribute(c);
        } else c.startsWith(W) && (d.push({ type: 6, index: o }), r.removeAttribute(c));
        if (jt.test(r.tagName)) {
          const c = r.textContent.split(W), v = c.length - 1;
          if (v > 0) {
            r.textContent = et ? et.emptyScript : "";
            for (let g = 0; g < v; g++) r.append(c[g], ke()), J.nextNode(), d.push({ type: 2, index: ++o });
            r.append(c[v], ke());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Qt) d.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(W, c + 1)) !== -1; ) d.push({ type: 7, index: o }), c += W.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = Q.createElement("template");
    return i.innerHTML = e, i;
  }
}
function ce(a, e, t = a, i) {
  if (e === j) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const o = Ce(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(a), r._$AT(a, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = ce(a, r._$AS(a, e.values), r, i)), e;
}
class yi {
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
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? Q).importNode(t, !0);
    J.currentNode = r;
    let o = J.nextNode(), n = 0, s = 0, d = i[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let p;
        d.type === 2 ? p = new de(o, o.nextSibling, this, e) : d.type === 1 ? p = new d.ctor(o, d.name, d.strings, this, e) : d.type === 6 && (p = new Si(o, this, e)), this._$AV.push(p), d = i[++s];
      }
      n !== d?.index && (o = J.nextNode(), n++);
    }
    return J.currentNode = Q, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class de {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = ce(this, e, t), Ce(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== j && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : mi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== w && Ce(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Q.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Te.createElement(ei(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new yi(r, this), n = o.u(this.options);
      o.p(t), this.T(n), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ft.get(e.strings);
    return t === void 0 && Ft.set(e.strings, t = new Te(e)), t;
  }
  k(e) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const o of e) r === t.length ? t.push(i = new de(this.O(ke()), this.O(ke()), this, this.options)) : i = t[r], i._$AI(o), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = Nt(e).nextSibling;
      Nt(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = w;
  }
  _$AI(e, t = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = ce(this, e, t, 0), n = !Ce(e) || e !== this._$AH && e !== j, n && (this._$AH = e);
    else {
      const s = e;
      let d, p;
      for (e = o[0], d = 0; d < o.length - 1; d++) p = ce(this, s[i + d], t, d), p === j && (p = this._$AH[d]), n ||= !Ce(p) || p !== this._$AH[d], p === w ? e = w : e !== w && (e += (p ?? "") + o[d + 1]), this._$AH[d] = p;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class xi extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === w ? void 0 : e;
  }
}
class wi extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== w);
  }
}
class $i extends it {
  constructor(e, t, i, r, o) {
    super(e, t, i, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ce(this, e, t, 0) ?? w) === j) return;
    const i = this._$AH, r = e === w && i !== w || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== w && (i === w || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Si = class {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ce(this, e);
  }
};
const ki = { I: de }, Ci = St.litHtmlPolyfillSupport;
Ci?.(Te, de), (St.litHtmlVersions ??= []).push("3.3.3");
const Ti = (a, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    i._$litPart$ = r = new de(e.insertBefore(ke(), o), o, void 0, t ?? {});
  }
  return r._$AI(a), r;
};
const Ct = globalThis;
let le = class extends ae {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ti(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return j;
  }
};
le._$litElement$ = !0, le.finalized = !0, Ct.litElementHydrateSupport?.({ LitElement: le });
const Ai = Ct.litElementPolyfillSupport;
Ai?.({ LitElement: le });
(Ct.litElementVersions ??= []).push("4.2.2");
const Mi = { attribute: !0, type: String, converter: je, reflect: !1, hasChanged: $t }, Pi = (a = Mi, e, t) => {
  const { kind: i, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((a = Object.create(a)).wrapped = !0), o.set(t.name, a), i === "accessor") {
    const { name: n } = t;
    return { set(s) {
      const d = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(n, d, a, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, a, s), s;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(s) {
      const d = this[n];
      e.call(this, s), this.requestUpdate(n, d, a, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function rt(a) {
  return (e, t) => typeof t == "object" ? Pi(a, e, t) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(a, e, t);
}
function ot(a) {
  return rt({ ...a, state: !0, attribute: !1 });
}
function ti(a) {
  return (e, t) => {
    const i = typeof e == "function" ? e : e[t];
    Object.assign(i, a);
  };
}
const Ei = { CHILD: 2 }, Di = (a) => (...e) => ({ _$litDirective$: a, values: e });
let Li = class {
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
const { I: Ni } = ki, Ut = (a) => a, It = () => document.createComment(""), xe = (a, e, t) => {
  const i = a._$AA.parentNode, r = e === void 0 ? a._$AB : e._$AA;
  if (t === void 0) {
    const o = i.insertBefore(It(), r), n = i.insertBefore(It(), r);
    t = new Ni(o, n, a, a.options);
  } else {
    const o = t._$AB.nextSibling, n = t._$AM, s = n !== a;
    if (s) {
      let d;
      t._$AQ?.(a), t._$AM = a, t._$AP !== void 0 && (d = a._$AU) !== n._$AU && t._$AP(d);
    }
    if (o !== r || s) {
      let d = t._$AA;
      for (; d !== o; ) {
        const p = Ut(d).nextSibling;
        Ut(i).insertBefore(d, r), d = p;
      }
    }
  }
  return t;
}, Z = (a, e, t = a) => (a._$AI(e, t), a), Ri = {}, Hi = (a, e = Ri) => a._$AH = e, Oi = (a) => a._$AH, ft = (a) => {
  a._$AR(), a._$AA.remove();
};
const Gt = (a, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) i.set(a[r], r);
  return i;
}, Bi = Di(class extends Li {
  constructor(a) {
    if (super(a), a.type !== Ei.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(a, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const r = [], o = [];
    let n = 0;
    for (const s of a) r[n] = i ? i(s, n) : n, o[n] = t(s, n), n++;
    return { values: o, keys: r };
  }
  render(a, e, t) {
    return this.dt(a, e, t).values;
  }
  update(a, [e, t, i]) {
    const r = Oi(a), { values: o, keys: n } = this.dt(e, t, i);
    if (!Array.isArray(r)) return this.ut = n, o;
    const s = this.ut ??= [], d = [];
    let p, h, c = 0, v = r.length - 1, g = 0, x = o.length - 1;
    for (; c <= v && g <= x; ) if (r[c] === null) c++;
    else if (r[v] === null) v--;
    else if (s[c] === n[g]) d[g] = Z(r[c], o[g]), c++, g++;
    else if (s[v] === n[x]) d[x] = Z(r[v], o[x]), v--, x--;
    else if (s[c] === n[x]) d[x] = Z(r[c], o[x]), xe(a, d[x + 1], r[c]), c++, x--;
    else if (s[v] === n[g]) d[g] = Z(r[v], o[g]), xe(a, r[c], r[v]), v--, g++;
    else if (p === void 0 && (p = Gt(n, g, x), h = Gt(s, c, v)), p.has(s[c])) if (p.has(s[v])) {
      const u = h.get(n[g]), m = u !== void 0 ? r[u] : null;
      if (m === null) {
        const $ = xe(a, r[c]);
        Z($, o[g]), d[g] = $;
      } else d[g] = Z(m, o[g]), xe(a, r[c], m), r[u] = null;
      g++;
    } else ft(r[v]), v--;
    else ft(r[c]), c++;
    for (; g <= x; ) {
      const u = xe(a, d[x + 1]);
      Z(u, o[g]), d[g++] = u;
    }
    for (; c <= v; ) {
      const u = r[c++];
      u !== null && ft(u);
    }
    return this.ut = n, Hi(a, d), j;
  }
});
var Vt, Wt;
(function(a) {
  a.language = "language", a.system = "system", a.comma_decimal = "comma_decimal", a.decimal_comma = "decimal_comma", a.space_comma = "space_comma", a.none = "none";
})(Vt || (Vt = {})), function(a) {
  a.language = "language", a.system = "system", a.am_pm = "12", a.twenty_four = "24";
}(Wt || (Wt = {}));
function zi(a) {
  return a.substr(0, a.indexOf("."));
}
var Fi = ["closed", "locked", "off"], Ae = function(a, e, t, i) {
  i = i || {}, t = t ?? {};
  var r = new Event(e, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return r.detail = t, a.dispatchEvent(r), r;
}, $e = function(a) {
  Ae(window, "haptic", a);
}, Ui = function(a, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), Ae(window, "location-changed", { replace: t });
}, Ii = function(a, e, t) {
  t === void 0 && (t = !0);
  var i, r = zi(e), o = r === "group" ? "homeassistant" : r;
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
  return a.callService(o, i, { entity_id: e });
}, Gi = function(a, e) {
  var t = Fi.includes(a.states[e].state);
  return Ii(a, e, t);
}, Vi = function(a, e, t, i) {
  if (i || (i = { action: "more-info" }), !i.confirmation || i.confirmation.exemptions && i.confirmation.exemptions.some(function(o) {
    return o.user === e.user.id;
  }) || ($e("warning"), confirm(i.confirmation.text || "Are you sure you want to " + i.action + "?"))) switch (i.action) {
    case "more-info":
      (t.entity || t.camera_image) && Ae(a, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      i.navigation_path && Ui(0, i.navigation_path);
      break;
    case "url":
      i.url_path && window.open(i.url_path);
      break;
    case "toggle":
      t.entity && (Gi(e, t.entity), $e("success"));
      break;
    case "call-service":
      if (!i.service) return void $e("failure");
      var r = i.service.split(".", 2);
      e.callService(r[0], r[1], i.service_data, i.target), $e("success");
      break;
    case "fire-dom-event":
      Ae(a, "ll-custom", i);
  }
}, Wi = function(a, e, t, i) {
  var r;
  i === "double_tap" && t.double_tap_action ? r = t.double_tap_action : i === "hold" && t.hold_action ? r = t.hold_action : i === "tap" && t.tap_action && (r = t.tap_action), Vi(a, e, t, r);
};
const vt = {
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
  // Sub-button 3 defaults
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
  // Sub-button 4 defaults
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
  // Miscellaneous & Icons
  show_icon: !1,
  icon: "",
  icon_type: "none",
  icon_color: "var(--primary-color)",
  icon_shape: "circle",
  icon_animation: "none",
  icon_opacity: 100,
  icon_rotate: 0,
  icon_size: 16,
  icon_margin: -11,
  icon_container_size: 20,
  active_pulse: !1,
  text_alignment: "left",
  content_alignment: "flex-start",
  icon_offset_x: 0,
  icon_offset_y: 0,
  badge_icon: "",
  badge_color: "",
  badge_size: 16,
  badge_offset: -2,
  custom_styles: ""
};
var Yi = Object.defineProperty, Tt = (a, e, t, i) => {
  for (var r = void 0, o = a.length - 1, n; o >= 0; o--)
    (n = a[o]) && (r = n(e, t, r) || r);
  return r && Yi(e, t, r), r;
};
const qi = [
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
], Ki = [
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
], Xi = [
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
], Zi = [
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
], Ji = [
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
], Yt = [
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
function nt(a) {
  return [
    { name: `sub_button_${a}_entity`, selector: { entity: {} } },
    { name: `sub_button_${a}_type`, selector: { select: { options: [
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
      { value: "open_close", label: "Cover: Open/Close Dynamic Toggle" },
      { value: "stop", label: "Cover: Stop Position" },
      { value: "open_tilt", label: "Cover: Open Tilt Position" },
      { value: "close_tilt", label: "Cover: Close Tilt Position" },
      { value: "stop_tilt", label: "Cover: Stop Tilt Position" },
      { value: "cover_preset", label: "Cover: Go to Favorite Preset (50%)" },
      { value: "lock_unlock", label: "Lock: Lock/Unlock Dynamic Toggle" },
      { value: "garage_toggle", label: "Cover: Garage Door Smart Toggle" },
      { value: "fan_speed", label: "Fan: Cycle Speed Preset" },
      { value: "fan_mode", label: "Climate: Cycle Fan Speed Mode" },
      { value: "fan_oscillate", label: "Fan: Toggle Oscillation" },
      { value: "fan_direction", label: "Fan: Toggle Direction (Forward/Reverse)" },
      { value: "swing_mode", label: "Climate: Cycle Vane Swing Mode" },
      { value: "climate_preset", label: "Climate: Cycle Preset (Eco/Comfort/Boost)" },
      { value: "temp_up", label: "Climate: Temperature Step Up (+0.5°C / +1°F)" },
      { value: "temp_down", label: "Climate: Temperature Step Down (-0.5°C / -1°F)" },
      { value: "clean", label: "Vacuum: Start Cleaning" },
      { value: "dock", label: "Vacuum: Return to Base / Dock" },
      { value: "locate", label: "Vacuum: Play Sound / Locate" },
      { value: "vacuum_fan_speed", label: "Vacuum: Cycle Suction Power" },
      { value: "siren_toggle", label: "Siren: Toggle Emergency Siren/Strobe" },
      { value: "hvac_mode", label: "Climate: Cycle Operating Mode" },
      { value: "light_effect", label: "Light: Cycle Color Animation Effect" },
      { value: "dim_up", label: "Light/Number: Step Up (+10% / +Step)" },
      { value: "dim_down", label: "Light/Number: Step Down (-10% / -Step)" },
      { value: "humidity_up", label: "Humidifier: Step Target Up (+5%)" },
      { value: "humidity_down", label: "Humidifier: Step Target Down (-5%)" },
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
    { name: `sub_button_${a}_icon`, selector: { icon: {} } },
    { name: `sub_button_${a}_name`, selector: { text: {} } },
    { name: `sub_button_${a}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${a}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${a}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${a}_tap_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${a}_hold_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${a}_double_tap_action`, selector: { "ui-action": {} } }
  ];
}
const Qi = nt(1), ji = nt(2), er = nt(3), tr = nt(4), ir = [
  { name: "tap_action", selector: { "ui-action": {} } },
  { name: "hold_action", selector: { "ui-action": {} } },
  { name: "double_tap_action", selector: { "ui-action": {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
];
function L(a) {
  if (!a) return;
  if (Array.isArray(a)) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, r))).toString(16).padStart(2, "0");
    return `#${i(a[0] ?? 0)}${i(a[1] ?? 0)}${i(a[2] ?? 0)}`;
  }
  if (typeof a != "string") return;
  if (a.startsWith("#")) return a;
  const e = a.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (e) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, parseInt(r, 10)))).toString(16).padStart(2, "0");
    return `#${i(e[1])}${i(e[2])}${i(e[3])}`;
  }
  const t = a.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/);
  if (t) {
    const i = (r) => Math.round(Math.max(0, Math.min(255, parseInt(r, 10)))).toString(16).padStart(2, "0");
    return `#${i(t[1])}${i(t[2])}${i(t[3])}`;
  }
  return a;
}
function P(a) {
  const e = L(a);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(i) || isNaN(r)))
    return [t, i, r];
}
const rr = {
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
class Me extends le {
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
      i && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(i[1]) * 100)), t.bg_color = L(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = L(t.card_border_color)), t.active_color && (t.active_color = L(t.active_color)), t.inactive_color && (t.inactive_color = L(t.inactive_color)), t.slider_color && (t.slider_color = L(t.slider_color)), t.slider_track_color && (t.slider_track_color = L(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = L(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = L(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = L(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = L(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = L(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = L(t.sub_button_4_color)), this._config = {
      ...vt,
      ...t
    };
  }
  _computeLabel(e) {
    return rr[e.name] || e.name;
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
          const n = i[o.name];
          Array.isArray(n) && n.length === 3 && n.every((s) => typeof s == "number") ? r[o.name] = `rgb(${n[0]}, ${n[1]}, ${n[2]})` : r[o.name] = n;
        }
    } else
      Object.assign(r, i);
    this._config = r, Ae(this, "config-changed", { config: this._config });
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    }, this.requestUpdate();
  }
  _renderSection(e, t, i, r, o) {
    const n = !!this._openPanels[e];
    return S`
      <div class="custom-panel ${n ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${i}</span>
          </div>
          <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${n ? S`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${o}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, r)}
            ></ha-form>
          </div>
        ` : w}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, i, r) {
    const o = `sub${e}`, n = !!this._openPanels[o];
    return S`
      <div class="sub-nested-panel ${n ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(o)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${n ? S`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, i)}
            ></ha-form>
          </div>
        ` : w}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return S``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", i = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", o = this._config?.sub_button_4_entity || "", n = !!this._openPanels.sub_buttons;
    return S`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", qi, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", Ki, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Xi, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", Zi, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Ji, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${n ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${n ? S`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Yt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(s) => this._valueChanged(s, Yt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, Qi, e)}
                ${this._renderSubButtonPanel(2, i, ji, e)}
                ${this._renderSubButtonPanel(3, r, er, e)}
                ${this._renderSubButtonPanel(4, o, tr, e)}
              </div>
            </div>
          ` : w}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", ir, e)}
      </div>
    `;
  }
  static get styles() {
    return Zt`
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
  rt({ attribute: !1 })
], Me.prototype, "hass");
Tt([
  ot()
], Me.prototype, "_config");
Tt([
  ot()
], Me.prototype, "_openPanels");
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", Me);
customElements.get("antigravity-card-editor") || customElements.define("antigravity-card-editor", Me);
var or = Object.defineProperty, nr = Object.getOwnPropertyDescriptor, ue = (a, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? nr(e, t) : e, o = a.length - 1, n; o >= 0; o--)
    (n = a[o]) && (r = (i ? n(e, t, r) : n(r)) || r);
  return i && r && or(e, t, r), r;
};
const ar = "131";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${ar} `,
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
let se = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  se = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (se = Date.now());
}, { passive: !0 }));
const sr = /* @__PURE__ */ new Set([
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
]), lr = /* @__PURE__ */ new Set([
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
]), cr = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), dr = /* @__PURE__ */ new Set([
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
]), ii = /^\d+\s*,\s*\d+\s*,\s*\d+$/, ur = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/, Ke = /* @__PURE__ */ new Map();
function O(a) {
  (isNaN(a) || !isFinite(a)) && (a = 3e3);
  const e = Math.max(1e3, Math.min(4e4, Math.round(a))), t = Ke.get(e);
  if (t) return t;
  const i = e / 100;
  let r, o, n;
  if (i <= 66)
    r = 255;
  else {
    const d = i - 60;
    r = 329.698727446 * Math.pow(d, -0.1332047592), r = Math.max(0, Math.min(255, r));
  }
  if (i <= 66)
    o = i, o = 99.4708025861 * Math.log(o) - 161.1195681661, o = Math.max(0, Math.min(255, o));
  else {
    const d = i - 60;
    o = 288.1221695283 * Math.pow(d, -0.0755148492), o = Math.max(0, Math.min(255, o));
  }
  if (i >= 66)
    n = 255;
  else if (i <= 19)
    n = 0;
  else {
    const d = i - 10;
    n = 138.5177312231 * Math.log(d) - 305.0447927307, n = Math.max(0, Math.min(255, n));
  }
  const s = [Math.round(r), Math.round(o), Math.round(n)];
  return Ke.size > 256 && Ke.clear(), Ke.set(e, s), s;
}
[2e3, 2200, 2500, 2700, 3e3, 3500, 4e3, 4500, 5e3, 5500, 6e3, 6500].forEach((a) => {
  O(a);
});
const Xe = /* @__PURE__ */ new Map();
function Ze(a) {
  if (!Array.isArray(a) || a.length < 3) return "#ffffff";
  const e = `${a[0]},${a[1]},${a[2]}`, t = Xe.get(e);
  if (t) return t;
  const i = "#" + a.slice(0, 3).map((r) => Math.round(Number(r) || 0).toString(16).padStart(2, "0")).join("");
  return Xe.size > 512 && Xe.clear(), Xe.set(e, i), i;
}
function hr(a, e, t) {
  a /= 255, e /= 255, t /= 255;
  const i = Math.max(a, e, t), r = Math.min(a, e, t);
  let o = 0;
  const n = i - r;
  if (n === 0) return 0;
  switch (i) {
    case a:
      o = (e - t) / n + (e < t ? 6 : 0);
      break;
    case e:
      o = (t - a) / n + 2;
      break;
    case t:
      o = (a - e) / n + 4;
      break;
  }
  return Math.round(o * 60);
}
function gt(a, e) {
  a = a % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const t = 1, i = Math.floor(a * 6), r = a * 6 - i, o = t * (1 - e), n = t * (1 - r * e), s = t * (1 - (1 - r) * e);
  let d = 0, p = 0, h = 0;
  switch (i % 6) {
    case 0:
      d = t, p = s, h = o;
      break;
    case 1:
      d = n, p = t, h = o;
      break;
    case 2:
      d = o, p = t, h = s;
      break;
    case 3:
      d = o, p = n, h = t;
      break;
    case 4:
      d = s, p = o, h = t;
      break;
    case 5:
      d = t, p = o, h = n;
      break;
  }
  return [Math.round(d * 255), Math.round(p * 255), Math.round(h * 255)];
}
const yt = [
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
], _r = [
  { k: 2200, label: "2200K", rgb: O(2200) },
  { k: 2700, label: "2700K", rgb: O(2700) },
  { k: 3e3, label: "3000K", rgb: O(3e3) },
  { k: 4e3, label: "4000K", rgb: O(4e3) },
  { k: 5e3, label: "5000K", rgb: O(5e3) },
  { k: 6500, label: "6500K", rgb: O(6500) }
], we = /* @__PURE__ */ new Map(), pr = 200;
function H(a) {
  if (!a) return null;
  const e = a.trim().toLowerCase();
  if (!e) return null;
  const t = we.get(e);
  if (t !== void 0) return t;
  const i = fr(e);
  if (we.size >= pr) {
    const r = we.keys().next().value;
    r && we.delete(r);
  }
  return we.set(e, i), i;
}
function fr(a) {
  if (a.charCodeAt(0) === 35) {
    const e = a.slice(1);
    if (e.length === 6) {
      const t = parseInt(e, 16);
      if (!isNaN(t))
        return [t >> 16 & 255, t >> 8 & 255, t & 255];
    }
    if (e.length === 3) {
      const t = parseInt(e[0] + e[0], 16), i = parseInt(e[1] + e[1], 16), r = parseInt(e[2] + e[2], 16);
      return [t, i, r];
    }
  }
  if (a.startsWith("rgb")) {
    const e = a.indexOf("("), t = a.lastIndexOf(")");
    if (e !== -1 && t !== -1) {
      const i = a.slice(e + 1, t).split(",").map((r) => parseFloat(r.trim()));
      if (i.length >= 3 && !i.slice(0, 3).some(isNaN))
        return [
          Math.max(0, Math.min(255, Math.round(i[0]))),
          Math.max(0, Math.min(255, Math.round(i[1]))),
          Math.max(0, Math.min(255, Math.round(i[2])))
        ];
    }
  }
  if (ii.test(a)) {
    const e = a.split(",").map((t) => parseInt(t.trim(), 10));
    if (e.length >= 3 && !e.some(isNaN))
      return [e[0], e[1], e[2]];
  }
  for (let e = 0; e < yt.length; e++) {
    const t = yt[e];
    if (a === t.label.toLowerCase() || a === t.hex)
      return [t.rgb[0], t.rgb[1], t.rgb[2]];
  }
  return null;
}
function mt(a, e, t) {
  const i = Math.max(0, Math.min(1, t));
  return [
    Math.round(a[0] + (e[0] - a[0]) * i),
    Math.round(a[1] + (e[1] - a[1]) * i),
    Math.round(a[2] + (e[2] - a[2]) * i)
  ];
}
function bt(a) {
  return `rgb(${a[0]}, ${a[1]}, ${a[2]})`;
}
const Je = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function E(a, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if ($e(a), typeof window < "u" && window.dispatchEvent(new CustomEvent("haptic", { detail: a, bubbles: !0, composed: !0 })), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let t = 6;
        a === "heavy" ? t = 20 : a === "medium" ? t = 12 : a === "success" ? t = [40, 40, 80] : a === "warning" ? t = [50, 30, 50] : a === "error" && (t = [50, 100, 50]), navigator.vibrate(t);
      }
    } catch {
    }
}
const ne = /* @__PURE__ */ new Map(), qt = 250, I = /* @__PURE__ */ new Map(), Kt = 128;
function gr(a) {
  if (!a) return "";
  const e = ne.get(a);
  if (e !== void 0) return e;
  const t = a.trim();
  if (!t)
    return ne.set(a, ""), "";
  let i = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? i = t : ii.test(t) ? i = `rgb(${t})` : ur.test(t) ? i = `rgba(${t})` : t.toLowerCase() === "state" ? i = "var(--state-icon-color, var(--primary-color))" : lr.has(t.toLowerCase()) && (i = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), ne.size >= qt) {
    const r = Math.floor(qt / 4), o = ne.keys();
    for (let n = 0; n < r; n++) {
      const s = o.next().value;
      s !== void 0 && ne.delete(s);
    }
  }
  return ne.set(a, i), i;
}
class Y extends le {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), o = Number(t.value) || 0, n = t.style.getPropertyValue("--slider-pct") || "", s = r?.textContent || "";
      this._sliderStateMap.set(t, {
        startX: e.clientX,
        startY: e.clientY,
        initialVal: o,
        initialPct: n,
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
          r < 6 && o < 6 && (this._revertSlider(t, i), E("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
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
    return { ...vt };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...vt,
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
    for (let o = 0; o < r; o++) {
      const n = i[o];
      if (t.states[n] !== this.hass.states[n])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const e = this.config.card_padding ?? 12, t = this.config.card_padding_vertical ?? 4, i = this.config.card_padding_horizontal ?? e, r = this.config.card_padding_top ?? t, o = this.config.card_padding_bottom ?? t, n = this.config.card_padding_left ?? i, s = this.config.card_padding_right ?? i, d = this.config.card_margin, p = this.config.card_margin_vertical ?? d, h = this.config.card_margin_horizontal ?? d, c = this.config.card_margin_top ?? p, v = this.config.card_margin_bottom ?? p, g = this.config.card_margin_left ?? h, x = this.config.card_margin_right ?? h;
    let u = "";
    (c !== void 0 || v !== void 0 || g !== void 0 || x !== void 0) && (u = `margin: ${c ?? 0}px ${x ?? 0}px ${v ?? 0}px ${g ?? 0}px;`);
    const m = this.config.border_radius ?? 12, $ = this.config.slider_style === "google", A = this.config.slider_style === "full", f = $ ? 42 : A ? 40 : 12, y = this.config.slider_height !== void 0 ? this.config.slider_height : f, T = $ ? 21 : A ? 0 : y / 2, l = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : T, _ = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), b = this.config.card_border_style ?? "solid", k = _ > 0 ? `border: ${_}px ${b} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", M = this.config.card_width ? `width: ${this.config.card_width};` : "", B = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", q = this.config.card_height ? `height: ${this.config.card_height};` : "", ee = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", K = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", he = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", Pe = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", Ee = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", De = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", G = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, Le = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, Ne = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Re = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, He = this.config.sub_button_padding ?? 0, Oe = this.config.sub_button_container_padding ?? 0, Be = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "", at = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", st = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      u,
      `border-radius: ${m}px;`,
      k,
      M,
      B,
      q,
      ee,
      K,
      he,
      Pe,
      Ee,
      De,
      `--ag-card-padding: ${r}px ${s}px ${o}px ${n}px;`,
      `--ag-text-padding: ${G}px ${Le}px;`,
      `--ag-features-padding: ${Ne}px ${Re}px;`,
      `--ag-sub-button-padding: ${He}px;`,
      `--ag-sub-button-container-padding: ${Oe}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 12}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? 2}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? 4}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? 6}px;`,
      `--ag-slider-height: ${y}px;`,
      `--ag-slider-radius: ${l}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      Be,
      at,
      st
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const ze = Number(this.config.text_offset_x) || 0, D = Number(this.config.text_offset_y) || 0;
    this._textOffsetStyle = ze !== 0 || D !== 0 ? `transform: translate(${ze}px, ${D}px);` : "";
    const V = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x) || 0, _e = Number(this.config.primary_text_end_offset) || 0, N = Number(this.config.primary_text_offset_y) || 0, pe = V !== 0 || N !== 0 ? `transform: translate(${V}px, ${N}px);` : "", te = V !== 0 || _e !== 0 ? `margin-left: ${V}px; margin-right: ${_e}px;` : "";
    this._primaryTextOffsetStyle = `${pe} ${te}`.trim();
    const ie = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x) || 0, R = Number(this.config.secondary_text_end_offset) || 0, Fe = Number(this.config.secondary_text_offset_y) || 0, lt = ie !== 0 || Fe !== 0 ? `transform: translate(${ie}px, ${Fe}px);` : "", ct = ie !== 0 || R !== 0 ? `margin-left: ${ie}px; margin-right: ${R}px;` : "";
    this._secondaryTextOffsetStyle = `${lt} ${ct}`.trim();
    const Ue = Number(this.config.features_offset_x) || 0, Ie = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = Ue !== 0 || Ie !== 0 ? `transform: translate(${Ue}px, ${Ie}px);` : "";
    const Ge = Number(this.config.slider_start_offset) || 0, Ve = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      Ge ? `margin-left: ${Ge}px !important;` : "",
      Ve ? `margin-right: ${Ve}px !important;` : ""
    ].filter(Boolean).join(" ");
    const re = Number(this.config.color_temp_start_offset) || 0, z = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      re ? `margin-left: ${re}px !important;` : "",
      z ? `margin-right: ${z}px !important;` : ""
    ].filter(Boolean).join(" ");
    const F = Number(this.config.color_slider_start_offset) || 0, We = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      F ? `margin-left: ${F}px !important;` : "",
      We ? `margin-right: ${We}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const dt = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", Ye = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, fe = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", ge = this.config.line_height ? `line-height: ${this.config.line_height};` : "", me = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${me}; ${dt} ${fe} ${ge}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${Ye} ${fe} ${ge}`;
    const ut = this.config.entity, oe = [];
    for (let C = 1; C <= 4; C++) {
      const U = this.config[`sub_button_${C}_entity`], be = this.config[`sub_button_${C}_icon`], qe = this.config[`sub_button_${C}_name`], ht = this.config[`sub_button_${C}_tap_action`], ve = this.config[`sub_button_${C}_hold_action`], ri = this.config[`sub_button_${C}_double_tap_action`], _t = this.config[`sub_button_${C}_type`], oi = this.config[`sub_button_${C}_color`], ni = this.config[`sub_button_${C}_show_background`], At = this.config[`sub_button_${C}_show_state`];
      if (!!(U || be || qe || _t && _t !== "button" || At)) {
        const Mt = U || ut;
        oe.push(Object.freeze({
          key: `${Mt || "sub"}_${C}`,
          entity: Mt,
          type: _t || "button",
          icon: be,
          color: oi,
          bg: ni,
          name: qe,
          showState: At === !0,
          tapAction: ht,
          holdAction: ve,
          doubleTapAction: ri
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(oe), this.config.fade_transition_enabled) {
      const C = Number(this.config.fade_stage_1_duration) || 60, U = Number(this.config.fade_stage_2_duration) || 600, be = Number(this.config.fade_stage_3_duration) || 1800, qe = H(this.config.fade_stage_1_color) || [255, 152, 0], ht = H(this.config.fade_stage_2_color) || [205, 220, 57], ve = H(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: C,
        d2: U,
        d3: be,
        totalDuration: C + U + be,
        c1Rgb: qe,
        c2Rgb: ht,
        c3Rgb: ve,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: ve ? bt(ve) : "",
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
    const i = this.config.entity.split(".")[0] === "light", r = e.state === "on", o = this.config.hide_color_temp_when_off !== !1, n = this.config.hide_color_picker_when_off !== !1, s = this.config.hide_color_slider_when_off !== !1, d = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, p = i && this.config.show_color_temp === !0 && (d !== void 0 || e.attributes?.supported_color_modes?.some(($) => ["color_temp"].includes($))) && (!o || r), h = e.attributes?.supported_color_modes, c = Array.isArray(h) && h.some(($) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes($)), v = this.config.color_picker_type !== "wheel", g = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && v) && c && (!s || r), x = i && this.config.show_color_picker === !0 && !v && c && (!n || r), u = p || g || x, m = this._getSubButtons();
    this._cachedHasCollapsible = u || m.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const e = this.config?.primary_info, t = this.config?.secondary_info, i = this.config?.entity, r = i ? i.split(".")[0] : "", o = (r === "binary_sensor" || r === "timer") && (e === "state" || t === "state"), n = this.config?.fade_transition_enabled === !0, s = i && this.hass ? this.hass.states[i] : null;
    let d = !1;
    if (n && s) {
      const h = this._computeMultiStageFade(s);
      d = h.enabled && h.activeFade && h.progressPct < 100;
    }
    const p = d || o || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (p && !this._relativeTimer) {
      let h = d ? 1e3 : 5e3;
      const c = s?.attributes?.last_triggered || s?.last_changed || s?.last_updated;
      if (c && !d && !o) {
        const v = this._parseDate(c);
        if (v) {
          const g = Math.max(0, (Date.now() - v.getTime()) / 1e3 | 0);
          g > 3600 ? h = 6e4 : g > 60 && (h = 15e3);
        }
      }
      this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute("offscreen") && this.style.display !== "none") {
          if (d && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, h);
    } else !p && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  _isFadeActive() {
    const e = this.config?.entity;
    if (!e || !this.hass) return !1;
    const t = this.hass.states[e];
    if (!t) return !1;
    const i = this._computeMultiStageFade(t);
    return i.enabled && i.activeFade && i.progressPct < 100;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._throttleMap.clear(), this._subTapTimerMap.forEach((e) => clearTimeout(e)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
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
    let o = !1;
    (e === "on" && !r || e === "off" && r) && (o = !0), this._toggleDisplay(o);
  }
  _isEntityActive(e) {
    return e ? sr.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t, i) {
    if (!this.config?.fade_transition_enabled || !e)
      return Je;
    const r = this._isEntityActive(e), o = this.config.fade_trigger ?? "on_inactive";
    if (!(o === "on_inactive" && !r || o === "on_active" && r || o === "both"))
      return Je;
    const s = r ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || t || "#d60000", d = r ? this._resolveColor(this.config.active_color) || t || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", p = H(s) || [214, 0, 0], h = H(d) || [3, 177, 0], c = this._fadeStaticConfig, v = c?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), g = c?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), x = c?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), u = c?.totalDuration ?? v + g + x;
    if (u <= 0)
      return Je;
    this._lastTrackedState !== null && this._lastTrackedState !== e.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = e.state;
    const m = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : p, $ = c?.c1Rgb ?? (H(this.config.fade_stage_1_color) || [255, 152, 0]), A = this.config.fade_stage_2_pickup !== !1 ? $ : p, f = c?.c2Rgb ?? (H(this.config.fade_stage_2_color) || [205, 220, 57]), y = this.config.fade_stage_3_pickup !== !1 ? f : $, T = c?.c3Rgb ?? (H(this.config.fade_stage_3_color) || h), l = this._parseDate(e.last_changed || e.last_updated);
    if (!l)
      return Je;
    const _ = Math.max(0, (Date.now() - l.getTime()) / 1e3);
    if (_ >= u)
      return this._currentLiveRgb = T, this._previousLiveRgb = null, c?.restingResult ? c.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: bt(T),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let b, k = 1, M = 0;
    const B = Math.max(0, Math.round(u - _));
    _ < v && v > 0 ? (k = 1, M = _ / v, b = mt(m, $, M)) : _ < v + g && g > 0 ? (k = 2, M = (_ - v) / g, b = mt(A, f, M)) : x > 0 ? (k = 3, M = (_ - v - g) / x, b = mt(y, T, M)) : (k = 0, b = T), this._currentLiveRgb = b;
    const q = Math.min(100, Math.round(_ / u * 100)), ee = bt(b);
    let K = "";
    return B >= 60 ? K = `${Math.ceil(B / 60)}m left` : K = `${B}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: ee,
      progressPct: q,
      remainingSeconds: B,
      currentStage: k,
      stageLabel: K
    };
  }
  _resolveColor(e) {
    return gr(e);
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
      const t = I.get(e);
      if (t) return t;
      const i = Date.parse(e);
      if (!isNaN(i)) {
        const d = new Date(i);
        if (I.size >= Kt) {
          const p = I.keys().next().value;
          p !== void 0 && I.delete(p);
        }
        return I.set(e, d), d;
      }
      let r = e.trim();
      r.includes(" ") && !r.includes("T") && (r = r.replace(" ", "T")), r.includes("T") && !r.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(r) && !/[+-]\d{4}$/.test(r) && (r += "Z");
      const o = Number(r);
      let n;
      !isNaN(o) && r !== "" && !r.includes("T") ? n = new Date(o > 1e11 ? o : o * 1e3) : n = new Date(r);
      const s = isNaN(n.getTime()) ? null : n;
      if (s) {
        if (I.size >= Kt) {
          const d = I.keys().next().value;
          d !== void 0 && I.delete(d);
        }
        I.set(e, s);
      }
      return s;
    }
    return null;
  }
  _formatTimeAgo(e, t = !1, i) {
    const r = this._parseDate(e);
    if (!r) return "";
    const o = Math.max(0, ((i ?? Date.now()) - r.getTime()) / 1e3 | 0);
    if (o < 5) return t ? "< 5s" : "just now";
    if (o < 60) return t ? `${o}s` : `${o} seconds ago`;
    const n = o / 60 | 0;
    if (n < 60) return t ? `${n}m` : `${n} ${n === 1 ? "minute" : "minutes"} ago`;
    const s = n / 60 | 0;
    if (s < 24) return `${s}h${t ? "" : " ago"}`;
    const d = s / 24 | 0;
    if (d < 7) return `${d}d${t ? "" : " ago"}`;
    const p = d / 7 | 0;
    if (p < 4) return `${p}w${t ? "" : " ago"}`;
    const h = d / 30 | 0;
    return h < 12 ? `${h}mo${t ? "" : " ago"}` : `${d / 365 | 0}y${t ? "" : " ago"}`;
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
        if (r === "timer") {
          if (t.state === "paused")
            return `${t.attributes?.remaining || "Paused"} (Paused)`;
          if (t.state === "active" && t.attributes?.finishes_at) {
            const o = Date.parse(t.attributes.finishes_at);
            if (!isNaN(o)) {
              const n = Math.max(0, Math.round((o - Date.now()) / 1e3)), s = Math.floor(n / 60), d = n % 60, p = Math.floor(s / 60), h = (s % 60).toString().padStart(2, "0"), c = d.toString().padStart(2, "0");
              return p > 0 ? `${p}:${h}:${c}` : `${h}:${c}`;
            }
          }
        }
        if (r === "binary_sensor") {
          const o = t.attributes?.device_class;
          return o === "tamper" && t.state === "on" ? "⚠️ Tamper Detected" : o === "problem" && t.state === "on" ? "⚠️ Problem Detected" : o === "smoke" && t.state === "on" ? "🔥 Smoke Detected!" : o === "gas" && t.state === "on" ? "⚠️ Gas Detected!" : o === "moisture" && t.state === "on" ? "💧 Moisture Detected!" : this._formatForDuration(t.last_changed);
        }
        if (r === "vacuum") {
          const o = t.state;
          let n = o;
          o === "cleaning" ? n = "🧹 Cleaning" : o === "docked" ? n = "🏠 Docked" : o === "returning" ? n = "🔄 Returning" : o === "paused" ? n = "⏸️ Paused" : o === "error" && (n = "⚠️ Error");
          const s = t.attributes?.battery_level;
          return s !== void 0 ? `${n} • 🔋${s}%` : n;
        }
        if (r === "weather") {
          const o = t.attributes?.temperature, n = this.hass.config?.unit_system?.temperature || "°F", s = (t.state || "").replace(/-/g, " ");
          return o !== void 0 ? `${o}${n} • ${s}` : s;
        }
        if (r === "climate") {
          const o = t.state || "", n = t.attributes?.current_temperature, s = t.attributes?.temperature ?? t.attributes?.target_temp_high, d = t.attributes?.unit_of_measurement || this.hass.config?.unit_system?.temperature || "°", p = t.attributes?.preset_mode, h = t.attributes?.hvac_action, v = [n !== void 0 && s !== void 0 ? `${n}${d} → ${s}${d}` : s !== void 0 ? `${s}${d}` : "", h, p].filter(Boolean).join(" • ");
          return v ? `${o} (${v})` : o;
        }
        if (r === "fan") {
          const o = t.attributes?.percentage, n = t.attributes?.oscillating ? "∿ Oscillating" : "", s = t.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [o !== void 0 ? `${o}%` : t.state, n, s].filter(Boolean).join(" • ");
        }
        if (r === "alarm_control_panel") {
          const o = t.state;
          if (o === "armed_home") return "🛡️ Armed Home";
          if (o === "armed_away") return "🛡️ Armed Away";
          if (o === "disarmed") return "Disarmed";
          if (o === "triggered") return "⚠️ TRIGGERED";
          if (o === "pending") return "⏳ Arming Pending...";
          if (o === "arming") return "⏳ Arming...";
        }
        if (r === "lock") {
          if (t.state === "locked") return "Locked";
          if (t.state === "unlocked") return "Unlocked";
          if (t.state === "jammed") return "Jammed (Alert!)";
          if (t.state === "locking") return "Locking...";
          if (t.state === "unlocking") return "Unlocking...";
        }
        if (r === "button" || r === "input_button")
          return "Press to run";
        if (r === "light" && t.state === "on") {
          const o = t.attributes?.brightness, n = o !== void 0 ? Math.round(o / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${n}% • ${t.attributes.color_temp_kelvin}K`;
        }
        if (t.attributes?.device_class === "timestamp" || t.attributes?.device_class === "date" || typeof t.state == "string" && (t.state.includes("T") || t.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(t.state))) {
          const o = this._formatRelativeTime(t.state);
          if (o) return o;
        }
        if (t.attributes?.display_precision !== void 0 && !isNaN(Number(t.state))) {
          const o = Number(t.attributes.display_precision), n = Number(t.state).toFixed(o), s = t.attributes?.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "";
          return `${n}${s}`;
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
            let n = "#4caf50";
            return o <= 20 ? n = "#f44336" : o <= 50 && (n = "#ff9800"), S`<span style="color: ${n}; font-weight: bold;">${o}%</span>`;
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
  _dispatchAction(e, t, i) {
    const r = i || this.config.entity, o = r ? r.split(".")[0] : "", n = dr.has(o);
    let s = t;
    if (s || (e === "double_tap" ? s = this.config.double_tap_action : e === "hold" ? s = this.config.hold_action || (n ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? n && this.config.tap_action.action === "toggle" ? s = { action: "none" } : s = this.config.tap_action : s = n ? { action: "none" } : { action: "toggle" }), !(!s || s.action === "none")) {
      if (s.action === "more-info") {
        const d = s.entity || r;
        if (d) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: d },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (s.action === "toggle" && r) {
        if (n)
          return;
        const d = o === "lock" ? this._isEntityActive(this.hass?.states[r]) ? "lock" : "unlock" : "toggle", p = ["lock", "cover"].includes(o) ? o : o === "group" ? "homeassistant" : o;
        this.hass?.callService(p, d, { entity_id: r });
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
        const [d, p] = s.service.split(".", 2);
        this.hass?.callService(d, p, s.data || s.service_data || {}, s.target);
        return;
      }
      n && (!s.action || s.action === "toggle") || Wi(this, this.hass, { ...this.config, entity: r }, e);
    }
  }
  _handleTap(e) {
    if (e.stopPropagation(), this._isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - se < 800) {
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
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - se < 800 || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), E("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(e) {
    if (e.preventDefault(), e.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - se < 800 || this._held) return;
    E("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - se < 800 || this._activePointerId !== null && this._activePointerId !== e.pointerId || (this._activePointerId = e.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = e.clientX, this._startY = e.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), E("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(e) {
    if (this._isSubElement(e) || this._activePointerId !== null && this._activePointerId !== e.pointerId) return;
    const t = e.clientX - this._startX, i = e.clientY - this._startY, r = Math.hypot(t, i), o = Math.max(1, Date.now() - this._pointerDownTime), n = r / o;
    (r > 8 || n > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
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
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, E("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
    }, 500);
  }
  _handleSubPointerMove(e) {
    e.stopPropagation();
    const t = e.clientX - this._subStartX, i = e.clientY - this._subStartY, r = Math.hypot(t, i), o = Math.max(1, Date.now() - this._subPointerDownTime), n = r / o;
    (r > 8 || n > 0.5) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
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
    const n = r && r.action !== "none", s = t || "sub_default", d = () => {
      E("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, t) : o ? o() : this._dispatchAction("tap", { action: "toggle" }, t);
    };
    if (!n) {
      d();
      return;
    }
    const p = this._subTapTimerMap.get(s);
    if (p) {
      clearTimeout(p), this._subTapTimerMap.delete(s), E("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", r, t);
      return;
    }
    const h = setTimeout(() => {
      this._subTapTimerMap.delete(s), d();
    }, 250);
    this._subTapTimerMap.set(s, h);
  }
  _handleSubContextMenu(e, t, i) {
    e.preventDefault(), e.stopPropagation(), !this._subHeld && (E("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(e, t, i = 100) {
    const r = this._throttleMap.get(e) ?? 0, o = Date.now();
    if (!(o - r < i)) {
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
    const r = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    r && (r.textContent = t.initialBadge);
  }
  _sliderInput(e, t, i, r, o, n, s) {
    e.stopPropagation();
    const d = e.target, p = this._sliderStateMap.get(d);
    if (p?.isScrolling) {
      this._revertSlider(d, p);
      return;
    }
    const h = Number(d.value), c = isNaN(h) ? 0 : h, v = n ? n(c) : c;
    if (p) {
      if (p.rafPending) return;
      p.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (p && (p.rafPending = !1), p?.isScrolling) {
        this._revertSlider(d, p);
        return;
      }
      d.style.setProperty("--slider-pct", `${v}%`);
      const g = d.closest(".slider-container, .sub-button-slider-container"), x = g?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (x && (x.textContent = s ? s(c, v) : `${v}%`), t === "color_hue" && g) {
        g.style.setProperty("--color-hue-val", `hsl(${c}, 100%, 50%)`);
        const u = g.querySelector(".color-chip-badge span");
        u && (u.style.background = `hsl(${c}, 100%, 50%)`);
      }
    }), E("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(e, t, i, r) {
    e.stopPropagation();
    const o = e.target, n = this._sliderStateMap.get(o);
    if (n?.isScrolling) {
      this._revertSlider(o, n), n.isScrolling = !1;
      return;
    }
    const s = Number(o.value), d = isNaN(s) ? 0 : s;
    if (!(n && d === n.initialVal)) {
      if (t === "light" && i === "turn_on") {
        const p = Math.round(d / 255 * 100);
        if (d <= 3 || p <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (t === "fan" && i === "set_percentage" && d <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(t, i, { entity_id: this.config.entity, ...r(d) });
    }
  }
  _getLightLiveColor(e) {
    if (!e || !e.attributes || e.state !== "on") return null;
    const t = e.attributes;
    if (t.color_mode === "color_temp") {
      const r = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [o, n, s] = O(r);
      return `rgb(${o}, ${n}, ${s})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [r, o, n] = gt(t.hs_color[0], t.hs_color[1]);
      return `rgb(${r}, ${o}, ${n})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const r = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [o, n, s] = O(r);
      return `rgb(${o}, ${n}, ${s})`;
    }
    return e.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(e) {
    if (!e?.attributes || e.state !== "on") return "#ffffff";
    const t = e.attributes;
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return Ze(t.rgb_color);
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2)
      return Ze(gt(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const o = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return Ze(O(o));
    }
    const i = this._getLightLiveColor(e);
    if (!i) return "#ffffff";
    const r = H(i);
    return r ? Ze(r) : "#ffffff";
  }
  _getLiveHue(e) {
    if (!e) return 0;
    if (Array.isArray(e.attributes?.hs_color) && e.attributes.hs_color.length >= 1)
      return Math.round(e.attributes.hs_color[0]) % 360;
    if (Array.isArray(e.attributes?.rgb_color) && e.attributes.rgb_color.length >= 3) {
      const [t, i, r] = e.attributes.rgb_color;
      return hr(t, i, r);
    }
    return 0;
  }
  _handleColorInput(e, t, i, r) {
    e.stopPropagation();
    const o = e.target.value;
    if (!o) return;
    const n = H(o);
    if (!n) return;
    const s = i || this.config.entity, d = () => {
      this.hass.callService("light", "turn_on", { entity_id: s, rgb_color: n });
    };
    t ? this._throttledCall(r || "color_picker", d) : d();
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
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", r = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", o = this._isEntityActive(t), n = e.split(".")[0];
    let s = "var(--primary-color)", d = null;
    n === "climate" ? t.state === "heat" ? s = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? s = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? s = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (s = "var(--state-climate-fan_only-color, #26a69a)") : n === "light" ? (d = this._getLightLiveColor(t), d && (s = d)) : (n === "binary_sensor" || n === "lock" || n === "switch") && (s = "#d60000");
    const p = this.config.color_type === "card";
    let h = this._resolveColor(this.config.active_color);
    (!h || this.config.use_light_color) && (n === "light" && d ? h = d : h = s);
    let c = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    n === "light" ? c = "#000000" : (n === "binary_sensor" || n === "lock" || n === "switch") && (c = "#03b500");
    const v = this._resolveColor(this.config.inactive_color) || c, g = this.config.show_slider !== !1, x = n === "light", u = n === "cover", m = n === "fan", $ = n === "humidifier", A = n === "media_player", f = n === "number" || n === "input_number", y = n === "climate", T = this.config.hide_slider_when_off !== !1, l = this.config.hide_color_temp_when_off !== !1, _ = this.config.hide_color_picker_when_off !== !1, b = this.config.hide_color_slider_when_off !== !1, k = t.attributes?.supported_color_modes;
    let M = t.attributes?.brightness !== void 0, B = !1, q = !1;
    if (Array.isArray(k))
      for (let C = 0; C < k.length; C++) {
        const U = k[C];
        U !== "onoff" && (M = !0), U === "color_temp" && (B = !0), cr.has(U) && (q = !0);
      }
    const ee = x && g && M && (!T || o), K = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, he = x && this.config.show_color_temp === !0 && (K !== void 0 || B) && (!l || o), Pe = this.config.color_picker_type !== "wheel", Ee = x && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && Pe) && q && (!b || o), De = x && this.config.show_color_picker === !0 && !Pe && q && (!_ || o), G = t.state !== "unavailable" && t.state !== "unknown", Le = u && G && g && t.attributes?.current_position !== void 0, Ne = m && G && o && g && t.attributes?.percentage !== void 0, Re = $ && G && o && g && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), He = A && G && o && g && t.attributes?.volume_level !== void 0, Oe = f && G && g, Be = y && G && o && g && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), at = (this.config.bg_opacity ?? 10) / 100, st = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : p && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${h};`, ze = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : p && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", D = this._calculateMultiStageFade(t, s, v), V = this.config.fade_target ?? "card", _e = this._resolveColor(this.config.bg_color);
    let N;
    D.activeFade && (V === "card" || V === "all" || p) ? N = D.currentColor : p ? n === "light" ? N = o ? d || h : this.config.inactive_color ? v : "#000000" : N = o ? h : v : _e ? N = _e : n === "light" && !o ? N = "#000000" : N = `rgba(150, 150, 150, ${at})`;
    let pe = this._resolveColor(this.config.active_color) || (n === "light" && d ? d : h) || "var(--primary-color)";
    D.activeFade && (V === "all" || this.config.active_glow === !0) && (pe = D.currentColor);
    let te = "";
    this.config.box_shadow === "soft" && (te = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (te = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (te = o || D.activeFade ? `box-shadow: 0 0 22px ${pe}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const ie = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", R = t?.attributes?.device_class, Fe = n === "binary_sensor" && (R === "motion" || R === "occupancy" || R === "presence"), lt = n === "binary_sensor" && (R === "door" || R === "window" || R === "garage_door" || R === "opening"), ct = Fe && (o || D.activeFade && D.currentStage === 1) ? "motion-active" : "", Ue = lt && o ? "door-open" : "", Ie = n === "climate" && t?.attributes?.hvac_action ? `hvac-${t.attributes.hvac_action}` : "", Ge = n === "cover" ? t?.state === "opening" ? "cover-opening" : t?.state === "closing" ? "cover-closing" : "" : "", Ve = `${this._staticCardClasses} ${ie} ${ct} ${Ue} ${Ie} ${Ge}`, re = this._getSubButtons();
    this.config.font_weight_primary;
    let z = "";
    this.config.text_color_mode === "active_accent" && o ? z += `--primary-text-color: ${h}; ` : this.config.text_color_primary ? z += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : p && o && (z += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? z += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : p && o && (z += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const F = this.config.features_position === "inline", We = this.config.text_scrolling_primary || "none", dt = this.config.text_scrolling_secondary || "none", Ye = S`
      ${ee ? this._renderLightSlider(t) : w}
      ${Le ? this._renderCoverSlider(t) : w}
      ${Ne ? this._renderFanSlider(t) : w}
      ${Re ? this._renderHumidifierSlider(t) : w}
      ${He ? this._renderMediaSlider(t) : w}
      ${Oe ? this._renderNumberSlider(t) : w}
      ${Be ? this._renderClimateSlider(t) : w}
    `, fe = S`
      ${he ? this._renderColorTempSlider(t) : w}
      ${Ee ? this._renderColorSlider(t) : w}
      ${De ? this._renderColorPicker(t) : w}
    `, ge = ee || Le || Ne || Re || He || Oe || Be, me = he || Ee || De, ut = !F && me || re.length > 0, oe = this.config.decay_slider_position ?? "bottom";
    return S`
      ${this.config.custom_styles ? S`<style>${this.config.custom_styles}</style>` : w}
      <ha-card 
        class="${Ve}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${N}; ${te} ${st} ${ze} ${z} --ag-glow-color: ${pe}; --ag-active-color: ${h};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${F ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${oe === "top" ? this._renderDecaySlider(D) : w}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${i ? S`
                <div class="text-marquee-container scroll-${We}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : w}
              ${r ? S`
                <div class="text-marquee-container scroll-${dt}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${r}</span>
                </div>` : w}
            </div>
            ${oe === "inline" ? S`<div class="inline-sliders">${this._renderDecaySlider(D)}</div>` : w}
            ${F && ge ? S`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${Ye}</div>` : w}
            ${F && me ? S`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${fe}</div>` : w}
          </div>
          
          ${oe === "bottom" ? this._renderDecaySlider(D) : w}
          ${!F && ge ? S`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${Ye}</div>` : w}

          ${ut ? S`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!F && me ? S`<div class="features-container" style="${this._featuresOffsetStyle}">${fe}</div>` : w}

              ${re.length > 0 ? S`
                <div class="sub-buttons-container">
                  ${Bi(
      re,
      (C) => C.key,
      (C) => this._renderSubButton(C.entity || "", C.icon, C.color, C.bg !== !1, C.name, C.tapAction, C.holdAction, C.type, C.doubleTapAction, C.showState)
    )}
                </div>
              ` : w}
            </div>
          ` : w}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(e) {
    if (!this.config.show_decay_slider || !e.enabled || !e.activeFade)
      return w;
    const t = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (t ? 32 : 10), r = this.config.slider_border_radius ?? (t ? 16 : 5), o = Math.max(0, 100 - e.progressPct);
    return S`
      <div class="decay-slider-container" style="--decay-color: ${e.currentColor};">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${r}px;">
          <div class="decay-slider-fill" style="width: ${o}%; background: ${e.currentColor}; border-radius: ${r}px;"></div>
          <span class="decay-slider-badge">${e.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(e, t, i, r, o, n, s, d, p, h, c, v, g = "", x = "", u) {
    const m = this.config.slider_style === "google", $ = m && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, A = v ? v(n, s) : `${s}%`, f = u !== void 0 ? u : A, y = this.config.slider_stepped_movement === !1 ? "any" : o, T = e !== "color_temp" && e !== "color_hue", l = this.config.slider_style === "full", _ = T && l ? "main-slider-full" : "";
    let b = "";
    if (T && l) {
      const k = Number(this.config.slider_start_offset) || 0, M = Number(this.config.slider_end_offset) || 0;
      b = `left: ${k}px !important; right: ${M}px !important; width: calc(100% - ${k + M}px) !important;`;
    } else e === "color_temp" ? b = this._colorTempMarginOffsets : e === "color_hue" ? b = this._colorHueMarginOffsets : b = this._mainSliderMarginOffsets;
    return S`
      <div class="slider-container ${g} ${_} ${m ? "slider-google-wrap" : ""}" style="${b} ${x}">
        <input type="range" min=${i} max=${r} step=${y} .value=${n}
               aria-label="${t}"
               style="--slider-pct: ${s}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(k) => this._sliderInput(k, e, d, p, h, c, v)}
               @change=${(k) => this._sliderChange(k, d, p, h)} />
        ${$ && f ? S`<span class="slider-percent-badge">${f}</span>` : w}
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(e) {
    const t = this._isEntityActive(e), i = e.attributes.brightness ?? 0, r = Math.max(0, Math.min(100, Math.round(i / 255 * 100))), o = this._getLightLiveColor(e), n = (this.config.use_light_color !== !1 || !this.config.slider_color) && o ? `--slider-color: ${o};` : "";
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
      (s, d) => !t || d <= 0 ? "" : `${d}%`,
      "",
      n
    );
  }
  _renderColorTempSlider(e) {
    const t = this.config.color_temp_type || "gradient", i = e.attributes.color_temp_kelvin !== void 0 || e.attributes.min_color_temp_kelvin !== void 0 || e.attributes.max_color_temp_kelvin !== void 0, r = i ? e.attributes.min_color_temp_kelvin || 2e3 : e.attributes.min_mireds || 153, o = i ? e.attributes.max_color_temp_kelvin || 6500 : e.attributes.max_mireds || 500, n = i ? e.attributes.color_temp_kelvin || 3e3 : e.attributes.color_temp || 300, s = o - r, d = s > 0 ? Math.max(0, Math.min(100, Math.round((n - r) / s * 100))) : 0, p = i ? "color_temp_kelvin" : "color_temp", h = t === "google" || t === "gradient" && this.config.slider_style === "google", c = h ? 42 : t === "thin" ? 6 : 12, v = h ? 21 : t === "thin" ? 3 : 6, g = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? c, x = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? v, u = i ? `${n} K` : `${n} mireds`;
    if (t === "presets") {
      const m = Number(this.config.color_temp_start_offset) || 0, $ = Number(this.config.color_temp_end_offset) || 0, A = [
        m ? `margin-left: ${m}px;` : "",
        $ ? `margin-right: ${$}px;` : ""
      ].filter(Boolean).join(" ");
      return S`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${A}">
          ${_r.map((f) => {
        const [y, T, l] = f.rgb, _ = Math.abs(n - f.k) < 200, b = () => {
          E("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, [p]: f.k });
        };
        return S`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${f.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${g}px; border-radius: ${x}px; border: ${_ ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${y}, ${T}, ${l}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${_ ? "0 0 8px rgba(" + y + "," + T + "," + l + ", 0.8)" : "none"};"
                @keydown=${(k) => {
          (k.key === "Enter" || k.key === " ") && (k.preventDefault(), k.stopPropagation(), b());
        }}
                @click=${(k) => {
          k.stopPropagation(), b();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${y}, ${T}, ${l}); display: inline-block;"></span>
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
      n,
      d,
      "light",
      "turn_on",
      (m) => ({ [p]: m }),
      (m) => s > 0 ? Math.round((m - r) / s * 100) : 0,
      (m) => i ? `${m} K` : `${m} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${h ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${g}px; --ag-slider-radius: ${x}px;`,
      u
    );
  }
  _renderColorSlider(e) {
    const t = this.config.color_picker_type || "slider";
    if (t === "wheel")
      return this._renderColorPicker(e);
    if (t === "swatches") {
      const h = this._getLiveHex(e).toLowerCase(), c = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, v = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, g = Number(this.config.color_slider_start_offset) || 0, x = Number(this.config.color_slider_end_offset) || 0, u = [
        g ? `margin-left: ${g}px;` : "",
        x ? `margin-right: ${x}px;` : ""
      ].filter(Boolean).join(" ");
      return S`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${u}">
          ${yt.map((m) => {
        const $ = h === m.hex.toLowerCase(), A = () => {
          E("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: m.rgb });
        };
        return S`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${m.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${m.label}"
                style="flex: 1; min-width: 28px; height: ${c}px; border-radius: ${v}px; background: ${m.hex}; border: ${$ ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${$ ? "0 0 10px " + m.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @keydown=${(f) => {
          (f.key === "Enter" || f.key === " ") && (f.preventDefault(), f.stopPropagation(), A());
        }}
                @click=${(f) => {
          f.stopPropagation(), A();
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this.config.slider_style === "google", r = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? (i ? 42 : 36), o = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? (i ? 21 : 8), n = this._getLiveHue(e), s = `hsl(${n}, 100%, 50%)`, d = Math.round(n / 360 * 100);
    let p;
    return this.config.color_swatch_presets !== !1 && (p = S`
        <div class="color-swatch-chips">
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Red Color" style="background: #f44336;" @click=${(h) => {
      h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [244, 67, 54] });
    }} @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [244, 67, 54] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Orange Color" style="background: #ff9800;" @click=${(h) => {
      h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [255, 152, 0] });
    }} @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [255, 152, 0] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Yellow Color" style="background: #ffeb3b;" @click=${(h) => {
      h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [255, 235, 59] });
    }} @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [255, 235, 59] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Green Color" style="background: #4caf50;" @click=${(h) => {
      h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [76, 175, 80] });
    }} @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [76, 175, 80] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Cyan Color" style="background: #00bcd4;" @click=${(h) => {
      h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [0, 188, 212] });
    }} @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [0, 188, 212] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Blue Color" style="background: #2196f3;" @click=${(h) => {
      h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [33, 150, 243] });
    }} @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [33, 150, 243] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Purple Color" style="background: #9c27b0;" @click=${(h) => {
      h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [156, 39, 176] });
    }} @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [156, 39, 176] }));
    }}></span>
          <span class="color-swatch-chip" role="button" tabindex="0" aria-label="Set Pink Color" style="background: #e91e63;" @click=${(h) => {
      h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [233, 30, 99] });
    }} @keydown=${(h) => {
      (h.key === "Enter" || h.key === " ") && (h.preventDefault(), h.stopPropagation(), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: [233, 30, 99] }));
    }}></span>
        </div>
      `), this._renderGenericSlider(
      "color_hue",
      "Light Color Hue",
      0,
      360,
      1,
      n,
      d,
      "light",
      "turn_on",
      (h) => {
        const [c, v, g] = gt(h, 100);
        return { rgb_color: [c, v, g] };
      },
      (h) => Math.round(h / 360 * 100),
      (h) => `${h}°`,
      `color-hue ${i ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${r}px; --ag-slider-radius: ${o}px; --color-hue-val: ${s};`,
      p
    );
  }
  _renderColorPicker(e) {
    const t = this._getLiveHex(e), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, r = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return S`
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
      (r) => {
        const o = i > 1 ? Math.round(r / i) * i : r;
        return { percentage: Math.min(100, Math.max(0, o)) };
      },
      (r) => r,
      (r, o) => `${o}%`
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
      (o) => ({ volume_level: o / 100 }),
      (o) => o,
      (o, n) => t ? "Muted" : `${n}%`,
      "media",
      "",
      r
    );
  }
  _renderNumberSlider(e) {
    const t = Number(e.attributes.min ?? 0);
    let i = Number(e.attributes.max ?? 100);
    t >= i && (i = t + 100);
    const r = Number(e.attributes.step ?? 1), o = Number(e.state), n = isNaN(o) ? t : o, s = i - t, d = s > 0 ? Math.max(0, Math.min(100, Math.round((n - t) / s * 100))) : 0, p = (this.config.entity || "number").split(".")[0], h = e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : "", c = r.toString(), v = c.includes(".") ? c.split(".")[1].length : 0;
    return this._renderGenericSlider(
      "number",
      "Value",
      t,
      i,
      r,
      n,
      d,
      p,
      "set_value",
      (g) => ({ value: v > 0 ? Number(g.toFixed(v)) : Math.round(g) }),
      (g) => s > 0 ? Math.round((g - t) / s * 100) : 0,
      (g) => `${v > 0 ? Number(g).toFixed(v) : Math.round(Number(g))}${h}`
    );
  }
  _renderClimateSlider(e) {
    const t = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = t ? "°F" : "°C", r = t ? 60 : 16, o = t ? 85 : 30, n = e.attributes.min_temp ?? r, s = e.attributes.max_temp ?? o, d = e.attributes.target_temp_step ?? e.attributes.target_temperature_step ?? (t ? 1 : 0.5), p = e.attributes.target_temp_low !== void 0 && e.attributes.target_temp_high !== void 0, h = e.attributes.temperature ?? e.attributes.target_temp_low ?? e.attributes.target_temp_high ?? n, c = s - n, v = c > 0 ? Math.max(0, Math.min(100, Math.round((h - n) / c * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      n,
      s,
      d,
      h,
      v,
      "climate",
      "set_temperature",
      (g) => p ? { target_temp_low: g, target_temp_high: Math.min(s, g + (t ? 4 : 2)) } : { temperature: g },
      (g) => c > 0 ? Math.round((g - n) / c * 100) : 0,
      (g) => `${g}${i}`,
      "climate-temp",
      "",
      `${h}${i}`
    );
  }
  _renderHumidifierSlider(e) {
    const t = e.attributes?.min_humidity ?? 0, i = e.attributes?.max_humidity ?? 100, r = e.attributes?.humidity ?? e.attributes?.target_humidity ?? t, o = i - t, n = o > 0 ? Math.max(0, Math.min(100, Math.round((r - t) / o * 100))) : 0;
    return this._renderGenericSlider(
      "humidifier",
      "Humidity",
      t,
      i,
      1,
      r,
      n,
      "humidifier",
      "set_humidity",
      (s) => ({ humidity: s }),
      (s) => o > 0 ? Math.round((s - t) / o * 100) : 0,
      (s, d) => `${d}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(e, t, i, r, o) {
    const n = t || this.hass.states[this.config.entity || ""], s = e || this.config.entity || "", d = n?.attributes?.volume_level !== void 0 || n?.entity_id?.startsWith("media_player."), p = n?.attributes?.percentage !== void 0 || n?.entity_id?.startsWith("fan."), h = n?.attributes?.current_position !== void 0 || n?.entity_id?.startsWith("cover.");
    let c = 0, v = 0, g = 255, x = "1", u = "turn_on", m = "light", $ = "brightness";
    d ? (c = n?.attributes?.volume_level ?? 0, g = 1, x = "0.01", u = "set_volume_level", m = "media_player", $ = "volume_level") : p ? (c = n?.attributes?.percentage ?? 0, g = 100, x = "1", u = "set_percentage", m = "fan", $ = "percentage") : h ? (c = n?.attributes?.current_position ?? 0, g = 100, x = "1", u = "set_cover_position", m = "cover", $ = "position") : c = n?.attributes?.brightness ?? 0;
    const A = Math.round(g === 1 ? c * 100 : g === 100 ? c : c / 255 * 100);
    return i === "slider" ? S`
        <div class="sub-button-slider-container ${o}" style="${r}" title="Level: ${A}%">
          <input type="range" 
                 min="${v}" 
                 max=${g} 
                 step=${x} 
                 .value=${c}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const y = parseFloat(f.target.value), T = Math.round(g === 1 ? y * 100 : g === 100 ? y : y / 255 * 100), l = f.target.closest(".sub-button-slider-container");
      l && l.setAttribute("title", `Level: ${T}%`), this._throttledCall("sub_slider_" + s, () => {
        this.hass?.callService(m, u, { entity_id: s, [$]: y });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const y = parseFloat(f.target.value);
      this.hass?.callService(m, u, { entity_id: s, [$]: y });
    }} />
        </div>
      ` : S`
        <div class="sub-button-google-slider ${o}" style="${r} --slider-pct: ${A}%;" title="Level: ${A}%">
          <input type="range" 
                 min="${v}" 
                 max=${g} 
                 step=${x} 
                 .value=${c}
                 style="--slider-pct: ${A}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const y = parseFloat(f.target.value), T = Math.round(g === 1 ? y * 100 : g === 100 ? y : y / 255 * 100), l = f.target;
      requestAnimationFrame(() => {
        l.style.setProperty("--slider-pct", `${T}%`);
        const _ = l.closest(".sub-button-google-slider");
        if (_) {
          _.style.setProperty("--slider-pct", `${T}%`), _.setAttribute("title", `Level: ${T}%`);
          const b = _.querySelector(".sub-slider-pct");
          b && (b.textContent = `${T}%`);
        }
      }), this._throttledCall("sub_slider_" + s, () => {
        this.hass?.callService(m, u, { entity_id: s, [$]: y });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const y = parseFloat(f.target.value);
      this.hass?.callService(m, u, { entity_id: s, [$]: y });
    }} />
          <span class="sub-slider-pct">${A}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(e, t, i, r, o, n) {
    const s = t || this.hass.states[this.config.entity || ""], d = this._getLiveHex(s);
    return S`
      <div class="sub-button sub-color-picker ${r}" 
           tabindex="0" 
           role="button" 
           title="Select Color (${d})" 
           style="${i} background: ${d} !important; border: 2px solid rgba(255,255,255,0.7); box-shadow: 0 1px 4px rgba(0,0,0,0.3);"
           @keydown=${(p) => {
      (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.currentTarget.querySelector("input")?.click());
    }}>
        <input type="color" 
               aria-label="Color Picker"
               .value=${d} 
               @input=${(p) => this._handleColorInput(p, !0, e || this.config.entity, "sub_color_picker_" + e)}
               @change=${(p) => this._handleColorInput(p, !1, e || this.config.entity)} />
        ${o ? S`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${o}</span>` : w}
        ${n ? S`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${n}</span>` : w}
      </div>
    `;
  }
  _renderSubButton(e, t, i, r = !0, o, n, s, d = "button", p, h = !1) {
    const c = e ? this.hass?.states[e] : this.hass?.states[this.config.entity || ""], v = this._isEntityActive(c);
    if (d === "slider" || d === "google_slider") {
      const l = i ? `--primary-color: ${i}; --slider-color: ${i};` : "", _ = r ? "" : "no-bg";
      return this._renderSubSlider(e, c, d, l, _);
    }
    let g;
    h && c && (g = this._getInfoContent("state", c));
    const x = (e || this.config.entity || "").split(".")[0];
    if (d === "color_picker" && (x === "light" || !e && this.config.entity?.startsWith("light."))) {
      const l = i ? `color: ${i};` : "", _ = r ? "" : "no-bg";
      return this._renderSubColorPicker(e, c, l, _, o, g);
    }
    let u = t, m = "", $ = v, A = "", f = o, y;
    if (n && n.action && n.action !== "none" && n.action !== "default")
      u || (u = c?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (d) {
        case "play_pause": {
          const l = c?.state === "playing";
          $ = l, u || (u = l ? "mdi:pause" : "mdi:play"), m = l ? "Pause" : "Play", y = () => {
            this.hass?.callService("media_player", "media_play_pause", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "next": {
          u || (u = "mdi:skip-next"), m = "Next Track", y = () => {
            this.hass?.callService("media_player", "media_next_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "previous": {
          u || (u = "mdi:skip-previous"), m = "Previous Track", y = () => {
            this.hass?.callService("media_player", "media_previous_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "vol_up": {
          u || (u = "mdi:volume-plus"), m = "Volume +5%", f || (f = "+5%"), y = () => {
            this.hass?.callService("media_player", "volume_up", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "vol_down": {
          u || (u = "mdi:volume-minus"), m = "Volume -5%", f || (f = "-5%"), y = () => {
            this.hass?.callService("media_player", "volume_down", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "mute": {
          const l = c?.attributes?.is_volume_muted === !0;
          $ = l, u || (u = l ? "mdi:volume-off" : "mdi:volume-high"), m = l ? "Unmute" : "Mute", y = () => {
            this.hass?.callService("media_player", "volume_mute", { entity_id: e || this.config.entity, is_volume_muted: !l });
          };
          break;
        }
        case "source": {
          const l = c?.attributes?.source || "", _ = c?.attributes?.source_list || [], b = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
          u || (u = "mdi:import"), m = `Source: ${l} -> ${b}`, f || (f = l || "Source"), y = () => {
            b && this.hass?.callService("media_player", "select_source", { entity_id: e || this.config.entity, source: b });
          };
          break;
        }
        case "sound_mode": {
          const l = c?.attributes?.sound_mode || "", _ = c?.attributes?.sound_mode_list || [], b = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
          u || (u = "mdi:surround-sound"), m = `Sound: ${l} -> ${b}`, f || (f = l || "Sound"), y = () => {
            b && this.hass?.callService("media_player", "select_sound_mode", { entity_id: e || this.config.entity, sound_mode: b });
          };
          break;
        }
        case "shuffle": {
          const l = c?.attributes?.shuffle === !0;
          $ = l, u || (u = l ? "mdi:shuffle" : "mdi:shuffle-disabled"), m = l ? "Shuffle: On" : "Shuffle: Off", y = () => {
            this.hass?.callService("media_player", "shuffle_set", { entity_id: e || this.config.entity, shuffle: !l });
          };
          break;
        }
        case "repeat": {
          const l = c?.attributes?.repeat || "off", _ = ["off", "all", "one"], b = _[(_.indexOf(l) + 1) % _.length] || "off";
          $ = l !== "off", u || (u = l === "one" ? "mdi:repeat-once" : l === "all" ? "mdi:repeat" : "mdi:repeat-off"), m = `Repeat: ${l} -> ${b}`, f || (f = l), y = () => {
            this.hass?.callService("media_player", "repeat_set", { entity_id: e || this.config.entity, repeat: b });
          };
          break;
        }
        case "chime": {
          u || (u = "mdi:bell-ring-outline"), m = "Play Chime", y = () => {
            this.hass?.callService("chime_tts", "say", { entity_id: e || this.config.entity, message: "ding-dong" }).catch(() => {
              this.hass?.callService("media_player", "media_play", { entity_id: e || this.config.entity });
            });
          };
          break;
        }
        case "cover_preset": {
          u || (u = "mdi:window-shutter"), m = "Go to Shading Position (50%)", y = () => {
            this.hass?.callService("cover", "set_cover_position", { entity_id: e || this.config.entity, position: 50 });
          };
          break;
        }
        case "temp_up": {
          const _ = this.hass?.config?.unit_system?.temperature === "°F" || this.hass?.config?.unit_system?.temperature === "F" ? 1 : 0.5, b = Number(c?.attributes?.temperature ?? c?.attributes?.target_temp_high ?? 20), k = Number(c?.attributes?.max_temp ?? 35), M = Math.min(k, b + _);
          u || (u = "mdi:thermometer-chevron-up"), m = `Temperature +${_}°`, f || (f = `+${_}°`), y = () => {
            this.hass?.callService("climate", "set_temperature", { entity_id: e || this.config.entity, temperature: M });
          };
          break;
        }
        case "temp_down": {
          const _ = this.hass?.config?.unit_system?.temperature === "°F" || this.hass?.config?.unit_system?.temperature === "F" ? 1 : 0.5, b = Number(c?.attributes?.temperature ?? c?.attributes?.target_temp_low ?? 20), k = Number(c?.attributes?.min_temp ?? 10), M = Math.max(k, b - _);
          u || (u = "mdi:thermometer-chevron-down"), m = `Temperature -${_}°`, f || (f = `-${_}°`), y = () => {
            this.hass?.callService("climate", "set_temperature", { entity_id: e || this.config.entity, temperature: M });
          };
          break;
        }
        case "fan_oscillate": {
          const l = c?.attributes?.oscillating === !0;
          $ = l, u || (u = l ? "mdi:arrow-oscillating" : "mdi:fan-off"), m = l ? "Stop Oscillation" : "Start Oscillation", y = () => {
            this.hass?.callService("fan", "oscillate", { entity_id: e || this.config.entity, oscillating: !l });
          };
          break;
        }
        case "fan_direction": {
          const l = c?.attributes?.direction || "forward", _ = l === "forward" ? "reverse" : "forward";
          $ = l === "reverse", u || (u = l === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"), m = `Direction: ${l} -> ${_}`, f || (f = l), y = () => {
            this.hass?.callService("fan", "set_direction", { entity_id: e || this.config.entity, direction: _ });
          };
          break;
        }
        case "humidifier_mode": {
          const l = c?.attributes?.mode || c?.state || "auto", _ = c?.attributes?.available_modes || ["auto", "eco", "boost", "sleep"], b = _[(_.indexOf(l) + 1) % _.length] || "auto";
          u || (u = "mdi:water-sync"), m = `Humidifier Mode: ${l} -> ${b}`, f || (f = l), y = () => {
            this.hass?.callService("humidifier", "set_mode", { entity_id: e || this.config.entity, mode: b });
          };
          break;
        }
        case "siren_toggle": {
          const l = c?.state === "on";
          $ = l, u || (u = l ? "mdi:bullhorn" : "mdi:bullhorn-outline"), m = l ? "Turn Off Siren" : "Trigger Siren", y = () => {
            this.hass?.callService("siren", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "open_close": {
          const l = c?.state === "open" || c?.state === "on" || c?.attributes?.current_position !== void 0 && c.attributes.current_position > 0;
          $ = l;
          const _ = c?.attributes?.device_class;
          u || (_ === "garage" || _ === "garage_door" ? u = l ? "mdi:garage-open" : "mdi:garage" : _ === "blind" || _ === "shade" ? u = l ? "mdi:blinds-open" : "mdi:blinds" : _ === "curtain" ? u = l ? "mdi:curtains-open" : "mdi:curtains" : _ === "damper" ? u = l ? "mdi:circle-slice-8" : "mdi:circle-outline" : u = l ? "mdi:window-shutter-open" : "mdi:window-shutter"), m = l ? "Close" : "Open", y = () => {
            this.hass?.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "stop": {
          u || (u = "mdi:stop"), m = "Stop", y = () => {
            this.hass?.callService("cover", "stop_cover", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "open_tilt": {
          u || (u = "mdi:arrow-top-right-bottom-left"), m = "Open Tilt", y = () => {
            this.hass?.callService("cover", "open_cover_tilt", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "close_tilt": {
          u || (u = "mdi:arrow-bottom-left-top-right"), m = "Close Tilt", y = () => {
            this.hass?.callService("cover", "close_cover_tilt", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "stop_tilt": {
          u || (u = "mdi:stop"), m = "Stop Tilt", y = () => {
            this.hass?.callService("cover", "stop_cover_tilt", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const l = c?.state === "locked", _ = c?.state === "jammed";
          $ = !l, _ && (A = "lock-jammed"), u || (u = _ ? "mdi:lock-alert" : l ? "mdi:lock" : "mdi:lock-open-variant"), m = _ ? "Jammed (Alert!)" : l ? "Unlock" : "Lock", y = () => {
            this.hass?.callService("lock", l ? "unlock" : "lock", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const l = c?.attributes?.percentage ?? 0;
          u || (u = "mdi:fan"), v && (A = "anim-spin"), m = `Speed: ${l}%`, f || (f = l > 0 ? `${l}%` : "Off"), y = () => {
            let _ = 33;
            l >= 90 ? _ = 0 : l >= 60 ? _ = 100 : l >= 30 && (_ = 66), this.hass?.callService("fan", "set_percentage", { entity_id: e || this.config.entity, percentage: _ });
          };
          break;
        }
        case "fan_mode": {
          const l = c?.attributes?.fan_mode || "auto", _ = c?.attributes?.fan_modes || ["auto", "low", "medium", "high"], b = _[(_.indexOf(l) + 1) % _.length] || "auto";
          u || (u = "mdi:fan"), m = `Fan Mode: ${l} -> ${b}`, f || (f = l), y = () => {
            this.hass?.callService("climate", "set_fan_mode", { entity_id: e || this.config.entity, fan_mode: b });
          };
          break;
        }
        case "swing_mode": {
          const l = c?.attributes?.swing_mode || "off", _ = c?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], b = _[(_.indexOf(l) + 1) % _.length] || "off";
          u || (u = "mdi:arrow-split-horizontal"), m = `Swing: ${l} -> ${b}`, f || (f = l), y = () => {
            this.hass?.callService("climate", "set_swing_mode", { entity_id: e || this.config.entity, swing_mode: b });
          };
          break;
        }
        case "climate_preset": {
          const l = c?.attributes?.preset_mode || "none", _ = c?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], b = _[(_.indexOf(l) + 1) % _.length] || "none";
          u || (l === "eco" ? u = "mdi:leaf" : l === "boost" ? u = "mdi:rocket-launch" : l === "away" ? u = "mdi:home-export-outline" : l === "sleep" ? u = "mdi:bed" : u = "mdi:thermostat"), m = `Preset: ${l} -> ${b}`, f || (f = l), y = () => {
            this.hass?.callService("climate", "set_preset_mode", { entity_id: e || this.config.entity, preset_mode: b });
          };
          break;
        }
        case "clean": {
          const l = c?.state === "cleaning";
          $ = l, u || (u = l ? "mdi:pause" : "mdi:robot-vacuum"), m = l ? "Pause Vacuum" : "Start Vacuum", y = () => {
            this.hass?.callService("vacuum", l ? "pause" : "start", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dock": {
          u || (u = "mdi:home-import-outline"), m = "Return to Dock", y = () => {
            this.hass?.callService("vacuum", "return_to_base", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "locate": {
          u || (u = "mdi:map-marker-question-outline"), m = "Locate", y = () => {
            this.hass?.callService("vacuum", "locate", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "vacuum_fan_speed": {
          const l = c?.attributes?.fan_speed || "standard", _ = c?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], b = _[(_.indexOf(l) + 1) % _.length] || "standard";
          u || (u = "mdi:fan"), m = `Suction: ${l} -> ${b}`, f || (f = l), y = () => {
            this.hass?.callService("vacuum", "set_fan_speed", { entity_id: e || this.config.entity, fan_speed: b });
          };
          break;
        }
        case "counter_inc": {
          u || (u = "mdi:plus-box"), m = "Increment Counter (+1)", f || (f = "+1"), y = () => {
            this.hass?.callService("counter", "increment", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "counter_dec": {
          u || (u = "mdi:minus-box"), m = "Decrement Counter (-1)", f || (f = "-1"), y = () => {
            this.hass?.callService("counter", "decrement", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const l = c?.state || "off", _ = c?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], b = _[(_.indexOf(l) + 1) % _.length] || "auto";
          $ = l !== "off", u || (l === "heat" ? u = "mdi:fire" : l === "cool" ? u = "mdi:snowflake" : l === "dry" ? u = "mdi:water-percent" : l === "fan_only" ? u = "mdi:fan" : l === "auto" ? u = "mdi:thermostat-auto" : u = "mdi:power"), m = `Mode: ${l} -> Next: ${b}`, f || (f = l), y = () => {
            this.hass?.callService("climate", "set_hvac_mode", { entity_id: e || this.config.entity, hvac_mode: b });
          };
          break;
        }
        case "light_effect": {
          const l = c?.attributes?.effect_list || [], _ = c?.attributes?.effect || "None", b = l.length > 0 ? l[(l.indexOf(_) + 1) % l.length] || l[0] : "None";
          u || (u = "mdi:creation"), $ = _ !== "None" && _ !== "off" && v, m = `Effect: ${_} -> Next: ${b}`, f || (f = _ !== "None" ? _ : "Effect"), y = () => {
            l.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, effect: b });
          };
          break;
        }
        case "brightness": {
          const l = c?.attributes?.brightness, _ = l !== void 0 ? Math.round(l / 255 * 100) : 0;
          u || (u = "mdi:brightness-6"), m = `Brightness: ${_}%`, f || (f = `${_}%`), y = () => {
            let b = 25;
            _ >= 85 ? b = 0 : _ >= 60 ? b = 100 : _ >= 35 ? b = 75 : _ >= 10 && (b = 50), b === 0 ? this.hass?.callService("light", "turn_off", { entity_id: e || this.config.entity }) : this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness_pct: b });
          };
          break;
        }
        case "garage_toggle": {
          const l = c?.state === "open" || c?.state === "opening";
          $ = l, u || (u = l ? "mdi:garage-open" : "mdi:garage"), m = l ? "Close Garage" : "Open Garage", y = () => {
            this.hass?.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const l = (e || this.config.entity || "").split(".")[0];
          if (l === "number" || l === "input_number") {
            const _ = Number(c?.state) || 0, b = Number(c?.attributes?.step) || 1, k = Number(c?.attributes?.max) || 100, M = Math.min(k, _ + b);
            u || (u = "mdi:plus-circle-outline"), m = `Value +${b}`, f || (f = `+${b}`), y = () => {
              this.hass?.callService(l, "set_value", { entity_id: e || this.config.entity, value: M });
            };
          } else {
            const _ = c?.attributes?.brightness ?? 0, b = Math.min(255, _ + 26);
            u || (u = "mdi:brightness-5"), m = "Brightness +10%", f || (f = "+10%"), y = () => {
              this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: b });
            };
          }
          break;
        }
        case "dim_down": {
          const l = (e || this.config.entity || "").split(".")[0];
          if (l === "number" || l === "input_number") {
            const _ = Number(c?.state) || 0, b = Number(c?.attributes?.step) || 1, k = Number(c?.attributes?.min) || 0, M = Math.max(k, _ - b);
            u || (u = "mdi:minus-circle-outline"), m = `Value -${b}`, f || (f = `-${b}`), y = () => {
              this.hass?.callService(l, "set_value", { entity_id: e || this.config.entity, value: M });
            };
          } else {
            const _ = c?.attributes?.brightness ?? 0, b = Math.max(1, _ - 26);
            u || (u = "mdi:brightness-4"), m = "Brightness -10%", f || (f = "-10%"), y = () => {
              this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: b });
            };
          }
          break;
        }
        case "humidity_up": {
          const l = Number(c?.attributes?.humidity ?? c?.attributes?.target_humidity ?? 50), _ = Math.min(100, l + 5);
          u || (u = "mdi:water-plus"), m = `Humidity +5% (${_}%)`, f || (f = "+5%"), y = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: e || this.config.entity, humidity: _ });
          };
          break;
        }
        case "humidity_down": {
          const l = Number(c?.attributes?.humidity ?? c?.attributes?.target_humidity ?? 50), _ = Math.max(0, l - 5);
          u || (u = "mdi:water-minus"), m = `Humidity -5% (${_}%)`, f || (f = "-5%"), y = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: e || this.config.entity, humidity: _ });
          };
          break;
        }
        case "input_select": {
          const l = c?.state || "", _ = c?.attributes?.options || [], b = _.length > 0 ? _[(_.indexOf(l) + 1) % _.length] || _[0] : l;
          u || (u = "mdi:form-dropdown"), m = `Option: ${l} -> Next: ${b}`, f || (f = l), y = () => {
            const k = (e || this.config.entity || "").split(".")[0] === "select" ? "select" : "input_select";
            this.hass?.callService(k, "select_next", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "temp_warm": {
          u || (u = "mdi:weather-sunny"), m = "Warm White (2700K)", f || (f = "2700K"), y = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          u || (u = "mdi:weather-sunset-up"), m = "Cool Daylight (6000K)", f || (f = "6000K"), y = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          u || (u = "mdi:palette-swatch-outline"), m = "Color Temperature", f || (f = "Temp"), y = () => {
            const l = c?.attributes?.color_temp_kelvin || 3e3;
            let _ = 2700;
            l < 3300 ? _ = 4e3 : l < 5e3 ? _ = 6e3 : _ = 2700, this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: _ });
          };
          break;
        }
        case "button":
        default: {
          u || (u = c?.attributes?.icon || "mdi:checkbox-blank-circle"), m = o || (c?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const T = (l) => {
      this._handleSubTap(l, e, n, p, y);
    };
    return S`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${bgClass}" 
        ?active=${$} 
        style="${colorStyle} ${$ && dynamicSubColor && r ? `background: ${dynamicSubColor}; color: #fff;` : ""}"
        title="${m}"
        @click=${T}
        @dblclick=${(l) => l.stopPropagation()}
        @keydown=${(l) => {
      (l.key === "Enter" || l.key === " ") && (l.preventDefault(), l.stopPropagation(), T(l));
    }}
        @pointerdown=${(l) => this._handleSubPointerDown(l, e, s)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(l) => this._handleSubContextMenu(l, e, s)}>
        <ha-icon .icon=${u} class="${A}"></ha-icon>
        ${f ? S`<span class="sub-button-label">${f}</span>` : w}
        ${g ? S`<span class="sub-button-state">${g}</span>` : w}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return Zt`
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
  }
}
ue([
  rt({ attribute: !1 })
], Y.prototype, "hass", 2);
ue([
  rt({ type: Boolean })
], Y.prototype, "preview", 2);
ue([
  ot()
], Y.prototype, "config", 2);
ue([
  ot()
], Y.prototype, "_collapsed", 2);
ue([
  ti({ passive: !0 })
], Y.prototype, "_handlePointerMove", 1);
ue([
  ti({ passive: !0 })
], Y.prototype, "_handleSubPointerMove", 1);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", Y);
customElements.get("antigravity-card") || customElements.define("antigravity-card", Y);
export {
  Y as AntigravityCard,
  ar as CARD_VERSION
};
