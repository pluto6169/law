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

    // إرسال السؤال إلى النموذج الخارجي
    async function fetchExternalResponse(userInput) {
        try {
            const response = await fetch("https://openrouter.ai/api/v1", {
                method: "POST",
                headers: {
                    "Authorization": "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", // ← ضع مفتاحك هنا
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "x-ai/grok-4-fast:free",
                    messages: [
                        { role: "system", content: "أنت مساعد قانوني مصري. أجب بصيغة قانونية واضحة." },
                        { role: "user", content: userInput }
                    ]
                })
            });

            const data = await response.json();
            return data.choices?.[0]?.message?.content || "لم يتم العثور على رد.";
        } catch (error) {
            console.error("خطأ في الاتصال بـ API:", error);
            return "حدث خطأ أثناء الاتصال بالمساعد القانوني الخارجي.";
        }
    }

    // إرسال رسالة من المستخدم
    const sendMessageBtn = document.getElementById('sendMessage');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', async function () {
            const userInput = document.getElementById('userInput');
            if (!userInput) return;

            const message = userInput.value.trim();
            if (message === '') return;

            addMessage(message, 'user');
            userInput.value = '';

            addMessage("جارٍ المعالجة...", 'bot');

            const botReply = await fetchExternalResponse(message);
            addMessage(botReply, 'bot');
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
            alert('سيتم تحميل ملف Word بصيغة صحيفة الدعوى. هذه الميزة ستكون متاحة في النسخة الكاملة من التطبيق.');
        });
    }
}

// تهيئة الشات بوت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    initChatbot();
});
