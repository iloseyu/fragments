import AbstractModal from "/js/common/AbstractModal.js";
import ObjectUtil from "/js/common/ObjectUtil.js";


export default class ModifyTicketModal extends AbstractModal {

    constructor() {
        super("selectedTicketRadio", "");
        document.addEventListener('selectedTicketRadio', this._onSelectedTicketRadio.bind(this));
    }

    _createElement() {
        return super._createElement();
    }

    /**
     *
     * @returns {DocumentFragment}
     * @abstract
     * @protected
     */
    _createBodyElement() {
        const form = ObjectUtil.createElement({tag: 'form', attributes: {id: 'selectedTicketRadio'}});

        return ObjectUtil.DivWrapping([form]);
    }

    /**
     * 값 초기화
     * @return {void}
     * @abstract
     * @protected
     */
    _resetValue() {}

    _onSelectedTicketRadio(event) {
        console.log(event);
    }

}