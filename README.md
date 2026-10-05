# ana herazo · portafolio

portafolio personal construido con la marca "doodle to done" (brandbook en tane0776/marca-ana).
vite + react + typescript + tailwind (estructura shadcn), con dos componentes de 21st.dev adaptados a la marca:

- `src/components/ui/hero.tsx` · hero con shaders (`MeshGradient` + `PulsingBorder` de `@paper-design/shaders-react`, framer-motion)
- `src/components/ui/liquid-glass-button.tsx` · `LiquidButton` con filtro svg de vidrio líquido (`feDisplacementMap`)

## correr local

```bash
npm install
npm run dev      # http://localhost:5173/anaherazo/
npm run build    # genera dist/
```

## cómo editar

todo el texto sale de **`content/portfolio.json`**. no hay copy escrito en el código: editas el json, haces commit y el sitio se actualiza.

- **persona**: nombre, línea, frase (va en el hero con el recurso doodle to done: la primera oración a mano, el resto en itálica y la última palabra en bold), sobre mí, título, idiomas, cta.
- **destacados**: cada tarjeta grande. campos opcionales: `logros`, `lema`, `medios` (nube de pills), `articulos_confirmados` (tarjetas que abren el artículo en otra pestaña), `link` + `link_label` (pill con link en la tarjeta).
- **trayectoria**: la línea de tiempo (`nombre`, `rol`, `detalle`, `logros` opcional).
- **premios**: lista de textos. lo que va después de ` · ` se muestra como subtítulo.
- **ui**: títulos de secciones, botones, menú, footer y notas pequeñas.

### lo que no se muestra (a propósito)

- cualquier objeto con la llave **`confirmar`** se esconde completo (tarjeta, hito, recomendación…). para mostrarlo, borra la llave `confirmar`.
- **`articulos_por_confirmar_byline`** nunca se muestra. para publicar un artículo, muévelo a `articulos_confirmados` (con `fecha` tipo `"2026-09"` y `url`).
- un link en `persona.links` que esté vacío o empiece por **`[confirmar`** no se muestra. puedes poner la url completa (`https://…`) o el usuario (`@usuario`) para instagram, x, substack y linkedin; `email` es un correo normal.
- el botón "déjame una recomendación" abre un `mailto:` solo cuando `persona.links.email` es un correo real; si no, se ve desactivado con una notita.

## cómo agregar una recomendación

las recomendaciones las cura ana (no hay formulario público ni backend). cuando alguien te mande una, agrégala a `recomendaciones`:

```json
"recomendaciones": [
  {
    "nombre": "nombre apellido",
    "rol": "cargo · empresa",
    "relacion": "cómo trabajamos juntas",
    "texto": "la recomendación, en minúscula",
    "foto": "img/recomendaciones/nombre.jpg"
  }
]
```

`foto` es opcional (ruta dentro de `public/` o url completa). si el arreglo está vacío se muestra el estado vacío con el botón.

## publicar (github pages)

`.github/workflows/deploy.yml` construye y publica en github pages en cada push a `main` (build_type: workflow, `base: '/anaherazo/'`).
el repo es privado en github free, así que pages se activa cuando el repo sea público: settings → pages → source: **github actions**. la url queda en `https://tane0776.github.io/anaherazo/`.

## fuentes y licencias

- doodle hand (`public/fonts/DoodleHand.otf`) va con su licencia sil ofl en `public/fonts/DoodleHand-LICENSE.txt` (se publica junto a la fuente). respaldo: kalam (google fonts).
- figtree y dm mono vienen de google fonts.
