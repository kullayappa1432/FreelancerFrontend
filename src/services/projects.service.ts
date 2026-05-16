/**
 * Projects Service - API calls for project management
 */

import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api-client';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  gallery: string[];
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  gallery?: string[];
  featured?: boolean;
  status?: string;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

class ProjectsService {
  /**
   * Get all projects with pagination
   */
  async getProjects(page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Project>>(
      `/projects?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get featured projects
   */
  async getFeaturedProjects() {
    return apiClient.get<Project[]>('/projects?featured=true');
  }

  /**
   * Get projects by category
   */
  async getProjectsByCategory(category: string, page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Project>>(
      `/projects?category=${category}&page=${page}&limit=${limit}`
    );
  }

  /**
   * Get single project by ID
   */
  async getProject(id: string) {
    return apiClient.get<Project>(`/projects/${id}`);
  }

  /**
   * Get project by slug
   */
  async getProjectBySlug(slug: string) {
    return apiClient.get<Project>(`/projects/slug/${slug}`);
  }

  /**
   * Create new project (Admin only)
   */
  async createProject(data: CreateProjectDto) {
    return apiClient.post<ApiResponse<Project>>('/projects', data);
  }

  /**
   * Update project (Admin only)
   */
  async updateProject(id: string, data: UpdateProjectDto) {
    return apiClient.patch<ApiResponse<Project>>(`/projects/${id}`, data);
  }

  /**
   * Delete project (Admin only)
   */
  async deleteProject(id: string) {
    return apiClient.delete<ApiResponse<{ id: string }>>(`/projects/${id}`);
  }

  /**
   * Publish/Unpublish project (Admin only)
   */
  async togglePublish(id: string) {
    return apiClient.patch<ApiResponse<Project>>(`/projects/${id}/toggle-publish`, {});
  }
}

export const projectsService = new ProjectsService();
