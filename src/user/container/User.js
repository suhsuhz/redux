import React, { useEffect } from 'react';
import { PageHeader, Col, Row, Descriptions, Typography, Space, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions, Types } from '../state';
import useFetchInfo from '../../common/hook/useFetchInfo';
import Department from './Department';
import TagList from './TagList';
import History from '../../common/component/History';
import FetchLabel from '../component/FetchLabel';
import useNeedLogin from '../../common/hook/useNeddLogin';

function User({ match }) {
    useNeedLogin(); // 로그인 안했을시 로그인 페이지로 보내기

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const userHistory = useSelector(state => state.user.userHistory);
    const name = match.params.name;

    useEffect(() => {
        dispatch(actions.fetchUser(name));
        dispatch(actions.fetchUserHistory(name));
    }, [dispatch, name]);

    // 언마운트시 모든 상태값 초기화
    useEffect(() => {
        return () => {
            dispatch(actions.initialize());
        }
    }, [dispatch]);

    //const isFetched = true;
    const { isFetched, isSlow } = useFetchInfo(Types.fetchUser, name);
    return (
        <Row justify="center">
            <Col xs={24} md={20} lg={14}>
                <PageHeader
                    onBack={() => history.push('/')}
                    title={
                        <FetchLabel label="사용자 정보" actionType={Types.FetchUser} />
                        // <Space>
                        // 사용자 정보
                        // {isSlow && <Spin size="small" />}
                        // </Space>
                    }
                >
                    {user?.name}
                    {user && (
                        <Descriptions layout="vertical" bordered column={1}>
                            <Descriptions.Item
                                label="이름">
                                <Typography.Text>{user.name}</Typography.Text>
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={<FetchLabel label="소속" actionType={Types.FetchUpdateUser} fetchKey="department" />}>
                                <Department />
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={<FetchLabel label="태그" actionType={Types.FetchUpdateUser} fetchKey="tag" />}>
                                <TagList />
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="기록">
                                <History items={userHistory} />
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                    {!user && isFetched && (
                        <Typography.Text>존재하지 않는 사용자 입니다.</Typography.Text>
                    )}
                </PageHeader>
            </Col>

        </Row>
    )
}

export default User;
