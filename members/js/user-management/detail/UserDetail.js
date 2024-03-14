import AbstractRenderer from "/js/common/AbstractRenderer.js";
import ObjectUtil from "/js/common/ObjectUtil.js";
import {userDetail} from "/js/user-management/detail/userAPI.js";
import MoveLocation from "/js/user-management/MoveLocation.js";
import ConfirmUserDeleteModal from "/js/user-management/ConfirmUserDeleteModal.js";

export default class UserDetail extends AbstractRenderer {

    moveLocation = new MoveLocation();

    #data = [
        ["loginId", "아이디"],
        ["userName", "성명"],
        ["userStName", "사용자상태"],
        ["sexDivName", "성별"],
        ["birthDate", "생년월일"],
        ["addr", "주소"],
        ["addrDtls", "상세주소"],
        ["email", "이메일"],
        ["mbtlNo", "휴대폰번호"],
        ["joinDate", "등록일"],
        ["mbrStName", "회원상태"],
        ["entryPointName", "유입경로"],
        ["rectMbrName", "추천인명"]/*,
        ["tncAgreements", "서비스 약관"]*/
    ];

    #memberData = [
        ["loginId", "아이디"],
        ["userName", "성명"],
        ["userStName", "사용자상태"],
        ["sexDivName", "성별"],
        ["birthDate", "생년월일"],
        ["addr", "주소"],
        ["addrDtls", "상세주소"],
        ["email", "이메일"],
        ["mbtlNo", "휴대폰번호"],
        ["joinDate", "등록일"],
        ["mbrStName", "회원상태"],
        ["entryPointName", "유입경로"],
        ["rectMbrName", "추천인명"],
        ["tncAgreements", "서비스 약관"],
        ["rangexUserKey", "rangeX Key"]
    ];

    #employeeData = [
        ["loginId", "아이디"],
        ["userName", "성명"],
        ["empDivName", "직원구분"],
        ["mbtlNo", "휴대폰번호"],
        ["email", "이메일"],
        ["joinDate", "등록일"],
        ["empStName", "상태"]
    ];

    #proData = [
        ["loginId", "아이디"],
        ["userName", "성명"],
        ["proDivName", "프로구분"],
        ["mbtlNo", "휴대폰번호"],
        ["email", "이메일"],
        ["addr", "주소"],
        ["addrDtls", "상세주소"],
        ["joinDate", "등록일"],
        ["proStName", "상태"]
    ]

    #adminData = [
        ["loginId", "아이디"],
        ["userName", "성명"],
        ["mbtlNo", "휴대폰번호"],
        ["email", "이메일"],
        ["joinDate", "등록일"],
        ["userStName", "상태"]
    ]

    /**
     * @type { MemberDetail | EmployeeDetail | ProDetail | AdminDetail }
     * @property {ElementProp} label
     * @property {ElementProp} input
     */

    #userDetail;

    #createFormMetaData() {
        if (location.pathname.includes("members")) {
            this.#data = this.#memberData;
        } else if (location.pathname.includes("employees")) {
            this.#data = this.#employeeData;
        } else if (location.pathname.includes("pros")) {
            this.#data = this.#proData;
        } else if (location.pathname.includes("admins")) {
            this.#data = this.#adminData;
        }
        let data = [];
        for (let i = 0; i < this.#data.length; i++) {
            const [key, value] = this.#data[i];
            const label = {
                tag: "label",
                textContent: value,
                attributes: {for: key}
            };
            const input = {
                tag: "input",
                classes: ["form-control"],
                attributes: {type: "text", id: key}
            };
            data.push({label, input});
        }

        return data;
    }

    async render() {
        this.#userDetail = await userDetail();

        await super.render();
    }

    _createElement() {
        const divRow = ObjectUtil.createElement({tag: "div", classes: ["row"]});
        const form = document.createElement("form");

        const listButton = this.moveLocation.createListButton();
        listButton.addEventListener("click", () => {
            this.moveLocation.handleList(event);
        });
        divRow.appendChild(ObjectUtil.DivWrapping([listButton], {classes: ["text-start", "mb-3"]}));

        const editButton = this.moveLocation.createEditButton();
        editButton.addEventListener("click", () => {
            this.moveLocation.handleEdit(event);
        });
        const deleteButton = this.moveLocation.createDeleteButton();
        deleteButton.classList.add("ms-3");
        deleteButton.addEventListener("click", () => {
            this.moveLocation.handleDelete(event);
        });
        const buttons = ObjectUtil.DivWrapping([editButton, deleteButton], {classes: ["text-end", "mb-5"]});
        divRow.appendChild(buttons);

        this.#createFormMetaData().forEach(formFieldProp => {
            let div;
            let label;
            let input;
            let button;
            if (formFieldProp.input.attributes.id === "tncAgreements") {
                for (let value of this.#userDetail.data[formFieldProp.input.attributes.id]) {
                    label = ObjectUtil.createElement({tag: "label", textContent: value.name});
                    input = ObjectUtil.createElement({
                        tag: "input",
                        classes: ["form-control"],
                        attributes: {type: "text", id: value.name}
                    });
                    input.value = value.agreeYn ? "동의" : "비동의";
                    input.readOnly = true;
                    div = ObjectUtil.DivWrapping([input, label], {classes: ["form-floating", "my-3"]});
                    form.appendChild(div);
                }
            } else if (formFieldProp.input.attributes.id === "rangexUserKey") {
                if (this.#userDetail.data[formFieldProp.input.attributes.id] === null || this.#userDetail.data[formFieldProp.input.attributes.id] === "" || this.#userDetail.data[formFieldProp.input.attributes.id] === undefined) {
                    formFieldProp.input.attributes.value = "미발급";
                    this.#handleInputLabel(label, input, div, form, formFieldProp);
                    button = ObjectUtil.createElement({
                        tag: "button",
                        classes: ["btn", "btn-dark"],
                        textContent: "rangeX Key 발급",
                        dataset: {param: "rangexUserKey"},
                        attributes: {type: "button", id: "rangexUserKeyButton"}
                    });
                    div = ObjectUtil.DivWrapping([button], {classes: ["row", "my-3"]});
                    button.addEventListener('click', () => {
                        const json = this.handleJoinRangeX();
                    });
                    form.appendChild(div);
                } else {
                    formFieldProp.input.attributes.value = this.#userDetail.data[formFieldProp.input.attributes.id];
                    this.#handleInputLabel(label, input, div, form, formFieldProp);
                }
            } else if (this.#userDetail.data[formFieldProp.input.attributes.id] !== null) {
                formFieldProp.input.attributes.value = this.#userDetail.data[formFieldProp.input.attributes.id];
                this.#handleInputLabel(label, input, div, form, formFieldProp);
            }
        });
        divRow.appendChild(form);

        return divRow;
    }

    #handleInputLabel(label, input, div, form, formFieldProp) {
        // formFieldProp.input.attributes.value = this.#userDetail.data[formFieldProp.input.attributes.id];
        label = ObjectUtil.createElement(formFieldProp.label);
        input = ObjectUtil.createElement(formFieldProp.input);
        input.readOnly = true;
        div = ObjectUtil.DivWrapping([input, label], {classes: ["form-floating", "my-3"]});
        form.appendChild(div);
    }

    csrf() {
        return document.querySelector('meta[name="csrf-token"]')?.content ?? '';
    }

    async handleJoinRangeX() {
        const url = new URL('/api' + location.pathname + '/joinRangeX', location.origin);
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', this.csrf());
        headers.append('Content-Type', 'application/json');
        const response = await fetch(url, {
            method: 'PATCH',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        // return await response.json();
        return location.href = location.pathname;
    }
}