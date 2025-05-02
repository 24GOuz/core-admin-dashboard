import { Center, Loader } from '@mantine/core'

export default function CustomLoader({ fullScreen = true }: { fullScreen?: boolean }) {
    return (
        <Center style={{ height: fullScreen ? '100vh' : '100%' }}>
            <Loader />
        </Center>
    )
}
