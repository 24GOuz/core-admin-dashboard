import { useState } from 'react'
import { MainLayout } from '@/layouts/main-layout/main-layout'
import { MTable } from '@/components/m-table/m-table'
import { Button, Group, Modal, Stack, TextInput, Select, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import type { MRT_ColumnDef } from 'mantine-react-table'
import { Titles } from '@/components/titles/titles'

interface User {
    id: number
    name: string
    email: string
    role: string
    status: 'Active' | 'Inactive'
    createdAt: string
    lastLogin: string
}

const mockUsers: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        createdAt: '2024-01-01',
        lastLogin: '2024-03-15',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Active',
        createdAt: '2024-01-15',
        lastLogin: '2024-03-14',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'Editor',
        status: 'Inactive',
        createdAt: '2024-02-01',
        lastLogin: '2024-03-01',
    },
    {
        id: 4,
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'User',
        status: 'Active',
        createdAt: '2024-02-15',
        lastLogin: '2024-03-13',
    },
    {
        id: 5,
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        role: 'Admin',
        status: 'Active',
        createdAt: '2024-01-20',
        lastLogin: '2024-03-15',
    },
]

const columns: MRT_ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => {
            const value = cell.getValue() as 'Active' | 'Inactive'
            return (
                <Text color={value === 'Active' ? 'green' : 'red'}>
                    {value}
                </Text>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },
    {
        accessorKey: 'lastLogin',
        header: 'Last Login',
    },
]

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>(mockUsers)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [opened, { open, close }] = useDisclosure(false)
    const [modalType, setModalType] = useState<'edit' | 'delete' | 'create'>('create')
    const [formData, setFormData] = useState<Partial<User>>({})

    const handleEdit = (id: number) => {
        const user = users.find(u => u.id === id)
        if (user) {
            setSelectedUser(user)
            setFormData(user)
            setModalType('edit')
            open()
        }
    }

    const handleDelete = (id: number) => {
        const user = users.find(u => u.id === id)
        if (user) {
            setSelectedUser(user)
            setModalType('delete')
            open()
        }
    }

    const handleCreate = () => {
        setSelectedUser(null)
        setFormData({})
        setModalType('create')
        open()
    }

    const handleSave = () => {
        if (modalType === 'create') {
            const newUser = {
                ...formData,
                id: Math.max(...users.map(u => u.id)) + 1,
                createdAt: new Date().toISOString().split('T')[0],
                lastLogin: new Date().toISOString().split('T')[0],
            } as User
            setUsers([...users, newUser])
            notifications.show({
                title: 'Success',
                message: 'User created successfully',
                color: 'green',
            })
        } else if (modalType === 'edit' && selectedUser) {
            setUsers(users.map(u =>
                u.id === selectedUser.id ? { ...u, ...formData } : u
            ))
            notifications.show({
                title: 'Success',
                message: 'User updated successfully',
                color: 'green',
            })
        }
        close()
    }

    const handleDeleteConfirm = () => {
        if (selectedUser) {
            setUsers(users.filter(u => u.id !== selectedUser.id))
            notifications.show({
                title: 'Success',
                message: 'User deleted successfully',
                color: 'green',
            })
            close()
        }
    }

    const create = () => {
        // openModal({ children: <Create />, title: t('roles.create') })
    }


    return (
        <Stack gap={16}>
            <Titles title="users" open={create} />
            <MTable
                data={users}
                columns={columns}
                editM={handleEdit}
                deleteM={handleDelete}
                onCreate={handleCreate}
            />

            <Modal
                opened={opened}
                onClose={close}
                title={modalType === 'delete' ? 'Delete User' : 'User Details'}
            >
                {modalType === 'delete' ? (
                    <Stack>
                        <Text>Are you sure you want to delete {selectedUser?.name}?</Text>
                        <Group justify="flex-end" mt="md">
                            <Button variant="default" onClick={close}>
                                Cancel
                            </Button>
                            <Button color="red" onClick={handleDeleteConfirm}>
                                Delete
                            </Button>
                        </Group>
                    </Stack>
                ) : (
                    <Stack>
                        <TextInput
                            label="Name"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextInput
                            label="Email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Select
                            label="Role"
                            value={formData.role || ''}
                            onChange={(value) => setFormData({ ...formData, role: value || '' })}
                            data={['Admin', 'User', 'Editor']}
                        />
                        <Select
                            label="Status"
                            value={formData.status || ''}
                            onChange={(value) => setFormData({ ...formData, status: value as 'Active' | 'Inactive' })}
                            data={['Active', 'Inactive']}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button variant="default" onClick={close}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                Save
                            </Button>
                        </Group>
                    </Stack>
                )}
            </Modal>
        </Stack>
    )
}