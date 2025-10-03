// بيانات المحافظات والأحياء/المراكز
const districtsData = {
    'القاهرة': [
        'مدينة نصر',
        'مصر الجديدة',
        'الزيتون',
        'عين شمس',
        'المطرية',
        'الزاوية الحمراء',
        'حدائق القبة',
        'الشرابية',
        'الساحل',
        'روض الفرج',
        'شبرا',
        'الوايلي',
        'باب الشعرية',
        'الأزبكية',
        'بولاق',
        'عابدين',
        'الموسكي',
        'الدرب الأحمر',
        'الخليفة',
        'مصر القديمة',
        'السيدة زينب',
        'المعادي',
        'حلوان',
        'التبين',
        '15 مايو',
        'المعصرة',
        'طره',
        'البساتين',
        'دار السلام',
        'الخليفة',
        'المقطم',
        'منشأة ناصر',
        'الشروق',
        'بدر',
        'القاهرة الجديدة',
        'التجمع الأول',
        'التجمع الثالث',
        'التجمع الخامس',
        'الرحاب',
        'مدينتي',
        'الشيخ زايد (جزء)',
        'أكتوبر (جزء)'
    ],
    'الجيزة': [
        'الجيزة',
        'الدقي',
        'العجوزة',
        'المهندسين',
        'العمرانية',
        'الوراق',
        'امبابة',
        'بولاق الدكرور',
        'الطالبية',
        'كرداسة',
        'أوسيم',
        'منشأة القناطر',
        'الواحات البحرية',
        'فيصل',
        'العمرانية الغربية',
        'الهرم',
        'الحوامدية',
        'البدرشين',
        'العياط',
        'أطفيح',
        'الصف',
        'الشيخ زايد',
        'السادس من أكتوبر',
        'الحي السابع',
        'الحي الثامن',
        'الحي الأول',
        'الحي الثاني',
        'الحي الثالث',
        'الحي الرابع',
        'الحي الخامس',
        'الحي السادس',
        '6 أكتوبر',
        'أكتوبر الصناعية',
        'الواحات',
        'أبو النمرس',
        'الباويطي'
    ]
};

// وظائف خاصة بصفحة تحديد الاختصاص
function initJurisdiction() {
    // ملء قوائم الأحياء عند اختيار المحافظة
    setupDistrictDropdowns('defendantGovernorate', 'defendantDistrict');
    setupDistrictDropdowns('obligationGovernorate', 'obligationDistrict');
    setupDistrictDropdowns('propertyGovernorate', 'propertyDistrict');

    // إظهار/إخفاء الحقول المشروطة
    const propertyRadios = document.querySelectorAll('input[name="property"]');
    if (propertyRadios.length > 0) {
        propertyRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                const propertyLocationGroup = document.getElementById('propertyLocationGroup');
                if (propertyLocationGroup) {
                    propertyLocationGroup.style.display =
                        this.value === 'نعم' ? 'block' : 'none';
                }
            });
        });
    }

    const agreementRadios = document.querySelectorAll('input[name="agreement"]');
    if (agreementRadios.length > 0) {
        agreementRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                const courtNameGroup = document.getElementById('courtNameGroup');
                if (courtNameGroup) {
                    courtNameGroup.style.display =
                        this.value === 'نعم' ? 'block' : 'none';
                }
            });
        });
    }

    // معالجة نموذج تحديد الاختصاص
    const jurisdictionForm = document.getElementById('jurisdictionForm');
    if (jurisdictionForm) {
        jurisdictionForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // جمع البيانات من النموذج
            const caseType = document.getElementById('caseType').value;
            const caseValue = document.getElementById('caseValue').value;
            const defendantGovernorate = document.getElementById('defendantGovernorate').value;
            const defendantDistrict = document.getElementById('defendantDistrict').value;
            const defendantAddress = `${defendantGovernorate} - ${defendantDistrict}`;

            const obligationGovernorate = document.getElementById('obligationGovernorate').value;
            const obligationDistrict = document.getElementById('obligationDistrict').value;
            const obligationLocation = obligationGovernorate ? `${obligationGovernorate} - ${obligationDistrict}` : 'لا ينطبق';

            const property = document.querySelector('input[name="property"]:checked').value;
            const propertyGovernorate = document.getElementById('propertyGovernorate').value;
            const propertyDistrict = document.getElementById('propertyDistrict').value;
            const propertyLocation = (property === 'نعم' && propertyGovernorate) ?
                `${propertyGovernorate} - ${propertyDistrict}` : 'لا ينطبق';

            const agreement = document.querySelector('input[name="agreement"]:checked').value;
            const courtName = document.getElementById('courtName').value;
            const arbitration = document.querySelector('input[name="arbitration"]:checked').value;

            // تحديد المحكمة المختصة
            let court = "محكمة غير محددة";
            let explanation = "";

            if (defendantGovernorate === 'القاهرة') {
                if (parseInt(caseValue) > 500000) {
                    court = "محكمة استئناف القاهرة";
                    explanation = "نظراً لأن قيمة الدعوى تتجاوز 500,000 جنيه، تختص محكمة الاستئناف بالنظر في الدعوى.";
                } else {
                    court = `محكمة ${defendantDistrict} الجزئية`;
                    explanation = "نظراً لأن قيمة الدعوى لا تتجاوز 500,000 جنيه، تختص المحكمة الجزئية بالنظر في الدعوى.";
                }
            } else if (defendantGovernorate === 'الجيزة') {
                if (parseInt(caseValue) > 500000) {
                    court = "محكمة استئناف القاهرة";
                    explanation = "نظراً لأن قيمة الدعوى تتجاوز 500,000 جنيه، تختص محكمة الاستئناف بالنظر في الدعوى.";
                } else {
                    court = `محكمة ${defendantDistrict} الجزئية`;
                    explanation = "نظراً لأن قيمة الدعوى لا تتجاوز 500,000 جنيه، تختص المحكمة الجزئية بالنظر في الدعوى.";
                }
            }

            if (agreement === 'نعم' && courtName) {
                court = courtName;
                explanation += " مع الأخذ في الاعتبار وجود شرط اتفاقي على محكمة مختصة.";
            }

            if (arbitration === 'نعم') {
                explanation += " يلاحظ وجود شرط تحكيم في العقد، مما قد يؤثر على اختصاص المحكمة.";
            }

            // عرض النتيجة
            const resultDetails = document.getElementById('resultDetails');
            if (resultDetails) {
                resultDetails.innerHTML = `
                    <div class="result-item">
                        <div class="result-label">المحكمة المختصة:</div>
                        <div>${court}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">التفسير:</div>
                        <div>${explanation}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">تفاصيل الدعوى:</div>
                        <div>
                            <div>نوع الدعوى: ${caseType}</div>
                            <div>قيمة الدعوى: ${caseValue} جنيه مصري</div>
                            <div>محل إقامة المدعى عليه: ${defendantAddress}</div>
                            <div>محل تنفيذ الالتزام: ${obligationLocation}</div>
                            <div>مكان العقار: ${propertyLocation}</div>
                        </div>
                    </div>
                `;
            }

            const jurisdictionResult = document.getElementById('jurisdictionResult');
            if (jurisdictionResult) {
                jurisdictionResult.style.display = 'block';
                jurisdictionResult.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// دالة لإعداد القوائم المنسدلة للأحياء
function setupDistrictDropdowns(governorateId, districtId) {
    const governorateSelect = document.getElementById(governorateId);
    const districtSelect = document.getElementById(districtId);

    if (governorateSelect && districtSelect) {
        governorateSelect.addEventListener('change', function () {
            const selectedGovernorate = this.value;
            districtSelect.innerHTML = '<option value="">اختر الحي/المركز</option>';

            if (selectedGovernorate && districtsData[selectedGovernorate]) {
                districtsData[selectedGovernorate].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            }
        });
    }
}

// تهيئة صفحة تحديد الاختصاص عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    initJurisdiction();
});