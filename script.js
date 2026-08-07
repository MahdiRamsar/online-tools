/* ============================================================
   Smart Tools — Vanilla JS
   Bilingual (FA/EN) online tools, fully static, no framework.
   ============================================================ */

(function () {
  "use strict";

  /* ===== State ===== */
  let translations = {};
  let currentLang = localStorage.getItem("lang") || "fa";
  let currentTool = "home";

  /* ===== Tool registry for SEO & home grid ===== */
  const tools = [
    { id: "calculator",  icon: "🔢", seoKey: "seo_calc_title",    descKey: "tool_calc_desc" },
    { id: "date",        icon: "📅", seoKey: "seo_date_title",    descKey: "tool_date_desc" },
    { id: "password",    icon: "🔐", seoKey: "seo_pwd_title",     descKey: "tool_pwd_desc" },
    { id: "units",       icon: "📏", seoKey: "seo_units_title",   descKey: "tool_units_desc" },
    { id: "counter",     icon: "📝", seoKey: "seo_counter_title", descKey: "tool_counter_desc" },
    { id: "qr",          icon: "📱", seoKey: "seo_qr_title",      descKey: "tool_qr_desc" },
    { id: "n2w",         icon: "🔢", seoKey: "seo_n2w_title",     descKey: "tool_n2w_desc" },
    { id: "ocr",         icon: "🔍", seoKey: "seo_ocr_title",     descKey: "tool_ocr_desc" },
    { id: "imgconvert",  icon: "🖼️", seoKey: "seo_imgconv_title", descKey: "tool_imgconv_desc" },
    { id: "pdf",         icon: "📄", seoKey: "seo_pdf_title",     descKey: "tool_pdf_desc" },
    { id: "data",        icon: "🔄", seoKey: "seo_data_title",    descKey: "tool_data_desc" },
    { id: "heic",        icon: "📷", seoKey: "seo_heic_title",    descKey: "tool_heic_desc" },
    { id: "video2gif",   icon: "🎬", seoKey: "seo_vid_title",     descKey: "tool_vid_desc" }
  ];

  /* ===== Toast ===== */
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = '1');
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ===== i18n =========================================================== */

  async function loadTranslations() {
    try {
      const res = await fetch("translations.json");
      if (!res.ok) throw new Error("HTTP " + res.status);
      translations = await res.json();
    } catch (e) {
      console.error("Failed to load translations:", e);
    }
  }

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || key;
  }

  function applyTranslations() {
    document.querySelectorAll("[data-lang-key]").forEach(function (el) {
      const key = el.getAttribute("data-lang-key");
      const val = t(key);
      if (val && val !== key) {
        if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
          el.setAttribute("placeholder", val);
        } else if (el.tagName === "INPUT" && el.hasAttribute("data-lang-key") && el.type !== "button") {
          // leave value fields alone unless they're placeholders
        } else {
          el.textContent = val;
        }
      }
    });
    // Update lang/dir
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "fa" ? "rtl" : "ltr";
    // Active language button
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
    });
    // Rebuild dynamic selects
    populateMonthSelects();
    populateUnitSelects();
    buildHomeGrid();
    updateSEO(currentTool);
  }

  function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", currentLang);
    applyTranslations();
    showToast(t('lang_switched') || 'زبان تغییر کرد', 'info');
  }

  /* ===== Theme ========================================================== */

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
    showToast(next === 'dark' ? 'تم تاریک فعال شد' : 'تم روشن فعال شد', 'info');
  }

  function setAutoTheme() {
    const hour = new Date().getHours();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = (hour >= 19 || hour < 6) ? 'dark' : 'light';
    const saved = localStorage.getItem('theme');
    if (saved) {
      applyTheme(saved);
    } else {
      applyTheme(prefersDark ? 'dark' : theme);
    }
  }

  /* ===== Navigation ===================================================== */

  function showTool(toolId) {
    currentTool = toolId;
    document.querySelectorAll(".tool-section").forEach(function (s) {
      s.classList.toggle("active", s.id === "section-" + toolId);
    });
    document.querySelectorAll(".nav-item").forEach(function (n) {
      n.classList.toggle("active", n.getAttribute("data-tool") === toolId);
    });
    updateSEO(toolId);
    window.scrollTo(0, 0);
    // Close mobile menu
    const nav = document.getElementById("mainNav");
    const toggle = document.getElementById("menuToggle");
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    // Save last tool
    localStorage.setItem('lastTool', toolId);
  }

  function updateSEO(toolId) {
    const titleEl = document.querySelector("title");
    const descEl = document.querySelector('meta[name="description"]');
    if (toolId === "home") {
      titleEl.textContent = t("seo_home_title");
      descEl.setAttribute("content", t("seo_home_desc"));
    } else {
      const tool = tools.find(function (x) { return x.id === toolId; });
      if (tool) {
        titleEl.textContent = t(tool.seoKey);
        const descKey = tool.seoKey.replace("_title", "_desc");
        descEl.setAttribute("content", t(descKey));
      }
    }
  }

  /* ===== Home grid ====================================================== */

  function buildHomeGrid() {
    const grid = document.getElementById("homeGrid");
    if (!grid) return;
    grid.innerHTML = "";
    tools.forEach(function (tool) {
      const card = document.createElement("div");
      card.className = "home-card";
      card.setAttribute("data-tool", tool.id);
      card.innerHTML =
        '<span class="hc-icon">' + tool.icon + "</span>" +
        '<div class="hc-title">' + t("nav_" + tool.id) + "</div>" +
        '<div class="hc-desc">' + t(tool.descKey) + "</div>";
      card.addEventListener("click", function () { showTool(tool.id); });
      grid.appendChild(card);
    });
  }

  /* ===== 1. Calculator ================================================== */

  function initCalculator() {
    const display = document.getElementById("calcDisplay");
    const history = document.getElementById("calcHistory");
    let current = "0";
    let prev = null;
    let op = null;
    let justEvaluated = false;

    function render() { display.textContent = current; }

    function inputNum(n) {
      if (justEvaluated) { current = "0"; justEvaluated = false; }
      if (current === "0") current = n;
      else current += n;
      render();
    }

    function inputDot() {
      if (justEvaluated) { current = "0"; justEvaluated = false; }
      if (current.indexOf(".") === -1) current += ".";
      render();
    }

    function setOp(nextOp) {
      if (op && !justEvaluated) { doEquals(); }
      prev = parseFloat(current);
      op = nextOp;
      justEvaluated = true;
      const sym = { "+": "+", "-": "−", "*": "×", "/": "÷" }[nextOp] || nextOp;
      history.textContent = prev + " " + sym;
    }

    function doEquals() {
      if (op === null || prev === null) return;
      const next = parseFloat(current);
      let result;
      switch (op) {
        case "+": result = prev + next; break;
        case "-": result = prev - next; break;
        case "*": result = prev * next; break;
        case "/": result = next === 0 ? 0 : prev / next; break;
        default: return;
      }
      result = Math.round(result * 1e10) / 1e10;
      history.textContent = prev + " " + ({ "+": "+", "-": "−", "*": "×", "/": "÷" }[op]) + " " + next + " =";
      current = String(result);
      prev = null;
      op = null;
      justEvaluated = true;
      render();
    }

    function clearAll() { current = "0"; prev = null; op = null; justEvaluated = false; history.textContent = t("calc_history"); render(); }
    function backspace() { if (current.length > 1) current = current.slice(0, -1); else current = "0"; render(); }
    function percent() { current = String(parseFloat(current) / 100); render(); }

    document.getElementById("calcButtons").addEventListener("click", function (e) {
      const btn = e.target.closest(".calc-btn");
      if (!btn) return;
      if (btn.dataset.num !== undefined) { inputNum(btn.dataset.num); return; }
      const action = btn.dataset.action;
      if (action === "dot") inputDot();
      else if (action === "clear") clearAll();
      else if (action === "back") backspace();
      else if (action === "percent") percent();
      else if (action === "equals") doEquals();
      if (btn.dataset.op !== undefined) setOp(btn.dataset.op);
    });

    // Keyboard support
    document.addEventListener("keydown", function (e) {
      if (currentTool !== "calculator") return;
      const k = e.key;
      if (/^[0-9]$/.test(k)) inputNum(k);
      else if (k === ".") inputDot();
      else if (k === "+" || k === "-" || k === "*" || k === "/") setOp(k);
      else if (k === "Enter" || k === "=") { e.preventDefault(); doEquals(); }
      else if (k === "Backspace") backspace();
      else if (k === "Escape") clearAll();
      else if (k === "%") percent();
    });
  }

  /* ===== 2. Date Converter (Jalali <-> Gregorian) ======================= */

  // Jalali month names (Persian)
  const jalaliMonthsFa = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
  const gregorianMonthsEn = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  function div(a, b) { return Math.floor(a / b); }

  function jalaliToGregorian(jy, jm, jd) {
    jy = jy - 979;
    let gy = (jy > 0) ? 1600 : 1599;
    const days = (365 * jy) + (div(jy, 33) * 8) + div((jy % 33) + 3, 4) + 78 + jd + (jm < 7 ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * div(days, 146097);
    let rem = days % 146097;
    if (rem > 36524) { gy += 100 * div(--rem, 36524); rem = rem % 36524; }
    gy += 4 * div(rem, 1461);
    rem = rem % 1461;
    if (rem > 365) { gy += div(rem - 1, 365); rem = (rem - 1) % 365; }
    let sal_a = rem + 1;
    const g_d_m = [0,31,((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)?29:28,31,30,31,30,31,31,30,31,30,31];
    let gm = 0, gd = 0;
    for (gm = 0; gm < 13; gm++) { if (sal_a <= g_d_m[gm]) break; sal_a -= g_d_m[gm]; }
    gd = sal_a;
    return { y: gy, m: gm, d: gd };
  }

  function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0,31,((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)?29:28,31,30,31,30,31,31,30,31,30,31];
    let jy = (gy <= 1600) ? 0 : 979;
    let days = gd + (gy > 1600 ? (gy - 1601) * 365 + div(gy - 1601, 4) - div(gy - 1601, 100) + div(gy - 1601, 400) : 0);
    for (let i = 1; i < gm; i++) { days += g_d_m[i]; }
    gy = (gy <= 1600) ? gy - 621 : gy - 1600;
    days += 365 * gy + div(gy, 33) * 8 + div((gy % 33) + 3, 4);
    let jy2 = (jy === 0) ? 979 + div(days, 12053) : jy + div(days, 12053);
    days = days % 12053;
    jy = jy2;
    const jm = (days < 186) ? 1 + div(days, 31) : 7 + div(days - 186, 30);
    const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return { y: jy, m: jm, d: jd };
  }

  function isLeapJalali(jy) {
    const breaks = [-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2132,2174,2312,2412,2535,2608];
    let jp = breaks[0], jm = breaks[0], jump = 0;
    for (let i = 1; i <= 19; i++) { jm = breaks[i]; jump = jm - jp; if (jy < jm) break; jp = jm; }
    let n = jy - jp;
    if (n < jump) { if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33; let leap = div(n + 1, 4) - div(n + 4, 33); if ((n + 1) % 4 === 0 && ((n + 1) % 33) % 4 !== 0) leap++; return leap > 0; }
    return false;
  }

  function populateMonthSelects() {
    const jSel = document.getElementById("jMonth");
    const gSel = document.getElementById("gMonth");
    if (!jSel || !gSel) return;
    const jPrev = jSel.selectedIndex;
    const gPrev = gSel.selectedIndex;
    jSel.innerHTML = "";
    gSel.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      jSel.appendChild(new Option(jalaliMonthsFa[i], i + 1));
      gSel.appendChild(new Option(gregorianMonthsEn[i], i + 1));
    }
    if (jPrev >= 0) jSel.selectedIndex = jPrev; else jSel.selectedIndex = 0;
    if (gPrev >= 0) gSel.selectedIndex = gPrev; else gSel.selectedIndex = 0;
  }

  function initDateConverter() {
    document.getElementById("jToG").addEventListener("click", function () {
      const y = parseInt(document.getElementById("jYear").value, 10);
      const m = parseInt(document.getElementById("jMonth").value, 10);
      const d = parseInt(document.getElementById("jDay").value, 10);
      if (!y || !m || !d) { document.getElementById("dateResult").textContent = t("err_number"); return; }
      const r = jalaliToGregorian(y, m, d);
      document.getElementById("dateResult").textContent =
        r.d + " " + gregorianMonthsEn[r.m - 1] + " " + r.y +
        "  (" + r.y + "/" + String(r.m).padStart(2,"0") + "/" + String(r.d).padStart(2,"0") + ")";
    });
    document.getElementById("gToJ").addEventListener("click", function () {
      const y = parseInt(document.getElementById("gYear").value, 10);
      const m = parseInt(document.getElementById("gMonth").value, 10);
      const d = parseInt(document.getElementById("gDay").value, 10);
      if (!y || !m || !d) { document.getElementById("dateResult").textContent = t("err_number"); return; }
      const r = gregorianToJalali(y, m, d);
      document.getElementById("dateResult").textContent =
        r.d + " " + jalaliMonthsFa[r.m - 1] + " " + r.y +
        "  (" + r.y + "/" + String(r.m).padStart(2,"0") + "/" + String(r.d).padStart(2,"0") + ")";
    });
  }

  /* ===== 3. Password Generator ========================================== */

  function initPasswordGenerator() {
    const lenSlider = document.getElementById("pwdLen");
    const lenVal = document.getElementById("pwdLenVal");
    const output = document.getElementById("pwdOutput");
    const bar = document.getElementById("pwdBar");
    const strengthText = document.getElementById("pwdStrengthText");

    lenSlider.addEventListener("input", function () { lenVal.textContent = lenSlider.value; });

    function generate() {
      const len = parseInt(lenSlider.value, 10);
      let charset = "";
      if (document.getElementById("pwdUpper").checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (document.getElementById("pwdLower").checked) charset += "abcdefghijklmnopqrstuvwxyz";
      if (document.getElementById("pwdNum").checked) charset += "0123456789";
      if (document.getElementById("pwdSym").checked) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
      if (!charset) { output.value = ""; return; }
      const arr = new Uint32Array(len);
      crypto.getRandomValues(arr);
      let pwd = "";
      for (let i = 0; i < len; i++) pwd += charset[arr[i] % charset.length];
      output.value = pwd;
      updateStrength(pwd);
    }

    function updateStrength(pwd) {
      let score = 0;
      if (pwd.length >= 8) score++;
      if (pwd.length >= 12) score++;
      if (pwd.length >= 16) score++;
      if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
      if (/[0-9]/.test(pwd)) score++;
      if (/[^a-zA-Z0-9]/.test(pwd)) score++;
      let pct, color, label;
      if (score <= 2) { pct = 33; color = "var(--error)"; label = t("strength_weak"); }
      else if (score <= 4) { pct = 66; color = "var(--warning)"; label = t("strength_medium"); }
      else { pct = 100; color = "var(--success)"; label = t("strength_strong"); }
      bar.style.width = pct + "%";
      bar.style.background = color;
      strengthText.textContent = label;
      strengthText.style.color = color;
    }

    document.getElementById("pwdGen").addEventListener("click", generate);
    document.getElementById("pwdCopy").addEventListener("click", function () {
      if (output.value) { navigator.clipboard.writeText(output.value); flashCopy(this); }
    });
    generate();
  }

  /* ===== 4. Unit Converter ============================================== */

  const unitData = {
    length: {
      units: { "units_meter": 1, "units_foot": 3.28084, "units_cm": 100, "units_inch": 39.3701, "units_km": 0.001, "units_mile": 0.000621371 },
      base: 1 // meter
    },
    weight: {
      units: { "units_kg": 1, "units_lb": 2.20462, "units_gram": 1000, "units_oz": 35.274 },
      base: 1 // kg
    }
  };
  let currentUTab = "length";

  function populateUnitSelects() {
    const from = document.getElementById("unitFrom");
    const to = document.getElementById("unitTo");
    if (!from || !to) return;
    const data = unitData[currentUTab];
    const fPrev = from.selectedIndex, tPrev = to.selectedIndex;
    from.innerHTML = ""; to.innerHTML = "";
    Object.keys(data.units).forEach(function (key) {
      from.appendChild(new Option(t(key), key));
      to.appendChild(new Option(t(key), key));
    });
    from.selectedIndex = fPrev >= 0 ? fPrev : 0;
    to.selectedIndex = tPrev >= 0 ? tPrev : 1;
    convertUnits();
  }

  function convertUnits() {
    const input = parseFloat(document.getElementById("unitInput").value);
    const fromKey = document.getElementById("unitFrom").value;
    const toKey = document.getElementById("unitTo").value;
    if (isNaN(input)) { document.getElementById("unitOutput").value = ""; return; }
    const data = unitData[currentUTab];
    // convert input -> base, then base -> output
    const inFactor = data.units[fromKey];
    const outFactor = data.units[toKey];
    const baseVal = input / inFactor;
    const result = baseVal * outFactor;
    document.getElementById("unitOutput").value = (Math.round(result * 1000) / 1000).toString();
  }

  function initUnitConverter() {
    document.querySelectorAll(".unit-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".unit-tab").forEach(function (x) { x.classList.remove("active"); });
        tab.classList.add("active");
        currentUTab = tab.getAttribute("data-utab");
        populateUnitSelects();
      });
    });
    document.getElementById("unitInput").addEventListener("input", convertUnits);
    document.getElementById("unitFrom").addEventListener("change", convertUnits);
    document.getElementById("unitTo").addEventListener("change", convertUnits);
  }

  /* ===== 5. Text Counter ================================================ */

  function initCounter() {
    const textarea = document.getElementById("counterText");
    textarea.addEventListener("input", function () {
      const text = textarea.value;
      const chars = text.length;
      const charsNs = text.replace(/\s/g, "").length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const sentences = text.trim() ? (text.match(/[.!?。]+/g) || []).length || (words > 0 ? 1 : 0) : 0;
      const paragraphs = text.trim() ? text.split(/\n+/).filter(function (p) { return p.trim(); }).length : 0;
      document.getElementById("statChars").textContent = chars;
      document.getElementById("statCharsNs").textContent = charsNs;
      document.getElementById("statWords").textContent = words;
      document.getElementById("statSentences").textContent = sentences;
      document.getElementById("statParagraphs").textContent = paragraphs;
    });
  }

  /* ===== 6. QR Code Generator (pure JS, no library) ===================== */

  function initQR() {
    document.getElementById("qrGen").addEventListener("click", generateQR);
    document.getElementById("qrDownload").addEventListener("click", function () {
      const canvas = document.getElementById("qrCanvas");
      const a = document.createElement("a");
      a.download = "qr-code.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    });
  }

  // Minimal QR Code generator (Version 1-10, byte mode, L correction)
  // Based on the QR Code standard (ISO/IEC 18004). Self-contained, no deps.
  // Supports up to ~213 alphanumeric/154 byte chars at version 10-L.

  /* --- QR core implementation --- */
  // (embedded compact QR encoder)
  var QRCode = (function () {
    // GF(256) tables
    var EXP = new Array(256), LOG = new Array(256);
    (function () {
      var x = 1;
      for (var i = 0; i < 256; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 0x100) x ^= 0x11d; }
    })();
    function gmul(a, b) { if (a === 0 || b === 0) return 0; return EXP[(LOG[a] + LOG[b]) % 255]; }

    // Galois polynomial division for Reed-Solomon
    function rsGenPoly(deg) {
      var poly = [1];
      for (var i = 0; i < deg; i++) {
        var newPoly = new Array(poly.length + 1).fill(0);
        for (var j = 0; j < poly.length; j++) {
          newPoly[j] ^= poly[j];
          newPoly[j + 1] ^= gmul(poly[j], EXP[i]);
        }
        poly = newPoly;
      }
      return poly;
    }
    function rsEncode(data, ecLen) {
      var gen = rsGenPoly(ecLen);
      var result = data.concat(new Array(ecLen).fill(0));
      for (var i = 0; i < data.length; i++) {
        var coef = result[i];
        if (coef === 0) continue;
        for (var j = 1; j < gen.length; j++) { result[i + j] ^= gmul(gen[j], coef); }
      }
      return result.slice(data.length);
    }

    // Version data: [version, totalCodewords, ecCodewordsPerBlock, numBlocksGroup1, dataCodewordsPerBlockG1, numBlocksGroup2, dataCodewordsPerBlockG2]
    // For EC level L only.
    var versions = {
      1:[1,26,7,1,19,0,0], 2:[2,44,10,1,34,0,0], 3:[3,70,15,1,55,0,0],
      4:[4,100,20,1,80,0,0], 5:[5,134,26,1,108,0,0], 6:[6,172,36,2,68,0,0],
      7:[7,196,40,2,78,0,0], 8:[8,242,48,2,97,0,0], 9:[9,292,60,2,116,0,0],
      10:[10,346,72,2,130,2,131]
    };

    function selectVersion(byteLen) {
      // byte mode: 4 bits mode + 8/16 bits length + data
      for (var v = 1; v <= 10; v++) {
        var d = versions[v];
        var dataCap = d[3]*d[4] + d[5]*d[6];
        var lenBits = v <= 9 ? 8 : 16;
        if (byteLen + Math.ceil((4 + lenBits) / 8) <= dataCap) return v;
      }
      return -1;
    }

    function buildMatrix(version, finalBits) {
      var size = 17 + 4 * version;
      var m = [];
      for (var i = 0; i < size; i++) m.push(new Array(size).fill(null));

      // Finder patterns
      function placeFinder(r, c) {
        for (var dr = -1; dr <= 7; dr++) for (var dc = -1; dc <= 7; dc++) {
          var rr = r + dr, cc = c + dc;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          if (dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6) {
            var border = (dr === 0 || dr === 6 || dc === 0 || dc === 6);
            var center = (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
            m[rr][cc] = (border || center) ? 1 : 0;
          } else { m[rr][cc] = 0; }
        }
      }
      placeFinder(0, 0); placeFinder(0, size - 7); placeFinder(size - 7, 0);

      // Alignment patterns (versions 2-10)
      var alignPos = {
        2:[6,18], 3:[6,22], 4:[6,26], 5:[6,30], 6:[6,34],
        7:[6,22,38], 8:[6,24,42], 9:[6,26,46], 10:[6,28,50]
      };
      if (version >= 2) {
        var pos = alignPos[version];
        for (var i = 0; i < pos.length; i++) for (var j = 0; j < pos.length; j++) {
          if ((i === 0 && j === 0) || (i === 0 && j === pos.length-1) || (i === pos.length-1 && j === 0)) continue;
          var r = pos[i], c = pos[j];
          for (var dr = -2; dr <= 2; dr++) for (var dc = -2; dc <= 2; dc++) {
            var border = (Math.abs(dr) === 2 || Math.abs(dc) === 2);
            var center = (dr === 0 && dc === 0);
            m[r+dr][c+dc] = (border || center) ? 1 : 0;
          }
        }
      }

      // Timing patterns
      for (var i = 8; i < size - 8; i++) { m[6][i] = (i % 2 === 0) ? 1 : 0; m[i][6] = (i % 2 === 0) ? 1 : 0; }

      // Dark module
      m[size - 8][8] = 1;

      // Format info placeholders (will be filled)
      for (var i = 0; i < 9; i++) {
        if (m[8][i] === null && i !== 6) m[8][i] = 0;
        if (m[i][8] === null && i !== 6) m[i][8] = 0;
      }
      for (var i = 0; i < 8; i++) {
        if (m[8][size - 1 - i] === null) m[8][size - 1 - i] = 0;
        if (m[size - 1 - i][8] === null) m[size - 1 - i][8] = 0;
      }

      // Place data bits
      var bitIdx = 0;
      var upward = true;
      for (var col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--; // skip timing column
        for (var i = 0; i < size; i++) {
          var row = upward ? (size - 1 - i) : i;
          for (var j = 0; j < 2; j++) {
            var c = col - j;
            if (m[row][c] === null) {
              var bit = 0;
              if (bitIdx < finalBits.length) bit = finalBits[bitIdx++];
              m[row][c] = bit;
            }
          }
        }
        upward = !upward;
      }

      // Apply mask pattern 0 (i+j) % 2 === 0
      function mask(r, c) { return ((r + c) % 2) === 0; }
      for (var r = 0; r < size; r++) for (var c = 0; c < size; c++) {
        if (m[r][c] === null) continue;
        // Don't mask function patterns — check if it's a data module
        // Simple approach: mask everything then re-place function patterns
      }

      // Better: re-derive function modules and only mask data
      // For simplicity, we mask all non-null then restore function patterns
      // Actually let's do it properly — track which are data
      // (Rebuild with mask applied during placement)
      // For now, re-place with mask:
      var m2 = [];
      for (var i = 0; i < size; i++) { m2.push(new Array(size).fill(null)); }
      // Copy function pattern positions
      for (var r = 0; r < size; r++) for (var c = 0; c < size; c++) {
        // Function patterns are already set (not null) in m
        // We need to know which are data — redo placement
      }
      // Simplified: just use m with mask applied only to data modules
      // Re-identify data modules by re-running placement logic
      // Rebuild matrix properly:
      m2 = buildWithMask(version, finalBits, mask);
      return m2;
    }

    function buildWithMask(version, finalBits, maskFn) {
      var size = 17 + 4 * version;
      var m = [];
      for (var i = 0; i < size; i++) m.push(new Array(size).fill(null));

      function placeFinder(r, c) {
        for (var dr = -1; dr <= 7; dr++) for (var dc = -1; dc <= 7; dc++) {
          var rr = r + dr, cc = c + dc;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          if (dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6) {
            var border = (dr === 0 || dr === 6 || dc === 0 || dc === 6);
            var center = (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
            m[rr][cc] = (border || center) ? 1 : 0;
          } else { m[rr][cc] = 0; }
        }
      }
      placeFinder(0, 0); placeFinder(0, size - 7); placeFinder(size - 7, 0);

      if (version >= 2) {
        var alignPos = {2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34],7:[6,22,38],8:[6,24,42],9:[6,26,46],10:[6,28,50]};
        var pos = alignPos[version];
        for (var i = 0; i < pos.length; i++) for (var j = 0; j < pos.length; j++) {
          if ((i===0&&j===0)||(i===0&&j===pos.length-1)||(i===pos.length-1&&j===0)) continue;
          var r = pos[i], c = pos[j];
          for (var dr = -2; dr <= 2; dr++) for (var dc = -2; dc <= 2; dc++) {
            var border = (Math.abs(dr)===2||Math.abs(dc)===2);
            var center = (dr===0&&dc===0);
            m[r+dr][c+dc] = (border||center)?1:0;
          }
        }
      }
      for (var i = 8; i < size - 8; i++) { m[6][i] = (i%2===0)?1:0; m[i][6] = (i%2===0)?1:0; }
      m[size-8][8] = 1;

      // Mark format info areas as reserved (non-data)
      var reserved = [];
      for (var i = 0; i < 9; i++) { if (i !== 6) { reserved.push([8, i]); reserved.push([i, 8]); } }
      for (var i = 0; i < 8; i++) { reserved.push([8, size-1-i]); reserved.push([size-1-i, 8]); }
      var resSet = {};
      reserved.forEach(function (p) { resSet[p[0]+","+p[1]] = true; });

      // Place data with mask
      var bitIdx = 0;
      var upward = true;
      for (var col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        for (var i = 0; i < size; i++) {
          var row = upward ? (size-1-i) : i;
          for (var j = 0; j < 2; j++) {
            var c = col - j;
            if (m[row][c] === null && !resSet[row+","+c]) {
              var bit = 0;
              if (bitIdx < finalBits.length) bit = finalBits[bitIdx++];
              if (maskFn(row, c)) bit = bit ^ 1;
              m[row][c] = bit;
            }
          }
        }
        upward = !upward;
      }

      // Format info for EC level L, mask 0
      // Format bits: 01 (L) + 000 (mask 0) = 01000, XOR with 0x5412
      var formatBits = 0x5412 ^ 0b01000; // 1010100000100101
      for (var i = 0; i < 15; i++) {
        var bit = (formatBits >> (14 - i)) & 1;
        // Place around top-left
        if (i < 6) m[8][i] = bit;
        else if (i < 8) m[8][i + 1] = bit;
        else if (i < 9) m[7][8] = bit;
        else m[14 - i][8] = bit;
        // Place around top-right and bottom-left
        if (i < 8) m[size - 1 - i][8] = bit;
        else m[8][size - 15 + i] = bit;
      }

      return m;
    }

    function generate(text) {
      var bytes = [];
      for (var i = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);
        if (c < 128) bytes.push(c);
        else if (c < 2048) { bytes.push(0xc0 | (c >> 6)); bytes.push(0x80 | (c & 0x3f)); }
        else { bytes.push(0xe0 | (c >> 12)); bytes.push(0x80 | ((c >> 6) & 0x3f)); bytes.push(0x80 | (c & 0x3f)); }
      }
      var version = selectVersion(bytes.length);
      if (version < 0) return null;

      var vd = versions[version];
      var dataCap = vd[3]*vd[4] + vd[5]*vd[6];
      var totalCodewords = vd[1];
      var ecLen = vd[2];

      // Build bit stream
      var bits = [];
      function pushBits(val, len) { for (var i = len - 1; i >= 0; i--) bits.push((val >> i) & 1); }
      pushBits(0b0100, 4); // byte mode
      var lenBits = version <= 9 ? 8 : 16;
      pushBits(bytes.length, lenBits);
      for (var i = 0; i < bytes.length; i++) pushBits(bytes[i], 8);

      // Add terminator (up to 4 zero bits)
      var targetBits = dataCap * 8;
      while (bits.length < targetBits && bits.length < targetBits + 4) bits.push(0);

      // Pad to byte boundary
      while (bits.length % 8 !== 0) bits.push(0);

      // Convert to bytes
      var dataBytes = [];
      for (var i = 0; i < bits.length; i += 8) {
        var b = 0;
        for (var j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
        dataBytes.push(b);
      }

      // Pad bytes
      var padBytes = [0xEC, 0x11];
      var pi = 0;
      while (dataBytes.length < dataCap) { dataBytes.push(padBytes[pi % 2]); pi++; }

      // Split into blocks
      var blocks = [];
      var idx = 0;
      for (var g = 0; g < vd[3]; g++) { blocks.push(dataBytes.slice(idx, idx + vd[4])); idx += vd[4]; }
      for (var g = 0; g < vd[5]; g++) { blocks.push(dataBytes.slice(idx, idx + vd[6])); idx += vd[6]; }

      // Generate EC for each block
      var ecBlocks = blocks.map(function (b) { return rsEncode(b, ecLen); });

      // Interleave data
      var maxData = Math.max.apply(null, blocks.map(function (b) { return b.length; }));
      var interleaved = [];
      for (var i = 0; i < maxData; i++) for (var b = 0; b < blocks.length; b++) if (i < blocks[b].length) interleaved.push(blocks[b][i]);
      // Interleave EC
      for (var i = 0; i < ecLen; i++) for (var b = 0; b < ecBlocks.length; b++) interleaved.push(ecBlocks[b][i]);

      // Convert to bits
      var finalBits = [];
      for (var i = 0; i < interleaved.length; i++) for (var j = 7; j >= 0; j--) finalBits.push((interleaved[i] >> j) & 1);

      var matrix = buildWithMask(version, finalBits, function (r, c) { return ((r + c) % 2) === 0; });
      return matrix;
    }

    return { generate: generate };
  })();

  function generateQR() {
    const text = document.getElementById("qrInput").value.trim();
    const canvas = document.getElementById("qrCanvas");
    const ctx = canvas.getContext("2d");
    if (!text) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    const matrix = QRCode.generate(text);
    if (!matrix) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    const size = matrix.length;
    const cellSize = Math.floor(canvas.width / (size + 2));
    const offset = Math.floor((canvas.width - cellSize * size) / 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
      if (matrix[r][c]) ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize, cellSize);
    }
  }

  /* ===== 7. Number to Words (Persian) =================================== */

  function numberToPersianWords(num) {
    if (num === 0) return "صفر";
    const onesFa = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
    const tensFa = ["", "ده", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
    const teensFa = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
    const scalesFa = ["", "هزار", "میلیون", "میلیارد", "هزار میلیارد"];

    function threeDigits(n) {
      let result = "";
      const h = Math.floor(n / 100);
      const rem = n % 100;
      const t = Math.floor(rem / 10);
      const o = rem % 10;
      if (h > 0) result += onesFa[h] + " صد";
      if (rem > 0) {
        if (result) result += " و ";
        if (rem < 10) result += onesFa[rem];
        else if (rem < 20) result += teensFa[rem - 10];
        else result += tensFa[t] + (o > 0 ? " و " + onesFa[o] : "");
      }
      return result;
    }

    if (num < 0) return "منفی " + numberToPersianWords(-num);
    let result = "";
    let scaleIdx = 0;
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk > 0) {
        const chunkWords = threeDigits(chunk);
        result = chunkWords + (scalesFa[scaleIdx] ? " " + scalesFa[scaleIdx] : "") + (result ? " و " + result : "");
      }
      num = Math.floor(num / 1000);
      scaleIdx++;
    }
    return result;
  }

  function initNumberToWords() {
    document.getElementById("n2wInput").addEventListener("input", function () {
      const val = parseInt(this.value, 10);
      const result = document.getElementById("n2wResult");
      if (isNaN(val) || this.value.trim() === "") { result.textContent = ""; return; }
      if (this.value.replace("-", "").length > 12) { result.textContent = "حداکثر ۱۲ رقم"; return; }
      result.textContent = numberToPersianWords(val);
    });
  }

  /* ===== 8. OCR (Tesseract.js via CDN) ================================== */

  function cleanPersianOCR(text) {
    // حذف کاراکترهای غیرفارسی (به جز اعداد و علائم نگارشی)
    let cleaned = text.replace(/[^\u0600-\u06FF\uFB8A\u067E\u0686\u0698\u06AF\u200C\s\n\d،؛؟.!?]/g, ' ');
    // اصلاح فاصله‌های اضافی
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
  }

  function initOCR() {
    const dz = document.getElementById("ocrDropzone");
    const fileInput = document.getElementById("ocrFile");
    setupDropzone(dz, fileInput, function (file) {
      if (!file || !file.type.startsWith("image/")) return;
      runOCR(file);
    });
    document.getElementById("ocrCopy").addEventListener("click", function () {
      const ta = document.getElementById("ocrResult");
      if (ta.value) { navigator.clipboard.writeText(ta.value); flashCopy(this); }
    });
  }

  function runOCR(file) {
    const spinner = document.getElementById("ocrSpinner");
    const result = document.getElementById("ocrResult");
    const preview = document.getElementById("ocrPreview");
    spinner.classList.remove("hidden");
    result.value = "";
    preview.innerHTML = "";
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = "OCR preview";
    preview.appendChild(img);

    // Load Tesseract.js from CDN (cdnjs)
    if (typeof Tesseract === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js";
      script.onload = function () { doOCR(file); };
      script.onerror = function () { spinner.classList.add("hidden"); result.value = "Error loading OCR library."; };
      document.head.appendChild(script);
    } else {
      doOCR(file);
    }
  }

  function doOCR(file) {
    const spinner = document.getElementById("ocrSpinner");
    const result = document.getElementById("ocrResult");
    const progress = document.createElement("div");
    progress.id = "ocrProgress";
    progress.style.cssText = "width:100%; height:4px; background:#e2e8f0; border-radius:4px; margin:8px 0; overflow:hidden;";
    const bar = document.createElement("div");
    bar.style.cssText = "height:100%; width:0%; background:linear-gradient(90deg, #2563eb, #06b6d4); transition:width 0.3s;";
    progress.appendChild(bar);
    result.parentNode.insertBefore(progress, result);

    Tesseract.recognize(
      file,
      'fas',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const pct = Math.round(m.progress * 100);
            bar.style.width = pct + '%';
          }
        },
        tessedit_pageseg_mode: '6',
        tessedit_char_whitelist: 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی‌ءآأؤئ',
        tessedit_ocr_engine_mode: '3'
      }
    )
    .then((res) => {
      const raw = res.data.text;
      const cleaned = cleanPersianOCR(raw);
      result.value = cleaned;
      showToast('متن با موفقیت استخراج شد', 'success');
    })
    .catch((e) => {
      result.value = "خطا: " + e.message;
      showToast('خطا در OCR: ' + e.message, 'error');
    })
    .finally(() => {
      spinner.classList.add("hidden");
      progress.remove();
    });
  }

  /* ===== 9. Image Format Converter (Canvas API) ========================= */

  function initImageConverter() {
    let currentFile = null;
    const dz = document.getElementById("imgConvDropzone");
    const fileInput = document.getElementById("imgConvFile");
    const preview = document.getElementById("imgConvPreview");

    setupDropzone(dz, fileInput, function (file) {
      if (!file || !file.type.startsWith("image/")) return;
      currentFile = file;
      preview.innerHTML = "";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.alt = "preview";
      preview.appendChild(img);
    });

    document.getElementById("imgConvBtn").addEventListener("click", function () {
      if (!currentFile) { showToast(t("err_no_file"), 'error'); return; }
      const format = document.getElementById("imgConvFormat").value;
      const result = document.getElementById("imgConvResult");
      result.innerHTML = "";
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const ext = format === "image/jpeg" ? "jpg" : format.split("/")[1];
        canvas.toBlob(function (blob) {
          const url = URL.createObjectURL(blob);
          const previewImg = document.createElement("img");
          previewImg.src = url; previewImg.alt = "converted";
          result.appendChild(previewImg);
          const dl = document.createElement("button");
          dl.className = "btn-secondary";
          dl.textContent = t("download");
          dl.addEventListener("click", function () { downloadBlob(blob, "converted." + ext); });
          result.appendChild(dl);
          showToast('تصویر با موفقیت تبدیل شد', 'success');
        }, format);
      };
      img.src = URL.createObjectURL(currentFile);
    });
  }

  /* ===== 10. PDF Tools (PDF.js + jsPDF via CDN) ========================= */

  function initPDFTools() {
    // Tab switching
    document.querySelectorAll('[data-ptab]').forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll('[data-ptab]').forEach(function (x) { x.classList.remove("active"); });
        tab.classList.add("active");
        const ptab = tab.getAttribute("data-ptab");
        document.getElementById("pdfPanel-pdf2img").classList.toggle("hidden", ptab !== "pdf2img");
        document.getElementById("pdfPanel-img2pdf").classList.toggle("hidden", ptab !== "img2pdf");
      });
    });

    // PDF to Image
    let pdfFile = null;
    const pdfDz = document.getElementById("pdfDropzone");
    const pdfInput = document.getElementById("pdfFile");
    setupDropzone(pdfDz, pdfInput, function (file) {
      if (!file || file.type !== "application/pdf") return;
      pdfFile = file;
    });

    // We convert on file selection
    pdfInput.addEventListener("change", function () {
      if (pdfInput.files && pdfInput.files[0]) { pdfFile = pdfInput.files[0]; convertPDFtoImage(); }
    });
    pdfDz.addEventListener("drop", function (e) {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) { pdfFile = e.dataTransfer.files[0]; convertPDFtoImage(); }
    });

    function convertPDFtoImage() {
      if (!pdfFile) return;
      const spinner = document.getElementById("pdfSpinner");
      const result = document.getElementById("pdfResult");
      const format = document.getElementById("pdfImgFormat").value;
      spinner.classList.remove("hidden");
      result.innerHTML = "";

      // Load PDF.js from CDN (cdnjs)
      if (!window.pdfjsLib) {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = function () {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          doConvert();
        };
        document.head.appendChild(script);
      } else { doConvert(); }

      function doConvert() {
        const reader = new FileReader();
        reader.onload = function (e) {
          window.pdfjsLib.getDocument({ data: e.target.result }).promise.then(function (pdf) {
            const numPages = pdf.numPages;
            const pagesPromises = [];
            for (let i = 1; i <= numPages && i <= 20; i++) {
              pagesPromises.push(pdf.getPage(i).then(function (page) {
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement("canvas");
                canvas.width = viewport.width; canvas.height = viewport.height;
                const ctx = canvas.getContext("2d");
                return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
                  return new Promise(function (resolve) {
                    canvas.toBlob(function (blob) {
                      const url = URL.createObjectURL(blob);
                      const wrap = document.createElement("div");
                      wrap.style.marginBottom = "12px";
                      const img = document.createElement("img");
                      img.src = url; img.alt = "page " + i;
                      const dl = document.createElement("button");
                      dl.className = "btn-secondary"; dl.textContent = t("download") + " (p" + i + ")";
                      dl.addEventListener("click", function () { downloadBlob(blob, "page-" + i + "." + (format === "png" ? "png" : "jpg")); });
                      wrap.appendChild(img); wrap.appendChild(dl);
                      result.appendChild(wrap);
                      resolve();
                    }, format === "png" ? "image/png" : "image/jpeg", 0.92);
                  });
                });
              }));
            }
            Promise.all(pagesPromises).then(function () { spinner.classList.add("hidden"); showToast('PDF با موفقیت تبدیل شد', 'success'); });
          }).catch(function (err) { spinner.classList.add("hidden"); result.innerHTML = "Error: " + err.message; showToast('خطا در تبدیل PDF', 'error'); });
        };
        reader.readAsArrayBuffer(pdfFile);
      }
    }

    // Image to PDF
    let img2pdfFiles = [];
    const i2pDz = document.getElementById("img2pdfDropzone");
    const i2pInput = document.getElementById("img2pdfFile");
    const i2pPreview = document.getElementById("img2pdfPreview");

    setupDropzone(i2pDz, i2pInput, function (files) {
      img2pdfFiles = Array.isArray(files) ? files : [files];
      i2pPreview.innerHTML = "";
      const ul = document.createElement("ul");
      ul.className = "file-list";
      img2pdfFiles.forEach(function (f, i) {
        const li = document.createElement("li");
        li.textContent = (i + 1) + ". " + f.name + " (" + formatBytes(f.size) + ")";
        ul.appendChild(li);
      });
      i2pPreview.appendChild(ul);
    }, true);

    document.getElementById("img2pdfBtn").addEventListener("click", function () {
      if (!img2pdfFiles.length) { showToast(t("err_no_file"), 'error'); return; }
      if (!window.jspdf) {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script.onload = createPDFFromImages;
        document.head.appendChild(script);
      } else { createPDFFromImages(); }
    });

    function createPDFFromImages() {
      const { jsPDF } = window.jspdf;
      let pdf = null;
      let processed = 0;

      img2pdfFiles.forEach(function (file, idx) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            const w = img.naturalWidth, h = img.naturalHeight;
            const orientation = w > h ? "landscape" : "portrait";
            if (!pdf) pdf = new jsPDF(orientation, "px", [w, h]);
            else { pdf.addPage([w, h], orientation); }
            const fmt = file.type === "image/png" ? "PNG" : "JPEG";
            pdf.addImage(e.target.result, fmt, 0, 0, w, h);
            processed++;
            if (processed === img2pdfFiles.length) {
              pdf.save("converted.pdf");
              showToast('PDF با موفقیت ساخته شد', 'success');
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  /* ===== 11. Data Converter (CSV/JSON/XML/YAML) ========================= */

  function initDataConverter() {
    document.getElementById("dataConvert").addEventListener("click", function () {
      const input = document.getElementById("dataInput").value.trim();
      const from = document.getElementById("dataFrom").value;
      const to = document.getElementById("dataTo").value;
      const output = document.getElementById("dataOutput");
      if (!input) { output.value = ""; return; }
      try {
        let data;
        // Parse input
        if (from === "JSON") data = JSON.parse(input);
        else if (from === "CSV") data = csvToJson(input);
        else if (from === "XML") data = xmlToJson(input);
        else if (from === "YAML") data = yamlToJson(input);
        // Convert output
        let result;
        if (to === "JSON") result = JSON.stringify(data, null, 2);
        else if (to === "CSV") result = jsonToCsv(data);
        else if (to === "XML") result = jsonToXml(data);
        else if (to === "YAML") result = jsonToYaml(data, 0);
        output.value = result;
        showToast('داده با موفقیت تبدیل شد', 'success');
      } catch (e) { output.value = "Error: " + e.message; showToast('خطا در تبدیل داده', 'error'); }
    });

    document.getElementById("dataDownload").addEventListener("click", function () {
      const output = document.getElementById("dataOutput").value;
      const to = document.getElementById("dataTo").value.toLowerCase();
      if (!output) return;
      const blob = new Blob([output], { type: "text/plain" });
      downloadBlob(blob, "converted." + to);
    });
  }

  function csvToJson(csv) {
    const lines = csv.trim().split(/\r?\n/);
    if (!lines.length) return [];
    const headers = lines[0].split(",").map(function (h) { return h.trim(); });
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(",").map(function (v) { return v.trim(); });
      const obj = {};
      headers.forEach(function (h, j) { obj[h] = vals[j] || ""; });
      result.push(obj);
    }
    return result;
  }
  function jsonToCsv(data) {
    if (!Array.isArray(data)) data = [data];
    if (!data.length) return "";
    const headers = Object.keys(data[0]);
    let csv = headers.join(",");
    data.forEach(function (row) {
      csv += "\n" + headers.map(function (h) { return JSON.stringify(row[h] || ""); }).join(",");
    });
    return csv;
  }
  function xmlToJson(xmlStr) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlStr, "text/xml");
    function nodeToObj(node) {
      const obj = {};
      if (node.attributes && node.attributes.length) {
        for (let i = 0; i < node.attributes.length; i++) obj["@" + node.attributes[i].name] = node.attributes[i].value;
      }
      if (node.childNodes && node.childNodes.length) {
        node.childNodes.forEach(function (child) {
          if (child.nodeType === 3) { if (child.nodeValue.trim()) obj["#text"] = child.nodeValue.trim(); }
          else if (child.nodeType === 1) {
            const childObj = nodeToObj(child);
            if (obj[child.nodeName]) { if (!Array.isArray(obj[child.nodeName])) obj[child.nodeName] = [obj[child.nodeName]]; obj[child.nodeName].push(childObj); }
            else obj[child.nodeName] = childObj;
          }
        });
      }
      return obj;
    }
    return nodeToObj(doc.documentElement);
  }
  function jsonToXml(data) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    function build(obj, name, indent) {
      if (name === undefined) name = "root";
      let s = indent + "<" + name;
      let attrs = "", content = "";
      if (obj && typeof obj === "object") {
        Object.keys(obj).forEach(function (k) {
          if (k.startsWith("@")) attrs += " " + k.slice(1) + '="' + obj[k] + '"';
          else if (k === "#text") content = obj[k];
          else if (Array.isArray(obj[k])) obj[k].forEach(function (item) { content += "\n" + build(item, k, indent + "  "); });
          else if (typeof obj[k] === "object") content += "\n" + build(obj[k], k, indent + "  ");
          else content += "\n" + indent + "  <" + k + ">" + obj[k] + "</" + k + ">";
        });
        if (content) content += "\n" + indent;
      } else { content = obj !== undefined ? obj : ""; }
      s += attrs + ">" + content + "</" + name + ">";
      return s;
    }
    xml += build(data, "root", "");
    return xml;
  }
  function yamlToJson(yamlStr) {
    // Lightweight YAML parser for simple key: value
    const lines = yamlStr.split(/\r?\n/);
    const result = {};
    lines.forEach(function (line) {
      const m = line.match(/^(\s*)(\w+):\s*(.*)$/);
      if (m && !m[1]) { if (m[3]) result[m[2]] = m[3]; }
    });
    return result;
  }
  function jsonToYaml(obj, indent) {
    if (indent === undefined) indent = 0;
    let yaml = "";
    const pad = "  ".repeat(indent);
    if (Array.isArray(obj)) {
      obj.forEach(function (item) {
        if (typeof item === "object") { yaml += pad + "-\n" + jsonToYaml(item, indent + 1); }
        else yaml += pad + "- " + item + "\n";
      });
    } else if (typeof obj === "object" && obj) {
      Object.keys(obj).forEach(function (k) {
        if (typeof obj[k] === "object") { yaml += pad + k + ":\n" + jsonToYaml(obj[k], indent + 1); }
        else yaml += pad + k + ": " + obj[k] + "\n";
      });
    } else { yaml += pad + obj + "\n"; }
    return yaml;
  }

  /* ===== 12. HEIC Converter (heic2any via CDN) ========================== */

  function initHEIC() {
    let heicFile = null;
    const dz = document.getElementById("heicDropzone");
    const fileInput = document.getElementById("heicFile");
    const preview = document.getElementById("heicResult");

    setupDropzone(dz, fileInput, function (file) { heicFile = file; });

    document.getElementById("heicBtn").addEventListener("click", function () {
      if (!heicFile) { showToast(t("err_no_file"), 'error'); return; }
      const format = document.getElementById("heicFormat").value;
      const spinner = document.getElementById("heicSpinner");
      spinner.classList.remove("hidden");
      preview.innerHTML = "";

      if (!window.heic2any) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js";
        script.onload = doConvert;
        script.onerror = function () { spinner.classList.add("hidden"); showToast('خطا در بارگذاری کتابخانه HEIC', 'error'); };
        document.head.appendChild(script);
      } else { doConvert(); }

      function doConvert() {
        window.heic2any({ blob: heicFile, toType: format, quality: 0.9 })
          .then(function (blob) {
            const url = URL.createObjectURL(blob);
            const img = document.createElement("img");
            img.src = url; img.alt = "converted";
            preview.appendChild(img);
            const ext = format === "image/jpeg" ? "jpg" : format.split("/")[1];
            const dl = document.createElement("button");
            dl.className = "btn-secondary"; dl.textContent = t("download");
            dl.addEventListener("click", function () { downloadBlob(blob, "converted." + ext); });
            preview.appendChild(dl);
            showToast('HEIC با موفقیت تبدیل شد', 'success');
          })
          .catch(function (e) { showToast('خطا: ' + e.message, 'error'); })
          .finally(function () { spinner.classList.add("hidden"); });
      }
    });
  }

  /* ===== 13. Video to GIF (Canvas + GIF encoder) ======================== */

  function initVideo2GIF() {
    let videoFile = null;
    const dz = document.getElementById("vidDropzone");
    const fileInput = document.getElementById("vidFile");
    const result = document.getElementById("vidResult");

    setupDropzone(dz, fileInput, function (file) { videoFile = file; });

    document.getElementById("vidBtn").addEventListener("click", function () {
      if (!videoFile) { showToast(t("err_no_file"), 'error'); return; }
      const spinner = document.getElementById("vidSpinner");
      spinner.classList.remove("hidden");
      result.innerHTML = "";

      const startSec = parseFloat(document.getElementById("vidStart").value) || 0;
      const duration = parseFloat(document.getElementById("vidDuration").value) || 3;
      const fps = Math.min(30, Math.max(1, parseInt(document.getElementById("vidFps").value, 10) || 10));
      const maxFrames = Math.min(60, Math.ceil(duration * fps));

      const video = document.createElement("video");
      video.muted = true; video.playsInline = true;
      video.src = URL.createObjectURL(videoFile);

      video.addEventListener("loadeddata", function () {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, 400 / video.videoWidth);
        canvas.width = Math.round(video.videoWidth * scale);
        canvas.height = Math.round(video.videoHeight * scale);
        const ctx = canvas.getContext("2d");
        const frames = [];
        let frameIdx = 0;

        function captureFrame() {
          if (frameIdx >= maxFrames) { buildGIF(frames, canvas.width, canvas.height, fps); return; }
          const time = startSec + (frameIdx / fps);
          if (time >= video.duration) { buildGIF(frames, canvas.width, canvas.height, fps); return; }
          video.currentTime = time;
        }

        video.addEventListener("seeked", function () {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
          frameIdx++;
          setTimeout(captureFrame, 10);
        });

        captureFrame();
      });

      function buildGIF(frames, w, h, fpsVal) {
        if (!frames.length) { spinner.classList.add("hidden"); return; }
        if (!window.GIF) {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js";
          script.onload = function () { doBuild(); };
          document.head.appendChild(script);
        } else { doBuild(); }

        function doBuild() {
          const gif = new window.GIF({ workers: 2, quality: 10, width: w, height: h, workerScript: "https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js" });
          frames.forEach(function (f) { gif.addFrame(f, { delay: Math.round(1000 / fpsVal) }); });
          gif.on("finished", function (blob) {
            const url = URL.createObjectURL(blob);
            const img = document.createElement("img");
            img.src = url; img.alt = "gif result";
            result.appendChild(img);
            const dl = document.createElement("button");
            dl.className = "btn-secondary"; dl.textContent = t("download") + " (GIF)";
            dl.addEventListener("click", function () { downloadBlob(blob, "converted.gif"); });
            result.appendChild(dl);
            spinner.classList.add("hidden");
            showToast('ویدیو با موفقیت به GIF تبدیل شد', 'success');
          });
          gif.render();
        }
      }
    });
  }

  /* ===== Utilities ====================================================== */

  function setupDropzone(dz, input, callback, multiple) {
    dz.addEventListener("click", function () { input.click(); });
    dz.addEventListener("dragover", function (e) { e.preventDefault(); dz.classList.add("dragover"); });
    dz.addEventListener("dragleave", function () { dz.classList.remove("dragover"); });
    dz.addEventListener("drop", function (e) {
      e.preventDefault(); dz.classList.remove("dragover");
      const files = e.dataTransfer.files;
      if (files && files.length) callback(multiple ? Array.from(files) : files[0]);
    });
    input.addEventListener("change", function () {
      if (multiple && input.files) callback(Array.from(input.files));
      else if (input.files && input.files[0]) callback(input.files[0]);
    });
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 100);
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  function flashCopy(btn) {
    const orig = btn.textContent;
    btn.textContent = t("copied");
    btn.classList.add("copied");
    setTimeout(function () { btn.textContent = orig; btn.classList.remove("copied"); }, 1500);
  }

  /* ===== Back to top ==================================================== */

  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===== Init =========================================================== */

  async function init() {
    // Theme
    setAutoTheme();

    // Translations
    await loadTranslations();
    applyTranslations();

    // Navigation
    document.querySelectorAll("[data-tool]").forEach(function (el) {
      el.addEventListener("click", function () {
        showTool(el.getAttribute("data-tool"));
      });
    });

    // Language buttons
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { switchLanguage(btn.getAttribute("data-lang")); });
    });

    // Theme toggle
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);

    // Mobile menu
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    menuToggle.addEventListener("click", function () {
      const open = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    // Init all tools
    initCalculator();
    initDateConverter();
    initPasswordGenerator();
    initUnitConverter();
    initCounter();
    initQR();
    initNumberToWords();
    initOCR();
    initImageConverter();
    initPDFTools();
    initDataConverter();
    initHEIC();
    initVideo2GIF();
    initBackToTop();

    // Show last tool or home
    const last = localStorage.getItem('lastTool');
    if (last && document.getElementById('section-' + last)) {
      showTool(last);
    } else {
      showTool("home");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
