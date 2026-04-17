import {useState} from "react";

interface PasswordInputProps{
    setPassword:(password:string)=>void;
}

function PasswordInput({setPassword}:PasswordInputProps){

    const [showPassword, setShowPassword] = useState(false)
    return <>
        <input
            // Dynamická změna typu inputu podle stavu showPassword
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', flex: 1 }}
            placeholder="Tvoje tajné heslo"
        />
        <button
            onClick={() => setShowPassword(!showPassword)}
            style={{ padding: '8px', cursor: 'pointer' }}
        >
            {showPassword ? 'Skrýt' : 'Zobrazit'}
        </button>


    </>
}


export default PasswordInput;