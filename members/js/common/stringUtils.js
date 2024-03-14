// 문자열을 숫자로 파싱하여 소수점 이하 자릿수를 제한하는 함수
function parseToFixedNumber(str, decimalPlaces) {
    const parsedNumber = parseFloat(str);
    return isNaN(parsedNumber) ? NaN : parsedNumber.toFixed(decimalPlaces);
}

// 빈값 체크
function checkEmptyValue(value) {
    if (value === null || value === "undefined" || value === "" || value === "0") {
        return false;
    } else {
        return true;
    }
}

// 전화번호 패턴으로 변경
// 01012345678 -> 010-1234-5678
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // 숫자만 남기고 다른 문자 제거
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/); // 전화번호를 그룹으로 분리

    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3]; // '-'로 구분된 패턴으로 변환
    }

    return null; // 패턴에 맞지 않는 경우 null 반환
}

// 전화번호 패턴으로 변경
// 010-1234-5678 -> 01012345678
function unFormatPhoneNumber(phoneNumber) {
    const modifiedPhoneNumber = phoneNumber.replace(/-/g, ''); // '-'를 모두 제거합니다.
    
    return modifiedPhoneNumber; // 패턴에 맞지 않는 경우 null 반환
}

// 문자열 관련 유틸리티 객체
const stringUtils = {
    parseToFixedNumber,
    checkEmptyValue,
    formatPhoneNumber,
    unFormatPhoneNumber
};

// 문자열 관련 유틸리티 객체 내보내기
export default stringUtils;