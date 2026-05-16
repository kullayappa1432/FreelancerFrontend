/**
 * Blogs Service - API calls for blog management
 */

import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api-client';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  authorName: string;
  authorRole: string;
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogDto {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  authorName: string;
  authorRole: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  published?: boolean;
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> {}

class BlogsService {
  /**
   * Get all blogs with pagination
   */
  async getBlogs(page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Blog>>(
      `/blogs?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get published blogs
   */
  async getPublishedBlogs(page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Blog>>(
      `/blogs/published?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get blogs by category
   */
  async getBlogsByCategory(category: string, page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Blog>>(
      `/blogs?category=${category}&page=${page}&limit=${limit}`
    );
  }

  /**
   * Get single blog by ID
   */
  async getBlog(id: string) {
    return apiClient.get<Blog>(`/blogs/${id}`);
  }

  /**
   * Get blog by slug
   */
  async getBlogBySlug(slug: string) {
    return apiClient.get<Blog>(`/blogs/slug/${slug}`);
  }

  /**
   * Create new blog (Admin only)
   */
  async createBlog(data: CreateBlogDto) {
    return apiClient.post<ApiResponse<Blog>>('/blogs', data);
  }

  /**
   * Update blog (Admin only)
   */
  async updateBlog(id: string, data: UpdateBlogDto) {
    return apiClient.patch<ApiResponse<Blog>>(`/blogs/${id}`, data);
  }

  /**
   * Delete blog (Admin only)
   */
  async deleteBlog(id: string) {
    return apiClient.delete<ApiResponse<{ id: string }>>(`/blogs/${id}`);
  }

  /**
   * Publish/Unpublish blog (Admin only)
   */
  async togglePublish(id: string) {
    return apiClient.patch<ApiResponse<Blog>>(`/blogs/${id}/publish`, {});
  }

  /**
   * Search blogs
   */
  async searchBlogs(query: string) {
    return apiClient.get<Blog[]>(`/blogs/search?q=${encodeURIComponent(query)}`);
  }
}

export const blogsService = new BlogsService();
