import { Box, NavLink, Text } from '@mantine/core'
import { FaHome, FaUsers, FaBox, FaBuilding, FaUser, FaUserTie, FaTruck, FaBacteria, FaLanguage } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './navbar.module.css'
import { ROUTES } from '../../../constants/routes'


const navItems = [
    {
        label: 'Dashboard',
        icon: <FaHome size={20} />,
        path: ROUTES.home
    },
    {
        label: 'Categories',
        icon: <FaBox size={20} />,
        path: ROUTES.categories
    },
    {
        label: 'Business Types',
        icon: <FaBacteria size={20} />,
        path: ROUTES.businessTypes
    },
    {
        label: 'Organizations',
        icon: <FaBuilding size={20} />,
        path: ROUTES.organizations
    },
    {
        label: 'Users',
        icon: <FaUsers size={20} />,
        path: ROUTES.users
    },
    {
        label: 'Clients',
        icon: <FaUser size={20} />,
        path: ROUTES.clients
    },
    {
        label: 'Couriers',
        icon: <FaTruck size={20} />,
        path: ROUTES.couriers
    },
    {
        label: 'Languages',
        icon: <FaLanguage size={20} />,
        path: ROUTES.languages
    }
]

export const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    return (
        <Box className={styles.navbar}>
            <Box className={styles.logo}>
                <Text size="xl" fw={700}>Admin Panel</Text>
            </Box>
            <Box className={styles.links}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        label={item.label}
                        leftSection={item.icon}
                        active={currentPath === item.path}
                        className={styles.link}
                        onClick={() => navigate(item.path)}
                    />
                ))}
            </Box>
        </Box>
    )
} 