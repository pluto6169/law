// وظيفة لتحديد الصفحة النشطة في شريط التنقل
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// وظيفة تهيئة نموذج التواصل
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('شكراً لتواصلكم معنا! سنرد على رسالتكم في أقرب وقت ممكن.');
            this.reset();
        });
    }
}

// تهيئة جميع الوظائف الأساسية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLink();
    initContactForm();
});