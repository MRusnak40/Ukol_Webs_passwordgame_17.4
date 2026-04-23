import './App.css'
import PasswordInputComponent from "./Components/PasswordInputComponent.tsx";
import PasswordStrength from "./Components/PasswordStrength.tsx";

import PasswordTimeValidator from "./Components/PasswordTimeValidator.tsx";
import { useState } from "react";

function App() {
    const [password, setPassword] = useState("");

    const [timeSpent, setTimeSpent] = useState(0);

    return (
        <>
            <div className="app-container">
                <h2 className="app-title">Welcome to the App!</h2>
                <h3 className="app-title">Find how strong is your password</h3>

                <PasswordInputComponent
                    setPassword={setPassword}

                    onTimeSpentChange={setTimeSpent}
                />

                <PasswordStrength password={password} />


                {timeSpent > 0 && (
                    <PasswordTimeValidator password={password} time={timeSpent} />
                )}
            </div>
        </>
    )
}

export default App