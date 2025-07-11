import "./modal.css";
import { X } from "lucide-react";
import { HashLoader } from 'react-spinners';

const popSummary = ({ summary, loading, onClose }) => {


    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="flex justify-between items-center">
                    <h2 className="text-slate-700 font-normal text-xl ">News Summary</h2>
                    <button className="cursor-pointer" onClick={onClose}> <X /> </button>
                </div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <HashLoader className="h-12 w-12 " color="#c2c2c2" size={35} />
                        <p className="mt-2 text-gray-600">Summarizing...</p>
                    </div>
                ) : (

                    <div>
                        <p className="text-black font-semibold text-md text-justify py-5">{summary}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default popSummary;