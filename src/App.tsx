import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import PasswordInputComponent from "./Components/PasswordInputComponent.tsx";
import PasswordStrength from "./Components/PasswordStrength.tsx";
import PasswordTimeValidator from "./Components/PasswordTimeValidator.tsx";
import CharacterSequenceValidator from "./Components/CharacterSequenceValidator.tsx";
import { useEffect, useState } from "react";

function evaluatePassword(password: string): string {
    const checks = {
        typeIn: password.length !== 0,
        length: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
    };
    const score = Object.values(checks).filter(Boolean).length;

    if (score <= 1) return "Slabé";
    if (score <= 3) return "Střední";
    return "Silné";
}

function App() {
    const [password, setPassword] = useState("");
    const [timeSpent, setTimeSpent] = useState(0);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
        if (saved === "light" || saved === "dark") return saved;
        if (typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        }
        return "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const strength = evaluatePassword(password);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPasswordStrength(prev => prev !== strength ? strength : prev);
    }, [password]);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    return (
        <>
            <div className="app-container container card shadow-lg p-4 position-relative">
                <button
                    className="btn btn-sm btn-outline-secondary theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    title="Přepnout světlý/tmavý režim"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>

                <h2 className="app-title text-center mb-2">Welcome to the App!</h2>
                <h3 className="app-title text-center mb-4" style={{ color: 'var(--muted-color)' }}>
                    Find how strong is your password
                </h3>

                <PasswordInputComponent
                    password={password}
                    setPassword={setPassword}
                    onTimeSpentChange={setTimeSpent}
                />

                <PasswordStrength password={password} strengthLabel={passwordStrength} />

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
        </>
    );
}

export default App;