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
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "fa" ? "rtl" : "ltr";
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
    });
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
    const nav = document.getElementById("mainNav");
    const toggle = document.getElementById("menuToggle");
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
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

  /* ===== 2. Date Converter ===== */
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

  /* ===== 3. Password Generator ===== */
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

  /* ===== 4. Unit Converter ===== */
  const unitData = {
    length: {
      units: { "units_meter": 1, "units_foot": 3.28084, "units_cm": 100, "units_inch": 39.3701, "units_km": 0.001, "units_mile": 0.000621371 },
      base: 1
    },
    weight: {
      units: { "units_kg": 1, "units_lb": 2.20462, "units_gram": 1000, "units_oz": 35.274 },
      base: 1
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

  /* ===== 5. Text Counter ===== */
  function initCounter() {
    const textarea = document.getElementById("counterText");
    textarea.addEventListener("input", function () {
      const text = textarea.value;
      document.getElementById("statChars").textContent = text.length;
      document.getElementById("statCharsNs").textContent = text.replace(/\s/g, "").length;
      document.getElementById("statWords").textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
      document.getElementById("statSentences").textContent = text.trim() ? (text.match(/[.!?。]+/g) || []).length || (text.trim().split(/\s+/).length > 0 ? 1 : 0) : 0;
      document.getElementById("statParagraphs").textContent = text.trim() ? text.split(/\n+/).filter(function (p) { return p.trim(); }).length : 0;
    });
  }

  /* ===== 6. QR Code Generator (استاندارد) ===== */
  function initQR() {
    const input = document.getElementById('qrInput');
    const genBtn = document.getElementById('qrGen');
    const downloadBtn = document.getElementById('qrDownload');
    const canvas = document.getElementById('qrCanvas');

    genBtn.addEventListener('click', generateQR);
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') generateQR();
    });

    downloadBtn.addEventListener('click', function () {
      if (canvas.toDataURL('image/png') === 'data:,') {
        showToast('لطفاً ابتدا یک QR کد تولید کنید.', 'error');
        return;
      }
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  function generateQR() {
    const input = document.getElementById('qrInput');
    const text = input.value.trim();
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!text) {
      showToast('لطفاً متن یا لینک را وارد کنید.', 'error');
      return;
    }

    if (typeof QRCode === 'undefined') {
      showToast('کتابخانه QR کد بارگذاری نشد. لطفاً اتصال اینترنت را بررسی کنید.', 'error');
      return;
    }

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);

    try {
      new QRCode(tempDiv, {
        text: text,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });

      const qrCanvas = tempDiv.querySelector('canvas');
      if (qrCanvas) {
        ctx.drawImage(qrCanvas, 0, 0, canvas.width, canvas.height);
        showToast('QR کد با موفقیت تولید شد.', 'success');
      } else {
        showToast('خطا در تولید QR کد.', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('خطا: ' + e.message, 'error');
    } finally {
      setTimeout(() => {
        if (tempDiv.parentNode) document.body.removeChild(tempDiv);
      }, 100);
    }
  }

  /* ===== 7. Number to Words (Persian) ===== */
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

  /* ===== 8. OCR ===== */
  function cleanPersianOCR(text) {
    let cleaned = text.replace(/[^\u0600-\u06FF\uFB8A\u067E\u0686\u0698\u06AF\u200C\s\n\d،؛؟.!?]/g, ' ');
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

  /* ===== 9. Image Converter ===== */
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

  /* ===== 10. PDF Tools ===== */
  function initPDFTools() {
    document.querySelectorAll('[data-ptab]').forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll('[data-ptab]').forEach(function (x) { x.classList.remove("active"); });
        tab.classList.add("active");
        const ptab = tab.getAttribute("data-ptab");
        document.getElementById("pdfPanel-pdf2img").classList.toggle("hidden", ptab !== "pdf2img");
        document.getElementById("pdfPanel-img2pdf").classList.toggle("hidden", ptab !== "img2pdf");
      });
    });

    let pdfFile = null;
    const pdfDz = document.getElementById("pdfDropzone");
    const pdfInput = document.getElementById("pdfFile");
    setupDropzone(pdfDz, pdfInput, function (file) {
      if (!file || file.type !== "application/pdf") return;
      pdfFile = file;
    });

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

  /* ===== 11. Data Converter ===== */
  function initDataConverter() {
    document.getElementById("dataConvert").addEventListener("click", function () {
      const input = document.getElementById("dataInput").value.trim();
      const from = document.getElementById("dataFrom").value;
      const to = document.getElementById("dataTo").value;
      const output = document.getElementById("dataOutput");
      if (!input) { output.value = ""; return; }
      try {
        let data;
        if (from === "JSON") data = JSON.parse(input);
        else if (from === "CSV") data = csvToJson(input);
        else if (from === "XML") data = xmlToJson(input);
        else if (from === "YAML") data = yamlToJson(input);
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

  /* ===== 12. HEIC Converter ===== */
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

  /* ===== 13. Video to GIF ===== */
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

  /* ===== Utilities ===== */
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

  /* ===== Back to top ===== */
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

  /* ===== Init ===== */
  async function init() {
    setAutoTheme();
    await loadTranslations();
    applyTranslations();

    document.querySelectorAll("[data-tool]").forEach(function (el) {
      el.addEventListener("click", function () {
        showTool(el.getAttribute("data-tool"));
      });
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { switchLanguage(btn.getAttribute("data-lang")); });
    });

    document.getElementById("themeToggle").addEventListener("click", toggleTheme);

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    menuToggle.addEventListener("click", function () {
      const open = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });

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
