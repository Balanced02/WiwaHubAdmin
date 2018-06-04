import Exam from '../models/Exam';
import Answer from '../models/Answer';
import CareerCategory from '../models/CareerCategory';
import AcademicContent from '../models/AcademicContent';
import ExtraCurriculum from '../models/ExtraCurriculum';
import NigerianContent from '../models/NigerianContent';
import AcademicCategory from '../models/AcademicCategory';
import ExtraCurriculumCategory from '../models/ExtraCurriculumCategory';
import multer from 'multer';
import uuidv4 from 'uuid/v4';
import path from 'path';


export const createExam = (req, res) => {
  let { examType, examName, examYear, examCode } = req.body;

  let exam = new Exam({
    examType: examType,
    examName: examName,
    examYear: examYear,
    examCode: examCode,
  });

  exam
    .save()
    .then(exam => {
      res.json(exam);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Could not create the exam',
        error: err.message,
      });
    });
};

export const deleteExam = (req, res) => {
    const examId = req.params.examId;

    Exam.findByIdAndRemove({_id:examId}, (err, exam) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
            'error': err.error,
            'message':err.message
        })
    }
        const response = {
            message: "Exam successfully deleted",
            id: exam._id
        };
        return res.status(200).json(response)
    })
}

export const createQuestions = (req, res) => {
    let question = req.body
    Exam.findOne({examCode: question.examCode}).then((response) => {

        response.questionList.push({
            question: question.question,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            optionE: question.optionE,
            key: question.key,
            media: question.mediaFile,
            reason: question.reason
        })
        response.save()
        res.json(response)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Could not add the Question',
        error: err.message,
      });
    });
};



export const updateQuestions = (req, res) => {
  console.log(req.body)
  let question = req.body
  Exam.update(
    {examCode: question.examCode, 'questionList._id': question.id},
    {'$set': {
      'questionList.$.question': question.question,
      'questionList.$.optionA': question.optionA,
      'questionList.$.optionB': question.optionB,
      'questionList.$.optionC': question.optionC,
      'questionList.$.optionD': question.optionD,
      'questionList.$.optionE': question.optionE,
      'questionList.$.key': question.key,
      'questionList.$.mediaFile': question.mediaFile,
      'questionList.$.reason': question.reason
    }},
    function(err, result){
      if (err) { res.status(500).json({err}) }
      res.json({result})
      }
    )
  
};

export const deleteExamQuestion = (req, res) => {
  let ExamID = req.params.examId;
  let ID = req.params.questionId
  console.log('and we are live'+ ID)

  Exam.findById({_id: ExamID}, function(err, exam){
    if(!err){
        exam.questionList.id(ID).remove();
         exam.save(function (err, result) {
        if (err){
         console.log(err)
         res.status(500).json({err});
         
       }  
          const response = {
              message: "Content successfully deleted",
              id: ID
          };
          res.json(response)


      })     
    }
  })

}


export const submitAmswer = (req, res) => {
  let user = JSON.parse(req.headers.user)  
  let answer = req.body;
  let username = user.username;
  let schoolId = user.schoolId;

  let response = [];
  for (var prop in answer.answer) {
    response.push({
      question_id: prop,
      key: answer.answer[prop],
    });
  }

  console.log(response);

  let ans = new Answer({
    username: username,
    examCode: answer.examCode,
    schoolId: schoolId,
    answerList: response,
  });
  ans
    .save()
    .then(response => {
      res.json({ response });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Could not submit the answers',
        error: err.message,
      });
    });
};

export const getExam = (req, res) => {
  let examType = req.params.examType;

  Exam.find({
    examType: examType,
  })
    .then(exams => {
      res.json({ exams });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error fetching exams',
        error: err.message,
      });
    });
};

export const computeResult = (req, res) => {
  let user = JSON.parse(req.headers.user)
  
  Exam.find({
    examCode: req.params.examCode,
  })
    .then(ans => {
        let total_questions = 0;
        let attempted = 0;
        let correct = 0;
        var exam_obj = ans
        
        Answer.find({
            examCode: req.params.examCode,
            username: user.username,
        })
        .then(answer => {

            let questions = exam_obj.map(data => data)
            let answers = answer.map(data => data)
            questions = questions.map(data => data.questionList)
            answers = answers.map(data => data.answerList)
            console.log(questions[0].length)
            console.log(answers[0].length)
                


         })
    })
    .then(ans => {
      res.json({ ans });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to fetch exam data',
        error: err.message,
      });
    });
};

export const getExamQuestion = (req, res) => {
  let examType = req.params.examType;
  let examCode = req.params.examCode;

  Exam.find({
    examType: examType,
    examCode: examCode,
  })
    .then(exams => {
      res.json({ exams });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error fetching exams',
        error: err.message,
      });
    });
};


// create and delete categories in Career

export const createCareerCategory = (req, res) => {
  let category = req.body.cat;
  console.log(req.body.cat)

  let careerCat = new CareerCategory({
      title: category
  });
  careerCat
    .save()
    .then(response => {
      res.json({response});
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'Could not create the Category',
        error: err.message,
      });
    });
};

export const deleteCareerCategory = (req, res) => {
    const catId = req.params.catId;

    CareerCategory.findByIdAndRemove(catId, (err, cat) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
            'error': err.error,
            'message':err.message
        })
    }
        const response = {
            message: "Category successfully deleted",
            id: cat._id
        };
        return res.status(200).json(response)
    })
}

export const getCareerCategory = (req, res) => {

  CareerCategory.find({
  })
    .then(cat => {
      res.json({ cat });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error fetching category',
        error: err.message,
      });
    });
};

export const createAcademicContent = (req, res) => {
  let { category, age, className, discipline, skill, content, contentType, public_id } = req.body

  let academicContent = new AcademicContent({
    category:category,
    age: age,
    class: className,
    content: content,
    discipline: discipline,
    skill: skill,
    public_id: public_id
  })

  academicContent.save()
  .then((response) => {
    res.json({
      data: response
    })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to create the contents',
      error: err.message
    })
  })


  })
};


export const getAcademicContent = (req, res) => {
  AcademicContent.find({
    discipline: req.params.categoryId
  })
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the contents',
      error: err.message
    })
  })
}


export const getAllAcademicContent = (req, res) => {
  AcademicContent.find({
  })
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the contents',
      error: err.message
    })
  })
}

export const updateAcademicContent = (req, res) => {
  let { id, ...remaining } = req.body

  AcademicContent.findByIdAndUpdate({_id: id }, {
    ...remaining
  })
  .then(response => {
    res.json({
      data: response
    })

  })
  .catch(err => {
    res.status(500).json({
      error: err.message,
      message: 'Unable to update the content'
    })
  })
}



export const deleteAcademicContent = (req, res) => {
  const contentId = req.params.contentId;

  AcademicContent.findByIdAndRemove({_id: contentId }, (err, cat) => {
      if (err) {
          console.log(err)
          return res.status(500).json({
          'error': err,
          'message':'Unable to delete the content'
      })
  }
      const response = {
          message: "Content successfully deleted",
          id: cat._id
      };
      return res.status(200).json(response)
  })
}


export const getSingleContent = (req, res) => {
  AcademicContent.findById({_id: req.params.contentId})
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the content',
      error: err.message
    })
  })
}


//Extra Curiculum


export const createExtraCurriculum = (req, res) => {
  let { category, age, className, discipline, skill, content, contentType, public_id } = req.body

  let extraCurriculum = new ExtraCurriculum({
    category:category,
    age: age,
    class: className,
    content: content,
    discipline: discipline,
    skill: skill,
    public_id: public_id
  })

  extraCurriculum.save()
  .then((response) => {
    res.json({
      data: response
    })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to create the contents',
      error: err.message
    })
  })


  })
};


export const getExtraCurriculum = (req, res) => {
  ExtraCurriculum.find({
        discipline: req.params.categoryId
  })
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the contents',
      error: err.message
    })
  })
}

export const getAllExtraCurriculum = (req, res) => {
  ExtraCurriculum.find({
  })
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the contents',
      error: err.message
    })
  })
}


export const updateExtraCurriculum = (req, res) => {
  let { _id, ...remaining } = req.body

  ExtraCurriculum.findByIdAndUpdate(_id, {
    ...remaining
  })
  .then(response => {
    res.json({
      data: response
    })

  })
  .catch(err => {
    res.status(500).json({
      error: err.message,
      message: 'Unable to update the content'
    })
  })
}

export const deleteExtraCurriculum = (req, res) => {
  const contentId = req.params.contentId;

  ExtraCurriculum.findByIdAndRemove(contentId, (err, cat) => {
      if (err) {
          console.log(err)
          return res.status(500).json({
          'error': err,
          'message':'Unable to delete the content'
      })
  }
      const response = {
          message: "Content successfully deleted",
          id: cat._id
      };
      return res.status(200).json(response)
  })
}


export const getSingleExtraCurriculum = (req, res) => {
  ExtraCurriculum.findById({_id: req.params.contentId})
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the content',
      error: err.message
    })
  })
}






// Nigerian Content

export const createNigerianContent = (req, res) => {
  let { category, timeLine, content } = req.body

  let nigerianContent = new NigerianContent({
    category:category,
    timeLine: timeLine,
    content: content,
  })

  nigerianContent.save()
  .then((response) => {
    res.json({
      data: response
    })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to create the contents',
      error: err.message
    })
  })


  })
};


export const getNigerianContent = (req, res) => {
  NigerianContent.find({

  }).sort('timeLine')
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the contents',
      error: err.message
    })
  })
}


export const updateNigerianContent = (req, res) => {
  let { id, ...remaining } = req.body

  NigerianContent.findByIdAndUpdate({_id: id}, {
    ...remaining
  })
  .then(response => {
    res.json({
      data: response
    })

  })
  .catch(err => {
    res.status(500).json({
      error: err.message,
      message: 'Unable to update the content'
    })
  })
}

export const deleteNigerianContent = (req, res) => {
  const contentId = req.params.contentId;

  NigerianContent.findByIdAndRemove(contentId, (err, cat) => {
      if (err) {
          console.log(err)
          return res.status(500).json({
          'error': err,
          'message':'Unable to delete the content'
      })
  }
      const response = {
          message: "Content successfully deleted",
          id: cat._id
      };
      return res.status(200).json(response)
  })
}


export const getSingleNigerianContent = (req, res) => {
  NigerianContent.findById({_id: req.params.contentId})
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the content',
      error: err.message
    })
  })
}


// CRUD AcademicCategory

export const createAcademicCategory = (req, res) => {
  console.log(req.body)
  let { title, imageUrl } = req.body

  let academicCategory = new AcademicCategory({
    title: title,
    imageUrl: imageUrl,
  })

  academicCategory.save()
  .then((response) => {
    res.json({
      data: response
    })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to create the contents',
      error: err.message
    })
  })


  })
};


export const getAcademicCategory = (req, res) => {
  AcademicCategory.find({

  })
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the contents',
      error: err.message
    })
  })
}


export const updateAcademicCategory = (req, res) => {
  let { id, title, imageUrl } = req.body
  if (imageUrl !== ''){
    AcademicCategory.findByIdAndUpdate(id, {
    title: title,
    imageUrl: imageUrl
  })
  .then(response => {
    res.json({
      data: response
    })

  })
  .catch(err => {
    res.status(500).json({
      error: err.message,
      message: 'Unable to update the content'
    })
  })
  }
  else{
    AcademicCategory.findByIdAndUpdate(id, {
    title: title,
  })
  .then(response => {
    res.json({
      data: response
    })

  })
  .catch(err => {
    res.status(500).json({
      error: err.message,
      message: 'Unable to update the content'
    })
  })
  }
}

export const deleteAcademicCategory = (req, res) => {
  const contentId = req.params.contentId;

  AcademicCategory.findByIdAndRemove(contentId, (err, cat) => {
      if (err) {
          console.log(err)
          return res.status(500).json({
          'error': err,
          'message':'Unable to delete the content'
      })
  }
      const response = {
          message: "Content successfully deleted",
          id: cat._id
      };
      return res.status(200).json(response)
  })
}


export const getSingleAcademicCategory = (req, res) => {
  AcademicCategory.findById({_id: req.params.contentId})
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the content',
      error: err.message
    })
  })
}


// CRUD ExtraCurriculumCategory

export const createExtraCurriculumCategory = (req, res) => {
  console.log(req.body)
  let { title, imageUrl } = req.body

  let extraCurriculumCategory = new ExtraCurriculumCategory({
    title: title,
    imageUrl: imageUrl,
  })

  extraCurriculumCategory.save()
  .then((response) => {
    res.json({
      data: response
    })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to create the contents',
      error: err.message
    })
  })


  })
};


export const getExtraCurriculumCategory = (req, res) => {
  ExtraCurriculumCategory.find({

  })
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the contents',
      error: err.message
    })
  })
}


export const updateExtraCurriculumCategory = (req, res) => {
  let { id, title, imageUrl } = req.body
  if (imageUrl !== ''){
    ExtraCurriculumCategory.findByIdAndUpdate(id, {
    title: title,
    imageUrl: imageUrl
  })
  .then(response => {
    res.json({
      data: response
    })

  })
  .catch(err => {
    res.status(500).json({
      error: err.message,
      message: 'Unable to update the content'
    })
  })
  }
  else{
    ExtraCurriculumCategory.findByIdAndUpdate(id, {
    title: title,
  })
  .then(response => {
    res.json({
      data: response
    })

  })
  .catch(err => {
    res.status(500).json({
      error: err.message,
      message: 'Unable to update the content'
    })
  })
  }
}

export const deleteExtraCurriculumCategory = (req, res) => {
  const contentId = req.params.contentId;

  ExtraCurriculumCategory.findByIdAndRemove(contentId, (err, cat) => {
      if (err) {
          console.log(err)
          return res.status(500).json({
          'error': err,
          'message':'Unable to delete the content'
      })
  }
      const response = {
          message: "Content successfully deleted",
          id: cat._id
      };
      return res.status(200).json(response)
  })
}


export const getSingleExtraCurriculumCategory = (req, res) => {
  ExtraCurriculumCategory.findById({_id: req.params.contentId})
  .then((response) => {
    res.json({
      data: response
    })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Unable to fetch the content',
      error: err.message
    })
  })
}
