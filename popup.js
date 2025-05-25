document.getElementById("askBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const apiKey = document.getElementById("apiKey").value;
  const responseBox = document.getElementById("response");

  if (!prompt || !apiKey) {
    responseBox.textContent = "Please enter a prompt and API key.";
    return;
  }

  responseBox.textContent = "Thinking...";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5
      })
    });

    const data = await res.json();

    responseBox.textContent =
      data?.choices?.[0]?.message?.content || "No response.";
  } catch (err) {
    responseBox.textContent = "Error: " + err.message;
  }
});