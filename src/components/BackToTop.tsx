import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function BackToTop() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setIsButtonVisible(false);
      });
    };
  }, [isButtonVisible]);
  return (
    <button
      className={`fixed bottom-[75px] right-5 bg-slate-800 text-white p-2 rounded-full ${
        isButtonVisible ? "block" : "hidden"
      }`}
      aria-label="Back to top button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}

export default BackToTop;
