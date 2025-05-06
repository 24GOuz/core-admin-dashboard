import { Button, Flex, Stack } from '@mantine/core'
import { modals } from '@mantine/modals'

type DeleteModalProps<T = number> = {
    id: T
    label: string
    onDelete: (id: T) => void
    isDeleting?: boolean
}

export const DeleteModal = <T extends unknown>({
    id,
    onDelete,
    label,
    isDeleting,
}: DeleteModalProps<T>) => {

    return (
        <Stack>
            <p>{label}</p>
            <Flex gap={8} justify="end" mt={30}>
                <Button
                    type="button"
                    variant="secondry"
                    size="medium"
                    onClick={() => modals.closeAll()}
                >
                    {'Back'}
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    onClick={() => onDelete(id)}
                    loading={isDeleting}
                >
                    {'Delete'}
                </Button>
            </Flex>
        </Stack>
    )
}
