import React from 'react';
import Container from '@/Components/Container';
import Pagination from '@/Components/Pagination';
import { Head, Link } from '@inertiajs/react';
import Table from '@/Components/Table';
import useSwal from '@/Hooks/useSwal';
import clsx from 'clsx'
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function SeriesTable(props) {
    const { data: series, meta, links } = props.series;
    const { ask } = useSwal();
    return (
        <>
            <Head title="Series" />
            <Container className='mt-5'>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th>#</Table.Th>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Tags</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <th></th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {series.length ? (
                            series.map((serie, i) => (
                                <tr key={serie.id}>
                                    <Table.Td>{meta.from + i}</Table.Td>
                                    <Table.Td>
                                        <Link href={route('series.show', serie.slug)}>
                                            {serie.title}
                                        </Link>
                                    </Table.Td>
                                    <Table.Td>
                                        <Link href={serie.category.url}>
                                            {serie.category.name}
                                        </Link>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-x-1">
                                            {serie.tags.map((tag, i) => (
                                                <Link className='bg-gray-100 hover:bg-gray-300 transition font-medium text-xs px-2 py-1 rounded' href={tag.url} key={i}>
                                                    {tag.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <span className={clsx(
                                            serie.status == 'Published' && 'bg-green-100 text-green-800',
                                            serie.status == 'Unpublished' && 'bg-orange-100 text-orange-800',
                                            serie.status == 'Preview' && 'bg-sky-100 text-sky-800',
                                            'px-2 py-1 rounded text-xs font-semibold'
                                        )}>
                                            {serie.status}
                                        </span>
                                    </Table.Td>
                                    <td>
                                        <Table.Dropdown>
                                            <Table.DropdownItem
                                                href={route(
                                                    'series.show',
                                                    serie.slug
                                                )}
                                            >
                                                View
                                            </Table.DropdownItem>
                                            <Table.DropdownItem
                                                href={route(
                                                    'series.edit',
                                                    serie.slug
                                                )}
                                            >
                                                Edit
                                            </Table.DropdownItem>
                                            <Table.DropdownButton
                                                onClick={() => {
                                                    ask({
                                                        url: route('series.destroy', serie.slug),
                                                        method: "delete",
                                                        message: "You sure you want to delete it ?"
                                                    })
                                                }}
                                                className="hover:bg-rose-50 hover:text-rose-500"
                                            >
                                                Delete
                                            </Table.DropdownButton>
                                        </Table.Dropdown>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <Table.Td>
                                    <p>You don't have any series yet.</p>
                                </Table.Td>
                            </tr>
                        )}
                    </Table.Tbody>
                </Table>
                <Pagination {...{ meta, links }} />
            </Container>
        </>
    );
}

SeriesTable.layout = (page) => <DashboardLayout children={page} />;
