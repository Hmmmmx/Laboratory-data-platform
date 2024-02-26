import { Card, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export default function CompanyRating() {
    const ratings = useSelector((state: any) => state.ratings)
    const [rating, setRating] = useState(ratings)
    const [lastRating, setLastRating] = useState(ratings)
    useEffect(() => {
        setLastRating(rating)
        setRating(ratings)
    }, [ratings])
    return (
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <Card title="公司优化前评分" bordered={true} style={{ margin: '20px 0', border: '1px solid rgb(187, 187, 187)', backgroundColor: 'rgba(0, 0, 0, 0)', width: '46%' }}>
                <p style={{ fontSize: '24px', color: 'rgb(33,84,118)' }}>{Math.round(lastRating)}</p>
                <Rate allowHalf disabled value={(Math.round(lastRating)/2) / 10} />
            </Card>
            <Card title="公司优化后评分" bordered={true} style={{ margin: '20px 0', border: '1px solid rgb(187, 187, 187)', backgroundColor: 'rgba(0, 0, 0, 0)', width: '46%' }}>
                <p style={{ fontSize: '24px', color: 'rgb(33,84,118)' }}>{Math.round(rating)}</p>
                <Rate allowHalf disabled value={(Math.round(rating)/2) / 10} />
            </Card>
        </div>
    )
}