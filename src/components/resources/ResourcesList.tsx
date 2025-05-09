
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { ResourceItem } from "@/types/resources";
import { getLucideIcon } from "@/utils/iconUtils";

interface ResourcesListProps {
  resources: ResourceItem[];
}

export function ResourcesList({ resources }: ResourcesListProps) {
  const formatDownloadCount = (count?: number) => {
    if (!count) return "";
    return count > 999 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="group transition-all hover:shadow-md h-full flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  {getLucideIcon(resource.icon)}
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mt-2">
                {resource.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="px-2 py-1 bg-secondary/10 text-secondary-foreground rounded-md text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center">
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Download className="h-4 w-4" />
                {formatDownloadCount(resource.downloadCount)}
              </div>
              <Button asChild variant="ghost" className="ml-auto group">
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  {resource.category === 'template' ? 'Télécharger' : 'Consulter'}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
