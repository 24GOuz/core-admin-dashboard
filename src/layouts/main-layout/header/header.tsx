import { Box, Group, Text, ActionIcon, Avatar } from '@mantine/core'
import { FaSearch, FaBell } from 'react-icons/fa'
import styles from './header.module.css'

export const Header = () => {
    return (
        <Box className={styles.header}>
            <Group justify="space-between" align="center">
                <Text size="xl" fw={600}>Dashboard</Text>
                <Group gap={16}>
                    <ActionIcon variant="subtle" size="lg" radius="xl">
                        <FaSearch size={18} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="lg" radius="xl">
                        <FaBell size={18} />
                    </ActionIcon>
                    <Group gap={8}>
                        <Avatar radius="xl" size="sm" />
                        <Text size="sm" fw={500}>Admin User</Text>
                    </Group>
                </Group>
            </Group>
        </Box>
    )
} 