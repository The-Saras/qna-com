import { useRecoilState } from "recoil";
import { qnaItems } from "../atoms/qna";
import axios from "axios";
import { useEffect, useState } from "react";
import Qna from "./Qna";

const QnaState = () => {
  const [qna, setQna] = useRecoilState(qnaItems);
  const [loading, setLoading] = useState(true);

  const headers: HeadersInit = {
    authorization: localStorage.getItem("jwtToken") || "",
    "Content-Type": "application/json",
  };

  const fetchAllQnas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/qna/allqna", {
        headers,
      });

      setQna(response.data.allQnas);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllQnas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {qna.map((value: any) => (
              <Qna
                key={value._id}
                name={value.name}
                creator={value.createdBy.name}
                _id={value._id}
              />
            ))}
          </div>
          <h1 className="text-center text-red-500 font-bold mt-8">saras</h1>
        </div>
      )}
    </div>
  );
};

export default QnaState;
