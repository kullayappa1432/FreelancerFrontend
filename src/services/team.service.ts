/**
 * Team Service - API calls for team member management
 */

import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api-client';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  profileImage?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  email?: string;
  experience?: string;
  skills: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMemberDto {
  name: string;
  role: string;
  bio: string;
  profileImage?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  email?: string;
  experience?: string;
  skills?: string[];
  featured?: boolean;
}

export interface UpdateTeamMemberDto extends Partial<CreateTeamMemberDto> {}

class TeamService {
  /**
   * Get all team members with pagination
   */
  async getTeamMembers(page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<TeamMember>>(
      `/team?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get featured team members
   */
  async getFeaturedTeamMembers() {
    return apiClient.get<TeamMember[]>('/team/featured');
  }

  /**
   * Get team members by role
   */
  async getTeamMembersByRole(role: string) {
    return apiClient.get<TeamMember[]>(`/team?role=${role}`);
  }

  /**
   * Get single team member by ID
   */
  async getTeamMember(id: string) {
    return apiClient.get<TeamMember>(`/team/${id}`);
  }

  /**
   * Create new team member (Admin only)
   */
  async createTeamMember(data: CreateTeamMemberDto) {
    return apiClient.post<ApiResponse<TeamMember>>('/team', data);
  }

  /**
   * Update team member (Admin only)
   */
  async updateTeamMember(id: string, data: UpdateTeamMemberDto) {
    return apiClient.patch<ApiResponse<TeamMember>>(`/team/${id}`, data);
  }

  /**
   * Delete team member (Admin only)
   */
  async deleteTeamMember(id: string) {
    return apiClient.delete<ApiResponse<{ id: string }>>(`/team/${id}`);
  }
}

export const teamService = new TeamService();
