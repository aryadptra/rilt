import ArticleBlock from '@/Components/ArticleBlock';
import Container from '@/Components/Container'
import Grid from '@/Components/Grid';
import Hero from '@/Components/Hero'
import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react';

const Index = ({ articles }) => {
    const filteredArticles = articles.data.filter(article => article.status === 2);
    return (
        <>
            <Head title="Artikel" />
            <Hero>
                <Hero.Title>Artikel Terkini</Hero.Title>
                <Hero.Subtitle>
                    Pelajari artikel terkini yang pernah saya seputar web programming
                </Hero.Subtitle>
                <Hero.Content>
                    <p>
                        Informasi seputar web programming dapat kamu lihat di website ini. Saya juga terbuka jika ada pertanyaan dan konsultasi mengenai web programming.
                    </p>
                </Hero.Content>
            </Hero>
            <Container>
                {filteredArticles.length > 0 ? (
                    <Grid cols={3}>
                        {filteredArticles.map((article, index) => (
                            <ArticleBlock article={article} key={index} />
                        ))}
                    </Grid>
                ) : (
                    <div className="px-4 md:px-0">No articles yet.</div>
                )}
            </Container>
        </>
    )
}

Index.layout = page => <AppLayout children={page} title="Inertia" />

export default Index
