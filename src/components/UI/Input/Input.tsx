import styles from './input.module.css';

interface InputProps {
  type: string;
  value: string;
  name: string;
  placeholder: string;
  setValue: (value: string) => void;
}

export default function Input({value, type, name, placeholder, setValue}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={placeholder}
      required
    />
  )
}