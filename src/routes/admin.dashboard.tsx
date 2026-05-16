import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut, BookOpen, FileText, FolderKanban, Award, Mail, Code2, Star } from "lucide-react";
import { toast } from "sonner";
import {
  useCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useToggleCoursePublishMutation,
} from "@/hooks/useCoursesQuery";
import {
  useBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useToggleBlogPublishMutation,
} from "@/hooks/useBlogsQuery";
import {
  useProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useToggleProjectPublishMutation,
} from "@/hooks/useProjectsQuery";
import {
  useContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "@/hooks/useContactQuery";
import {
  usePlacementsQuery,
  useCreatePlacementMutation,
  useUpdatePlacementMutation,
  useDeletePlacementMutation,
  useTogglePlacementPublishMutation,
  useTogglePlacementFeaturedMutation,
} from "@/hooks/usePlacementsQuery";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — RKS Tech Solutions" },
      { name: "description", content: "Admin dashboard for managing content" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");

  // Check if admin is logged in (only on client side)
  const isAdmin = typeof window !== 'undefined' ? localStorage.getItem("admin_token") : null;
  
  if (typeof window !== 'undefined' && !isAdmin) {
    navigate({ to: "/admin/login" });
    return null;
  }
  
  // Don't render on server
  if (typeof window === 'undefined') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate({ to: "/" });
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="border-b border-border/50 sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center shadow-lg">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Manage your website content</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors w-full sm:w-auto"
            >
              <LogOut className="w-4 h-4" />
              <span className="sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6 sm:mb-8 h-auto p-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <TabsTrigger 
              value="courses" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blogs</span>
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3"
            >
              <FolderKanban className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger 
              value="placements" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Placements</span>
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 col-span-2 sm:col-span-1"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <CoursesTab />
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs">
            <BlogsTab />
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>

          {/* Placements Tab */}
          <TabsContent value="placements">
            <PlacementsTab />
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <ContactsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Courses Tab Component
function CoursesTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    duration: "",
    level: "beginner",
    price: "",
    instructor: "",
    syllabus: "",
    technologies: "",
  });

  const { data: coursesData, isLoading } = useCoursesQuery(1, 100);
  const { mutate: createCourse, isPending: isCreating } = useCreateCourseMutation();
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourseMutation();
  const { mutate: deleteCourse } = useDeleteCourseMutation();
  const { mutate: togglePublish } = useToggleCoursePublishMutation();

  const courses = coursesData?.data || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : undefined,
      technologies: formData.technologies.split(",").map(t => t.trim()),
    };

    if (editingId) {
      updateCourse({ id: editingId, data }, {
        onSuccess: () => {
          setShowForm(false);
          setEditingId(null);
          setFormData({
            title: "",
            slug: "",
            description: "",
            duration: "",
            level: "beginner",
            price: "",
            instructor: "",
            syllabus: "",
            technologies: "",
          });
        },
      });
    } else {
      createCourse(data as any, {
        onSuccess: () => {
          setShowForm(false);
          setFormData({
            title: "",
            slug: "",
            description: "",
            duration: "",
            level: "beginner",
            price: "",
            instructor: "",
            syllabus: "",
            technologies: "",
          });
        },
      });
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Courses
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {courses.length} {courses.length === 1 ? 'course' : 'courses'} total
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      {showForm && (
        <Card className="p-4 sm:p-6 border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-white dark:bg-slate-950"
              />
              <Input
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                className="bg-white dark:bg-slate-950"
              />
              <Input
                placeholder="Duration (e.g., 12 weeks)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
                className="bg-white dark:bg-slate-950"
              />
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="px-3 py-2 border border-input rounded-md bg-white dark:bg-slate-950"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <Input
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-white dark:bg-slate-950"
              />
              <Input
                placeholder="Instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                required
                className="bg-white dark:bg-slate-950"
              />
            </div>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="bg-white dark:bg-slate-950"
            />
            <Textarea
              placeholder="Syllabus"
              value={formData.syllabus}
              onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
              required
              className="bg-white dark:bg-slate-950"
            />
            <Input
              placeholder="Technologies (comma separated)"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="bg-white dark:bg-slate-950"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                type="submit" 
                disabled={isCreating || isUpdating}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {editingId ? "Update" : "Create"} Course
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {courses.map((course: any) => (
          <Card key={course.id} className="p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-white dark:bg-slate-950">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg truncate">{course.title}</h3>
                  <Badge variant={course.status === "published" ? "default" : "secondary"} className="shrink-0">
                    {course.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{course.description}</p>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">📅 {course.duration}</span>
                  <span className="flex items-center gap-1">📊 {course.level}</span>
                  {course.price && <span className="flex items-center gap-1">💰 ${course.price}</span>}
                </div>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublish(course.id)}
                  className="hover:bg-blue-50 hover:border-blue-200"
                >
                  {course.status === "published" ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(course.id);
                    setFormData({
                      title: course.title,
                      slug: course.slug,
                      description: course.description,
                      duration: course.duration,
                      level: course.level,
                      price: course.price?.toString() || "",
                      instructor: course.instructor,
                      syllabus: course.syllabus,
                      technologies: course.technologies?.join(", ") || "",
                    });
                    setShowForm(true);
                  }}
                  className="hover:bg-green-50 hover:border-green-200"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteCourse(course.id)}
                  className="hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Blogs Tab Component
function BlogsTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Company",
    authorName: "",
    authorRole: "",
    tags: "",
  });

  const { data: blogsData, isLoading } = useBlogsQuery(1, 100);
  const { mutate: createBlog, isPending: isCreating } = useCreateBlogMutation();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlogMutation();
  const { mutate: deleteBlog } = useDeleteBlogMutation();
  const { mutate: togglePublish } = useToggleBlogPublishMutation();

  const blogs = blogsData?.data || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()),
    };

    if (editingId) {
      updateBlog({ id: editingId, data }, {
        onSuccess: () => {
          setShowForm(false);
          setEditingId(null);
          setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            category: "Company",
            authorName: "",
            authorRole: "",
            tags: "",
          });
        },
      });
    } else {
      createBlog(data as any, {
        onSuccess: () => {
          setShowForm(false);
          setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            category: "Company",
            authorName: "",
            authorRole: "",
            tags: "",
          });
        },
      });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading blogs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blogs ({blogs.length})</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Blog
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <Input
                placeholder="Author Name"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                required
              />
              <Input
                placeholder="Author Role"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="Company">Company</option>
                <option value="Technology">Technology</option>
                <option value="Placement">Placement</option>
                <option value="Career">Career</option>
              </select>
            </div>
            <Input
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
            />
            <Textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={6}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isCreating || isUpdating}>
                {editingId ? "Update" : "Create"} Blog
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {blogs.map((blog: any) => (
          <Card key={blog.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{blog.title}</h3>
                  <Badge variant={blog.published ? "default" : "secondary"}>
                    {blog.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{blog.excerpt}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{blog.category}</span>
                  <span>By {blog.authorName}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublish(blog.id)}
                >
                  {blog.published ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(blog.id);
                    setFormData({
                      title: blog.title,
                      slug: blog.slug,
                      excerpt: blog.excerpt,
                      content: blog.content,
                      category: blog.category,
                      authorName: blog.authorName,
                      authorRole: blog.authorRole || "",
                      tags: blog.tags?.join(", ") || "",
                    });
                    setShowForm(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteBlog(blog.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Projects Tab Component
function ProjectsTab() {
  const { data: projectsData, isLoading } = useProjectsQuery(1, 100);
  const { mutate: deleteProject } = useDeleteProjectMutation();
  const { mutate: togglePublish } = useToggleProjectPublishMutation();

  const projects = projectsData?.data || [];

  if (isLoading) return <div className="text-center py-8">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
      </div>

      <div className="grid gap-4">
        {projects.map((project: any) => (
          <Card key={project.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{project.title}</h3>
                  <Badge variant={project.status === "published" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{project.category}</span>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Live
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublish(project.id)}
                >
                  {project.status === "published" ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Contacts Tab Component
function ContactsTab() {
  const { data: contactsData, isLoading } = useContactsQuery(1, 100);
  const { mutate: updateContact } = useUpdateContactMutation();
  const { mutate: deleteContact } = useDeleteContactMutation();

  const contacts = contactsData?.data || [];

  if (isLoading) return <div className="text-center py-8">Loading contacts...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contact Messages ({contacts.length})</h2>

      <div className="grid gap-4">
        {contacts.map((contact: any) => (
          <Card key={contact.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
              </div>
              <Badge variant={contact.status === "new" ? "default" : "secondary"}>
                {contact.status}
              </Badge>
            </div>
            <div className="mb-3">
              <p className="font-medium text-sm mb-1">{contact.subject}</p>
              <p className="text-sm text-muted-foreground">{contact.message}</p>
            </div>
            <div className="flex gap-2">
              {contact.status === "new" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateContact({ id: contact.id, data: { status: "read" } })}
                >
                  Mark as Read
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Placements Tab Component
function PlacementsTab() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    studentName: "",
    companyName: "",
    position: "",
    package: "",
    location: "",
    story: "",
    testimonial: "",
    course: "",
    duration: "",
    skills: "",
    technologies: "",
    previousRole: "",
    linkedinUrl: "",
    placementDate: "",
  });

  const { data: placementsData, isLoading } = usePlacementsQuery(1, 100);
  const { mutate: createPlacement, isPending: isCreating } = useCreatePlacementMutation();
  const { mutate: updatePlacement, isPending: isUpdating } = useUpdatePlacementMutation();
  const { mutate: deletePlacement } = useDeletePlacementMutation();
  const { mutate: togglePublish } = useTogglePlacementPublishMutation();
  const { mutate: toggleFeatured } = useTogglePlacementFeaturedMutation();

  const placements = placementsData?.data || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      package: formData.package ? parseFloat(formData.package) : undefined,
      skills: formData.skills.split(",").map(s => s.trim()),
      technologies: formData.technologies.split(",").map(t => t.trim()),
    };

    if (editingId) {
      updatePlacement({ id: editingId, data }, {
        onSuccess: () => {
          setShowForm(false);
          setEditingId(null);
          setFormData({
            studentName: "",
            companyName: "",
            position: "",
            package: "",
            location: "",
            story: "",
            testimonial: "",
            course: "",
            duration: "",
            skills: "",
            technologies: "",
            previousRole: "",
            linkedinUrl: "",
            placementDate: "",
          });
        },
      });
    } else {
      createPlacement(data as any, {
        onSuccess: () => {
          setShowForm(false);
          setFormData({
            studentName: "",
            companyName: "",
            position: "",
            package: "",
            location: "",
            story: "",
            testimonial: "",
            course: "",
            duration: "",
            skills: "",
            technologies: "",
            previousRole: "",
            linkedinUrl: "",
            placementDate: "",
          });
        },
      });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading placements...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Placement Stories ({placements.length})</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Placement Story
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Student Name"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                required
              />
              <Input
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
              <Input
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              />
              <Input
                placeholder="Package (e.g., 1200000)"
                type="number"
                value={formData.package}
                onChange={(e) => setFormData({ ...formData, package: e.target.value })}
              />
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <Input
                placeholder="Course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              />
              <Input
                placeholder="Duration (e.g., 6 months)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
              <Input
                placeholder="Previous Role"
                value={formData.previousRole}
                onChange={(e) => setFormData({ ...formData, previousRole: e.target.value })}
              />
              <Input
                placeholder="LinkedIn URL"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              />
              <Input
                placeholder="Placement Date"
                type="date"
                value={formData.placementDate}
                onChange={(e) => setFormData({ ...formData, placementDate: e.target.value })}
              />
            </div>
            <Textarea
              placeholder="Success Story"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              required
              rows={4}
            />
            <Textarea
              placeholder="Testimonial"
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              required
              rows={3}
            />
            <Input
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
            <Input
              placeholder="Technologies (comma separated)"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isCreating || isUpdating}>
                {editingId ? "Update" : "Create"} Placement Story
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {placements.map((placement: any) => (
          <Card key={placement.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{placement.studentName}</h3>
                  <Badge variant={placement.status === "published" ? "default" : "secondary"}>
                    {placement.status}
                  </Badge>
                  {placement.featured && (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {placement.position} at {placement.companyName}
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {placement.package && <span>₹{placement.package.toLocaleString()}</span>}
                  {placement.location && <span>{placement.location}</span>}
                  {placement.course && <span>{placement.course}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleFeatured(placement.id)}
                  title="Toggle Featured"
                >
                  ⭐
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePublish(placement.id)}
                >
                  {placement.status === "published" ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(placement.id);
                    
                    // Helper function to safely convert skills/technologies to string
                    const arrayToString = (field: any): string => {
                      if (!field) return "";
                      if (Array.isArray(field)) return field.join(", ");
                      if (typeof field === "string") return field;
                      return "";
                    };
                    
                    setFormData({
                      studentName: placement.studentName,
                      companyName: placement.companyName,
                      position: placement.position,
                      package: placement.package?.toString() || "",
                      location: placement.location || "",
                      story: placement.story,
                      testimonial: placement.testimonial,
                      course: placement.course || "",
                      duration: placement.duration || "",
                      skills: arrayToString(placement.skills),
                      technologies: arrayToString(placement.technologies),
                      previousRole: placement.previousRole || "",
                      linkedinUrl: placement.linkedinUrl || "",
                      placementDate: placement.placementDate ? new Date(placement.placementDate).toISOString().split('T')[0] : "",
                    });
                    setShowForm(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deletePlacement(placement.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
