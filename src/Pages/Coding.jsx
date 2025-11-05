import SolvePage from "./SolvePage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GradientButton from "../Components/Button";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";

const Coding = () => {
  const navigate = useNavigate();
  const [questions, setquestions] = useState([]);
  const fetchquestions = async (name) => {
    try {
      const data = await fetch(
        `http://localhost:5000/Practice/Coding/${name}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const q = await data.json();
      console.log(q);
      setquestions(q.result);
      console.log(questions);
    } catch (err) {
      console.log(err);
    }
  };
  const params = useParams();
  useEffect(() => {
    fetchquestions(params.id);
  }, []);
  return params.id1 && params.id2 ? (
    <div>
      <SolvePage />
    </div>
  ) : (
    <>
      <div>
        {questions?.map((q, index) => {
          return (
            <Card
              title={q.Title}
              para1={q.ContestId}
              para2={q.ProblemId}
              key={index}
            ></Card>
          );
        })}
      </div>
    </>
  );
};

export default Coding;
