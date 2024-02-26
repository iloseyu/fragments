// 선택된 라디오 버튼의 값을 가져오는 함수
function getSelectedRadioValue(name) {
    // 선택된 라디오 버튼 요소를 선택
    var selectedRadioButton = document.querySelector('input[name="' + name + '"]:checked');

    // 선택된 값이 있는지 확인하고 있다면 해당 값을 반환, 없다면 null 반환
    return selectedRadioButton ? selectedRadioButton.value : null;
}

// 알림창
// alert : alert-primary 기본(파랑색), alert-success 성공(녹색), alert-danger 실패(빨강색), alert-warning 위험(노랑색), alert-info 정보(하늘색)
function showAlert(alert, message) {
    // 알림 창을 동적으로 생성
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', alert);
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = message;

    var closeButton = document.createElement('button');
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    // 알림 창을 표시할 부모 요소를 선택 (여기서는 body)
    var parentElement = document.body;

    // 알림 창을 부모 요소에 추가
    parentElement.appendChild(alertDiv);

    // 몇 초 후에 알림 창을 제거 (예: 3초 후)
    setTimeout(function () {
        // 알림 창을 동적으로 제거
        parentElement.removeChild(alertDiv);
    }, 3000);
}

// 문자열 관련 유틸리티 객체
const divUtils = {
    getSelectedRadioValue,
    showAlert
};

// 문자열 관련 유틸리티 객체 내보내기
export default divUtils;