// ===== START OF FILE: script.js =====
'use strict';

/* ===== 1. DOM Ready & Initialization ===== */
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeCalculator();
    initializeDateConverter();
    initializePasswordGenerator();
    initializeUnitConverter();
    initializeCharCounter();
    initializeQRGenerator();
    initializeNumberToWords();
    initializeFooterLinks();
    updateSEO('home');
});

/* ===== 2. Theme Management ===== */
function initializeTheme() {
    var themeToggle = document.getElementById('themeToggle');
    var body = document.body;
    var savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        document.querySelector('.theme-icon').textContent = '☀️';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        var isDark = body.classList.contains('dark-mode');
        document.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

/* ===== 3. Navigation & SEO ===== */
var seoData = {
    'home': {
        title: 'ابزارک‌های هوشمند - مجموعه ابزارهای آنلاین رایگان',
        desc: 'مجموعه‌ای کامل از ابزارهای آنلاین رایگان شامل ماشین‌حساب، مبدل تاریخ، تولید رمز، مبدل واحد، شمارشگر کلمات، QR Code و تبدیل اعداد به حروف فارسی.'
    },
    'calculator': {
        title: 'ماشین‌حساب استاندارد آنلاین - ابزارک‌های هوشمند',
        desc: 'ماشین‌حساب آنلاین رایگان برای انجام چهار عمل اصلی، محاسبه درصد و اعداد اعشاری. با تاریخچه عملیات و رابط کاربری ساده.'
    },
    'date-converter': {
        title: 'مبدل تاریخ شمسی به میلادی آنلاین - ابزارک‌های هوشمند',
        desc: 'تبدیل آسان تاریخ شمسی (جلالی) به میلادی و بالعکس با الگوریتم دقیق و نمایش نام کامل ماه‌ها. ابزار آنلاین رایگان.'
    },
    'password-generator': {
        title: 'تولیدکننده رمز عبور قوی آنلاین - ابزارک‌های هوشمند',
        desc: 'ایجاد رمزهای عبور امن و تصادفی با تنظیم طول و نوع کاراکترها. دارای نشانگر قدرت رمز و قابلیت کپی فوری.'
    },
    'unit-converter': {
        title: 'مبدل واحدهای طول و وزن آنلاین - ابزارک‌های هوشمند',
        desc: 'تبدیل سریع واحدهای اندازه‌گیری شامل متر به فوت، کیلومتر به مایل، کیلوگرم به پوند با دقت بالا.'
    },
    'char-counter': {
        title: 'شمارشگر کاراکتر و کلمات آنلاین - ابزارک‌های هوشمند',
        desc: 'شمارش لحظه‌ای تعداد کاراکترها، کلمات، جملات و پاراگراف‌های متن. مناسب برای نویسندگان و تولیدکنندگان محتوا.'
    },
    'qr-generator': {
        title: 'مولد QR Code آنلاین - ابزارک‌های هوشمند',
        desc: 'تولید کد QR از متن یا لینک با قابلیت دانلود PNG. ابزار آنلاین رایگان برای اشتراک‌گذاری سریع اطلاعات.'
    },
    'number-to-words': {
        title: 'تبدیل اعداد به حروف فارسی آنلاین - ابزارک‌های هوشمند',
        desc: 'تبدیل اعداد ریاضی به معادل حروفی در زبان فارسی. مناسب برای چک‌نویسی، قراردادها و اسناد مالی.'
    }
};

function updateSEO(toolId) {
    var data = seoData[toolId] || seoData['home'];
    document.title = data.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', data.desc);
    }
}

function initializeNavigation() {
    var navBtns = document.querySelectorAll('.nav-btn');
    var sections = document.querySelectorAll('.tool-section');
    var hamburger = document.getElementById('hamburger');
    var mainNav = document.getElementById('mainNav');
    var toolCards = document.querySelectorAll('.tool-card');

    function showSection(toolId) {
        sections.forEach(function(sec) {
            sec.classList.remove('active');
        });
        navBtns.forEach(function(btn) {
            btn.classList.remove('active');
        });

        var targetSection = document.getElementById(toolId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        var targetBtn = document.querySelector('.nav-btn[data-tool="' + toolId + '"]');
        if (targetBtn) {
            targetBtn.classList.add('active');
        }

        updateSEO(toolId);
        
        mainNav.classList.remove('show');
        hamburger.classList.remove('open');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var toolId = this.getAttribute('data-tool');
            showSection(toolId);
        });
    });

    toolCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var toolId = this.getAttribute('data-tool');
            showSection(toolId);
        });
    });

    document.querySelector('.logo').addEventListener('click', function() {
        showSection('home');
    });

    hamburger.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        hamburger.classList.toggle('open');
    });
}

/* ===== 4. Calculator ===== */
function initializeCalculator() {
    var display = document.getElementById('calcDisplay');
    var history = document.getElementById('calcHistory');
    var buttons = document.querySelectorAll('.calc-btn');
    
    var currentInput = '0';
    var previousInput = '';
    var operation = null;
    var shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = formatNumber(currentInput);
    }

    function formatNumber(num) {
        if (num === '' || num === '-') return num;
        if (num.toString().includes('.') && num.toString().endsWith('.')) {
            return num;
        }
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    function handleNumber(value) {
        if (shouldResetDisplay) {
            currentInput = value;
            shouldResetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? value : currentInput + value;
        }
        updateDisplay();
    }

    function handleDecimal() {
        if (shouldResetDisplay) {
            currentInput = '0.';
            shouldResetDisplay = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (operation !== null && !shouldResetDisplay) {
            calculate();
        }
        previousInput = currentInput;
        operation = op;
        shouldResetDisplay = true;
        
        var opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' }[op];
        history.textContent = formatNumber(previousInput) + ' ' + opSymbol;
    }

    function calculate() {
        if (operation === null || shouldResetDisplay) return;
        
        var prev = parseFloat(previousInput);
        var curr = parseFloat(currentInput);
        var result;

        switch (operation) {
            case '+': result = prev + curr; break;
            case '-': result = prev - curr; break;
            case '*': result = prev * curr; break;
            case '/':
                if (curr === 0) {
                    currentInput = 'خطا: تقسیم بر صفر';
                    updateDisplay();
                    history.textContent = '';
                    operation = null;
                    shouldResetDisplay = true;
                    return;
                }
                result = prev / curr;
                break;
            default: return;
        }

        var opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' }[operation];
        history.textContent = formatNumber(previousInput) + ' ' + opSymbol + ' ' + formatNumber(currentInput) + ' =';
        
        // Round to avoid floating point issues
        result = Math.round(result * 1e10) / 1e10;
        currentInput = result.toString();
        operation = null;
        shouldResetDisplay = true;
        updateDisplay();
    }

    function handlePercent() {
        var current = parseFloat(currentInput);
        if (isNaN(current)) return;
        
        if (previousInput !== '' && operation !== null) {
            var prev = parseFloat(previousInput);
            currentInput = (prev * current / 100).toString();
        } else {
            currentInput = (current / 100).toString();
        }
        updateDisplay();
    }

    function clear() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        shouldResetDisplay = false;
        history.textContent = '';
        updateDisplay();
    }

    function deleteLast() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }

    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var action = this.getAttribute('data-action');
            var value = this.getAttribute('data-value');

            if (this.classList.contains('btn-number')) {
                handleNumber(value);
            } else if (this.classList.contains('btn-decimal')) {
                handleDecimal();
            } else if (action === 'operator') {
                handleOperator(value);
            } else if (action === 'equals') {
                calculate();
            } else if (action === 'percent') {
                handlePercent();
            } else if (action === 'clear') {
                clear();
            } else if (action === 'delete') {
                deleteLast();
            }
        });
    });
}

/* ===== 5. Date Converter (Jalali <-> Gregorian) ===== */
function initializeDateConverter() {
    var jToGBtn = document.getElementById('jToGBtn');
    var gToJBtn = document.getElementById('gToJBtn');

    var jalaliMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    var gregorianMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Jalali to Gregorian Algorithm
    function jalaliToGregorian(jy, jm, jd) {
        jy = parseInt(jy);
        jm = parseInt(jm);
        jd = parseInt(jd);

        var jy2 = jy - 979;
        var jm2 = jm - 1;
        var jd2 = jd - 1;

        var j_day_no = 365 * jy2 + Math.floor(jy2 / 33) * 8 + Math.floor((jy2 % 33 + 3) / 4);
        for (var i = 0; i < jm2; ++i) {
            j_day_no += (i < 6) ? 31 : 30;
        }
        j_day_no += jd2;

        var g_day_no = j_day_no + 79;
        var gy = 1600 + 400 * Math.floor(g_day_no / 146097);
        g_day_no = g_day_no % 146097;

        var leap = true;
        if (g_day_no >= 36525) {
            g_day_no--;
            gy += 100 * Math.floor(g_day_no / 36524);
            g_day_no = g_day_no % 36524;
            if (g_day_no >= 365) g_day_no++;
            else leap = false;
        }

        gy += 4 * Math.floor(g_day_no / 1461);
        g_day_no %= 1461;

        if (g_day_no >= 366) {
            leap = false;
            g_day_no--;
            gy += Math.floor(g_day_no / 365);
            g_day_no = g_day_no % 365;
        }

        var g_days_in_month = [31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var gm = 0;
        for (gm = 0; g_day_no >= g_days_in_month[gm] && gm < 12; ++gm) {
            g_day_no -= g_days_in_month[gm];
        }

        return {
            year: gy,
            month: gm + 1,
            day: g_day_no + 1
        };
    }

    // Gregorian to Jalali Algorithm
    function gregorianToJalali(gy, gm, gd) {
        gy = parseInt(gy);
        gm = parseInt(gm);
        gd = parseInt(gd);

        var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var gy2 = (gm > 2) ? (gy + 1) : gy;
        var days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
        
        var jy = -1595 + 33 * Math.floor(days / 12053);
        days %= 12053;
        
        jy += 4 * Math.floor(days / 1461);
        days %= 1461;
        
        if (days > 365) {
            jy += Math.floor((days - 1) / 365);
            days = (days - 1) % 365;
        }

        var jm, jd;
        if (days < 186) {
            jm = 1 + Math.floor(days / 31);
            jd = 1 + (days % 31);
        } else {
            jm = 7 + Math.floor((days - 186) / 30);
            jd = 1 + ((days - 186) % 30);
        }

        return {
            year: jy,
            month: jm,
            day: jd
        };
    }

    jToGBtn.addEventListener('click', function() {
        var jy = document.getElementById('jy-input').value;
        var jm = document.getElementById('jm-input').value;
        var jd = document.getElementById('jd-input').value;

        if (!jy || !jm || !jd) {
            document.getElementById('jToGResult').textContent = '⚠️ لطفاً تمام فیلدها را پر کنید';
            return;
        }

        jy = parseInt(jy);
        jm = parseInt(jm);
        jd = parseInt(jd);

        if (jy < 1 || jy > 3178 || jm < 1 || jm > 12 || jd < 1 || jd > 31) {
            document.getElementById('jToGResult').textContent = '⚠️ تاریخ وارد شده معتبر نیست';
            return;
        }

        var result = jalaliToGregorian(jy, jm, jd);
        var output = jd + ' ' + jalaliMonths[jm - 1] + ' ' + jy + ' شمسی = ' + 
                     result.day + ' ' + gregorianMonths[result.month - 1] + ' ' + result.year + ' میلادی';
        document.getElementById('jToGResult').textContent = output;
    });

    gToJBtn.addEventListener('click', function() {
        var gy = document.getElementById('gy-input').value;
        var gm = document.getElementById('gm-input').value;
        var gd = document.getElementById('gd-input').value;

        if (!gy || !gm || !gd) {
            document.getElementById('gToJResult').textContent = '⚠️ لطفاً تمام فیلدها را پر کنید';
            return;
        }

        gy = parseInt(gy);
        gm = parseInt(gm);
        gd = parseInt(gd);

        if (gy < 1 || gy > 3178 || gm < 1 || gm > 12 || gd < 1 || gd > 31) {
            document.getElementById('gToJResult').textContent = '⚠️ تاریخ وارد شده معتبر نیست';
            return;
        }

        var result = gregorianToJalali(gy, gm, gd);
        var output = gd + ' ' + gregorianMonths[gm - 1] + ' ' + gy + ' میلادی = ' + 
                     result.day + ' ' + jalaliMonths[result.month - 1] + ' ' + result.year + ' شمسی';
        document.getElementById('gToJResult').textContent = output;
    });
}

/* ===== 6. Password Generator ===== */
function initializePasswordGenerator() {
    var lengthSlider = document.getElementById('passLength');
    var lengthValue = document.getElementById('lengthValue');
    var generateBtn = document.getElementById('generatePassword');
    var copyBtn = document.getElementById('copyPassword');
    var passwordDisplay = document.getElementById('passwordDisplay');
    var strengthBar = document.getElementById('strengthBar');
    var strengthText = document.getElementById('strengthText');

    var checkboxes = {
        uppercase: document.getElementById('incUppercase'),
        lowercase: document.getElementById('incLowercase'),
        numbers: document.getElementById('incNumbers'),
        symbols: document.getElementById('incSymbols')
    };

    var charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    function generatePassword() {
        var length = parseInt(lengthSlider.value);
        var chars = '';
        var guaranteedChars = [];

        if (checkboxes.uppercase.checked) {
            chars += charSets.uppercase;
            guaranteedChars.push(charSets.uppercase[Math.floor(Math.random() * charSets.uppercase.length)]);
        }
        if (checkboxes.lowercase.checked) {
            chars += charSets.lowercase;
            guaranteedChars.push(charSets.lowercase[Math.floor(Math.random() * charSets.lowercase.length)]);
        }
        if (checkboxes.numbers.checked) {
            chars += charSets.numbers;
            guaranteedChars.push(charSets.numbers[Math.floor(Math.random() * charSets.numbers.length)]);
        }
        if (checkboxes.symbols.checked) {
            chars += charSets.symbols;
            guaranteedChars.push(charSets.symbols[Math.floor(Math.random() * charSets.symbols.length)]);
        }

        if (chars === '') {
            passwordDisplay.value = 'حداقل یک نوع کاراکتر را انتخاب کنید!';
            updateStrength('');
            return;
        }

        var password = '';
        // Add guaranteed characters first
        for (var i = 0; i < guaranteedChars.length; i++) {
            password += guaranteedChars[i];
        }
        // Fill remaining with random characters
        for (var j = password.length; j < length; j++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }

        // Shuffle the password
        password = password.split('').sort(function() {
            return 0.5 - Math.random();
        }).join('');

        passwordDisplay.value = password;
        updateStrength(password);
    }

    function updateStrength(password) {
        if (!password) {
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#ccc';
            strengthText.textContent = '-';
            return;
        }

        var score = 0;
        if (password.length >= 12) score += 2;
        else if (password.length >= 8) score += 1;

        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 2;

        var width, color, text;
        if (score <= 2) {
            width = '25%'; color = '#ef4444'; text = 'ضعیف';
        } else if (score <= 4) {
            width = '50%'; color = '#f59e0b'; text = 'متوسط';
        } else if (score <= 5) {
            width = '75%'; color = '#10b981'; text = 'قوی';
        } else {
            width = '100%'; color = '#059669'; text = 'خیلی قوی';
        }

        strengthBar.style.width = width;
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }

    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    generateBtn.addEventListener('click', generatePassword);

    copyBtn.addEventListener('click', function() {
        if (!passwordDisplay.value || passwordDisplay.value.includes('حداقل')) return;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(passwordDisplay.value).then(function() {
                copyBtn.textContent = '✅';
                setTimeout(function() { copyBtn.textContent = '📋'; }, 2000);
            });
        } else {
            passwordDisplay.select();
            document.execCommand('copy');
            copyBtn.textContent = '✅';
            setTimeout(function() { copyBtn.textContent = '📋'; }, 2000);
        }
    });

    // Generate initial password
    generatePassword();
}

/* ===== 7. Unit Converter ===== */
function initializeUnitConverter() {
    var tabs = document.querySelectorAll('.unit-tab');
    var panels = document.querySelectorAll('.unit-panel');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            panels.forEach(function(p) { p.classList.remove('active'); });
            this.classList.add('active');
            var targetPanel = document.getElementById(this.getAttribute('data-tab') + '-panel');
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // Length conversions (all to meters as base)
    var lengthToMeter = {
        'm': 1,
        'cm': 0.01,
        'km': 1000,
        'ft': 0.3048,
        'in': 0.0254,
        'mi': 1609.344
    };

    // Weight conversions (all to kg as base)
    var weightToKg = {
        'kg': 1,
        'g': 0.001,
        'lb': 0.453592,
        'oz': 0.0283495
    };

    function convertLength() {
        var input = parseFloat(document.getElementById('lengthInput').value);
        var from = document.getElementById('lengthFrom').value;
        var to = document.getElementById('lengthTo').value;
        var output = document.getElementById('lengthOutput');

        if (isNaN(input) || input === '') {
            output.value = '';
            return;
        }

        var meters = input * lengthToMeter[from];
        var result = meters / lengthToMeter[to];
        output.value = result.toFixed(3);
    }

    function convertWeight() {
        var input = parseFloat(document.getElementById('weightInput').value);
        var from = document.getElementById('weightFrom').value;
        var to = document.getElementById('weightTo').value;
        var output = document.getElementById('weightOutput');

        if (isNaN(input) || input === '') {
            output.value = '';
            return;
        }

        var kg = input * weightToKg[from];
        var result = kg / weightToKg[to];
        output.value = result.toFixed(3);
    }

    document.getElementById('lengthInput').addEventListener('input', convertLength);
    document.getElementById('lengthFrom').addEventListener('change', convertLength);
    document.getElementById('lengthTo').addEventListener('change', convertLength);

    document.getElementById('weightInput').addEventListener('input', convertWeight);
    document.getElementById('weightFrom').addEventListener('change', convertWeight);
    document.getElementById('weightTo').addEventListener('change', convertWeight);

    // Initial conversions
    convertLength();
    convertWeight();
}

/* ===== 8. Character Counter ===== */
function initializeCharCounter() {
    var textarea = document.getElementById('textContent');
    var charCount = document.getElementById('charCount');
    var charNoSpace = document.getElementById('charNoSpace');
    var wordCount = document.getElementById('wordCount');
    var sentenceCount = document.getElementById('sentenceCount');
    var paragraphCount = document.getElementById('paragraphCount');
    var readTime = document.getElementById('readTime');

    function updateCount() {
        var text = textarea.value;

        // Characters with spaces
        charCount.textContent = text.length;

        // Characters without spaces
        charNoSpace.textContent = text.replace(/\s/g, '').length;

        // Words
        var words = text.trim().split(/\s+/).filter(function(w) { return w.length > 0; });
        wordCount.textContent = text.trim() === '' ? 0 : words.length;

        // Sentences (split by . ! ?)
        var sentences = text.split(/[.!?؟]+/).filter(function(s) { return s.trim().length > 0; });
        sentenceCount.textContent = text.trim() === '' ? 0 : sentences.length;

        // Paragraphs
        var paragraphs = text.split(/\n\n+/).filter(function(p) { return p.trim().length > 0; });
        paragraphCount.textContent = text.trim() === '' ? 0 : paragraphs.length;

        // Reading time (average 200 words per minute)
        var wordsNum = text.trim() === '' ? 0 : words.length;
        var minutes = Math.ceil(wordsNum / 200);
        readTime.textContent = minutes;
    }

    textarea.addEventListener('input', updateCount);
    updateCount();
}

/* ===== 9. QR Code Generator ===== */
function initializeQRGenerator() {
    var generateBtn = document.getElementById('generateQR');
    var downloadBtn = document.getElementById('downloadQR');
    var qrText = document.getElementById('qrText');
    var qrOutput = document.getElementById('qrOutput');
    var qrCanvas = document.getElementById('qrCanvas');

    generateBtn.addEventListener('click', function() {
        var text = qrText.value.trim();
        
        if (!text) {
            alert('⚠️ لطفاً متن یا لینکی را وارد کنید!');
            return;
        }

        try {
            var qr = qrcode(0, 'M');
            qr.addData(text);
            qr.make();

            var moduleCount = qr.getModuleCount();
            var cellSize = 8;
            var margin = 4;
            var size = moduleCount * cellSize + margin * 2;

            qrCanvas.width = size;
            qrCanvas.height = size;

            var ctx = qrCanvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);

            ctx.fillStyle = '#000000';
            for (var row = 0; row < moduleCount; row++) {
                for (var col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        ctx.fillRect(
                            col * cellSize + margin,
                            row * cellSize + margin,
                            cellSize,
                            cellSize
                        );
                    }
                }
            }

            downloadBtn.style.display = 'inline-flex';
        } catch (e) {
            alert('❌ خطا در تولید QR Code: ' + e.message);
        }
    });

    downloadBtn.addEventListener('click', function() {
        var link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrCanvas.toDataURL('image/png');
        link.click();
    });
}

/* ===== 10. Number to Persian Words ===== */
function initializeNumberToWords() {
    var input = document.getElementById('numberInput');
    var convertBtn = document.getElementById('convertNumber');
    var result = document.getElementById('numberResult');

    function numberToWords(num) {
        num = num.toString().replace(/,/g, '').trim();
        
        if (!/^\d+$/.test(num)) {
            return '⚠️ لطفاً فقط عدد وارد کنید!';
        }

        if (num === '0') return 'صفر';
        if (num.length > 12) return '⚠️ عدد وارد شده بیش از ۱۲ رقم است!';

        var ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
        var teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
        var tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
        var hundreds = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
        var scales = ['', ' هزار', ' میلیون', ' میلیارد'];

        function threeDigits(n) {
            var result = '';
            var h = Math.floor(n / 100);
            var t = Math.floor((n % 100) / 10);
            var o = n % 10;

            if (h > 0) {
                result += hundreds[h];
            }

            var rem = n % 100;
            if (rem >= 10 && rem < 20) {
                if (result) result += ' و ';
                result += teens[rem - 10];
            } else {
                if (t > 0) {
                    if (result) result += ' و ';
                    result += tens[t];
                }
                if (o > 0) {
                    if (result) result += ' و ';
                    result += ones[o];
                }
            }

            return result;
        }

        // Pad number with leading zeros to make it a multiple of 3
        while (num.length % 3 !== 0) {
            num = '0' + num;
        }

        var groups = [];
        for (var i = 0; i < num.length; i += 3) {
            groups.push(num.substring(i, i + 3));
        }

        var result = '';
        var scaleIndex = groups.length - 1;

        for (var g = 0; g < groups.length; g++) {
            var groupValue = parseInt(groups[g]);
            if (groupValue > 0) {
                if (result) result += ' و ';
                result += threeDigits(groupValue) + scales[scaleIndex];
            }
            scaleIndex--;
        }

        return result;
    }

    function convert() {
        var num = input.value.trim();
        if (!num) {
            result.innerHTML = '<p>⚠️ لطفاً یک عدد وارد کنید!</p>';
            return;
        }
        var words = numberToWords(num);
        result.innerHTML = '<p>✅ نتیجه: <strong>' + words + '</strong></p>';
    }

    input.addEventListener('input', function() {
        // Only allow digits
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    convertBtn.addEventListener('click', convert);
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') convert();
    });
}

/* ===== 11. Footer Links ===== */
function initializeFooterLinks() {
    document.getElementById('aboutLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('درباره ما:\n\nابزارک‌های هوشمند یک مجموعه‌ی آنلاین رایگان از ابزارهای کاربردی است که مستقیماً در مرورگر شما اجرا می‌شوند. هدف ما ارائه‌ی ابزارهای ساده، سریع و بدون نیاز به ثبت‌نام یا ارسال اطلاعات به سرورهای خارجی است.\n\nتمام پردازش‌ها به صورت محلی (Local) انجام می‌شوند و حریم خصوصی شما کاملاً حفظ می‌شود.');
    });

    document.getElementById('contactLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('تماس با ما:\n\n📧 ایمیل: support@smarttools.example\n🌐 وب‌سایت: smarttools.example\n💬 تلگرام: @SmartToolsSupport\n\nما از پیشنهادات و انتقادات شما استقبال می‌کنیم!');
    });

    document.getElementById('privacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('حریم خصوصی:\n\n✅ ما هیچ اطلاعات شخصی شما را جمع‌آوری نمی‌کنیم.\n✅ هیچ داده‌ای به سرورهای خارجی ارسال نمی‌شود.\n✅ تمام محاسبات روی دستگاه شما انجام می‌شود.\n✅ هیچ کوکی ردیابی استفاده نمی‌کنیم.\n\nحریم خصوصی شما برای ما اهمیت بسیار زیادی دارد.');
    });
}
// ===== END OF FILE: script.js =====
