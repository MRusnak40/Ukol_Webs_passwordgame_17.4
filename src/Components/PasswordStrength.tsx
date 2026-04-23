import "./CssForComponents/PasswordStrength.css";

interface PasswordStrengthProps {
    password: string;
}

function PasswordStrength({ password }: PasswordStrengthProps) {

    const checks = {
        typeIn: password.length !==0,
        length: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password),
    };


    const score = Object.values(checks).filter(Boolean).length;


    const getStrengthData = () => {
        if (score===0) return {label: "🤨", color: "#ffffff", width: "0%" };
        if (score === 1) return { label: "broo do some", color: "#000000", width: "4%" };
        if (score === 2) return { label: "weak asf", color: "#870c00", width: "20%" };
        if (score === 3) return { label: "mid", color: "#ff6b23", width: "40%" };
        if (score === 4) return { label: "valid", color: "#c8f10f", width: "70%" };
         return { label: "My boyy best", color: "#2ecc71", width: "100%" };
    };

    const strength = getStrengthData();

    return (
        <div className="strength-meter">
            <div>Síla hesla: <strong>{strength.label}</strong></div>

            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: strength.width, backgroundColor: strength.color }}
                />
            </div>

            <ul className="criteria-list">
                <li className={`criterion ${checks.length ? 'valid' : ''}`}>
                    {checks.length ? '✅' : '○'} Minimum 8 letters
                </li>
                <li className={`criterion ${checks.hasUpper ? 'valid' : ''}`}>
                    {checks.hasUpper ? '✅' : '○'} Big letter
                </li>
                <li className={`criterion ${checks.hasNumber ? 'valid' : ''}`}>
                    {checks.hasNumber ? '✅' : '○'} Number
                </li>
                <li className={`criterion ${checks.hasSpecial ? 'valid' : ''}`}>
                    {checks.hasSpecial ? '✅' : '○'} Special (!@#$%^&*)
                </li>
            </ul>
        </div>
    );
}

export default PasswordStrength;