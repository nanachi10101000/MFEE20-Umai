// 各位需要的話可以直接修改或是新增錯誤碼，要按照以下的命名歸則
// 改別人的錯誤碼前，需要先詢問負責那個部分的同學

class validMessage {
  // A => 登入相關錯誤碼
  static login = {
    A001: "使用者帳號或密碼錯誤！",
    A002: "使用者帳號未曾註冊！",
    A003: "帳號需為有效之Email帳號！",
    A004: "密碼必須為8~12位數(英文 + 數字)！",
    A005: "尚未登入！",
    A006: "此帳號為Google註冊，請使用Google登入！",
    A007: "此帳號為Facebook註冊，請使用Facebook登入！",
    A008: "無法寄送訊息到此email！",

    A999: "不知名錯誤(登入相關)",
  };

  // B => 註冊相關錯誤碼
  static registration = {
    B001: "帳號需為有效之Email帳號！",
    B002: "密碼必須為8~12位數(英文 + 數字)！",
    B003: "使用者帳號已被註冊！",
    B004: "密碼與確認密碼不符！",
    B005: "此Email帳號已被本地或其他第三方註冊！",
    B999: "不知名錯誤(註冊相關)",
  };

  // C => 討論區相關錯誤碼
  static forum = {
    C001: "文章標題不可空白！",
    C002: "文章內容不可空白！",
    C003: "看板未選擇！",
    C004: "留言內容不可空白！",
    C005: "上傳圖片須小於4MB！",
    C006: "此看板內沒有任何文章！",
    C007: "請先登入才能收藏！",
    C008: "請先登入才能按讚！",
    C999: "不知名錯誤(討論區相關)",
  };

  // D => 購物車頁面相關錯誤碼
  static cart = {
    D001: "請先登入會員再結帳！",
    D002: "單筆消費限購一堂課程！",
    D999: "不知名錯誤(購物車相關)",
  };

  // E => 課程相關錯誤碼
  static course = {
    E001: "報名人數未選擇！",
    E002: "報名梯次未選擇！",
    E003: "報名者姓名未正確輸入！",
    E004: "報名者Email未正確輸入！",
    E005: "報名者電話未正確輸入！",
    E006: "報名須知尚未打勾！",
    E007: "課程已額滿！",

    // 課程新增相關
    E101: "課程分類未選擇",
    E102: "請正確填寫課程名稱(最多：50字)！",
    E103: "請正確填寫課程價格(最多：NT$9999)！",
    E104: "請正確填寫課程時數(最多：24hr)！",
    E105: "請正確填寫課程分級！",
    E106: "請正確填寫人數限制(最多：99人)！",
    E107: "請正確填寫公司名稱(最多：100字)！",
    E108: "請正確填寫公司地址(最多：100字)！",
    E109: "請正確填課程分類！",
    E110: "請正確填課程詳細內容！",
    E999: "不知名錯誤(課程相關)",
  };

  // F => 付款相關錯誤碼
  static payment = {
    F001: "信用卡卡號格式錯誤(16碼數字)！",
    F002: "持卡人格式錯誤(請輸入羅馬拼音)！",
    F003: "信用卡安全碼格式錯誤！",
    F004: "信用卡到期日格式錯誤！",
    F999: "不知名錯誤(付款相關)",
  };

  // G => 會員中心相關錯誤碼
  static member = {
    G001: "名字須為長度1~15的中、英文字母！",
    G002: "姓氏須為長度1~15的中、英文字母！",
    G003: "請輸入正確格式之行動電話！",
    G004: "請輸入正確出生日期(不可大於今日)！",
    G005: "舊密碼輸入錯誤！",
    G006: "新密碼格式不符(至少8位英 + 數字)！",
    G007: "請輸入正確格式之Email！",
    G008: "新密碼不可等於舊密碼！",
    G009: "會員暱稱長度錯誤(限1~10位元)",

    // 會員訂單相關
    G101: "沒有此訂單分類，請勿亂操作！",
    G199: "不知名錯誤(會員中心->訂單資訊)",

    G999: "不知名錯誤(會員相關)",
  };
}

// 拿到錯誤碼 / 查詢錯誤碼的function
function getValidMessage(category, validCode) {
  // 如果兩者都有輸入，直接給正確的錯誤訊息
  if ((category, validCode)) {
    return validMessage[category][validCode];
  }

  // 如果只有輸入錯誤類型，則return整包此類型的錯誤碼
  else if (category) {
    return validMessage[category];
  }
}

module.exports = getValidMessage;
