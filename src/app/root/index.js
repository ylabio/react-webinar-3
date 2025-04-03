import React from 'react';
import { Outlet } from 'react-router';
import PageLayout from '../../components/page-layout';
export default function RootLayout (){
    return (
        <>
        <PageLayout>
            <main>
            <Outlet/>
            </main>
        </PageLayout>
        </>
    )

}