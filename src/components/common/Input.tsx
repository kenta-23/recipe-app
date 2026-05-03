import styles from "./Input.module.css";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
};

export default function Input({value, onChange, placeholder, className}: Props) {
    return (
        <input
            type="text"
            className={`${styles.input} ${className || ""}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}