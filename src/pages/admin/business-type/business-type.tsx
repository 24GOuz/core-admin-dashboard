import { Titles } from "@/components/titles/titles";
import { Stack } from "@mantine/core";
import { BusinessTypeContent } from "@/features/admin/business-type/ui";
import { openModal } from "@mantine/modals";

export const BusinessTypePage = () => {

    const create = () => {
        openModal({ children: <div>Create</div>, title: 'Create' })
    }

    return (
        <Stack gap={16}>
            <Titles title="Business Type" open={create} />
            <BusinessTypeContent />
        </Stack>
    );
}