// وظائف خاصة بصفحة المحاكم المحدثة
function initCourts() {
    const courtHeaders = document.querySelectorAll('.court-header');

    if (courtHeaders.length > 0) {
        courtHeaders.forEach(header => {
            header.addEventListener('click', function () {
                const content = this.nextElementSibling;
                content.classList.toggle('active');

                // تغيير السهم
                const arrow = this.querySelector('span:last-child');
                arrow.textContent = content.classList.contains('active') ? '▲' : '▼';
            });
        });
    }

    // البحث في المحاكم
    const courtSearch = document.getElementById('courtSearch');
    if (courtSearch) {
        courtSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const courtItems = document.querySelectorAll('.court-item');

            courtItems.forEach(item => {
                const courtName = item.querySelector('.court-header span:first-child').textContent.toLowerCase();
                if (courtName.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // تصفية المحاكم حسب النوع
    const filterButtons = document.querySelectorAll('.courts-filter .filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // إزالة النشط من جميع الأزرار
                document.querySelectorAll('.courts-filter .filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // إضافة النشط للزر المحدد
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                const courtCategories = document.querySelectorAll('.court-category');
                const courtTypes = document.querySelectorAll('.court-type');
                const courtItems = document.querySelectorAll('.court-item');

                if (filter === 'all') {
                    // إظهار كل المحاكم
                    courtCategories.forEach(cat => cat.style.display = 'block');
                    courtTypes.forEach(type => type.style.display = 'block');
                    courtItems.forEach(item => item.style.display = 'block');
                } else if (filter === 'cairo' || filter === 'giza') {
                    // تصفية حسب المحافظة
                    courtCategories.forEach(cat => {
                        if (cat.getAttribute('data-category') === filter) {
                            cat.style.display = 'block';
                        } else {
                            cat.style.display = 'none';
                        }
                    });
                    courtTypes.forEach(type => type.style.display = 'block');
                    courtItems.forEach(item => item.style.display = 'block');
                } else {
                    // تصفية حسب نوع المحكمة
                    courtCategories.forEach(cat => cat.style.display = 'block');
                    courtTypes.forEach(type => {
                        if (type.getAttribute('data-type') === filter) {
                            type.style.display = 'block';
                        } else {
                            type.style.display = 'none';
                        }
                    });
                    courtItems.forEach(item => item.style.display = 'block');
                }
            });
        });
    }
}

// تهيئة صفحة المحاكم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    initCourts();
});