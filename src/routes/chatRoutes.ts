import express from "express";
import OpenAI from "openai";
import { functionDefinitions, functionsMap } from '../functions';

const openai = new OpenAI();

const router = express.Router();


router.post("/", async (req, res) => {
    const { message, userId } = req.body;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        functions: [],
        function_call: 'auto',
        max_tokens: 1000
    });

    const reply = response.choices[0].message.content;

    if (reply && (reply as any).finish_reason === 'function_Call') {
        const fc = (reply as any).message.function_call;
        // Handle function call logic here
        const functionName = (fc?.name as keyof typeof functionsMap) || 'default';
        const handler = functionsMap[functionName];

        if (handler) {
            const result = await handler.executor(fc.arguments);
            res.json({ reply: result });
        } else {
            res.status(400).json({ error: 'Function not found' });
        }
    }
    else {
        res.json({ reply });
    }
});

router.get("/test", async (req, res) => {
    res.status(200).json({
        message: "Chat route is working"
    });
});

export default router;

