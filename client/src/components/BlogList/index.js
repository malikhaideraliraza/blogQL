import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';

//antd assets
import { List, Tooltip } from 'antd';

//query
import { VIEW_POST } from '../../queries/post'

const BlogList = () => {
  const { data, loading, error, refetch } = useQuery(VIEW_POST);

  useEffect(async () => {
    await refetch()
  }, [])

  if (error) return <div>Error: { error }</div>
  
  if (loading) return <div>Loading...</div>
  
  return (
    <List 
      itemLayout = "vertical"
      size = "large"
      pagination={{ pageSize: 10 }}
      dataSource={data.posts.posts}
      renderItem={ item => (
        <List.Item key={item._id} className="post-item">
          <List.Item.Meta
            title={
              <Tooltip placement="topLeft" title={"Click To View Details"}>
                <Link to={{ pathname: "/post-details", state: { post: item }}}>{ item.title }</Link>
              </Tooltip>
            }
            description={`on ${(new Date(item.createdAt)).toLocaleString()} by ${item.createdBy.name}`}
          />
          {`${item.body.substring(0,250)} ........`}
        </List.Item>
      )}
    />
  )
}

export default BlogList;
