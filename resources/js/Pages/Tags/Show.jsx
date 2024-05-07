import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Container from '@/Components/Container';
import Grid from '@/Components/Grid';
import ArticleBlock from '@/Components/ArticleBlock';
import Pagination from '@/Components/Pagination';

export default function Show({ tag, ...props }) {
    const { data: articles, meta, links } = props.articles;
    return (
        <div>
            <Head title={tag.name} />
            <Hero>
                <Hero.Title>{tag.name}</Hero.Title>
                <Hero.Subtitle>
                    This page will show you the articles about {tag.name}
                </Hero.Subtitle>
            </Hero>

            <Container>
                {articles.length ? (
                    <>
                        <Grid className='items-start'>
                            {articles.map((article) => (
                                <ArticleBlock
                                    article={article}
                                    key={article.slug}
                                />
                            ))}
                        </Grid>
                        <Pagination {...{ meta, links }} />
                    </>
                ) : (
                    <p>No articles yet.</p>
                )}
            </Container>
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
