import { useEffect, useState } from "react";
import TeacherHeader from "../teacherHeader";
import mammoth from "mammoth";
import type { Question } from "../../../Types/question.type";

const Questions: React.FC = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    try {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const { value: text } = await mammoth.extractRawText({ arrayBuffer });
      console.log("Raw text:", text); // Debug raw text
      const parsedQuestions = parseQuestions(text);
      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("Error parsing file:", error);
      // Optionally show user feedback
    }
  };

  // Hàm tách câu hỏi và đáp án từ text
  const parseQuestions = (text: string): Question[] => {
    // Normalize line breaks and split into lines
    const lines = text
      .replace(/\r\n/g, "\n") // Normalize Windows line breaks
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const results: Question[] = [];
    let current: Question = {
      question: "",
      answers: {},
      correctAnswer: "",
      explanation: "",
    };
    let parsingAnswers = false;
    let parsingExplanation = false;

    lines.forEach((line) => {
      const plainLine = line.replace(/<[^>]*>/g, "").trim(); // Remove HTML tags

      // Match question
      const qMatch = plainLine.match(/^(\d+)[\.\)]\s*(.*)/);
      if (qMatch) {
        if (current.question) {
          current.explanation = current.explanation.trim(); // Trim trailing newlines
          results.push(current);
        }
        current = {
          question: qMatch[2].trim(),
          answers: {},
          correctAnswer: "",
          explanation: "",
        };
        parsingAnswers = true; // Start parsing answers
        parsingExplanation = false;
        return;
      }

      // Match answer option (only when parsingAnswers is true)
      const aMatch = plainLine.match(/^([A-Da-d])[\.\)]\s*(.+)/);
      if (parsingAnswers && aMatch) {
        const key = aMatch[1].toUpperCase();
        const answer = aMatch[2].trim();
        // Only add to answers if it doesn't contain a colon followed by an explanation
        if (!answer.includes(": ")) {
          current.answers[key] = answer;
        }
        return;
      }

      // Match correct answer
      const ansMatch = plainLine.match(/^Đáp án[:：]?\s*([A-Da-d])$/i);
      if (ansMatch) {
        current.correctAnswer = ansMatch[1].toUpperCase();
        parsingAnswers = false; // Stop parsing answers
        parsingExplanation = false;
        return;
      }

      // Match explanation start
      const expMatch = plainLine.match(/^Giải thích[:：]?\s*(.*)/i);
      if (expMatch) {
        current.explanation = expMatch[1].trim() || ""; // Handle empty explanation start
        parsingAnswers = false; // Stop parsing answers
        parsingExplanation = true;
        return;
      }

      // Append to explanation if in explanation mode
      if (parsingExplanation && plainLine) {
        // Check if the current line is the start of a new question
        const isCurrentQuestion = plainLine.match(/^(\d+)[\.\)]\s*(.*)/);
        if (!isCurrentQuestion) {
          current.explanation += `\n${plainLine}`;
        }
      }
    });

    // Push the last question if it exists
    if (current.question) {
      current.explanation = current.explanation.trim(); // Trim trailing newlines
      results.push(current);
    }

    return results;
  };

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <>
      <TeacherHeader />

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

        {/* Manual Entry Form */}
        <div
          id="manual-form"
          className={`${
            activeTab === "manual" ? "" : "hidden"
          } bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6`}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add Question Manually
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
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Options
              </label>
              <div className="space-y-2">
                {options.map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-5 font-medium text-gray-700 dark:text-gray-300">
                      {alphabet[index] || "?"}.
                    </span>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={`Option ${index + 1}`}
                      value={value}
                      onChange={(e) => {
                        const updated = [...options];
                        updated[index] = e.target.value;
                        setOptions(updated);
                      }}
                    />
                    <input
                      type="radio"
                      name="correct-answer"
                      className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                      checked={correctIndex === index}
                      onChange={() => setCorrectIndex(index)}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                  onClick={() => setOptions((prev) => [...prev, ""])}
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
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
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
            {questions && questions.length > 0 ? (
              <>
                {questions.map((q, i) => (
                  <>
                    <div
                      key={i}
                      className="space-y-4 mb-4 p-2 border rounded shadow"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Question {i + 1}
                        </label>
                        <textarea
                          className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          rows={3}
                          placeholder="Enter explanation for the correct answer..."
                          value={q.question}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[i].question = e.target.value;
                            setQuestions(updated);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                          Options
                        </label>
                        <div className="space-y-2">
                          {Object.entries(q.answers).map(([k, v], index) => (
                            <div key={k} className="flex items-center gap-2">
                              <span className="w-5 font-medium text-gray-700 dark:text-gray-300">
                                {k || "?"}.
                              </span>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholder={`Option ${index + 1}`}
                                value={v}
                                onChange={(e) => {
                                  const updated = [...questions];
                                  updated[i].answers[k] = e.target.value;
                                  setQuestions(updated);
                                }}
                              />
                              <input
                                type="radio"
                                name={`correct-answer-${i}`} // để không bị trùng giữa các câu
                                className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                                checked={q.correctAnswer === k}
                                onChange={() => {
                                  const updated = [...questions];
                                  updated[i].correctAnswer = k;
                                  setQuestions(updated);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Explanation (Optional)
                        </label>
                        <textarea
                          className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          rows={6}
                          placeholder="Enter explanation for the correct answer..."
                          value={q.explanation}
                          onChange={(e) => {
                            const updated = [...questions];
                            updated[i].explanation = e.target.value;
                            setQuestions(updated);
                          }}
                        />
                      </div>
                    </div>
                  </>
                ))}
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
                    Add Question
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select File (.DOCX){" "}
                    <a
                      href="/src/assets/template.docx"
                      className="text-blue-500 hover:underline"
                    >
                      (Download Template)
                    </a>
                  </label>
                  <input
                    type="file"
                    accept=".docx"
                    className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    onChange={handleFileChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export default Questions;
