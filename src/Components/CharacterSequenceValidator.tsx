interface SequenceValidatorProps {
    password: string;
    children: (result: {
        isValid: boolean;
        count: number;
    }) => React.ReactNode;
}

function CharacterSequenceValidator({ password, children }: SequenceValidatorProps) {
    let count = 0;

    const isLower = (ch: string) => /[a-z]/.test(ch);
    const isUpper = (ch: string) => /[A-Z]/.test(ch);
    const isDigit = (ch: string) => /[0-9]/.test(ch);
    const isSpecial = (ch: string) => /[!@#$%^&*]/.test(ch);

    for (let i = 0; i <= password.length - 4; i++) {
        const types = new Set<string>();
        const slice = password.slice(i, i + 4);

        for (const char of slice) {
            if (isLower(char)) types.add('lower');
            else if (isUpper(char)) types.add('upper');
            else if (isDigit(char)) types.add('digit');
            else if (isSpecial(char)) types.add('special');
        }


        if (types.size === 4) {
            count++;
            i += 3;
        }
    }

    const isValid = count > 0;
    return <>{children({ isValid, count })}</>;
}

export default CharacterSequenceValidator;