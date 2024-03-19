import AbstractModal from "/js/common/AbstractModal.js";
import ObjectUtil from "/js/common/ObjectUtil.js";
import {modifyTicketModal} from "/js/user-management/detail/userTicketAPI.js";

export default class ModifyTicketModal extends AbstractModal {

    #ticketInformation = [
        ['productName', '상품명'],
        ['division', '구분'],
        ['paymentDate', '결제일'],
        ['paymentPrice', '결제금액'],
        ['limitCount', '총횟수'],
        ['usableCount', '사용가능횟수'],
        ['status', '상태'],
        ['division', '구분'],
        ['useStartDate', '사용시작일'],
        ['useEndDate', '사용만료일'],
        ['proUserId', '담당프로']
    ];

    #ticketChangeButtons = [
        ['useStartDate', '사용시작일'],
        ['useEndDate', '사용만료일'],
        ['proUserId', '담당프로']
    ];

    #ticketChangeInformation = [
        ['useStartDate', '사용시작일'],
        ['useEndDate', '사용만료일'],
        /* proUserId는 추후 이름으로 바꿔야 함 */
        ['proUserId', '담당프로'],
        ['changeCauseInfo', '변경사유']
    ];

    #modifyTicketModal;

    async render() {
        this.#modifyTicketModal = modifyTicketModal();
        return super.render();
    }

    constructor() {
        super("selectedTicketRadio", "");
        document.addEventListener('selectedTicketRadio', this._onSelectedTicketRadio.bind(this));
    }

    /**
     * 플로팅 라벨의 Input, Label 생성
     * @returns {*[]}
     */
    #createTicketInformation(ticketData) {
        let data = [];
        let proData = [{"4": "김혜진"}, {"5": "장선우"}, {"6": "강윤경"}, {"7": "손지민"}];
        for (const element of ticketData) {
            const [key, value] = element;
            if (key === "proUserId") {
                for (const proElement of proData) {
                    const input = {
                        tag: "option",
                        textContent: Object.values(proElement)[0],
                        attributes: {value: Object.keys(proElement)[0], id: Object.keys(proElement), readOnly: true},
                        classes: ["form-control-plaintext"]
                    }
                    data.push({input});
                }
            } else {
                const input = {
                    tag: "input",
                    classes: ["form-control", "form-control-plaintext"],
                    attributes: {type: "text", id: key}
                };
                const label = {
                    tag: "label",
                    classes: ["col-form-label"],
                    textContent: value,
                    attributes: {for: key}
                };
                data.push({label, input});
            }
        }
        console.log(data);
        return data;
    }

    /**
     * checkbox 생성
     * @returns {*[]}
     */
    #createChangeButtons() {
        let data = [];
        for (const element of this.#ticketChangeButtons) {
            const [key, value] = element;
            const input = {
                tag: "input",
                attributes: {type: "checkbox", id: key + "Check"}
            };
            const label = {
                tag: "label",
                classes: ["form-check-label"],
                textContent: value,
                attributes: {for: key + "Check"}
            };
            data.push({label, input});
        }
        console.log(data);
        return data;
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
        const divContainer = ObjectUtil.createElement({tag: 'div', classes: ['container']});
        // 사용자의 의도로 변경할 수 없는 plain text
        const ticketInformation = ObjectUtil.createElement({tag: 'div', attributes: {id: 'ticketInformation'}});
        // 사용자가 변경할 정보를 체크할 수 있는 Button
        const ticketChangeButtons = ObjectUtil.createElement({
            tag: 'div',
            attributes: {id: 'ticketChangeButtons'},
            classes: ["my-3", "row"]
        });
        // 사용자가 변경할 수 있는 form 데이터
        const form = ObjectUtil.createElement({tag: 'form', attributes: {id: 'ticketChangeInformations'}});

        /**
         * Ticket Information만 확인할 때
         */
        divContainer.appendChild(this.#showTicketInformation(ticketInformation));

        // 구분선
        divContainer.appendChild(ObjectUtil.createElement({tag: 'hr', classes: ["my-3"]}));

        /**
         * 사용자가 변경할 수 있는 form 데이터를 활성화시킬 checkbox 버튼 생성
         */
        const tichekChangeButtons = this.#showTicketChangeButtons(ticketChangeButtons);
        divContainer.appendChild(tichekChangeButtons);

        // 구분선
        divContainer.appendChild(ObjectUtil.createElement({tag: 'hr', classes: ["my-3"]}));

        /**
         * 사용자가 변경할 수 있는 form 데이터
         */
        form.appendChild(this.#showTicketChangeInformations());
        form.appendChild(ObjectUtil.DivWrapping(
            [ObjectUtil.createElement({
                tag: 'input',
                attributes: {type: "reset", value: "취소"},
                classes: ["btn", "btn-dark"]
            })
                , ObjectUtil.createElement({
                tag: 'input',
                attributes: {type: "submit", value: "변경"},
                classes: ["btn", "btn-dark", "ms-3"]
            })]
            , {classes: ["col", "my-3", "text-end"]}));
        divContainer.appendChild(form);

        tichekChangeButtons.querySelectorAll("input").forEach(input => {
            input.addEventListener("click", this.#handleButtonClick.bind(this));
        });

        return divContainer;
    }

    /**
     * Detail 정보를 표시할 수 있는 form 데이터(plain text)를 생성
     * @param ticketInformation
     */
    #showTicketInformation(ticketInformation) {
        this.#createTicketInformation(this.#ticketInformation).forEach((formFieldProp, index) => {
            let divWrapper = null;
            this.#modifyTicketModal.then(element => {
                if (element.data.list[0][formFieldProp.input.attributes.id] === null) {
                    formFieldProp.input.attributes.value = "-";
                } else {
                    formFieldProp.input.attributes.value = element.data.list[0][formFieldProp.input.attributes.id];
                }

                if (index % 2 === 0) {
                    divWrapper = ObjectUtil.createElement({tag: "div"});
                    divWrapper.classList.add("row");
                } else if (index !== 1) {
                    divWrapper = document.querySelector("#ticketInformation").lastElementChild;
                }
                divWrapper.appendChild(this.#displayInputLabel(formFieldProp));
                ticketInformation.appendChild(divWrapper);
            });
        });
        return ticketInformation;
    }

    #displayInputLabel(formFieldProp) {
        let label = ObjectUtil.createElement(formFieldProp.label);
        let input = ObjectUtil.createElement(formFieldProp.input);
        if (formFieldProp.input.attributes.id === "division") {
            input.hidden = true;
            label.hidden = true;
        }
        input.readOnly = true;
        return ObjectUtil.DivWrapping([input, label], {classes: ["form-floating", "col"]});
    }

    #showTicketChangeButtons(ticketChangeButtons) {
        this.#createChangeButtons().forEach(formFieldProp => {
            this.#modifyTicketModal.then(element => {
                formFieldProp.input.attributes.value = element.data.list[0][formFieldProp.input.attributes.id];
            });
            ticketChangeButtons.appendChild(this.#displayChangeButtons(formFieldProp));
        });
        return ticketChangeButtons;
    }

    #displayChangeButtons(formFieldProp) {
        let label = ObjectUtil.createElement(formFieldProp.label);
        let input = ObjectUtil.createElement(formFieldProp.input);
        input.classList.add("form-check-input");
        return ObjectUtil.DivWrapping([input, label], {classes: ["col", "form-check"]});
    }

    #showTicketChangeInformations() {
        const form = ObjectUtil.createElement({tag: 'div'});
        let select = ObjectUtil.createElement({tag: 'select', classes: ["form-select"], attributes: {id: "proUserId", disabled: true}});

        this.#createTicketInformation(this.#ticketChangeInformation).forEach(formFieldProp => {
            this.#modifyTicketModal.then(element => {

                console.log(formFieldProp);
                console.log(formFieldProp.input.attributes.id);
                // 사용시작일, 사용만료일 Date 형태로 변경
                if (formFieldProp.input.attributes.id === "useStartDate" || formFieldProp.input.attributes.id === "useEndDate") {
                    formFieldProp.input.attributes.type = "date";
                    formFieldProp.input.attributes.id += "Info";
                }
                
                // Data가 Null이거나 비어있을 때 다른 값 세팅되지 않도록 확실히 비우기
                if (element.data.list[0][formFieldProp.input.attributes.id] === null || element.data.list[0][formFieldProp.input.attributes.id] === "" || element.data.list[0][formFieldProp.input.attributes.id] === undefined || element.data.list[0][formFieldProp.input.attributes.id] === "undefined"){
                    formFieldProp.input.attributes.value = "";
                } else{
                    formFieldProp.input.attributes.value = element.data.list[0][formFieldProp.input.attributes.id];
                }


                form.appendChild(this.#displayChangeInformations(formFieldProp, select));
            });
        });

        console.log("form!!!!!!");
        console.log(form);

        return form;
    }

    #displayChangeInformations(formFieldProp, select) {
        // 태그가 option일 시, select 태그에 추가
        if(formFieldProp.input.tag === "option"){
            select.appendChild(ObjectUtil.createElement(formFieldProp.input));
            select.id = "proUserIdInfo";
            formFieldProp.input = select;
            if (select.children.length > 3)
                return ObjectUtil.DivWrapping([select, ObjectUtil.createElement({tag: 'label', attributes: {for: "proUserIdInfo"}, textContent: "담당프로"})], {classes: ["form-floating", "col", "my-3"]});
        } else {
            let label = ObjectUtil.createElement(formFieldProp.label);
            let input = ObjectUtil.createElement(formFieldProp.input);
            input.readOnly = true;
            return ObjectUtil.DivWrapping([input, label], {classes: ["form-floating", "col", "my-3"]});
        }
    }

    /**
     * 값 초기화
     * @return {void}
     * @abstract
     * @protected
     */
    _resetValue() {
    }

    _onSelectedTicketRadio(event) {
        console.log(event);
    }

    #handleButtonClick = (event) => {
        console.log(event);
        console.log(event.target.id);
        const id = event.target.id.replace("Check", "Info");
        console.log(id);
        const input = document.getElementById(id);

        console.log(input);
        if (input.classList.contains("form-select")) {
            if (input.getAttribute("disabled") === "true") {
                input.removeAttribute("disabled");
            } else {
                input.setAttribute("disabled", "true");
            }
        } else {
            console.log("readOnly");
            input.classList.toggle("form-control-plaintext");
            input.readOnly = !input.readOnly;
        }

        let ticketButtonsChecked = [];
        const changeCauseInfo = document.getElementById("changeCauseInfo");

        document.getElementById("ticketChangeButtons").querySelectorAll("input").forEach(input => {
            if (input.checked) {
                ticketButtonsChecked.push(input.checked);
            }
        });
        if (ticketButtonsChecked.length === 0) {
            changeCauseInfo.classList.add("form-control-plaintext");
            changeCauseInfo.readOnly = true;
        } else {
            changeCauseInfo.classList.remove("form-control-plaintext");
            changeCauseInfo.readOnly = false;
        }

    }


    // display -> setTicketData ->

    // 수정


    // 일시정지

}


