import { GoogleGenAI, Chat } from "@google/genai";
import { RESUME_DATA } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const createResumeChat = (): Chat => {
  // Serialize the resume data into a system instruction format
  const resumeContext = JSON.stringify(RESUME_DATA, null, 2);
  
  const systemInstruction = `
    You are an AI assistant representing ${RESUME_DATA.personalInfo.name}. 
    Your goal is to answer questions from recruiters or visitors about ${RESUME_DATA.personalInfo.name}'s professional background, skills, and experience based STRICTLY on the provided resume context below.
    
    Resume Context:
    ${resumeContext}

    Guidelines:
    1. Be professional, polite, and concise.
    2. Answer in the first person (e.g., "I have experience in...") or third person as an agent (e.g., "${RESUME_DATA.personalInfo.name} has experience in...") depending on the question, but preferably as a helpful assistant representing the candidate. Let's stick to representing the candidate: "Alex has experience with..."
    3. If asked about something not in the resume, politely state that you don't have that information but can discuss the skills listed.
    4. Highlight key achievements when relevant.
    5. Keep responses under 150 words unless asked for a detailed explanation.
    6. Use formatting (bullet points) if listing items.
  `;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    },
  });
};
