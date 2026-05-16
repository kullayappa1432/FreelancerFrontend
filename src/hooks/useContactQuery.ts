/**
 * React Query hooks for contact form
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService, Contact, CreateContactDto, UpdateContactDto } from '@/services/contact.service';
import { toast } from 'sonner';

const CONTACT_QUERY_KEY = ['contact'];

/**
 * Hook to submit contact form
 */
export function useSubmitContactMutation() {
  return useMutation({
    mutationFn: (data: CreateContactDto) => contactService.submitContact(data),
    onSuccess: () => {
      toast.success('Message sent successfully! We\'ll reply within 24 hours.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message');
    },
  });
}

/**
 * Hook to fetch all contacts (Admin only)
 */
export function useContactsQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...CONTACT_QUERY_KEY, page, limit],
    queryFn: () => contactService.getContacts(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch contacts by status (Admin only)
 */
export function useContactsByStatusQuery(status: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: [...CONTACT_QUERY_KEY, 'status', status, page, limit],
    queryFn: () => contactService.getContactsByStatus(status, page, limit),
    enabled: !!status,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch single contact (Admin only)
 */
export function useContactQuery(id: string) {
  return useQuery({
    queryKey: [...CONTACT_QUERY_KEY, id],
    queryFn: () => contactService.getContact(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to update contact status (Admin only)
 */
export function useUpdateContactMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactDto }) =>
      contactService.updateContact(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_QUERY_KEY });
      toast.success('Contact updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update contact');
    },
  });
}

/**
 * Hook to delete contact (Admin only)
 */
export function useDeleteContactMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactService.deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_QUERY_KEY });
      toast.success('Contact deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete contact');
    },
  });
}
