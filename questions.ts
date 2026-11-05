export interface QuizOption {
  letter: 'A' | 'B' | 'C' | 'D';
  es: string;
  hy: string;
}

export interface Question {
  id: number;
  es: string;
  hy: string;
  options: QuizOption[];
  correctIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanationEs: string;
  explanationHy: string;
}

export const TARGET_WORD = 'MBAPPE';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    es: "¿Qué harías si dos defensas intentan quitarte el balón?",
    hy: "Ի՞նչ կանեիր, եթե երկու պաշտպան փորձեին քեզնից խլել գնդակը։",
    options: [
      { letter: 'A', es: "Intentaría regatear a los dos", hy: "Կփորձեի շրջանցել երկուսին։" },
      { letter: 'B', es: "Buscaría a un compañero libre", hy: "Կփնտրեի ազատ թիմակցի։" },
      { letter: 'C', es: "Me quedaría parado", hy: "Կկանգնեի տեղում։" },
      { letter: 'D', es: "Tiraría el balón fuera", hy: "Գնդակը դուրս կուղարկեի։" }
    ],
    correctIndex: 1,
    explanationEs: "En el fútbol de equipo, pasar a un compañero desmarcado crea superioridad y evita perder la posesión.",
    explanationHy: "Թիմային ֆուտբոլում ազատ թիմակցին փոխանցելը ստեղծում է առավելություն և թույլ չի տալիս կորցնել գնդակը։"
  },
  {
    id: 2,
    es: "¿Qué significa jugar al primer toque?",
    hy: "Ի՞նչ է նշանակում խաղալ մեկ հպումով։",
    options: [
      { letter: 'A', es: "Correr con el balón", hy: "Վազել գնդակով։" },
      { letter: 'B', es: "Pasar el balón sin controlarlo antes", hy: "Փոխանցել գնդակը առանց նախապես կանգնեցնելու։" },
      { letter: 'C', es: "Tirar desde lejos", hy: "Հեռվից հարվածել։" },
      { letter: 'D', es: "Regatear a un defensa", hy: "Շրջանցել պաշտպանին։" }
    ],
    correctIndex: 1,
    explanationEs: "El juego al primer toque aumenta la velocidad del ataque y descoloca a la defensa rival.",
    explanationHy: "Մեկ հպումով խաղը արագացնում է գրոհը և շփոթեցնում մրցակցի պաշտպանությանը։"
  },
  {
    id: 3,
    es: "¿Qué debe hacer un delantero para evitar el fuera de juego?",
    hy: "Ի՞նչ պետք է անի հարձակվողը, որպեսզի չհայտնվի խաղից դուրս վիճակում։",
    options: [
      { letter: 'A', es: "Estar siempre cerca del portero", hy: "Միշտ լինել դարպասապահի մոտ։" },
      { letter: 'B', es: "No correr hacia la portería", hy: "Չվազել դեպի դարպասը։" },
      { letter: 'C', es: "Controlar su posición cuando un compañero le pasa el balón", hy: "Հետևել իր դիրքին, երբ թիմակիցը փոխանցում է գնդակը։" },
      { letter: 'D', es: "No tocar el balón", hy: "Չդիպչել գնդակին։" }
    ],
    correctIndex: 2,
    explanationEs: "El fuera de juego se determina exactamente en el momento del pase del compañero.",
    explanationHy: "Խաղից դուրս վիճակը որոշվում է հենց թիմակցի փոխանցման պահին։"
  },
  {
    id: 4,
    es: "¿Qué significa hacer una pared en fútbol?",
    hy: "Ի՞նչ է նշանակում ֆուտբոլում կատարել «պատ» փոխանցում։",
    options: [
      { letter: 'A', es: "Pasar el balón y recibirlo rápidamente de vuelta", hy: "Փոխանցել գնդակը և արագ հետ ստանալ։" },
      { letter: 'B', es: "Defender cerca de la portería", hy: "Պաշտպանվել դարպասի մոտ։" },
      { letter: 'C', es: "Tirar un tiro libre", hy: "Իրացնել ազատ հարված։" },
      { letter: 'D', es: "Bloquear un disparo", hy: "Արգելափակել հարվածը։" }
    ],
    correctIndex: 0,
    explanationEs: "La pared (un-dos) es una combinación clásica para superar al marcador con velocidad.",
    explanationHy: "«Պատ» փոխանցումը դասական համակցություն է՝ պաշտպանին արագությամբ շրջանցելու համար։"
  },
  {
    id: 5,
    es: "¿Qué es más importante cuando tu equipo está defendiendo un contraataque?",
    hy: "Ի՞նչն է ավելի կարևոր, երբ թիմդ պաշտպանվում է հակագրոհից։",
    options: [
      { letter: 'A', es: "Subir todos al ataque", hy: "Բոլորով գնալ հարձակման։" },
      { letter: 'B', es: "Mantener las posiciones y cerrar espacios", hy: "Պահպանել դիրքերը և փակել ազատ տարածությունները։" },
      { letter: 'C', es: "Esperar al árbitro", hy: "Սպասել մրցավարին։" },
      { letter: 'D', es: "Dejar solo al portero", hy: "Դարպասապահին մենակ թողնել։" }
    ],
    correctIndex: 1,
    explanationEs: "Mantener el orden táctico y cerrar los pasillos interiores frena el peligro inmediato.",
    explanationHy: "Մարտավարական կարգապահությունը և ազատ գոտիները փակելը չեզոքացնում է վտանգը։"
  },
  {
    id: 6,
    es: "¿Qué significa cambiar de orientación en el juego?",
    hy: "Ի՞նչ է նշանակում փոխել հարձակման ուղղությունը։",
    options: [
      { letter: 'A', es: "Cambiar de entrenador", hy: "Փոխել մարզչին։" },
      { letter: 'B', es: "Cambiar de camiseta", hy: "Փոխել մարզաշապիկը։" },
      { letter: 'C', es: "Llevar el balón de un lado del campo al otro", hy: "Գնդակը խաղադաշտի մի կողմից տեղափոխել մյուս կողմ։" },
      { letter: 'D', es: "Cambiar de portero", hy: "Փոխել դարպասապահին։" }
    ],
    correctIndex: 2,
    explanationEs: "Cambiar el balón de banda aprovecha el lado débil de la defensa contraria.",
    explanationHy: "Գնդակը մի եզրից մյուսը տեղափոխելը հնարավորություն է տալիս գտնել պաշտպանության թույլ կողմը։"
  },
  {
    id: 7,
    es: "¿Qué harías si recibes el balón de espaldas a la portería rival?",
    hy: "Ի՞նչ կանեիր, եթե գնդակը ստանայիր մրցակցի դարպասին մեջքով կանգնած։",
    options: [
      { letter: 'A', es: "Miraría a mi alrededor y buscaría una buena opción", hy: "Կնայեի շուրջս և կփնտրեի լավ տարբերակ։" },
      { letter: 'B', es: "Tiraría sin mirar", hy: "Կհարվածեի առանց նայելու։" },
      { letter: 'C', es: "Dejaría pasar el balón siempre", hy: "Միշտ բաց կթողնեի գնդակը։" },
      { letter: 'D', es: "Saldría del campo", hy: "Դուրս կգայի խաղադաշտից։" }
    ],
    correctIndex: 0,
    explanationEs: "Tener visión periférica permite apoyar de cara a un compañero o girarse con seguridad.",
    explanationHy: "Շուրջը դիտարկելը թույլ է տալիս ճիշտ փոխանցում կատարել կամ շրջվել ապահով։"
  },
  {
    id: 8,
    es: "¿Qué significa recuperar la posesión?",
    hy: "Ի՞նչ է նշանակում վերադարձնել գնդակի տիրապետումը։",
    options: [
      { letter: 'A', es: "Marcar un gol", hy: "Գոլ խփել։" },
      { letter: 'B', es: "Volver a tener el balón después de perderlo", hy: "Կորցնելուց հետո կրկին տիրել գնդակին։" },
      { letter: 'C', es: "Cambiar de posición", hy: "Փոխել դիրքը։" },
      { letter: 'D', es: "Recibir una tarjeta", hy: "Քարտ ստանալ։" }
    ],
    correctIndex: 1,
    explanationEs: "Recuperar la posesión mediante robo, intercepción o presión devuelve el control del partido a tu equipo.",
    explanationHy: "Գնդակի տիրապետումը վերադարձնելը թիմին տալիս է խաղի վերահսկողությունը։"
  },
  {
    id: 9,
    es: "¿Cuándo es útil hacer un pase en profundidad?",
    hy: "Ե՞րբ է օգտակար կատարել խորքային փոխանցում։",
    options: [
      { letter: 'A', es: "Cuando un compañero corre hacia un espacio libre detrás de la defensa", hy: "Երբ թիմակիցը վազում է պաշտպանության հետևում գտնվող ազատ տարածություն։" },
      { letter: 'B', es: "Cuando todos están parados", hy: "Երբ բոլորը կանգնած են։" },
      { letter: 'C', es: "Cuando el balón está fuera", hy: "Երբ գնդակը խաղադաշտից դուրս է։" },
      { letter: 'D', es: "Cuando el árbitro ha parado el juego", hy: "Երբ մրցավարը կանգնեցրել է խաղը։" }
    ],
    correctIndex: 0,
    explanationEs: "El desmarque de ruptura en carrera coordinado con el pase al hueco genera ocasiones de mano a mano.",
    explanationHy: "Պաշտպանների թիկունքում ազատ տարածության մեջ վազող թիմակցի փոխանցումը ստեղծում է գոլային պահ։"
  },
  {
    id: 10,
    es: "¿Qué significa presionar arriba?",
    hy: "Ի՞նչ է նշանակում բարձր պրեսինգ կիրառել։",
    options: [
      { letter: 'A', es: "Defender solamente cerca de tu portería", hy: "Պաշտպանվել միայն սեփական դարպասի մոտ։" },
      { letter: 'B', es: "Intentar recuperar el balón cerca de la portería rival", hy: "Փորձել գնդակը վերադարձնել մրցակցի դարպասի մոտ։" },
      { letter: 'C', es: "Tirar siempre desde lejos", hy: "Միշտ հեռվից հարվածել։" },
      { letter: 'D', es: "Esperar sin moverse", hy: "Սպասել առանց շարժվելու։" }
    ],
    correctIndex: 1,
    explanationEs: "La presión alta obliga al rival a cometer errores en su propia zona defensiva.",
    explanationHy: "Բարձր պրեսինգը ստիպում է մրցակցին սխալվել սեփական տուգանայինի մատույցներում։"
  },
  {
    id: 11,
    es: "¿Qué debe hacer un jugador después de perder el balón cerca del área rival?",
    hy: "Ի՞նչ պետք է անի խաղացողը, երբ կորցնում է գնդակը մրցակցի տուգանային հրապարակի մոտ։",
    options: [
      { letter: 'A', es: "Dejar de correr", hy: "Դադարեցնել վազելը։" },
      { letter: 'B', es: "Protestar al árbitro", hy: "Բողոքել մրցավարին։" },
      { letter: 'C', es: "Intentar recuperarlo o cerrar una línea de pase", hy: "Փորձել վերադարձնել գնդակը կամ փակել փոխանցման ուղղությունը։" },
      { letter: 'D', es: "Salir del campo", hy: "Դուրս գալ խաղադաշտից։" }
    ],
    correctIndex: 2,
    explanationEs: "La presión tras pérdida (gegenpressing) sofoca el contraataque antes de que empiece.",
    explanationHy: "Գնդակի կորստից հետո անհապաղ ճնշումը կասեցնում է մրցակցի հակագրոհը։"
  },
  {
    id: 12,
    es: "¿Qué significa desmarcarse?",
    hy: "Ի՞նչ է նշանակում ազատվել մրցակցի հսկողությունից։",
    options: [
      { letter: 'A', es: "Moverse para quedar libre y recibir un pase", hy: "Շարժվել, ազատվել պաշտպանից և փոխանցում ստանալ։" },
      { letter: 'B', es: "Quitarle el balón al portero", hy: "Գնդակը խլել դարպասապահից։" },
      { letter: 'C', es: "Hacer una falta", hy: "Խախտում կատարել։" },
      { letter: 'D', es: "Cambiar de equipo", hy: "Փոխել թիմը։" }
    ],
    correctIndex: 0,
    explanationEs: "El desmarque es la acción ofensiva fundamental sin balón para crear líneas de pase limpias.",
    explanationHy: "Առանց գնդակի ճիշտ տեղաշարժը հնարավորություն է տալիս ստանալ անվտանգ և արդյունավետ փոխանցում։"
  },
  {
    id: 13,
    es: "¿Qué harías si tu equipo gana 2-1 y quedan tres minutos?",
    hy: "Ի՞նչ կանեիր, եթե թիմդ հաղթեր 2-1 հաշվով, և մնար երեք րոպե։",
    options: [
      { letter: 'A', es: "Atacaría con todos los jugadores", hy: "Բոլոր խաղացողներով կհարձակվեի։" },
      { letter: 'B', es: "Intentaría mantener la posesión y evitar riesgos innecesarios", hy: "Կփորձեի պահել գնդակը և խուսափել ավելորդ ռիսկերից։" },
      { letter: 'C', es: "Dejaría de defender", hy: "Կդադարեի պաշտպանվել։" },
      { letter: 'D', es: "Intentaría regatear siempre", hy: "Միշտ կփորձեի շրջանցել մրցակցին։" }
    ],
    correctIndex: 1,
    explanationEs: "La gestión inteligente del tiempo y la posesión segura aseguran los tres puntos.",
    explanationHy: "Խաղային ժամանակի խելացի կառավարումը և գնդակ պահելը երաշխավորում են հաղթանակը։"
  },
  {
    id: 14,
    es: "¿Qué significa anticiparse a un pase?",
    hy: "Ի՞նչ է նշանակում կանխատեսել փոխանցումը։",
    options: [
      { letter: 'A', es: "Esperar a que el rival marque", hy: "Սպասել, մինչև մրցակիցը գոլ խփի։" },
      { letter: 'B', es: "Correr hacia el banquillo", hy: "Վազել դեպի պահեստայինների նստարանը։" },
      { letter: 'C', es: "Leer la jugada e intentar interceptar el balón", hy: "Կարդալ խաղային իրավիճակը և փորձել կասեցնել փոխանցումը։" },
      { letter: 'D', es: "Pasar el balón hacia atrás", hy: "Գնդակը հետ փոխանցել։" }
    ],
    correctIndex: 2,
    explanationEs: "La anticipación defensiva permite interceptar antes de que el receptor controle el balón.",
    explanationHy: "Իրադարձությունները նախօրոք կանխատեսելը թույլ է տալիս խլել գնդակը հարձակվողից առաջ։"
  },
  {
    id: 15,
    es: "¿Qué es una superioridad numérica en ataque?",
    hy: "Ի՞նչ է նշանակում թվային առավելություն հարձակման ժամանակ։",
    options: [
      { letter: 'A', es: "Tener más atacantes que defensores rivales en una zona", hy: "Որոշակի հատվածում ունենալ ավելի շատ հարձակվողներ, քան մրցակցի պաշտպաններ։" },
      { letter: 'B', es: "Tener más espectadores", hy: "Ունենալ ավելի շատ հանդիսատես։" },
      { letter: 'C', es: "Marcar más goles de penalti", hy: "Ավելի շատ տասնմեկմետրանոց խփել։" },
      { letter: 'D', es: "Tener más entrenadores", hy: "Ունենալ ավելի շատ մարզիչներ։" }
    ],
    correctIndex: 0,
    explanationEs: "Contar con más futbolistas atacantes en un sector facilita encontrar el hombre libre.",
    explanationHy: "Հարձակման որոշակի գոտում ավելի շատ խաղացողներ ունենալը հեշտացնում է գոլային պահի ստեղծումը։"
  },
  {
    id: 16,
    es: "¿Qué significa jugar al contraataque?",
    hy: "Ի՞նչ է նշանակում խաղալ հակագրոհներով։",
    options: [
      { letter: 'A', es: "Atacar rápidamente después de recuperar el balón", hy: "Գնդակը վերադարձնելուց հետո արագ հարձակվել։" },
      { letter: 'B', es: "Tener siempre la posesión", hy: "Միշտ տիրել գնդակին։" },
      { letter: 'C', es: "Defender durante todo el partido", hy: "Ամբողջ խաղը պաշտպանվել։" },
      { letter: 'D', es: "Pasar siempre al portero", hy: "Միշտ փոխանցել դարպասապահին։" }
    ],
    correctIndex: 0,
    explanationEs: "El contraataque busca golpear con velocidad antes de que la defensa rival se reorganice.",
    explanationHy: "Հակագրոհը նպատակ ունի արագ հարվածել, քանի դեռ մրցակցի պաշտպանությունը չի հասցրել վերադասավորվել։"
  },
  {
    id: 17,
    es: "¿Qué significa temporizar en defensa?",
    hy: "Ի՞նչ է նշանակում պաշտպանությունում ժամանակ շահել։",
    options: [
      { letter: 'A', es: "Intentar retrasar el ataque rival mientras llegan tus compañeros", hy: "Փորձել դանդաղեցնել մրցակցի հարձակումը, մինչև թիմակիցները օգնության հասնեն։" },
      { letter: 'B', es: "Salir corriendo hacia la otra portería", hy: "Վազել դեպի մյուս դարպասը։" },
      { letter: 'C', es: "Dejar pasar al delantero", hy: "Թույլ տալ հարձակվողին անցնել։" },
      { letter: 'D', es: "Pedir un cambio inmediatamente", hy: "Անմիջապես փոխարինում խնդրել։" }
    ],
    correctIndex: 0,
    explanationEs: "Frenar la progresión del rival sin entrar bruscamente da tiempo a reorganizar las líneas.",
    explanationHy: "Մրցակցի արագությունը դանդաղեցնելը թույլ է տալիս թիմակիցներին վերադառնալ և փակել գոտիները։"
  },
  {
    id: 18,
    es: "¿Qué debe hacer un extremo para crear peligro por la banda?",
    hy: "Ի՞նչ պետք է անի եզրային հարձակվողը՝ եզրով վտանգ ստեղծելու համար։",
    options: [
      { letter: 'A', es: "Quedarse siempre en el centro", hy: "Միշտ մնալ կենտրոնում։" },
      { letter: 'B', es: "Buscar espacios, desbordar y centrar cuando sea posible", hy: "Փնտրել ազատ տարածություններ, շրջանցել պաշտպանին և հնարավորության դեպքում փոխանցել կենտրոն։" },
      { letter: 'C', es: "Jugar siempre hacia atrás", hy: "Միշտ հետ փոխանցել։" },
      { letter: 'D', es: "Evitar recibir el balón", hy: "Խուսափել գնդակ ստանալուց։" }
    ],
    correctIndex: 1,
    explanationEs: "La amplitud, el regate y los centros precisos al área son las mejores armas de un extremo.",
    explanationHy: "Եզրով առաջխաղացումը, շրջանցումը և դեպի տուգանային ճշգրիտ փոխանցումները եզրայինի գլխավոր զենքն են։"
  },
  {
    id: 19,
    es: "¿Qué significa leer bien el juego?",
    hy: "Ի՞նչ է նշանակում լավ հասկանալ խաղը։",
    options: [
      { letter: 'A', es: "Conocer todos los resultados anteriores", hy: "Իմանալ բոլոր նախորդ արդյունքները։" },
      { letter: 'B', es: "Correr sin parar", hy: "Վազել առանց կանգ առնելու։" },
      { letter: 'C', es: "Anticipar movimientos y tomar buenas decisiones", hy: "Կանխատեսել շարժումները և ճիշտ որոշումներ ընդունել։" },
      { letter: 'D', es: "Escuchar solamente al público", hy: "Լսել միայն հանդիսատեսին։" }
    ],
    correctIndex: 2,
    explanationEs: "La inteligencia táctica radica en interpretar los espacios y tomar la mejor decisión bajo presión.",
    explanationHy: "Ֆուտբոլային ինտելեկտը կայանում է դաշտը ճիշտ տեսնելու և արագ ճիշտ որոշում կայացնելու մեջ։"
  },
  {
    id: 20,
    es: "Estás jugando una final. El resultado es 1-1 y tienes una ocasión clara en el último minuto. ¿Qué es lo más importante?",
    hy: "Դու խաղում ես եզրափակչում։ Հաշիվը 1-1 է, և վերջին րոպեին գոլ խփելու լավ հնարավորություն ունես։ Ի՞նչն է ամենակարևորը։",
    options: [
      { letter: 'A', es: "Disparar lo más fuerte posible sin mirar", hy: "Հնարավորինս ուժեղ հարվածել՝ առանց նայելու։" },
      { letter: 'B', es: "Mantener la calma y elegir la mejor opción", hy: "Պահպանել հանգստությունը և ընտրել լավագույն տարբերակը։" },
      { letter: 'C', es: "Esperar a que llegue un defensa", hy: "Սպասել, մինչև պաշտպանը մոտենա։" },
      { letter: 'D', es: "Dejar pasar el balón", hy: "Բաց թողնել գնդակը։" }
    ],
    correctIndex: 1,
    explanationEs: "La sangre fría y la definición precisa en los momentos cumbre definen a los grandes campeones como Mbappé.",
    explanationHy: "Սառնասրտությունն ու վճռական պահին ճիշտ հարված ընտրելը բնորոշ են մեծ չեմպիոններին, ինչպիսին Մբապեն է։"
  }
];
