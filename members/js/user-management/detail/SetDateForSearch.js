export default class SetDateForSearch {

    constructor() {
        this.searchStartDate = document.getElementById('searchStartDate');
        this.searchEndDate = document.getElementById('searchEndDate');
        this.today = new Date();
    }

    formatDate() {
        this.searchStartDate.valueAsDate = new Date();
        this.searchEndDate.valueAsDate = this.today;
    }

    setDateAgo(today, dateAgo) {
        this.searchStartDate.valueAsDate = new Date(today.setFullYear(this.searchStartDate.valueAsDate.getFullYear(), this.searchStartDate.valueAsDate.getMonth(), this.searchStartDate.valueAsDate.getDate()));
        this.searchStartDate.valueAsDate = new Date(today.setDate(this.searchStartDate.valueAsDate.getDate() - dateAgo));
        this.searchEndDate.valueAsDate = new Date();
    }

    setMonthAgo(today, monthAgo) {
        this.searchStartDate.valueAsDate = new Date(today.setFullYear(this.searchStartDate.valueAsDate.getFullYear(), this.searchStartDate.valueAsDate.getMonth(), this.searchStartDate.valueAsDate.getDate()));
        this.searchStartDate.valueAsDate = new Date(today.setMonth(this.searchStartDate.valueAsDate.getMonth() - monthAgo));
        this.searchEndDate.valueAsDate = new Date();
    }

    setToday() {
        this.formatDate();
    }
}