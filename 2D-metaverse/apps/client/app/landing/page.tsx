"use client";

import { useState } from "react";
import { Github, Twitter, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(`${isSignUp ? "Sign up" : "Sign in"} with:`, {
        email,
        password,
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-300 relative overflow-hidden">
       
      {/* Main content */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-sky-300">
        <div className="z-10">
          <Card className="w-[350px] bg-gray-900/90 p-6 text-center border-none shadow-2xl">
            <h1 className="text-2xl font-bold mb-6 text-white pixel-font">
              Welcome to 100xverse
            </h1>

            <div className="mb-6">
              <img
                src="/logo3.jpg?height=150&width=150"
                alt="100xverse Logo"
                className="mx-auto rounded-lg pixel-art"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <Label
                  htmlFor="email"
                  className="text-teal-500 pixel-font text-xs"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 text-white border-teal-500 pixel-font text-sm h-8"
                  required
                />
              </div>
              <div className="text-left">
                <Label
                  htmlFor="password"
                  className="text-teal-500 pixel-font text-xs"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 text-white border-teal-500 pixel-font text-sm h-8"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white pixel-font py-2 rounded-lg transition-colors text-sm h-10"
              >
                {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>

            <div className="mt-4">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-teal-500 hover:text-teal-400 pixel-font text-xs"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Need an account? Sign Up"}
              </button>
            </div>

            {isLoading && (
              <div className="mt-4">
                <div className="text-teal-500 mb-2 pixel-font text-xs">
                  Processing...
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="loading-bar"></div>
                </div>
              </div>
            )}
          </Card>
          
        </div>
        
      </BackgroundLines>
      

      {/* Social links */}
      <div className="fixed bottom-4 right-4 flex gap-4">
        <a
          href="#"
          className="text-gray-900 hover:text-teal-500 transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="text-gray-900 hover:text-teal-500 transition-colors"
        >
          <Twitter className="w-6 h-6" />
        </a>
        <a
          href="#"
          className="text-gray-900 hover:text-teal-500 transition-colors"
        >
          <Globe className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
