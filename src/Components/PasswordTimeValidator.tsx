import React from "react";

interface TimeValidatorProps {
    password: string;
    time: number;
    children: (validation: {
        isValid: boolean;
        isTooFast: boolean;
        isTooSlow: boolean;
        message: string;
    }) => React.ReactNode;
}

function PasswordTimeValidator({  time, children }: TimeValidatorProps) {
    const MIN_TIME = 5;
    const MAX_TIME = 20;

    const isTooFast = time < MIN_TIME;
    const isTooSlow = time > MAX_TIME;
    const isValid = time >= MIN_TIME && time <= MAX_TIME;

    let message = '';
    if (isTooFast) message = `⚠️ Too fast (${time} s) – DANGER!`;
    else if (isTooSlow) message = `⏱️ Very slow (${time} s) – YOU OK?`;
    else if (isValid) message = `✅ OK time (typed in ${time} s)`;

    return <>{children({ isValid, isTooFast, isTooSlow, message })}</>;
}

export default PasswordTimeValidator;