import { Titles } from "@/components/titles/titles";
import { Stack } from "@mantine/core";
import { RegionContent } from "@/features/region/ui";
import { openModal } from "@mantine/modals";
import { Create } from "@/features/region/ui/create";

export const RegionPage = () => {

    const create = () => {
        openModal({ children: <Create />, title: 'Create' })
    }

    return (
        <Stack gap={16}>
            <Titles title="Region" open={create} />
            <RegionContent />
        </Stack>
    );
}