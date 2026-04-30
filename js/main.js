// js/main.js

// HTML이 완전히 로드된 후 실행하여 null 참조 오류를 방지합니다 [cite: 132]
document.addEventListener('DOMContentLoaded', () => {
    // 가사가 표시될 영역과 음성 인식 버튼을 가져옵니다
    const transcriptDisplay = document.getElementById('transcript-display');
    const voiceBtn = document.getElementById('voice-btn');
    const songInput = document.getElementById('song-input');

    // 1. 전역 함수 등록: speech.js에서 최종 인식된 텍스트를 이 함수로 보냅니다 [cite: 125]
    window.appendToTranscript = function(text) {
        if (text.trim() !== "" && transcriptDisplay) {
            const p = document.createElement('p');
            p.innerText = text;
            p.style.margin = "8px 0";
            p.style.padding = "5px";
            p.style.borderBottom = "1px dashed #ddd";
            transcriptDisplay.appendChild(p);
            
            // 새 가사가 추가되면 자동으로 아래로 스크롤합니다 [cite: 125]
            transcriptDisplay.scrollTop = transcriptDisplay.scrollHeight;
        }
    };

    // 2. 오류 방지 로직: HTML에 해당 ID가 있을 때만 이벤트를 연결합니다 [cite: 91]
    // 42번 라인에서 발생하던 오류를 해결하는 부분입니다
    if (voiceBtn) {
        // voice-btn에 대한 추가적인 클릭 로직이 필요하다면 여기에 작성합니다.
        // (현재 음성 시작/정지 로직은 speech.js에 있으므로 비워두어도 무방합니다)
    }

    // 곡 제목 입력창(song-input)이 있다면 엔터키 지원
    if (songInput) {
        songInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = songInput.value;
                window.appendToTranscript(text);
                songInput.value = "";
            }
        });
    }
});