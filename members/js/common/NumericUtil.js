export default class NumericUtil {
	/**
	 * 기본적으로 한국 통화를 표현 합니다.
	 * @param value
	 * @param locale
	 * @returns {string}
	 */
	static formatNumberAsWon(value, locale = 'ko-KR') {
		return new Intl.NumberFormat(locale).format(value) + '원';
	}
}