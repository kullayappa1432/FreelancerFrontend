/**
 * React Query hooks for blogs
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsService, Blog, CreateBlogDto, UpdateBlogDto } from '@/services/blogs.service';
import { toast } from 'sonner';

const BLOGS_QUERY_KEY = ['blogs'];

/**
 * Hook to fetch all blogs with pagination
 */
export function useBlogsQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...BLOGS_QUERY_KEY, page, limit],
    queryFn: () => blogsService.getBlogs(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch published blogs
 */
export function usePublishedBlogsQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...BLOGS_QUERY_KEY, 'published', page, limit],
    queryFn: () => blogsService.getPublishedBlogs(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch blogs by category
 */
export function useBlogsByCategoryQuery(category: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: [...BLOGS_QUERY_KEY, 'category', category, page, limit],
    queryFn: () => blogsService.getBlogsByCategory(category, page, limit),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch single blog by ID
 */
export function useBlogQuery(id: string) {
  return useQuery({
    queryKey: [...BLOGS_QUERY_KEY, id],
    queryFn: () => blogsService.getBlog(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch blog by slug
 */
export function useBlogBySlugQuery(slug: string) {
  return useQuery({
    queryKey: [...BLOGS_QUERY_KEY, 'slug', slug],
    queryFn: () => blogsService.getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to create a new blog
 */
export function useCreateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogDto) => blogsService.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      toast.success('Blog created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create blog');
    },
  });
}

/**
 * Hook to update a blog
 */
export function useUpdateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlogDto }) =>
      blogsService.updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      toast.success('Blog updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update blog');
    },
  });
}

/**
 * Hook to delete a blog
 */
export function useDeleteBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blogsService.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      toast.success('Blog deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete blog');
    },
  });
}

/**
 * Hook to toggle blog publish status
 */
export function useToggleBlogPublishMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blogsService.togglePublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      toast.success('Blog publish status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update blog');
    },
  });
}

/**
 * Hook to search blogs
 */
export function useSearchBlogsQuery(query: string) {
  return useQuery({
    queryKey: [...BLOGS_QUERY_KEY, 'search', query],
    queryFn: () => blogsService.searchBlogs(query),
    enabled: !!query && query.length > 2,
    staleTime: 5 * 60 * 1000,
  });
}
