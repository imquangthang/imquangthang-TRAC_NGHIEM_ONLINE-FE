import React, { useState } from "react";
import mammoth from "mammoth";

type Question = {
  question: string;
  answers: { [key: string]: string };
  correctAnswer: string;
};

function importDeThi() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const arrayBuffer = await file.arrayBuffer();

    const { value: text } = await mammoth.extractRawText({ arrayBuffer });
    const parsedQuestions = parseQuestions(text);
    setQuestions(parsedQuestions);
  };

  // Hàm tách câu hỏi và đáp án từ text
  const parseQuestions = (text: string): Question[] => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const results: Question[] = [];
    let current: Question = { question: "", answers: {}, correctAnswer: "" };

    lines.forEach((line) => {
      // Match câu hỏi bắt đầu bằng số (1. hoặc 1))
      const qMatch = line.match(/^(\d+)[\.\)]\s*(.*)/);
      if (qMatch) {
        if (current.question) results.push(current);
        current = { question: qMatch[2], answers: {}, correctAnswer: "" };
        return;
      }

      // Match dòng đáp án A-D
      const aMatch = line.match(/^([A-Da-d])[\.\)]\s*(.+)/);
      if (aMatch) {
        const key = aMatch[1].toUpperCase();
        const answer = aMatch[2].trim();
        current.answers[key] = answer;
        return;
      }

      // Match dòng Đáp án: A hoặc Đáp án: b
      const ansMatch = line.match(/^Đáp án[:：]?\s*([A-Da-d])$/i);
      if (ansMatch) {
        current.correctAnswer = ansMatch[1].toUpperCase();
      }
    });

    if (current.question) results.push(current);
    return results;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Upload file đề thi (.docx)</h2>
      <input type="file" accept=".docx" onChange={handleFileChange} />

      <div className="mt-4">
        {questions.map((q, i) => (
          <div key={i} className="mb-4 p-2 border rounded shadow">
            <p className="font-semibold">
              {i + 1}. {q.question}
            </p>
            {Object.entries(q.answers).map(([k, v]) => (
              <p key={k}>
                {k}. {v}
              </p>
            ))}
            <p className="text-green-600">
              <strong>Đáp án đúng: {q.correctAnswer}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default importDeThi;
