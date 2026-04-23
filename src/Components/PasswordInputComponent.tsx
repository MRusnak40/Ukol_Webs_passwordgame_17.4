import { useState, useRef } from "react";
import "./CssForComponents/PasswordInput.css";

interface PasswordInputProps {
    password: string;
    setPassword: (password: string) => void;
    onTimeSpentChange: (time: number) => void;
}

function PasswordInput({ password, setPassword, onTimeSpentChange }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const startTimeRef = useRef<number | null>(null);

    const handleFocus = () => {
        // reset cas  i input zacne se znovu
        setTimeSpent(0);
        onTimeSpentChange(0);
        startTimeRef.current = Date.now();
    };

    const handleConfirm = () => {
        if (startTimeRef.current) {
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            // ulozime cas a poslede dal
            setTimeSpent(elapsed);
            onTimeSpentChange(elapsed);
            // prazdny input ale cas zustane
            setPassword('');
            // stop mereni ale dalsi focus ho zapne zase
            startTimeRef.current = null;
        }
    };

    return (
        <>
            <div className="password-input-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-input"
                    onFocus={handleFocus}
                    placeholder="Password"
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
                <button
                    onClick={handleConfirm}
                    className="password-toggle-btn"
                    style={{ background: '#3498db' }}
                >
                    Done
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