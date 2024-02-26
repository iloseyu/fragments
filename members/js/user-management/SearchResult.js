import AbstractRenderer from "/js/common/AbstractRenderer.js";
import {memberLessons} from "/js/user-management/membersTicketsAPI.js";
import ObjectUtil from "../common/ObjectUtil.js";

export default class SearchResult extends AbstractRenderer {

    #headerData = [
        ['id', '#'],
        ['creDate', '결제일'],
        ['name', '상품명'],
        ['useYnCount', '사용/전체'],
        ['searchStartDate', '시작일'],
        ['searchEndDate', '종료일'],
        ['paymentPrice', '결제금액'],
        ['ticketStatus', '상태']
    ]

    #bodyData;

    #createSearchResultLessonsMetaData() {

        /*        return this.#headerData.map(([key, value]) => {
                    return {
                        label: {
                            tag: "th",
                            textContent: value,
                            attributes: {for: key}
                        },
                        input: {
                            tag: "td",
                            attributes: {type: "text", id: key}
                        }
                    }
                });*/

        let data = {};
        let th = {};
        let tds = [];

        for (let i = 0; i < this.#headerData.length; i++) {
            const [key, value] = this.#headerData[i];
            console.log('[i] ', i);
            console.log('key = ', key);
            console.log('value = ', value);
            th = {
                tag: "th",
                textContent: value,
                attributes: {for: key}
            };
            console.log('this.#membersLessons.data.content = ', this.#bodyData.data.content);
            for (let j = 0; j < this.#bodyData.data.content.length; j++) {
                console.log('[j] ', this.#bodyData.data.content[j].id);
                const td = {
                    tag: "td",
                    textContent: this.#bodyData.data.content[j].id
                };
                console.log('td = ', td);
                tds.push(td);
            }
        }

        data.push({th, tds});

        console.log("data?");
        console.dir(data);

        return data;

        /*        return this.#headerData.map(([key, text]) => {
                    return {
                        tag: "th",
                        textContent: text,
                        attributes: {scope: "col"}
                    }
                });*/
    }

    #createSearchResultLessonsThMetaData() {
        return this.#headerData.map(([key, text]) => {
            return {
                tag: "th",
                textContent: text,
                attributes: {scope: "col"}
            }
        });
    }

    #createSearchResultLessonsTdMetaData() {
        let result = [];

        this.#bodyData.data.content.forEach(value => {
            let columns = [];
            Object.entries(this.#headerData).forEach((key) => {
                let data = {};

                data.tag = "td";
                data.textContent = value[key[1][0]];

                columns.push(data);
            });
            result.push(columns);
        });

        return result;
    }

    async render() {
        this.#bodyData = await memberLessons();

        await super.render();
    }

    _createElement() {
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


        /*        this.#createSearchResultLessonsMetaData().forEach(lessonData => {
                    const th = ObjectUtil.createElement(lessonData.th);
                    const td = ObjectUtil.createElement(lessonData.td);

                    console.log("lessonData");
                    console.dir(lessonData);

                    ths.appendChild(th);
                    tds.appendChild(td);
                });*/

        table.appendChild(thead);
        table.appendChild(tbody);

        return table;
    }
}