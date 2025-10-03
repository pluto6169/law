// وظائف خاصة بمركز الإعلامات
function initNotifications() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // إزالة النشط من جميع الأزرار
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // إضافة النشط للزر المحدد
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                const notifications = document.querySelectorAll('.notification-card');

                notifications.forEach(notification => {
                    if (filter === 'all') {
                        notification.style.display = 'block';
                    } else {
                        if (notification.getAttribute('data-category') === filter) {
                            notification.style.display = 'block';
                        } else {
                            notification.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // إضافة تأثيرات تفاعلية للإعلانات
    const notificationCards = document.querySelectorAll('.notification-card');
    notificationCards.forEach(card => {
        card.addEventListener('click', function () {
            // تبديل حالة التوسيع/الطي
            const content = this.querySelector('.notification-body');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// تهيئة مركز الإعلامات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    initNotifications();
});