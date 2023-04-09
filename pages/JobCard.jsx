import { Card, Text, Group } from '@mantine/core';

export default function JobCard({data}) {
    return (
        <Card>{data.title}</Card>
    );
}

JobCard.defaultProps = {
    data: {
        'title': "",
        'description': "",
        'contact': "",
        'time-committment': "",
        'minimum commitment': "",
        'start date': "",
        'number of people to fill this role': "",
        'applicant-characteristics': "",
        'Link to more details': ""
    }
};
