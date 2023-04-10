import Header from "@/components/Header/header";
import Sidebar from "@/components/Sidebar/sidebar";
import { ReactElement } from 'react';

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />

    <Sidebar />

    <div className="bg-[url('/images/bg.jpg')] h-screen p-4 sm:ml-32">
      {children}
    </div>
  </>
)

export const getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>
}