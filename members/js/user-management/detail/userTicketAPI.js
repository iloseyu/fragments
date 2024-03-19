import fetch from '/js/dummyData/ticketDummyData.js';

/**
 * @typedef {Object} MemberDetail
 * @property {Object} meta
 * @property {Object} data
 */

/**
 *
 * @returns {Promise<MemberDetail>}
 */
const modifyTicketModal = async () => {
    const apiUrl = new URL('/api/admin/ticket', location.origin)
    const response = await fetch(apiUrl, {});
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

export { modifyTicketModal };