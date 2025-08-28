import { useState, useMemo } from 'react';
import { PlantCard } from '@/components/PlantCard';
import { SearchFilter, FilterState } from '@/components/SearchFilter';
import { plants } from '@/data/plants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Search, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-kazakhstan.jpg';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    regions: [],
    families: [],
    statuses: []
  });

  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.kazakhName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Region filter
      const matchesRegion = filters.regions.length === 0 ||
        filters.regions.some(region => plant.region.includes(region));

      // Family filter
      const matchesFamily = filters.families.length === 0 ||
        filters.families.includes(plant.family);

      // Status filter
      const matchesStatus = filters.statuses.length === 0 ||
        filters.statuses.includes(plant.status);

      return matchesSearch && matchesRegion && matchesFamily && matchesStatus;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Цифровой Гербарий
            </h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl text-primary font-semibold mb-4">
            Растений Казахстана
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Исследуйте богатое разнообразие флоры Казахстана. Научные описания, 
            ареалы распространения и уникальные характеристики растений великой степи.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-medium transition-all duration-smooth"
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="w-5 h-5 mr-2" />
              Исследовать каталог
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/10 backdrop-blur-sm"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Карта регионов
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-border/50 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{plants.length}</div>
                <div className="text-muted-foreground">Видов растений</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">10</div>
                <div className="text-muted-foreground">Регионов</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-muted-foreground">Семейств</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Каталог растений
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Найдите интересующие вас растения с помощью поиска и фильтров
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <SearchFilter
              searchQuery={searchQuery}
              filters={filters}
              onSearchChange={setSearchQuery}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Найдено растений: <span className="font-semibold text-foreground">{filteredPlants.length}</span>
            </p>
          </div>

          {/* Plant Grid */}
          {filteredPlants.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto bg-gradient-card border-border/50">
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Растения не найдены
                </h3>
                <p className="text-muted-foreground">
                  Попробуйте изменить критерии поиска или фильтры
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary/5 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">Цифровой Гербарий Казахстана</span>
          </div>
          <p className="text-muted-foreground">
            Сохраним и изучим природное наследие Казахстана вместе
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;