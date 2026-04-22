import './App.css'
import PasswordInputComponent from "./Components/PasswordInputComponent.tsx";
import { useState } from "react";
import PasswordStrength from "./Components/PasswordStrength.tsx";

function App() {
    const [password, setPassword] = useState("");

    return (
        <>
            <div className="app-container">
                <h2 className="app-title">Welcome to the App!</h2>
                <h3 className="app-title">Find how strong is your password</h3>


                <PasswordInputComponent setPassword={setPassword} />
                <PasswordStrength password={password}/>


            </div>
        </>
    )
}

export default App