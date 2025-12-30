import { useEffect, useState } from "react";
import type { ExamRequest } from "../../../Types/request.type";
import Header from "../../Header/header";
import { useLocation, useNavigate } from "react-router-dom";
import ModalAddNewExam from "../Exams/modalAddNewExam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import type { Options, Question } from "../../../Types/question.type";
import { addNewExam, importFileQuestions } from "../../../Services/examService";
import { useDispatch } from "react-redux";
import {
  setLoading,
  setUnLoading,
} from "../../../Redux/Reducer/loading.reducer";

const Questions: React.FC = () => {
  const [openModalAddNewExam, setOpenModalAddNewExam] = useState(false);
  const location = useLocation();
  const examData: ExamRequest = location.state || {
    Title: "",
    Description: "",
    DurationMinutes: 0,
    StartTime: "",
    Questions: [],
  };
  const [activeTab, setActiveTab] = useState("manual");
  const [pendingQuestions, setPendingQuestions] = useState<Question[]>(
    examData.Questions || []
  );
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<Options[]>([
    { Content: "", IsCorrect: false },
    { Content: "", IsCorrect: false },
    { Content: "", IsCorrect: false },
    { Content: "", IsCorrect: false },
  ]);
  const [explanation, setExplanation] = useState("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openModal = () => {
    setOpenModalAddNewExam(true);
  };

  const handleAddQuestion = () => {
    // Validate inputs
    if (!questionText.trim()) {
      toast("Nội dung câu hỏi không được để trống");
      return;
    }

    // Kiểm tra xem có đáp án nào bị để trống không
    const hasEmptyOption = options.some((opt) => !opt.Content.trim());
    if (hasEmptyOption) {
      toast("Đáp án không được để trống");
      return;
    }

    // Kiểm tra xem có đáp án nào trùng nhau không
    const optionContents = options.map((opt) => opt.Content.trim());
    const hasDuplicateOption =
      new Set(optionContents).size !== optionContents.length;
    if (hasDuplicateOption) {
      toast("Đáp án không được trùng nhau");
      return;
    }

    // Kiểm tra xem có ít nhất một đáp án đúng
    if (!options.some((opt) => opt.IsCorrect)) {
      toast("Chọn 1 đáp án đúng cho câu hỏi này");
      return;
    }

    // Create new question
    const newQuestion: Question = {
      Content: questionText,
      Explain: explanation,
      Options: options.filter((opt) => opt.Content.trim()),
    };

    // Add to pending questions
    setPendingQuestions([...pendingQuestions, newQuestion]);

    // Reset form
    setQuestionText("");
    setOptions([
      { Content: "", IsCorrect: false },
      { Content: "", IsCorrect: false },
      { Content: "", IsCorrect: false },
      { Content: "", IsCorrect: false },
    ]);
    setExplanation("");

    toast.success("Question added to pending list!");
  };

  const handleSubmitQuestions = async () => {
    if (pendingQuestions.length === 0) {
      toast("No questions to submit");
      return;
    }

    examData.StartTime = new Date(examData.StartTime).toISOString();
    // Prepare exam data with all questions
    const updatedExamData: ExamRequest = {
      ...examData,
      Questions: pendingQuestions,
    };

    //call API
    try {
      let response: any = await addNewExam(updatedExamData);
      if (response && response.code === 200) {
        toast.success("Add exam successfully");
        navigate("/teacher");
      } else toast.error("Add exam unsuccessful");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Kiểm tra phần đuôi file hoặc MIME type
    const allowedExtensions = [".xlsx", ".xls"];
    const fileName = file.name.toLowerCase();

    const isExcel = allowedExtensions.some((ext) => fileName.endsWith(ext));
    if (!isExcel) {
      toast.error("Please upload a valid Excel file (.xlsx or .xls)");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    dispatch(setLoading());
    try {
      const response: any = await importFileQuestions(examData, selectedFile);
      if (response && response.code === 200) {
        toast.success("Upload successful!");
        navigate("/teacher/exams");
      } else throw new Error("Upload failed");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Upload failed. Please try again.");
    }
    dispatch(setUnLoading());
  };

  useEffect(() => {
    console.log(examData);
  }, []);

  return (
    <>
      <Header />
      <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Insert New Question
        </h1>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            <button
              id="manual-btn"
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "manual"
                  ? "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => handleTabChange("manual")}
            >
              Manual Entry
            </button>
            <button
              id="file-btn"
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "file"
                  ? "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => handleTabChange("file")}
            >
              Upload File
            </button>
          </div>
        </div>

        {examData.Title ? (
          <>
            <div
              id="manual-form"
              className={`${
                activeTab === "manual" ? "" : "hidden"
              } bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6`}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Add Question For Exam "{examData.Title}"
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Question Text
                  </label>
                  <textarea
                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    rows={3}
                    placeholder="Enter your question here..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Options
                  </label>
                  <div className="space-y-2">
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-5 font-medium text-gray-700 dark:text-gray-300">
                          {alphabet[index] || "?"}.
                        </span>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder={`Option ${index + 1}`}
                          value={option.Content}
                          onChange={(e) => {
                            const updated = [...options];
                            updated[index] = {
                              ...updated[index],
                              Content: e.target.value,
                            };
                            setOptions(updated);
                          }}
                        />
                        <input
                          type="radio"
                          name="correct-answer"
                          className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                          checked={option.IsCorrect}
                          onChange={() => {
                            const updated = options.map((opt, i) => ({
                              ...opt,
                              IsCorrect: i === index,
                            }));
                            setOptions(updated);
                          }}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                      onClick={() =>
                        setOptions((prev) => [
                          ...prev,
                          { Content: "", IsCorrect: false },
                        ])
                      }
                    >
                      + Thêm đáp án
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Explanation (Optional)
                  </label>
                  <textarea
                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    rows={5}
                    placeholder="Enter explanation for the correct answer..."
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4 mt-2">
                  <button
                    className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors"
                    onClick={handleAddQuestion}
                  >
                    Add More Questions
                  </button>
                  {pendingQuestions.length > 0 && (
                    <button
                      className="px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
                      onClick={handleSubmitQuestions}
                    >
                      Submit {pendingQuestions.length} Questions
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div
              id="file-upload"
              className={`${
                activeTab === "file" ? "" : "hidden"
              } bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6`}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Questions from File
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Excel File (.XLSX, .XLS){" "}
                    <a
                      href="/src/assets/template.xlsx"
                      className="text-blue-500 hover:underline"
                    >
                      (Download Template)
                    </a>
                  </label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />

                  {selectedFile && (
                    <button
                      onClick={handleUpload}
                      className="px-4 py-2 my-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Upload File
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center text-gray-700 dark:text-gray-300 text-2xl text-clip font-bold">
              Create New Exam Before Adding Questions
            </div>
            <div className="text-center mt-2">
              <button
                className={
                  "first-letter:px-4 py-2 px-2 gap-2 rounded-lg transition-colors bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
                }
                onClick={openModal}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon text-white dark:text-gray-200 mr-2"
                />
                <span className="text-sm text-white dark:text-gray-200">
                  Insert Exam
                </span>
              </button>
            </div>
          </>
        )}
      </main>
      <ModalAddNewExam
        open={openModalAddNewExam}
        onClose={() => setOpenModalAddNewExam(false)}
      />
    </>
  );
};

export default Questions;
