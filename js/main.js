// js/main.js

const songInput = document.getElementById('song-input');
const songListContainer = document.getElementById('song-list'); // HTML에 이 ID를 가진 <ul> 태그가 필요합니다.
const addBtn = document.getElementById('add-btn'); // 직접 입력 시 사용할 추가 버튼

// 1. 노래 리스트 배열 (데이터 저장소)
let idolSongs = [];

// 2. 리스트 추가 함수
function addSong() {
    const songTitle = songInput.value.trim();
    
    if (songTitle !== "") {
        idolSongs.push(songTitle); // 배열에 추가
        renderList(); // 화면 갱신
        songInput.value = ""; // 입력창 비우기
    }
}

// 3. 화면에 리스트를 그려주는 함수
function renderList() {
    songListContainer.innerHTML = ""; // 기존 리스트 초기화
    
    idolSongs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${song}</span>
            <button onclick="deleteSong(${index})">삭제</button>
        `;
        songListContainer.appendChild(li);
    });
}

// 4. 삭제 기능 (소소한 추가 기능)
function deleteSong(index) {
    idolSongs.splice(index, 1);
    renderList();
}

// 버튼 클릭 이벤트 연결
addBtn.addEventListener('click', addSong);

// 엔터키 지원
songInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addSong();
});

// HTML이 로드된 후 실행하여 요소를 찾지 못하는 오류 방지 
document.addEventListener('DOMContentLoaded', () => {
    const transcriptDisplay = document.getElementById('transcript-display');
    const voiceBtn = document.getElementById('voice-btn');

    // 전역 함수로 등록하여 speech.js에서 호출 가능하게 함
    window.appendToTranscript = function(text) {
        if (text.trim() !== "" && transcriptDisplay) {
            const p = document.createElement('p');
            p.innerText = text;
            p.style.margin = "8px 0";
            transcriptDisplay.appendChild(p);
            transcriptDisplay.scrollTop = transcriptDisplay.scrollHeight;
        }
    };

    // 만약 HTML에 add-btn이 있다면 아래 코드도 이 안에 넣으세요.
    // 없으면 삭제하거나 주석 처리하면 오류가 사라집니다. [cite: 91]
    const addBtn = document.getElementById('add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => { /* 클릭 로직 */ });
    }
});