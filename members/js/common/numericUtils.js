
// 숫자 관련 공통 함수를 포함하는 모듈

/**
 * 숫자에 쉼표 추가하는 함수
 * 금액 천단위로 쉼표 추가
 * @param {num} num 형식화 할 숫자
 * @returns {string} 형식화 된 문자
 */
function numberWithCommas(num) {
    if (num === null || num === undefined) {
            return "0"; // 또는 다른 기본 값으로 대체할 수 있습니다.
    } else if(isNaN(num)){
        return 0;
    } else {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}


/**
 * 쉼표를 제거한 후 숫자로 변환하여 반환
 * 쉼표가 들어간 금액 데이터 쉼표 제거
 * @param {str} str 대상 문자 형태 숫자
 * @returns {number} 형식화 된 숫자
 */
function removeCommasAndParseNumber(str) {
    return parseFloat(str.replace(/,/g, ''));
}

const numericUtils = {
    numberWithCommas,
    removeCommasAndParseNumber
};

export default numericUtils;

