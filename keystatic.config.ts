import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: import.meta.env.DEV
    ? { kind: "local" }
    : {
        kind: "github",
        repo: "rxzzd/ushanka-aesthetic",
      },
  collections: {
    posts: collection({
      label: "Музыкальные подборки",
      slugField: "title",
      path: "src/content/posts/*",
      format: { data: "yaml" },
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: "Заголовок" } }),
        date: fields.datetime({
          label: "Дата и время публикации",
          defaultValue: { kind: "now" },
        }),
        imgs: fields.array(
          fields.image({
            label: "Image",
            directory: "public/images",
            publicPath: "/images",
          }),
          {
            itemLabel: (props) => {
              return props.value?.filename || "No image yet";
            },
          },
        ),
        audioSrc: fields.file({
          label: "Аудиозапись (MP3)",
          directory: "public/audio",
          publicPath: "/audio/",
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
