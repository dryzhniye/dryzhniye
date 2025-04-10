'use client'

import { PostItem } from '@/widgets/post/PostItem'
import React, { useEffect, useRef, useState } from 'react'
import s from './page.module.scss'
import { ProfileTopbar } from '@/widgets/profile-topbar/ProfileTopbar'
import {
  useCreatePostMutation, useGetProfilePostsQuery,
  useGetProfileQuery,
  useGetPublicPostsQuery,
  useUploadImagePostMutation,
} from '@/lib/api/postApi'

const UserProfile = () => {

  const [page, setPage] = useState(1)
  const [displayedPosts, setDisplayedPosts] = useState([])
  const loaderRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadImage] = useUploadImagePostMutation()
  const [createPost] = useCreatePostMutation()
  const { data: profile} = useGetProfileQuery()
     const {data: profilePost}= useGetProfilePostsQuery()
  console.log(profile)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };


  const handleCreatePost = async (file: File, description: string) => {
    const res = await uploadImage([file])
    const uploadId = res.data?.images[0]?.uploadId

    if (uploadId) {
      await createPost({
        description,
        childrenMetadata: [{ uploadId }]
      })
    }
  }


  const handleSubmitPost = async () => {
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    try {
      // setIsLoading(true);

      // First upload the image
      const uploadResponse = await uploadImage([selectedFile]).unwrap();
      const uploadId = uploadResponse.images[0]?.uploadId;

      if (uploadId) {
        // Then create the post with the image reference
        await createPost({
          description: 'newpost',
          childrenMetadata: [{ uploadId }]
        }).unwrap();

        // Reset form after successful upload
        // setDescription('');
        setSelectedFile(null);
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        alert('Post created successfully!');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      // setIsLoading(false);
    }
  };








  // const { data: postsData, isLoading } = useGetPublicPostsQuery(18)
  const { data: postsData, isLoading } = useGetProfilePostsQuery({
    userName: 'ioleg5910' as string,
    pageSize: 8,
    pageNumber: 1,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })



  console.log(postsData)

  useEffect(() => {
    if (postsData?.items) {
      setDisplayedPosts(prev => [...prev, ...postsData.items])
    }
  }, [postsData])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage(prevPage => prevPage + 1)
        }
      },
      { threshold: 0.5 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [isLoading])

  return (
    <>

      <div className={s.profileContainer}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {handleFileChange(e)}}
          // style={{ display: 'none' }}
        />
        <button onClick={()=>handleSubmitPost()}>create post</button>
        {profile && <ProfileTopbar profile={profile} />}
        <div className={s.postsGridContainer}>
          <div className={s.postsGrid}>
            {displayedPosts ? displayedPosts?.map((post) => (
              <PostItem key={post.id} post={post} />
            )) : '...loading'}
          </div>


          <div ref={loaderRef} className={s.loaderContainer}>
            {isLoading && <div className={s.loader}>Loading...</div>}
          </div>
        </div>
      </div>

    </>
  )
}

export default UserProfile
