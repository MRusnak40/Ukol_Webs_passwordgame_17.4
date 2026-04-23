interface SequenceValidatorProps {
    password: string;
    // validacni objekty
    children: (result: {
        isValid: boolean;
        count: number; // valid sekvence
    }) => React.ReactNode;
}


function CharacterSequenceValidator({ password, children }: SequenceValidatorProps) {
    const requiredTypes = ['lower', 'upper', 'digit', 'special'] as const;
    let count = 0;
    const currentTypes = new Set<string>();

    const isLower = (ch: string) => /[a-z]/.test(ch);
    const isUpper = (ch: string) => /[A-Z]/.test(ch);
    const isDigit = (ch: string) => /[0-9]/.test(ch);
    // Speciální znaky – sjednoceno s PasswordStrength
    const isSpecial = (ch: string) => /[!@#$%^&*]/.test(ch);

    for (const char of password) {
        if (isLower(char)) currentTypes.add('lower');
        else if (isUpper(char)) currentTypes.add('upper');
        else if (isDigit(char)) currentTypes.add('digit');
        else if (isSpecial(char)) currentTypes.add('special');

        // validni sekvence pokud jsou vsechny 4 veci aktivni
        if (currentTypes.size === requiredTypes.length) {
            count++;
            currentTypes.clear(); // reset pro hledani dalsi
        }
    }

    const isValid = count > 0;
    return <>{children({ isValid, count })}</>;
}

export default CharacterSequenceValidator;