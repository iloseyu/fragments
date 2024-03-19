/**
 * @param {URL | string} url
 * @param {RequestInit} options
 */
export default async function fetch(url, options = {}) {
    if (url.pathname.startsWith('/api/admin/ticket')) {
        return {
            ok: true,
            status: 200,
            json: async () => dummyTicketDetail
        }
    }
}

const dummyTicketDetail = {
    "meta": {
        "code": 200,
        "message": "OK",
        "reason": "정상 처리되었습니다."
    },
    "data": {
        "total": 1,
        "list": [
            {
                "id": 2,
                "userId": 13,
                "productId": 5,
                "division": "01",
                "limitCount": 8,
                "usableCount": 8,
                "proUserId": 7,
                "paymentPrice": 300000,
                "useStartDate": null,
                "useEndDate": null,
                "rangexTicketKey": null,
                "useStartYn": false,
                "delYn": false,
                "creDate": "2024-03-13T13:59:37",
                "creUser": 2,
                "updDate": "2024-03-13T13:59:37",
                "updUser": 2,
                "productName": "레슨 25분 8회 / 30일",
                "usageTime": 25,
                "status": "미사용",
                "paymentDate": "2024-03-13",
                "paymentTime": "13:59:37"
            }
        ],
        "pageNum": 1,
        "pageSize": 10,
        "size": 1,
        "startRow": 1,
        "endRow": 1,
        "pages": 1,
        "prePage": 0,
        "nextPage": 0,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [
            1
        ],
        "navigateFirstPage": 1,
        "navigateLastPage": 1
    }
}