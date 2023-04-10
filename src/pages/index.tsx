import { HomePage } from '@/components/Pages/Home';
import { getLayout } from '@/layouts/Layout';

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}

Home.getLayout = getLayout