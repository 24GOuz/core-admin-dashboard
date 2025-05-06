import { Titles } from "@/components/titles/titles";
import { Create } from "@/features/users/ui/create";
import { UserContent } from "@/features/users/ui/user-content";
import { Stack } from "@mantine/core";
import { openModal } from "@mantine/modals";

export const UsersPage = () => {

    const create = () => {
        openModal({ children: <Create />, title: 'Create User', size: 'xl', radius: 'md' })
    }

    return (
        <Stack gap={16} style={{ maxWidth: '80vw' }}>
            <Titles title="Users" open={create} />
            <UserContent />
        </Stack>
    );
}