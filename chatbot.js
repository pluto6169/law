// وظائف خاصة بصفحة الشات بوت
function initChatbot() {
    // إضافة رسالة إلى الشات
    function addMessage(text, sender, time = null) {
        const chatContainer = document.getElementById('chatContainer');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = time || new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(timeDiv);
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // محاكاة رد المساعد القانوني
    function getBotResponse(userInput) {
        userInput = userInput.toLowerCase();

        if (userInput.includes('طلاق') || userInput.includes('زوج') || userInput.includes('زوجة')) {
            return {
                text: 'بناءً على وصفك، يبدو أنك تواجه مشكلة في مجال الأحوال الشخصية. أنصحك بالرجوع إلى قانون الأحوال الشخصية المصري. بالنسبة لإجراءات الطلاق، يجب تقديم دعوى في محكمة الأسرة المختصة، مع إرفاق عقد الزواج وبطاقات الرقم القومي. هل تريد أن أقترح لك صياغة لدعوى الطلاق؟',
                suggestLawsuit: true,
                lawsuitType: 'طلاق'
            };
        } else if (userInput.includes('عقد') || userInput.includes('اتفاق') || userInput.includes('تعاقد')) {
            return {
                text: 'بناءً على وصفك، يبدو أن النزاع متعلق بالعقود. أنصحك بمراجعة البنود التعاقدية والرجوع إلى قانون المعاملات المدنية. يمكنك تقديم دعوى لتنفيذ العقد أو فسخه حسب الظروف. هل تود الحصول على مزيد من التفاصيل حول الإجراءات القانونية؟',
                suggestLawsuit: false
            };
        } else if (userInput.includes('عامل') || userInput.includes('عمل') || userInput.includes('فصل')) {
            return {
                text: 'بناءً على وصفك، يبدو أن المشكلة متعلقة بقانون العمل. أنصحك بالرجوع إلى قانون العمل المصري. في حالة الفصل التعسفي، يحق للعامل المطالبة بتعويض. هل تريد أن أقترح لك صياغة لدعوى فصل تعسفي؟',
                suggestLawsuit: true,
                lawsuitType: 'فصل تعسفي'
            };
        } else if (userInput.includes('ضرر') || userInput.includes('تعويض')) {
            return {
                text: 'بناءً على وصفك، يبدو أنك تريد المطالبة بتعويض عن ضرر. أنصحك بالرجوع إلى قواعد المسؤولية التقصيرية في القانون المدني. يجب إثبات الخطأ والضرر وعلاقة السببية بينهما. هل تريد أن أقترح لك صياغة لدعوى تعويض؟',
                suggestLawsuit: true,
                lawsuitType: 'تعويض'
            };
        } else {
            return {
                text: 'شكراً لتواصلك. أنا مساعد قانوني يمكنني تقديم استشارات في مختلف المجالات القانونية. يرجى توضيح طبيعة مشكلتك بشكل أكثر تفصيلاً للحصول على مساعدة دقيقة.',
                suggestLawsuit: false
            };
        }
    }

    // إرسال رسالة من المستخدم
    const sendMessageBtn = document.getElementById('sendMessage');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function () {
            const userInput = document.getElementById('userInput');
            if (!userInput) return;

            const message = userInput.value.trim();
            if (message === '') return;

            addMessage(message, 'user');
            userInput.value = '';

            // محاكاة الانتظار قبل الرد
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response.text, 'bot');

                if (response.suggestLawsuit) {
                    setTimeout(() => {
                        addMessage('هل تريد أن أقترح لك صياغة لصحيفة دعوى ' + response.lawsuitType + '؟', 'bot');
                    }, 1000);
                }
            }, 1000);
        });
    }

    // السماح بإرسال الرسالة بالضغط على Enter
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                document.getElementById('sendMessage').click();
            }
        });
    }

    // الأسئلة المقترحة
    const suggestedQuestions = document.querySelectorAll('.suggested-question');
    if (suggestedQuestions.length > 0) {
        suggestedQuestions.forEach(button => {
            button.addEventListener('click', function () {
                const question = this.getAttribute('data-question');
                document.getElementById('userInput').value = question;
                document.getElementById('sendMessage').click();
            });
        });
    }

    // تحميل صحيفة الدعوى
    const downloadLawsuitBtn = document.getElementById('downloadLawsuit');
    if (downloadLawsuitBtn) {
        downloadLawsuitBtn.addEventListener('click', function () {
            alert('سيتم تحميل ملف Word بصحيفة الدعوى. هذه ميزة ستكون متاحة في النسخة الكاملة من التطبيق.');
        });
    }
}

// تهيئة الشات بوت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    initChatbot();
});