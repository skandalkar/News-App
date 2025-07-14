import "./modal.css";
import { X } from "lucide-react";
import { BarLoader } from 'react-spinners';
import { Link } from "react-router-dom";

const popSummary = ({ verdict, evidence, source, url, warn, loading, onClose }) => {


    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="flex justify-between items-center">
                    <h2 className="text-slate-700 font-normal text-xl ">News Validity</h2>
                    <button className="cursor-pointer" onClick={onClose}> <X /> </button>
                </div>

                {
                    loading ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <BarLoader className="h-12 w-12 " color="#c2c2c2" size={35} />
                            <p className="mt-2 text-gray-600">Validating...</p>
                        </div>

                    ) : (

                        <div>
                            <h2 className="text-black font-semibold text-md text-justify pt-5">{verdict}</h2>
                            <p><span className="text-black font-semibold text-md text-justify">Headline:</span>{evidence}</p>
                            <p className="text-black font-normal text-md text-justify "><span className="text-black font-semibold text-md text-justify">Source:</span>{source}</p>
                            <p><span className="text-black font-semibold text-md text-justify">View source:</span>
                                <Link className="text-blue-500 font-normal text-md text-justify ">{url}</Link>
                            </p>
                            <p className="text-red-400 font-light text-sm text-justify mt-2">{warn}</p>
                        </div>
                    )
                }         </div>
        </div>
    );
};

export default popSummary;