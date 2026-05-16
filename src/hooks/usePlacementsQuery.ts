import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { placementsService, CreatePlacementDto, UpdatePlacementDto } from '@/services/placements.service';
import { toast } from 'sonner';

export function usePlacementsQuery(page = 1, limit = 100) {
  return useQuery({
    queryKey: ['placements', page, limit],
    queryFn: () => placementsService.getAll(page, limit),
  });
}

export function usePublishedPlacementsQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['placements', 'published', page, limit],
    queryFn: () => placementsService.getPublished(page, limit),
  });
}

export function useFeaturedPlacementsQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['placements', 'featured', page, limit],
    queryFn: () => placementsService.getFeatured(page, limit),
  });
}

export function usePlacementQuery(id: string) {
  return useQuery({
    queryKey: ['placements', id],
    queryFn: () => placementsService.getById(id),
    enabled: !!id,
  });
}

export function usePlacementBySlugQuery(slug: string) {
  return useQuery({
    queryKey: ['placements', 'slug', slug],
    queryFn: () => placementsService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreatePlacementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlacementDto) => placementsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['placements'] });
      toast.success('Placement story created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create placement story');
    },
  });
}

export function useUpdatePlacementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlacementDto }) =>
      placementsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['placements'] });
      toast.success('Placement story updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update placement story');
    },
  });
}

export function useDeletePlacementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => placementsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['placements'] });
      toast.success('Placement story deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete placement story');
    },
  });
}

export function useTogglePlacementPublishMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => placementsService.togglePublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['placements'] });
      toast.success('Placement story status updated');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update status');
    },
  });
}

export function useTogglePlacementFeaturedMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => placementsService.toggleFeatured(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['placements'] });
      toast.success('Placement story featured status updated');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update featured status');
    },
  });
}
