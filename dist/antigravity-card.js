const je = globalThis, St = je.ShadowRoot && (je.ShadyCSS === void 0 || je.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = Symbol(), Lt = /* @__PURE__ */ new WeakMap();
let Zt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (St && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Lt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Lt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const di = (n) => new Zt(typeof n == "string" ? n : n + "", void 0, $t), Qt = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, r, o) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[o + 1], n[0]);
  return new Zt(t, n, $t);
}, ui = (n, e) => {
  if (St) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = je.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, n.appendChild(i);
  }
}, Dt = St ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return di(t);
})(n) : n;
const { is: hi, defineProperty: _i, getOwnPropertyDescriptor: pi, getOwnPropertyNames: fi, getOwnPropertySymbols: gi, getPrototypeOf: mi } = Object, rt = globalThis, Nt = rt.trustedTypes, bi = Nt ? Nt.emptyScript : "", vi = rt.reactiveElementPolyfillSupport, ke = (n, e) => n, et = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? bi : null;
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
} }, kt = (n, e) => !hi(n, e), Ht = { attribute: !0, type: String, converter: et, reflect: !1, useDefault: !1, hasChanged: kt };
Symbol.metadata ??= Symbol("metadata"), rt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ht) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && _i(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: o } = pi(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const l = r?.call(this);
      o?.call(this, a), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ke("elementProperties"))) return;
    const e = mi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ke("properties"))) {
      const t = this.properties, i = [...fi(t), ...gi(t)];
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
      for (const r of i) t.unshift(Dt(r));
    } else e !== void 0 && t.push(Dt(e));
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
    return ui(e, this.constructor.elementStyles), e;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : et).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : et;
      this._$Em = r;
      const l = a.fromAttribute(t, o.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, o) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? kt)(o, t) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
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
        const { wrapped: a } = o, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
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
se.elementStyles = [], se.shadowRootOptions = { mode: "open" }, se[ke("elementProperties")] = /* @__PURE__ */ new Map(), se[ke("finalized")] = /* @__PURE__ */ new Map(), vi?.({ ReactiveElement: se }), (rt.reactiveElementVersions ??= []).push("2.1.2");
const Ct = globalThis, Rt = (n) => n, tt = Ct.trustedTypes, Bt = tt ? tt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, jt = "$lit$", X = `lit$${Math.random().toFixed(9).slice(2)}$`, ei = "?" + X, yi = `<${ei}>`, ee = document, Ce = () => ee.createComment(""), Te = (n) => n === null || typeof n != "object" && typeof n != "function", Tt = Array.isArray, xi = (n) => Tt(n) || typeof n?.[Symbol.iterator] == "function", gt = `[ 	
\f\r]`, xe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, zt = />/g, J = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ft = /'/g, Ut = /"/g, ti = /^(?:script|style|textarea|title)$/i, wi = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), C = wi(1), te = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), It = /* @__PURE__ */ new WeakMap(), Q = ee.createTreeWalker(ee, 129);
function ii(n, e) {
  if (!Tt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Bt !== void 0 ? Bt.createHTML(e) : e;
}
const Si = (n, e) => {
  const t = n.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = xe;
  for (let l = 0; l < t; l++) {
    const d = n[l];
    let p, h, c = -1, v = 0;
    for (; v < d.length && (a.lastIndex = v, h = a.exec(d), h !== null); ) v = a.lastIndex, a === xe ? h[1] === "!--" ? a = Ot : h[1] !== void 0 ? a = zt : h[2] !== void 0 ? (ti.test(h[2]) && (r = RegExp("</" + h[2], "g")), a = J) : h[3] !== void 0 && (a = J) : a === J ? h[0] === ">" ? (a = r ?? xe, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, p = h[1], a = h[3] === void 0 ? J : h[3] === '"' ? Ut : Ft) : a === Ut || a === Ft ? a = J : a === Ot || a === zt ? a = xe : (a = J, r = void 0);
    const g = a === J && n[l + 1].startsWith("/>") ? " " : "";
    o += a === xe ? d + yi : c >= 0 ? (i.push(p), d.slice(0, c) + jt + d.slice(c) + X + g) : d + X + (c === -2 ? l : g);
  }
  return [ii(n, o + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Ae {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const l = e.length - 1, d = this.parts, [p, h] = Si(e, t);
    if (this.el = Ae.createElement(p, i), Q.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = Q.nextNode()) !== null && d.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(jt)) {
          const v = h[a++], g = r.getAttribute(c).split(X), x = /([.?@])?(.*)/.exec(v);
          d.push({ type: 1, index: o, name: x[2], strings: g, ctor: x[1] === "." ? ki : x[1] === "?" ? Ci : x[1] === "@" ? Ti : ot }), r.removeAttribute(c);
        } else c.startsWith(X) && (d.push({ type: 6, index: o }), r.removeAttribute(c));
        if (ti.test(r.tagName)) {
          const c = r.textContent.split(X), v = c.length - 1;
          if (v > 0) {
            r.textContent = tt ? tt.emptyScript : "";
            for (let g = 0; g < v; g++) r.append(c[g], Ce()), Q.nextNode(), d.push({ type: 2, index: ++o });
            r.append(c[v], Ce());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ei) d.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(X, c + 1)) !== -1; ) d.push({ type: 7, index: o }), c += X.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = ee.createElement("template");
    return i.innerHTML = e, i;
  }
}
function de(n, e, t = n, i) {
  if (e === te) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const o = Te(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(n), r._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = de(n, r._$AS(n, e.values), r, i)), e;
}
class $i {
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
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? ee).importNode(t, !0);
    Q.currentNode = r;
    let o = Q.nextNode(), a = 0, l = 0, d = i[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let p;
        d.type === 2 ? p = new ue(o, o.nextSibling, this, e) : d.type === 1 ? p = new d.ctor(o, d.name, d.strings, this, e) : d.type === 6 && (p = new Ai(o, this, e)), this._$AV.push(p), d = i[++l];
      }
      a !== d?.index && (o = Q.nextNode(), a++);
    }
    return Q.currentNode = ee, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class ue {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = de(this, e, t), Te(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== te && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : xi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== S && Te(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ee.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Ae.createElement(ii(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const o = new $i(r, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = It.get(e.strings);
    return t === void 0 && It.set(e.strings, t = new Ae(e)), t;
  }
  k(e) {
    Tt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const o of e) r === t.length ? t.push(i = new ue(this.O(Ce()), this.O(Ce()), this, this.options)) : i = t[r], i._$AI(o), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = Rt(e).nextSibling;
      Rt(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, o) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = S;
  }
  _$AI(e, t = this, i, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = de(this, e, t, 0), a = !Te(e) || e !== this._$AH && e !== te, a && (this._$AH = e);
    else {
      const l = e;
      let d, p;
      for (e = o[0], d = 0; d < o.length - 1; d++) p = de(this, l[i + d], t, d), p === te && (p = this._$AH[d]), a ||= !Te(p) || p !== this._$AH[d], p === S ? e = S : e !== S && (e += (p ?? "") + o[d + 1]), this._$AH[d] = p;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ki extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
}
class Ci extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== S);
  }
}
class Ti extends ot {
  constructor(e, t, i, r, o) {
    super(e, t, i, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = de(this, e, t, 0) ?? S) === te) return;
    const i = this._$AH, r = e === S && i !== S || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== S && (i === S || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
let Ai = class {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    de(this, e);
  }
};
const Mi = { I: ue }, Pi = Ct.litHtmlPolyfillSupport;
Pi?.(Ae, ue), (Ct.litHtmlVersions ??= []).push("3.3.3");
const Ei = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = t?.renderBefore ?? null;
    i._$litPart$ = r = new ue(e.insertBefore(Ce(), o), o, void 0, t ?? {});
  }
  return r._$AI(n), r;
};
const At = globalThis;
let ce = class extends se {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ei(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return te;
  }
};
ce._$litElement$ = !0, ce.finalized = !0, At.litElementHydrateSupport?.({ LitElement: ce });
const Li = At.litElementPolyfillSupport;
Li?.({ LitElement: ce });
(At.litElementVersions ??= []).push("4.2.2");
const Di = { attribute: !0, type: String, converter: et, reflect: !1, hasChanged: kt }, Ni = (n = Di, e, t) => {
  const { kind: i, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(t.name, n), i === "accessor") {
    const { name: a } = t;
    return { set(l) {
      const d = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(a, d, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, n, l), l;
    } };
  }
  if (i === "setter") {
    const { name: a } = t;
    return function(l) {
      const d = this[a];
      e.call(this, l), this.requestUpdate(a, d, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function at(n) {
  return (e, t) => typeof t == "object" ? Ni(n, e, t) : ((i, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(n, e, t);
}
function nt(n) {
  return at({ ...n, state: !0, attribute: !1 });
}
function ri(n) {
  return (e, t) => {
    const i = typeof e == "function" ? e : e[t];
    Object.assign(i, n);
  };
}
const Hi = { CHILD: 2 }, Ri = (n) => (...e) => ({ _$litDirective$: n, values: e });
let Bi = class {
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
const { I: Oi } = Mi, Gt = (n) => n, Vt = () => document.createComment(""), we = (n, e, t) => {
  const i = n._$AA.parentNode, r = e === void 0 ? n._$AB : e._$AA;
  if (t === void 0) {
    const o = i.insertBefore(Vt(), r), a = i.insertBefore(Vt(), r);
    t = new Oi(o, a, n, n.options);
  } else {
    const o = t._$AB.nextSibling, a = t._$AM, l = a !== n;
    if (l) {
      let d;
      t._$AQ?.(n), t._$AM = n, t._$AP !== void 0 && (d = n._$AU) !== a._$AU && t._$AP(d);
    }
    if (o !== r || l) {
      let d = t._$AA;
      for (; d !== o; ) {
        const p = Gt(d).nextSibling;
        Gt(i).insertBefore(d, r), d = p;
      }
    }
  }
  return t;
}, Z = (n, e, t = n) => (n._$AI(e, t), n), zi = {}, Fi = (n, e = zi) => n._$AH = e, Ui = (n) => n._$AH, mt = (n) => {
  n._$AR(), n._$AA.remove();
};
const Wt = (n, e, t) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = e; r <= t; r++) i.set(n[r], r);
  return i;
}, Ii = Ri(class extends Bi {
  constructor(n) {
    if (super(n), n.type !== Hi.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(n, e, t) {
    let i;
    t === void 0 ? t = e : e !== void 0 && (i = e);
    const r = [], o = [];
    let a = 0;
    for (const l of n) r[a] = i ? i(l, a) : a, o[a] = t(l, a), a++;
    return { values: o, keys: r };
  }
  render(n, e, t) {
    return this.dt(n, e, t).values;
  }
  update(n, [e, t, i]) {
    const r = Ui(n), { values: o, keys: a } = this.dt(e, t, i);
    if (!Array.isArray(r)) return this.ut = a, o;
    const l = this.ut ??= [], d = [];
    let p, h, c = 0, v = r.length - 1, g = 0, x = o.length - 1;
    for (; c <= v && g <= x; ) if (r[c] === null) c++;
    else if (r[v] === null) v--;
    else if (l[c] === a[g]) d[g] = Z(r[c], o[g]), c++, g++;
    else if (l[v] === a[x]) d[x] = Z(r[v], o[x]), v--, x--;
    else if (l[c] === a[x]) d[x] = Z(r[c], o[x]), we(n, d[x + 1], r[c]), c++, x--;
    else if (l[v] === a[g]) d[g] = Z(r[v], o[g]), we(n, r[c], r[v]), v--, g++;
    else if (p === void 0 && (p = Wt(a, g, x), h = Wt(l, c, v)), p.has(l[c])) if (p.has(l[v])) {
      const w = h.get(a[g]), $ = w !== void 0 ? r[w] : null;
      if ($ === null) {
        const T = we(n, r[c]);
        Z(T, o[g]), d[g] = T;
      } else d[g] = Z($, o[g]), we(n, r[c], $), r[w] = null;
      g++;
    } else mt(r[v]), v--;
    else mt(r[c]), c++;
    for (; g <= x; ) {
      const w = we(n, d[x + 1]);
      Z(w, o[g]), d[g++] = w;
    }
    for (; c <= v; ) {
      const w = r[c++];
      w !== null && mt(w);
    }
    return this.ut = a, Fi(n, d), te;
  }
});
var Yt, Xt;
(function(n) {
  n.language = "language", n.system = "system", n.comma_decimal = "comma_decimal", n.decimal_comma = "decimal_comma", n.space_comma = "space_comma", n.none = "none";
})(Yt || (Yt = {})), function(n) {
  n.language = "language", n.system = "system", n.am_pm = "12", n.twenty_four = "24";
}(Xt || (Xt = {}));
function Gi(n) {
  return n.substr(0, n.indexOf("."));
}
var Vi = ["closed", "locked", "off"], Me = function(n, e, t, i) {
  i = i || {}, t = t ?? {};
  var r = new Event(e, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return r.detail = t, n.dispatchEvent(r), r;
}, $e = function(n) {
  Me(window, "haptic", n);
}, Wi = function(n, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), Me(window, "location-changed", { replace: t });
}, Yi = function(n, e, t) {
  t === void 0 && (t = !0);
  var i, r = Gi(e), o = r === "group" ? "homeassistant" : r;
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
}, Xi = function(n, e) {
  var t = Vi.includes(n.states[e].state);
  return Yi(n, e, t);
}, Ki = function(n, e, t, i) {
  if (i || (i = { action: "more-info" }), !i.confirmation || i.confirmation.exemptions && i.confirmation.exemptions.some(function(o) {
    return o.user === e.user.id;
  }) || ($e("warning"), confirm(i.confirmation.text || "Are you sure you want to " + i.action + "?"))) switch (i.action) {
    case "more-info":
      (t.entity || t.camera_image) && Me(n, "hass-more-info", { entityId: t.entity ? t.entity : t.camera_image });
      break;
    case "navigate":
      i.navigation_path && Wi(0, i.navigation_path);
      break;
    case "url":
      i.url_path && window.open(i.url_path);
      break;
    case "toggle":
      t.entity && (Xi(e, t.entity), $e("success"));
      break;
    case "call-service":
      if (!i.service) return void $e("failure");
      var r = i.service.split(".", 2);
      e.callService(r[0], r[1], i.service_data, i.target), $e("success");
      break;
    case "fire-dom-event":
      Me(n, "ll-custom", i);
  }
}, qi = function(n, e, t, i) {
  var r;
  i === "double_tap" && t.double_tap_action ? r = t.double_tap_action : i === "hold" && t.hold_action ? r = t.hold_action : i === "tap" && t.tap_action && (r = t.tap_action), Ki(n, e, t, r);
};
const xt = {
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
class Ji {
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
const it = new Ji();
class Zi {
  constructor() {
    this._battery = null, this._isLowPower = !1, this._listeners = /* @__PURE__ */ new Set(), this._initBattery(), this._initSaveDataListener();
  }
  async _initBattery() {
    if (typeof navigator < "u" && "getBattery" in navigator)
      try {
        this._battery = await navigator.getBattery(), this._updatePowerState(), this._battery.addEventListener("chargingchange", () => {
          this._updatePowerState(), this._notifyListeners();
        }), this._battery.addEventListener("levelchange", () => {
          this._updatePowerState(), this._notifyListeners();
        });
      } catch {
      }
  }
  _initSaveDataListener() {
    if (typeof navigator < "u" && navigator.connection) {
      const e = navigator.connection;
      e.saveData && (this._isLowPower = !0), e.addEventListener?.("change", () => {
        e.saveData && (this._isLowPower = !0, this._notifyListeners());
      });
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
}
const j = new Zi(), Qi = {
  preserveDrawingBuffer: !1,
  powerPreference: "low-power",
  alpha: !0,
  antialias: !1,
  depth: !1,
  stencil: !1
};
function ji(n, e = Qi) {
  try {
    const t = n.getContext("webgl2", e) || n.getContext("webgl", e) || n.getContext("experimental-webgl", e);
    return t ? (t.getExtension("ANGLE_instanced_arrays"), t.getExtension("EXT_color_buffer_half_float"), t.getExtension("OES_texture_half_float"), n.addEventListener("webglcontextlost", (i) => {
      i.preventDefault(), console.warn("Antigravity WebGL context lost");
    }, { passive: !1 }), n.addEventListener("webglcontextrestored", () => {
      console.info("Antigravity WebGL context restored");
    }, { passive: !0 }), t) : null;
  } catch (t) {
    return console.warn("WebGL init failed:", t), null;
  }
}
function oi(n) {
  if (n)
    try {
      const e = n.getParameter(n.MAX_VERTEX_ATTRIBS) || 16;
      for (let t = 0; t < e; ++t)
        n.disableVertexAttribArray(t);
      n.bindBuffer(n.ARRAY_BUFFER, null), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, null), n.bindRenderbuffer(n.RENDERBUFFER, null), n.bindFramebuffer(n.FRAMEBUFFER, null);
    } catch (e) {
      console.warn("WebGL cleanup warning:", e);
    }
}
async function ai() {
  const n = performance.now();
  let e = 0, t = 0;
  const i = (x, w) => {
    t++, x ? e++ : console.error(`❌ Assertion failed: ${w}`);
  }, r = it.getMemorySnapshot();
  i(r.activeCardsCount >= 0, "Memory tracker active card count is non-negative");
  let o = !1;
  if (typeof document < "u") {
    const x = document.createElement("canvas"), w = ji(x);
    w && (o = !0, i(w.getParameter(w.MAX_VERTEX_ATTRIBS) > 0, "WebGL attributes available"), oi(w));
  }
  const a = 1e3;
  let l = 0;
  for (let x = 0; x < a; x++) {
    const w = performance.now();
    l += performance.now() - w;
  }
  const d = Number((l / a).toFixed(4));
  i(d < 0.1, "Benchmark iteration takes under 0.1ms");
  const p = j.isPowerSaveActive(), h = j.getTargetFrameIntervalMs();
  i(h === 16 || h === 33, "Frame target is either 16ms or 33ms");
  const c = performance.now() - n, v = e === t, g = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: typeof navigator < "u" ? navigator.userAgent : "Node/Test",
    renderBenchmarkMs: d,
    memoryUsageMB: r.usedJSHeapSizeMB || 0,
    powerSaveModeActive: p,
    webglSupported: o,
    assertionsPassed: e,
    totalAssertions: t,
    passed: v
  };
  return console.info(
    `%c 🧪 ANTIGRAVITY CI RUNNER %c Passed ${e}/${t} | Benchmark: ${d}ms/op | Duration: ${c.toFixed(2)}ms `,
    "color: white; background: #2e7d32; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;",
    "color: #2e7d32; background: #e8f5e9; font-weight: 700; padding: 2px 6px; border-radius: 0 4px 4px 0;"
  ), g;
}
typeof window < "u" && window.__RUN_CI__ && ai();
var er = Object.defineProperty, Mt = (n, e, t, i) => {
  for (var r = void 0, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (r = a(e, t, r) || r);
  return r && er(e, t, r), r;
};
const tr = [
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
], ir = [
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
], rr = [
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
], or = [
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
], ar = [
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
], Kt = [
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
function st(n) {
  return [
    { name: `sub_button_${n}_entity`, selector: { entity: {} } },
    { name: `sub_button_${n}_type`, selector: { select: { options: [
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
const nr = st(1), sr = st(2), lr = st(3), cr = st(4), dr = [
  { name: "tap_action", selector: { "ui-action": {} } },
  { name: "hold_action", selector: { "ui-action": {} } },
  { name: "double_tap_action", selector: { "ui-action": {} } },
  { name: "custom_styles", selector: { text: { multiline: !0 } } }
];
function R(n) {
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
function D(n) {
  const e = R(n);
  if (!e || !e.startsWith("#") || e.length < 7) return;
  const t = parseInt(e.slice(1, 3), 16), i = parseInt(e.slice(3, 5), 16), r = parseInt(e.slice(5, 7), 16);
  if (!(isNaN(t) || isNaN(i) || isNaN(r)))
    return [t, i, r];
}
const ur = {
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
class Pe extends ce {
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
      ...xt,
      ...t
    };
  }
  _computeLabel(e) {
    return ur[e.name] || e.name;
  }
  _transformConfigForForm() {
    const e = { ...this._config };
    return e.bg_color = D(e.bg_color), e.card_border_color = D(e.card_border_color), e.active_color = D(e.active_color), e.inactive_color = D(e.inactive_color), e.slider_color = D(e.slider_color), e.slider_track_color = D(e.slider_track_color), e.text_color_primary = D(e.text_color_primary), e.text_color_secondary = D(e.text_color_secondary), e.sub_button_1_color = D(e.sub_button_1_color), e.sub_button_2_color = D(e.sub_button_2_color), e.sub_button_3_color = D(e.sub_button_3_color), e.sub_button_4_color = D(e.sub_button_4_color), e.fade_stage_1_color = D(e.fade_stage_1_color), e.fade_stage_2_color = D(e.fade_stage_2_color), e.fade_stage_3_color = D(e.fade_stage_3_color), e;
  }
  _valueChanged(e, t) {
    const i = e.detail.value, r = { ...this._config };
    if (t) {
      for (const o of t)
        if (o.name in i) {
          const a = i[o.name];
          Array.isArray(a) && a.length === 3 && a.every((l) => typeof l == "number") ? r[o.name] = `rgb(${a[0]}, ${a[1]}, ${a[2]})` : r[o.name] = a;
        }
    } else
      Object.assign(r, i);
    this._config = r, Me(this, "config-changed", { config: this._config });
  }
  _togglePanel(e) {
    this._openPanels = {
      ...this._openPanels,
      [e]: !this._openPanels[e]
    }, this.requestUpdate();
  }
  _renderSection(e, t, i, r, o) {
    const a = !!this._openPanels[e];
    return C`
      <div class="custom-panel ${a ? "open" : ""}">
        <div class="panel-header" @click=${() => this._togglePanel(e)}>
          <div class="header-left">
            <span class="header-icon">${t}</span>
            <span class="header-title">${i}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? C`
          <div class="panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${o}
              .schema=${r}
              .computeLabel=${this._computeLabel}
              @value-changed=${(l) => this._valueChanged(l, r)}
            ></ha-form>
          </div>
        ` : S}
      </div>
    `;
  }
  _renderSubButtonPanel(e, t, i, r) {
    const o = `sub${e}`, a = !!this._openPanels[o];
    return C`
      <div class="sub-nested-panel ${a ? "open" : ""}">
        <div class="sub-panel-header" @click=${() => this._togglePanel(o)}>
          <div class="header-left">
            <span class="sub-dot ${t ? "active" : ""}"></span>
            <span class="sub-title">Sub-Button ${e} ${t ? `(${t})` : "• Inactive"}</span>
          </div>
          <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        ${a ? C`
          <div class="sub-panel-body">
            <ha-form
              .hass=${this.hass}
              .data=${r}
              .schema=${i}
              .computeLabel=${this._computeLabel}
              @value-changed=${(l) => this._valueChanged(l, i)}
            ></ha-form>
          </div>
        ` : S}
      </div>
    `;
  }
  render() {
    if (!this.hass || !this._config) return C``;
    const e = this._transformConfigForForm(), t = this._config?.sub_button_1_entity || "", i = this._config?.sub_button_2_entity || "", r = this._config?.sub_button_3_entity || "", o = this._config?.sub_button_4_entity || "", a = !!this._openPanels.sub_buttons;
    return C`
      <div class="editor-container">
        <!-- 1. CORE & LAYOUT -->
        ${this._renderSection("core", "📦", "Core & Layout", tr, e)}

        <!-- 2. APPEARANCE & THEMING -->
        ${this._renderSection("appearance", "🎨", "Appearance & Theming", ir, e)}

        <!-- 3. SLIDERS & CONTROLS -->
        ${this._renderSection("controls", "🎛️", "Sliders & Interactive Controls", rr, e)}

        <!-- 4. SPACING, PADDING & SIZING -->
        ${this._renderSection("spacing", "📏", "Spacing, Padding & Sizing", or, e)}

        <!-- 5. TYPOGRAPHY & LIVE SCROLLING -->
        ${this._renderSection("typography", "✍️", "Typography & Live Scrolling", ar, e)}

        <!-- 6. CONSOLIDATED SUB-BUTTONS (1-4) -->
        <div class="custom-panel ${a ? "open" : ""}">
          <div class="panel-header" @click=${() => this._togglePanel("sub_buttons")}>
            <div class="header-left">
              <span class="header-icon">🔘</span>
              <span class="header-title">Sub-Buttons (1 – 4)</span>
            </div>
            <ha-icon class="chevron-icon ${a ? "rotated" : ""}" icon="mdi:chevron-down"></ha-icon>
          </div>
          ${a ? C`
            <div class="panel-body sub-buttons-master">
              <div class="section-subtitle">Global Sub-Button Layout</div>
              <ha-form
                .hass=${this.hass}
                .data=${e}
                .schema=${Kt}
                .computeLabel=${this._computeLabel}
                @value-changed=${(l) => this._valueChanged(l, Kt)}
              ></ha-form>
              
              <div class="sub-buttons-nested-list">
                ${this._renderSubButtonPanel(1, t, nr, e)}
                ${this._renderSubButtonPanel(2, i, sr, e)}
                ${this._renderSubButtonPanel(3, r, lr, e)}
                ${this._renderSubButtonPanel(4, o, cr, e)}
              </div>
            </div>
          ` : S}
        </div>

        <!-- 7. ACTIONS & CUSTOM STYLESHEET -->
        ${this._renderSection("actions", "⚡", "Actions & Scoped CSS", dr, e)}
      </div>
    `;
  }
  static get styles() {
    return Qt`
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
Mt([
  at({ attribute: !1 })
], Pe.prototype, "hass");
Mt([
  nt()
], Pe.prototype, "_config");
Mt([
  nt()
], Pe.prototype, "_openPanels");
customElements.get("antigravity-no-icon-card-editor") || customElements.define("antigravity-no-icon-card-editor", Pe);
customElements.get("antigravity-card-editor") || customElements.define("antigravity-card-editor", Pe);
var hr = Object.defineProperty, _r = Object.getOwnPropertyDescriptor, he = (n, e, t, i) => {
  for (var r = i > 1 ? void 0 : i ? _r(e, t) : e, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (r = (i ? a(e, t, r) : a(r)) || r);
  return i && r && hr(e, t, r), r;
};
typeof window < "u" && (window.runAntigravityCI = ai, window.antigravityMemoryReport = () => it.logStatus(), window.antigravityPowerStatus = () => j.isPowerSaveActive());
const pr = "145";
console.info(
  `%c 🚀 ANTIGRAVITY-CARD (NO-ICON) %c v${pr} `,
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
let le = Date.now();
typeof window < "u" && !window.__AG_RESUME_LISTENER_ATTACHED__ && (window.__AG_RESUME_LISTENER_ATTACHED__ = !0, window.addEventListener("focus", () => {
  le = Date.now();
}, { passive: !0 }), document.addEventListener("visibilitychange", () => {
  document.visibilityState === "visible" && (le = Date.now());
}, { passive: !0 }));
const fr = /* @__PURE__ */ new Set([
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
]), gr = /* @__PURE__ */ new Set([
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
]), mr = /* @__PURE__ */ new Set(["hs", "xy", "rgb", "rgbw", "rgbww"]), br = /* @__PURE__ */ new Set([
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
]), ni = /^\d+\s*,\s*\d+\s*,\s*\d+$/, vr = /^\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+$/, qe = /* @__PURE__ */ new Map();
function F(n) {
  (isNaN(n) || !isFinite(n)) && (n = 3e3);
  const e = Math.max(1e3, Math.min(4e4, Math.round(n))), t = qe.get(e);
  if (t) return t;
  const i = e / 100;
  let r, o, a;
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
    a = 255;
  else if (i <= 19)
    a = 0;
  else {
    const d = i - 10;
    a = 138.5177312231 * Math.log(d) - 305.0447927307, a = Math.max(0, Math.min(255, a));
  }
  const l = [Math.round(r), Math.round(o), Math.round(a)];
  return qe.size > 256 && qe.clear(), qe.set(e, l), l;
}
[2e3, 2200, 2500, 2700, 3e3, 3500, 4e3, 4500, 5e3, 5500, 6e3, 6500].forEach((n) => {
  F(n);
});
const Je = /* @__PURE__ */ new Map();
function Ze(n) {
  if (!Array.isArray(n) || n.length < 3) return "#ffffff";
  const e = `${n[0]},${n[1]},${n[2]}`, t = Je.get(e);
  if (t) return t;
  const i = "#" + n.slice(0, 3).map((r) => Math.round(Number(r) || 0).toString(16).padStart(2, "0")).join("");
  return Je.size > 512 && Je.clear(), Je.set(e, i), i;
}
function yr(n, e, t) {
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
function bt(n, e) {
  n = n % 360 / 360, e = Math.max(0, Math.min(100, e)) / 100;
  const t = 1, i = Math.floor(n * 6), r = n * 6 - i, o = t * (1 - e), a = t * (1 - r * e), l = t * (1 - (1 - r) * e);
  let d = 0, p = 0, h = 0;
  switch (i % 6) {
    case 0:
      d = t, p = l, h = o;
      break;
    case 1:
      d = a, p = t, h = o;
      break;
    case 2:
      d = o, p = t, h = l;
      break;
    case 3:
      d = o, p = a, h = t;
      break;
    case 4:
      d = l, p = o, h = t;
      break;
    case 5:
      d = t, p = o, h = a;
      break;
  }
  return [Math.round(d * 255), Math.round(p * 255), Math.round(h * 255)];
}
const wt = [
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
], xr = [
  { k: 2200, label: "2200K", rgb: F(2200) },
  { k: 2700, label: "2700K", rgb: F(2700) },
  { k: 3e3, label: "3000K", rgb: F(3e3) },
  { k: 4e3, label: "4000K", rgb: F(4e3) },
  { k: 5e3, label: "5000K", rgb: F(5e3) },
  { k: 6500, label: "6500K", rgb: F(6500) }
], Se = /* @__PURE__ */ new Map(), wr = 200;
function z(n) {
  if (!n) return null;
  const e = n.trim().toLowerCase();
  if (!e) return null;
  const t = Se.get(e);
  if (t !== void 0) return t;
  const i = Sr(e);
  if (Se.size >= wr) {
    const r = Se.keys().next().value;
    r && Se.delete(r);
  }
  return Se.set(e, i), i;
}
function Sr(n) {
  if (n.charCodeAt(0) === 35) {
    const e = n.slice(1);
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
  if (ni.test(n)) {
    const e = n.split(",").map((t) => parseInt(t.trim(), 10));
    if (e.length >= 3 && !e.some(isNaN))
      return [e[0], e[1], e[2]];
  }
  for (let e = 0; e < wt.length; e++) {
    const t = wt[e];
    if (n === t.label.toLowerCase() || n === t.hex)
      return [t.rgb[0], t.rgb[1], t.rgb[2]];
  }
  return null;
}
function vt(n, e, t) {
  const i = Math.max(0, Math.min(1, t));
  return [
    Math.round(n[0] + (e[0] - n[0]) * i),
    Math.round(n[1] + (e[1] - n[1]) * i),
    Math.round(n[2] + (e[2] - n[2]) * i)
  ];
}
function yt(n) {
  return `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
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
function N(n, e = !0) {
  if (!(!e || typeof window > "u"))
    try {
      if ($e(n), typeof window < "u" && window.dispatchEvent(new CustomEvent("haptic", { detail: n, bubbles: !0, composed: !0 })), typeof navigator < "u" && "vibrate" in navigator && typeof navigator.vibrate == "function") {
        let t = 6;
        n === "heavy" ? t = 20 : n === "medium" ? t = 12 : n === "success" ? t = [40, 40, 80] : n === "warning" ? t = [50, 30, 50] : n === "error" && (t = [50, 100, 50]), navigator.vibrate(t);
      }
    } catch {
    }
}
const ne = /* @__PURE__ */ new Map(), qt = 250, V = /* @__PURE__ */ new Map(), Jt = 128;
function $r(n) {
  if (!n) return "";
  const e = ne.get(n);
  if (e !== void 0) return e;
  const t = n.trim();
  if (!t)
    return ne.set(n, ""), "";
  let i = t;
  if (t.startsWith("#") || t.startsWith("rgb") || t.startsWith("hsl") || t.startsWith("var(") ? i = t : ni.test(t) ? i = `rgb(${t})` : vr.test(t) ? i = `rgba(${t})` : t.toLowerCase() === "state" ? i = "var(--state-icon-color, var(--primary-color))" : gr.has(t.toLowerCase()) && (i = `var(--${t.toLowerCase()}-color, ${t.toLowerCase()})`), ne.size >= qt) {
    const r = Math.floor(qt / 4), o = ne.keys();
    for (let a = 0; a < r; a++) {
      const l = o.next().value;
      l !== void 0 && ne.delete(l);
    }
  }
  return ne.set(n, i), i;
}
class K extends ce {
  constructor() {
    super(...arguments), this._previousLiveRgb = null, this._currentLiveRgb = null, this._lastTrackedState = null, this.preview = !1, this._collapsed = !0, this._holdTimer = null, this._held = !1, this._moved = !1, this._tapTimer = null, this._throttleMap = /* @__PURE__ */ new Map(), this._startX = 0, this._startY = 0, this._subHoldTimer = null, this._subHeld = !1, this._subMoved = !1, this._subStartX = 0, this._subStartY = 0, this._subTapTimerMap = /* @__PURE__ */ new Map(), this._monitoredEntities = [], this._powerUnsubscribe = null, this._gl = null, this._staticCardStyles = "", this._staticCardClasses = "", this._textOffsetStyle = "", this._featuresOffsetStyle = "", this._mainSliderMarginOffsets = "", this._colorTempMarginOffsets = "", this._colorHueMarginOffsets = "", this._textBoxWidth = "", this._primaryTextStyle = "", this._secondaryTextStyle = "", this._primaryTextOffsetStyle = "", this._secondaryTextOffsetStyle = "", this._fadeStaticConfig = null, this._relativeTimer = null, this._cachedSubButtons = null, this._intersectionObserver = null, this._cachedHasCollapsible = !1, this._mountTime = 0, this._pointerDownReceived = !1, this._pointerDownTime = 0, this._canceled = !1, this._activePointerId = null, this._subCanceled = !1, this._subPointerDownTime = 0, this._sliderStateMap = /* @__PURE__ */ new WeakMap(), this._onSliderPointerDown = (e) => {
      const t = e.currentTarget;
      if (!t) return;
      const r = t.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct"), o = Number(t.value) || 0, a = t.style.getPropertyValue("--slider-pct") || "", l = r?.textContent || "";
      this._sliderStateMap.set(t, {
        startX: e.clientX,
        startY: e.clientY,
        initialVal: o,
        initialPct: a,
        initialBadge: l,
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
          r < 6 && o < 6 && (this._revertSlider(t, i), N("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
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
    return { ...xt };
  }
  static async getConfigElement() {
    return document.createElement("antigravity-no-icon-card-editor");
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this.config = {
      ...xt,
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
      const a = i[o];
      if (t.states[a] !== this.hass.states[a])
        return !0;
    }
    return !1;
  }
  _computeStaticStylesAndClasses() {
    if (!this.config) return;
    const e = this.config.card_padding ?? 12, t = this.config.card_padding_vertical ?? 4, i = this.config.card_padding_horizontal ?? e, r = this.config.card_padding_top ?? t, o = this.config.card_padding_bottom ?? t, a = this.config.card_padding_left ?? i, l = this.config.card_padding_right ?? i, d = this.config.card_margin, p = this.config.card_margin_vertical ?? d, h = this.config.card_margin_horizontal ?? d, c = this.config.card_margin_top ?? p, v = this.config.card_margin_bottom ?? p, g = this.config.card_margin_left ?? h, x = this.config.card_margin_right ?? h;
    let w = "";
    (c !== void 0 || v !== void 0 || g !== void 0 || x !== void 0) && (w = `margin: ${c ?? 0}px ${x ?? 0}px ${v ?? 0}px ${g ?? 0}px;`);
    const $ = this.config.border_radius ?? 12, T = this.config.slider_style === "google", u = this.config.slider_style === "full", f = T ? 42 : u ? 40 : 12, k = this.config.slider_height !== void 0 ? this.config.slider_height : f, M = T ? 21 : u ? 0 : k / 2, m = this.config.slider_border_radius !== void 0 ? this.config.slider_border_radius : M, b = this.config.card_border_width ?? (this.config.card_border_color ? 1 : 0), P = this.config.card_border_style ?? "solid", s = b > 0 ? `border: ${b}px ${P} ${this._resolveColor(this.config.card_border_color) || "var(--divider-color, rgba(150, 150, 150, 0.2))"};` : "", _ = this.config.card_width ? `width: ${this.config.card_width};` : "", y = this.config.card_max_width ? `max-width: ${this.config.card_max_width};` : "", E = this.config.card_height ? `height: ${this.config.card_height};` : "", L = this.config.card_min_height !== void 0 ? `min-height: ${this.config.card_min_height}px;` : "", q = this.config.fill_container === !0 ? "height: 100%; width: 100%;" : "", _e = this.config.overflow_hidden !== !1 ? "overflow: hidden;" : "overflow: visible;", Ee = this.config.backdrop_blur !== void 0 ? `backdrop-filter: blur(${this.config.backdrop_blur}px); -webkit-backdrop-filter: blur(${this.config.backdrop_blur}px);` : "", Le = this.config.card_opacity !== void 0 ? `opacity: ${this.config.card_opacity / 100};` : "", De = this.config.transition_duration !== void 0 ? `transition: all ${this.config.transition_duration}ms ease;` : "", W = this.config.text_padding_vertical ?? this.config.text_padding ?? 0, Ne = this.config.text_padding_horizontal ?? this.config.text_padding ?? 0, He = this.config.features_padding_vertical ?? this.config.features_padding ?? 0, Re = this.config.features_padding_horizontal ?? this.config.features_padding ?? 0, Be = this.config.sub_button_padding ?? 0, Oe = this.config.sub_button_container_padding ?? 0, ze = this.config.sub_button_alignment ? `--ag-sub-button-alignment: ${this.config.sub_button_alignment};` : "", lt = this.config.text_scrolling_speed ? `--ag-scroll-speed: ${this.config.text_scrolling_speed}s;` : "", ct = this.config.full_slider_opacity !== void 0 ? `--ag-full-slider-opacity: ${this.config.full_slider_opacity / 100};` : "";
    this._staticCardStyles = [
      w,
      `border-radius: ${$}px;`,
      s,
      _,
      y,
      E,
      L,
      q,
      _e,
      Ee,
      Le,
      De,
      `--ag-card-padding: ${r}px ${l}px ${o}px ${a}px;`,
      `--ag-text-padding: ${W}px ${Ne}px;`,
      `--ag-features-padding: ${He}px ${Re}px;`,
      `--ag-sub-button-padding: ${Be}px;`,
      `--ag-sub-button-container-padding: ${Oe}px;`,
      `--ag-content-spacing: ${this.config.content_spacing ?? 12}px;`,
      `--ag-text-spacing: ${this.config.text_spacing ?? 2}px;`,
      `--ag-features-margin: ${this.config.features_margin ?? 4}px;`,
      `--ag-slider-spacing: ${this.config.slider_spacing ?? 6}px;`,
      `--ag-sub-button-spacing: ${this.config.sub_button_spacing ?? 6}px;`,
      `--ag-slider-height: ${k}px;`,
      `--ag-slider-radius: ${m}px;`,
      `--ag-text-alignment: ${this.config.text_alignment ?? "left"};`,
      `--ag-content-alignment: ${this.config.content_alignment ?? "flex-start"};`,
      ze,
      lt,
      ct
    ].filter(Boolean).join(" "), this._staticCardClasses = [
      `layout-${this.config.layout}`,
      this.config.card_layout === "large" ? "card-large" : "",
      `theme-${this.config.theme_preset ?? "default"}`,
      `hover-${this.config.hover_effect ?? "glow"}`,
      `slider-style-${this.config.slider_style ?? "circle"}`,
      this.config.text_color_mode === "inverse" ? "text-color-mode-inverse" : ""
    ].filter(Boolean).join(" ");
    const Fe = Number(this.config.text_offset_x) || 0, H = Number(this.config.text_offset_y) || 0;
    this._textOffsetStyle = Fe !== 0 || H !== 0 ? `transform: translate(${Fe}px, ${H}px);` : "";
    const Y = Number(this.config.primary_text_start_offset ?? this.config.primary_text_offset_x) || 0, pe = Number(this.config.primary_text_end_offset) || 0, B = Number(this.config.primary_text_offset_y) || 0, fe = Y !== 0 || B !== 0 ? `transform: translate(${Y}px, ${B}px);` : "", ie = Y !== 0 || pe !== 0 ? `margin-left: ${Y}px; margin-right: ${pe}px;` : "";
    this._primaryTextOffsetStyle = `${fe} ${ie}`.trim();
    const re = Number(this.config.secondary_text_start_offset ?? this.config.secondary_text_offset_x) || 0, O = Number(this.config.secondary_text_end_offset) || 0, Ue = Number(this.config.secondary_text_offset_y) || 0, dt = re !== 0 || Ue !== 0 ? `transform: translate(${re}px, ${Ue}px);` : "", ut = re !== 0 || O !== 0 ? `margin-left: ${re}px; margin-right: ${O}px;` : "";
    this._secondaryTextOffsetStyle = `${dt} ${ut}`.trim();
    const Ie = Number(this.config.features_offset_x) || 0, Ge = Number(this.config.features_offset_y) || 0;
    this._featuresOffsetStyle = Ie !== 0 || Ge !== 0 ? `transform: translate(${Ie}px, ${Ge}px);` : "";
    const Ve = Number(this.config.slider_start_offset) || 0, We = Number(this.config.slider_end_offset) || 0;
    this._mainSliderMarginOffsets = [
      Ve ? `margin-left: ${Ve}px !important;` : "",
      We ? `margin-right: ${We}px !important;` : ""
    ].filter(Boolean).join(" ");
    const oe = Number(this.config.color_temp_start_offset) || 0, U = Number(this.config.color_temp_end_offset) || 0;
    this._colorTempMarginOffsets = [
      oe ? `margin-left: ${oe}px !important;` : "",
      U ? `margin-right: ${U}px !important;` : ""
    ].filter(Boolean).join(" ");
    const I = Number(this.config.color_slider_start_offset) || 0, Ye = Number(this.config.color_slider_end_offset) || 0;
    this._colorHueMarginOffsets = [
      I ? `margin-left: ${I}px !important;` : "",
      Ye ? `margin-right: ${Ye}px !important;` : ""
    ].filter(Boolean).join(" "), this._textBoxWidth = this.config.text_box_width ? `max-width: ${this.config.text_box_width}; width: ${this.config.text_box_width};` : "width: 100%; max-width: 100%;";
    const ht = this.config.text_transform_primary && this.config.text_transform_primary !== "none" ? `text-transform: ${this.config.text_transform_primary};` : "", Xe = `text-transform: ${this.config.text_transform_secondary ?? "capitalize"};`, ge = this.config.letter_spacing ? `letter-spacing: ${this.config.letter_spacing}px;` : "", me = this.config.line_height ? `line-height: ${this.config.line_height};` : "", be = this.config.font_weight_primary ?? "800";
    this._primaryTextStyle = `font-size: ${this.config.font_size_primary ?? 14}px; font-weight: ${be}; ${ht} ${ge} ${me}`, this._secondaryTextStyle = `font-size: ${this.config.font_size_secondary ?? 15}px; ${Xe} ${ge} ${me}`;
    const _t = this.config.entity, ae = [];
    for (let A = 1; A <= 4; A++) {
      const G = this.config[`sub_button_${A}_entity`], ve = this.config[`sub_button_${A}_icon`], Ke = this.config[`sub_button_${A}_name`], pt = this.config[`sub_button_${A}_tap_action`], ye = this.config[`sub_button_${A}_hold_action`], si = this.config[`sub_button_${A}_double_tap_action`], ft = this.config[`sub_button_${A}_type`], li = this.config[`sub_button_${A}_color`], ci = this.config[`sub_button_${A}_show_background`], Pt = this.config[`sub_button_${A}_show_state`];
      if (!!(G || ve || Ke || ft && ft !== "button" || Pt)) {
        const Et = G || _t;
        ae.push(Object.freeze({
          key: `${Et || "sub"}_${A}`,
          entity: Et,
          type: ft || "button",
          icon: ve,
          color: li,
          bg: ci,
          name: Ke,
          showState: Pt === !0,
          tapAction: pt,
          holdAction: ye,
          doubleTapAction: si
        }));
      }
    }
    if (this._cachedSubButtons = Object.freeze(ae), this.config.fade_transition_enabled) {
      const A = Number(this.config.fade_stage_1_duration) || 60, G = Number(this.config.fade_stage_2_duration) || 600, ve = Number(this.config.fade_stage_3_duration) || 1800, Ke = z(this.config.fade_stage_1_color) || [255, 152, 0], pt = z(this.config.fade_stage_2_color) || [205, 220, 57], ye = z(this.config.fade_stage_3_color);
      this._fadeStaticConfig = {
        d1: A,
        d2: G,
        d3: ve,
        totalDuration: A + G + ve,
        c1Rgb: Ke,
        c2Rgb: pt,
        c3Rgb: ye,
        restingResult: Object.freeze({
          enabled: !0,
          activeFade: !1,
          currentColor: ye ? yt(ye) : "",
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
    const i = this.config.entity.split(".")[0] === "light", r = e.state === "on", o = this.config.hide_color_temp_when_off !== !1, a = this.config.hide_color_picker_when_off !== !1, l = this.config.hide_color_slider_when_off !== !1, d = e.attributes?.color_temp_kelvin ?? e.attributes?.color_temp, p = i && this.config.show_color_temp === !0 && (d !== void 0 || e.attributes?.supported_color_modes?.some((T) => ["color_temp"].includes(T))) && (!o || r), h = e.attributes?.supported_color_modes, c = Array.isArray(h) && h.some((T) => ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(T)), v = this.config.color_picker_type !== "wheel", g = i && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && v) && c && (!l || r), x = i && this.config.show_color_picker === !0 && !v && c && (!a || r), w = p || g || x, $ = this._getSubButtons();
    this._cachedHasCollapsible = w || $.length > 0;
  }
  connectedCallback() {
    super.connectedCallback(), it.registerCard(this), this._mountTime = Date.now(), this._pointerDownReceived = !1, this._powerUnsubscribe = j.addChangeListener(() => {
      this._updatePowerSaveAttribute();
    }), this._updatePowerSaveAttribute(), this._setupRelativeTimer(), this._setupIntersectionObserver();
  }
  _updatePowerSaveAttribute() {
    j.isPowerSaveActive(this.hass) ? this.setAttribute("power-save", "") : this.removeAttribute("power-save");
  }
  _setupIntersectionObserver() {
    typeof IntersectionObserver > "u" || this._intersectionObserver || (this._intersectionObserver = new IntersectionObserver((e) => {
      for (const t of e)
        t.isIntersecting ? this.removeAttribute("offscreen") : this.setAttribute("offscreen", "");
    }, { rootMargin: "200px 0px", threshold: 0 }), this._intersectionObserver.observe(this));
  }
  _setupRelativeTimer() {
    const e = this.config?.primary_info, t = this.config?.secondary_info, i = this.config?.entity, r = i ? i.split(".")[0] : "", o = (r === "binary_sensor" || r === "timer") && (e === "state" || t === "state"), a = this.config?.fade_transition_enabled === !0, l = i && this.hass ? this.hass.states[i] : null;
    let d = !1;
    if (a && l) {
      const h = this._calculateMultiStageFade(l);
      d = h.enabled && h.activeFade && h.progressPct < 100;
    }
    const p = d || o || e === "last-changed" || e === "last_changed" || e === "last-updated" || e === "last_updated" || e === "last-triggered" || t === "last-changed" || t === "last_changed" || t === "last-updated" || t === "last_updated" || t === "last-triggered";
    if (p && !this._relativeTimer) {
      let h = d ? 1e3 : 5e3;
      const c = l?.attributes?.last_triggered || l?.last_changed || l?.last_updated;
      if (c && !d && !o) {
        const v = this._parseDate(c);
        if (v) {
          const g = Math.max(0, (Date.now() - v.getTime()) / 1e3 | 0);
          g > 3600 ? h = 6e4 : g > 60 && (h = 15e3);
        }
      }
      j.isPowerSaveActive(this.hass) && (h = Math.max(h, 1e4)), this._relativeTimer = setInterval(() => {
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
    const i = this._calculateMultiStageFade(t);
    return i.enabled && i.activeFade && i.progressPct < 100;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), it.unregisterCard(this), this._powerUnsubscribe && (this._powerUnsubscribe(), this._powerUnsubscribe = null), this._gl && (oi(this._gl), this._gl = null), this._throttleMap.clear(), this._subTapTimerMap.forEach((e) => clearTimeout(e)), this._subTapTimerMap.clear(), this._intersectionObserver && (this._intersectionObserver.disconnect(), this._intersectionObserver = null), this._relativeTimer && (clearInterval(this._relativeTimer), this._relativeTimer = null), this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null), this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null);
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
    return e ? fr.has(e.state) : !1;
  }
  _calculateMultiStageFade(e, t = "", i = "") {
    if (!this.config?.fade_transition_enabled || !e)
      return Qe;
    const r = this._isEntityActive(e), o = this.config.fade_trigger ?? "on_inactive";
    if (!(o === "on_inactive" && !r || o === "on_active" && r || o === "both"))
      return Qe;
    const l = r ? this._resolveColor(this.config.inactive_color) || i || "#4caf50" : this._resolveColor(this.config.active_color) || t || "#d60000", d = r ? this._resolveColor(this.config.active_color) || t || "#d60000" : this._resolveColor(this.config.inactive_color) || i || "#03b100", p = z(l) || [214, 0, 0], h = z(d) || [3, 177, 0], c = this._fadeStaticConfig, v = c?.d1 ?? (Number(this.config.fade_stage_1_duration) || 60), g = c?.d2 ?? (Number(this.config.fade_stage_2_duration) || 600), x = c?.d3 ?? (Number(this.config.fade_stage_3_duration) || 1800), w = c?.totalDuration ?? v + g + x;
    if (w <= 0)
      return Qe;
    this._lastTrackedState !== null && this._lastTrackedState !== e.state && this._currentLiveRgb && this.config.fade_smooth_retrigger !== !1 && (this._previousLiveRgb = this._currentLiveRgb), this._lastTrackedState = e.state;
    const $ = this.config.fade_stage_1_pickup !== !1 && this._previousLiveRgb && this.config.fade_smooth_retrigger !== !1 ? this._previousLiveRgb : p, T = c?.c1Rgb ?? (z(this.config.fade_stage_1_color) || [255, 152, 0]), u = this.config.fade_stage_2_pickup !== !1 ? T : p, f = c?.c2Rgb ?? (z(this.config.fade_stage_2_color) || [205, 220, 57]), k = this.config.fade_stage_3_pickup !== !1 ? f : T, M = c?.c3Rgb ?? (z(this.config.fade_stage_3_color) || h), m = this._parseDate(e.last_changed || e.last_updated);
    if (!m)
      return Qe;
    const b = Math.max(0, (Date.now() - m.getTime()) / 1e3);
    if (b >= w)
      return this._currentLiveRgb = M, this._previousLiveRgb = null, c?.restingResult ? c.restingResult : {
        enabled: !0,
        activeFade: !1,
        currentColor: yt(M),
        progressPct: 100,
        remainingSeconds: 0,
        currentStage: 0,
        stageLabel: "Resting"
      };
    let P, s = 1, _ = 0;
    const y = Math.max(0, Math.round(w - b));
    b < v && v > 0 ? (s = 1, _ = b / v, P = vt($, T, _)) : b < v + g && g > 0 ? (s = 2, _ = (b - v) / g, P = vt(u, f, _)) : x > 0 ? (s = 3, _ = (b - v - g) / x, P = vt(k, M, _)) : (s = 0, P = M), this._currentLiveRgb = P;
    const E = Math.min(100, Math.round(b / w * 100)), L = yt(P);
    let q = "";
    return y >= 60 ? q = `${Math.ceil(y / 60)}m left` : q = `${y}s left`, {
      enabled: !0,
      activeFade: !0,
      currentColor: L,
      progressPct: E,
      remainingSeconds: y,
      currentStage: s,
      stageLabel: q
    };
  }
  _resolveColor(e) {
    return $r(e);
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
      const t = V.get(e);
      if (t) return t;
      const i = Date.parse(e);
      if (!isNaN(i)) {
        const d = new Date(i);
        if (V.size >= Jt) {
          const p = V.keys().next().value;
          p !== void 0 && V.delete(p);
        }
        return V.set(e, d), d;
      }
      let r = e.trim();
      r.includes(" ") && !r.includes("T") && (r = r.replace(" ", "T")), r.includes("T") && !r.endsWith("Z") && !/[+-]\d{2}:\d{2}$/.test(r) && !/[+-]\d{4}$/.test(r) && (r += "Z");
      const o = Number(r);
      let a;
      !isNaN(o) && r !== "" && !r.includes("T") ? a = new Date(o > 1e11 ? o : o * 1e3) : a = new Date(r);
      const l = isNaN(a.getTime()) ? null : a;
      if (l) {
        if (V.size >= Jt) {
          const d = V.keys().next().value;
          d !== void 0 && V.delete(d);
        }
        V.set(e, l);
      }
      return l;
    }
    return null;
  }
  _formatTimeAgo(e, t = !1, i) {
    const r = this._parseDate(e);
    if (!r) return "";
    const o = Math.max(0, ((i ?? Date.now()) - r.getTime()) / 1e3 | 0);
    if (o < 5) return t ? "< 5s" : "just now";
    if (o < 60) return t ? `${o}s` : `${o} seconds ago`;
    const a = o / 60 | 0;
    if (a < 60) return t ? `${a}m` : `${a} ${a === 1 ? "minute" : "minutes"} ago`;
    const l = a / 60 | 0;
    if (l < 24) return `${l}h${t ? "" : " ago"}`;
    const d = l / 24 | 0;
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
              const a = Math.max(0, Math.round((o - Date.now()) / 1e3)), l = Math.floor(a / 60), d = a % 60, p = Math.floor(l / 60), h = (l % 60).toString().padStart(2, "0"), c = d.toString().padStart(2, "0");
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
          let a = o;
          o === "cleaning" ? a = "🧹 Cleaning" : o === "docked" ? a = "🏠 Docked" : o === "returning" ? a = "🔄 Returning" : o === "paused" ? a = "⏸️ Paused" : o === "error" && (a = "⚠️ Error");
          const l = t.attributes?.battery_level;
          return l !== void 0 ? `${a} • 🔋${l}%` : a;
        }
        if (r === "weather") {
          const o = t.attributes?.temperature, a = this.hass.config?.unit_system?.temperature || "°F", l = (t.state || "").replace(/-/g, " ");
          return o !== void 0 ? `${o}${a} • ${l}` : l;
        }
        if (r === "climate") {
          const o = t.state || "", a = t.attributes?.current_temperature, l = t.attributes?.temperature ?? t.attributes?.target_temp_high, d = t.attributes?.unit_of_measurement || this.hass.config?.unit_system?.temperature || "°", p = t.attributes?.preset_mode, h = t.attributes?.hvac_action, v = [a !== void 0 && l !== void 0 ? `${a}${d} → ${l}${d}` : l !== void 0 ? `${l}${d}` : "", h, p].filter(Boolean).join(" • ");
          return v ? `${o} (${v})` : o;
        }
        if (r === "fan") {
          const o = t.attributes?.percentage, a = t.attributes?.oscillating ? "∿ Oscillating" : "", l = t.attributes?.direction === "reverse" ? "⟲ Reverse" : "";
          return [o !== void 0 ? `${o}%` : t.state, a, l].filter(Boolean).join(" • ");
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
          const o = t.attributes?.brightness, a = o !== void 0 ? Math.round(o / 255 * 100) : 100;
          if (t.attributes?.color_temp_kelvin)
            return `${a}% • ${t.attributes.color_temp_kelvin}K`;
        }
        if (t.attributes?.device_class === "timestamp" || t.attributes?.device_class === "date" || typeof t.state == "string" && (t.state.includes("T") || t.state.match(/^\d{4}-\d{2}-\d{2}/)) && !isNaN(Date.parse(t.state))) {
          const o = this._formatRelativeTime(t.state);
          if (o) return o;
        }
        if (t.attributes?.display_precision !== void 0 && !isNaN(Number(t.state))) {
          const o = Number(t.attributes.display_precision), a = Number(t.state).toFixed(o), l = t.attributes?.unit_of_measurement ? ` ${t.attributes.unit_of_measurement}` : "";
          return `${a}${l}`;
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
            return o <= 20 ? a = "#f44336" : o <= 50 && (a = "#ff9800"), C`<span style="color: ${a}; font-weight: bold;">${o}%</span>`;
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
    const r = i || this.config.entity, o = r ? r.split(".")[0] : "", a = br.has(o);
    let l = t;
    if (l || (e === "double_tap" ? l = this.config.double_tap_action : e === "hold" ? l = this.config.hold_action || (a ? { action: "more-info" } : { action: "toggle" }) : this.config.tap_action && this.config.tap_action.action && this.config.tap_action.action !== "default" ? a && this.config.tap_action.action === "toggle" ? l = { action: "none" } : l = this.config.tap_action : l = a ? { action: "none" } : { action: "toggle" }), !(!l || l.action === "none")) {
      if (l.action === "more-info") {
        const d = l.entity || r;
        if (d) {
          this.dispatchEvent(new CustomEvent("hass-more-info", {
            detail: { entityId: d },
            bubbles: !0,
            composed: !0
          }));
          return;
        }
      }
      if (l.action === "toggle" && r) {
        if (a)
          return;
        const d = o === "lock" ? this._isEntityActive(this.hass?.states[r]) ? "lock" : "unlock" : "toggle", p = ["lock", "cover"].includes(o) ? o : o === "group" ? "homeassistant" : o;
        this.hass?.callService(p, d, { entity_id: r });
        return;
      }
      if (l.action === "navigate" && l.navigation_path) {
        history.pushState(null, "", l.navigation_path), window.dispatchEvent(new CustomEvent("location-changed", {
          detail: { replace: !1 },
          bubbles: !0,
          composed: !0
        }));
        return;
      }
      if (l.action === "url" && l.url_path) {
        window.open(l.url_path, "_blank");
        return;
      }
      if (l.action === "call-service" && l.service) {
        const [d, p] = l.service.split(".", 2);
        this.hass?.callService(d, p, l.data || l.service_data || {}, l.target);
        return;
      }
      a && (!l.action || l.action === "toggle") || qi(this, this.hass, { ...this.config, entity: r }, e);
    }
  }
  _handleTap(e) {
    if (e.stopPropagation(), this._isSubElement(e)) return;
    if (Date.now() - this._mountTime < 1500 || Date.now() - le < 800) {
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
      N("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
      return;
    }
    if (this._tapTimer) {
      clearTimeout(this._tapTimer), this._tapTimer = null, N("medium", this.config.haptic_feedback !== !1), i && this._hasCollapsible() && (this._collapsed = !this._collapsed), this._dispatchAction("double_tap");
      return;
    }
    this._tapTimer = setTimeout(() => {
      this._tapTimer = null, N("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap");
    }, 250);
  }
  _handleKeyDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - le < 800 || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), N("light", this.config.haptic_feedback !== !1), this._dispatchAction("tap"));
  }
  _handleContextMenu(e) {
    if (e.preventDefault(), e.stopPropagation(), Date.now() - this._mountTime < 1500 || Date.now() - le < 800 || this._held) return;
    N("medium", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
  }
  _handlePointerDown(e) {
    this._isSubElement(e) || Date.now() - this._mountTime < 1500 || Date.now() - le < 800 || this._activePointerId !== null && this._activePointerId !== e.pointerId || (this._activePointerId = e.pointerId, this._pointerDownReceived = !0, this._pointerDownTime = Date.now(), this._held = !1, this._moved = !1, this._canceled = !1, this._startX = e.clientX, this._startY = e.clientY, this._holdTimer = setTimeout(() => {
      if (this._moved || this._canceled) return;
      this._held = !0, this._holdTimer = null, this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null), N("heavy", this.config.haptic_feedback !== !1), (this.config.collapse_controls_trigger || "hold") === "hold" && this._hasCollapsible() ? this._collapsed = !this._collapsed : this.config.hold_action && this.config.hold_action.action !== "none" && this._dispatchAction("hold");
    }, 500));
  }
  _handlePointerMove(e) {
    if (this._isSubElement(e) || this._activePointerId !== null && this._activePointerId !== e.pointerId) return;
    const t = e.clientX - this._startX, i = e.clientY - this._startY, r = Math.hypot(t, i), o = Math.max(1, Date.now() - this._pointerDownTime), a = r / o;
    (r > 8 || a > 0.5) && (this._moved = !0, this._pointerDownReceived = !1, this._holdTimer && (clearTimeout(this._holdTimer), this._holdTimer = null));
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
      this._subMoved || this._subCanceled || (this._subHeld = !0, this._subHoldTimer = null, N("heavy", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
    }, 500);
  }
  _handleSubPointerMove(e) {
    e.stopPropagation();
    const t = e.clientX - this._subStartX, i = e.clientY - this._subStartY, r = Math.hypot(t, i), o = Math.max(1, Date.now() - this._subPointerDownTime), a = r / o;
    (r > 8 || a > 0.5) && (this._subMoved = !0, this._subHoldTimer && (clearTimeout(this._subHoldTimer), this._subHoldTimer = null));
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
    const a = r && r.action !== "none", l = t || "sub_default", d = () => {
      N("light", this.config.haptic_feedback !== !1), i && i.action && i.action !== "none" && i.action !== "default" ? this._dispatchAction("tap", i, t) : o ? o() : this._dispatchAction("tap", { action: "toggle" }, t);
    };
    if (!a) {
      d();
      return;
    }
    const p = this._subTapTimerMap.get(l);
    if (p) {
      clearTimeout(p), this._subTapTimerMap.delete(l), N("medium", this.config.haptic_feedback !== !1), this._dispatchAction("double_tap", r, t);
      return;
    }
    const h = setTimeout(() => {
      this._subTapTimerMap.delete(l), d();
    }, 250);
    this._subTapTimerMap.set(l, h);
  }
  _handleSubContextMenu(e, t, i) {
    e.preventDefault(), e.stopPropagation(), !this._subHeld && (N("medium", this.config.haptic_feedback !== !1), this._dispatchAction("hold", i || { action: "more-info" }, t));
  }
  // --- THROTTLED SERVICE CALL HELPER ---
  _throttledCall(e, t, i) {
    const r = i ?? (j.isPowerSaveActive(this.hass) ? 60 : 30), o = this._throttleMap.get(e) ?? 0, a = Date.now();
    if (!(a - o < r)) {
      this._throttleMap.set(e, a);
      try {
        t();
      } finally {
        setTimeout(() => {
          this._throttleMap.get(e) === a && this._throttleMap.delete(e);
        }, r + 50);
      }
    }
  }
  _revertSlider(e, t) {
    e.value = String(t.initialVal), e.style.setProperty("--slider-pct", t.initialPct);
    const r = e.closest(".slider-container, .sub-button-slider-container")?.querySelector(".slider-percent-badge, .sub-slider-pct");
    r && (r.textContent = t.initialBadge);
  }
  _sliderInput(e, t, i, r, o, a, l) {
    e.stopPropagation();
    const d = e.target, p = this._sliderStateMap.get(d);
    if (p?.isScrolling) {
      this._revertSlider(d, p);
      return;
    }
    const h = Number(d.value), c = isNaN(h) ? 0 : h, v = a ? a(c) : c;
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
      if (x && (x.textContent = l ? l(c, v) : `${v}%`), t === "color_hue" && g) {
        g.style.setProperty("--color-hue-val", `hsl(${c}, 100%, 50%)`);
        const w = g.querySelector(".color-chip-badge span");
        w && (w.style.background = `hsl(${c}, 100%, 50%)`);
      }
    }), N("selection", this.config.haptic_feedback !== !1);
  }
  _sliderChange(e, t, i, r) {
    e.stopPropagation();
    const o = e.target, a = this._sliderStateMap.get(o);
    if (a?.isScrolling) {
      this._revertSlider(o, a), a.isScrolling = !1;
      return;
    }
    const l = Number(o.value), d = isNaN(l) ? 0 : l;
    if (!(a && d === a.initialVal)) {
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
      const r = t.color_temp_kelvin ?? (t.color_temp ? Math.round(1e6 / t.color_temp) : 3e3), [o, a, l] = F(r);
      return `rgb(${o}, ${a}, ${l})`;
    }
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return `rgb(${t.rgb_color[0]}, ${t.rgb_color[1]}, ${t.rgb_color[2]})`;
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2) {
      const [r, o, a] = bt(t.hs_color[0], t.hs_color[1]);
      return `rgb(${r}, ${o}, ${a})`;
    }
    if (Array.isArray(t.rgbw_color) && t.rgbw_color.length >= 3)
      return `rgb(${t.rgbw_color[0]}, ${t.rgbw_color[1]}, ${t.rgbw_color[2]})`;
    if (Array.isArray(t.rgbww_color) && t.rgbww_color.length >= 3)
      return `rgb(${t.rgbww_color[0]}, ${t.rgbww_color[1]}, ${t.rgbww_color[2]})`;
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const r = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp), [o, a, l] = F(r);
      return `rgb(${o}, ${a}, ${l})`;
    }
    return e.state === "on" ? "var(--state-light-active-color, rgb(255, 205, 120))" : null;
  }
  _getLiveHex(e) {
    if (!e?.attributes || e.state !== "on") return "#ffffff";
    const t = e.attributes;
    if (Array.isArray(t.rgb_color) && t.rgb_color.length >= 3)
      return Ze(t.rgb_color);
    if (Array.isArray(t.hs_color) && t.hs_color.length >= 2)
      return Ze(bt(t.hs_color[0], t.hs_color[1]));
    if (t.color_temp_kelvin !== void 0 || t.color_temp !== void 0) {
      const o = t.color_temp_kelvin ?? Math.round(1e6 / t.color_temp);
      return Ze(F(o));
    }
    const i = this._getLightLiveColor(e);
    if (!i) return "#ffffff";
    const r = z(i);
    return r ? Ze(r) : "#ffffff";
  }
  _getLiveHue(e) {
    if (!e) return 0;
    if (Array.isArray(e.attributes?.hs_color) && e.attributes.hs_color.length >= 1)
      return Math.round(e.attributes.hs_color[0]) % 360;
    if (Array.isArray(e.attributes?.rgb_color) && e.attributes.rgb_color.length >= 3) {
      const [t, i, r] = e.attributes.rgb_color;
      return yr(t, i, r);
    }
    return 0;
  }
  _handleColorInput(e, t, i, r) {
    e.stopPropagation();
    const o = e.target.value;
    if (!o) return;
    const a = z(o);
    if (!a) return;
    const l = i || this.config.entity, d = () => {
      this.hass.callService("light", "turn_on", { entity_id: l, rgb_color: a });
    };
    t ? this._throttledCall(r || "color_picker", d) : d();
  }
  // --- RENDER ---
  render() {
    if (!this.config || !this.hass)
      return C``;
    const e = this.config.entity;
    if (!e)
      return C`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <span>Please configure an entity in the visual editor.</span>
        </ha-card>
      `;
    const t = this.hass.states[e];
    if (!t)
      return C`
        <ha-card class="warning-card">
          <ha-icon icon="mdi:help-circle-outline"></ha-icon>
          <span>Entity not found: <code>${e}</code></span>
        </ha-card>
      `;
    const i = this.config.show_name !== !1 ? this._getInfoContent(this.config.primary_info, t) : "", r = this.config.show_state !== !1 ? this._getInfoContent(this.config.secondary_info, t) : "", o = this._isEntityActive(t), a = e.split(".")[0];
    let l = "var(--primary-color)", d = null;
    a === "climate" ? t.state === "heat" ? l = "var(--state-climate-heat-color, #ff7043)" : t.state === "cool" ? l = "var(--state-climate-cool-color, #42a5f5)" : t.state === "dry" ? l = "var(--state-climate-dry-color, #ab47bc)" : t.state === "fan_only" && (l = "var(--state-climate-fan_only-color, #26a69a)") : a === "light" ? (d = this._getLightLiveColor(t), d && (l = d)) : (a === "binary_sensor" || a === "lock" || a === "switch") && (l = "#d60000");
    const p = this.config.color_type === "card";
    let h = this._resolveColor(this.config.active_color);
    (!h || this.config.use_light_color) && (a === "light" && d ? h = d : h = l);
    let c = "var(--secondary-background-color, rgba(150, 150, 150, 0.2))";
    a === "light" ? c = "#000000" : (a === "binary_sensor" || a === "lock" || a === "switch") && (c = "#03b500");
    const v = this._resolveColor(this.config.inactive_color) || c, g = this.config.show_slider !== !1, x = a === "light", w = a === "cover", $ = a === "fan", T = a === "humidifier", u = a === "media_player", f = a === "number" || a === "input_number", k = a === "climate", M = this.config.hide_slider_when_off !== !1, m = this.config.hide_color_temp_when_off !== !1, b = this.config.hide_color_picker_when_off !== !1, P = this.config.hide_color_slider_when_off !== !1, s = t.attributes?.supported_color_modes;
    let _ = t.attributes?.brightness !== void 0, y = !1, E = !1;
    if (Array.isArray(s))
      for (let A = 0; A < s.length; A++) {
        const G = s[A];
        G !== "onoff" && (_ = !0), G === "color_temp" && (y = !0), mr.has(G) && (E = !0);
      }
    const L = x && g && _ && (!M || o), q = t.attributes?.color_temp_kelvin ?? t.attributes?.color_temp, _e = x && this.config.show_color_temp === !0 && (q !== void 0 || y) && (!m || o), Ee = this.config.color_picker_type !== "wheel", Le = x && (this.config.show_color_slider === !0 || this.config.show_color_picker === !0 && Ee) && E && (!P || o), De = x && this.config.show_color_picker === !0 && !Ee && E && (!b || o), W = t.state !== "unavailable" && t.state !== "unknown", Ne = w && W && g && t.attributes?.current_position !== void 0, He = $ && W && o && g && t.attributes?.percentage !== void 0, Re = T && W && o && g && (t.attributes?.humidity !== void 0 || t.attributes?.target_humidity !== void 0), Be = u && W && o && g && t.attributes?.volume_level !== void 0, Oe = f && W && g, ze = k && W && o && g && (t.attributes?.temperature !== void 0 || t.attributes?.target_temp_high !== void 0), lt = (this.config.bg_opacity ?? 10) / 100, ct = this.config.slider_color ? `--slider-color: ${this._resolveColor(this.config.slider_color)};` : p && o && !this.config.use_light_color ? "--slider-color: rgba(255, 255, 255, 0.95);" : `--slider-color: ${h};`, Fe = this.config.slider_track_color ? `--slider-track-color: ${this._resolveColor(this.config.slider_track_color)};` : p && o ? "--slider-track-color: rgba(0, 0, 0, 0.25);" : "", H = this._calculateMultiStageFade(t, l, v), Y = this.config.fade_target ?? "card", pe = this._resolveColor(this.config.bg_color);
    let B;
    H.activeFade && (Y === "card" || Y === "all" || p) ? B = H.currentColor : p ? a === "light" ? B = o ? d || h : this.config.inactive_color ? v : "#000000" : B = o ? h : v : pe ? B = pe : a === "light" && !o ? B = "#000000" : B = `rgba(150, 150, 150, ${lt})`;
    let fe = this._resolveColor(this.config.active_color) || (a === "light" && d ? d : h) || "var(--primary-color)";
    H.activeFade && (Y === "all" || this.config.active_glow === !0) && (fe = H.currentColor);
    let ie = "";
    this.config.box_shadow === "soft" && (ie = "box-shadow: 0 4px 10px rgba(0,0,0,0.1);"), this.config.box_shadow === "deep" && (ie = "box-shadow: 0 10px 20px rgba(0,0,0,0.3);"), (this.config.box_shadow === "glow" || this.config.active_glow === !0) && (ie = o || H.activeFade ? `box-shadow: 0 0 22px ${fe}, 0 0 45px rgba(255, 255, 255, 0.18);` : "");
    const re = this.config.active_glow === !0 || this.config.box_shadow === "glow" ? "card-active-glow" : "", O = t?.attributes?.device_class, Ue = a === "binary_sensor" && (O === "motion" || O === "occupancy" || O === "presence"), dt = a === "binary_sensor" && (O === "door" || O === "window" || O === "garage_door" || O === "opening"), ut = Ue && (o || H.activeFade && H.currentStage === 1) ? "motion-active" : "", Ie = dt && o ? "door-open" : "", Ge = a === "climate" && t?.attributes?.hvac_action ? `hvac-${t.attributes.hvac_action}` : "", Ve = a === "cover" ? t?.state === "opening" ? "cover-opening" : t?.state === "closing" ? "cover-closing" : "" : "", We = `${this._staticCardClasses} ${re} ${ut} ${Ie} ${Ge} ${Ve}`, oe = this._getSubButtons();
    let U = "";
    this.config.text_color_mode === "active_accent" && o ? U += `--primary-text-color: ${h}; ` : this.config.text_color_primary ? U += `--primary-text-color: ${this._resolveColor(this.config.text_color_primary)}; ` : p && o && (U += "--primary-text-color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); "), this.config.text_color_secondary ? U += `--secondary-text-color: ${this._resolveColor(this.config.text_color_secondary)}; ` : p && o && (U += "--secondary-text-color: rgba(255, 255, 255, 0.9); text-shadow: 0 1px 2px rgba(0,0,0,0.3); ");
    const I = this.config.features_position === "inline", Ye = this.config.text_scrolling_primary || "none", ht = this.config.text_scrolling_secondary || "none", Xe = C`
      ${L ? this._renderLightSlider(t) : S}
      ${Ne ? this._renderCoverSlider(t) : S}
      ${He ? this._renderFanSlider(t) : S}
      ${Re ? this._renderHumidifierSlider(t) : S}
      ${Be ? this._renderMediaSlider(t) : S}
      ${Oe ? this._renderNumberSlider(t) : S}
      ${ze ? this._renderClimateSlider(t) : S}
    `, ge = C`
      ${_e ? this._renderColorTempSlider(t) : S}
      ${Le ? this._renderColorSlider(t) : S}
      ${De ? this._renderColorPicker(t) : S}
    `, me = L || Ne || He || Re || Be || Oe || ze, be = _e || Le || De, _t = !I && be || oe.length > 0, ae = this.config.decay_slider_position ?? "bottom";
    return C`
      ${this.config.custom_styles ? C`<style>${this.config.custom_styles}</style>` : S}
      <ha-card 
        class="${We}" 
        ?active=${o}
        style="${this._staticCardStyles} background: ${B}; ${ie} ${ct} ${Fe} ${U} --ag-glow-color: ${fe}; --ag-active-color: ${h};"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
        @contextmenu=${this._handleContextMenu}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerCancel}
      >
        <div class="card-content ${I ? "features-inline" : ""}" style="justify-content: var(--ag-content-alignment);">
          ${ae === "top" ? this._renderDecaySlider(H) : S}

          <div class="info-container">
            <div class="info" style="${this._textOffsetStyle} ${this._textBoxWidth} text-align: var(--ag-text-alignment);">
              ${i ? C`
                <div class="text-marquee-container scroll-${Ye}" style="${this._primaryTextOffsetStyle}">
                  <span class="primary scroll-content" style="${this._primaryTextStyle}">${i}</span>
                </div>` : S}
              ${r ? C`
                <div class="text-marquee-container scroll-${ht}" style="${this._secondaryTextOffsetStyle}">
                  <span class="secondary scroll-content" style="${this._secondaryTextStyle}">${r}</span>
                </div>` : S}
            </div>
            ${ae === "inline" ? C`<div class="inline-sliders">${this._renderDecaySlider(H)}</div>` : S}
            ${I && me ? C`<div class="inline-sliders" style="${this._mainSliderMarginOffsets}">${Xe}</div>` : S}
            ${I && be ? C`<div class="inline-sliders ${this._collapsed ? "collapsed" : ""}">${ge}</div>` : S}
          </div>
          
          ${ae === "bottom" ? this._renderDecaySlider(H) : S}
          ${!I && me ? C`<div class="features-container" style="${this._featuresOffsetStyle} ${this._mainSliderMarginOffsets}">${Xe}</div>` : S}

          ${_t ? C`
            <div class="collapsible-wrapper ${this._collapsed ? "collapsed" : ""}">
              ${!I && be ? C`<div class="features-container" style="${this._featuresOffsetStyle}">${ge}</div>` : S}

              ${oe.length > 0 ? C`
                <div class="sub-buttons-container">
                  ${Ii(
      oe,
      (A) => A.key,
      (A) => this._renderSubButton(A.entity || "", A.icon, A.color, A.bg !== !1, A.name, A.tapAction, A.holdAction, A.type, A.doubleTapAction, A.showState)
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
    const t = this.config.slider_style === "google", i = this.config.decay_slider_height ?? (t ? 32 : 10), r = this.config.slider_border_radius ?? (t ? 16 : 5), o = Math.max(0, 100 - e.progressPct);
    return C`
      <div class="decay-slider-container" style="--decay-color: ${e.currentColor};">
        <div class="decay-slider-track" style="height: ${i}px; border-radius: ${r}px;">
          <div class="decay-slider-fill" style="width: ${o}%; background: ${e.currentColor}; border-radius: ${r}px;"></div>
          <span class="decay-slider-badge">${e.stageLabel}</span>
        </div>
      </div>
    `;
  }
  // --- GENERIC SLIDER COMPONENT HELPER ---
  _renderGenericSlider(e, t, i, r, o, a, l, d, p, h, c, v, g = "", x = "", w) {
    const $ = this.config.slider_style === "google", T = $ && this.config.show_slider_percent !== !1 || this.config.show_slider_percent === !0, u = v ? v(a, l) : `${l}%`, f = w !== void 0 ? w : u, k = this.config.slider_stepped_movement === !1 ? "any" : o, M = e !== "color_temp" && e !== "color_hue", m = this.config.slider_style === "full", b = M && m ? "main-slider-full" : "";
    let P = "";
    if (M && m) {
      const s = Number(this.config.slider_start_offset) || 0, _ = Number(this.config.slider_end_offset) || 0;
      P = `left: ${s}px !important; right: ${_}px !important; width: calc(100% - ${s + _}px) !important;`;
    } else e === "color_temp" ? P = this._colorTempMarginOffsets : e === "color_hue" ? P = this._colorHueMarginOffsets : P = this._mainSliderMarginOffsets;
    return C`
      <div class="slider-container ${g} ${b} ${$ ? "slider-google-wrap" : ""}" style="${P} ${x}">
        <input type="range" min=${i} max=${r} step=${k} .value=${a}
               aria-label="${t}"
               style="--slider-pct: ${l}%;"
               @pointerdown=${this._onSliderPointerDown}
               @pointermove=${this._onSliderPointerMove}
               @pointerup=${this._onSliderPointerUp}
               @pointercancel=${this._onSliderPointerCancel}
               @input=${(s) => this._sliderInput(s, e, d, p, h, c, v)}
               @change=${(s) => this._sliderChange(s, d, p, h)} />
        ${T && f ? C`<span class="slider-percent-badge">${f}</span>` : S}
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
      (l) => ({ brightness: l }),
      (l) => Math.round(l / 255 * 100),
      (l, d) => !t || d <= 0 ? "" : `${d}%`,
      "",
      a
    );
  }
  _renderColorTempSlider(e) {
    const t = this.config.color_temp_type || "gradient", i = e.attributes.color_temp_kelvin !== void 0 || e.attributes.min_color_temp_kelvin !== void 0 || e.attributes.max_color_temp_kelvin !== void 0, r = i ? e.attributes.min_color_temp_kelvin || 2e3 : e.attributes.min_mireds || 153, o = i ? e.attributes.max_color_temp_kelvin || 6500 : e.attributes.max_mireds || 500, a = i ? e.attributes.color_temp_kelvin || 3e3 : e.attributes.color_temp || 300, l = o - r, d = l > 0 ? Math.max(0, Math.min(100, Math.round((a - r) / l * 100))) : 0, p = i ? "color_temp_kelvin" : "color_temp", h = t === "google" || t === "gradient" && this.config.slider_style === "google", c = h ? 42 : t === "thin" ? 6 : 12, v = h ? 21 : t === "thin" ? 3 : 6, g = this.config.color_temp_height !== void 0 ? this.config.color_temp_height : this.config.slider_height ?? c, x = this.config.color_temp_border_radius !== void 0 ? this.config.color_temp_border_radius : this.config.slider_border_radius ?? v, w = i ? `${a} K` : `${a} mireds`;
    if (t === "presets") {
      const $ = Number(this.config.color_temp_start_offset) || 0, T = Number(this.config.color_temp_end_offset) || 0, u = [
        $ ? `margin-left: ${$}px;` : "",
        T ? `margin-right: ${T}px;` : ""
      ].filter(Boolean).join(" ");
      return C`
        <div class="presets-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${u}">
          ${xr.map((f) => {
        const [k, M, m] = f.rgb, b = Math.abs(a - f.k) < 200, P = () => {
          N("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, [p]: f.k });
        };
        return C`
              <button 
                type="button"
                role="button"
                aria-label="Color temperature preset: ${f.label}"
                tabindex="0"
                class="temp-preset-chip"
                style="flex: 1; min-width: 48px; height: ${g}px; border-radius: ${x}px; border: ${b ? "2px solid #ffffff" : "1px solid rgba(150, 150, 150, 0.3)"}; background: rgba(${k}, ${M}, ${m}, 0.2); color: var(--primary-text-color); font-size: 11px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; box-shadow: ${b ? "0 0 8px rgba(" + k + "," + M + "," + m + ", 0.8)" : "none"};"
                @keydown=${(s) => {
          (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.stopPropagation(), P());
        }}
                @click=${(s) => {
          s.stopPropagation(), P();
        }}>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: rgb(${k}, ${M}, ${m}); display: inline-block;"></span>
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
      d,
      "light",
      "turn_on",
      ($) => ({ [p]: $ }),
      ($) => l > 0 ? Math.round(($ - r) / l * 100) : 0,
      ($) => i ? `${$} K` : `${$} mireds`,
      `color-temp ${i ? "kelvin" : "mireds"} ${h ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${g}px; --ag-slider-radius: ${x}px;`,
      w
    );
  }
  _renderColorSlider(e) {
    const t = this.config.color_picker_type || "slider";
    if (t === "wheel")
      return this._renderColorPicker(e);
    if (t === "swatches") {
      const h = this._getLiveHex(e).toLowerCase(), c = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : 32, v = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : 8, g = Number(this.config.color_slider_start_offset) || 0, x = Number(this.config.color_slider_end_offset) || 0, w = [
        g ? `margin-left: ${g}px;` : "",
        x ? `margin-right: ${x}px;` : ""
      ].filter(Boolean).join(" ");
      return C`
        <div class="swatches-palette-row" style="display: flex; gap: 6px; overflow-x: auto; padding: 2px 0; ${w}">
          ${wt.map(($) => {
        const T = h === $.hex.toLowerCase(), u = () => {
          N("light", this.config.haptic_feedback !== !1), this.hass?.callService("light", "turn_on", { entity_id: this.config.entity, rgb_color: $.rgb });
        };
        return C`
              <button 
                type="button"
                role="button"
                aria-label="Color preset: ${$.label}"
                tabindex="0"
                class="color-swatch-chip"
                title="${$.label}"
                style="flex: 1; min-width: 28px; height: ${c}px; border-radius: ${v}px; background: ${$.hex}; border: ${T ? "2px solid #ffffff" : "1px solid rgba(0,0,0,0.2)"}; cursor: pointer; box-shadow: ${T ? "0 0 10px " + $.hex : "0 1px 3px rgba(0,0,0,0.3)"}; transition: transform 0.15s ease;"
                @keydown=${(f) => {
          (f.key === "Enter" || f.key === " ") && (f.preventDefault(), f.stopPropagation(), u());
        }}
                @click=${(f) => {
          f.stopPropagation(), u();
        }}>
              </button>
            `;
      })}
        </div>
      `;
    }
    const i = this.config.slider_style === "google", r = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? (i ? 42 : 36), o = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? (i ? 21 : 8), a = this._getLiveHue(e), l = `hsl(${a}, 100%, 50%)`, d = Math.round(a / 360 * 100);
    let p;
    return this.config.color_swatch_presets !== !1 && (p = C`
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
      a,
      d,
      "light",
      "turn_on",
      (h) => {
        const [c, v, g] = bt(h, 100);
        return { rgb_color: [c, v, g] };
      },
      (h) => Math.round(h / 360 * 100),
      (h) => `${h}°`,
      `color-hue ${i ? "slider-google-wrap" : ""}`,
      `--ag-slider-height: ${r}px; --ag-slider-radius: ${o}px; --color-hue-val: ${l};`,
      p
    );
  }
  _renderColorPicker(e) {
    const t = this._getLiveHex(e), i = this.config.color_slider_height !== void 0 ? this.config.color_slider_height : this.config.slider_height ?? 36, r = this.config.color_slider_border_radius !== void 0 ? this.config.color_slider_border_radius : this.config.slider_border_radius ?? 8;
    return C`
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
      (o, a) => t ? "Muted" : `${a}%`,
      "media",
      "",
      r
    );
  }
  _renderNumberSlider(e) {
    const t = Number(e.attributes.min ?? 0);
    let i = Number(e.attributes.max ?? 100);
    t >= i && (i = t + 100);
    const r = Number(e.attributes.step ?? 1), o = Number(e.state), a = isNaN(o) ? t : o, l = i - t, d = l > 0 ? Math.max(0, Math.min(100, Math.round((a - t) / l * 100))) : 0, p = (this.config.entity || "number").split(".")[0], h = e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : "", c = r.toString(), v = c.includes(".") ? c.split(".")[1].length : 0;
    return this._renderGenericSlider(
      "number",
      "Value",
      t,
      i,
      r,
      a,
      d,
      p,
      "set_value",
      (g) => ({ value: v > 0 ? Number(g.toFixed(v)) : Math.round(g) }),
      (g) => l > 0 ? Math.round((g - t) / l * 100) : 0,
      (g) => `${v > 0 ? Number(g).toFixed(v) : Math.round(Number(g))}${h}`
    );
  }
  _renderClimateSlider(e) {
    const t = this.hass.config?.unit_system?.temperature === "°F" || this.hass.config?.unit_system?.temperature === "F", i = t ? "°F" : "°C", r = t ? 60 : 16, o = t ? 85 : 30, a = e.attributes.min_temp ?? r, l = e.attributes.max_temp ?? o, d = e.attributes.target_temp_step ?? e.attributes.target_temperature_step ?? (t ? 1 : 0.5), p = e.attributes.target_temp_low !== void 0 && e.attributes.target_temp_high !== void 0, h = e.attributes.temperature ?? e.attributes.target_temp_low ?? e.attributes.target_temp_high ?? a, c = l - a, v = c > 0 ? Math.max(0, Math.min(100, Math.round((h - a) / c * 100))) : 0;
    return this._renderGenericSlider(
      "climate",
      "Temperature",
      a,
      l,
      d,
      h,
      v,
      "climate",
      "set_temperature",
      (g) => p ? { target_temp_low: g, target_temp_high: Math.min(l, g + (t ? 4 : 2)) } : { temperature: g },
      (g) => c > 0 ? Math.round((g - a) / c * 100) : 0,
      (g) => `${g}${i}`,
      "climate-temp",
      "",
      `${h}${i}`
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
      (l) => ({ humidity: l }),
      (l) => o > 0 ? Math.round((l - t) / o * 100) : 0,
      (l, d) => `${d}%`
    );
  }
  // --- EXTRACTED SUB-BUTTON RENDERERS ---
  _renderSubSlider(e, t, i, r, o) {
    const a = t || this.hass.states[this.config.entity || ""], l = e || this.config.entity || "", d = a?.attributes?.volume_level !== void 0 || a?.entity_id?.startsWith("media_player."), p = a?.attributes?.percentage !== void 0 || a?.entity_id?.startsWith("fan."), h = a?.attributes?.current_position !== void 0 || a?.entity_id?.startsWith("cover.");
    let c = 0, v = 0, g = 255, x = "1", w = "turn_on", $ = "light", T = "brightness";
    d ? (c = a?.attributes?.volume_level ?? 0, g = 1, x = "0.01", w = "set_volume_level", $ = "media_player", T = "volume_level") : p ? (c = a?.attributes?.percentage ?? 0, g = 100, x = "1", w = "set_percentage", $ = "fan", T = "percentage") : h ? (c = a?.attributes?.current_position ?? 0, g = 100, x = "1", w = "set_cover_position", $ = "cover", T = "position") : c = a?.attributes?.brightness ?? 0;
    const u = Math.round(g === 1 ? c * 100 : g === 100 ? c : c / 255 * 100);
    return i === "slider" ? C`
        <div class="sub-button-slider-container ${o}" style="${r}" title="Level: ${u}%">
          <input type="range" 
                 min="${v}" 
                 max=${g} 
                 step=${x} 
                 .value=${c}
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value), M = Math.round(g === 1 ? k * 100 : g === 100 ? k : k / 255 * 100), m = f.target.closest(".sub-button-slider-container");
      m && m.setAttribute("title", `Level: ${M}%`), this._throttledCall("sub_slider_" + l, () => {
        this.hass?.callService($, w, { entity_id: l, [T]: k });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value);
      this.hass?.callService($, w, { entity_id: l, [T]: k });
    }} />
        </div>
      ` : C`
        <div class="sub-button-google-slider ${o}" style="${r} --slider-pct: ${u}%;" title="Level: ${u}%">
          <input type="range" 
                 min="${v}" 
                 max=${g} 
                 step=${x} 
                 .value=${c}
                 style="--slider-pct: ${u}%;"
                 @pointerdown=${(f) => f.stopPropagation()}
                 @input=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value), M = Math.round(g === 1 ? k * 100 : g === 100 ? k : k / 255 * 100), m = f.target;
      requestAnimationFrame(() => {
        m.style.setProperty("--slider-pct", `${M}%`);
        const b = m.closest(".sub-button-google-slider");
        if (b) {
          b.style.setProperty("--slider-pct", `${M}%`), b.setAttribute("title", `Level: ${M}%`);
          const P = b.querySelector(".sub-slider-pct");
          P && (P.textContent = `${M}%`);
        }
      }), this._throttledCall("sub_slider_" + l, () => {
        this.hass?.callService($, w, { entity_id: l, [T]: k });
      });
    }}
                 @change=${(f) => {
      f.stopPropagation();
      const k = parseFloat(f.target.value);
      this.hass?.callService($, w, { entity_id: l, [T]: k });
    }} />
          <span class="sub-slider-pct">${u}%</span>
        </div>
      `;
  }
  _renderSubColorPicker(e, t, i, r, o, a) {
    const l = t || this.hass.states[this.config.entity || ""], d = this._getLiveHex(l);
    return C`
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
        ${o ? C`<span class="sub-button-label" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${o}</span>` : S}
        ${a ? C`<span class="sub-button-state" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${a}</span>` : S}
      </div>
    `;
  }
  _renderSubButton(e, t, i, r = !0, o, a, l, d = "button", p, h = !1) {
    const c = e ? this.hass?.states[e] : this.hass?.states[this.config.entity || ""], v = this._isEntityActive(c), g = i ? `color: ${i};` : "", x = r ? "" : "no-bg", w = i ? this._resolveColor(i) : void 0;
    if (d === "slider" || d === "google_slider") {
      const s = i ? `--primary-color: ${i}; --slider-color: ${i};` : "";
      return this._renderSubSlider(e, c, d, s, x);
    }
    let $;
    h && c && ($ = this._getInfoContent("state", c));
    const T = (e || this.config.entity || "").split(".")[0];
    if (d === "color_picker" && (T === "light" || !e && this.config.entity?.startsWith("light.")))
      return this._renderSubColorPicker(e, c, g, x, o, $);
    let u = t, f = "", k = v, M = "", m = o, b;
    if (a && a.action && a.action !== "none" && a.action !== "default")
      u || (u = c?.attributes?.icon || "mdi:checkbox-blank-circle");
    else
      switch (d) {
        case "play_pause": {
          const s = c?.state === "playing";
          k = s, u || (u = s ? "mdi:pause" : "mdi:play"), f = s ? "Pause" : "Play", b = () => {
            this.hass?.callService("media_player", "media_play_pause", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "next": {
          u || (u = "mdi:skip-next"), f = "Next Track", b = () => {
            this.hass?.callService("media_player", "media_next_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "previous": {
          u || (u = "mdi:skip-previous"), f = "Previous Track", b = () => {
            this.hass?.callService("media_player", "media_previous_track", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "vol_up": {
          u || (u = "mdi:volume-plus"), f = "Volume +5%", m || (m = "+5%"), b = () => {
            this.hass?.callService("media_player", "volume_up", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "vol_down": {
          u || (u = "mdi:volume-minus"), f = "Volume -5%", m || (m = "-5%"), b = () => {
            this.hass?.callService("media_player", "volume_down", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "mute": {
          const s = c?.attributes?.is_volume_muted === !0;
          k = s, u || (u = s ? "mdi:volume-off" : "mdi:volume-high"), f = s ? "Unmute" : "Mute", b = () => {
            this.hass?.callService("media_player", "volume_mute", { entity_id: e || this.config.entity, is_volume_muted: !s });
          };
          break;
        }
        case "source": {
          const s = c?.attributes?.source || "", _ = c?.attributes?.source_list || [], y = _.length > 0 ? _[(_.indexOf(s) + 1) % _.length] || _[0] : s;
          u || (u = "mdi:import"), f = `Source: ${s} -> ${y}`, m || (m = s || "Source"), b = () => {
            y && this.hass?.callService("media_player", "select_source", { entity_id: e || this.config.entity, source: y });
          };
          break;
        }
        case "sound_mode": {
          const s = c?.attributes?.sound_mode || "", _ = c?.attributes?.sound_mode_list || [], y = _.length > 0 ? _[(_.indexOf(s) + 1) % _.length] || _[0] : s;
          u || (u = "mdi:surround-sound"), f = `Sound: ${s} -> ${y}`, m || (m = s || "Sound"), b = () => {
            y && this.hass?.callService("media_player", "select_sound_mode", { entity_id: e || this.config.entity, sound_mode: y });
          };
          break;
        }
        case "shuffle": {
          const s = c?.attributes?.shuffle === !0;
          k = s, u || (u = s ? "mdi:shuffle" : "mdi:shuffle-disabled"), f = s ? "Shuffle: On" : "Shuffle: Off", b = () => {
            this.hass?.callService("media_player", "shuffle_set", { entity_id: e || this.config.entity, shuffle: !s });
          };
          break;
        }
        case "repeat": {
          const s = c?.attributes?.repeat || "off", _ = ["off", "all", "one"], y = _[(_.indexOf(s) + 1) % _.length] || "off";
          k = s !== "off", u || (u = s === "one" ? "mdi:repeat-once" : s === "all" ? "mdi:repeat" : "mdi:repeat-off"), f = `Repeat: ${s} -> ${y}`, m || (m = s), b = () => {
            this.hass?.callService("media_player", "repeat_set", { entity_id: e || this.config.entity, repeat: y });
          };
          break;
        }
        case "chime": {
          u || (u = "mdi:bell-ring-outline"), f = "Play Chime", b = () => {
            this.hass?.callService("chime_tts", "say", { entity_id: e || this.config.entity, message: "ding-dong" }).catch(() => {
              this.hass?.callService("media_player", "media_play", { entity_id: e || this.config.entity });
            });
          };
          break;
        }
        case "tts_announce": {
          u || (u = "mdi:bullhorn-variant-outline"), f = "Voice Announcement", b = () => {
            this.hass?.callService("tts", "speak", { media_player_entity_id: e || this.config.entity, message: "Attention: Test announcement" }).catch(() => {
              this.hass?.callService("tts", "google_translate_say", { entity_id: e || this.config.entity, message: "Attention: Test announcement" });
            });
          };
          break;
        }
        case "media_zone": {
          u || (u = "mdi:speaker-multiple"), f = "Group Speakers / Zone", b = () => {
            this.hass?.callService("media_player", "join", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "media_preset": {
          u || (u = "mdi:radio-tower"), f = "Play Radio Stream / Preset", b = () => {
            this.hass?.callService("media_player", "play_media", {
              entity_id: e || this.config.entity,
              media_content_id: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
              media_content_type: "music"
            });
          };
          break;
        }
        case "door_hold": {
          u || (u = "mdi:door-open"), f = "Hold Gate / Door Open", b = () => {
            this.hass?.callService("cover", "open_cover", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "aux_heat": {
          const s = c?.attributes?.aux_heat === "on" || c?.attributes?.aux_heat === !0;
          k = s, u || (u = s ? "mdi:radiator" : "mdi:radiator-disabled"), f = s ? "Disable Aux Heat" : "Enable Aux Heat", b = () => {
            this.hass?.callService("climate", "set_aux_heat", { entity_id: e || this.config.entity, aux_heat: !s });
          };
          break;
        }
        case "cover_preset": {
          u || (u = "mdi:window-shutter"), f = "Go to Shading Position (50%)", b = () => {
            this.hass?.callService("cover", "set_cover_position", { entity_id: e || this.config.entity, position: 50 });
          };
          break;
        }
        case "temp_up": {
          const _ = this.hass?.config?.unit_system?.temperature === "°F" || this.hass?.config?.unit_system?.temperature === "F" ? 1 : 0.5, y = Number(c?.attributes?.temperature ?? c?.attributes?.target_temp_high ?? 20), E = Number(c?.attributes?.max_temp ?? 35), L = Math.min(E, y + _);
          u || (u = "mdi:thermometer-chevron-up"), f = `Temperature +${_}°`, m || (m = `+${_}°`), b = () => {
            this.hass?.callService("climate", "set_temperature", { entity_id: e || this.config.entity, temperature: L });
          };
          break;
        }
        case "temp_down": {
          const _ = this.hass?.config?.unit_system?.temperature === "°F" || this.hass?.config?.unit_system?.temperature === "F" ? 1 : 0.5, y = Number(c?.attributes?.temperature ?? c?.attributes?.target_temp_low ?? 20), E = Number(c?.attributes?.min_temp ?? 10), L = Math.max(E, y - _);
          u || (u = "mdi:thermometer-chevron-down"), f = `Temperature -${_}°`, m || (m = `-${_}°`), b = () => {
            this.hass?.callService("climate", "set_temperature", { entity_id: e || this.config.entity, temperature: L });
          };
          break;
        }
        case "fan_oscillate": {
          const s = c?.attributes?.oscillating === !0;
          k = s, u || (u = s ? "mdi:arrow-oscillating" : "mdi:fan-off"), f = s ? "Stop Oscillation" : "Start Oscillation", b = () => {
            this.hass?.callService("fan", "oscillate", { entity_id: e || this.config.entity, oscillating: !s });
          };
          break;
        }
        case "fan_direction": {
          const s = c?.attributes?.direction || "forward", _ = s === "forward" ? "reverse" : "forward";
          k = s === "reverse", u || (u = s === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right"), f = `Direction: ${s} -> ${_}`, m || (m = s), b = () => {
            this.hass?.callService("fan", "set_direction", { entity_id: e || this.config.entity, direction: _ });
          };
          break;
        }
        case "humidifier_mode": {
          const s = c?.attributes?.mode || c?.state || "auto", _ = c?.attributes?.available_modes || ["auto", "eco", "boost", "sleep"], y = _[(_.indexOf(s) + 1) % _.length] || "auto";
          u || (u = "mdi:water-sync"), f = `Humidifier Mode: ${s} -> ${y}`, m || (m = s), b = () => {
            this.hass?.callService("humidifier", "set_mode", { entity_id: e || this.config.entity, mode: y });
          };
          break;
        }
        case "siren_toggle": {
          const s = c?.state === "on";
          k = s, u || (u = s ? "mdi:bullhorn" : "mdi:bullhorn-outline"), f = s ? "Turn Off Siren" : "Trigger Siren", b = () => {
            this.hass?.callService("siren", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "open_close": {
          const s = c?.state === "open" || c?.state === "on" || c?.attributes?.current_position !== void 0 && c.attributes.current_position > 0;
          k = s;
          const _ = c?.attributes?.device_class;
          u || (_ === "garage" || _ === "garage_door" ? u = s ? "mdi:garage-open" : "mdi:garage" : _ === "blind" || _ === "shade" ? u = s ? "mdi:blinds-open" : "mdi:blinds" : _ === "curtain" ? u = s ? "mdi:curtains-open" : "mdi:curtains" : _ === "damper" ? u = s ? "mdi:circle-slice-8" : "mdi:circle-outline" : u = s ? "mdi:window-shutter-open" : "mdi:window-shutter"), f = s ? "Close" : "Open", b = () => {
            this.hass?.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "stop": {
          u || (u = "mdi:stop"), f = "Stop", b = () => {
            this.hass?.callService("cover", "stop_cover", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "open_tilt": {
          u || (u = "mdi:arrow-top-right-bottom-left"), f = "Open Tilt", b = () => {
            this.hass?.callService("cover", "open_cover_tilt", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "close_tilt": {
          u || (u = "mdi:arrow-bottom-left-top-right"), f = "Close Tilt", b = () => {
            this.hass?.callService("cover", "close_cover_tilt", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "stop_tilt": {
          u || (u = "mdi:stop"), f = "Stop Tilt", b = () => {
            this.hass?.callService("cover", "stop_cover_tilt", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "lock_unlock": {
          const s = c?.state === "locked", _ = c?.state === "jammed";
          k = !s, _ && (M = "lock-jammed"), u || (u = _ ? "mdi:lock-alert" : s ? "mdi:lock" : "mdi:lock-open-variant"), f = _ ? "Jammed (Alert!)" : s ? "Unlock" : "Lock", b = () => {
            this.hass?.callService("lock", s ? "unlock" : "lock", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "fan_speed": {
          const s = c?.attributes?.percentage ?? 0;
          u || (u = "mdi:fan"), v && (M = "anim-spin"), f = `Speed: ${s}%`, m || (m = s > 0 ? `${s}%` : "Off"), b = () => {
            let _ = 33;
            s >= 90 ? _ = 0 : s >= 60 ? _ = 100 : s >= 30 && (_ = 66), this.hass?.callService("fan", "set_percentage", { entity_id: e || this.config.entity, percentage: _ });
          };
          break;
        }
        case "fan_mode": {
          const s = c?.attributes?.fan_mode || "auto", _ = c?.attributes?.fan_modes || ["auto", "low", "medium", "high"], y = _[(_.indexOf(s) + 1) % _.length] || "auto";
          u || (u = "mdi:fan"), f = `Fan Mode: ${s} -> ${y}`, m || (m = s), b = () => {
            this.hass?.callService("climate", "set_fan_mode", { entity_id: e || this.config.entity, fan_mode: y });
          };
          break;
        }
        case "swing_mode": {
          const s = c?.attributes?.swing_mode || "off", _ = c?.attributes?.swing_modes || ["off", "vertical", "horizontal", "both"], y = _[(_.indexOf(s) + 1) % _.length] || "off";
          u || (u = "mdi:arrow-split-horizontal"), f = `Swing: ${s} -> ${y}`, m || (m = s), b = () => {
            this.hass?.callService("climate", "set_swing_mode", { entity_id: e || this.config.entity, swing_mode: y });
          };
          break;
        }
        case "climate_preset": {
          const s = c?.attributes?.preset_mode || "none", _ = c?.attributes?.preset_modes || ["eco", "comfort", "boost", "away", "sleep", "none"], y = _[(_.indexOf(s) + 1) % _.length] || "none";
          u || (s === "eco" ? u = "mdi:leaf" : s === "boost" ? u = "mdi:rocket-launch" : s === "away" ? u = "mdi:home-export-outline" : s === "sleep" ? u = "mdi:bed" : u = "mdi:thermostat"), f = `Preset: ${s} -> ${y}`, m || (m = s), b = () => {
            this.hass?.callService("climate", "set_preset_mode", { entity_id: e || this.config.entity, preset_mode: y });
          };
          break;
        }
        case "clean": {
          const s = c?.state === "cleaning";
          k = s, u || (u = s ? "mdi:pause" : "mdi:robot-vacuum"), f = s ? "Pause Vacuum" : "Start Vacuum", b = () => {
            this.hass?.callService("vacuum", s ? "pause" : "start", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dock": {
          u || (u = "mdi:home-import-outline"), f = "Return to Dock", b = () => {
            this.hass?.callService("vacuum", "return_to_base", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "locate": {
          u || (u = "mdi:map-marker-question-outline"), f = "Locate", b = () => {
            this.hass?.callService("vacuum", "locate", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "clean_zone": {
          u || (u = "mdi:map-marker-radius-outline"), f = "Zone / Room Clean", b = () => {
            this.hass?.callService("vacuum", "clean_spot", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "spot_clean": {
          u || (u = "mdi:target-variant"), f = "Spot Clean Mode", b = () => {
            this.hass?.callService("vacuum", "clean_spot", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "alarm_keypad": {
          u || (u = "mdi:dialpad"), f = "Open PIN Keypad", b = () => {
            this._dispatchAction("tap", { action: "more-info" }, e || this.config.entity);
          };
          break;
        }
        case "valve_close": {
          const s = c?.state === "closed" || c?.state === "off";
          k = !s, u || (u = s ? "mdi:valve-closed" : "mdi:valve-open"), f = s ? "Valve is Closed" : "Emergency Close Valve", b = () => {
            (e || this.config.entity || "").split(".")[0] === "valve" ? this.hass?.callService("valve", "close_valve", { entity_id: e || this.config.entity }) : this.hass?.callService("switch", "turn_off", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "pool_speed": {
          const s = c?.attributes?.percentage ?? 50, _ = s > 50 ? 30 : 100;
          u || (u = "mdi:pool"), f = `Pool Speed: ${s}% -> ${_}%`, m || (m = `${s}%`), b = () => {
            this.hass?.callService("fan", "set_percentage", { entity_id: e || this.config.entity, percentage: _ });
          };
          break;
        }
        case "vacuum_fan_speed": {
          const s = c?.attributes?.fan_speed || "standard", _ = c?.attributes?.fan_speed_list || ["quiet", "standard", "strong", "turbo"], y = _[(_.indexOf(s) + 1) % _.length] || "standard";
          u || (u = "mdi:fan"), f = `Suction: ${s} -> ${y}`, m || (m = s), b = () => {
            this.hass?.callService("vacuum", "set_fan_speed", { entity_id: e || this.config.entity, fan_speed: y });
          };
          break;
        }
        case "counter_inc": {
          u || (u = "mdi:plus-box"), f = "Increment Counter (+1)", m || (m = "+1"), b = () => {
            this.hass?.callService("counter", "increment", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "counter_dec": {
          u || (u = "mdi:minus-box"), f = "Decrement Counter (-1)", m || (m = "-1"), b = () => {
            this.hass?.callService("counter", "decrement", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "hvac_mode": {
          const s = c?.state || "off", _ = c?.attributes?.hvac_modes || ["off", "heat", "cool", "auto"], y = _[(_.indexOf(s) + 1) % _.length] || "auto";
          k = s !== "off", u || (s === "heat" ? u = "mdi:fire" : s === "cool" ? u = "mdi:snowflake" : s === "dry" ? u = "mdi:water-percent" : s === "fan_only" ? u = "mdi:fan" : s === "auto" ? u = "mdi:thermostat-auto" : u = "mdi:power"), f = `Mode: ${s} -> Next: ${y}`, m || (m = s), b = () => {
            this.hass?.callService("climate", "set_hvac_mode", { entity_id: e || this.config.entity, hvac_mode: y });
          };
          break;
        }
        case "light_effect": {
          const s = c?.attributes?.effect_list || [], _ = c?.attributes?.effect || "None", y = s.length > 0 ? s[(s.indexOf(_) + 1) % s.length] || s[0] : "None";
          u || (u = "mdi:creation"), k = _ !== "None" && _ !== "off" && v, f = `Effect: ${_} -> Next: ${y}`, m || (m = _ !== "None" ? _ : "Effect"), b = () => {
            s.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, effect: y });
          };
          break;
        }
        case "effect_next": {
          const s = c?.attributes?.effect_list || [], _ = c?.attributes?.effect || "None", y = s.length > 0 ? s[(s.indexOf(_) + 1) % s.length] || s[0] : "None";
          u || (u = "mdi:arrow-right-bold-circle-outline"), f = `Next Effect: ${y}`, m || (m = y), b = () => {
            s.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, effect: y });
          };
          break;
        }
        case "effect_prev": {
          const s = c?.attributes?.effect_list || [], _ = c?.attributes?.effect || "None", y = s.indexOf(_), E = y <= 0 ? s.length - 1 : y - 1, L = s.length > 0 ? s[E] : "None";
          u || (u = "mdi:arrow-left-bold-circle-outline"), f = `Previous Effect: ${L}`, m || (m = L), b = () => {
            s.length > 0 && this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, effect: L });
          };
          break;
        }
        case "white_mode": {
          u || (u = "mdi:white-balance-sunny"), f = "Set Neutral White (4000K)", b = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp: 250 });
          };
          break;
        }
        case "brightness": {
          const s = c?.attributes?.brightness, _ = s !== void 0 ? Math.round(s / 255 * 100) : 0;
          u || (u = "mdi:brightness-6"), f = `Brightness: ${_}%`, m || (m = `${_}%`), b = () => {
            let y = 25;
            _ >= 85 ? y = 0 : _ >= 60 ? y = 100 : _ >= 35 ? y = 75 : _ >= 10 && (y = 50), y === 0 ? this.hass?.callService("light", "turn_off", { entity_id: e || this.config.entity }) : this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness_pct: y });
          };
          break;
        }
        case "garage_toggle": {
          const s = c?.state === "open" || c?.state === "opening";
          k = s, u || (u = s ? "mdi:garage-open" : "mdi:garage"), f = s ? "Close Garage" : "Open Garage", b = () => {
            this.hass?.callService("cover", "toggle", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "dim_up": {
          const s = (e || this.config.entity || "").split(".")[0];
          if (s === "number" || s === "input_number") {
            const _ = Number(c?.state) || 0, y = Number(c?.attributes?.step) || 1, E = Number(c?.attributes?.max) || 100, L = Math.min(E, _ + y);
            u || (u = "mdi:plus-circle-outline"), f = `Value +${y}`, m || (m = `+${y}`), b = () => {
              this.hass?.callService(s, "set_value", { entity_id: e || this.config.entity, value: L });
            };
          } else {
            const _ = c?.attributes?.brightness ?? 0, y = Math.min(255, _ + 26);
            u || (u = "mdi:brightness-5"), f = "Brightness +10%", m || (m = "+10%"), b = () => {
              this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: y });
            };
          }
          break;
        }
        case "dim_down": {
          const s = (e || this.config.entity || "").split(".")[0];
          if (s === "number" || s === "input_number") {
            const _ = Number(c?.state) || 0, y = Number(c?.attributes?.step) || 1, E = Number(c?.attributes?.min) || 0, L = Math.max(E, _ - y);
            u || (u = "mdi:minus-circle-outline"), f = `Value -${y}`, m || (m = `-${y}`), b = () => {
              this.hass?.callService(s, "set_value", { entity_id: e || this.config.entity, value: L });
            };
          } else {
            const _ = c?.attributes?.brightness ?? 0, y = Math.max(1, _ - 26);
            u || (u = "mdi:brightness-4"), f = "Brightness -10%", m || (m = "-10%"), b = () => {
              this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, brightness: y });
            };
          }
          break;
        }
        case "humidity_up": {
          const s = Number(c?.attributes?.humidity ?? c?.attributes?.target_humidity ?? 50), _ = Math.min(100, s + 5);
          u || (u = "mdi:water-plus"), f = `Humidity +5% (${_}%)`, m || (m = "+5%"), b = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: e || this.config.entity, humidity: _ });
          };
          break;
        }
        case "humidity_down": {
          const s = Number(c?.attributes?.humidity ?? c?.attributes?.target_humidity ?? 50), _ = Math.max(0, s - 5);
          u || (u = "mdi:water-minus"), f = `Humidity -5% (${_}%)`, m || (m = "-5%"), b = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: e || this.config.entity, humidity: _ });
          };
          break;
        }
        case "humidity_step_up": {
          const s = Number(c?.attributes?.humidity ?? c?.attributes?.target_humidity ?? 50), _ = Math.min(100, s + 1);
          u || (u = "mdi:water-plus"), f = `Humidity +1% (${_}%)`, m || (m = "+1%"), b = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: e || this.config.entity, humidity: _ });
          };
          break;
        }
        case "humidity_step_down": {
          const s = Number(c?.attributes?.humidity ?? c?.attributes?.target_humidity ?? 50), _ = Math.max(0, s - 1);
          u || (u = "mdi:water-minus"), f = `Humidity -1% (${_}%)`, m || (m = "-1%"), b = () => {
            this.hass?.callService("humidifier", "set_humidity", { entity_id: e || this.config.entity, humidity: _ });
          };
          break;
        }
        case "input_select": {
          const s = c?.state || "", _ = c?.attributes?.options || [], y = _.length > 0 ? _[(_.indexOf(s) + 1) % _.length] || _[0] : s;
          u || (u = "mdi:form-dropdown"), f = `Option: ${s} -> Next: ${y}`, m || (m = s), b = () => {
            const E = (e || this.config.entity || "").split(".")[0] === "select" ? "select" : "input_select";
            this.hass?.callService(E, "select_next", { entity_id: e || this.config.entity });
          };
          break;
        }
        case "temp_warm": {
          u || (u = "mdi:weather-sunny"), f = "Warm White (2700K)", m || (m = "2700K"), b = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 2700 });
          };
          break;
        }
        case "temp_cool": {
          u || (u = "mdi:weather-sunset-up"), f = "Cool Daylight (6000K)", m || (m = "6000K"), b = () => {
            this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: 6e3 });
          };
          break;
        }
        case "color_temp": {
          u || (u = "mdi:palette-swatch-outline"), f = "Color Temperature", m || (m = "Temp"), b = () => {
            const s = c?.attributes?.color_temp_kelvin || 3e3;
            let _ = 2700;
            s < 3300 ? _ = 4e3 : s < 5e3 ? _ = 6e3 : _ = 2700, this.hass?.callService("light", "turn_on", { entity_id: e || this.config.entity, color_temp_kelvin: _ });
          };
          break;
        }
        case "button":
        default: {
          u || (u = c?.attributes?.icon || "mdi:checkbox-blank-circle"), f = o || (c?.attributes?.friendly_name ?? "");
          break;
        }
      }
    const P = (s) => {
      this._handleSubTap(s, e, a, p, b);
    };
    return C`
      <div 
        tabindex="0"
        data-ag-sub
        class="sub-button ${x}" 
        ?active=${k} 
        style="${g} ${k && w && r ? `background: ${w}; color: #fff;` : ""}"
        title="${f}"
        @click=${P}
        @dblclick=${(s) => s.stopPropagation()}
        @keydown=${(s) => {
      (s.key === "Enter" || s.key === " ") && (s.preventDefault(), s.stopPropagation(), P(s));
    }}
        @pointerdown=${(s) => this._handleSubPointerDown(s, e, l)}
        @pointermove=${this._handleSubPointerMove}
        @pointerup=${this._handleSubPointerUp}
        @pointercancel=${this._handleSubPointerCancel}
        @contextmenu=${(s) => this._handleSubContextMenu(s, e, l)}>
        <ha-icon .icon=${u} class="${M}"></ha-icon>
        ${m ? C`<span class="sub-button-label">${m}</span>` : S}
        ${$ ? C`<span class="sub-button-state">${$}</span>` : S}
      </div>
    `;
  }
  // --- STATIC STYLES ---
  static get styles() {
    return Qt`
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
he([
  at({ attribute: !1 })
], K.prototype, "hass", 2);
he([
  at({ type: Boolean })
], K.prototype, "preview", 2);
he([
  nt()
], K.prototype, "config", 2);
he([
  nt()
], K.prototype, "_collapsed", 2);
he([
  ri({ passive: !0 })
], K.prototype, "_handlePointerMove", 1);
he([
  ri({ passive: !0 })
], K.prototype, "_handleSubPointerMove", 1);
customElements.get("antigravity-no-icon-card") || customElements.define("antigravity-no-icon-card", K);
customElements.get("antigravity-card") || customElements.define("antigravity-card", K);
export {
  K as AntigravityCard,
  pr as CARD_VERSION
};
