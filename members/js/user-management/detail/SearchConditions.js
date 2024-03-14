import AbstractRenderer from "/js/common/AbstractRenderer.js";
import ObjectUtil from "/js/common/ObjectUtil.js";
import PagingTable from "/js/common/PagingTable.js";
import dataRequester from "/js/common/dataRequester.js";

export default class SearchConditions extends AbstractRenderer {

    #categories = [
        ['searchReservation', '예약내역 확인', '0'],
        ['searchLesson', '레슨권 상세보기', '1'],
        ['searchTeeboxes', '이용권 상세보기', '2']
    ]

    #categoryMembers = [
        ['searchReservation', '예약내역 확인', '0'],
        ['searchLesson', '레슨권 상세보기', '1'],
        ['searchTeeboxes', '이용권 상세보기', '2']
    ]
    #categoryPros = [
        ['searchProMembers', '담당회원 내역', '0']
    ];

    #dates = [
        ['searchDate7daysAgo', ' 7일 ', '7'],
        ['searchDate1MonthAgo', '1개월', '1'],
        ['searchDate3MonthsAgo', '3개월', '3'],
        ['searchDate3MonthsAgo', '6개월', '6'],
        ['searchDateToday', '오늘', '0']
    ]

    #modificationButtons = [
        ['modifyTicketInformation', '수정', 'modifyTicket'],
        ['pauseTicket', '일시정지', 'pauseTicket']
    ]

    #createSearchCategoriesMetaData() {
        if (location.href.includes("pros")) {
            this.#categories = this.#categoryPros;
        } else {
            this.#categories = this.#categoryMembers;
        }
        return this.#categories.map(([key, text, param]) => {
            return {
                tag: "button",
                classes: ["btn", "ms-3"],
                textContent: text,
                dataset: {param},
                attributes: {type: "button", id: key}
            }
        });
    }

    #createSearchDateMetaData() {
        return this.#dates.map(([key, text, param]) => {
            return {
                tag: "button",
                classes: ["btn", "btn-dark", "ms-1"],
                textContent: text,
                dataset: {param},
                attributes: {type: "button", id: key}
            }
        });
    }

    #createModificationMetaData() {
        return this.#modificationButtons.map(([key, text, param]) => {
            return {
                tag: "button",
                classes: ["btn", "btn-dark", "ms-3"],
                textContent: text,
                dataset: {param},
                attributes: {type: "button", id: key}
            }
        });
    }

    _createElement() {
        const form = document.createElement("form");
        // categories 구분
        const categoriesConditionDiv = this.#displayCategories();

        // dates 구분
        const startDatePicker = this.#createDatePicker("startDate");
        const endDatePicker = this.#createDatePicker("endDate");
        const datesConditionDiv = this.#displayDates(startDatePicker, endDatePicker);

        const wrapperCondition = ObjectUtil.DivWrapping([categoriesConditionDiv]);
        const wrapperDate = ObjectUtil.DivWrapping([datesConditionDiv]);


        if (location.href.includes("members")) {
            document.getElementById("information-change-buttons").appendChild(this.#displayModificationButtons());

            document.getElementById("information-change-buttons").querySelectorAll("button").forEach(button => {
                button.addEventListener("click", () => {
                    this.#HandleModificationButtonClick.bind(this);
                });
            });
        }

        form.appendChild(wrapperCondition);
        form.appendChild(wrapperDate);

        wrapperCondition.addEventListener("click", this.#handleActiveButton.bind(this));

        categoriesConditionDiv.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", this.#handleCategoryButtonClick.bind(this));
        });

        datesConditionDiv.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", this.#handleDateButtonClick.bind(this));
        });

        startDatePicker.querySelector("input").addEventListener("change", () => {
            const startDateValue = document.getElementById('startDate').value;
            const endDateValue = document.getElementById('endDate').value;

            // 만약 startDate가 endDate보다 클 때 alert 띄우고 일자 변경
            if (startDateValue > endDateValue) {
                alert('시작 일자는 종료 일자보다 나중일 수 없습니다.');
                document.getElementById('startDate').value = endDateValue;
            } else {
                this.#handleDatePickerChange.bind(this);
            }
        });

        endDatePicker.querySelector("input").addEventListener("change", () => {
            const startDateValue = document.getElementById('startDate').value;
            const endDateValue = document.getElementById('endDate').value;

            // 만약 startDate가 endDate보다 클 때 alert 띄우고 일자 변경
            if (startDateValue > endDateValue) {
                alert("종료 일자는 시작 일자보다 빠를 수 없습니다.");
                document.getElementById('endDate').value = endDateValue;
            } else {
                this.#handleDatePickerChange.bind(this);
            }
        });

        document.getElementById("information-change-buttons").addEventListener("click", this.#HandleModificationButtonClick.bind(this));

        form.addEventListener("submit", this.#handleSubmit.bind(this));

        return form;
    }


    #displayCategories() {
        const categoriesConditionDiv = document.createElement("div");
        const categoriesHiddenInput = document.createElement("input");
        categoriesHiddenInput.type = "hidden";
        categoriesHiddenInput.id = "tabIndex";
        categoriesHiddenInput.name = "tabIndex";
        categoriesHiddenInput.value = '0';
        const categoriesCondition = this.#createCategoriesCondition();
        categoriesConditionDiv.classList.add("row");
        categoriesConditionDiv.appendChild(categoriesCondition);
        categoriesConditionDiv.appendChild(categoriesHiddenInput);
        categoriesConditionDiv.appendChild(this.#separationLine());

        return categoriesConditionDiv;
    }

    #displayDates(startDatePicker, endDatePicker) {
        const datesConditionDiv = document.createElement("div");
        const datesCondition = this.#createDateCondition();
        datesConditionDiv.classList.add("row");
        datesConditionDiv.appendChild(datesCondition);
        datesConditionDiv.appendChild(startDatePicker);
        datesConditionDiv.appendChild(endDatePicker);
        datesConditionDiv.appendChild(this.#separationLine());

        return datesConditionDiv;
    }

    #displayModificationButtons() {
        const modificationButtonProps = this.#createModificationMetaData();
        const buttons = modificationButtonProps.map(prop => ObjectUtil.createElement(prop));
        return ObjectUtil.DivWrapping(buttons);
    }


    #createCategoriesCondition() {
        const categoryButtonProps = this.#createSearchCategoriesMetaData();
        const buttons = categoryButtonProps.map(prop => ObjectUtil.createElement(prop));

        return ObjectUtil.DivWrapping(buttons, {classes: ["col", "my-3"]});
    }

    #createDateCondition() {
        const dateButtonProps = this.#createSearchDateMetaData();
        const buttons = dateButtonProps.map(prop => ObjectUtil.createElement(prop));

        return ObjectUtil.DivWrapping(buttons, {classes: ["col-6", "my-3"]});
    }

    #createDatePicker(name) {
        const datePickerDiv = document.createElement("div");
        const datePicker = document.createElement("input");
        datePickerDiv.classList.add("col-3", "my-3");
        datePickerDiv.appendChild(datePicker);
        datePicker.type = "date";
        datePicker.classList.add("form-control");
        datePicker.id = name;
        datePicker.name = name;
        datePicker.value = new Date().toISOString().split("T")[0];
        return datePickerDiv;
    }

    #separationLine() {
        const line = document.createElement("hr");
        line.classList.add("my-3");
        return line;
    }

    #handleActiveButton(event) {
        if (event.target.tagName !== "BUTTON") return;

        const buttons = event.currentTarget.querySelectorAll("button");
        buttons.forEach(button => {
            button.classList.remove("active");
        });

        event.target.classList.add("active");
        console.log(event.target.dataset.param);
        const tabId = event.target.dataset.param;
        if (tabId === "0") {
            document.getElementById("information-change-buttons").style.display = "none";
        } else {
            document.getElementById("information-change-buttons").style.display = "block";
        }
    }

    #handleCategoryButtonClick(event) {
        const buttonValue = event.target.dataset.param;

        document.getElementById("tabIndex").value = Number(buttonValue);

        const dispatch = new Event("submit", {bubbles: true, cancelable: true});
        this.instance.dispatchEvent(dispatch);
    }

    #handleDateButtonClick(event) {
        const buttonValue = event.target.dataset.param;
        const endDate = document.querySelector("#endDate").valueAsDate;
        if (buttonValue === "7") {
            document.querySelector("#startDate").valueAsDate = new Date(endDate.setDate(endDate.getDate() - buttonValue));
        } else if (buttonValue === "0") {
            document.querySelector("#startDate").valueAsDate = new Date();
            document.querySelector("#endDate").valueAsDate = new Date();
        } else {
            document.querySelector("#startDate").valueAsDate = new Date(endDate.setMonth(endDate.getMonth() - buttonValue));
        }
        const dispatch = new Event("submit", {bubbles: true, cancelable: true});
        this.instance.dispatchEvent(dispatch);
    }

    #handleDatePickerChange(event) {
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
        ObjectUtil.dispatchEvent(PagingTable.DISPATCH_MOVE_TAB_EVENT, data);
    }

    /**
     * 수정 버튼 클릭 이벤트 핸들러
     * @param event
     */
    #HandleModificationButtonClick(event) {
        const buttonValue = event.target.dataset.param;

        const radioCheckId = document.querySelector("input[name='ticketId']:checked");
        if (!radioCheckId) {
            alert('레슨권 / 이용권을 먼저 선택해주세요.');
            return;
        }
        const tabIndex = document.getElementById("tabIndex").value === '1' ?  'lessons' : 'teeboxes';

        const ticketDetail = this.#searchTickets(tabIndex, radioCheckId.value);
        console.log(ticketDetail);

        // TODO 20240313 UPDATE EVENT HANDLER
        if (buttonValue === "modifyTicket") {
            console.log("수정");
        } else if (buttonValue === "pauseTicket") {
            console.log("이용정지");
        }

    }

    async #responseValidateAndJson(ticketResponse) {
        if (ticketResponse.status !== 200) throw new Error('문제가 발생했습니다. 관리자에게 문의하세요.');
        if (!ticketResponse.ok) {
            throw new Error('문제가 발생했습니다. 관리자에게 문의하세요.');
        }
        return await ticketResponse.json();
    }

    async #searchTickets(tabIndex, radioCheckId) {
        const ticketResponse = await dataRequester.get('/api' + location.pathname + '/tickets?id=' + radioCheckId);
        const ticketJson = await this.#responseValidateAndJson(ticketResponse);
        return ticketJson.data.list[0];
    }

    triggerSubmit() {
        if (location.href.includes('pros')) {
            this.instance.querySelector("#searchProMembers").click();
        } else {
            this.instance.querySelector("#searchReservation").click();
        }
    }

}