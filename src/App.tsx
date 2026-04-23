import './App.css'
import PasswordInputComponent from "./Components/PasswordInputComponent.tsx";
import PasswordStrength from "./Components/PasswordStrength.tsx";
import PasswordTimeValidator from "./Components/PasswordTimeValidator.tsx";
import CharacterSequenceValidator from "./Components/CharacterSequenceValidator.tsx"; // 🟢 import
import { useState } from "react";

function App() {
    const [password, setPassword] = useState("");
    const [timeSpent, setTimeSpent] = useState(0);

    return (
        <div className="app-container">
            <h2 className="app-title">Welcome to the App!</h2>
            <h3 className="app-title">Find how strong is your password</h3>

            <PasswordInputComponent
                setPassword={setPassword}
                onTimeSpentChange={setTimeSpent}
            />

            <PasswordStrength password={password} />

            {timeSpent > 0 && (
                <PasswordTimeValidator password={password} time={timeSpent}>
                    {(validation) => (
                        <div style={{ marginTop: '1rem' }}>
                            <p style={{ color: validation.isTooFast ? 'red' : validation.isTooSlow ? 'orange' : 'green' }}>
                                {validation.message}
                            </p>
                        </div>
                    )}
                </PasswordTimeValidator>
            )}


            <CharacterSequenceValidator password={password}>
                {({ isValid, count }) => (
                    <div style={{ marginTop: '1rem' }}>
                        <strong>Sequence check:</strong>
                        {isValid
                            ? <p style={{ color: 'green' }}>✅ Found {count} valid sequence(s)</p>
                            : <p style={{ color: 'red' }}>❌ No valid sequence – needs lower, upper, digit, special in a row</p>
                        }
                    </div>
                )}
            </CharacterSequenceValidator>
        </div>
    );
}

export default App;