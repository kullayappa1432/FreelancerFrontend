/**
 * React Query hooks for courses
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesService, Course, CreateCourseDto, UpdateCourseDto } from '@/services/courses.service';
import { toast } from 'sonner';

const COURSES_QUERY_KEY = ['courses'];

/**
 * Hook to fetch all courses with pagination
 */
export function useCoursesQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...COURSES_QUERY_KEY, page, limit],
    queryFn: () => coursesService.getCourses(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch featured courses
 */
export function useFeaturedCoursesQuery() {
  return useQuery({
    queryKey: [...COURSES_QUERY_KEY, 'featured'],
    queryFn: () => coursesService.getFeaturedCourses(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch single course by ID
 */
export function useCourseQuery(id: string) {
  return useQuery({
    queryKey: [...COURSES_QUERY_KEY, id],
    queryFn: () => coursesService.getCourse(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch course by slug
 */
export function useCourseBySlugQuery(slug: string) {
  return useQuery({
    queryKey: [...COURSES_QUERY_KEY, 'slug', slug],
    queryFn: () => coursesService.getCourseBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to create a new course
 */
export function useCreateCourseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseDto) => coursesService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
      toast.success('Course created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create course');
    },
  });
}

/**
 * Hook to update a course
 */
export function useUpdateCourseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCourseDto }) =>
      coursesService.updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
      toast.success('Course updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update course');
    },
  });
}

/**
 * Hook to delete a course
 */
export function useDeleteCourseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => coursesService.deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
      toast.success('Course deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete course');
    },
  });
}

/**
 * Hook to toggle course publish status
 */
export function useToggleCoursePublishMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => coursesService.togglePublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSES_QUERY_KEY });
      toast.success('Course publish status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update course');
    },
  });
}
