import { HomePage } from '@/components/Pages/Home';
import { getLayout } from '@/layouts/Layout';
// const Home: NextPageWithLayout = () => <HomePage />

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}

Home.getLayout = getLayout