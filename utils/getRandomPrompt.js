import { surpriseMePrompts } from "@/lib/supriseMePrompts";

export function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
  
    return randomPrompt;
}