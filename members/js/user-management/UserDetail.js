import AbstractRenderer from "/js/common/AbstractRenderer.js";
import {membersDetail} from "/js/user-management/membersAPI.js";
import ObjectUtil from "../common/ObjectUtil.js";

export default class UserDetail extends AbstractRenderer {
    #data = [
        ["loginId", "아이디"],
        ["userName", "이름"],
        ["userSt", "회원구분"],
        ["sexDiv", "성별"],
        ["birthDate", "생년월일"],
        ["addr", "주소"],
        ["email", "이메일"],
        ["mbtlNo", "휴대폰번호"],
        ["joinDate", "등록일"],
        ["mbrSt", "회원상태"],
        ["entryPoint", "유입경로"],
        ["rectMbrName", "추천인명"],
        ["rspProUserId", "담당프로"]/*,
        ["userTerms", "서비스 약관"],
        ["userPrivacy", "개인정보 처리방침"],
        ["userMarketing", "마케팅 정보 수신 동의"],
        ["userEmailAgree", "이메일 수신 동의"],
        ["userThirdPartyAgree", "제3자 정보 제공 동의"]*/
    ];

    // #data = [["loginId", "아이디"], ["userName", "이름"]];

    /**
     * @type {MemberDetail}
     * @property {ElementProp} label
     * @property {ElementProp} input
     */

    #userDetail;

    #createFormMetaData() {
/*        return this.#data.map(([key, value]) => {
            return {
                label: {
                    tag: "label",
                    textContent: value,
                    classes: ["input-group-text"],
                    attributes: {for: key}
                },
                input: {
                    tag: "input",
                    classes: ["form-control"],
                    attributes: {type: "text", id: key}
                }
            }
        });*/

        let data = [];
        for(let i=0; i<this.#data.length; i++) {
            const [key, value] = this.#data[i];
            const label = {
                tag: "label",
                textContent: value,
                classes: ["input-group-text"],
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
        this.#userDetail = await membersDetail();

        await super.render();
    }

    _createElement() {
        const form = document.createElement("form");

        const editButton = this.#createEditButton();
        editButton.addEventListener("click", this.#handleEdit);
        const deleteButton = this.#createDeleteButton();
        deleteButton.addEventListener("click", this.#handleDelete);
        const buttons = ObjectUtil.DivWrapping([editButton, deleteButton], {classes: ["float-end", "mb-3"]});

        form.appendChild(buttons);

        this.#createFormMetaData().forEach(formFieldProp => {
            formFieldProp.input.attributes.value = this.#userDetail.data[formFieldProp.input.attributes.id];
            const label = ObjectUtil.createElement(formFieldProp.label);
            const input = ObjectUtil.createElement(formFieldProp.input);
            const div = ObjectUtil.DivWrapping([label, input], {classes: ["input-group", "my-3"]});
            form.appendChild(div);
        });

        return form;
    }

    #createButton(clazz, textContent) {
        return ObjectUtil.createElement({
            tag: "button",
            classes: ["btn", clazz],
            textContent
        });
    }

    #createEditButton() {
        return this.#createButton('btn-outline-dark', '수정');
    }

    #createDeleteButton() {
        return this.#createButton('btn-outline-danger', '삭제');
    }

    #handleEdit(event) {
        event.preventDefault();
        console.log(location);
        location.href = location.pathname + "/edit";
        console.log("handleEdit");
    }

    #handleDelete(event) {
        event.preventDefault();
        window.history.back();
        console.log("handleDelete");
    }

}