import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData } : {postData: {
  title:string,
  date: string,
  contentHtml: string
}}) {
  return (
    <Layout>
        <Head>
        <title>{postData.title}</title>
        </Head>
        {postData.title}
        <br />
        <Date dateString={postData.date} /> 
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}


