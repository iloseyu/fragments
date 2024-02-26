import Table from "/js/common/Table.js";
import ObjectUtil from "/js/common/ObjectUtil.js";
import PageRequester from "./PageRequester.js";

export default class PagingTable extends Table {
	#navProp = {
		tag: 'nav', attributes: {'aria-label': 'Page navigation'}
	}

	#ulProp = {
		tag: 'ul', classes: ['pagination', 'justify-content-center']
	}

	#liProp = {
		tag: 'li', classes: ['page-item']
	}

	#aProp = {
		tag: 'a', classes: ['page-link']
	}

	/** @type {URL} */
	#headerEndPoint;
	/** @type {URL} */
	#BodyEndPoint;
	/** @type {Record<string, string>} */
	#pageMetaData;
	/** @type {Record<string, string>[]} */
	#headerData;
	/** @type {number} */
	#currentPageNum = 1;

	/**
	 *
	 * @param {string} targetId
	 * @param {URL | string} headerEndPoint
	 * @param {URL | string} bodyEndPoint
	 * @param {Record<string, string>[]} headerData
	 */
	constructor(targetId, {headerEndPoint, bodyEndPoint, headerData}) {
		if (!headerEndPoint && !headerData) {
			throw new Error('headerEndPoint 또는 headerData 둘 중 하나는 있어야 합니다.');
		}
		super(targetId);
		this.#headerEndPoint = PageRequester.getBaseUrl(headerEndPoint);
		this.#headerData = headerData;
		this.#BodyEndPoint = PageRequester.getBaseUrl(bodyEndPoint);
	}

	async render() {
		this._headerData = await this.#createHeaderData();
		this._bodyData = await this.#createBodyData();
		await super.render();

		this.instance.addEventListener('click', this.#handlePageChange.bind(this));
	}

	_createElement() {
		const table = super._createElement();
		const pagination = this.#createNav();

		return ObjectUtil.DivWrapping([table, pagination], {});
	}

	/**
	 *
	 * @returns {Promise<CellProp[]>}
	 */
	async #createHeaderData() {
		let response = [];
		if (this.#headerEndPoint) {
			response = await PageRequester.get(this.#headerEndPoint);
			response = response.data.map(value => ({
				dataset: {...value, key: value.key}, textContent: value.name,
			}));
		} else if (this.#headerData) {
			this.#headerData.forEach(value => {
				response.push({dataset: {...value, key: value.key}, textContent: value.name});
			});
		}
		return response;
	}

	/**
	 *
	 * @returns {Promise<CellProp[][]>}
	 */
	async #createBodyData() {
		const response = await PageRequester.get(this.#BodyEndPoint);
		this.#pageMetaData = response.data;
		return response.data.list.map((value, index) => {
			const result = [];

			this._headerData.forEach(header => {
				result.push({
					dataset: value, textContent: value[header.dataset.key],
				});
			});

			return result;
		});
	}

	#createNav() {
		const nav = ObjectUtil.createElement(this.#navProp);
		const ul = this.#createUl();
		nav.appendChild(ul);
		return nav;
	}

	#createUl() {
		const ul = ObjectUtil.createElement(this.#ulProp);

		// 이전 페이지 버튼 추가
		ul.appendChild(this.#createLi({
			dataset: {
				pageNum: this.#pageMetaData.prePage
			}, textContent: '이전', attributes: {href: `#`}
		}, {
			isDisable: !this.#pageMetaData.hasPreviousPage
		}));

		// 페이지 번호 버튼 추가
		this.#pageMetaData.navigatepageNums.forEach(pageNum => {
			const isActivate = pageNum === this.#pageMetaData.pageNum;
			const li = this.#createLi({dataset: {pageNum}, textContent: pageNum.toString(), attributes: {href: '#'}}, {
				isActivate
			});
			ul.appendChild(li);
		});

		// 다음 페이지 버튼 추가
		ul.appendChild(this.#createLi({
			dataset: {
				pageNum: this.#pageMetaData.nextPage
			}, textContent: '다음', attributes: {href: `#`}
		}, {
			isDisable: !this.#pageMetaData.hasNextPage
		}));

		return ul;
	}

	/**
	 *
	 * @param {AnchorProp} prop
	 * @param {boolean} isActivate
	 * @param {boolean} isDisable
	 * @returns {HTMLElement}
	 */
	#createLi(prop, {isActivate = false, isDisable = false} = {}) {
		const li = ObjectUtil.createElement(this.#liProp);
		isActivate && li.classList.add('active');
		isDisable && li.classList.add('disabled');
		li.appendChild(this.#createA(prop));
		return li;
	}

	/**
	 * @param {AnchorProp} prop
	 * @returns {HTMLElement}
	 */
	#createA(prop) {
		return ObjectUtil.createElement({...this.#aProp, ...prop});
	}

	/**
	 * 인스턴스에 부착해서 캡처링으로 이벤트를 발생
	 * @param {MouseEvent} event
	 */
	#handlePageChange(event) {
		/** @type {HTMLAnchorElement} */
		const target = event.target;
		if (target.tagName !== 'A') {
			return;
		}
		event.preventDefault();

		const li = target.parentElement;
		if (li.classList.contains('disabled') || li.classList.contains('active')) {
			return;
		}

		this.#currentPageNum = Number(event.target.dataset.pageNum);
		this.#BodyEndPoint.searchParams.set('pageNum', this.#currentPageNum);
		this.render();
	}
}