import { useState, Suspense, useEffect } from 'react';
import Optimize from "./Optimize";
import Loading from './components/Loading'
import Threshold from './Threshold';
import { getCorporations } from './api/request';
import CompanyRating from './components/CompanyRating';

export default function Detail({ id }: { id: number }) {
    const [corporation, setCorporation] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const corporationSelected = (data: string) => {
        setCorporation(data)
    }
    useEffect(() => {
        getCorporations().then(res => {
            setCorporation(res.data[0]);
            setIsLoading(false);
        })
    }, [])
    return (
        <Suspense fallback={<Loading />}>
            {isLoading ? <Loading /> :
                <div id={String(id)}>
                    <Threshold id={id} corporationSelected={corporationSelected} />
                    <CompanyRating></CompanyRating>
                    <Optimize corporation={corporation} />
                </div>
            }
        </Suspense>
    )
}
