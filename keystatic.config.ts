import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    //kind: 'local', // Работаем локально на вашем компьютере
    kind: 'github',
    repo: 'rxzzd/ushanka-aesthetics',
  },
  collections: {
    posts: collection({
      label: 'Музыкальные подборки',
      slugField: 'title', // URL-адрес поста будет строиться на основе заголовка
      path: 'src/content/posts/*', // Путь, куда Keystatic будет записывать файлы
      format: { data: 'yaml' }, // Будем сохранять посты в чистом YAML-формате
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        date: fields.date({ 
          label: 'Дата публикации', 
          defaultValue: { kind: 'today' } 
        }),
        img1: fields.image({
          label: 'Первое изображение',
          directory: 'public/images', // Куда физически сохранить файл картинки
          publicPath: '/images/',     // Путь, который будет записан в данные
        }),
        img2: fields.image({
          label: 'Второе изображение',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        audioSrc: fields.file({
          label: 'Аудиозапись (MP3)',
          directory: 'public/audio',  // Куда физически сохранить MP3
          publicPath: '/audio/',      // Путь, который будет записан в данные
          validation: { isRequired: true }
        }),
      },
    }),
  },
});