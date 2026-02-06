import { Loader2 } from "lucide-react";

const Loader = ({ size = 48, text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#FF006E]" size={size} />
      {text && <p className="mt-4">{text}</p>}
    </div>
  );
};

export default Loader;