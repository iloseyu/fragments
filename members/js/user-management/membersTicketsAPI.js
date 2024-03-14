import fetch from '/js/user-management/dummyData.js';

/**
 * @typedef {Object} MemberLessons
 * @property {Object} meta
 * @property {Object} data
 */

/**
 *
 * @returns {Promise<MemberLessons>}
 */
const memberLessons = async () => {
    // 실제 url = /api/com/*(권한)/members/{id}
    // 넣을 정보: tickets number (01은 레슨, 02는 이용권)
    const apiUrl = new URL('/api/members/lessons', location.origin);
    const response = await fetch(apiUrl,{});
    if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다.');
    }
    if (response.status === 204) {
        return {
            meta: {},
            data : {}
        };
    }
    return response.json();
}

const memberTeeboxes = async () => {
    // 실제 url = /api/com/*(권한)/members/{id}
    // 넣을 정보: tickets number (01은 레슨, 02는 이용권)
    const apiUrl = new URL('/api/members/lessons', location.origin);
    const response = await fetch(apiUrl,{});
    if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다.');
    }
    if (response.status === 204) {
        return {
            meta: {},
            data : {}
        };
    }
    return response.json();
}

export { memberLessons, memberTeeboxes };