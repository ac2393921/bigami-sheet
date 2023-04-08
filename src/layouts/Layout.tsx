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

    {children}
  </>
)