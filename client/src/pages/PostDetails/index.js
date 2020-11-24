import React, { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client';

//antd assets/components
import { Card } from 'antd';
import { LikeTwoTone, LikeOutlined } from '@ant-design/icons';

//component
import Reactions from '../../components/Reactions';

//mutations
import { CANCEL_LIKE } from '../../mutations/likes'
import { ADD_LIKE } from '../../mutations/likes'


const { Meta } = Card;

 const PostDetails = () => {

  const [addLike] = useMutation(ADD_LIKE);
  const [cancelLike] = useMutation(CANCEL_LIKE);

  let history = useHistory();

  //states
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(history.location.state.post.likes)
  
  const user = localStorage.getItem("userId")

  useEffect(() => {
    if(history.location.state.post.likesData.includes(user)) setLiked(true)
    setLikes(history.location.state.post.likes)
  }, [])

  const handleReaction = async () => {
    if (liked) {
      await cancelLike({ variables: { postId: history.location.state.post._id }});
      setLiked(false)
      setLikes(likes - 1)
    } else {
      await addLike({ variables: { postId: history.location.state.post._id }});
      setLiked(true)
      setLikes(likes + 1)
    } 
  }

  const LikeHandler = ({ icon }) => (
    <div onClick={handleReaction}>{ icon }</div>
  )

  return (
    <div className= "card-wraper">
      <Card
        extra={user &&
          <Reactions 
            key="like"
            icon={ liked ? <LikeHandler icon={<LikeTwoTone />} /> : <LikeHandler icon={<LikeOutlined />} /> }
            text={ likes }
          />
        }
        title={ history.location.state.post.title }
      >
        <Meta
          title={`on ${ (new Date(history.location.state.post.createdAt)).toLocaleString() } by ${ history.location.state.post.createdBy.name }`}
          description={history.location.state.post.body}
        />
      </Card>
    </div>
  );
}

export default PostDetails
