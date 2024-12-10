import { InputProps } from "@/types/types";
import './Input.scss';

const Input: React.FC<InputProps> = ({ className, htmlFor, type, id, text, onChange }) => {
    return (
        <div className={className}>
            <label htmlFor={htmlFor}>{text}</label>
            <input type={type} id={id} onChange={onChange} />
        </div>
    );
};

export default Input;
