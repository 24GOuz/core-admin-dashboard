import { Titles } from "@/components/titles/titles";
import { Stack } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { LanguageContent } from "@/features/admin/language/ui/language-content";

export const LanguagesPage = () => {

    const create = () => {
        openModal({ children: <div>Create</div>, title: 'Create' })
    }

    return (
        <Stack gap={16}>
            <Titles title="Languages" open={create} />
            <LanguagesContent />
        </Stack>
    );
}