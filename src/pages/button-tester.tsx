import { useEffect, useState } from "react";
import ProgressButton from "../components/ui/progress-button";

export default function ButtonTester() {
  const [manualProgress, setManualProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setManualProgress((prev) => {
        if (prev < 100) {
          return prev + 5;
        }
        return prev;
      });
    }, 200);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <ProgressButton
        progressType="manual"
        progress={manualProgress}
        successColorClass="teal-500"
        onClick={() => {
          console.log("clicked");
          setManualProgress(0);
        }}
        onComplete={() => console.log("completed")}
        onError={(error) => console.error(error)}
      />
    </div>
  );
}
