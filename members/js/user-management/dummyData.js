/**
 * @param {URL | string} url
 * @param {RequestInit} options
 */
export default async function fetch(url, options = {}) {
    if (url.pathname.startsWith('/api/members/lessons')) {
        return {
            ok: true,
            status: 200,
            json: async () => dummyMemberLessons
        }
    } else if (url.pathname.startsWith('/api/members/teeboxes')) {
        return {
            ok: true,
            status: 200,
            json: async () => dummyMembersTeebox
        }
    }
    else if (url.pathname.startsWith('/api/members')) {
        return {
            ok: true,
            status: 200,
            json: async () => dummyMemberDetail
        }
    }
}

const dummyMemberDetail = {
    "meta": {
        "code": 200,
        "message": "OK",
        "reason": "정상 처리되었습니다."
    },
    "data": {
        "loginId": "mbr001",
        "userName": "회원001",
        "userDiv": "01",
        "userRole": "ROLE_USER",
        "userSt": "정상",
        "sexDiv": "남자",
        "birthDate": "2021-01-01",
        "shopId": 1,
        "zipCode": "12345",
        "addr": "서울시 강남구",
        "addrDtls": "테헤란로 123",
        "email": "mbr001@test.co.kr",
        "mbtlNo": "01012345678",
        "pwd": "{bcrypt}$2a$10$zq4ID.vzWfYadd1wH8RB0OueBnBV0oqb9dona4NcBXTbagkk0Pije",
        "pwdChgDate": null,
        "pwdChgErrCnt": 0,
        "lastLoginDate": null,
        "joinDate": "2021-01-01",
        "mbrSt": "01",
        "joinDiv": "신규",
        "entryPoint": "블로그",
        "rectMbrName": null,
        "rspProUserId": 5,
        "tossCustKey": null,
        "rangexUserKey": null,
        "userId": 0,
        "id": 1,
        "tncs": null,
        "emailId": null,
        "emailDomain": null,
        "proName": "김혜진",
        "tncAgreements": [
            {
                "id": 0,
                "delYn": false,
                "agreeYn": false,
                "creDate": null,
                "creUser": 0,
                "updDate": null,
                "updUser": 0,
                "userId": 0,
                "tncId": 0,
                "user": null,
                "tnc": null,
                "name": "서비스 약관"
            },
            {
                "id": 0,
                "delYn": false,
                "agreeYn": false,
                "creDate": null,
                "creUser": 0,
                "updDate": null,
                "updUser": 0,
                "userId": 0,
                "tncId": 0,
                "user": null,
                "tnc": null,
                "name": "개인정보 처리방침"
            },
            {
                "id": 0,
                "delYn": false,
                "agreeYn": false,
                "creDate": null,
                "creUser": 0,
                "updDate": null,
                "updUser": 0,
                "userId": 0,
                "tncId": 0,
                "user": null,
                "tnc": null,
                "name": "마케팅 정보 수신 동의"
            },
            {
                "id": 0,
                "delYn": false,
                "agreeYn": false,
                "creDate": null,
                "creUser": 0,
                "updDate": null,
                "updUser": 0,
                "userId": 0,
                "tncId": 0,
                "user": null,
                "tnc": null,
                "name": "이메일 수신 동의"
            },
            {
                "id": 0,
                "delYn": false,
                "agreeYn": false,
                "creDate": null,
                "creUser": 0,
                "updDate": null,
                "updUser": 0,
                "userId": 0,
                "tncId": 0,
                "user": null,
                "tnc": null,
                "name": "이메일 수신 동의"
            },
            {
                "id": 0,
                "delYn": false,
                "agreeYn": false,
                "creDate": null,
                "creUser": 0,
                "updDate": null,
                "updUser": 0,
                "userId": 0,
                "tncId": 0,
                "user": null,
                "tnc": null,
                "name": "제3자 정보 제공 동의"
            }
        ]
    }
}

const dummyMemberLessons = {
    "meta": {
        "code": 0,
        "message": "string",
        "reason": "string"
    },
    "data": {
        "content": [
            {
                "id": 1,
                "userId": 1,
                "productId": 1,
                "division": "01",
                "limitCount": 1,
                "proUserId": 1,
                "paymentPrice": 100000,
                "useStartDate": "2021-01-01",
                "useEndDate": "2021-01-31",
                "delYn": false,
                "creDate": "2024-01-01T00:00:00",
                "creUser": 1,
                "updDate": "2024-01-01T00:00:00",
                "updUser": 1,
                "orderId": 1,
                "shopId": 1,
                "useYnCount": 1,
                "activeYn": false,
                "displayYn": false,
                "largeCategory": "01",
                "middleCategory": "01",
                "smallCategory": "01",
                "productType": "1",
                "name": "상품명",
                "useageTime": "1",
                "sellStartDate": "2024-02-26",
                "sellEndDate": "2024-02-26",
                "validPeriod": 1,
                "searchStartDate": "2024-02-26",
                "searchEndDate": "2024-02-26",
                "ticketUseCount": "string",
                "userName": "사용자1",
                "mbtlNo": "01012345678",
                "ticketStatus": "사용완료"
            },
            {
                "id": 2,
                "userId": 1,
                "productId": 1,
                "division": "01",
                "limitCount": 1,
                "proUserId": 1,
                "paymentPrice": 100000,
                "useStartDate": "2021-01-01",
                "useEndDate": "2021-01-31",
                "delYn": false,
                "creDate": "2024-01-01T00:00:00",
                "creUser": 1,
                "updDate": "2024-01-01T00:00:00",
                "updUser": 1,
                "orderId": 1,
                "shopId": 1,
                "useYnCount": 1,
                "activeYn": false,
                "displayYn": false,
                "largeCategory": "01",
                "middleCategory": "01",
                "smallCategory": "01",
                "productType": "1",
                "name": "상품명",
                "useageTime": "1",
                "sellStartDate": "2024-02-26",
                "sellEndDate": "2024-02-26",
                "validPeriod": 1,
                "searchStartDate": "2024-02-26",
                "searchEndDate": "2024-02-26",
                "ticketUseCount": "string",
                "userName": "사용자1",
                "mbtlNo": "01012345678",
                "ticketStatus": "사용"
            }
        ],
        "pageable": {
            "page": 0,
            "size": 0,
            "sort": {
                "empty": true,
                "sorted": true,
                "unsorted": true
            },
            "totalPages": 0,
            "first": true,
            "last": true,
            "rowBounds": {
                "offset": 0,
                "limit": 0
            }
        },
        "totalElements": 0,
        "totalPages": 0
    }
}

const dummyMembersTeebox = {
    "meta": {
        "code": 0,
        "message": "string",
        "reason": "string"
    },
    "data": {
        "content": [
            {
                "id": 1,
                "userId": 1,
                "productId": 1,
                "division": "01",
                "limitCount": 1,
                "proUserId": 1,
                "paymentPrice": 100000,
                "useStartDate": "2021-01-01",
                "useEndDate": "2021-01-31",
                "delYn": false,
                "creDate": "2024-01-01T00:00:00",
                "creUser": 1,
                "updDate": "2024-01-01T00:00:00",
                "updUser": 1,
                "orderId": 1,
                "shopId": 1,
                "useYnCount": 1,
                "activeYn": false,
                "displayYn": false,
                "largeCategory": "01",
                "middleCategory": "01",
                "smallCategory": "01",
                "productType": "1",
                "name": "상품명",
                "useageTime": "1",
                "sellStartDate": "2024-02-26",
                "sellEndDate": "2024-02-26",
                "validPeriod": 1,
                "searchStartDate": "2024-02-26",
                "searchEndDate": "2024-02-26",
                "ticketUseCount": "string",
                "userName": "사용자1",
                "mbtlNo": "01012345678",
                "ticketStatus": "미사용"
            }
        ],
        "pageable": {
            "page": 0,
            "size": 0,
            "sort": {
                "empty": true,
                "sorted": true,
                "unsorted": true
            },
            "totalPages": 0,
            "first": true,
            "last": true,
            "rowBounds": {
                "offset": 0,
                "limit": 0
            }
        },
        "totalElements": 0,
        "totalPages": 0
    }
}

const dummyMembersReservations = {
    "meta": {
        "code": 200,
        "message": "OK or BAD_REQUEST or INTERNAL_SERVER_ERROR",
        "reason": "정상 처리되었습니다. 또는 실패했습니다. 또는 기타 등등..."
    },
    "data": {
        "total": 0,
        "list": [
            {
                "userId": 1,
                "teeBoxId": 1,
                "startDateTime": "2024-01-01T00:00:00",
                "endDateTime": "2024-01-01T01:00:00",
                "id": 1,
                "shopId": 1,
                "status": "01",
                "delYn": false,
                "creDate": "2024-01-01T00:00:00",
                "creUser": 1,
                "updDate": "2024-01-01T00:00:00",
                "updUser": 1
            }
        ],
        "pageNum": 0,
        "pageSize": 0,
        "size": 0,
        "startRow": 0,
        "endRow": 0,
        "pages": 0,
        "prePage": 0,
        "nextPage": 0,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": true,
        "hasNextPage": true,
        "navigatePages": 0,
        "navigatepageNums": [
            0
        ],
        "navigateFirstPage": 0,
        "navigateLastPage": 0
    }
}