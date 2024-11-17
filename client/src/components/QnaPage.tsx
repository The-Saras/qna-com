import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { questions } from "../atoms/qna";
import SingleQuestion from "./SingleQuestion";
import PostQuestion from "./PostQuestion";
import * as io from "socket.io-client";

const socket = io.connect('http://localhost:3000', {
  reconnection: true
});

type Question = {
  _id: string;
  text: string;
};

const QnaPage = () => {
  const { qnaid } = useParams();
  const [question, setQuestions] = useRecoilState<Question[]>(questions);
  const [newQ, setnewqu] = useState<Question[]>([]);
  const headers: HeadersInit = {
    "authorization": localStorage.getItem("jwtToken") || "",
    'Content-Type': 'application/json',
  };

  const fetchQnaData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/qna/getallque/${qnaid}`, { headers });
      setQuestions(response.data.QuestionsInArray.questions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQnaData();
    socket.on('new-que', (newPost: Question) => {
      setQuestions((state) => [...state, newPost]);
    });
  }, [question]);

  const renderQue = question.concat(newQ);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <PostQuestion location={qnaid} />
      </div>
      
      <div className="space-y-4">
        {question.map((value: Question) => (
          <div key={value._id} className="border-b border-gray-300 pb-4">
            <SingleQuestion text={value.text} location={value._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnaPage;
