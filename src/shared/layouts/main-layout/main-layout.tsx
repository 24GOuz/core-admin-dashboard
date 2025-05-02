import { Box } from '@mantine/core'
import { Navbar } from './navbar/navbar'
import { Header } from './header/header'
import styles from './main-layout.module.css'
import { useGetMeQuery } from '@/features/auth/queries/auth-queries'
interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Box className={styles.container}>
            <Navbar />
            <Box className={styles.main}>
                <Header />
                <Box className={styles.content}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
} 