export type FeatureProps = {
    img: string,
    title: string,
    text: string,
}

export type LayoutProps = {
    children: JSX.Element;
}

export type ButtonProps = {
    className?: string;
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type InputProps = {
    className: string,
    htmlFor: string,
    type: string,
    id: string,
    text: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type UserState = {
    token: string | null;
    user: {
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type TransactionSectionProps = {
    title: string;
    amount: string;
    description: string;
}