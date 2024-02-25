import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';

/**
 * @param {Object} props - 컴포넌트에 전달되는 props 객체
 * @param {()=>void} props.logout - 로그아웃 함수
 */
function Settings({ logout }) {
    return (
        <Dropdown overlay={<Menu>
            <Menu.Item onClick={logout}>로그아웃</Menu.Item>
        </Menu>} trigger={['click']}
            placement='bottomRight'
        >
            <Button shape="circle" icon={<SettingFilled />}></Button>
        </Dropdown>
    );
}

export default Settings;
