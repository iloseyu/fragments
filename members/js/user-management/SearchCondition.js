import AbstractRenderer from "/js/common/AbstractRenderer.js";
import ObjectUtil from "../common/ObjectUtil.js";


export default class SearchCondition extends AbstractRenderer {

    #categories = [
        ["searchReservation", "예약내역 확인", ""],
        ["searchLesson", "레슨권 상세보기", "01"],
        ["searchTicket", "이용권 상세보기", "02"]
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

    _createElement() {
        const categoriesCondition = this.#createCategoriesCondition();
        const dateCondition = this.#createDateCondition();

        const wrapper = ObjectUtil.DivWrapping([categoriesCondition, dateCondition]);

        wrapper.addEventListener("click", this.#handleActiveButton.bind(this));

        return wrapper;
    }

    #createCategoriesCondition() {
        const buttonProps = this.#createSearchCategoriesMetaData();
        const buttons = buttonProps.map(prop => ObjectUtil.createElement(prop));
        return ObjectUtil.DivWrapping(buttons, {classes: ["btn-group", "mb-3"]});
    }

    #createDateCondition() {
        return document.createElement("div");
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