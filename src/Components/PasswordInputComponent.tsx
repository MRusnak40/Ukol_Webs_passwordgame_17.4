import {useState} from "react";
import "./PasswordInput.css";

interface PasswordInputProps{
    setPassword:(password:string)=>void;
}

function PasswordInput({ setPassword }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="password-input-container">
            <input
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
                placeholder="Password"
            />
            <button
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
    );
}

export default PasswordInput;


