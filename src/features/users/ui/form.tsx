import {
    Button,
    FileButton,
    Flex,
    Stack,
    TextInput,
    PasswordInput,
    Select,
    Group,
    Text,
    Image,
    Box,
    Divider,
    Checkbox,
    NumberInput,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { HiOutlineGlobeAlt, HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineCake } from 'react-icons/hi';
import { useForm, isNotEmpty, isEmail, hasLength, matches } from '@mantine/form';
import { useState } from 'react';
import { UserFormData } from '../types';
import { DateInput } from '@mantine/dates';
import { PatternFormat } from 'react-number-format';

interface UserFormProps {
    submitFn: (values: UserFormData) => void;
    loading: boolean;
    title: string;
    initialState?: UserFormData;
}

const INITIAL_STATE: UserFormData = {
    isActive: true,
    telegramId: 0,
    name: '',
    surname: '',
    birthday: '',
    avatar: '',
    phone: '',
    password: '',
    email: '',
    roles: ['user'],
    isVerified: false,
    gender: 'male',
}

export const UserForm: React.FC<UserFormProps> = ({
    submitFn,
    loading,
    title,
    initialState = INITIAL_STATE,
}) => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(initialState.avatar || null);

    const form = useForm<UserFormData>({
        initialValues: {
            isActive: initialState.isActive || true,
            telegramId: initialState.telegramId || 0,
            name: initialState.name || '',
            surname: initialState.surname || '',
            birthday: initialState.birthday || '',
            gender: initialState.gender || 'male',
            avatar: initialState.avatar || '',
            phone: initialState.phone || '',
            password: initialState.password || '',
            email: initialState.email || '',
            roles: initialState.roles || ['user'],
            isVerified: initialState.isVerified || false,
        },

        validate: {
            name: isNotEmpty('Name is required'),
            surname: isNotEmpty('Surname is required'),
            birthday: isNotEmpty('Birthday is required'),
            gender: isNotEmpty('Gender is required'),
            phone: isNotEmpty('Phone is required'),
            password: hasLength({ min: 8 }, 'Password must be at least 8 characters'),
            email: isEmail('Invalid email'),
        },
    });

    const handleAvatarChange = (file: File | null) => {
        if (!file) return;

        if (file.type !== 'image/svg+xml') {
            alert('Please upload an SVG file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (typeof e.target?.result === 'string') {
                setAvatarPreview(e.target.result);
                form.setFieldValue('avatar', e.target.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (values: UserFormData) => {
        const { avatar, ...rest } = values
        submitFn({ ...rest, telegramId: Number(values.telegramId) })
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <Text size="xl" fw={700}>{title || 'User Registration'}</Text>
                    <Divider />

                    <Flex gap="md" align="flex-start">
                        <Stack style={{ flex: 1 }}>
                            <TextInput
                                label="Name"
                                placeholder="Enter your name"
                                leftSection={<HiOutlineUser size={16} />}
                                required
                                {...form.getInputProps('name')}
                            />

                            <TextInput
                                label="Surname"
                                placeholder="Enter your surname"
                                leftSection={<HiOutlineUser size={16} />}
                                required
                                {...form.getInputProps('surname')}
                            />

                            <DateInput
                                label="Birthday"
                                placeholder="Select your birthday"
                                leftSection={<HiOutlineCake size={16} />}
                                required
                                value={form.values.birthday ? new Date(form.values.birthday) : null}
                                minDate={new Date('1900-01-01')}
                                onChange={(date) => form.setFieldValue('birthday', date ? date.toISOString() : '')}
                                error={form.errors.birthday}
                                styles={{
                                    input: {
                                        paddingLeft: 35,
                                    },
                                }}
                            />

                            <Select
                                label="Gender"
                                placeholder="Select gender"
                                data={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                    { value: 'other', label: 'Other' }
                                ]}
                                required
                                {...form.getInputProps('gender')}
                            />

                            <PatternFormat
                                format="+998 ## ### ## ##"
                                mask=" "
                                allowEmptyFormatting={true}
                                customInput={TextInput}
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                autoFocus
                                size="md"
                                radius="md"
                                {...form.getInputProps('phone')}
                                onValueChange={(values) => {
                                    form.setFieldValue('phone', values.value)
                                }}
                                onChange={() => { }}
                            />
                        </Stack>

                        <Stack style={{ flex: 1 }}>
                            <TextInput
                                label="Email"
                                placeholder="your.email@example.com"
                                leftSection={<HiOutlineMail size={16} />}
                                required
                                {...form.getInputProps('email')}
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Create a strong password"
                                required
                                {...form.getInputProps('password')}
                            />

                            <TextInput
                                label="Telegram ID"
                                placeholder="Your Telegram ID"
                                leftSection={<HiOutlineGlobeAlt size={16} />}
                                {...form.getInputProps('telegramId')}
                            />

                            <Select
                                label="Roles"
                                placeholder="Select roles"
                                data={Object.values(['user', 'admin', 'partner', 'courier']).map(role => ({ value: role, label: role }))}
                                multiple
                                {...form.getInputProps('roles')}
                            // value={form.values.roles}
                            // onChange={(value) => form.setFieldValue('roles', value)}
                            />

                            <Group mt="xs">
                                <Text size="sm">Status</Text>
                                <Group>
                                    <Checkbox
                                        label="Active"
                                        checked={form.values.isActive}
                                        onChange={(event) => form.setFieldValue('isActive', event.currentTarget.checked)}
                                    />

                                    <Checkbox
                                        label="Verified"
                                        checked={form.values.isVerified}
                                        onChange={(event) => form.setFieldValue('isVerified', event.currentTarget.checked)}
                                    />
                                </Group>
                            </Group>
                        </Stack>

                    </Flex>
                    <Stack align="center" style={{ width: 200 }}>
                        <Text size="sm">Avatar</Text>
                        {avatarPreview ? (
                            <Image
                                src={avatarPreview}
                                alt="Avatar preview"
                                width={150}
                                height={150}
                                radius="md"
                            />
                        ) : (
                            <Box
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 'md',
                                    backgroundColor: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text c="gray.6">No image</Text>
                            </Box>
                        )}

                        <FileButton
                            onChange={handleAvatarChange}
                            accept="image/svg+xml"
                            name="avatar"
                        >
                            {(props) => (
                                <Button {...props} variant="outline">
                                    Upload SVG
                                </Button>
                            )}
                        </FileButton>

                        <Text size="xs" c="gray.6">
                            SVG files only
                        </Text>
                    </Stack>

                    <Divider />

                    <Group justify="flex-end">
                        <Button
                            variant="outline"
                            onClick={() => modals.closeAll()}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            {initialState.email ? 'Update' : 'Register'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
};