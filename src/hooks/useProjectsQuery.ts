/**
 * React Query hooks for projects
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService, Project, CreateProjectDto, UpdateProjectDto } from '@/services/projects.service';
import { toast } from 'sonner';

const PROJECTS_QUERY_KEY = ['projects'];

/**
 * Hook to fetch all projects with pagination
 */
export function useProjectsQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, page, limit],
    queryFn: () => projectsService.getProjects(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch featured projects
 */
export function useFeaturedProjectsQuery() {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, 'featured'],
    queryFn: () => projectsService.getFeaturedProjects(),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to fetch projects by category
 */
export function useProjectsByCategoryQuery(category: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, 'category', category, page, limit],
    queryFn: () => projectsService.getProjectsByCategory(category, page, limit),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch single project by ID
 */
export function useProjectQuery(id: string) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, id],
    queryFn: () => projectsService.getProject(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch project by slug
 */
export function useProjectBySlugQuery(slug: string) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, 'slug', slug],
    queryFn: () => projectsService.getProjectBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to create a new project
 */
export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectDto) => projectsService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      toast.success('Project created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create project');
    },
  });
}

/**
 * Hook to update a project
 */
export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      projectsService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      toast.success('Project updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project');
    },
  });
}

/**
 * Hook to delete a project
 */
export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      toast.success('Project deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete project');
    },
  });
}

/**
 * Hook to toggle project publish status
 */
export function useToggleProjectPublishMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsService.togglePublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      toast.success('Project publish status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project');
    },
  });
}
