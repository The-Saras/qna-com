import { useState } from "react";
import axios from "axios";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import MessageCircle from '@mui/icons-material/QuestionAnswer'; // Assuming you want to replace with a similar icon
import ChevronUp from '@mui/icons-material/ArrowUpward'; // Assuming you want to replace with a similar icon

const SingleQuestion = (props: any) => {
  const clckLimit = 1;
  const [clickcount, setClickcount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const headers = {
    "authorization": localStorage.getItem("jwtToken") || "",
    'Content-Type': 'application/json',
  };

  // Upvote function
  const upvote = async () => {
    try {
      const id = props.location;
      if (clickcount < clckLimit) {
        const response = await axios.put(`http://localhost:3000/api/qna/upvote/${id}`, {}, { headers });
        setClickcount(clickcount + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      
      <div 
        className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg cursor-pointer max-w-sm w-full p-4 m-4 hover:shadow-xl transition duration-200 ease-in-out"
        onClick={() => setIsModalOpen(true)} 
      >
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="h-6 w-6 text-gray-400 dark:text-gray-300 mr-3" />
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Question: {props.text}
            </h3>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
              {props.votes} votes
            </span>
            <button
              disabled={clickcount >= clckLimit}
              onClick={upvote}
              className={`inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                clickcount >= clckLimit ? 'disabled:bg-gray-400' : ''
              }`}
              aria-label={`Upvote question: ${props.text}`}
            >
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full space-y-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <div className="font-semibold text-xl">Question: {props.text}</div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times; {/* Close Button */}
              </button>
            </div>

            {/* Upvote button */}
            <div className="mt-4 text-center">
              <button
                disabled={clickcount >= clckLimit}
                onClick={upvote}
                className="flex justify-center items-center bg-green-500 text-white p-2 rounded-full hover:bg-green-600 disabled:bg-gray-400 transition duration-200 ease-in-out"
              >
                <ArrowCircleUpIcon fontSize="large" />
                <span className="ml-2">Upvote</span>
              </button>
            </div>

            {/* Success message if already upvoted */}
            {clickcount >= clckLimit && (
              <div className="mt-4 text-center text-green-600">
                <div>You've already upvoted this question!</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleQuestion;
