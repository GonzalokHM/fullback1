const bcrypt = require('bcrypt');

const seed = {
  users: [
    {
      name: 'artur',
      email: 'artur@eaple.com',
      password: bcrypt.hashSync('123456', 10),
      rol: 'user'
    },
    {
      name: 'pepita',
      email: 'pepita@eaple.com',
      password: bcrypt.hashSync('1233', 10),
      rol: 'user'
    },
    {
      name: 'boss',
      email: 'boss@eaple.com',
      password: bcrypt.hashSync('4321', 10),
      rol: 'admin'
    },
  ],
  
    events: [
      {
        title: 'Concierto de Rock',
        date: '2024-06-01T19:00:00Z',
        location: 'Estadio Nacional',
        description: 'Un concierto de rock con las mejores bandas locales.',
        organizer: null
      },
      {
        title: 'Feria de Tecnología',
        date: '2024-07-15T09:00:00Z',
        location: 'Centro de Convenciones',
        description: 'Una feria con las últimas novedades en tecnología.',
        organizer: null,
      },
      {
        title: 'Conferencia de Desarrollo Web',
        date: '2024-08-20T10:00:00Z',
        location: 'Auditorio Principal',
        description: 'Conferencia sobre las tendencias actuales en desarrollo web.',
        organizer: null,
      },
      {
      title: 'Feria de Tecnología',
      date: '2024-07-15T09:00:00Z',
      location: 'Centro de Convenciones',
      description: 'Una feria con las últimas novedades en tecnología.',
      organizer: null,
    },
    {
      title: 'Conferencia de Desarrollo Web',
      date: '2024-08-20T10:00:00Z',
      location: 'Auditorio Principal',
      description: 'Conferencia sobre las tendencias actuales en desarrollo web.',
      organizer: null,
    },
    {
      title: 'Festival de Cine Independiente',
      date: '2024-09-10T18:00:00Z',
      location: 'Teatro Municipal',
      description: 'Un festival que presenta películas independientes de todo el mundo.',
      organizer: null,
    },
    {
      title: 'Exposición de Arte Contemporáneo',
      date: '2024-10-05T10:00:00Z',
      location: 'Galería de Arte Moderno',
      description: 'Exposición de arte contemporáneo con obras de artistas emergentes.',
      organizer: null,
    },
    {
      title: 'Torneo de Ajedrez',
      date: '2024-11-25T08:00:00Z',
      location: 'Centro Deportivo',
      description: 'Un torneo de ajedrez abierto a todas las edades y niveles.',
      organizer: null,
    }
  ]
  
};

module.exports = seed;
