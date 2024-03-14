import AbstractRenderer from "/js/common/AbstractRenderer.js";
import ObjectUtil from "/js/common/ObjectUtil.js";
import ListPagingTable from "/js/user-management/list/ListPagingTable.js";

export default class SearchConditions extends AbstractRenderer {

    #searchConditions = [
        ['searchUserStatusAll', '선택', '00']
    ]

    #searchUserStatus = [
        ['searchUserStatusAll', '선택', '00'],
        ['searchUserStatus01', '정상', '01'],
        ['searchUserStatus02', '정지', '02'],
        ['searchUserStatus03', '탈퇴', '03']
    ]

    #createSearchCategoriesMetaData() {
        this.#searchConditions = this.#searchUserStatus;
        return this.#searchConditions.map(([key, text, param]) => {
            return {
                tag: "option",
                textContent: text,
                dataset: {key},
                attributes: {id: param}
            }
        });
    }

    _createElement() {
        const form = document.createElement("form");
        form.setAttribute("method", "GET");

        // User Information 검색
        const searchUserInfoDiv = this.#createSearchUserInformation();

        // User Status 구분
        const searchUserStatusDiv = this.#createSearchUserStatusConditions();

        const wrapperInformationDiv = ObjectUtil.DivWrapping([searchUserInfoDiv]);
        const wrapperConditionDiv = ObjectUtil.DivWrapping([searchUserStatusDiv]);

        wrapperConditionDiv.addEventListener("change", this.#handleUserStatusSearch.bind(this));

        form.appendChild(wrapperInformationDiv);
        form.appendChild(wrapperConditionDiv);

        form.addEventListener("submit", this.#handleSubmit.bind(this));

        return form;
    }

    #createSearchUserInformation() {
        const searchUserInformationDiv = document.createElement("div");
        searchUserInformationDiv.classList.add("col-5");

        const searchUserInformationInput = document.createElement("input");
        searchUserInformationInput.classList.add("form-control");
        searchUserInformationInput.setAttribute("type", "text");
        searchUserInformationInput.setAttribute("id", "keyword");
        searchUserInformationInput.setAttribute("placeholder", "성명 또는 휴대폰번호 입력");

        const searchUserInformationButtonDiv = document.createElement("div");
        searchUserInformationButtonDiv.classList.add("col-1");

        const searchButton = document.createElement("button");
        searchButton.classList.add("btn", "btn-dark");
        searchButton.setAttribute("type", " submit");
        searchButton.setAttribute("id", "searchButton");
        searchButton.setAttribute("name", "searchButton");
        searchButton.textContent = "검색";

        searchUserInformationDiv.appendChild(searchUserInformationInput);
        searchUserInformationButtonDiv.appendChild(searchButton);

        return ObjectUtil.DivWrapping([searchUserInformationDiv, searchUserInformationButtonDiv], {classes: ["row", "justify-content-center", "mb-3"]});
    }


    /**
     * hidden input 생성
     * @param name
     * @param value
     * @returns {HTMLInputElement}
     */
    #createHiddenInput = (name, value) => {
        const hiddenInput = document.createElement("input");
        // hiddenInput.setAttribute("type", "hidden");
        hiddenInput.setAttribute("name", name);
        hiddenInput.setAttribute("id", name);
        hiddenInput.setAttribute("value", value);
        return hiddenInput;
    }

    #createSearchUserStatusConditions() {
        /**
         * userStInput 설정
         * @type {HTMLDivElement}
         */
        const searchUserStatusDiv = document.createElement("div");
        const hiddenUserStatusInput = this.#createHiddenInput("userSt", "00");

        const searchUserStatusSelect = document.createElement("select");
        searchUserStatusSelect.classList.add("form-select");
        searchUserStatusSelect.setAttribute("id", "userStList");

        const searchUserStatusOptions = this.#createSearchCategoriesMetaData();
        searchUserStatusOptions.forEach(option => {
            const optionElement = ObjectUtil.createElement(option);
            searchUserStatusSelect.appendChild(optionElement);
        });
        searchUserStatusDiv.appendChild(searchUserStatusSelect);
        searchUserStatusDiv.classList.add("col-3");

        return ObjectUtil.DivWrapping([searchUserStatusDiv, hiddenUserStatusInput], {classes: ["row", "justify-content-end", "mb-3"]});
    }

    #handleUserStatusSearch = (event) => {
        const selectElement = event.target;
        const option = selectElement.options[selectElement.selectedIndex].id;
        const hiddenInputId = (selectElement.id).substring(0, selectElement.id.length - 4);
        const hiddenInput = document.getElementById(hiddenInputId);
        hiddenInput.value = option;

        const dispatch = new Event("submit", {bubbles: true, cancelable: true});
        this.instance.dispatchEvent(dispatch);
    }

    #handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            searchParams: {}
        };
        for(let [key, value] of form.entries()) {
            data.searchParams[key] = value;
        }
        ObjectUtil.dispatchEvent(ListPagingTable.DISPATCH_MOVE_TAB_EVENT, data);
    }

}