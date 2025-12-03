"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { MessageSquare, Send, X, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { generateRepoResponse } from "@/lib/ai";
import { Repository } from "@/types";

interface ChatModalProps {
    repo: Repository;
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function ChatModal({ repo }: ChatModalProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [apiKey, setApiKey] = React.useState("");
    const [model, setModel] = React.useState("openai/gpt-oss-20b:free");
    const [question, setQuestion] = React.useState("");
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    // Load API key from local storage on mount
    React.useEffect(() => {
        const storedKey = localStorage.getItem("llm_api_key");
        const storedModel = localStorage.getItem("llm_model");
        if (storedKey) setApiKey(storedKey.trim());
        if (storedModel) setModel(storedModel.trim());
    }, []);

    const handleSaveKey = () => {
        const trimmedKey = apiKey.trim();
        setApiKey(trimmedKey);
        localStorage.setItem("llm_api_key", trimmedKey);
    };

    const handleSend = async () => {
        if (!question.trim() || !apiKey) return;

        const userMsg: Message = { role: "user", content: question };
        setMessages((prev) => [...prev, userMsg]);
        setQuestion("");
        setIsLoading(true);

        try {
            const context = `
Name: ${repo.name}
Description: ${repo.description}
Language: ${repo.language}
Topics: ${repo.topics.join(", ")}
Stars: ${repo.stargazersCount}
Open Issues: ${repo.openIssuesCount}
Last Updated: ${repo.updatedAt}
URL: ${repo.htmlUrl}
      `;

            const response = await generateRepoResponse(apiKey, model, context, userMsg.content);
            const aiMsg: Message = { role: "assistant", content: response };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Error: Failed to get response. Please check your API key." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (open) {
            const storedKey = localStorage.getItem("llm_api_key");
            const storedModel = localStorage.getItem("llm_model");
            if (storedKey) setApiKey(storedKey.trim());
            if (storedModel) setModel(storedModel.trim());
        }
        setIsOpen(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full mt-2">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enquire about Repo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Chat about {repo.name}</DialogTitle>
                    <DialogDescription>
                        Ask questions about this project using AI.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 border rounded-md bg-muted/50">
                    {messages.length === 0 && (
                        <div className="text-center text-muted-foreground text-sm mt-20">
                            <p>Ask anything about this repository!</p>
                            <p className="text-xs mt-2">"What is this project for?"</p>
                            <p className="text-xs">"Is it good for beginners?"</p>
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-background border"
                                    }`}
                            >
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-background border rounded-lg px-4 py-2 text-sm">
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-4 pt-4">
                    {!localStorage.getItem("llm_api_key") && (
                        <div className="flex gap-2 items-center">
                            <Key className="h-4 w-4 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="Enter OpenRouter API Key"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="text-xs"
                            />
                            <Button size="sm" onClick={handleSaveKey} disabled={!apiKey}>Save</Button>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Input
                            placeholder="Type your question..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            disabled={isLoading || !apiKey}
                        />
                        <Button size="icon" onClick={handleSend} disabled={isLoading || !apiKey}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground">
                        Powered by OpenRouter. Key stored locally.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
