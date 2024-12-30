import styles from './button.module.css'
import Loading from '../Loading/Loading';

interface ButtonProps {
	name: string;
	loading?: boolean;
	disabled?: boolean | undefined;
}

export default function Button({ name, loading, disabled }: ButtonProps) {
	return (
		<button disabled={disabled ? true : false} className={styles.button}>
			{loading ? <Loading /> : name}
		</button>
	)
}