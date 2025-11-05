const pollJudge0 = async (tokens) => {
  const tokenString = tokens.join(",");
  let attempts = 0;
  const maxAttempts = 10;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const start = Date.now();

  while (attempts < maxAttempts) {
    const res = await fetch(
      `http://43.205.137.251:2358/submissions/batch?tokens=${tokenString}&base64_encoded=true&fields=time,memory,stderr,compile_output,message,status`
    );
    const data = await res.json();

    // Decode base64 fields
    const decoded = data.submissions.map((d) => ({
      ...d,
      stderr: d.stderr ? atob(d.stderr) : null,
      compile_output: d.compile_output ? atob(d.compile_output) : null,
      message: d.message ? atob(d.message) : null,
    }));

    const allDone = decoded.every((s) => s.status.id >= 3);
    if (allDone) {
      console.log(`time taken=${Date.now() - start}ms`);
      return decoded;
    }

    await delay(3000);
    attempts++;
  }

  throw new Error("Judge0 timed out. Try again.");
};

export default pollJudge0;
