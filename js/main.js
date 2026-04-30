// js/main.js 수정 제안
document.addEventListener('DOMContentLoaded', () => {
    // 요소를 찾는 코드를 반드시 이 안으로 옮겨야 합니다.
    const transcriptDisplay = document.getElementById('transcript-display');
    const songInput = document.getElementById('song-input');
    const addBtn = document.getElementById('add-btn'); 

    // 전역 함수 등록
    window.appendToTranscript = function(text) {
        if (text.trim() !== "" && transcriptDisplay) {
            const p = document.createElement('p');
            p.innerText = text;
            p.style.margin = "8px 0";
            p.style.padding = "5px";
            p.style.borderBottom = "1px dashed #ddd";
            transcriptDisplay.appendChild(p);
            transcriptDisplay.scrollTop = transcriptDisplay.scrollHeight;
        }
    };

    // 요소가 존재할 때만 이벤트 리스너를 연결하여 오류를 방지합니다.
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            // 버튼 클릭 로직
        });
    }

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