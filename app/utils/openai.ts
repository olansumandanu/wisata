import OpenAI from "openai";

const openai = new OpenAI();

export const sendMessage = async (city: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "deskripsi singkat tentang " + city,
      },
      {
        role: "user",
        content: "sejarah singkat tentang " + city,
      },
    ],
    max_tokens: 150, // Adjust based on your requirements
  });
  console.log(response);
  return response.choices[0].message.content;
};

export default openai;
