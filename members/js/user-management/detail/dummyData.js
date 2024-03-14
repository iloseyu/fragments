/**
 * @param {URL | string} url
 * @param {RequestInit} options
 */
export default async function fetch(url, options = {}) {
    if (url.pathname.startsWith('/api/com/')) {
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