import "./modal.css";
import { X } from "lucide-react";
import { HashLoader } from 'react-spinners';

const Summary = ({ summary, loading, onClose }) => {

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="flex justify-between items-center">
                    <h2 className="text-slate-700 font-normal text-lg ">News Summary</h2>
                    <button className="cursor-pointer text-gray-700 hover:text-gray-950" onClick={onClose}> <X /> </button>
                </div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <HashLoader className="h-12 w-12 " color="#c2c2c2" size={35} />
                        <p className="mt-2 text-gray-600">Summarizing...</p>
                    </div>
                ) : (

                    <div>
                        <p className="text-black font-semibold text-md text-justify py-5">{summary}</p>

                        <br />
                        <div class="mt-6 text-xs text-gray-500">
                            <i>This result is generated using an AI-assisted summarization service. It reports extracted, AI can make mistakes, so double-check responses.</i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Summary;