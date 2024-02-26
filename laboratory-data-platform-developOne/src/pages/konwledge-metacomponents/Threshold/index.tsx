import { useEffect, useState } from 'react';
import { Select } from 'antd';
import ThresholdMap from '@/pages/konwledge-metacomponents/components/ThresholdMap';
import { getBirthInfo, getCorporations, getCost, getQuality, getService, getStaff } from '../api/request';
import { getRating } from '@/stores/slices/ratings';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

let corporationData: any[] = []

const titleOptions = [
    '成本优化指标', '服务优化指标', '质量优化指标', '效率优化指标'
]

const thresholdData = [[{ 'attribute': '生产产品费用', 'attributeValue': 0.5 }, { 'attribute': '货物运输费用', 'attributeValue': 0.5 }, { 'attribute': '人工费用', 'attributeValue': 0.5 }],
[{ 'attribute': '服务评价', 'attributeValue': 0.5 }, { 'attribute': '产品销量', 'attributeValue': 0.5 }, { 'attribute': '销售营收', 'attributeValue': 0.5 }],
[{ 'attribute': '生产产品质量', 'attributeValue': 0.5 }, { 'attribute': '总收入', 'attributeValue': 0.5 }, { 'attribute': '利润', 'attributeValue': 0.5 }],
[{ 'attribute': '产品产量', 'attributeValue': 0.5 }, { 'attribute': '货物运输费用', 'attributeValue': 0.5 }, { 'attribute': '员工数量', 'attributeValue': 0.5 }]]

export default function Threshold(props: { corporationSelected: any; id: number; }) {
    const { id } = props
    const [corporationSelected, setCorporationSelected] = useState('')
    const dispatch = useDispatch()
    const thresold = useSelector((state: any) => state.threshold, shallowEqual);

    useEffect(() => {
        getCorporations().then(res => {
            setCorporationSelected(res.data[0])
            corporationData = res.data.map((item: string) => {
                return {
                    'label': item,
                    'value': item
                }
            });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // 企业选择器
    const handleChange = (value: string) => {
        setCorporationSelected(value)
        props.corporationSelected(value)
    };

    useEffect(() => {
        updateDataClick()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [thresold[0], thresold[1], thresold[2]])

    useEffect(() => {
        dispatch(getRating(0))
        updateDataClick()
    }, [corporationSelected, id])

    async function updateDataClick() {
        if (!corporationSelected) {
            return
        }
        if (id == 1) {
            getCost(corporationSelected).then(res => {
                const { production, transportation, salary } = res.data
                const rating = (production * thresold[0] + transportation * thresold[1] + salary * thresold[2]) % 99
                dispatch(getRating(rating))
            })
        } else if (id == 2) {
            getService(corporationSelected).then(res => {
                const { score, quantity, income } = res.data
                if (!score || !quantity || !income) {
                    dispatch(getRating(0))
                    return
                }
                const rating = (score * thresold[0] + quantity * thresold[1] + income * thresold[2]) % 99
                dispatch(getRating(rating))
            })
        } else if (id == 3) {
            getQuality(corporationSelected).then(res => {
                const { quality, revenue, profit } = res.data
                const rating = (quality * thresold[0] + revenue * thresold[1] + profit * thresold[2]) % 99
                dispatch(getRating(rating))
            })
        } else {
            const quantityData = (await getBirthInfo(corporationSelected)).data
            let quantity = 0
            quantityData.forEach((item: any) => {
                quantity += item.quantity
            })
            const { transportation } = (await getCost(corporationSelected)).data
            let amount = 0
            const staffData = (await getStaff(corporationSelected)).data
            staffData.forEach((item: any) => {
                amount += item.amount
            })
            const rating = (quantity * thresold[0] + transportation * thresold[1] + amount * thresold[2]) % 99
            dispatch(getRating(rating))
        }
    }

    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <p style={{ marginBottom: '44px', fontSize: '20px', color: 'rgb(33,84,118)' }} >{titleOptions[id - 1]}</p>
                    <div style={{ display: 'flex' }}>
                        <Select
                            size='large'
                            style={{
                                width: 120,
                            }}
                            value={corporationSelected}
                            onChange={handleChange}
                            options={corporationData}
                        />
                        {/* <div>
                            <Button size='large' style={{ marginLeft: 20 }} onClick={(event) => {
                                if (event.isTrusted) {
                                    updateDataClick()
                                }
                            }} >数据优化</Button>
                        </div> */}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                    {thresholdData[id - 1].map((item, index) => (< ThresholdMap item={item} key={index} keyIndex={index} />))}
                </div >
            </div >
        </>
    )
}