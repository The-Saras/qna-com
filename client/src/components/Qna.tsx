import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, PlusCircle, Bell, User } from "lucide-react";

interface QnaProps {
  name: string;
  creator: string;
  _id: string;
}

const Qna: React.FC<QnaProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <MessageCircle className="h-6 w-6 text-gray-400 dark:text-gray-300" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <button
              onClick={() => {
                navigate(`/getallque/${props._id}`);
              }}
              className="text-lg font-medium text-indigo-600 dark:text-indigo-400 truncate hover:underline"
            >
              {props.name}
            </button>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Created by {props.creator}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qna;
