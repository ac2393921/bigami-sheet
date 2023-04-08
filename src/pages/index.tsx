import { HomePage } from '@/components/Pages/Home';
import { Layout } from '@/layouts/Layout';

// const Home: NextPageWithLayout = () => <HomePage />

export default function Home() {
  return (
    <div>
      <Layout>
        <HomePage />
      </Layout>
    </div>
  );
}
