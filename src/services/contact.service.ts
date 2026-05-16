/**
 * Contact Service - API calls for contact form and inquiries
 */

import { apiClient, ApiResponse, PaginatedResponse } from '@/lib/api-client';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactDto {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface UpdateContactDto {
  status?: string;
}

class ContactService {
  /**
   * Submit contact form
   */
  async submitContact(data: CreateContactDto) {
    return apiClient.post<ApiResponse<Contact>>('/contact', data);
  }

  /**
   * Get all contacts (Admin only)
   */
  async getContacts(page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Contact>>(
      `/contact?page=${page}&limit=${limit}`
    );
  }

  /**
   * Get contacts by status (Admin only)
   */
  async getContactsByStatus(status: string, page = 1, limit = 10) {
    return apiClient.get<PaginatedResponse<Contact>>(
      `/contact?status=${status}&page=${page}&limit=${limit}`
    );
  }

  /**
   * Get single contact (Admin only)
   */
  async getContact(id: string) {
    return apiClient.get<Contact>(`/contact/${id}`);
  }

  /**
   * Update contact status (Admin only)
   */
  async updateContact(id: string, data: UpdateContactDto) {
    return apiClient.patch<ApiResponse<Contact>>(`/contact/${id}`, data);
  }

  /**
   * Delete contact (Admin only)
   */
  async deleteContact(id: string) {
    return apiClient.delete<ApiResponse<{ id: string }>>(`/contact/${id}`);
  }
}

export const contactService = new ContactService();
