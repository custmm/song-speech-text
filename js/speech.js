// js/speech.js
const btn = document.getElementById('voice-btn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR'; 
    recognition.interimResults = true; // 실시간 인식 결과 반영 [cite: 100]
    recognition.continuous = true;     // 연속 인식 모드 활성화 [cite: 97, 99]

    let isListening = false;

    // 마이크 시작/중단 제어
    btn.addEventListener('click', () => {
        if (!isListening) {
            try {
                recognition.start();
                isListening = true;
                btn.innerText = "🛑 받아적기 중단";
            } catch (err) {
                console.error("시작 에러:", err);
            }
        } else {
            recognition.stop();
            isListening = false;
            btn.innerText = "🎤 노래 시작 (음성 인식)";
        }
    });

    // 음성 인식 결과 처리
    recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                const finalTranscript = event.results[i][0].transcript;
                
                // main.js의 전역 함수 호출 [cite: 125]
                if (typeof window.appendToTranscript === "function") {
                    window.appendToTranscript(finalTranscript);
                }
            }
        }
    };

    // 에러 발생 시 처리 로직 [cite: 192, 206]
    recognition.onerror = (event) => {
        console.error("인식 에러 발생:", event.error);
        
        if (event.error === 'network') {
            alert("네트워크 에러: HTTPS 연결 확인 및 Chrome/Edge 브라우저를 사용해 주세요.");
            isListening = false;
        }
        
        if (event.error === 'no-speech') {
            console.log("음성이 감지되지 않아 대기 중입니다.");
            // no-speech는 연속 모드에서 발생할 수 있으므로 상태를 유지하며 다시 시도 유도
        }

        isListening = false;
        btn.innerText = "🎤 다시 시도 (음성 인식)";
    };

// 마이크 인식이 끝났을 때의 처리 (중요!)
    recognition.onend = () => {
        // 사용자가 중단 버튼을 누르지 않았는데 꺼진 경우 (no-speech 등) 자동으로 재시작
        if (isListening) {
            console.log("음성 인식 재시작 중...");
            recognition.start();
        } else {
            btn.innerText = "🎤 노래 시작 (음성 인식)";
        }
    };

} else {
    alert("이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 권장합니다.");
}