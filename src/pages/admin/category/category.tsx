import { Titles } from "@/components/titles/titles";
import { Stack } from "@mantine/core";
import { CategoryContent } from "@/features/admin/category/ui";
import { openModal } from "@mantine/modals";

export const CategoryPage = () => {

    const create = () => {
        openModal({ children: <div>Create</div>, title: 'Create' })
    }

    return (
        <Stack gap={16}>
            <Titles title="Category" open={create} />
            <CategoryContent />
        </Stack>
    );
}