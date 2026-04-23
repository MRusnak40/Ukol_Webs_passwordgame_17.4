import { useState, useRef } from "react";
import "./PasswordInput.css";

interface PasswordInputProps {
    setPassword: (password: string) => void;

    onTimeSpentChange: (time: number) => void;
}

function PasswordInput({ setPassword, onTimeSpentChange }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const startTimeRef = useRef<number | null>(null);

    const handleFocus = () => {
        startTimeRef.current = Date.now();
    };

    const handleBlur = () => {
        if (startTimeRef.current) {
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            setTimeSpent(elapsed);
            // 🟢 NOVĚ: odeslat čas rodiči
            onTimeSpentChange(elapsed);
        }
    };

    return ( <>
        <div className="password-input-container">

                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-input"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Password"
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle-btn"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>

        </div>
        <div className="password-input-time">
            {timeSpent > 0 && (
                <span className="time-spent">
                            TYPED IN: {timeSpent}s
                        </span>
            )}
        </div>
        </>
    );
}

export default PasswordInput;