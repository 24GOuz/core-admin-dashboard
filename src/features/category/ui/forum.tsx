import {
    Button,
    FileButton,
    Flex,
    Stack,
    TextInput,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { HiOutlineGlobeAlt } from 'react-icons/hi'


export const LanguageForm: React.FC<any> = ({
    submitFn,
    loading,
    title,
    initialState,
}) => {

    return (
        <form onSubmit={() => { }}>
            <Stack>
                <TextInput
                    label={'Name'}
                    placeholder={'Name'}
                    name="name"
                    data-autofocus
                    size="medium"
                    maxLength={20}
                />
                <TextInput
                    label={'Locale'}
                    name="locale"
                    placeholder={'Locale'}
                    size="medium"
                    maxLength={10}
                />

                <Flex align="center" gap={10}>
                    <HiOutlineGlobeAlt size={40} color="#334155" />

                    <FileButton
                        onChange={(file) => {
                            console.log(file)
                        }}
                        accept="image/svg+xml"
                        name="icon"
                    >
                        {(props) => (
                            <Button
                                {...props}
                                bg="var(--mantine-color-primary-6)"
                            >
                                {'Upload Image'}
                            </Button>
                        )}
                    </FileButton>

                    <p style={{ color: '#334155', fontSize: '14px' }}>
                        {'SVG'}
                    </p>
                </Flex>
            </Stack>

            <Flex gap={8} justify="end" mt={30}>
                <Button
                    type="button"
                    variant="secondry"
                    size="medium"
                    onClick={() => modals.closeAll()}
                >
                    {'Back'}
                </Button>
                <Button type="submit" variant="primary" size="medium" loading={loading}>
                    {'Submit'}
                </Button>
            </Flex>
        </form>
    )
}
