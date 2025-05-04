import { Titles } from "@/components/titles/titles";
import { Create } from "@/features/language/ui/create";
import { LanguageContent } from "@/features/language/ui/language-content";
import { Stack } from "@mantine/core";
import { openModal } from "@mantine/modals";

export const LanguagesPage = () => {

    const create = () => {
        openModal({ children: <Create />, title: 'Create Language' })
    }

    return (
        <Stack gap={16}>
            <Titles title="Languages" open={create} />
            <LanguageContent />
        </Stack>
    );
}