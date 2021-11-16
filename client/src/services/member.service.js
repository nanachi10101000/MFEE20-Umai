import axios from "axios";
import dotenv from "dotenv";
import { API_URL } from "../config/config";
dotenv.config();

const AUTH_API_URL = API_URL + "/member";

class MemberService {
  // 修改使用者基本資料
  infoEdit({ first_name, last_name, telephone, birthday }) {
    return axios.put(
      AUTH_API_URL + "/info",
      {
        first_name,
        last_name,
        telephone,
        birthday,
      },
      { withCredentials: true }
    );
  }

  // 修改使用者密碼
  passwordEdit({ newPassword, passwordConfirm }) {
    return axios.put(
      AUTH_API_URL + "/password",
      { newPassword, passwordConfirm },
      { withCredentials: true }
    );
  }

  // 修改使用者頭貼
  avatarEdit(avatar) {
    // 先將圖檔包成formData
    let formData = new FormData();
    formData.append("avatar", avatar);

    // 送出
    return axios.put(AUTH_API_URL + "/avatar", formData, {
      withCredentials: true,
    });
  }

  // 修改信用卡資訊
  creditCardEdit(number, name) {
    // 送出
    return axios.put(
      AUTH_API_URL + "/creditCard",
      { number, name },
      {
        withCredentials: true,
      }
    );
  }

  // 新增學生資訊
  studentInsert(studentInfo) {
    // 送出
    return axios.post(AUTH_API_URL + "/student", studentInfo, {
      withCredentials: true,
    });
  }

  // 拿取所有學員資訊
  student() {
    // 送出
    return axios.get(AUTH_API_URL + "/student", {
      withCredentials: true,
    });
  }

  // 編輯學生資訊
  studentEdit(studentInfo) {
    // 送出
    return axios.put(AUTH_API_URL + "/student", studentInfo, {
      withCredentials: true,
    });
  }
}

export default new MemberService();