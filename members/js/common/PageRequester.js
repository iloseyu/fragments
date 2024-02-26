import { fetch } from '/js/user-management/dummyData.js';

export default class PageRequester {
	static #baseUrl = window.location.origin;

	/**
	 *
	 * @param {string} urlString
	 * @returns {URL}
	 */
	static getBaseUrl(urlString) {
		return new URL(urlString, this.#baseUrl);
	}

	static get csrf() {
		return document.querySelector('meta[name="csrf-token"]')?.content ?? '';
	}

	/**
	 *
	 * @param {URL} url
	 * @returns {Promise<any>}
	 */
	static async get(url) {
		debugger;
		const response = await fetch(url, {
			headers: {
				'X-CSRF-TOKEN': this.csrf
			}
		});

		if (!response.ok) {
			throw new Error('데이터를 불러오는데 실패했습니다.');
		} else if (response.status === 204) {
			return emptyData;
		}

		return await response.json();
	}
}

const emptyData = {
	"meta": {
		"code": 204,
		"message": "no content",
		"reason": "데이터가 없습니다."
	},
	"data": {
		"total": 0,
		"list": [],
		"pageNum": 1,
		"pageSize": 10,
		"size": 0,
		"startRow": 1,
		"endRow": 0,
		"pages": 0,
		"prePage": 0,
		"nextPage": 0,
		"isFirstPage": true,
		"isLastPage": true,
		"hasPreviousPage": false,
		"hasNextPage": false,
		"navigatePages": 0,
		"navigatepageNums": [],
		"navigateFirstPage": 0,
		"navigateLastPage": 0
	}
};