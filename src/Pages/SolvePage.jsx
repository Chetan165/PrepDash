import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, LoaderIcon } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import pollJudge0 from "../Components/PollingSubmissions";

const SolvePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const b64decode = (binaryString) => {
    const len = binaryString?.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const [msg, setMsg] = useState(null);
  const constid = params.ContestId;
  const id = params.id;
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Code, SetCode] = useState("");
  const [submissionResult, SetsubmissionResult] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [languageId, setLanguageId] = useState(54); // Default: C++
  const [ChallengeDetails, SetChallengeDetails] = useState(
    JSON.parse(localStorage.getItem(`${params.id2}`)) || null
  );
  const [Challenges, setChallenges] = useState([]);

  const languageOptions = [
    { id: 54, name: "C++ (GCC 9.2.0)" },
    { id: 62, name: "Java (OpenJDK 13.0.1)" },
    { id: 71, name: "Python (3.8.1)" },
  ];

  const [Submission, SetSubmission] = useState({
    Code: Code,
    problemId: params.id2,
    ContestId: params.id1,
    languageId: languageId,
  });

  useEffect(() => {
    SetSubmission({
      Code: Code,
      problemId: params.id2,
      ContestId: params.id1,
      languageId: parseInt(languageId),
      uid: "randomUser",
    });
  }, [languageId, Code, constid, id]);
  const fetchChallenges = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/ContestChallenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: params.id1,
        }),
        credentials: "include",
      });
      const fetchedChallenges = await res.json();
      if (fetchedChallenges && fetchedChallenges.ok) {
        setChallenges(fetchedChallenges.collections.problems);
      } else {
        toast.error("Error Fetching Challenges");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Challenges.forEach((val, index) => {
      if (!localStorage.getItem(`${val.id}`))
        localStorage.setItem(`${val.id}`, JSON.stringify(val));
    });
  }, [Challenges]);

  const Submit = async () => {
    try {
      if (!Code.trim()) throw Error("Code field cannot be empty.");
      setShowResult(true);
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/Submission/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Submission }),
        credentials: "include",
      });

      const result = await res.json();
      if (result.ok) {
        setTokens(result.tokens);
        const results = await pollJudge0(result.tokens);

        let verdict = "Accepted";
        let score = 0;
        let max_id = 3;

        for (let r of results) {
          if (r.status.id === 3) score += 10;
          max_id = Math.max(max_id, r.status.id);
        }

        if (max_id >= 6) verdict = "Error";
        else if (max_id === 4) verdict = "Wrong Answer";
        else if (max_id === 5) verdict = "Time Limit Exceeded";

        SetsubmissionResult({ result: results, verdict, score });
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (submissionResult.verdict === "Error") {
      submissionResult.result?.forEach((e) => {
        if (e.status.id >= 6) {
          let out = b64decode(e.compile_output);
          const decodedOutput = new TextDecoder().decode(out);
          setMsg(decodedOutput);
        }
      });
    } else setMsg(null);
    setLoading(false);
  }, [submissionResult]);
  useEffect(() => {
    const func = async () => {
      await fetchChallenges();
    };
    func();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 px-8 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {ChallengeDetails?.title || "Problem Title"}
      </h1>

      {/* Problem description */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-md space-y-6">
        <div>
          <h2 className="font-semibold text-lg text-gray-100 mb-1">
            Problem Statement:
          </h2>
          <p className="text-gray-400 text-justify">
            {ChallengeDetails?.statement}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-gray-100 mb-1">
            Input Format:
          </h2>
          <p className="text-gray-400">{ChallengeDetails?.inputFormat}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-gray-100 mb-1">
            Output Format:
          </h2>
          <p className="text-gray-400">{ChallengeDetails?.outputFormat}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-gray-100 mb-1">
            Constraints:
          </h2>
          <p className="text-gray-400">{ChallengeDetails?.constraints}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-gray-100 mb-1">
            Sample Input:
          </h2>
          <pre className="bg-gray-800 p-3 rounded-md text-sm text-gray-300">
            {ChallengeDetails?.sampleInput}
          </pre>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-gray-100 mb-1">
            Sample Output:
          </h2>
          <pre className="bg-gray-800 p-3 rounded-md text-sm text-gray-300">
            {ChallengeDetails?.sampleOutput}
          </pre>
        </div>
      </div>

      {/* Language + Editor */}
      <div className="mt-10 space-y-6">
        <select
          className="bg-gray-800 p-2 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setLanguageId(e.target.value)}
        >
          {languageOptions.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>

        <div className="relative w-full">
          <textarea
            className="w-full h-96 bg-gray-900 text-gray-100 font-mono p-4 rounded-md resize-none focus:ring-2 focus:ring-blue-600 outline-none"
            placeholder="Write your code here..."
            onChange={(e) => SetCode(e.target.value)}
          />
          <button
            onClick={Submit}
            className="absolute bottom-4 right-4 px-5 py-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-lg transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Result Dialog */}
      <Dialog.Root open={showResult} onOpenChange={setShowResult}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 bg-gray-900 text-gray-200 rounded-xl p-6 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 shadow-lg border border-gray-700">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-48 space-y-4">
                <LoaderIcon className="text-blue-400" />
                <span className="text-gray-400">Evaluating submission...</span>
              </div>
            ) : (
              <>
                <Dialog.Title className="text-2xl font-semibold mb-4 text-white">
                  Submission Result
                </Dialog.Title>

                <div className="space-y-2 mb-4">
                  <p>
                    <strong>Overall Verdict:</strong>{" "}
                    <span
                      className={`text-xl font-semibold ${
                        submissionResult.verdict === "Accepted"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {submissionResult.verdict}
                    </span>
                  </p>
                  <p>
                    <strong>Score:</strong> {submissionResult.score}
                  </p>
                </div>

                {msg && (
                  <textarea
                    className="w-full h-40 bg-gray-800 p-3 rounded-md text-gray-300 font-mono text-sm"
                    value={msg}
                    readOnly
                  />
                )}

                <table className="w-full mt-4 border-t border-gray-700 text-sm">
                  <thead className="text-gray-400 border-b border-gray-700">
                    <tr>
                      <th className="py-2 text-left">Test Case</th>
                      <th className="py-2 text-left">Status</th>
                      <th className="py-2 text-left">Time</th>
                      <th className="py-2 text-left">Memory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionResult.result?.map((res, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-800 hover:bg-gray-800/60"
                      >
                        <td className="py-2">{i + 1}</td>
                        <td className="py-2">{res.status.description}</td>
                        <td className="py-2">{res.time ?? "-"}</td>
                        <td className="py-2">{res.memory ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Dialog.Close asChild>
                  <button className="mt-6 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition">
                    Close
                  </button>
                </Dialog.Close>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default SolvePage;
