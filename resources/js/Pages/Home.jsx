import ArticleBlock from '@/Components/ArticleBlock'
import Container from '@/Components/Container'
import Grid from '@/Components/Grid'
import Hero from '@/Components/Hero'
import AppLayout from '@/Layouts/AppLayout'
import { Head, Link } from '@inertiajs/react'

const Home = ({ articles }) => {
    const filteredArticles = articles.data.filter(article => article.status === 2);
    return (
        <>
            <Head title="Home" />
            <Hero>
                <Hero.Title>Halo 👋, Saya Arya</Hero.Title>
                <Hero.Subtitle>
                    Saya adalah seorang software developer yang saat ini bekerja remote untuk perusahaan di Jakarta dan Bogor.
                </Hero.Subtitle>
                <Hero.Content>
                    <p>
                        Informasi seputar web programming dapat kamu lihat di website ini. Saya juga terbuka jika ada pertanyaan dan konsultasi mengenai web programming.
                    </p>
                </Hero.Content>
            </Hero>
            <Container>
                {filteredArticles.length > 0 ? (
                    <>
                        <Grid className='items-start'>
                            {filteredArticles.map((article) => (
                                <ArticleBlock article={article} key={article.slug} />
                            ))}
                        </Grid>
                        <Link className='text-blue-600 block mt-10' href={route('articles.index')}>Show more articles.</Link>
                    </>
                ) : (
                    <p>No articles yet.</p>
                )}
            </Container>
        </>
    )
}

Home.layout = page => <AppLayout children={page} title="Inertia" />

export default Home
