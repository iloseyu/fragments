import AbstractRenderer from "/js/common/AbstractRenderer.js";
import ObjectUtil from "/js/common/ObjectUtil.js";
import {userDetail} from "/js/user-management/detail/userAPI.js";
import MoveLocation from "/js/user-management/MoveLocation.js";

export default class UserDetail extends AbstractRenderer {

        moveLocation = new MoveLocation();

        #data = [
            ["id", "#"],
            ["loginId", "아이디"],
            ["userName", "성명"],
            ["mbtlNo", "휴대폰"],
            ["email", "이메일"],
            ["joinDate", "등록일"],
            ["userStName", "상태"]
        ];

        #memberData = [
            ["loginId", "아이디"],
            ["userName", "성명"],
            ["userStName", "사용자상태"],
            ["sexDivName", "성별"],
            ["birthDate", "생년월일"],
            ["addr", "주소"],
            ["addrDtls", "상세주소"],
            ["email", "이메일"],
            ["mbtlNo", "휴대폰번호"],
            ["joinDate", "등록일"],
            ["mbrStName", "회원상태"],
            ["entryPointName", "유입경로"],
            ["rectMbrName", "추천인명"],
            ["proName", "담당프로"],
            ["tncAgreements", "서비스 약관"]
        ];

        #employeeData = [
            ["loginId", "아이디"],
            ["userName", "성명"],
            ["empDivName", "직원구분"],
            ["mbtlNo", "휴대폰번호"],
            ["email", "이메일"],
            ["joinDate", "등록일"],
            ["empStName", "상태"]
        ];

}