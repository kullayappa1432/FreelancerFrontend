import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  Award,
  ArrowLeft,
  Linkedin,
  Clock,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { usePlacementBySlugQuery } from "@/hooks/usePlacementsQuery";

export const Route = createFileRoute("/placements/$slug")({
  component: PlacementDetailPage,
});

function PlacementDetailPage() {
  const { slug } = useParams({ from: "/placements/$slug" });
  const { data: placement, isLoading, error } = usePlacementBySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading success story...</p>
        </div>
      </div>
    );
  }

  if (error || !placement) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Award className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Story Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The placement story you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/placements">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-12 sm:py-16">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link to="/placements">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Stories
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {placement.featured && (
              <Badge className="mb-4 bg-gradient-primary">
                <Award className="w-3 h-3 mr-1" />
                Featured Success Story
              </Badge>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {placement.studentName}'s Journey to {placement.companyName}
            </h1>

            <p className="text-xl text-muted-foreground">
              {placement.position}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Details Card */}
              <Card className="glass gradient-border p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Company</div>
                      <div className="font-semibold">{placement.companyName}</div>
                    </div>
                  </div>

                  {placement.package && (
                    <div className="flex items-start gap-3">
                      <IndianRupee className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Package</div>
                        <div className="font-semibold">₹{(placement.package / 100000).toFixed(1)}L per annum</div>
                      </div>
                    </div>
                  )}

                  {placement.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-semibold">{placement.location}</div>
                      </div>
                    </div>
                  )}

                  {placement.placementDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Placed On</div>
                        <div className="font-semibold">
                          {new Date(placement.placementDate).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Success Story */}
              <Card className="glass gradient-border p-6">
                <h2 className="text-2xl font-bold mb-4">Success Story</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {placement.story}
                  </p>
                </div>
              </Card>

              {/* Testimonial */}
              <Card className="glass gradient-border p-6 bg-primary/5">
                <div className="flex gap-4">
                  <div className="text-4xl text-primary">"</div>
                  <div>
                    <p className="text-lg italic mb-4">{placement.testimonial}</p>
                    <p className="text-sm text-muted-foreground">— {placement.studentName}</p>
                  </div>
                </div>
              </Card>

              {/* Skills & Technologies */}
              {(placement.skills?.length > 0 || placement.technologies?.length > 0) && (
                <Card className="glass gradient-border p-6">
                  <h3 className="text-xl font-bold mb-4">Skills & Technologies</h3>
                  
                  {placement.skills?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {placement.skills.map((skill: string, i: number) => (
                          <Badge key={i} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {placement.technologies?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {placement.technologies.map((tech: string, i: number) => (
                          <Badge key={i} className="bg-primary/10">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Training Details */}
              <Card className="glass gradient-border p-6">
                <h3 className="font-bold mb-4">Training Details</h3>
                
                <div className="space-y-4">
                  {placement.course && (
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Course</div>
                        <div className="font-medium">{placement.course}</div>
                      </div>
                    </div>
                  )}

                  {placement.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium">{placement.duration}</div>
                      </div>
                    </div>
                  )}

                  {placement.previousRole && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="text-sm text-muted-foreground">Previous Role</div>
                        <div className="font-medium">{placement.previousRole}</div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Connect */}
              {placement.linkedinUrl && (
                <Card className="glass gradient-border p-6">
                  <h3 className="font-bold mb-4">Connect</h3>
                  <a
                    href={placement.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2" variant="outline">
                      <Linkedin className="w-4 h-4" />
                      View LinkedIn Profile
                    </Button>
                  </a>
                </Card>
              )}

              {/* CTA */}
              <Card className="glass gradient-border p-6 bg-gradient-to-br from-primary/10 to-primary/5">
                <h3 className="font-bold mb-2">Inspired?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start your journey to success with our training programs
                </p>
                <Link to="/courses">
                  <Button className="w-full bg-gradient-primary">
                    Explore Courses
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
