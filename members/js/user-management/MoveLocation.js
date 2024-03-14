export default class MoveLocation {

    constructor() {
        this.backButton = document.getElementById('backButton');
        this.updateButton = document.getElementById('updateButton');
        this.deleteButton = document.getElementById('deleteButton');
        this.csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    }

    moveBack(arrayPath) {
        location.href = arrayPath.splice(0, (arrayPath.length - 1)).join('/');
    }

    moveUpdate(path) {
        location.href = path + '/edit';
    }

    moveDelete(path, pathId, xhr) {
        if (confirm('탈퇴 처리하시겠습니까?')) {
            xhr.open('DELETE', '/api/com/' + path.split('/')[1] + '/' + pathId, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('X-CSRF-TOKEN', this.csrfToken);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert('탈퇴 처리가 완료되었습니다.');
                    // 여기에 성공 시 수행할 추가 작업을 코딩할 수 있습니다.
                }
            };
            xhr.send();
        } else {
            alert('탈퇴 처리가 취소되었습니다.');
        }
    }

}