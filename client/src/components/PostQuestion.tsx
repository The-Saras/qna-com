import { Button, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { questiontoask } from "../atoms/qna";
import axios from "axios";
import { useState } from "react";
import { Alert } from "@mui/material";
import * as io from "socket.io-client";

import "../css files/questions-page.css";

// Initialize socket connection
const socket = io.connect('http://localhost:3000', {
  reconnection: true
});

const PostQuestion = (props: any) => {
  const [que, addQue] = useRecoilState(questiontoask);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  
  const headers: HeadersInit = {
    "authorization": localStorage.getItem("jwtToken") || "",
    'Content-Type': 'application/json',
  };

  // Interface for the question object
  interface QuestionToAsk {
    text: string;
  }

  // Submit the question to the server
  const submitQuestion = async () => {
    const id = props.location;
    try {
      const QuestionToAsk: QuestionToAsk = {
        text: que
      };

      const response = await axios.post(`http://localhost:3000/api/qna/createque/${id}`, JSON.stringify(QuestionToAsk), { headers });
      if (response) {
        setLoading(true);
        const data = response.data;
        socket.emit('new-que', response.data);
        setIsModalOpen(false); // Close the modal after submitting the question
        console.log(response);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button
        className="qpage-add-btn"
        variant="contained"
        size="large"
        color="success"
        onClick={() => setIsModalOpen(true)} // Open modal on button click
      >
        Ask Question
      </Button>

      {/* Modal overlay and content */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>

            {/* Success message */}
            {loading && (
              <Alert severity="info" onClose={() => setLoading(false)}>
                Question posted Successfully!
              </Alert>
            )}

            {/* Question Input Field */}
            <TextField
              label="Ask Question"
              variant="outlined"
              fullWidth
              onChange={(e) => addQue(e.target.value)}
              className="mb-4"
            />

            {/* Submit Button */}
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                size="large"
                color="success"
                onClick={submitQuestion}
              >
                Ask
              </Button>

              {/* Close Modal Button */}
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                onClick={() => setIsModalOpen(false)} // Close modal on button click
              >
                Cancel
              </Button>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default PostQuestion;
