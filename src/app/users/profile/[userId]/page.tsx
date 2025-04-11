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
import { useIntersection } from 'react-use'
import { useAppSelector } from '@/lib/hooks/appHooks'
import { selectIsLoggedIn } from '@/app/redux/appSlice'


const UserProfile = () => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [page, setPage] = useState(0)
  const [displayedPosts, setDisplayedPosts] = useState([])
  const loaderRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadImage] = useUploadImagePostMutation()
  const [createPost] = useCreatePostMutation()
  const { data: profile} = useGetProfileQuery()
     // const {data: profilePost}= useGetProfilePostsQuery()
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






 // const { data: postsData, isLoading, isFetching } = useGetProfilePostsQuery({
 //      userName: 'ioleg5910' as string,
 //      pageSize: 4,
 //      pageNumber: page,
 //      sortBy: 'createdAt',
 //      sortDirection: 'desc',
 //    }, {
 //    skip: !isLoggedIn,
 //  })
 //  const { data: postsData, isLoading, isFetching } = useGetPublicPostsQuery(18 ,{
 //    skip: isLoggedIn
 //  })


  const {
    data: profilePosts,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
  } = useGetProfilePostsQuery({
    userName: 'ioleg5910',
    pageSize: 4,
    pageNumber: page,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  }, {
    skip: !isLoggedIn,
  });

// Query 2: Only runs if NOT logged in
  const {
    data: publicPosts,
    isLoading: isLoadingPublic,
    isFetching: isFetchingPublic,
  } = useGetPublicPostsQuery(18, {
    skip: isLoggedIn,
  });

  const postsData = isLoggedIn ? profilePosts : publicPosts;
  const isLoading = isLoggedIn ? isLoadingProfile : isLoadingPublic;
  const isFetching = isLoggedIn ? isFetchingProfile : isFetchingPublic;




  console.log(postsData)
  // debugger
  useEffect(() => {
    if (postsData?.items) {
      setDisplayedPosts(prev => [...prev, ...postsData.items])
    }
  }, [postsData])

  // useEffect(() => {
  //   // debugger
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting ) {
  //         // debugger
  //         console.log("Loader is visible, current page:", page);
  //         // setPage(prevPage => prevPage + 1)
  //
  //         setTimeout(() => {
  //           setPage(prevPage => prevPage + 1)
  //         }, 300)
  //       }
  //     },
  //     { threshold: 0.1 }
  //   )
  //
  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current)
  //   }
  //
  //   return () => {
  //     if (loaderRef.current) {
  //       observer.unobserve(loaderRef.current)
  //     }
  //   }
  // }, [isLoading])
  const hasMore = postsData?.totalCount
    ? displayedPosts.length < postsData.totalCount
    : true

  const intersection = useIntersection(loaderRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1, // adjust as needed
  })

// When loaderRef is visible, fetch next page
  useEffect(() => {
    if (intersection?.isIntersecting && !isLoading && !isFetching) {
      console.log("Loader visible via react-use intersection")
      setTimeout(() => {
        setPage(prevPage => prevPage + 1)
      }, 300)
    }
  }, [intersection, isFetching])




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
        <button onClick={() => setPage(1)}>reset page number</button>
        { <ProfileTopbar profile={profile} />}
        <div className={s.postsGridContainer}>
          <div className={s.postsGrid}>
            {displayedPosts ? displayedPosts?.map((post) => (
              <PostItem key={post.id} post={post} />
            )) : '...loading'}
          </div>


          <div ref={loaderRef} className={s.loaderContainer}>
            {isLoading || isFetching && <div className={s.loader}>Loading...</div>}
          </div>
        </div>
      </div>

    </>
  )
}

export default UserProfile
