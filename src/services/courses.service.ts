/**
 * Courses Service - API calls for course management
 */

import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api-client';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price?: number;
  thumbnail?: string;
  syllabus: string;
  instructor: string;
  technologies: string[];
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseDto {
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  price?: number;
  thumbnail?: string;
  syllabus: string;
  instructor: string;
  technologies: string[];
  featured?: boolean;
  status?: string;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

class CoursesService {
  /**
   * Get all courses with pagination
   */
  async getCourses(page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Course>>(
      `/courses?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get featured courses
   */
  async getFeaturedCourses() {
    return apiClient.get<Course[]>('/courses?featured=true');
  }

  /**
   * Get single course by ID
   */
  async getCourse(id: string) {
    return apiClient.get<Course>(`/courses/${id}`);
  }

  /**
   * Get course by slug
   */
  async getCourseBySlug(slug: string) {
    return apiClient.get<Course>(`/courses/slug/${slug}`);
  }

  /**
   * Create new course (Admin only)
   */
  async createCourse(data: CreateCourseDto) {
    return apiClient.post<ApiResponse<Course>>('/courses', data);
  }

  /**
   * Update course (Admin only)
   */
  async updateCourse(id: string, data: UpdateCourseDto) {
    return apiClient.patch<ApiResponse<Course>>(`/courses/${id}`, data);
  }

  /**
   * Delete course (Admin only)
   */
  async deleteCourse(id: string) {
    return apiClient.delete<ApiResponse<{ id: string }>>(`/courses/${id}`);
  }

  /**
   * Publish/Unpublish course (Admin only)
   */
  async togglePublish(id: string) {
    return apiClient.patch<ApiResponse<Course>>(`/courses/${id}/publish`, {});
  }
}

export const coursesService = new CoursesService();
