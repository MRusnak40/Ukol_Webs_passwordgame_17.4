
interface TimeValidatorProps {
    password: string;
    time: number;
}

function PasswordTimeValidator({ password, time }: TimeValidatorProps) {

    const MIN_TIME = 1;
    const MAX_TIME = 5;

    const isValid = time >= MIN_TIME && time <= MAX_TIME;
    const isTooFast = time < MIN_TIME;
    const isTooSlow = time > MAX_TIME;

    return (
        <div className="time-validator" style={{ marginTop: '1rem' }}>
            {isTooFast && (
                <p style={{ color: 'red' }}>
                    ⚠️ Too fast ( {time} s) – DANGER!
                </p>
            )}
            {isTooSlow && (
                <p style={{ color: 'orange' }}>
                    ⏱️ Wery slow {time} s – YOU OK?
                </p>
            )}
            {isValid && (
                <p style={{ color: 'green' }}>
                    ✅  OK  time (typed in {time} s)
                </p>
            )}

        </div>
    );
}

export default PasswordTimeValidator;