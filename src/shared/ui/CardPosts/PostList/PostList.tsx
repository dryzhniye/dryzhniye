'use client'

import Post from '@/shared/ui/CardPosts/PostList/Post'
import { useState } from 'react'
import Image from 'next/image'
import s from './PostList.module.scss'

// Пример данных (в реальном приложении данные будут загружаться через API)
const mockPosts = [
  {
    id: 1,
    imageUrl: 'https://example.com/image.jpg',
    description:
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    username: 'URL_PROFILE',
    comments: [
      {
        user: 'URL_PROFILE',
        text: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        timestamp: '2 Hours ago',
        answers: [
          {
            user: 'URL_PROFILE',
            text: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            timestamp: '2 Hours ago',
          },
        ],
      },
    ],
    likes: 1,
    date: '2 Hours ago',
  },
]

const PostList = () => {
  const posts = mockPosts // В реальном приложении здесь будет useGetPostsQuery
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({})

  const toggleAnswers = (index: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  if (!posts || posts.length === 0) return <p>No posts found</p>

  return (
    <div className={s.postList}>
      {posts.map(post => (
        <div key={post.id} className={s.post}>
          {/* Заголовок поста */}
          <div className={s.header}>
            <span>{post.username}</span>
            {/* Кнопка с тремя точками будет добавлена позже */}
          </div>

          {/* Отрисовка поста */}
          <Post
            imageUrl={post.imageUrl}
            description={post.description}
            likes={post.likes}
            date={post.date}
          />

          {/* Комментарии */}
          <div className={s.comments}>
            {post.comments.map((comment, index) => (
              <div key={index} className={s.comment}>
                <span>{comment.user}</span>
                <p>{comment.text}</p>
                <div className={s.commentMeta}>
                  <span>{comment.timestamp}</span>
                  {comment.answers && comment.answers.length > 0 && (
                    <button onClick={() => toggleAnswers(index)} className={s.toggleAnswers}>
                      {showAnswers[index] ? 'Hide Answers' : `Answer: ${comment.answers.length}`}
                    </button>
                  )}
                </div>
                {showAnswers[index] && comment.answers && (
                  <div className={s.answers}>
                    {comment.answers.map((answer, answerIndex) => (
                      <div key={answerIndex} className={s.answer}>
                        <span>{answer.user}</span>
                        <p>{answer.text}</p>
                        <span>{answer.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Поле для добавления комментария */}
          <div className={s.commentInputWrapper}>
            <input type="text" placeholder="Answer" className={s.commentInput} />
            <button className={s.commentSubmit}>
              <Image src="/send.svg" alt="Send" width={20} height={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default PostList
