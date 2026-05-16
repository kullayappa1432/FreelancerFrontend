import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, IndianRupee, Calendar, Award, ArrowRight } from "lucide-react";
import { usePublishedPlacementsQuery } from "@/hooks/usePlacementsQuery";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/placements")({
  head: () => ({
    meta: [
      { title: "Student Placements — RKS Tech Solutions" },
      { name: "description", content: "Success stories of our students who got placed in top companies after completing our training programs." },
    ],
  }),
  component: PlacementsPage,
});

function PlacementsPage() {
  const { data: placementsData, isLoading } = usePublishedPlacementsQuery(1, 100);
  const placements = placementsData?.data || [];

  // Calculate statistics
  const stats = {
    totalPlacements: placements.length,
    averagePackage: placements.length > 0 
      ? Math.round(placements.reduce((sum: number, p: any) => sum + (p.package || 0), 0) / placements.length)
      : 0,
    topCompanies: [...new Set(placements.map((p: any) => p.companyName))].length,
    featuredCount: placements.filter((p: any) => p.featured).length,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 sm:py-28">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-gradient-primary">
              <Award className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Our Students' <span className="text-gradient-primary">Success Stories</span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Real students, real placements, real success. See how our training programs have transformed careers and lives.
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Total Placements", value: stats.totalPlacements, icon: Award },
              { label: "Average Package", value: `₹${(stats.averagePackage / 100000).toFixed(1)}L`, icon: IndianRupee },
              { label: "Top Companies", value: stats.topCompanies, icon: Building2 },
              { label: "Featured Stories", value: stats.featuredCount, icon: Calendar },
            ].map((stat, i) => (
              <Card key={i} className="glass gradient-border p-6 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Placements Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">Loading success stories...</p>
            </div>
          ) : placements.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No placements yet</h3>
              <p className="text-muted-foreground">Check back soon for inspiring success stories!</p>
            </div>
          ) : (
            <>
              {/* Featured Placements */}
              {stats.featuredCount > 0 && (
                <div className="mb-16">
                  <SectionHeading
                    eyebrow="Featured"
                    title="Top Success Stories"
                    subtitle="Our most inspiring placement stories"
                  />
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {placements
                      .filter((p: any) => p.featured)
                      .map((placement: any, i: number) => (
                        <PlacementCard key={placement.id} placement={placement} index={i} featured />
                      ))}
                  </div>
                </div>
              )}

              {/* All Placements */}
              <div>
                <SectionHeading
                  eyebrow="All Stories"
                  title="Recent Placements"
                  subtitle="Every success story matters"
                />
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {placements
                    .filter((p: any) => !p.featured)
                    .map((placement: any, i: number) => (
                      <PlacementCard key={placement.id} placement={placement} index={i} />
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-background">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our training programs and become our next success story
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/courses">
              <Button size="lg" className="bg-gradient-primary shadow-glow">
                Explore Courses
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="glass">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlacementCard({ placement, index, featured = false }: { placement: any; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/placements/${placement.slug}`}>
        <Card className={`glass gradient-border hover-lift p-6 h-full ${featured ? 'border-primary/50' : ''}`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{placement.studentName}</h3>
              <p className="text-sm text-muted-foreground">{placement.position}</p>
            </div>
            {featured && (
              <Badge className="bg-gradient-primary">
                <Award className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="font-medium">{placement.companyName}</span>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            {placement.package && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IndianRupee className="w-4 h-4" />
                <span>₹{(placement.package / 100000).toFixed(1)}L per annum</span>
              </div>
            )}
            {placement.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{placement.location}</span>
              </div>
            )}
          </div>

          {/* Testimonial Preview */}
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            "{placement.testimonial}"
          </p>

          {/* Course Badge */}
          {placement.course && (
            <Badge variant="outline" className="text-xs">
              {placement.course}
            </Badge>
          )}

          {/* Read More */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <span className="text-sm text-primary hover:underline flex items-center gap-1">
              Read full story
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
