import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { ModalUpdateUserProps } from "../../../Interface/modal.interface";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { ExamRequest } from "../../../Types/request.type";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

const ModalAddNewExam: React.FC<ModalUpdateUserProps> = ({ open, onClose }) => {
  const [examData, setExamData] = useState<ExamRequest>({
    Title: "",
    Description: "",
    DurationMinutes: 0,
    Questions: [],
  });
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setExamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      isEmpty(examData.Title) ||
      isEmpty(examData.Description) ||
      isEmpty(examData.DurationMinutes)
    ) {
      return;
    }
    navigate("/teacher/questions", { state: examData });
    onClose();
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 sm:max-w-lg transform transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ADD NEW EXAM
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faClose} className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              value={examData.Title}
              onChange={handleInputChange}
              autoComplete="Title"
              required
              className={`mt-1 block w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors duration-200 border
    ${
      isEmpty(examData.Title)
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
    }`}
            />

            {isEmpty(examData.Title) && (
              <p className="text-red-500 text-sm mt-1">
                Tiêu đề không được để trống.
              </p>
            )}
          </div>

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
              value={examData.Description}
              onChange={handleInputChange}
              required
              className={`mt-1 block w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors duration-200 border
    ${
      isEmpty(examData.Description)
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
    }`}
            />

            {isEmpty(examData.Description) && (
              <p className="text-red-500 text-sm mt-1">
                Mô tả không được để trống.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="DurationMinutes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              DurationMinutes
            </label>
            <input
              type="number"
              id="DurationMinutes"
              name="DurationMinutes"
              value={examData.DurationMinutes}
              onChange={handleInputChange}
              required
              className={`mt-1 block w-full px-3 py-2 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors duration-200 border
    ${
      isEmpty(examData.DurationMinutes)
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
    }`}
            />

            {isEmpty(examData.DurationMinutes) && (
              <p className="text-red-500 text-sm mt-1">
                Thời gian làm bài không được để trống.
              </p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
          >
            Add Questions
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalAddNewExam;
