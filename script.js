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
