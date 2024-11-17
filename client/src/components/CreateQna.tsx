import { useState } from "react";
import { useRecoilState } from "recoil";
import { qnaCreate } from "../atoms/qna";
import axios from "axios";
import { MessageCircle, PlusCircle, Bell, User } from "lucide-react";

const CreateQna = () => {
  const [qna, setQna] = useRecoilState(qnaCreate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers: HeadersInit = {
    authorization: localStorage.getItem("jwtToken") || "",
    "Content-Type": "application/json",
  };

  interface Qna {
    name: string;
  }

  const handleSubmit = async () => {
    try {
      const QnaToBeCreated: Qna = {
        name: qna,
      };
      const response = await axios.post(
        `http://localhost:3000/api/qna/createqna`,
        JSON.stringify(QnaToBeCreated),
        { headers }
      );
      if (response) {
        alert("Qna Created Successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating QnA:", error);
    }
  };

  return (
    <>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Q&A Sessions
        </h1>
        <button  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Session
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Create a New QnA
            </h2>
            <input
              type="text"
              placeholder="Name your QnA"
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setQna(e.target.value);
              }}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQna;
