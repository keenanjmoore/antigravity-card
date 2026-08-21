const ye = globalThis, Ie = ye.ShadowRoot && (ye.ShadyCSS === void 0 || ye.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ue = Symbol(), lt = /* @__PURE__ */ new WeakMap();
let Pt = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== Ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Ie && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = lt.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && lt.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const jt = (t) => new Pt(typeof t == "string" ? t : t + "", void 0, Ue), Et = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, o, a) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[a + 1], t[0]);
  return new Pt(i, t, Ue);
}, ei = (t, e) => {
  if (Ie) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), o = ye.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = i.cssText, t.appendChild(r);
  }
}, ct = Ie ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return jt(i);
})(t) : t;
const { is: ti, defineProperty: ii, getOwnPropertyDescriptor: ri, getOwnPropertyNames: oi, getOwnPropertySymbols: ai, getPrototypeOf: ni } = Object, we = globalThis, dt = we.trustedTypes, si = dt ? dt.emptyScript : "", li = we.reactiveElementPolyfillSupport, le = (t, e) => t, xe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? si : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Fe = (t, e) => !ti(t, e), ut = { attribute: !0, type: String, converter: xe, reflect: !1, useDefault: !1, hasChanged: Fe };
Symbol.metadata ??= Symbol("metadata"), we.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let X = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ut) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), o = this.getPropertyDescriptor(e, r, i);
      o !== void 0 && ii(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: o, set: a } = ri(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: o, set(n) {
      const l = o?.call(this);
      a?.call(this, n), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(le("elementProperties"))) return;
    const e = ni(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(le("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(le("properties"))) {
      const i = this.properties, r = [...oi(i), ...ai(i)];
      for (const o of r) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, o] of i) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const o = this._$Eu(i, r);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const o of r) i.unshift(ct(o));
    } else e !== void 0 && i.push(ct(e));
    return i;
  }
  static _$Eu(e, i) {
    const r = i.attribute;
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
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ei(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    const r = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, r);
    if (o !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : xe).toAttribute(i, r.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, o = r._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = r.getPropertyOptions(o), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : xe;
      this._$Em = o;
      const l = n.fromAttribute(i, a.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, o = !1, a) {
    if (e !== void 0) {
      const n = this.constructor;
      if (o === !1 && (a = this[e]), r ??= n.getPropertyOptions(e), !((r.hasChanged ?? Fe)(a, i) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: o, wrapped: a }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
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
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, a] of r) {
        const { wrapped: n } = a, l = this[o];
        n !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, a, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
X.elementStyles = [], X.shadowRootOptions = { mode: "open" }, X[le("elementProperties")] = /* @__PURE__ */ new Map(), X[le("finalized")] = /* @__PURE__ */ new Map(), li?.({ ReactiveElement: X }), (we.reactiveElementVersions ??= []).push("2.1.2");
const Ge = globalThis, ht = (t) => t, $e = Ge.trustedTypes, _t = $e ? $e.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Lt = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, Ht = "?" + z, ci = `<${Ht}>`, V = document, ce = () => V.createComment(""), de = (t) => t === null || typeof t != "object" && typeof t != "function", Ve = Array.isArray, di = (t) => Ve(t) || typeof t?.[Symbol.iterator] == "function", Re = `[ 	
\f\r]`, oe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, gt = />/g, U = RegExp(`>|${Re}(?:([^\\s"'>=/]+)(${Re}*=${Re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ft = /'/g, bt = /"/g, Nt = /^(?:script|style|textarea|title)$/i, ui = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), $ = ui(1), W = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), mt = /* @__PURE__ */ new WeakMap(), G = V.createTreeWalker(V, 129);
function Rt(t, e) {
  if (!Ve(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return _t !== void 0 ? _t.createHTML(e) : e;
}
const hi = (t, e) => {
  const i = t.length - 1, r = [];
  let o, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = oe;
  for (let l = 0; l < i; l++) {
    const s = t[l];
    let h, c, d = -1, p = 0;
    for (; p < s.length && (n.lastIndex = p, c = n.exec(s), c !== null); ) p = n.lastIndex, n === oe ? c[1] === "!--" ? n = pt : c[1] !== void 0 ? n = gt : c[2] !== void 0 ? (Nt.test(c[2]) && (o = RegExp("</" + c[2], "g")), n = U) : c[3] !== void 0 && (n = U) : n === U ? c[0] === ">" ? (n = o ?? oe, d = -1) : c[1] === void 0 ? d = -2 : (d = n.lastIndex - c[2].length, h = c[1], n = c[3] === void 0 ? U : c[3] === '"' ? bt : ft) : n === bt || n === ft ? n = U : n === pt || n === gt ? n = oe : (n = U, o = void 0);
    const g = n === U && t[l + 1].startsWith("/>") ? " " : "";
    a += n === oe ? s + ci : d >= 0 ? (r.push(h), s.slice(0, d) + Lt + s.slice(d) + z + g) : s + z + (d === -2 ? l : g);
  }
  return [Rt(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class ue {
  constructor({ strings: e, _$litType$: i }, r) {
    let o;
    this.parts = [];
    let a = 0, n = 0;
    const l = e.length - 1, s = this.parts, [h, c] = hi(e, i);
    if (this.el = ue.createElement(h, r), G.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = G.nextNode()) !== null && s.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(Lt)) {
          const p = c[n++], g = o.getAttribute(d).split(z), b = /([.?@])?(.*)/.exec(p);
          s.push({ type: 1, index: a, name: b[2], strings: g, ctor: b[1] === "." ? pi : b[1] === "?" ? gi : b[1] === "@" ? fi : Se }), o.removeAttribute(d);
        } else d.startsWith(z) && (s.push({ type: 6, index: a }), o.removeAttribute(d));
        if (Nt.test(o.tagName)) {
          const d = o.textContent.split(z), p = d.length - 1;
          if (p > 0) {
            o.textContent = $e ? $e.emptyScript : "";
            for (let g = 0; g < p; g++) o.append(d[g], ce()), G.nextNode(), s.push({ type: 2, index: ++a });
            o.append(d[p], ce());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ht) s.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(z, d + 1)) !== -1; ) s.push({ type: 7, index: a }), d += z.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const r = V.createElement("template");
    return r.innerHTML = e, r;
  }
}
function Q(t, e, i = t, r) {
  if (e === W) return e;
  let o = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const a = de(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== a && (o?._$AO?.(!1), a === void 0 ? o = void 0 : (o = new a(t), o._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = o : i._$Cl = o), o !== void 0 && (e = Q(t, o._$AS(t, e.values), o, r)), e;
}
class _i {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: r } = this._$AD, o = (e?.creationScope ?? V).importNode(i, !0);
    G.currentNode = o;
    let a = G.nextNode(), n = 0, l = 0, s = r[0];
    for (; s !== void 0; ) {
      if (n === s.index) {
        let h;
        s.type === 2 ? h = new j(a, a.nextSibling, this, e) : s.type === 1 ? h = new s.ctor(a, s.name, s.strings, this, e) : s.type === 6 && (h = new bi(a, this, e)), this._$AV.push(h), s = r[++l];
      }
      n !== s?.index && (a = G.nextNode(), n++);
    }
    return G.currentNode = V, o;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class j {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, o) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = Q(this, e, i), de(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== W && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : di(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && de(this._$AH) ? this._$AA.nextSibling.data = e : this.T(V.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, o = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = ue.createElement(Rt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const a = new _i(o, this), n = a.u(this.options);
      a.p(i), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = mt.get(e.strings);
    return i === void 0 && mt.set(e.strings, i = new ue(e)), i;
  }
  k(e) {
    Ve(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, o = 0;
    for (const a of e) o === i.length ? i.push(r = new j(this.O(ce()), this.O(ce()), this, this.options)) : r = i[o], r._$AI(a), o++;
    o < i.length && (this._$AR(r && r._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = ht(e).nextSibling;
      ht(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Se {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, o, a) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = m;
  }
  _$AI(e, i = this, r, o) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = Q(this, e, i, 0), n = !de(e) || e !== this._$AH && e !== W, n && (this._$AH = e);
    else {
      const l = e;
      let s, h;
      for (e = a[0], s = 0; s < a.length - 1; s++) h = Q(this, l[r + s], i, s), h === W && (h = this._$AH[s]), n ||= !de(h) || h !== this._$AH[s], h === m ? e = m : e !== m && (e += (h ?? "") + a[s + 1]), this._$AH[s] = h;
    }
    n && !o && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class pi extends Se {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class gi extends Se {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class fi extends Se {
  constructor(e, i, r, o, a) {
    super(e, i, r, o, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Q(this, e, i, 0) ?? m) === W) return;
    const r = this._$AH, o = e === m && r !== m || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== m && (r === m || o);
    o && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let bi = class {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Q(this, e);
  }
};
const mi = { I: j }, vi = Ge.litHtmlPolyfillSupport;
vi?.(ue, j), (Ge.litHtmlVersions ??= []).push("3.3.3");
const yi = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let o = r._$litPart$;
  if (o === void 0) {
    const a = i?.renderBefore ?? null;
    r._$litPart$ = o = new j(e.insertBefore(ce(), a), a, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
const We = globalThis;
let Z = class extends X {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = yi(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return W;
  }
};
Z._$litElement$ = !0, Z.finalized = !0, We.litElementHydrateSupport?.({ LitElement: Z });
const xi = We.litElementPolyfillSupport;
xi?.({ LitElement: Z });
(We.litElementVersions ??= []).push("4.2.2");
const Dt = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const $i = { attribute: !0, type: String, converter: xe, reflect: !1, hasChanged: Fe }, wi = (t = $i, e, i) => {
  const { kind: r, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), r === "accessor") {
    const { name: n } = i;
    return { set(l) {
      const s = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, s, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, t, l), l;
    } };
  }
  if (r === "setter") {
    const { name: n } = i;
    return function(l) {
      const s = this[n];
      e.call(this, l), this.requestUpdate(n, s, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function ke(t) {
  return (e, i) => typeof i == "object" ? wi(t, e, i) : ((r, o, a) => {
    const n = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, r), n ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(t, e, i);
}
function Ce(t) {
  return ke({ ...t, state: !0, attribute: !1 });
}
function Bt(t) {
  return (e, i) => {
    const r = typeof e == "function" ? e : e[i];
    Object.assign(r, t);
  };
}
const Si = { CHILD: 2 }, ki = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ci = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, r) {
    this._$Ct = e, this._$AM = i, this._$Ci = r;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
const { I: Ti } = mi, vt = (t) => t, yt = () => document.createComment(""), ae = (t, e, i) => {
  const r = t._$AA.parentNode, o = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = r.insertBefore(yt(), o), n = r.insertBefore(yt(), o);
    i = new Ti(a, n, t, t.options);
  } else {
    const a = i._$AB.nextSibling, n = i._$AM, l = n !== t;
    if (l) {
      let s;
      i._$AQ?.(t), i._$AM = t, i._$AP !== void 0 && (s = t._$AU) !== n._$AU && i._$AP(s);
    }
    if (a !== o || l) {
      let s = i._$AA;
      for (; s !== a; ) {
        const h = vt(s).nextSibling;
        vt(r).insertBefore(s, o), s = h;
      }
    }
  }
  return i;
}, F = (t, e, i = t) => (t._$AI(e, i), t), Ai = {}, Mi = (t, e = Ai) => t._$AH = e, Pi = (t) => t._$AH, De = (t) => {
  t._$AR(), t._$AA.remove();
};
const xt = (t, e, i) => {
  const r = /* @__PURE__ */ new Map();
  for (let o = e; o <= i; o++) r.set(t[o], o);
  return r;
}, Ei = ki(class extends Ci {
  constructor(t) {
    if (super(t), t.type !== Si.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let r;
    i === void 0 ? i = e : e !== void 0 && (r = e);
    const o = [], a = [];
    let n = 0;
    for (const l of t) o[n] = r ? r(l, n) : n, a[n] = i(l, n), n++;
    return { values: a, keys: o };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, r]) {
    const o = Pi(t), { values: a, keys: n } = this.dt(e, i, r);
    if (!Array.isArray(o)) return this.ut = n, a;
    const l = this.ut ??= [], s = [];
    let h, c, d = 0, p = o.length - 1, g = 0, b = a.length - 1;
    for (; d <= p && g <= b; ) if (o[d] === null) d++;
    else if (o[p] === null) p--;
    else if (l[d] === n[g]) s[g] = F(o[d], a[g]), d++, g++;
    else if (l[p] === n[b]) s[b] = F(o[p], a[b]), p--, b--;
    else if (l[d] === n[b]) s[b] = F(o[d], a[b]), ae(t, s[b + 1], o[d]), d++, b--;
    else if (l[p] === n[g]) s[g] = F(o[p], a[g]), ae(t, o[d], o[p]), p--, g++;
    else if (h === void 0 && (h = xt(n, g, b), c = xt(l, d, p)), h.has(l[d])) if (h.has(l[p])) {
      const v = c.get(n[g]), _ = v !== void 0 ? o[v] : null;
      if (_ === null) {
        const S = ae(t, o[d]);
        F(S, a[g]), s[g] = S;
      } else s[g] = F(_, a[g]), ae(t, o[d], _), o[v] = null;
      g++;
    } else De(o[p]), p--;
    else De(o[d]), d++;
    for (; g <= b; ) {
      const v = ae(t, s[b + 1]);
      F(v, a[g]), s[g++] = v;
    }
    for (; d <= p; ) {
      const v = o[d++];
      v !== null && De(v);
    }
    return this.ut = n, Mi(t, s), W;
  }
});
var $t, wt;
(function(t) {
  t.language = "language", t.system = "system", t.comma_decimal = "comma_decimal", t.decimal_comma = "decimal_comma", t.space_comma = "space_comma", t.none = "none";
})($t || ($t = {})), function(t) {
  t.language = "language", t.system = "system", t.am_pm = "12", t.twenty_four = "24";
}(wt || (wt = {}));
function Li(t) {
  return t.substr(0, t.indexOf("."));
}
var Hi = ["closed", "locked", "off"], he = function(t, e, i, r) {
  r = r || {}, i = i ?? {};
  var o = new Event(e, { bubbles: r.bubbles === void 0 || r.bubbles, cancelable: !!r.cancelable, composed: r.composed === void 0 || r.composed });
  return o.detail = i, t.dispatchEvent(o), o;
}, se = function(t) {
  he(window, "haptic", t);
}, Ni = function(t, e, i) {
  i === void 0 && (i = !1), i ? history.replaceState(null, "", e) : history.pushState(null, "", e), he(window, "location-changed", { replace: i });
}, Ri = function(t, e, i) {
  i === void 0 && (i = !0);
  var r, o = Li(e), a = o === "group" ? "homeassistant" : o;
  switch (o) {
    case "lock":
      r = i ? "unlock" : "lock";
      break;
    case "cover":
      r = i ? "open_cover" : "close_cover";
      break;
    default:
      r = i ? "turn_on" : "turn_off";
  }
  return t.callService(a, r, { entity_id: e });
}, Di = function(t, e) {
  var i = Hi.includes(t.states[e].state);
  return Ri(t, e, i);
}, Bi = function(t, e, i, r) {
  if (r || (r = { action: "more-info" }), !r.confirmation || r.confirmation.exemptions && r.confirmation.exemptions.some(function(a) {
    return a.user === e.user.id;
  }) || (se("warning"), confirm(r.confirmation.text || "Are you sure you want to " + r.action + "?"))) switch (r.action) {
    case "more-info":
      (i.entity || i.camera_image) && he(t, "hass-more-info", { entityId: i.entity ? i.entity : i.camera_image });
      break;
    case "navigate":
      r.navigation_path && Ni(0, r.navigation_path);
      break;
    case "url":
      r.url_path && window.open(r.url_path);
      break;
    case "toggle":
      i.entity && (Di(e, i.entity), se("success"));
      break;
    case "call-service":
      if (!r.service) return void se("failure");
      var o = r.service.split(".", 2);
      e.callService(o[0], o[1], r.service_data, r.target), se("success");
      break;
    case "fire-dom-event":
      he(t, "ll-custom", r);
  }
}, St = function(t, e, i, r) {
  var o;
  r === "double_tap" && i.double_tap_action ? o = i.double_tap_action : r === "hold" && i.hold_action ? o = i.hold_action : r === "tap" && i.tap_action && (o = i.tap_action), Bi(t, e, i, o);
};
const Oe = {
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
  slider_style: "full",
  full_slider_opacity: 100,
  show_slider_percent: !0,
  slider_color: "",
  slider_track_color: "",
  slider_height: 14,
  slider_border_radius: 6,
  slider_start_offset: 0,
  slider_end_offset: 0,
  slider_spacing: 8,
  show_slider: !0,
  hide_slider_when_off: !1,
  // Light color and temperature sliders
  show_color_temp: !1,
  hide_color_temp_when_off: !1,
  color_temp_type: "gradient",
  color_temp_height: 14,
  color_temp_border_radius: 6,
  color_temp_start_offset: 0,
  color_temp_end_offset: 0,
  show_color_picker: !1,
  hide_color_picker_when_off: !1,
  show_color_slider: !1,
  hide_color_slider_when_off: !1,
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
var Oi = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, Te = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? zi(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = (r ? n(e, i, o) : n(o)) || o);
  return r && o && Oi(e, i, o), o;
};
const Ii = [
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
], Ui = [
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
], Fi = [
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
], Gi = [
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
], Vi = [
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
], kt = [
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
function Ae(t) {
  return [
    { name: `sub_button_${t}_entity`, selector: { entity: {} } },
    { name: `sub_button_${t}_type`, selector: { select: { options: [
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
    { name: `sub_button_${t}_icon`, selector: { icon: {} } },
    { name: `sub_button_${t}_name`, selector: { text: {} } },
    { name: `sub_button_${t}_show_state`, selector: { boolean: {} } },
    { name: `sub_button_${t}_color`, selector: { color_rgb: {} } },
    { name: `sub_button_${t}_show_background`, selector: { boolean: {} } },
    { name: `sub_button_${t}_tap_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${t}_hold_action`, selector: { "ui-action": {} } },
    { name: `sub_button_${t}_double_tap_action`, selector: { "ui-action": {} } }
  ];
}
const Wi = Ae(1), Yi = Ae(2), qi = Ae(3), Ki = Ae(4), Xi = [
  { name: "tap_action", selector: { "ui-action": {} } },
  { name: "hold_action", selector: { "ui-action": {} } },
  { name: "double_tap_action", selector: { "ui-action": {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
];
function E(t) {
  if (!t) return;
  if (Array.isArray(t)) {
    const r = (o) => Math.round(Math.max(0, Math.min(255, o))).toString(16).padStart(2, "0");
    return `#${r(t[0] ?? 0)}${r(t[1] ?? 0)}${r(t[2] ?? 0)}`;
  }
  if (typeof t != "string") return;
  if (t.startsWith("#")) return t;
  const e = t.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (e) {
    const r = (o) => Math.round(Math.max(0, Math.min(255, parseInt(o, 10)))).toString(16).padStart(2, "0");
    return `#${r(e[1])}${r(e[2])}${r(e[3])}`;
  }
  const i = t.match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/);
  if (i) {
    const r = (o) => Math.round(Math.max(0, Math.min(255, parseInt(o, 10)))).toString(16).padStart(2, "0");
    return `#${r(i[1])}${r(i[2])}${r(i[3])}`;
  }
  return t;
}
function M(t) {
  const e = E(t);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const i = parseInt(e.slice(1, 3), 16), r = parseInt(e.slice(3, 5), 16), o = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(i) || isNaN(r) || isNaN(o)))
    return [i, r, o];
}
let J = class extends Z {
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
  setConfig(t) {
    const e = { ...t };
    if (e.bg_color) {
      const i = typeof e.bg_color == "string" ? e.bg_color.match(/rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i) : null;
      i && e.bg_opacity === void 0 && (e.bg_opacity = Math.round(parseFloat(i[1]) * 100)), e.bg_color = E(e.bg_color);
    }
    e.card_border_color && (e.card_border_color = E(e.card_border_color)), e.active_color && (e.active_color = E(e.active_color)), e.inactive_color && (e.inactive_color = E(e.inactive_color)), e.slider_color && (e.slider_color = E(e.slider_color)), e.slider_track_color && (e.slider_track_color = E(e.slider_track_color)), e.text_color_primary && (e.text_color_primary = E(e.text_color_primary)), e.text_color_secondary && (e.text_color_secondary = E(e.text_color_secondary)), e.sub_button_1_color && (e.sub_button_1_color = E(e.sub_button_1_color)), e.sub_button_2_color && (e.sub_button_2_color = E(e.sub_button_2_color)), e.sub_button_3_color && (e.sub_button_3_color = E(e.sub_button_3_color)), e.sub_button_4_color && (e.sub_button_4_color = E(e.sub_button_4_color)), this._config = {
      ...Oe,
      ...e
    };
  }
  _computeLabel(t) {
    return {
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
      text_padding: "Text Block Base Padding (px)",
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
    }[t.name] || t.name;
  }
  _transformConfigForForm() {
    const t = { ...this._config };
    return t.bg_color = M(t.bg_color), t.card_border_color = M(t.card_border_color), t.active_color = M(t.active_color), t.inactive_color = M(t.inactive_color), t.slider_color = M(t.slider_color), t.slider_track_color = M(t.slider_track_color), t.text_color_primary = M(t.text_color_primary), t.text_color_secondary = M(t.text_color_secondary), t.sub_button_1_color = M(t.sub_button_1_color), t.sub_button_2_color = M(t.sub_button_2_color), t.sub_button_3_color = M(t.sub_button_3_color), t.sub_button_4_color = M(t.sub_button_4_color), t.fade_stage_1_color = M(t.fade_stage_1_color), t.fade_stage_2_color = M(t.fade_stage_2_color), t.fade_stage_3_color = M(t.fade_stage_3_color), t;
  }
  _valueChanged(t, e) {
    const i = t.detail.value, r = { ...this._config };
    if (e) {
      for (const o of e)
        if (o.name in i) {
          const a = i[o.name];
          Array.isArray(a) && a.length === 3 && a.every((n) => typeof n == "number") ? r[o.name] = `rgb(${a[0]}, ${a[1]}, ${a[2]})` : r[o.name] = a;
        }
    } else
      Object.assign(r, i);
    this._config = r, he(this, "config-changed", { config: this._config });
  }
  _togglePanel(t) {
    this._openPanels = {
      ...this._openPanels,
      [t]: !this._openPanels[t]
    }, this.requestUpdate();
  }
  _renderSection(t, e, i, r, o) {
    const a = !!this._openPanels[t];
    return $`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(t)}>
          <div class="header-left">
            <span class="header-icon">${e}</span>
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
              @value-changed=${(n) => this._valueChanged(n, r)}
            ></ha-form>
          </div>
        ` : m}
      </div>
    `;
  }
  _renderSubButtonPanel(t, e, i, r) {
    const o = `sub${t}`, a = !!this._openPanels[o];
    return $`
      <div class="sub-nested-panel ${a ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(o)}>
          <div class="header-left">
            <span class="sub-dot ${e ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${t} ${e ? `(${e})` : "• Inactive"}</span>
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
              @value-changed=${(n) => this._valueChanged(n, i)}
            ></ha-form>
          </div>
        ` : m}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return $``;
    const t = this._transformConfigForForm(), e = this._config?.sub_button_1_entity || "", i = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", o = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return $`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", Ii, t)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", Ui, t)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", Fi, t)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", Gi, t)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", Vi, t)}

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
                .data=${t}
                .schema=${kt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(n) => this._valueChanged(n, kt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, e, Wi, t)}
                ${this._renderSubButtonPanel(2, i, Yi, t)}
                ${this._renderSubButtonPanel(3, r, qi, t)}
                ${this._renderSubButtonPanel(4, o, Ki, t)}
              </div>
            </div>
          ` : m}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", Xi, t)}
      </div>
    `;
  }
  static get styles() {
    return Et`
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
};
Te([
  ke({ attribute: !1 })
], J.prototype, "hass", 2);
Te([
  Ce()
], J.prototype, "_config", 2);
Te([
  Ce()
], J.prototype, "_openPanels", 2);
J = Te([
  Dt("antigravity-card-editor")
], J);
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", J);
var Zi = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, Y = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Qi(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (o = (r ? n(e, i, o) : n(o)) || o);
  return r && o && Zi(e, i, o), o;
};
const Ji = "105";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${Ji} `,
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
const ji = /* @__PURE__ */ new Set([
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
]), er = /* @__PURE__ */ new Set([
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
]), Ot = /^\d+\s*,\s*\d+\s*,\s*\d+$/, tr = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/;
function O(t) {
  const e = Math.max(1e3, Math.min(4e4, t)) / 100;
  let i, r, o;
  if (e <= 66)
    i = 255;
  else {
    const a = e - 60;
    i = 329.698727446 * Math.pow(a, -0.1332047592), i = Math.max(0, Math.min(255, i));
  }
  if (e <= 66)
    r = e, r = 99.4708025861 * Math.log(r) - 161.1195681661, r = Math.max(0, Math.min(255, r));
  else {
    const a = e - 60;
    r = 288.1221695283 * Math.pow(a, -0.0755148492), r = Math.max(0, Math.min(255, r));
  }
  if (e >= 66)
    o = 255;
  else if (e <= 19)
    o = 0;
  else {
    const a = e - 10;
    o = 138.5177312231 * Math.log(a) - 305.0447927307, o = Math.max(0, Math.min(255, o));
  }
  return [Math.round(i), Math.round(r), Math.round(o)];
}
function Ct(t) {
  return !Array.isArray(t) || t.length < 3 ? "#ffffff" : "#" + t.slice(0, 3).map((e) => Math.round(Number(e) || 0).toString(16).padStart(2, "0")).join("");
}
function ir(t, e, i) {
  t /= 255, e /= 255, i /= 255;
  const r = Math.max(t, e, i), o = Math.min(t, e, i);
  let a = 0;
  const n = r - o;
  if (n === 0) return 0;
  switch (r) {
    case t:
      a = (e - i) / n + (e < i ? 6 : 0);
      break;
    case e:
      a = (i - t) / n + 2;
      break;
    case i:
      a = (t - e) / n + 4;
      break;
  }
  return Math.round(a * 60);
}
function Tt(t, e) {
  t = t % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const i = 1, r = Math.floor(t * 6), o = t * 6 - r, a = i * (1 - e), n = i * (1 - o * e), l = i * (1 - (1 - o) * e);
  let s = 0, h = 0, c = 0;
  switch (r % 6) {
    case 0:
      s = i, h = l, c = a;
      break;
    case 1:
      s = n, h = i, c = a;
      break;
    case 2:
      s = a, h = i, c = l;
      break;
    case 3:
      s = a, h = n, c = i;
      break;
    case 4:
      s = l, h = a, c = i;
      break;
    case 5:
      s = i, h = a, c = n;
      break;
  }
  return [Math.round(s * 255), Math.round(h * 255), Math.round(c * 255)];
}
const ze = [
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
], rr = [
  { k: 2200, label: "2200K", rgb: O(2200) },
  { k: 2700, label: "2700K", rgb: O(2700) },
  { k: 3e3, label: "3000K", rgb: O(3e3) },
  { k: 4e3, label: "4000K", rgb: O(4e3) },
  { k: 5e3, label: "5000K", rgb: O(5e3) },
  { k: 6500, label: "6500K", rgb: O(6500) }
];
function ne(t) {
  if (!t) return null;
  const e = t.trim().toLowerCase();
  if (!e) return null;
  if (e.startsWith("#")) {
    const i = e.slice(1);
    if (i.length === 3)
      return [
        parseInt(i[0] + i[0], 16),
        parseInt(i[1] + i[1], 16),
        parseInt(i[2] + i[2], 16)
      ];
    if (i.length >= 6)
      return [
        parseInt(i.slice(0, 2), 16),
        parseInt(i.slice(2, 4), 16),
        parseInt(i.slice(4, 6), 16)
      ];
  }
  if (e.startsWith("rgb")) {
    const i = e.indexOf("("), r = e.lastIndexOf(")");
    if (i !== -1 && r !== -1) {
      const o = e.slice(i + 1, r).split(",").map((a) => parseFloat(a.trim()));
      if (o.length >= 3 && !o.slice(0, 3).some(isNaN))
        return [
          Math.max(0, Math.min(255, Math.round(o[0]))),
          Math.max(0, Math.min(255, Math.round(o[1]))),
          Math.max(0, Math.min(255, Math.round(o[2])))
        ];
    }
  }
  if (Ot.test(e)) {
    const i = e.split(",").map((r) => parseInt(r.trim(), 10));
    if (i.length >= 3 && !i.some(isNaN))
      return [i[0], i[1], i[2]];
  }
  for (let i = 0; i < ze.length; i++) {
    const r = ze[i];
    if (e === r.label.toLowerCase() || e === r.hex)
      return [r.rgb[0], r.rgb[1], r.rgb[2]];
  }
  return null;
}
function Be(t, e, i) {
  const r = Math.max(0, Math.min(1, i));
  return [
    Math.round(t[0] + (e[0] - t[0]) * r),
    Math.round(t[1] + (e[1] - t[1]) * r),
    Math.round(t[2] + (e[2] - t[2]) * r)
  ];
}
function At(t) {
  return `rgb(${t[0]}, ${t[1]}, ${t[2]})`;
}
function P(t, e = !0) {
  if (e)
    try {
      se(t);
    } catch {
    }
}
const K = /* @__PURE__ */ new Map(), Mt = 250;
function or(t) {
  if (!t) return "";
  const e = K.get(t);
  if (e !== void 0) return e;
  const i = t.trim();
  if (!i)
    return K.set(t, ""), "";
  let r = i;
  if (i.startsWith("#") || i.startsWith("rgb") || i.startsWith("hsl") || i.startsWith("var(") ? r = i : Ot.test(i) ? r = `rgb(${i})` : tr.test(i) ? r = `rgba(${i})` : i.toLowerCase() === "state" ? r = "var(--state-icon-color, var(--primary-color))" : er.has(i.toLowerCase()) && (r = `var(--${i.toLowerCase()}-color, ${i.toLowerCase()})`), K.size >= Mt) {
    const o = Math.floor(Mt / 4), a = K.keys();
    for (let n = 0; n < o; n++) {
      const l = a.next().value;
      l !== void 0 && K.delete(l);
    }
  }
  return K.set(t, r), r;
}
let R = class extends Z {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._staticCardStyles = "", this._staticCardClasses = "", this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._canceled = !1, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const r = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), o = Number(e.value) || 0, a = e.style.getPropertyValue("--slider-pct") || "", n = r?.textContent || "";
      this._sliderStateMap.set(e, {
        startX: t.clientX,
        startY: t.clientY,
        initialVal: o,
        initialPct: a,
        initialBadge: n,
        isScrolling: !1,
        isSliding: !1
      });
    }, this._onSliderPointerMove = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const i = this._sliderStateMap.get(e);
      if (!i) return;
      const r = Math.abs(t.clientX - i.startX), o = Math.abs(t.clientY - i.startY);
      !i.isSliding && !i.isScrolling ? o > 6 && o > r ? (i.isScrolling = !0, this._revertSlider(e, i)) : r > 6 && r >= o && (i.isSliding = !0) : i.isScrolling && this._revertSlider(e, i);
    }, this._onSliderPointerCancel = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const i = this._sliderStateMap.get(e);
      i && (i.isScrolling = !0, this._revertSlider(e, i), this._sliderStateMap.delete(e));
    }, this._onSliderPointerUp = (t) => {
      const e = t.currentTarget;
      if (!e) return;
      const i = this._sliderStateMap.get(e);
      if (i) {
        if (i.isScrolling) {
          this._revertSlider(e, i), this._sliderStateMap.delete(e);
          return;
        }
        if (this.config.tap_slider_to_toggle && !i.isSliding) {
          const r = Math.abs(t.clientX - i.startX), o = Math.abs(t.clientY - i.startY);
          r < 6 && o < 6 && (this._revertSlider(e, i), P("light", this.config.haptic_feedback !== !1), St(this, this.hass, this.config, "tap"));
        }
      }
    };
  }
  // --- SECTIONS LAYOUT SUPPORT ---
  getGridOptions() {
    const t = this.config?.card_layout === "large";
    return {
      columns: { min: 2, default: 4, max: 6 },
      rows: { min: 1, default: t ? 2 : 1, max: 4 }
    };
  }
  // --- CARD SIZE FOR MASONRY/PANEL VIEWS ---
  getCardSize() {
    return this.config?.card_layout === "large" ? 3 : 2;
  }
  static getStubConfig() {
    return { ...Oe };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(t) {
    if (!t)
      throw new Error("Invalid configuration");
    this.config = {
      ...Oe,
      ...t
    }, this._cachedSubButtons = null;
    const e = [];
    this.config.entity && e.push(this.config.entity), this.config.sub_button_1_entity && e.push(this.config.sub_button_1_entity), this.config.sub_button_2_entity && e.push(this.config.sub_button_2_entity), this.config.sub_button_3_entity && e.push(this.config.sub_button_3_entity), this.config.sub_button_4_entity && e.push(this.config.sub_button_4_entity), this._monitoredEntities = e, this._computeStaticStylesAndClasses();
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const t = this.config.card_padding ?? 12, e = this.config.card_padding_vertical ?? 4, i = this.config.card_padding_horizontal ?? t, r = this.config.card_padding_top ?? e, o = this.config.card_padding_bottom ?? e, a = this.config.card_padding_left ?? i, n = this.config.card_padding_right ?? i, l = this.config.card_margin, s = this.config.card_margin_vertical ?? l, h = this.config.card_margin_horizontal ?? l, c = this.config.card_margin_top ?? s, d = this.config.card_margin_bottom ?? s, p = this.config.card_margin_left ?? h, g = this.config.card_margin_right ?? h;
    let b = "";
    (c !== void 0 || d !== void 0 || p !== void 0 || g !== void 0) && (b = `margin: ${c ?? 0}px ${g ?? 0}px ${d ?? 0}px ${p ?? 0}px;`);
    const v = this.config.border_radius ?? 12, _ = this.config.slider_style === "google", S = this.config.slider_style === "full", f = _ ? 42 : S ? 40 : 12, k = _ ? 21 : S ? 15 : 6;
    let y = "";
    this.config.card_width && (y += `width: ${this.config.card_width}; `), this.config.card_max_width && (y += `max-width: ${this.config.card_max_width}; `), this.config.card_height && (y += `height: ${this.config.card_height}; `), this.config.card_min_height !== void 0 && this.config.card_min_height > 0 && (y += `min-height: ${this.config.card_min_height}px; `);
    let w = "";
    this.config.card_border_width && this.config.card_border_width > 0 && this.config.card_border_style && this.config.card_border_style !== "none" && (w = `border: ${this.config.card_border_width}px ${this.config.card_border_style} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color)"};`);
    const C = this.config.backdrop_blur ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", u = this.config.fill_container ? "height: 100%;" : "", x = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", T = this.config.aspect_ratio ? `aspect-ratio: ${this.config.aspect_ratio};` : "", N = this.config.card_opacity !== void 0 && this.config.card_opacity < 100 ? `opacity: ${this.config.card_opacity / 100};` : "", L = this.config.transition_duration ?? 300, q = L > 0 ? `transition: background ${L}ms ease-out, box-shadow ${L}ms ease-out, border-color ${L}ms ease-out, opacity ${L}ms ease-out;` : "transition: none;", D = `--ag-sub-btn-align: ${this.config.sub_button_alignment ?? "flex-end"};`, ee = `--ag-full-slider-opacity: ${(this.config.full_slider_opacity ?? 30) / 100};`, B = `--ag-marquee-speed: ${this.config.text_scrolling_speed ?? 10}s;`, _e = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, pe = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, ge = this.config.text_padding !== void 0 || this.config.text_padding_vertical !== void 0 || this.config.text_padding_horizontal !== void 0 ? `--ag-text-padding: ${_e}px ${pe}px;` : "", fe = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, be = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, me = this.config.features_padding !== void 0 || this.config.features_padding_vertical !== void 0 || this.config.features_padding_horizontal !== void 0 ? `--ag-features-padding: ${fe}px ${be}px;` : "", Pe = this.config.sub_button_container_padding !== void 0 ? `--ag-sub-btn-container-padding: ${this.config.sub_button_container_padding}px;` : "";
    this._staticCardStyles = [
      y,
      `border-radius: ${v}px;`,
      `padding: ${r}px ${n}px ${o}px ${a}px;`,
      w,
      C,
      u,
      x,
      T,
      N,
      q,
      b,
      ge,
      me,
      Pe,
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
      D,
      B,
      ee
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "none"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
  }
  // --- PERFORMANCE: Zero-allocation re-render check ---
  shouldUpdate(t) {
    if (!this.config || !this.hass || t.has("config") || t.has("preview") || t.has("_collapsed")) return !0;
    const e = t.get("hass");
    if (!e || e.themes !== this.hass.themes || e.locale !== this.hass.locale || e.language !== this.hass.language || e.config !== this.hass.config)
      return !0;
    const i = this._monitoredEntities;
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      if (e.states[o] !== this.hass.states[o])
        return !0;
    }
    return !1;
  }
  _getSubButtons() {
    if (this._cachedSubButtons) return this._cachedSubButtons;
    const t = this.config.entity, e = [];
    for (let i = 1; i <= 4; i++) {
      const r = this.config[`sub_button_${i}_entity`], o = this.config[`sub_button_${i}_icon`], a = this.config[`sub_button_${i}_name`], n = this.config[`sub_button_${i}_tap_action`], l = this.config[`sub_button_${i}_hold_action`], s = this.config[`sub_button_${i}_double_tap_action`], h = this.config[`sub_button_${i}_type`], c = this.config[`sub_button_${i}_color`], d = this.config[`sub_button_${i}_show_background`], p = this.config[`sub_button_${i}_show_state`];
      if (!!(r || o || a || h && h !== "button" || p)) {
        const b = r || t;
        e.push({
          key: `${b || "sub"}_${i}`,
          entity: b,
          type: h || "button",
          icon: o,
          color: c,
          bg: d,
          name: a,
          showState: p === !0,
          tapAction: n,
          holdAction: l,
          doubleTapAction: s
        });
      }
    }
    return this._cachedSubButtons = e, this._cachedSubButtons;
  }
  _hasCollapsible() {
    return this._cachedHasCollapsible;
  }
  _recomputeHasCollapsible() {
    if (!this.hass || !this.config || !this.config.entity) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const t = this.hass.states[this.config.entity];
    if (!t) {
      this._cachedHasCollapsible = !1;
      return;
    }
    const i = this.config.entity.split(".")[0] === "light", r = t.state === "on", o = this.config.hide_color_temp_when_off !== !1, a = this.config.hide_color_picker_when_off !== !1, n = this.config.hide_color_slider_when_off !== !1, l = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, s = i && this.config.show_color_temp === !0 && (l !== void 0 || t.attributes?.supported_color_modes?.some((_) => ["color_temp"].includes(_))) && (!o || r), h = t.attributes?.supported_color_modes, c = Array.isArray(h) && h.some((_) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(_)), d = this.config.color_picker_type !== "wheel", p = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && d) && c && (!n || r), g = i && this.config.show_color_picker === !0 && !d && c && (!a || r), b = s || p || g, v = this._getSubButtons();
    this._cachedHasCollapsible = b || v.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((t) => {
      for (const e of t)
        e.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const t = this.config?.primary_info, e = this.config?.secondary_info, i = this.config?.entity, r = i ? i.split(".")[0] : "", o = (r === "binary_sensor" || r === "timer") && (t === "state" || e === "state"), a = this.config?.fade_transition_enabled === !0, n = a || o || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered" || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered";
    if (n && !this._relativeTimer) {
      const l = a ? 1e3 : 5e3;
      this._relativeTimer = setInterval(() => {
        !this.hasAttribute("offscreen") && this.style.display !== "none" && this.requestUpdate();
      }, l);
    } else !n && this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._throttleMap.clear(), this._subTapTimerMap.forEach((t) => clearTimeout(t)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  firstUpdated(t) {
    super.firstUpdated(t);
  }
  updated(t) {
    if (super.updated(t), this._updateVisibility(), t.has("config") || t.has("_collapsed"))
      this._recomputeHasCollapsible(), this._setupRelativeTimer();
    else if (t.has("hass") && this.config?.entity) {
      const e = t.get("hass");
      (!e || e.states[this.config.entity] !== this.hass.states[this.config.entity]) && this._recomputeHasCollapsible();
    }
  }
  _toggleDisplay(t) {
    if (this.preview) {
      this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1;
      return;
    }
    t ? (this.style.setProperty("display", "none", "important"), this.hidden = !0) : (this.style.display === "none" && this.style.removeProperty("display"), this.hidden = !1);
  }
  _updateVisibility() {
    if (!this.config || !this.hass) return;
    const t = this.config.visibility_state;
    if (!t || t === "always") {
      this._toggleDisplay(!1);
      return;
    }
    const e = this.config.entity, i = e ? this.hass.states[e] : void 0;
    if (!i) {
      this._toggleDisplay(!1);
      return;
    }
    const r = i.state === "on" || this._isEntityActive(i);
    let o = !1;
    (t === "on" && !r || t === "off" && r) && (o = !0), this._toggleDisplay(o);
  }
  _isEntityActive(t) {
    return t ? ji.has(t.state) : !1;
  }
  _calculateMultiStageFade(t, e, i) {
    const r = {
      enabled: !1,
      activeFade: !1,
      currentColor: "",
      progressPct: 0,
      remainingSeconds: 0,
      currentStage: 0,
      stageLabel: ""
    };
    if (!this.config?.fade_transition_enabled || !t)
      return r;
    const o = this._isEntityActive(t), a = this.config.fade_trigger ?? "on_inactive";
    if (!(a === "on_inactive" && !o || a === "on_active" && o || a === "both"))
      return r;
    const l = o ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || e || "#d60000", s = o ? this._resolveColor(this.config.active_color) || e || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", h = ne(l) || [214, 0, 0], c = ne(s) || [3, 177, 0], d = Number(this.config.fade_stage_1_duration) ?? 60, p = Number(this.config.fade_stage_2_duration) ?? 600, g = Number(this.config.fade_stage_3_duration) ?? 1800;
    this._lastTrackedState !== null && this._lastTrackedState !== t.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = t.state;
    const b = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : h, v = ne(this.config.fade_stage_1_color) || [255, 152, 0], _ = this.config.fade_stage_2_pickup !== !1 ? v : h, S = ne(this.config.fade_stage_2_color) || [205, 220, 57], f = this.config.fade_stage_3_pickup !== !1 ? S : v, k = ne(this.config.fade_stage_3_color) || c, y = d + p + g;
    if (y <= 0)
      return r;
    const w = this._parseDate(t.last_changed || t.last_updated);
    if (!w)
      return r;
    const C = Math.max(0, (Date.now() - w.getTime()) / 1e3);
    if (C >= y)
      return this._currentLiveRgb = k, this._previousLiveRgb = null, {
        enabled: !0,
        activeFade: !1,
        currentColor: At(k),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let u, x = 1, T = 0;
    const N = Math.max(0, Math.round(y - C));
    C < d && d > 0 ? (x = 1, T = C / d, u = Be(b, v, T)) : C < d + p && p > 0 ? (x = 2, T = (C - d) / p, u = Be(_, S, T)) : g > 0 ? (x = 3, T = (C - d - p) / g, u = Be(f, k, T)) : (x = 0, u = k), this._currentLiveRgb = u;
    const L = Math.min(100, Math.round(C / y * 100)), q = At(u);
    let D = "";
    return N >= 60 ? D = `${Math.ceil(N / 60)}m left` : D = `${N}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: q,
      progressPct: L,
      remainingSeconds: N,
      currentStage: x,
      stageLabel: D
    };
  }
  _resolveColor(t) {
    return or(t);
  }
  // Shared date parser — eliminates duplication between _formatRelativeTime and _formatForDuration
  _parseDate(t) {
    if (!t) return null;
    if (t instanceof Date) return isNaN(t.getTime()) ? null : t;
    if (typeof t == "number") {
      const e = new Date(t > 1e11 ? t : t * 1e3);
      return isNaN(e.getTime()) ? null : e;
    }
    if (typeof t == "string") {
      let e = t.trim();
      e.includes(" ") && !e.includes("T") && (e = e.replace(" ", "T")), e.includes("T") && !e.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(e) && !/[+-]\d{4}$/.test(e) && (e += "Z");
      const i = Number(e);
      let r;
      return !isNaN(i) && e !== "" && !e.includes("T") ? r = new Date(i > 1e11 ? i : i * 1e3) : r = new Date(e), isNaN(r.getTime()) ? null : r;
    }
    return null;
  }
  _formatTimeAgo(t, e = !1, i) {
    const r = this._parseDate(t);
    if (!r) return "";
    const o = Math.max(0, Math.round(((i ?? Date.now()) - r.getTime()) / 1e3));
    if (o < 5) return e ? "< 5 sec" : "just now";
    if (o < 60) return e ? `${o} sec` : `${o} seconds ago`;
    const a = Math.round(o / 60);
    if (a < 60) return e ? `${a} ${a === 1 ? "min" : "mins"}` : `${a} ${a === 1 ? "minute" : "minutes"} ago`;
    const n = Math.round(a / 60);
    if (n < 24) return `${n} ${n === 1 ? "hour" : "hours"}${e ? "" : " ago"}`;
    const l = Math.round(n / 24);
    if (l < 7) return `${l} ${l === 1 ? "day" : "days"}${e ? "" : " ago"}`;
    const s = Math.round(l / 7);
    if (s < 4) return `${s} ${s === 1 ? "week" : "weeks"}${e ? "" : " ago"}`;
    const h = Math.round(l / 30);
    if (h < 12) return `${h} ${h === 1 ? "month" : "months"}${e ? "" : " ago"}`;
    const c = Math.round(l / 365);
    return `${c} ${c === 1 ? "year" : "years"}${e ? "" : " ago"}`;
  }
  _formatRelativeTime(t, e) {
    return this._formatTimeAgo(t, !1, e);
  }
  _formatForDuration(t, e) {
    return this._formatTimeAgo(t, !0, e);
  }
  _getInfoContent(t, e) {
    if (!e) return "";
    switch ((t || "").toLowerCase().replace(/_/g, "-")) {
      case "name":
        return this.config.name || e.attributes.friendly_name || this.config.entity || "";
      case "state": {
        const r = (e.entity_id || "").split(".")[0];
        if (r === "timer" && e.state === "active" && e.attributes?.finishes_at) {
          const o = Date.parse(e.attributes.finishes_at);
          if (!isNaN(o)) {
            const a = Math.max(0, Math.round((o - Date.now()) / 1e3)), n = Math.floor(a / 60), l = a % 60, s = Math.floor(n / 60), h = (n % 60).toString().padStart(2, "0"), c = l.toString().padStart(2, "0");
            return s > 0 ? `${s}:${h}:${c}` : `${h}:${c}`;
          }
        }
        if (r === "binary_sensor")
          return this._formatForDuration(e.last_changed);
        if (r === "lock") {
          if (e.state === "locked") return "Locked";
          if (e.state === "unlocked") return "Unlocked";
          if (e.state === "jammed") return "Jammed (Alert!)";
          if (e.state === "locking") return "Locking...";
          if (e.state === "unlocking") return "Unlocking...";
        }
        if (r === "light" && e.state === "on") {
          const o = e.attributes?.brightness, a = o !== void 0 ? Math.round(o / 255 * 100) : 100;
          if (e.attributes?.color_temp_kelvin)
            return `${a}% • ${e.attributes.color_temp_kelvin}K`;
        }
        if (e.attributes?.device_class === "timestamp" || e.attributes?.device_class === "date" || typeof e.state == "string" && (e.state.includes("T") || e.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(e.state))) {
          const o = this._formatRelativeTime(e.state);
          if (o) return o;
        }
        if (typeof this.hass.formatEntityState == "function")
          try {
            return this.hass.formatEntityState(e);
          } catch {
          }
        return `${e.state} ${e.attributes?.unit_of_measurement || ""}`.trim();
      }
      case "last-changed":
      case "last-changed-relative":
      case "relative-time": {
        const r = e.attributes?.last_triggered || e.last_changed;
        return this._formatForDuration(r);
      }
      case "last-updated":
      case "last-updated-relative":
        return this._formatForDuration(e.last_updated);
      case "last-triggered": {
        const r = e.attributes?.last_triggered || e.last_changed;
        return this._formatForDuration(r);
      }
      case "brightness": {
        const r = e.attributes?.brightness;
        return r !== void 0 ? `${Math.round(r / 255 * 100)}%` : "";
      }
      case "temperature": {
        const r = e.attributes?.temperature ?? e.attributes?.current_temperature, o = e.attributes?.unit_of_measurement || this.hass.config?.unit_system?.temperature || "°C";
        return r !== void 0 ? `${r} ${o}` : "";
      }
      case "humidity": {
        const r = e.attributes?.humidity ?? e.attributes?.current_humidity, o = e.attributes?.unit_of_measurement || "%";
        return r !== void 0 ? `${r}${o.startsWith("%") ? o : ` ${o}`}` : "";
      }
      case "battery": {
        const r = e.attributes?.battery_level ?? e.attributes?.battery ?? (e.attributes?.device_class === "battery" ? e.state : void 0);
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
  _dispatchAction(t, e, i) {
    const r = i || this.config.entity;
    let o = e;
    if (o || (t === "double_tap" ? o = this.config.double_tap_action : t === "hold" ? o = this.config.hold_action : o = this.config.tap_action || { action: "toggle" }), !(!o || o.action === "none")) {
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
        const a = r.split(".")[0], n = a === "lock" ? this._isEntityActive(this.hass?.states[r]) ? "lock" : "unlock" : "toggle", l = ["lock", "cover"].includes(a) ? a : a === "group" ? "homeassistant" : a;
        this.hass?.callService(l, n, { entity_id: r });
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
        const [a, n] = o.service.split(".", 2);
        this.hass?.callService(a, n, o.data || o.service_data || {}, o.target);
        return;
      }
      St(this, this.hass, { ...this.config, entity: r }, t);
    }
  }
  _handleTap(t) {
    if (t.stopPropagation(), this._isSubElement(t)) return;
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
      P("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, P("medium", this.config.haptic_feedback !== !1), i && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, P("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(t) {
    this._isSubElement(t) || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), P("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(t) {
    if (t.preventDefault(), t.stopPropagation(), this._held) return;
    P("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(t) {
    this._isSubElement(t) || (this._held = !1, this._moved = !1, this._canceled = !1, this._startX = t.clientX, this._startY = t.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), P("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(t) {
    this._isSubElement(t) || Math.hypot(t.clientX - this._startX, t.clientY - this._startY) > 8 && (this._moved = !0, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _handlePointerUp(t) {
    this._isSubElement(t) || this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null);
  }
  _handlePointerCancel(t) {
    this._isSubElement(t) || (this._canceled = !0, this._moved = !0, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
  }
  _isSubElement(t) {
    const e = t.target;
    return e ? e.tagName === "INPUT" || e.hasAttribute("data-ag-sub") ? !0 : !!e.closest?.("[data-ag-sub], .sub-button, .sub-color-picker, .sub-button-slider-container, .slider-container, .slider-google-wrap, .sub-button-google-slider, .color-picker") : !1;
  }
  _handleSubPointerDown(t, e, i) {
    t.stopPropagation(), this._subHeld = !1, this._subMoved = !1, this._subCanceled = !1, this._subPointerDownTime = Date.now(), this._subStartX = t.clientX, this._subStartY = t.clientY, this._subHoldTimer = setTimeout(() => {
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, P("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, e));
    }, 500);
  }
  _handleSubPointerMove(t) {
    t.stopPropagation(), Math.hypot(t.clientX - this._subStartX, t.clientY - this._subStartY) > 8 && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
  }
  _handleSubPointerUp(t) {
    t.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubPointerCancel(t) {
    t.stopPropagation(), this._subCanceled = !0, this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
  }
  _handleSubTap(t, e, i, r, o) {
    if (t.stopPropagation(), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null), this._subMoved || this._subCanceled) {
      this._subMoved = !1, this._subCanceled = !1;
      return;
    }
    if (this._subHeld) {
      this._subHeld = !1;
      return;
    }
    if (this._subPointerDownTime && Date.now() - this._subPointerDownTime > 600)
      return;
    const a = r && r.action !== "none", n = e || "sub_default", l = () => {
      P("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, e) : o ? o() : this._dispatchAction("tap", { action: "toggle" }, e);
    };
    if (!a) {
      l();
      return;
    }
    const s = this._subTapTimerMap.get(n);
    if (s) {
      clearTimeout(s), this._subTapTimerMap.delete(n), P("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", r, e);
      return;
    }
    const h = setTimeout(() => {
      this._subTapTimerMap.delete(n), l();
    }, 250);
    this._subTapTimerMap.set(n, h);
  }
  _handleSubContextMenu(t, e, i) {
    t.preventDefault(), t.stopPropagation(), !this._subHeld && (P("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, e));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(t, e) {
    const i = Date.now();
    i - (this._throttleMap.get(t) ?? 0) < 100 || (this._throttleMap.set(t, i), e());
  }
  _revertSlider(t, e) {
    t.value = String(e.initialVal), t.style.setProperty("--slider-pct", e.initialPct);
    const r = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    r && (r.textContent = e.initialBadge);
  }
  _sliderInput(t, e, i, r, o, a, n) {
    t.stopPropagation();
    const l = t.target, s = this._sliderStateMap.get(l);
    if (s?.isScrolling) {
      this._revertSlider(l, s);
      return;
    }
    const h = Number(l.value), c = isNaN(h) ? 0 : h, d = a ? a(c) : c;
    requestAnimationFrame(() => {
      if (s?.isScrolling) {
        this._revertSlider(l, s);
        return;
      }
      l.style.setProperty("--slider-pct", `${d}%`);
      const p = l.closest(".slider-container, .sub-button-slider-container"), g = p?.querySelector(".slider-percent-badge, .sub-slider-pct");
      if (g && (g.textContent = n ? n(c, d) : `${d}%`), e === "color_hue" && p) {
        p.style.setProperty("--color-hue-val", `hsl(${c}, 100%, 50%)`);
        const b = p.querySelector(".color-chip-badge span");
        b && (b.style.background = `hsl(${c}, 100%, 50%)`);
      }
    }), P("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(t, e, i, r) {
    t.stopPropagation();
    const o = t.target, a = this._sliderStateMap.get(o);
    if (a?.isScrolling) {
      this._revertSlider(o, a), a.isScrolling = !1;
      return;
    }
    const n = Number(o.value), l = isNaN(n) ? 0 : n;
    if (!(a && l === a.initialVal)) {
      if (e === "light" && i === "turn_on") {
        const s = Math.round(l / 255 * 100);
        if (l <= 3 || s <= 1) {
          this.hass.callService("light", "turn_off", { entity_id: this.config.entity });
          return;
        }
      }
      if (e === "fan" && i === "set_percentage" && l <= 0) {
        this.hass.callService("fan", "turn_off", { entity_id: this.config.entity });
        return;
      }
      this.hass.callService(e, i, { entity_id: this.config.entity, ...r(l) });
    }
  }
  _getLightLiveColor(t) {
    if (!t || !t.attributes) return null;
    const e = t.attributes;
    if (e.color_mode === "color_temp") {
      const r = e.color_temp_kelvin ?? (e.color_temp ? Math.round(1e6 / e.color_temp) : 3e3), [o, a, n] = O(r);
      return `rgb(${o}, ${a}, ${n})`;
    }
    if (Array.isArray(e.rgb_color) && e.rgb_color.length >= 3)
      return `rgb(${e.rgb_color[0]}, ${e.rgb_color[1]}, ${e.rgb_color[2]})`;
    if (Array.isArray(e.hs_color) && e.hs_color.length >= 2) {
      const [r, o, a] = Tt(e.hs_color[0], e.hs_color[1]);
      return `rgb(${r}, ${o}, ${a})`;
    }
    if (Array.isArray(e.rgbw_color) && e.rgbw_color.length >= 3)
      return `rgb(${e.rgbw_color[0]}, ${e.rgbw_color[1]}, ${e.rgbw_color[2]})`;
    if (Array.isArray(e.rgbww_color) && e.rgbww_color.length >= 3)
      return `rgb(${e.rgbww_color[0]}, ${e.rgbww_color[1]}, ${e.rgbww_color[2]})`;
    if (e.color_temp_kelvin !== void 0 || e.color_temp !== void 0) {
      const r = e.color_temp_kelvin ?? Math.round(1e6 / e.color_temp), [o, a, n] = O(r);
      return `rgb(${o}, ${a}, ${n})`;
    }
    return t.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(t) {
    const e = this._getLightLiveColor(t);
    if (!e) return "#ffffff";
    const i = e.indexOf("rgb(");
    if (i !== -1) {
      const r = e.indexOf(")", i);
      if (r !== -1) {
        const o = e.slice(i + 4, r).split(",");
        if (o.length >= 3)
          return Ct([parseInt(o[0], 10), parseInt(o[1], 10), parseInt(o[2], 10)]);
      }
    }
    return t?.attributes && Array.isArray(t.attributes.rgb_color) && t.attributes.rgb_color.length >= 3 ? Ct(t.attributes.rgb_color) : "#ffffff";
  }
  _getLiveHue(t) {
    if (!t) return 0;
    if (Array.isArray(t.attributes?.hs_color) && t.attributes.hs_color.length >= 1)
      return Math.round(t.attributes.hs_color[0]) % 360;
    if (Array.isArray(t.attributes?.rgb_color) && t.attributes.rgb_color.length >= 3) {
      const [e, i, r] = t.attributes.rgb_color;
      return ir(e, i, r);
    }
    return 0;
  }
  _handleColorInput(t, e, i, r) {
    t.stopPropagation();
    const o = t.target.value;
    if (!o || o.length < 7) return;
    const a = parseInt(o.slice(1, 3), 16), n = parseInt(o.slice(3, 5), 16), l = parseInt(o.slice(5, 7), 16);
    if (isNaN(a) || isNaN(n) || isNaN(l)) return;
    const s = i || this.config.entity, h = () => {
      this.hass.callService("light", "turn_on", { entity_id: s, rgb_color: [a, n, l] });
    };
    e ? this._throttledCall(r || "color_picker", h) : h();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return $``;
    const t = this.config.entity;
    if (!t)
      return $`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const e = this.hass.states[t];
    if (!e)
      return $`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${t}</code></span>
        </ha-card>
      `;
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, e) : "", r = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, e) : "", o = this._isEntityActive(e), a = t.split(".")[0];
    let n = "var(--primary-color)", l = null;
    a === "climate" ? e.state === "heat" ? n = "var(--state-climate-heat-color, #ff7043)" : e.state === "cool" ? n = "var(--state-climate-cool-color, #42a5f5)" : e.state === "dry" ? n = "var(--state-climate-dry-color, #ab47bc)" : e.state === "fan_only" && (n = "var(--state-climate-fan_only-color, #26a69a)") : a === "light" && (l = this._getLightLiveColor(e), l && (n = l));
    const s = this.config.color_type === "card";
    let h = this._resolveColor(this.config.active_color);
    (!h || this.config.use_light_color) && (a === "light" && l && (this.config.use_light_color || !this.config.active_color) ? h = l : h = n);
    const c = this._resolveColor(this.config.inactive_color) || "var(--secondary-background-color, rgba(150, 150, 150, 0.2))", d = this.config.show_slider !== !1, p = a === "light", g = a === "cover", b = a === "fan", v = a === "humidifier", _ = a === "media_player", S = a === "number" || a === "input_number", f = a === "climate", k = this.config.hide_slider_when_off !== !1, y = this.config.hide_color_temp_when_off !== !1, w = this.config.hide_color_picker_when_off !== !1, C = this.config.hide_color_slider_when_off !== !1, u = e.attributes?.brightness !== void 0 || e.attributes?.supported_color_modes?.some((A) => A !== "onoff"), x = p && d && u && (!k || o), T = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, N = p && this.config.show_color_temp === !0 && (T !== void 0 || e.attributes?.supported_color_modes?.some((A) => ["color_temp"].includes(A))) && (!y || o), L = e.attributes?.supported_color_modes, q = Array.isArray(L) && L.some((A) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(A)), D = this.config.color_picker_type !== "wheel", ee = p && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && D) && q && (!C || o), Me = p && this.config.show_color_picker === !0 && !D && q && (!w || o), B = e.state !== "unavailable" && e.state !== "unknown", _e = g && B && d && e.attributes?.current_position !== void 0, pe = b && B && o && d && e.attributes?.percentage !== void 0, ge = v && B && o && d && (e.attributes?.humidity !== void 0 || e.attributes?.target_humidity !== void 0), fe = _ && B && o && d && e.attributes?.volume_level !== void 0, be = S && B && d, me = f && B && o && d && (e.attributes?.temperature !== void 0 || e.attributes?.target_temp_high !== void 0), Pe = (this.config.bg_opacity ?? 10) / 100, zt = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : s && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${h};`, It = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : s && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", H = this._calculateMultiStageFade(e, n, c), Ee = this.config.fade_target ?? "card", Ye = this._resolveColor(this.config.bg_color);
    let te;
    H.activeFade && (Ee === "card" || Ee === "all" || s) ? te = H.currentColor : s ? te = o ? a === "light" && l ? l : h : c : Ye ? te = Ye : te = `rgba(150, 150, 150, ${Pe})`;
    let Le = this._resolveColor(this.config.active_color) || (a === "light" && l ? l : h) || "var(--primary-color)";
    H.activeFade && (Ee === "all" || this.config.active_glow === !0) && (Le = H.currentColor);
    let ve = "";
    this.config.box_shadow === "soft" && (ve = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (ve = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (ve = o || H.activeFade ? `box-shadow: 0 0 22px ${Le}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const Ut = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", I = e?.attributes?.device_class, Ft = a === "binary_sensor" && (I === "motion" || I === "occupancy" || I === "presence"), Gt = a === "binary_sensor" && (I === "door" || I === "window" || I === "garage_door" || I === "opening"), Vt = Ft && (o || H.activeFade && H.currentStage === 1) ? "motion-active" : "", Wt = Gt && o ? "door-open" : "", Yt = `${this._staticCardClasses} ${Ut} ${Vt} ${Wt}`, qe = this._getSubButtons(), qt = this.config.font_weight_primary ?? "bold";
    let ie = "";
    this.config.text_color_primary ? ie += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : s && o && (ie += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? ie += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : s && o && (ie += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const Ke = Number(this.config.text_offset_x) || 0, Xe = Number(this.config.text_offset_y) || 0, Kt = Ke !== 0 || Xe !== 0 ? `transform: translate(${Ke}px, ${Xe}px);` : "", Ze = Number(this.config.features_offset_x) || 0, Qe = Number(this.config.features_offset_y) || 0, Je = Ze !== 0 || Qe !== 0 ? `transform: translate(${Ze}px, ${Qe}px);` : "";
    let He = "";
    this.config.text_box_width ? He = `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : He = "width: 100%; max-width: 100%;";
    const Xt = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", Zt = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, je = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", et = this.config.line_height ? `line-height: ${this.config.line_height};` : "", re = this.config.features_position === "inline", Qt = this.config.text_scrolling_primary || "none", Jt = this.config.text_scrolling_secondary || "none", tt = $`
      ${x ? this._renderLightSlider(e) : m}
      ${_e ? this._renderCoverSlider(e) : m}
      ${pe ? this._renderFanSlider(e) : m}
      ${ge ? this._renderHumidifierSlider(e) : m}
      ${fe ? this._renderMediaSlider(e) : m}
      ${be ? this._renderNumberSlider(e) : m}
      ${me ? this._renderClimateSlider(e) : m}
    `, it = $`
      ${N ? this._renderColorTempSlider(e) : m}
      ${ee ? this._renderColorSlider(e) : m}
      ${Me ? this._renderColorPicker(e) : m}
    `, rt = x || _e || pe || ge || fe || be || me, ot = N || ee || Me, at = Number(this.config.slider_start_offset) || 0, nt = Number(this.config.slider_end_offset) || 0, st = [
      at ? `margin-left: ${at}px !important;` : "",
      nt ? `margin-right: ${nt}px !important;` : ""
    ].filter(Boolean).join(" "), Ne = this.config.decay_slider_position ?? "bottom";
    return $`
      ${this.config.custom_styles ? $`<style>${this.config.custom_styles}</style>` : m}
      <ha-card 
        tabindex="0"
        class="${Yt}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${te}; ${ve} ${zt} ${It} ${ie} --ag-glow-color: ${Le}; --ag-active-color: ${h};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${re ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${Ne === "top" ? this._renderDecaySlider(H) : m}

          <div class="info-container">
            <div class="info" style="${Kt} ${He} text-align: var(--ag-text-alignment);">
              ${i ? $`
                <div class="text-marquee-container scroll-${Qt}">
                  <span class="primary scroll-content" style="font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${qt}; ${Xt} ${je} ${et}">${i}</span>
                </div>` : m}
              ${r ? $`
                <div class="text-marquee-container scroll-${Jt}">
                  <span class="secondary scroll-content" style="font-size: ${this.config.font_size_secondary ?? 12}px; ${Zt} ${je} ${et}">${r}</span>
                </div>` : m}
            </div>
            ${Ne === "inline" ? $`<div class="inline-sliders">${this._renderDecaySlider(H)}</div>` : m}
            ${re && rt ? $`<div class="inline-sliders" style="${st}">${tt}</div>` : m}
            ${re && ot ? $`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${it}</div>` : m}
          </div>
          
          ${Ne === "bottom" ? this._renderDecaySlider(H) : m}
          ${!re && rt ? $`<div class="features-container" style="${Je} ${st}">${tt}</div>` : m}

          <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
            ${!re && ot ? $`<div class="features-container" style="${Je}">${it}</div>` : m}

            ${qe.length > 0 ? $`
              <div class="sub-buttons-container">
                ${Ei(
      qe,
      (A) => A.key,
      (A) => this._renderSubButton(A.entity || "", A.icon, A.color, A.bg !== !1, A.name, A.tapAction, A.holdAction, A.type, A.doubleTapAction, A.showState)
    )}
              </div>
            ` : m}
          </div>

        </div>
      </ha-card>
    `;
  }
  // --- DECAY / COOLDOWN SLIDER COMPONENT ---
  _renderDecaySlider(t) {
    if (!this.config.show_decay_slider || !t.enabled || !t.activeFade)
      return m;
    const e = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (e ? 32 : 10), r = this.config.slider_border_radius ?? (e ? 16 : 5), o = Math.max(0, 100 - t.progressPct);
    return $`
      <div class="decay-slider-container" style="--decay-color: ${t.currentColor};">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${r}px;">
          <div class="decay-slider-fill" style="width: ${o}%; background: ${t.currentColor}; border-radius: ${r}px;"></div>
          <span class="decay-slider-badge">${t.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(t, e, i, r, o, a, n, l, s, h, c, d, p = "", g = "", b) {
    const v = this.config.slider_style === "google", _ = v || this.config.show_slider_percent === !0, S = d ? d(a, n) : `${n}%`, f = this.config.slider_stepped_movement === !1 ? "any" : o, k = t !== "color_temp" && t !== "color_hue", y = this.config.slider_style === "full", w = k && y ? "main-slider-full" : "";
    let C = 0, u = 0;
    t === "color_temp" ? (C = Number(this.config.color_temp_start_offset) || 0, u = Number(this.config.color_temp_end_offset) || 0) : t === "color_hue" ? (C = Number(this.config.color_slider_start_offset) || 0, u = Number(this.config.color_slider_end_offset) || 0) : (C = Number(this.config.slider_start_offset) || 0, u = Number(this.config.slider_end_offset) || 0);
    let x = "";
    return k && y ? x = `left: ${C}px !important; right: ${u}px !important; width: calc(100% - ${C + u}px) !important;` : x = [
      C ? `margin-left: ${C}px !important;` : "",
      u ? `margin-right: ${u}px !important;` : ""
    ].filter(Boolean).join(" "), $`
      <div class="slider-container ${p} ${w} ${v ? "slider-google-wrap" : ""}" style="${x} ${g}">
        <input type="range" min=${i} max=${r} step=${f} .value=${a}
               aria-label="${e}"
               style="--slider-pct: ${n}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(T) => this._sliderInput(T, t, l, s, h, c, d)}
               @change=${(T) => this._sliderChange(T, l, s, h)} />
        ${_ ? $`<span class="slider-percent-badge">${b || S}</span>` : m}
      </div>
    `;
  }
  // --- MULTI-DOMAIN SLIDER RENDERERS ---
  _renderLightSlider(t) {
    const e = t.attributes.brightness ?? 0, i = Math.max(0, Math.min(100, Math.round(e / 255 * 100))), r = this._getLightLiveColor(t), o = (this.config.use_light_color !== !1 || !this.config.slider_color) && r ? `--slider-color: ${r};` : "";
    return this._renderGenericSlider(
      "brightness",
      "Brightness",
      0,
      255,
      1,
      e,
      i,
      "light",
      "turn_on",
      (a) => ({ brightness: a }),
      (a) => Math.round(a / 255 * 100),
      (a, n) => n <= 1 ? "Off" : `${n}%`,
      "",
      o
    );
  }
  _renderColorTempSlider(t) {
    const e = this.config.color_temp_type || "gradient", i = t.attributes.color_temp_kelvin !== void 0 || t.attributes.min_color_temp_kelvin !== void 0 || t.attributes.max_color_temp_kelvin !== void 0, r = i ? t.attributes.min_color_temp_kelvin || 2e3 : t.attributes.min_mireds || 153, o = i ? t.attributes.max_color_temp_kelvin || 6500 : t.attributes.max_mireds || 500, a = i ? t.attributes.color_temp_kelvin || 3e3 : t.attributes.color_temp || 300, n = o - r, l = n > 0 ? Math.max(0, Math.min(100, Math.round((a - r) / n * 100))) : 0, s = i ? "color_temp_kelvin" : "color_temp", h = e === "google" || e === "gradient" && this.config.slider_style === "google", c = h ? 42 : e === "thin" ? 6 : 12, d = h ? 21 : e === "thin" ? 3 : 6, p = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? c, g = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? d, b = i ? `${a} K` : `${a} mireds`;
    if (e === "presets") {
      const v = Number(this.config.color_temp_start_offset) || 0, _ = Number(this.config.color_temp_end_offset) || 0, S = [
        v ? `margin-left: ${v}px;` : "",
        _ ? `margin-right: ${_}px;` : ""
      ].filter(Boolean).join(" ");
      return $`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${S}">
          ${rr.map((f) => {
        const [k, y, w] = f.rgb, C = Math.abs(a - f.k) < 200;
        return $`
              <button 
                type="button"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${p}px; border-radius: ${g}px; border: ${C ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${k}, ${y}, ${w}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${C ? "0 0 8px rgba(" + k + "," + y + "," + w + ", 0.8)" : "none"};"
                @click=${(u) => {
          u.stopPropagation(), P("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, [s]: f.k });
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${k}, ${y}, ${w}); display: inline-block;"></span>
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
      (v) => ({ [s]: v }),
      (v) => n > 0 ? Math.round((v - r) / n * 100) : 0,
      (v) => i ? `${v} K` : `${v} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${h ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${p}px; --ag-slider-radius: ${g}px;`,
      b
    );
  }
  _renderColorSlider(t) {
    const e = this.config.color_picker_type || "slider";
    if (e === "wheel")
      return this._renderColorPicker(t);
    if (e === "swatches") {
      const d = this._getLiveHex(t).toLowerCase(), p = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, g = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, b = Number(this.config.color_slider_start_offset) || 0, v = Number(this.config.color_slider_end_offset) || 0, _ = [
        b ? `margin-left: ${b}px;` : "",
        v ? `margin-right: ${v}px;` : ""
      ].filter(Boolean).join(" ");
      return $`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${_}">
          ${ze.map((S) => {
        const f = d === S.hex.toLowerCase();
        return $`
              <button 
                type="button"
                tabindex="0"
                class="color-swatch-chip"
                title="${S.label}"
                style="flex: 1; min-width: 28px; height: ${p}px; border-radius: ${g}px; background: ${S.hex}; border: ${f ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${f ? "0 0 10px " + S.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @click=${(k) => {
          k.stopPropagation(), P("light", this.config.haptic_feedback !== !1), this.hass.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: S.rgb });
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this._getLiveHue(t), r = Math.max(0, Math.min(100, Math.round(i / 360 * 100))), o = e === "google" || this.config.slider_style === "google", a = o ? 42 : 12, n = o ? 21 : 6, l = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? a, s = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? n, h = `hsl(${i}, 100%, 50%)`, c = $`
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
      (d) => {
        const [p, g, b] = Tt(d, 100);
        return { rgb_color: [p, g, b] };
      },
      (d) => Math.round(d / 360 * 100),
      (d) => `${d}°`,
      `color-hue ${o ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${l}px; --ag-slider-radius: ${s}px; --color-hue-val: ${h};`,
      c
    );
  }
  _renderColorPicker(t) {
    const e = this._getLiveHex(t), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, r = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return $`
      <div class="color-picker" title="Adjust Light Color" style="height: ${i}px; border-radius: ${r}px;">
        <input type="color" 
               .value=${e} 
               @input=${(o) => this._handleColorInput(o, !0)}
               @change=${(o) => this._handleColorInput(o, !1)} />
        <span class="color-label">Color (${e})</span>
      </div>
    `;
  }
  _renderCoverSlider(t) {
    const e = t.attributes.current_position ?? (t.state === "open" || t.state === "opening" ? 100 : 0);
    return this._renderGenericSlider(
      "cover",
      "Cover Position",
      0,
      100,
      1,
      e,
      e,
      "cover",
      "set_cover_position",
      (i) => ({ position: i }),
      (i) => i,
      (i, r) => `${r}%`
    );
  }
  _renderFanSlider(t) {
    const e = t.attributes.percentage ?? 0, i = t.attributes.percentage_step ?? 1;
    return this._renderGenericSlider(
      "fan",
      "Fan Speed",
      0,
      100,
      i,
      e,
      e,
      "fan",
      "set_percentage",
      (r) => ({ percentage: r }),
      (r) => r,
      (r, o) => `${o}%`
    );
  }
  _renderMediaSlider(t) {
    const e = Math.round((t.attributes.volume_level ?? 0) * 100);
    return this._renderGenericSlider(
      "media",
      "Volume",
      0,
      100,
      1,
      e,
      e,
      "media_player",
      "volume_set",
      (i) => ({ volume_level: i / 100 }),
      (i) => i,
      (i, r) => `${r}%`
    );
  }
  _renderNumberSlider(t) {
    const e = Number(t.attributes.min ?? 0), i = Number(t.attributes.max ?? 100), r = Number(t.attributes.step ?? 1), o = Number(t.state), a = isNaN(o) ? e : o, n = i - e, l = n > 0 ? Math.max(0, Math.min(100, Math.round((a - e) / n * 100))) : 0, s = (this.config.entity || "number").split(".")[0], h = t.attributes.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "";
    return this._renderGenericSlider(
      "number",
      "Value",
      e,
      i,
      r,
      a,
      l,
      s,
      "set_value",
      (c) => ({ value: c }),
      (c) => n > 0 ? Math.round((c - e) / n * 100) : 0,
      (c) => `${r < 1 ? Number(c).toFixed(1) : c}${h}`
    );
  }
  _renderClimateSlider(t) {
    const e = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = e ? "°F" : "°C", r = e ? 60 : 16, o = e ? 85 : 30, a = t.attributes.min_temp ?? r, n = t.attributes.max_temp ?? o, l = t.attributes.target_temp_step ?? t.attributes.target_temperature_step ?? (e ? 1 : 0.5), s = t.attributes.temperature ?? t.attributes.target_temp_low ?? t.attributes.target_temp_high ?? a, h = n - a, c = h > 0 ? Math.max(0, Math.min(100, Math.round((s - a) / h * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      a,
      n,
      l,
      s,
      c,
      "climate",
      "set_temperature",
      (d) => ({ temperature: d }),
      (d) => h > 0 ? Math.round((d - a) / h * 100) : 0,
      (d) => `${d}${i}`,
      "climate-temp",
      "",
      `${s}${i}`
    );
  }
  _renderHumidifierSlider(t) {
    const e = t.attributes?.min_humidity ?? 0, i = t.attributes?.max_humidity ?? 100, r = t.attributes?.humidity ?? t.attributes?.target_humidity ?? e, o = i - e, a = o > 0 ? Math.max(0, Math.min(100, Math.round((r - e) / o * 100))) : 0;
    return this._renderGenericSlider(
      "humidifier",
      "Humidity",
      e,
      i,
      1,
      r,
      a,
      "humidifier",
      "set_humidity",
      (n) => ({ humidity: n }),
      (n) => o > 0 ? Math.round((n - e) / o * 100) : 0,
      (n, l) => `${l}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(t, e, i, r, o) {
    const a = e || this.hass.states[this.config.entity || ""], n = t || this.config.entity || "", l = a?.attributes?.volume_level !== void 0 || a?.entity_id?.startsWith("media_player."), s = a?.attributes?.percentage !== void 0 || a?.entity_id?.startsWith("fan."), h = a?.attributes?.current_position !== void 0 || a?.entity_id?.startsWith("cover.");
    let c = 0, d = 0, p = 255, g = "1", b = "turn_on", v = "light", _ = "brightness";
    l ? (c = a?.attributes?.volume_level ?? 0, p = 1, g = "0.01", b = "set_volume_level", v = "media_player", _ = "volume_level") : s ? (c = a?.attributes?.percentage ?? 0, p = 100, g = "1", b = "set_percentage", v = "fan", _ = "percentage") : h ? (c = a?.attributes?.current_position ?? 0, p = 100, g = "1", b = "set_cover_position", v = "cover", _ = "position") : c = a?.attributes?.brightness ?? 0;
    const S = Math.round(p === 1 ? c * 100 : p === 100 ? c : c / 255 * 100);
    return i === "slider" ? $`
        <div class="sub-button-slider-container ${o}" style="${r}" title="Level: ${S}%">
          <input type="range" 
                 min="${d}" 
                 max=${p} 
                 step=${g} 
                 .value=${c}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value), y = Math.round(p === 1 ? k * 100 : p === 100 ? k : k / 255 * 100), w = f.target.closest(".sub-button-slider-container");
      w && w.setAttribute("title", `Level: ${y}%`), this._throttledCall("sub_slider_" + n, () => {
        this.hass.callService(v, b, { entity_id: n, [_]: k });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value);
      this.hass.callService(v, b, { entity_id: n, [_]: k });
    }} />
        </div>
      ` : $`
        <div class="sub-button-google-slider ${o}" style="${r} --slider-pct: ${S}%;" title="Level: ${S}%">
          <input type="range" 
                 min="${d}" 
                 max=${p} 
                 step=${g} 
                 .value=${c}
                 style="--slider-pct: ${S}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value), y = Math.round(p === 1 ? k * 100 : p === 100 ? k : k / 255 * 100), w = f.target;
      w.style.setProperty("--slider-pct", `${y}%`);
      const C = w.closest(".sub-button-google-slider");
      if (C) {
        C.style.setProperty("--slider-pct", `${y}%`), C.setAttribute("title", `Level: ${y}%`);
        const u = C.querySelector(".sub-slider-pct");
        u && (u.textContent = `${y}%`);
      }
      this._throttledCall("sub_slider_" + n, () => {
        this.hass.callService(v, b, { entity_id: n, [_]: k });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value);
      this.hass.callService(v, b, { entity_id: n, [_]: k });
    }} />
          <span class="sub-slider-pct">${S}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(t, e, i, r, o, a) {
    const n = e || this.hass.states[this.config.entity || ""], l = this._getLiveHex(n);
    return $`
      <div class="sub-button sub-color-picker ${r}" 
           tabindex="0" 
           role="button" 
           title="Select Color (${l})" 
           style="${i}"
           @keydown=${(s) => {
      (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.currentTarget.querySelector("input")?.click());
    }}>
        <input type="color" 
               aria-label="Color Picker"
               .value=${l} 
               @input=${(s) => this._handleColorInput(s, !0, t || this.config.entity, "sub_color_picker_" + t)}
               @change=${(s) => this._handleColorInput(s, !1, t || this.config.entity)} />
        ${o ? $`<span class="sub-button-label">${o}</span>` : m}
        ${a ? $`<span class="sub-button-state">${a}</span>` : m}
      </div>
    `;
  }
  _renderSubButton(t, e, i, r = !0, o, a, n, l = "button", s, h = !1) {
    const c = t ? this.hass.states[t] : void 0;
    if (t && !c)
      return $`
        <div class="sub-button missing" title="Entity not found: ${t}">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        </div>
      `;
    const d = c ? this._isEntityActive(c) : !1;
    let p = this._resolveColor(i);
    !p && d && c?.attributes?.rgb_color && Array.isArray(c.attributes.rgb_color) && (p = `rgb(${c.attributes.rgb_color.join(",")})`);
    const g = p ? `color: ${p};` : "", b = r ? "" : "no-bg", v = h && c ? this._getInfoContent("state", c) : "";
    if (l === "slider" || l === "google_slider")
      return this._renderSubSlider(t, c, l, g, b);
    if (l === "color_picker")
      return this._renderSubColorPicker(t, c, g, b, o, v);
    let _ = e, S = d, f = o || "", k = "", y = o, w;
    if (a && a.action && a.action !== "none" && a.action !== "default")
      _ || (_ = c?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (l) {
        case "play_pause": {
          const u = c?.state === "playing";
          S = u, _ || (_ = u ? "mdi:pause" : "mdi:play"), f = u ? "Pause" : "Play", w = () => {
            this.hass.callService("media_player", "media_play_pause", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "next": {
          _ || (_ = "mdi:skip-next"), f = "Next Track", w = () => {
            this.hass.callService("media_player", "media_next_track", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "previous": {
          _ || (_ = "mdi:skip-previous"), f = "Previous Track", w = () => {
            this.hass.callService("media_player", "media_previous_track", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "open_close": {
          const u = c?.state === "open" || c?.state === "on" || c?.attributes?.current_position !== void 0 && c.attributes.current_position > 0;
          S = u, _ || (_ = u ? "mdi:window-shutter-open" : "mdi:window-shutter"), f = u ? "Close" : "Open", w = () => {
            this.hass.callService("cover", "toggle", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "stop": {
          _ || (_ = "mdi:stop"), f = "Stop", w = () => {
            this.hass.callService("cover", "stop_cover", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const u = c?.state === "locked";
          S = !u, _ || (_ = u ? "mdi:lock" : "mdi:lock-open-variant"), f = u ? "Unlock" : "Lock", w = () => {
            this.hass.callService("lock", u ? "unlock" : "lock", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const u = c?.attributes?.percentage ?? 0;
          _ || (_ = "mdi:fan"), d && (k = "anim-spin"), f = `Speed: ${u}%`, y || (y = u > 0 ? `${u}%` : "Off"), w = () => {
            let x = 33;
            u >= 90 ? x = 0 : u >= 60 ? x = 100 : u >= 30 && (x = 66), this.hass.callService("fan", "set_percentage", { entity_id: t || this.config.entity, percentage: x });
          };
          break;
        }
        case "clean": {
          const u = c?.state === "cleaning";
          S = u, _ || (_ = u ? "mdi:pause" : "mdi:robot-vacuum"), f = u ? "Pause Vacuum" : "Start Vacuum", w = () => {
            this.hass.callService("vacuum", u ? "pause" : "start", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "dock": {
          _ || (_ = "mdi:home-import-outline"), f = "Return to Dock", w = () => {
            this.hass.callService("vacuum", "return_to_base", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "locate": {
          _ || (_ = "mdi:map-marker-question-outline"), f = "Locate", w = () => {
            this.hass.callService("vacuum", "locate", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const u = c?.state || "off", x = c?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], T = x[(x.indexOf(u) + 1) % x.length] || "auto";
          S = u !== "off", _ || (u === "heat" ? _ = "mdi:fire" : u === "cool" ? _ = "mdi:snowflake" : u === "dry" ? _ = "mdi:water-percent" : u === "fan_only" ? _ = "mdi:fan" : u === "auto" ? _ = "mdi:thermostat-auto" : _ = "mdi:power"), f = `Mode: ${u} -> Next: ${T}`, y || (y = u), w = () => {
            this.hass.callService("climate", "set_hvac_mode", { entity_id: t || this.config.entity, hvac_mode: T });
          };
          break;
        }
        case "light_effect": {
          const u = c?.attributes?.effect_list || [], x = c?.attributes?.effect || "None", T = u.length > 0 ? u[(u.indexOf(x) + 1) % u.length] || u[0] : "None";
          _ || (_ = "mdi:creation"), S = x !== "None" && x !== "off" && d, f = `Effect: ${x} -> Next: ${T}`, y || (y = x !== "None" ? x : "Effect"), w = () => {
            u.length > 0 && this.hass.callService("light", "turn_on", { entity_id: t || this.config.entity, effect: T });
          };
          break;
        }
        case "brightness": {
          const u = c?.attributes?.brightness, x = u !== void 0 ? Math.round(u / 255 * 100) : 0;
          _ || (_ = "mdi:brightness-6"), f = `Brightness: ${x}%`, y || (y = `${x}%`), w = () => {
            let T = 255;
            x >= 85 ? T = 76 : x >= 50 ? T = 255 : T = 178, this.hass.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness: T });
          };
          break;
        }
        case "garage_toggle": {
          const u = c?.state === "open" || c?.state === "opening";
          S = u, _ || (_ = u ? "mdi:garage-open" : "mdi:garage"), f = u ? "Close Garage" : "Open Garage", w = () => {
            this.hass.callService("cover", "toggle", { entity_id: t || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const u = c?.attributes?.brightness ?? 0, x = Math.min(255, u + 26);
          _ || (_ = "mdi:brightness-5"), f = "Brightness +10%", y || (y = "+10%"), w = () => {
            this.hass.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness: x });
          };
          break;
        }
        case "dim_down": {
          const u = c?.attributes?.brightness ?? 0, x = Math.max(1, u - 26);
          _ || (_ = "mdi:brightness-4"), f = "Brightness -10%", y || (y = "-10%"), w = () => {
            this.hass.callService("light", "turn_on", { entity_id: t || this.config.entity, brightness: x });
          };
          break;
        }
        case "temp_warm": {
          _ || (_ = "mdi:weather-sunny"), f = "Warm White (2700K)", y || (y = "2700K"), w = () => {
            this.hass.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          _ || (_ = "mdi:weather-sunset-up"), f = "Cool Daylight (6000K)", y || (y = "6000K"), w = () => {
            this.hass.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          _ || (_ = "mdi:palette-swatch-outline"), f = "Color Temperature", y || (y = "Temp"), w = () => {
            const u = c?.attributes?.color_temp_kelvin || 3e3;
            let x = 2700;
            u < 3300 ? x = 4e3 : u < 5e3 ? x = 6e3 : x = 2700, this.hass.callService("light", "turn_on", { entity_id: t || this.config.entity, color_temp_kelvin: x });
          };
          break;
        }
        case "button":
        default: {
          _ || (_ = c?.attributes?.icon || "mdi:checkbox-blank-circle"), f = o || (c?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const C = (u) => {
      this._handleSubTap(u, t, a, s, w);
    };
    return $`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${b}" 
        ?active=${S} 
        style="${g} ${S && p && r ? `background: ${p}; color: #fff;` : ""}"
        title="${f}"
        @click=${C}
        @keydown=${(u) => {
      (u.key === "Enter" || u.key === " ") && (u.preventDefault(), u.stopPropagation(), C(u));
    }}
        @pointerdown=${(u) => this._handleSubPointerDown(u, t, n)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(u) => this._handleSubContextMenu(u, t, n)}>
        <ha-icon .icon=${_} class="${k}"></ha-icon>
        ${y ? $`<span class="sub-button-label">${y}</span>` : m}
        ${v ? $`<span class="sub-button-state">${v}</span>` : m}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return Et`
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
};
Y([
  ke({ attribute: !1 })
], R.prototype, "hass", 2);
Y([
  ke({ type: Boolean })
], R.prototype, "preview", 2);
Y([
  Ce()
], R.prototype, "config", 2);
Y([
  Ce()
], R.prototype, "_collapsed", 2);
Y([
  Bt({ passive: !0 })
], R.prototype, "_handlePointerMove", 1);
Y([
  Bt({ passive: !0 })
], R.prototype, "_handleSubPointerMove", 1);
R = Y([
  Dt("antigravity-card")
], R);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", R);
export {
  R as AntigravityCard,
  Ji as CARD_VERSION
};
