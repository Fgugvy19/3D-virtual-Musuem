// ========== نظام إدارة المستخدمين ========== //
const usersKey = '3d_museum_users_v2';
const currentUserKey = 'current_user_v2';

// تشفير أساسي (للتجارب فقط)
function simpleEncrypt(password) {
    return btoa(encodeURIComponent(password));
}

function simpleDecrypt(encrypted) {
    return decodeURIComponent(atob(encrypted));
}

function getUsers() {
    return JSON.parse(localStorage.getItem(usersKey)) || [];
}

function saveUser(user) {
    const users = getUsers();
    if(users.some(u => u.email === user.email)) {
        throw new Error('الإيميل مسجل مسبقاً');
    }
    users.push(user);
    localStorage.setItem(usersKey, JSON.stringify(users));
}

function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => 
        u.email === email && 
        simpleDecrypt(u.password) === password
    );
    
    if(!user) throw new Error('بيانات الدخول غير صحيحة');
    localStorage.setItem(currentUserKey, JSON.stringify(user));
    return user;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(currentUserKey));
}

function logoutUser() {
    localStorage.removeItem(currentUserKey);
}

// ========== تحميل أولي للبيانات ========== //
document.addEventListener('DOMContentLoaded', function() {
    // حماية الصفحات
    const protectedPages = ['index.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if(protectedPages.includes(currentPage) && !getCurrentUser()) {
        window.location.href = 'signin';  // Instead of signin.html
    }
});



let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');
let languageToggle = document.getElementById('languageToggle');
let currentUtterance = null;
let currentAnimateElement = null;
let englishContents = {};

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 10000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}

let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)

function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}


function reattachModalEvents() {
  
    document.querySelectorAll('.see-more').forEach(button => {
        button.addEventListener('click', function() {
            const contentId = this.getAttribute('data-modal-content');
            const modalContent = document.getElementById(contentId).cloneNode(true);
            modalContent.style.display = 'block';

            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = '';
            modalBody.appendChild(modalContent);

           
            document.getElementById('modalOverlay').style.display = 'flex';

           
            startSpeakAndAnimate(modalContent);
        });
    });


    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('modalOverlay').style.display = 'none';
        stopSpeakAndAnimate(); 
    });


    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            stopSpeakAndAnimate();
        }
    });
}


function startSpeakAndAnimate(modalContent) {
  
    const svgElements = modalContent.querySelectorAll('svg');
    const buttons = modalContent.querySelectorAll('button');
    const elementsToRemove = [...svgElements, ...buttons];
    elementsToRemove.forEach(el => el.remove());
    const text = modalContent.textContent;

    stopSpeakAndAnimate();

   
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = isArabic ? 'ar-EG' : 'en-US';
    speechSynthesis.speak(currentUtterance);

    const animateElement = modalContent.querySelector('animate');
    if (animateElement) {
        animateElement.beginElement();
        currentAnimateElement = animateElement;
    }

  
    currentUtterance.onend = () => {
        if (currentAnimateElement) {
            currentAnimateElement.endElement(); 
        }
    };
}


function stopSpeakAndAnimate() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); 
    }
    if (currentAnimateElement) {
        currentAnimateElement.endElement();
    }
}


let isArabic = false;

languageToggle.addEventListener('click', function() {
    isArabic = !isArabic;
    this.textContent = isArabic ? 'English' : 'العربية';
    document.body.dir = isArabic ? 'rtl' : 'ltr';
    translateContent(isArabic);
});

function translateContent(isArabic) {
    // Translate slider content
    const sliderElements = [
        {id: 'author1', key: 'author1'}, {id: 'title1', key: 'title1'}, 
        {id: 'topic1', key: 'topic1'}, {id: 'des1', key: 'des1'},
        {id: 'author2', key: 'author2'}, {id: 'title2', key: 'title2'}, 
        {id: 'topic2', key: 'topic2'}, {id: 'des2', key: 'des2'},
        {id: 'author3', key: 'author3'}, {id: 'title3', key: 'title3'}, 
        {id: 'topic3', key: 'topic3'}, {id: 'des3', key: 'des3'},
        {id: 'author4', key: 'author4'}, {id: 'title4', key: 'title4'}, 
        {id: 'topic4', key: 'topic4'},{id: 'des4', key: 'des4'},
        {id: 'author5', key: 'author5'}, {id: 'title5', key: 'title5'}, 
{id: 'topic5', key: 'topic5'}, {id: 'des5', key: 'des5'},
{id: 'author6', key: 'author6'}, {id: 'title6', key: 'title6'}, 
{id: 'topic6', key: 'topic6'}, {id: 'des6', key: 'des6'},
         {id: 'thumbnailtitle1', key: 'thumbnailtitle1'},
		{id: 'thumbnailtitle2', key: 'thumbnailtitle2'}, {id: 'thumbnailtitle3', key: 'thumbnailtitle3'},
		{id: 'thumbnailtitle4', key: 'thumbnailtitle4'}, {id: 'thumbnaildescription1', key: 'thumbnaildescription1'},
		{id: 'thumbnaildescription2', key: 'thumbnaildescription2'},{id: 'thumbnaildescription3', key: 'thumbnaildescription3'},
		{id: 'thumbnaildescription4', key: 'thumbnaildescription4'},{id: 'thumbnailtitle5', key: 'thumbnailtitle5'}, {id: 'thumbnaildescription5', key: 'thumbnaildescription5'},
{id: 'thumbnailtitle6', key: 'thumbnailtitle6'}, {id: 'thumbnaildescription6', key: 'thumbnaildescription6'},

    ];

    sliderElements.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            element.innerHTML = isArabic ? 
                getArabicTranslation(item.key) : 
                getEnglishContent(item.key); 
				 }
    });

   
    const contentElements = document.querySelectorAll('.modal-details');
    contentElements.forEach(content => {
        content.style.direction = isArabic ? 'rtl' : 'ltr';
        content.innerHTML = isArabic ? 
            getArabicTranslation(content.id) : 
            getEnglishContent(content.id);
    });
    
   
    document.querySelectorAll('.see-more').forEach(button => {
        button.textContent = isArabic ? 'المزيد من المعلومات' : 'MORE INFO';
    });
    
    reattachModalEvents();
	  stopSpeak();
}

function getArabicTranslation(id) {
    const translations = {
        author1: "   ",
        title1: "أبو سمبل",
        topic1: "المعبد العظيم",
        des1: `<div style="font-family: 'Cairo';">
</br>
يُعد أبو سمبل، الموقع المدرج ضمن قائمة اليونسكو للتراث العالمي في جنوب مصر، موطنًا لمعبدين منحوتين في الصخر بناها الفرعون رمسيس الثاني في القرن الثالث عشر قبل الميلاد. المعبد الرئيسي، الذي يحرسه أربعة تماثيل ضخمة لرمسيس الثاني يبلغ ارتفاع كل منها 20 مترًا، يتماشى مع الشمس لتضيء قدس الأقداس الداخلي في يومي 22 فبراير و22 أكتوبر من كل عام.          
  </div>`,
        
        author2: "  ",
        title2: "مقبرة",
        topic2: "مينا",
        des2: `<div style="font-family: 'Cairo';">
		</br>
تقع مقبرة "مينا"  في مقبرة طيبة على الضفة الغربية لنهر النيل بالقرب من الأقصر. تعود المقبرة إلى عصر الأسرة الثامنة عشرة في الدولة الحديثة (حوالي 1550–1292 قبل الميلاد)، وكانت ملكًا لـ"مينا"، الذي كان كاتبًا ومشرفًا على الحقول في عهد الملك تحتمس الرابع أو أمنحتب الثالث.        
    </div>`,

        author3: "  ",
        title3: "مقبرة",
        topic3: "واح تي",
        des3: `<div style="font-family: 'Cairo';">
</br>
في نوفمبر 2018، تم اكتشاف مقبرة "واح تي" في مقبرة سقارة. تعود المقبرة إلى الفترة ما بين عامي 2415 و2405 قبل الميلاد، ويبلغ طولها 10 أمتار وعرضها 3 أمتار. تحتوي المقبرة على نقوش بارزة تصور "واح تي" وزوجته "وريت بتاح" وأطفاله الأربعة وأمه "ميريت مين". قام "واح تي" بسرقة المقبرة من أخيه ودُفن فيها مع عائلته، على الرغم من أنهم لم يُدفنوا جميعًا في توابيت خشبية.      
      </div>`,

        author4: "  ", 
        title4: "مقبرة",
        topic4: " ميهو",
        des4: `<div style="font-family: 'Cairo';">
		</br>
تُعد مقبرة "ميهو" مقبرة أثرية تعود لعصر الدولة القديمة، وتقع في مقبرة سقارة، وترجع إلى عصر الأسرة السادسة (حوالي عام 2340 قبل الميلاد). كان ميهو مسؤولًا رفيع المستوى، حيث شغل مناصب مثل "الوزير" و"رئيس القضاة" و"مشرف على كُتَّاب الملكي".

تشتهر المقبرة بنقوشها البارزة الملونة والمحفوظة جيدًا، والتي تصور مشاهد الصيد وصيد الأسماك والزراعة والولائم، مما يقدم لمحة عن الحياة اليومية في مصر القديمة. بعد إغلاقها أمام الجمهور قرابة 80 عامًا، أُعيد افتتاحها للزيارة في عام 2018.

            </div>`,

        content1: `
		</br>
                  <h2>أبو سمبل</h2>
	<h3 style="font-family: 'Cairo';">معبد أبو سمبل: تحفة من العظمة القديمة والبراعة الحديثة</h3>
    <p style="font-family: 'Cairo';">يعد معبدا أبو سمبل، المدرجان ضمن مواقع التراث العالمي لليونسكو في جنوب مصر، شاهدًا على عظمة العمارة المصرية القديمة وبراعة الحفظ الحديث. تم بناء المجمع خلال عهد الفرعون رمسيس الثاني (1279–1213 قبل الميلاد)، ويتكون من معبدين منحوتين في الصخر: المعبد الكبير، المخصص لرمسيس الثاني والآلهة آمون ورع-حوراختي وبتاح، والمعبد الصغير، الذي يكرم الملكة نفرتاري والإلهة حتحور.</p>
 <h3 style="font-family: 'Cairo';">البناء والغرض</h3>

<p style="font-family: 'Cairo';">أمر رمسيس الثاني ببناء المعابد لإظهار قوة مصر ونفوذها الثقافي في النوبة، وهي منطقة غنية بالذهب والبضائع التجارية. تم نحت المعبد الكبير في جانب الجبل حوالي عام 1264 قبل الميلاد، ويضم أربعة تماثيل ضخمة لرمسيس الثاني بارتفاع 20 مترًا تحرس مدخله. أما المعبد الصغير، وهو واحد من المعابد القليلة المخصصة لملكة، فيبرز أهمية نفرتاري، حيث تقف تماثيلها وتماثيل رمسيس الثاني على نفس الارتفاع—وهو شرف نادر في الفن المصري.</p>
<h3 style="font-family: 'Cairo';">إعادة الاكتشاف</h3>

<p style="font-family: 'Cairo';">مع مرور الوقت، تم التخلي عن المعابد ودفنها تحت الرمال. تم اكتشافها مرة أخرى في عام 1813 من قبل المستكشف السويسري يوهان لودفيج بوركهارت. وقام المستكشف الإيطالي جيوفاني بلزوني لاحقًا بحفر الموقع في عام 1817، مما كشف عن روعة المعابد للعالم.</p>
 <h3 style="font-family: 'Cairo';">النقل: معجزة حديثة</h3>

<p style="font-family: 'Cairo';">في الستينيات، واجهت المعابد خطر الغرق بسبب بناء السد العالي في أسوان. وقادت اليونسكو جهودًا دولية لإنقاذ الموقع عن طريق تقطيع المعابد بدقة إلى كتل ضخمة، ونقلها إلى موقع أعلى بـ 65 مترًا وأبعد بـ 200 متر عن النيل. تم الانتهاء من هذا المشروع الضخم في عام 1968 بتكلفة بلغت 40 مليون دولار، ولا يزال يُعتبر أحد أعظم الإنجازات الهندسية في التاريخ.</p>
<h3 style="font-family: 'Cairo';">أبرز المعالم المعمارية</h3>

<p style="font-family: 'Cairo';">•	المعبد الكبير: يتميز الواجهة بأربعة تماثيل ضخمة لرمسيس الثاني. في الداخل، يتبع المعبد التصميم المصري التقليدي، مع قاعة أعمدة وغرف ذات أعمدة ومحراب. يتماشى المعبد مع الشمس بحيث تضيء أشعة الشمس المحراب الداخلي مرتين في السنة (22 فبراير و22 أكتوبر)، مما ينير تماثيل رمسيس والآلهة.</p>
<p style="font-family: 'Cairo';"•	المعبد الصغير: مخصص لحتحور ونفرتاري، ويتميز هذا المعبد بتماثيل للملك والملكة، مما يرمز إلى مكانتهما المتساوية. ويحتوي الداخل على نقوش معقدة وأعمدة على شكل رأس حتحور.</p>
 <h3 style="font-family: 'Cairo';">الأهمية الثقافية</h3>

<p style="font-family: 'Cairo';">لا تحتفل المعابد فقط بحكم رمسيس الثاني، بل تعكس أيضًا الإنجازات الدينية والفنية لمصر القديمة. يبرز المحاذاة الشمسية والنقوش التفصيلية، التي تصور المعارك والتقديمات، فهم المصريين المتقدم لعلم الفلك والفن.</p>
<p style="font-family: 'Cairo';">اليوم، يجذب أبو سمبل الزوار من جميع أنحاء العالم، مما يقدم لمحة عن مجد مصر القديمة والجهود الرائعة للحفاظ عليها للأجيال القادمة.</p>
<h3 style="font-family: 'Cairo';">نموذج ثلاثي الأبعاد للمعبد</h3>
 


    <iframe 
        id="matterport-iframe"
        src="https://my.matterport.com/show/?m=VxYAEMXh6dW&help=1&brand=0&ts=1&play=1" 
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>

        `,
        content2: `
		</br>
           <h2>مقبرة مينا</h2>
	<h3 style="font-family: 'Cairo';">مقبرة مينا: نظرة على حياة مصر القديمة</h3>
    <p style="font-family: 'Cairo';">تقع مقبرة مينا في مقابر طيبة على الضفة الغربية لنهر النيل بالقرب من الأقصر في مصر، وهي واحدة من أكثر المقابر حفظًا وزخرفةً من فترة المملكة الحديثة (حوالي   1550 الي 1070 قبل الميلاد). عاش مينا خلال الأسرة الثامنة عشرة في عهد الفرعون تحتمس الرابع، وكان مسؤولًا رفيع المستوى يحمل لقب "كاتب حقول سيد الأرضين". كانت مهمته الرئيسية الإشراف على الإنتاج الزراعي وإدارة ممتلكات الفرعون، مما جعله شخصية مهمة في إدارة مصر القديمة.</p>

<p style="font-family: 'Cairo';">تُعرف المقبرة، التي تحمل الرمز TT69 (مقبرة طيبة 69)، بلوحاتها الجدارية الحية والمفصلة التي توفر نظرة رائعة على الحياة اليومية والمعتقدات الدينية والتقاليد الفنية لمصر القديمة. تصور هذه اللوحات مجموعة متنوعة من المشاهد، بما في ذلك الأنشطة الزراعية والصيد وصيد الأسماك وتقديم القرابين للآلهة، بالإضافة إلى لحظات عائلية حميمة. لا تُظهر الأعمال الفنية واجبات مينا المهنية فحسب، بل تعكس أيضًا حياته الشخصية، حيث تُظهر زوجته حنوت تاوي وأطفاله.</p>
 <h3 style="font-family: 'Cairo';">المعالم المعمارية</h3>


<p style="font-family: 'Cairo';">تتبع مقبرة مينا تصميمًا نموذجيًا لمقابر النخبة في المملكة الحديثة. تتكون من قاعة عرضية، وممر طويل، وحجرة داخلية. القاعة العرضية هي الجزء الأكثر زخرفة، حيث تعرض مشاهد لمينا وعائلته في أنشطة مختلفة. يؤدي الممر إلى الحجرة الداخلية، حيث يقع بئر الدفن. تغطي جدران المقبرة لوحات مرسومة بدقة حافظت على ألوانها الزاهية عبر آلاف السنين، وذلك بفضل المناخ الجاف في مصر وعزلة المقبرة النسبية.</p>
 <h3 style="font-family: 'Cairo';">الأهمية الفنية</h3>

<p style="font-family: 'Cairo';">تُعتبر اللوحات في مقبرة مينا من حيث جودتها الفنية واهتمامها بالتفاصيل. استخدم الفنانون مزيجًا من الأساليب الطبيعية والرمزية، حيث قاموا بتصوير جوهر الحياة اليومية مع الالتزام بالتقاليد الدينية والثقافية للعصر. على سبيل المثال، تصور المشاهد الزراعية المزارعين وهم يحرثون الحقول ويحصدون المحاصيل ويرعون الماشية، مما يوفر نظرة على الأساس الاقتصادي لمصر القديمة. وبالمثل، ترمز مشاهد الصيد وصيد الأسماك إلى قدرة مينا على إعالة أسرته وسيطرته على العالم الطبيعي.</p>

<p style="font-family: 'Cairo';">كما أن الموضوعات الدينية بارزة في زخرفة المقبرة. تُظهر مشاهد تقديم القرابين للآلهة، بما في ذلك أوزوريس وأنوبيس وحتحور، تدين مينا وأمله في رحلة ناجحة إلى الحياة الآخرة. تصوير مراسم "وزن القلب"، وهي لحظة حاسمة في المفهوم المصري للحياة الآخرة، يؤكد على أهمية النزاهة الأخلاقية والحكم الإلهي.</p>
<h3 style="font-family: 'Cairo';">رؤى تاريخية وثقافية</h3>

<p style="font-family: 'Cairo';">تعد مقبرة مينا مصدرًا قيمًا لفهم الهياكل الاجتماعية والاقتصادية لمصر القديمة. على سبيل المثال، توضح التمثيلات التفصيلية للممارسات الزراعية الأدوات والتقنيات التي استخدمها المزارعون، بالإضافة إلى تنظيم العمل. كما أن إدراج عائلة مينا في الأعمال الفنية يبرز أهمية العلاقات الأسرية ودور المرأة في الأسر النخبوية.</p>

<p style="font-family: 'Cairo';">تعكس المقبرة أيضًا المعتقدات الدينية للعصر، وخاصة التركيز على الحياة الآخرة والحاجة إلى طقوس الدفن المناسبة. كان الهدف من الزخارف والنقوش المتقنة هو ضمان رفاهية مينا الأبدية وتأمين مكانه بين الآلهة.</p>
 <h3 style="font-family: 'Cairo';">الحفظ والسياحة</h3>

<p style="font-family: 'Cairo';">في السنوات الأخيرة، خضعت مقبرة مينا لجهود حفظ مكثفة لحماية لوحاتها الهشة من التلف الناجم عن العوامل البيئية والنشاط البشري. تم استخدام التقنيات الحديثة، مثل المسح ثلاثي الأبعاد والترميم الرقمي، لتوثيق وحفظ الأعمال الفنية في المقبرة للأجيال القادمة.</p>

<p style="font-family: 'Cairo';">اليوم، تُعتبر مقبرة مينا وجهة شهيرة للسياح والعلماء على حد سواء. توفر لوحاتها المحفوظة جيدًا نافذة فريدة على عالم مصر القديمة، مما يجعلها موقعًا أساسيًا لأي شخص مهتم بتاريخ وفن وثقافة هذه الحضارة الرائعة.</p>
<h3 style="font-family: 'Cairo';">نموذج ثلاثي الأبعاد للمقبرة</h3>



    <iframe 
        id="matterport-iframe"
        src="https://my.matterport.com/show/?m=vLYoS66CWpk&help=1&brand=0&ts=1&play=1" 
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>

   
        `,
        content3: `
		</br>
                <h2>مقبرة واح تي</h2>
<h3 style="font-family: 'Cairo';">قبر واح تي: اكتشاف رائع من مصر القديمة</h3>
<p style="font-family: 'Cairo';">قبر واح تي، الذي تم اكتشافه في عام 2018 في مقبرة سقارة بالقرب من القاهرة، مصر، يُعد أحد أهم الاكتشافات الأثرية في القرن الحادي والعشرين. يعود تاريخ هذا القبر إلى الأسرة الخامسة في المملكة القديمة (حوالي 2500–2350 قبل الميلاد)، وهو يخص كاهنًا رفيع المستوى يُدعى واح تي، الذي خدم تحت حكم الفرعون نفر إركارع كاكاي. قدمت حالة الحفظ الاستثنائية للقبر، والنقوش المعقدة، والرسومات الجدارية الزاهية، رؤى لا تقدر بثمن لعلماء الآثار حول الممارسات الدينية، والحياة اليومية، والتقاليد الفنية في مصر القديمة.</p>

<h3 style="font-family: 'Cairo';">الاكتشاف والأهمية</h3>
<p style="font-family: 'Cairo';">تم اكتشاف القبر من قبل فريق أثري مصري بقيادة الدكتور مصطفى وزيري، الأمين العام للمجلس الأعلى للآثار في مصر. لفت الاكتشاف أنظار العالم بسبب حالة الحفظ المذهلة للقبر والكنوز الأثرية والنقوش التي عُثر عليها بداخله. القبر هو عبارة عن مصطبة، وهي نوع من الهياكل المستطيلة ذات الأسقف المسطحة التي كانت تُستخدم عادة لدفن النخبة خلال المملكة القديمة.</p>
<p style="font-family: 'Cairo';">كان واح تي يحمل لقب "كاهن التطهير الملكي" وكان أيضًا مشرفًا على القصر الملكي، مما يدل على مكانته الرفيعة في بلاط الفرعون نفر إركارع كاكاي. تعكس الزخارف والنقوش المعقدة في القبر أهميته وارتباطه الوثيق بالفرعون.</p>

<h3 style="font-family: 'Cairo';">الميزات المعمارية</h3>
<p style="font-family: 'Cairo';">قبر واح تي هو هيكل مستطيل كبير يحتوي على سلسلة من الغرف والممرات. القاعة الرئيسية مزينة بنقوش محفورة بدقة ورسومات ملونة تصور مشاهد من حياة واح تي، وعائلته، وواجباته الدينية. يحتوي القبر على باب وهمي، وهو عنصر معماري شائع في مقابر مصر القديمة، كان يُعتقد أنه يعمل كبوابة بين عالم الأحياء والعالم الآخر.</p>
<p style="font-family: 'Cairo';">جدران القبر مغطاة بنقوش هيروغليفية توفر تفاصيل عن ألقاب واح تي، ونسب عائلته، والقرابين المقدمة للآلهة. هذه النقوش لا تقدر بثمن لفهم السياق الاجتماعي والديني للأسرة الخامسة.</p>

<h3 style="font-family: 'Cairo';">رؤى فنية وثقافية</h3>
<p style="font-family: 'Cairo';">تعد زخارف القبر تحفة فنية من عصر المملكة القديمة. تصور النقوش والرسومات مجموعة متنوعة من المشاهد، بما في ذلك الأنشطة الزراعية، والصيد، وصيد الأسماك، والطقوس الدينية. لا تُبرز هذه الصور دور واح تي ككاهن فحسب، بل توفر أيضًا لمحة عن الحياة اليومية للمصريين القدماء. على سبيل المثال، تُظهر مشاهد المزارعين وهم يحصدون المحاصيل والحرفيين أثناء العمل الأنشطة الاقتصادية التي كانت تدعم المملكة.</p>
<p style="font-family: 'Cairo';">من أبرز ميزات القبر تصوير عائلة واح تي. زوجته، وريت بتاح، وأطفالهم يظهرون بشكل بارز في الأعمال الفنية، مما يؤكد على أهمية العائلة في المجتمع المصري القديم. كان يُعتقد أن إدراج أفراد العائلة في زخارف المقابر يضمن مشاركتهم في الحياة الآخرة.</p>
<p style="font-family: 'Cairo';">كما أن الموضوعات الدينية تحتل مكانة مركزية في زخارف القبر. تُظهر مشاهد تقديم القرابين للآلهة، بما في ذلك رع، وأوزوريس، وأنوبيس، مدى إخلاص واح تي وأمله في رحلة ناجحة إلى العالم الآخر. يحتوي القبر أيضًا على تصوير لطقوس جنائزية، مثل مراسم "فتح الفم"، التي كانت تُجرى لضمان قدرة المتوفى على الأكل والشرب والكلام في الحياة الآخرة.</p>

<h3 style="font-family: 'Cairo';">آبار الدفن والقطع الأثرية</h3>
<p style="font-family: 'Cairo';">يحتوي القبر على عدة آبار دفن، بعضها كان سليمًا عند الاكتشاف. كانت هذه الآبار تحتوي على مجموعة متنوعة من القطع الأثرية، بما في ذلك التماثيل، والفخار، والأقنعة الخشبية. من أبرز الاكتشافات تمثال من الحجر الجيري لواح تي نفسه، والذي يوفر لمحة نادرة عن المظهر الجسدي لكاهن مصري قديم.</p>
<p style="font-family: 'Cairo';">القطع الأثرية التي عُثر عليها في القبر ليست قيّمة فقط لجودتها الفنية، ولكن أيضًا للمعلومات التي توفرها عن ممارسات الدفن في مصر القديمة. على سبيل المثال، وجود تماثيل الأوشابتي (تماثيل جنائزية صغيرة) يشير إلى أن واح تي كان يؤمن بضرورة وجود خدم في العالم الآخر ليقوموا بالمهام نيابة عنه.</p>

<h3 style="font-family: 'Cairo';">الحفظ والسياحة</h3>
<p style="font-family: 'Cairo';">منذ اكتشافه، أصبح قبر واح تي محورًا للبحث الأثري وجهود الحفظ. تتطلب النقوش والرسومات الحساسة في القبر الحفاظ الدقيق لحمايتها من التلف البيئي وتأثيرات السياحة. تم استخدام التقنيات الحديثة، مثل المسح ثلاثي الأبعاد ورسم الخرائط الرقمية، لتوثيق ميزات القبر وضمان الحفاظ عليه على المدى الطويل.</p>
<p style="font-family: 'Cairo';">يُعد القبر أيضًا وجهة سياحية شهيرة، حيث يوفر فرصة فريدة لتجربة عظمة الفن والعمارة المصرية القديمة. أعاد اكتشاف القبر إحياء الاهتمام بمقبرة سقارة، التي تضم العديد من المقابر والآثار الهامة الأخرى.</p>
<h3 style="font-family: 'Cairo';">نموذج ثلاثي الأبعاد للمقبرة</h3>

    <iframe 
        id="matterport-iframe"
        src="https://my.matterport.com/show/?m=BsXpwTSYSyN&help=1&brand=0&ts=1&play=1" 
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>

   
        `,
        content4: `
		</br>
         <h2 style="font-family: 'Cairo';">مقبرة ميهو</h2>
<h3 style="font-family: 'Cairo';">مقبرة ميهو: نظرة على حياة مسؤول مصري قديم</h3>
<p style="font-family: 'Cairo';">يقع قبر ميهو في مقبرة سقَارة بالقرب من القاهرة، مصر، وهو أحد أكثر مواقع الدفن إثارة للاهتمام من الأسرة السادسة في المملكة القديمة (حوالي 2345 الي 2181 قبل الميلاد). يعود هذا القبر إلى ميهو، وهو مسؤول رفيع المستوى شغل عدة مناصب مهمة، بما في ذلك "الوزير" (أعلى منصب إداري في مصر القديمة)، و"رئيس القضاة"، و"مشْرٍِِِف على المحاكم الست الكبرى". خدم ميهو تحت حكم الفرعون تتي وببي الأول، ويعكس قبره مكانته المرموقة والثروة التي جمعها خلال حياته.</p>
<p style="font-family: 'Cairo';">تم اكتشاف قبر ميهو في عام 1940 من قبل عالم الآثار المصري زكي سعد، ومنذ ذلك الحين تم الاحتفاء به لنقوشه الجدارية المعقدة، ورسوماته الزاهية، وتصميمه المعماري. يوفر القبر رؤى قيّمة عن حياة وواجبات ومعتقدات مسؤول من النخبة في مصر القديمة.</p>

<h3 style="font-family: 'Cairo';">الميزات المعمارية</h3>
<p style="font-family: 'Cairo';">قبر ميهو هو مصطبة كبيرة متعددة الغرف، وهو نوع من هياكل المقابر ذات الأسقف المسطحة التي كانت تُستخدم عادة لدفن النخبة خلال المملكة القديمة. ينقسم القبر إلى عدة أقسام، بما في ذلك قاعة القرابين، وغرفة الدفن، والسرداب (غرفة مغلقة تحتوي على تماثيل للمتوفى). تُزين جدران القبر نقوش محفورة بدقة ورسومات ملونة تصور مشاهد من حياة ميهو، وواجباته المهنية، ومعتقداته الدينية.</p>
<p style="font-family: 'Cairo';">من أبرز ميزات القبر الباب الوهمي، وهو عنصر معماري شائع في مقابر مصر القديمة. كان يُعتقد أن الباب الوهمي يعمل كبوابة بين عالم الأحياء والعالم الآخر، مما يسمح للمتوفى بتلقي القرابين والتواصل مع الأحياء.</p>

<h3 style="font-family: 'Cairo';">الأهمية الفنية والثقافية</h3>
<p style="font-family: 'Cairo';">يشتهر قبر ميهو بأعماله الفنية الاستثنائية، التي تُظهر مهارة وإبداع الحرفيين المصريين القدماء. تصور النقوش والرسومات مجموعة واسعة من المشاهد، بما في ذلك الأنشطة الزراعية، والصيد، وصيد الأسماك، والطقوس الدينية. توفر هذه الصور تصويرًا حيًا للحياة اليومية في مصر القديمة وتُبرز دور ميهو كمسؤول رفيع المستوى.</p>

<h4 style="font-family: 'Cairo';">مشاهد من الحياة اليومية</h4>
<p style="font-family: 'Cairo';">تشمل زخارف القبر تصويرًا تفصيليًا للأنشطة الزراعية، مثل الحرث، والبذر، وحصاد المحاصيل. تعكس هذه المشاهد أهمية الزراعة في المجتمع المصري القديم ودور ميهو في الإشراف على إدارة الأراضي والموارد. تُظهر مشاهد أخرى الحرفيين أثناء العمل، وإنتاج سلع مثل الفخار، والمجوهرات، والأثاث، والتي كانت ضرورية لكل من الحياة اليومية والممارسات الجنائزية.</p>

<h4 style="font-family: 'Cairo';">الصيد وصيد الأسماك</h4>
<p style="font-family: 'Cairo';">تُظهر المشاهد أيضًا الصيد وصيد الأسماك بشكل بارز في القبر. لم تكن هذه الأنشطة عملية فحسب، بل كانت أيضًا رمزية، حيث تمثل قدرة المتوفى على إعالة أسرته وسيطرته على العالم الطبيعي. تم تصوير الحياة البرية، بما في ذلك الأسماك، والطيور، وحيوانات الصحراء، بدقة ملحوظة واهتمام بالتفاصيل.</p>

<h4 style="font-family: 'Cairo';">الموضوعات الدينية</h4>
<p style="font-family: 'Cairo';">تلعب الصور الدينية دورًا مركزيًا في زخارف القبر. تُظهر مشاهد تقديم القرابين للآلهة، بما في ذلك أوزوريس، وأنوبيس، وحتحور، مدى تقوى ميهو وأمله في رحلة ناجحة إلى العالم الآخر. يحتوي القبر أيضًا على تصوير لطقوس جنائزية، مثل مراسم "فتح الفم"، التي كانت تُجرى لضمان قدرة المتوفى على الأكل والشرب والكلام في الحياة الآخرة.</p>

<h3 style="font-family: 'Cairo';">النقوش والألقاب</h3>
<p style="font-family: 'Cairo';">تغطي جدران قبر ميهو نقوش هيروغليفية توفر معلومات قيّمة عن حياته ومهنته. تسرد هذه النقوش ألقاب ميهو العديدة، بما في ذلك "الوزير"، و"رئيس القضاة"، و"مشرف على المحاكم الست الكبرى"، مما يُبرز أهميته في إدارة مصر القديمة. تشمل النقوش أيضًا صلوات وتعاويذ تهدف إلى حماية ميهو وضمان رفاهيته في العالم الآخر.</p>

<h3 style="font-family: 'Cairo';">غرفة الدفن والقطع الأثرية</h3>
<p style="font-family: 'Cairo';">تحتوي غرفة الدفن في قبر ميهو على تابوت، كان من المفترض أن يحتفظ ببقايا مومياءه. على الرغم من أن القبر تعرض للنهب في العصور القديمة، إلا أن علماء الآثار اكتشفوا أجزاء من الأغراض الجنائزية، بما في ذلك الفخار، والتماثيل، وتماثيل الأوشابتي (تماثيل جنائزية صغيرة). توفر هذه القطع الأثرية رؤى حول ممارسات الدفن في مصر القديمة ومعتقداتهم عن الحياة الآخرة.</p>

<h3 style="font-family: 'Cairo';">الحفظ والسياحة</h3>
<p style="font-family: 'Cairo';">خضع قبر ميهو لجهود حفظ مكثفة للحفاظ على نقوشه ورسوماته الحساسة. تم استخدام التقنيات الحديثة، مثل المسح ثلاثي الأبعاد والترميم الرقمي، لتوثيق ميزات القبر وضمان الحفاظ عليه على المدى الطويل. القبر مفتوح الآن للجمهور، مما يوفر للزوار فرصة فريدة لتجربة عظمة الفن والعمارة المصرية القديمة.</p>
 
<h3 style="font-family: 'Cairo';">نموذج ثلاثي الأبعاد للمقبرة</h3>
  <iframe 
        id="matterport-iframe"
		src="https://my.matterport.com/show/?m=JuHk3h8Gfcx&help=1&brand=0&ts=1&play=1"  
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>

   
        `,
		thumbnaildescription1:"يعد أبو سمبل ...",
	thumbnaildescription2:"تعد مقبرة مينا ...",
	thumbnaildescription3:"تعد مقبرة واح تي ...",
	thumbnaildescription4:"تعد مقبرة مهيو ...",
	thumbnailtitle1:"معبد ابو سمبل",
	thumbnailtitle2:"مقبرة مينا",
	thumbnailtitle3:"مقبرة واح تي",
	thumbnailtitle4:"مقبرة مهيو",
    author5: "  ",
title5: "تمثال ",
topic5: "أبو الهول",
des5: "أبو الهول العظيم ، حارس من الحجر الجيري بجسد أسد ورأس فرعون، يُمثل اليقظة الأبدية والحكمة الإلهية. نُحت في عهد الفرعون خفرع، ليرمز إلى اندماج الذكاء البشري مع القوة البدائية، حارسًا على رمال مصر الذهبية عبر آلاف السنين.",
content5: `
<h2>تمثال أبو الهول</h2>
	 <h3 style="display: none;">بلسان أبو الهول</h3>
<p style="display: none;">أنا، الحارس الأبدي للأفق، أعلو من الرمال ببهاء أول فجر لرع. جسدي الأسدي، مُنحت من صخور ، يحمل قوة زئير الصحراء، بينما محيَّاي، المنحوت على هيئة ملك، يحمل أسرار النجوم والحجر. أنا اللغز والإجابة، المراقب الذي يعيش أطول من السلالات. </p>
<p style="display: none;">ركع الفراعنة عند قوائمي، رافعين أناشيد للشمس. سقطت إمبراطوريات، لكنني بقيت — عيناي تُحدقان شرقًا، تنتظران ولادة رع كل فجر. أثّرت الرياح على وجهي، وسرقت الزمن أنفي، لكن صمتي أصدأ من ضجيج الغزاة. أن تقف أمامي هو أن تقف أمام الزمن نفسه. أنا حارس العتبات، الجسر بين طموح البشر وأبدية الآلهة. تهمس الصحراء باسمي، لكن الجريئين فقط من يحاولون فكَّ غموضي.</p>   
 





<div style="width:100%;max-width:1920px;margin:auto;">
  <model-viewer 
    src="image/sphinx.glb"
    alt="Statue of Ramses III"
    ar
    camera-controls
    auto-rotate
    shadow-intensity="1"
    style="width:100%;height:100vh;background:#222;">
  </model-viewer>
</div>

`,
thumbnailtitle5: "تمثال أبو الهول",
thumbnaildescription5: "يعتبر تمثال أبو الهول ...",

author6: "  ",
title6: "تمثال",
topic6: "رمسيس الثالت",
des6: " يُجسد هذا التمثال المهيب الفرعون رمسيس الثالث واقفًا منتصرًا بين الإلهين حورس وسيث، رمزًا لسلطته الإلهية على النظام والفوضى. نُحت من الجرانيت، ليعكس دوره كموحد مصر والتجسيد الحي للتوازن.",
content6: `<h2>تمثال رمسيس التالت مع حورس وسيث </h2>
	 <h3 style="display: none;">بلسان رمسيس الثالث</h3>
<p style="display: none;">أنا، وسر ماعت رع مري آمون رمسيس الثالث، حامي مصر، أقف أبديًا في الحجر، محاطًا بحورس وسيث — التوأم الإلهي للثنائيات. حورس، سيد السماء ذو العين الصقرية، يمنحني الحكمة لحفظ 'ماعت' (النظام)، بينما سيث، مُجلب العواصف، يعطيني القوة لسحق التمرد. هذا التمثال ليس مجرد صورتي؛ بل هو شهادة على عهدي، حيث ازدهرت الأرضان تحت رمحي وصولجاني.</p>
<p style="display: none;">عندما اجتاح الغزاة كفيضان النيل، حطمتهم عند بوابات مصر، كما فعلت مع شعوب البحر. تُردد معابدي في مدينة هابو أناشيد النصر، وهنا، في هذا الحجر، أجمع الفوضى والنظام كواحد. أن تنظر إليَّ هو أن ترى الفرعون الذي ارتدى التاج المزدوج ليس عبئًا، بل عهدًا مع الآلهة.</p>

<div style="width:100%;max-width:1920px;margin:auto;">
  <model-viewer 
    src="image/statue_of_ramses_iii.glb"
    alt="Statue of Ramses III"
    ar
    camera-controls
    auto-rotate
    shadow-intensity="1"
    style="width:100%;height:100vh;background:#222;">
  </model-viewer>
</div>`,
thumbnailtitle6: " تمثال رمسيس الثالت",
thumbnaildescription6: "يعتبر تمثال رمس ..."
    };
    return translations[id] || '';
}

function getEnglishContent(id) {
    const contents = {
        author1: "Historic site",
        title1: "Abu Simbel",
        topic1: "Great Temple",
        des1: "A UNESCO World Heritage Site in southern Egypt, Abu Simbel features two rock-cut temples built by Pharaoh Ramses II (13th century BCE). The main temple, guarded by four 20-meter statues of Ramses II, aligns with the sun to illuminate its inner sanctuary on February 22 and October 22. The smaller temple honors Queen Nefertari and goddess Hathor. Saved from Lake Nasser’s flooding in the 1960s via a UNESCO-led relocation, it showcases ancient engineering and modern preservation, drawing global visitors to its historic grandeur.",
        
        author2: "Historic site",
        title2: "Menna's",
        topic2: "Tomb",
        des2: "The Tomb of Menna (TT69) is located in the Theban Necropolis on the west bank of the Nile near Luxor. It dates to the 18th Dynasty of the New Kingdom (c. 1550–1292 BCE) and belonged to Menna, a scribe and overseer of fields under Thutmose IV or Amenhotep III.",

        author3: "Historic site",
        title3: "Wahtye's",
        topic3: "Tomb",
        des3: "In November 2018, the tomb of Wahtye was discovered in the Saqqara necropolis. Dating to c. 2415–2405 BC, the tomb is 10 meters long and 3 meters wide. It contains reliefs of Wahtye, his wife Weret Ptah, his four children, and his mother Merit Meen. Wahtye, who stole the tomb from his brother, was buried there with his family, though not all in wooden sarcophagi.",

        author4: "Historic site",
        title4: "Mehu's",
        topic4: "Tomb",
        des4: "The Tomb of Mehu is an ancient Old Kingdom tomb located in the Saqqara necropolis, dating to the Sixth Dynasty (c. 2340 BCE). Mehu was a high-ranking official, holding titles such as Vizier, Chief Justice, and Overseer of the Royal Scribes.</br>The tomb is famous for its well-preserved and colorful reliefs, depicting hunting, fishing, farming, and banquet scenes, offering insights into daily life in ancient Egypt. After being closed to the public for nearly 80 years, it was reopened in 2018.</div>",

        content1: `

    <h2>Abu Simbel</h2>
	 <h3>Abu Simbel Temple: A Monument of Ancient Grandeur and Modern Ingenuity</h3>
    <p>The Abu Simbel Temples, a UNESCO World Heritage Site in southern Egypt, stand as a testament to the grandeur of ancient Egyptian architecture and the ingenuity of modern preservation. Built during the reign of Pharaoh Ramses II (1279–1213 BCE), the complex consists of two rock-cut temples: the Great Temple, dedicated to Ramses II and the gods Amun, Ra-Horakhty, and Ptah, and the Small Temple, honoring Queen Nefertari and the goddess Hathor.</p>
 <h3>Construction and Purpose</h3>

<p> Ramses II commissioned the temples to showcase Egypt's power and cultural influence in Nubia, a region rich in gold and trade goods. Carved into a mountainside around 1264 BCE, the Great Temple features four colossal 20-meter statues of Ramses II guarding its entrance. The smaller temple, one of the few dedicated to a queen, highlights Nefertari’s significance, with statues of her and Ramses II standing at equal height—a rare honor in Egyptian art.</p>
<h3>Rediscovery</h3>

<p> Over time, the temples were abandoned and buried under sand. They were rediscovered in 1813 by Swiss explorer Johann Ludwig Burckhardt. Italian explorer Giovanni Belzoni later excavated the site in 1817, revealing its splendor to the world.</p>
 <h3>Relocation: A Modern Marvel</h3>

<p> In the 1960s, the temples faced submersion due to the construction of the Aswan High Dam. A UNESCO-led international effort saved the site by meticulously cutting the temples into massive blocks, relocating them 65 meters higher and 200 meters back from the Nile. This monumental project, completed in 1968, cost $40 million and remains one of history’s greatest feats of engineering.</p>
<h3>Architectural Highlights</h3>

<p> •	Great Temple: The facade features four towering statues of Ramses II. Inside, the temple follows a traditional Egyptian layout, with a hypostyle hall, pillared chambers, and a sanctuary. The temple’s alignment allows sunlight to illuminate the inner sanctum twice a year (February 22 and October 22), lighting statues of Ramses and the gods.</p>
<p>•	Small Temple: Dedicated to Hathor and Nefertari, this temple is adorned with statues of the king and queen, symbolizing their equal status. The interior features intricate carvings and Hathor-headed columns.
</p>
 <h3>Cultural Significance</h3>

<p> The temples not only celebrate Ramses II’s reign but also reflect ancient Egypt’s religious and artistic achievements. The solar alignment and detailed reliefs, depicting battles and offerings, highlight the Egyptians’ advanced understanding of astronomy and artistry.</p>
<p>Today, Abu Simbel attracts visitors worldwide, offering a glimpse into ancient Egypt’s glory and the remarkable efforts to preserve it for future generations.
</p>
<h3>3D Model of Temple </h3>



    <iframe 
        id="matterport-iframe"
        src="https://my.matterport.com/show/?m=VxYAEMXh6dW&help=1&brand=0&ts=1&play=1" 
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>

`,
        content2: `<h2>The Tomb of Menna</h2>
	 <h3>The Tomb of Menna: A Glimpse into Ancient Egyptian Life</h3>
    <p>The Tomb of Menna, located in the Theban Necropolis on the west bank of the Nile near Luxor, Egypt, is one of the most well-preserved and richly decorated tombs from the New Kingdom period (circa 1550–1070 BCE). Menna, who lived during the 18th Dynasty under the reign of Pharaoh Thutmose IV, was a high-ranking official who held the title of "Scribe of the Fields of the Lord of the Two Lands." His primary role was to oversee agricultural production and manage the estates of the pharaoh, making him an important figure in the administration of ancient Egypt.</p>

<p>The tomb, designated as TT69 (Theban Tomb 69), is renowned for its vivid and detailed wall paintings that provide a fascinating insight into the daily life, religious beliefs, and artistic traditions of ancient Egypt. These paintings depict a variety of scenes, including agricultural activities, hunting, fishing, and offerings to the gods, as well as intimate family moments. The artwork not only highlights Menna's professional duties but also reflects his personal life, showcasing his wife, Henuttawy, and their children.</p>
 <h3>Architectural Features</h3>


<p> The Tomb of Menna follows a typical design for elite tombs of the New Kingdom. It consists of a transverse hall, a long corridor, and an inner chamber. The transverse hall is the most elaborately decorated section, featuring scenes of Menna and his family in various activities. The corridor leads to the inner chamber, where the burial shaft is located. The walls of the tomb are covered with finely executed paintings that have retained their vibrant colors over millennia, thanks to the dry climate of Egypt and the tomb's relative isolation.</p>
 <h3>Artistic Significance</h3>

<p> The paintings in the Tomb of Menna are celebrated for their artistic quality and attention to detail. The artists employed a combination of naturalistic and symbolic styles, capturing the essence of daily life while adhering to the religious and cultural conventions of the time. For example, agricultural scenes depict farmers plowing fields, harvesting crops, and tending to livestock, offering a glimpse into the economic foundation of ancient Egypt. Similarly, hunting and fishing scenes symbolize Menna's ability to provide for his family and his mastery over the natural world.</p>

<p>Religious themes are also prominent in the tomb's decoration. Scenes of offerings to the gods, including Osiris, Anubis, and Hathor, emphasize Menna's piety and his hope for a successful journey to the afterlife. The depiction of the "Weighing of the Heart" ceremony, a crucial moment in the Egyptian concept of the afterlife, underscores the importance of moral integrity and divine judgment.</p>
<h3>Historical and Cultural Insights</h3>

<p> The Tomb of Menna serves as a valuable resource for understanding the social and economic structures of ancient Egypt. The detailed representations of agricultural practices, for instance, provide evidence of the tools and techniques used by farmers, as well as the organization of labor. Additionally, the inclusion of Menna's family in the artwork highlights the significance of familial relationships and the role of women in elite households.</p>

<p>The tomb also reflects the religious beliefs of the time, particularly the emphasis on the afterlife and the need for proper burial rituals. The elaborate decorations and inscriptions were intended to ensure Menna's eternal well-being and to secure his place among the gods.</p>
 <h3>Preservation and Tourism</h3>

<p> In recent years, the Tomb of Menna has undergone extensive conservation efforts to protect its fragile paintings from damage caused by environmental factors and human activity. Modern technologies, such as 3D scanning and digital restoration, have been employed to document and preserve the tomb's artwork for future generations.</p>

<p>Today, the Tomb of Menna is a popular destination for tourists and scholars alike. Its well-preserved paintings offer a unique window into the world of ancient Egypt, making it an essential site for anyone interested in the history, art, and culture of this remarkable civilization.</p>
<h3>3D Model of the Tomb </h3>

    <iframe 
        id="matterport-iframe"
        src="https://my.matterport.com/show/?m=vLYoS66CWpk&help=1&brand=0&ts=1&play=1" 
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>
`,
        content3: ` <h2>Whhtye Tomb</h2>
	 <h3>The Tomb of Wahtye: A Remarkable Discovery from Ancient Egypt</h3>
    <p>The Tomb of Wahtye, discovered in 2018 in the Saqqara necropolis near Cairo, Egypt, is one of the most significant archaeological finds of the 21st century. Dating back to the Fifth Dynasty of the Old Kingdom (circa 2500–2350 BCE), this tomb belongs to a high-ranking priest named Wahtye, who served under Pharaoh Neferirkare Kakai. The tomb's exceptional preservation, intricate carvings, and vivid wall paintings have provided archaeologists with invaluable insights into the religious practices, daily life, and artistic traditions of ancient Egypt.</p>
 <h3>Discovery and Significance</h3>

<p>The tomb was uncovered by an Egyptian archaeological team led by Dr. Mostafa Waziri, Secretary-General of Egypt's Supreme Council of Antiquities. Its discovery made headlines worldwide due to its remarkable state of preservation and the wealth of artifacts and inscriptions found within. The tomb is a mastaba, a type of rectangular, flat-roofed structure commonly used for elite burials during the Old Kingdom.</p>
<p>Wahtye held the title of "Royal Purification Priest" and was also an overseer of the royal palace, indicating his high status in the court of Pharaoh Neferirkare Kakai. The tomb's elaborate decorations and inscriptions reflect his importance and his close association with the pharaoh.</p>
<h3>Architectural Features</h3>

<p>The Tomb of Wahtye is a large, rectangular structure with a series of chambers and corridors. The main hall is adorned with intricately carved reliefs and colorful paintings that depict scenes from Wahtye's life, his family, and his religious duties. The tomb features a false door, a common architectural element in ancient Egyptian tombs, which was believed to serve as a portal between the world of the living and the afterlife.</p>
<p>The walls of the tomb are covered with hieroglyphic inscriptions that provide details about Wahtye's titles, family lineage, and offerings made to the gods. These inscriptions are invaluable for understanding the social and religious context of the Fifth Dynasty.</p>
 <h3>Artistic and Cultural Insights</h3>

<p>The tomb's decorations are a masterpiece of Old Kingdom art. The reliefs and paintings depict a variety of scenes, including agricultural activities, hunting, fishing, and religious rituals. These images not only highlight Wahtye's role as a priest but also provide a glimpse into the daily life of ancient Egyptians. For example, scenes of farmers harvesting crops and craftsmen at work illustrate the economic activities that sustained the kingdom.</p>
<p>One of the most striking features of the tomb is the depiction of Wahtye's family. His wife, Weret Ptah, and their children are prominently featured in the artwork, emphasizing the importance of family in ancient Egyptian society. The inclusion of family members in tomb decorations was believed to ensure their participation in the afterlife.</p>
<p>Religious themes are also central to the tomb's decorations. Scenes of offerings to the gods, including Ra, Osiris, and Anubis, reflect Wahtye's devotion and his hope for a successful journey to the afterlife. The tomb also contains depictions of funerary rituals, such as the "Opening of the Mouth" ceremony, which was performed to ensure the deceased's ability to eat, drink, and speak in the afterlife.</p>
<h3>Burial Shafts and Artifacts</h3>

<p>The tomb contains several burial shafts, some of which were found intact. These shafts contained a variety of artifacts, including statues, pottery, and wooden masks. One of the most notable discoveries was a limestone statue of Wahtye himself, which provides a rare glimpse into the physical appearance of an ancient Egyptian priest.</p>
<p>The artifacts found in the tomb are not only valuable for their artistic quality but also for the information they provide about ancient Egyptian burial practices. For example, the presence of ushabtis (small funerary figurines) suggests that Wahtye believed in the necessity of servants in the afterlife to perform tasks on his behalf.</p>

 <h3>Preservation and Tourism</h3>

<p>Since its discovery, the Tomb of Wahtye has become a focal point for archaeological research and conservation efforts. The tomb's delicate reliefs and paintings require careful preservation to protect them from environmental damage and the effects of tourism. Modern technologies, such as 3D scanning and digital mapping, have been employed to document the tomb's features and ensure its long-term preservation.</p>
<p>The tomb is also a popular destination for tourists, offering a unique opportunity to experience the grandeur of ancient Egyptian art and architecture. Its discovery has reinvigorated interest in the Saqqara necropolis, which is home to numerous other significant tombs and monuments.</p>

<h3>3D Model of Temple </h3>




    <iframe 
        id="matterport-iframe"
        src="https://my.matterport.com/show/?m=BsXpwTSYSyN&help=1&brand=0&ts=1&play=1" 
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>
`,
        content4: ` <h2>Mehu Tomb</h2>
	 <h3>The Tomb of Mehu: A Glimpse into the Life of an Ancient Egyptian Official</h3>
<p>The Tomb of Mehu, located in the Saqqara necropolis near Cairo, Egypt, is one of the most fascinating burial sites from the Sixth Dynasty of the Old Kingdom (circa 2345–2181 BCE). This tomb belongs to Mehu, a high-ranking official who held several important titles, including "Vizier" (the highest administrative position in ancient Egypt), "Chief Justice," and "Overseer of the Six Great Courts." Mehu served under Pharaohs Teti and Pepi I, and his tomb reflects his elevated status and the wealth he accumulated during his lifetime. </p>
<p>Discovered in 1940 by Egyptian archaeologist Zaki Saad, the Tomb of Mehu has since been celebrated for its intricate wall reliefs, vivid paintings, and architectural design. It provides valuable insights into the life, duties, and beliefs of an elite official in ancient Egypt. </p>
 <h3>Architectural Features</h3>

<p>The Tomb of Mehu is a large, multi-chambered mastaba, a type of flat-roofed tomb structure commonly used for elite burials during the Old Kingdom. The tomb is divided into several sections, including an offering hall, a burial chamber, and a serdab (a sealed room housing statues of the deceased). The walls of the tomb are adorned with finely carved reliefs and colorful paintings that depict scenes from Mehu's life, his professional duties, and his religious beliefs. </p>
<p>One of the most striking features of the tomb is its false door, a common architectural element in ancient Egyptian tombs. The false door was believed to serve as a portal between the world of the living and the afterlife, allowing the deceased to receive offerings and communicate with the living. </p>
<h3>Artistic and Cultural Significance</h3>

<p> The Tomb of Mehu is renowned for its exceptional artwork, which showcases the skill and creativity of ancient Egyptian artisans. The reliefs and paintings depict a wide range of scenes, including agricultural activities, hunting, fishing, and religious rituals. These images provide a vivid portrayal of daily life in ancient Egypt and highlight Mehu's role as a high-ranking official.</p>
 <h4>Scenes of Daily Life</h4>

<p> The tomb's decorations include detailed depictions of agricultural activities, such as plowing, sowing, and harvesting crops. These scenes reflect the importance of agriculture in ancient Egyptian society and Mehu's role in overseeing the management of land and resources. Other scenes show craftsmen at work, producing goods such as pottery, jewelry, and furniture, which were essential for both daily life and funerary practices.</p>
<h4>Hunting and Fishing</h4>

<p> Scenes of hunting and fishing are also prominent in the tomb. These activities were not only practical but also symbolic, representing the deceased's ability to provide for his family and his mastery over the natural world. The depictions of wildlife, including fish, birds, and desert animals, are rendered with remarkable accuracy and attention to detail.</p>
 <h4>Religious Themes</h4>

<p>Religious imagery plays a central role in the tomb's decorations. Scenes of offerings to the gods, including Osiris, Anubis, and Hathor, emphasize Mehu's piety and his hope for a successful journey to the afterlife. The tomb also contains depictions of funerary rituals, such as the "Opening of the Mouth" ceremony, which was performed to ensure the deceased's ability to eat, drink, and speak in the afterlife. </p>
 <h3>Inscriptions and Titles</h3>

<p>The walls of the Tomb of Mehu are covered with hieroglyphic inscriptions that provide valuable information about his life and career. These inscriptions list Mehu's numerous titles, including "Vizier," "Chief Justice," and "Overseer of the Six Great Courts," highlighting his importance in the administration of ancient Egypt. The inscriptions also include prayers and spells intended to protect Mehu and ensure his well-being in the afterlife. </p> 
<h3>Burial Chamber and Artifacts</h3>

<p> The burial chamber of the Tomb of Mehu contains a sarcophagus, which was originally intended to hold his mummified remains. Although the tomb was looted in antiquity, archaeologists have discovered fragments of funerary objects, including pottery, statues, and ushabtis (small funerary figurines). These artifacts provide insights into ancient Egyptian burial practices and beliefs about the afterlife.</p>
<h3>Preservation and Tourism</h3>
<p>The Tomb of Mehu has undergone extensive conservation efforts to preserve its delicate reliefs and paintings. Modern technologies, such as 3D scanning and digital restoration, have been used to document the tomb's features and ensure its long-term preservation. The tomb is now open to the public, offering visitors a unique opportunity to experience the grandeur of ancient Egyptian art and architecture.</p>
<h3>3D Model of Temple </h3>


    <iframe 
        id="matterport-iframe"
		src="https://my.matterport.com/show/?m=JuHk3h8Gfcx&help=1&brand=0&ts=1&play=1"  
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>`,
	thumbnaildescription1:"Abu Simbel built ...",
	thumbnaildescription2:"The Tomb of Menna ...",
	thumbnaildescription3:" The Tomb of Wahty ...",
	thumbnaildescription4:"The Tomb of Mehu ...",
	thumbnailtitle1:"Abu Simbel Temple",
	thumbnailtitle2:"Menna's Tomb",
	thumbnailtitle3:"Wahtye's Tomb",
	thumbnailtitle4:"Mehu's Tomb",
    author5: "Historic site",
title5: "Sphinx ",
topic5: "Statue",
des5: "The Great Sphinx , a colossal limestone guardian with the body of a lion and the head of a pharaoh, embodies eternal vigilance and divine wisdom. Carved during the reign of Pharaoh Khafre, it symbolizes the fusion of human intellect and primal strength, watching over Egypt’s golden sands for millennia",
content5: `<h2>The Great Sphinx </h2>
	 <h3 style="display: none;">In the Voice of the Sphinx</h3>
<p style="display: none;">I, the eternal sentinel of the horizon, rise from the sands with the majesty of Ra’s first dawn. My lion’s body, hewn from the bedrock , bears the strength of the desert’s roar, while my visage, carved in the likeness of a king, holds the secrets of stars and stone. I am the riddle and the answer, the watcher who outlives dynasties. </p>
<p style="display: none;">Pharaohs kneeled at my paws, offering hymns to the sun. Empires crumbled, yet I remained—my eyes fixed on the east, awaiting Ra’s rebirth each morning. The winds have scarred my face, and time has stolen my nose, but my silence speaks louder than the clamor of conquest. To stand before me is to stand before Time itself. I am the guardian of thresholds, the bridge between mortal ambition and divine eternity. The desert whispers my name, but only the wise dare unravel my mystery.</p>    </div>


<div style="width:100%;max-width:1920px;margin:auto;">
  <model-viewer 
    src="image/sphinx.glb"
    alt="Statue of Ramses III"
    ar
    camera-controls
    auto-rotate
    shadow-intensity="1"
    style="width:100%;height:100vh;background:#222;">
  </model-viewer>
</div>`,
thumbnailtitle5: "The Great Sphinx ",
thumbnaildescription5: "Sphinx statue ...",

author6: "Historic site",
title6: "Ramses III",
topic6: "Statue",
des6: "This majestic statue depicts Pharaoh Ramses III standing triumphantly between the gods Horus and Seth, symbolizing his divine authority over both order and chaos. Crafted from granite, it embodies his role as the unifier of Egypt and the living incarnation of balance.",
content6: `<h2>Statue of Ramses III with Horus and Seth</h2>
	 <h3 style="display: none;">In the Voice of Ramses III</h3>
<p style="display: none;">I, Usermaatre Meryamun Ramses III, the Guardian of Egypt, stand eternal in stone, flanked by Horus and Seth—the divine twins of duality. Horus, the falcon-eyed lord of the sky, grants me the wisdom to uphold ma’at (order), while Seth, the storm-bringer, lends me the strength to crush rebellion. This statue is not merely my likeness; it is a testament to my reign, where the Two Lands thrived under my spear and scepter </p>
<p style="display: none;">When invaders surged like the Nile’s flood, I shattered them at the gates of Egypt, as I did the Sea Peoples. My temples at Medinet Habu echo with hymns of victory, and here, in this stone, I bind chaos and order as one. To gaze upon me is to witness the pharaoh who wore the Double Crown not as a burden, but as a covenant with the gods.</p>

<div style="width:100%;max-width:1920px;margin:auto;">
  <model-viewer 
    src="image/statue_of_ramses_iii.glb"
    alt="Statue of Ramses III"
    ar
    camera-controls
    auto-rotate
    shadow-intensity="1"
    style="width:100%;height:100vh;background:#222;">
  </model-viewer>
</div>`,
thumbnailtitle6: "Ramses III statue",
thumbnaildescription6: "The statue of Rams ..."
    };
    return contents[id] || '';
}


window.onload = function() {
    loadEnglishContent();
};




reattachModalEvents();




window.onload = function() {
    let speechBtn = document.createElement('div');
    speechBtn.id = "speechControlContainer";
    speechBtn.innerHTML = `
        <img id="speechControl" src="image/1.svg" width="150" height="150" style="cursor: pointer; display: none; position: fixed; @media (max-width: 768px) { visibility: hidden !important; display: none !important;  }" />
    `;
    speechBtn.style.position = 'fixed';
    speechBtn.style.bottom = '250px';
    speechBtn.style.zIndex = '3000';
    document.body.appendChild(speechBtn);

    let speechControl = document.getElementById("speechControl");
    let speechSynthesisInstance = window.speechSynthesis;
    let currentUtterance = null;
    let isSpeaking = false;

    function updateSpeechButtonPosition() {
        let isRTL = document.body.dir === 'rtl';
        speechBtn.style.right = isRTL ? 'auto' : '280px';
        speechBtn.style.left = isRTL ? '280px' : 'auto';
    }

    document.querySelectorAll('.see-more').forEach(button => {
        button.addEventListener('click', function() {
            speechControl.style.display = 'block';
            updateSpeechButtonPosition();
        });
    });

    document.getElementById('closeModal').addEventListener('click', function() {
        speechControl.style.display = 'none';
        stopSpeech();
    });

    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            speechControl.style.display = 'none';
            stopSpeech();
        }
    });

    speechControl.addEventListener('click', function() {
        if (!isSpeaking) {
            startSpeech();
        } else {
            pauseSpeech();
        }
    });

    function startSpeech() {
        if (currentUtterance) {
            speechSynthesisInstance.resume();
        } else {
            let text = document.querySelector('.modal-details[style*="display: block"]')?.textContent || '';
            currentUtterance = new SpeechSynthesisUtterance(text);
            currentUtterance.lang = document.body.dir === 'rtl' ? 'ar-EG' : 'en-US';
            currentUtterance.onend = () => {
                isSpeaking = false;
                currentUtterance = null;
            };
            speechSynthesisInstance.speak(currentUtterance);
        }
        isSpeaking = true;
    }

    function pauseSpeech() {
        speechSynthesisInstance.pause();
        isSpeaking = false;
    }

    function stopSpeech() {
        if (speechSynthesisInstance.speaking) {
            speechSynthesisInstance.cancel();
        }
        isSpeaking = false;
    }

   
    new MutationObserver(updateSpeechButtonPosition).observe(document.body, { attributes: true, attributeFilter: ['dir'] });
}

        const iframe = document.getElementById('matterport-iframe');
        iframe.onload = function() {
           
            iframe.src += "&play=1";
        };




