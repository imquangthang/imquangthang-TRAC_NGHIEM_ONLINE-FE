import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faGear,
  faPlus,
  faSave,
  faTrash,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header/header";
import { useParams } from "react-router-dom";
import type { ExamRequest } from "../../../Types/request.type";
import type { Options, Question } from "../../../Types/question.type";
import { getExamDetail, updateExamDetail } from "../../../Services/examService";
import { toast } from "react-toastify";

const ExamDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Add loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Original data from server
  const [originalExam, setOriginalExam] = useState<ExamRequest>({
    Id: 0,
    Title: "",
    Description: "",
    DurationMinutes: 0,
    StartTime: "",
    Questions: [],
  });

  // Current working data (edited data)
  const [currentExam, setCurrentExam] = useState<ExamRequest>({
    Id: 0,
    Title: "",
    Description: "",
    DurationMinutes: 0,
    StartTime: "",
    Questions: [],
  });

  // UI state
  const [isEditingExam, setIsEditingExam] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState<number | null>(
    null
  );
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Form states
  const [questionForm, setQuestionForm] = useState<Question>({
    Content: "",
    Explain: "",
    Options: [
      { Content: "", IsCorrect: false },
      { Content: "", IsCorrect: false },
      { Content: "", IsCorrect: false },
      { Content: "", IsCorrect: false },
    ],
  });

  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const handleClick = (index: number) => {
    const questionElement = document.getElementById(`question-${index + 1}`);
    if (questionElement) {
      questionElement.scrollIntoView({
        behavior: "smooth",
      });
    }
    setClickedIndex(index);
    // Reset animation after it completes (1s)
    setTimeout(() => setClickedIndex(-1), 1000);
  };

  // Load exam data
  const loadExamData = useCallback(async () => {
    if (!id) {
      setError("Exam ID is missing");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response: any = await getExamDetail(parseInt(id));

      if (response) {
        const examData: ExamRequest = {
          Id: response.id,
          Title: response.title,
          Description: response.description,
          DurationMinutes: response.durationMinutes,
          StartTime: new Date(response.startTime).toString(),
          Questions: (response.questions || []).map((q: any) => ({
            Content: q.content,
            Explain: q.explain,
            Options: (q.options || []).map((opt: any) => ({
              Content: opt.content,
              IsCorrect: opt.isCorrect,
            })),
          })),
        };

        console.log("Processed exam data:", examData);
        setOriginalExam(examData);
        setCurrentExam(examData);
        setHasUnsavedChanges(false);
      } else {
        setError("No exam data found");
      }
    } catch (error) {
      console.error("Error loading exam:", error);
      setError(
        `Failed to load exam: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const handleSaveEditExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !currentExam.Title ||
      !currentExam.Description ||
      !currentExam.DurationMinutes ||
      !currentExam.StartTime
    )
      return;
    // Gọi API hoặc cập nhật state toàn cục
    setIsEditingExam(false);
  };

  useEffect(() => {
    loadExamData();
  }, [loadExamData]);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges =
      JSON.stringify(originalExam) !== JSON.stringify(currentExam);
    setHasUnsavedChanges(hasChanges);
  }, [originalExam, currentExam]);

  // Reset question form
  const resetQuestionForm = () => {
    setQuestionForm({
      Content: "",
      Explain: "",
      Options: [
        { Content: "", IsCorrect: false },
        { Content: "", IsCorrect: false },
        { Content: "", IsCorrect: false },
        { Content: "", IsCorrect: false },
      ],
    });
  };

  // Handle exam details change
  const handleExamChange = (field: keyof ExamRequest, value: any) => {
    setCurrentExam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle question change
  const handleQuestionChange = (
    questionIndex: number,
    updatedQuestion: Question
  ) => {
    setCurrentExam((prev) => ({
      ...prev,
      Questions: (prev.Questions || []).map((q, index) =>
        index === questionIndex ? updatedQuestion : q
      ),
    }));
  };

  // Add new question
  const handleAddQuestion = () => {
    // Kiểm tra nội dung câu hỏi không được để trống
    if (!questionForm.Content.trim()) {
      toast.warning("Nội dung câu hỏi không được để trống");
      return;
    }

    // Kiểm tra xem có đáp án nào bị để trống không
    const hasEmptyOption = questionForm.Options.some(
      (opt) => !opt.Content.trim()
    );
    if (hasEmptyOption) {
      toast.warning("Đáp án không được để trống");
      return;
    }

    // Kiểm tra xem có đáp án nào trùng nhau không
    const optionContents = questionForm.Options.map((opt) =>
      opt.Content.trim()
    );
    const hasDuplicateOption =
      new Set(optionContents).size !== optionContents.length;
    if (hasDuplicateOption) {
      toast.warning("Đáp án không được trùng nhau");
      return;
    }

    // Kiểm tra xem có ít nhất một đáp án đúng
    const hasCorrectAnswer = questionForm.Options.some((opt) => opt.IsCorrect);
    if (!hasCorrectAnswer) {
      toast.warning("Chọn 1 đáp án đúng cho câu hỏi này");
      return;
    }

    // Nếu tất cả điều kiện đều thỏa mãn, thêm câu hỏi vào danh sách
    setCurrentExam((prev) => ({
      ...prev,
      Questions: [...(prev.Questions || []), questionForm],
    }));

    setIsAddingQuestion(false);
    resetQuestionForm();
  };

  // Delete question
  const handleDeleteQuestion = (questionIndex: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setCurrentExam((prev) => ({
        ...prev,
        Questions: (prev.Questions || []).filter(
          (_, index) => index !== questionIndex
        ),
      }));
    }
  };

  // Save all changes
  const handleSaveAllChanges = async () => {
    if (!hasUnsavedChanges) return;
    currentExam.StartTime = new Date(currentExam.StartTime).toISOString();
    setIsSaving(true);

    try {
      const response: any = await updateExamDetail(currentExam);
      if (response && response.code === 200) {
        setOriginalExam(currentExam);
        setHasUnsavedChanges(false);
        toast.success("Exam updated successfully!");
      } else toast.error("Failed to save exam. Please try again.");
    } catch (error) {
      toast.error("Failed to save exam. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Discard all changes
  const handleDiscardChanges = () => {
    if (window.confirm("Are you sure you want to discard all changes?")) {
      setCurrentExam(originalExam);
      setIsEditingExam(false);
      setIsEditingQuestion(null);
      setIsAddingQuestion(false);
    }
  };

  // Edit question handler
  const handleEditQuestion = (questionIndex: number) => {
    if (!questionForm.Content.trim()) {
      alert("Please enter question content");
      return;
    }

    const hasCorrectAnswer = questionForm.Options.some((opt) => opt.IsCorrect);
    if (!hasCorrectAnswer) {
      alert("Please select at least one correct answer");
      return;
    }

    handleQuestionChange(questionIndex, questionForm);
    setIsEditingQuestion(null);
  };

  const formatDateTimeLocal = (dateObject: Date) => {
    if (!dateObject) return "";

    // Đảm bảo dateObject là một Date hợp lệ
    const date = new Date(dateObject);

    // Lấy các phần tử ngày/giờ và thêm số 0 ở đầu nếu cần
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    // Trả về định dạng YYYY-MM-DDThh:mm
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading exam data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg m-4">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <h3 className="text-red-800 font-medium">Error Loading Exam</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <button
                onClick={loadExamData}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && (
        <>
          {/* Save/Discard Bar */}
          {hasUnsavedChanges && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faGear}
                    className="text-yellow-500 mr-2"
                  />
                  <span className="text-yellow-700 font-medium">
                    You have unsaved changes
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleDiscardChanges}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                    disabled={isSaving}
                  >
                    <FontAwesomeIcon icon={faUndo} className="mr-1" />
                    Discard
                  </button>
                  <button
                    onClick={handleSaveAllChanges}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                    disabled={isSaving}
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-1" />
                    {isSaving ? "Saving..." : "Save All Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <main className="p-6 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
            <div className="flex flex-col md:flex-row p-4 gap-4">
              <div className="flex-1 space-y-4">
                <p className="mb-5 text-sm text-gray-400">
                  /exams/{currentExam?.Title}
                </p>

                {/* Questions List */}
                {currentExam?.Questions?.map((q: Question, i: number) => (
                  <div
                    key={i}
                    className={`bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200 flex gap-4 items-start transition-transform duration-300 ${
                      clickedIndex === i ? "scale-105 bg-red-50" : "scale-100"
                    }`}
                    id={`question-${i + 1}`}
                  >
                    <div style={{ width: "18%" }} className="shrink-0">
                      <h2 className="font-semibold text-base mb-3">
                        Question {i + 1}
                      </h2>
                      <div className="mt-3 text-blue-600 text-xs flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setIsEditingQuestion(i);
                            setQuestionForm(q);
                            console.log(q);
                          }}
                          className="flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faGear} className="text-sm" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(i)}
                          className="flex items-center gap-1 hover:underline cursor-pointer text-red-500"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-sm" />
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 mb-2 text-base">
                        {q.Content}
                      </div>
                      <ul className="mb-3 space-y-1.5">
                        {q.Options?.map((option: Options, index: number) => (
                          <li key={index} className="text-sm">
                            {String.fromCharCode(65 + index)}. {option.Content}
                            {option.IsCorrect && (
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="text-green-600 ml-2"
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                      {q.Explain && (
                        <div className="mt-3 text-sm text-gray-600 italic">
                          📝 Explanation: {q.Explain}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setIsAddingQuestion(true);
                    resetQuestionForm();
                  }}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add New Question
                </button>
              </div>

              {/* Sidebar */}
              <div className="w-full md:w-1/3">
                <div className="fixed p-4 border rounded-lg shadow-sm bg-white">
                  <button
                    onClick={() => setIsEditingExam(true)}
                    className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Edit Exam Details
                  </button>
                  <p>
                    <strong>Title:</strong> {currentExam?.Title}
                  </p>
                  <p>
                    <strong>ID:</strong> {currentExam?.Id}
                  </p>
                  <p>
                    <strong>Description:</strong> {currentExam?.Description}
                  </p>
                  <p>
                    <strong>Duration:</strong> {currentExam?.DurationMinutes}{" "}
                    minutes
                  </p>
                  <p>
                    <strong>Start Time:</strong>{" "}
                    <input
                      disabled
                      type="datetime-local"
                      value={formatDateTimeLocal(
                        new Date(currentExam.StartTime)
                      )}
                    />
                  </p>

                  <div className="p-4 bg-gray-50 dark:bg-gray-900 shadow-sm border rounded border-gray-200 dark:border-gray-700 mt-2">
                    <p className="font-medium text-2xl text-blue-600 mb-2 border-b-2 text-center">
                      List of Questions ({currentExam?.Questions?.length || 0})
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {currentExam?.Questions?.map((_, i) => (
                        <button
                          key={i}
                          className="border px-3 py-1 rounded text-sm bg-white hover:bg-blue-100"
                          onClick={() => {
                            handleClick(i);
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Exam Modal */}
            {isEditingExam && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-300 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Edit Exam Details
                  </h2>

                  <form onSubmit={handleSaveEditExam} className="space-y-4">
                    {/* Title */}
                    <div>
                      <label
                        htmlFor="Title"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="Title"
                        name="Title"
                        value={currentExam.Title}
                        onChange={(e) =>
                          handleExamChange("Title", e.target.value)
                        }
                        required
                        className={`mt-1 block w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors duration-200 border ${
                          !currentExam.Title
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                        }`}
                      />
                      {!currentExam.Title && (
                        <p className="text-red-500 text-sm mt-1">
                          Tiêu đề không được để trống.
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        htmlFor="Description"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="Description"
                        name="Description"
                        value={currentExam.Description}
                        onChange={(e) =>
                          handleExamChange("Description", e.target.value)
                        }
                        required
                        className={`mt-1 block w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors duration-200 border ${
                          !currentExam.Description
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                        }`}
                      />
                      {!currentExam.Description && (
                        <p className="text-red-500 text-sm mt-1">
                          Mô tả không được để trống.
                        </p>
                      )}
                    </div>

                    {/* Duration */}
                    <div>
                      <label
                        htmlFor="DurationMinutes"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        id="DurationMinutes"
                        name="DurationMinutes"
                        value={currentExam.DurationMinutes}
                        onChange={(e) =>
                          handleExamChange(
                            "DurationMinutes",
                            parseInt(e.target.value) || 0
                          )
                        }
                        required
                        min={1}
                        className={`mt-1 block w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors duration-200 border ${
                          !currentExam.DurationMinutes
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                        }`}
                      />
                      {!currentExam.DurationMinutes && (
                        <p className="text-red-500 text-sm mt-1">
                          Thời gian làm bài không được để trống.
                        </p>
                      )}
                    </div>

                    {/* StartTime */}
                    <div>
                      <label
                        htmlFor="StartTime"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        StartTime
                      </label>
                      <input
                        type="datetime-local"
                        id="StartTime"
                        name="StartTime"
                        value={formatDateTimeLocal(
                          new Date(currentExam.StartTime)
                        )}
                        onChange={(e) =>
                          handleExamChange("StartTime", e.target.value)
                        }
                        required
                        min={1}
                        className={`mt-1 block w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors duration-200 border ${
                          !currentExam.StartTime
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                        }`}
                      />
                      {!currentExam.StartTime && (
                        <p className="text-red-500 text-sm mt-1">
                          Thời gian bắt đầu không được để trống.
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Question Modal */}
            {isEditingQuestion !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-300 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Edit Question {isEditingQuestion + 1}
                  </h2>

                  {/* Question Content */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Question Content
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      rows={3}
                      placeholder="Enter your question here..."
                      value={questionForm.Content}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          Content: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Options */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Options
                    </label>
                    <div className="space-y-2">
                      {questionForm.Options?.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-5 font-medium text-gray-700 dark:text-gray-300">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder={`Option ${index + 1}`}
                            value={option.Content}
                            onChange={(e) => {
                              const updatedOptions = [...questionForm.Options];
                              updatedOptions[index].Content = e.target.value;
                              setQuestionForm({
                                ...questionForm,
                                Options: updatedOptions,
                              });
                            }}
                          />
                          <input
                            type="radio"
                            name="correct-answer"
                            className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                            checked={option.IsCorrect}
                            onChange={() => {
                              const updatedOptions = questionForm.Options.map(
                                (opt, i) => ({
                                  ...opt,
                                  IsCorrect: i === index,
                                })
                              );
                              setQuestionForm({
                                ...questionForm,
                                Options: updatedOptions,
                              });
                            }}
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                        onClick={() =>
                          setQuestionForm((prev) => ({
                            ...prev,
                            Options: [
                              ...prev.Options,
                              { Content: "", IsCorrect: false },
                            ],
                          }))
                        }
                      >
                        + Add Option
                      </button>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Explanation (Optional)
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      rows={3}
                      placeholder="Enter explanation..."
                      value={questionForm.Explain}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          Explain: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsEditingQuestion(null)}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleEditQuestion(isEditingQuestion)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Question Modal */}
            {isAddingQuestion && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-300 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Add New Question
                  </h2>

                  {/* Question Content */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Question Content
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      rows={3}
                      placeholder="Enter your question here..."
                      value={questionForm.Content}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          Content: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Options */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Options
                    </label>
                    <div className="space-y-2">
                      {questionForm.Options?.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-5 font-medium text-gray-700 dark:text-gray-300">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder={`Option ${index + 1}`}
                            value={option.Content}
                            onChange={(e) => {
                              const updatedOptions = [...questionForm.Options];
                              updatedOptions[index].Content = e.target.value;
                              setQuestionForm({
                                ...questionForm,
                                Options: updatedOptions,
                              });
                            }}
                          />
                          <input
                            type="radio"
                            name="correct-answer"
                            className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                            checked={option.IsCorrect}
                            onChange={() => {
                              const updatedOptions = questionForm.Options.map(
                                (opt, i) => ({
                                  ...opt,
                                  IsCorrect: i === index,
                                })
                              );
                              setQuestionForm({
                                ...questionForm,
                                Options: updatedOptions,
                              });
                            }}
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                        onClick={() =>
                          setQuestionForm((prev) => ({
                            ...prev,
                            Options: [
                              ...prev.Options,
                              { Content: "", IsCorrect: false },
                            ],
                          }))
                        }
                      >
                        + Add Option
                      </button>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Explanation (Optional)
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      rows={3}
                      placeholder="Enter explanation..."
                      value={questionForm.Explain}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          Explain: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setIsAddingQuestion(false);
                        resetQuestionForm();
                      }}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddQuestion}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default ExamDetail;
