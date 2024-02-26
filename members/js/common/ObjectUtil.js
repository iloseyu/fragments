/**
 * @typedef {Record<string, string | string[] | Record<string, string>>} ElementProp
 * @property {string} tag 생성할 태그
 * @property {string[]} [classes] 기존 클래스에 추가 될 클래스
 * @property {Record<string, string>} [dataset] 기존 데이터셋을 덮어씌움
 * @property {Record<string, string | boolean>} [attributes] 기존 속성을 덮어씌움
 * @property {string} [textContent] children 이 있을 경우 무시됨
 */

/**
 * @typedef {Object} CellProp
 * @property {string} textContent
 * @property {Record<string, string>} [dataset]
 */

/**
 * @typedef {Object} AnchorProp
 * @property {string} textContent
 * @property {AnchorAttribute} attributes
 * @property {Record<string, string>} [dataset]
 */

/**
 * @typedef {Object} AnchorAttribute
 * @property {string} href
 * @property {string} [target]
 * @property {string} [rel]
 */

/**
 * 오브젝트를 합성하거나 dom과 합성하기 위한 유틸리티 클래스
 */
export default class ObjectUtil {
	/**
	 * HTML 요소를 div로 래핑합니다.
	 * @param {HTMLElement[]} htmlElements
	 * @param {ElementProp} [props] 래퍼에 제공할 프로퍼티
	 * @returns {HTMLDivElement} div로 래핑된 객체
	 */
	static DivWrapping(htmlElements, props = {}) {
		const wrapper = document.createElement('div');
		ObjectUtil.elementAndPropsDeepMerge(wrapper, props);

		return htmlElements.reduce((wrapper, htmlElement) => {
			wrapper.appendChild(htmlElement);
			return wrapper;
		}, wrapper);
	}

	/**
	 * 엘리먼트에 기본 속성을 합성 합니다.
	 * @param {HTMLElement} origin
	 * @param {ElementProp} source
	 * @returns {HTMLElement}
	 */
	static elementAndPropsDeepMerge(origin, source) {
		Object.entries(source).forEach(([key, value]) => {
			// attributes 계열
			if (key === 'classes') {
				origin.classList.add(...value);
			} else if (key === 'dataset') {
				Object.assign(origin.dataset, value);
			} else if (key === 'attributes') {
				Object.entries(value).forEach(([attrKey, attrValue]) => {
					if (attrKey === 'disabled' && attrValue === false) {
						origin.removeAttribute(attrKey);
					} else {
						origin.setAttribute(attrKey, attrValue);
					}
				})
			}
			// properties 계열
			else if (key === 'textContent') {
				origin.textContent = value;
			}
		});
		return origin;
	}

	/**
	 * 엘리먼트를 생성합니다.
	 * @param {ElementProp} prop
	 * @returns {HTMLElement}
	 */
	static createElement(prop) {
		let element = document.createElement(prop.tag);
		Object.entries(prop).forEach(([key, value]) => {
			if (key === 'tag') return;

			// attributes 계열
			if (key === 'classes') {
				element.classList.add(...value);
			} else if (key === 'dataset') {
				Object.assign(element.dataset, prop.dataset);
			} else if (key === 'attributes') {
				Object.entries(value).forEach(([attrKey, attrValue]) => {
						element.setAttribute(attrKey, attrValue);
				})
			}
			// properties 계열
			else if (key === 'textContent') {
				element.textContent = value;
			} else if (key === 'innerHTML') {
				element.innerHTML = value;
			} else if (key === 'disabled' || key === 'readOnly' || key === 'hidden' || key === 'selected') {
				element[key] = value;
			}
		});
		return element;
	}

	/**
	 * 프롭스에 프롭스를 머지합니다.
	 * @param {ElementProp} origin
	 * @param {ElementProp} source
	 * @param {WeakMap} hash
	 * @returns {ElementProp}
	 */
	static propsDeepMerge(origin, source, hash = new WeakMap()) {
		if (hash.has(source)) {
			return hash.get(source);
		}
		hash.set(source, origin);

		Reflect.ownKeys(source).forEach(key => {
			if (typeof source[key] === 'object' && source[key] !== null) {
				if (typeof origin[key] !== 'object' || origin[key] === null) {
					origin[key] = Array.isArray(source[key]) ? [] : {};
				}
				this.propsDeepMerge(origin[key], source[key], hash);
			} else {
				origin[key] = source[key];
			}
		});

		return origin;
	}

	/**
	 * 전역 이벤트 생성
	 * @param {string} eventName
	 * @param {Record<string, string>} [detail]
	 */
	static dispatchEvent(eventName, detail) {
		const dispatchEvent = new CustomEvent(eventName, {
			detail,
			bubbles: true,
			cancelable: true
		});

		document.dispatchEvent(dispatchEvent);
	}
}