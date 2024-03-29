import AbstractRenderer from "/js/common/AbstractRenderer.js";
import ObjectUtil from "/js/common/ObjectUtil.js";

export default class Table extends AbstractRenderer {
	/** @type {ElementProp} */
	#tableProp = {
		tag: 'table', classes: ['text-center', 'table', 'table-sm', 'table-hover', 'align-middle']
	}
	/** @type {ElementProp} */
	#colProp = {tag: 'col'}
	/** @type {ElementProp} */
	#captionProp = {tag: 'caption'}
	/** @type {ElementProp} */
	#theadProp = {tag: 'thead'}
	/** @type {ElementProp} */
	#tbodyProp = {tag: 'tbody', classes: ['table-group-divider']}
	/** @type {ElementProp} */
	#thInTheadProp = {
		attributes: {scope: "col"}
	}
	/** @type {ElementProp} */
	#thInTbodyProp = {
		attributes: {scope: "row"}
	}
	/**
	 * cell 은 tag가 동적으로 생성되기 떄문에 미리 정의 하지 않습니다.
	 *  @type {CellProp}
	 * */
	#cellProp = { classes: ['pt-2', 'pb-2']}
	#emptyCellProp = {
		tag: 'td',
		textContent: '조회할 데이터가 없습니다.',
		classes: ['p-4', 'text-muted', 'display-6'],
		attributes: {colspan: 0} // 사용시 동적으로 대입합니다.
	}

	/**
	 * @type {CellProp[]}
	 * @protected
	 * */
	_headerData;

	/**
	 * @type {CellProp[][]}
	 * @protected
	 * */
	_bodyData;

	/** @type {number} */
	#thInBodyCount;
	/** @type {HTMLTableCellElement} */
	#selectedTarget
	#isCellActive;

	constructor(targetId, thInBodyCount = 0, isCellActive = true, isBorderActive = true) {
		super(targetId);
		this.#thInBodyCount = thInBodyCount;
		this.#isCellActive = isCellActive;
		if (isBorderActive) {
			this.#tableProp.classes.push('table-bordered');
		}
	}

	async render() {
		if (!this._headerData) {
			throw new Error("헤더 데이터를 초기화 하세요. _headerData : ", this._headerData);
		}
		if (!this._bodyData) {
			throw new Error("바디 데이터를 초기화 하세요. _bodyData : ", this._bodyData);
		}
		await super.render();
	}

	/**
	 *
	 * @returns {HTMLDivElement}
	 * @protected
	 */
	_createElement() {
		// 생성
		const table = ObjectUtil.createElement(this.#tableProp);

		// 가공
		table.appendChild(this.#createColgroup());
		false && table.appendChild(this.#createCaption()); // 캡션이 언제 필요할지 생각해보고 활성화하기
		table.appendChild(this.#createThead());
		table.appendChild(this.#createTbody());

		return ObjectUtil.DivWrapping([table], {classes: ['table-responsive']});
	}

	/**
	 * colgroup 생성
	 * @returns {HTMLTableColElement}
	 */
	#createColgroup() {
		const colgroup = document.createElement("colgroup");

		this._headerData.forEach(() => {
			const col = ObjectUtil.createElement(this.#colProp);
			colgroup.appendChild(col);
		});

		return colgroup;
	}

	/**
	 * 캡션 생성
	 * @returns {HTMLTableCaptionElement}
	 */
	#createCaption() {return ObjectUtil.createElement(this.#captionProp);}

	/**
	 * 헤더 생성
	 * 자신의 자식까지 다 생성합니다.
	 * @returns {HTMLTableSectionElement}
	 */
	#createThead() {
		// 생성
		const thead = ObjectUtil.createElement(this.#theadProp);

		// 가공
		const createdTr = this.#createRow(this._headerData, this._headerData.length);
		thead.appendChild(createdTr);

		// 반환
		return thead;
	}

	/**
	 * 테이블 바디 생성
	 * 자신의 자식까지 다 생성합니다.
	 * @returns {HTMLTableSectionElement}
	 */
	#createTbody() {
		// 생성
		const tbody = ObjectUtil.createElement(this.#tbodyProp);

		// 가공 및 반환
		this._bodyData.forEach(data => {
			const createdTr = this.#createRow(data, this.#thInBodyCount);
			tbody.appendChild(createdTr);
		});
		if (this._bodyData.length === 0) tbody.appendChild(this.#createEmptyTr());

		tbody.addEventListener("click", this._handleTdCell.bind(this));

		return tbody;
	}

	/**
	 * 바디의 로우를 만듭니다.
	 * 바디에서도 헤더 컬럼이 존재할 수 있기 때문에, 헤더(th)를 만드는 로직이 포함되어 있습니다.
	 * @param {CellProp[]} data
	 * @param {number} thCount
	 * @returns {HTMLTableRowElement}
	 */
	#createRow(data, thCount) {
		const tr = document.createElement("tr");

		data.forEach((prop, index) => {
			let cell;
			// 지정한 카운트만큼 헤더를 만듭니다.
			if (index < thCount) {
				const thProp = this._headerData.length === thCount ? this.#thInTbodyProp : this.#thInTheadProp;
				cell = this.#createCell('th', {...thProp, ...prop});
			} else {
				cell = this.#createCell('td', prop);
			}
			tr.appendChild(cell);
		});

		return tr;
	}

	/**
	 * @param {string} tag
	 * @param {CellProp} prop
	 * @returns {HTMLTableCellElement}
	 */
	#createCell(tag, prop) {
		// 참조 변경을 조심해서 사용하십시오.
		const mergedProp = Object.assign({}, this.#cellProp, prop);
		return ObjectUtil.createElement({tag, ...mergedProp});
	}

	#createEmptyTr() {
		const tr = ObjectUtil.createElement({tag: 'tr'});
		return ObjectUtil.createElement({...this.#emptyCellProp, attributes: {colspan: this._headerData.length}});
	}

	/**
	 * tbody에 부착하는 이벤트 입니다.
	 * 셀 중에서 td 클릭 이벤트만 발생합니다.
	 * @param {MouseEvent} event
	 * @returns {HTMLTableCellElement | undefined}
	 */
	_handleTdCell(event) {
		const target = event.target.closest("td");
		if (!target || target === this.#selectedTarget) {
			return;
		}

		this.#activeCell(target);
		return target;
	}

	/**
	 *
	 * @param {HTMLElement} target
	 */
	#activeCell(target) {
		if(!this.#isCellActive && this.#selectedTarget) {
			this.#selectedTarget.parentElement.childNodes.forEach(td => {
				td.classList.remove('bg-success-subtle');
			});
		} else {
			this.#selectedTarget &&
			this.#selectedTarget.classList.toggle('bg-success-subtle');
		}
		if (this.#isCellActive) {
			target.classList.toggle('bg-success-subtle');
		} else {
			target.parentElement.childNodes.forEach(td => {
				td.classList.toggle('bg-success-subtle');
			});
		}
		this.#selectedTarget = target;

		return target;
	}
}