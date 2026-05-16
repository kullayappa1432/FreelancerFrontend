/**
 * Services Service - API calls for service management
 */

import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api-client';

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image?: string;
  icon?: string;
  technologies: string[];
  pricing?: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceDto {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image?: string;
  icon?: string;
  technologies: string[];
  pricing?: number;
  status?: string;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {}

class ServicesService {
  /**
   * Get all services with pagination
   */
  async getServices(page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Service>>(
      `/services?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get published services
   */
  async getPublishedServices() {
    return apiClient.get<Service[]>('/services?status=published');
  }

  /**
   * Get single service by ID
   */
  async getService(id: string) {
    return apiClient.get<Service>(`/services/${id}`);
  }

  /**
   * Get service by slug
   */
  async getServiceBySlug(slug: string) {
    return apiClient.get<Service>(`/services/slug/${slug}`);
  }

  /**
   * Create new service (Admin only)
   */
  async createService(data: CreateServiceDto) {
    return apiClient.post<ApiResponse<Service>>('/services', data);
  }

  /**
   * Update service (Admin only)
   */
  async updateService(id: string, data: UpdateServiceDto) {
    return apiClient.patch<ApiResponse<Service>>(`/services/${id}`, data);
  }

  /**
   * Delete service (Admin only)
   */
  async deleteService(id: string) {
    return apiClient.delete<ApiResponse<{ id: string }>>(`/services/${id}`);
  }

  /**
   * Publish/Unpublish service (Admin only)
   */
  async togglePublish(id: string) {
    return apiClient.patch<ApiResponse<Service>>(`/services/${id}/publish`, {});
  }
}

export const servicesService = new ServicesService();
