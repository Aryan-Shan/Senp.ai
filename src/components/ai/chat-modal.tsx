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

    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full mt-2 gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    Enquire about Repo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-4 border-b bg-muted/30">
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Chat about {repo.name}
                    </DialogTitle>
                    <DialogDescription>
                        Powered by AI. Ask anything about this project.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                            <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                            <div className="space-y-1">
                                <p className="font-medium">No messages yet</p>
                                <p className="text-sm text-muted-foreground">Start the conversation by asking a question.</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                                {["What does this do?", "Is it beginner friendly?", "Tech stack?"].map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => setQuestion(q)}
                                        className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                    : "bg-muted text-foreground rounded-bl-none"
                                    }`}
                            >
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <ReactMarkdown>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3 text-sm animate-pulse">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t bg-muted/30 space-y-3">
                    {!localStorage.getItem("llm_api_key") && (
                        <div className="flex gap-2 items-center p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                            <Key className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                            <Input
                                type="password"
                                placeholder="Enter OpenRouter API Key"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="h-8 text-xs bg-transparent border-none focus-visible:ring-0"
                            />
                            <Button size="sm" variant="ghost" onClick={handleSaveKey} disabled={!apiKey} className="h-7">Save</Button>
                        </div>
                    )}

                    <div className="flex gap-2 items-end">
                        <Input
                            placeholder="Type your question..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            disabled={isLoading || !apiKey}
                            className="min-h-[44px] rounded-full px-4 bg-background shadow-sm"
                        />
                        <Button
                            size="icon"
                            onClick={handleSend}
                            disabled={isLoading || !apiKey}
                            className="rounded-full h-11 w-11 shrink-0 shadow-sm"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground">
                        Model: {model.split('/')[1] || model}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
