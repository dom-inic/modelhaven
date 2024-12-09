import React, { useState } from 'react';
import { Send, Paperclip, Code, Image } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

export function ChatInput() {
  const [message, setMessage] = useState('');
  const { addMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    addMessage(message, false);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      addMessage(`
        Creating an animated movie using AI tools is an exciting project! Here’s how you can approach it step-by-step with AI tools and platforms designed to streamline your workflow:

Step 1: Generate Story Ideas and Scripts
Use AI tools like ChatGPT or Sudowrite to brainstorm ideas and draft compelling scripts. These tools can also help refine dialogues or plot points.
Step 2: Design Characters and Visuals
AI tools like RunwayML and Stable Diffusion can generate character designs and concept art. For a more tailored approach, consider platforms like Daz 3D for creating detailed 3D characters.
If you're focusing on 2D animations, Procreate or Adobe Fresco combined with AI assistance (e.g., Adobe Firefly) can accelerate your design workflow.
Step 3: Animate Your Characters
For automating animations, try Plask, which allows motion capture using your webcam, or DeepMotion for AI-based motion tracking.
Blender and Autodesk Maya are industry-standard tools, and integrating them with AI plugins (like AI-driven rigging tools) can speed up the animation process.
Step 4: Add Voiceovers and Sound Effects
Generate realistic voiceovers with Eleven Labs or Descript. These tools let you create and tweak voice tones that fit your characters.
For background music and sound effects, use Soundraw or Boom Library, which leverage AI for custom audio tracks.
Step 5: Compile and Edit
Use tools like RunwayML (video editing) or Adobe Premiere Pro (with AI plugins) to finalize your movie. AI can assist in color grading, scene transitions, and even frame interpolation for smoother animations.
Suggested Workflow on ModelHaven**
Start by searching for "story generation tools" to find the best platforms for scriptwriting.
Then, explore "character design tools" and "animation software" in the Animation category to find options tailored to your needs.
Finally, use the "audio design" and "video editing" sections for post-production tools.
Would you like recommendations for specific tools or further guidance on any of these steps?"

ModelHaven organizes and presents the best AI tools to help you bring your ideas to life! Let me know if you’d like assistance exploring these tools. 🚀`, true);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-violet-500/20 bg-black/50 backdrop-blur-md p-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hello Haven here, What do you want to build with AI today?, i will guide on you available models and AI products"
            rows={3}
            className="w-full bg-violet-950/30 border-2 border-violet-500/30 rounded-xl py-4 px-6 pr-36
                     text-violet-100 placeholder-violet-400/50 focus:outline-none focus:ring-2
                     focus:ring-cyan-500/50 transition-all text-lg resize-none"
            style={{ minHeight: '100px' }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-3">
            <div className="flex items-center space-x-2 mr-2">
              <button
                type="button"
                className="p-2.5 hover:bg-violet-500/10 rounded-lg transition-colors group"
                title="Attach file"
              >
                <Paperclip className="w-6 h-6 text-violet-400 group-hover:text-cyan-400" />
              </button>
              <button
                type="button"
                className="p-2.5 hover:bg-violet-500/10 rounded-lg transition-colors group"
                title="Insert code block"
              >
                <Code className="w-6 h-6 text-violet-400 group-hover:text-cyan-400" />
              </button>
              <button
                type="button"
                className="p-2.5 hover:bg-violet-500/10 rounded-lg transition-colors group"
                title="Upload image"
              >
                <Image className="w-6 h-6 text-violet-400 group-hover:text-cyan-400" />
              </button>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-cyan-600 p-3 rounded-xl
                       hover:from-violet-500 hover:to-cyan-500 transition-all
                       shadow-lg hover:shadow-cyan-500/20 group"
            >
              <Send className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <p className="text-xs text-violet-400">Press Enter to send, Shift + Enter for new line</p>
        </div>
      </div>
    </form>
  );
}