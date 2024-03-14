import AbstractRenderer from "/js/common/AbstractRenderer.js";
import { memberLessons, memberTeeboxes } from "/js/user-management/membersTicketsAPI.js";
import ObjectUtil from "/js/common/ObjectUtil.js";
import PagingTable from "/js/common/PagingTable.js";

export default class SearchResult extends AbstractRenderer {

    #headerDataLessons = [
        {key: 'id', name: '#'},
        {key: 'creDate', name: '결제일'},
        {key: 'name', name: '상품명'},
        {key: 'useYnCount', name: '사용/전체'},
        {key: 'searchStartDate', name: '시작일'},
        {key: 'searchEndDate', name: '종료일'},
        {key: 'paymentPrice', name: '결제금액'},
        {key: 'ticketStatus', name: '상태'}
    ]

    #headerDataTickets = [
        {key: 'id', name: '#'},
        {key: 'creDate', name: '결제일'},
        {key: 'name', name: '상품명(회)'},
        {key: 'useYnCount', name: '사용/전체'},
        {key: 'searchStartDate', name: '시작일'},
        {key: 'searchEndDate', name: '종료일'},
        {key: 'paymentPrice', name: '결제금액'},
        {key: 'ticketStatus', name: '상태'}
    ]

    #bodyDataReservations;
    #bodyDataLessons;
    #bodyDataTeeboxes;

    #createSearchResultLessonsThMetaData() {
        return this.#headerDataLessons.map(({key, name}) => {
            return {
                tag: "th",
                textContent: name,
                attributes: {scope: "col"}
            }
        });
    }

    #createSearchResultLessonsTdMetaData() {
        let result = [];

        this.#bodyDataLessons.data.content.forEach(value => {
            let columns = [];
            Object.entries(this.#headerDataLessons).forEach((key, name) => {
                let data = {};

                data.tag = "td";
                data.textContent = value[key[1].key];

                columns.push(data);
            });
            result.push(columns);
        });

        return result;
    }

    #createSearchResultTeeboxesThMetaData() {
        let result = [];

        this.#bodyDataLessons.data.content.forEach(value => {
            let columns = [];
            Object.entries(this.#headerDataLessons).forEach((key, name) => {
                let data = {};

                data.tag = "td";
                data.textContent = value[key[1].key];

                columns.push(data);
            });
        });
    }

    async render(value) {
        console.log("value? " + value);
        if (value === "Reservations") {
            // this.#bodyDataReservations = await memberReservations();
        } else if (value === "Lessons") {
            this.#bodyDataLessons = await memberLessons();
            this._createElement(value);
        } else if (value === "Teeboxes") {
            this.#bodyDataTeeboxes = await memberTeeboxes();
        }

        await super.render();
    }

    _createElement(value) {
        if (value === "Reservations") {
            //TODO 예약내역 테이블 생성
        }
        else if (value === "Lessons") {
            return this.#createLessonsTable();
        }
        else if (value === "Teeboxes") {
            return this.#createTeeboxesTable();
        }

    }

    #createLessonsTable() {
        const table = ObjectUtil.createElement({tag: "table", classes: ["table", "table-hover"]});

        const thead = ObjectUtil.createElement({tag: "thead"});
        const theadTr = ObjectUtil.createElement({tag: "tr"});
        const tbody = ObjectUtil.createElement({tag: "tbody"});

        this.#createSearchResultLessonsThMetaData().forEach(th => {
            const thElement = ObjectUtil.createElement(th);
            theadTr.appendChild(thElement);
        });

        thead.appendChild(theadTr);

        this.#createSearchResultLessonsTdMetaData().forEach(value => {
            const tbodyTr = ObjectUtil.createElement({tag: "tr"});
            value.forEach(value2 => {
                const td = ObjectUtil.createElement(value2);
                tbodyTr.appendChild(td);
            });
            tbody.appendChild(tbodyTr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }

    #createTeeboxesTable() {

    }
}