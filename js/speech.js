// js/speech.js
const btn = document.getElementById('voice-btn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR'; 
    recognition.interimResults = true; // 실시간으로 적히는 모습을 보기 위해 설정 [cite: 100]
    recognition.continuous = true;     // 노래 가사를 끊기지 않고 계속 인식 [cite: 97, 99]

    let isListening = false;

    btn.addEventListener('click', () => {
        if (!isListening) {
            recognition.start();
            isListening = true;
            btn.innerText = "🛑 받아적기 중단";
        } else {
            recognition.stop();
            isListening = false;
            btn.innerText = "🎤 노래 시작 (음성 인식)";
        }
    });

    recognition.onresult = (event) => {
        // 마지막으로 인식된 최종 결과만 처리
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                const finalTranscript = event.results[i][0].transcript;
                
                // main.js에 정의한 텍스트 추가 함수 호출
                if (typeof window.appendToTranscript === "function") {
                    window.appendToTranscript(finalTranscript);
                }
            }
        }
    };

    recognition.onerror = (event) => {
        console.error("인식 에러 발생:", event.error);
        isListening = false;
        btn.innerText = "🎤 다시 시도";
    };
} else {
    alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
}