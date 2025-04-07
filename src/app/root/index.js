import React from 'react';
import PageLayout from '../../components/page-layout';
export default function RootLayout ({children}){
    return (
        <>
        <PageLayout>
            <main>
            {children}
            </main>
        </PageLayout>
        </>
    )

}