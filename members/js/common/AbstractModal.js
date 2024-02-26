import AbstractRenderer from "/js/common/AbstractRenderer.js";
import ObjectUtil from "/js/common/ObjectUtil.js";

export default class AbstractModal extends AbstractRenderer {
	#bootstrapModal;

	/** @type {ElementProp} */
	#containerProp = {
		tag: 'div',
		classes: ['modal', 'fade'], attributes: {
			tabindex: '-1', 'aria-hidden': 'true'
		}
	}

	/** @type {ElementProp} */
	#dialogProp = {
		tag: 'div', classes: ['modal-dialog']
	}

	/** @type {ElementProp} */
	#contentProp = {
		tag: 'div',
		classes: ['modal-content']
	}

	/** @type {ElementProp} */
	#headerProp = {
		tag: 'div',
		classes: ['modal-header']
	}

	/** @type {ElementProp} */
	#bodyProp = {
		tag: 'div',
		classes: ['modal-body']
	}

	/** @type {ElementProp} */
	#footerProp = {
		classes: ['modal-footer']
	}

	/** @type {ElementProp} */
	#modalTitleProp = {
		tag: 'h1', classes: ['modal-title', 'fs-5']
	}

	/** @type {ElementProp} */
	#closeButtonProp = {
		tag: 'button',
		classes: ['btn-close'], attributes: {
			'data-bs-dismiss': 'modal', 'aria-label': 'Close'
		}
	}

	/**
	 *
	 * @param {string} targetId
	 * @param {string} title
	 */
	constructor(targetId, title) {
		super(targetId);
		this.#containerProp.attributes['aria-labelledby'] = `${targetId} + Label`;
		(this.#modalTitleProp.attributes ??= {}).id = `${targetId}Label`;
		this.#modalTitleProp.textContent = title;

	}

	show() {
		this.#bootstrapModal.show();
		this._resetValue();
	}

	hide() {
		this.#bootstrapModal.hide();
	}

	async render() {
		await super.render();
		this.#bootstrapModal = new bootstrap.Modal(this.instance);
	}

	_createElement() {
		const modal = ObjectUtil.createElement(this.#containerProp);
		modal.appendChild(this.#createDialog());
		return modal;
	}

	#createDialog() {
		const modalDialog = ObjectUtil.createElement(this.#dialogProp);
		modalDialog.appendChild(this.#createContent());
		return modalDialog;
	}

	#createContent() {
		const modalContent = ObjectUtil.createElement(this.#contentProp);
		modalContent.appendChild(this.#createHeader());
		modalContent.appendChild(this.#createBody());
		return modalContent;
	}

	#createHeader() {
		const modalHeader = ObjectUtil.createElement(this.#headerProp);
		modalHeader.appendChild(this.#createTitle());
		modalHeader.appendChild(this.#createCloseButton());
		return modalHeader;
	}

	#createBody() {
		const modalBody = ObjectUtil.createElement(this.#bodyProp);
		modalBody.appendChild(this._createBodyElement());
		return modalBody;
	}

	#createTitle() {
		return ObjectUtil.createElement(this.#modalTitleProp);
	}

	#createCloseButton() {
		return ObjectUtil.createElement(this.#closeButtonProp);
	}

	/**
	 *
	 * @returns {DocumentFragment}
	 * @abstract
	 * @protected
	 */
	_createBodyElement() {
		throw new Error('_createBodyElement 메소드를 구현해야 합니다.');
	}

	/**
	 * 값 초기화
	 * @return {void}
	 * @abstract
	 * @protected
	 */
	_resetValue() {
		throw new Error('_resetValue 메소드를 구현해야 합니다.');
	}
}
