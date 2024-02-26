import React, { ChangeEvent } from "react";
import { Button, Input, Space, } from "antd";
import { SkinOutlined, } from "@ant-design/icons";
import { debounce, } from "../../utils/func";
import styles from "../index.module.scss";
// import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch,useAppSelector } from "@/stores/hooks";
import { setColorPrimary, setDark } from "../../stores/slices/theme";
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4280892_pybmn8s64a.js',
});

const RightContent: React.FC = () => {
  const globalTheme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch()

  const changeMainColor = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setColorPrimary(e.target.value))
  };

  return (
    <Space size={18}>
      {globalTheme.dark ? (
        <Button
          icon={<IconFont type="icon-yueliang" />}
          shape="circle"
          onClick={() => {
            dispatch(setDark(false))
          }}
        ></Button>
      ) : (
        <Button
          icon={<IconFont type="icon-sun" />}
          shape="circle"
          onClick={() => {
            dispatch(setDark(true))
          }}
        ></Button>
      )}
      <div className={styles.skin}>
        <Button type="primary" shape="circle" icon={<SkinOutlined />} />
        <Input
          type="color"
          className={styles.skin_input}
          defaultValue={globalTheme.colorPrimary}
          onChange={debounce(changeMainColor, 500)}
        ></Input>
      </div>
    </Space>
  );
};

export default RightContent;