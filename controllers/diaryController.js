const DiaryDB = require('../models/diaryModel');


exports.upload = async (req, res) => {
    const { email, title, content, image, createdAt, emotion } = req.body;
  
    const newDiary = new DiaryDB({
      email,
      title,
      content,
      image,
      emotion,
      createdAt,
    });
  
    console.log(newDiary);
  
    try {
      // 다이어리 생성
      await newDiary.save();
      console.log("success");
      return res.status(201).json({ success: true, diary: newDiary });
    } catch (error) {
      return res.status(401).json({ success: false, error: error.message });
    }
  };
  
  // 이메일을 URL 파라미터로 받아오는 라우트 설정
  exports.show = async (req, res) => {
    const { email } = req.params;
  
    try {
      const diary = await DiaryDB.find({ email });
      if (diary.length === 0) {
        // find는 배열을 반환하므로, diary가 비어있는지 확인
        return res
          .status(404)
          .json({ success: false, message: "Diary not found" });
      }
      return res.status(200).json({ success: true, diary });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server error", error: error.message });
    }
  };