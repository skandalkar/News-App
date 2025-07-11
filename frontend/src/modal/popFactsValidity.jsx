import "./modal.css";
import { X } from "lucide-react";
import { BarLoader } from 'react-spinners';

const popSummary = ({ verdict, evidence, loading, onClose }) => {


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
                            <h2 className="text-black font-semibold text-md text-justify py-5">{verdict}</h2>
                            <p className="text-black font-semibold text-md text-justify py-5">{evidence}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default popSummary;