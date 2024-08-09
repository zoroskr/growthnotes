'use client'
import { Post } from '@/app/lib/posts/types'
import { notFound } from 'next/navigation'
import { Skeleton } from '@/app/components/ui/skeleton'

interface PostContentProps {
  post: Post | null | undefined
  isLoading: boolean
  error: unknown
}

export default function PostContent({ post, isLoading, error }: PostContentProps) {
  if (isLoading) {
    return <PostSkeleton />
  }
  if (error) {
    return <div>Error loading post. Please try again later.</div>
  }
  if (!post) {
    notFound()
  }
  return (
    <article className="w-full md:w-3/4 pt-6 bg-white mx-auto border border-primary rounded-lg overflow-hidden">
      <div
        dangerouslySetInnerHTML={{ __html: post.content?.free?.web || '' }}
        className="prose prose-lg"
      />
    </article>
  )
}

function PostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 animate-pulse w-full">
      <Skeleton className="h-10 bg-gray-200 rounded-full w-3/4 mb-4"></Skeleton>
      <Skeleton className="h-4 bg-gray-200 rounded-full w-1/4 mb-8"></Skeleton>
      <Skeleton className="h-64 bg-gray-200 rounded w-full mb-6"></Skeleton>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className={`h-4 bg-gray-200 rounded-full w-${Math.random() > 0.5 ? 'full' : '3/4'}`}></Skeleton>
        ))}
      </div>
      <Skeleton className="h-64 bg-gray-200 rounded w-full my-6"></Skeleton>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className={`h-4 bg-gray-200 rounded-full w-${Math.random() > 0.5 ? 'full' : '3/4'}`}></Skeleton>
        ))}
      </div>
    </div>
  )
}