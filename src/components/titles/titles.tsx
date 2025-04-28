import React from 'react'
import { Button, Flex, Text } from '@mantine/core'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import classes from './titles.module.css'

type TTitleProps = {
    title: string
    open?: () => void
}

export const Titles: React.FC<TTitleProps> = ({ title, open }) => {
    return (
        <Flex justify={'space-between'} align={'center'} w="100%">
            <Text size="xl" fw={600} className={classes.title}>
                {title}
            </Text>
            {open ? (
                <Button
                    variant="filled"
                    color="blue"
                    leftSection={<HiOutlinePlusCircle size={20} />}
                    onClick={open}
                    size="md"
                    radius="md"
                    className={classes.button}
                >
                    Create
                </Button>
            ) : (
                ''
            )}
        </Flex>
    )
}
