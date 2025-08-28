import { useParams, Link } from 'react-router-dom';
import { plants, statusLabels } from '@/data/plants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Leaf, Stethoscope } from 'lucide-react';

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Растение не найдено</h1>
            <Button asChild>
              <Link to="/">Вернуться на главную</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: typeof plant.status) => {
    switch (status) {
      case 'common': return 'bg-success text-success-foreground';
      case 'rare': return 'bg-warning text-warning-foreground';
      case 'endangered': return 'bg-destructive text-destructive-foreground';
      case 'protected': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Назад к каталогу
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <Card className="overflow-hidden bg-gradient-card border-border/50">
            <CardContent className="p-0">
              <img
                src={plant.image}
                alt={`${plant.commonName} (${plant.scientificName})`}
                className="w-full aspect-square object-cover"
              />
            </CardContent>
          </Card>

          {/* Information */}
          <div className="space-y-6">
            {/* Title */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl lg:text-3xl text-foreground">
                      {plant.commonName}
                    </CardTitle>
                    <p className="text-lg text-muted-foreground italic mt-1">
                      {plant.scientificName}
                    </p>
                    <p className="text-lg text-primary font-medium mt-1">
                      {plant.kazakhName}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(plant.status)} shadow-soft`}>
                    {statusLabels[plant.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{plant.description}</p>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  Основная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Семейство</h4>
                    <p className="text-muted-foreground">{plant.family}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Статус</h4>
                    <p className="text-muted-foreground">{statusLabels[plant.status]}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Регионы произрастания</h4>
                    <p className="text-muted-foreground">{plant.region.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Период цветения</h4>
                    <p className="text-muted-foreground">{plant.bloomingPeriod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Habitat */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Местообитание</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{plant.habitat}</p>
              </CardContent>
            </Card>

            {/* Characteristics */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Характеристики</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plant.characteristics.map((char, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      {char}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Uses */}
            {plant.uses && (
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-primary" />
                    Применение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{plant.uses}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;