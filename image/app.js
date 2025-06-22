





// Step 1: Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');
let languageToggle = document.getElementById('languageToggle');

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

// Add event listener to "SEE MORE" buttons
document.querySelectorAll('.see-more').forEach(button => {
  button.addEventListener('click', function() {
    const contentId = this.getAttribute('data-modal-content');
    const modalContent = document.getElementById(contentId).cloneNode(true);
    modalContent.style.display = 'block';

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = '';
    modalBody.appendChild(modalContent);

    document.getElementById('modalOverlay').style.display = 'flex';
  });
});

// Close modal
document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('modalOverlay').style.display = 'none';
});

// Close modal when clicking outside
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

// Language toggle functionality
let isArabic = false;

languageToggle.addEventListener('click', function() {
    isArabic = !isArabic;
    this.textContent = isArabic ? 'English' : 'العربية';
    document.body.dir = isArabic ? 'rtl' : 'ltr';
    translateContent(isArabic);
});

function translateContent(isArabic) {
    const contentElements = document.querySelectorAll('.modal-details');
    contentElements.forEach(content => {
        if (isArabic) {
            content.innerHTML = getArabicTranslation(content.id);
        } else {
            content.innerHTML = getEnglishContent(content.id);
        }
    });
}

function getArabicTranslation(id) {
    const translations = {
		
		
	
        content1: `
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
 <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
        iframe {
            width: 100%;
            height: 100vh;
            border: none;
        }
    </style>
</head>

    <iframe 
        id="matterport-iframe"
        src="https://my.matterport.com/show/?m=VxYAEMXh6dW&help=1&brand=0&ts=1&play=1" 
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>

    <script>
        // Attempt to autoplay by reloading the iframe with a play parameter
        const iframe = document.getElementById('matterport-iframe');
        iframe.onload = function() {
            // Try to force autoplay by reloading with a play parameter
            iframe.src += "&play=1";
        };
    </script>

        `,
	
        content2: `
            <h2>مقبرة الملك مينا</h2>
	<h3 style="font-family: 'Cairo';">مقبرة مينا: نظرة على حياة مصر القديمة</h3>
    <p style="font-family: 'Cairo';">تقع مقبرة مينا في مقابر طيبة على الضفة الغربية لنهر النيل بالقرب من الأقصر في مصر، وهي واحدة من أكثر المقابر حفظًا وزخرفةً من فترة المملكة الحديثة (حوالي 1550–1070 قبل الميلاد). عاش مينا خلال الأسرة الثامنة عشرة في عهد الفرعون تحتمس الرابع، وكان مسؤولًا رفيع المستوى يحمل لقب "كاتب حقول سيد الأرضين". كانت مهمته الرئيسية الإشراف على الإنتاج الزراعي وإدارة ممتلكات الفرعون، مما جعله شخصية مهمة في إدارة مصر القديمة.</p>

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
<style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
        iframe {
            width: 100%;
            height: 100vh;
            border: none;
        }
    </style>
</head>

    <iframe 
        id="matterport-iframe"
        src="https://my.matterport.com/show/?m=vLYoS66CWpk&help=1&brand=0&ts=1&play=1" 
        allowfullscreen 
        allow="xr-spatial-tracking">
    </iframe>

    <script>
        // Attempt to autoplay by reloading the iframe with a play parameter
        const iframe = document.getElementById('matterport-iframe');
        iframe.onload = function() {
            // Try to force autoplay by reloading with a play parameter
            iframe.src += "&play=1";
        };
    </script>

        `,
		
		content3: `
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

    <script>
        // Attempt to autoplay by reloading the iframe with a play parameter
        const iframe = document.getElementById('matterport-iframe');
        iframe.onload = function() {
            // Try to force autoplay by reloading with a play parameter
            iframe.src += "&play=1";
        };
    </script>

        `,
	
		content4: `
            <h2 style="font-family: 'Cairo';"> مقبرة ميهو </h2>
<h3 style="font-family: 'Cairo';">قبر ميهو: نظرة على حياة مسؤول مصمقبرة ميهو</h3>
<p style="font-family: 'Cairo';">يقع قبر ميهو في مقبرة سقارة بالقرب من القاهرة، مصر، وهو أحد أكثر مواقع الدفن إثارة للاهتمام من الأسرة السادسة في المملكة القديمة (حوالي 2345–2181 قبل الميلاد). يعود هذا القبر إلى ميهو، وهو مسؤول رفيع المستوى شغل عدة مناصب مهمة، بما في ذلك "الوزير" (أعلى منصب إداري في مصر القديمة)، و"رئيس القضاة"، و"مشرف على المحاكم الست الكبرى". خدم ميهو تحت حكم الفرعون تتي وببي الأول، ويعكس قبره مكانته المرموقة والثروة التي جمعها خلال حياته.</p>
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

    <script>
        // Attempt to autoplay by reloading the iframe with a play parameter
        const iframe = document.getElementById('matterport-iframe');
        iframe.onload = function() {
            // Try to force autoplay by reloading with a play parameter
            iframe.src += "&play=1";
        };
    </script>

  `,
        // Add translations for content3, content4, etc.
    };
    return translations[id] || '';
}

function getEnglishContent(id) {
    const contents = {
        content1: document.getElementById('content1').innerHTML,
        content2: document.getElementById('content2').innerHTML,
		content3: document.getElementById('content3').innerHTML,
		content4: document.getElementById('content4').innerHTML,
        // Add English content for content3, content4, etc.
    };
    return contents[id] || '';
}
