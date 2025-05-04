import { Titles } from "@/components/titles/titles";
import { Stack } from "@mantine/core";
import { BusinessTypeContent } from "@/features/business-type/ui";
import { openModal } from "@mantine/modals";
import { Create } from "@/features/business-type/ui/create";

export const BusinessTypePage = () => {

    const create = () => {
        openModal({ children: <Create />, title: 'Create' })
    }

    return (
        <Stack gap={16}>
            <Titles title="Business Type" open={create} />
            <BusinessTypeContent />
        </Stack>
    );
}