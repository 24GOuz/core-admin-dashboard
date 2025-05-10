import { Edit } from '@/features/organization/ui/edit';
import { useParams } from 'react-router-dom';

export const OrganizationEditPage = () => {
  const { id } = useParams();
  return <Edit id={Number(id)} />;
};
