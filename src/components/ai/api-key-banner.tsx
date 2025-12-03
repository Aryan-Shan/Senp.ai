"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Key, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function ApiKeyBanner() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [apiKey, setApiKey] = React.useState("");
    const [model, setModel] = React.useState("openai/gpt-oss-20b:free");
    const [isSaved, setIsSaved] = React.useState(false);

    React.useEffect(() => {
        const storedKey = localStorage.getItem("llm_api_key");
        const storedModel = localStorage.getItem("llm_model");
        if (storedKey) setApiKey(storedKey);
        if (storedModel) setModel(storedModel);
    }, []);

    const handleSave = () => {
        const trimmedKey = apiKey.trim();
        const trimmedModel = model.trim();
        localStorage.setItem("llm_api_key", trimmedKey);
        localStorage.setItem("llm_model", trimmedModel);
        setApiKey(trimmedKey);
        setModel(trimmedModel);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="w-full border-b border-white/10 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-center w-full py-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors gap-1"
                    >
                        <Key className="h-3 w-3" />
                        {isOpen ? "Hide AI Settings" : "Configure AI Access"}
                        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="py-3 flex items-center justify-center gap-2 max-w-lg mx-auto">
                                    <Input
                                        type="password"
                                        placeholder="Enter OpenRouter API Key"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="h-8 text-xs"
                                    />
                                    <Button size="sm" onClick={handleSave} className="h-8 px-3">
                                        {isSaved ? <Check className="h-3 w-3" /> : "Save"}
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 max-w-lg mx-auto pb-2">
                                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">Model:</span>
                                    <Input
                                        type="text"
                                        placeholder="Model (e.g. openai/gpt-oss-20b:free)"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        className="h-7 text-xs flex-1"
                                    />
                                </div>
                                <p className="text-[10px] text-center text-muted-foreground pb-2">
                                    Powered by OpenRouter. Supports multiple models. Key stored locally.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
