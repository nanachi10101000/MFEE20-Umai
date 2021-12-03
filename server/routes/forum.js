require("dotenv").config();
const bodyParser = require("body-parser");
const connection = require("../utils/database");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.use((req, res, next) => {
  console.log("有一請求進入forumRoute");
  next();
});

// 拿到所有文章
router.get("/", async (req, res) => {
  try {
    // 拿到每篇文的資料 + 愛心數量 + 留言數量
    let articles = await connection.queryAsync(
      "SELECT forum_article.*, COUNT(article_like.member_id) AS like_count, COUNT(forum_comment.member_id) AS comment_count FROM forum_article LEFT JOIN article_like ON forum_article.id = article_like.article_id LEFT JOIN forum_comment ON forum_article.id = forum_comment.article_id WHERE forum_article.valid = ? GROUP BY forum_article.id ",
      [1]
    );

    // 將拿到的所有文章資料的id取出
    let articleIds = articles.map((item) => item.id);

    // 依序拿到每篇文章按讚的所有會員的member_id==========================================================
    let likes = await connection.queryAsync(
      "SELECT * FROM article_like WHERE article_id IN (?)",
      [articleIds]
    );

    // 將按讚的人依照文章id分組
    let sortedLikes = {};
    // 將裝個別文章按愛心 id array的容器準備好
    articleIds.forEach((id) => (sortedLikes[id] = []));

    // 依序將id裝入對應的key內
    likes.forEach((item) => {
      sortedLikes[item.article_id].push(item.member_id);
    });

    // 依序拿到每篇文章按讚的所有會員的member_id==========================================================

    let collections = await connection.queryAsync(
      "SELECT * FROM article_collection WHERE article_id IN (?)",
      [articleIds]
    );

    // 將收藏此文章的人依照文章id分組
    let sortedCollect = {};
    // 將裝個別文章收藏id array的容器準備好
    articleIds.forEach((id) => (sortedCollect[id] = []));

    // 依序將id裝入對應的key內
    collections.forEach((item) => {
      sortedCollect[item.article_id].push(item.member_id);
    });

    // ==========================================================

    // 將id_Array (likes, collections) 分別裝入對應的articleDetail中
    articles.forEach((item) => {
      // likes的id
      item["whoLike"] = sortedLikes[item.id];

      // collections的id
      item["whoCollection"] = sortedCollect[item.id];
    });

    //console.log(forumdata);
    res.json({ forumdata: articles });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// 依據forumId拿到文章詳細內容
router.get("/:forumId", async (req, res) => {
  try {
    let forumdatadetail = await connection.queryAsync(
      "SELECT * FROM forum_article WHERE id=?",
      [req.params.forumId]
    );
    //console.log(forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail[0] });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// 新增文章
router.post("/insertArticle", upload.array(), async (req, res) => {
  //console.log("body", req.body);
  res.json({ result: "okok" });
  try {
    let forumdatadetail = await connection.queryAsync(
      "INSERT INTO forum_article (image_name,category_id,course_name,article_title,article_link,article_text) VALUES (?)",
      [
        [
          filename,
          req.body.category_id,
          req.body.course_name,
          req.body.article_title,
          req.body.article_link,
          req.body.article_text,
        ],
      ]
    );
    //console.log(forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// ian 新增
// 根據 member_id 拿到此member收藏的文章
router.get("/collection/:member_id", async (req, res) => {
  let { member_id } = req.params;

  try {
    let result = await connection.queryAsync(
      "SELECT * FROM article_collection WHERE member_id = ? ORDER BY id DESC",
      member_id
    );

    // 如果沒有任何收藏文章
    if (result.length === 0) return res.json({ success: true, article: [] });

    // 將 id 提取出來，變成一個單純的array
    let articleIds = result.map((item) => item.article_id);

    // 拿到每篇文的資料 + 愛心數量 + 留言數量
    let articles = await connection.queryAsync(
      "SELECT forum_article.*, COUNT(article_like.member_id) AS like_count, COUNT(forum_comment.member_id) AS comment_count FROM forum_article LEFT JOIN article_like ON forum_article.id = article_like.article_id LEFT JOIN forum_comment ON forum_article.id = forum_comment.article_id WHERE forum_article.id IN (?) AND forum_article.valid = ? GROUP BY forum_article.id ",
      [articleIds, 1]
    );

    // 將article按照articleIds的順序排好
    let sortedArticles = [];
    articleIds.forEach((item) => {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].id === item) {
          sortedArticles.push(articles[i]);
          break;
        }
      }
    });

    // 依序拿到每篇文章按讚的所有會員的member_id==========================================================

    let likes = await connection.queryAsync(
      "SELECT * FROM article_like WHERE article_id IN (?)",
      [articleIds]
    );

    // 將按讚的人依照文章id分組
    let sortedLikes = {};
    // 將裝個別文章按愛心 id array的容器準備好
    articleIds.forEach((id) => (sortedLikes[id] = []));

    // 依序將id裝入對應的key內
    likes.forEach((item) => {
      sortedLikes[item.article_id].push(item.member_id);
    });

    // 依序拿到每篇文章按讚的所有會員的member_id==========================================================

    let collections = await connection.queryAsync(
      "SELECT * FROM article_collection WHERE article_id IN (?)",
      [articleIds]
    );

    // 將收藏此文章的人依照文章id分組
    let sortedCollect = {};
    // 將裝個別文章收藏id array的容器準備好
    articleIds.forEach((id) => (sortedCollect[id] = []));

    // 依序將id裝入對應的key內
    collections.forEach((item) => {
      sortedCollect[item.article_id].push(item.member_id);
    });

    // ==========================================================

    // 將id_Array (likes, collections) 分別裝入對應的articleDetail中
    sortedArticles.forEach((item) => {
      // likes的id
      item["whoLike"] = sortedLikes[item.id];

      // collections的id
      item["whoCollection"] = sortedCollect[item.id];
    });

    res.json({ success: true, article: sortedArticles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "C999", message: error });
  }
});

// 取消或新增收藏
router.post("/collection/:member_id", async (req, res) => {
  let { member_id } = req.params;
  let { article_id } = req.body;

  try {
    // 確認使否已存在收藏列表
    let isInCollect = await connection.queryAsync(
      "SELECT * FROM article_collection WHERE member_id = ? AND article_id = ?",
      [member_id, article_id]
    );

    // 已經存在，就刪除
    if (isInCollect.length !== 0) {
      let { id } = isInCollect[0];
      let result = await connection.queryAsync(
        "DELETE FROM article_collection WHERE id = ?",
        [id]
      );

      // 刪除成功
      res.status(200).json({ success: true, mode: "delete" });
      return;
    }

    // 原本不存在收藏，就新增
    let result = await connection.queryAsync(
      "INSERT INTO article_collection(member_id, article_id) VALUES(?)",
      [[member_id, article_id]]
    );

    res.status(200).json({ success: true, mode: "insert" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "C999", message: error });
  }
});

// 按讚或 / 取消按讚
router.post("/like/:member_id", async (req, res) => {
  let { member_id } = req.params;
  let { article_id } = req.body;

  try {
    // 確認使否已存在收藏列表
    let isInLikes = await connection.queryAsync(
      "SELECT * FROM article_like WHERE member_id = ? AND article_id = ?",
      [member_id, article_id]
    );

    // 已經存在，就刪除
    if (isInLikes.length !== 0) {
      let result = await connection.queryAsync(
        "DELETE FROM article_like WHERE member_id = ? AND article_id = ?",
        [member_id, article_id]
      );

      // 刪除成功
      res.status(200).json({ success: true, mode: "delete" });
      return;
    }

    // 原本不存在收藏，就新增
    let result = await connection.queryAsync(
      "INSERT INTO article_like(member_id, article_id) VALUES(?)",
      [[member_id, article_id]]
    );

    res.status(200).json({ success: true, mode: "insert" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "C999", message: error });
  }
});

module.exports = router;
