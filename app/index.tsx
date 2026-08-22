import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Check,
  ChevronDown,
  Compass,
  Filter,
  H1,
  MapPin,
  MessageSquareText,
  Search,
  SearchBar,
  Sparkles,
  SizableText,
  XStack,
  YStack,
  ScrollView,
} from '@blinkdotnew/mobile-ui';

type Zone = 'CABA' | 'Zona Sur';
type Prospect = {
  id: string;
  name: string;
  category: string;
  zone: Zone;
  neighborhood: string;
  rating: string;
  reason: string;
  opportunity: string;
  color: string;
};

const prospects: Prospect[] = [
  { id: '1', name: 'Café Hiedra', category: 'Cafetería', zone: 'CABA', neighborhood: 'Palermo', rating: '4.7', reason: 'Mucho tránsito y una identidad visual muy cuidada.', opportunity: 'Cartel 3D para reseñas de Google y porta-menú de mostrador.', color: '#C8784A' },
  { id: '2', name: 'Pizzería San Telmo', category: 'Restaurante', zone: 'CABA', neighborhood: 'San Telmo', rating: '4.5', reason: 'Recibe turistas y necesita destacar su propuesta en la vereda.', opportunity: 'Logo 3D iluminado y display de mesa con QR para reservas.', color: '#E3A33A' },
  { id: '3', name: 'Estudio Norte Pilates', category: 'Salud y bienestar', zone: 'CABA', neighborhood: 'Villa Urquiza', rating: '4.9', reason: 'Marca premium con espacio físico ideal para señalética.', opportunity: 'Letras corpóreas del logo y placas 3D para salas.', color: '#4C8C82' },
  { id: '4', name: 'Bodega La Esquina', category: 'Vinoteca', zone: 'Zona Sur', neighborhood: 'Adrogué', rating: '4.6', reason: 'El punto de venta puede convertir visitantes en clientes recurrentes.', opportunity: 'Exhibidor 3D para botellas y tótem con QR de reseñas.', color: '#8B5A50' },
  { id: '5', name: 'Marea Barber Club', category: 'Barbería', zone: 'Zona Sur', neighborhood: 'Banfield', rating: '4.8', reason: 'Tiene una estética fuerte y alto potencial para contenido en redes.', opportunity: 'Logo 3D para recepción y porta-turnos personalizado.', color: '#5D6B77' },
  { id: '6', name: 'Club Naranja', category: 'Gimnasio', zone: 'CABA', neighborhood: 'Caballito', rating: '4.4', reason: 'Necesita señalizar rutinas y reforzar la comunidad del club.', opportunity: 'Placas motivacionales 3D y medallero para desafíos mensuales.', color: '#D97835' },
  { id: '7', name: 'Casa Loto', category: 'Decoración', zone: 'Zona Sur', neighborhood: 'Lomas de Zamora', rating: '4.7', reason: 'Su público valora piezas únicas y terminaciones artesanales.', opportunity: 'Exhibidores modulares y piezas decorativas de edición limitada.', color: '#B8876F' },
  { id: '8', name: 'Veterinaria Parque', category: 'Veterinaria', zone: 'CABA', neighborhood: 'Belgrano', rating: '4.8', reason: 'Puede mejorar la experiencia de espera y la recordación de marca.', opportunity: 'Logo 3D, porta-folletos y trofeos para campañas de adopción.', color: '#6A9B78' },
];

const proposalTemplates = [
  (p: Prospect) => `Hola, equipo de ${p.name}. Vi que trabajan en ${p.category} en ${p.neighborhood} y pensé en una idea concreta para su local: ${p.opportunity.toLowerCase()} La propuesta busca que su marca se vea más profesional, genere interacción y convierta cada visita en una nueva reseña. Podemos diseñar una pieza a medida, producir un prototipo y entregar una versión lista para usar. ¿Les comparto algunas alternativas?`,
  (p: Prospect) => `Hola, ¿cómo están? Les escribo porque ${p.name} tiene una identidad que puede ganar mucha presencia con impresión 3D. Para un negocio de ${p.category}, les propondría ${p.opportunity.toLowerCase()}, con colores y medidas alineados al espacio. Es una solución práctica, diferenciadora y pensada para que los clientes la fotografíen y compartan. ¿Coordinamos una breve llamada?`,
  (p: Prospect) => `Buenas, ${p.name}. Analizando comercios de ${p.neighborhood}, encontré una oportunidad para ustedes: ${p.opportunity.toLowerCase()} No sería una pieza genérica: la diseñamos desde cero para su marca y su forma de atender. Así pueden destacarse en el punto de venta y conseguir más acciones de sus visitantes. Si les interesa, les envío un boceto inicial sin compromiso.`,
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [zone, setZone] = useState<'Todas' | Zone>('Todas');
  const [category, setCategory] = useState('Todos los rubros');
  const [selected, setSelected] = useState<Prospect | null>(null);
  const [proposal, setProposal] = useState('');
  const [templateIndex, setTemplateIndex] = useState(0);

  const categories = useMemo(() => ['Todos los rubros', ...Array.from(new Set(prospects.map((p) => p.category)))], []);
  const filtered = useMemo(() => prospects.filter((p) => {
    const matchesSearch = `${p.name} ${p.category} ${p.neighborhood}`.toLowerCase().includes(query.toLowerCase());
    return matchesSearch && (zone === 'Todas' || p.zone === zone) && (category === 'Todos los rubros' || p.category === category);
  }), [query, zone, category]);

  const createProposal = (prospect: Prospect) => {
    setSelected(prospect);
    setProposal(proposalTemplates[templateIndex % proposalTemplates.length](prospect));
    setTemplateIndex((value) => value + 1);
  };

  return (
    <YStack flex={1} backgroundColor="#F6F3EE">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <YStack backgroundColor="#173B3A" paddingHorizontal="$5" paddingTop="$7" paddingBottom="$6" gap="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" gap="$2">
              <YStack backgroundColor="#E3A33A" borderRadius="$3" padding="$2">
                <Compass size={22} color="#173B3A" />
              </YStack>
              <SizableText color="#F8F4EC" fontWeight="800" size="$5">DyL</SizableText>
            </XStack>
            <Badge variant="warning">PROSPECCIÓN</Badge>
          </XStack>
          <YStack gap="$2">
            <SizableText color="#E3A33A" size="$3" fontWeight="700" letterSpacing={1}>POSIBLES CLIENTES DYL</SizableText>
            <H1 color="#F8F4EC" size="$9" lineHeight={44}>Encontrá negocios que necesitan ideas en 3D.</H1>
            <SizableText color="#C4D6D0" size="$4" lineHeight={23}>Explorá CABA y Zona Sur, detectá oportunidades y generá un contacto personalizado en un clic.</SizableText>
          </YStack>
          <XStack backgroundColor="#F8F4EC" borderRadius="$4" paddingHorizontal="$3" alignItems="center" gap="$2" minHeight={52}>
            <Search size={19} color="#56706D" />
            <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar comercio, rubro o barrio" />
          </XStack>
        </YStack>

        <YStack padding="$5" gap="$5">
          <XStack gap="$2" flexWrap="wrap">
            <Button size="$3" minHeight={44} borderRadius="$4" backgroundColor={zone === 'Todas' ? '#173B3A' : '#E8E2D9'} color={zone === 'Todas' ? '#F8F4EC' : '#35504D'} onPress={() => setZone('Todas')}>Todas las zonas</Button>
            <Button size="$3" minHeight={44} borderRadius="$4" backgroundColor={zone === 'CABA' ? '#173B3A' : '#E8E2D9'} color={zone === 'CABA' ? '#F8F4EC' : '#35504D'} onPress={() => setZone('CABA')}><MapPin size={15} /> CABA</Button>
            <Button size="$3" minHeight={44} borderRadius="$4" backgroundColor={zone === 'Zona Sur' ? '#173B3A' : '#E8E2D9'} color={zone === 'Zona Sur' ? '#F8F4EC' : '#35504D'} onPress={() => setZone('Zona Sur')}><MapPin size={15} /> Zona Sur</Button>
          </XStack>
          <XStack alignItems="center" justifyContent="space-between">
            <YStack gap="$1">
              <SizableText color="#173B3A" size="$6" fontWeight="800">Oportunidades cercanas</SizableText>
              <SizableText color="#71817D" size="$3">{filtered.length} comercios con potencial detectado</SizableText>
            </YStack>
            <XStack alignItems="center" gap="$2" backgroundColor="#E8E2D9" borderRadius="$3" paddingHorizontal="$3" minHeight={42}>
              <Filter size={15} color="#35504D" />
              <SizableText color="#35504D" size="$3">{category === 'Todos los rubros' ? 'Todos' : category}</SizableText>
              <ChevronDown size={15} color="#35504D" />
            </XStack>
          </XStack>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {categories.map((item) => <Button key={item} size="$2" minHeight={38} borderRadius="$4" backgroundColor={category === item ? '#D97835' : '#E8E2D9'} color={category === item ? '#FFF9F1' : '#35504D'} onPress={() => setCategory(item)}>{item}</Button>)}
          </ScrollView>

          <YStack gap="$3">
            {filtered.map((prospect) => (
              <Card key={prospect.id} bordered borderColor="#E6DED3" backgroundColor="#FFFDF9" borderRadius="$4" elevation={2} padding="$4">
                <XStack justifyContent="space-between" gap="$3">
                  <XStack gap="$3" flex={1}>
                    <YStack width={48} height={48} borderRadius="$3" backgroundColor={prospect.color} alignItems="center" justifyContent="center">
                      <SizableText color="#FFF9F1" size="$6" fontWeight="800">{prospect.name.charAt(0)}</SizableText>
                    </YStack>
                    <YStack flex={1} gap="$1">
                      <XStack alignItems="center" gap="$2" flexWrap="wrap">
                        <SizableText color="#173B3A" size="$5" fontWeight="800">{prospect.name}</SizableText>
                        <Badge variant="success">{prospect.zone}</Badge>
                      </XStack>
                      <SizableText color="#71817D" size="$3">{prospect.category} · {prospect.neighborhood} · ★ {prospect.rating}</SizableText>
                    </YStack>
                  </XStack>
                </XStack>
                <YStack backgroundColor="#F6F3EE" borderRadius="$3" padding="$3" marginTop="$3" gap="$2">
                  <XStack alignItems="center" gap="$2"><Sparkles size={15} color="#D97835" /><SizableText color="#35504D" size="$3" fontWeight="700">Por qué puede funcionar</SizableText></XStack>
                  <SizableText color="#5D6C68" size="$3" lineHeight={19}>{prospect.reason}</SizableText>
                </YStack>
                <XStack justifyContent="space-between" alignItems="center" marginTop="$3" gap="$3">
                  <SizableText color="#71817D" size="$3" flex={1}>{prospect.opportunity}</SizableText>
                  <Button backgroundColor="#D97835" color="#FFF9F1" borderRadius="$3" minHeight={46} paddingHorizontal="$4" onPress={() => createProposal(prospect)}><MessageSquareText size={16} /> Propuesta</Button>
                </XStack>
              </Card>
            ))}
          </YStack>

          {filtered.length === 0 && <Card backgroundColor="#FFFDF9" bordered borderColor="#E6DED3" padding="$5"><YStack alignItems="center" gap="$3"><Search size={32} color="#D97835" /><SizableText color="#173B3A" size="$5" fontWeight="700">No encontramos ese comercio</SizableText><SizableText color="#71817D" textAlign="center">Probá con otro barrio, rubro o quitá algún filtro.</SizableText></YStack></Card>}

          {selected && proposal && <Card backgroundColor="#173B3A" borderRadius="$4" padding="$5" gap="$4">
            <XStack justifyContent="space-between" alignItems="center"><XStack alignItems="center" gap="$2"><MessageSquareText size={20} color="#E3A33A" /><SizableText color="#F8F4EC" size="$6" fontWeight="800">Propuesta para {selected.name}</SizableText></XStack><Button chromeless color="#C4D6D0" onPress={() => setSelected(null)}>Cerrar</Button></XStack>
            <SizableText color="#DDE9E3" size="$4" lineHeight={23}>{proposal}</SizableText>
            <XStack alignItems="center" gap="$2"><Check size={16} color="#E3A33A" /><SizableText color="#C4D6D0" size="$3">Texto único · adaptado a su rubro · listo para copiar</SizableText></XStack>
            <Button backgroundColor="#E3A33A" color="#173B3A" borderRadius="$3" minHeight={48} onPress={() => setProposal(proposalTemplates[(templateIndex) % proposalTemplates.length](selected))}>Generar otra versión</Button>
          </Card>}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
