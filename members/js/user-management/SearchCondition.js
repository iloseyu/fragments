import AbstractRenderer from "/js/common/AbstractRenderer.js";
import ObjectUtil from "../common/ObjectUtil.js";


export default class SearchCondition extends AbstractRenderer {

    #categories = [
        ['searchReservation', '예약내역 확인', ''],
        ['searchLesson', '레슨권 상세보기', '01'],
        ["searchTicket", '이용권 상세보기', '02']
    ]

    #dates = [
        ['searchDate7daysAgo', ' 7일 ', '7'],
        ['searchDate1MonthAgo', '1개월', '1'],
        ['searchDate3MonthsAgo', '3개월', '3'],
        ['searchDate3MonthsAgo', '6개월', '6']
    ]

    #createSearchCategoriesMetaData() {
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
                classes: ["btn", "btn-dark", "ms-3"],
                textContent: text,
                dataset: {param},
                attributes: {type: "button", id: key}
            }
        });
    }

    _createElement() {
        // categories 구분
        const categoriesConditionDiv = document.createElement("div");
        const categoriesCondition = this.#createCategoriesCondition();
        categoriesConditionDiv.classList.add("row");
        categoriesConditionDiv.appendChild(categoriesCondition);
        categoriesConditionDiv.appendChild(this.#separationLine());

        // dates 구분
        const datesConditionDiv = document.createElement("div");
        const datesCondition = this.#createDateCondition();
        const startDatePicker = this.#createDatePicker("StartDate");
        const endDatePicker = this.#createDatePicker("EndDate");
        datesConditionDiv.classList.add("row");
        datesConditionDiv.appendChild(datesCondition);
        datesConditionDiv.appendChild(startDatePicker);
        datesConditionDiv.appendChild(endDatePicker);
        datesConditionDiv.appendChild(this.#separationLine());

        const wrapper = ObjectUtil.DivWrapping([categoriesConditionDiv, datesConditionDiv]);

        wrapper.addEventListener("click", this.#handleActiveButton.bind(this));

        return wrapper;
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
        datePicker.id = "search" + name;
        datePicker.name = "search" + name;
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
    }

}