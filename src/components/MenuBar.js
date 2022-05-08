import React, { useState, useContext } from 'react';
import { Menu } from 'antd';
import { HomeTwoTone, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth';

function MenuBar() {

    const context = useContext(AuthContext);
    
    const pathName = window.location.pathname;
    let path = '/';
    if(pathName === '/' || pathName === '') path = 'home';
    else path = pathName.substring(1);
    const [current, setCurrent] = useState(path);
    const handleClick = (e) => {
        setCurrent(e.key);
    };


    const menu = context.user ? ( 
        
        <Menu onClick={handleClick} selectedKeys={ [current] } mode="horizontal">
        <Menu.Item key="home" icon={ <HomeTwoTone />} >
            <a href="/" >
                {context.user.username}
            </a>
            </Menu.Item>

        <Menu.Item key="logout" icon={ <UserOutlined /> } onClick = {context.logout} >
            <a href="/signin" >
                Logout
            </a>
        </Menu.Item>
      </Menu>

    ) : (
        <Menu onClick={handleClick} selectedKeys={ [current] } mode="horizontal">
        <Menu.Item key="home" icon={ <HomeTwoTone />} >
            <a href="/" >
                Home
            </a>
            </Menu.Item>
        <Menu.Item key="signin" icon={ <UserAddOutlined />} >
            <a href="/signin" >
                SignIn
            </a>
        </Menu.Item>
        <Menu.Item key="signup" icon={ <UserOutlined /> } >
            <a href="/signup" >
                SignUp
            </a>
        </Menu.Item>
      </Menu>
    );



    return menu;
}
export default MenuBar;