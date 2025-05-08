import { Titles } from "@/components/titles/titles";
import { Stack } from "@mantine/core";
import { CountryContent } from "@/features/country/ui";
import { openModal } from "@mantine/modals";
import { Create } from "@/features/country/ui/create";

export const CountryPage = () => {

    const create = () => {
        openModal({ children: <Create />, title: 'Create' })
    }

    return (
        <Stack gap={16}>
            <Titles title="Country" open={create} />
            <CountryContent />
        </Stack>
    );
}