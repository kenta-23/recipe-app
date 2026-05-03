import styles from "./Textarea.module.css";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
};

export default function Textarea({value, onChange, placeholder, className}: Props) {
    return (
        <textarea
          className={`${styles.textarea} ${className || ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
    );
}