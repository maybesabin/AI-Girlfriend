import axios from "axios";
import { useState } from "react";
import girl from "./assets/girl.png"
import heart from "./assets/heartpulse.png"
import { Send } from "lucide-react";
import { bouncy } from 'ldrs'

const Chat = ({ name }: { name: string }) => {
    bouncy.register()
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [userChats, setUserChats] = useState<any | []>([]);
    const [responses, setResponses] = useState<any | []>([]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        // Store the current input in userChats
        const currentInput = input;
        setUserChats([...userChats, currentInput]);
        setInput('');

        try {
            const res = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAQLimlsurSd0WmyW69d4ruczPKqm3bzKk`,
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Do not give expressions inside brackets, keep the response simple. Act like you're my girlfriend for a while and give proper response to: + ${currentInput}`
                                }
                            ]
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Extract just the text from the response
            const responseText = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response text available';

            setResponses([...responses, responseText]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponses([...responses, 'Error occurred']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="h-full md:w-[25rem] w-full flex flex-col items-start gap-9 p-4">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <img className="w-6 h-6" src={heart} alt="Girl Iphone Avatar" />
                    <div className="flex flex-col items-start mt-2">
                        <h1 className="text-base font-medium capitalize">{name}</h1>
                        <p className="-mt-0.5 text-xs text-green-500">Online</p>
                    </div>
                </div>

                {/* Chat */}
                <div className="h-[80%] w-full flex flex-col items-start justify-end gap-6 overflow-y-auto">

                    {/* Display all conversation history */}
                    {userChats.map((chat: any, index: number) => (
                        <div key={`conversation-${index}`} className="w-full flex flex-col gap-4">

                            {/* User message */}
                            <div className="w-full flex justify-end">
                                <p className="bg-[#9b8af9] rounded-lg p-4 max-w-[85%] md:text-sm text-xs text-white">
                                    {chat}
                                </p>
                            </div>

                            {/* Response */}
                            <div className="flex items-start gap-2">
                                <img src={girl} className="h-12 w-12 rounded-full border" alt="" />
                                <div className="flex flex-col items-start gap-4 md:text-sm text-xs">
                                    <div className="bg-[#fee5f8] font-light p-4 rounded-lg">
                                        {responses[index]}
                                        {(loading && !responses[index]) &&
                                            // @ts-ignore
                                            <l-bouncy
                                                size="20"
                                                speed="1.75"
                                                color="black"
                                            />
                                        }
                                    </div>
                                    {!loading &&
                                        <h6 className="text-xs ml-2 -mt-2 text-neutral-600">
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                            &nbsp;&nbsp;
                                            Seen
                                        </h6>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input  */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex items-center gap-2 text-black bg-white p-4 rounded-xl">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="w-full outline-none border-none text-sm"
                        placeholder="Enter your message..."
                        type="text"
                        name="input"
                    />
                    <button type="submit">
                        <Send
                            color="#9b8af9"
                            className="fill-[#9b8af9]"
                        />
                    </button>
                </form>
            </div >
        </div>
    );
};

export default Chat;