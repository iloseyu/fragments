import numericUtils from "/js/common/numericUtils.js";
import stringUtils from "/js/common/stringUtils.js";

function createTable({header, body}, id, trClickEvent, rowMessage) {
    const elementTable = document.createElement('table');
    elementTable.classList.add('table');

    let idValue;

    if(id){
        idValue = id;
    } else {
        idValue = "common";
    }

    elementTable.id = idValue+"-table";

    const theadTag = createThead(idValue, header);
    elementTable.appendChild(theadTag);

    if(body){
        const tbodyTag = createTbody(idValue, header, body, trClickEvent);
        elementTable.appendChild(tbodyTag);
    } else {
        const tbodyTag = document.createElement('tbody');
        tbodyTag.id = idValue;
        elementTable.appendChild(tbodyTag);

        const trTag = document.createElement('tr');
        tbodyTag.appendChild(trTag);

        const tdTag = document.createElement('td');
        trTag.appendChild(tdTag);

        if(rowMessage){
            tdTag.textContent = rowMessage;
            tdTag.colSpan = header.length;
            tdTag.style.textAlign = "center"; // 가로 가운데 정렬
            tdTag.style.verticalAlign = "middle"; // 세로 가운데 정렬
        }

    }

    return elementTable;
}

function createThead(id, header){
    const theadTag = document.createElement('thead');

    const trTag = document.createElement('tr');
    header.forEach(column => {
        const thTag = document.createElement('th');
        thTag.textContent = column.text;
        trTag.appendChild(thTag);
    });

    theadTag.appendChild(trTag);
    return theadTag;
}


function createTbody(id, header, body, trClickEvent){
    const tbodyTag = document.createElement('tbody');

    // body 배열 순회
    body.forEach(dataRow => {
        const trTag = document.createElement('tr');

        if(trClickEvent){
            trTag.addEventListener("click", trClickEvent(dataRow));
        }

        header.forEach(function(column) {
            let value = dataRow[column.name];

            const tdTag = document.createElement('td');

            if(column.size){
                tdTag.style.width = column.size;
            }

            if(column.input === 'checkbox'){

                const checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                checkBox.value = value;
                checkBox.id = "checkbox_" + value ;
                checkBox.className = 'form-check-input';
                tdTag.appendChild(checkBox);

                //trTag.appendChild(tdTag);
            } else if(column.input === 'text'){
                const inputBox = document.createElement('input');
                inputBox.type = 'text';
                inputBox.value = value;
                inputBox.id = "input_" + value ;

                tdTag.appendChild(inputBox);

                // trTag.appendChild(tdTag);
            } else if(column.input === 'selectbox'){
                const selectBox = document.createElement('select');
                selectBox.id = column.type.id; // 선택 박스에 ID 추가
                selectBox.name = column.type.id; // 선택 박스에 ID 추가
                selectBox.className = 'form-select'; // 선택 박스에 클래스 추가
                selectBox.setAttribute('style', 'width:auto');
                selectBox.setAttribute('aria-label', column.type.id);

                const option = document.createElement('option');
                option.value = "0";
                option.text = "프로 선택";
                selectBox.appendChild(option);

                console.log("value : " + value);
                console.dir(value);
                console.log("column.type : " + column.type);
                console.dir(column.type);
                console.log("column.type.id : " + column.type.id);
                console.log("column.type.value : " + column.type.value);
                console.log("column.type.text : " + column.type.text);

                if(value.length > 1){
                    // value 배열 순회
                    value.forEach(subDataRow => {

                        console.log("subDataRow : " + subDataRow);
                        console.dir(subDataRow);
                        console.log("subDataRow[column.type.value] : " + subDataRow[column.type.value]);
                        console.log("subDataRow[column.type.text] : " + subDataRow[column.type.text]);

                        const option = document.createElement('option');
                        option.value = subDataRow[column.type.value];
                        option.text = subDataRow[column.type.text];
                        selectBox.appendChild(option);
                    });

                     tdTag.appendChild(selectBox);
                } else {
                    // value 배열 순회
                    value.forEach(subDataRow => {

                        console.log("subDataRow : " + subDataRow);
                        console.dir(subDataRow);
                        console.log("subDataRow[column.type.value] : " + subDataRow[column.type.value]);
                        console.log("subDataRow[column.type.text] : " + subDataRow[column.type.text]);

                        tdTag.textContent = subDataRow[column.type.text];
                    });
                }

                selectBox.value = dataRow[column.type.value];

                if(dataRow[column.type.value] !==0){
                    selectBox.disabled = true; // 비활성화
                }

                // trTag.appendChild(tdTag);
            } else {
                value = valueType(column.type, value)

                tdTag.textContent = value;

                // 속성 추가
                // tdTag.setAttribute('name', column.name);
                // tdTag.setAttribute('size', column.size);

                // trTag.appendChild(tdTag);
            }

            if(column.addEventClosure){
                tdTag.addEventListener('change', column.addEventClosure(dataRow));
            }

//            if (column.addEventClosure) {
//                // 이벤트 리스너 추가
//                var changeListener = function(event) {
//                    // 이벤트 핸들러 함수 호출
//                    column.addEventClosure(dataRow)();
//                    // 이벤트 리스너 제거
//                    event.target.removeEventListener('change', changeListener);
//                };
//                // 이벤트 리스너 등록
//                tdTag.addEventListener('change', changeListener);
//
//                // 등록과 동시에 실행
//                var fakeEvent = new Event('change');
//                tdTag.dispatchEvent(fakeEvent);
//            }

//            if(column.addEventClosure){
//                tdTag.addEventListener('change', function(event) {
//                   // 이벤트가 발생한 요소에 대한 정보
//                   var changedElement = event.target;
//
//                   // 요소에 대한 추가적인 처리
//                   // 예: 변경된 요소의 값 얻기
//                   var changedValue = changedElement.value;
//
//                   // 변경된 요소의 상위 요소나 다른 요소 등에 접근 가능
//                   // 예: 변경된 요소의 부모 노드 가져오기
//                   var parentElement = changedElement.parentNode;
//
//                   console.log("changedElement : " + changedElement);
//                   console.log("changedValue : " + changedValue);
//                   console.log("parentElement : " + parentElement);
//
//                   // 이벤트 핸들러 외부의 다른 함수 호출 가능
//                   // 예: column.addEventClosure(dataRow)를 호출하여 추가 작업 수행
//                   column.addEventClosure(dataRow);
//               });
//            }

            trTag.appendChild(tdTag);
        });

        tbodyTag.appendChild(trTag);
    });

    return tbodyTag;
}

function valueType(type, value){
    if(type === 'price'){
        return numericUtils.numberWithCommas(value)
    } else if(type === 'phoneNumber'){
       return stringUtils.formatPhoneNumber(value)
    } else{
        return value;
    }
}

const commonTable = {
    createTable
};

export default commonTable;