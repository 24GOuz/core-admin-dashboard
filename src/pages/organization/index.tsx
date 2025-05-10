import { useNavigate } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { Titles } from '@/components/titles/titles';
import { OrganizationContent } from '@/features/organization/ui/content';
import { ROUTES } from '@/shared/constants/routes';

export const OrganizationPage = () => {
  const navigate = useNavigate();
  const create = () => {
    navigate(ROUTES.organizations + '/create');
  };

  return (
    <Stack gap={16} style={{ maxWidth: '80vw' }}>
      <Titles title="Organizations" open={create} />
      <OrganizationContent />
    </Stack>
  );
};
