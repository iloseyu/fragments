/**
 * 테이블 생성을 위한 추상 클래스
 * @abstract
 */
export default class AbstractRenderer {
	/** @type {HTMLElement} */
	#instance;
	/**
	 * @type {HTMLElement}
	 * @readonly
	 * */
	get instance() {
		return this.#instance;
	}

	constructor(targetId) {
		this.#instance = document.getElementById(targetId);
		if (!this.#instance) {
			throw new Error(`targetId가 존재하지 않습니다. targetId: ${targetId}`);
		}
	}

	/**
	 * 렌더링
	 * @returns {Promise<void>}
	 */
	async render() {
		// 새로운 엘리먼트를 생성
		const element = this._createElement();

		// 기존 엘리먼트의 id, class를 복사, 나머지는 복사하지 않음. 추후 생각해보기
		element.setAttribute('id', this.#instance.getAttribute('id'));
		element.classList.add(...this.#instance.classList);

		// 기존 엘리먼트를 새로운 엘리먼트로 교체
		this.#instance.replaceWith(element);
		this.#instance = element;
	}

	/**
	 * @abstract
	 * @protected
	 * @returns {HTMLElement}
	 */
	_createElement() {
		throw new Error('_createElement 메소드를 구현해야 합니다.');
	}
}