import { memo, useState } from 'react';
import { Space, Button, Slider } from 'antd';
import { setValue } from "@/stores/slices/threshold";
import { useDispatch, useSelector } from 'react-redux';

export default memo(function ThresholdMap(props: {
    item: { attribute: string; attributeValue: number; };
    keyIndex: number;
}) {
    const attribute = props.item.attribute;
    const attributeValue = props.item.attributeValue;
    const keyIndex = props.keyIndex;

    const DecimalStep = () => {
        const [inputValue, setInputValue] = useState<number>(attributeValue);
        const thresold = useSelector((state: any) => state.threshold);
        const dispatch = useDispatch()
        const [dounce, setDounce] = useState<boolean>(true)

        const onChange = (value: number) => {
            setInputValue(value);
            const arr = JSON.parse(JSON.stringify(thresold))
            arr[keyIndex] = value
            if (dounce) {
                setDounce(false)
                setTimeout(() => {
                    dispatch(setValue(arr))
                    setDounce(true)
                }, 500)
            }
        };

        return (
            <div style={{ border: '1px solid #ccc', padding: '20px', width: '23%' }} >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }} >
                    <Button size='large' style={{ width: '47%', overflow:'hidden',padding:'0' }} >{attribute}</Button>
                    <Button size='large' style={{ width: '47%' }} >{inputValue}</Button>
                </div>
                <div >
                    <Space
                        style={{
                            width: '100%',
                        }}
                        direction="vertical"
                    >
                        <Slider
                            min={0}
                            max={1}
                            onChange={onChange}
                            value={inputValue}
                            step={0.01}
                        />
                    </Space>
                </div>
            </div>
        )
    };
    return <DecimalStep />
})