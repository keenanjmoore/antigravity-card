const Je = globalThis, vt = Je.ShadowRoot && (Je.ShadyCSS === void 0 || Je.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Yt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (vt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = At.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && At.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ri = (a) => new Yt(typeof a == "string" ? a : a + "", void 0, yt), qt = (a, ...e) => {
  const t = a.length === 1 ? a[0] : e.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + a[o + 1], a[0]);
  return new Yt(t, a, yt);
}, oi = (a, e) => {
  if (vt) a.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = Je.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, a.appendChild(i);
  }
}, Mt = vt ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ri(t);
})(a) : a;
const { is: ni, defineProperty: ai, getOwnPropertyDescriptor: si, getOwnPropertyNames: li, getOwnPropertySymbols: ci, getPrototypeOf: di } = Object, tt = globalThis, Et = tt.trustedTypes, ui = Et ? Et.emptyScript : "", _i = tt.reactiveElementPolyfillSupport, Se = (a, e) => a, je = { toAttribute(a, e) {
  switch (e) {
    case Boolean:
      a = a ? ui : null;
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
} }, xt = (a, e) => !ni(a, e), Pt = { attribute: !0, type: String, converter: je, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ??= Symbol("metadata"), tt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ae = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Pt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && ai(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: o } = si(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Se("elementProperties"))) return;
    const e = di(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Se("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Se("properties"))) {
      const t = this.properties, i = [...li(t), ...ci(t)];
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
      for (const r of i) t.unshift(Mt(r));
    } else e !== void 0 && t.push(Mt(e));
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
    return oi(e, this.constructor.elementStyles), e;
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
      if (r === !1 && (o = this[e]), i ??= n.getPropertyOptions(e), !((i.hasChanged ?? xt)(o, t) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
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
ae.elementStyles = [], ae.shadowRootOptions = { mode: "open" }, ae[Se("elementProperties")] = /* @__PURE__ */ new Map(), ae[Se("finalized")] = /* @__PURE__ */ new Map(), _i?.({ ReactiveElement: ae }), (tt.reactiveElementVersions ??= []).push("2.1.2");
const wt = globalThis, Lt = (a) => a, et = wt.trustedTypes, Dt = et ? et.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, Kt = "$lit$", V = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + V, hi = `<${Xt}>`, Q = document, Ce = () => Q.createComment(""), ke = (a) => a === null || typeof a != "object" && typeof a != "function", $t = Array.isArray, pi = (a) => $t(a) || typeof a?.[Symbol.iterator] == "function", _t = `[ 	
\f\r]`, ye = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Rt = /-->/g, Ht = />/g, K = RegExp(`>|${_t}(?:([^\\s"'>=/]+)(${_t}*=${_t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Nt = /'/g, Ot = /"/g, Zt = /^(?:script|style|textarea|title)$/i, fi = (a) => (e, ...t) => ({ _$litType$: a, strings: e, values: t }), w = fi(1), J = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Bt = /* @__PURE__ */ new WeakMap(), Z = Q.createTreeWalker(Q, 129);
function Qt(a, e) {
  if (!$t(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Dt !== void 0 ? Dt.createHTML(e) : e;
}
const gi = (a, e) => {
  const t = a.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = ye;
  for (let s = 0; s < t; s++) {
    const l = a[s];
    let d, _, c = -1, f = 0;
    for (; f < l.length && (n.lastIndex = f, _ = n.exec(l), _ !== null); ) f = n.lastIndex, n === ye ? _[1] === "!--" ? n = Rt : _[1] !== void 0 ? n = Ht : _[2] !== void 0 ? (Zt.test(_[2]) && (r = RegExp("</" + _[2], "g")), n = K) : _[3] !== void 0 && (n = K) : n === K ? _[0] === ">" ? (n = r ?? ye, c = -1) : _[1] === void 0 ? c = -2 : (c = n.lastIndex - _[2].length, d = _[1], n = _[3] === void 0 ? K : _[3] === '"' ? Ot : Nt) : n === Ot || n === Nt ? n = K : n === Rt || n === Ht ? n = ye : (n = K, r = void 0);
    const h = n === K && a[s + 1].startsWith("/>") ? " " : "";
    o += n === ye ? l + hi : c >= 0 ? (i.push(d), l.slice(0, c) + Kt + l.slice(c) + V + h) : l + V + (c === -2 ? s : h);
  }
  return [Qt(a, o + (a[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Te {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const s = e.length - 1, l = this.parts, [d, _] = gi(e, t);
    if (this.el = Te.createElement(d, i), Z.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = Z.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(Kt)) {
          const f = _[n++], h = r.getAttribute(c).split(V), m = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: m[2], strings: h, ctor: m[1] === "." ? bi : m[1] === "?" ? vi : m[1] === "@" ? yi : it }), r.removeAttribute(c);
        } else c.startsWith(V) && (l.push({ type: 6, index: o }), r.removeAttribute(c));
        if (Zt.test(r.tagName)) {
          const c = r.textContent.split(V), f = c.length - 1;
          if (f > 0) {
            r.textContent = et ? et.emptyScript : "";
            for (let h = 0; h < f; h++) r.append(c[h], Ce()), Z.nextNode(), l.push({ type: 2, index: ++o });
            r.append(c[f], Ce());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Xt) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(V, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += V.length - 1;
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
  if (e === J) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const o = ke(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(a), r._$AT(a, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = ce(a, r._$AS(a, e.values), r, i)), e;
}
class mi {
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
    Z.currentNode = r;
    let o = Z.nextNode(), n = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new de(o, o.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (d = new xi(o, this, e)), this._$AV.push(d), l = i[++s];
      }
      n !== l?.index && (o = Z.nextNode(), n++);
    }
    return Z.currentNode = Q, r;
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
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = ce(this, e, t), ke(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== J && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : pi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && ke(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Q.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Te.createElement(Qt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new mi(r, this), n = o.u(this.options);
      o.p(t), this.T(n), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Bt.get(e.strings);
    return t === void 0 && Bt.set(e.strings, t = new Te(e)), t;
  }
  k(e) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const o of e) r === t.length ? t.push(i = new de(this.O(Ce()), this.O(Ce()), this, this.options)) : i = t[r], i._$AI(o), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = Lt(e).nextSibling;
      Lt(e).remove(), e = i;
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
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  _$AI(e, t = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = ce(this, e, t, 0), n = !ke(e) || e !== this._$AH && e !== J, n && (this._$AH = e);
    else {
      const s = e;
      let l, d;
      for (e = o[0], l = 0; l < o.length - 1; l++) d = ce(this, s[i + l], t, l), d === J && (d = this._$AH[l]), n ||= !ke(d) || d !== this._$AH[l], d === b ? e = b : e !== b && (e += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class bi extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
}
class vi extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
}
class yi extends it {
  constructor(e, t, i, r, o) {
    super(e, t, i, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ce(this, e, t, 0) ?? b) === J) return;
    const i = this._$AH, r = e === b && i !== b || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== b && (i === b || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let xi = class {
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
const wi = { I: de }, $i = wt.litHtmlPolyfillSupport;
$i?.(Te, de), (wt.litHtmlVersions ??= []).push("3.3.3");
const Si = (a, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    i._$litPart$ = r = new de(e.insertBefore(Ce(), o), o, void 0, t ?? {});
  }
  return r._$AI(a), r;
};
const St = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Si(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return J;
  }
};
le._$litElement$ = !0, le.finalized = !0, St.litElementHydrateSupport?.({ LitElement: le });
const Ci = St.litElementPolyfillSupport;
Ci?.({ LitElement: le });
(St.litElementVersions ??= []).push("4.2.2");
const ki = { attribute: !0, type: String, converter: je, reflect: !1, hasChanged: xt }, Ti = (a = ki, e, t) => {
  const { kind: i, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((a = Object.create(a)).wrapped = !0), o.set(t.name, a), i === "accessor") {
    const { name: n } = t;
    return { set(s) {
      const l = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(n, l, a, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, a, s), s;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(s) {
      const l = this[n];
      e.call(this, s), this.requestUpdate(n, l, a, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function rt(a) {
  return (e, t) => typeof t == "object" ? Ti(a, e, t) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(a, e, t);
}
function ot(a) {
  return rt({ ...a, state: !0, attribute: !1 });
}
function Jt(a) {
  return (e, t) => {
    const i = typeof e == "function" ? e : e[t];
    Object.assign(i, a);
  };
}
const Ai = { CHILD: 2 }, Mi = (a) => (...e) => ({ _$litDirective$: a, values: e });
let Ei = class {
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
const { I: Pi } = wi, zt = (a) => a, It = () => document.createComment(""), xe = (a, e, t) => {
  const i = a._$AA.parentNode, r = e === void 0 ? a._$AB : e._$AA;
  if (t === void 0) {
    const o = i.insertBefore(It(), r), n = i.insertBefore(It(), r);
    t = new Pi(o, n, a, a.options);
  } else {
    const o = t._$AB.nextSibling, n = t._$AM, s = n !== a;
    if (s) {
      let l;
      t._$AQ?.(a), t._$AM = a, t._$AP !== void 0 && (l = a._$AU) !== n._$AU && t._$AP(l);
    }
    if (o !== r || s) {
      let l = t._$AA;
      for (; l !== o; ) {
        const d = zt(l).nextSibling;
        zt(i).insertBefore(l, r), l = d;
      }
    }
  }
  return t;
}, X = (a, e, t = a) => (a._$AI(e, t), a), Li = {}, Di = (a, e = Li) => a._$AH = e, Ri = (a) => a._$AH, ht = (a) => {
  a._$AR(), a._$AA.remove();
};
const Ut = (a, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) i.set(a[r], r);
  return i;
}, Hi = Mi(class extends Ei {
  constructor(a) {
    if (super(a), a.type !== Ai.CHILD) throw Error("repeat() can only be used in text expressions");
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
    const r = Ri(a), { values: o, keys: n } = this.dt(e, t, i);
    if (!Array.isArray(r)) return this.ut = n, o;
    const s = this.ut ??= [], l = [];
    let d, _, c = 0, f = r.length - 1, h = 0, m = o.length - 1;
    for (; c <= f && h <= m; ) if (r[c] === null) c++;
    else if (r[f] === null) f--;
    else if (s[c] === n[h]) l[h] = X(r[c], o[h]), c++, h++;
    else if (s[f] === n[m]) l[m] = X(r[f], o[m]), f--, m--;
    else if (s[c] === n[m]) l[m] = X(r[c], o[m]), xe(a, l[m + 1], r[c]), c++, m--;
    else if (s[f] === n[h]) l[h] = X(r[f], o[h]), xe(a, r[c], r[f]), f--, h++;
    else if (d === void 0 && (d = Ut(n, h, m), _ = Ut(s, c, f)), d.has(s[c])) if (d.has(s[f])) {
      const y = _.get(n[h]), S = y !== void 0 ? r[y] : null;
      if (S === null) {
        const p = xe(a, r[c]);
        X(p, o[h]), l[h] = p;
      } else l[h] = X(S, o[h]), xe(a, r[c], S), r[y] = null;
      h++;
    } else ht(r[f]), f--;
    else ht(r[c]), c++;
    for (; h <= m; ) {
      const y = xe(a, l[m + 1]);
      X(y, o[h]), l[h++] = y;
    }
    for (; c <= f; ) {
      const y = r[c++];
      y !== null && ht(y);
    }
    return this.ut = n, Di(a, l), J;
  }
});
var Ft, Gt;
(function(a) {
  a.language = "language", a.system = "system", a.comma_decimal = "comma_decimal", a.decimal_comma = "decimal_comma", a.space_comma = "space_comma", a.none = "none";
})(Ft || (Ft = {})), function(a) {
  a.language = "language", a.system = "system", a.am_pm = "12", a.twenty_four = "24";
}(Gt || (Gt = {}));
function Ni(a) {
  return a.substr(0, a.indexOf("."));
}
var Oi = ["closed", "locked", "off"], Ae = function(a, e, t, i) {
  i = i || {}, t = t ?? {};
  var r = new Event(e, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return r.detail = t, a.dispatchEvent(r), r;
}, $e = function(a) {
  Ae(window, "haptic", a);
}, Bi = function(a, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), Ae(window, "location-changed", { replace: t });
}, zi = function(a, e, t) {
  t === void 0 && (t = !0);
  var i, r = Ni(e), o = r === "group" ? "homeassistant" : r;
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
}, Ii = function(a, e) {
  var t = Oi.includes(a.states[e].state);
  return zi(a, e, t);
}, Ui = function(a, e, t, i) {
  if (i || (i = { action: "more-info" }), !i.confirmation || i.confirmation.exemptions && i.confirmation.exemptions.some(function(o) {
    return o.user === e.user.id;
  }) || ($e("warning"), confirm(i.confirmation.text || "Are you sure you want to " + i.action + "?"))) switch (i.action) {
    case "more-info":
      (t.entity || t.camera_image) && Ae(a, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      i.navigation_path && Bi(0, i.navigation_path);
      break;
    case "url":
      i.url_path && window.open(i.url_path);
      break;
    case "toggle":
      t.entity && (Ii(e, t.entity), $e("success"));
      break;
    case "call-service":
      if (!i.service) return void $e("failure");
      var r = i.service.split(".", 2);
      e.callService(r[0], r[1], i.service_data, i.target), $e("success");
      break;
    case "fire-dom-event":
      Ae(a, "ll-custom", i);
  }
}, Fi = function(a, e, t, i) {
  var r;
  i === "double_tap" && t.double_tap_action ? r = t.double_tap_action : i === "hold" && t.hold_action ? r = t.hold_action : i === "tap" && t.tap_action && (r = t.tap_action), Ui(a, e, t, r);
};
const mt = {
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
var Gi = Object.defineProperty, Ct = (a, e, t, i) => {
  for (var r = void 0, o = a.length - 1, n; o >= 0; o--)
    (n = a[o]) && (r = n(e, t, r) || r);
  return r && Gi(e, t, r), r;
};
const Vi = [
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
], Wi = [
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
], Yi = [
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
], qi = [
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
], Ki = [
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
], Vt = [
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
const Xi = nt(1), Zi = nt(2), Qi = nt(3), Ji = nt(4), ji = [
  { name: "tap_action", selector: { "ui-action": {} } },
  { name: "hold_action", selector: { "ui-action": {} } },
  { name: "double_tap_action", selector: { "ui-action": {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
];
function R(a) {
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
  const e = R(a);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(i) || isNaN(r)))
    return [t, i, r];
}
const er = {
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
      i && t.bg_opacity === void 0 && (t.bg_opacity = Math.round(parseFloat(i[1]) * 100)), t.bg_color = R(t.bg_color);
    }
    t.card_border_color && (t.card_border_color = R(t.card_border_color)), t.active_color && (t.active_color = R(t.active_color)), t.inactive_color && (t.inactive_color = R(t.inactive_color)), t.slider_color && (t.slider_color = R(t.slider_color)), t.slider_track_color && (t.slider_track_color = R(t.slider_track_color)), t.text_color_primary && (t.text_color_primary = R(t.text_color_primary)), t.text_color_secondary && (t.text_color_secondary = R(t.text_color_secondary)), t.sub_button_1_color && (t.sub_button_1_color = R(t.sub_button_1_color)), t.sub_button_2_color && (t.sub_button_2_color = R(t.sub_button_2_color)), t.sub_button_3_color && (t.sub_button_3_color = R(t.sub_button_3_color)), t.sub_button_4_color && (t.sub_button_4_color = R(t.sub_button_4_color)), this._config = {
      ...mt,
      ...t
    };
  }
  _computeLabel(e) {
    return er[e.name] || e.name;
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
    return w`
      <div class="custom-panel ${n ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${i}</span>
          </div>
          <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${n ? w`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${o}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, r)}
            ></ha-form>
          </div>
        ` : b}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, i, r) {
    const o = `sub${e}`, n = !!this._openPanels[o];
    return w`
      <div class="sub-nested-panel ${n ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(o)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${n ? w`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(s) => this._valueChanged(s, i)}
            ></ha-form>
          </div>
        ` : b}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return w``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", i = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", o = this._config?.sub_button_4_entity || "", n = !!this._openPanels.sub_buttons;
    return w`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", Vi, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", Wi, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Yi, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", qi, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Ki, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${n ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${n ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${n ? w`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Vt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(s) => this._valueChanged(s, Vt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, Xi, e)}
                ${this._renderSubButtonPanel(2, i, Zi, e)}
                ${this._renderSubButtonPanel(3, r, Qi, e)}
                ${this._renderSubButtonPanel(4, o, Ji, e)}
              </div>
            </div>
          ` : b}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", ji, e)}
      </div>
    `;
  }
  static get styles() {
    return qt`
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
Ct([
  rt({ attribute: !1 })
], Me.prototype, "hass");
Ct([
  ot()
], Me.prototype, "_config");
Ct([
  ot()
], Me.prototype, "_openPanels");
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", Me);
customElements.get("antigravity-card-editor") || customElements.define("antigravity-card-editor", Me);
var tr = Object.defineProperty, ir = Object.getOwnPropertyDescriptor, ue = (a, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? ir(e, t) : e, o = a.length - 1, n; o >= 0; o--)
    (n = a[o]) && (r = (i ? n(e, t, r) : n(r)) || r);
  return i && r && tr(e, t, r), r;
};
const rr = "125";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${rr} `,
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
const or = /* @__PURE__ */ new Set([
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
]), nr = /* @__PURE__ */ new Set([
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
]), ar = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), sr = /* @__PURE__ */ new Set([
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
]), jt = /^\d+\s*,\s*\d+\s*,\s*\d+$/, lr = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/, Xe = /* @__PURE__ */ new Map();
function U(a) {
  (isNaN(a) || !isFinite(a)) && (a = 3e3);
  const e = Math.max(1e3, Math.min(4e4, Math.round(a))), t = Xe.get(e);
  if (t) return t;
  const i = e / 100;
  let r, o, n;
  if (i <= 66)
    r = 255;
  else {
    const l = i - 60;
    r = 329.698727446 * Math.pow(l, -0.1332047592), r = Math.max(0, Math.min(255, r));
  }
  if (i <= 66)
    o = i, o = 99.4708025861 * Math.log(o) - 161.1195681661, o = Math.max(0, Math.min(255, o));
  else {
    const l = i - 60;
    o = 288.1221695283 * Math.pow(l, -0.0755148492), o = Math.max(0, Math.min(255, o));
  }
  if (i >= 66)
    n = 255;
  else if (i <= 19)
    n = 0;
  else {
    const l = i - 10;
    n = 138.5177312231 * Math.log(l) - 305.0447927307, n = Math.max(0, Math.min(255, n));
  }
  const s = [Math.round(r), Math.round(o), Math.round(n)];
  return Xe.size > 256 && Xe.clear(), Xe.set(e, s), s;
}
function Ze(a) {
  return !Array.isArray(a) || a.length < 3 ? "#ffffff" : "#" + a.slice(0, 3).map((e) => Math.round(Number(e) || 0).toString(16).padStart(2, "0")).join("");
}
function cr(a, e, t) {
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
function pt(a, e) {
  a = a % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const t = 1, i = Math.floor(a * 6), r = a * 6 - i, o = t * (1 - e), n = t * (1 - r * e), s = t * (1 - (1 - r) * e);
  let l = 0, d = 0, _ = 0;
  switch (i % 6) {
    case 0:
      l = t, d = s, _ = o;
      break;
    case 1:
      l = n, d = t, _ = o;
      break;
    case 2:
      l = o, d = t, _ = s;
      break;
    case 3:
      l = o, d = n, _ = t;
      break;
    case 4:
      l = s, d = o, _ = t;
      break;
    case 5:
      l = t, d = o, _ = n;
      break;
  }
  return [Math.round(l * 255), Math.round(d * 255), Math.round(_ * 255)];
}
const bt = [
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
], dr = [
  { k: 2200, label: "2200K", rgb: U(2200) },
  { k: 2700, label: "2700K", rgb: U(2700) },
  { k: 3e3, label: "3000K", rgb: U(3e3) },
  { k: 4e3, label: "4000K", rgb: U(4e3) },
  { k: 5e3, label: "5000K", rgb: U(5e3) },
  { k: 6500, label: "6500K", rgb: U(6500) }
], we = /* @__PURE__ */ new Map(), ur = 200;
function O(a) {
  if (!a) return null;
  const e = a.trim().toLowerCase();
  if (!e) return null;
  const t = we.get(e);
  if (t !== void 0) return t;
  const i = _r(e);
  if (we.size >= ur) {
    const r = we.keys().next().value;
    r && we.delete(r);
  }
  return we.set(e, i), i;
}
function _r(a) {
  if (a.startsWith("#")) {
    const e = a.slice(1);
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
  if (jt.test(a)) {
    const e = a.split(",").map((t) => parseInt(t.trim(), 10));
    if (e.length >= 3 && !e.some(isNaN))
      return [e[0], e[1], e[2]];
  }
  for (let e = 0; e < bt.length; e++) {
    const t = bt[e];
    if (a === t.label.toLowerCase() || a === t.hex)
      return [t.rgb[0], t.rgb[1], t.rgb[2]];
  }
  return null;
}
function ft(a, e, t) {
  const i = Math.max(0, Math.min(1, t));
  return [
    Math.round(a[0] + (e[0] - a[0]) * i),
    Math.round(a[1] + (e[1] - a[1]) * i),
    Math.round(a[2] + (e[2] - a[2]) * i)
  ];
}
function gt(a) {
  return `rgb(${a[0]}, ${a[1]}, ${a[2]})`;
}
const Qe = Object.freeze({
  enabled: !1,
  activeFade: !1,
  currentColor: "",
  progressPct: 0,
  remainingSeconds: 0,
  currentStage: 0,
  stageLabel: ""
});
function L(a, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if ($e(a), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        const t = a === "heavy" ? 20 : a === "medium" ? 12 : 6;
        navigator.vibrate(t);
      }
    } catch {
    }
}
const ne = /* @__PURE__ */ new Map(), Wt = 250;
function hr(a) {
  if (!a) return "";
  const e = ne.get(a);
  if (e !== void 0) return e;
  const t = a.trim();
  if (!t)
    return ne.set(a, ""), "";
  let i = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? i = t : jt.test(t) ? i = `rgb(${t})` : lr.test(t) ? i = `rgba(${t})` : t.toLowerCase() === "state" ? i = "var(--state-icon-color, var(--primary-color))" : nr.has(t.toLowerCase()) && (i = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), ne.size >= Wt) {
    const r = Math.floor(Wt / 4), o = ne.keys();
    for (let n = 0; n < r; n++) {
      const s = o.next().value;
      s !== void 0 && ne.delete(s);
    }
  }
  return ne.set(a, i), i;
}
class W extends le {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new Map(), this._onSliderPointerDown = (e) => {
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
          r < 6 && o < 6 && (this._revertSlider(t, i), L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
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
    return { ...mt };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...mt,
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
    const e = this.config.card_padding ?? 12, t = this.config.card_padding_vertical ?? 4, i = this.config.card_padding_horizontal ?? e, r = this.config.card_padding_top ?? t, o = this.config.card_padding_bottom ?? t, n = this.config.card_padding_left ?? i, s = this.config.card_padding_right ?? i, l = this.config.card_margin, d = this.config.card_margin_vertical ?? l, _ = this.config.card_margin_horizontal ?? l, c = this.config.card_margin_top ?? d, f = this.config.card_margin_bottom ?? d, h = this.config.card_margin_left ?? _, m = this.config.card_margin_right ?? _;
    let y = "";
    (c !== void 0 || f !== void 0 || h !== void 0 || m !== void 0) && (y = `margin: ${c ?? 0}px ${m ?? 0}px ${f ?? 0}px ${h ?? 0}px;`);
    const S = this.config.border_radius ?? 12, p = this.config.slider_style === "google", C = this.config.slider_style === "full", g = p ? 42 : C ? 40 : 12, k = this.config.slider_height !== void 0 ? this.config.slider_height : g, x = p ? 21 : C ? 0 : k / 2, $ = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : x, T = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), u = this.config.card_border_style ?? "solid", v = T > 0 ? `border: ${T}px ${u} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", A = this.config.card_width ? `width: ${this.config.card_width};` : "", B = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", Y = this.config.card_height ? `height: ${this.config.card_height};` : "", j = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", q = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", _e = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", Ee = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", Pe = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", Le = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", F = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, De = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, Re = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, He = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Ne = this.config.sub_button_padding ?? 0, Oe = this.config.sub_button_container_padding ?? 0, Be = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "", at = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", st = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      y,
      `border-radius: ${S}px;`,
      v,
      A,
      B,
      Y,
      j,
      q,
      _e,
      Ee,
      Pe,
      Le,
      `--ag-card-padding: ${r}px ${s}px ${o}px ${n}px;`,
      `--ag-text-padding: ${F}px ${De}px;`,
      `--ag-features-padding: ${Re}px ${He}px;`,
      `--ag-sub-button-padding: ${Ne}px;`,
      `--ag-sub-button-container-padding: ${Oe}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 12}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? 2}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? 4}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? 6}px;`,
      `--ag-slider-height: ${k}px;`,
      `--ag-slider-radius: ${$}px;`,
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
    const G = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x) || 0, he = Number(this.config.primary_text_end_offset) || 0, H = Number(this.config.primary_text_offset_y) || 0, pe = G !== 0 || H !== 0 ? `transform: translate(${G}px, ${H}px);` : "", ee = G !== 0 || he !== 0 ? `margin-left: ${G}px; margin-right: ${he}px;` : "";
    this._primaryTextOffsetStyle = `${pe} ${ee}`.trim();
    const te = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x) || 0, N = Number(this.config.secondary_text_end_offset) || 0, Ie = Number(this.config.secondary_text_offset_y) || 0, lt = te !== 0 || Ie !== 0 ? `transform: translate(${te}px, ${Ie}px);` : "", ct = te !== 0 || N !== 0 ? `margin-left: ${te}px; margin-right: ${N}px;` : "";
    this._secondaryTextOffsetStyle = `${lt} ${ct}`.trim();
    const Ue = Number(this.config.features_offset_x) || 0, Fe = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = Ue !== 0 || Fe !== 0 ? `transform: translate(${Ue}px, ${Fe}px);` : "";
    const ie = Number(this.config.slider_start_offset) || 0, z = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      ie ? `margin-left: ${ie}px !important;` : "",
      z ? `margin-right: ${z}px !important;` : ""
    ].filter(Boolean).join(" ");
    const I = Number(this.config.color_temp_start_offset) || 0, Ge = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      I ? `margin-left: ${I}px !important;` : "",
      Ge ? `margin-right: ${Ge}px !important;` : ""
    ].filter(Boolean).join(" ");
    const Ve = Number(this.config.color_slider_start_offset) || 0, fe = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      Ve ? `margin-left: ${Ve}px !important;` : "",
      fe ? `margin-right: ${fe}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const We = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", Ye = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, re = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", qe = this.config.line_height ? `line-height: ${this.config.line_height};` : "", ge = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${ge}; ${We} ${re} ${qe}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${Ye} ${re} ${qe}`;
    const M = this.config.entity, oe = [];
    for (let E = 1; E <= 4; E++) {
      const me = this.config[`sub_button_${E}_entity`], be = this.config[`sub_button_${E}_icon`], Ke = this.config[`sub_button_${E}_name`], dt = this.config[`sub_button_${E}_tap_action`], ve = this.config[`sub_button_${E}_hold_action`], ei = this.config[`sub_button_${E}_double_tap_action`], ut = this.config[`sub_button_${E}_type`], ti = this.config[`sub_button_${E}_color`], ii = this.config[`sub_button_${E}_show_background`], kt = this.config[`sub_button_${E}_show_state`];
      if (!!(me || be || Ke || ut && ut !== "button" || kt)) {
        const Tt = me || M;
        oe.push(Object.freeze({
          key: `${Tt || "sub"}_${E}`,
          entity: Tt,
          type: ut || "button",
          icon: be,
          color: ti,
          bg: ii,
          name: Ke,
          showState: kt === !0,
          tapAction: dt,
          holdAction: ve,
          doubleTapAction: ei
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(oe), this.config.fade_transition_enabled) {
      const E = Number(this.config.fade_stage_1_duration) || 60, me = Number(this.config.fade_stage_2_duration) || 600, be = Number(this.config.fade_stage_3_duration) || 1800, Ke = O(this.config.fade_stage_1_color) || [255, 152, 0], dt = O(this.config.fade_stage_2_color) || [205, 220, 57], ve = O(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: E,
        d2: me,
        d3: be,
        totalDuration: E + me + be,
        c1Rgb: Ke,
        c2Rgb: dt,
        c3Rgb: ve,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: ve ? gt(ve) : "",
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
    const i = this.config.entity.split(".")[0] === "light", r = e.state === "on", o = this.config.hide_color_temp_when_off !== !1, n = this.config.hide_color_picker_when_off !== !1, s = this.config.hide_color_slider_when_off !== !1, l = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, d = i && this.config.show_color_temp === !0 && (l !== void 0 || e.attributes?.supported_color_modes?.some((p) => ["color_temp"].includes(p))) && (!o || r), _ = e.attributes?.supported_color_modes, c = Array.isArray(_) && _.some((p) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(p)), f = this.config.color_picker_type !== "wheel", h = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && f) && c && (!s || r), m = i && this.config.show_color_picker === !0 && !f && c && (!n || r), y = d || h || m, S = this._getSubButtons();
    this._cachedHasCollapsible = y || S.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const e = this.config?.primary_info, t = this.config?.secondary_info, i = this.config?.entity, r = i ? i.split(".")[0] : "", o = (r === "binary_sensor" || r === "timer") && (e === "state" || t === "state"), n = this.config?.fade_transition_enabled === !0, s = i && this.hass ? this.hass.states[i] : null;
    let l = !1;
    if (n && s) {
      const _ = this._computeMultiStageFade(s);
      l = _.enabled && _.activeFade && _.progressPct < 100;
    }
    const d = l || o || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (d && !this._relativeTimer) {
      const _ = l ? 1e3 : 5e3;
      this._relativeTimer = setInterval(() => {
        if (!this.hasAttribute("offscreen") && this.style.display !== "none") {
          if (l && !this._isFadeActive()) {
            this._setupRelativeTimer();
            return;
          }
          this.requestUpdate();
        }
      }, _);
    } else !d && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
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
    return e ? or.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t, i) {
    if (!this.config?.fade_transition_enabled || !e)
      return Qe;
    const r = this._isEntityActive(e), o = this.config.fade_trigger ?? "on_inactive";
    if (!(o === "on_inactive" && !r || o === "on_active" && r || o === "both"))
      return Qe;
    const s = r ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || t || "#d60000", l = r ? this._resolveColor(this.config.active_color) || t || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", d = O(s) || [214, 0, 0], _ = O(l) || [3, 177, 0], c = this._fadeStaticConfig, f = c?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), h = c?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), m = c?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), y = c?.totalDuration ?? f + h + m;
    if (y <= 0)
      return Qe;
    this._lastTrackedState !== null && this._lastTrackedState !== e.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = e.state;
    const S = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : d, p = c?.c1Rgb ?? (O(this.config.fade_stage_1_color) || [255, 152, 0]), C = this.config.fade_stage_2_pickup !== !1 ? p : d, g = c?.c2Rgb ?? (O(this.config.fade_stage_2_color) || [205, 220, 57]), k = this.config.fade_stage_3_pickup !== !1 ? g : p, x = c?.c3Rgb ?? (O(this.config.fade_stage_3_color) || _), $ = this._parseDate(e.last_changed || e.last_updated);
    if (!$)
      return Qe;
    const T = Math.max(0, (Date.now() - $.getTime()) / 1e3);
    if (T >= y)
      return this._currentLiveRgb = x, this._previousLiveRgb = null, c?.restingResult ? c.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: gt(x),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let u, v = 1, A = 0;
    const B = Math.max(0, Math.round(y - T));
    T < f && f > 0 ? (v = 1, A = T / f, u = ft(S, p, A)) : T < f + h && h > 0 ? (v = 2, A = (T - f) / h, u = ft(C, g, A)) : m > 0 ? (v = 3, A = (T - f - h) / m, u = ft(k, x, A)) : (v = 0, u = x), this._currentLiveRgb = u;
    const Y = Math.min(100, Math.round(T / y * 100)), j = gt(u);
    let q = "";
    return B >= 60 ? q = `${Math.ceil(B / 60)}m left` : q = `${B}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: j,
      progressPct: Y,
      remainingSeconds: B,
      currentStage: v,
      stageLabel: q
    };
  }
  _resolveColor(e) {
    return hr(e);
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
    const n = Math.round(o / 60);
    if (n < 60) return t ? `${n} ${n === 1 ? "min" : "mins"}` : `${n} ${n === 1 ? "minute" : "minutes"} ago`;
    const s = Math.round(n / 60);
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
            const n = Math.max(0, Math.round((o - Date.now()) / 1e3)), s = Math.floor(n / 60), l = n % 60, d = Math.floor(s / 60), _ = (s % 60).toString().padStart(2, "0"), c = l.toString().padStart(2, "0");
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
          const o = t.attributes?.brightness, n = o !== void 0 ? Math.round(o / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${n}% • ${t.attributes.color_temp_kelvin}K`;
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
            let n = "#4caf50";
            return o <= 20 ? n = "#f44336" : o <= 50 && (n = "#ff9800"), w`<span style="color: ${n}; font-weight: bold;">${o}%</span>`;
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
    const r = i || this.config.entity, o = r ? r.split(".")[0] : "", n = sr.has(o);
    let s = t;
    if (s || (e === "double_tap" ? s = this.config.double_tap_action : e === "hold" ? s = this.config.hold_action || (n ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? n && this.config.tap_action.action === "toggle" ? s = { action: "none" } : s = this.config.tap_action : s = n ? { action: "none" } : { action: "toggle" }), !(!s || s.action === "none")) {
      if (s.action === "more-info") {
        const l = s.entity || r;
        if (l) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: l },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (s.action === "toggle" && r) {
        if (n)
          return;
        const l = o === "lock" ? this._isEntityActive(this.hass?.states[r]) ? "lock" : "unlock" : "toggle", d = ["lock", "cover"].includes(o) ? o : o === "group" ? "homeassistant" : o;
        this.hass?.callService(d, l, { entity_id: r });
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
        const [l, d] = s.service.split(".", 2);
        this.hass?.callService(l, d, s.data || s.service_data || {}, s.target);
        return;
      }
      n && (!s.action || s.action === "toggle") || Fi(this, this.hass, { ...this.config, entity: r }, e);
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
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - se < 800 || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), L("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(e) {
    if (e.preventDefault(), e.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - se < 800 || this._held) return;
    L("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - se < 800 || (this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = e.clientX, this._startY = e.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), L("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(e) {
    if (this._isSubElement(e)) return;
    const t = e.clientX - this._startX, i = e.clientY - this._startY, r = Math.hypot(t, i), o = Math.max(1, Date.now() - this._pointerDownTime), n = r / o;
    (r > 8 || n > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerUp(e) {
    this._isSubElement(e) || this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null);
  }
  _handlePointerCancel(e) {
    this._isSubElement(e) || (this._canceled = !0, this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
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
    const n = r && r.action !== "none", s = t || "sub_default", l = () => {
      L("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, t) : o ? o() : this._dispatchAction("tap", { action: "toggle" }, t);
    };
    if (!n) {
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
  _sliderInput(e, t, i, r, o, n, s) {
    e.stopPropagation();
    const l = e.target, d = this._sliderStateMap.get(l);
    if (d?.isScrolling) {
      this._revertSlider(l, d);
      return;
    }
    const _ = Number(l.value), c = isNaN(_) ? 0 : _, f = n ? n(c) : c;
    if (d) {
      if (d.rafPending) return;
      d.rafPending = !0;
    }
    requestAnimationFrame(() => {
      if (d && (d.rafPending = !1), d?.isScrolling) {
        this._revertSlider(l, d);
        return;
      }
      l.style.setProperty("--slider-pct", `${f}%`);
      const h = l.closest(".slider-container, .sub-button-slider-container"), m = h?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (m && (m.textContent = s ? s(c, f) : `${f}%`), t === "color_hue" && h) {
        h.style.setProperty("--color-hue-val", `hsl(${c}, 100%, 50%)`);
        const y = h.querySelector(".color-chip-badge span");
        y && (y.style.background = `hsl(${c}, 100%, 50%)`);
      }
    }), L("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(e, t, i, r) {
    e.stopPropagation();
    const o = e.target, n = this._sliderStateMap.get(o);
    if (n?.isScrolling) {
      this._revertSlider(o, n), n.isScrolling = !1;
      return;
    }
    const s = Number(o.value), l = isNaN(s) ? 0 : s;
    if (!(n && l === n.initialVal)) {
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
      const r = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [o, n, s] = U(r);
      return `rgb(${o}, ${n}, ${s})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [r, o, n] = pt(t.hs_color[0], t.hs_color[1]);
      return `rgb(${r}, ${o}, ${n})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const r = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [o, n, s] = U(r);
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
      return Ze(pt(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const o = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return Ze(U(o));
    }
    const i = this._getLightLiveColor(e);
    if (!i) return "#ffffff";
    const r = O(i);
    return r ? Ze(r) : "#ffffff";
  }
  _getLiveHue(e) {
    if (!e) return 0;
    if (Array.isArray(e.attributes?.hs_color) && e.attributes.hs_color.length >= 1)
      return Math.round(e.attributes.hs_color[0]) % 360;
    if (Array.isArray(e.attributes?.rgb_color) && e.attributes.rgb_color.length >= 3) {
      const [t, i, r] = e.attributes.rgb_color;
      return cr(t, i, r);
    }
    return 0;
  }
  _handleColorInput(e, t, i, r) {
    e.stopPropagation();
    const o = e.target.value;
    if (!o) return;
    const n = O(o);
    if (!n) return;
    const s = i || this.config.entity, l = () => {
      this.hass.callService("light", "turn_on", { entity_id: s, rgb_color: n });
    };
    t ? this._throttledCall(r || "color_picker", l) : l();
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
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", r = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", o = this._isEntityActive(t), n = e.split(".")[0];
    let s = "var(--primary-color)", l = null;
    n === "climate" ? t.state === "heat" ? s = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? s = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? s = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (s = "var(--state-climate-fan_only-color, #26a69a)") : n === "light" ? (l = this._getLightLiveColor(t), l && (s = l)) : (n === "binary_sensor" || n === "lock" || n === "switch") && (s = "#d60000");
    const d = this.config.color_type === "card";
    let _ = this._resolveColor(this.config.active_color);
    (!_ || this.config.use_light_color) && (n === "light" && l ? _ = l : _ = s);
    let c = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    n === "light" ? c = "#000000" : (n === "binary_sensor" || n === "lock" || n === "switch") && (c = "#03b500");
    const f = this._resolveColor(this.config.inactive_color) || c, h = this.config.show_slider !== !1, m = n === "light", y = n === "cover", S = n === "fan", p = n === "humidifier", C = n === "media_player", g = n === "number" || n === "input_number", k = n === "climate", x = this.config.hide_slider_when_off !== !1, $ = this.config.hide_color_temp_when_off !== !1, T = this.config.hide_color_picker_when_off !== !1, u = this.config.hide_color_slider_when_off !== !1, v = t.attributes?.supported_color_modes;
    let A = t.attributes?.brightness !== void 0, B = !1, Y = !1;
    if (Array.isArray(v))
      for (let M = 0; M < v.length; M++) {
        const oe = v[M];
        oe !== "onoff" && (A = !0), oe === "color_temp" && (B = !0), ar.has(oe) && (Y = !0);
      }
    const j = m && h && A && (!x || o), q = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, _e = m && this.config.show_color_temp === !0 && (q !== void 0 || B) && (!$ || o), Ee = this.config.color_picker_type !== "wheel", Pe = m && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && Ee) && Y && (!u || o), Le = m && this.config.show_color_picker === !0 && !Ee && Y && (!T || o), F = t.state !== "unavailable" && t.state !== "unknown", De = y && F && h && t.attributes?.current_position !== void 0, Re = S && F && o && h && t.attributes?.percentage !== void 0, He = p && F && o && h && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), Ne = C && F && o && h && t.attributes?.volume_level !== void 0, Oe = g && F && h, Be = k && F && o && h && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), at = (this.config.bg_opacity ?? 10) / 100, st = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : d && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${_};`, ze = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : d && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", D = this._calculateMultiStageFade(t, s, f), G = this.config.fade_target ?? "card", he = this._resolveColor(this.config.bg_color);
    let H;
    D.activeFade && (G === "card" || G === "all" || d) ? H = D.currentColor : d ? n === "light" ? H = o ? l || _ : this.config.inactive_color ? f : "#000000" : H = o ? _ : f : he ? H = he : n === "light" && !o ? H = "#000000" : H = `rgba(150, 150, 150, ${at})`;
    let pe = this._resolveColor(this.config.active_color) || (n === "light" && l ? l : _) || "var(--primary-color)";
    D.activeFade && (G === "all" || this.config.active_glow === !0) && (pe = D.currentColor);
    let ee = "";
    this.config.box_shadow === "soft" && (ee = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (ee = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (ee = o || D.activeFade ? `box-shadow: 0 0 22px ${pe}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const te = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", N = t?.attributes?.device_class, Ie = n === "binary_sensor" && (N === "motion" || N === "occupancy" || N === "presence"), lt = n === "binary_sensor" && (N === "door" || N === "window" || N === "garage_door" || N === "opening"), ct = Ie && (o || D.activeFade && D.currentStage === 1) ? "motion-active" : "", Ue = lt && o ? "door-open" : "", Fe = `${this._staticCardClasses} ${te} ${ct} ${Ue}`, ie = this._getSubButtons();
    this.config.font_weight_primary;
    let z = "";
    this.config.text_color_mode === "active_accent" && o ? z += `--primary-text-color: ${_}; ` : this.config.text_color_primary ? z += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : d && o && (z += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? z += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : d && o && (z += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const I = this.config.features_position === "inline", Ge = this.config.text_scrolling_primary || "none", Ve = this.config.text_scrolling_secondary || "none", fe = w`
      ${j ? this._renderLightSlider(t) : b}
      ${De ? this._renderCoverSlider(t) : b}
      ${Re ? this._renderFanSlider(t) : b}
      ${He ? this._renderHumidifierSlider(t) : b}
      ${Ne ? this._renderMediaSlider(t) : b}
      ${Oe ? this._renderNumberSlider(t) : b}
      ${Be ? this._renderClimateSlider(t) : b}
    `, We = w`
      ${_e ? this._renderColorTempSlider(t) : b}
      ${Pe ? this._renderColorSlider(t) : b}
      ${Le ? this._renderColorPicker(t) : b}
    `, Ye = j || De || Re || He || Ne || Oe || Be, re = _e || Pe || Le, qe = !I && re || ie.length > 0, ge = this.config.decay_slider_position ?? "bottom";
    return w`
      ${this.config.custom_styles ? w`<style>${this.config.custom_styles}</style>` : b}
      <ha-card 
        class="${Fe}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${H}; ${ee} ${st} ${ze} ${z} --ag-glow-color: ${pe}; --ag-active-color: ${_};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${I ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${ge === "top" ? this._renderDecaySlider(D) : b}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${i ? w`
                <div class="text-marquee-container scroll-${Ge}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : b}
              ${r ? w`
                <div class="text-marquee-container scroll-${Ve}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${r}</span>
                </div>` : b}
            </div>
            ${ge === "inline" ? w`<div class="inline-sliders">${this._renderDecaySlider(D)}</div>` : b}
            ${I && Ye ? w`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${fe}</div>` : b}
            ${I && re ? w`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${We}</div>` : b}
          </div>
          
          ${ge === "bottom" ? this._renderDecaySlider(D) : b}
          ${!I && Ye ? w`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${fe}</div>` : b}

          ${qe ? w`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!I && re ? w`<div class="features-container" style="${this._featuresOffsetStyle}">${We}</div>` : b}

              ${ie.length > 0 ? w`
                <div class="sub-buttons-container">
                  ${Hi(
      ie,
      (M) => M.key,
      (M) => this._renderSubButton(M.entity || "", M.icon, M.color, M.bg !== !1, M.name, M.tapAction, M.holdAction, M.type, M.doubleTapAction, M.showState)
    )}
                </div>
              ` : b}
            </div>
          ` : b}

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(e) {
    if (!this.config.show_decay_slider || !e.enabled || !e.activeFade)
      return b;
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
  _renderGenericSlider(e, t, i, r, o, n, s, l, d, _, c, f, h = "", m = "", y) {
    const S = this.config.slider_style === "google", p = S && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, C = f ? f(n, s) : `${s}%`, g = y !== void 0 ? y : C, k = this.config.slider_stepped_movement === !1 ? "any" : o, x = e !== "color_temp" && e !== "color_hue", $ = this.config.slider_style === "full", T = x && $ ? "main-slider-full" : "";
    let u = "";
    if (x && $) {
      const v = Number(this.config.slider_start_offset) || 0, A = Number(this.config.slider_end_offset) || 0;
      u = `left: ${v}px !important; right: ${A}px !important; width: calc(100% - ${v + A}px) !important;`;
    } else e === "color_temp" ? u = this._colorTempMarginOffsets : e === "color_hue" ? u = this._colorHueMarginOffsets : u = this._mainSliderMarginOffsets;
    return w`
      <div class="slider-container ${h} ${T} ${S ? "slider-google-wrap" : ""}" style="${u} ${m}">
        <input type="range" min=${i} max=${r} step=${k} .value=${n}
               aria-label="${t}"
               style="--slider-pct: ${s}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(v) => this._sliderInput(v, e, l, d, _, c, f)}
               @change=${(v) => this._sliderChange(v, l, d, _)} />
        ${p && g ? w`<span class="slider-percent-badge">${g}</span>` : b}
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
      (s, l) => !t || l <= 0 ? "" : `${l}%`,
      "",
      n
    );
  }
  _renderColorTempSlider(e) {
    const t = this.config.color_temp_type || "gradient", i = e.attributes.color_temp_kelvin !== void 0 || e.attributes.min_color_temp_kelvin !== void 0 || e.attributes.max_color_temp_kelvin !== void 0, r = i ? e.attributes.min_color_temp_kelvin || 2e3 : e.attributes.min_mireds || 153, o = i ? e.attributes.max_color_temp_kelvin || 6500 : e.attributes.max_mireds || 500, n = i ? e.attributes.color_temp_kelvin || 3e3 : e.attributes.color_temp || 300, s = o - r, l = s > 0 ? Math.max(0, Math.min(100, Math.round((n - r) / s * 100))) : 0, d = i ? "color_temp_kelvin" : "color_temp", _ = t === "google" || t === "gradient" && this.config.slider_style === "google", c = _ ? 42 : t === "thin" ? 6 : 12, f = _ ? 21 : t === "thin" ? 3 : 6, h = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? c, m = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? f, y = i ? `${n} K` : `${n} mireds`;
    if (t === "presets") {
      const S = Number(this.config.color_temp_start_offset) || 0, p = Number(this.config.color_temp_end_offset) || 0, C = [
        S ? `margin-left: ${S}px;` : "",
        p ? `margin-right: ${p}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${C}">
          ${dr.map((g) => {
        const [k, x, $] = g.rgb, T = Math.abs(n - g.k) < 200;
        return w`
              <button 
                type="button"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${h}px; border-radius: ${m}px; border: ${T ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${k}, ${x}, ${$}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${T ? "0 0 8px rgba(" + k + "," + x + "," + $ + ", 0.8)" : "none"};"
                @click=${(u) => {
          u.stopPropagation(), L("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, [d]: g.k });
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${k}, ${x}, ${$}); display: inline-block;"></span>
                ${g.label}
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
      l,
      "light",
      "turn_on",
      (S) => ({ [d]: S }),
      (S) => s > 0 ? Math.round((S - r) / s * 100) : 0,
      (S) => i ? `${S} K` : `${S} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${_ ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${h}px; --ag-slider-radius: ${m}px;`,
      y
    );
  }
  _renderColorSlider(e) {
    const t = this.config.color_picker_type || "slider";
    if (t === "wheel")
      return this._renderColorPicker(e);
    if (t === "swatches") {
      const f = this._getLiveHex(e).toLowerCase(), h = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, m = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, y = Number(this.config.color_slider_start_offset) || 0, S = Number(this.config.color_slider_end_offset) || 0, p = [
        y ? `margin-left: ${y}px;` : "",
        S ? `margin-right: ${S}px;` : ""
      ].filter(Boolean).join(" ");
      return w`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${p}">
          ${bt.map((C) => {
        const g = f === C.hex.toLowerCase();
        return w`
              <button 
                type="button"
                tabindex="0"
                class="color-swatch-chip"
                title="${C.label}"
                style="flex: 1; min-width: 28px; height: ${h}px; border-radius: ${m}px; background: ${C.hex}; border: ${g ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${g ? "0 0 10px " + C.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @click=${(k) => {
          k.stopPropagation(), L("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: C.rgb });
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this._getLiveHue(e), r = Math.max(0, Math.min(100, Math.round(i / 360 * 100))), o = t === "google" || this.config.slider_style === "google", n = o ? 42 : 12, s = o ? 21 : 6, l = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? n, d = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? s, _ = `hsl(${i}, 100%, 50%)`, c = w`
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
      (f) => {
        const [h, m, y] = pt(f, 100);
        return { rgb_color: [h, m, y] };
      },
      (f) => Math.round(f / 360 * 100),
      (f) => `${f}°`,
      `color-hue ${o ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${l}px; --ag-slider-radius: ${d}px; --color-hue-val: ${_};`,
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
    const t = Number(e.attributes.min ?? 0), i = Number(e.attributes.max ?? 100), r = Number(e.attributes.step ?? 1), o = Number(e.state), n = isNaN(o) ? t : o, s = i - t, l = s > 0 ? Math.max(0, Math.min(100, Math.round((n - t) / s * 100))) : 0, d = (this.config.entity || "number").split(".")[0], _ = e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : "";
    return this._renderGenericSlider(
      "number",
      "Value",
      t,
      i,
      r,
      n,
      l,
      d,
      "set_value",
      (c) => ({ value: c }),
      (c) => s > 0 ? Math.round((c - t) / s * 100) : 0,
      (c) => `${r < 1 ? Number(c).toFixed(1) : c}${_}`
    );
  }
  _renderClimateSlider(e) {
    const t = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = t ? "°F" : "°C", r = t ? 60 : 16, o = t ? 85 : 30, n = e.attributes.min_temp ?? r, s = e.attributes.max_temp ?? o, l = e.attributes.target_temp_step ?? e.attributes.target_temperature_step ?? (t ? 1 : 0.5), d = e.attributes.temperature ?? e.attributes.target_temp_low ?? e.attributes.target_temp_high ?? n, _ = s - n, c = _ > 0 ? Math.max(0, Math.min(100, Math.round((d - n) / _ * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      n,
      s,
      l,
      d,
      c,
      "climate",
      "set_temperature",
      (f) => ({ temperature: f }),
      (f) => _ > 0 ? Math.round((f - n) / _ * 100) : 0,
      (f) => `${f}${i}`,
      "climate-temp",
      "",
      `${d}${i}`
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
      (s, l) => `${l}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(e, t, i, r, o) {
    const n = t || this.hass.states[this.config.entity || ""], s = e || this.config.entity || "", l = n?.attributes?.volume_level !== void 0 || n?.entity_id?.startsWith("media_player."), d = n?.attributes?.percentage !== void 0 || n?.entity_id?.startsWith("fan."), _ = n?.attributes?.current_position !== void 0 || n?.entity_id?.startsWith("cover.");
    let c = 0, f = 0, h = 255, m = "1", y = "turn_on", S = "light", p = "brightness";
    l ? (c = n?.attributes?.volume_level ?? 0, h = 1, m = "0.01", y = "set_volume_level", S = "media_player", p = "volume_level") : d ? (c = n?.attributes?.percentage ?? 0, h = 100, m = "1", y = "set_percentage", S = "fan", p = "percentage") : _ ? (c = n?.attributes?.current_position ?? 0, h = 100, m = "1", y = "set_cover_position", S = "cover", p = "position") : c = n?.attributes?.brightness ?? 0;
    const C = Math.round(h === 1 ? c * 100 : h === 100 ? c : c / 255 * 100);
    return i === "slider" ? w`
        <div class="sub-button-slider-container ${o}" style="${r}" title="Level: ${C}%">
          <input type="range" 
                 min="${f}" 
                 max=${h} 
                 step=${m} 
                 .value=${c}
                 @pointerdown=${(g) => g.stopPropagation()}
                 @input=${(g) => {
      g.stopPropagation();
      const k = parseFloat(g.target.value), x = Math.round(h === 1 ? k * 100 : h === 100 ? k : k / 255 * 100), $ = g.target.closest(".sub-button-slider-container");
      $ && $.setAttribute("title", `Level: ${x}%`), this._throttledCall("sub_slider_" + s, () => {
        this.hass?.callService(S, y, { entity_id: s, [p]: k });
      });
    }}
                 @change=${(g) => {
      g.stopPropagation();
      const k = parseFloat(g.target.value);
      this.hass?.callService(S, y, { entity_id: s, [p]: k });
    }} />
        </div>
      ` : w`
        <div class="sub-button-google-slider ${o}" style="${r} --slider-pct: ${C}%;" title="Level: ${C}%">
          <input type="range" 
                 min="${f}" 
                 max=${h} 
                 step=${m} 
                 .value=${c}
                 style="--slider-pct: ${C}%;"
                 @pointerdown=${(g) => g.stopPropagation()}
                 @input=${(g) => {
      g.stopPropagation();
      const k = parseFloat(g.target.value), x = Math.round(h === 1 ? k * 100 : h === 100 ? k : k / 255 * 100), $ = g.target;
      requestAnimationFrame(() => {
        $.style.setProperty("--slider-pct", `${x}%`);
        const T = $.closest(".sub-button-google-slider");
        if (T) {
          T.style.setProperty("--slider-pct", `${x}%`), T.setAttribute("title", `Level: ${x}%`);
          const u = T.querySelector(".sub-slider-pct");
          u && (u.textContent = `${x}%`);
        }
      }), this._throttledCall("sub_slider_" + s, () => {
        this.hass?.callService(S, y, { entity_id: s, [p]: k });
      });
    }}
                 @change=${(g) => {
      g.stopPropagation();
      const k = parseFloat(g.target.value);
      this.hass?.callService(S, y, { entity_id: s, [p]: k });
    }} />
          <span class="sub-slider-pct">${C}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(e, t, i, r, o, n) {
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
        ${o ? w`<span class="sub-button-label">${o}</span>` : b}
        ${n ? w`<span class="sub-button-state">${n}</span>` : b}
      </div>
    `;
  }
  _renderSubButton(e, t, i, r = !0, o, n, s, l = "button", d, _ = !1) {
    const c = e ? this.hass.states[e] : void 0;
    if (e && !c)
      return w`
        <div class="sub-button missing" title="Entity not found: ${e}">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        </div>
      `;
    const f = c ? this._isEntityActive(c) : !1;
    let h = this._resolveColor(i);
    !h && f && c?.attributes?.rgb_color && Array.isArray(c.attributes.rgb_color) && (h = `rgb(${c.attributes.rgb_color.join(",")})`);
    const m = h ? `color: ${h};` : "", y = r ? "" : "no-bg", S = _ && c ? this._getInfoContent("state", c) : "";
    if (l === "slider" || l === "google_slider")
      return this._renderSubSlider(e, c, l, m, y);
    if (l === "color_picker")
      return this._renderSubColorPicker(e, c, m, y, o, S);
    let p = t, C = f, g = o || "", k = "", x = o, $;
    if (n && n.action && n.action !== "none" && n.action !== "default")
      p || (p = c?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (l) {
        case "play_pause": {
          const u = c?.state === "playing";
          C = u, p || (p = u ? "mdi:pause" : "mdi:play"), g = u ? "Pause" : "Play", $ = () => {
            this.hass?.callService("media_player", "media_play_pause", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "next": {
          p || (p = "mdi:skip-next"), g = "Next Track", $ = () => {
            this.hass?.callService("media_player", "media_next_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "previous": {
          p || (p = "mdi:skip-previous"), g = "Previous Track", $ = () => {
            this.hass?.callService("media_player", "media_previous_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "open_close": {
          const u = c?.state === "open" || c?.state === "on" || c?.attributes?.current_position !== void 0 && c.attributes.current_position > 0;
          C = u, p || (p = u ? "mdi:window-shutter-open" : "mdi:window-shutter"), g = u ? "Close" : "Open", $ = () => {
            this.hass?.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "stop": {
          p || (p = "mdi:stop"), g = "Stop", $ = () => {
            this.hass?.callService("cover", "stop_cover", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const u = c?.state === "locked";
          C = !u, p || (p = u ? "mdi:lock" : "mdi:lock-open-variant"), g = u ? "Unlock" : "Lock", $ = () => {
            this.hass?.callService("lock", u ? "unlock" : "lock", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const u = c?.attributes?.percentage ?? 0;
          p || (p = "mdi:fan"), f && (k = "anim-spin"), g = `Speed: ${u}%`, x || (x = u > 0 ? `${u}%` : "Off"), $ = () => {
            let v = 33;
            u >= 90 ? v = 0 : u >= 60 ? v = 100 : u >= 30 && (v = 66), this.hass?.callService("fan", "set_percentage", { entity_id: e || this.config.entity, percentage: v });
          };
          break;
        }
        case "clean": {
          const u = c?.state === "cleaning";
          C = u, p || (p = u ? "mdi:pause" : "mdi:robot-vacuum"), g = u ? "Pause Vacuum" : "Start Vacuum", $ = () => {
            this.hass?.callService("vacuum", u ? "pause" : "start", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dock": {
          p || (p = "mdi:home-import-outline"), g = "Return to Dock", $ = () => {
            this.hass?.callService("vacuum", "return_to_base", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "locate": {
          p || (p = "mdi:map-marker-question-outline"), g = "Locate", $ = () => {
            this.hass?.callService("vacuum", "locate", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const u = c?.state || "off", v = c?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], A = v[(v.indexOf(u) + 1) % v.length] || "auto";
          C = u !== "off", p || (u === "heat" ? p = "mdi:fire" : u === "cool" ? p = "mdi:snowflake" : u === "dry" ? p = "mdi:water-percent" : u === "fan_only" ? p = "mdi:fan" : u === "auto" ? p = "mdi:thermostat-auto" : p = "mdi:power"), g = `Mode: ${u} -> Next: ${A}`, x || (x = u), $ = () => {
            this.hass?.callService("climate", "set_hvac_mode", { entity_id: e || this.config.entity, hvac_mode: A });
          };
          break;
        }
        case "light_effect": {
          const u = c?.attributes?.effect_list || [], v = c?.attributes?.effect || "None", A = u.length > 0 ? u[(u.indexOf(v) + 1) % u.length] || u[0] : "None";
          p || (p = "mdi:creation"), C = v !== "None" && v !== "off" && f, g = `Effect: ${v} -> Next: ${A}`, x || (x = v !== "None" ? v : "Effect"), $ = () => {
            u.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, effect: A });
          };
          break;
        }
        case "brightness": {
          const u = c?.attributes?.brightness, v = u !== void 0 ? Math.round(u / 255 * 100) : 0;
          p || (p = "mdi:brightness-6"), g = `Brightness: ${v}%`, x || (x = `${v}%`), $ = () => {
            let A = 255;
            v >= 85 ? A = 76 : v >= 50 ? A = 255 : A = 178, this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: A });
          };
          break;
        }
        case "garage_toggle": {
          const u = c?.state === "open" || c?.state === "opening";
          C = u, p || (p = u ? "mdi:garage-open" : "mdi:garage"), g = u ? "Close Garage" : "Open Garage", $ = () => {
            this.hass?.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const u = c?.attributes?.brightness ?? 0, v = Math.min(255, u + 26);
          p || (p = "mdi:brightness-5"), g = "Brightness +10%", x || (x = "+10%"), $ = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: v });
          };
          break;
        }
        case "dim_down": {
          const u = c?.attributes?.brightness ?? 0, v = Math.max(1, u - 26);
          p || (p = "mdi:brightness-4"), g = "Brightness -10%", x || (x = "-10%"), $ = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: v });
          };
          break;
        }
        case "temp_warm": {
          p || (p = "mdi:weather-sunny"), g = "Warm White (2700K)", x || (x = "2700K"), $ = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          p || (p = "mdi:weather-sunset-up"), g = "Cool Daylight (6000K)", x || (x = "6000K"), $ = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          p || (p = "mdi:palette-swatch-outline"), g = "Color Temperature", x || (x = "Temp"), $ = () => {
            const u = c?.attributes?.color_temp_kelvin || 3e3;
            let v = 2700;
            u < 3300 ? v = 4e3 : u < 5e3 ? v = 6e3 : v = 2700, this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: v });
          };
          break;
        }
        case "button":
        default: {
          p || (p = c?.attributes?.icon || "mdi:checkbox-blank-circle"), g = o || (c?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const T = (u) => {
      this._handleSubTap(u, e, n, d, $);
    };
    return w`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${y}" 
        ?active=${C} 
        style="${m} ${C && h && r ? `background: ${h}; color: #fff;` : ""}"
        title="${g}"
        @click=${T}
        @dblclick=${(u) => u.stopPropagation()}
        @keydown=${(u) => {
      (u.key === "Enter" || u.key === " ") && (u.preventDefault(), u.stopPropagation(), T(u));
    }}
        @pointerdown=${(u) => this._handleSubPointerDown(u, e, s)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(u) => this._handleSubContextMenu(u, e, s)}>
        <ha-icon .icon=${p} class="${k}"></ha-icon>
        ${x ? w`<span class="sub-button-label">${x}</span>` : b}
        ${S ? w`<span class="sub-button-state">${S}</span>` : b}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return qt`
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
    `;
  }
}
ue([
  rt({ attribute: !1 })
], W.prototype, "hass", 2);
ue([
  rt({ type: Boolean })
], W.prototype, "preview", 2);
ue([
  ot()
], W.prototype, "config", 2);
ue([
  ot()
], W.prototype, "_collapsed", 2);
ue([
  Jt({ passive: !0 })
], W.prototype, "_handlePointerMove", 1);
ue([
  Jt({ passive: !0 })
], W.prototype, "_handleSubPointerMove", 1);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", W);
customElements.get("antigravity-card") || customElements.define("antigravity-card", W);
export {
  W as AntigravityCard,
  rr as CARD_VERSION
};
