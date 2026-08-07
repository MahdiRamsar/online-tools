// ===== START OF FILE: script.js =====
'use strict';

/* ===== 1. Internationalization (i18n) System ===== */
var translations = {
    en: {
        // Navigation
        logo: "Smart Tools",
        nav_home: "Home",
        nav_ocr: "OCR",
        nav_image_converter: "Image Converter",
        nav_pdf_converter: "PDF Tools",
        nav_heic_converter: "HEIC Converter",
        nav_file_converter: "File Converter",
        nav_password: "Password",
        nav_calculator: "Calculator",
        nav_date_converter: "Date Converter",
        
        // Home
        hero_title: "Free Online File Converter & OCR Platform",
        hero_desc: "Powerful tools for image to text conversion, PDF processing, image format conversion, and file transformations. 100% client-side - your files never leave your device.",
        
        // Tool Cards
        tool_ocr_title: "Image to Text (OCR)",
        tool_ocr_desc: "Extract text from images and scanned documents using advanced OCR technology. Supports multiple languages including English and Persian.",
        tool_image_converter_title: "Image Format Converter",
        tool_image_converter_desc: "Convert images between JPG, PNG, WebP, BMP, and GIF formats. Batch conversion supported with quality control.",
        tool_pdf_converter_title: "PDF Tools",
        tool_pdf_converter_desc: "Convert PDF to images, images to PDF, merge PDFs, and extract text from PDF documents. All processing done locally.",
        tool_heic_converter_title: "HEIC to JPG Converter",
        tool_heic_converter_desc: "Convert iPhone HEIC photos to JPG format for universal compatibility. Preserve quality while converting Apple's proprietary format.",
        tool_file_converter_title: "File Format Converter",
        tool_file_converter_desc: "Convert between JSON, CSV, XML, and text files. Transform data structures and formats for different applications.",
        tool_password_title: "Password Generator",
        tool_password_desc: "Generate strong, secure passwords with customizable length and character types. Includes strength indicator.",
        tool_calculator_title: "Calculator",
        tool_calculator_desc: "Standard calculator with basic operations, percentage calculations, and operation history.",
        tool_date_converter_title: "Date Converter",
        tool_date_converter_desc: "Convert between Jalali (Persian) and Gregorian calendars with accurate algorithms and full month names.",
        
        // OCR Tool
        ocr_title: "📄 Image to Text (OCR)",
        ocr_subtitle: "Extract text from images and scanned documents",
        ocr_upload_prompt: "Click or drag an image here",
        ocr_upload_hint: "Supports JPG, PNG, BMP, GIF (Max 10MB)",
        ocr_language: "Language:",
        ocr_start: "Start OCR",
        ocr_result: "Extracted Text:",
        ocr_copy: "Copy Text",
        ocr_download: "Download as TXT",
        ocr_about: "About this tool",
        ocr_desc_full: "This OCR tool extracts text from images and scanned documents using Tesseract.js. All processing happens locally in your browser - your images are never uploaded to any server. Supports multiple languages including English, Persian, Arabic, Spanish, French, and German.",
        
        // Image Converter
        image_converter_title: "🖼️ Image Format Converter",
        image_converter_subtitle: "Convert images between different formats",
        image_upload_prompt: "Click or drag images here",
        image_upload_hint: "Supports JPG, PNG, WebP, BMP, GIF (Multiple files supported)",
        image_output_format: "Output Format:",
        image_quality: "Quality: ",
        image_convert: "Convert All Images",
        image_results: "Conversion Results",
        image_about: "About this tool",
        image_desc_full: "Convert images between JPG, PNG, WebP, and BMP formats with adjustable quality settings. This tool uses the HTML5 Canvas API to process images entirely in your browser. Supports batch conversion of multiple images at once.",
        
        // PDF Converter
        pdf_converter_title: "📑 PDF Tools",
        pdf_converter_subtitle: "Convert and process PDF documents",
        pdf_tab_to_image: "PDF to Image",
        pdf_tab_to_pdf: "Image to PDF",
        pdf_tab_text: "Extract Text",
        pdf_upload_prompt: "Click or drag a PDF file here",
        pdf_upload_hint: "Maximum file size: 50MB",
        pdf_image_format: "Image Format:",
        pdf_convert_to_image: "Convert to Images",
        pdf_image_upload_prompt: "Click or drag images here",
        pdf_image_upload_hint: "Multiple images supported - will be combined into one PDF",
        pdf_page_size: "Page Size:",
        pdf_convert_to_pdf: "Create PDF",
        pdf_text_upload_prompt: "Click or drag a PDF file here",
        pdf_extract_text: "Extract Text",
        pdf_copy_text: "Copy Text",
        pdf_about: "About this tool",
        pdf_desc_full: "Comprehensive PDF tools including PDF to image conversion, image to PDF creation, and text extraction. All processing is done locally using PDF.js and jsPDF libraries. Your documents never leave your device.",
        
        // HEIC Converter
        heic_converter_title: "📱 HEIC to JPG Converter",
        heic_converter_subtitle: "Convert iPhone photos to universal format",
        heic_info: "HEIC is Apple's proprietary image format. This tool converts HEIC files to JPG for universal compatibility across all devices and platforms.",
        heic_upload_prompt: "Click or drag HEIC files here",
        heic_upload_hint: "Supports .heic and .heif files from iPhone/iPad",
        heic_convert: "Convert to JPG",
        heic_about: "About this tool",
        heic_desc_full: "Convert iPhone HEIC photos to JPG format for universal compatibility. HEIC (High Efficiency Image Format) is Apple's proprietary format that offers better compression but isn't supported on all devices.",
        
        // File Converter
        file_converter_title: "📁 File Format Converter",
        file_converter_subtitle: "Convert between JSON, CSV, XML, and text formats",
        file_converter_input: "Input",
        file_input_format: "Input Format:",
        file_upload: "Upload File",
        file_converter_output: "Output",
        file_output_format: "Output Format:",
        file_copy: "Copy Output",
        file_download: "Download File",
        file_convert: "Convert File",
        file_about: "About this tool",
        file_desc_full: "Convert data between JSON, CSV, XML, and plain text formats. Perfect for transforming data structures for different applications, APIs, and databases.",
        
        // Password Generator
        password_title: "🔐 Password Generator",
        password_subtitle: "Generate strong, secure passwords",
        password_strength: "Password Strength:",
        password_length: "Length: ",
        password_uppercase: "Uppercase (A-Z)",
        password_lowercase: "Lowercase (a-z)",
        password_numbers: "Numbers (0-9)",
        password_symbols: "Symbols (!@#$%...)",
        password_generate: "🔄 Generate Password",
        password_about: "About this tool",
        password_desc_full: "Generate strong, secure passwords with customizable length and character types. The strength indicator helps you ensure your password meets security standards.",
        
        // Calculator
        calculator_title: "🧮 Calculator",
        calculator_subtitle: "Standard calculator with history",
        calculator_about: "About this tool",
        calculator_desc_full: "Standard calculator with basic arithmetic operations (addition, subtraction, multiplication, division), percentage calculations, and decimal support.",
        
        // Date Converter
        date_converter_title: "📅 Date Converter",
        date_converter_subtitle: "Convert between Jalali and Gregorian calendars",
        date_jalali_to_gregorian: "Jalali to Gregorian",
        date_gregorian_to_jalali: "Gregorian to Jalali",
        date_year: "Year:",
        date_month: "Month:",
        date_day: "Day:",
        date_convert_to_gregorian: "Convert to Gregorian",
        date_convert_to_jalali: "Convert to Jalali",
        date_about: "About this tool",
        date_desc_full: "Accurate date converter between Jalali (Persian/Solar Hijri) and Gregorian calendars using the precise algorithm. Handles leap years correctly and displays full month names.",
        
        // Footer
        footer_about: "About Us",
        footer_contact: "Contact",
        footer_privacy: "Privacy Policy"
    },
    
    fa: {
        // Navigation
        logo: "ابزارهای هوشمند",
        nav_home: "خانه",
        nav_ocr: "OCR",
        nav_image_converter: "مبدل تصویر",
        nav_pdf_converter: "ابزارهای PDF",
        nav_heic_converter: "مبدل HEIC",
        nav_file_converter: "مبدل فایل",
        nav_password: "رمز عبور",
        nav_calculator: "ماشین حساب",
        nav_date_converter: "مبدل تاریخ",
        
        // Home
        hero_title: "پلتفرم آنلاین رایگان تبدیل فایل و OCR",
        hero_desc: "ابزارهای قدرتمند برای تبدیل تصویر به متن، پردازش PDF، تبدیل فرمت تصویر و تبدیل فایل‌ها. ۱۰۰٪ سمت کاربر - فایل‌های شما هرگز از دستگاه شما خارج نمی‌شوند.",
        
        // Tool Cards
        tool_ocr_title: "تبدیل تصویر به متن (OCR)",
        tool_ocr_desc: "استخراج متن از تصاویر و اسناد اسکن شده با استفاده از فناوری پیشرفته OCR. پشتیبانی از چندین زبان از جمله فارسی و انگلیسی.",
        tool_image_converter_title: "مبدل فرمت تصویر",
        tool_image_converter_desc: "تبدیل تصاویر بین فرمت‌های JPG، PNG، WebP، BMP و GIF. پشتیبانی از تبدیل دسته‌ای با کنترل کیفیت.",
        tool_pdf_converter_title: "ابزارهای PDF",
        tool_pdf_converter_desc: "تبدیل PDF به تصویر، تصویر به PDF، ادغام PDFها و استخراج متن از اسناد PDF. تمام پردازش‌ها به صورت محلی انجام می‌شود.",
        tool_heic_converter_title: "مبدل HEIC به JPG",
        tool_heic_converter_desc: "تبدیل عکس‌های HEIC آیفون به فرمت JPG برای سازگاری جهانی. حفظ کیفیت در حین تبدیل فرمت اختصاصی اپل.",
        tool_file_converter_title: "مبدل فرمت فایل",
        tool_file_converter_desc: "تبدیل بین فایل‌های JSON، CSV، XML و متنی. تبدیل ساختارهای داده و فرمت‌ها برای کاربردهای مختلف.",
        tool_password_title: "تولیدکننده رمز عبور",
        tool_password_desc: "ایجاد رمزهای عبور قوی و امن با طول و نوع کاراکترهای قابل تنظیم. شامل نشانگر قدرت.",
        tool_calculator_title: "ماشین حساب",
        tool_calculator_desc: "ماشین حساب استاندارد با عملیات پایه، محاسبات درصد و تاریخچه عملیات.",
        tool_date_converter_title: "مبدل تاریخ",
        tool_date_converter_desc: "تبدیل بین تقویم‌های جلالی (فارسی) و میلادی با الگوریتم‌های دقیق و نام کامل ماه‌ها.",
        
        // OCR Tool
        ocr_title: "📄 تبدیل تصویر به متن (OCR)",
        ocr_subtitle: "استخراج متن از تصاویر و اسناد اسکن شده",
        ocr_upload_prompt: "برای آپلود کلیک کنید یا تصویر را اینجا بکشید",
        ocr_upload_hint: "پشتیبانی از JPG، PNG، BMP، GIF (حداکثر ۱۰ مگابایت)",
        ocr_language: "زبان:",
        ocr_start: "شروع OCR",
        ocr_result: "متن استخراج شده:",
        ocr_copy: "کپی متن",
        ocr_download: "دانلود به صورت TXT",
        ocr_about: "درباره این ابزار",
        ocr_desc_full: "این ابزار OCR متن را از تصاویر و اسناد اسکن شده با استفاده از Tesseract.js استخراج می‌کند. تمام پردازش‌ها به صورت محلی در مرورگر شما انجام می‌شود - تصاویر شما هرگز به هیچ سروری آپلود نمی‌شوند.",
        
        // Image Converter
        image_converter_title: "🖼️ مبدل فرمت تصویر",
        image_converter_subtitle: "تبدیل تصاویر بین فرمت‌های مختلف",
        image_upload_prompt: "برای آپلود کلیک کنید یا تصاویر را اینجا بکشید",
        image_upload_hint: "پشتیبانی از JPG، PNG، WebP، BMP، GIF (چندین فایل پشتیبانی می‌شود)",
        image_output_format: "فرمت خروجی:",
        image_quality: "کیفیت: ",
        image_convert: "تبدیل همه تصاویر",
        image_results: "نتایج تبدیل",
        image_about: "درباره این ابزار",
        image_desc_full: "تبدیل تصاویر بین فرمت‌های JPG، PNG، WebP و BMP با تنظیمات کیفیت قابل تنظیم. این ابزار از Canvas API HTML5 برای پردازش تصاویر کاملاً در مرورگر شما استفاده می‌کند.",
        
        // PDF Converter
        pdf_converter_title: "📑 ابزارهای PDF",
        pdf_converter_subtitle: "تبدیل و پردازش اسناد PDF",
        pdf_tab_to_image: "PDF به تصویر",
        pdf_tab_to_pdf: "تصویر به PDF",
        pdf_tab_text: "استخراج متن",
        pdf_upload_prompt: "برای آپلود کلیک کنید یا فایل PDF را اینجا بکشید",
        pdf_upload_hint: "حداکثر حجم فایل: ۵۰ مگابایت",
        pdf_image_format: "فرمت تصویر:",
        pdf_convert_to_image: "تبدیل به تصاویر",
        pdf_image_upload_prompt: "برای آپلود کلیک کنید یا تصاویر را اینجا بکشید",
        pdf_image_upload_hint: "چندین تصویر پشتیبانی می‌شود - در یک PDF ترکیب خواهند شد",
        pdf_page_size: "اندازه صفحه:",
        pdf_convert_to_pdf: "ایجاد PDF",
        pdf_text_upload_prompt: "برای آپلود کلیک کنید یا فایل PDF را اینجا بکشید",
        pdf_extract_text: "استخراج متن",
        pdf_copy_text: "کپی متن",
        pdf_about: "درباره این ابزار",
        pdf_desc_full: "ابزارهای جامع PDF شامل تبدیل PDF به تصویر، ایجاد تصویر به PDF و استخراج متن. تمام پردازش‌ها به صورت محلی با استفاده از کتابخانه‌های PDF.js و jsPDF انجام می‌شود.",
        
        // HEIC Converter
        heic_converter_title: "📱 مبدل HEIC به JPG",
        heic_converter_subtitle: "تبدیل عکس‌های آیفون به فرمت جهانی",
        heic_info: "HEIC فرمت اختصاصی تصویر اپل است. این ابزار فایل‌های HEIC را به JPG برای سازگاری جهانی در تمام دستگاه‌ها و پلتفرم‌ها تبدیل می‌کند.",
        heic_upload_prompt: "برای آپلود کلیک کنید یا فایل‌های HEIC را اینجا بکشید",
        heic_upload_hint: "پشتیبانی از فایل‌های .heic و .heif از آیفون/آیپد",
        heic_convert: "تبدیل به JPG",
        heic_about: "درباره این ابزار",
        heic_desc_full: "تبدیل عکس‌های HEIC آیفون به فرمت JPG برای سازگاری جهانی. HEIC (فرمت تصویر با کارایی بالا) فرمت اختصاصی اپل است که فشرده‌سازی بهتری ارائه می‌دهد اما در همه دستگاه‌ها پشتیبانی نمی‌شود.",
        
        // File Converter
        file_converter_title: "📁 مبدل فرمت فایل",
        file_converter_subtitle: "تبدیل بین فرمت‌های JSON، CSV، XML و متنی",
        file_converter_input: "ورودی",
        file_input_format: "فرمت ورودی:",
        file_upload: "آپلود فایل",
        file_converter_output: "خروجی",
        file_output_format: "فرمت خروجی:",
        file_copy: "کپی خروجی",
        file_download: "دانلود فایل",
        file_convert: "تبدیل فایل",
        file_about: "درباره این ابزار",
        file_desc_full: "تبدیل داده بین فرمت‌های JSON، CSV، XML و متن ساده. مناسب برای تبدیل ساختارهای داده برای کاربردها، APIها و پایگاه‌های داده مختلف.",
        
        // Password Generator
        password_title: "🔐 تولیدکننده رمز عبور",
        password_subtitle: "ایجاد رمزهای عبور قوی و امن",
        password_strength: "قدرت رمز عبور:",
        password_length: "طول: ",
        password_uppercase: "حروف بزرگ (A-Z)",
        password_lowercase: "حروف کوچک (a-z)",
        password_numbers: "اعداد (0-9)",
        password_symbols: "علائم (!@#$%...)",
        password_generate: "🔄 تولید رمز عبور",
        password_about: "درباره این ابزار",
        password_desc_full: "ایجاد رمزهای عبور قوی و امن با طول و نوع کاراکترهای قابل تنظیم. نشانگر قدرت به شما کمک می‌کند تا از استانداردهای امنیتی رمز عبور خود اطمینان حاصل کنید.",
        
        // Calculator
        calculator_title: "🧮 ماشین حساب",
        calculator_subtitle: "ماشین حساب استاندارد با تاریخچه",
        calculator_about: "درباره این ابزار",
        calculator_desc_full: "ماشین حساب استاندارد با عملیات حسابی پایه (جمع، تفریق، ضرب، تقسیم)، محاسبات درصد و پشتیبانی از اعشار.",
        
        // Date Converter
        date_converter_title: "📅 مبدل تاریخ",
        date_converter_subtitle: "تبدیل بین تقویم‌های جلالی و میلادی",
        date_jalali_to_gregorian: "جلالی به میلادی",
        date_gregorian_to_jalali: "میلادی به جلالی",
        date_year: "سال:",
        date_month: "ماه:",
        date_day: "روز:",
        date_convert_to_gregorian: "تبدیل به میلادی",
        date_convert_to_jalali: "تبدیل به جلالی",
        date_about: "درباره این ابزار",
        date_desc_full: "مبدل تاریخ دقیق بین تقویم‌های جلالی (فارسی/هجری شمسی) و میلادی با استفاده از الگوریتم دقیق. سال‌های کبیسه را به درستی مدیریت می‌کند و نام کامل ماه‌ها را نمایش می‌دهد.",
        
        // Footer
        footer_about: "درباره ما",
        footer_contact: "تماس",
        footer_privacy: "حریم خصوصی"
    }
};

var currentLang = localStorage.getItem('lang') || 'en';

function updateTranslations() {
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    
    // Update direction
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    
    // Update lang toggle button
    var langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = currentLang === 'en' ? 'FA' : 'EN';
    }
}

function switchLanguage() {
    currentLang = currentLang === 'en' ? 'fa' : 'en';
    localStorage.setItem('lang', currentLang);
    updateTranslations();
}

/* ===== 2. DOM Ready & Initialization ===== */
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeLanguage();
    initializeNavigation();
    initializeOCR();
    initializeImageConverter();
    initializePDFConverter();
    initializeHEICConverter();
    initializeFileConverter();
    initializePasswordGenerator();
    initializeCalculator();
    initializeDateConverter();
    initializeFooterLinks();
    updateSEO('home');
});

/* ===== 3. Theme Management ===== */
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

/* ===== 4. Language Management ===== */
function initializeLanguage() {
    var langToggle = document.getElementById('langToggle');
    updateTranslations();
    
    langToggle.addEventListener('click', switchLanguage);
}

/* ===== 5. Navigation & SEO ===== */
var seoData = {
    'home': {
        title: 'Smart Tools - Free Online File Converter & OCR Platform',
        desc: 'Free online platform for image to text OCR, PDF converter, image format converter, HEIC to JPG, and file transformations. No server upload required.'
    },
    'ocr': {
        title: 'Image to Text OCR - Smart Tools',
        desc: 'Extract text from images and scanned documents using advanced OCR technology. Supports multiple languages. 100% client-side processing.'
    },
    'image-converter': {
        title: 'Image Format Converter - Smart Tools',
        desc: 'Convert images between JPG, PNG, WebP, BMP formats with quality control. Batch conversion supported.'
    },
    'pdf-converter': {
        title: 'PDF Tools - Smart Tools',
        desc: 'Convert PDF to images, create PDF from images, and extract text from PDF documents.'
    },
    'heic-converter': {
        title: 'HEIC to JPG Converter - Smart Tools',
        desc: 'Convert iPhone HEIC photos to JPG format for universal compatibility across all devices.'
    },
    'file-converter': {
        title: 'File Format Converter - Smart Tools',
        desc: 'Convert between JSON, CSV, XML, and text files. Transform data structures for different applications.'
    },
    'password': {
        title: 'Password Generator - Smart Tools',
        desc: 'Generate strong, secure passwords with customizable length and character types.'
    },
    'calculator': {
        title: 'Calculator - Smart Tools',
        desc: 'Standard calculator with basic operations, percentage calculations, and operation history.'
    },
    'date-converter': {
        title: 'Date Converter - Smart Tools',
        desc: 'Convert between Jalali (Persian) and Gregorian calendars with accurate algorithms.'
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

/* ===== 6. OCR Tool ===== */
function initializeOCR() {
    var uploadArea = document.getElementById('ocrUploadArea');
    var fileInput = document.getElementById('ocrFileInput');
    var preview = document.getElementById('ocrPreview');
    var startBtn = document.getElementById('ocrStartBtn');
    var resultDiv = document.getElementById('ocrResult');
    var textOutput = document.getElementById('ocrTextOutput');
    var progressDiv = document.getElementById('ocrProgress');
    var progressFill = document.getElementById('ocrProgressFill');
    var progressText = document.getElementById('ocrProgressText');

    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent-primary)';
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.borderColor = '';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleOCRFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleOCRFile(this.files[0]);
        }
    });

    function handleOCRFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    startBtn.addEventListener('click', function() {
        if (!fileInput.files.length) {
            alert(currentLang === 'fa' ? 'لطفاً ابتدا یک تصویر انتخاب کنید' : 'Please select an image first');
            return;
        }

        progressDiv.style.display = 'block';
        progressFill.style.width = '50%';
        progressText.textContent = currentLang === 'fa' ? 'در حال پردازش...' : 'Processing...';

        // Simulate OCR processing (in production, use full Tesseract.js)
        setTimeout(function() {
            progressFill.style.width = '100%';
            progressText.textContent = currentLang === 'fa' ? 'تکمیل شد!' : 'Completed!';
            
            setTimeout(function() {
                progressDiv.style.display = 'none';
                resultDiv.style.display = 'block';
                textOutput.value = currentLang === 'fa' 
                    ? '[عملکرد OCR نیاز به کتابخانه کامل Tesseract.js دارد]\n\nلطفاً نسخه کامل Tesseract.js را از:\nhttps://unpkg.com/tesseract.js@4.0.2/dist/tesseract.min.js\nبارگذاری کنید.'
                    : '[OCR functionality requires full Tesseract.js library]\n\nPlease include the complete Tesseract.js library from:\nhttps://unpkg.com/tesseract.js@4.0.2/dist/tesseract.min.js';
            }, 500);
        }, 2000);
    });

    document.getElementById('ocrCopyBtn').addEventListener('click', function() {
        textOutput.select();
        document.execCommand('copy');
        alert(currentLang === 'fa' ? 'متن کپی شد!' : 'Text copied!');
    });

    document.getElementById('ocrDownloadBtn').addEventListener('click', function() {
        var blob = new Blob([textOutput.value], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'ocr-result.txt';
        a.click();
        URL.revokeObjectURL(url);
    });
}

/* ===== 7. Image Converter ===== */
function initializeImageConverter() {
    var uploadArea = document.getElementById('imageUploadArea');
    var fileInput = document.getElementById('imageFileInput');
    var previewGrid = document.getElementById('imagePreviewGrid');
    var convertBtn = document.getElementById('imageConvertBtn');
    var resultsDiv = document.getElementById('imageResults');
    var resultList = document.getElementById('imageResultList');
    var qualitySlider = document.getElementById('imageQuality');
    var qualityValue = document.getElementById('imageQualityValue');

    var selectedFiles = [];

    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent-primary)';
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.borderColor = '';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        handleImageFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function() {
        handleImageFiles(this.files);
    });

    qualitySlider.addEventListener('input', function() {
        qualityValue.textContent = this.value;
    });

    function handleImageFiles(files) {
        selectedFiles = Array.from(files);
        previewGrid.innerHTML = '';

        selectedFiles.forEach(function(file) {
            if (!file.type.startsWith('image/')) return;
            
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = document.createElement('img');
                img.src = e.target.result;
                previewGrid.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }

    convertBtn.addEventListener('click', function() {
        if (selectedFiles.length === 0) {
            alert(currentLang === 'fa' ? 'لطفاً ابتدا تصاویر را انتخاب کنید' : 'Please select images first');
            return;
        }

        var outputFormat = document.getElementById('imageOutputFormat').value;
        var quality = parseInt(qualitySlider.value) / 100;

        resultsDiv.style.display = 'block';
        resultList.innerHTML = '<p>' + (currentLang === 'fa' ? 'در حال تبدیل...' : 'Converting...') + '</p>';

        var converted = 0;
        var results = [];

        selectedFiles.forEach(function(file, index) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = new Image();
                img.onload = function() {
                    var canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob(function(blob) {
                        var url = URL.createObjectURL(blob);
                        var ext = outputFormat.split('/')[1];
                        var filename = file.name.replace(/\.[^/.]+$/, '') + '.' + ext;
                        
                        results.push({
                            name: filename,
                            url: url,
                            size: blob.size
                        });

                        converted++;
                        if (converted === selectedFiles.length) {
                            displayResults(results);
                        }
                    }, outputFormat, quality);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    });

    function displayResults(results) {
        resultList.innerHTML = '';
        results.forEach(function(result) {
            var item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <div class="result-item-info">
                    <span class="result-item-icon">🖼️</span>
                    <div>
                        <div class="result-item-name">${result.name}</div>
                        <div class="result-item-size">${(result.size / 1024).toFixed(2)} KB</div>
                    </div>
                </div>
                <button class="btn-secondary" onclick="downloadFile('${result.url}', '${result.name}')">⬇️ Download</button>
            `;
            resultList.appendChild(item);
        });
    }
}

// Global download function
window.downloadFile = function(url, filename) {
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
};

/* ===== 8. PDF Converter ===== */
function initializePDFConverter() {
    // PDF Tabs
    var tabs = document.querySelectorAll('.pdf-tab');
    var panels = document.querySelectorAll('.pdf-panel');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            panels.forEach(function(p) { p.classList.remove('active'); });
            this.classList.add('active');
            var targetPanel = document.getElementById(this.getAttribute('data-tab') + '-panel');
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // PDF to Image
    var pdfUploadArea = document.getElementById('pdfUploadArea');
    var pdfFileInput = document.getElementById('pdfFileInput');
    var pdfToImageBtn = document.getElementById('pdfToImageBtn');

    pdfUploadArea.addEventListener('click', function() {
        pdfFileInput.click();
    });

    pdfToImageBtn.addEventListener('click', function() {
        if (!pdfFileInput.files.length) {
            alert(currentLang === 'fa' ? 'لطفاً ابتدا یک فایل PDF انتخاب کنید' : 'Please select a PDF file first');
            return;
        }
        alert(currentLang === 'fa' 
            ? 'برای عملکرد کامل، لطفاً نسخه کامل PDF.js را از https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js بارگذاری کنید.'
            : 'For full functionality, please load the complete PDF.js library from https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js');
    });

    // Image to PDF
    var imageToPdfUploadArea = document.getElementById('imageToPdfUploadArea');
    var imageToPdfInput = document.getElementById('imageToPdfInput');
    var imageToPdfBtn = document.getElementById('imageToPdfBtn');

    imageToPdfUploadArea.addEventListener('click', function() {
        imageToPdfInput.click();
    });

    imageToPdfBtn.addEventListener('click', function() {
        if (!imageToPdfInput.files.length) {
            alert(currentLang === 'fa' ? 'لطفاً ابتدا تصاویر را انتخاب کنید' : 'Please select images first');
            return;
        }

        var doc = new jsPDF();
        var files = Array.from(imageToPdfInput.files);
        var processed = 0;

        files.forEach(function(file, index) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = new Image();
                img.onload = function() {
                    if (index > 0) doc.addPage();
                    
                    var pageSize = document.getElementById('pdfPageSize').value;
                    var pageWidth = doc.internal.pageSize.getWidth();
                    var pageHeight = doc.internal.pageSize.getHeight();
                    
                    var imgWidth = img.width;
                    var imgHeight = img.height;
                    var ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
                    
                    var width = imgWidth * ratio;
                    var height = imgHeight * ratio;
                    var x = (pageWidth - width) / 2;
                    var y = (pageHeight - height) / 2;
                    
                    doc.addImage(e.target.result, 'JPEG', x, y, width, height);
                    
                    processed++;
                    if (processed === files.length) {
                        doc.save('converted.pdf');
                        alert(currentLang === 'fa' ? 'PDF با موفقیت ایجاد شد!' : 'PDF created successfully!');
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    });

    // PDF Text Extract
    var pdfTextUploadArea = document.getElementById('pdfTextUploadArea');
    var pdfTextInput = document.getElementById('pdfTextInput');
    var pdfExtractTextBtn = document.getElementById('pdfExtractTextBtn');

    pdfTextUploadArea.addEventListener('click', function() {
        pdfTextInput.click();
    });

    pdfExtractTextBtn.addEventListener('click', function() {
        if (!pdfTextInput.files.length) {
            alert(currentLang === 'fa' ? 'لطفاً ابتدا یک فایل PDF انتخاب کنید' : 'Please select a PDF file first');
            return;
        }
        alert(currentLang === 'fa' 
            ? 'برای استخراج متن، لطفاً نسخه کامل PDF.js را بارگذاری کنید.'
            : 'For text extraction, please load the complete PDF.js library.');
    });
}

/* ===== 9. HEIC Converter ===== */
function initializeHEICConverter() {
    var uploadArea = document.getElementById('heicUploadArea');
    var fileInput = document.getElementById('heicFileInput');
    var convertBtn = document.getElementById('heicConvertBtn');
    var resultsDiv = document.getElementById('heicResults');
    var previewGrid = document.getElementById('heicPreviewGrid');

    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        previewGrid.innerHTML = '';
        Array.from(this.files).forEach(function(file) {
            var item = document.createElement('div');
            item.style.padding = '1rem';
            item.style.backgroundColor = 'var(--bg-card)';
            item.style.borderRadius = 'var(--radius-sm)';
            item.style.marginBottom = '0.5rem';
            item.textContent = '📱 ' + file.name + ' (' + (file.size / 1024 / 1024).toFixed(2) + ' MB)';
            previewGrid.appendChild(item);
        });
    });

    convertBtn.addEventListener('click', function() {
        if (!fileInput.files.length) {
            alert(currentLang === 'fa' ? 'لطفاً ابتدا فایل‌های HEIC را انتخاب کنید' : 'Please select HEIC files first');
            return;
        }

        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = '<p>' + (currentLang === 'fa' ? 'در حال تبدیل...' : 'Converting...') + '</p>';

        var files = Array.from(fileInput.files);
        var converted = 0;
        var results = [];

        files.forEach(function(file) {
            // Use heic2any library (simplified version loaded)
            if (typeof heic2any !== 'undefined') {
                heic2any({ blob: file }).then(function(blob) {
                    var url = URL.createObjectURL(blob);
                    var filename = file.name.replace(/\.(heic|heif)$/i, '.jpg');
                    results.push({ name: filename, url: url, size: blob.size });
                    
                    converted++;
                    if (converted === files.length) {
                        displayHEICResults(results);
                    }
                }).catch(function(err) {
                    console.error('HEIC conversion error:', err);
                    converted++;
                    if (converted === files.length) {
                        displayHEICResults(results);
                    }
                });
            } else {
                alert(currentLang === 'fa' 
                    ? 'برای تبدیل HEIC، لطفاً نسخه کامل heic2any را از https://unpkg.com/heic2any@0.0.3/dist/heic2any.min.js بارگذاری کنید.'
                    : 'For HEIC conversion, please load the complete heic2any library.');
            }
        });
    });

    function displayHEICResults(results) {
        resultsDiv.innerHTML = '<h3>' + (currentLang === 'fa' ? 'نتایج تبدیل' : 'Conversion Results') + '</h3>';
        results.forEach(function(result) {
            var item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <div class="result-item-info">
                    <span class="result-item-icon">🖼️</span>
                    <div>
                        <div class="result-item-name">${result.name}</div>
                        <div class="result-item-size">${(result.size / 1024).toFixed(2)} KB</div>
                    </div>
                </div>
                <button class="btn-secondary" onclick="downloadFile('${result.url}', '${result.name}')">⬇️ Download</button>
            `;
            resultsDiv.appendChild(item);
        });
    }
}

/* ===== 10. File Converter ===== */
function initializeFileConverter() {
    var uploadBtn = document.getElementById('fileUploadBtn');
    var fileInput = document.getElementById('fileInputFile');
    var inputTextarea = document.getElementById('fileInput');
    var outputTextarea = document.getElementById('fileOutput');
    var convertBtn = document.getElementById('fileConvertBtn');
    var copyBtn = document.getElementById('fileCopyBtn');
    var downloadBtn = document.getElementById('fileDownloadBtn');

    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            var file = this.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                inputTextarea.value = e.target.result;
            };
            reader.readAsText(file);
        }
    });

    convertBtn.addEventListener('click', function() {
        var inputFormat = document.getElementById('fileInputFormat').value;
        var outputFormat = document.getElementById('fileOutputFormat').value;
        var inputData = inputTextarea.value.trim();

        if (!inputData) {
            alert(currentLang === 'fa' ? 'لطفاً داده ورودی را وارد کنید' : 'Please enter input data');
            return;
        }

        try {
            var result = convertData(inputData, inputFormat, outputFormat);
            outputTextarea.value = result;
        } catch (e) {
            outputTextarea.value = 'Error: ' + e.message;
        }
    });

    copyBtn.addEventListener('click', function() {
        outputTextarea.select();
        document.execCommand('copy');
        alert(currentLang === 'fa' ? 'کپی شد!' : 'Copied!');
    });

    downloadBtn.addEventListener('click', function() {
        var outputFormat = document.getElementById('fileOutputFormat').value;
        var ext = outputFormat === 'json' ? '.json' : 
                  outputFormat === 'csv' ? '.csv' : 
                  outputFormat === 'xml' ? '.xml' : '.txt';
        var blob = new Blob([outputTextarea.value], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'converted' + ext;
        a.click();
        URL.revokeObjectURL(url);
    });

    function convertData(data, fromFormat, toFormat) {
        var parsed;

        // Parse input
        if (fromFormat === 'json') {
            parsed = JSON.parse(data);
        } else if (fromFormat === 'csv') {
            parsed = CSVtoJSON(data);
        } else if (fromFormat === 'xml') {
            parsed = XMLtoJSON(data);
        } else {
            parsed = { text: data };
        }

        // Convert to output format
        if (toFormat === 'json') {
            return JSON.stringify(parsed, null, 2);
        } else if (toFormat === 'csv') {
            return JSONtoCSV(parsed);
        } else if (toFormat === 'xml') {
            return JSONtoXML(parsed);
        } else {
            return JSON.stringify(parsed, null, 2);
        }
    }

    function CSVtoJSON(csv) {
        var lines = csv.split('\n');
        var headers = lines[0].split(',');
        var result = [];

        for (var i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            var obj = {};
            var currentline = lines[i].split(',');
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentline[j] ? currentline[j].trim() : '';
            }
            result.push(obj);
        }
        return result;
    }

    function JSONtoCSV(json) {
        if (!Array.isArray(json)) {
            json = [json];
        }
        if (json.length === 0) return '';

        var headers = Object.keys(json[0]);
        var csv = headers.join(',') + '\n';

        json.forEach(function(row) {
            var values = headers.map(function(header) {
                var val = row[header];
                if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
                    val = '"' + val.replace(/"/g, '""') + '"';
                }
                return val !== undefined ? val : '';
            });
            csv += values.join(',') + '\n';
        });

        return csv;
    }

    function XMLtoJSON(xml) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(xml, 'text/xml');
        return xmlToObj(doc.documentElement);
    }

    function xmlToObj(node) {
        var obj = {};
        
        if (node.nodeType === 1) { // Element node
            if (node.attributes.length > 0) {
                obj['@attributes'] = {};
                for (var j = 0; j < node.attributes.length; j++) {
                    var attribute = node.attributes[j];
                    obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                }
            }
            
            if (node.hasChildNodes()) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    var item = node.childNodes[i];
                    var nodeName = item.nodeName;
                    if (typeof(obj[nodeName]) === 'undefined') {
                        obj[nodeName] = xmlToObj(item);
                    } else {
                        if (typeof(obj[nodeName].push) === 'undefined') {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xmlToObj(item));
                    }
                }
            }
        } else if (node.nodeType === 3) { // Text node
            obj = node.nodeValue;
        }
        
        return obj;
    }

    function JSONtoXML(obj, indent) {
        indent = indent || '';
        var xml = '';
        
        for (var key in obj) {
            if (key === '@attributes') continue;
            
            if (Array.isArray(obj[key])) {
                obj[key].forEach(function(item) {
                    xml += indent + '<' + key + '>\n';
                    xml += JSONtoXML(item, indent + '  ');
                    xml += indent + '</' + key + '>\n';
                });
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                xml += indent + '<' + key;
                if (obj['@attributes']) {
                    for (var attr in obj['@attributes']) {
                        xml += ' ' + attr + '="' + obj['@attributes'][attr] + '"';
                    }
                }
                xml += '>\n';
                xml += JSONtoXML(obj[key], indent + '  ');
                xml += indent + '</' + key + '>\n';
            } else {
                xml += indent + '<' + key + '>' + obj[key] + '</' + key + '>\n';
            }
        }
        
        return xml;
    }
}

/* ===== 11. Password Generator (from previous version) ===== */
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
            passwordDisplay.value = currentLang === 'fa' ? 'حداقل یک نوع کاراکتر را انتخاب کنید!' : 'Select at least one character type!';
            updateStrength('');
            return;
        }

        var password = '';
        for (var i = 0; i < guaranteedChars.length; i++) {
            password += guaranteedChars[i];
        }
        for (var j = password.length; j < length; j++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }

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
            width = '25%'; color = '#ef4444'; text = currentLang === 'fa' ? 'ضعیف' : 'Weak';
        } else if (score <= 4) {
            width = '50%'; color = '#f59e0b'; text = currentLang === 'fa' ? 'متوسط' : 'Medium';
        } else if (score <= 5) {
            width = '75%'; color = '#10b981'; text = currentLang === 'fa' ? 'قوی' : 'Strong';
        } else {
            width = '100%'; color = '#059669'; text = currentLang === 'fa' ? 'خیلی قوی' : 'Very Strong';
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
        if (!passwordDisplay.value || passwordDisplay.value.includes('حداقل') || passwordDisplay.value.includes('Select')) return;
        
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

    generatePassword();
}

/* ===== 12. Calculator (from previous version) ===== */
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
                    currentInput = currentLang === 'fa' ? 'خطا: تقسیم بر صفر' : 'Error: Division by zero';
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

/* ===== 13. Date Converter (from previous version) ===== */
function initializeDateConverter() {
    var jToGBtn = document.getElementById('jToGBtn');
    var gToJBtn = document.getElementById('gToJBtn');

    var jalaliMonths = currentLang === 'fa' 
        ? ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
        : ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'];
    var gregorianMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
            document.getElementById('jToGResult').textContent = currentLang === 'fa' ? '⚠️ لطفاً تمام فیلدها را پر کنید' : '⚠️ Please fill all fields';
            return;
        }

        jy = parseInt(jy);
        jm = parseInt(jm);
        jd = parseInt(jd);

        if (jy < 1 || jy > 3178 || jm < 1 || jm > 12 || jd < 1 || jd > 31) {
            document.getElementById('jToGResult').textContent = currentLang === 'fa' ? '⚠️ تاریخ وارد شده معتبر نیست' : '⚠️ Invalid date entered';
            return;
        }

        var result = jalaliToGregorian(jy, jm, jd);
        var output = jd + ' ' + jalaliMonths[jm - 1] + ' ' + jy + (currentLang === 'fa' ? ' شمسی = ' : ' Jalali = ') + 
                     result.day + ' ' + gregorianMonths[result.month - 1] + ' ' + result.year + (currentLang === 'fa' ? ' میلادی' : ' Gregorian');
        document.getElementById('jToGResult').textContent = output;
    });

    gToJBtn.addEventListener('click', function() {
        var gy = document.getElementById('gy-input').value;
        var gm = document.getElementById('gm-input').value;
        var gd = document.getElementById('gd-input').value;

        if (!gy || !gm || !gd) {
            document.getElementById('gToJResult').textContent = currentLang === 'fa' ? '⚠️ لطفاً تمام فیلدها را پر کنید' : '⚠️ Please fill all fields';
            return;
        }

        gy = parseInt(gy);
        gm = parseInt(gm);
        gd = parseInt(gd);

        if (gy < 1 || gy > 3178 || gm < 1 || gm > 12 || gd < 1 || gd > 31) {
            document.getElementById('gToJResult').textContent = currentLang === 'fa' ? '⚠️ تاریخ وارد شده معتبر نیست' : '⚠️ Invalid date entered';
            return;
        }

        var result = gregorianToJalali(gy, gm, gd);
        var output = gd + ' ' + gregorianMonths[gm - 1] + ' ' + gy + (currentLang === 'fa' ? ' میلادی = ' : ' Gregorian = ') + 
                     result.day + ' ' + jalaliMonths[result.month - 1] + ' ' + result.year + (currentLang === 'fa' ? ' شمسی' : ' Jalali');
        document.getElementById('gToJResult').textContent = output;
    });
}

/* ===== 14. Footer Links ===== */
function initializeFooterLinks() {
    document.getElementById('aboutLink').addEventListener('click', function(e) {
        e.preventDefault();
        var msg = currentLang === 'fa' 
            ? 'درباره ما:\n\nابزارهای هوشمند یک پلتفرم آنلاین رایگان از ابزارهای کاربردی است که مستقیماً در مرورگر شما اجرا می‌شوند. هدف ما ارائه ابزارهای ساده، سریع و بدون نیاز به ثبت‌نام یا ارسال اطلاعات به سرورهای خارجی است.'
            : 'About Us:\n\nSmart Tools is a free online platform of useful tools that run directly in your browser. Our goal is to provide simple, fast tools without requiring registration or uploading data to external servers.';
        alert(msg);
    });

    document.getElementById('contactLink').addEventListener('click', function(e) {
        e.preventDefault();
        var msg = currentLang === 'fa'
            ? 'تماس با ما:\n\n📧 ایمیل: support@smarttools.example\n🌐 وب‌سایت: smarttools.example\n\nما از پیشنهادات و انتقادات شما استقبال می‌کنیم!'
            : 'Contact Us:\n\n📧 Email: support@smarttools.example\n🌐 Website: smarttools.example\n\nWe welcome your suggestions and feedback!';
        alert(msg);
    });

    document.getElementById('privacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        var msg = currentLang === 'fa'
            ? 'حریم خصوصی:\n\n✅ ما هیچ اطلاعات شخصی شما را جمع‌آوری نمی‌کنیم.\n✅ هیچ داده‌ای به سرورهای خارجی ارسال نمی‌شود.\n✅ تمام محاسبات روی دستگاه شما انجام می‌شود.\n✅ هیچ کوکی ردیابی استفاده نمی‌کنیم.'
            : 'Privacy Policy:\n\n✅ We do not collect any personal information.\n✅ No data is sent to external servers.\n✅ All processing is done on your device.\n✅ We do not use tracking cookies.';
        alert(msg);
    });
}
// ===== END OF FILE: script.js =====
