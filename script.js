'use strict';

// ===== TRANSLATIONS =====
var T = {
en:{logo:"Smart Tools",nav_home:"Home",nav_ocr:"OCR",nav_img:"Images",nav_pdf:"PDF",nav_pass:"Password",nav_calc:"Calculator",nav_qr:"QR Code",nav_date:"Date",nav_unit:"Units",nav_char:"Counter",nav_num:"Numbers",hero_title:"Free Online Tools Platform",hero_desc:"All tools run 100% in your browser. No data is sent to any server.",t_ocr:"Image to Text (OCR)",t_ocr_d:"Extract text from images using AI-powered OCR.",t_img:"Image Converter",t_img_d:"Convert JPG, PNG, WebP, BMP formats instantly.",t_pdf:"PDF Tools",t_pdf_d:"PDF to image, image to PDF, text extraction.",t_pass:"Password Generator",t_pass_d:"Create strong secure passwords with strength meter.",t_calc:"Calculator",t_calc_d:"Standard calculator with history and percentage.",t_qr:"QR Code Generator",t_qr_d:"Generate QR codes from text or URLs.",t_date:"Date Converter",t_date_d:"Convert Jalali to Gregorian and vice versa.",t_unit:"Unit Converter",t_unit_d:"Convert length and weight units instantly.",t_char:"Character Counter",t_char_d:"Count characters, words, sentences live.",t_num:"Number to Words",t_num_d:"Convert numbers to Persian/English words.",ocr_title:"📄 Image to Text (OCR)",ocr_drop:"Click or drag image here",ocr_start:"Start OCR",ocr_result:"Result:",copy:"Copy",download_txt:"Download TXT",img_title:"🖼️ Image Format Converter",img_drop:"Click or drag images here",quality:"Quality:",convert_all:"Convert All",pdf_title:"📑 PDF Tools",tab_img2pdf:"Image → PDF",tab_pdf2img:"PDF → Image",img2pdf_drop:"Select images to combine into PDF",create_pdf:"Create PDF",pdf2img_drop:"Select a PDF file",convert_to_img:"Convert to Images",pass_title:"🔐 Password Generator",length:"Length:",generate:"🔄 Generate",calc_title:"🧮 Calculator",qr_title:"📱 QR Code Generator",qr_gen:"Generate QR",qr_dl:"⬇️ Download PNG",date_title:"📅 Date Converter",j2g:"Jalali → Gregorian",g2j:"Gregorian → Jalali",convert:"Convert",unit_title:"📐 Unit Converter",tab_length:"Length",tab_weight:"Weight",char_title:"📝 Character Counter",chars:"Characters",chars_ns:"No Spaces",words:"Words",sentences:"Sentences",paras:"Paragraphs",read_time:"Min Read",num_title:"🔢 Number to Words",f_about:"About",f_contact:"Contact",f_privacy:"Privacy"},
fa:{logo:"ابزارهای هوشمند",nav_home:"خانه",nav_ocr:"OCR",nav_img:"تصاویر",nav_pdf:"PDF",nav_pass:"رمز عبور",nav_calc:"ماشین حساب",nav_qr:"QR Code",nav_date:"تاریخ",nav_unit:"واحدها",nav_char:"شمارنده",nav_num:"اعداد",hero_title:"پلتفرم ابزارهای آنلاین رایگان",hero_desc:"تمام ابزارها ۱۰۰٪ در مرورگر شما اجرا می‌شوند. هیچ داده‌ای به سرور ارسال نمی‌شود.",t_ocr:"تبدیل عکس به متن (OCR)",t_ocr_d:"استخراج متن از تصاویر با هوش مصنوعی.",t_img:"مبدل فرمت تصویر",t_img_d:"تبدیل JPG، PNG، WebP، BMP به یکدیگر.",t_pdf:"ابزارهای PDF",t_pdf_d:"تبدیل PDF به عکس، عکس به PDF، استخراج متن.",t_pass:"تولید رمز عبور",t_pass_d:"ایجاد رمزهای قوی با نشانگر قدرت.",t_calc:"ماشین حساب",t_calc_d:"ماشین حساب استاندارد با تاریخچه.",t_qr:"تولید QR Code",t_qr_d:"تولید کد QR از متن یا لینک.",t_date:"مبدل تاریخ",t_date_d:"تبدیل تاریخ شمسی به میلادی و بالعکس.",t_unit:"مبدل واحد",t_unit_d:"تبدیل واحدهای طول و وزن.",t_char:"شمارنده کاراکتر",t_char_d:"شمارش زنده کاراکتر، کلمه، جمله.",t_num:"عدد به حروف",t_num_d:"تبدیل اعداد به حروف فارسی/انگلیسی.",ocr_title:"📄 تبدیل عکس به متن (OCR)",ocr_drop:"کلیک کنید یا عکس را اینجا بکشید",ocr_start:"شروع OCR",ocr_result:"نتیجه:",copy:"کپی",download_txt:"دانلود TXT",img_title:"🖼️ مبدل فرمت تصویر",img_drop:"کلیک کنید یا تصاویر را بکشید",quality:"کیفیت:",convert_all:"تبدیل همه",pdf_title:"📑 ابزارهای PDF",tab_img2pdf:"عکس ← PDF",tab_pdf2img:"PDF ← عکس",img2pdf_drop:"تصاویر را برای ساخت PDF انتخاب کنید",create_pdf:"ساخت PDF",pdf2img_drop:"فایل PDF را انتخاب کنید",convert_to_img:"تبدیل به تصاویر",pass_title:"🔐 تولید رمز عبور",length:"طول:",generate:"🔄 تولید",calc_title:"🧮 ماشین حساب",qr_title:"📱 تولید QR Code",qr_gen:"تولید QR",qr_dl:"⬇️ دانلود PNG",date_title:"📅 مبدل تاریخ",j2g:"شمسی ← میلادی",g2j:"میلادی ← شمسی",convert:"تبدیل",unit_title:"📐 مبدل واحد",tab_length:"طول",tab_weight:"وزن",char_title:"📝 شمارنده کاراکتر",chars:"کاراکتر",chars_ns:"بدون فاصله",words:"کلمات",sentences:"جملات",paras:"پاراگراف",read_time:"دقیقه مطالعه",num_title:"🔢 عدد به حروف",f_about:"درباره ما",f_contact:"تماس",f_privacy:"حریم خصوصی"}
};
var lang = localStorage.getItem('lang') || 'en';

function applyLang(){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
        var k = el.getAttribute('data-i18n');
        if(T[lang][k]) el.textContent = T[lang][k];
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = lang==='fa'?'rtl':'ltr';
    document.querySelector('.lang-text').textContent = lang==='en'?'FA':'EN';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function(){
    applyLang();
    initTheme();
    initNav();
    initOCR();
    initImageConverter();
    initPDF();
    initPassword();
    initCalculator();
    initQR();
    initDateConverter();
    initUnitConverter();
    initCharCounter();
    initNumberToWords();
    initFooter();
});

// ===== THEME =====
function initTheme(){
    var btn = document.getElementById('themeToggle');
    if(localStorage.getItem('theme')==='dark'){document.body.classList.add('dark-mode');document.body.classList.remove('light-mode');btn.querySelector('.theme-icon').textContent='☀️';}
    btn.onclick=function(){document.body.classList.toggle('dark-mode');document.body.classList.toggle('light-mode');var d=document.body.classList.contains('dark-mode');btn.querySelector('.theme-icon').textContent=d?'☀️':'🌙';localStorage.setItem('theme',d?'dark':'light');};
}

// ===== NAVIGATION =====
function initNav(){
    var hamburger=document.getElementById('hamburger'),nav=document.getElementById('mainNav');
    hamburger.onclick=function(){nav.classList.toggle('show');hamburger.classList.toggle('open');};
    document.getElementById('langToggle').onclick=function(){lang=lang==='en'?'fa':'en';localStorage.setItem('lang',lang);applyLang();};
    document.getElementById('logoBtn').onclick=function(){showSection('home');};
    document.querySelectorAll('.nav-btn').forEach(function(b){b.onclick=function(){showSection(this.getAttribute('data-tool'));};});
    document.querySelectorAll('.tool-card').forEach(function(c){c.onclick=function(){showSection(this.getAttribute('data-tool'));};});
}

function showSection(id){
    document.querySelectorAll('.tool-section').forEach(function(s){s.classList.remove('active');});
    document.querySelectorAll('.nav-btn').forEach(function(b){b.classList.remove('active');});
    var sec=document.getElementById(id);if(sec)sec.classList.add('active');
    var btn=document.querySelector('.nav-btn[data-tool="'+id+'"]');if(btn)btn.classList.add('active');
    document.getElementById('mainNav').classList.remove('show');
    document.getElementById('hamburger').classList.remove('open');
    window.scrollTo({top:0,behavior:'smooth'});
}

// ===== OCR =====
function initOCR(){
    var area=document.getElementById('ocrUploadArea'),input=document.getElementById('ocrFileInput'),preview=document.getElementById('ocrPreview');
    area.onclick=function(){input.click();};
    area.ondragover=function(e){e.preventDefault();};
    area.ondrop=function(e){e.preventDefault();if(e.dataTransfer.files[0])loadOCRImage(e.dataTransfer.files[0]);};
    input.onchange=function(){if(this.files[0])loadOCRImage(this.files[0]);};
    function loadOCRImage(f){var r=new FileReader();r.onload=function(e){preview.src=e.target.result;preview.style.display='block';};r.readAsDataURL(f);}
    document.getElementById('ocrStartBtn').onclick=function(){
        if(!input.files[0]){alert(lang==='fa'?'ابتدا یک عکس انتخاب کنید':'Please select an image first');return;}
        var prog=document.getElementById('ocrProgress'),fill=document.getElementById('ocrProgressFill'),txt=document.getElementById('ocrProgressText');
        prog.style.display='block';fill.style.width='10%';txt.textContent='Loading OCR engine...';
        Tesseract.recognize(input.files[0],document.getElementById('ocrLang').value,{logger:function(m){if(m.status==='recognizing text'){fill.style.width=Math.round(m.progress*100)+'%';txt.textContent=Math.round(m.progress*100)+'%';}}})
        .then(function(result){fill.style.width='100%';txt.textContent='Done!';setTimeout(function(){prog.style.display='none';document.getElementById('ocrResult').style.display='block';document.getElementById('ocrOutput').value=result.data.text;},500);})
        .catch(function(err){txt.textContent='Error: '+err.message;fill.style.width='0%';fill.style.background='#ef4444';});
    };
    document.getElementById('ocrCopyBtn').onclick=function(){var t=document.getElementById('ocrOutput');t.select();document.execCommand('copy');alert('Copied!');};
    document.getElementById('ocrDlBtn').onclick=function(){var b=new Blob([document.getElementById('ocrOutput').value],{type:'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='ocr-result.txt';a.click();};
}

// ===== IMAGE CONVERTER =====
function initImageConverter(){
    var area=document.getElementById('imgUploadArea'),input=document.getElementById('imgFileInput'),grid=document.getElementById('imgPreviewGrid');
    var files=[];
    area.onclick=function(){input.click();};
    area.ondragover=function(e){e.preventDefault();};
    area.ondrop=function(e){e.preventDefault();loadImages(e.dataTransfer.files);};
    input.onchange=function(){loadImages(this.files);};
    document.getElementById('imgQuality').oninput=function(){document.getElementById('imgQualVal').textContent=this.value;};
    function loadImages(fl){files=Array.from(fl);grid.innerHTML='';files.forEach(function(f){var r=new FileReader();r.onload=function(e){var img=document.createElement('img');img.src=e.target.result;grid.appendChild(img);};r.readAsDataURL(f);});}
    document.getElementById('imgConvertBtn').onclick=function(){
        if(!files.length){alert(lang==='fa'?'ابتدا تصاویر انتخاب کنید':'Select images first');return;}
        var fmt=document.getElementById('imgOutFormat').value,qual=parseInt(document.getElementById('imgQuality').value)/100;
        var res=document.getElementById('imgResults');res.innerHTML='';
        files.forEach(function(f,i){
            var img=new Image();var r=new FileReader();
            r.onload=function(e){img.src=e.target.result;};
            img.onload=function(){
                var c=document.createElement('canvas');c.width=img.width;c.height=img.height;
                c.getContext('2d').drawImage(img,0,0);
                c.toBlob(function(blob){
                    var url=URL.createObjectURL(blob);
                    var ext=fmt.split('/')[1];
                    var name=f.name.replace(/\.[^.]+$/,'')+'.'+ext;
                    var div=document.createElement('div');div.className='result-box';div.style.marginTop='.5rem';
                    div.innerHTML='<span>'+name+' ('+(blob.size/1024).toFixed(1)+' KB)</span> <a href="'+url+'" download="'+name+'" class="btn-secondary" style="margin-left:.5rem">⬇️</a>';
                    res.appendChild(div);
                },fmt,qual);
            };
            r.readAsDataURL(f);
        });
    };
}

// ===== PDF =====
function initPDF(){
    document.querySelectorAll('.tab-btn').forEach(function(btn){
        btn.onclick=function(){
            var parent=this.closest('.card');
            parent.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active');});
            parent.querySelectorAll('.tab-panel').forEach(function(p){p.classList.remove('active');});
            this.classList.add('active');
            document.getElementById('panel-'+this.getAttribute('data-tab')).classList.add('active');
        };
    });
    // Image to PDF
    var img2pdfArea=document.getElementById('img2pdfUploadArea'),img2pdfInput=document.getElementById('img2pdfInput');
    img2pdfArea.onclick=function(){img2pdfInput.click();};
    document.getElementById('img2pdfBtn').onclick=function(){
        if(!img2pdfInput.files.length){alert('Select images first');return;}
        var doc=new jspdf.jsPDF();var files=Array.from(img2pdfInput.files);var done=0;
        files.forEach(function(f,i){
            var r=new FileReader();
            r.onload=function(e){
                var img=new Image();
                img.onload=function(){
                    if(i>0)doc.addPage();
                    var pw=doc.internal.pageSize.getWidth(),ph=doc.internal.pageSize.getHeight();
                    var ratio=Math.min(pw/img.width,ph/img.height);
                    var w=img.width*ratio,h=img.height*ratio;
                    doc.addImage(e.target.result,'JPEG',(pw-w)/2,(ph-h)/2,w,h);
                    done++;
                    if(done===files.length){doc.save('output.pdf');alert('PDF created!');}
                };
                img.src=e.target.result;
            };
            r.readAsDataURL(f);
        });
    };
    // PDF to Image
    var pdf2imgArea=document.getElementById('pdf2imgUploadArea'),pdf2imgInput=document.getElementById('pdf2imgInput');
    pdf2imgArea.onclick=function(){pdf2imgInput.click();};
    document.getElementById('pdf2imgBtn').onclick=function(){
        if(!pdf2imgInput.files[0]){alert('Select a PDF first');return;}
        var res=document.getElementById('pdf2imgResults');res.innerHTML='<p>Converting...</p>';
        var reader=new FileReader();
        reader.onload=function(e){
            var typedArray=new Uint8Array(e.target.result);
            pdfjsLib.getDocument(typedArray).promise.then(function(pdf){
                res.innerHTML='';
                for(var i=1;i<=Math.min(pdf.numPages,10);i++){
                    (function(pageNum){
                        pdf.getPage(pageNum).then(function(page){
                            var viewport=page.getViewport({scale:2});
                            var canvas=document.createElement('canvas');
                            canvas.width=viewport.width;canvas.height=viewport.height;
                            var ctx=canvas.getContext('2d');
                            page.render({canvasContext:ctx,viewport:viewport}).promise.then(function(){
                                var url=canvas.toDataURL('image/png');
                                var div=document.createElement('div');div.className='result-box';div.style.marginTop='.5rem';
                                div.innerHTML='<span>Page '+pageNum+'</span> <a href="'+url+'" download="page-'+pageNum+'.png" class="btn-secondary">⬇️ Download</a>';
                                res.appendChild(div);
                            });
                        });
                    })(i);
                }
            });
        };
        reader.readAsArrayBuffer(pdf2imgInput.files[0]);
    };
}

// ===== PASSWORD =====
function initPassword(){
    var lenSlider=document.getElementById('passLen'),lenVal=document.getElementById('passLenVal');
    lenSlider.oninput=function(){lenVal.textContent=this.value;};
    document.getElementById('passGenBtn').onclick=generatePass;
    document.getElementById('passCopyBtn').onclick=function(){
        var p=document.getElementById('passDisplay');
        if(p.value){navigator.clipboard.writeText(p.value).then(function(){alert('Copied!');});}
    };
    function generatePass(){
        var len=parseInt(lenSlider.value),chars='',pool='';
        if(document.getElementById('chkUpper').checked){pool+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';}
        if(document.getElementById('chkLower').checked){pool+='abcdefghijklmnopqrstuvwxyz';}
        if(document.getElementById('chkNums').checked){pool+='0123456789';}
        if(document.getElementById('chkSyms').checked){pool+='!@#$%^&*()_+-=[]{}|;:,.<>?';}
        if(!pool){document.getElementById('passDisplay').value='Select at least one type!';return;}
        var arr=new Uint32Array(len);crypto.getRandomValues(arr);
        var pass='';for(var i=0;i<len;i++){pass+=pool[arr[i]%pool.length];}
        document.getElementById('passDisplay').value=pass;
        var score=0;if(len>=12)score++;if(len>=20)score++;if(/[A-Z]/.test(pass))score++;if(/[a-z]/.test(pass))score++;if(/[0-9]/.test(pass))score++;if(/[^A-Za-z0-9]/.test(pass))score++;
        var fill=document.getElementById('strengthFill'),txt=document.getElementById('strengthText');
        var pct=Math.min(score/6*100,100);
        fill.style.width=pct+'%';
        fill.style.background=pct<40?'#ef4444':pct<70?'#f59e0b':'#10b981';
        txt.textContent=pct<40?'Weak':pct<70?'Medium':'Strong';
        txt.style.color=fill.style.background;
    }
    generatePass();
}

// ===== CALCULATOR =====
function initCalculator(){
    var display=document.getElementById('calcDisplay'),history=document.getElementById('calcHistory');
    var current='0',prev='',op=null,reset=false;
    function update(){display.textContent=current.length>12?parseFloat(current).toExponential(5):current;}
    document.querySelectorAll('.c-btn').forEach(function(btn){
        btn.onclick=function(){
            var val=this.getAttribute('data-val'),action=this.getAttribute('data-action');
            if(val!==null&&!action){
                if(reset){current=val;reset=false;}else{current=current==='0'?val:current+val;}
            }else if(val==='.'){
                if(reset){current='0.';reset=false;}else if(!current.includes('.')){current+='.';}
            }else if(action==='op'){
                if(op&&!reset)calc();
                prev=current;op=val;reset=true;
                history.textContent=prev+' '+{'/':'÷','*':'×','-':'−','+':'+'}[val];
            }else if(action==='equals'){calc();}
            else if(action==='clear'){current='0';prev='';op=null;reset=false;history.textContent='';}
            else if(action==='delete'){current=current.length>1?current.slice(0,-1):'0';}
            else if(action==='percent'){current=String(parseFloat(current)/100);}
            update();
        };
    });
    function calc(){
        if(!op||reset)return;
        var a=parseFloat(prev),b=parseFloat(current),r;
        switch(op){case'+':r=a+b;break;case'-':r=a-b;break;case'*':r=a*b;break;case'/':r=b===0?'Error':a/b;break;}
        history.textContent=prev+' '+op+' '+current+' =';
        current=String(Math.round(r*1e10)/1e10);op=null;reset=true;
    }
}

// ===== QR CODE =====
function initQR(){
    document.getElementById('qrGenBtn').onclick=function(){
        var text=document.getElementById('qrInput').value.trim();
        if(!text){alert(lang==='fa'?'متنی وارد کنید':'Enter text or URL');return;}
        var canvas=document.getElementById('qrCanvas'),ctx=canvas.getContext('2d');
        var qr=qrcode(0,'M');
        qr.addData(text);
        qr.make();
        var count=qr.getModuleCount(),cellSize=Math.floor(256/(count+2)),offset=Math.floor((256-cellSize*count)/2);
        canvas.width=256;canvas.height=256;
        ctx.fillStyle='#ffffff';ctx.fillRect(0,0,256,256);
        ctx.fillStyle='#000000';
        for(var r=0;r<count;r++){for(var c=0;c<count;c++){if(qr.isDark(r,c)){ctx.fillRect(offset+c*cellSize,offset+r*cellSize,cellSize,cellSize);}}}
        document.getElementById('qrDlBtn').style.display='inline-flex';
    };
    document.getElementById('qrDlBtn').onclick=function(){
        var a=document.createElement('a');a.download='qrcode.png';a.href=document.getElementById('qrCanvas').toDataURL('image/png');a.click();
    };
}

// ===== DATE CONVERTER =====
function initDateConverter(){
    var jMonths=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
    var gMonths=['January','February','March','April','May','June','July','August','September','October','November','December'];
    function j2g(jy,jm,jd){jy+=1595;var days=-355668+(365*jy)+(Math.floor(jy/33)*8)+Math.floor(((jy%33)+3)/4)+jd+((jm<7)?(jm-1)*31:((jm-7)*30)+186);var gy=400*Math.floor(days/146097);days%=146097;if(days>36524){gy+=100*Math.floor(--days/36524);days%=36524;if(days>=365)days++;}gy+=4*Math.floor(days/1461);days%=1461;if(days>365){gy+=Math.floor((days-1)/365);days=(days-1)%365;}var gd=days+1;var sal=[0,31,((gy%4===0&&gy%100!==0)||(gy%400===0))?29:28,31,30,31,30,31,31,30,31,30,31];var gm;for(gm=0;gm<13&&gd>sal[gm];gm++)gd-=sal[gm];return{y:gy,m:gm,d:gd};}
    function g2j(gy,gm,gd){var gdm=[0,31,59,90,120,151,181,212,243,273,304,334];var jy=(gy<=1600)?0:979;gy-=(gy<=1600)?621:1600;var gy2=(gm>2)?(gy+1):gy;var days=(365*gy)+Math.floor((gy2+3)/4)-Math.floor((gy2+99)/100)+Math.floor((gy2+399)/400)-80+gd+gdm[gm-1];jy+=33*Math.floor(days/12053);days%=12053;jy+=4*Math.floor(days/1461);days%=1461;if(days>365){jy+=Math.floor((days-1)/365);days=(days-1)%365;}var jm=(days<186)?1+Math.floor(days/31):7+Math.floor((days-186)/30);var jd=1+((days<186)?(days%31):((days-186)%30));return{y:jy,m:jm,d:jd};}
    document.getElementById('j2gBtn').onclick=function(){
        var jy=parseInt(document.getElementById('jy').value),jm=parseInt(document.getElementById('jm').value),jd=parseInt(document.getElementById('jd').value);
        if(!jy||!jm||!jd){document.getElementById('j2gResult').textContent='⚠️ Invalid';return;}
        var r=j2g(jy,jm,jd);
        document.getElementById('j2gResult').textContent=jd+' '+jMonths[jm-1]+' '+jy+' → '+r.d+' '+gMonths[r.m-1]+' '+r.y;
    };
    document.getElementById('g2jBtn').onclick=function(){
        var gy=parseInt(document.getElementById('gy').value),gm=parseInt(document.getElementById('gm').value),gd=parseInt(document.getElementById('gd').value);
        if(!gy||!gm||!gd){document.getElementById('g2jResult').textContent='⚠️ Invalid';return;}
        var r=g2j(gy,gm,gd);
        document.getElementById('g2jResult').textContent=gd+' '+gMonths[gm-1]+' '+gy+' → '+r.d+' '+jMonths[r.m-1]+' '+r.y;
    };
}

// ===== UNIT CONVERTER =====
function initUnitConverter(){
    var lenToM={m:1,cm:0.01,km:1000,ft:0.3048,'in':0.0254,mi:1609.344};
    var wgtToKg={kg:1,g:0.001,lb:0.453592,oz:0.0283495};
    function convLen(){var v=parseFloat(document.getElementById('lenInput').value);if(isNaN(v)){document.getElementById('lenOutput').value='';return;}var from=document.getElementById('lenFrom').value,to=document.getElementById('lenTo').value;var result=(v*lenToM[from])/lenToM[to];document.getElementById('lenOutput').value=result.toFixed(3);}
    function convWgt(){var v=parseFloat(document.getElementById('wgtInput').value);if(isNaN(v)){document.getElementById('wgtOutput').value='';return;}var from=document.getElementById('wgtFrom').value,to=document.getElementById('wgtTo').value;var result=(v*wgtToKg[from])/wgtToKg[to];document.getElementById('wgtOutput').value=result.toFixed(3);}
    document.getElementById('lenInput').oninput=convLen;
    document.getElementById('lenFrom').onchange=convLen;
    document.getElementById('lenTo').onchange=convLen;
    document.getElementById('wgtInput').oninput=convWgt;
    document.getElementById('wgtFrom').onchange=convWgt;
    document.getElementById('wgtTo').onchange=convWgt;
    convLen();convWgt();
}

// ===== CHAR COUNTER =====
function initCharCounter(){
    var ta=document.getElementById('charText');
    ta.oninput=function(){
        var t=this.value;
        document.getElementById('cChars').textContent=t.length;
        document.getElementById('cCharsNS').textContent=t.replace(/\s/g,'').length;
        var words=t.trim()?t.trim().split(/\s+/).length:0;
        document.getElementById('cWords').textContent=words;
        document.getElementById('cSentences').textContent=t.trim()?t.split(/[.!?؟]+/).filter(function(s){return s.trim().length>0;}).length:0;
        document.getElementById('cParas').textContent=t.trim()?t.split(/\n\n+/).filter(function(p){return p.trim().length>0;}).length:0;
        document.getElementById('cReadTime').textContent=Math.ceil(words/200);
    };
}

// ===== NUMBER TO WORDS =====
function initNumberToWords(){
    document.getElementById('numConvertBtn').onclick=function(){
        var input=document.getElementById('numInput').value.replace(/[^0-9]/g,'');
        if(!input){document.getElementById('numResult').textContent='⚠️ Enter a number';return;}
        if(input.length>12){document.getElementById('numResult').textContent='⚠️ Max 12 digits';return;}
        document.getElementById('numResult').textContent=numToFa(input);
    };
    function numToFa(num){
        if(num==='0')return'صفر';
        var ones=['','یک','دو','سه','چهار','پنج','شش','هفت','هشت','نه'];
        var teens=['ده','یازده','دوازده','سیزده','چهارده','پانزده','شانزده','هفده','هجده','نوزده'];
        var tens=['','','بیست','سی','چهل','پنجاه','شصت','هفتاد','هشتاد','نود'];
        var hundreds=['','یکصد','دویست','سیصد','چهارصد','پانصد','ششصد','هفتصد','هشتصد','نهصد'];
        var scales=['',' هزار',' میلیون',' میلیارد'];
        function three(n){var r='',h=Math.floor(n/100),rem=n%100,t=Math.floor(rem/10),o=rem%10;if(h)r+=hundreds[h];if(rem>=10&&rem<20){if(r)r+=' و ';r+=teens[rem-10];}else{if(t){if(r)r+=' و ';r+=tens[t];}if(o){if(r)r+=' و ';r+=ones[o];}}return r;}
        while(num.length%3!==0)num='0'+num;
        var groups=[],result='',si=num.length/3-1;
        for(var i=0;i<num.length;i+=3)groups.push(num.substring(i,i+3));
        for(var g=0;g<groups.length;g++){var gv=parseInt(groups[g]);if(gv>0){if(result)result+=' و ';result+=three(gv)+scales[si];}si--;}
        return result;
    }
}

// ===== FOOTER =====
function initFooter(){
    document.getElementById('aboutLink').onclick=function(e){e.preventDefault();alert(lang==='fa'?'ابزارهای هوشمند - مجموعه ابزارهای آنلاین رایگان':'Smart Tools - Free Online Tools Platform');};
    document.getElementById('contactLink').onclick=function(e){e.preventDefault();alert(lang==='fa'?'ایمیل: support@smarttools.com':'Email: support@smarttools.com');};
    document.getElementById('privacyLink').onclick=function(e){e.preventDefault();alert(lang==='fa'?'هیچ داده‌ای به سرور ارسال نمی‌شود.':'No data is sent to any server. All processing is local.');};
}
