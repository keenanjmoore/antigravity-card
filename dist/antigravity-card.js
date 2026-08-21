const qe = globalThis, ft = qe.ShadowRoot && (qe.ShadyCSS === void 0 || qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), Ct = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ft && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ct.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ct.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ii = (n) => new Vt(typeof n == "string" ? n : n + "", void 0, bt), Yt = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, r, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[o + 1], n[0]);
  return new Vt(t, n, bt);
}, ri = (n, e) => {
  if (ft) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = qe.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, n.appendChild(i);
  }
}, Tt = ft ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ii(t);
})(n) : n;
const { is: oi, defineProperty: ni, getOwnPropertyDescriptor: ai, getOwnPropertyNames: si, getOwnPropertySymbols: li, getPrototypeOf: ci } = Object, Ze = globalThis, At = Ze.trustedTypes, di = At ? At.emptyScript : "", ui = Ze.reactiveElementPolyfillSupport, we = (n, e) => n, Xe = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? di : null;
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
} }, mt = (n, e) => !oi(n, e), Mt = { attribute: !0, type: String, converter: Xe, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ??= Symbol("metadata"), Ze.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ne = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Mt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && ni(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: o } = ai(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(we("elementProperties"))) return;
    const e = ci(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(we("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(we("properties"))) {
      const t = this.properties, i = [...si(t), ...li(t)];
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
      for (const r of i) t.unshift(Tt(r));
    } else e !== void 0 && t.push(Tt(e));
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
    return ri(e, this.constructor.elementStyles), e;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : Xe).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Xe;
      this._$Em = r;
      const s = a.fromAttribute(t, o.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, o) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? mt)(o, t) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
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
ne.elementStyles = [], ne.shadowRootOptions = { mode: "open" }, ne[we("elementProperties")] = /* @__PURE__ */ new Map(), ne[we("finalized")] = /* @__PURE__ */ new Map(), ui?.({ ReactiveElement: ne }), (Ze.reactiveElementVersions ??= []).push("2.1.2");
const vt = globalThis, Pt = (n) => n, Ke = vt.trustedTypes, Et = Ke ? Ke.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, qt = "$lit$", W = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + W, _i = `<${Xt}>`, Z = document, Se = () => Z.createComment(""), ke = (n) => n === null || typeof n != "object" && typeof n != "function", yt = Array.isArray, hi = (n) => yt(n) || typeof n?.[Symbol.iterator] == "function", ct = `[ 	
\f\r]`, ve = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Lt = /-->/g, Ht = />/g, q = RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Nt = /'/g, Rt = /"/g, Kt = /^(?:script|style|textarea|title)$/i, pi = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), $ = pi(1), Q = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Dt = /* @__PURE__ */ new WeakMap(), K = Z.createTreeWalker(Z, 129);
function Zt(n, e) {
  if (!yt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Et !== void 0 ? Et.createHTML(e) : e;
}
const gi = (n, e) => {
  const t = n.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = ve;
  for (let s = 0; s < t; s++) {
    const l = n[s];
    let d, _, c = -1, h = 0;
    for (; h < l.length && (a.lastIndex = h, _ = a.exec(l), _ !== null); ) h = a.lastIndex, a === ve ? _[1] === "!--" ? a = Lt : _[1] !== void 0 ? a = Ht : _[2] !== void 0 ? (Kt.test(_[2]) && (r = RegExp("</" + _[2], "g")), a = q) : _[3] !== void 0 && (a = q) : a === q ? _[0] === ">" ? (a = r ?? ve, c = -1) : _[1] === void 0 ? c = -2 : (c = a.lastIndex - _[2].length, d = _[1], a = _[3] === void 0 ? q : _[3] === '"' ? Rt : Nt) : a === Rt || a === Nt ? a = q : a === Lt || a === Ht ? a = ve : (a = q, r = void 0);
    const g = a === q && n[s + 1].startsWith("/>") ? " " : "";
    o += a === ve ? l + _i : c >= 0 ? (i.push(d), l.slice(0, c) + qt + l.slice(c) + W + g) : l + W + (c === -2 ? s : g);
  }
  return [Zt(n, o + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Ce {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const s = e.length - 1, l = this.parts, [d, _] = gi(e, t);
    if (this.el = Ce.createElement(d, i), K.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = K.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(qt)) {
          const h = _[a++], g = r.getAttribute(c).split(W), b = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: b[2], strings: g, ctor: b[1] === "." ? bi : b[1] === "?" ? mi : b[1] === "@" ? vi : Qe }), r.removeAttribute(c);
        } else c.startsWith(W) && (l.push({ type: 6, index: o }), r.removeAttribute(c));
        if (Kt.test(r.tagName)) {
          const c = r.textContent.split(W), h = c.length - 1;
          if (h > 0) {
            r.textContent = Ke ? Ke.emptyScript : "";
            for (let g = 0; g < h; g++) r.append(c[g], Se()), K.nextNode(), l.push({ type: 2, index: ++o });
            r.append(c[h], Se());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Xt) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(W, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += W.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = Z.createElement("template");
    return i.innerHTML = e, i;
  }
}
function se(n, e, t = n, i) {
  if (e === Q) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const o = ke(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(n), r._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = se(n, r._$AS(n, e.values), r, i)), e;
}
class fi {
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
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? Z).importNode(t, !0);
    K.currentNode = r;
    let o = K.nextNode(), a = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new le(o, o.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (d = new yi(o, this, e)), this._$AV.push(d), l = i[++s];
      }
      a !== l?.index && (o = K.nextNode(), a++);
    }
    return K.currentNode = Z, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class le {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = se(this, e, t), ke(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== Q && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : hi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && ke(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Ce.createElement(Zt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new fi(r, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Dt.get(e.strings);
    return t === void 0 && Dt.set(e.strings, t = new Ce(e)), t;
  }
  k(e) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const o of e) r === t.length ? t.push(i = new le(this.O(Se()), this.O(Se()), this, this.options)) : i = t[r], i._$AI(o), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = Pt(e).nextSibling;
      Pt(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Qe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(e, t = this, i, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = se(this, e, t, 0), a = !ke(e) || e !== this._$AH && e !== Q, a && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = o[0], l = 0; l < o.length - 1; l++) d = se(this, s[i + l], t, l), d === Q && (d = this._$AH[l]), a ||= !ke(d) || d !== this._$AH[l], d === m ? e = m : e !== m && (e += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class bi extends Qe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class mi extends Qe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class vi extends Qe {
  constructor(e, t, i, r, o) {
    super(e, t, i, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = se(this, e, t, 0) ?? m) === Q) return;
    const i = this._$AH, r = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== m && (i === m || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let yi = class {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    se(this, e);
  }
};
const xi = { I: le }, $i = vt.litHtmlPolyfillSupport;
$i?.(Ce, le), (vt.litHtmlVersions ??= []).push("3.3.3");
const wi = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    i._$litPart$ = r = new le(e.insertBefore(Se(), o), o, void 0, t ?? {});
  }
  return r._$AI(n), r;
};
const xt = globalThis;
let ae = class extends ne {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = wi(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Q;
  }
};
ae._$litElement$ = !0, ae.finalized = !0, xt.litElementHydrateSupport?.({ LitElement: ae });
const Si = xt.litElementPolyfillSupport;
Si?.({ LitElement: ae });
(xt.litElementVersions ??= []).push("4.2.2");
const ki = { attribute: !0, type: String, converter: Xe, reflect: !1, hasChanged: mt }, Ci = (n = ki, e, t) => {
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
function Je(n) {
  return (e, t) => typeof t == "object" ? Ci(n, e, t) : ((i, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(n, e, t);
}
function je(n) {
  return Je({ ...n, state: !0, attribute: !1 });
}
function Qt(n) {
  return (e, t) => {
    const i = typeof e == "function" ? e : e[t];
    Object.assign(i, n);
  };
}
const Ti = { CHILD: 2 }, Ai = (n) => (...e) => ({ _$litDirective$: n, values: e });
let Mi = class {
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
const { I: Pi } = xi, Bt = (n) => n, Ot = () => document.createComment(""), ye = (n, e, t) => {
  const i = n._$AA.parentNode, r = e === void 0 ? n._$AB : e._$AA;
  if (t === void 0) {
    const o = i.insertBefore(Ot(), r), a = i.insertBefore(Ot(), r);
    t = new Pi(o, a, n, n.options);
  } else {
    const o = t._$AB.nextSibling, a = t._$AM, s = a !== n;
    if (s) {
      let l;
      t._$AQ?.(n), t._$AM = n, t._$AP !== void 0 && (l = n._$AU) !== a._$AU && t._$AP(l);
    }
    if (o !== r || s) {
      let l = t._$AA;
      for (; l !== o; ) {
        const d = Bt(l).nextSibling;
        Bt(i).insertBefore(l, r), l = d;
      }
    }
  }
  return t;
}, X = (n, e, t = n) => (n._$AI(e, t), n), Ei = {}, Li = (n, e = Ei) => n._$AH = e, Hi = (n) => n._$AH, dt = (n) => {
  n._$AR(), n._$AA.remove();
};
const zt = (n, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) i.set(n[r], r);
  return i;
}, Ni = Ai(class extends Mi {
  constructor(n) {
    if (super(n), n.type !== Ti.CHILD) throw Error("repeat() can only be used in text expressions");
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
    const r = Hi(n), { values: o, keys: a } = this.dt(e, t, i);
    if (!Array.isArray(r)) return this.ut = a, o;
    const s = this.ut ??= [], l = [];
    let d, _, c = 0, h = r.length - 1, g = 0, b = o.length - 1;
    for (; c <= h && g <= b; ) if (r[c] === null) c++;
    else if (r[h] === null) h--;
    else if (s[c] === a[g]) l[g] = X(r[c], o[g]), c++, g++;
    else if (s[h] === a[b]) l[b] = X(r[h], o[b]), h--, b--;
    else if (s[c] === a[b]) l[b] = X(r[c], o[b]), ye(n, l[b + 1], r[c]), c++, b--;
    else if (s[h] === a[g]) l[g] = X(r[h], o[g]), ye(n, r[c], r[h]), h--, g++;
    else if (d === void 0 && (d = zt(a, g, b), _ = zt(s, c, h)), d.has(s[c])) if (d.has(s[h])) {
      const y = _.get(a[g]), S = y !== void 0 ? r[y] : null;
      if (S === null) {
        const p = ye(n, r[c]);
        X(p, o[g]), l[g] = p;
      } else l[g] = X(S, o[g]), ye(n, r[c], S), r[y] = null;
      g++;
    } else dt(r[h]), h--;
    else dt(r[c]), c++;
    for (; g <= b; ) {
      const y = ye(n, l[b + 1]);
      X(y, o[g]), l[g++] = y;
    }
    for (; c <= h; ) {
      const y = r[c++];
      y !== null && dt(y);
    }
    return this.ut = a, Li(n, l), Q;
  }
});
var It, Ut;
(function(n) {
  n.language = "language", n.system = "system", n.comma_decimal = "comma_decimal", n.decimal_comma = "decimal_comma", n.space_comma = "space_comma", n.none = "none";
})(It || (It = {})), function(n) {
  n.language = "language", n.system = "system", n.am_pm = "12", n.twenty_four = "24";
}(Ut || (Ut = {}));
function Ri(n) {
  return n.substr(0, n.indexOf("."));
}
var Di = ["closed", "locked", "off"], Te = function(n, e, t, i) {
  i = i || {}, t = t ?? {};
  var r = new Event(e, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return r.detail = t, n.dispatchEvent(r), r;
}, $e = function(n) {
  Te(window, "haptic", n);
}, Bi = function(n, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), Te(window, "location-changed", { replace: t });
}, Oi = function(n, e, t) {
  t === void 0 && (t = !0);
  var i, r = Ri(e), o = r === "group" ? "homeassistant" : r;
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
}, zi = function(n, e) {
  var t = Di.includes(n.states[e].state);
  return Oi(n, e, t);
}, Ii = function(n, e, t, i) {
  if (i || (i = { action: "more-info" }), !i.confirmation || i.confirmation.exemptions && i.confirmation.exemptions.some(function(o) {
    return o.user === e.user.id;
  }) || ($e("warning"), confirm(i.confirmation.text || "Are you sure you want to " + i.action + "?"))) switch (i.action) {
    case "more-info":
      (t.entity || t.camera_image) && Te(n, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      i.navigation_path && Bi(0, i.navigation_path);
      break;
    case "url":
      i.url_path && window.open(i.url_path);
      break;
    case "toggle":
      t.entity && (zi(e, t.entity), $e("success"));
      break;
    case "call-service":
      if (!i.service) return void $e("failure");
      var r = i.service.split(".", 2);
      e.callService(r[0], r[1], i.service_data, i.target), $e("success");
      break;
    case "fire-dom-event":
      Te(n, "ll-custom", i);
  }
}, Ft = function(n, e, t, i) {
  var r;
  i === "double_tap" && t.double_tap_action ? r = t.double_tap_action : i === "hold" && t.hold_action ? r = t.hold_action : i === "tap" && t.tap_action && (r = t.tap_action), Ii(n, e, t, r);
};
const pt = {
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
  show_slider: !1,
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
var Ui = Object.defineProperty, $t = (n, e, t, i) => {
  for (var r = void 0, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (r = a(e, t, r) || r);
  return r && Ui(e, t, r), r;
};
const Fi = [
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
], Gi = [
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
], Wi = [
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
], Vi = [
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
], Yi = [
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
], Gt = [
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
function et(n) {
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
const qi = et(1), Xi = et(2), Ki = et(3), Zi = et(4), Qi = [
  { name: "tap_action", selector: { "ui-action": {} } },
  { name: "hold_action", selector: { "ui-action": {} } },
  { name: "double_tap_action", selector: { "ui-action": {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
];
function N(n) {
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
function E(n) {
  const e = N(n);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(i) || isNaN(r)))
    return [t, i, r];
}
const Ji = {
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
class Ae extends ae {
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
      i && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(i[1]) * 100)), t.bg_color = N(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = N(t.card_border_color)), t.active_color && (t.active_color = N(t.active_color)), t.inactive_color && (t.inactive_color = N(t.inactive_color)), t.slider_color && (t.slider_color = N(t.slider_color)), t.slider_track_color && (t.slider_track_color = N(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = N(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = N(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = N(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = N(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = N(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = N(t.sub_button_4_color)), this._config = {
      ...pt,
      ...t
    };
  }
  _computeLabel(e) {
    return Ji[e.name] || e.name;
  }
  _transformConfigForForm() {
    const e = { ...this._config };
    return e.bg_color = E(e.bg_color), e.card_border_color = E(e.card_border_color), e.active_color = E(e.active_color), e.inactive_color = E(e.inactive_color), e.slider_color = E(e.slider_color), e.slider_track_color = E(e.slider_track_color), e.text_color_primary = E(e.text_color_primary), e.text_color_secondary = E(e.text_color_secondary), e.sub_button_1_color = E(e.sub_button_1_color), e.sub_button_2_color = E(e.sub_button_2_color), e.sub_button_3_color = E(e.sub_button_3_color), e.sub_button_4_color = E(e.sub_button_4_color), e.fade_stage_1_color = E(e.fade_stage_1_color), e.fade_stage_2_color = E(e.fade_stage_2_color), e.fade_stage_3_color = E(e.fade_stage_3_color), e;
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
    this._config = r, Te(this, "config-changed", { config: this._config });
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    }, this.requestUpdate();
  }
  _renderSection(e, t, i, r, o) {
    const a = !!this._openPanels[e];
    return $`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${i}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? $`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${o}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, r)}
            ></ha-form>
          </div>
        ` : m}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, i, r) {
    const o = `sub${e}`, a = !!this._openPanels[o];
    return $`
      <div class="sub-nested-panel ${a ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(o)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? $`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, i)}
            ></ha-form>
          </div>
        ` : m}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return $``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", i = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", o = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return $`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", Fi, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", Gi, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Wi, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", Vi, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Yi, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${a ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${a ? $`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Gt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(s) => this._valueChanged(s, Gt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, qi, e)}
                ${this._renderSubButtonPanel(2, i, Xi, e)}
                ${this._renderSubButtonPanel(3, r, Ki, e)}
                ${this._renderSubButtonPanel(4, o, Zi, e)}
              </div>
            </div>
          ` : m}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", Qi, e)}
      </div>
    `;
  }
  static get styles() {
    return Yt`
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
$t([
  Je({ attribute: !1 })
], Ae.prototype, "hass");
$t([
  je()
], Ae.prototype, "_config");
$t([
  je()
], Ae.prototype, "_openPanels");
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", Ae);
customElements.get("antigravity-card-editor") || customElements.define("antigravity-card-editor", Ae);
var ji = Object.defineProperty, er = Object.getOwnPropertyDescriptor, ce = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? er(e, t) : e, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (r = (i ? a(e, t, r) : a(r)) || r);
  return i && r && ji(e, t, r), r;
};
const tr = "115";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${tr} `,
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
const ir = /* @__PURE__ */ new Set([
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
]), rr = /* @__PURE__ */ new Set([
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
]), or = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), Jt = /^\d+\s*,\s*\d+\s*,\s*\d+$/, nr = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;
function I(n) {
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
function Ve(n) {
  return !Array.isArray(n) || n.length < 3 ? "#ffffff" : "#" + n.slice(0, 3).map((e) => Math.round(Number(e) || 0).toString(16).padStart(2, "0")).join("");
}
function ar(n, e, t) {
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
function ut(n, e) {
  n = n % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const t = 1, i = Math.floor(n * 6), r = n * 6 - i, o = t * (1 - e), a = t * (1 - r * e), s = t * (1 - (1 - r) * e);
  let l = 0, d = 0, _ = 0;
  switch (i % 6) {
    case 0:
      l = t, d = s, _ = o;
      break;
    case 1:
      l = a, d = t, _ = o;
      break;
    case 2:
      l = o, d = t, _ = s;
      break;
    case 3:
      l = o, d = a, _ = t;
      break;
    case 4:
      l = s, d = o, _ = t;
      break;
    case 5:
      l = t, d = o, _ = a;
      break;
  }
  return [Math.round(l * 255), Math.round(d * 255), Math.round(_ * 255)];
}
const gt = [
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
], sr = [
  { k: 2200, label: "2200K", rgb: I(2200) },
  { k: 2700, label: "2700K", rgb: I(2700) },
  { k: 3e3, label: "3000K", rgb: I(3e3) },
  { k: 4e3, label: "4000K", rgb: I(4e3) },
  { k: 5e3, label: "5000K", rgb: I(5e3) },
  { k: 6500, label: "6500K", rgb: I(6500) }
], xe = /* @__PURE__ */ new Map(), lr = 200;
function B(n) {
  if (!n) return null;
  const e = n.trim().toLowerCase();
  if (!e) return null;
  const t = xe.get(e);
  if (t !== void 0) return t;
  const i = cr(e);
  if (xe.size >= lr) {
    const r = xe.keys().next().value;
    r && xe.delete(r);
  }
  return xe.set(e, i), i;
}
function cr(n) {
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
  if (Jt.test(n)) {
    const e = n.split(",").map((t) => parseInt(t.trim(), 10));
    if (e.length >= 3 && !e.some(isNaN))
      return [e[0], e[1], e[2]];
  }
  for (let e = 0; e < gt.length; e++) {
    const t = gt[e];
    if (n === t.label.toLowerCase() || n === t.hex)
      return [t.rgb[0], t.rgb[1], t.rgb[2]];
  }
  return null;
}
function _t(n, e, t) {
  const i = Math.max(0, Math.min(1, t));
  return [
    Math.round(n[0] + (e[0] - n[0]) * i),
    Math.round(n[1] + (e[1] - n[1]) * i),
    Math.round(n[2] + (e[2] - n[2]) * i)
  ];
}
function ht(n) {
  return `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
}
const Ye = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function L(n, e = !0) {
  if (e)
    try {
      $e(n);
    } catch {
    }
}
const oe = /* @__PURE__ */ new Map(), Wt = 250;
function dr(n) {
  if (!n) return "";
  const e = oe.get(n);
  if (e !== void 0) return e;
  const t = n.trim();
  if (!t)
    return oe.set(n, ""), "";
  let i = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? i = t : Jt.test(t) ? i = `rgb(${t})` : nr.test(t) ? i = `rgba(${t})` : t.toLowerCase() === "state" ? i = "var(--state-icon-color, var(--primary-color))" : rr.has(t.toLowerCase()) && (i = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), oe.size >= Wt) {
    const r = Math.floor(Wt / 4), o = oe.keys();
    for (let a = 0; a < r; a++) {
      const s = o.next().value;
      s !== void 0 && oe.delete(s);
    }
  }
  return oe.set(n, i), i;
}
class V extends ae {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._canceled = !1, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new Map(), this._onSliderPointerDown = (e) => {
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
          r < 6 && o < 6 && (this._revertSlider(t, i), L("light", this.config.haptic_feedback !== !1), Ft(this, this.hass, this.config, "tap"));
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
    return { ...pt };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...pt,
      ...e
    }, this._cachedSubButtons = null;
    const t = [];
    this.config.entity && t.push(this.config.entity), this.config.sub_button_1_entity && t.push(this.config.sub_button_1_entity), this.config.sub_button_2_entity && t.push(this.config.sub_button_2_entity), this.config.sub_button_3_entity && t.push(this.config.sub_button_3_entity), this.config.sub_button_4_entity && t.push(this.config.sub_button_4_entity), this._monitoredEntities = t, this._computeStaticStylesAndClasses();
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const e = this.config.card_padding ?? 12, t = this.config.card_padding_vertical ?? 4, i = this.config.card_padding_horizontal ?? e, r = this.config.card_padding_top ?? t, o = this.config.card_padding_bottom ?? t, a = this.config.card_padding_left ?? i, s = this.config.card_padding_right ?? i, l = this.config.card_margin, d = this.config.card_margin_vertical ?? l, _ = this.config.card_margin_horizontal ?? l, c = this.config.card_margin_top ?? d, h = this.config.card_margin_bottom ?? d, g = this.config.card_margin_left ?? _, b = this.config.card_margin_right ?? _;
    let y = "";
    (c !== void 0 || h !== void 0 || g !== void 0 || b !== void 0) && (y = `margin: ${c ?? 0}px ${b ?? 0}px ${h ?? 0}px ${g ?? 0}px;`);
    const S = this.config.border_radius ?? 12, p = this.config.slider_style === "google", k = this.config.slider_style === "full", f = p ? 42 : k ? 40 : 12, C = this.config.slider_height !== void 0 ? this.config.slider_height : f, x = p ? 21 : k ? 0 : C / 2, w = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : x, T = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), u = this.config.card_border_style ?? "solid", v = T > 0 ? `border: ${T}px ${u} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", A = this.config.card_width ? `width: ${this.config.card_width};` : "", D = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", J = this.config.card_height ? `height: ${this.config.card_height};` : "", de = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", U = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", ue = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", Me = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", Pe = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", F = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", Ee = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, Le = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, He = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Ne = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Re = this.config.sub_button_padding ?? 0, De = this.config.sub_button_container_padding ?? 0, tt = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "", it = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", rt = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      y,
      `border-radius: ${S}px;`,
      v,
      A,
      D,
      J,
      de,
      U,
      ue,
      Me,
      Pe,
      F,
      `--ag-card-padding: ${r}px ${s}px ${o}px ${a}px;`,
      `--ag-text-padding: ${Ee}px ${Le}px;`,
      `--ag-features-padding: ${He}px ${Ne}px;`,
      `--ag-sub-button-padding: ${Re}px;`,
      `--ag-sub-button-container-padding: ${De}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 12}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? 2}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? 4}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? 6}px;`,
      `--ag-slider-height: ${C}px;`,
      `--ag-slider-radius: ${w}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      tt,
      it,
      rt
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "none"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const H = Number(this.config.text_offset_x) || 0, j = Number(this.config.text_offset_y) || 0;
    this._textOffsetStyle = H !== 0 || j !== 0 ? `transform: translate(${H}px, ${j}px);` : "";
    const Y = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x) || 0, G = Number(this.config.primary_text_end_offset) || 0, ee = Number(this.config.primary_text_offset_y) || 0, te = Y !== 0 || ee !== 0 ? `transform: translate(${Y}px, ${ee}px);` : "", ot = Y !== 0 || G !== 0 ? `margin-left: ${Y}px; margin-right: ${G}px;` : "";
    this._primaryTextOffsetStyle = `${te} ${ot}`.trim();
    const R = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x) || 0, Be = Number(this.config.secondary_text_end_offset) || 0, Oe = Number(this.config.secondary_text_offset_y) || 0, nt = R !== 0 || Oe !== 0 ? `transform: translate(${R}px, ${Oe}px);` : "", at = R !== 0 || Be !== 0 ? `margin-left: ${R}px; margin-right: ${Be}px;` : "";
    this._secondaryTextOffsetStyle = `${nt} ${at}`.trim();
    const ze = Number(this.config.features_offset_x) || 0, ie = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = ze !== 0 || ie !== 0 ? `transform: translate(${ze}px, ${ie}px);` : "";
    const O = Number(this.config.slider_start_offset) || 0, z = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      O ? `margin-left: ${O}px !important;` : "",
      z ? `margin-right: ${z}px !important;` : ""
    ].filter(Boolean).join(" ");
    const Ie = Number(this.config.color_temp_start_offset) || 0, Ue = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      Ie ? `margin-left: ${Ie}px !important;` : "",
      Ue ? `margin-right: ${Ue}px !important;` : ""
    ].filter(Boolean).join(" ");
    const _e = Number(this.config.color_slider_start_offset) || 0, he = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      _e ? `margin-left: ${_e}px !important;` : "",
      he ? `margin-right: ${he}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const Fe = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", pe = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, Ge = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", re = this.config.line_height ? `line-height: ${this.config.line_height};` : "", M = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${M}; ${Fe} ${Ge} ${re}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${pe} ${Ge} ${re}`;
    const ge = this.config.entity, wt = [];
    for (let P = 1; P <= 4; P++) {
      const fe = this.config[`sub_button_${P}_entity`], be = this.config[`sub_button_${P}_icon`], We = this.config[`sub_button_${P}_name`], st = this.config[`sub_button_${P}_tap_action`], me = this.config[`sub_button_${P}_hold_action`], jt = this.config[`sub_button_${P}_double_tap_action`], lt = this.config[`sub_button_${P}_type`], ei = this.config[`sub_button_${P}_color`], ti = this.config[`sub_button_${P}_show_background`], St = this.config[`sub_button_${P}_show_state`];
      if (!!(fe || be || We || lt && lt !== "button" || St)) {
        const kt = fe || ge;
        wt.push(Object.freeze({
          key: `${kt || "sub"}_${P}`,
          entity: kt,
          type: lt || "button",
          icon: be,
          color: ei,
          bg: ti,
          name: We,
          showState: St === !0,
          tapAction: st,
          holdAction: me,
          doubleTapAction: jt
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(wt), this.config.fade_transition_enabled) {
      const P = Number(this.config.fade_stage_1_duration) || 60, fe = Number(this.config.fade_stage_2_duration) || 600, be = Number(this.config.fade_stage_3_duration) || 1800, We = B(this.config.fade_stage_1_color) || [255, 152, 0], st = B(this.config.fade_stage_2_color) || [205, 220, 57], me = B(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: P,
        d2: fe,
        d3: be,
        totalDuration: P + fe + be,
        c1Rgb: We,
        c2Rgb: st,
        c3Rgb: me,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: me ? ht(me) : "",
          progressPct: 100,
          remainingSeconds: 0,
          currentStage: 0,
          stageLabel: "Resting"
        })
      };
    } else
      this._fadeStaticConfig = null;
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
    const i = this.config.entity.split(".")[0] === "light", r = e.state === "on", o = this.config.hide_color_temp_when_off !== !1, a = this.config.hide_color_picker_when_off !== !1, s = this.config.hide_color_slider_when_off !== !1, l = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, d = i && this.config.show_color_temp === !0 && (l !== void 0 || e.attributes?.supported_color_modes?.some((p) => ["color_temp"].includes(p))) && (!o || r), _ = e.attributes?.supported_color_modes, c = Array.isArray(_) && _.some((p) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(p)), h = this.config.color_picker_type !== "wheel", g = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && h) && c && (!s || r), b = i && this.config.show_color_picker === !0 && !h && c && (!a || r), y = d || g || b, S = this._getSubButtons();
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
    const e = this.config?.primary_info, t = this.config?.secondary_info, i = this.config?.entity, r = i ? i.split(".")[0] : "", o = (r === "binary_sensor" || r === "timer") && (e === "state" || t === "state"), a = this.config?.fade_transition_enabled === !0, s = i && this.hass ? this.hass.states[i] : null, l = r === "light" && s?.state === "on", d = a && (l || s?.last_changed && Date.now() - new Date(s.last_changed).getTime() < 36e5), _ = d || o || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (_ && !this._relativeTimer) {
      const c = d ? 1e3 : 5e3;
      this._relativeTimer = setInterval(() => {
        !this.hasAttribute("offscreen") && this.style.display !== "none" && this.requestUpdate();
      }, c);
    } else !_ && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
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
    return e ? ir.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t, i) {
    if (!this.config?.fade_transition_enabled || !e)
      return Ye;
    const r = this._isEntityActive(e), o = this.config.fade_trigger ?? "on_inactive";
    if (!(o === "on_inactive" && !r || o === "on_active" && r || o === "both"))
      return Ye;
    const s = r ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || t || "#d60000", l = r ? this._resolveColor(this.config.active_color) || t || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", d = B(s) || [214, 0, 0], _ = B(l) || [3, 177, 0], c = this._fadeStaticConfig, h = c?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), g = c?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), b = c?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), y = c?.totalDuration ?? h + g + b;
    if (y <= 0)
      return Ye;
    this._lastTrackedState !== null && this._lastTrackedState !== e.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = e.state;
    const S = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : d, p = c?.c1Rgb ?? (B(this.config.fade_stage_1_color) || [255, 152, 0]), k = this.config.fade_stage_2_pickup !== !1 ? p : d, f = c?.c2Rgb ?? (B(this.config.fade_stage_2_color) || [205, 220, 57]), C = this.config.fade_stage_3_pickup !== !1 ? f : p, x = c?.c3Rgb ?? (B(this.config.fade_stage_3_color) || _), w = this._parseDate(e.last_changed || e.last_updated);
    if (!w)
      return Ye;
    const T = Math.max(0, (Date.now() - w.getTime()) / 1e3);
    if (T >= y)
      return this._currentLiveRgb = x, this._previousLiveRgb = null, c?.restingResult ? c.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: ht(x),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let u, v = 1, A = 0;
    const D = Math.max(0, Math.round(y - T));
    T < h && h > 0 ? (v = 1, A = T / h, u = _t(S, p, A)) : T < h + g && g > 0 ? (v = 2, A = (T - h) / g, u = _t(k, f, A)) : b > 0 ? (v = 3, A = (T - h - g) / b, u = _t(C, x, A)) : (v = 0, u = x), this._currentLiveRgb = u;
    const J = Math.min(100, Math.round(T / y * 100)), de = ht(u);
    let U = "";
    return D >= 60 ? U = `${Math.ceil(D / 60)}m left` : U = `${D}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: de,
      progressPct: J,
      remainingSeconds: D,
      currentStage: v,
      stageLabel: U
    };
  }
  _resolveColor(e) {
    return dr(e);
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
    const _ = Math.round(l / 30);
    if (_ < 12) return `${_} ${_ === 1 ? "month" : "months"}${t ? "" : " ago"}`;
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
            const a = Math.max(0, Math.round((o - Date.now()) / 1e3)), s = Math.floor(a / 60), l = a % 60, d = Math.floor(s / 60), _ = (s % 60).toString().padStart(2, "0"), c = l.toString().padStart(2, "0");
            return d > 0 ? `${d}:${_}:${c}` : `${_}:${c}`;
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
            return o <= 20 ? a = "#f44336" : o <= 50 && (a = "#ff9800"), $`<span style="color: ${a}; font-weight: bold;">${o}%</span>`;
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
      Ft(this, this.hass, { ...this.config, entity: r }, e);
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
    this._isSubElement(e) || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(e) {
    if (e.preventDefault(), e.stopPropagation(), this._held) return;
    L("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(e) {
    this._isSubElement(e) || (this._held = !1, this._moved = !1, this._canceled = !1, this._startX = e.clientX, this._startY = e.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), L("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
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
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, L("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
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
      L("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, t) : o ? o() : this._dispatchAction("tap", { action: "toggle" }, t);
    };
    if (!a) {
      l();
      return;
    }
    const d = this._subTapTimerMap.get(s);
    if (d) {
      clearTimeout(d), this._subTapTimerMap.delete(s), L("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", r, t);
      return;
    }
    const _ = setTimeout(() => {
      this._subTapTimerMap.delete(s), l();
    }, 250);
    this._subTapTimerMap.set(s, _);
  }
  _handleSubContextMenu(e, t, i) {
    e.preventDefault(), e.stopPropagation(), !this._subHeld && (L("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
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
    const _ = Number(l.value), c = isNaN(_) ? 0 : _, h = a ? a(c) : c;
    if (d) {
      if (d.rafPending) return;
      d.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (d && (d.rafPending = !1), d?.isScrolling) {
        this._revertSlider(l, d);
        return;
      }
      l.style.setProperty("--slider-pct", `${h}%`);
      const g = l.closest(".slider-container, .sub-button-slider-container"), b = g?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (b && (b.textContent = s ? s(c, h) : `${h}%`), t === "color_hue" && g) {
        g.style.setProperty("--color-hue-val", `hsl(${c}, 100%, 50%)`);
        const y = g.querySelector(".color-chip-badge span");
        y && (y.style.background = `hsl(${c}, 100%, 50%)`);
      }
    }), L("selection", this.config.haptic_feedback !== !1);
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
      const r = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [o, a, s] = I(r);
      return `rgb(${o}, ${a}, ${s})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [r, o, a] = ut(t.hs_color[0], t.hs_color[1]);
      return `rgb(${r}, ${o}, ${a})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const r = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [o, a, s] = I(r);
      return `rgb(${o}, ${a}, ${s})`;
    }
    return e.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(e) {
    if (!e?.attributes || e.state !== "on") return "#ffffff";
    const t = e.attributes;
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return Ve(t.rgb_color);
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2)
      return Ve(ut(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const o = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return Ve(I(o));
    }
    const i = this._getLightLiveColor(e);
    if (!i) return "#ffffff";
    const r = B(i);
    return r ? Ve(r) : "#ffffff";
  }
  _getLiveHue(e) {
    if (!e) return 0;
    if (Array.isArray(e.attributes?.hs_color) && e.attributes.hs_color.length >= 1)
      return Math.round(e.attributes.hs_color[0]) % 360;
    if (Array.isArray(e.attributes?.rgb_color) && e.attributes.rgb_color.length >= 3) {
      const [t, i, r] = e.attributes.rgb_color;
      return ar(t, i, r);
    }
    return 0;
  }
  _handleColorInput(e, t, i, r) {
    e.stopPropagation();
    const o = e.target.value;
    if (!o) return;
    const a = B(o);
    if (!a) return;
    const s = i || this.config.entity, l = () => {
      this.hass.callService("light", "turn_on", { entity_id: s, rgb_color: a });
    };
    t ? this._throttledCall(r || "color_picker", l) : l();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return $``;
    const e = this.config.entity;
    if (!e)
      return $`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const t = this.hass.states[e];
    if (!t)
      return $`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${e}</code></span>
        </ha-card>
      `;
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", r = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", o = this._isEntityActive(t), a = e.split(".")[0];
    let s = "var(--primary-color)", l = null;
    a === "climate" ? t.state === "heat" ? s = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? s = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? s = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (s = "var(--state-climate-fan_only-color, #26a69a)") : a === "light" && (l = this._getLightLiveColor(t), l && (s = l));
    const d = this.config.color_type === "card";
    let _ = this._resolveColor(this.config.active_color);
    (!_ || this.config.use_light_color) && (a === "light" && l && (this.config.use_light_color || !this.config.active_color) ? _ = l : _ = s);
    const c = this._resolveColor(this.config.inactive_color) || "var(--secondary-background-color, rgba(150, 150, 150, 0.2))", h = this.config.show_slider !== !1, g = a === "light", b = a === "cover", y = a === "fan", S = a === "humidifier", p = a === "media_player", k = a === "number" || a === "input_number", f = a === "climate", C = this.config.hide_slider_when_off !== !1, x = this.config.hide_color_temp_when_off !== !1, w = this.config.hide_color_picker_when_off !== !1, T = this.config.hide_color_slider_when_off !== !1, u = t.attributes?.supported_color_modes;
    let v = t.attributes?.brightness !== void 0, A = !1, D = !1;
    if (Array.isArray(u))
      for (let M = 0; M < u.length; M++) {
        const ge = u[M];
        ge !== "onoff" && (v = !0), ge === "color_temp" && (A = !0), or.has(ge) && (D = !0);
      }
    const J = g && h && v && (!C || o), de = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, U = g && this.config.show_color_temp === !0 && (de !== void 0 || A) && (!x || o), ue = this.config.color_picker_type !== "wheel", Me = g && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && ue) && D && (!T || o), Pe = g && this.config.show_color_picker === !0 && !ue && D && (!w || o), F = t.state !== "unavailable" && t.state !== "unknown", Ee = b && F && h && t.attributes?.current_position !== void 0, Le = y && F && o && h && t.attributes?.percentage !== void 0, He = S && F && o && h && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), Ne = p && F && o && h && t.attributes?.volume_level !== void 0, Re = k && F && h, De = f && F && o && h && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), tt = (this.config.bg_opacity ?? 10) / 100, it = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : d && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${_};`, rt = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : d && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", H = this._calculateMultiStageFade(t, s, c), j = this.config.fade_target ?? "card", Y = this._resolveColor(this.config.bg_color);
    let G;
    H.activeFade && (j === "card" || j === "all" || d) ? G = H.currentColor : d ? G = o ? a === "light" && l ? l : _ : c : Y ? G = Y : G = `rgba(150, 150, 150, ${tt})`;
    let ee = this._resolveColor(this.config.active_color) || (a === "light" && l ? l : _) || "var(--primary-color)";
    H.activeFade && (j === "all" || this.config.active_glow === !0) && (ee = H.currentColor);
    let te = "";
    this.config.box_shadow === "soft" && (te = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (te = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (te = o || H.activeFade ? `box-shadow: 0 0 22px ${ee}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const ot = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", R = t?.attributes?.device_class, Be = a === "binary_sensor" && (R === "motion" || R === "occupancy" || R === "presence"), Oe = a === "binary_sensor" && (R === "door" || R === "window" || R === "garage_door" || R === "opening"), nt = Be && (o || H.activeFade && H.currentStage === 1) ? "motion-active" : "", at = Oe && o ? "door-open" : "", ze = `${this._staticCardClasses} ${ot} ${nt} ${at}`, ie = this._getSubButtons();
    this.config.font_weight_primary;
    let O = "";
    this.config.text_color_mode === "active_accent" && o ? O += `--primary-text-color: ${_}; ` : this.config.text_color_primary ? O += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : d && o && (O += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? O += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : d && o && (O += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const z = this.config.features_position === "inline", Ie = this.config.text_scrolling_primary || "none", Ue = this.config.text_scrolling_secondary || "none", _e = $`
      ${J ? this._renderLightSlider(t) : m}
      ${Ee ? this._renderCoverSlider(t) : m}
      ${Le ? this._renderFanSlider(t) : m}
      ${He ? this._renderHumidifierSlider(t) : m}
      ${Ne ? this._renderMediaSlider(t) : m}
      ${Re ? this._renderNumberSlider(t) : m}
      ${De ? this._renderClimateSlider(t) : m}
    `, he = $`
      ${U ? this._renderColorTempSlider(t) : m}
      ${Me ? this._renderColorSlider(t) : m}
      ${Pe ? this._renderColorPicker(t) : m}
    `, Fe = J || Ee || Le || He || Ne || Re || De, pe = U || Me || Pe, Ge = !z && pe || ie.length > 0, re = this.config.decay_slider_position ?? "bottom";
    return $`
      ${this.config.custom_styles ? $`<style>${this.config.custom_styles}</style>` : m}
      <ha-card 
        tabindex="0"
        class="${ze}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${G}; ${te} ${it} ${rt} ${O} --ag-glow-color: ${ee}; --ag-active-color: ${_};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${z ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${re === "top" ? this._renderDecaySlider(H) : m}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${i ? $`
                <div class="text-marquee-container scroll-${Ie}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : m}
              ${r ? $`
                <div class="text-marquee-container scroll-${Ue}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${r}</span>
                </div>` : m}
            </div>
            ${re === "inline" ? $`<div class="inline-sliders">${this._renderDecaySlider(H)}</div>` : m}
            ${z && Fe ? $`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${_e}</div>` : m}
            ${z && pe ? $`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${he}</div>` : m}
          </div>
          
          ${re === "bottom" ? this._renderDecaySlider(H) : m}
          ${!z && Fe ? $`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${_e}</div>` : m}

          ${Ge ? $`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!z && pe ? $`<div class="features-container" style="${this._featuresOffsetStyle}">${he}</div>` : m}

              ${ie.length > 0 ? $`
                <div class="sub-buttons-container">
                  ${Ni(
      ie,
      (M) => M.key,
      (M) => this._renderSubButton(M.entity || "", M.icon, M.color, M.bg !== !1, M.name, M.tapAction, M.holdAction, M.type, M.doubleTapAction, M.showState)
    )}
                </div>
              ` : m}
            </div>
          ` : m}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(e) {
    if (!this.config.show_decay_slider || !e.enabled || !e.activeFade)
      return m;
    const t = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (t ? 32 : 10), r = this.config.slider_border_radius ?? (t ? 16 : 5), o = Math.max(0, 100 - e.progressPct);
    return $`
      <div class="decay-slider-container" style="--decay-color: ${e.currentColor};">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${r}px;">
          <div class="decay-slider-fill" style="width: ${o}%; background: ${e.currentColor}; border-radius: ${r}px;"></div>
          <span class="decay-slider-badge">${e.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(e, t, i, r, o, a, s, l, d, _, c, h, g = "", b = "", y) {
    const S = this.config.slider_style === "google", p = S && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, k = h ? h(a, s) : `${s}%`, f = y !== void 0 ? y : k, C = this.config.slider_stepped_movement === !1 ? "any" : o, x = e !== "color_temp" && e !== "color_hue", w = this.config.slider_style === "full", T = x && w ? "main-slider-full" : "";
    let u = "";
    if (x && w) {
      const v = Number(this.config.slider_start_offset) || 0, A = Number(this.config.slider_end_offset) || 0;
      u = `left: ${v}px !important; right: ${A}px !important; width: calc(100% - ${v + A}px) !important;`;
    } else e === "color_temp" ? u = this._colorTempMarginOffsets : e === "color_hue" ? u = this._colorHueMarginOffsets : u = this._mainSliderMarginOffsets;
    return $`
      <div class="slider-container ${g} ${T} ${S ? "slider-google-wrap" : ""}" style="${u} ${b}">
        <input type="range" min=${i} max=${r} step=${C} .value=${a}
               aria-label="${t}"
               style="--slider-pct: ${s}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(v) => this._sliderInput(v, e, l, d, _, c, h)}
               @change=${(v) => this._sliderChange(v, l, d, _)} />
        ${p && f ? $`<span class="slider-percent-badge">${f}</span>` : m}
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
    const t = this.config.color_temp_type || "gradient", i = e.attributes.color_temp_kelvin !== void 0 || e.attributes.min_color_temp_kelvin !== void 0 || e.attributes.max_color_temp_kelvin !== void 0, r = i ? e.attributes.min_color_temp_kelvin || 2e3 : e.attributes.min_mireds || 153, o = i ? e.attributes.max_color_temp_kelvin || 6500 : e.attributes.max_mireds || 500, a = i ? e.attributes.color_temp_kelvin || 3e3 : e.attributes.color_temp || 300, s = o - r, l = s > 0 ? Math.max(0, Math.min(100, Math.round((a - r) / s * 100))) : 0, d = i ? "color_temp_kelvin" : "color_temp", _ = t === "google" || t === "gradient" && this.config.slider_style === "google", c = _ ? 42 : t === "thin" ? 6 : 12, h = _ ? 21 : t === "thin" ? 3 : 6, g = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? c, b = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? h, y = i ? `${a} K` : `${a} mireds`;
    if (t === "presets") {
      const S = Number(this.config.color_temp_start_offset) || 0, p = Number(this.config.color_temp_end_offset) || 0, k = [
        S ? `margin-left: ${S}px;` : "",
        p ? `margin-right: ${p}px;` : ""
      ].filter(Boolean).join(" ");
      return $`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${k}">
          ${sr.map((f) => {
        const [C, x, w] = f.rgb, T = Math.abs(a - f.k) < 200;
        return $`
              <button 
                type="button"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${g}px; border-radius: ${b}px; border: ${T ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${C}, ${x}, ${w}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${T ? "0 0 8px rgba(" + C + "," + x + "," + w + ", 0.8)" : "none"};"
                @click=${(u) => {
          u.stopPropagation(), L("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, [d]: f.k });
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${C}, ${x}, ${w}); display: inline-block;"></span>
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
      `color-temp ${i ? "kelvin" : "mireds"} ${_ ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${g}px; --ag-slider-radius: ${b}px;`,
      y
    );
  }
  _renderColorSlider(e) {
    const t = this.config.color_picker_type || "slider";
    if (t === "wheel")
      return this._renderColorPicker(e);
    if (t === "swatches") {
      const h = this._getLiveHex(e).toLowerCase(), g = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, b = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, y = Number(this.config.color_slider_start_offset) || 0, S = Number(this.config.color_slider_end_offset) || 0, p = [
        y ? `margin-left: ${y}px;` : "",
        S ? `margin-right: ${S}px;` : ""
      ].filter(Boolean).join(" ");
      return $`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${p}">
          ${gt.map((k) => {
        const f = h === k.hex.toLowerCase();
        return $`
              <button 
                type="button"
                tabindex="0"
                class="color-swatch-chip"
                title="${k.label}"
                style="flex: 1; min-width: 28px; height: ${g}px; border-radius: ${b}px; background: ${k.hex}; border: ${f ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${f ? "0 0 10px " + k.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @click=${(C) => {
          C.stopPropagation(), L("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: k.rgb });
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this._getLiveHue(e), r = Math.max(0, Math.min(100, Math.round(i / 360 * 100))), o = t === "google" || this.config.slider_style === "google", a = o ? 42 : 12, s = o ? 21 : 6, l = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? a, d = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? s, _ = `hsl(${i}, 100%, 50%)`, c = $`
      <span class="color-chip-badge" style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${_}; border: 1.5px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
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
      (h) => {
        const [g, b, y] = ut(h, 100);
        return { rgb_color: [g, b, y] };
      },
      (h) => Math.round(h / 360 * 100),
      (h) => `${h}°`,
      `color-hue ${o ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${l}px; --ag-slider-radius: ${d}px; --color-hue-val: ${_};`,
      c
    );
  }
  _renderColorPicker(e) {
    const t = this._getLiveHex(e), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, r = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return $`
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
    const t = Number(e.attributes.min ?? 0), i = Number(e.attributes.max ?? 100), r = Number(e.attributes.step ?? 1), o = Number(e.state), a = isNaN(o) ? t : o, s = i - t, l = s > 0 ? Math.max(0, Math.min(100, Math.round((a - t) / s * 100))) : 0, d = (this.config.entity || "number").split(".")[0], _ = e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : "";
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
      (c) => `${r < 1 ? Number(c).toFixed(1) : c}${_}`
    );
  }
  _renderClimateSlider(e) {
    const t = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = t ? "°F" : "°C", r = t ? 60 : 16, o = t ? 85 : 30, a = e.attributes.min_temp ?? r, s = e.attributes.max_temp ?? o, l = e.attributes.target_temp_step ?? e.attributes.target_temperature_step ?? (t ? 1 : 0.5), d = e.attributes.temperature ?? e.attributes.target_temp_low ?? e.attributes.target_temp_high ?? a, _ = s - a, c = _ > 0 ? Math.max(0, Math.min(100, Math.round((d - a) / _ * 100))) : 0;
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
      (h) => ({ temperature: h }),
      (h) => _ > 0 ? Math.round((h - a) / _ * 100) : 0,
      (h) => `${h}${i}`,
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
    const a = t || this.hass.states[this.config.entity || ""], s = e || this.config.entity || "", l = a?.attributes?.volume_level !== void 0 || a?.entity_id?.startsWith("media_player."), d = a?.attributes?.percentage !== void 0 || a?.entity_id?.startsWith("fan."), _ = a?.attributes?.current_position !== void 0 || a?.entity_id?.startsWith("cover.");
    let c = 0, h = 0, g = 255, b = "1", y = "turn_on", S = "light", p = "brightness";
    l ? (c = a?.attributes?.volume_level ?? 0, g = 1, b = "0.01", y = "set_volume_level", S = "media_player", p = "volume_level") : d ? (c = a?.attributes?.percentage ?? 0, g = 100, b = "1", y = "set_percentage", S = "fan", p = "percentage") : _ ? (c = a?.attributes?.current_position ?? 0, g = 100, b = "1", y = "set_cover_position", S = "cover", p = "position") : c = a?.attributes?.brightness ?? 0;
    const k = Math.round(g === 1 ? c * 100 : g === 100 ? c : c / 255 * 100);
    return i === "slider" ? $`
        <div class="sub-button-slider-container ${o}" style="${r}" title="Level: ${k}%">
          <input type="range" 
                 min="${h}" 
                 max=${g} 
                 step=${b} 
                 .value=${c}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const C = parseFloat(f.target.value), x = Math.round(g === 1 ? C * 100 : g === 100 ? C : C / 255 * 100), w = f.target.closest(".sub-button-slider-container");
      w && w.setAttribute("title", `Level: ${x}%`), this._throttledCall("sub_slider_" + s, () => {
        this.hass.callService(S, y, { entity_id: s, [p]: C });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const C = parseFloat(f.target.value);
      this.hass.callService(S, y, { entity_id: s, [p]: C });
    }} />
        </div>
      ` : $`
        <div class="sub-button-google-slider ${o}" style="${r} --slider-pct: ${k}%;" title="Level: ${k}%">
          <input type="range" 
                 min="${h}" 
                 max=${g} 
                 step=${b} 
                 .value=${c}
                 style="--slider-pct: ${k}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const C = parseFloat(f.target.value), x = Math.round(g === 1 ? C * 100 : g === 100 ? C : C / 255 * 100), w = f.target;
      w.style.setProperty("--slider-pct", `${x}%`);
      const T = w.closest(".sub-button-google-slider");
      if (T) {
        T.style.setProperty("--slider-pct", `${x}%`), T.setAttribute("title", `Level: ${x}%`);
        const u = T.querySelector(".sub-slider-pct");
        u && (u.textContent = `${x}%`);
      }
      this._throttledCall("sub_slider_" + s, () => {
        this.hass.callService(S, y, { entity_id: s, [p]: C });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const C = parseFloat(f.target.value);
      this.hass.callService(S, y, { entity_id: s, [p]: C });
    }} />
          <span class="sub-slider-pct">${k}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(e, t, i, r, o, a) {
    const s = t || this.hass.states[this.config.entity || ""], l = this._getLiveHex(s);
    return $`
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
        ${o ? $`<span class="sub-button-label">${o}</span>` : m}
        ${a ? $`<span class="sub-button-state">${a}</span>` : m}
      </div>
    `;
  }
  _renderSubButton(e, t, i, r = !0, o, a, s, l = "button", d, _ = !1) {
    const c = e ? this.hass.states[e] : void 0;
    if (e && !c)
      return $`
        <div class="sub-button missing" title="Entity not found: ${e}">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        </div>
      `;
    const h = c ? this._isEntityActive(c) : !1;
    let g = this._resolveColor(i);
    !g && h && c?.attributes?.rgb_color && Array.isArray(c.attributes.rgb_color) && (g = `rgb(${c.attributes.rgb_color.join(",")})`);
    const b = g ? `color: ${g};` : "", y = r ? "" : "no-bg", S = _ && c ? this._getInfoContent("state", c) : "";
    if (l === "slider" || l === "google_slider")
      return this._renderSubSlider(e, c, l, b, y);
    if (l === "color_picker")
      return this._renderSubColorPicker(e, c, b, y, o, S);
    let p = t, k = h, f = o || "", C = "", x = o, w;
    if (a && a.action && a.action !== "none" && a.action !== "default")
      p || (p = c?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (l) {
        case "play_pause": {
          const u = c?.state === "playing";
          k = u, p || (p = u ? "mdi:pause" : "mdi:play"), f = u ? "Pause" : "Play", w = () => {
            this.hass.callService("media_player", "media_play_pause", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "next": {
          p || (p = "mdi:skip-next"), f = "Next Track", w = () => {
            this.hass.callService("media_player", "media_next_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "previous": {
          p || (p = "mdi:skip-previous"), f = "Previous Track", w = () => {
            this.hass.callService("media_player", "media_previous_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "open_close": {
          const u = c?.state === "open" || c?.state === "on" || c?.attributes?.current_position !== void 0 && c.attributes.current_position > 0;
          k = u, p || (p = u ? "mdi:window-shutter-open" : "mdi:window-shutter"), f = u ? "Close" : "Open", w = () => {
            this.hass.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "stop": {
          p || (p = "mdi:stop"), f = "Stop", w = () => {
            this.hass.callService("cover", "stop_cover", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const u = c?.state === "locked";
          k = !u, p || (p = u ? "mdi:lock" : "mdi:lock-open-variant"), f = u ? "Unlock" : "Lock", w = () => {
            this.hass.callService("lock", u ? "unlock" : "lock", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const u = c?.attributes?.percentage ?? 0;
          p || (p = "mdi:fan"), h && (C = "anim-spin"), f = `Speed: ${u}%`, x || (x = u > 0 ? `${u}%` : "Off"), w = () => {
            let v = 33;
            u >= 90 ? v = 0 : u >= 60 ? v = 100 : u >= 30 && (v = 66), this.hass.callService("fan", "set_percentage", { entity_id: e || this.config.entity, percentage: v });
          };
          break;
        }
        case "clean": {
          const u = c?.state === "cleaning";
          k = u, p || (p = u ? "mdi:pause" : "mdi:robot-vacuum"), f = u ? "Pause Vacuum" : "Start Vacuum", w = () => {
            this.hass.callService("vacuum", u ? "pause" : "start", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dock": {
          p || (p = "mdi:home-import-outline"), f = "Return to Dock", w = () => {
            this.hass.callService("vacuum", "return_to_base", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "locate": {
          p || (p = "mdi:map-marker-question-outline"), f = "Locate", w = () => {
            this.hass.callService("vacuum", "locate", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const u = c?.state || "off", v = c?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], A = v[(v.indexOf(u) + 1) % v.length] || "auto";
          k = u !== "off", p || (u === "heat" ? p = "mdi:fire" : u === "cool" ? p = "mdi:snowflake" : u === "dry" ? p = "mdi:water-percent" : u === "fan_only" ? p = "mdi:fan" : u === "auto" ? p = "mdi:thermostat-auto" : p = "mdi:power"), f = `Mode: ${u} -> Next: ${A}`, x || (x = u), w = () => {
            this.hass.callService("climate", "set_hvac_mode", { entity_id: e || this.config.entity, hvac_mode: A });
          };
          break;
        }
        case "light_effect": {
          const u = c?.attributes?.effect_list || [], v = c?.attributes?.effect || "None", A = u.length > 0 ? u[(u.indexOf(v) + 1) % u.length] || u[0] : "None";
          p || (p = "mdi:creation"), k = v !== "None" && v !== "off" && h, f = `Effect: ${v} -> Next: ${A}`, x || (x = v !== "None" ? v : "Effect"), w = () => {
            u.length > 0 && this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, effect: A });
          };
          break;
        }
        case "brightness": {
          const u = c?.attributes?.brightness, v = u !== void 0 ? Math.round(u / 255 * 100) : 0;
          p || (p = "mdi:brightness-6"), f = `Brightness: ${v}%`, x || (x = `${v}%`), w = () => {
            let A = 255;
            v >= 85 ? A = 76 : v >= 50 ? A = 255 : A = 178, this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: A });
          };
          break;
        }
        case "garage_toggle": {
          const u = c?.state === "open" || c?.state === "opening";
          k = u, p || (p = u ? "mdi:garage-open" : "mdi:garage"), f = u ? "Close Garage" : "Open Garage", w = () => {
            this.hass.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const u = c?.attributes?.brightness ?? 0, v = Math.min(255, u + 26);
          p || (p = "mdi:brightness-5"), f = "Brightness +10%", x || (x = "+10%"), w = () => {
            this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: v });
          };
          break;
        }
        case "dim_down": {
          const u = c?.attributes?.brightness ?? 0, v = Math.max(1, u - 26);
          p || (p = "mdi:brightness-4"), f = "Brightness -10%", x || (x = "-10%"), w = () => {
            this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: v });
          };
          break;
        }
        case "temp_warm": {
          p || (p = "mdi:weather-sunny"), f = "Warm White (2700K)", x || (x = "2700K"), w = () => {
            this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          p || (p = "mdi:weather-sunset-up"), f = "Cool Daylight (6000K)", x || (x = "6000K"), w = () => {
            this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          p || (p = "mdi:palette-swatch-outline"), f = "Color Temperature", x || (x = "Temp"), w = () => {
            const u = c?.attributes?.color_temp_kelvin || 3e3;
            let v = 2700;
            u < 3300 ? v = 4e3 : u < 5e3 ? v = 6e3 : v = 2700, this.hass.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: v });
          };
          break;
        }
        case "button":
        default: {
          p || (p = c?.attributes?.icon || "mdi:checkbox-blank-circle"), f = o || (c?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const T = (u) => {
      this._handleSubTap(u, e, a, d, w);
    };
    return $`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${y}" 
        ?active=${k} 
        style="${b} ${k && g && r ? `background: ${g}; color: #fff;` : ""}"
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
        <ha-icon .icon=${p} class="${C}"></ha-icon>
        ${x ? $`<span class="sub-button-label">${x}</span>` : m}
        ${S ? $`<span class="sub-button-state">${S}</span>` : m}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return Yt`
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
        contain: layout style;
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
ce([
  Je({ attribute: !1 })
], V.prototype, "hass", 2);
ce([
  Je({ type: Boolean })
], V.prototype, "preview", 2);
ce([
  je()
], V.prototype, "config", 2);
ce([
  je()
], V.prototype, "_collapsed", 2);
ce([
  Qt({ passive: !0 })
], V.prototype, "_handlePointerMove", 1);
ce([
  Qt({ passive: !0 })
], V.prototype, "_handleSubPointerMove", 1);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", V);
customElements.get("antigravity-card") || customElements.define("antigravity-card", V);
export {
  V as AntigravityCard,
  tr as CARD_VERSION
};
