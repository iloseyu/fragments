import Table from "/js/common/Table.js";
import ObjectUtil from "/js/common/ObjectUtil.js";
import PageRequester from "/js/common/PageRequester.js";
import NumericUtil from "/js/common/NumericUtil.js";

export default class ListPagingTable extends Table {
	static #DISPATCH_MOVE_TAB_EVENT = 'changeTab';
	static get DISPATCH_MOVE_TAB_EVENT() {
		return ListPagingTable.#DISPATCH_MOVE_TAB_EVENT;
	}

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

	/** @type {URL[]} */
	#headerEndPoint = [];
	/** @type {URL[]} */
	#BodyEndPoint = [];
	/** @type {Record<string, string>} */
	#pageMetaData;
	/** @type {Record<string, string>[][]} */
	#headerData = [];
	/** @type {number} */
	#currentPageNum = 1;
	#currentTabIndex = 0;
	#searchParams = new URLSearchParams();

	/**
	 *
	 * @param {string} targetId
	 * @param {URL[] | string[]} headerEndPoint
	 * @param {URL[] | string[]} bodyEndPoint
	 * @param {Record<string, string>[]} headerData
	 */
	constructor(targetId, {headerEndPoint, bodyEndPoint, headerData},  thInBodyCount = 0, isCellActive = true, isBorderActive = true) {
		if (!headerEndPoint && !headerData) {
			throw new Error('headerEndPoint 또는 headerData 둘 중 하나는 필수 값 입니다.');
		}
		if (!bodyEndPoint) {
			throw new Error('bodyEndPoint는 필 수 값 입니다.');
		}

		super(targetId, thInBodyCount, isCellActive, isBorderActive);

		if (headerEndPoint) {
			headerEndPoint.forEach(headerEndPoint => this.#headerEndPoint.push(PageRequester.getBaseUrl(headerEndPoint)));
		} else {
			headerData.forEach(value => this.#headerData.push(value));
		}
		bodyEndPoint.forEach(bodyEndPoint => this.#BodyEndPoint.push(PageRequester.getBaseUrl(bodyEndPoint)));

		document.addEventListener(ListPagingTable.#DISPATCH_MOVE_TAB_EVENT, this.#onMoveTab.bind(this));
	}

	async render() {
		this._headerData = await this.#createHeaderData();
		this._bodyData = await this.#createBodyData();
		await super.render();

		this.instance.addEventListener('click', this.#handlePageChange.bind(this));
	}

	_createElement() {
		const table = super._createElement();
		const totalCount = this.#totalCount();
		const pagination = this.#createPagination();

		return ObjectUtil.DivWrapping([totalCount, table, pagination], {});
	}

	#totalCount() {
		const totalCount = ObjectUtil.createElement({tag: 'div', textContent: `총 ${this.#pageMetaData.totalElements} 건`, classes: ['pt-1', 'pb-1', 'ps-2', 'pe-2', 'd-flex', 'align-items-center']});
		return ObjectUtil.DivWrapping([totalCount], {classes: ['d-flex', 'align-items-center', 'pt-2', 'pb-2']});
	}

	/**
	 * @returns {Promise<CellProp[]>}
	 */
	async #createHeaderData() {
		let response = [];
		if (this.#headerEndPoint.length > 0) {
			response = await PageRequester.get(this.#headerEndPoint[this.#currentTabIndex]);
			response = response.data.map(value => ({
				dataset: {...value, key: value.key}, textContent: value.name,
			}));
		} else if (this.#headerData[this.#currentTabIndex]) {
			this.#headerData[this.#currentTabIndex].forEach(value => {
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
		const url = new URL(this.#BodyEndPoint[this.#currentTabIndex]);
		this.#searchParams.forEach((value, key) => url.searchParams.set(key, value));
		const response = await PageRequester.get(url);
		this.#pageMetaData = response.data;
		return response.data.content.map((value, index) => {
			const result = [];

			this._headerData.forEach(header => {
				let textContent = value[header.dataset.key];

				// 타입이 금액 일경우 금액 형식으로 변경
				if (header.dataset.type === 'currency') {
					textContent = NumericUtil.formatNumberAsWon(value[header.dataset.key]);
				}
				result.push({
					dataset: value, textContent,
				});
			});

			return result;
		});
	}

	#createPagination() {
		if (!this.#pageMetaData.totalElements) {
		// if (!this.#pageMetaData.navigatepageNums.length) {
			return ObjectUtil.createElement({tag: 'div'});
		}
		const nav = ObjectUtil.createElement(this.#navProp);
		const ul = this.#createUl();
		nav.appendChild(ul);
		return nav;
	}

	#createUl() {
		const ul = ObjectUtil.createElement(this.#ulProp);
		if(this.#pageMetaData.totalElements > 0) {
			// 이전 페이지 버튼 추가
			ul.appendChild(this.#createLi({
				dataset: {
					pageNum: this.#pageMetaData.prePage
				}, textContent: '이전', attributes: {href: `#`}
			}, {
				isDisable: !this.#pageMetaData.hasPreviousPage
			}));

			// 페이지 번호 버튼 추가
			for (let i = 0; i< this.#pageMetaData.totalPages; i++) {
				const pageNum = i + 1;
				const isActivate = pageNum === this.#pageMetaData.pageNum;
				const li = this.#createLi({
					dataset: {pageNum},
					textContent: pageNum.toString(),
					attributes: {href: '#'}
				}, {
					isActivate
				});
				ul.appendChild(li);
			}

			// 다음 페이지 버튼 추가
			ul.appendChild(this.#createLi({
				dataset: {
					pageNum: this.#pageMetaData.nextPage
				}, textContent: '다음', attributes: {href: `#`}
			}, {
				isDisable: !this.#pageMetaData.hasNextPage
			}));

		}
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
	async #handlePageChange(event) {
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

		this.#searchParams.set('pageNum', target.dataset.pageNum);

		await this.render();
	}

	/**
	 *
	 * @param {CustomEvent} event
	 */
	async #onMoveTab(event) {
		const params = event.detail.searchParams;

		this.#searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => this.#searchParams.set(key, value));

		this.#currentTabIndex = params.tabIndex;
		await this.render();
	}

}