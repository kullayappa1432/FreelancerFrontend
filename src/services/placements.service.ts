import { apiClient } from '@/lib/api-client';

export interface Placement {
  id: string;
  studentName: string;
  slug: string;
  studentImage?: string;
  companyName: string;
  companyLogo?: string;
  position: string;
  package?: number;
  packageCurrency: string;
  location?: string;
  story: string;
  testimonial: string;
  course?: string;
  duration?: string;
  skills: string[];
  technologies: string[];
  previousRole?: string;
  videoUrl?: string;
  linkedinUrl?: string;
  placementDate?: string;
  featured: boolean;
  verified: boolean;
  status: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlacementDto {
  studentName: string;
  studentImage?: string;
  companyName: string;
  companyLogo?: string;
  position: string;
  package?: number;
  packageCurrency?: string;
  location?: string;
  story: string;
  testimonial: string;
  course?: string;
  duration?: string;
  skills?: string[];
  technologies?: string[];
  previousRole?: string;
  videoUrl?: string;
  linkedinUrl?: string;
  placementDate?: string;
  featured?: boolean;
  verified?: boolean;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdatePlacementDto extends Partial<CreatePlacementDto> {}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const placementsService = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Placement>> => {
    return apiClient.get(`/placements?page=${page}&limit=${limit}`);
  },

  getPublished: async (page = 1, limit = 10): Promise<PaginatedResponse<Placement>> => {
    return apiClient.get(`/placements/published?page=${page}&limit=${limit}`);
  },

  getFeatured: async (page = 1, limit = 10): Promise<PaginatedResponse<Placement>> => {
    return apiClient.get(`/placements/featured?page=${page}&limit=${limit}`);
  },

  getById: async (id: string): Promise<Placement> => {
    return apiClient.get(`/placements/${id}`);
  },

  getBySlug: async (slug: string): Promise<Placement> => {
    return apiClient.get(`/placements/slug/${slug}`);
  },

  create: async (data: CreatePlacementDto): Promise<Placement> => {
    return apiClient.post('/placements', data);
  },

  update: async (id: string, data: UpdatePlacementDto): Promise<Placement> => {
    return apiClient.patch(`/placements/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete(`/placements/${id}`);
  },

  togglePublish: async (id: string): Promise<Placement> => {
    return apiClient.patch(`/placements/${id}/publish`, {});
  },

  toggleFeatured: async (id: string): Promise<Placement> => {
    return apiClient.patch(`/placements/${id}/featured`, {});
  },
};
