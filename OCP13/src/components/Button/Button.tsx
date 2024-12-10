import { ButtonProps } from "@/types/types";
import './Button.scss';

const Button: React.FC<ButtonProps> = ({ className, text, onClick }) => {
    return (
        <button className={`${className} button`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
