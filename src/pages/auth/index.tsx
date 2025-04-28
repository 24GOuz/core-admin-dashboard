import styles from './auth.module.css'

import { LoginForm } from '@/features/auth/login-form/login-form'

const LoginPage = () => {
    return (
        <div className={styles.wrapper}>
            <LoginForm />
        </div>
    )
}

export default LoginPage
