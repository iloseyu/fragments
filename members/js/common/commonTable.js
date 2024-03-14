import numericUtils from "/js/common/numericUtils.js";
import stringUtils from "/js/common/stringUtils.js";

function createTable({header, body}, id, trClickEvent, rowMessage, pageable, clickEvent) {
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

    if(pageable){

    }

    return elementTable;
}

function createThead(id, header){
    const theadTag = document.createElement('thead');

    const trTag = document.createElement('tr');
    header.forEach(column => {
        const thTag = document.createElement('th');
        thTag.textContent = column.text;
        thTag.style.textAlign = "center"; // 가로 가운데 정렬
        thTag.style.verticalAlign = "middle"; // 세로 가운데 정렬
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
            let input = null;
            let inputValue = null;
            let inputSize = null;

            if(stringUtils.checkEmptyValue(column.input)){
                input = column.input.split("/");
                inputValue = input[0];
                inputSize = input[1];
            }

            const tdTag = document.createElement('td');
            tdTag.style.verticalAlign = "middle"; // 세로 가운데 정렬
            if(column.textAlign){
                tdTag.style.textAlign = column.textAlign; // 가로 가운데 정렬
            }

            if(column.size){
                tdTag.style.width = column.size;
            }

            //if(column.input === 'checkbox'){
            if(inputValue !== null && inputValue.indexOf("checkbox") !== -1){
                const checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                checkBox.value = value;
                checkBox.id = "checkbox_" + value ;
                checkBox.className = 'form-check-input';
                tdTag.appendChild(checkBox);
            //} else if(column.input === 'text'){
            } else if(inputValue !== null && inputValue.indexOf("text") !== -1){
                const inputBox = document.createElement('input');
                inputBox.type = 'text';
                inputBox.value = value;
                inputBox.id = "input_" + value ;
                inputBox.style.width = inputSize+"px";

                tdTag.appendChild(inputBox);
            } else if(inputValue !== null && inputValue.indexOf("selectbox") !== -1){
                const selectBox = document.createElement('select');
                selectBox.id = column.type.id; // 선택 박스에 ID 추가
                selectBox.name = column.type.id; // 선택 박스에 ID 추가
                selectBox.className = 'form-select'; // 선택 박스에 클래스 추가
                selectBox.setAttribute('style', 'width:auto');
                selectBox.setAttribute('aria-label', column.type.id);
                selectBox.style.width = inputSize+"px";

                const option = document.createElement('option');
                option.value = "0";
                option.text = "프로 선택";
                selectBox.appendChild(option);

                if(value.length > 1){
                    // value 배열 순회
                    value.forEach(subDataRow => {
                        const option = document.createElement('option');
                        option.value = subDataRow[column.type.value];
                        option.text = subDataRow[column.type.text];
                        selectBox.appendChild(option);
                    });

                     tdTag.appendChild(selectBox);
                } else {
                    // value 배열 순회
                    value.forEach(subDataRow => {
                        tdTag.textContent = subDataRow[column.type.text];
                    });
                }

                selectBox.value = dataRow[column.type.value];

                if(dataRow[column.type.value] !==0){
                    selectBox.disabled = true; // 비활성화
                }
            } else {
                value = valueType(column.type, value)

                tdTag.textContent = value;
            }

            if(column.addEventClosure){
                tdTag.addEventListener('change', column.addEventClosure(dataRow));
            }

            trTag.appendChild(tdTag);
        });

        tbodyTag.appendChild(trTag);
    });

    return tbodyTag;
}

function createPageable(pageable, clickEvent) {
    if(pageable){
        // nav 요소 생성
        const nav = document.createElement('nav');
        nav.setAttribute('aria-label', 'Page navigation');

        // ul 요소 생성
        const ul = document.createElement('ul');
        ul.classList.add('pagination');
        ul.style.display = 'flex';
        ul.style.justifyContent = 'center';
        ul.style.paddingLeft = '0';
        ul.style.listStyle = 'none';

        // ul 요소를 nav 요소의 자식으로 추가
        nav.appendChild(ul);

        if (typeof clickEvent === 'string') {
            console.log('인자는 일반 문자열입니다.');
        } else if (typeof clickEvent === 'function') {
            console.log('인자는 함수입니다.');
        } else {
            console.log('인자의 타입을 알 수 없습니다.');
        }
    }

    return nav;
}

/**
 * 페이지네이션을 생성합니다.
 * @param pageable
 * @param apiUrl
 * @param paramMap
 */
function createPagination(pageable, clickEvent) {
    // commons.pageable 객체에서 필요한 정보를 추출합니다.
    let pageNumber = pageable.page;
    let pageSize = pageable.size;
    let totalPages = pageable.totalPages;

    // 페이지 링크를 표시할 요소를 선택합니다.
    let paginationElement = document.querySelector('.pagination');

    // 현재 페이지를 기준으로 시작 페이지와 끝 페이지를 계산합니다.
    let startPage = Math.floor((pageNumber - 1) / 10) * 10 + 1;
    let endPage = startPage + 9;
    if (endPage > totalPages) {
        endPage = totalPages;
    }

    // 첫 번째 페이지로 이동하는 화살표를 추가합니다.
    if (pageNumber > 1) {
        let firstListItem = document.createElement('li');
        firstListItem.classList.add('page-item');

        let firstLink = document.createElement('a');
        firstLink.classList.add('page-link');
        firstLink.textContent = '<<';

        firstLink.addEventListener('click', function () {
            let newParamMap = new Map(paramMap);
            newParamMap.set('page', 1);
            newParamMap.set('size', pageSize);
            drawTable(apiUrl, newParamMap, column);
        });

        firstListItem.appendChild(firstLink);
        paginationElement.appendChild(firstListItem);
    }

    // 10 페이지 단위로 이전으로 이동하는 화살표를 추가합니다.
    if (startPage > 1) {
        let prevListItem = document.createElement('li');
        prevListItem.classList.add('page-item');

        let prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.textContent = '<';

        prevLink.addEventListener('click', function () {
            let newParamMap = new Map(paramMap);
            newParamMap.set('page', startPage - 1);
            newParamMap.set('size', pageSize);
            drawTable(apiUrl, newParamMap, column);
        });

        prevListItem.appendChild(prevLink);
        paginationElement.appendChild(prevListItem);
    }

    // 각 페이지에 대한 링크를 생성합니다.
    for (let i = startPage; i <= endPage; i++) {
        let pageListItem = document.createElement('li');
        pageListItem.classList.add('page-item');

        let pageLink = document.createElement('a');
        pageLink.classList.add('page-link');

        // 페이지 번호를 표시합니다.
        pageLink.textContent = i;

        // 현재 페이지라면 링크를 비활성화합니다.
        if (i === pageNumber) {
            pageListItem.classList.add('disabled');
        }

        // 링크를 클릭하면 해당 페이지의 데이터를 요청합니다.
        pageLink.addEventListener('click', function () {
            if (i !== pageNumber) {
                let newParamMap = new Map(paramMap);
                newParamMap.set('page', i);
                newParamMap.set('size', pageSize);
                drawTable(apiUrl, newParamMap, column);
            }
        });

        // 페이지 링크를 페이지네이션 요소에 추가합니다.
        pageListItem.appendChild(pageLink);
        paginationElement.appendChild(pageListItem);
    }

    // 10 페이지 단위로 다음으로 이동하는 화살표를 추가합니다.
    if (endPage < totalPages) {
        let nextListItem = document.createElement('li');
        nextListItem.classList.add('page-item');

        let nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.textContent = '>';

        nextLink.addEventListener('click', function () {
            let newParamMap = new Map(paramMap);
            newParamMap.set('page', endPage + 1);
            newParamMap.set('size', pageSize);
            drawTable(apiUrl, newParamMap, column);
        });

        nextListItem.appendChild(nextLink);
        paginationElement.appendChild(nextListItem);
    }

    // 마지막 페이지로 이동하는 화살표를 추가합니다.
    if (pageNumber < totalPages) {
        let lastListItem = document.createElement('li');
        lastListItem.classList.add('page-item');

        let lastLink = document.createElement('a');
        lastLink.classList.add('page-link');
        lastLink.textContent = '>>';

        lastLink.addEventListener('click', function () {
            let newParamMap = new Map(paramMap);
            newParamMap.set('page', totalPages);
            newParamMap.set('size', pageSize);
            drawTable(apiUrl, newParamMap, column);
        });

        lastListItem.appendChild(lastLink);
        paginationElement.appendChild(lastListItem);
    }
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