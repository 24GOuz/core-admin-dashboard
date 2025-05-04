import { Stack } from '@mantine/core'
import { Titles } from '@/components/titles/titles'
import Map from '@/features/dashboard/leaflet/map'

export const DashboardPage = () => {
    return (
        <Stack gap={16}>
            <Titles title="Dashboard" />
            <Map />
        </Stack>
    )
}