import OpenAI from "openai";

export async function generateRepoResponse(
    apiKey: string,
    model: string,
    repoContext: string,
    userQuestion: string
): Promise<string> {
    try {
        const validKey = apiKey.trim();
        const validModel = model.trim() || "openai/gpt-oss-20b:free";

        const prompt = `
You are a helpful assistant for the AOSSIE open-source organization.
The user is asking about the following repository:
${repoContext}

User Question: ${userQuestion}

Answer the user's question based on the repository context provided above.
If the answer is not in the context, use your general knowledge but mention that it might not be specific to this repo.
Keep the answer concise and helpful for a potential contributor.
`;

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: validKey,
            dangerouslyAllowBrowser: true,
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "AOSSIE Project Matcher",
            }
        });

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: validModel,
        });

        return completion.choices[0].message.content || "No response generated.";

    } catch (error: any) {
        console.error("Error generating AI response:", error);
        throw new Error(`Failed to generate response: ${error.message || error}`);
    }
}
