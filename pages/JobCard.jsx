import { React } from 'react'
import { Card, Text, Group } from '@mantine/core';

export default function JobCard({data}) {
    return <Card>{data.title}</Card>
}