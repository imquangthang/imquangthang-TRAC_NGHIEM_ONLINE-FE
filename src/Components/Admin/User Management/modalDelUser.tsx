import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { ModalUpdateUserProps } from "../../../Interface/modal.interface";
import { toast } from "react-toastify";
import { deleteUser } from "../../../Services/userServices";

const ModalDelUser: React.FC<ModalUpdateUserProps> = ({
  idUser,
  open,
  onClose,
  title,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let response: any = await deleteUser(idUser);
    if (response && response.code === 200) {
      toast("User deleted successfully");
    } else {
      toast.error("Failed to delete user");
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 sm:max-w-lg transform transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faClose} className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <h1 className="">Are you sure delete User {idUser}</h1>

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
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:border-red-500 dark:hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelUser;
