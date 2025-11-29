export const recipes = [
  {
    title: 'Espagueti al pomodoro',
    slug: 'espagueti-al-pomodoro',
    description: 'Receta clasica italiana con salsa de tomate fresca, albahaca y un toque de queso parmesano rallado.',
    cuisine: 'Italiana',
    course: 'Principal',
    difficulty: 'easy',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTimeMinutes: 35,
    tags: ['pasta', 'vegetariano', 'rapido'],
    ingredients: [
      { name: 'Pasta espagueti', quantity: 400, unit: 'g' },
      { name: 'Tomate', quantity: 6, unit: 'unidad', notes: 'maduro' },
      { name: 'Ajo', quantity: 3, unit: 'diente' },
      { name: 'Aceite de oliva virgen extra', quantity: 3, unit: 'cda' },
      { name: 'Albahaca fresca', quantity: 12, unit: 'hoja' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' },
      { name: 'Queso parmesano', quantity: 40, unit: 'g', notes: 'rallado' }
    ],
    instructions: [
      'Cocer la pasta en agua con sal hasta que quede al dente.',
      'Sofreir el ajo laminado en aceite de oliva sin que se dore en exceso.',
      'Agregar el tomate picado, salpimentar y cocinar 10 minutos hasta obtener salsa.',
      'Mezclar la pasta escurrida con la salsa y hojas de albahaca troceadas.',
      'Servir con queso parmesano rallado y un hilo de aceite crudo.'
    ],
    tips: [
      'Reserva un cazo del agua de coccion para ajustar la textura de la salsa.',
      'Agrega la albahaca al final para mantener el aroma fresco.'
    ],
    nutrition: {
      calories: 520,
      protein: 18,
      carbs: 72,
      fat: 18,
      fiber: 6,
      sugar: 9
    },
    imageUrl: 'https://media.istockphoto.com/id/155433188/es/foto/spaghetti-tomate-y-albahaca.jpg?s=612x612&w=0&k=20&c=Vrs52xXuylrmefz6wBHknFupab3wjyJ7k16JsI9I7tw=',
    source: 'Recetario de la Nonna'
  },
  {
    title: 'Pollo al limon y ajo con hierbas',
    slug: 'pollo-al-limon-y-ajo',
    description: 'Pechugas de pollo marinadas en limon, ajo y albahaca, horneadas hasta quedar jugosas.',
    cuisine: 'Mediterranea',
    course: 'Principal',
    difficulty: 'easy',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    totalTimeMinutes: 45,
    tags: ['pollo', 'horneado', 'sin-gluten'],
    ingredients: [
      { name: 'Pechuga de pollo', quantity: 4, unit: 'unidad' },
      { name: 'Limon', quantity: 2, unit: 'unidad', notes: 'zumo y ralladura' },
      { name: 'Ajo', quantity: 4, unit: 'diente', notes: 'picado fino' },
      { name: 'Aceite de oliva virgen extra', quantity: 2, unit: 'cda' },
      { name: 'Mantequilla', quantity: 30, unit: 'g', optional: true },
      { name: 'Albahaca fresca', quantity: 10, unit: 'hoja', notes: 'picada' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Precalentar el horno a 200 °C.',
      'Mezclar el zumo de limon, la ralladura, el ajo, el aceite y la albahaca.',
      'Marinar las pechugas con la mezcla al menos 15 minutos.',
      'Colocar en bandeja, salar, añadir mantequilla en trocitos y hornear 20-25 minutos.',
      'Servir con el jugo de coccion por encima.'
    ],
    tips: [
      'Pincha la pechuga y si los jugos salen claros esta lista.',
      'Acompaña con verduras asadas o arroz blanco.'
    ],
    nutrition: {
      calories: 280,
      protein: 32,
      carbs: 3,
      fat: 14,
      fiber: 1,
      sugar: 1
    },
    imageUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/6LCRFKNE5FCSJILCS2B23R2Q5E.jpeg',
    source: 'Cuaderno familiar'
  },
  {
    title: 'Sopa rustica de verduras y garbanzos',
    slug: 'sopa-verduras-garbanzos',
    description: 'Sopa espesa con garbanzos, tomate y verduras de temporada, perfecta para dias frios.',
    cuisine: 'Mediterranea',
    course: 'Sopa',
    difficulty: 'easy',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    totalTimeMinutes: 50,
    tags: ['sopa', 'legumbres', 'comfort-food'],
    ingredients: [
      { name: 'Aceite de oliva virgen extra', quantity: 2, unit: 'cda' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', notes: 'picada' },
      { name: 'Ajo', quantity: 3, unit: 'diente', notes: 'picado' },
      { name: 'Zanahoria', quantity: 2, unit: 'unidad', notes: 'en cubos' },
      { name: 'Apio', quantity: 2, unit: 'tallo', notes: 'en cubos' },
      { name: 'Pimiento rojo', quantity: 1, unit: 'unidad', notes: 'en tiras' },
      { name: 'Tomate', quantity: 4, unit: 'unidad', notes: 'pelados y picados' },
      { name: 'Garbanzos cocidos', quantity: 400, unit: 'g' },
      { name: 'Caldo de pollo', quantity: 1.5, unit: 'l' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Sofreir cebolla, ajo, zanahoria, apio y pimiento durante 8 minutos.',
      'Agregar el tomate y cocinar 5 minutos mas para que se deshaga.',
      'Incorporar garbanzos y caldo, llevar a ebullicion y bajar el fuego.',
      'Cocinar 20 minutos, salpimentar y servir caliente.'
    ],
    tips: [
      'Anade un chorrito de aceite crudo al servir para potenciar el sabor.',
      'Puedes triturar parte de la sopa para darle mas cuerpo.'
    ],
    nutrition: {
      calories: 210,
      protein: 9,
      carbs: 28,
      fat: 8,
      fiber: 7,
      sugar: 9
    },
    imageUrl: 'https://www.goya.com/wp-content/uploads/2023/10/winter-vegetable-and-chick-pea-soup.jpg',
    source: 'Blog Cocina de Mercado'
  },
  {
    title: 'Paella mediterranea de mar y tierra',
    slug: 'paella-mediterranea',
    description: 'Paella sencilla con gambas, chorizo y verduras, lista en menos de una hora.',
    cuisine: 'Espanola',
    course: 'Principal',
    difficulty: 'medium',
    servings: 5,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    totalTimeMinutes: 55,
    tags: ['arroz', 'mariscos', 'mediterranea'],
    ingredients: [
      { name: 'Aceite de oliva virgen extra', quantity: 3, unit: 'cda' },
      { name: 'Ajo', quantity: 3, unit: 'diente', notes: 'picado' },
      { name: 'Pimiento rojo', quantity: 1, unit: 'unidad', notes: 'en tiras' },
      { name: 'Tomate', quantity: 2, unit: 'unidad', notes: 'rallado' },
      { name: 'Chorizo curado', quantity: 120, unit: 'g', notes: 'en rodajas' },
      { name: 'Arroz bomba', quantity: 350, unit: 'g' },
      { name: 'Caldo de pollo', quantity: 900, unit: 'ml' },
      { name: 'Gambas', quantity: 200, unit: 'g', notes: 'peladas' },
      { name: 'Guisantes', quantity: 120, unit: 'g' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Calentar el aceite en paellera y sofreir ajo, pimiento y tomate 5 minutos.',
      'Agregar el chorizo, saltear 2 minutos y anadir el arroz mezclando bien.',
      'Verter caldo caliente, rectificar de sal y cocinar 10 minutos a fuego medio.',
      'Agregar gambas y guisantes, cocinar 8 minutos mas sin remover.',
      'Reposar 5 minutos tapado con un pano antes de servir.'
    ],
    tips: [
      'No remuevas el arroz en los ultimos minutos para lograr socarrat.',
      'Utiliza caldo caliente para no cortar la coccion.'
    ],
    nutrition: {
      calories: 560,
      protein: 28,
      carbs: 70,
      fat: 18,
      fiber: 5,
      sugar: 6
    },
    imageUrl: 'https://colonogourmet.com/cdn/shop/articles/Paella_de_chorizo_y_langostinos_1280x.jpg?v=1648046239',
    source: 'Recetario de la familia Costa'
  },
  {
    title: 'Salteado oriental de pollo y verduras',
    slug: 'salteado-oriental-pollo',
    description: 'Salteado rapido con pollo, verduras crujientes, salsa de soja y jengibre fresco.',
    cuisine: 'Asiatica',
    course: 'Principal',
    difficulty: 'medium',
    servings: 3,
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    totalTimeMinutes: 27,
    tags: ['wok', 'rapido', 'alto-proteina'],
    ingredients: [
      { name: 'Pechuga de pollo', quantity: 2, unit: 'unidad', notes: 'en tiras finas' },
      { name: 'Aceite de oliva virgen extra', quantity: 2, unit: 'cda' },
      { name: 'Ajo', quantity: 2, unit: 'diente', notes: 'picado' },
      { name: 'Jengibre', quantity: 20, unit: 'g', notes: 'rallado' },
      { name: 'Pimiento rojo', quantity: 1, unit: 'unidad', notes: 'en bastones' },
      { name: 'Zanahoria', quantity: 1, unit: 'unidad', notes: 'en bastones' },
      { name: 'Guisantes', quantity: 80, unit: 'g' },
      { name: 'Salsa de soja', quantity: 3, unit: 'cda' },
      { name: 'Cilantro fresco', quantity: 6, unit: 'ramita', notes: 'picado' },
      { name: 'Sal marina', quantity: 0.5, unit: 'cdita', optional: true },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Calentar el aceite en wok y dorar el pollo salpimentado 3 minutos, retirar.',
      'En el mismo wok sofreir ajo y jengibre 30 segundos.',
      'Agregar pimiento, zanahoria y guisantes, saltear 4 minutos a fuego alto.',
      'Devolver el pollo, sumar la salsa de soja y cocinar 2 minutos.',
      'Servir con cilantro fresco picado.'
    ],
    tips: [
      'No sobrecargues el wok para mantener la temperatura alta.',
      'Sirve con arroz blanco o fideos salteados.'
    ],
    nutrition: {
      calories: 340,
      protein: 34,
      carbs: 18,
      fat: 14,
      fiber: 4,
      sugar: 7
    },
    imageUrl: 'https://www.publico.es/files/image_horizontal_mobile/uploads/2024/11/19/673cf40ed5790.jpeg',
    source: 'Street Food Notes'
  },
  {
    title: 'Ensalada tibia de quinua y espinacas',
    slug: 'ensalada-quinua-espinacas',
    description: 'Ensalada templada con quinua, espinaca fresca, tomate y vinagreta de limon.',
    cuisine: 'Fusion',
    course: 'Principal',
    difficulty: 'easy',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTimeMinutes: 35,
    tags: ['ensalada', 'superfoods', 'vegano'],
    ingredients: [
      { name: 'Quinua', quantity: 250, unit: 'g' },
      { name: 'Caldo de pollo', quantity: 600, unit: 'ml', notes: 'o caldo vegetal' },
      { name: 'Espinaca fresca', quantity: 150, unit: 'g' },
      { name: 'Tomate', quantity: 2, unit: 'unidad', notes: 'en cubos' },
      { name: 'Cebolla', quantity: 0.5, unit: 'unidad', notes: 'morada, picada finamente' },
      { name: 'Cilantro fresco', quantity: 4, unit: 'ramita', notes: 'picado' },
      { name: 'Limon', quantity: 1, unit: 'unidad', notes: 'zumo' },
      { name: 'Aceite de oliva virgen extra', quantity: 3, unit: 'cda' },
      { name: 'Sal marina', quantity: 0.75, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Enjuagar la quinua y cocerla en caldo durante 15 minutos, dejar reposar.',
      'Saltear brevemente la espinaca en una sartén con media cucharada de aceite.',
      'Mezclar la quinua tibia con tomate, cebolla, espinaca y cilantro.',
      'Preparar vinagreta con limon, aceite restante, sal y pimienta y aliñar.'
    ],
    tips: [
      'Tuesta la quinua en seco antes de cocerla para potenciar el sabor.',
      'Sirve templada o fria al dia siguiente.'
    ],
    nutrition: {
      calories: 310,
      protein: 11,
      carbs: 40,
      fat: 12,
      fiber: 6,
      sugar: 5
    },
    imageUrl: 'https://chefeel.com/chefgeneralfiles/2023/03/ensaladas-quinua-rucula-rabano-tomate-pepino-recipiente-mesa-madera-comida-sana-dieta-desintoxicacion-concepto-vegetariano-880x587.jpg',
    source: 'Revista Comer Sano'
  },
  {
    title: 'Curry suave de garbanzos y tomate',
    slug: 'curry-garbanzos-tomate',
    description: 'Garbanzos estofados en salsa de tomate aromatizada con jengibre, ajo y comino.',
    cuisine: 'Fusion',
    course: 'Principal',
    difficulty: 'easy',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    totalTimeMinutes: 35,
    tags: ['vegano', 'picante-suave', 'legumbres'],
    ingredients: [
      { name: 'Aceite de oliva virgen extra', quantity: 2, unit: 'cda' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', notes: 'picada' },
      { name: 'Ajo', quantity: 3, unit: 'diente', notes: 'picado' },
      { name: 'Jengibre', quantity: 15, unit: 'g', notes: 'rallado' },
      { name: 'Comino molido', quantity: 1, unit: 'cdita' },
      { name: 'Tomate', quantity: 4, unit: 'unidad', notes: 'en cubos' },
      { name: 'Garbanzos cocidos', quantity: 400, unit: 'g' },
      { name: 'Caldo de pollo', quantity: 250, unit: 'ml', notes: 'o agua' },
      { name: 'Sal marina', quantity: 0.75, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.25, unit: 'cdita' },
      { name: 'Cilantro fresco', quantity: 6, unit: 'ramita', notes: 'hojas para decorar' },
      { name: 'Limon', quantity: 0.5, unit: 'unidad', notes: 'para servir' }
    ],
    instructions: [
      'Rehogar cebolla, ajo y jengibre en aceite 5 minutos.',
      'Anadir comino y tostar 30 segundos.',
      'Agregar tomate, cocinar 8 minutos y sumar garbanzos y caldo.',
      'Cocinar 10 minutos a fuego medio hasta espesar, salpimentar.',
      'Servir con cilantro fresco y gotas de limon.'
    ],
    tips: [
      'Si prefieres mas cremosidad, tritura una parte de los garbanzos.',
      'Acompana con arroz blanco o pan plano.'
    ],
    nutrition: {
      calories: 290,
      protein: 11,
      carbs: 35,
      fat: 12,
      fiber: 9,
      sugar: 9
    },
    imageUrl: 'https://www.divinavinagreta.es/wp-content/uploads/2021/04/garbanzos-tomate-chana-masala-1.jpg',
    source: 'Recetas sin prisa'
  },
  {
    title: 'Crema de champinones y cebolla caramelizada',
    slug: 'crema-champinones-cebolla',
    description: 'Sopa cremosa con champinones salteados, base de cebolla y toque de mantequilla.',
    cuisine: 'Internacional',
    course: 'Sopa',
    difficulty: 'medium',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    totalTimeMinutes: 45,
    tags: ['sopa', 'vegetariano', 'cremoso'],
    ingredients: [
      { name: 'Mantequilla', quantity: 40, unit: 'g' },
      { name: 'Aceite de oliva virgen extra', quantity: 1, unit: 'cda' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', notes: 'en juliana' },
      { name: 'Ajo', quantity: 2, unit: 'diente', notes: 'picado' },
      { name: 'Champinones', quantity: 400, unit: 'g', notes: 'en laminas' },
      { name: 'Harina de trigo', quantity: 1.5, unit: 'cda' },
      { name: 'Caldo de pollo', quantity: 800, unit: 'ml' },
      { name: 'Leche entera', quantity: 200, unit: 'ml' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Derretir mantequilla con aceite y caramelizar la cebolla 10 minutos.',
      'Agregar ajo y champinones, saltear hasta que doren y reduzcan.',
      'Anadir harina, remover 1 minuto y verter caldo poco a poco.',
      'Cocinar 15 minutos, sumar leche y ajustar de sal y pimienta.',
      'Triturar parcialmente si se desea textura mas fina.'
    ],
    tips: [
      'Reserva algunos champinones dorados para decorar.',
      'Sustituye la leche por nata para una crema mas rica.'
    ],
    nutrition: {
      calories: 260,
      protein: 9,
      carbs: 18,
      fat: 17,
      fiber: 3,
      sugar: 8
    },
    imageUrl: 'https://www.hazteveg.com/img/recipes/full/202212/R01-75558.jpg',
    source: 'Gastronomia Urbana'
  },
  {
    title: 'Tortitas de banana y miel',
    slug: 'tortitas-banana-miel',
    description: 'Pancakes esponjosos endulzados naturalmente con banana y miel.',
    cuisine: 'Desayuno',
    course: 'Desayuno',
    difficulty: 'easy',
    servings: 3,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    tags: ['desayuno', 'dulce', 'sin-refinados'],
    ingredients: [
      { name: 'Banana', quantity: 2, unit: 'unidad', notes: 'maduras' },
      { name: 'Huevo', quantity: 2, unit: 'unidad' },
      { name: 'Harina de trigo', quantity: 120, unit: 'g' },
      { name: 'Leche entera', quantity: 180, unit: 'ml' },
      { name: 'Miel', quantity: 2, unit: 'cda' },
      { name: 'Mantequilla', quantity: 30, unit: 'g', notes: 'derretida' },
      { name: 'Sal marina', quantity: 0.25, unit: 'cdita' },
      { name: 'Aceite de oliva virgen extra', quantity: 1, unit: 'cda', notes: 'para la plancha', optional: true }
    ],
    instructions: [
      'Triturar las bananas con los huevos hasta obtener mezcla homogenea.',
      'Incorporar harina, sal y leche poco a poco, mezclar sin grumos.',
      'Agregar miel y mantequilla derretida, reposar 5 minutos.',
      'Cocinar porciones pequeñas en plancha engrasada 2 minutos por lado.',
      'Servir con miel extra y rodajas de banana.'
    ],
    tips: [
      'No mezcles en exceso para evitar tortitas densas.',
      'Puedes anadir canela molida al gusto.'
    ],
    nutrition: {
      calories: 310,
      protein: 9,
      carbs: 48,
      fat: 10,
      fiber: 3,
      sugar: 18
    },
    imageUrl: 'https://www.infobae.com/new-resizer/IzQ4_LC6fWZnm55PrX6wZCLTpbI=/arc-anglerfish-arc2-prod-infobae/public/62DQR4CRIFBP5HHVZLJTTBYPX4.jpg',
    source: 'Brunch Lovers'
  },
  {
    title: 'Galletas crujientes de chocolate negro',
    slug: 'galletas-chocolate-negro',
    description: 'Galletas con bordes crujientes y centro suave, cargadas de chocolate 70%.',
    cuisine: 'Postre',
    course: 'Postre',
    difficulty: 'easy',
    servings: 24,
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    totalTimeMinutes: 27,
    tags: ['postre', 'chocolate', 'horneado'],
    ingredients: [
      { name: 'Harina de trigo', quantity: 220, unit: 'g' },
      { name: 'Mantequilla', quantity: 120, unit: 'g', notes: 'a temperatura ambiente' },
      { name: 'Azucar blanca', quantity: 150, unit: 'g' },
      { name: 'Huevo', quantity: 1, unit: 'unidad' },
      { name: 'Chocolate negro 70%', quantity: 150, unit: 'g', notes: 'picado' },
      { name: 'Sal marina', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Batir mantequilla con azucar hasta blanquear.',
      'Agregar huevo y mezclar, incorporar harina y sal tamizadas.',
      'Sumar el chocolate picado y mezclar justo hasta integrar.',
      'Formar bolas y colocarlas en bandeja, refrigerar 20 minutos.',
      'Hornear a 180 °C durante 12 minutos y enfriar en rejilla.'
    ],
    tips: [
      'Refrigera la masa para que las galletas mantengan la forma.',
      'Espolvorea sal en escamas al salir del horno para realzar el dulce.'
    ],
    nutrition: {
      calories: 140,
      protein: 2,
      carbs: 18,
      fat: 7,
      fiber: 1,
      sugar: 12
    },
    imageUrl: 'https://images.aws.nestle.recipes/resized/2024_10_28T11_07_30_badun_images.badun.es_galletas_crujientes_de_chocolate_y_frutos_secos_1290_742.jpg',
    source: 'Sweet Tooth Magazine'
  },
  {
    title: 'Ensalada verde estilo caprese',
    slug: 'ensalada-verde-caprese',
    description: 'Version fresca de la caprese con espinaca, tomate, albahaca y lascas de parmesano.',
    cuisine: 'Italiana',
    course: 'Entrante',
    difficulty: 'easy',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    totalTimeMinutes: 10,
    tags: ['ensalada', 'vegetariano', 'sin-coccion'],
    ingredients: [
      { name: 'Espinaca fresca', quantity: 120, unit: 'g' },
      { name: 'Tomate', quantity: 3, unit: 'unidad', notes: 'en rodajas' },
      { name: 'Albahaca fresca', quantity: 16, unit: 'hoja' },
      { name: 'Queso parmesano', quantity: 50, unit: 'g', notes: 'en lascas' },
      { name: 'Aceite de oliva virgen extra', quantity: 3, unit: 'cda' },
      { name: 'Limon', quantity: 0.5, unit: 'unidad', notes: 'zumo' },
      { name: 'Sal marina', quantity: 0.5, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.25, unit: 'cdita' }
    ],
    instructions: [
      'Disponer la espinaca como base en una fuente.',
      'Alternar rodajas de tomate y hojas de albahaca encima.',
      'Regar con aceite de oliva y zumo de limon.',
      'Agregar lascas de parmesano y sazonar con sal y pimienta.'
    ],
    tips: [
      'Utiliza tomates maduros pero firmes para un mejor corte.',
      'Agrega frutos secos tostados para mas textura.'
    ],
    nutrition: {
      calories: 210,
      protein: 9,
      carbs: 9,
      fat: 16,
      fiber: 3,
      sugar: 5
    },
    imageUrl: 'https://deliciaskitchen.b-cdn.net/wp-content/uploads/2022/07/ensalada-caprese-receta-original-italiana.jpg',
    source: 'Cocina Ligera'
  },
  {
    title: 'Caldo reconfortante de pollo y verduras',
    slug: 'caldo-pollo-verduras',
    description: 'Sopa ligera con caldo casero, pollo desmenuzado y pasta fina.',
    cuisine: 'Internacional',
    course: 'Sopa',
    difficulty: 'easy',
    servings: 6,
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    totalTimeMinutes: 50,
    tags: ['sopa', 'pollo', 'comfort-food'],
    ingredients: [
      { name: 'Caldo de pollo', quantity: 1.5, unit: 'l' },
      { name: 'Pechuga de pollo', quantity: 2, unit: 'unidad' },
      { name: 'Zanahoria', quantity: 2, unit: 'unidad', notes: 'en rodajas' },
      { name: 'Apio', quantity: 2, unit: 'tallo', notes: 'en rodajas' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', notes: 'picada' },
      { name: 'Ajo', quantity: 2, unit: 'diente', notes: 'picado' },
      { name: 'Pasta espagueti', quantity: 120, unit: 'g', notes: 'partida en piezas cortas' },
      { name: 'Aceite de oliva virgen extra', quantity: 1, unit: 'cda' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' },
      { name: 'Cilantro fresco', quantity: 4, unit: 'ramita', optional: true, notes: 'picado para servir' }
    ],
    instructions: [
      'Sofreir cebolla, ajo, zanahoria y apio con aceite 5 minutos.',
      'Agregar caldo y pechugas, llevar a ebullicion y cocinar 20 minutos.',
      'Retirar el pollo, desmenuzarlo y devolverlo a la olla.',
      'Anadir la pasta y cocinar 6 minutos, salpimentar y servir.',
      'Decorar con cilantro fresco si se desea.'
    ],
    tips: [
      'Espuma el caldo durante la coccion para un resultado mas limpio.',
      'Sustituye la pasta por arroz si prefieres.'
    ],
    nutrition: {
      calories: 260,
      protein: 22,
      carbs: 28,
      fat: 7,
      fiber: 3,
      sugar: 6
    },
    imageUrl: 'https://www.pequerecetas.com/wp-content/uploads/2023/10/como-hacer-sopa-de-pollo-receta-facil.jpeg',
    source: 'Recetas de la abuela'
  },
  {
    title: 'Lasagna Bolognese',
    slug: 'lasagna-bolognese',
    description: 'Una lasaña tradicional con salsa boloñesa, queso ricotta y mucho queso mozzarella.',
    cuisine: 'Italiana',
    course: 'Principal',
    difficulty: 'medium',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 60,
    totalTimeMinutes: 90,
    tags: ['pasta', 'carne', 'horneado'],
    ingredients: [
      { name: 'Láminas de lasaña', quantity: 12, unit: 'unidad' },
      { name: 'Carne molida de res', quantity: 500, unit: 'g' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', notes: 'picada' },
      { name: 'Ajo', quantity: 3, unit: 'diente', notes: 'picado' },
      { name: 'Tomate triturado', quantity: 800, unit: 'g' },
      { name: 'Puré de tomate', quantity: 200, unit: 'g' },
      { name: 'Vino tinto', quantity: 100, unit: 'ml' },
      { name: 'Aceite de oliva virgen extra', quantity: 2, unit: 'cda' },
      { name: 'Queso ricotta', quantity: 250, unit: 'g' },
      { name: 'Queso mozzarella', quantity: 200, unit: 'g', notes: 'rallado' },
      { name: 'Queso parmesano', quantity: 50, unit: 'g', notes: 'rallado' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' },
      { name: 'Hojas de albahaca', quantity: 8, unit: 'hoja' }
    ],
    instructions: [
      'Precalentar el horno a 180 °C.',
      'En una sartén grande, calienta el aceite y sofríe la cebolla y el ajo hasta que estén dorados.',
      'Añadir la carne molida, cocinar hasta dorarse, agregar el vino tinto y dejar reducir.',
      'Agregar el tomate triturado, puré de tomate, sal, pimienta y cocinar a fuego lento durante 30 minutos.',
      'En una fuente para horno, colocar una capa de salsa, luego láminas de lasaña, una capa de salsa, ricotta, mozzarella y parmesano. Repetir hasta llenar la fuente.',
      'Cubrir con papel aluminio y hornear durante 45 minutos. Retirar el papel y hornear por 15 minutos más hasta que el queso esté dorado.'
    ],
    tips: [
      'Puedes agregar un poco de bechamel para una textura más cremosa.',
      'Deja reposar la lasaña durante 10 minutos antes de servir para que sea más fácil cortar.'
    ],
    nutrition: {
      calories: 650,
      protein: 40,
      carbs: 50,
      fat: 30,
      fiber: 4,
      sugar: 8
    },
    imageUrl: 'https://www.aiafood.com/_next/image/?url=https%3A%2F%2Fbackoffice.aiafood.com%2Fuploads%2Fxxl_lasagne_alla_bolognese_la_ricetta_originale_6703a8fdd2.webp&w=1920&q=80',
    source: 'Recetas Caseras'
  },
  {
    title: 'Risotto de Setas',
    slug: 'risotto-setas',
    description: 'Un risotto cremoso con setas frescas, queso parmesano y un toque de vino blanco.',
    cuisine: 'Italiana',
    course: 'Principal',
    difficulty: 'medium',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    totalTimeMinutes: 50,
    tags: ['arroz', 'setas', 'cremoso'],
    ingredients: [
      { name: 'Arroz Arborio', quantity: 300, unit: 'g' },
      { name: 'Champinones', quantity: 300, unit: 'g' },
      { name: 'Caldo de pollo', quantity: 1.5, unit: 'l' },
      { name: 'Vino blanco', quantity: 100, unit: 'ml' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad', notes: 'picada' },
      { name: 'Ajo', quantity: 2, unit: 'diente', notes: 'picado' },
      { name: 'Queso parmesano', quantity: 50, unit: 'g', notes: 'rallado' },
      { name: 'Mantequilla', quantity: 30, unit: 'g' },
      { name: 'Aceite de oliva virgen extra', quantity: 1, unit: 'cda' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'En una sartén grande, calienta el aceite y sofríe la cebolla y el ajo hasta que estén dorados.',
      'Agrega las setas y cocina hasta que se ablanden.',
      'Añadir el arroz Arborio y cocinar por 2 minutos.',
      'Agregar el vino blanco y dejar que se evapore.',
      'Incorporar el caldo de pollo caliente poco a poco, revolviendo constantemente hasta que el arroz esté cocido (aproximadamente 18 minutos).',
      'Añadir la mantequilla y el queso parmesano al final para obtener un risotto cremoso. Salpimentar al gusto.'
    ],
    tips: [
      'Usa caldo de pollo casero para un mejor sabor.',
      'Si te gusta un risotto más cremoso, puedes añadir más mantequilla y queso al final.'
    ],
    nutrition: {
      calories: 550,
      protein: 12,
      carbs: 80,
      fat: 20,
      fiber: 5,
      sugar: 5
    },
    imageUrl: 'https://www.sherry.wine/media/images/shutterstock_362075504.width-876.jpg',
    source: 'Cocina Italiana'
  },
  {
    title: 'Fettuccine Alfredo',
    slug: 'fettuccine-alfredo',
    description: 'Pasta fettuccine con una salsa cremosa de queso parmesano y mantequilla.',
    cuisine: 'Italiana',
    course: 'Principal',
    difficulty: 'easy',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    tags: ['pasta', 'cremoso', 'queso'],
    ingredients: [
      { name: 'Fettuccine', quantity: 400, unit: 'g' },
      { name: 'Mantequilla', quantity: 50, unit: 'g' },
      { name: 'Crema de leche', quantity: 200, unit: 'ml' },
      { name: 'Queso parmesano', quantity: 100, unit: 'g', notes: 'rallado' },
      { name: 'Ajo', quantity: 2, unit: 'diente', notes: 'picado' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' },
      { name: 'Aceite de oliva virgen extra', quantity: 1, unit: 'cda' }
    ],
    instructions: [
      'Cocer la pasta en agua con sal hasta que esté al dente.',
      'Mientras tanto, en una sartén grande, derretir la mantequilla con el aceite de oliva a fuego medio.',
      'Añadir el ajo y cocinar por 1-2 minutos.',
      'Agregar la crema de leche y calentar hasta que empiece a hervir.',
      'Incorporar el queso parmesano y mezclar hasta que la salsa se vuelva cremosa.',
      'Mezclar la pasta escurrida con la salsa y servir con más queso parmesano.'
    ],
    tips: [
      'Puedes añadir pollo o camarones para una versión más completa.',
      'Sirve inmediatamente para disfrutar la textura cremosa.'
    ],
    nutrition: {
      calories: 700,
      protein: 20,
      carbs: 75,
      fat: 35,
      fiber: 3,
      sugar: 5
    },
    imageUrl: 'https://i0.wp.com/cremigal.com/wp-content/uploads/2020/06/pasta_con_salsa_alfredo.jpg?fit=806%2C453&ssl=1',
    source: 'Cocina Tradicional Italiana'
  },
  {
    title: 'Gnocchi con Salsa de Tomate y Albahaca',
    slug: 'gnocchi-tomate-albahaca',
    description: 'Gnocchis caseros en una salsa fresca de tomate y albahaca, ideal para un plato reconfortante.',
    cuisine: 'Italiana',
    course: 'Principal',
    difficulty: 'medium',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    totalTimeMinutes: 45,
    tags: ['pasta', 'vegetariano', 'tomate'],
    ingredients: [
      { name: 'Gnocchi de patata', quantity: 500, unit: 'g' },
      { name: 'Tomate', quantity: 6, unit: 'unidad', notes: 'pelados y picados' },
      { name: 'Ajo', quantity: 2, unit: 'diente' },
      { name: 'Aceite de oliva virgen extra', quantity: 2, unit: 'cda' },
      { name: 'Albahaca fresca', quantity: 10, unit: 'hoja' },
      { name: 'Queso parmesano', quantity: 50, unit: 'g', notes: 'rallado' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Cocer los gnocchis en agua con sal hasta que suban a la superficie.',
      'Mientras tanto, calienta el aceite de oliva en una sartén, agrega el ajo picado y sofríe por 1-2 minutos.',
      'Añadir los tomates picados y cocinar a fuego lento durante 15 minutos hasta obtener una salsa espesa.',
      'Añadir albahaca fresca troceada, sal y pimienta.',
      'Mezclar los gnocchis con la salsa y servir con queso parmesano rallado.'
    ],
    tips: [
      'Si prefieres una salsa más cremosa, añade un poco de crema de leche al final.',
      'Usa gnocchis caseros para un toque aún más auténtico.'
    ],
    nutrition: {
      calories: 400,
      protein: 12,
      carbs: 60,
      fat: 14,
      fiber: 5,
      sugar: 7
    },
    imageUrl: 'https://img-global.cpcdn.com/recipes/d0ccc4e176682cac/680x781cq80/gnocchi-de-patata-sin-gluten-con-salsa-de-tomate-y-albahaca-foto-principal.jpg',
    source: 'Recetas Italianas'
  },
  {
    title: 'Pizza Margherita con Masa Casera',
    slug: 'pizza-margherita-casera',
    description: 'Pizza clásica italiana con masa casera, salsa de tomate fresco, mozzarella y albahaca.',
    cuisine: 'Italiana',
    course: 'Principal',
    difficulty: 'medium',
    servings: 4,
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    totalTimeMinutes: 45,
    tags: ['pizza', 'mozzarella', 'horneado'],
    ingredients: [
      { name: 'Harina de trigo', quantity: 500, unit: 'g' },
      { name: 'Levadura fresca', quantity: 20, unit: 'g' },
      { name: 'Agua tibia', quantity: 300, unit: 'ml' },
      { name: 'Aceite de oliva virgen extra', quantity: 3, unit: 'cda' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Tomate triturado', quantity: 300, unit: 'g' },
      { name: 'Queso mozzarella', quantity: 200, unit: 'g', notes: 'en rodajas' },
      { name: 'Albahaca fresca', quantity: 8, unit: 'hoja' },
      { name: 'Queso parmesano', quantity: 30, unit: 'g', notes: 'rallado' }
    ],
    instructions: [
      'Disolver la levadura en agua tibia, añadir la harina y la sal, y amasar hasta obtener una masa homogénea.',
      'Dejar reposar la masa durante 1 hora hasta que haya duplicado su tamaño.',
      'Mientras tanto, prepara la salsa calentando el tomate triturado con un poco de aceite de oliva y sal.',
      'Precalienta el horno a 250 °C.',
      'Estira la masa en una pizza, cubre con salsa de tomate, mozzarella y queso parmesano.',
      'Hornea durante 15 minutos hasta que la masa esté dorada y crujiente.',
      'Añadir albahaca fresca al salir del horno y servir.'
    ],
    tips: [
      'Si no encuentras mozzarella fresca, puedes usar mozzarella rallada.',
      'Deja que la masa repose para obtener una pizza más esponjosa.'
    ],
    nutrition: {
      calories: 600,
      protein: 20,
      carbs: 80,
      fat: 25,
      fiber: 5,
      sugar: 6
    },
    imageUrl: 'https://www.ditaly.es/wp-content/uploads/2023/03/pizza-margarita.png',
    source: 'Recetas de Pizzas Caseras'
  },
  {
    title: 'Spaghetti alla Puttanesca',
    slug: 'spaghetti-alla-puttanesca',
    description: 'Spaghetti con una salsa vibrante de tomate, aceitunas, alcaparras y anchoas.',
    cuisine: 'Italiana',
    course: 'Principal',
    difficulty: 'easy',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    tags: ['pasta', 'salvaje', 'tomate'],
    ingredients: [
      { name: 'Spaghetti', quantity: 400, unit: 'g' },
      { name: 'Tomates enlatados', quantity: 400, unit: 'g' },
      { name: 'Aceitunas negras', quantity: 100, unit: 'g', notes: 'deshuesadas' },
      { name: 'Alcaparras', quantity: 2, unit: 'cda' },
      { name: 'Anchoas en aceite', quantity: 4, unit: 'filete' },
      { name: 'Ajo', quantity: 3, unit: 'diente' },
      { name: 'Aceite de oliva', quantity: 3, unit: 'cda' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' },
      { name: 'Perejil fresco', quantity: 10, unit: 'ramita', notes: 'picado' }
    ],
    instructions: [
      'Cocer los spaghetti en agua con sal hasta que estén al dente.',
      'Mientras tanto, calienta el aceite de oliva en una sartén grande, agrega el ajo picado y las anchoas, y sofríe durante 1 minuto.',
      'Añadir las aceitunas, las alcaparras y los tomates. Cocinar a fuego medio durante 10 minutos.',
      'Mezclar los spaghetti cocidos con la salsa y cocinar por 2 minutos.',
      'Servir con perejil fresco picado por encima.'
    ],
    tips: [
      'Puedes añadir guindilla si te gusta el picante.',
      'Este plato es perfecto con un buen trozo de pan crujiente.'
    ],
    nutrition: {
      calories: 450,
      protein: 14,
      carbs: 60,
      fat: 18,
      fiber: 7,
      sugar: 8
    },
    imageUrl: 'https://www.dececco.com/wp-content/uploads/2025/04/foto-apertura.png',
    source: 'Cucina Tradizionale'
  },
  {
    title: 'Ratatouille',
    slug: 'ratatouille',
    description: 'Plato tradicional francés de verduras asadas con un toque de hierbas aromáticas.',
    cuisine: 'Francesa',
    course: 'Principal',
    difficulty: 'medium',
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    totalTimeMinutes: 60,
    tags: ['vegetariano', 'francés', 'saludable'],
    ingredients: [
      { name: 'Berenjena', quantity: 1, unit: 'unidad', notes: 'en rodajas' },
      { name: 'Calabacín', quantity: 1, unit: 'unidad', notes: 'en rodajas' },
      { name: 'Pimiento rojo', quantity: 1, unit: 'unidad', notes: 'en tiras' },
      { name: 'Pimiento amarillo', quantity: 1, unit: 'unidad', notes: 'en tiras' },
      { name: 'Tomate', quantity: 3, unit: 'unidad', notes: 'en rodajas' },
      { name: 'Ajo', quantity: 2, unit: 'diente', notes: 'picado' },
      { name: 'Aceite de oliva virgen extra', quantity: 3, unit: 'cda' },
      { name: 'Tomillo fresco', quantity: 2, unit: 'ramita' },
      { name: 'Romero fresco', quantity: 1, unit: 'ramita' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'Precalienta el horno a 180 °C.',
      'Corta las verduras en rodajas finas y colócalas de forma alternada en una fuente para horno.',
      'En una sartén, calienta el aceite de oliva y sofríe el ajo picado durante 1-2 minutos.',
      'Vierte el ajo y el aceite sobre las verduras. Añade el tomillo, romero, sal y pimienta.',
      'Hornea durante 40 minutos o hasta que las verduras estén tiernas y ligeramente doradas.'
    ],
    tips: [
      'Puedes añadir un poco de queso rallado al final de la cocción para un toque extra.',
      'Este plato también puede servirse como acompañante o como plato principal con pan crujiente.'
    ],
    nutrition: {
      calories: 180,
      protein: 3,
      carbs: 30,
      fat: 8,
      fiber: 6,
      sugar: 10
    },
    imageUrl: 'https://static.bainet.es/clip/3954bd7e-9da5-4955-a666-244e9da550f0_source-aspect-ratio_1600w_0.jpg',
    source: 'Recetas Francesas'
  },
  {
    title: 'Paella Valenciana',
    slug: 'paella-valenciana',
    description: 'La auténtica paella de la región Valenciana, con mariscos, pollo y arroz en un solo plato.',
    cuisine: 'Española',
    course: 'Principal',
    difficulty: 'medium',
    servings: 6,
    prepTimeMinutes: 30,
    cookTimeMinutes: 45,
    totalTimeMinutes: 75,
    tags: ['arroz', 'mariscos', 'carne'],
    ingredients: [
      { name: 'Arroz de grano corto', quantity: 350, unit: 'g' },
      { name: 'Pollo', quantity: 500, unit: 'g', notes: 'en trozos' },
      { name: 'Mariscos surtidos', quantity: 300, unit: 'g' },
      { name: 'Pimiento rojo', quantity: 1, unit: 'unidad', notes: 'en tiras' },
      { name: 'Judía verde', quantity: 100, unit: 'g' },
      { name: 'Tomate', quantity: 2, unit: 'unidad', notes: 'rallado' },
      { name: 'Ajo', quantity: 3, unit: 'diente', notes: 'picado' },
      { name: 'Aceite de oliva', quantity: 3, unit: 'cda' },
      { name: 'Pimiento verde', quantity: 1, unit: 'unidad', notes: 'en tiras' },
      { name: 'Caldo de pollo', quantity: 1.2, unit: 'l' },
      { name: 'Azafrán', quantity: 1, unit: 'pizca' },
      { name: 'Sal marina', quantity: 1, unit: 'cdita' },
      { name: 'Pimienta negra molida', quantity: 0.5, unit: 'cdita' }
    ],
    instructions: [
      'En una paellera, calienta el aceite de oliva y sofríe el pollo hasta dorarse.',
      'Añade el pimiento rojo, verde, la judía verde y el ajo. Cocina durante 5 minutos.',
      'Incorpora el tomate rallado y cocina durante 10 minutos hasta que el tomate se haya reducido.',
      'Agrega el arroz y remueve bien para que se impregne de los sabores.',
      'Añade el caldo de pollo caliente, el azafrán, la sal y la pimienta. Cocina durante 20 minutos sin remover.',
      'Agrega los mariscos y cocina durante 10 minutos más. Deja reposar unos minutos antes de servir.'
    ],
    tips: [
      'Puedes añadir almejas o mejillones para más sabor.',
      'Asegúrate de usar un caldo de pollo casero para un sabor más profundo.'
    ],
    nutrition: {
      calories: 550,
      protein: 30,
      carbs: 60,
      fat: 18,
      fiber: 4,
      sugar: 7
    },
    imageUrl: 'https://chefstv.net/wp-content/uploads/2024/04/0178-paella-valenciana-chefstv-wide-web.webp',
    source: 'Recetas de la Abuela'
  }
];