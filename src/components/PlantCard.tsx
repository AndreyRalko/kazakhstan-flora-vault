import { Plant, statusLabels } from '@/data/plants';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlantCardProps {
  plant: Plant;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
  const getStatusColor = (status: Plant['status']) => {
    switch (status) {
      case 'common': return 'bg-success text-success-foreground';
      case 'rare': return 'bg-warning text-warning-foreground';
      case 'endangered': return 'bg-destructive text-destructive-foreground';
      case 'protected': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-smooth hover:shadow-plant">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={plant.image}
            alt={`${plant.commonName} (${plant.scientificName})`}
            className="w-full h-full object-cover transition-transform duration-smooth group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge className={`${getStatusColor(plant.status)} shadow-soft`}>
              {statusLabels[plant.status]}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground leading-tight">
            {plant.commonName}
          </h3>
          <p className="text-sm text-muted-foreground italic">
            {plant.scientificName}
          </p>
          <p className="text-sm text-primary font-medium">
            {plant.kazakhName}
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {plant.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{plant.region[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{plant.bloomingPeriod}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
          <Link to={`/plant/${plant.id}`}>
            Подробнее
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};