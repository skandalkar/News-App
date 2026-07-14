import { AlertTriangle, CheckCircle2, ShieldAlert, X, } from "lucide-react";
import { BarLoader } from "react-spinners";
import "./modal.css";

const Validity = ({ validation, loading, onClose, }) => {

    if (loading) {
        return (
            <div className="modal-overlay">
                <div className="modal-box">
                    <div className="flex justify-between">
                        <h2 className="text-slate-700 font-normal text-lg "> News Validation</h2>
                        <button className="cursor-pointer text-gray-700 hover:text-gray-950" onClick={onClose}> <X /></button>
                    </div>

                    <div className="flex flex-col items-center py-10 text-slate-700">
                        <BarLoader color="#4F46E5" />
                        <p className="mt-2"> Validating article...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (validation?.error) {
        return (

            <div className="modal-overlay">
                <div className="modal-box">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl text-slate-700">News Validation</h2>
                        <button onClick={onClose} className="cursor-pointer text-gray-700 hover:text-gray-950">
                            <X />
                        </button>
                    </div>

                    <div>
                        <p className="text-black font-semibold text-md text-center py-5">{validation.message}</p>
                    </div>
                    <br />
                    <div className="mt-6 text-xs text-gray-500">
                        <i>This result is generated using an AI-assisted validation service. It reports extracted claims and source credibility, but it does not guarantee that every claim is true.</i>
                    </div>
                </div>
            </div>
        );
    } else {

        const source = validation.source;

        let color = "bg-red-500";
        let Icon = ShieldAlert;
        console.log(source)
        if (source.score >= 90) {
            color = "bg-green-500";
            Icon = CheckCircle2;
        } else if (source.score >= 60) {
            color = "bg-yellow-500";
            Icon = AlertTriangle;
        }

        return (
            <div className="modal-overlay">
                <div className="modal-box">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl text-slate-700">News Validation</h2>
                        <button onClick={onClose} className="cursor-pointer text-gray-700 hover:text-gray-950">
                            <X />
                        </button>
                    </div>

                    {/* Status Icon */}
                    <div className="flex flex-col items-center mt-5">
                        <div className={`${color} rounded-full p-3 text-white`}>
                            <Icon size={40} />
                        </div>
                        <h3 className="font-bold mt-3 text-md text-black">{source.category}</h3>
                    </div>

                    {/* Score validation score out off 100 */}

                    <div className="mt-6">
                        <div className="flex justify-between text-md text-black">
                            <span>Source Trust Score</span>
                            <span>{source.score}/100</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                            <div className={`${color} h-3 rounded-full`}
                                style={{ width: `${source.score}%` }}
                            />
                        </div>
                    </div>

                    {/* Source domain of news from */}

                    <div className="mt-6 text-md text-gray-800">
                        <p><strong>Domain</strong></p>
                        <p className="text-gray-900">{source.domain}</p>
                    </div>

                    {/* Claims found for articles */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-md text-gray-800">Claims Detected</h3>
                        <ul className="mt-2 space-y-2">
                            {
                                validation.claims.map(
                                    (claim, index) =>
                                        <li
                                            key={index}
                                            className="bg-slate-100 rounded-lg p-3">

                                            <div className="font-medium text-gray-900">{claim.claim}</div>
                                            <div className="text-sm text-gray-900">
                                                {claim.type}
                                                •
                                                {claim.importance}
                                            </div>
                                        </li>
                                )
                            }
                        </ul>
                    </div>

                    {/* Keywords that matches */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-md text-gray-800">Keywords</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {
                                validation.keywords.length === 0 ?
                                    <span className="text-gray-500">No keywords extracted</span>
                                    :
                                    validation.keywords.map(
                                        (k, index) =>
                                            <span
                                                key={index}
                                                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                                                {k}
                                            </span>
                                    )
                            }
                        </div>
                    </div>

                    {/* Warning and desclaimer about claimed */}
                    <div className="mt-6 text-xs text-gray-500">
                        <i>This result is generated using an AI-assisted validation service. It reports extracted claims and source credibility, but it does not guarantee that every claim is true.</i>
                    </div>
                </div>
            </div>
        );
    }
};

export default Validity;